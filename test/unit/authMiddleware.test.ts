import sinon from 'sinon';

import { authMiddleware } from '../../src/middlewares';

describe('Testando o middleware authMiddleware', () => {
  const req: any = {};
  const res: any = {};
  const next: any = {};

  beforeEach(() => {
    req.headers = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 401 se o usuário não informar um token ao efetuar o login', () => {
    req.headers.authorization = '';
    authMiddleware(req, res, next);
    expect(res.status.calledWith(401)).toBe(true);
  });

  it('deve retornar "Token não encontrado." se o usuário não informar um token ao efetuar o login', () => {
    req.headers.authorization = '';
    authMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Token não encontrado.' })).toBe(true);
  });

  it('deve retornar um status 401 se o usuário informar um token inválido ao efetuar o login', () => {
    req.headers.authorization = 'invalid_token';
    authMiddleware(req, res, next);
    expect(res.status.calledWith(401)).toBe(true);
  });

  it('deve retornar "Token não encontrado." se o usuário informar um token inválido ao efetuar o login', () => {
    req.headers.authorization = 'invalid_token';
    authMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Token inválido.' })).toBe(true);
  });
});
