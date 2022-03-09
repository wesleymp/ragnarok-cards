import { connection } from './connection';

export const checkCardInAlbumModel = async (cardId: number) => {
  const conn = await connection.connect();
  const query = await conn.query('SELECT * FROM "album" WHERE card_id = $1', [cardId]);
  return query;
};

export const postAlbumModel = async (userId: number, cardId: number) => {
  const conn = await connection.connect();
  const query = await conn.query(
    'INSERT INTO "album" (user_id, card_id) VALUES ($1, $2)',
    [userId, cardId],
  );
  return query;
};
