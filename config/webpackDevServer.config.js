'use strict';

const fs = require('fs');
const errorOverlayMiddleware = require('./errorOverlayMiddleware');
const evalSourceMapMiddleware = require('./evalSourceMapMiddleware');
//const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('./ignoredFiles');
const redirectServedPath = require('./redirectServedPathMiddleware');
const paths = require('./paths');
const getHttpsConfig = require('./getHttpsConfig');

const host = process.env.HOST || '0.0.0.0';
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = function (proxy, allowedHost) {
  return {
    allowedHosts: 'all',

    static: {
      directory: paths.appPublic,
      //staticOptions: {},
      publicPath: paths.publicUrlOrPath,
      watch: {
        ignored: ignoredFiles(paths.appSrc),
      },
      //   watch: true,
    },
    hot: true,
    webSocketServer: 'ws',
    open: false,
    compress: true,

    client: {
      logging: 'info',
      webSocketTransport: 'ws',
      // Can be used only for `errors`/`warnings`
      //
      // overlay: {
      //   errors: true,
      //   warnings: true,
      // }
      overlay: true,
      progress: true,
      webSocketURL: 'auto://0.0.0.0:0/ws',
      //   webSocketURL: allowedHost,
      // webSocketURL: {
      //   hostname: host,
      //   pathname: sockPath,
      //   port: sockPort,
      //   protocol: 'ws',
      //   // hostname: sockHost,
      //   // pathname: sockPath,
      //   // port: sockPort,
      // },
    },
    devMiddleware: {
      // index: true,
      // mimeTypes: { "text/html": ["phtml"] },
      publicPath: paths.publicUrlOrPath.slice(0, -1),
      // serverSideRender: true,
      // writeToDisk: true,
    },
    // watchOptions: {
    //   ignored: ignoredFiles(paths.appSrc),
    // },
    https: getHttpsConfig(),
    host,
    historyApiFallback: {
      disableDotRule: true,
      index: paths.publicUrlOrPath,
    },
    proxy,
    onBeforeSetupMiddleware: function (devServer) {
      //     console.log('🚀 ~ devServer', devServer);
      devServer.app.use(evalSourceMapMiddleware(devServer));
    },
    onAfterSetupMiddleware: function (devServer) {
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));
    },
  };
};
