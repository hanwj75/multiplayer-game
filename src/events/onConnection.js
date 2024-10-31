//서버 실행시 들어가는 함수 이안에 다양한 이벤트를 대기시킴

import { onData } from "./onData.js";
import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";

//server.js에 createServer로 서버가 실행되면 가장 최상위에 보내준다.
export const onConnection = (socket) => {
  console.log(`Client connected from : ${socket.remoteAddress} : ${socket.removePort}`);

  socket.on("data", onData(socket));

  socket.on("end", onEnd(socket));

  socket.on("error", onError(socket));
};

//서버 실행시 모든 이벤트들 무한정 대기
