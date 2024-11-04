//실제로 호출할 함수

import { toCamelCase } from "../../utils/transformCase.js";
import pools from "../database.js";
import { USER_QUERIES } from "./user.queries.js";

//deviceId로 사용자를 조회하는 함수
export const findUserByDeviceId = async (deviceId) => {
  //사용자 정보를 조회하는 쿼리를 실행한다.
  const [rows] = await pools.query(USER_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
  //조회된 결과를 카멜 케이스로 변환하여 반환한다.
  return toCamelCase(rows[0]);
};

//새로운 사용자를 생성하는 함수
export const createUser = async (deviceId) => {
  //사용자 생성 쿼리를 실행한다
  await pools.query(USER_QUERIES.CREATE_USER, [deviceId]);
  //생선된 사용자 정보를 반환한다.
  return { deviceId };
};

//사용자의 마지막 로그인 시간을 업데이트하는 함수
export const updateUserLogin = async (deviceId) => {
  //로그인 시간 업데이트 쿼리를 실행한다.
  await pools.query(USER_QUERIES.UPDATE_USER_LOGIN, [deviceId]);
};

//사용자의 위치 정보를 업데이트하는 함수
export const updateUserLocation = async (x, y, deviceId) => {
  //위치 업데이트 쿼리를 실행한다.
  await pools.query(USER_QUERIES.UPDATE_USER_LOCATION, [x, y, deviceId]);
};
