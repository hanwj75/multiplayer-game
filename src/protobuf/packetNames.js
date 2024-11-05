//어떤 패킷을 어떤 패킷이름으로 설정했는지 작성하는 파일
//proto파일에서 작성한값을 편하게 맵핑해주기위해 작성

//앞에 선언한 common,Packet등등은 맵핑용
export const packetNames = {
  common: {
    Packet: "common.Packet", //common.Packet:protobuf를 사용할때 사용할 이름
    ping: "common.Ping",
  },
  initial: {
    InitialPayload: "initial.InitialPayload",
  },
  game: {
    LocationUpdatePayload: "game.LocationUpdatePayload",
  },
  gameNotification: {
    LocationUpdate: "gameNotification.LocationUpdate",
  },
  response: {
    Response: "response.Response",
  },
};

/*
common = 패킷이름
Packet = 패킷타입
common.Pakcet = 타입이름

*/
