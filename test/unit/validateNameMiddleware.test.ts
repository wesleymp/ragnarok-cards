import sinon from 'sinon';

import { validateNameMiddleware } from '../../src/middlewares';

describe('Testando o middleware validateNameMiddleware', () => {
  const req: any = {};
  const res: any = {};
  const next: any = {};

  beforeEach(() => {
    req.body = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('deve retornar um status 400 se o usuário não informar um name para criar um novo registro', () => {
    req.body.name = '';
    validateNameMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar "O campo nome não pode ser nulo." se o usuário não informar um name para criar um novo registro', () => {
    req.body.name = '';
    validateNameMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'O campo nome não pode ser nulo.' })).toBe(true);
  });

  it('deve retornar um status 400 se o usuário informar um name menor que 2 caracteres para criar um novo registro', () => {
    req.body.name = '1';
    validateNameMiddleware(req, res, next);
    expect(res.status.calledWith(400)).toBe(true);
  });

  it('deve retornar "O campo nome deve ter mais de 2 caracteres." se o usuário informar um name menor que 2 caracteres para criar um novo registro', () => {
    req.body.name = '1';
    validateNameMiddleware(req, res, next);
    expect(res.json.calledWith({ message: 'O campo nome deve ter mais de 2 caracteres.' })).toBe(true);
  });
});
