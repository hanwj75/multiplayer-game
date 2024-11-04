import { getGameSession } from "../sessions/game.session.js";
import { removeUser } from "../sessions/user.session.js";

export const onEnd = (socket) => async () => {
  console.log(`클라이언트 연결이 종료됨`);

  await removeUser();
  const gameSession = getGameSession();
  gameSession.removeUser(socket);
};
