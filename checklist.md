# ✅ SecureVibe 구현 체크리스트

> 이 문서는 UI/기획 기준으로 구현해야 할 항목을 정리한 체크리스트입니다.
> 백로그 US-01 ~ US-09 기준으로 매핑되어 있습니다.

---

## 📁 0. 프로젝트 세팅

- [x] Next.js + React + TypeScript 세팅
- [x] 폴더 구조 (클린 아키텍처) 세팅
- [x] `.gitignore` 설정
- [ ] 더미데이터 파일 생성 (`src/presentation/mock/dummyData.ts`)
- [ ] 라우팅 구조 세팅
  ```
  /                        → 업로드 페이지
  /analysis/[id]           → 요약 대시보드
  /analysis/[id]/list      → 취약점 카드 리스트
  /analysis/[id]/[vulnId]  → 카드 상세
  /history                 → 분석 기록 조회 (로그인 필요)
  ```

---

## 📤 1. 업로드 페이지 `/` (US-01, US-02)

- [x] 파일 드래그앤드롭 (`FileDropzone.tsx`)
- [ ] 파일 클릭 업로드 버튼
- [ ] 지원 파일 확장자 표시 (`.js`, `.ts`, `.py` 등)
- [ ] GitHub URL 입력창 (`GithubInput.tsx`)
- [ ] 업로드/입력 후 분석 실행 버튼
- [ ] 에러 메시지 표시 (잘못된 파일 형식 등)

---

## 📊 2. 요약 대시보드 `/analysis/[id]` (US-03)

- [ ] 배포 가능 여부 크게 표시
  - ✅ 안전 (Critical/High 없음)
  - ⚠️ 주의 (High 있음)
  - ❌ 위험 (Critical 있음)
- [ ] 위험도별 취약점 개수 표시
  - Critical / High / Medium / Low 카운트
- [ ] "상세 보기" 버튼 → 카드 리스트로 이동
- [ ] (로그인 상태) "이전 분석 기록 보기" 버튼 표시

---

## 🃏 3. 취약점 카드 리스트 `/analysis/[id]/list` (US-03)

- [ ] 취약점 카드 목록 표시
- [ ] 카드별 위험도 색상 코딩
  - 🔴 Critical
  - 🟠 High
  - 🟡 Medium
  - 🔵 Low
- [ ] 카드에 표시할 정보
  - 위험도 레이블
  - 취약점 종류 (예: SQL Injection)
  - 파일명 + 줄 번호
- [ ] 카드 클릭 → 상세 페이지 이동

---

## 🔍 4. 카드 상세 `/analysis/[id]/[vulnId]` (US-03, US-07)

- [ ] 위험 시나리오 섹션
  - 비개발자도 이해할 수 있는 쉬운 설명
  - 예: "이 취약점이 공격받으면 모든 사용자 비밀번호가 유출될 수 있습니다"
- [ ] 수정 방향 섹션
  - 어떤 방향으로 코드를 고쳐야 하는지 개념적 가이드
- [ ] Diff 뷰 섹션
  - 수정 전/후 코드 비교
  - 라이브러리: `react-diff-viewer`

---

## 💬 5. 챗봇 (US-04, US-05)

- [ ] 모든 페이지에서 접근 가능한 플로팅 채팅 버튼
- [ ] 채팅 UI (대화창, 입력창, 전송 버튼)
- [ ] 현재 분석 결과 컨텍스트 유지 (분석 결과 기반 질의)
- [ ] 자유 질문 가능 (챗봇 일반 대화)

---

## 📖 6. 가이드 (US-06, US-07)

- [ ] 툴 사용 가이드 페이지 또는 모달
  - 업로드 방법, 결과 해석 방법 등
- [ ] 비개발자용 보안 취약점 설명 가이드
  - CWE Top 25 취약점 쉬운 설명

---

## 🔐 7. 로그인 및 기록 조회 (US-08, US-09) — Sprint 3

- [ ] 로그인 페이지
- [ ] 헤더에 로그인/로그아웃 버튼
- [ ] 분석 기록 목록 페이지 `/history`
  - 이전 분석 결과 리스트
  - 날짜, 프로젝트명, 배포 가능 여부 표시
- [ ] 기록 클릭 → 해당 대시보드로 이동

---

## 🧩 공통 컴포넌트

- [ ] 네비게이션 바 (`NavBar.tsx`) — 로그인 상태 반영
- [ ] 로딩 스피너 (분석 실행 중 표시)
- [ ] 에러 메시지 컴포넌트
- [ ] 플로팅 챗봇 버튼 (전 페이지 공통)

---

## 📦 설치할 라이브러리

```bash
npm install react-diff-viewer      # Diff 뷰
npm install prism-react-renderer   # 코드 하이라이팅
npm install react-dropzone         # 파일 업로드
npm install zustand                # 상태관리
```

---

## 🗂️ 더미데이터 구조 (`src/presentation/mock/dummyData.ts`)

```typescript
{
  task_id: number
  project_id: number
  status: "completed" | "pending" | "failed"
  source_url: string
  vulnerabilities: [
    {
      vuln_id: number
      cwe_id: number
      severity: "critical" | "high" | "medium" | "low"
      line_number: number
      content: {
        title: string           // 취약점 이름
        file: string            // 파일 경로
        risk_scenario: string   // 위험 시나리오 설명
        fix_direction: string   // 수정 방향
        code_before: string     // 수정 전 코드
        code_after: string      // 수정 후 코드
      }
    }
  ]
}
```