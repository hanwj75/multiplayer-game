import net from "net";
import { HOST, PORT } from "./constants/env.js";

const server = net.createServer();

server.listen(() => {
  console.log(`서버 켜짐 ${PORT} : ${HOST}`);
});
