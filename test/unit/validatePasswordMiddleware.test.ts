import sinon from 'sinon';

import { validatePasswordMiddleware } from '../../src/middlewares';

describe('Testando o middleware validatePasswordMiddleware', () => {
  const req: any = {};
  const res: any = {};
  const next: any = {};

  beforeEach(() => {
    req.body = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 400 se o usuário não informar um password para criar um novo registro', () => {
    req.body.password = '';
    validatePasswordMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar "O campo senha não pode ser nulo." se o usuário não informar um password para criar um novo registro', () => {
    req.body.password = '';
    validatePasswordMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'O campo senha não pode ser nulo.' })).toBe(true);
  });

  it('deve retornar um status 400 se o usuário informar um password menor que 6 caracteres para criar um novo registro', () => {
    req.body.password = '12345';
    validatePasswordMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar "O campo senha deve ter mais de 6 caracteres." se o usuário informar um password menor que 6 caracteres para criar um novo registro', () => {
    req.body.password = '12345';
    validatePasswordMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'O campo senha deve ter mais de 6 caracteres.' })).toBe(true);
  });
});
