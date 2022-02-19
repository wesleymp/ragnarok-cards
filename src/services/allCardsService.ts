import { allCardsModel } from '../models/allCardsModel';
import { error } from './helpers/error';

export const allCardsService = async () => {
  const dataCards = await allCardsModel();
  if (dataCards.rowCount === 0) {
    throw error(404, 'Não foi encontrado nenhum card.');
  }
  return { status: 200, data: dataCards.rows };
};
