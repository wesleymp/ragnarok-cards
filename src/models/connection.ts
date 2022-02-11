import { Pool } from 'pg';
import dotev from 'dotenv';

dotev.config();

const database = {
  host: process.env.DATABASE_HOST,
};

if (process.env.NODE_ENV === 'test') {
  database.host = process.env.DATABASE_HOST_TEST;
}

export const connection = new Pool({
  connectionString: database.host,
});
