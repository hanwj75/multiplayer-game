import net from "net";
import { HOST, PORT } from "./constants/env.js";
import { onConnection } from "./events/onConnection.js";

const server = net.createServer(onConnection);

server.listen(() => {
  console.log(`서버 켜짐 ${PORT} : ${HOST}`);
});
