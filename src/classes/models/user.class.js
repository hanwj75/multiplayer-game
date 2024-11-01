//유저가 접속했을 경우 유저의 인스턴스 생성

class User {
  //id:deviceId , playerId:캐릭터 넘버 , latency : 지연시간
  constructor(socket, id, playerId, latency) {
    this.id = id;
    this.socket = socket;
    this.playerId = playerId;
    this.latency = latency;
    //위치정보
    this.x = 0;
    this.y = 0;
    //마지막으로 상태가 업데이트 된 시간
    this.lastUpdateTime = Date.now();
  }

  //유저의 위치 업데이트하는 메서드
  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }
}

export default User;
