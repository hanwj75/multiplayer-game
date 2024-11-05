class LatencyManager {
  constructor() {
    //사용자의 지연시간을 관리하기위함 Map 객체 초기화
    this.intervals = new Map();
  }
  //새로운 사용자를 추가하는 메서드
  //이 메서드는 사용자의 지연시간을 설정하거나 초기화하는 데 사용할 수 있다.
  addUser(userId, callback, timestamp) {
    if (this.intervals.has(userId)) {
      console.error("중복된 인터벌 확인");
    }
    this.intervals.set(userId, setInterval(callback, timestamp));
  }

  //사용자를 제거하는 메서드
  //특정 사용자의 지연 시간 데이터를 삭제하는데 사용
  removeUser(userId) {
    if (!this.intervals.has(userId)) {
      return;
    }
    clearInterval(this.intervals.get(userId));
  }

  //모든 사용자 데이터 초기화
  //모즌 지연시간 데이터를 삭제하고 초기상태로 되돌림
  clearAll() {
    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });
    this.intervals.clear();
  }
}

export default LatencyManager;
