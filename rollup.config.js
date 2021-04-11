import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  external: ['react'],
  output: [
    {
      file: 'dist/claxed.cjs.js',
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/claxed.esm.js',
      format: 'es',
      exports: 'auto',
    },
  ],
  plugins: [commonjs(), nodeResolve()],
};
