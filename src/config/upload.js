const aws = require('aws-sdk');
const AppError = require('../errors/AppError');
const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

const uploadFile = async (path, buffer, mimetype) => {
  const file = await s3
    .upload({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();
  return { url: file.Location, path: file.Key };
};

const deleteFile = async (path) => {
  try {
    await s3
      .deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path,
      })
      .promise();
  } catch (error) {
    throw new AppError('Delete image fail.', 500);
  }
};

module.exports = { uploadFile, deleteFile };
