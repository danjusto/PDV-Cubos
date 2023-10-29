const { uploadFile, deleteFile } = require('../config/upload');

const fileCheck = async (file, descricao) => {
  return (await uploadFile(`${descricao}/${file.originalname}`, file.buffer, file.mimetype)).url;
};

const removeFile = async (productImage) => {
  const pathImage = productImage.replace(process.env.BUCKET_BASE_URL, '');
  const preparedPathImage = pathImage.replaceAll('%20', ' ');
  deleteFile(preparedPathImage);
};

module.exports = { fileCheck, removeFile };
