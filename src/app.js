const cypress = require('cypress');
const child_process = require("child_process");

exports.handler = async (event) => {

    process.env.DEBUG = "cypress:*";
    process.env.ELECTRON_EXTRA_LAUNCH_ARGS = [
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--disable-gpu',
        '--user-data-dir=/tmp/user-data',
        '--data-path=/tmp/data-path',
        '--homedir=/tmp',
        '--disk-cache-dir=/tmp/cache-dir',
        "–-flag-switches-begin –-enable-webgl-draft-extensions –-ignore-gpu-blocklist –-flag-switches-end",
    ].join(" ");

    process.env.XDG_CONFIG_HOME = "/tmp"; //  https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname

    runCommand("mkdir /tmp/chrome-user-data");
    runCommand("nohup Xvfb :99 &>/dev/null &");
    runCommand("mkdir /tmp/shm");

    const {httpMethod, path} = event;

    let response = {
        statusCode: 500,
        body: JSON.stringify({"error": "could not finish"}),
    }
    await cypress.run({
        browser: 'electron',
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
