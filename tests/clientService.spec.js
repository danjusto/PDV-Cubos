const { executeCreate, executeUpdate, executeDetail, executeList } = require('../src/services/clientService');
const clientRepository = require('../src/repositories/clientRepository');
const AppError = require('../src/errors/AppError');

jest.mock('../src/repositories/clientRepository');

describe('Client Service - ExecuteCreate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const clientData = {
    nome: 'Ney',
    email: 'ney@email.com',
    cpf: '01234567890',
  };

  test('Success create client', async () => {
    clientRepository.findByEmailOrCPF.mockReturnValue(undefined);
    clientRepository.insert.mockReturnValue([
      {
        id: 1,
        nome: clientData.nome,
        email: clientData.email,
        cpf: clientData.cpf,
        cep: null,
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    ]);

    const response = await executeCreate(clientData.nome, clientData.email, clientData.cpf);

    expect(clientRepository.findByEmailOrCPF).toHaveBeenCalledTimes(1);
    expect(clientRepository.findByEmailOrCPF).toHaveBeenCalledWith(clientData.email, clientData.cpf);
    expect(clientRepository.insert).toHaveBeenCalledTimes(1);
    expect(clientRepository.insert).toHaveBeenCalledWith(clientData.nome, clientData.email, clientData.cpf, clientData.cep, clientData.rua, clientData.numero, clientData.bairro, clientData.cidade, clientData.estado);
    expect(response).toHaveProperty('id');
  });

  test('Throw an exception because email already in use', async () => {
    clientRepository.findByEmailOrCPF.mockReturnValue({
      id: 2,
      nome: 'Ronaldinho',
      email: clientData.email,
      cpf: '11234567899',
      cep: null,
      rua: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
    });
    try {
      await executeCreate(clientData.nome, clientData.email, clientData.cpf);
    } catch (error) {
      expect(clientRepository.findByEmailOrCPF).toHaveBeenCalledTimes(1);
      expect(clientRepository.findByEmailOrCPF).toHaveBeenCalledWith(clientData.email, clientData.cpf);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('message', 'Client already exists.');
      expect(clientRepository.insert).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because cpf already in use', async () => {
    clientRepository.findByEmailOrCPF.mockReturnValue({
      id: 2,
      nome: 'Ronaldinho',
      email: 'ronaldinho@jogamuito.com',
      cpf: clientData.cpf,
      cep: null,
      rua: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
    });
    try {
      await executeCreate(clientData.nome, clientData.email, clientData.cpf);
    } catch (error) {
      expect(clientRepository.findByEmailOrCPF).toHaveBeenCalledTimes(1);
      expect(clientRepository.findByEmailOrCPF).toHaveBeenCalledWith(clientData.email, clientData.cpf);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('message', 'Client already exists.');
      expect(clientRepository.insert).toHaveBeenCalledTimes(0);
    }
  });
});

describe('Client Service - ExecuteUpdate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const clientData = {
    id: 1,
    nome: 'Ney',
    email: 'ney@email.com',
    cpf: '01234567890',
    cep: undefined,
    rua: undefined,
    numero: undefined,
    bairro: undefined,
    cidade: undefined,
    estado: undefined,
  };

  test('Success update client', async () => {
    clientRepository.findById.mockReturnValue(clientData);
    clientRepository.findByEmailAndDifferentId.mockReturnValue(undefined);
    clientRepository.findByCpfAndDifferentId.mockReturnValue(undefined);
    clientRepository.update.mockReturnValue([
      {
        id: clientData.id,
        nome: clientData.nome,
        email: clientData.email,
        cpf: clientData.cpf,
        cep: null,
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
    ]);
    await executeUpdate(clientData.id, clientData.nome, clientData.email, clientData.cpf);
    expect(clientRepository.findById).toHaveBeenCalledTimes(1);
    expect(clientRepository.findById).toHaveBeenCalledWith(clientData.id);
    expect(clientRepository.findByEmailAndDifferentId).toHaveBeenCalledTimes(1);
    expect(clientRepository.findByEmailAndDifferentId).toHaveBeenCalledWith(clientData.email, clientData.id);
    expect(clientRepository.findByCpfAndDifferentId).toHaveBeenCalledTimes(1);
    expect(clientRepository.findByCpfAndDifferentId).toHaveBeenCalledWith(clientData.cpf, clientData.id);
    expect(clientRepository.update).toHaveBeenCalledTimes(1);
    expect(clientRepository.update).toHaveBeenCalledWith(clientData.id, clientData.nome, clientData.email, clientData.cpf, clientData.cep, clientData.rua, clientData.numero, clientData.bairro, clientData.cidade, clientData.estado);
  });

  test('Throw an exception because client not exists', async () => {
    clientRepository.findById.mockReturnValue(undefined);
    try {
      await executeUpdate(clientData.id, clientData.nome, clientData.email, clientData.cpf);
    } catch (error) {
      expect(clientRepository.findById).toHaveBeenCalledTimes(1);
      expect(clientRepository.findById).toHaveBeenCalledWith(clientData.id);
      expect(clientRepository.findByEmailAndDifferentId).toHaveBeenCalledTimes(0);
      expect(clientRepository.findByCpfAndDifferentId).toHaveBeenCalledTimes(0);
      expect(clientRepository.update).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because email already in use', async () => {
    clientRepository.findById.mockReturnValue(clientData);
    clientRepository.findByEmailAndDifferentId.mockReturnValue({
      id: 2,
      nome: 'Ronaldinho',
      email: clientData.email,
      cpf: '11234567899',
      cep: null,
      rua: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
    });
    try {
      await executeUpdate(clientData.id, clientData.nome, clientData.email, clientData.cpf);
    } catch (error) {
      expect(clientRepository.findById).toHaveBeenCalledTimes(1);
      expect(clientRepository.findById).toHaveBeenCalledWith(clientData.id);
      expect(clientRepository.findByEmailAndDifferentId).toHaveBeenCalledTimes(1);
      expect(clientRepository.findByEmailAndDifferentId).toHaveBeenCalledWith(clientData.email, clientData.id);
      expect(clientRepository.findByEmailAndDifferentId).toHaveReturnedWith({
        id: 2,
        nome: 'Ronaldinho',
        email: clientData.email,
        cpf: '11234567899',
        cep: null,
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null,
      });
      expect(clientRepository.findByCpfAndDifferentId).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('message', 'Email already exists.');
      expect(clientRepository.update).toHaveBeenCalledTimes(0);
    }
  });

  test('Throw an exception because cpf already in use', async () => {
    clientRepository.findById.mockReturnValue(clientData);
    clientRepository.findByEmailAndDifferentId.mockReturnValue(undefined);
    clientRepository.findByCpfAndDifferentId.mockReturnValue({
      id: 2,
      nome: 'Ronaldinho',
      email: 'ronaldinho@jogamuito.com',
      cpf: clientData.cpf,
      cep: null,
      rua: null,
      numero: null,
      bairro: null,
      cidade: null,
      estado: null,
    });
    try {
      await executeUpdate(clientData.id, clientData.nome, clientData.email, clientData.cpf);
    } catch (error) {
      expect(clientRepository.findById).toHaveBeenCalledTimes(1);
      expect(clientRepository.findById).toHaveBeenCalledWith(clientData.id);
      expect(clientRepository.findByEmailAndDifferentId).toHaveBeenCalledTimes(1);
      expect(clientRepository.findByEmailAndDifferentId).toHaveBeenCalledWith(clientData.email, clientData.id);
      expect(clientRepository.findByCpfAndDifferentId).toHaveBeenCalledTimes(1);
      expect(clientRepository.findByCpfAndDifferentId).toHaveBeenCalledWith(clientData.cpf, clientData.id);
      expect(clientRepository.findByCpfAndDifferentId).toHaveReturnedWith({
        id: 2,
        nome: 'Ronaldinho',
        email: 'ronaldinho@jogamuito.com',
        cpf: clientData.cpf,
        cep: null,
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null,
      });
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 400);
      expect(error).toHaveProperty('message', 'CPF already exists.');
      expect(clientRepository.update).toHaveBeenCalledTimes(0);
    }
  });
});

describe('Client Service - ExecuteDetail', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const clientData = {
    id: 1,
    nome: 'Ney',
    email: 'ney@email.com',
    cpf: '01234567890',
    cep: undefined,
    rua: undefined,
    numero: undefined,
    bairro: undefined,
    cidade: undefined,
    estado: undefined,
  };

  test('Success detail client', async () => {
    clientRepository.findById.mockReturnValue(clientData);

    const response = await executeDetail(clientData.id);

    expect(clientRepository.findById).toHaveBeenCalledTimes(1);
    expect(clientRepository.findById).toHaveBeenCalledWith(clientData.id);
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('cpf');
  });

  test('Throw an exception because product not exists', async () => {
    clientRepository.findById.mockReturnValue(undefined);

    try {
      await executeDetail(clientData.id);
    } catch (error) {
      expect(clientRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty('statusCode', 404);
      expect(error).toHaveProperty('message', 'Client not found.');
    }
  });
});

describe('Client Service - ExecuteList', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const listClientsData = [
    {
      id: 1,
      nome: 'Ney',
      email: 'ney@email.com',
      cpf: '01234567890',
      cep: undefined,
      rua: undefined,
      numero: undefined,
      bairro: undefined,
      cidade: undefined,
      estado: undefined,
    },
    {
      id: 2,
      nome: 'Rick',
      email: 'rick@email.com',
      cpf: '12345678910',
      cep: undefined,
      rua: undefined,
      numero: undefined,
      bairro: undefined,
      cidade: undefined,
      estado: undefined,
    },
  ];

  test('Success list clients', async () => {
    clientRepository.findAll.mockReturnValue(listClientsData);

    const response = await executeList(undefined);

    expect(clientRepository.findAll).toHaveBeenCalledTimes(1);
    expect(response).toHaveLength(2);
  });
});
