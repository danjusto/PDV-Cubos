const { uploadFile } = require('../storage/upload');

const fileCheck = async (file, descricao) => {
  let image = null;

  if (file) {
    image = (await uploadFile(`${descricao}/${file.originalname}`, file.buffer, file.mimetype)).url;
  }
  return image;
};

module.exports = fileCheck;
