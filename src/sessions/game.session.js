import Game from "../classes/models/game.class.js";
import { gameSessions } from "./sessions.js";

//Game 객체를 받아와 인스턴스를 생성해 주는 부분
//id를 외부에서 받아옴
export const addGameSession = (id) => {
  const session = new Game(id); //인스턴스 생성
  gameSessions.push(session); //생성한 인스턴스 세션배열에 저장
  return session; //세션 결과값 반환
};

//게임세션 삭제
export const removeGameSession = () => {
  delete gameSessions[0]; //마찬가지로 하나밖에 없으므로 0번째값을 바로 지움
};

//게임세션 불러오기
export const getGameSession = () => {
  return gameSessions[0]; //하나의 게임세션만을 만들꺼기떄문에 0번째값을 바로 가져온거임
};

/**
 * 세션이 여러개일 경우
 * 인자로 index를 받아옴
 * @삭제
 * if(index>=0&&index<gameSession.length){
 * gameSession.splice(index,1)} 로 인덱스에 해당하는 세션 삭제
 * @불러오기
 * if(index >=0 &&index<gameSession.length){
 * return gameSession[index]}
 *
 */
