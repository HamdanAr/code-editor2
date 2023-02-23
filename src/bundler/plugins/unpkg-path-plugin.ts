import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache'
});

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({filter: /(^index\.js$)/}, ()=>{
        return { path: 'index.js', namespace: 'a'}
      })

      build.onResolve({filter: /^\.+\//}, (args: any)=>{
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        }
      })

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);  
        return{path: `https://unpkg.com/${args.path}`, namespace: 'a'}

        // else if(args.path === 'tiny-test-pkg'){
        //   return {path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js', namespace: 'a'}
        // }
      });

    },
  };
};

// else {
//   return {
//     loader: 'jsx',
//     contents: 'export default "hi there!"',
//   };
// }