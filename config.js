import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_DATA_API_URL;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const PORT = process.env.PORT || 3000;
