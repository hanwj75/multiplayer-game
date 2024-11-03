//환경 변수 세팅

import dotenv from "dotenv";

dotenv.config();

export const HOST = process.env.HOST || "localhost";
export const PORT = process.env.PORT || 5556;
export const CLIENT_VERSION = process.env.CLIENT_VERSION || "1.0.0";
