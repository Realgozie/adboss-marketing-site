
import express from 'express';
import cors from 'cors';
import registerHandler from './api/register.js';
import loginHandler from './api/login.js';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// API routes
app.post('/api/register', registerHandler);
app.post('/api/login', loginHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend API server running on http://0.0.0.0:${PORT}`);
});
