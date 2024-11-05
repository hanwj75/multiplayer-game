import { createLocationPacket } from "../../utils/notification/game.notification.js";
import LatencyManager from "../managers/latency.manager.js";

class Game {
  constructor(id) {
    this.id = id; //인스턴스 생성시 외부에서 받아온 ID
    this.users = []; //게임의 접속중인 유저를 저장할 배열
    this.latencyManager = new LatencyManager(); //지연 시간 관리를 위한 LatencyManager 인스턴스 생성 유저가 추가될때마다 LatencyManager에 넣어줘야함
  }

  //유저 생성
  addUser(user) {
    //유저 정보 받아서 배열에 넣어줌
    this.users.push(user);
    //사용자 ID를기반으로 지연시간 관리에 해당 사용자를 추가한다.
    //2번째 인자 : ping메서드를 바인딩하여 사용, ping메서드가 호출될 때 'user'객체의 컨텍스트를 유지한다.
    //지연시간 1초
    this.latencyManager.addUser(user.id, user.ping.bind(user), 1000);
  }

  //유저 조회
  getUser(userId) {
    //userId를 인자로 받아 users배열에 있는 user를 찾아옴
    return this.users.find((user) => user.id === userId); //외부에서 받아온 ID 와 인자로 받아온 ID가 같은경우
  }
  //게임종료시 유저 삭제
  //onEnd와onError에서 사용할때 유저의 정보를 알수없음
  //하지만 socket의 정보로 충분히 유저를 특정할 수 있기 떄문에 인자로 socket을 받아온다

  removeUser(socket) {
    // users 배열에서 주어진 socket과 일치하는 사용자의 인덱스를 찾는다.
    const index = this.users.findIndex((user) => user.socket === socket); //users배열에 있는 현재 유저의 index를 찾음
    //사용자가 배열에 존재할 경우
    if (index !== -1) {
      // 만약 배열의 길이가 1이라면, 마지막 사용자를 제거하는 것이므로 LatencyManager의 모든 데이터를 초기화
      if (this.users.length === 1) {
        this.latencyManager.clearAll();
      }
      //LatencyManager에서 해당 사용자의 ID로 지연 시간 데이터를 제거
      this.latencyManager.removeUser(this.users[index].id);
      //현재 index가 음수가 아니라면 유저의대한 결과값이 있다는 의미이므로 아래 로직을 실행
      return this.users.splice(index, 1)[0]; //index위치에 해당하는 요소에서부터 1개 삭제한다 , [0]: splice로 삭제한 값중 0번째 요소를 반환한다.
    }
  }

  getMaxLatency() {
    let maxLatency = 0; // 최대 지연 시간을 저장할 변수 초기화
    this.users.forEach((user) => {
      // 각 유저의 지연 시간을 비교하여 최대값을 업데이트
      maxLatency = Math.max(maxLatency, user.latency);
    });

    return maxLatency; // 최대 지연 시간 반환
  }

  /**
   * @desc getAllLocation함수
   * @todo 현재 접속한 모든 유저의 데이터를 사용자에게 보내주는 메서드
   * 멀티 플레이에서는 다른 유저의 정보도 필요하므로 다른유저의 정보를 받아오도록 구현
   * 여기서 본인은 제외해야 하므로 userId를 인자로 받아와 본인의 데이터 제외
   */
  getAllLocation(userId) {
    // 최대 지연 시간 가져오기
    const maxLatency = this.getMaxLatency();
    //현재 접속한 유저들중 본인의 userId와 다른값을 필터링
    const locationData = this.users
      .filter((user) => user.id !== userId) // 본인의 userId와 다른 유저 핉터링
      //
      .map((user) => {
        // 필터링된 유저의 위치를 계산
        const { x, y } = user.calcuraterPosition(maxLatency); // 위치 업데이트 메서드 호출

        //필터링된 유저의 정보를 포함하는 객체를 생성
        return { id: user.id, playerId: user.playerId, x, y };
      });
    return createLocationPacket(locationData); // 최종 위치 데이터를 패킷으로 생성하여 반환
  }
}

export default Game;
