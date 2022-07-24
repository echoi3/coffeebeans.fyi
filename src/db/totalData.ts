import DynamoDB from "aws-sdk/clients/dynamodb";

import { TOTAL_DATA_TABLE, TOTAL_DATA_TABLE_UUID } from "src/constants";
import { getDynamoDB } from "src/utils/aws/dynamodb";
import { strHasLength } from "src/utils/strings";

export const getNumTotalComments = async (id: string): Promise<string> => {
  if (strHasLength(id)) {
    const dynamoDb = getDynamoDB();
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: TOTAL_DATA_TABLE,
      Key: {
        uuid: id,
      },
    };
    const data: DynamoDB.DocumentClient.GetItemOutput = await dynamoDb.get(params).promise();
    return (data.Item as any)?.numTotalComments as string;
  } else {
    throw new Error("Content not found");
  }
};

export const getNumTotalBeanContents = async (id: string): Promise<string> => {
  if (strHasLength(id)) {
    const dynamoDb = getDynamoDB();
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: TOTAL_DATA_TABLE,
      Key: {
        uuid: id,
      },
    };
    const data: DynamoDB.DocumentClient.GetItemOutput = await dynamoDb.get(params).promise();
    return (data.Item as any)?.numTotalBeans as string;
  } else {
    throw new Error("Content not found");
  }
};

export const getNumTotalCompanies = async (id: string): Promise<string> => {
  if (strHasLength(id)) {
    const dynamoDb = getDynamoDB();
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: TOTAL_DATA_TABLE,
      Key: {
        uuid: id,
      },
    };
    const data: DynamoDB.DocumentClient.GetItemOutput = await dynamoDb.get(params).promise();
    return (data.Item as any)?.numTotalCompanies as string;
  } else {
    throw new Error("Content not found");
  }
};

export const updateNumTotalComments = async (): Promise<any> => {
  const dynamoDb = getDynamoDB();

  const currentNumTotalComments: string = await getNumTotalComments(TOTAL_DATA_TABLE_UUID);
  const newNumTotalComments = (Number(currentNumTotalComments) + 1).toString();

  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: TOTAL_DATA_TABLE,
    Key: {
      uuid: TOTAL_DATA_TABLE_UUID,
    },
    UpdateExpression: "SET numTotalComments = :newNumTotalComments",
    ExpressionAttributeValues: {
      ":newNumTotalComments": newNumTotalComments,
    },
  };

  try {
    return await dynamoDb.update(params).promise();
  } catch (error) {
    throw error; // bubble up other error types
  }
};

export const updateNumTotalBeanContents = async (): Promise<any> => {
  const dynamoDb = getDynamoDB();

  const currentNumTotalBeans: string = await getNumTotalBeanContents(TOTAL_DATA_TABLE_UUID);
  const newNumTotalBeans = (Number(currentNumTotalBeans) + 1).toString();

  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: TOTAL_DATA_TABLE,
    Key: {
      uuid: TOTAL_DATA_TABLE_UUID,
    },
    UpdateExpression: "SET numTotalBeans = :newNumTotalBeans",
    ExpressionAttributeValues: {
      ":newNumTotalBeans": newNumTotalBeans,
    },
  };

  try {
    return await dynamoDb.update(params).promise();
  } catch (error) {
    throw error; // bubble up other error types
  }
};

export const updateNumTotalCompanies = async (): Promise<any> => {
  const dynamoDb = getDynamoDB();

  const currentNumTotalCompanies: string = await getNumTotalCompanies(TOTAL_DATA_TABLE_UUID);
  const newNumTotalCompanies = (Number(currentNumTotalCompanies) + 1).toString();

  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: TOTAL_DATA_TABLE,
    Key: {
      uuid: TOTAL_DATA_TABLE_UUID,
    },
    UpdateExpression: "SET numTotalCompanies = :newNumTotalCompanies",
    ExpressionAttributeValues: {
      ":newNumTotalCompanies": newNumTotalCompanies,
    },
  };

  try {
    return await dynamoDb.update(params).promise();
  } catch (error) {
    throw error; // bubble up other error types
  }
};
