//User 객체를 받아와 인스턴스를 생성해 주는 부분

import User from "../classes/models/user.class.js";
import { updateUserLocation } from "../db/user/user.db.js";
import { userSessions } from "./sessions.js";

//유저 생성
export const addUser = (user) => {
  userSessions.push(user); //서버에 접속한 유저 배열에 추가
  return user; //유저의 결과값 반환
};

export const removeUser = async (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket); //users배열에 있는 현재 유저의 index를 찾음
  if (index !== -1) {
    const user = userSessions[index];
    await updateUserLocation(user.x, user.y, user.id);
    //현재 index가 음수가 아니라면 유저의대한 결과값이 있다는 의미이므로 아래 로직을 실행
    return userSessions.splice(index, 1)[0]; //index위치에 해당하는 요소에서부터 1개 삭제한다 , [0]: splice로 삭제한 값중 0번째 요소를 반환한다.
  }
};

export const getUserBySocket = (socket) => {
  const user = userSessions.find((user) => user.socket === socket);
  if (!user) {
    console.error("User Not Found : getUserBySocket");
  }
  return user;
};

export const getAllUser = () => {
  return userSessions; //현재 접속중인 유저 반환
};
