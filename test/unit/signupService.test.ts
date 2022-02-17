import sinon from 'sinon';

import { signupService, checkEmail } from '../../src/services';
import * as signupModel from '../../src/models/signupModel';
import * as signinModel from '../../src/models/signinModel';

describe('Testando o service signupService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 409 se o email informado já existir ao efetuar o registro', async () => {
    const result: any = { rowCount: 1 };
    sinon.stub(signinModel, 'signinModel').resolves(result);
    try {
      await checkEmail('exists_email@mail.com');
    } catch (error: any) {
      expect(error.status).toBe(409);
    }
  });

  it('deve retornar "Este email já foi cadastrado." se o email informado já existir ao efetuar o registro', async () => {
    const result: any = { rowCount: 1 };
    sinon.stub(signinModel, 'signinModel').resolves(result);
    try {
      await checkEmail('exists_email@mail.com');
    } catch (error: any) {
      expect(error.message).toBe('Este email já foi cadastrado.');
    }
  });

  it('deve retornar um status 201 se o usuário for registrado com sucesso', async () => {
    sinon.stub(signupModel, 'signupModel').resolves();
    const dataSignup = await signupService('valid_name', 'valid_email@mail.com', 'valid_password');
    expect(dataSignup.status).toBe(201);
  });

  it('deve retornar "Registrado com sucesso!" se o usuário for registrado com sucesso', async () => {
    sinon.stub(signupModel, 'signupModel').resolves();
    const dataSignup = await signupService('valid_name', 'valid_email@mail.com', 'valid_password');
    expect(dataSignup.message).toBe('Registrado com sucesso!');
  });
});
