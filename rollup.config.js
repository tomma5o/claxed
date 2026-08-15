import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
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
  plugins: [typescript({ tsconfig: 'tsconfig.build.json' })],
};
