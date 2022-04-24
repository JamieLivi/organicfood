/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');

module.exports = {
  resetCache: false,
  resolver: {
    platforms: ['ios', 'android'],
    blacklistRE: exclusionList([/\/amplify\/.*/]),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
