import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-2",
  // @ts-ignore
  endpoint: "http://localhost:8000",
});

export default AWS;
