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
      .set('Accept', 'application/json')
      .send(body)
      .expect(400, done);
  });
});
