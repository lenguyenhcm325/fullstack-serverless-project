/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
exports.handler = async (event, context) => {
  try {
    const sub = event.request.userAttributes.sub;
    const email = event.request.userAttributes.email;
    console.log("this is the userid ", sub);
    console.log("this is the userid ", sub);
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, "0");
    const day = String(currentTime.getDate()).padStart(2, "0");
    const currentDateString = `${day}/${month}/${year}`;
    const command = new PutCommand({
      TableName: "usersTable-dev",
      Item: {
        userId: sub,
        email: email,
        dateJoined: currentDateString,
      },
    });
    console.log({
      userId: sub,
      email,
      currentDateString,
    });

    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500, //what should i put here
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify("Internal Server Error!"),
    };
  }
};
