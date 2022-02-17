import request from 'supertest';

import app from '../../src/main/app';
import { connection } from '../../src/models/connection';

describe('Testando a rota /signin', () => {
  beforeAll(async () => {
    const conn = await connection.connect();
    await conn.query('INSERT INTO "users" ("name", "email", "password") VALUES (\'valid_name\', \'valid_email@mail.com\', \'valid_password\')');
  });

  afterAll(async () => {
    const conn = await connection.connect();
    await conn.query('DELETE FROM "users"');
  });

  it('deve retornar um erro 400 caso o campo email não exista', (done) => {
    const body = {
      name: 'valid_name',
      email: '',
      password: 'valid_password',
    };
    request(app)
      .post('/signin')
      .send(body)
      .expect(400, done);
  });

  it('deve retornar um erro 400 caso o campo email informado for inválido', (done) => {
    const body = {
      name: 'valid_name',
      email: 'invalid_emailemail.com',
      password: 'valid_password',
    };
    request(app)
      .post('/signin')
      .send(body)
      .expect(400, done);
  });

  it('deve retornar um erro 400 caso o campo password não exista', (done) => {
    const body = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: '',
    };
    request(app)
      .post('/signin')
      .send(body)
      .expect(400, done);
  });

  it('deve retornar um erro 400 caso o campo password tiver menos de 6 caracteres', (done) => {
    const body = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: '12345',
    };
    request(app)
      .post('/signin')
      .send(body)
      .expect(400, done);
  });

  it('deve retornar um erro 401 caso o campo email informado for inválido', (done) => {
    const body = {
      email: 'invalid_email@mail.com',
      password: 'valid_password',
    };
    request(app)
      .post('/signin')
      .send(body)
      .expect(401, done);
  });

  it('deve retornar um erro 401 caso o campo senha informado for inválido', (done) => {
    const body = {
      email: 'valid_email@mail.com',
      password: 'invalid_password',
    };
    request(app)
      .post('/signin')
      .send(body)
      .expect(401, done);
  });

  it('deve retornar um 200 caso o campo email/senha informado for válido', (done) => {
    const body = {
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };
    request(app)
      .post('/signin')
      .send(body)
      .expect(200, done);
  });

  it('deve retornar um token caso o campo email/senha informado for válido', (done) => {
    const body = {
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };
    request(app)
      .post('/signin')
      .send(body)
      .then((res) => {
        expect(res.body).toHaveProperty('token');
        return done();
      });
  });
});
