//선언한 프로토콜 파일을 읽어와 메모리에 올려놓는 로직을 작성할 파일
import fs from "fs"; //파일시스템  서버 폴더안의 파일들을 경로를 통해 찾아가 읽기위해 필요함
import path from "path"; //경로를 찾기 위해 필요함
import { fileURLToPath } from "url"; //nodejs의 url모듈이 제공하는 함수 ,파일URL을 파일시스템 경로로 변환하는데 사용된다.
import protobuf from "protobufjs";
import { packetNames } from "../protobuf/packetNames.js";

const __filename = fileURLToPath(import.meta.url); //nodejs에서 ES모듈을 사용할때 현재 모듈의 파일 경로를 가져오는 코드
const __dirname = path.dirname(__filename); //filename으로 찾은 경로에있는 디렉토리의 이름을 반환함
const protoDir = path.join(__dirname, "../protobuf"); //현재위치:init 폴더 이므로 ../로 상위폴더의 protobuf파일을 찾아 가져온다.

//최초 실행시 빈 배열을 넘겨줌
const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir); //주어진 디렉토리의 현재 경로를 읽어오는 부분

  files.forEach((file) => {
    const filePath = path.join(dir, file); //파일의 전체 경로를 구함
    const stat = fs.statSync(filePath); //현재 파일 상태 확인

    //현재 파일의 상태가 디렉토리일 경우 getAllProtoFiles를 재귀호출
    if (stat.isDirectory()) {
      //현재 파일의 상태가 디렉토리 일 경우 배열을 다시 넘겨줌
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === ".proto") {
      //현재 file의 확장자명이 .proto일 경우 fileList에 파일을 추가한다.
      fileList.push(filePath);
    }
  });
  //마지막 값을 반환
  return fileList;
};

//임시
//protoFIles배열은 .proto파일들의 전체 경로가 담겨있는 배열이다.
const protoFiles = getAllProtoFiles(protoDir);

//완성된 파일이 들어갈 객체
const protoMessages = {}; //읽어온 파일들을 저장할 객체 생성

export const loadProtos = async () => {
  try {
    /*protobufjs에서 제공하는 클래스이다. 새로운Protocol Buffers의 루트 객체를 생성하는 코드이다. 
      이 루트 객체는 메시지 타입을 정의하고 관리할 수 있는 최상위 컨테이너이다.*/
    const root = new protobuf.Root(); //row한 파일을 Root메서드를 사용해서 읽는다.

    //Promise.all을 사용하여 portoFiles의 배열의 각 파일경로에 대해 비동기적으로 root.load(file)를 호출하여 모든 파일을 동시에 로드한다.
    //이 작업이 끝나면 root객체는 모든 .proto파일에 정의된 메시지 타입과 구조체를 메모리에 올린상태가 된다.
    await Promise.all(
      protoFiles.map(
        (file) => root.load(file), //각 파일을 읽고 파싱하여 root객체에 포함시키는 함수다.
      ),
    );

    for (const [packetName, types] of Object.entries(packetNames)) {
      //packetName: packetNames.js에서 작성해둔 이름
      protoMessages[packetName] = {};
      for (const [type, typeName] of Object.entries(types))
        protoMessages[packetName][type] = root.lookupType(typeName);
    }

    console.log(`Protobuf파일 로드 성공`);
  } catch (err) {
    console.error(`Protobuf파일 로드 중 오류 발생`, err);
  }
};

//protoMessages를 바깥으로 내보내는 함수
//서버에 protoMessages는 변조되면 안되므로 데이터가 변조될 가능성을 최대한 줄이기위해 얕은복사로 복사한 데이터를 가져다 바깥으로 내보낸다.
export const getProtoMessages = () => {
  return { ...protoMessages }; //원본을 복사한 객체
};
