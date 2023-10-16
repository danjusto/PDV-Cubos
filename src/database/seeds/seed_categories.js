exports.seed = async function (knex) {
  const checkSeed = await knex('categories').first();
  if (!checkSeed) {
    await knex('categories').insert([{ descricao: 'Informática' }, { descricao: 'Celulares' }, { descricao: 'Beleza e Perfumaria' }, { descricao: 'Mercado' }, { descricao: 'Livros e Papelaria' }, { descricao: 'Brinquedos' }, { descricao: 'Moda' }, { descricao: 'Bebê' }, { descricao: 'Games' }]);
  }
};
