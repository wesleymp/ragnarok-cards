import request from 'supertest';

import app from '../../src/main/app';
import { connection } from '../../src/models/connection';
import { genereteJwt } from '../../src/util/jwt';

describe('Testando a rota /random-card', () => {
  const data = {
    id: 1,
    name: 'valid_name',
    email: 'valid_email@mail.com',
    role: 'member',
  };

  const token = `Bearer ${genereteJwt(data)}`;

  afterEach(async () => {
    const conn = await connection.connect();
    await conn.query('DELETE FROM "cards"');
  });

  it('deve retornar um status 401 se o usuário não informar um token para acessar a rota', (done) => {
    const headers = {
      authorization: '',
    };
    request(app)
      .get('/random-card')
      .set(headers)
      .expect(401, done);
  });

  it('deve retornar um status 401 se o usuário informar um token inválido para acessar a rota', (done) => {
    const headers = {
      authorization: 'invalid_token',
    };
    request(app)
      .get('/random-card')
      .set(headers)
      .expect(401, done);
  });

  it('deve retornar um status 404 se não encontrar nenhum card', (done) => {
    const headers = {
      authorization: token,
    };
    request(app)
      .get('/random-card')
      .set(headers)
      .expect(404, done);
  });

  it('deve retornar um status 200 se encontrar 1', (done) => {
    connection.connect().then((conn) => conn.query('INSERT INTO "cards" (name, image, description) VALUES (\'valid_name\', \'valid_image.png\', \'valid_description\')'));
    const headers = {
      authorization: token,
    };
    request(app)
      .get('/random-card')
      .set(headers)
      .expect(200, done);
  });
});
