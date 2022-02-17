import { sign, verify } from 'jsonwebtoken';
import dotev from 'dotenv';

dotev.config();

export const genereteJwt = (data: object) => {
  const token = sign(
    data,
    process.env.SECRET_KEY_JWT as string,
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  );
  return token;
};

export const verifyToken = (token: string) => verify(
  token,
  process.env.SECRET_KEY_JWT as string,
  (_err: any, decoded: any) => decoded,
);
