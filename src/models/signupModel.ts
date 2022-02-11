import { connection } from './connection';

export const signupModel = async (name: string, email: string, password: string) => {
  const conn = await connection.connect();
  await conn.query(
    'INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)',
    [name, email, password],
  );
};
