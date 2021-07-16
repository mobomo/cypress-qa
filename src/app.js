const cypress = require('cypress');

exports.handler = async (event) => {
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
