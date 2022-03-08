import sinon from 'sinon';

import { randomCardController } from '../../src/controllers';
import * as randomCardService from '../../src/services/randomCardService';

describe('Testando o controller randomCardController', () => {
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
    sinon.stub(randomCardService, 'randomCardService')
      .rejects({ status: 404, message: 'Não foi encontrado nenhum card.' });
    await randomCardController(req, res);
    expect(res.status.calledWith(404)).toBe(true);
  });

  it('deve retornar "Não foi encontrado nenhum card." se não encontrar nenhuma card', async () => {
    sinon.stub(randomCardService, 'randomCardService')
      .rejects({ status: 404, message: 'Não foi encontrado nenhum card.' });
    await randomCardController(req, res);
    expect(res.json.calledWith({ message: 'Não foi encontrado nenhum card.' })).toBe(true);
  });

  it('deve retornar um status 200 se encontrar 1 card', async () => {
    sinon.stub(randomCardService, 'randomCardService')
      .resolves({
        status: 200,
        data: [{
          id: 1,
          name: 'valid_name',
          image: 'valid_image.png',
          description: 'valid_description',
        }],
      });
    await randomCardController(req, res);
    expect(res.status.calledWith(200)).toBe(true);
  });
});
