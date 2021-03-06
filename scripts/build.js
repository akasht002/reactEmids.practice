'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.env.REACT_APP_API_URL = "http://ch-sp-api.coreoflowsandbox.com:9008/api/";
process.env.REACT_APP_AUTH_URL = 'http://52.172.45.185:9005/';
process.env.REACT_APP_SR_URL = "http://52.172.45.185:9007/api/";
process.env.REACT_APP_UI_URL = 'http://localhost:3000/';
process.env.REACT_APP_MSG_URL = "http://52.172.45.185:9002/api/";
process.env.REACT_APP_ES_URL = 'http://52.172.45.185:9015/api/';
process.env.REACT_APP_TP_URL = 'http://localhost:63633/api/';
process.env.REACT_APP_SIGNALR_URL = 'http://52.172.45.185:9002/signalr';
process.env.REACT_APP_CARETEAM_URL = 'https://chqa-ct-api.coreoflowsandbox.com/api/';
process.env.REACT_APP_PATIENT_URL = 'https://chqa-gen-api.coreoflowsandbox.com/api/';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

let argv = process.argv.slice(2);

if (argv.includes('--qa')) {
  process.env.REACT_APP_API_URL = "https://chqa-sp-api.coreoflowsandbox.com/api/";
  process.env.REACT_APP_AUTH_URL = 'https://chqa-oauth-api.coreoflowsandbox.com/';
  process.env.REACT_APP_SR_URL = "https://chqa-ui.coreoflowsandbox.com/api/";
  process.env.REACT_APP_UI_URL = 'https://chqa-vp-api.coreoflowsandbox.com/';
  process.env.REACT_APP_MSG_URL = "https://chqa-vp-ui.coreoflowsandbox.com/api/";
  process.env.REACT_APP_ES_URL = 'https://chqa-ui.coreoflowsandbox.com/api/';
  process.env.REACT_APP_TP_URL = 'https://chqa-vp-ui.coreoflowsandbox.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://chqa-vp-ui.coreoflowsandbox.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://chqa-ct-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://chqa-gen-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_OKTA_URL = 'https://navvis.oktapreview.com/api/';
  process.env.REACT_APP_OKTA_ISSUER = 'https://navvis.oktapreview.com/oauth2/default';
  process.env.REACT_APP_OKTA_CLIENTID = '0oapkgs7l7D0elBoS0h7'
} else if (argv.includes('--dev')) {
  process.env.REACT_APP_API_URL = 'https://chdevdemo-sp-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_AUTH_URL = 'https://chdevdemo-oauth-api.coreoflowsandbox.com/';
  process.env.REACT_APP_SR_URL = 'https://chdevdemo-sr-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_UI_URL = 'https://chdevdemo-sp.coreoflowsandbox.com/';
  process.env.REACT_APP_MSG_URL = "https://chdevdemo-tp-api.coreoflowsandbox.com/api/";
  process.env.REACT_APP_ES_URL = 'https://chdevdemo-sr-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_TP_URL = 'https://chdevdemo-tp-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://chdevdemo-tp-api.coreoflowsandbox.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://chdevdemo-ct-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://chdevdemo-gen-api.coreoflowsandbox.com/api/';
} else if (argv.includes('--demo')) {
  process.env.REACT_APP_API_URL = 'https://chdemo-sp-api.coreodevserver.com/api/';
  process.env.REACT_APP_AUTH_URL = 'https://chdemo-oauth-api.coreodevserver.com/';
  process.env.REACT_APP_SR_URL = 'https://chdemo-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_UI_URL = 'https://chdemo-sp-ui.CoreoDevServer.com/';
  process.env.REACT_APP_MSG_URL = "https://chdemo-tp-api.coreodevserver.com/api/";
  process.env.REACT_APP_ES_URL = 'https://chdemo-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_TP_URL = 'https://chdemo-tp-api.coreodevserver.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://chdemo-tp-api.coreodevserver.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://chdemo-vp-api.CoreoDevServer.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://chdemo-gen-api.coreodevserver.com/api/';
} else if (argv.includes('--hmsademo')) {
  process.env.REACT_APP_API_URL = 'https://HMSADemo-sp-api.coreodevserver.com/api/';
  process.env.REACT_APP_AUTH_URL = 'https://HMSADemo-oauth-api.coreodevserver.com/';
  process.env.REACT_APP_SR_URL = 'https://HMSADemo-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_UI_URL = 'https://HMSADemo-sp.coreodevserver.com/';
  process.env.REACT_APP_MSG_URL = "https://HMSADemo-tp-api.coreodevserver.com/api/";
  process.env.REACT_APP_ES_URL = 'https://HMSADemo-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_TP_URL = 'https://HMSADemo-tp-api.coreodevserver.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://HMSADemo-tp-api.coreodevserver.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://HMSADemo-ct-api.coreodevserver.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://HMSADemo-gen-api.coreodevserver.com/api/';
} else if (argv.includes('--pftest')) {
  process.env.REACT_APP_API_URL = 'https://PFTest-sp-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_AUTH_URL = 'https://PFTest-oauth-api.coreoflowsandbox.com/';
  process.env.REACT_APP_SR_URL = 'https://PFTest-sr-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_UI_URL = 'https://PFTest-sp.coreoflowsandbox.com/';
  process.env.REACT_APP_MSG_URL = "https://PFTest-tp-api.coreoflowsandbox.com/api/";
  process.env.REACT_APP_ES_URL = 'https://PFTest-sr-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_TP_URL = 'https://PFTest-tp-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://PFTest-tp-api.coreoflowsandbox.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://PFTest-ct-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://PFTest-gen-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_OKTA_URL = 'https://navvis.oktapreview.com/api/';
  process.env.REACT_APP_OKTA_ISSUER = 'https://navvis.oktapreview.com/oauth2/default';
  process.env.REACT_APP_OKTA_CLIENTID = '0oapkgs7l7D0elBoS0h7'
} else if (argv.includes('--uat')) {
  process.env.REACT_APP_API_URL = 'https://uat-sp-api.coreodevserver.com/api/';
  process.env.REACT_APP_AUTH_URL = 'https://uat-oauth-api.coreodevserver.com/';
  process.env.REACT_APP_SR_URL = 'https://uat-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_UI_URL = 'https://uat-sp.coreodevserver.com/';
  process.env.REACT_APP_MSG_URL = "https://uat-tp-api.coreodevserver.com/api/";
  process.env.REACT_APP_ES_URL = 'https://uat-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_TP_URL = 'https://uat-tp-api.coreodevserver.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://uat-tp-api.coreodevserver.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://uat-ct-api.coreodevserver.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://uat-gen-api.coreodevserver.com/api/';
} else if (argv.includes('--hmsauat')) {
  process.env.REACT_APP_API_URL = 'https://HMSA-UAT-sp-api.coreodevserver.com/api/';
  process.env.REACT_APP_AUTH_URL = 'https://HMSA-UAT-oauth-api.coreodevserver.com/';
  process.env.REACT_APP_SR_URL = 'https://HMSA-UAT-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_UI_URL = 'https://HMSA-UAT-sp.coreodevserver.com/';
  process.env.REACT_APP_MSG_URL = "https://HMSA-UAT-tp-api.coreodevserver.com/api/";
  process.env.REACT_APP_ES_URL = 'https://HMSA-UAT-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_TP_URL = 'https://HMSA-UAT-tp-api.coreodevserver.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://HMSA-UAT-tp-api.coreodevserver.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://HMSA-UAT-ct-api.coreodevserver.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://HMSA-UAT-gen-api.coreodevserver.com/api/';
}

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.prod');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appBuild)
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild);
    // Merge with the public folder
    copyPublicFolder();
    // Start the webpack build
    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          '\nSearch for the ' +
          chalk.underline(chalk.yellow('keywords')) +
          ' to learn more about each warning.'
        );
        console.log(
          'To ignore, add ' +
          chalk.cyan('// eslint-disable-next-line') +
          ' to the line before.\n'
        );
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrl;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      );
    },
    err => {
      console.log(chalk.red('Failed to compile.\n'));
      printBuildError(err);
      process.exit(1);
    }
  );

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log('Creating an optimized production build...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });
}
