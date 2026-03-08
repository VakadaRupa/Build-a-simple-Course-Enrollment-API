import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.js';
import courseRoutes from './routes/courses.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/courses', courseRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Course Enrollment API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
