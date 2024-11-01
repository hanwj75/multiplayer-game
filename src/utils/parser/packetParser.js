import { CLIENT_VERSION } from "../../constants/env.js";
import { getProtoTypeNameByHandlerId } from "../../handler/index.js";
import { getProtoMessages } from "../../init/loadProto.js";

export const packetParser = (data /*바이트배열*/) => {
  const protoMessages = getProtoMessages(); //protobuf메세지를 로드해 온다.

  const Packet = protoMessages.common.Packet; //protoMessages에서 common.Packet타입을 가져옴
  let packet;

  try {
    packet = Packet.decode(data); //data를 디코딩해서 변수에 저장
  } catch (err) {
    console.error(err);
  }

  //디코딩된 packet에서 패킷 정보 추출
  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.version;

  //클라이언트의 버전과 서버의 버전이 동일한지 체크
  if (clientVersion !== CLIENT_VERSION) {
    throw Error();
  }

  //핸들러아이디 체크
  const protoTypeName = getProtoTypeNameByHandlerId(handlerId); //핸들러아이디에 해당하는 Protobuf타입 이름을 가져온다.
  if (!protoTypeName) {
    throw Error();
  }
  //페이로드 타입 추출
  const [namespace, typeName] = protoTypeName.split("."); //protobuf타입 이름을 namespace와 typeName으로 분리
  const payloadType = protoMessages[namespace][typeName]; //해당하는 페이로드 타입을 가져옴

  //페이로드 디코드
  let payload;
  try {
    //패킷의 페이로드를 디코딩하여 payload변수에 저장
    payload = payloadType.decode(packet.payload);
  } catch (err) {
    console.error(err, `페이로드 없음!`);
  }
  //payloadType.fields: Protobuf메시지 타입에서 정의해둔 필드들을 나타낸다.
  //Object.keys(): 를 사용하여 이 필드들의 이름을 배열로 가져온다.
  const expectedFields = Object.keys(payloadType.fields); // 페이로드에서 기대되는 필드의 목록

  //payload객체에서 실제로 포함된 필드들의 이름을 배열로 가져온다. 이 배열은 디코딩된 페이로드에서 실제 존재하는 필드 목록임
  const actualFields = Object.keys(payload); //실제 필드 추출

  //expectedFields 배열에서 actualFields 에 포함되지 않은 필드들을 필터링하여 missingFields배열을 만든다. 즉,기대되는 필드 중 실제로 존재하지 않는 필드를 찾는다.
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field)); //누락된 필드 확인

  if (missingFields > 0) {
    throw Error();
  }
  //모든 필드가 유효하다면 결과 반환
  return { handlerId, userId, payload };
};
