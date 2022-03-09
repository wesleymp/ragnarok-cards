import { checkCardInAlbumModel, postAlbumModel } from '../models/postAlbumModel';
import { verifyToken, authorizationRemovePrefix } from '../util/jwt';
import { error } from './helpers/error';

export const checkCardinAlbum = async (id: number) => {
  const checkAlbumData = await checkCardInAlbumModel(id);
  if (checkAlbumData.rowCount > 0) {
    throw error(409, 'Alguem já possui esta figura.');
  }
};

export const postAlbumService = async (bodyParam: any, headersParam: any) => {
  const { id } = bodyParam;
  const { authorization } = headersParam;
  await checkCardinAlbum(id);
  const dataAuthorization = verifyToken(authorizationRemovePrefix(authorization));
  await postAlbumModel(dataAuthorization.id, id);
  return { status: 201, message: 'Card adicionado com sucesso!' };
};
