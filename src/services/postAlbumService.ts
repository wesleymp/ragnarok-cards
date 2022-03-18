import { checkCardInAlbumModel, checkAlbumModel, postAlbumModel } from '../models/postAlbumModel';
import { verifyToken, authorizationRemovePrefix } from '../util/jwt';
import { error } from './helpers/error';

export const checkDateAlbum = async (id: number) => {
  const checkAlbumData = await checkAlbumModel(id);
  const date = checkAlbumData.rowCount ? checkAlbumData.rows[0].card_date : new Date();
  const compareDate = new Date();
  if (date.getTime() > compareDate.getTime()) {
    throw error(409, 'Você ainda não pode pegar esta figura.');
  }
};

export const checkCardinAlbum = async (id: number) => {
  const checkAlbumData = await checkCardInAlbumModel(id);
  if (checkAlbumData.rowCount > 0) {
    throw error(409, 'Alguem já possui esta figura.');
  }
};

export const postAlbumService = async (bodyParam: any, headersParam: any) => {
  const { id } = bodyParam;
  const { authorization } = headersParam;
  const dataAuthorization = verifyToken(authorizationRemovePrefix(authorization));
  const date = new Date();
  const dateToGetCard = new Date(date.setHours(date.getHours() + 2));
  await checkDateAlbum(dataAuthorization.id);
  await checkCardinAlbum(id);
  await postAlbumModel(dataAuthorization.id, id, dateToGetCard.toISOString());
  return { status: 201, message: 'Card adicionado com sucesso!' };
};
