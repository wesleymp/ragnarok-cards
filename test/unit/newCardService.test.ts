import sinon from 'sinon';

import { newCardService, checkRole, getPayloadToken } from '../../src/services';
import { genereteJwt } from '../../src/util/jwt';
import * as newCardModel from '../../src/models/newCardModel';

describe('Testando o service newCardService', () => {
  const data = {
    id: 1,
    name: 'valid_name',
    email: 'valid_email@mail.com',
    role: 'admin',
  };

  const token = `Bearer ${genereteJwt(data)}`;

  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar um status 401 se a role do usuário não for admin', async () => {
    try {
      await checkRole('member');
    } catch (error: any) {
      expect(error.status).toBe(401);
    }
  });

  it('deve retornar "Você não tem permissão para adicionar um novo card." se a role do usuário não for admin', async () => {
    try {
      await checkRole('member');
    } catch (error: any) {
      expect(error.message).toBe('Você não tem permissão para adicionar um novo card.');
    }
  });

  it('deve conter a propriedade role no retorno da função "getPayloadToken"', () => {
    const payload = getPayloadToken(token);
    expect(payload).toHaveProperty('role');
  });

  it('deve retornar um status 201 se o card for adicionado com sucesso', async () => {
    sinon.stub(newCardModel, 'newCardModel').resolves();
    const dataNewCard = await newCardService('valid_name', 'valid_image.png', 'valid_description', token);
    expect(dataNewCard.status).toBe(201);
  });

  it('deve retornar "Card adicionado com sucesso!" se o card for adicionado com sucesso', async () => {
    sinon.stub(newCardModel, 'newCardModel').resolves();
    const dataNewCard = await newCardService('valid_name', 'valid_image.png', 'valid_description', token);
    expect(dataNewCard.message).toBe('Card adicionado com sucesso!');
  });
});
