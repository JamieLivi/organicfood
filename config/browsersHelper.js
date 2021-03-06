/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

const defaultBrowsers = {
  production: ['>0.2%', 'not dead', 'not op_mini all'],
  development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version'],
};

function checkBrowsers(dir, isInteractive, retry = true) {
  return Promise.resolve(true);
  // const current = browserslist.loadConfig({ path: dir });
  // if (current != null) {
  //   return Promise.resolve(current);
  // }

  // if (!retry) {
  //   return Promise.reject(
  //     new Error(
  //       chalk.red(
  //         'As of react-scripts >=2 you must specify targeted browsers.'
  //       ) +
  //         os.EOL +
  //         `Please add a ${chalk.underline(
  //           'browserslist'
  //         )} key to your ${chalk.bold('package.json')}.`
  //     )
  //   );
  // }

  // return shouldSetBrowsers(isInteractive).then(shouldSetBrowsers => {
  //   if (!shouldSetBrowsers) {
  //     return checkBrowsers(dir, isInteractive, false);
  //   }

  //   return (
  //     pkgUp({ cwd: dir })
  //       .then(filePath => {
  //         if (filePath == null) {
  //           return Promise.reject();
  //         }
  //         const pkg = JSON.parse(fs.readFileSync(filePath));
  //         pkg['browserslist'] = defaultBrowsers;
  //         fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + os.EOL);

  //         browserslist.clearCaches();
  //         console.log();
  //         console.log(
  //           `${chalk.green('Set target browsers:')} ${chalk.cyan(
  //             defaultBrowsers.join(', ')
  //           )}`
  //         );
  //         console.log();
  //       })
  //       // Swallow any error
  //       .catch(() => {})
  //       .then(() => checkBrowsers(dir, isInteractive, false))
  //   );
  // });
}

module.exports = {defaultBrowsers, checkBrowsers};
