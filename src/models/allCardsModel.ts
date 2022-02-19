import { connection } from './connection';

export const allCardsModel = async () => {
  const conn = await connection.connect();
  return conn.query('SELECT * FROM "cards" ORDER BY id DESC');
};
