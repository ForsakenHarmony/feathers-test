import fs from 'fs';
// Rollup plugins.
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import css from 'rollup-plugin-css-only';
import inject from 'rollup-plugin-inject';
import alias from 'rollup-plugin-alias';

const babelRc = JSON.parse(fs.readFileSync('.babelrc', 'utf8'));

// import debug from 'debug';
//
// debug.enable('*');

export default {
  entry    : 'src/client/index.js',
  dest     : 'public/js/main.min.js',
  format   : 'iife',
  sourceMap: true,
  plugins  : [
    css({ output: 'public/styles/styles.css' }),
    // replace({
    //   '"react"': '"preact-compat"',
    //   '"react-dom"': '"preact-compat"',
    //   '\'react\'': '\'preact-compat\'',
    //   '\'react-dom\'': '\'preact-compat\'',
    // }),
    alias({
      //   '"react"'      : 'node_modules/preact-compat/src/index.js',
      //   '"react-dom"'  : 'node_modules/preact-compat/src/index.js',
      //   '\'react\''    : 'node_modules/preact-compat/src/index.js',
      //   '\'react-dom\'': 'node_modules/preact-compat/src/index.js',
      'react-dom'  : 'node_modules/preact-compat/src/index.js',
      'react-redux': 'node_modules/react-redux/src/index.js',
      react        : 'node_modules/preact-compat/src/index.js',
    }),
    resolve({
      jsnext        : true,
      main          : true,
      skip          : ['react'],
      browser       : true,
      preferBuiltins: false,
    }),
    eslint({
      exclude: [
        'src/client/styles/**',
      ],
    }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: babelRc.presets,
      plugins: babelRc.plugins,
    }),
    commonjs(),
    inject({
      include: ['**/*.js', '**/*.jsx'],
      exclude: 'node_modules/**',
      
      h: ['preact', 'h'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};

