import bcryp from 'bcrypt';

export const crypt = (param: string) => bcryp.hashSync(param, 10);

export const compare = (param: string, hash: string) => bcryp.compareSync(param, hash);
