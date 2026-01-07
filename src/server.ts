import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { config } from './config/env';

const app = express();
const PORT = config.port || 3000;

const adapter = new PrismaPg({
  connectionString: config.databaseUrl,
});

export const prisma = new PrismaClient({ adapter });

app.use(
  cors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.get('/api/db-test', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    res.json({ status: 'Database connected', users: userCount });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
