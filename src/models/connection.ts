import { Pool } from 'pg';
import dotev from 'dotenv';

dotev.config();

export const connection = new Pool({
  connectionString: process.env.DATABASE_HOST,
});
