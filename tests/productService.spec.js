const { executeCreate, executeUpdate, executeDetail, executeList, executeRemove } = require('../src/services/productService');
const productRepository = require('../src/repositories/productRepository');
const categoryRepository = require('../src/repositories/categoryRepository');
const { removeFile } = require('../src/utils/fileFunctions');
const AppError = require('../src/errors/AppError');

jest.mock('../src/repositories/productRepository');
jest.mock('../src/repositories/categoryRepository');
jest.mock('../src/utils/fileFunctions');

describe('Product Service - ExecuteCreate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const file = undefined;
  const productData = {
    id: 1,
    descricao: 'Mouse',
    quantidade_estoque: 50,
    valor: 5000,
    categoria_id: 1,
    produto_imagem: undefined,
  };
  const categoryData = {
    id: 1,
    descricao: 'Informática',
  };

  test('Success create product without image', async () => {
    categoryRepository.findById.mockReturnValue(categoryData);
    productRepository.findByDescription.mockReturnValue(undefined);
    productRepository.insert.mockReturnValue([productData]);

    const response = await executeCreate(file, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);

    expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
    expect(categoryRepository.findById).toHaveBeenCalledWith(productData.categoria_id);
    expect(productRepository.findByDescription).toHaveBeenCalledTimes(1);
    expect(productRepository.findByDescription).toHaveBeenCalledWith(productData.descricao);
    expect(productRepository.insert).toHaveBeenCalledTimes(1);
    expect(productRepository.insert).toHaveBeenCalledWith(productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id, productData.produto_imagem);
    expect(response).toHaveProperty('descricao');
    expect(response).toHaveProperty('valor');
  });

  test('Throw an exception because category not found', async () => {
    categoryRepository.findById.mockReturnValue(undefined);

    try {
      await executeCreate(file, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'Category not found.');
      expect(productRepository.findByDescription).toHaveBeenCalledTimes(0);
      expect(productRepository.insert).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because description already exists', async () => {
    categoryRepository.findById.mockReturnValue(categoryData);
    productRepository.findByDescription.mockReturnValue(productData);

    try {
      await executeCreate(file, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(productRepository.findByDescription).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('message', 'Description already exists.');
      expect(productRepository.insert).toHaveBeenCalledTimes(0);
    }
  });
});

describe('Product Service - ExecuteUpdate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const file = undefined;
  const productData = {
    id: 1,
    descricao: 'Mouse',
    quantidade_estoque: 50,
    valor: 5000,
    categoria_id: 1,
    produto_imagem: 'imagem',
  };
  const categoryData = {
    id: 1,
    descricao: 'Informática',
  };

  test('Success update product without new image', async () => {
    productRepository.findById.mockReturnValue(productData);
    categoryRepository.findById.mockReturnValue(categoryData);
    productRepository.findByDescriptionAndDifferentId.mockReturnValue(undefined);
    productRepository.update.mockReturnValue();

    await executeUpdate(productData.id, file, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);

    expect(productRepository.findById).toHaveBeenCalledTimes(1);
    expect(productRepository.findById).toHaveBeenCalledWith(productData.id);
    expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
    expect(categoryRepository.findById).toHaveBeenCalledWith(productData.categoria_id);
    expect(productRepository.findByDescriptionAndDifferentId).toHaveBeenCalledTimes(1);
    expect(productRepository.findByDescriptionAndDifferentId).toHaveBeenCalledWith(productData.descricao, productData.id);
    expect(productRepository.update).toHaveBeenCalledTimes(1);
    expect(productRepository.update).toHaveBeenCalledWith(productData.id, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id, productData.produto_imagem);
  });

  test('Throw an exception because product not found', async () => {
    productRepository.findById.mockReturnValue(undefined);

    try {
      await executeUpdate(productData.id, file, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(productRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'Product not found.');
      expect(categoryRepository.findById).toHaveBeenCalledTimes(0);
      expect(productRepository.findByDescriptionAndDifferentId).toHaveBeenCalledTimes(0);
      expect(productRepository.update).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because category not found', async () => {
    productRepository.findById.mockReturnValue(productData);
    categoryRepository.findById.mockReturnValue(undefined);

    try {
      await executeUpdate(productData.id, file, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(productRepository.findById).toHaveBeenCalledTimes(1);
      expect(productRepository.findById).toHaveBeenCalledWith(productData.id);
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'Category not found.');
      expect(productRepository.findByDescriptionAndDifferentId).toHaveBeenCalledTimes(0);
      expect(productRepository.update).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because description already exists', async () => {
    productRepository.findById.mockReturnValue(productData);
    categoryRepository.findById.mockReturnValue(categoryData);
    productRepository.findByDescriptionAndDifferentId.mockReturnValue(productData);

    try {
      await executeUpdate(productData.id, file, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(productRepository.findById).toHaveBeenCalledTimes(1);
      expect(productRepository.findById).toHaveBeenCalledWith(productData.id);
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(categoryRepository.findById).toHaveBeenCalledWith(productData.categoria_id);
      expect(productRepository.findByDescriptionAndDifferentId).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('message', 'Description already exists.');
      expect(productRepository.update).toHaveBeenCalledTimes(0);
    }
  });
});

describe('Product Service - ExecuteDetail', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const productData = {
    id: 1,
    descricao: 'Mouse',
    quantidade_estoque: 50,
    valor: 5000,
    categoria_id: 1,
    produto_imagem: 'imagem',
  };

  test('Success detail product', async () => {
    productRepository.findById.mockReturnValue(productData);

    const response = await executeDetail(productData.id);

    expect(productRepository.findById).toHaveBeenCalledTimes(1);
    expect(productRepository.findById).toHaveBeenCalledWith(productData.id);
    expect(response).toHaveProperty('descricao');
    expect(response).toHaveProperty('valor');
  });

  test('Throw an exception because product not exists', async () => {
    productRepository.findById.mockReturnValue(undefined);

    try {
      await executeDetail(productData.id);
    } catch (error) {
      expect(productRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'Product not found.');
    }
  });
});

describe('Product Service - ExecuteList', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const listProductFullData = [
    {
      id: 1,
      descricao: 'Mouse',
      quantidade_estoque: 50,
      valor: 5000,
      categoria_id: 1,
      produto_imagem: 'imagem',
    },
    {
      id: 2,
      descricao: 'Teclado',
      quantidade_estoque: 50,
      valor: 5000,
      categoria_id: 1,
      produto_imagem: 'imagem',
    },
    {
      id: 3,
      descricao: 'Iphone',
      quantidade_estoque: 50,
      valor: 500000,
      categoria_id: 2,
      produto_imagem: null,
    },
  ];
  const listProductFilterData = [
    {
      id: 3,
      descricao: 'Iphone',
      quantidade_estoque: 50,
      valor: 500000,
      categoria_id: 2,
    },
  ];

  test('Success list full products', async () => {
    productRepository.findAll.mockReturnValue(listProductFullData);

    const response = await executeList(undefined);

    expect(productRepository.findByCategory).toHaveBeenCalledTimes(0);
    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
    expect(response).toHaveLength(3);
  });

  test('Success list filter products', async () => {
    productRepository.findByCategory.mockReturnValue(listProductFilterData);

    const response = await executeList(listProductFilterData[0].categoria_id);

    expect(productRepository.findByCategory).toHaveBeenCalledTimes(1);
    expect(productRepository.findAll).toHaveBeenCalledTimes(0);
    expect(response).toHaveLength(1);
  });
});

describe('Product Service - ExecuteRemove', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const productData = {
    id: 1,
    descricao: 'Mouse',
    quantidade_estoque: 50,
    valor: 5000,
    categoria_id: 1,
    produto_imagem: 'imagem',
  };

  test('Success remove product', async () => {
    productRepository.findById.mockReturnValue(productData);
    removeFile.mockReturnValue(undefined);
    productRepository.remove.mockReturnValue(undefined);

    await executeRemove(productData.id);

    expect(productRepository.findById).toHaveBeenCalledTimes(1);
    expect(productRepository.findById).toHaveBeenCalledWith(productData.id);
    expect(productRepository.remove).toHaveBeenCalledTimes(1);
    expect(productRepository.remove).toHaveBeenCalledWith(productData.id);
  });

  test('Throw an exception because product not exists', async () => {
    productRepository.findById.mockReturnValue(undefined);

    try {
      await executeRemove(productData.id);
    } catch (error) {
      expect(productRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'Product not found.');
      expect(productRepository.remove).toHaveBeenCalledTimes(0);
    }
  });
});
