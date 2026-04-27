// domain/entities/AnalysisResult.ts
export interface AnalysisResult {
    vuln_id: string
    risk_scenario: string    // 위험 시나리오 (비개발자용)
    fix_direction: string    // 수정 방향
    code_before: string      // 수정 전 코드 (Diff용)
    code_after: string       // 수정 후 코드 (Diff용)
}