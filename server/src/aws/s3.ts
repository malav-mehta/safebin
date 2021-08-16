import AWS from "./aws";

const s3 = {
  root: new AWS.S3({
    apiVersion: process.env.AWS_S3_API_VERSION || "2006-03-11",
  }),
};

export default s3;
