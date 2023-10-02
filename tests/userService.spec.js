const { executeCreate, executeUpdate, executeUserDetail, executeLogin } = require("../src/services/userService");
const userRepository = require("../src/repositories/userRepository");
const { hash, compare } = require("bcrypt");
const AppError = require("../src/errors/AppError");

jest.mock('../src/repositories/userRepository');
jest.mock('bcrypt');

describe("User Service - ExecuteCreate", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  })

  const userData = {
    nome: "Ney",
	  email: "ney@email.com",
	  senha: "123456"
  }

  test("Success create user", async() => {
    userRepository.findByEmail.mockReturnValue(undefined);
    hash.mockReturnValue(userData.senha);
    userRepository.insertUser.mockReturnValue([
      {
        id: 1,
        nome: userData.nome,
        email: userData.email
      }
    ]);
    
    const response = await executeCreate(userData.nome, userData.email, userData.senha);

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(hash).toHaveBeenCalledTimes(1);
    expect(hash).toHaveBeenCalledWith(userData.senha, 10);
    expect(userRepository.insertUser).toHaveBeenCalledTimes(1);
    expect(userRepository.insertUser).toHaveBeenCalledWith(userData.nome, userData.email, userData.senha);
    expect(response).toHaveProperty('id');
    expect(response).not.toHaveProperty('senha');
  });

  test("Throw an exception because email already in use", async() => {
    userRepository.findByEmail.mockReturnValue({
      id: 1,
      nome: userData.nome,
      email: userData.email,
      senha: userData.senha
    });
    
    try {
      await executeCreate(userData.nome, userData.email, userData.senha);
    } catch (error) {
      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 400);
      expect(error).toHaveProperty("message", "Email already exists.");
      expect(hash).toHaveBeenCalledTimes(0);
      expect(userRepository.insertUser).toHaveBeenCalledTimes(0);
    }
  });
});

describe("User Service - ExecuteUpdate", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  })

  const userData = {
    id: 1,
    nome: "Ney",
	  email: "ney@email.com",
	  senha: "123456"
  }

  test("Success update user", async() => {
    userRepository.findByEmailAndDifferentId.mockReturnValue(undefined);
    hash.mockReturnValue(userData.senha);
    userRepository.updateUser.mockReturnValue([
      {
        id: 1,
        nome: userData.nome,
        email: userData.email
      }
    ]);
    
    await executeUpdate(userData.id, userData.nome, userData.email, userData.senha);

    expect(userRepository.findByEmailAndDifferentId).toHaveBeenCalledTimes(1);
    expect(userRepository.findByEmailAndDifferentId).toHaveBeenCalledWith(userData.email, userData.id);
    expect(hash).toHaveBeenCalledTimes(1);
    expect(hash).toHaveBeenCalledWith(userData.senha, 10);
    expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
    expect(userRepository.updateUser).toHaveBeenCalledWith(userData.id, userData.nome, userData.email, userData.senha);
  });

  test("Throw an exception because email already in use", async() => {
    userRepository.findByEmailAndDifferentId.mockReturnValue({
      id: 2,
      nome: userData.nome,
      email: userData.email,
      senha: userData.senha
    });
    
    try {
      await executeUpdate(userData.id, userData.nome, userData.email, userData.senha);
    } catch (error) {
      expect(userRepository.findByEmailAndDifferentId).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 400);
      expect(error).toHaveProperty("message", "Email already exists.");
      expect(hash).toHaveBeenCalledTimes(0);
      expect(userRepository.insertUser).toHaveBeenCalledTimes(0);
    }
  });
});

describe("User Service - ExecuteUserDetail", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  })

  const userData = {
    id: 1,
    nome: "Ney",
	  email: "ney@email.com"
  }

  test("Success detail user", async() => {
    userRepository.getUserById.mockReturnValue({
      id: 1,
      nome: userData.nome,
      email: userData.email
    });
    
    const response = await executeUserDetail(userData.id);

    expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserById).toHaveBeenCalledWith(userData.id);
    expect(response).toHaveProperty('nome');
    expect(response).toHaveProperty('email');
    expect(response).not.toHaveProperty('senha');
  });

  test("Throw an exception because user not exists", async() => {
    userRepository.getUserById.mockReturnValue(undefined);
    
    try {
      await executeUserDetail(userData.id);
    } catch (error) {
      expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
      expect(error).toHaveProperty("message", "User not found.");
    }
  });
});

describe("User Service - ExecuteLogin", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  })

  const userData = {
    id: 1,
    nome: "Ney",
	  email: "ney@email.com",
    senha: "12345678"
  }

  test("Success login user", async() => {
    userRepository.findByEmail.mockReturnValue({
      id: userData.id,
      nome: userData.nome,
      email: userData.email,
      senha: userData.senha
    });
    compare.mockReturnValue(true);
    
    const response = await executeLogin(userData.email, userData.senha);

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(compare).toHaveBeenCalledTimes(1);
    expect(response).toBeTruthy();
  });

  test("Throw an exception because user not exists", async() => {
    userRepository.findByEmail.mockReturnValue(undefined);
    
    try {
      await executeLogin(userData.email, userData.senha);
    } catch (error) {
      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 401);
      expect(error).toHaveProperty("message", "Invalid email and/or password.");
    }
  });

  test("Throw an exception because password don't match", async() => {
    userRepository.findByEmail.mockReturnValue(userData);
    compare.mockReturnValue(false);

    try {
      await executeLogin(userData.email, userData.senha);
    } catch (error) {
      expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(compare).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 401);
      expect(error).toHaveProperty("message", "Invalid email and/or password.");
    }
  });
});