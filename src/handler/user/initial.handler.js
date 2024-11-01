import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { getGameSession } from "../../sessions/game.session.js";
import { addUser } from "../../sessions/user.session.js";
import { createResponse } from "../../utils/response/createResponse.js";

//초기 핸들러 함수 정의 : 클라이언트와의 연결 초기화 시 호출됨
const initialHandler = ({ socket, userId, payload }) => {
  try {
    //유저 세션
    //payload에서 deviceId, latency, playerId 추출
    const { deviceId, latency, playerId } = payload;
    //새로운 사용자를 세션에 추가한다.socket, deviceId, playerId, latency 정보를 사용함
    const user = addUser(socket, deviceId, playerId, latency);
    //현재 활성화된 게임 세션을 가져옴
    const gameSession = getGameSession();
    //가져온 게임 세션에 사용자를 추가함
    gameSession.addUser(user);
    //응답 메시지 생성 : 핸들러ID ,성공 코드 , 사용자ID 를 포함한다.
    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, { userId });
    //클라이언트에게 응답메시지
    socket.write(initialResponse);
  } catch (err) {
    console.error(err, `initialHandler에러`);
  }
};

export default initialHandler;
