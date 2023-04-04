# TIVIC BANK
TIVIC BANK é um projeto monorepo proposto como um desafio técnico pela empresa TIVIC. O objetivo deste projeto é criar uma aplicação bancária simples, com funcionalidades de depósito, saque e transferência de dinheiro.

A aplicação é dividida em duas partes: o frontend e o backend. O frontend é desenvolvido em Angular, enquanto o backend é desenvolvido em Node com TypeScript e Express e utiliza MySQL como banco de dados.

## Instalação
Para instalar a aplicação, siga os seguintes passos:

1. Instale as dependências do backend:
```bash
cd backend
npm install
```

2. Execute o script MySQL abaixo para criar o schema do banco de dados
```SQL
CREATE DATABASE tivic_bank;
```

3. Execute os comandos para a criação das tabelas no MySQL e a população dessas tabelas com dados de exemplo:
```bash
npm run migrate
npm run seed
```

4. Caso seja necessário, configure as variáveis de ambiente no arquivo .env, preenchendo os valores de DB_HOST, DB_PORT, DB_USER, DB_PASSWORD com as informações do banco de dados MySQL criado anteriormente.


5. Inicie o servidor:

```bash
npm start
```