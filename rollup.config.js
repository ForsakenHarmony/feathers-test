// Rollup plugins.
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import css from 'rollup-plugin-css-only';
import inject from 'rollup-plugin-inject';

// function assign(target, source) {
//   Object.keys(source).forEach((key) => {
//     target[key] = source[key];
//   });
//   return target;
// }
//
// const babelrc = {
//   presets: [
//     'react',
//     ['es2015', { modules: false }],
//     'stage-0',
//   ],
//   plugins: [
//     ['transform-react-jsx', { pragma: 'h' }],
//     ['transform-runtime'],
//   ],
// };

export default {
  entry    : 'src/client/index.js',
  dest     : 'public/js/main.min.js',
  format   : 'iife',
  sourceMap: true,
  plugins  : [
    css({ output: 'public/styles/styles.css' }),
    resolve({
      jsnext        : true,
      main          : true,
      browser       : true,
      preferBuiltins: false,
    }),
    eslint({
      exclude: [
        'src/client/styles/**',
      ],
    }),
    // babel(assign({
    //   exclude: 'node_modules/**',
    // }, babelrc)),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      '"react"': '"preact-compat"',
      '"react-dom"': '"preact-compat"',
      '\'react\'': '\'preact-compat\'',
      '\'react-dom\'': '\'preact-compat\'',
    }),
    commonjs(),
    inject({
      include: ['**/*.js', '**/*.jsx'],
      exclude: 'node_modules/**',
      
      h: ['preact', 'h'],
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};
