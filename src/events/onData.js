import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../constants/header.js";
import { getHandlerById } from "../handler/index.js";
import { getProtoMessages } from "../init/loadProto.js";
import { getUserBySocket } from "../sessions/user.session.js";
import { packetParser } from "../utils/parser/packetParser.js";

//커링기법을 사용해서 소켓과 데이터를 함께 받는다.
export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]); //자르고 남은 부분 다시 합쳐주기
  //패킷의 총 헤더의 길이 = 전체 길이 + 패킷타입길이
  const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

  //onConnection에서 socket.buffer에 데이터를 담기로 정해둠
  //socket.buffer의 데이터가 총헤더의 길이보다 크다면 데이터가 정상적으로 들어오기 시작했다는 뜻이므로 읽기 시작한다.
  while (socket.buffer.length > totalHeaderLength) {
    //length = 전체길이 / 실제 데이터의 끝 위치
    const length = socket.buffer.readUInt32BE(0); //0:0번째부터 읽겠다는뜻 4바이트까지 즉 TOTAL_LENGTH까지의 값을 읽음
    //패킷타입이 들어간 부분
    const packetType = socket.buffer.readUInt8(TOTAL_LENGTH); //TOTAL_LENGTH부터 읽겠다는뜻 8비트 까지만 값을 읽음 즉 1바이트

    if (socket.buffer.length >= length) {
      //헤더를 잘라낸 나머지 부분이 실제데이터
      const packet = socket.buffer.subarray(totalHeaderLength, length); //실제데이터
      //자르고 남은 부분을 다시 빈 소켓에 보내준다. 거저주는거임
      socket.buffer = socket.buffer.subarray(length);

      try {
        //패킷 파서
        switch (packetType) {
          case PACKET_TYPE.PING:
            {
              const protoMessages = getProtoMessages(); //protobuf메세지를 로드해 온다.
              const Ping = protoMessages.common.Ping; //protoMessages에서 common.Ping타입을 가져옴
              const pingPacket = Ping.decode(packet);
              const user = getUserBySocket(socket);
              user.handlerPong(pingPacket);
            }
            break;
          case PACKET_TYPE.NORMAL: {
            const { handlerId, userId, payload } = packetParser(packet);
            const handler = getHandlerById(handlerId);

            handler({ socket, userId, payload });
          }
        }
      } catch (err) {
        console.error(err, `데이터 패킷 오류`);
      }
    } else {
      break;
    }
  }
};

// 버퍼 [] [] [] []총 길이/ []패킷타입 / [] [] [] [] [] [] [] [] [] [] [] 실제데이터 /???  []=1바이트 총 길이 = 4바이트 실제데이터 = 11바이트??? 어째서?
//그거슨..아르수어브다..
