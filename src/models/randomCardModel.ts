import { connection } from './connection';

export const randomCardModel = async () => {
  const conn = await connection.connect();
  const query = await conn.query('SELECT * FROM "cards" ORDER BY RANDOM() LIMIT 1');
  return query;
};
