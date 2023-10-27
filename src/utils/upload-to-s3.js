import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
});
const s3 = new AWS.S3();

const uploadToS3 = async (imageData, userId) => {
  const params = {
    Bucket: import.meta.env.VITE_S3_PROFILE_PICS_BUCKET,
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
