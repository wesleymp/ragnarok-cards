import sinon from 'sinon';

import { allCardsService } from '../../src/services';
import * as allCardsModel from '../../src/models/allCardsModel';

describe('Testando o service allCardsService', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 404 se não encontrar nenhuma card', async () => {
    const result: any = { rowCount: 0 };
    sinon.stub(allCardsModel, 'allCardsModel').resolves(result);
    try {
      await allCardsService();
    } catch (error: any) {
      expect(error.status).toBe(404);
    }
  });

  it('deve retornar "Não foi encontrado nenhum card." se não encontrar nenhuma card', async () => {
    const result: any = { rowCount: 0 };
    sinon.stub(allCardsModel, 'allCardsModel').resolves(result);
    try {
      await allCardsService();
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
    sinon.stub(allCardsModel, 'allCardsModel').resolves(dataUser);
    const cardsData = await allCardsService();
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
    sinon.stub(allCardsModel, 'allCardsModel').resolves(dataUser);
    const cardsData = await allCardsService();
    expect(cardsData.data[0]).toHaveProperty('id');
    expect(cardsData.data[0]).toHaveProperty('name');
    expect(cardsData.data[0]).toHaveProperty('image');
    expect(cardsData.data[0]).toHaveProperty('description');
  });
});
