import { newCardModel } from '../models/newCardModel';
import { authorizationRemovePrefix, verifyToken } from '../util/jwt';
import { error } from './helpers/error';

export const checkRole = async (role: string) => {
  if (role !== 'admin') {
    throw error(401, 'Você não tem permissão para adicionar um novo card.');
  }
};

export const getPayloadToken = (authorization: string) => {
  const token = authorizationRemovePrefix(authorization);
  const verify = verifyToken(token);
  return verify;
};

export const newCardService = async (
  name: string,
  image: string,
  description: string,
  authorization: string,
) => {
  const getPayload = getPayloadToken(authorization);
  await checkRole(getPayload.role);
  await newCardModel(name, image, description);
  return { status: 201, message: 'Card adicionado com sucesso!' };
};
