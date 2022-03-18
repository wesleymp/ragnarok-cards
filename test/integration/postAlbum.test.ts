import request from 'supertest';

import app from '../../src/main/app';
import { connection } from '../../src/models/connection';
import { genereteJwt } from '../../src/util/jwt';

describe('Testando a rota /album', () => {
  const data = {
    id: 1,
    name: 'valid_name',
    email: 'valid_email@mail.com',
    role: 'member',
  };

  const token = `Bearer ${genereteJwt(data)}`;

  afterEach(async () => {
    const conn = await connection.connect();
    await conn.query('DELETE FROM "album"');
  });

  it('deve retornar um status 401 se o usuário não informar um token para poder adicionar um card ao álbum', (done) => {
    const body = {
      name: 'valid_name',
      image: 'valid_image.png',
      description: 'valid_description',
    };
    const headers = {
      authorization: '',
    };
    request(app)
      .post('/album')
      .set(headers)
      .send(body)
      .expect(401, done);
  });

  it('deve retornar um status 401 se o usuário informar um token inválido para poder adicionar um card ao álbum', (done) => {
    const body = {
      name: 'valid_name',
      image: 'valid_image.png',
      description: 'valid_description',
    };
    const headers = {
      authorization: 'invalid_token',
    };
    request(app)
      .post('/album')
      .set(headers)
      .send(body)
      .expect(401, done);
  });

  it('deve retornar um status 201 se o usuário adicionar um card ao álbum com sucesso', (done) => {
    const body = {
      id: 1,
    };
    const headers = {
      authorization: token,
    };
    request(app)
      .post('/album')
      .set(headers)
      .send(body)
      .expect(201, done);
  });
});
