import DynamoDB from "aws-sdk/clients/dynamodb";
import { CONTENTS_TABLE } from "src/constants";

import { BeanContent } from "src/types/beanContent";
import { getDynamoDB } from "src/utils/aws/dynamodb";
import { strHasLength } from "src/utils/strings";

export const getAllBeanContents = async (): Promise<BeanContent[]> => {
  const dynamoDb = getDynamoDB();
  const data: DynamoDB.DocumentClient.ScanOutput = await dynamoDb.scan({ TableName: CONTENTS_TABLE }).promise();
  return data.Items as BeanContent[];
};

export const getBeanContentById = async (id: string): Promise<BeanContent> => {
  if (strHasLength(id)) {
    const dynamoDb = getDynamoDB();
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: CONTENTS_TABLE,
      Key: {
        uuid: id,
      },
    };
    const data: DynamoDB.DocumentClient.GetItemOutput = await dynamoDb.get(params).promise();
    return data.Item as BeanContent;
  } else {
    throw new Error("Content not found");
  }
};

export const getBeanContentByBeanName = async (beanName: string): Promise<BeanContent> => {
  if (strHasLength(beanName)) {
    const dynamoDb = getDynamoDB();
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: CONTENTS_TABLE,
      Key: {
        beanName,
      },
    };
    const data: DynamoDB.DocumentClient.GetItemOutput = await dynamoDb.get(params).promise();
    return data.Item as BeanContent;
  } else {
    throw new Error("Content not found");
  }
};
