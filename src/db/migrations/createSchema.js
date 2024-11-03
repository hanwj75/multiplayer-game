import fs from "fs"; //파일시스템  서버 폴더안의 파일들을 경로를 통해 찾아가 읽기위해 필요함
import path from "path"; //경로를 찾기 위해 필요함
import { fileURLToPath } from "url"; //nodejs의 url모듈이 제공하는 함수 ,파일URL을 파일시스템 경로로 변환하는데 사용된다.
import pools from "../user/database.js";

const __filename = fileURLToPath(import.meta.url); //nodejs에서 ES모듈을 사용할때 현재 모듈의 파일 경로를 가져오는 코드
const __dirname = path.dirname(__filename); //filename으로 찾은 경로에있는 디렉토리의 이름을 반환함

const createSchema = async () => {
  const sqlDir = path.join(__dirname, "../sql");

  try {
    //쿼리 실행
    const sql = fs.readFileSync(sqlDir + "/user_db.sql", "utf8");

    const queries = sql
      .split(";")
      .map((query) => query.trim())
      .filter((query) => query.length > 0);

    for (const query of queries) {
      await pools.query(query);
    }
  } catch (err) {
    console.error(`데이터베이스 마이그레이션 에러 : `, err);
  }
};

createSchema()
  .then(() => {
    console.log(`마이그레이션 완료`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(`마이그레이션 에러났음`, err);
    process.exit(1);
  });
