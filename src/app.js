exports.handler = async (event) => {

    process.chdir('/tmp');

    const cypress = require('cypress');

    process.env.DEBUG = "cypress:*";
    process.env.ELECTRON_EXTRA_LAUNCH_ARGS = [
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
    ].join(" ");

    process.env.XDG_CONFIG_HOME = "/tmp"; //  https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname

    if (!fileExists('/tmp/chrome-user-data')) {
        runCommand("mkdir /tmp/chrome-user-data");
    }
    if (!fileExists('/tmp/shm')) {
        runCommand("mkdir /tmp/shm");
    }
    if (!fileExists('/tmp/node_modules')) {
        runCommand("cp -R /app/node_modules /tmp/node_modules");
    }

    runCommand("cp /app/cypress.json /tmp/cypress.json");
    runCommand("cp -R /app/cypress /tmp/cypress");

    const {httpMethod, path} = event;

    let response = {
        statusCode: 500,
        body: JSON.stringify({"error": "could not finish"}),
    }

    // Cypress for some reason checks for write access to /var/task
    await cypress.run({
        browser: 'chromium',
        ignoreTestFiles: ["*.js", "*.md"],
        reporter: "junit",
        reporterOptions: {
            "mochaFile": "test-results/test-output-[hash].xml"
        },
        config: {
            "baseUrl": "https://www.pandemicoversight.gov",
            "ignoreTestFiles": ["*.js", "*.md"],
            "reporter": "junit",
            "reporterOptions": {
                "mochaFile": "test-results/test-output-[hash].xml"
            },
            "chromeWebSecurity": false
        },
        headed: false,
        headless: true,
        spec: 'cypress/integration/**/*.feature'
    }).then((results) => {
        response = {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    }).catch((err) => {
        console.error(err)
    })

    return response;
}

const runCommand = (command) => {
    const child_process = require("child_process");

    console.log("Running ", command);
    try {
        child_process.execSync(command, {
            stdio: "inherit",
        });
    } catch (e) {
        console.log("Error");
        console.warn(e);
    }
};

const fileExists = (file) => {
    const fs = require('fs');

    try {
        fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (err) {
        return false;
    }
}