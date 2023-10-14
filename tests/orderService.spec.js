const { executeList, executeCreate } = require('../src/services/orderService');
const orderRepository = require('../src/repositories/orderRepository');
const orderProductsRepository = require('../src/repositories/orderProductsRepository');
const clientRepository = require('../src/repositories/clientRepository');
const productRepository = require('../src/repositories/productRepository');
const sendEmail = require('../src/utils/sendEmail');
const AppError = require('../src/errors/AppError');

jest.mock('../src/repositories/orderRepository');
jest.mock('../src/repositories/orderProductsRepository');
jest.mock('../src/repositories/clientRepository');
jest.mock('../src/repositories/productRepository');
jest.mock('../src/utils/sendEmail');

describe('Order Service - executeCreate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const clientData = {
    id: 1,
    nome: 'Ney',
    email: 'ney@email.com',
    cpf: '01234567890',
    cep: null,
    rua: null,
    numero: null,
    bairro: null,
    cidade: null,
    estado: null,
  };
  const productDataOne = {
    id: 8,
    descricao: 'Mouse',
    quantidade_estoque: 50,
    valor: 2500,
    categoria_id: 1,
    produto_imagem: 'imagem',
  };
  const productDataTwo = {
    id: 12,
    descricao: 'Teclado',
    quantidade_estoque: 50,
    valor: 5000,
    categoria_id: 1,
    produto_imagem: 'imagem',
  };
  const productDataOneWithoutStock = {
    id: 8,
    descricao: 'Mouse',
    quantidade_estoque: 0,
    valor: 2500,
    categoria_id: 1,
    produto_imagem: 'imagem',
  };
  const productDataTwoWithoutStock = {
    id: 12,
    descricao: 'Teclado',
    quantidade_estoque: 0,
    valor: 5000,
    categoria_id: 1,
    produto_imagem: 'imagem',
  };
  const orderProductOne = {
    id: 1,
    quantidade_produto: 2,
    valor_produto: 2500,
    pedido_id: 1,
    produto_id: 8,
  };
  const orderProductTwo = {
    id: 2,
    quantidade_produto: 1,
    valor_produto: 5000,
    pedido_id: 1,
    produto_id: 12,
  };
  const order = {
    id: 12,
    valor_total: 10000,
    observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
    cliente_id: 1,
  };
  const orderData = {
    pedido: {
      id: 12,
      valor_total: 10000,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      cliente_id: 1,
    },
    pedido_produtos: [orderProductOne, orderProductTwo],
  };

  test('Success create order', async () => {
    clientRepository.findById.mockReturnValue(clientData);
    productRepository.findById.mockReturnValueOnce(productDataOne);
    productRepository.findById.mockReturnValueOnce(productDataTwo);
    orderRepository.insert.mockReturnValue([order]);
    orderProductsRepository.insert.mockReturnValueOnce([orderProductOne]);
    orderProductsRepository.insert.mockReturnValueOnce([orderProductTwo]);
    productRepository.decrementStock.mockReturnValue(undefined);
    sendEmail.mockReturnValue(undefined);

    const response = await executeCreate(orderData.cliente_id, orderData.observacao, orderData.pedido_produtos);

    expect(clientRepository.findById).toHaveBeenCalledTimes(1);
    expect(productRepository.findById).toHaveBeenCalledTimes(2);
    expect(orderRepository.insert).toHaveBeenCalledTimes(1);
    expect(orderProductsRepository.insert).toHaveBeenCalledTimes(2);
    expect(productRepository.decrementStock).toHaveBeenCalledTimes(2);
    expect(response).toEqual(orderData);
  });

  test('Throw an exception because client not found', async () => {
    clientRepository.findById.mockReturnValue(undefined);

    try {
      await executeCreate(orderData.cliente_id, orderData.observacao, orderData.pedido_produtos);
    } catch (error) {
      expect(clientRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'Client not found.');
      expect(productRepository.findById).toHaveBeenCalledTimes(0);
      expect(orderRepository.insert).toHaveBeenCalledTimes(0);
      expect(orderProductsRepository.insert).toHaveBeenCalledTimes(0);
      expect(productRepository.decrementStock).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because first product not found', async () => {
    clientRepository.findById.mockReturnValue(clientData);
    productRepository.findById.mockReturnValueOnce(undefined);

    try {
      await executeCreate(orderData.cliente_id, orderData.observacao, orderData.pedido_produtos);
    } catch (error) {
      expect(clientRepository.findById).toHaveBeenCalledTimes(1);
      expect(productRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'Product not found.');
      expect(orderRepository.insert).toHaveBeenCalledTimes(0);
      expect(orderProductsRepository.insert).toHaveBeenCalledTimes(0);
      expect(productRepository.decrementStock).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because second product not found', async () => {
    clientRepository.findById.mockReturnValue(clientData);
    productRepository.findById.mockReturnValueOnce(productDataOne);
    productRepository.findById.mockReturnValueOnce(undefined);

    try {
      await executeCreate(orderData.cliente_id, orderData.observacao, orderData.pedido_produtos);
    } catch (error) {
      expect(clientRepository.findById).toHaveBeenCalledTimes(1);
      expect(productRepository.findById).toHaveBeenCalledTimes(2);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'Product not found.');
      expect(orderRepository.insert).toHaveBeenCalledTimes(0);
      expect(orderProductsRepository.insert).toHaveBeenCalledTimes(0);
      expect(productRepository.decrementStock).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because insufficient stock of first product', async () => {
    clientRepository.findById.mockReturnValue(clientData);
    productRepository.findById.mockReturnValueOnce(productDataOneWithoutStock);

    try {
      await executeCreate(orderData.cliente_id, orderData.observacao, orderData.pedido_produtos);
    } catch (error) {
      expect(clientRepository.findById).toHaveBeenCalledTimes(1);
      expect(productRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('message', 'Insufficient stock.');
      expect(orderRepository.insert).toHaveBeenCalledTimes(0);
      expect(orderProductsRepository.insert).toHaveBeenCalledTimes(0);
      expect(productRepository.decrementStock).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because insufficient stock of second product', async () => {
    clientRepository.findById.mockReturnValue(clientData);
    productRepository.findById.mockReturnValueOnce(productDataOne);
    productRepository.findById.mockReturnValueOnce(productDataTwoWithoutStock);

    try {
      await executeCreate(orderData.cliente_id, orderData.observacao, orderData.pedido_produtos);
    } catch (error) {
      expect(clientRepository.findById).toHaveBeenCalledTimes(1);
      expect(productRepository.findById).toHaveBeenCalledTimes(2);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('message', 'Insufficient stock.');
      expect(orderRepository.insert).toHaveBeenCalledTimes(0);
      expect(orderProductsRepository.insert).toHaveBeenCalledTimes(0);
      expect(productRepository.decrementStock).toHaveBeenCalledTimes(0);
    }
  });
});

describe('Order Service - executeList', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const ordersWithoutFilter = [
    {
      id: 1,
      valor_total: 10000,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      cliente_id: 1,
    },
    {
      id: 2,
      valor_total: 1000,
      observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
      cliente_id: 1,
    },
    {
      id: 3,
      valor_total: 5000,
      observacao: 'Em caso de ausência, devolver',
      cliente_id: 2,
    },
  ];
  const ordersWithFilter = [
    {
      id: 3,
      valor_total: 5000,
      observacao: 'Em caso de ausência, devolver',
      cliente_id: 2,
    },
  ];
  const firstOrderProducts = [
    {
      id: 1,
      quantidade_produto: 2,
      valor_produto: 2500,
      pedido_id: 1,
      produto_id: 1,
    },
    {
      id: 2,
      quantidade_produto: 1,
      valor_produto: 5000,
      pedido_id: 1,
      produto_id: 2,
    },
  ];
  const secondOrderProducts = [
    {
      id: 3,
      quantidade_produto: 5,
      valor_produto: 100,
      pedido_id: 2,
      produto_id: 10,
    },
    {
      id: 4,
      quantidade_produto: 1,
      valor_produto: 500,
      pedido_id: 2,
      produto_id: 12,
    },
  ];
  const thirdOrderProducts = [
    {
      id: 5,
      quantidade_produto: 1,
      valor_produto: 2500,
      pedido_id: 3,
      produto_id: 6,
    },
    {
      id: 6,
      quantidade_produto: 2,
      valor_produto: 1250,
      pedido_id: 3,
      produto_id: 4,
    },
  ];

  test('Success without filter', async () => {
    orderRepository.findAll.mockReturnValue(ordersWithoutFilter);
    orderProductsRepository.findAllByOrderId.mockReturnValueOnce(firstOrderProducts);
    orderProductsRepository.findAllByOrderId.mockReturnValueOnce(secondOrderProducts);
    orderProductsRepository.findAllByOrderId.mockReturnValueOnce(thirdOrderProducts);

    const response = await executeList(undefined);

    expect(orderRepository.findAll).toHaveBeenCalledTimes(1);
    expect(orderRepository.findAllByClientId).toHaveBeenCalledTimes(0);
    expect(orderProductsRepository.findAllByOrderId).toHaveBeenCalledTimes(3);
    expect(response).toHaveLength(3);
  });

  test('Success with filter', async () => {
    orderRepository.findAllByClientId.mockReturnValue(ordersWithFilter);
    orderProductsRepository.findAllByOrderId.mockReturnValueOnce(thirdOrderProducts);

    const response = await executeList(ordersWithFilter[0].cliente_id);

    expect(orderRepository.findAll).toHaveBeenCalledTimes(0);
    expect(orderRepository.findAllByClientId).toHaveBeenCalledTimes(1);
    expect(orderProductsRepository.findAllByOrderId).toHaveBeenCalledTimes(1);
    expect(response).toHaveLength(1);
  });
});
