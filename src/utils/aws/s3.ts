import * as AWS from "aws-sdk";

import { REGION } from "../../constants";

const { REACT_APP_IAM_USER_KEY, REACT_APP_IAM_USER_SECRET } = process.env;

export const s3bucket = new AWS.S3({
  accessKeyId: REACT_APP_IAM_USER_KEY,
  secretAccessKey: REACT_APP_IAM_USER_SECRET,
  region: REGION,
});
