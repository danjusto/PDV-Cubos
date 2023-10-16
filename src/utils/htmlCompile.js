const fs = require('fs/promises');
const handlebars = require('handlebars');

const htmlCompile = async (file, context) => {
  const html = await fs.readFile(file);
  const compile = handlebars.compile(html.toString());
  const htmlString = compile(context);
  return htmlString;
};

module.exports = htmlCompile;
