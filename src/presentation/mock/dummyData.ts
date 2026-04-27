export type Severity = "critical" | "high" | "medium" | "low";

export interface VulnerabilityContent {
  title: string;
  file: string;
  risk_scenario: string;
  fix_direction: string;
  code_before: string;
  code_after: string;
}

export interface Vulnerability {
  vuln_id: number;
  cwe_id: number;
  severity: Severity;
  line_number: number;
  content: VulnerabilityContent;
}

export interface AnalysisTask {
  task_id: number;
  project_id: number;
  status: "completed" | "pending" | "failed";
  source_url: string;
  vulnerabilities: Vulnerability[];
}

export const dummyAnalysisData: AnalysisTask = {
  task_id: 101,
  project_id: 1,
  status: "completed",
  source_url: "https://github.com/example/secure-vibe-demo",
  vulnerabilities: [
    {
      vuln_id: 1,
      cwe_id: 89,
      severity: "critical",
      line_number: 42,
      content: {
        title: "SQL Injection",
        file: "src/api/auth.js",
        risk_scenario: "공격자가 악의적인 SQL 쿼리를 주입하여 데이터베이스를 조작하거나 민감한 정보를 유출할 수 있습니다.",
        fix_direction: "Prepared Statement나 ORM을 사용하여 매개변수화된 쿼리를 작성하세요.",
        code_before: "const query = `SELECT * FROM users WHERE username = '${req.body.username}'`;",
        code_after: "const query = 'SELECT * FROM users WHERE username = ?';\ndb.execute(query, [req.body.username]);"
      }
    },
    {
      vuln_id: 2,
      cwe_id: 89,
      severity: "critical",
      line_number: 105,
      content: {
        title: "SQL Injection",
        file: "src/api/userController.js",
        risk_scenario: "사용자 입력을 통한 SQL 삽입 공격 위험이 있습니다.",
        fix_direction: "매개변수화된 쿼리를 사용하세요.",
        code_before: "db.query('DELETE FROM users WHERE id = ' + userId);",
        code_after: "db.query('DELETE FROM users WHERE id = ?', [userId]);"
      }
    },
    {
      vuln_id: 3,
      cwe_id: 79,
      severity: "high",
      line_number: 15,
      content: {
        title: "XSS (Cross-Site Scripting)",
        file: "src/views/search.tsx",
        risk_scenario: "사용자 검색어가 이스케이프 없이 출력되어 스크립트 실행이 가능합니다.",
        fix_direction: "출력 전 데이터를 적절히 인코딩하세요.",
        code_before: "<div dangerouslySetInnerHTML={{ __html: query }} />",
        code_after: "<div>{query}</div>"
      }
    },
    {
      vuln_id: 4,
      cwe_id: 79,
      severity: "high",
      line_number: 44,
      content: {
        title: "XSS (Cross-Site Scripting)",
        file: "src/views/comments.jsx",
        risk_scenario: "댓글에 포함된 악성 스크립트가 다른 사용자 브라우저에서 실행될 수 있습니다.",
        fix_direction: "HTML 이스케이프 처리를 적용하세요.",
        code_before: "element.innerHTML = comment.text;",
        code_after: "element.textContent = comment.text;"
      }
    },
    {
      vuln_id: 5,
      cwe_id: 79,
      severity: "high",
      line_number: 82,
      content: {
        title: "XSS (Cross-Site Scripting)",
        file: "src/views/profile.tsx",
        risk_scenario: "사용자 프로필 설명 렌더링 시 XSS 취약점이 존재합니다.",
        fix_direction: "안전한 렌더링 방식을 사용하세요.",
        code_before: "<p dangerouslySetInnerHTML={{ __html: bio }}></p>",
        code_after: "<p>{bio}</p>"
      }
    },
    {
      vuln_id: 6,
      cwe_id: 79,
      severity: "high",
      line_number: 12,
      content: {
        title: "XSS (Cross-Site Scripting)",
        file: "src/components/Notification.tsx",
        risk_scenario: "알림 메시지가 XSS 공격에 노출될 수 있습니다.",
        fix_direction: "React의 기본 텍스트 렌더링을 사용하세요.",
        code_before: "<span dangerouslySetInnerHTML={{ __html: message }} />",
        code_after: "<span>{message}</span>"
      }
    },
    {
      vuln_id: 7,
      cwe_id: 798,
      severity: "high",
      line_number: 5,
      content: {
        title: "Hardcoded Secret",
        file: "src/api/auth.js",
        risk_scenario: "소스 코드에 하드코딩된 비밀 키가 유출될 수 있습니다.",
        fix_direction: "환경 변수에서 비밀 키를 불러오도록 수정하세요.",
        code_before: "const JWT_SECRET = 'my-super-secret-key-1234';",
        code_after: "const JWT_SECRET = process.env.JWT_SECRET;"
      }
    },
    {
      vuln_id: 8,
      cwe_id: 798,
      severity: "medium",
      line_number: 12,
      content: {
        title: "Hardcoded Secret",
        file: "src/config/database.js",
        risk_scenario: "데이터베이스 비밀번호가 하드코딩되어 있습니다.",
        fix_direction: "환경 변수를 통해 주입받으세요.",
        code_before: "password: 'db-password-123',",
        code_after: "password: process.env.DB_PASSWORD,"
      }
    },
    {
      vuln_id: 9,
      cwe_id: 327,
      severity: "medium",
      line_number: 28,
      content: {
        title: "Weak Crypto",
        file: "src/utils/hash.js",
        risk_scenario: "안전하지 않은 해시 알고리즘을 사용 중입니다.",
        fix_direction: "더 안전한 알고리즘(SHA-256 등)을 사용하세요.",
        code_before: "crypto.createHash('md5').update(data).digest('hex');",
        code_after: "crypto.createHash('sha256').update(data).digest('hex');"
      }
    },
    {
      vuln_id: 10,
      cwe_id: 327,
      severity: "medium",
      line_number: 45,
      content: {
        title: "Weak Crypto",
        file: "src/utils/hash.js",
        risk_scenario: "안전하지 않은 해시 알고리즘을 사용 중입니다.",
        fix_direction: "더 안전한 알고리즘(SHA-256 등)을 사용하세요.",
        code_before: "crypto.createHash('sha1').update(data).digest('hex');",
        code_after: "crypto.createHash('sha256').update(data).digest('hex');"
      }
    },
    {
      vuln_id: 11,
      cwe_id: 311,
      severity: "medium",
      line_number: 14,
      content: {
        title: "Missing Encryption",
        file: "src/api/payment.js",
        risk_scenario: "결제 정보가 평문으로 저장됩니다.",
        fix_direction: "중요 데이터는 암호화하여 저장하세요.",
        code_before: "db.save({ cardNum: req.body.card });",
        code_after: "db.save({ cardNum: encrypt(req.body.card) });"
      }
    },
    {
      vuln_id: 12,
      cwe_id: 1104,
      severity: "medium",
      line_number: 2,
      content: {
        title: "Outdated Dependencies",
        file: "package.json",
        risk_scenario: "취약점이 있는 구버전 패키지를 사용 중입니다.",
        fix_direction: "의존성을 최신 안전한 버전으로 업데이트하세요.",
        code_before: "\"express\": \"^4.16.0\",",
        code_after: "\"express\": \"^4.18.2\","
      }
    },
    {
      vuln_id: 13,
      cwe_id: 1104,
      severity: "medium",
      line_number: 5,
      content: {
        title: "Outdated Dependencies",
        file: "package.json",
        risk_scenario: "취약점이 있는 구버전 패키지를 사용 중입니다.",
        fix_direction: "의존성을 최신 안전한 버전으로 업데이트하세요.",
        code_before: "\"lodash\": \"^4.17.10\",",
        code_after: "\"lodash\": \"^4.17.21\","
      }
    },
    {
      vuln_id: 14,
      cwe_id: 1104,
      severity: "medium",
      line_number: 18,
      content: {
        title: "Outdated Dependencies",
        file: "package.json",
        risk_scenario: "취약점이 있는 구버전 패키지를 사용 중입니다.",
        fix_direction: "의존성을 최신 안전한 버전으로 업데이트하세요.",
        code_before: "\"jsonwebtoken\": \"^8.0.0\",",
        code_after: "\"jsonwebtoken\": \"^9.0.0\","
      }
    },
    {
      vuln_id: 15,
      cwe_id: 1104,
      severity: "medium",
      line_number: 22,
      content: {
        title: "Outdated Dependencies",
        file: "package.json",
        risk_scenario: "취약점이 있는 구버전 패키지를 사용 중입니다.",
        fix_direction: "의존성을 최신 안전한 버전으로 업데이트하세요.",
        code_before: "\"axios\": \"0.18.0\",",
        code_after: "\"axios\": \"1.6.0\","
      }
    },
    {
      vuln_id: 16,
      cwe_id: 200,
      severity: "low",
      line_number: 89,
      content: {
        title: "Information Exposure",
        file: "src/app.js",
        risk_scenario: "에러 메시지를 통해 시스템 정보가 노출됩니다.",
        fix_direction: "친화적인 에러 메시지만 보여주세요.",
        code_before: "res.status(500).send(err.stack);",
        code_after: "logger.error(err); res.status(500).send('오류 발생');"
      }
    },
    {
      vuln_id: 17,
      cwe_id: 200,
      severity: "low",
      line_number: 44,
      content: {
        title: "Information Exposure",
        file: "src/api/auth.js",
        risk_scenario: "개발용 디버그 정보가 프로덕션에 노출됩니다.",
        fix_direction: "디버그 로그를 제거하거나 환경변수로 통제하세요.",
        code_before: "console.log('User auth payload:', userPayload);",
        code_after: "logger.debug('User authenticated');"
      }
    },
    {
      vuln_id: 18,
      cwe_id: 200,
      severity: "low",
      line_number: 120,
      content: {
        title: "Information Exposure",
        file: "src/views/search.tsx",
        risk_scenario: "불필요한 내부 식별자가 클라이언트 측에 노출됩니다.",
        fix_direction: "클라이언트에 전달되는 데이터를 필터링하세요.",
        code_before: "return res.json(results);",
        code_after: "return res.json(results.map(r => ({ id: r.id, name: r.name })));"
      }
    },
    {
      vuln_id: 19,
      cwe_id: 200,
      severity: "low",
      line_number: 55,
      content: {
        title: "Information Exposure",
        file: "src/api/auth.js",
        risk_scenario: "서버 헤더를 통해 기술 스택 정보가 노출됩니다.",
        fix_direction: "보안 헤더 설정을 추가하세요.",
        code_before: "app.use(express());",
        code_after: "app.use(helmet());"
      }
    }
  ]
};
