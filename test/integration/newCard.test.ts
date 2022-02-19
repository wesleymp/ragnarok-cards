import request from 'supertest';

import app from '../../src/main/app';
import { connection } from '../../src/models/connection';
import { genereteJwt } from '../../src/util/jwt';

describe('Testando a rota /new-card', () => {
  const data = {
    id: 1,
    name: 'valid_name',
    email: 'valid_email@mail.com',
    role: 'admin',
  };

  const token = `Bearer ${genereteJwt(data)}`;

  afterEach(async () => {
    const conn = await connection.connect();
    await conn.query('DELETE FROM "cards"');
  });

  it('deve retornar um status 401 se o usuário não informar um token para poder adicionar um novo card', (done) => {
    const body = {
      name: 'valid_name',
      image: 'valid_image.png',
      description: 'valid_description',
    };
    const headers = {
      authorization: '',
    };
    request(app)
      .post('/new-card')
      .set(headers)
      .send(body)
      .expect(401, done);
  });

  it('deve retornar um status 401 se o usuário informar um token inválido para poder adicionar um novo card', (done) => {
    const body = {
      name: 'valid_name',
      image: 'valid_image.png',
      description: 'valid_description',
    };
    const headers = {
      authorization: 'invalid_token',
    };
    request(app)
      .post('/new-card')
      .set(headers)
      .send(body)
      .expect(401, done);
  });

  it('deve retornar um status 401 se o usuário não for admin para poder adicionar um novo card', (done) => {
    const body = {
      name: 'valid_name',
      image: 'valid_image.png',
      description: 'valid_description',
    };
    const dataMember = {
      id: 1,
      name: 'valid_name',
      email: 'valid_email@mail.com',
      role: 'member',
    };
    const tokenMember = `Bearer ${genereteJwt(dataMember)}`;
    const headers = {
      authorization: tokenMember,
    };
    request(app)
      .post('/new-card')
      .set(headers)
      .send(body)
      .expect(401, done);
  });

  it('deve retornar um status 201 se o usuário adicionar um card com sucesso', (done) => {
    const body = {
      name: 'valid_name',
      image: 'valid_image.png',
      description: 'valid_description',
    };
    const headers = {
      authorization: token,
    };
    request(app)
      .post('/new-card')
      .set(headers)
      .send(body)
      .expect(201, done);
  });
});
