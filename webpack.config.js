const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const modules = require('./config/modules');
const paths = require('./config/paths');
const getClientEnvironment = require('./config/env');
const InterpolateHtmlPlugin = require('./config/InterpolateHtmlPlugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const webpackDevClientEntry = require.resolve('./config/webpackHotDevClient');
const appDirectory = path.resolve(__dirname);

const nodeModuleImages = [
  '@react-navigation/elements',
  'react-native-paper',
  'aws-amplify-react-native',
  // ...additional
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const nodeModulesMjs = [
  '@aws-amplify',
  //   'aws-appsync',
  //   'aws-appsync-auth-link',
  // ...additional
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const compileNodeModules = [
  //   'react-native-lightbox',
  '@aws-amplify',
  'aws-amplify',
  'aws-amplify-react-native',
  //   'react-native-parsed-text',
  'react-native-vector-icons',
  'react-native-gesture-handler',
  'react-native-reanimated',
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

const appDir = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDir, relativePath);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

const appNodeModules = resolveApp('node_modules');

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  console.log('🚀 ~ !!!   isEnvProduction', paths.publicUrlOrPath);

  let plugins = [
    'react-native-web',
    // 'react-native-paper/babel',
    //  'transform-remove-console',
  ];

  if (isEnvProduction) {
    plugins.push('transform-remove-console');
  }

  const consolePlugin = isEnvProduction
    ? 'transform-remove-console'
    : undefined;

  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    //   devtool: isEnvDevelopment ? 'eval-cheap-source-map' : false,
    devtool: false,
    // devtool: 'eval-source-map',
    devServer: {
      open: true,
    },
    entry: isEnvDevelopment
      ? ['@babel/polyfill', webpackDevClientEntry, './src/index.web.js']
      : ['@babel/polyfill', './src/index.web.js'],
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
      publicPath: paths.publicUrlOrPath,
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, '/')
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      globalObject: 'this',
      //    filename: 'app.bundle.js',
    },
    resolve: {
      modules: ['node_modules', appNodeModules],
      extensions: moduleFileExtensions.map(ext => `.${ext}`),
      //   .filter((ext) => useTypeScript || !ext.includes("ts")),
      alias: {
        'react-native': 'react-native-web',
        // recyclerlistview: 'recyclerlistview/web',
        ...(modules.webpackAliases || {}),
      },
      plugins: [PnpWebpackPlugin],
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.gif$/, /\.svg$/, /\.jpe?g$/, /\.png$/],
              include: [
                path.resolve(__dirname, 'src/assets'),
                ...nodeModuleImages,
              ],
              use: {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'static/media/[name].[hash:8].[ext]',
                  esModule: false,
                },
              },
            },
            {
              test: /\.css$/,
              use: [
                {
                  loader: 'style-loader',
                },
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                  },
                },
              ],
            },
            {
              test: /\.ttf$/,
              include: [
                path.resolve(
                  __dirname,
                  'node_modules/react-native-vector-icons',
                ),
                path.resolve(__dirname, 'src/assets/fonts'),
              ],
              use: {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  esModule: false,
                },
              },
            },
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: [path.resolve(__dirname, 'src')],
              use: {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  configFile: false,
                  presets: [
                    'module:metro-react-native-babel-preset',
                    '@babel/preset-typescript',
                  ],
                  plugins: plugins,
                  cacheCompression: false,
                  compact: false,
                },
              },
            },
            {
              test: /\.mjs$/,
              include: [...nodeModulesMjs],
              type: 'javascript/auto',
              resolve: {
                fullySpecified: false,
              },
            },
            {
              test: /\.(js|mjs)$/,
              include: [...compileNodeModules],
              use: {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  configFile: false,
                  presets: [
                    '@babel/preset-react',
                    'module:metro-react-native-babel-preset',
                  ],
                  plugins: ['react-native-web', 'react-native-paper/babel'],
                  cacheDirectory: true,
                  cacheCompression: false,
                  compact: false,
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: isEnvProduction,
    },
    plugins: [
      isEnvDevelopment && new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined,
        ),
      ),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new webpack.DefinePlugin(env.stringified),
      new WebpackManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map'),
          );
          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      // new webpack.DefinePlugin({process: {env: {}}}),
      new webpack.DefinePlugin({
        // See: https://github.com/necolas/react-native-web/issues/349
        __DEV__: JSON.stringify(true),
      }),
    ].filter(Boolean),
    // Some libraries import Node modules but don't use them in the browser.
    // Tell webpack to provide empty mocks for them so importing them works.
    // node: {
    //   module: 'empty',
    //   dgram: 'empty',
    //   dns: 'mock',
    //   fs: 'empty',
    //   http2: 'empty',
    //   net: 'empty',
    //   tls: 'empty',
    //   child_process: 'empty',
    // },
    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
  };
};
