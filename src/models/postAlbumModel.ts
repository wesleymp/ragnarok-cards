import { connection } from './connection';

export const checkCardInAlbumModel = async (cardId: number) => {
  const conn = await connection.connect();
  const query = await conn.query('SELECT * FROM "album" WHERE card_id = $1', [cardId]);
  return query;
};

export const checkAlbumModel = async (userId: number) => {
  const conn = await connection.connect();
  const query = await conn.query(
    'SELECT * FROM "album" WHERE user_id = $1 ORDER BY card_date DESC LIMIT 1',
    [userId],
  );
  return query;
};

export const postAlbumModel = async (userId: number, cardId: number, cardDate: string) => {
  const conn = await connection.connect();
  const query = await conn.query(
    'INSERT INTO "album" (user_id, card_id, card_date) VALUES ($1, $2, $3)',
    [userId, cardId, cardDate],
  );
  return query;
};
