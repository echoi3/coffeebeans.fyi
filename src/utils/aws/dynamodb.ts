import DynamoDB from "aws-sdk/clients/dynamodb";

import { REGION } from "../../constants";

const { REACT_APP_IAM_USER_KEY, REACT_APP_IAM_USER_SECRET } = process.env;

export const getDynamoDB = (): DynamoDB.DocumentClient =>
  new DynamoDB.DocumentClient({
    region: REGION,
    dynamoDbCrc32: false,
    credentials: {
      accessKeyId: REACT_APP_IAM_USER_KEY as string,
      secretAccessKey: REACT_APP_IAM_USER_SECRET as string,
    },
  });
