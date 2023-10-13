const { executeList, executeListById } = require('../src/services/orderService');
const { findAllOrders, findAllOrdersById, findAllOrderProducts } = require('../src/repositories/orderRepository');
const AppError = require('../src/errors/AppError');

jest.mock('../src/repositories/orderRepository');

describe('Order Service - executeList', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const ordersData = [
    {
      pedido: {
        id: 1,
        valor_total: 0,
        observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
        cliente_id: 1,
      },
      pedido_produtos: [],
    },
    {
      pedido: {
        id: 3,
        valor_total: 0,
        observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
        cliente_id: 1,
      },
      pedido_produtos: [
        {
          id: 5,
          quantidade_produto: 10,
          valor_produto: 2500,
          pedido_id: 3,
          produto_id: 1,
        },
        {
          id: 6,
          quantidade_produto: 20,
          valor_produto: 2600,
          pedido_id: 3,
          produto_id: 2,
        },
      ],
    },
  ];

  test('Success - List Orders', async () => {
    findAllOrders.mockResolvedValue(ordersData);

    const response = await executeList(undefined);

    expect(findAllOrders).toHaveBeenCalledTimes(1);
    expect(response).toEqual(ordersData);
  });

  test('Success - List Orders no content', async () => {
    findAllOrders.mockResolvedValue([]);

    const response = await executeList(undefined);

    expect(findAllOrders).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
  });

  test('Error List Orders undefined', async () => {
    findAllOrders.mockResolvedValue(undefined);

    const response = await executeList(undefined);

    expect(findAllOrders).toHaveBeenCalledTimes(1);
    expect(response).toBeUndefined();
  });
});
/* executeListById */
describe('Order Service - executeListById', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const ordersData = [
    {
      pedido: {
        id: 1,
        valor_total: 0,
        observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
        cliente_id: 1,
      },
      pedido_produtos: [],
    },
    {
      pedido: {
        id: 3,
        valor_total: 0,
        observacao: 'Em caso de ausência recomendo deixar com algum vizinho',
        cliente_id: 1,
      },
      pedido_produtos: [
        {
          id: 5,
          quantidade_produto: 10,
          valor_produto: 2500,
          pedido_id: 3,
          produto_id: 1,
        },
        {
          id: 6,
          quantidade_produto: 20,
          valor_produto: 2600,
          pedido_id: 3,
          produto_id: 2,
        },
      ],
    },
  ];

  test('Success - List Orders by client', async (client_id) => {
    findAllOrdersById.mockResolvedValue(ordersData);

    const response = await executeListById(1);

    expect(findAllOrdersById).toHaveBeenCalledTimes(1);
    expect(response).toEqual(ordersData);
  });

  test('Success - List Orders no content', async () => {
    findAllOrdersById.mockResolvedValue([]);

    const response = await executeListById(1);

    expect(findAllOrdersById).toHaveBeenCalledTimes(1);
    expect(response).toBeDefined();
  });

  test('Error List Orders undefined', async () => {
    findAllOrdersById.mockResolvedValue(undefined);

    const response = await executeListById(1);

    expect(executeListById).toHaveBeenCalledTimes(1);
    expect(response).toBeUndefined();
  });
});
