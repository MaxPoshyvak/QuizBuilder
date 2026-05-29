import express from 'express';
import router from './routes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:3000', 'https://quiz-builder-five-rust.vercel.app'],
    }),
);
app.use('/api', router);

export default app;
