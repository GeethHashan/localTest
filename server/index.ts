// server/index.ts - Updated with events route
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Import database configuration and routes
import { prisma, testConnection } from './src/config/database';
import savedCoursesRoutes from './src/routes/savedCourses';
import simpleSearchRoutes from './src/routes/simpleSearch';
import subjectsRoutes from './src/routes/subjects';
import eventsRoutes from './src/routes/events'; // Add this import

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Mount API routes
app.use('/api/simple-search', simpleSearchRoutes);
app.use('/api/saved-courses', savedCoursesRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/events', eventsRoutes); // Add this line

// Test database connection on startup
testConnection();

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'PERN Stack Backend Server is running!',
    version: '1.0.0',
    database: 'PostgreSQL with Prisma ORM',
    endpoints: {
      health: '/health',
      universities: '/api/universities',
      courses: '/api/courses',
      savedCourses: '/api/saved-courses',
      subjects: '/api/subjects',
      subjectsAL: '/api/subjects/al',
      subjectsOL: '/api/subjects/ol',
      events: '/api/events', // Add this
      eventsUpcoming: '/api/events/filter/upcoming', // Add this
      eventsByMonth: '/api/events/by-month/:year/:month' // Add this
    }
  });
});

// Health check route with Prisma
app.get('/health', async (req: Request, res: Response) => {
  try {
    // Test Prisma connection
    await prisma.$queryRaw`SELECT NOW()`;
    
    res.status(200).json({ 
      status: 'healthy',
      database: 'connected',
      orm: 'prisma',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Example API route using Prisma
app.get('/api/test', async (req: Request, res: Response) => {
  try {
    // Test Prisma query
    const result = await prisma.$queryRaw`SELECT version()` as any[];
    
    res.json({
      message: 'Database query successful with Prisma',
      version: result[0]?.version || 'Unknown',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({
      error: 'Database query failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.method} ${req.originalUrl} does not exist`,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/`);
  console.log(`📅 Events API: http://localhost:${PORT}/api/events`);
  console.log(`🔍 Simple Search: http://localhost:${PORT}/api/simple-search`);
  console.log(`📖 Saved Courses: http://localhost:${PORT}/api/saved-courses`);
  console.log(`📚 Subjects: http://localhost:${PORT}/api/subjects`);
  console.log('');
  console.log('🌟 Available Events Endpoints:');
  console.log('   GET    /api/events - Get all events');
  console.log('   POST   /api/events - Create new event');
  console.log('   GET    /api/events/:id - Get event by ID');
  console.log('   PUT    /api/events/:id - Update event');
  console.log('   DELETE /api/events/:id - Delete event');
  console.log('   GET    /api/events/filter/upcoming - Get upcoming events');
  console.log('   GET    /api/events/by-month/:year/:month - Get monthly events');
  console.log('');
  console.log('💾 Database: PostgreSQL with Prisma ORM');
  console.log('🔗 CORS: Enabled for all origins');
  console.log('🛡️  Security: Helmet middleware active');
});