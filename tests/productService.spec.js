const { executeCreate, executeUpdate, executeDetail, executeList, executeRemove } = require("../src/services/productService");
const productRepository = require("../src/repositories/productRepository");
const categoryRepository = require("../src/repositories/categoryRepository");
const AppError = require("../src/errors/AppError");

jest.mock('../src/repositories/productRepository');
jest.mock('../src/repositories/categoryRepository');

describe("Product Service - ExecuteCreate", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  })
  
  const productData = {
    id: 1,
    descricao: "Mouse",
    quantidade_estoque: 50,
    valor: 5000,
    categoria_id: 1
  };
  const categoryData = {
    id: 1,
    descricao: "Informática"
  };
  
  test("Success create product", async() => {
    categoryRepository.findById.mockReturnValue(categoryData);
    productRepository.findProductByDescription.mockReturnValue(undefined);
    productRepository.insertProduct.mockReturnValue([productData]);
      
    const response = await executeCreate(productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
  
    expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
    expect(categoryRepository.findById).toHaveBeenCalledWith(productData.categoria_id);
    expect(productRepository.findProductByDescription).toHaveBeenCalledTimes(1);
    expect(productRepository.findProductByDescription).toHaveBeenCalledWith(productData.descricao);
    expect(productRepository.insertProduct).toHaveBeenCalledTimes(1);
    expect(productRepository.insertProduct).toHaveBeenCalledWith(productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    expect(response).toHaveProperty('descricao');
    expect(response).toHaveProperty('valor');
  });
  
  test("Throw an exception because category not found", async() => {
    categoryRepository.findById.mockReturnValue(undefined);

    try {
      await executeCreate(productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
      expect(error).toHaveProperty("message", "Category not found.");
      expect(productRepository.findProductByDescription).toHaveBeenCalledTimes(0);
      expect(productRepository.insertProduct).toHaveBeenCalledTimes(0);
    }
  });

  test("Throw an exception because description already exists", async() => {
    categoryRepository.findById.mockReturnValue(categoryData);
    productRepository.findProductByDescription.mockReturnValue(productData);
      
    try {
      await executeCreate(productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(productRepository.findProductByDescription).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 400);
      expect(error).toHaveProperty("message", "Description already exists.");
      expect(productRepository.insertProduct).toHaveBeenCalledTimes(0);
    }
  });
});

describe("Product Service - ExecuteUpdate", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  })
  
  const productData = {
    id: 1,
    descricao: "Mouse",
    quantidade_estoque: 50,
    valor: 5000,
    categoria_id: 1
  };
  const categoryData = {
    id: 1,
    descricao: "Informática"
  };
  
  test("Success update product", async() => {
    productRepository.findProductByid.mockReturnValue(productData);
    categoryRepository.findById.mockReturnValue(categoryData);
    productRepository.findProductByDescriptionAndDifferentId.mockReturnValue(undefined);
    productRepository.updateProduct.mockReturnValue();
      
    await executeUpdate(productData.id, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
  
    expect(productRepository.findProductByid).toHaveBeenCalledTimes(1);
    expect(productRepository.findProductByid).toHaveBeenCalledWith(productData.id);
    expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
    expect(categoryRepository.findById).toHaveBeenCalledWith(productData.categoria_id);
    expect(productRepository.findProductByDescriptionAndDifferentId).toHaveBeenCalledTimes(1);
    expect(productRepository.findProductByDescriptionAndDifferentId).toHaveBeenCalledWith(productData.descricao, productData.id);
    expect(productRepository.updateProduct).toHaveBeenCalledTimes(1);
    expect(productRepository.updateProduct).toHaveBeenCalledWith(productData.id, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
  });
  
  test("Throw an exception because product not found", async() => {
    productRepository.findProductByid.mockReturnValue(undefined);

    try {
      await executeUpdate(productData.id, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(productRepository.findProductByid).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
      expect(error).toHaveProperty("message", "Product not found.");
      expect(categoryRepository.findById).toHaveBeenCalledTimes(0);
      expect(productRepository.findProductByDescriptionAndDifferentId).toHaveBeenCalledTimes(0);
      expect(productRepository.updateProduct).toHaveBeenCalledTimes(0);
    }
  });

  test("Throw an exception because category not found", async() => {
    productRepository.findProductByid.mockReturnValue(productData);
    categoryRepository.findById.mockReturnValue(undefined);

    try {
      await executeUpdate(productData.id, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(productRepository.findProductByid).toHaveBeenCalledTimes(1);
      expect(productRepository.findProductByid).toHaveBeenCalledWith(productData.id);
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
      expect(error).toHaveProperty("message", "Category not found.");
      expect(productRepository.findProductByDescriptionAndDifferentId).toHaveBeenCalledTimes(0);
      expect(productRepository.updateProduct).toHaveBeenCalledTimes(0);
    }
  });

  test("Throw an exception because description already exists", async() => {
    productRepository.findProductByid.mockReturnValue(productData);
    categoryRepository.findById.mockReturnValue(categoryData);
    productRepository.findProductByDescriptionAndDifferentId.mockReturnValue(productData);
      
    try {
      await executeUpdate(productData.id, productData.descricao, productData.quantidade_estoque, productData.valor, productData.categoria_id);
    } catch (error) {
      expect(productRepository.findProductByid).toHaveBeenCalledTimes(1);
      expect(productRepository.findProductByid).toHaveBeenCalledWith(productData.id);
      expect(categoryRepository.findById).toHaveBeenCalledTimes(1);
      expect(categoryRepository.findById).toHaveBeenCalledWith(productData.categoria_id);
      expect(productRepository.findProductByDescriptionAndDifferentId).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 400);
      expect(error).toHaveProperty("message", "Description already exists.");
      expect(productRepository.updateProduct).toHaveBeenCalledTimes(0);
    }
  });
});

describe("Product Service - ExecuteDetail", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  })
  
  const productData = {
    id: 1,
    descricao: "Mouse",
    quantidade_estoque: 50,
    valor: 5000,
    categoria_id: 1
  }
  
  test("Success detail product", async() => {
    productRepository.findProductByid.mockReturnValue(productData);
      
    const response = await executeDetail(productData.id);
  
    expect(productRepository.findProductByid).toHaveBeenCalledTimes(1);
    expect(productRepository.findProductByid).toHaveBeenCalledWith(productData.id);
    expect(response).toHaveProperty('descricao');
    expect(response).toHaveProperty('valor');
  });
  
  test("Throw an exception because product not exists", async() => {
    productRepository.findProductByid.mockReturnValue(undefined);
      
    try {
      await executeDetail(productData.id);
    } catch (error) {
      expect(productRepository.findProductByid).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
      expect(error).toHaveProperty("message", "Product not found.");
    }
  });
});

describe("Product Service - ExecuteList", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
    
  const listProductFullData = [
    {
      id: 1,
      descricao: "Mouse",
      quantidade_estoque: 50,
      valor: 5000,
      categoria_id: 1
    },
    {
      id: 2,
      descricao: "Teclado",
      quantidade_estoque: 50,
      valor: 5000,
      categoria_id: 1
    },
    {
      id: 3,
      descricao: "Iphone",
      quantidade_estoque: 50,
      valor: 500000,
      categoria_id: 2
    }
  ];
  const listProductFilterData = [{
    id: 3,
    descricao: "Iphone",
    quantidade_estoque: 50,
    valor: 500000,
    categoria_id: 2
  }];
    
  test("Success list full products", async() => {
    productRepository.findProducts.mockReturnValue(listProductFullData);
        
    const response = await executeList(undefined);
    
    expect(productRepository.findProductsByCategory).toHaveBeenCalledTimes(0);
    expect(productRepository.findProducts).toHaveBeenCalledTimes(1);
    expect(response).toHaveLength(3);
  });
    
  test("Success list filter products", async() => {
    productRepository.findProductsByCategory.mockReturnValue(listProductFilterData);
        
    const response = await executeList(listProductFilterData[0].categoria_id);
    
    expect(productRepository.findProductsByCategory).toHaveBeenCalledTimes(1);
    expect(productRepository.findProducts).toHaveBeenCalledTimes(0);
    expect(response).toHaveLength(1);
  });
});

describe("Product Service - ExecuteRemove", () => {
  
  afterEach(() => {
    jest.restoreAllMocks();
  })
  
  const productData = {
    id: 1,
    descricao: "Mouse",
    quantidade_estoque: 50,
    valor: 5000,
    categoria_id: 1
  }
  
  test("Success remove product", async() => {
    productRepository.findProductByid.mockReturnValue(productData);
    productRepository.removeProduct.mockReturnValue(undefined);
      
    await executeRemove(productData.id);
  
    expect(productRepository.findProductByid).toHaveBeenCalledTimes(1);
    expect(productRepository.findProductByid).toHaveBeenCalledWith(productData.id);
    expect(productRepository.removeProduct).toHaveBeenCalledTimes(1);
    expect(productRepository.removeProduct).toHaveBeenCalledWith(productData.id);
  });
  
  test("Throw an exception because product not exists", async() => {
    productRepository.findProductByid.mockReturnValue(undefined);
      
    try {
      await executeRemove(productData.id);
    } catch (error) {
      expect(productRepository.findProductByid).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AppError);
      expect(error).toHaveProperty("statusCode", 404);
      expect(error).toHaveProperty("message", "Product not found.");
    }
  });
});