import type { Resolver } from 'webpack';

class ModTiktokenEntry {
  apply(resolver: Resolver) {
    resolver.getHook('before-resolve-in-package').tapAsync('ModTiktoken', (...arg) => {
      const [
        request,
        ,
        //  resolveContext
        callback,
      ] = arg;
      if (request.path && /@dqbd\/tiktoken/.test(request.path)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.descriptionFileData.exports['.'].node = request.descriptionFileData.exports['.'].default;
      }
      callback();
    });
  }
}

export default ModTiktokenEntry;
