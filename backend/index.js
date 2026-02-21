import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js'; 
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';
dotenv.config({});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Dynamic CORS configuration
const corsOptions =  {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true 
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Serve static files from frontend dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Fallback route to serve index.html for client-side routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, ()=>{
  connectDB();
  console.log(`Server is running on port ${PORT}`);
})