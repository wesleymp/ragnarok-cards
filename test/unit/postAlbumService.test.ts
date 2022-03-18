import sinon from 'sinon';

import { postAlbumService, checkCardinAlbum, checkDateAlbum } from '../../src/services';
import { authorizationRemovePrefix, genereteJwt, verifyToken } from '../../src/util/jwt';
import * as postAlbumModel from '../../src/models/postAlbumModel';

describe('Testando o service postAlbumService', () => {
  const data = {
    id: 1,
    name: 'valid_name',
    email: 'valid_email@mail.com',
    role: 'admin',
  };

  const date = new Date();

  const dataAlbumModel = [
    {
      user_id: 1,
      card_id: 1,
      card_date: new Date(date.setHours(date.getHours() + 2)),
    },
  ];

  const token = `Bearer ${genereteJwt(data)}`;

  const body = {
    id: 1,
  };

  const headers = {
    authorization: token,
  };

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 409 se ao adicionar o card o tempo de delay ainda não estiver passado', async () => {
    const dataAuthorization = verifyToken(authorizationRemovePrefix(headers.authorization));
    const result: any = { rowCount: 1, rows: dataAlbumModel };
    sinon.stub(postAlbumModel, 'checkAlbumModel').resolves(result);
    try {
      await checkDateAlbum(dataAuthorization.id);
    } catch (error: any) {
      expect(error.status).toBe(409);
    }
  });

  it('deve retornar "Você ainda não pode pegar esta figura." se ao adicionar o card o tempo de delay ainda não estiver passado', async () => {
    const dataAuthorization = verifyToken(authorizationRemovePrefix(headers.authorization));
    const result: any = { rowCount: 1, rows: dataAlbumModel };
    sinon.stub(postAlbumModel, 'checkAlbumModel').resolves(result);
    try {
      await checkDateAlbum(dataAuthorization.id);
    } catch (error: any) {
      expect(error.message).toBe('Você ainda não pode pegar esta figura.');
    }
  });

  it('deve retornar um status 409 se ao adicionar o card o mesmo já estiver no ábum', async () => {
    const result: any = { rowCount: 1 };
    sinon.stub(postAlbumModel, 'checkCardInAlbumModel').resolves(result);
    try {
      await checkCardinAlbum(body.id);
    } catch (error: any) {
      expect(error.status).toBe(409);
    }
  });

  it('deve retornar "Alguem já possui esta figura." se ao aodicionar o card o mesmo já estiver no ábum', async () => {
    const result: any = { rowCount: 1 };
    sinon.stub(postAlbumModel, 'checkCardInAlbumModel').resolves(result);
    try {
      await checkCardinAlbum(body.id);
    } catch (error: any) {
      expect(error.message).toBe('Alguem já possui esta figura.');
    }
  });

  it('deve retornar um status 201 se o card for adicionado com sucesso ao álbum', async () => {
    const result: any = { rowCount: 0 };
    sinon.stub(postAlbumModel, 'checkCardInAlbumModel').resolves(result);
    sinon.stub(postAlbumModel, 'postAlbumModel').resolves();
    const dataAlbum = await postAlbumService(body, headers);
    expect(dataAlbum.status).toBe(201);
  });

  it('deve retornar "Card adicionado com sucesso!" se o card for adicionado com sucesso ao álbum', async () => {
    const result: any = { rowCount: 0 };
    sinon.stub(postAlbumModel, 'checkCardInAlbumModel').resolves(result);
    sinon.stub(postAlbumModel, 'postAlbumModel').resolves();
    const dataAlbum = await postAlbumService(body, headers);
    expect(dataAlbum.message).toBe('Card adicionado com sucesso!');
  });
});
