const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const apigw = new AWS.ApiGatewayManagementApi({
    endpoint: process.env.WEBSOCKET_ENDPOINT
});

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const message = body.data;

    const connectionId = event.requestContext.connectionId;

    // Save message to DynamoDB (optional)
    await ddb.put({
        TableName: process.env.CHAT_TABLE,
        Item: {
            id: Date.now().toString(),
            connectionId: connectionId,
            message: message
        }
    }).promise();

    // Fetch all connection IDs
    const connections = await ddb.scan({
        TableName: process.env.CHAT_TABLE,
        ProjectionExpression: 'connectionId'
    }).promise();

    // Send message to all connections
    const sendMessages = connections.Items.map(async ({ connectionId }) => {
        try {
            await apigw.postToConnection({
                ConnectionId: connectionId,
                Data: message
            }).promise();
        } catch (e) {
            console.error(`Failed to send message to ${connectionId}`, e);
        }
    });

    await Promise.all(sendMessages);

    return {
        statusCode: 200,
        body: 'Message sent.'
    };
};
