import dotenv from 'dotenv';

dotenv.config({quiet: true});

export const config = {
    node_env: process.env.APP_MODE,
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
    cookieExpire: process.env.COOKIE_EXPIRE,
    saltRounds: process.env.SALT_ROUNDS,
    googleAppPassword: process.env.GOOGLE_APP_PASSWORD
}