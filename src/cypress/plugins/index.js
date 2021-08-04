// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const pluginExecuteCommand = require('./plugin-execute-command');
const cucumber = require('cypress-cucumber-preprocessor').default;
const isLambda = process.env.AWS_SAM_LOCAL || !!process.env.LAMBDA_TASK_ROOT;

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  on('task', {
    pluginExecuteCommand,
  });

  on("after:run", function() {
    console.log("hello");
  });

  on("before:browser:launch", (browser = {}, launchOptions) => {

    if (isLambda) {
      let flags = [
        '--allow-running-insecure-content', // https://source.chromium.org/search?q=lang:cpp+symbol:kAllowRunningInsecureContent&ss=chromium
        '--autoplay-policy=user-gesture-required', // https://source.chromium.org/search?q=lang:cpp+symbol:kAutoplayPolicy&ss=chromium
        '--disable-component-update', // https://source.chromium.org/search?q=lang:cpp+symbol:kDisableComponentUpdate&ss=chromium
        '--disable-domain-reliability', // https://source.chromium.org/search?q=lang:cpp+symbol:kDisableDomainReliability&ss=chromium
        '--disable-features=AudioServiceOutOfProcess,IsolateOrigins,site-per-process', // https://source.chromium.org/search?q=file:content_features.cc&ss=chromium
        '--disable-print-preview', // https://source.chromium.org/search?q=lang:cpp+symbol:kDisablePrintPreview&ss=chromium
        '--disable-setuid-sandbox', // https://source.chromium.org/search?q=lang:cpp+symbol:kDisableSetuidSandbox&ss=chromium
        '--disable-site-isolation-trials', // https://source.chromium.org/search?q=lang:cpp+symbol:kDisableSiteIsolation&ss=chromium
        '--disable-speech-api', // https://source.chromium.org/search?q=lang:cpp+symbol:kDisableSpeechAPI&ss=chromium
        '--disable-web-security', // https://source.chromium.org/search?q=lang:cpp+symbol:kDisableWebSecurity&ss=chromium
        '--disk-cache-size=33554432', // https://source.chromium.org/search?q=lang:cpp+symbol:kDiskCacheSize&ss=chromium
        '--enable-features=SharedArrayBuffer', // https://source.chromium.org/search?q=file:content_features.cc&ss=chromium
        '--hide-scrollbars', // https://source.chromium.org/search?q=lang:cpp+symbol:kHideScrollbars&ss=chromium
        '--ignore-gpu-blocklist', // https://source.chromium.org/search?q=lang:cpp+symbol:kIgnoreGpuBlocklist&ss=chromium
        '--in-process-gpu', // https://source.chromium.org/search?q=lang:cpp+symbol:kInProcessGPU&ss=chromium
        '--mute-audio', // https://source.chromium.org/search?q=lang:cpp+symbol:kMuteAudio&ss=chromium
        '--no-default-browser-check', // https://source.chromium.org/search?q=lang:cpp+symbol:kNoDefaultBrowserCheck&ss=chromium
        '--no-pings', // https://source.chromium.org/search?q=lang:cpp+symbol:kNoPings&ss=chromium
        '--no-sandbox', // https://source.chromium.org/search?q=lang:cpp+symbol:kNoSandbox&ss=chromium
        '--no-zygote', // https://source.chromium.org/search?q=lang:cpp+symbol:kNoZygote&ss=chromium
        '--use-gl=swiftshader', // https://source.chromium.org/search?q=lang:cpp+symbol:kUseGl&ss=chromium
        '--single-process',
      ];
      // Disable shared memory when run headless since most CI environment do not support that
      if (browser.name === "chromium" || browser.name === "chrome") {
        for (let i in flags) {
          if (!launchOptions.args.includes(flags[i])) {
            launchOptions.args.push(flags[i]);
          }
        }
        console.log("ADDED CHROMIUM ARGS");
      }
    }
    else {
      if (browser.name === 'electron') {
        // launchOptions.preferences.fullscreen = true;
        // launchOptions.preferences.fullscreenable = false;
        //launchOptions.preferences.maximizable = true;
        launchOptions.preferences.maximized = true;
        // launchOptions.preferences.width = 1920;
        // launchOptions.preferences.height = 1080;
      }
    }

    return launchOptions;
  });

  // on("before:browser:launch", (browser = {}, args) => {
  //   // Disable shared memory when run headless since most CI environment do not support that
  //   if (config.env.headless && browser.name === "chrome") {
  //     args.push("--disable-dev-shm-usage");
  //     args.push("--disable-gpu");
  //     args.push("--disable-software-rasterizer");
  //     args.push("--single-process");
  //     args.push("--no-zygote");
  //     args.push("--no-sandbox");
  //   } else if (config.env.headless && browser.name === "electron") {
  //     args["disable-dev-shm-usage"] = true;
  //     args["disable-gpu"] = true;
  //     args["disable-software-rasterizer"] = true;
  //     args["single-process"] = true;
  //     args["no-zygote"] = true;
  //     args["no-sandbox"] = true;
  //   }
  // });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  //return cypressConfigResolver();

  return config;
};
