# API PDV-Cubos

API desenvolvida como desafio final do curso de desenvolvimento de software back-end da Cubos Academy. Trata-se de um sistema PDV (Ponto de Venda).

## 📜 Sumário

1. [Detalhes do projeto](https://github.com/danjusto/PDV-Cubos#1--detalhes-do-projeto)
2. [Deploy](https://github.com/iadevmatth/danjusto/PDV-Cubos#2--deploy)
3. [Para rodar o projeto](https://github.com/danjusto/PDV-Cubos#3--para-rodar-o-projeto)
4. [Documentação](https://github.com/iadevmatth/danjusto/PDV-Cubos#4--documenta%C3%A7%C3%A3o)
5. [Tecnologias usadas](https://github.com/danjusto/PDV-Cubos#5--tecnologias-usadas)
6. [Autor](https://github.com/danjusto/PDV-Cubos#6--autor)

## 1. 🔍 Detalhes do projeto

A API PDV_Cubos tem como objetivo controlar as vendas de um comércio fictício. Foi realizado academicamente durante curso de desenvolvimento de software back-end da Cubos Academy.

#### Cenário:

- O sistema permite o cadastro de usuário, com validação de informações;
- O sistema permite apenas as requisições de cadastro de usuário, login e listagem de categorias sem autenticação por meio de JWT;
- Com o usuário logado, o sistema permite a edição e detalhmento das informações do usuário, criação, edição, detalhamento e listagem de clientes, criação, edição, detalhamento, deleção e listagem de produtos, criação e listagem de pedidos;
- O sistema permite a inclusão de imagens de produtos, que são armazenados em um serviço de armazenamento na nuvem;
- O sistema decrementa automaticamente quantidade de itens no estoque de acordo com o pedido realizado;
- O sistema encaminha e-mail ao cliente em casa de pedido efetuado com sucesso;

## 2. ✅ Deploy

A API está rodando no servidor da Cyclic: [Link do deploy](https://pdv-deploy-cubos.cyclic.app).

Para utilizá-la, basta seguir a documentação presente neste conteúdo.

## 3. 🔌 Para rodar o projeto em ambiente de desenvolvimento

1. Instale as dependências necessárias para rodar a API (relacionadas no package.json):

   ```
   npm install
   ```

2. A API utiliza o PostgreSQL como banco de dados rodando em um servidor do [ElephantSQL](https://www.elephantsql.com/). A API também faz uso de um bucket no [BackBlaze](https://www.backblaze.com/) para armazenamento de imagens, bem como de um serviço do [Brevo](https://www.brevo.com/pt/) para servidor SMTP.

3. Dessa forma, se faz necessário criar os respectivos serviços para API consumir e preencher o arquivo `.env` utilizando o `.env.example` de exemplo para os nomes das variáveis de ambiente.

4. Rode a aplicação que o sistema já irá criar as tabelas automaticamente no banco de dados, deixando-as prontas para uso.

5. Você precisará de uma ferramenta de teste de requisições como o [Insomnia](https://insomnia.rest/), devendo seguir as orientações da documentação abaixo para utilizar a API.

6. Você pode rodar os testes automatizados criados com Jest:
   ```
   npm run test
   ```

## 4. 📖 Documentação

### Endpoints

**Login** - Autenticação de usuário <br/>

<details>
<summary><b>POST login</b></summary>

Logar com um usuário por meio de `email` e `password`. Retorna um token JWT para ser utilizado nas requisições.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**     |
| :------- | :-------------- | :------- | :---------------- |
| email    | sim             | `string` | E-mail do usuário |
| password | sim             | `string` | Senha do usuário  |

> **_NOTA:_** Não é necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

```json
{
  "email": "fulano@email.com",
  "senha": "password"
}
```

**Response**

Sucesso

```json
{
  "type": "Bearer",
  "token": "abcdefghijklmno.abcdefghijklmnopqrstuvwxyz.abcdefghijklmnop"
}
```

`status: 200` <br /><br /> Erro comum

```json
{
  "message": "Invalid email and/or password."
}
```

`status: 401`

</details>
<br/>

**Usuário** - Criação de um novo usuário, edição de um usuário e detalhamento do usuário <br/>

<details>
<summary><b>POST usuario</b></summary>

Criar um usuário para poder utilizar a API e jogar D&D.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**    |
| :------- | :-------------- | :------- | :--------------- |
| nome     | sim             | `string` | Nome do usuário  |
| email    | sim             | `string` | Email do usuário |
| senha    | sim             | `string` | Senha do usuário |

> **_NOTA:_** Não é necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

```json
{
  "nome": "Fulano",
  "email": "fulano@email.com",
  "senha": "password"
}
```

**Response**

Sucesso

```json
{
  "id": 1,
  "name": "Fulano",
  "email": "fulano@email.com"
}
```

`status: 201` <br /><br /> Erros comuns

```json
{
  "message": "Email already exists."
}
```

`status: 400`

```json
{
  "message": "The password must at least 6 characters"
}
```

`status: 400`

</details>

<details>
<summary><b>PUT usuario</b></summary>

Editar um usuário. Apenas nome e e-mail podem ser editados (ou apenas um dos dois).

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**    |
| :------- | :-------------- | :------- | :--------------- |
| nome     | sim             | `string` | Nome do usuário  |
| email    | sim             | `string` | Email do usuário |
| senha    | sim             | `string` | Senha do usuário |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

```json
{
  "name": "Fulano Editado",
  "email": "fulano.editado@email.com",
  "password": "password"
}
```

**Response**

Sucesso <br/> `no body returned for response` <br/> `status: 204` <br/><br/> Erros comuns

```json
{
  "message": "Email already in use"
}
```

`status: 400`

</details>

<details>
<summary><b>GET usuario</b></summary>

Detalhar um usuário. O `id` é enviado automaticamente com o token.

**Request**

`Não é necessário enviar dados na requisição`

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
{
  "id": 1,
  "name": "Fulano",
  "email": "fulano@email.com"
}
```

`status: 200` <br /> Erros comuns

```json
{
  "message": "User not found."
}
```

`status: 404`

</details>
<br/>

**Categoria** - Listagem de categorias dos produtos <br/>

<details>
<summary><b>GET categoria</b></summary>

Listar categorias.

**Request**

`Não é necessário enviar dados na requisição`

> **_NOTA:_** Não é necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
[
  {
    "id": 1,
    "descricao": "Informática"
  },
  {
    "id": 2,
    "descricao": "Celulares"
  },
  {
    "id": 3,
    "descricao": "Beleza e Perfumaria"
  }
]
```

`status: 200`

Sucesso sem retorno

```json
[]
```

`status: 200` <br/>

</details>
<br/>

**Cliente** - Criação de um novo cliente, edição de um cliente, listagem de clientes e detalhamento de um cliente <br/>

<details>
<summary><b>POST cliente</b></summary>

Criar um cliente.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**                 |
| :------- | :-------------- | :------- | :---------------------------- |
| nome     | sim             | `string` | Nome do usuário               |
| email    | sim             | `string` | Email do usuário              |
| cpf      | sim             | `string` | CPF do usuário                |
| cep      | não             | `string` | CEP do endereço do usuário    |
| rua      | não             | `string` | Rua do endereço do usuário    |
| numero   | não             | `string` | Número do endereço do usuário |
| bairro   | não             | `string` | Bairro do endereço do usuário |
| cidade   | não             | `string` | Cidade do endereço do usuário |
| estado   | não             | `string` | Estado do endereço do usuário |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

```json
{
  "nome": "Ciclano",
  "email": "ciclano@gmail.com",
  "cpf": "12345678911",
  "cep": "12345678",
  "rua": "Rua 1",
  "numero": "11-A",
  "bairro": "Bairro 1",
  "cidade": "Cidade 1",
  "estado": "Estado 1"
}
```

**Response**

Sucesso

```json
{
  "id": 3,
  "nome": "Ciclano",
  "email": "ciclano@gmail.com",
  "cpf": "12345678911",
  "cep": "12345678",
  "rua": "Rua 1",
  "numero": "11-A",
  "bairro": "Bairro 1",
  "cidade": "Cidade 1",
  "estado": "Estado 1"
}
```

`status: 201` <br /><br /> Erros comuns

```json
{
  "message": "Client already exists."
}
```

`status: 400`

</details>

<details>
<summary><b>GET cliente</b></summary>

Listar clientes.

**Request**

`Não é necessário enviar dados na requisição`

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
[
  {
    "id": 1,
    "nome": "Beltrano",
    "email": "beltrano@email.com",
    "cpf": "12345678910",
    "cep": null,
    "rua": null,
    "numero": null,
    "bairro": null,
    "cidade": null,
    "estado": null
  },
  {
    "id": 2,
    "nome": "Ciclano",
    "email": "ciclano@gmail.com",
    "cpf": "12345678911",
    "cep": "12345678",
    "rua": "Rua 1",
    "numero": "11-A",
    "bairro": "Bairro 1",
    "cidade": "Cidade 1",
    "estado": "Estado 1"
  }
]
```

`status: 200`

Sucesso sem retorno

```json
[]
```

`status: 200` <br/>

</details>

<details>
<summary><b>GET cliente-id</b></summary>

Detalhar um personagem. O `id` deve ser enviado na url.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**                    |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | sim             | `number` | **Enviar via parâmetro de rota** |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
{
  "id": 2,
  "nome": "Ciclano",
  "email": "ciclano@gmail.com",
  "cpf": "12345678911",
  "cep": "12345678",
  "rua": "Rua 1",
  "numero": "11-A",
  "bairro": "Bairro 1",
  "cidade": "Cidade 1",
  "estado": "Estado 1"
}
```

`status: 200`

Erros comuns

```json
{
  "message": "Client not found."
}
```

`status: 404`

</details>

<details>
<summary><b>PUT cliente-id</b></summary>

Alterar os dados do cliente. O `id` deve ser enviado na url.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**                    |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | sim             | `number` | **Enviar via parâmetro de rota** |
| nome     | sim             | `string` | Nome do usuário                  |
| email    | sim             | `string` | Email do usuário                 |
| cpf      | sim             | `string` | CPF do usuário                   |
| cep      | não             | `string` | CEP do endereço do usuário       |
| rua      | não             | `string` | Rua do endereço do usuário       |
| numero   | não             | `string` | Número do endereço do usuário    |
| bairro   | não             | `string` | Bairro do endereço do usuário    |
| cidade   | não             | `string` | Cidade do endereço do usuário    |
| estado   | não             | `string` | Estado do endereço do usuário    |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

```json
{
  "nome": "Ciclano Editado",
  "email": "ciclano.editado@gmail.com",
  "cpf": "12345678911",
  "cep": "12345678",
  "rua": "Rua 1",
  "numero": "11-A",
  "bairro": "Bairro 1",
  "cidade": "Cidade 1",
  "estado": "Estado 1"
}
```

**Response**

Sucesso <br/> `no body returned for response` <br/> `status: 204` <br/><br/>

Erros comuns

```json
{
  "message": "Client not found."
}
```

`status: 404`

```json
{
  "message": "Email already exists."
}
```

`status: 400`

```json
{
  "message": "CPF already exists."
}
```

`status: 400`

</details>
<br/>

**Produto** - Criação de um novo produto, edição de um produto, listagem de produtos, deleção de um produto e detalhamento de um produto <br/>

<details>
<summary><b>POST produto</b></summary>

Criar um produto.

**Request**

| **Nome**           | **Obrigatório** | **Tipo** | **Descrição**                  |
| :----------------- | :-------------- | :------- | :----------------------------- |
| descricao          | sim             | `string` | Descrição do produto           |
| quantidade_estoque | sim             | `number` | Quantidade de itens no estoque |
| valor              | sim             | `number` | Valor do produto (em centavos) |
| categoria_id       | sim             | `number` | Id da categoria do produto     |
| produto_imagem     | não             | `file`   | Arquivo de imagem do produto   |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
{
  "id": 1,
  "descricao": "Teclado",
  "quantidade_estoque": 50,
  "valor": 10000,
  "categoria_id": 1,
  "produto_imagem": "url_da_imagem"
}
```

`status: 201` <br /><br /> Erros comuns

```json
{
  "message": "Category not found."
}
```

`status: 404`

```json
{
  "message": "Description already exists."
}
```

`status: 400`

</details>

<details>
<summary><b>GET produto</b></summary>

Listar produtos. Pode ser passado um parâmetro query `categoria_id` para listar apenas os produtos de uma categoria específica.

**Request**

| **Nome**     | **Obrigatório** | **Tipo** | **Descrição**                             |
| :----------- | :-------------- | :------- | :---------------------------------------- |
| categoria_id | não             | `number` | **Enviar via parâmetro de query na rota** |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

`url/produto?categoria_id=1`

**Response**

Sucesso

```json
[
  {
    "id": 1,
    "descricao": "Teclado X",
    "quantidade_estoque": 25,
    "valor": 10000,
    "categoria_id": 1,
    "produto_imagem": "url/Teclado_X/teclado_x.png"
  },
  {
    "id": 2,
    "descricao": "Teclado Y",
    "quantidade_estoque": 48,
    "valor": 20000,
    "categoria_id": 1,
    "produto_imagem": "url/Teclado_Y/teclado_y.png"
  }
]
```

`status: 200`

Sucesso sem retorno

```json
[]
```

`status: 200` <br/>

</details>

<details>
<summary><b>GET produto-id</b></summary>

Detalhar um produto. O `id` deve ser enviado na url.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**                    |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | sim             | `number` | **Enviar via parâmetro de rota** |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso

```json
{
  "id": 1,
  "descricao": "Teclado X",
  "quantidade_estoque": 25,
  "valor": 10000,
  "categoria_id": 1
}
```

`status: 200`

Erros comuns

```json
{
  "message": "Product not found."
}
```

`status: 404`

</details>

<details>
<summary><b>PUT produto-id</b></summary>

Alterar os dados do produto. O `id` deve ser enviado na url.

**Request**

| **Nome**           | **Obrigatório** | **Tipo** | **Descrição**                    |
| :----------------- | :-------------- | :------- | :------------------------------- |
| id                 | sim             | `number` | **Enviar via parâmetro de rota** |
| descricao          | sim             | `string` | Descrição do produto             |
| quantidade_estoque | sim             | `number` | Quantidade de itens no estoque   |
| valor              | sim             | `number` | Valor do produto (em centavos)   |
| categoria_id       | sim             | `number` | Id da categoria do produto       |
| produto_imagem     | não             | `file`   | Arquivo de imagem do produto     |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso <br/> `no body returned for response` <br/> `status: 204` <br/><br/>

Erros comuns

```json
{
  "message": "Product not found."
}
```

`status: 404`

```json
{
  "message": "Category not found."
}
```

`status: 404`

```json
{
  "message": "Description already exists."
}
```

`status: 400`

</details>

<details>
<summary><b>DELETE produto-id</b></summary>

Deletar um produto. O `id` deve ser enviado na url.

**Request**

| **Nome** | **Obrigatório** | **Tipo** | **Descrição**                    |
| :------- | :-------------- | :------- | :------------------------------- |
| id       | sim             | `number` | **Enviar via parâmetro de rota** |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

**Response**

Sucesso  
`no body returned for response` <br/> `status: 204` <br/>

Erros comuns

```json
{
  "message": "Product not found."
}
```

`status: 404`

```json
{
  "message": "This product is linked to an order."
}
```

`status: 400`

</details>
<br/>

**Pedido** - Criação de um novo pedido e listagem de pedidos <br/>

<details>
<summary><b>POST pedido</b></summary>

Criar um pedido.

**Request**

| **Nome**           | **Obrigatório** | **Tipo** | **Descrição**                             |
| :----------------- | :-------------- | :------- | :---------------------------------------- |
| cliente_id         | sim             | `number` | Id do cliente                             |
| observacao         | não             | `string` | Observação para o pedido                  |
| pedido_produtos    | sim             | `array`  | Array com produtos relacionados ao pedido |
| produto_id         | sim             | `number` | Id do produto                             |
| quantidade_produto | sim             | `number` | Quantidade de itens do produto            |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

```json
{
  "cliente_id": 1,
  "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
  "pedido_produtos": [
    {
      "produto_id": 1,
      "quantidade_produto": 10
    },
    {
      "produto_id": 2,
      "quantidade_produto": 20
    }
  ]
}
```

**Response**

Sucesso

```json
{
  "pedido": {
    "id": 1,
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "valor_total": 100000
  },
  "pedido_produtos": [
    {
      "id": 1,
      "pedido_id": 1,
      "produto_id": 1,
      "quantidade_produto": 10,
      "valor_produto": 5000
    },
    {
      "id": 2,
      "pedido_id": 1,
      "produto_id": 2,
      "quantidade_produto": 20,
      "valor_produto": 2500
    }
  ]
}
```

`status: 201` <br /><br /> Erros comuns

```json
{
  "message": "Client not found."
}
```

`status: 404`

```json
{
  "message": "Product not found."
}
```

`status: 404`

```json
{
  "message": "Insufficient stock."
}
```

`status: 400`

</details>

<details>
<summary><b>GET pedido</b></summary>

Listar pedidos. Pode ser passado um parâmetro query `cliente_id` para listar apenas os pedidos de um cliente específico.

**Request**

| **Nome**   | **Obrigatório** | **Tipo** | **Descrição**                             |
| :--------- | :-------------- | :------- | :---------------------------------------- |
| cliente_id | não             | `number` | **Enviar via parâmetro de query na rota** |

> **_NOTA:_** É necessário enviar Token JWT via Authorization Header.

Exemplo de requisição:

`url/pedido?cliente_id=1`

**Response**

Sucesso

```json
[
  {
    "pedido": {
      "id": 1,
      "cliente_id": 1,
      "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
      "valor_total": 100000
    },
    "pedido_produtos": [
      {
        "id": 1,
        "pedido_id": 1,
        "produto_id": 1,
        "quantidade_produto": 10,
        "valor_produto": 5000
      },
      {
        "id": 2,
        "pedido_id": 1,
        "produto_id": 2,
        "quantidade_produto": 20,
        "valor_produto": 2500
      }
    ]
  },
  {
    "pedido": {
      "id": 2,
      "cliente_id": 1,
      "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
      "valor_total": 10000
    },
    "pedido_produtos": [
      {
        "id": 3,
        "pedido_id": 2,
        "produto_id": 1,
        "quantidade_produto": 1,
        "valor_produto": 5000
      },
      {
        "id": 4,
        "pedido_id": 2,
        "produto_id": 2,
        "quantidade_produto": 2,
        "valor_produto": 2500
      }
    ]
  }
]
```

`status: 200`

Sucesso sem retorno

```json
[]
```

`status: 200` <br/>

</details>

## 5. 💻 Tecnologias usadas

Languages, Frameworks & Librarys:  
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![JSON](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) ![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

Organization:  
![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

Tests:  
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white) ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

Database:  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

IDE:  
![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## 6. 👨‍💻 Autor

Criado por [Daniel M. Justo](https://www.linkedin.com/in/danielmjusto/), [Matheus O. da Silva](https://www.linkedin.com/in/matheusdevbackend/), [Ney H. M. Ribeiro](https://www.linkedin.com/in/neyhiwerson/), [Raimundo F. da Silva Neto](https://www.linkedin.com/in/raimundo-ferreira-silva-neto/), [Ricardo J. S. Barbosa](https://www.linkedin.com/in/ricardo-santos-barbosa1/).

Obrigado pela visita!
