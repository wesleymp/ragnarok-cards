import express from 'express';
import cors from 'cors';
import dotev from 'dotenv';

import router from '../routers/router';

dotev.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export default app;
