//환경 변수 세팅

import dotenv from "dotenv";

dotenv.config();
//서버정보
export const HOST = process.env.HOST || "localhost";
export const PORT = process.env.PORT || 5555;
export const CLIENT_VERSION = process.env.CLIENT_VERSION || "1.0.0";

//DB정보
export const DB_NAME = process.env.DB_NAME || "user_db";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "asdfg159";
export const DB_HOST = process.env.DB_HOST || "127.0.0.1";
export const DB_PORT = process.env.DB_PORT || "3306";
