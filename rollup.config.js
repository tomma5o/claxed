import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default {
  input: 'src/index.js',
  external: ['react'],
  output: [
    {
      file: 'dist/claxed.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/claxed.esm.js',
      format: 'es',
    },
  ],
  plugins: [commonjs(), nodePolyfills(), nodeResolve()],
};
