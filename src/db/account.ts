import DynamoDB from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from "uuid";

import { ACCOUNTS_TABLE } from "../constants";
import { Account } from "../types/account";
import { getDynamoDB } from "../utils/aws/dynamodb";

export const createAccount = async (
  account: Partial<Account>
): Promise<any> => {
  const dynamoDb = getDynamoDB();
  const Item: DynamoDB.DocumentClient.PutItemInputAttributeMap = {
    ...account,
    uuid: uuidv4(),
    beanPoint: "0",
  };
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: ACCOUNTS_TABLE,
    Item,
    ConditionExpression: "attribute_not_exists(publicAddress)", // will return an error if key already exists (prevents overwriting an item)
  };
  try {
    return await dynamoDb.put(params).promise();
  } catch (error) {
    throw error; // bubble up other error types
  }
};

export const getAllAccountEmails = async (): Promise<string[]> => {
  const dynamoDb = getDynamoDB();
  const data: DynamoDB.DocumentClient.ScanOutput = await dynamoDb
    .scan({ TableName: ACCOUNTS_TABLE })
    .promise();
  return data?.Items?.map((item) => item.email) as string[];
};
