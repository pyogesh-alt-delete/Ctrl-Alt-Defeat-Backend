import express from 'express';
import cors from 'cors';
import { config } from './config/env';

const app = express();

app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'Server is running',
        environment: config.nodeEnv
    });
});

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
});