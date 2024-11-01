import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../../constants/header.js";
import { getProtoMessages } from "../../init/loadProto.js";

//응답 패킷을 생성하는 함수 정의
export const createResponse = (handlerId, responseCode, data = null) => {
  //proto메시지 가져오는 부분
  const protoMessages = getProtoMessages();
  //응답 proto 메시지 형식 가져오는 부분
  const Response = protoMessages.response.Response;
  //응답 객체 생성
  const response = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null, //데이터가 있으면 Buffer형식으로 변환한다.
  };

  //응답 객체를 프로토콜 형식으로 인코딩해주는 부분
  const buffer = Response.encode(response).finish();
  //패킷 길이 설정
  const packetLength = Buffer.alloc(TOTAL_LENGTH); //패킷 길이를 저장할 Buffer 생성
  packetLength.writeUint32BE(buffer.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0); //전체 패킷 길이 계산

  //패킷 타입 설정
  const packetType = Buffer.alloc(PACKET_TYPE_LENGTH); //패킷 타입을 저장할 Buffer 생성
  //패킷의 타입을 PACKET_TYPE.NORMAL로 설정하고 이를 Buffer의 첫번째 바이트에 기록
  packetType.writeUInt8(PACKET_TYPE.NORMAL, 0);
  //모든 버퍼를 합쳐서 최종 패킷 반환
  return Buffer.concat([packetLength, packetType, buffer]); //Buffer.concat에 배열형식으로 전달
};
