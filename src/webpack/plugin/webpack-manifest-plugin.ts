/**
 * 使用webpack-manifest-plugin源码
 */
import webpack, { Compiler, WebpackPluginInstance, Chunk, Compilation, AssetInfo, Asset } from 'webpack'
import fs from 'fs'
import { join, basename, dirname, resolve, relative } from 'path';
import { RawSource } from 'webpack-sources'
interface FileDescriptor {
    chunk?: Chunk;
    isAsset: Boolean;
    isChunk: Boolean;
    isInitial: Boolean;
    isModuleAsset: Boolean;
    name: string;
    path: string;
}
export interface CompilationAssetInfo extends AssetInfo {
    sourceFilename: string;
}
export interface CompilationAsset extends Asset {
    chunks: any[];
    info: CompilationAssetInfo;
}
type ManifestObj = Record<any, any>
// type ContainFiles = 
interface InternalOptions {
    fileName?: string;
    basePath?: string;
    publicPath?: string;
    generate?: (
        seed: Record<any, any>,
        files: FileDescriptor[],
        entries: Record<string, string[]>
    ) => ManifestObj;
    seed?: Record<any, any>;
    serialize?: (manifest: ManifestObj) => string;
    transformExtensions: RegExp;
}
type EmitCountMap = Map<any, any>;
interface BeforeRunHookArgs {
    emitCountMap: EmitCountMap;
    manifestFileName: string;
}
class Manifest implements WebpackPluginInstance {
  private options: InternalOptions;
  constructor(options: InternalOptions) {
    this.options = {
      fileName: 'manifest.json',
      basePath: '',
      publicPath: '',
      seed: void 0,
      generate: void 0,
      transformExtensions: /^(gz|map)$/i,
      serialize(manifest: any) {
        return JSON.stringify(manifest, null, 2);
      },
      ...options
    }
  }
  beforeRunHook(
    { emitCountMap, manifestFileName }: BeforeRunHookArgs,
    _: Compiler,
    callback: Function
  ) {
    const emitCount = emitCountMap.get(manifestFileName) || 0;
    emitCountMap.set(manifestFileName, emitCount + 1);

    /* istanbul ignore next */
    if (callback) {
      callback();
    }
  }

  generateManifest(
    compilation: webpack.Compilation,
    files: FileDescriptor[],
    { generate, seed = {} }: InternalOptions
  ) {
    let result: ManifestObj;
    if (generate) {
      const entrypointsArray = Array.from(compilation.entrypoints.entries());
      const entrypoints = entrypointsArray.reduce(
        (e, [name, entrypoint]) => Object.assign(e, { [name]: entrypoint.getFiles() }),
                {} as Record<string, any>
      );
      result = generate(seed, files, entrypoints);
    } else {
      result = files.reduce(
        (manifest, file) => Object.assign(manifest, { [file.name]: file.path }),
        seed
      );
    }

    return result;
  }
  standardizeFilePaths(file: FileDescriptor) {
    const result = Object.assign({}, file);
    result.name = file.name.replace(/\\/g, '/');
    result.path = file.path.replace(/\\/g, '/');
    return result;
  }
  getFileType(fileName: string, { transformExtensions }: InternalOptions) {
    const replaced = fileName.replace(/\?.*/, '');
    const split = replaced.split('.');
    const extension = split.pop();
    return transformExtensions.test(extension!) ? `${split.pop()}.${extension}` : extension;
  }
  transformFiles = (files: FileDescriptor[], options: InternalOptions) =>
    ['filter', 'map', 'sort']
      .filter((fname: string) => !!options[fname])
    // TODO: deprecate these
      .reduce(
        // Note: We want to access the filter, map, and sort functions on an array. TS sucks at this
        // so we cast to something it can't complain about
        (prev, fname: string) => (prev as unknown as Record<string, Function>)[fname](options[fname]),
        files
      )
      .map(this.standardizeFilePaths);
  reduceChunk(
    files: FileDescriptor[],
    chunk: Chunk,
    auxiliaryFiles: Record<any, any>
  ) {
    // auxiliary files contain things like images, fonts AND, most
    // importantly, other files like .map sourcemap files
    // we modify the auxiliaryFiles so that we can add any of these
    // to the manifest that was not added by another method
    // (sourcemaps files are not added via any other method)
    Array.from(chunk.auxiliaryFiles || []).forEach((auxiliaryFile) => {
      auxiliaryFiles[auxiliaryFile] = {
        isAsset: true,
        isChunk: false,
        isInitial: false,
        isModuleAsset: true,
        name: basename(auxiliaryFile),
        path: auxiliaryFile
      };
    });
    return Array.from(chunk.files).reduce((prev, path) => {
      let name = chunk.name ? chunk.name : null;

      name = name ? `${name}.${this.getFileType(path, this.options)}`
                : path;

      return prev.concat({
        chunk,
        isAsset: false,
        isChunk: true,
        isInitial: chunk.isOnlyInitial(),
        isModuleAsset: false,
        name,
        path
      });
    }, files);
  }
  reduceAssets(
    files: FileDescriptor[],
    asset: CompilationAsset,
    moduleAssets: Record<any, any>
  ) {
    let name;
    if (moduleAssets[asset.name]) {
      name = moduleAssets[asset.name];
    } else if (asset.info.sourceFilename) {
      name = join(dirname(asset.name), basename(asset.info.sourceFilename));
    }

    if (name) {
      return files.concat({
        isAsset: true,
        isChunk: false,
        isInitial: false,
        isModuleAsset: true,
        name,
        path: asset.name
      });
    }

    const isEntryAsset = asset.chunks && asset.chunks.length > 0;
    if (isEntryAsset) {
      return files;
    }

    return files.concat({
      isAsset: true,
      isChunk: false,
      isInitial: false,
      isModuleAsset: false,
      name: asset.name,
      path: asset.name
    });
  }
  processorFn(compilation: Compilation, otherParams: { manifestAssetId: string, moduleAssets: object, emitCountMap: EmitCountMap, compiler: Compiler, manifestFileName: string }) {
    const { manifestAssetId, manifestFileName, moduleAssets, emitCountMap, compiler } = otherParams;
    const { basePath } = this.options;

    const stats = compilation.getStats().toJson({
      assets: true, // 资产
      chunkGroups: true,//optimization splitChunks出来的资产
    });
    const publicPath = this.options.publicPath !== null ? this.options.publicPath : stats.publicPath;
    const auxiliaryFiles: Record<any, any> = {};
    let files = Array.from(compilation.chunks).reduce<FileDescriptor[]>(
      (prev, chunk) => this.reduceChunk(prev, chunk, auxiliaryFiles),
            [] as FileDescriptor[]
    );
    // module assets don't show up in assetsByChunkName, we're getting them this way
    files = (stats.assets! as unknown as CompilationAsset[]).reduce(
      (prev, asset) => this.reduceAssets(prev, asset, moduleAssets),
      files
    );
    // don't add hot updates and don't add manifests from other instances
    files = files.filter(
      ({ name, path }: { name: string; path: string }) => {
        console.log(path);
        return !path.includes('hot-update') &&
                    typeof emitCountMap.get(join(compiler.options.output?.path || '<unknown>', name)) ===
                    'undefined'
      }

    );

    // auxiliary files are "extra" files that are probably already included
    // in other ways. Loop over files and remove any from auxiliaryFiles
    files.forEach((file: FileDescriptor) => {
      delete auxiliaryFiles[file.path];
    });
    // if there are any auxiliaryFiles left, add them to the files
    // this handles, specifically, sourcemaps
    Object.keys(auxiliaryFiles).forEach((auxiliaryFile) => {
      files = files.concat(auxiliaryFiles[auxiliaryFile]);
    });
    files = files.map((file: FileDescriptor) => {
      const changes = {
        // Append optional basepath onto all references. This allows output path to be reflected in the manifest.
        name: basePath ? basePath + file.name : file.name,
        // Similar to basePath but only affects the value (e.g. how output.publicPath turns
        // require('foo/bar') into '/public/foo/bar', see https://github.com/webpack/docs/wiki/configuration#outputpublicpath
        path: publicPath ? publicPath + file.path : file.path
      };

      // Fixes #210
      // changes.name = removeKeyHash ? changes.name.replace(removeKeyHash, '') : changes.name;

      return Object.assign(file, changes);
    });

    files = this.transformFiles(files, this.options);
    const manifest = this.generateManifest(compilation, files, this.options);
    const emitCount = emitCountMap.get(manifestFileName) - 1;
    const isLastEmit = emitCount === 0;
    if (isLastEmit) {
      const output = this.options.serialize(manifest);
      compilation.emitAsset(manifestAssetId, new RawSource(output));
    }
  }
  apply(compiler: Compiler) {
    const manifestFileName = resolve(compiler.options.output?.path || './', this.options.fileName);
    const manifestAssetId = relative(compiler.options.output?.path || './', manifestFileName);
    const moduleAssets = {};
    const emitCountMap: EmitCountMap = new Map();
    const hookOptions = {
      name: 'WebpackManifestPlugin',
      stage: Infinity
    };
    // compiler.hooks.thisCompilation.tap(hookOptions, (compilation) => {



    if (webpack.version?.startsWith('4')) {
      compiler.hooks.emit.tap(hookOptions, (compilation) => this.processorFn(compilation, { manifestAssetId, moduleAssets, emitCountMap, compiler, manifestFileName }));
    } else {
      compiler.hooks.thisCompilation.tap(hookOptions, (compilation) => {
        compilation.hooks.processAssets.tap(hookOptions, () =>
          this.processorFn(compilation, { manifestAssetId, moduleAssets, emitCountMap, compiler, manifestFileName })
        );
      });
    }
    const beforeRun = this.beforeRunHook.bind(this, { emitCountMap, manifestFileName })
    compiler.hooks.run.tap(hookOptions, beforeRun);

    // const isLastEmit = emitCount === 0;
  }
}

export default Manifest;