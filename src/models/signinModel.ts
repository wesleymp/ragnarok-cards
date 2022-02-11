import { connection } from './connection';

export const signinModel = async (email: string) => {
  const conn = await connection.connect();
  const query = await conn.query(
    'SELECT * FROM "users" WHERE "email" = $1',
    [email],
  );
  return query;
};
