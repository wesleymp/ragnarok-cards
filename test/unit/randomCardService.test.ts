import sinon from 'sinon';

import { randomCardService } from '../../src/services';
import * as randomCardModel from '../../src/models/randomCardModel';

describe('Testando o service randomCardService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 404 se não encontrar nenhuma card', async () => {
    const result: any = { rows: [] };
    sinon.stub(randomCardModel, 'randomCardModel').resolves(result);
    try {
      await randomCardService();
    } catch (error: any) {
      expect(error.status).toBe(404);
    }
  });

  it('deve retornar "Não foi encontrado nenhum card." se não encontrar nenhuma card', async () => {
    const result: any = { rows: [] };
    sinon.stub(randomCardModel, 'randomCardModel').resolves(result);
    try {
      await randomCardService();
    } catch (error: any) {
      expect(error.message).toBe('Não foi encontrado nenhum card.');
    }
  });

  it('deve retornar um status 200 se encontrar 1 ou mais cards', async () => {
    const dataUser: any = {
      rows: [
        {
          id: 1,
          name: 'valid_name',
          image: 'valid_image.png',
          description: 'valid_description',
        },
      ],
    };
    sinon.stub(randomCardModel, 'randomCardModel').resolves(dataUser);
    const cardsData = await randomCardService();
    expect(cardsData.status).toBe(200);
  });

  it('deve retornar as propriedades (id, name, image e description) se encontrar 1 ou mais cards', async () => {
    const dataUser: any = {
      rows: [
        {
          id: 1,
          name: 'valid_name',
          image: 'valid_image.png',
          description: 'valid_description',
        },
      ],
    };
    sinon.stub(randomCardModel, 'randomCardModel').resolves(dataUser);
    const cardsData = await randomCardService();
    expect(cardsData.data).toHaveProperty('id');
    expect(cardsData.data).toHaveProperty('name');
    expect(cardsData.data).toHaveProperty('image');
    expect(cardsData.data).toHaveProperty('description');
  });
});
