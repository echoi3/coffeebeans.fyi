import DynamoDB from "aws-sdk/clients/dynamodb";
import { Comment } from "src/types/comment";
import { strHasLength } from "src/utils/strings";
import { v4 as uuidv4 } from "uuid";

import { ACCOUNTS_TABLE } from "../constants";
import { Account } from "../types/account";
import { getDynamoDB } from "../utils/aws/dynamodb";

export const createAccount = async (account: Partial<Account>): Promise<any> => {
  const dynamoDb = getDynamoDB();
  const Item: DynamoDB.DocumentClient.PutItemInputAttributeMap = {
    ...account,
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
  const data: DynamoDB.DocumentClient.ScanOutput = await dynamoDb.scan({ TableName: ACCOUNTS_TABLE }).promise();
  return data?.Items?.map(item => item.email) as string[];
};

export const getUserCommentsById = async (id: string): Promise<Comment[]> => {
  if (strHasLength(id)) {
    const dynamoDb = getDynamoDB();
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: ACCOUNTS_TABLE,
      Key: {
        uuid: id,
      },
    };
    const data: DynamoDB.DocumentClient.GetItemOutput = await dynamoDb.get(params).promise();
    return (data.Item as any).comments ?? ([] as Comment[]);
  } else {
    throw new Error("Content not found");
  }
};
export const addCommentOnAccount = async (userUUID: string, newComments: Comment[]): Promise<any> => {
  const dynamoDb = getDynamoDB();

  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: ACCOUNTS_TABLE,
    Key: {
      uuid: userUUID, // uuid of the user object
    },
    UpdateExpression: "SET comments = :newComments",
    ExpressionAttributeValues: {
      ":newComments": newComments,
    },
  };

  try {
    return await dynamoDb.update(params).promise();
  } catch (error) {
    throw error; // bubble up other error types
  }
};
