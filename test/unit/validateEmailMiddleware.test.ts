import sinon from 'sinon';

import { validateEmailMiddleware } from '../../src/middlewares';

describe('Testando o middleware validateEmailMiddleware', () => {
  const req: any = {};
  const res: any = {};
  const next: any = {};

  beforeEach(() => {
    req.body = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 400 se o usuário não informar um email para criar um novo registro', () => {
    req.body.email = '';
    validateEmailMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar "O campo email não pode ser nulo." se o usuário não informar um email para criar um novo registro', () => {
    req.body.email = '';
    validateEmailMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'O campo email não pode ser nulo.' })).toBe(true);
  });

  it('deve retornar um status 400 se o usuário informar um email inválido para criar um novo registro', () => {
    req.body.email = 'invalid_emailmail.com';
    validateEmailMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar "Email inválido." se o usuário informar um email inválido para criar um novo registro', () => {
    req.body.email = 'invalid_emailmail.com';
    validateEmailMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'Email inválido.' })).toBe(true);
  });
});
