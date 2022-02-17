import sinon from 'sinon';

import { signinController } from '../../src/controllers';
import * as signinService from '../../src/services/signinService';
import { genereteJwt } from '../../src/util/jwt';

describe('Testando o controller signinController', () => {
  const req: any = {};
  const res: any = {};

  beforeAll(() => {
    req.body = {
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 401 se o email/senha informado não existir ou for incorreto para efetuar o login', async () => {
    sinon.stub(signinService, 'signinService')
      .rejects({ status: 401, message: 'Email ou senha inválidos.' });
    await signinController(req, res);
    expect(res.status.calledWith(401)).toBe(true);
  });

  it('deve retornar "Email ou senha inválidos." se o email/senha informado não existir ou for incorreto para efetuar o login', async () => {
    sinon.stub(signinService, 'signinService')
      .rejects({ status: 401, message: 'Email ou senha inválidos.' });
    await signinController(req, res);
    expect(res.json.calledWith({ message: 'Email ou senha inválidos.' })).toBe(true);
  });

  it('deve retornar um status 200 se o usuário efetuar o login com sucesso', async () => {
    const dataUser = {
      id: 1,
      name: 'valid_name',
      email: 'valid_email@mail.com',
    };
    sinon.stub(signinService, 'signinService')
      .resolves({ status: 200, token: genereteJwt(dataUser) });
    await signinController(req, res);
    expect(res.status.calledWith(200)).toBe(true);
  });

  it('deve retornar um token se o usuário efetuar o login com sucesso', async () => {
    const dataUser = {
      id: 1,
      name: 'valid_name',
      email: 'valid_email@mail.com',
    };
    sinon.stub(signinService, 'signinService')
      .resolves({ status: 200, token: genereteJwt(dataUser) });
    await signinController(req, res);
    expect(res.json.calledWith({ token: genereteJwt(dataUser) })).toBe(true);
  });
});
