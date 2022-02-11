import request from 'supertest';

import app from '../src/main/app';

describe('Testando a rota /signup', () => {
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
});
