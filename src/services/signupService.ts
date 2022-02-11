import { error } from './helpers/error';
import { signupModel } from '../models/signupModel';
import { signinModel } from '../models/signinModel';

const checkEmail = async (email: string) => {
  await signinModel(email);
  if ((await signinModel(email)).rowCount > 0) {
    throw error(409, 'Este email já foi cadastrado.');
  }
};

export const signupService = async (name: string, email: string, password: string) => {
  await checkEmail(email);
  await signupModel(name, email, password);
  return { status: 201, message: 'Registrado com sucesso!' };
};
