import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
    cookieExpire: process.env.COOKIE_EXPIRE,
    saltRounds: process.env.SALT_ROUNDS
}