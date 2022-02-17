import sinon from 'sinon';

import { signinService } from '../../src/services';
import * as signinModel from '../../src/models/signinModel';

describe('Testando o service signinService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 401 se o email/senha informado não existir ou for incorreto para efetuar o login', async () => {
    const result: any = { rows: [] };
    sinon.stub(signinModel, 'signinModel').resolves(result);
    try {
      await signinService('invalid_email@mail.com', 'valid_password');
    } catch (error: any) {
      expect(error.status).toBe(401);
    }
  });

  it('deve retornar um status 401 se o email/senha informado não existir ou for incorreto para efetuar o login', async () => {
    const result: any = { rows: [] };
    sinon.stub(signinModel, 'signinModel').resolves(result);
    try {
      await signinService('valid_email@mail.com', 'invalid_password');
    } catch (error: any) {
      expect(error.message).toBe('Email ou senha inválidos.');
    }
  });

  it('deve retornar um status 200 se o usuário efetuar o login com sucesso', async () => {
    const dataUser: any = {
      rows: [
        {
          id: 1,
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'valid_password',
        },
      ],
    };
    sinon.stub(signinModel, 'signinModel').resolves(dataUser);
    const userData = await signinService('valid_email@mail.com', 'valid_password');
    expect(userData.status).toBe(200);
  });

  it('deve retornar um token se o usuário efetuar o login com sucesso', async () => {
    const dataUser: any = {
      rows: [
        {
          id: 1,
          name: 'valid_name',
          email: 'valid_email@mail.com',
          password: 'valid_password',
        },
      ],
    };
    sinon.stub(signinModel, 'signinModel').resolves(dataUser);
    const userData = await signinService('valid_email@mail.com', 'valid_password');
    expect(userData).toHaveProperty('token');
  });
});
