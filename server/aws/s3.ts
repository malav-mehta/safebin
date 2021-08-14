import AWS from "./aws";

const s3 = {
  root: new AWS.S3({
    apiVersion: process.env.AWS_S3_API_VERSION,
    endpoint: process.env.AWS_S3_ENDPOINT,
  }),
};

export default s3;
