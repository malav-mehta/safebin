import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.AWS_REGION || "us-east-2",
});

export default AWS;
