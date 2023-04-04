# TIVIC BANK
TIVIC BANK é um projeto monorepo proposto como um desafio técnico pela empresa TIVIC. O objetivo deste projeto é criar uma aplicação bancária simples, com funcionalidades de depósito, saque e transferência de dinheiro.

A aplicação é dividida em duas partes: o frontend e o backend. O frontend é desenvolvido em Angular, enquanto o backend é desenvolvido em Node com TypeScript e Express e utiliza MySQL como banco de dados.

## Pré-requisitos
Node.js (versão 12 ou superior)
Angular CLI (versão 11 ou superior)
MySQL (versão 8 ou superior)

## Instalação
Para instalar a aplicação, siga os seguintes passos:

1. Clone o repositório:

```bash
git clone https://github.com/alissonfr/tivic-bank.git
```

2. Instale as dependências do backend:
```bash
cd backend
npm install
```

3. Execute o script abaixo no seu MySQL para criar o schema do banco de dados
```SQL
CREATE DATABASE tivic_bank;
```

4. Ainda na pasta /backend, execute os comandos para a criação das tabelas no MySQL e a população dessas tabelas com dados de exemplo:
```bash
npm run migrate
npm run seed
```

5. Caso seja necessário, configure as variáveis de ambiente no arquivo .env, preenchendo os valores de DB_HOST, DB_PORT, DB_USER, DB_PASSWORD com as informações do banco de dados MySQL criado anteriormente.

```javascript
DB_HOST = localhost
DB_PORT = 3306
DB_USER = root
DB_PASSWORD = admin
```


6. Inicie o servidor:

```bash
npm run start:dev
```

7. Abra outro terminal, navegue até a pasta do frontend e instale as dependências:
```bash
cd frontend
npm install
```

8. Inicie o servidor de desenvolvimento:
```bash
npm start
```

9. Abra o navegador e acesse http://localhost:4200.
- Usuário padrão pré cadastrado para testes:
    - Email: alisson@gmail.com
    - Senha: teste

## Funcionalidades
A aplicação permite que os usuários realizem as seguintes operações:

- Verificação de saldo em conta corrente
- Depósito em conta corrente
- Saque em conta corrente
- Cadastro de usuário e conta corrente
- Cadastro e listagem de transações
- Login de usuário e autenticação com criptografia de senha

## Estrutura do projeto
O projeto está organizado da seguinte forma:
- Backend: contém o código do servidor, desenvolvido em Node com TypeScript e Express, que se comunica com o banco de dados MySQL por meio do query builder Knex e fornece uma API REST para o frontend.
- Frontend: contém o código do cliente, desenvolvido em Angular 15, que se comunica com o servidor através da API REST fornecida e apresenta a interface gráfica para o usuário.
