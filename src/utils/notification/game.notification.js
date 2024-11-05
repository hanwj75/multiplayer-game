import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../../constants/header.js";
import { getProtoMessages } from "../../init/loadProto.js";

//메시지와 타입을 받아 패킷을 직렬화 하는 함수
const serializer = (message, type) => {
  //패킷의 총 길이를 저장할 Buffer 생성
  const packetLength = Buffer.alloc(TOTAL_LENGTH);
  // 총 길이에 메시지 길이와 패킷 타입 길이를 더하여 32비트 정수로 기록
  packetLength.writeInt32BE(message.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0);

  //패킷 타입을 저장할 Buffer 생성
  const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
  //패킷 타입을 8비트 정수로 기록
  packetType.writeInt8(type, 0);
  //총 패킷을 생성하여 반환함 : [패킷 길이,패킷타입,메시지]
  return Buffer.concat([packetLength, packetType, message]);
};

//유저들의 x,y값이 들어있는 배열을 인자로 받아와 패킷을 생성하는 함수
export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages(); //proto메시지 가져옴
  const location = protoMessages.gameNotification.LocationUpdate; //위치 업데이트 메시지 타입 가져옴

  //유저 정보를 포함하는 페이로드를 생성
  const payload = { users };
  //페이로드를 기반으로 메시지 생성
  const message = location.create(payload);
  //메시지 인코딩하여 최종 위치 패킷 생성
  const locationPacket = location.encode(message).finish();
  //최종 위치 패킷을 직렬화하여 반환
  return serializer(locationPacket, PACKET_TYPE.LOCATION);
};

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages(); //proto메시지 가져옴
  //공통 Ping메시지를 참조한다.
  const ping = protoMessages.common.Ping;
  //페이로드에 타임스탬프를 추가한다.
  const payload = { timestamp };
  //위치 정보를 기반으로 메시지 생성
  const message = location.create(payload);
  //생성한 메시지를 인코딩 하여 핑 패킷 만듬
  const pingPacket = location.encode(message).finish();
  //핑 패킷 직렬화하여 반환
  return serializer(pingPacket, PACKET_TYPE.PING);
};
