import { Express } from 'express';
import { AppError } from '../middleware/errorHandler';
import moodRouter from './mood';

export const setupRoutes = (app: Express) => {
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Moodify API is running',
    });
  });

  // API routes
  app.use('/api/mood', moodRouter);

  // Handle undefined routes
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
}; 