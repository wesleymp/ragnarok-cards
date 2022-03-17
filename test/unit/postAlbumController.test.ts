import sinon from 'sinon';

import { albumController } from '../../src/controllers';
import * as postAlbumService from '../../src/services/postAlbumService';

describe('Testando o controller postAlbumController', () => {
  const req: any = {};
  const res: any = {};

  beforeAll(() => {
    req.body = {
      id: 1,
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

  it('deve retornar um status 401 se ao adicionar um card ao álbum o usuário não for admin', async () => {
    sinon.stub(postAlbumService, 'postAlbumService')
      .rejects({ status: 401, message: 'Você não tem permissão para adicionar um novo card.' });
    await albumController(req, res);
    expect(res.status.calledWith(401)).toBe(true);
  });

  it('deve retornar um status 409 se ao adicionar um card ao álbum este card já estiver lá', async () => {
    sinon.stub(postAlbumService, 'postAlbumService')
      .rejects({ status: 409, message: 'Alguem já possui esta figura.' });
    await albumController(req, res);
    expect(res.status.calledWith(409)).toBe(true);
  });

  it('deve retornar "Alguem já possui esta figura." se ao adicionar um card ao álbum este card já estiver lá', async () => {
    sinon.stub(postAlbumService, 'postAlbumService')
      .rejects({ status: 409, message: 'Alguem já possui esta figura.' });
    await albumController(req, res);
    expect(res.json.calledWith({ message: 'Alguem já possui esta figura.' })).toBe(true);
  });

  it('deve retornar um status 201 se o card for adicionado ao álbum com sucesso', async () => {
    sinon.stub(postAlbumService, 'postAlbumService')
      .resolves({ status: 201, message: 'Card adicionado com sucesso!' });
    await albumController(req, res);
    expect(res.status.calledWith(201)).toBe(true);
  });

  it('deve retornar "Card adicionado com sucesso!" se o card for adicionado ao álbum com sucesso', async () => {
    sinon.stub(postAlbumService, 'postAlbumService')
      .resolves({ status: 201, message: 'Card adicionado com sucesso!' });
    await albumController(req, res);
    expect(res.json.calledWith({ message: 'Card adicionado com sucesso!' })).toBe(true);
  });
});
