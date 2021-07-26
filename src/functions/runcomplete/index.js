const AWS = require('aws-sdk');
const ecs = new AWS.ECS();
const ec2 = new AWS.EC2();
const isLocal = !!process.env.AWS_SAM_LOCAL || !process.env.LAMBDA_TASK_ROOT;
exports.handler = async (event, context) => {

    let response = {
        statusCode: 200,
        body: JSON.stringify({"message": "could not complete"}),
    };

    let subnets = [];

    try {
        let subnetsData = await new Promise((accept, reject) => {
            ec2.describeSubnets({}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    accept(data.Subnets);
                }
            });
        });

        subnetsData = subnetsData.slice(0,3);
        for (let i in subnetsData) {
            subnets.push(subnetsData[i].SubnetId);
        }
    }
    catch(err) {
        console.error(err);
        response.body = err;
        return response;
    }

    var params = {
        cluster: process.env.ECS_CLUSTER,
        taskDefinition: process.env.ECS_TASKDEF.split('/')[1],
        launchType: 'FARGATE',
        networkConfiguration: {
            awsvpcConfiguration: {
                subnets: subnets,
                assignPublicIp: 'ENABLED', // Somehow necessary to get "credentials" from ECS to run
            }
        },
    };

    try {
        await new Promise((accept, reject) => {
            ecs.runTask(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(data);
                    response.body = data;
                    accept(data);
                }
            });
        });
    }
    catch(err) {
        console.error(err);
        response.body = err;
    }

    return response;
}