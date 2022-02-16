import sinon from 'sinon';

import { signupController } from '../../src/controllers';
import * as signupService from '../../src/services/signupService';

describe('Testando o controller signupController', () => {
  const req: any = {};
  const res: any = {};

  beforeAll(() => {
    req.body = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 409 se o email informado já existir ao efetuar o registro', async () => {
    sinon.stub(signupService, 'signupService')
      .rejects({ status: 409, message: 'Este email já foi cadastrado.' });

    expect(res.status.calledWith(409)).toBe(true);
  });

  it('deve retornar "Este email já foi cadastrado." se o email informado já existir ao efetuar o registro', async () => {
    sinon.stub(signupService, 'signupService')
      .rejects({ status: 409, message: 'Este email já foi cadastrado.' });
    await signupController(req, res);
    expect(res.json.calledWith({ message: 'Este email já foi cadastrado.' })).toBe(true);
  });

  it('deve retornar um status 201 se o usuário for registrado com sucesso', async () => {
    sinon.stub(signupService, 'signupService')
      .resolves({ status: 201, message: 'Registrado com sucesso!' });
    await signupController(req, res);
    expect(res.status.calledWith(201)).toBe(true);
  });

  it('deve retornar "Registrado com sucesso!" se o usuário for registrado com sucesso', async () => {
    sinon.stub(signupService, 'signupService')
      .resolves({ status: 201, message: 'Registrado com sucesso!' });
    await signupController(req, res);
    expect(res.json.calledWith({ message: 'Registrado com sucesso!' })).toBe(true);
  });
});
