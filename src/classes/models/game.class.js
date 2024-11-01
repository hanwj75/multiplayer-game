class Game {
  constructor(id) {
    this.id = id; //인스턴스 생성시 외부에서 받아온 ID
    this.users = []; //게임의 접속중인 유저를 저장할 배열
  }

  //유저 생성
  addUser(user) {
    //유저 정보 받아서 배열에 넣어줌
    this.users.push(user);
  }

  //유저 조회
  getUser(userId) {
    //userId를 인자로 받아 users배열에 있는 user를 찾아옴
    return this.users.find((user) => user.id === userId); //외부에서 받아온 ID 와 인자로 받아온 ID가 같은경우
  }
  //게임종료시 유저 삭제
  //onEnd와onError에서 사용할때 유저의 정보를 알수없음
  //하지만 socket의 정보로 충분히 유저를 특정할 수 있기 떄문에 인자로 socket을 받아온다

  removeUser(socket) {
    const index = this.users.findIndex((user) => user.socket === socket); //users배열에 있는 현재 유저의 index를 찾음
    if (index !== -1) {
      //현재 index가 음수가 아니라면 유저의대한 결과값이 있다는 의미이므로 아래 로직을 실행
      return this.users.splice(index, 1)[0]; //index위치에 해당하는 요소에서부터 1개 삭제한다 , [0]: splice로 삭제한 값중 0번째 요소를 반환한다.
    }
  }

  //현재 접속한 모든 유저의 데이터를 사용자에게 보내줌
  //멀티플레이에서는 다른 유저의 정보도 필요하기때문인듯
  getAllLocation() {}
}

export default Game;
