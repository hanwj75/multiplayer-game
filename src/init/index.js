//서버 실행시 불러올 데이터를 여기 추가

import { addGameSession } from "../sessions/game.session.js";
import { testConnection } from "../utils/db/testConnection.js";
import { loadProtos } from "./loadProto.js";
import { v4 as uuidv4 } from "uuid";

const initServer = async () => {
  try {
    await loadProtos();
    const gameId = uuidv4(); //게임생성시 인자로 넣어줄 gameId를 UUID로 생성
    const gameSession = addGameSession(gameId);
    // console.log(`🤪 ~ file: index.js:12 ~ initServer ~ gameSession:`, gameSession);
    await testConnection();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
