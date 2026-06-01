# CLAUDE.md — 포켓몬 성향 테스트 프로젝트

## 프로젝트 개요

사용자에게 심리 테스트 형식의 질문을 던지고, 답변 패턴을 PokeAPI 데이터(타입, 스탯, 특성 등)와 매핑하여 가장 닮은 포켓몬을 추천하는 인터랙티브 웹 앱.

---

## 기술 스택

- **Vanilla HTML / CSS / JS** (프레임워크 없음)
- **PokeAPI** (`https://pokeapi.co/api/v2/`) — REST, no key required
- **Axios** (CDN): `https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`
- 외부 라이브러리는 CDN으로만 추가

---

## 파일 구조

```
/
├── index.html         # 메인 HTML (포켓몬 검색 기반 구조 확장)
├── style.css          # 전체 스타일 (design.md 스펙 준수)
├── script.js          # 메인 로직 (질문 흐름 + API 연동)
├── questions.js       # 질문 데이터 및 성향 매핑 테이블
└── result.js          # 결과 렌더링 및 능력치 그래프
```

---

## 코드 규칙

- `async/await` + `try/catch` 사용, `Promise.then` 금지
- DOM 조작은 `innerHTML` 템플릿 리터럴 사용 (기존 패턴 유지)
- 전역 상태는 `const state = {}` 단일 객체로 관리
- 함수명: camelCase, 이벤트 핸들러는 `~Handler` 접미사
- API 호출 함수는 `get~Data` 접미사
- 콘솔 로그는 개발용으로 각 주요 단계마다 유지

---

## PokeAPI 활용 엔드포인트

```
GET /api/v2/pokemon/{id or name}      → 스탯, 타입, 이미지, 기술
GET /api/v2/pokemon-species/{id}      → 한국어 이름, 설명(flavor text)
GET /api/v2/type/{name}               → 타입 특성 참고
```

### 스탯 키 매핑

| API key        | 한국어  |
|----------------|---------|
| hp             | HP      |
| attack         | 공격    |
| defense        | 방어    |
| special-attack | 특수공격|
| special-defense| 특수방어|
| speed          | 스피드  |

---

## 주의사항

- PokeAPI는 CORS 허용, 인증 불필요
- 한국어 이름/설명: `species.names[]` / `species.flavor_text_entries[]` 에서 `language.name === 'ko'` 필터
- 포켓몬 이미지: `sprites.other['official-artwork'].front_default` 우선, 없으면 `sprites.front_default`
- flavor text의 `\f`, `\n` 문자는 공백으로 치환 후 출력
- 추천 포켓몬 후보 목록은 `questions.js`에 하드코딩 (1세대~3세대 친숙한 포켓몬 위주, 약 40종)
- 결과 페이지에서 "다시하기" 버튼은 상태 초기화 후 첫 질문으로 리셋

---

## 접근성

- 키보드 네비게이션 지원 (Enter로 선택)
- 색상 대비 WCAG AA 기준 충족
- `aria-live` 영역으로 결과 발표
