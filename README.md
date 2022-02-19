# Em desenvolvimento ...

# API Ragnarok Cards

- API para coleção de cartas, contem cartas, itens entre outras coisas do jogo Ragnarok Online.
- Você pode dar rolls e assim selecionar uma carta para seu álbum, sendo que cada usuário podera selecionar apenas 1 carta a cada 2 horas e não podendo ter cartas repetidas.
- Você também pode dar um like na sua carta favorita e cada carta só poderá ter 1 like por usuário.

Índices

- [Tecnologias](#Tecnologias)
- [Instalação](#Instalação)
- [Informações da aplicação](#Aplicação)
- [Banco de Dados](#Database)
- [Realizando os testes](#Testes)

# Tecnologias

- Node.js: https://nodejs.org/en/
- TypeScript: https://www.typescriptlang.org/
- Express: https://expressjs.com/pt-br/
- Postgres: https://github.com/brianc/node-postgres/tree/master/packages/pg
- Cors: https://github.com/expressjs/cors
- Dotenv: https://github.com/motdotla/dotenv
- Validator: https://github.com/validatorjs/validator.js
- Jsonwebtoken: https://github.com/auth0/node-jsonwebtoken

# Instalação

- `git clone https://github.com/wesleymp/ragnarok-cards.git`

Entra na pasta do projeto `cd ragnarok-cards`

Utilize o comando `npm install`

Modifique o .env.example para .env na raiz do projeto e adicione as váriaveis de ambiente

- _Exemplo de como deve ficar_

```
PORT=3000

SECRET_KEY_JWT=123

DATABASE_HOST=postgres://root:root@127.0.0.1:5432/ragnarok

DATABASE_HOST_TEST=postgres://root:root@127.0.0.1:5432/card_test
```

# Aplicação

- Rodar a aplicação `npm run dev`

---

_Rotas_

[POST]: `/signup` | Rota para registrar um novo usuário.

_Request Body:_

```json
{
  "name": "Example Name",
  "email": "example_email@mail.com",
  "password": "example_password"
}
```

[POST]: `/signin` | Rota para efetuar o login e gerar um token de acesso.

_Request Body:_

```json
{
  "email": "example_email@mail.com",
  "password": "example_password"
}
```

[POST]: `/new-card` | Rota para adicionar um novo card

- Precisa enviar um _`Bearer Auth`_ e ser admin para poder adicionar um card.

_Request Body:_

```json
{
  "name": "Example Name",
  "image": "example_image.png",
  "description": "example_description"
}
```

# Database

## OBS: _Caso for rodar os testes crie um outro banco de dados com as mesmas tabelas_

- Tabela `users`

```sql
create table "users"(
	id serial primary key not null,
	name varchar(50) not null,
	email varchar (100) not null,
	password varchar (70) not null
);
```

- Tabela `cards`

```sql
create table "cards"(
	id serial primary key not null,
	name varchar(50) not null,
	image varchar (255) not null,
	description text
);
```

# Testes

### Verifique o scrips do `package.json` para poder rodar os testes corretamente

_Para rodar no windows_

```json
  "scripts": {
    "test": "set NODE_ENV=test&& jest --runInBand --noStackTrace --forceExit",
    "test:unit": "jest unit --runInBand --noStackTrace --forceExit",
    "test:integration": "set NODE_ENV=test&& jest integration --runInBand --noStackTrace --forceExit",
    "test:coverage": "set NODE_ENV=test&& jest --coverage --runInBand --noStackTrace --forceExit",
    "dev": "nodemon src/main/server.ts"
  }
```

_Para rodar no Linux ou Mac_

```json
  "scripts": {
    "test": "NODE_ENV=test jest --runInBand --noStackTrace --forceExit",
    "test:unit": "jest unit --runInBand --noStackTrace --forceExit",
    "test:integration": "NODE_ENV=test jest integration --runInBand --noStackTrace --forceExit",
    "test:coverage": "NODE_ENV=test jest --coverage --runInBand --noStackTrace --forceExit",
    "dev": "nodemon src/main/server.ts"
  }
```

Rodando os testes

### Para rodar o `npm test`, `npm run test:integration` e `npm run test:coverage` precisa estar instalado o Postgres e estar criado o banco de dado de teste com as tabelas.

- `npm test` para rodar todos os testes
- `npm run test:unit` para rodar os testes unitários
- `npm run test:integration` para rodar os teste de integração
- `npm run test:coverage` para rodar os testes com o coverage
