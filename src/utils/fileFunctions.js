const { uploadFile, deleteFile } = require('../config/upload');

const fileCheck = async (file, descricao) => {
  let image = null;
  if (file) {
    image = (await uploadFile(`${descricao}/${file.originalname}`, file.buffer, file.mimetype)).url;
  }
  return image;
};

const removeFile = async (productImage) => {
  const pathImage = productImage.replace(process.env.BUCKET_BASE_URL, '');
  const preparedPathImage = pathImage.replace('%20', ' ');
  deleteFile(preparedPathImage);
};

module.exports = { fileCheck, removeFile };
