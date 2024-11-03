//환경 설정과 관련된 모든것

import { DB1_HOST, DB1_NAME, DB1_PASSWORD, DB1_PORT, DB1_USER } from "../constants/env.js";
//설정 객체 정의
export const config = {
  //db설정
  database: {
    database: DB1_NAME,
    user: DB1_USER,
    password: DB1_PASSWORD,
    host: DB1_HOST,
    port: DB1_PORT,
  },
};
