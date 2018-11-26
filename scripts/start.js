'use strict'

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

process.env.REACT_APP_API_URL = 'https://PFTest-sp-api.coreoflowsandbox.com/api/';
process.env.REACT_APP_AUTH_URL = 'http://localhost:5000/';
process.env.REACT_APP_SR_URL = 'https://PFTest-sr-api.coreoflowsandbox.com/api/';
process.env.REACT_APP_UI_URL = 'http://localhost:3000/#/';
process.env.REACT_APP_MSG_URL = "https://PFTest-tp-api.coreoflowsandbox.com/api/";
process.env.REACT_APP_ES_URL = 'https://PFTest-sr-api.coreoflowsandbox.com/api/';
process.env.REACT_APP_TP_URL = 'https://PFTest-tp-api.coreoflowsandbox.com/api/';
process.env.REACT_APP_SIGNALR_URL = 'https://PFTest-tp-api.coreoflowsandbox.com/signalr';
process.env.REACT_APP_CARETEAM_URL = 'https://PFTest-ct-api.coreoflowsandbox.com/api/';
process.env.REACT_APP_PATIENT_URL = 'https://PFTest-gen-api.coreoflowsandbox.com/api/';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

let argv = process.argv.slice(2)

if (argv.includes('--qa')) {
  process.env.REACT_APP_API_URL = "https://chqa-sp-api.coreoflowsandbox.com/api/";
  process.env.REACT_APP_AUTH_URL = 'http://localhost:5000/';
  process.env.REACT_APP_SR_URL = "https://chqa-ui.coreoflowsandbox.com/api/";
  process.env.REACT_APP_UI_URL = 'http://localhost:3000/#/';
  process.env.REACT_APP_MSG_URL = "https://chqa-vp-ui.coreoflowsandbox.com/api/";
  process.env.REACT_APP_ES_URL = 'https://chqa-ui.coreoflowsandbox.com/api/';
  process.env.REACT_APP_TP_URL = 'https://chqa-vp-ui.coreoflowsandbox.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://chqa-vp-ui.coreoflowsandbox.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://chqa-ct-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://chqa-gen-api.coreoflowsandbox.com/api/';
} else if (argv.includes('--dev')) {
  process.env.REACT_APP_API_URL = 'https://chdevdemo-sp-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_AUTH_URL = 'http://localhost:5000/';
  process.env.REACT_APP_SR_URL = 'https://chdevdemo-sr-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_UI_URL = 'http://localhost:3000/#/';
  process.env.REACT_APP_MSG_URL = "https://chdevdemo-tp-api.coreoflowsandbox.com/api/";
  process.env.REACT_APP_ES_URL = 'https://chdevdemo-sr-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_TP_URL = 'https://chdevdemo-tp-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://chdevdemo-tp-api.coreoflowsandbox.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://chdevdemo-ct-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://chdevdemo-gen-api.coreoflowsandbox.com/api/';
} else if (argv.includes('--demo')) {
  process.env.REACT_APP_API_URL = 'https://chdemo-sp-api.coreodevserver.com/api/';
  process.env.REACT_APP_AUTH_URL = 'http://localhost:5000/';
  process.env.REACT_APP_SR_URL = 'https://chdemo-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_UI_URL = 'http://localhost:3000/#/';
  process.env.REACT_APP_MSG_URL = "https://chdemo-tp-api.coreodevserver.com/api/";
  process.env.REACT_APP_ES_URL = 'https://chdemo-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_TP_URL = 'https://chdemo-tp-api.coreodevserver.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://chdemo-tp-api.coreodevserver.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://chdemo-vp-api.CoreoDevServer.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://chdemo-gen-api.coreodevserver.com/api/';
} else if (argv.includes('--hmsademo')) {
  process.env.REACT_APP_API_URL = 'https://HMSADemo-sp-api.coreodevserver.com/api/';
  process.env.REACT_APP_AUTH_URL = 'http://localhost:5000/';
  process.env.REACT_APP_SR_URL = 'https://HMSADemo-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_UI_URL = 'http://localhost:3000/#/';
  process.env.REACT_APP_MSG_URL = "https://HMSADemo-tp-api.coreodevserver.com/api/";
  process.env.REACT_APP_ES_URL = 'https://HMSADemo-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_TP_URL = 'https://HMSADemo-tp-api.coreodevserver.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://HMSADemo-tp-api.coreodevserver.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://HMSADemo-ct-api.coreodevserver.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://HMSADemo-gen-api.coreodevserver.com/api/';
} else if (argv.includes('--pftest')) {
  process.env.REACT_APP_API_URL = 'https://PFTest-sp-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_AUTH_URL = 'http://localhost:5000/';
  process.env.REACT_APP_SR_URL = 'https://PFTest-sr-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_UI_URL = 'http://localhost:3000/#/';
  process.env.REACT_APP_MSG_URL = "https://PFTest-tp-api.coreoflowsandbox.com/api/";
  process.env.REACT_APP_ES_URL = 'https://PFTest-sr-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_TP_URL = 'https://PFTest-tp-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://PFTest-tp-api.coreoflowsandbox.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://PFTest-ct-api.coreoflowsandbox.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://PFTest-gen-api.coreoflowsandbox.com/api/';
} else if (argv.includes('--uat')) {
  process.env.REACT_APP_API_URL = 'https://uat-sp-api.coreodevserver.com/api/';
  process.env.REACT_APP_AUTH_URL = 'https://uat-oauth-api.coreodevserver.com/';
  process.env.REACT_APP_SR_URL = 'https://uat-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_UI_URL = 'https://uat-sp.coreodevserver.com/#/';
  process.env.REACT_APP_MSG_URL = "https://uat-tp-api.coreodevserver.com/api/";
  process.env.REACT_APP_ES_URL = 'https://uat-sr-api.coreodevserver.com/api/';
  process.env.REACT_APP_TP_URL = 'https://uat-tp-api.coreodevserver.com/api/';
  process.env.REACT_APP_SIGNALR_URL = 'https://uat-tp-api.coreodevserver.com/signalr';
  process.env.REACT_APP_CARETEAM_URL = 'https://uat-ct-api.coreodevserver.com/api/';
  process.env.REACT_APP_PATIENT_URL = 'https://uat-gen-api.coreodevserver.com/api/';
}

// Ensure environment variables are read.
require('../config/env')

const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
const paths = require('../config/paths')
const config = require('../config/webpack.config.dev')
const createDevServerConfig = require('../config/webpackDevServer.config')

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(chalk.bold(process.env.HOST))}`
    )
  )
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  )
  console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`)
  console.log()
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `choosePort()` Promise resolves to the next free port.
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const appName = require(paths.appPackageJson).name
    const urls = prepareUrls(protocol, HOST, port)
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler(webpack, config, appName, urls, useYarn)
    // Load proxy config
    const proxySetting = require(paths.appPackageJson).proxy
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic)
    // Serve webpack assets generated by the compiler over a web sever.
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    )
    const devServer = new WebpackDevServer(compiler, serverConfig)
    // Launch WebpackDevServer.
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err)
      }
      if (isInteractive) {
        clearConsole()
      }
      console.log(chalk.cyan('Starting the development server...\n'))
      openBrowser(urls.localUrlForBrowser)
    })

      ;['SIGINT', 'SIGTERM'].forEach(function (sig) {
        process.on(sig, function () {
          devServer.close()
          process.exit()
        })
      })
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })