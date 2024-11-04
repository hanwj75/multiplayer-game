export const USER_QUERIES = {
  //주어진 device_id에 해당하는 사용자 정보를 조회하는 쿼리
  FIND_USER_BY_DEVICE_ID: "SELECT * FROM user WHERE device_id = ?",
  //새로운 사용자를 생성하기 위한 쿼리
  //device_id를 사용하여 데이터베이스에 추가한다.
  CREATE_USER: "INSERT INTO user (device_id) VALUES (?)",
  //사용자의 마지막 로그인 시간을 업데이트하기 위한 쿼리
  //주어진 device_id에 해당하는 사용자의 last_login 필드를 현재 시간으로 설정한다.
  UPDATE_USER_LOGIN: "UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE device_id = ?",
  //사용자의 위치 정보를 업데이트 하는 쿼리
  //주어진 device_id에 해당하는 사용자의 x_coord와 y_coord를 업데이트한다.
  UPDATE_USER_LOCATION: "UPDATE user SET x_coord = ?, y_coord = ? WHERE device_id = ?",
};

// ? 는 뭐임

// ? = 자리표시자(placeholder) 또는 바이트 변수라고한다.
// 쿼리 실행시 실제 값으로 대체되는 부분을 의미
//x_coord = ?, y_coord = ? WHERE device_id = ? 는 ? 위치에 해당하는 값을 넣어주면됨
