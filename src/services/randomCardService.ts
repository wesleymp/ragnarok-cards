import { randomCardModel } from '../models/randomCardModel';
import { error } from './helpers/error';

export const randomCardService = async () => {
  const dataCards = await randomCardModel();
  if (dataCards.rows.length === 0) {
    throw error(404, 'Não foi encontrado nenhum card.');
  }
  return { status: 200, data: dataCards.rows[0] };
};
