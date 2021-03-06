# API Ragnarok Cards

- API para coleção de cartas, contem cartas, itens entre outras coisas do jogo Ragnarok Online.
- Você pode dar rolls e assim selecionar uma carta para seu álbum, sendo que cada usuário podera selecionar apenas 1 carta a cada 2 horas e não podendo ter cartas repetidas.

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

[POST]: `/new-card` | Rota para adicionar um novo card.

- Precisa enviar um _`Bearer Auth`_ e ser admin para poder adicionar um card.
- A imagem do card dever ser um link externo, nesta aplicação não é possível enviar um arquivo de imagem.

_Request Body:_

```json
{
  "name": "Example Name",
  "image": "https://exemplo-site.com/example_image.png",
  "description": "example_description"
}
```

[GET]: `/all-cards` | Rota para visualizar todos os cards.

- Precisa enviar um _`Bearer Auth`_ para visualizar todos os cards.

[GET]: `/random-card` | Rota que mostra um card aleatório.

- Precisa enviar um _`Bearer Auth`_ para visualizar o card.

[POST]: `/album` | Rota para adicionar um card ao álbum.

- Precisa enviar um _`Bearer Auth`_ para poder adicionar um card ao álbum.
- O id enviado no request é o do card, portando antes de adicionar um card ao álbum, adicione um card na aplicação.

_Request Body:_

```json
{
  "id": 1
}
```

# Database

## OBS: _Caso for rodar os testes crie um outro banco de dados com as mesmas tabelas. A coluna role está como valor default `admin` para poder adicionar um card em produção deve ser modificado para `member`_

- Tabela `users`

```sql
create table "users"(
	id serial primary key not null,
	name varchar(50) not null,
	email varchar (100) not null,
	role varchar (50) DEFAULT 'admin',
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

- Tabela `album`

```sql
create table "album"(
	user_id INTEGER,
	card_id INTEGER,
	card_date TIMESTAMP,
	PRIMARY KEY (user_id, card_id)
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
