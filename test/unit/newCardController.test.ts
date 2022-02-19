import sinon from 'sinon';

import { newCardController } from '../../src/controllers';
import * as newCardService from '../../src/services/newCardService';

describe('Testando o controller newCardController', () => {
  const req: any = {};
  const res: any = {};

  beforeAll(() => {
    req.body = {
      name: 'valid_name',
      image: 'valid_image.png',
      description: 'valid_description',
    };
    req.headers = {
      authorization: 'valid_token',
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 401 se ao adicionar um novo card o usuário não for admin', async () => {
    sinon.stub(newCardService, 'newCardService')
      .rejects({ status: 401, message: 'Você não tem permissão para adicionar um novo card.' });
    await newCardController(req, res);
    expect(res.status.calledWith(401)).toBe(true);
  });

  it('deve retornar "Você não tem permissão para adicionar um novo card." se ao adicionar um novo card o usuário não for admin', async () => {
    sinon.stub(newCardService, 'newCardService')
      .rejects({ status: 401, message: 'Você não tem permissão para adicionar um novo card.' });
    await newCardController(req, res);
    expect(res.json.calledWith({ message: 'Você não tem permissão para adicionar um novo card.' })).toBe(true);
  });

  it('deve retornar um status 201 se o card for adicionado com sucesso', async () => {
    sinon.stub(newCardService, 'newCardService')
      .rejects({ status: 201, message: 'Card adicionado com sucesso!' });
    await newCardController(req, res);
    expect(res.status.calledWith(201)).toBe(true);
  });

  it('deve retornar "Card adicionado com sucesso!" se o card for adicionado com sucesso', async () => {
    sinon.stub(newCardService, 'newCardService')
      .rejects({ status: 201, message: 'Card adicionado com sucesso!' });
    await newCardController(req, res);
    expect(res.json.calledWith({ message: 'Card adicionado com sucesso!' })).toBe(true);
  });
});
