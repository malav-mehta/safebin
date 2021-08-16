import AWS from "./aws";

const ddb = {
  root: new AWS.DynamoDB(),
  client: new AWS.DynamoDB.DocumentClient(),
};

export default ddb;
