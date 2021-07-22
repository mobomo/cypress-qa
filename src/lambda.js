const AWS = require('aws-sdk');
const cypress = require('cypress');
const child_process = require("child_process");
const isLocal = process.env.AWS_SAM_LOCAL || !!process.env.LAMBDA_TASK_ROOT;

exports.handler = async (event, context) => {

    setup();

    // Get our temp location for the test specs.
    let specLocation = context.awsRequestId ?? 'default';

    process.env.DEBUG = "cypress:*";
    // Needed for the Cypress binary to work prior to starting tests.
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
    }).then(async (results) => {
        response = {
            statusCode: 200,
            body: JSON.stringify(results),
        };

        if (isLocal && fileExists('/video')) {
            runCommand("cp -R /tmp/tests/cypress/videos/prac/*.mp4 /video/");
        }
        else {
            AWS.config.update({region: 'us-east-1'});
            var s3 = new AWS.S3({apiVersion: '2006-03-01'});

            var uploadParams = {Bucket: 'qa-cypress-testresultbucket-stvmqxwbibbt', Key: '', Body: ''};
            var file = '/tmp/tests/cypress/videos/prac/testcase.feature.mp4';

            // Configure the file stream and obtain the upload parameters
            var fs = require('fs');
            var fileStream = fs.createReadStream(file);
            fileStream.on('error', function(err) {
                console.log('File Error', err);
            });
            uploadParams.Body = fileStream;
            var path = require('path');
            uploadParams.Key = path.basename(file);

            // call S3 to retrieve upload file to specified bucket

            await new Promise((accept,reject) => {
                s3.upload(uploadParams, function (err, data) {
                    if (err) {
                        console.log("Error", err);
                        accept();
                    }
                    if (data) {
                        console.log("Upload Success", data.Location);
                        reject();
                    }
                });
            });
        }
    }).catch((err) => {
        console.error(err)
    })

    return response;
}

const runCommand = (command) => {

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

function setup() {
    if (!fileExists('/tmp/tests')) {
        runCommand("mkdir /tmp/tests");
    }

    process.chdir('/tmp/tests');

    // Setup files to run in Lambda temp space
    if (!fileExists('/tmp/chrome-user-data')) {
        runCommand("mkdir /tmp/chrome-user-data");
    }
    if (!fileExists('/tmp/shm')) {
        runCommand("mkdir /tmp/shm");
    }
    if (!fileExists('/tmp/tests/node_modules')) {
        runCommand("cp -R /app/node_modules /tmp/tests/node_modules");
        runCommand("cp /app/cypress.json /tmp/tests/cypress.json");
        runCommand("cp /app/package.json /tmp/tests/package.json");
        runCommand("cp /app/package-lock.json /tmp/tests/package-lock.json");
    }

    runCommand("cp -R /app/cypress /tmp/tests/cypress");
}