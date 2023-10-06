import AWS from "aws-sdk";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
AWS.config.update({
  accessKeyId: "AKIAURNPQOHOF7WJSG3X",
  secretAccessKey: "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",
  region: "eu-central-1",
});
const s3 = new AWS.S3();

// const client = new S3Client({
//   region: "eu-central-1",
//   credentials,
// });

const uploadToS3 = async (imageData, userId) => {
  const params = {
    Bucket: "profilepics0711123953-dev",
    Key: `thumbnail/${userId}.jpg`,
    Body: imageData,
    Metadata: {
      userId: userId,
    },
  };
  s3.putObject(params, (err, data) => {
    if (err) {
      console.error("Error uploading image to S3:", err);
    } else {
      console.log("Image uploaded to S3:", data);
    }
  });
};

export default uploadToS3;
