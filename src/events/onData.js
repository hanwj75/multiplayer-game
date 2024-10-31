import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../constants/header.js";
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
    const packetType = socket.buffer.readUInt8BE(TOTAL_LENGTH); //TOTAL_LENGTH부터 읽겠다는뜻 8비트 까지만 값을 읽음 즉 1바이트

    if (socket.buffer.length >= length) {
      //헤더를 잘라낸 나머지 부분이 실제데이터
      const packet = socket.buffer.subarray(totalHeaderLength, length); //실제데이터
      //자르고 남은 부분을 다시 빈 소켓에 보내준다. 거저주는거임
      socket.buffer = socket.buffer.subarray(length);

      try {
        //패킷 파서
        switch (packetType) {
          case PACKET_TYPE.NORMAL: {
            const result = packetParser(packet);
            console.log(`🤪 ~ file: onData.js:29 ~ onData ~ result:`, result);
          }
        }
      } catch (err) {
        console.error(err, `데이터 패킷 오류`);
      }
    }
  }
};

// 버퍼 [] [] [] []총 길이/ []패킷타입 / [] [] [] [] [] [] [] [] [] [] [] 실제데이터 / 인데 여기서 총 길이랑 실제데이터랑 다른거임?
//그거슨..아르수어브다..
