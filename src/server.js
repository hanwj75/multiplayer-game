import net from "net";
import { HOST, PORT } from "./constants/env.js";
import { onConnection } from "./events/onConnection.js";
import initServer from "./init/index.js";

const server = net.createServer(onConnection);

//서버실행시 필요한 데이터들이 전부 들어왔다면 그 이후 서버를 실행한다.

initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`서버 켜짐${HOST}  : ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
