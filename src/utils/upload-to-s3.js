import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIAURNPQOHOJNKO57FT",
  secretAccessKey: "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",
  region: "eu-central-1",
});
const s3 = new AWS.S3();

const uploadToS3 = async (imageData, userId) => {
  const params = {
    Bucket: "profilepics0711123953-dev",
    Key: `fullsize/${userId}.jpg`,
    Body: imageData,
    Metadata: {
      userId: userId,
    },
  };
  s3.putObject(params, (err, data) => {
    if (err) {
      console.error("Error uploading image to S3:", err);
    } else {
    }
  });
};

export default uploadToS3;
