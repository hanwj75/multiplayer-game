import { getGameSession } from "../../sessions/game.session.js";

//접속중인 유저의 위치가 바뀔때마다 위치를 업데이트 하는 핸들러 함수 정의
const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload; //현재 유저의 위치
    const gameSession = getGameSession(); //현재 유저가 위치한 게임 가져옴

    if (!gameSession) {
      console.error(`게임 세션을 찾지 못함`);
      return; //게임이 없을시 중지
    }

    console.log(gameSession); //현재 위치한 게임 세션 로그

    const user = gameSession.getUser(userId); //현재 세션에서 유저객체를 조회

    if (!user) {
      console.error(`유저를 찾지 못함`);
      return; //유저가 없을시 중지
    }

    //유저의 위치를 업데이트하는 메서드를 호출
    user.updatePosition(x, y);
    socket.write("");
  } catch (err) {
    console.error(err, `locationHandler Err`);
  }
};

export default locationUpdateHandler;
