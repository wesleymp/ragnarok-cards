import { error } from './helpers/error';
import { signupModel } from '../models/signupModel';
import { signinModel } from '../models/signinModel';

export const signupService = async (name: string, email: string, password: string) => {
  const checkEmail = await signinModel(email);
  if (checkEmail.rowCount > 0) throw error(409, 'Este email já foi cadastrado.');
  await signupModel(name, email, password);
  return { status: 201, message: 'Registrado com sucesso!' };
};
