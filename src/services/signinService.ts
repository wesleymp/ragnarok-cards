import { error } from './helpers/error';
import { signinModel } from '../models/signinModel';
import { genereteJwt } from '../util/jwt';
import { compare } from './helpers/bcrypt';

export const signinService = async (email: string, password: string) => {
  const resultSignin = await signinModel(email);
  const userData = resultSignin.rows[0];
  if (!userData) {
    throw error(401, 'Email ou senha inválidos.');
  }
  if (!compare(password, userData.password)) {
    throw error(401, 'Email ou senha inválidos.');
  }
  delete userData.password;
  return { status: 200, token: genereteJwt(userData) };
};
