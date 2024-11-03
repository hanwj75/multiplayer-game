
-- 'user' 테이블을 생성한다. 만약 이미 존재한다면 생성하지 않음
CREATE TABLE IF NOT EXISTS user (
    -- 각 사용자의 고유ID, 기본 키로 설정한다.
    device_id VARCHAR(255) PRIMARY KEY,
    
    -- 사용자의 x 좌표, 기본값은 0이며 NULL 값은 허용되지 않음
    x_coord DOUBLE NOT NULL DEFAULT 0,
    
    -- 사용자의 y 좌표, 기본값은 0이며 NULL 값은 허용되지 않음
    y_coord DOUBLE NOT NULL DEFAULT 0,
    
    -- 사용자의 마지막 로그인 시간을 기록한다. 기본값은 현재 시간
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- 사용자가 생성된 시간을 기록한다. 기본값은 현재 시간
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);