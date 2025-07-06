// server.js
import express from 'express';
import dotenv from 'dotenv';
import { analyzeCode } from './controllers/analysisController.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors()); 


// Log incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.post('/calculate', analyzeCode);


// Start server
app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
