// 분석 결과 더미데이터
export const dummyAnalysis = {
    task_id: 1,
    project_id: 1,
    status: "completed",
    source_url: "https://github.com/example/repo",
    vulnerabilities: [
        {
            vuln_id: 1,
            task_id: 1,
            cwe_id: 89,
            severity: "critical",        // critical / high / medium / low
            line_number: 42,
            content: {
                title: "SQL Injection",
                file: "src/db/query.py",
                risk_scenario: "공격자가 이 취약점을 이용하면 데이터베이스의 모든 사용자 정보를 탈취할 수 있습니다.",
                fix_direction: "사용자 입력값을 직접 쿼리에 삽입하지 말고, Prepared Statement를 사용하세요.",
                code_before: `query = "SELECT * FROM users WHERE id=" + user_input`,
                code_after: `query = "SELECT * FROM users WHERE id=?"`,
            }
        },
        {
            vuln_id: 2,
            task_id: 1,
            cwe_id: 79,
            severity: "high",
            line_number: 87,
            content: {
                title: "XSS (Cross-Site Scripting)",
                file: "src/routes/comment.js",
                risk_scenario: "공격자가 악성 스크립트를 삽입해 다른 사용자의 세션을 탈취할 수 있습니다.",
                fix_direction: "사용자 입력값을 화면에 출력할 때 반드시 HTML 이스케이프 처리를 하세요.",
                code_before: `res.send("<div>" + userInput + "</div>")`,
                code_after: `res.send("<div>" + escapeHtml(userInput) + "</div>")`,
            }
        },
    ]
}

// 배포 가능 여부 계산
export const getDeployStatus = (vulnerabilities) => {
    const hasCritical = vulnerabilities.some(v => v.severity === "critical")
    const hasHigh = vulnerabilities.some(v => v.severity === "high")
    if (hasCritical) return "danger"    // ❌
    if (hasHigh) return "caution"       // ⚠️
    return "safe"                       // ✅
}