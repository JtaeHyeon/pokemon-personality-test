# 🎯 Claude Code Prompt — 포켓몬 성향 테스트 웹앱

## 역할 및 목표

너는 숙련된 프론트엔드 개발자다.
아래 기존 파일(index.html + script.js + style.css)을 **기반으로 확장**하여,
사용자 성향 테스트 결과를 PokeAPI로 매핑해 포켓몬을 추천하는 **완성도 높은 싱글페이지 앱**을 만들어라.

---

## 기존 파일 구조 (출발점)

- `index.html` — form + axios CDN 포함된 기본 HTML
- `script.js` — PokeAPI 호출 패턴 (`getPokeData`, `drawPoke`, `getFormData`)
- `style.css` — 기본 레이아웃

이 파일들을 **참고 및 확장**하되, 최종 결과물은 완전히 새로운 UX로 교체한다.
기존 검색 폼 UI는 삭제하고, 성향 테스트 플로우로 전면 교체한다.

---

## 최종 결과물 파일

```
index.html
style.css
script.js
questions.js      ← 새로 생성
result.js         ← 새로 생성
```

---

## 📋 구현 사양

### 1. 질문 플로우

총 **10개 질문**, 각 질문마다 **4개 선택지**.
질문은 `questions.js`에 배열로 정의.
한 번에 하나의 질문을 카드 형태로 표시.
선택 즉시 다음 질문으로 전환 (확인 버튼 없음).
상단 진행 바(progress bar)로 몇 번째 질문인지 시각화.

### 2. 질문 목록 (questions.js에 구현)

아래 10개 질문과 선택지를 그대로 사용하되,
각 선택지에 **성향 태그 배열**을 붙여 점수를 누적한다.

```
Q1. 주말 오전, 당신의 이상적인 시간은?
  A) 야외에서 활발하게 움직인다        → [active, physical, energetic]
  B) 혼자 조용히 책을 읽거나 생각한다  → [calm, special, wise]
  C) 친구들과 수다를 떨며 논다         → [social, balanced, cheerful]
  D) 아무것도 안 하고 집에서 쉰다      → [defensive, calm, endurance]

Q2. 갑자기 길에서 낯선 사람이 도움을 요청한다면?
  A) 망설임 없이 바로 돕는다           → [fighting, physical, brave]
  B) 상황을 파악하고 신중하게 행동한다 → [wise, special, psychic]
  C) 도움은 주지만 거리는 유지한다     → [calm, defensive, ghost]
  D) 못 본 척 빠르게 지나친다          → [speed, evasive, dark]

Q3. 나는 스트레스를 받으면 어떻게 반응하는가?
  A) 운동이나 신체 활동으로 푼다       → [physical, active, fire]
  B) 음악을 듣거나 혼자만의 시간을 갖는다 → [calm, psychic, ice]
  C) 친구에게 털어놓고 공감을 받는다   → [social, fairy, water]
  D) 그냥 참고 버틴다                  → [defensive, endurance, steel]

Q4. 내가 가장 중요하게 여기는 가치는?
  A) 자유 — 아무것도 나를 구속하지 않기를 바란다  → [speed, flying, evasive]
  B) 정의 — 옳고 그름이 분명해야 한다             → [fighting, physical, brave]
  C) 조화 — 모두가 사이좋게 지내는 것이 최고다    → [fairy, social, water]
  D) 지식 — 끊임없이 배우고 성장하고 싶다         → [wise, special, psychic]

Q5. 친구들이 나를 한 마디로 표현한다면?
  A) "에너지 넘쳐"                   → [energetic, active, fire]
  B) "의외로 차분해"                 → [calm, ice, defensive]
  C) "눈치가 빨라"                   → [speed, wise, dark]
  D) "믿음직해"                      → [endurance, steel, defensive]

Q6. 나는 어떤 환경에서 가장 집중이 잘 되는가?
  A) 탁 트인 야외나 햇빛이 드는 곳    → [fire, active, flying]
  B) 조용하고 서늘한 실내             → [ice, calm, psychic]
  C) 사람이 많고 활기찬 카페           → [social, water, cheerful]
  D) 깊고 고요한 밤                   → [ghost, dark, wise]

Q7. 갑작스러운 변화가 생겼을 때 나는?
  A) 빠르게 적응하고 앞으로 나아간다  → [speed, active, energetic]
  B) 상황을 분석하고 최선책을 찾는다  → [wise, special, psychic]
  C) 주변 사람들과 함께 해결한다      → [social, fairy, balanced]
  D) 감정을 추스르는 데 시간이 걸린다 → [defensive, endurance, calm]

Q8. 나는 어떤 종류의 영화를 좋아하는가?
  A) 액션 — 손에 땀을 쥐는 장면들    → [physical, fire, fighting]
  B) 미스터리/스릴러 — 숨겨진 진실   → [dark, ghost, wise]
  C) 로맨스/드라마 — 감동적인 이야기 → [fairy, social, water]
  D) SF/판타지 — 새로운 세계관        → [psychic, special, flying]

Q9. 나의 행동 패턴에 가깝다고 느끼는 것은?
  A) 먼저 행동하고 나중에 생각한다    → [physical, energetic, brave]
  B) 오래 고민하고 신중하게 결정한다  → [wise, defensive, calm]
  C) 직감을 많이 따른다               → [psychic, speed, evasive]
  D) 경험을 토대로 움직인다           → [endurance, steel, balanced]

Q10. 내가 포켓몬이라면 가장 원하는 능력은?
  A) 엄청난 힘과 체력                 → [physical, endurance, fighting]
  B) 빛의 속도로 움직이는 스피드      → [speed, evasive, electric]
  C) 마음을 꿰뚫는 직관과 지혜        → [psychic, wise, special]
  D) 어떤 상황도 버티는 단단함        → [defensive, steel, calm]
```

### 3. 성향 → 포켓몬 매핑 알고리즘 (questions.js에 구현)

누적된 태그 빈도를 계산하여 가장 많이 등장한 **상위 3개 태그**를 뽑는다.
아래 후보 포켓몬 테이블에서 `tags` 일치도가 가장 높은 포켓몬을 선택한다.

```javascript
const POKEMON_POOL = [
  // 이름(영어), 도감번호, 대표 태그들
  { name: "charizard",    id: 6,   tags: ["fire","active","energetic","brave"] },
  { name: "blastoise",    id: 9,   tags: ["water","defensive","endurance","calm"] },
  { name: "venusaur",     id: 3,   tags: ["grass","balanced","social","endurance"] },
  { name: "pikachu",      id: 25,  tags: ["electric","energetic","social","speed"] },
  { name: "jigglypuff",   id: 39,  tags: ["fairy","social","cheerful","calm"] },
  { name: "mewtwo",       id: 150, tags: ["psychic","wise","special","evasive"] },
  { name: "gengar",       id: 94,  tags: ["ghost","dark","evasive","wise"] },
  { name: "machamp",      id: 68,  tags: ["fighting","physical","brave","endurance"] },
  { name: "alakazam",     id: 65,  tags: ["psychic","wise","special","speed"] },
  { name: "snorlax",      id: 143, tags: ["defensive","endurance","calm","physical"] },
  { name: "dragonite",    id: 149, tags: ["flying","balanced","brave","energetic"] },
  { name: "eevee",        id: 133, tags: ["balanced","social","calm","cheerful"] },
  { name: "vaporeon",     id: 134, tags: ["water","calm","endurance","social"] },
  { name: "jolteon",      id: 135, tags: ["electric","speed","energetic","evasive"] },
  { name: "flareon",      id: 136, tags: ["fire","physical","brave","active"] },
  { name: "espeon",       id: 196, tags: ["psychic","wise","special","calm"] },
  { name: "umbreon",      id: 197, tags: ["dark","defensive","endurance","calm"] },
  { name: "lapras",       id: 131, tags: ["water","ice","calm","social"] },
  { name: "scyther",      id: 123, tags: ["physical","speed","active","brave"] },
  { name: "hitmonlee",    id: 106, tags: ["fighting","physical","speed","active"] },
  { name: "hitmonchan",   id: 107, tags: ["fighting","physical","endurance","brave"] },
  { name: "slowbro",      id: 80,  tags: ["psychic","calm","defensive","wise"] },
  { name: "haunter",      id: 93,  tags: ["ghost","evasive","dark","special"] },
  { name: "raichu",       id: 26,  tags: ["electric","energetic","speed","cheerful"] },
  { name: "articuno",     id: 144, tags: ["ice","calm","wise","flying"] },
  { name: "zapdos",       id: 145, tags: ["electric","flying","energetic","brave"] },
  { name: "moltres",      id: 146, tags: ["fire","flying","energetic","active"] },
  { name: "absol",        id: 359, tags: ["dark","wise","evasive","brave"] },
  { name: "gardevoir",    id: 282, tags: ["psychic","fairy","wise","social"] },
  { name: "lucario",      id: 448, tags: ["fighting","psychic","brave","wise"] },
  { name: "glaceon",      id: 471, tags: ["ice","calm","defensive","special"] },
  { name: "leafeon",      id: 470, tags: ["grass","active","balanced","calm"] },
  { name: "togekiss",     id: 468, tags: ["fairy","flying","social","cheerful"] },
  { name: "garchomp",     id: 445, tags: ["physical","speed","brave","active"] },
  { name: "typhlosion",   id: 157, tags: ["fire","energetic","active","speed"] },
  { name: "feraligatr",   id: 160, tags: ["water","physical","brave","endurance"] },
  { name: "meganium",     id: 154, tags: ["grass","calm","social","balanced"] },
  { name: "ampharos",     id: 181, tags: ["electric","special","calm","balanced"] },
  { name: "heracross",    id: 214, tags: ["fighting","active","endurance","brave"] },
  { name: "umbreon",      id: 197, tags: ["dark","defensive","calm","endurance"] },
];
```

### 4. 결과 화면 (result.js에 구현)

PokeAPI에서 불러온 데이터로 아래 항목을 렌더링:

```
① 포켓몬 공식 아트워크 이미지
   - sprites.other['official-artwork'].front_default
   - popIn 애니메이션 적용

② 포켓몬 이름
   - 한국어 이름 (species.names[] ko 필터)
   - 영어 이름 (data.name) 병기

③ 타입 뱃지
   - data.types[] 배열로 각 타입을 뱃지로 렌더
   - design.md의 --type-{name} 컬러 적용

④ 도감 설명
   - species.flavor_text_entries[]에서 ko 필터, 최신 버전 우선
   - \f, \n → 공백 치환

⑤ 성향 설명 (하드코딩, 포켓몬별 1~2문장)
   - "당신은 [포켓몬 이름]과(와) 닮았습니다. ..."
   - POKEMON_POOL 배열에 `desc` 필드로 함께 정의할 것

⑥ 능력치 그래프
   - data.stats[] 전체 6개 스탯을 바 차트로 시각화
   - fillBar 애니메이션 (stagger: 각 바 0.1s 딜레이)
   - 최댓값 255 기준 퍼센트

⑦ 어울리는 기술 추천 (3개)
   - data.moves[]에서 랜덤 3개 선택
   - move 이름은 /api/v2/move/{name} 에서 ko 이름 조회
   - 기술 이름과 한 줄 설명(flavor text ko) 표시

⑧ 공유 / 다시하기 버튼
   - "다시하기": 상태 초기화 후 Q1으로 복귀
   - "결과 공유": navigator.clipboard로 현재 URL 복사 (토스트 알림)
```

### 5. 로딩 상태

API 호출 중 포켓볼 SVG 스피너를 중앙에 표시.
인라인 SVG로 포켓볼 모양 구현 (원 + 수평선 + 작은 원).
`pokeball-spin` 애니메이션 적용.

---

## 🎨 디자인 지침

`design.md` 파일의 모든 스펙을 정확히 준수한다.

- 배경: `--bg-deep` (#0d0f14)
- 카드: `--bg-card` + border-radius 20px + 그림자
- 포인트: `--red-primary` (#e63946)
- 폰트: Press Start 2P (타이틀) + Noto Sans KR (본문)
- 선택지 hover 시 레드 테두리 glow 효과
- 질문 전환: fadeSlideIn 애니메이션
- 결과 이미지: popIn 애니메이션
- 스탯 바: fillBar 애니메이션 (stagger)
- 배경에 미묘한 radial-gradient 광원 효과

---

## ⚙️ 기술 구현 지침

- `CLAUDE.md` 파일의 코드 규칙을 모두 준수한다
- axios는 CDN으로 로드 (`https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`)
- 모든 API 호출은 `async/await + try/catch`
- 전역 상태 객체: `const state = { answers: [], scores: {}, currentQ: 0 }`
- 점수 계산 함수: `calculateScores()` — 태그별 빈도 합산
- 포켓몬 매칭 함수: `matchPokemon(scores)` — POKEMON_POOL 교집합 점수 계산
- 결과 렌더링은 `result.js`의 `renderResult(pokeData, speciesData)` 함수에서 담당
- HTML `<form>` 태그 사용 금지 (기존 검색 폼 완전 제거)
- 이벤트는 `addEventListener` 또는 인라인 `onclick`으로 처리

---

## ✅ 완성 체크리스트

구현 완료 후 아래를 모두 확인한다:

- [ ] 10개 질문이 순서대로 표시되는가
- [ ] 선택 즉시 다음 질문으로 넘어가는가
- [ ] 진행 바가 정확히 업데이트되는가
- [ ] 결과 포켓몬이 성향 점수에 따라 결정되는가
- [ ] 공식 아트워크 이미지가 표시되는가
- [ ] 한국어 이름과 도감 설명이 표시되는가
- [ ] 타입 뱃지 컬러가 타입별로 다른가
- [ ] 스탯 바 그래프가 애니메이션과 함께 채워지는가
- [ ] 기술 추천 3개가 한국어로 표시되는가
- [ ] 로딩 스피너가 API 호출 중 보이는가
- [ ] 다시하기 버튼이 작동하는가
- [ ] 모바일(360px) 레이아웃이 깨지지 않는가
- [ ] console.log가 주요 단계마다 존재하는가

---

## 시작 명령

위 사양을 모두 읽은 뒤, 아래 순서로 파일을 생성하라:

1. `questions.js` — POKEMON_POOL + 질문 데이터 + 매핑 로직
2. `style.css` — design.md 스펙 완전 구현
3. `result.js` — 결과 렌더링 함수
4. `script.js` — 메인 앱 플로우 (질문 표시 + 점수 집계 + API 호출)
5. `index.html` — 최종 HTML (기존 파일 교체)

각 파일을 생성한 뒤 간단히 무엇을 구현했는지 한 줄로 요약하라.
모든 파일 생성 완료 후 "✅ 구현 완료" 를 출력하라.
