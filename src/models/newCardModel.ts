import { connection } from './connection';

export const newCardModel = async (name: string, image: string, description: string) => {
  const conn = await connection.connect();
  await conn.query(
    'INSERT INTO "cards" ("name", "image", "description") VALUES ($1, $2, $3)',
    [name, image, description],
  );
};
