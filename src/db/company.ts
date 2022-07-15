import DynamoDB from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from "uuid";

import { COMPANIES_TABLE, CONTENTS_TABLE } from "src/constants";

import { BeanContent } from "src/types/beanContent";
import { getDynamoDB } from "src/utils/aws/dynamodb";
import { strHasLength } from "src/utils/strings";
import { Company, CompanyTypes } from "src/types/company";

export const createCompany = async (company: Partial<Company>): Promise<any> => {
  const dynamoDb = getDynamoDB();

  const Item: DynamoDB.DocumentClient.PutItemInputAttributeMap = {
    ...company,
    uuid: uuidv4(),
    accountType: CompanyTypes.FREE,
  };

  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: COMPANIES_TABLE,
    Item,
    ConditionExpression: "attribute_not_exists(publicAddress)", // will return an error if key already exists (prevents overwriting an item)
  };

  try {
    return await dynamoDb.put(params).promise();
  } catch (error) {
    throw error; // bubble up other error types
  }
};

export const getAllCompanies = async (): Promise<string[]> => {
  const dynamoDb = getDynamoDB();
  const data: DynamoDB.DocumentClient.ScanOutput = await dynamoDb.scan({ TableName: COMPANIES_TABLE }).promise();
  return data?.Items?.map(item => item.companyName) as string[];
};
