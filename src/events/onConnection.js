//서버 실행시 들어가는 함수 이안에 다양한 이벤트를 대기시킴

import { onData } from "./onData.js";
import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";

//server.js에 createServer로 서버가 실행되면 가장 최상위에 보내준다.
export const onConnection = (socket) => {
  console.log(`Client connected from : ${socket.remoteAddress} : ${socket.remotePort}`);
  //소켓에는 클라이언트의 정보가 들어있음
  socket.buffer = Buffer.alloc(0); //아무 크기가 없는 버퍼 객체를 각 클라이언트 소켓에 넣어줌 여기에 데이터를 넣었다 뻇다

  //대기중인 소켓 이벤트
  socket.on("data", onData(socket));

  socket.on("end", onEnd(socket));

  socket.on("error", onError(socket));
};

//서버 실행시 모든 이벤트들 무한정 대기
