//유저가 접속했을 경우 유저의 인스턴스 생성

import { createPingPacket } from "../../utils/notification/game.notification.js";

class User {
  //id:deviceId , playerId:캐릭터 넘버 , latency : 지연시간
  constructor(socket, id, playerId, latency, coords) {
    this.id = id; // 유저 고유 ID
    this.socket = socket; //유저 소켓 연결
    this.playerId = playerId; // 유저 캐릭터ID
    this.latency = latency; // 유저 지연시간
    //위치정보
    this.x = coords.x; //현재 x
    this.y = coords.y; //현재 Y
    //마지막으로 이동해서 있던 위치
    this.lastX = 0; //바로직전 X
    this.lastY = 0; //바로직전 Y
    //마지막으로 상태가 업데이트 된 시간
    this.lastUpdateTime = Date.now();
    this.speed = 3; // 유저의 이동 속도
  }

  //유저의 위치 업데이트하는 메서드
  updatePosition(x, y) {
    // 현재 좌표를 이전 좌표로 저장
    this.lastX = this.x;
    this.lastY = this.y;

    // 새 좌표로 업데이트
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now(); // 업데이트 시간 갱신
  }

  //핑 보내는 메서드
  ping() {
    const now = Date.now(); // 현재 시간

    this.socket.write(createPingPacket(now)); // 현재 시간으로 핑 패킷 전송
  }
  // 퐁 응답을 처리하는 메서드
  handlerPong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2; // 지연 시간을 계산 (왕복 시간의 절반)
  }
  // 추측 항법 계산하는 메서드
  calculatePosition(letency) {
    // 현재 위치와 이전 위치가 같을 경우
    if (this.x === this.lastX && this.y === this.lastY) {
      return {
        // 현재 좌표 반환
        x: this.x,
        y: this.y,
      };
    }
    // 시간 차이를 초 단위로 계산
    const timeDiff = (Date.now() - this.lastUpdateTime + latency) / 1000;
    const distance = this.speed * timeDiff; // 이동 거리 계산
    // 이동 방향 계산
    const directionX = this.x !== this.lastX ? Math.sign(this.x - this.lastX) : 0;
    const directionY = this.y !== this.lastY ? Math.sign(this.y - this.lastY) : 0;
    return {
      // 추정된 위치 반환
      x: this.x + directionX * distance,
      y: this.y + directionY * distance,
    };
  }
}

export default User;
