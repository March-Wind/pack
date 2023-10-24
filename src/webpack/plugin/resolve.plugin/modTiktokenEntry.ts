import type { Resolver } from 'webpack';

class ModTiktokenEntry {
  apply(resolver: Resolver) {
    resolver.getHook('before-resolve-in-package').tapAsync('ModTiktoken', (request, resolveContext, callback) => {
      if (request.path && /@dqbd\/tiktoken/.test(request.path)) {
        console.log(resolveContext);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.descriptionFileData.exports['.'].node = request.descriptionFileData.exports['.'].default;
      }
      callback();
    });
  }
}

export default ModTiktokenEntry;
