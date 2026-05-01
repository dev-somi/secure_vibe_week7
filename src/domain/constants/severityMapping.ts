// src/domain/constants/severityMapping.ts

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface VulnerabilityInfo {
  severity: Severity;
  title: string;
  owasp: string;
  description: string;
}

export const CWE_MAPPING: Record<string, VulnerabilityInfo> = {
  // Critical
  'CWE-89': {
    severity: 'critical',
    title: 'SQL Injection',
    owasp: 'A03:2021-Injection',
    description: '애플리케이션이 외부 입력값을 적절히 검증하지 않고 SQL 쿼리 생성에 사용하여 데이터베이스를 조작할 수 있는 취약점입니다.'
  },
  'CWE-78': {
    severity: 'critical',
    title: 'OS Command Injection',
    owasp: 'A03:2021-Injection',
    description: '외부 입력값이 운영체제 명령어의 일부로 실행되어 서버 권한을 탈취당할 수 있는 위험한 취약점입니다.'
  },
  'CWE-94': {
    severity: 'critical',
    title: 'Code Injection',
    owasp: 'A03:2021-Injection',
    description: '서버 측에서 외부 입력값이 코드로 해석되어 실행되는 취약점으로, 원격 코드 실행(RCE)으로 이어질 수 있습니다.'
  },
  'CWE-917': {
    severity: 'critical',
    title: 'Expression Language Injection',
    owasp: 'A03:2021-Injection',
    description: 'Expression Language(EL) 구문에 외부 입력이 삽입되어 서버의 민감한 데이터에 접근하거나 임의 코드를 실행할 수 있습니다.'
  },

  // High
  'CWE-79': {
    severity: 'high',
    title: 'Cross-Site Scripting (XSS)',
    owasp: 'A03:2021-Injection',
    description: '사용자의 브라우저에서 악성 스크립트가 실행되도록 하여 세션 탈취나 페이지 변조를 유발하는 취약점입니다.'
  },
  'CWE-798': {
    severity: 'high',
    title: 'Use of Hardcoded Credentials',
    owasp: 'A07:2021-Identification and Authentication Failures',
    description: '소스코드 내에 암호, API 키 등 민감한 정보가 직접 노출되어 있어 공격자가 시스템 권한을 획득할 수 있습니다.'
  },
  'CWE-434': {
    severity: 'high',
    title: 'Unrestricted Upload of File with Dangerous Type',
    owasp: 'A08:2021-Software and Data Integrity Failures',
    description: '위험한 확장자를 가진 파일 업로드를 허용하여 웹쉘 실행 등 서버 장악의 원인이 될 수 있습니다.'
  },
  'CWE-22': {
    severity: 'high',
    title: 'Path Traversal',
    owasp: 'A01:2021-Broken Access Control',
    description: '파일 경로 제어 문자를 이용해 의도하지 않은 시스템 디렉토리에 접근하고 파일을 열람할 수 있는 취약점입니다.'
  },
  'CWE-918': {
    severity: 'high',
    title: 'Server-Side Request Forgery (SSRF)',
    owasp: 'A10:2021-Server-Side Request Forgery',
    description: '서버가 공격자가 의도한 내부망 주소로 요청을 보내게 하여 내부 자원을 노출시키거나 공격의 징검다리로 활용되는 취약점입니다.'
  },
  'CWE-611': {
    severity: 'high',
    title: 'XML External Entity (XXE) Injection',
    owasp: 'A05:2021-Security Misconfiguration',
    description: 'XML 파서가 외부 엔티티를 처리하는 과정에서 서버 내부 파일 열람이나 SSRF를 유발할 수 있습니다.'
  },
  'CWE-287': {
    severity: 'high',
    title: 'Improper Authentication',
    owasp: 'A07:2021-Identification and Authentication Failures',
    description: '본인 확인 절차를 거치지 않거나 우회하여 타인의 계정으로 접근할 수 있는 취약점입니다.'
  },
  'CWE-862': {
    severity: 'high',
    title: 'Missing Authorization',
    owasp: 'A01:2021-Broken Access Control',
    description: '적절한 권한 검증 절차가 누락되어 일반 사용자가 관리자 기능에 접근하거나 타인의 데이터를 조작할 수 있습니다.'
  },

  // Medium
  'CWE-327': {
    severity: 'medium',
    title: 'Use of a Broken or Risky Cryptographic Algorithm',
    owasp: 'A02:2021-Cryptographic Failures',
    description: '보안성이 입증되지 않았거나 취약점이 발견된 암호화 알고리즘을 사용하여 데이터가 복호화될 위험이 있습니다.'
  },
  'CWE-1104': {
    severity: 'medium',
    title: 'Use of Unmaintained Third-Party Components',
    owasp: 'A06:2021-Vulnerable and Outdated Components',
    description: '보안 업데이트가 중단되거나 알려진 취약점이 있는 외부 라이브러리를 사용하여 전체 시스템을 위험에 노출시킵니다.'
  },
  'CWE-352': {
    severity: 'medium',
    title: 'Cross-Site Request Forgery (CSRF)',
    owasp: 'A01:2021-Broken Access Control',
    description: '사용자가 의도하지 않은 요청을 특정 웹사이트에 강제로 보내게 하여 데이터 변경 등을 유발하는 취약점입니다.'
  },
  'CWE-312': {
    severity: 'medium',
    title: 'Cleartext Storage of Sensitive Information',
    owasp: 'A02:2021-Cryptographic Failures',
    description: '중요한 정보를 암호화하지 않고 평문으로 저장하여 물리적/논리적 접근 시 정보가 유출될 수 있습니다.'
  },
  'CWE-400': {
    severity: 'medium',
    title: 'Uncontrolled Resource Consumption',
    owasp: 'A04:2021-Insecure Design',
    description: 'CPU, 메모리 등 자원 사용을 제한하지 않아 서비스 거부(DoS) 상태를 유발할 수 있는 취약점입니다.'
  },
  'CWE-20': {
    severity: 'medium',
    title: 'Improper Input Validation',
    owasp: 'A03:2021-Injection',
    description: '사용자 입력값에 대한 검증이 부족하여 예기치 않은 시스템 동작을 유발하거나 다른 공격의 기반이 될 수 있습니다.'
  },
  'CWE-330': {
    severity: 'medium',
    title: 'Use of Insufficiently Random Values',
    owasp: 'A02:2021-Cryptographic Failures',
    description: '예측 가능한 난수를 사용하여 세션 하이재킹이나 암호 우회 등이 발생할 수 있는 취약점입니다.'
  },

  // Low
  'CWE-200': {
    severity: 'low',
    title: 'Exposure of Sensitive Information to an Unauthorized Actor',
    owasp: 'A01:2021-Broken Access Control',
    description: '시스템 구성 정보, 에러 메시지 등이 외부에 노출되어 공격자에게 유용한 정보를 제공하게 됩니다.'
  },
  'CWE-601': {
    severity: 'low',
    title: 'URL Redirection to Untrusted Site (\'Open Redirect\')',
    owasp: 'A01:2021-Broken Access Control',
    description: '외부 입력에 의해 사용자를 악성 사이트로 리다이렉트시켜 피싱 공격 등에 활용될 수 있습니다.'
  }
};

/**
 * CWE 코드를 입력받아 매핑된 정보를 반환합니다.
 * 매핑되지 않은 경우 기본값(Medium)을 반환합니다.
 */
export const getVulnerabilityInfo = (cwe: string): VulnerabilityInfo => {
  // "CWE-78" 또는 "78" 형식 모두 지원
  const key = cwe.startsWith('CWE-') ? cwe : `CWE-${cwe}`;

  return CWE_MAPPING[key] || {
    severity: 'medium',
    title: `Vulnerability ${key}`,
    owasp: 'A00:2021-Unknown',
    description: '해당 CWE 항목에 대한 상세 정보가 등록되지 않았습니다.'
  };
};
