//상수 선언
export const TOTAL_LENGTH = 4;
export const PACKET_TYPE_LENGTH = 1;

//패킷타입 정의
export const PACKET_TYPE = {
  PING: 0,
  NORMAL: 1, //데이터 처리가 필요한 패킷타입
  LOCATION: 3,
};
