import sinon from 'sinon';

import { allCardsController } from '../../src/controllers';
import * as allCardsService from '../../src/services/allCardsService';

describe('Testando o controller allCardsController', () => {
  const req: any = {};
  const res: any = {};

  beforeAll(() => {
    req.headers = {
      authorization: 'valid_token',
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 404 se não encontrar nenhuma card', async () => {
    sinon.stub(allCardsService, 'allCardsService')
      .rejects({ status: 404, message: 'Não foi encontrado nenhum card.' });
    await allCardsController(req, res);
    expect(res.status.calledWith(404)).toBe(true);
  });

  it('deve retornar "Não foi encontrado nenhum card." se não encontrar nenhuma card', async () => {
    sinon.stub(allCardsService, 'allCardsService')
      .rejects({ status: 404, message: 'Não foi encontrado nenhum card.' });
    await allCardsController(req, res);
    expect(res.json.calledWith({ message: 'Não foi encontrado nenhum card.' })).toBe(true);
  });

  it('deve retornar um status 201 se encontrar 1 ou mais cards', async () => {
    sinon.stub(allCardsService, 'allCardsService')
      .resolves({
        status: 201,
        data: [{
          id: 1,
          name: 'valid_name',
          image: 'valid_image.png',
          description: 'valid_description',
        }],
      });
    await allCardsController(req, res);
    expect(res.status.calledWith(201)).toBe(true);
  });
});
