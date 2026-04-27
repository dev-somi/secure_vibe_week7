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
        file: "src/api/userController.js",
        risk_scenario: "공격자가 악의적인 SQL 쿼리를 주입하여 데이터베이스를 조작하거나 민감한 정보를 유출할 수 있습니다. 예를 들어, 로그인 폼에서 모든 사용자의 비밀번호를 볼 수 있게 됩니다.",
        fix_direction: "사용자 입력을 직접 SQL 쿼리 문자열에 결합하지 말고, Prepared Statement나 ORM을 사용하여 매개변수화된 쿼리를 작성하세요.",
        code_before: "const query = `SELECT * FROM users WHERE username = '${req.body.username}'`;",
        code_after: "const query = 'SELECT * FROM users WHERE username = ?';\ndb.execute(query, [req.body.username]);"
      }
    },
    {
      vuln_id: 2,
      cwe_id: 79,
      severity: "high",
      line_number: 115,
      content: {
        title: "Cross-Site Scripting (XSS)",
        file: "src/views/comments.jsx",
        risk_scenario: "공격자가 악성 스크립트를 삽입하여, 다른 사용자가 해당 페이지를 방문할 때 스크립트가 실행되게 할 수 있습니다. 이로 인해 세션 탈취나 피싱 공격이 발생할 수 있습니다.",
        fix_direction: "사용자로부터 입력받은 데이터를 화면에 출력할 때 반드시 HTML 인코딩 처리를 하거나, React의 기본 렌더링 방식(dangerouslySetInnerHTML 사용 지양)을 사용하세요.",
        code_before: "<div dangerouslySetInnerHTML={{ __html: userComment.text }} />",
        code_after: "<div>{userComment.text}</div>"
      }
    },
    {
      vuln_id: 3,
      cwe_id: 311,
      severity: "medium",
      line_number: 28,
      content: {
        title: "Missing Encryption of Sensitive Data",
        file: "src/utils/cryptoUtils.js",
        risk_scenario: "중요한 데이터(비밀번호, 개인정보 등)를 암호화하지 않고 저장하거나 전송하면, 데이터 유출 시 평문으로 노출되어 심각한 피해를 유발할 수 있습니다.",
        fix_direction: "중요 데이터는 항상 강력한 암호화 알고리즘(예: AES-GCM)을 사용하여 암호화하고, 해시의 경우 bcrypt나 Argon2와 같은 안전한 알고리즘을 사용하세요.",
        code_before: "const hash = crypto.createHash('md5').update(password).digest('hex');",
        code_after: "const hash = await bcrypt.hash(password, 10);"
      }
    },
    {
      vuln_id: 4,
      cwe_id: 200,
      severity: "low",
      line_number: 89,
      content: {
        title: "Information Exposure Through Error Messages",
        file: "src/app.js",
        risk_scenario: "상세한 에러 메시지(스택 트레이스 등)가 사용자에게 노출되면, 공격자가 시스템 내부 구조나 버전 정보를 파악하여 추가 공격에 악용할 수 있습니다.",
        fix_direction: "프로덕션 환경에서는 사용자에게 일반적이고 친화적인 에러 메시지만 보여주고, 상세한 에러 정보는 안전한 내부 로그 시스템에만 기록하세요.",
        code_before: "res.status(500).send(err.stack);",
        code_after: "logger.error(err.stack);\nres.status(500).send('서버 내부 오류가 발생했습니다.');"
      }
    }
  ]
};
