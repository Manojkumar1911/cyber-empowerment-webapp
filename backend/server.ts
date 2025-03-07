import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import scamRoutes from './routes/scamRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import { scamProtectionMiddleware } from './middlewares/scamProtection';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(scamProtectionMiddleware);

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/scam', authMiddleware, scamRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});