import User from "../../classes/models/user.class.js";
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { createUser, findUserByDeviceId, updateUserLogin } from "../../db/user/user.db.js";
import { getGameSession } from "../../sessions/game.session.js";
import { addUser } from "../../sessions/user.session.js";
import { createResponse } from "../../utils/response/createResponse.js";

//초기 핸들러 함수 정의 : 클라이언트와의 연결 초기화 시 호출됨
const initialHandler = async ({ socket, userId, payload }) => {
  try {
    //유저 세션
    //payload에서 deviceId, latency, playerId 추출
    const { deviceId, latency, playerId } = payload;
    let user = await findUserByDeviceId(deviceId); //deviceId로 사용자 검색
    const coords = {}; //좌표값 초기화

    if (!user) {
      //사용자가 존재하지 않을 경우
      await createUser(deviceId); //새로운 사용자 생성
    } else {
      //사용자가 존재할 경우
      await updateUserLogin(deviceId); //사용자 로그인 정보 업데이트
      coords.x = user.xCoord; //사용자의 x 좌표
      coords.y = user.yCoord; //사용자의 y 좌표
    }

    //새로운 User객체 생성
    user = new User(socket, deviceId, playerId, latency, coords);
    addUser(user); //사용자 세션에 추가

    //현재 활성화된 게임 세션을 가져옴
    const gameSession = getGameSession();
    //가져온 게임 세션에 사용자를 추가함
    gameSession.addUser(user);
    //응답 메시지 생성 : 핸들러ID ,성공 코드 , 사용자ID 를 포함한다.
    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, {
      userId: deviceId, //deviceId를 userId로 사용
      x: user.x, //사용자 x 좌표
      y: user.y, //사용자 y 좌표
    });
    //클라이언트에게 응답메시지
    socket.write(initialResponse);
  } catch (err) {
    console.error(err, `initialHandler에러`);
  }
};

export default initialHandler;
