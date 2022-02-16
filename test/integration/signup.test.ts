import request from 'supertest';

import app from '../../src/main/app';
import { connection } from '../../src/models/connection';

describe('Testando a rota /signup', () => {
  afterEach(async () => {
    const conn = await connection.connect();
    await conn.query('DELETE FROM "users"');
  });

  it('deve retornar um erro 400 caso o campo nome não exista', (done) => {
    const body = {
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };
    request(app)
      .post('/signup')
      .send(body)
      .expect(400, done);
  });

  it('deve retornar um erro 400 caso o campo nome tiver menos de 2 caracteres', (done) => {
    const body = {
      name: '1',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };
    request(app)
      .post('/signup')
      .send(body)
      .expect(400, done);
  });

  it('deve retornar um erro 400 caso o campo email não exista', (done) => {
    const body = {
      name: 'valid_name',
      email: '',
      password: 'valid_password',
    };
    request(app)
      .post('/signup')
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
      .post('/signup')
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
      .post('/signup')
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
      .post('/signup')
      .send(body)
      .expect(400, done);
  });

  it('deve retornar um status 201 caso o usuário for registrado com sucesso', (done) => {
    const body = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };
    request(app)
      .post('/signup')
      .send(body)
      .expect(201, done);
  });
});
