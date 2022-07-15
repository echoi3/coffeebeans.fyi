import S3 from "aws-sdk/clients/s3";

import { COFFEBEANS_FYI_FILES } from "../constants";
import { s3bucket } from "../utils/aws/s3";

export const uploadToS3 = async (file: File | null, fileName: string): Promise<any> => {
  try {
    const params: S3.Types.PutObjectRequest = {
      Bucket: COFFEBEANS_FYI_FILES,
      Key: fileName,
      ContentType: file?.type as S3.Types.ContentType,
      Body: file as S3.Types.Body,

      // Make uploaded image "public" so that we can access it with url
      ACL: "public-read",
    };

    await s3bucket.putObject(params).promise();
  } catch (error) {
    console.log("Error uploading the asset to s3: ", error);
    throw error;
  }
};
