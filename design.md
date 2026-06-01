# design.md — 포켓몬 성향 테스트 비주얼 스펙

## 컨셉

**"레트로 포켓몬 게임보이 + 모던 카드 UI"**

닌텐도 게임보이의 픽셀 감성과 포켓몬스터 원작의 배색을 오마주하되,  
현대적인 카드 레이아웃과 애니메이션으로 세련되게 재해석.  
어둡고 깊은 배경 위에 포켓볼 레드 포인트 컬러가 선명하게 튀는 구성.

---

## 색상 팔레트 (CSS Variables)

```css
:root {
  /* 배경 계열 */
  --bg-deep:    #0d0f14;   /* 최상위 배경 (거의 블랙) */
  --bg-card:    #1a1d27;   /* 카드/패널 배경 */
  --bg-surface: #22263a;   /* 입력/선택지 배경 */
  --bg-hover:   #2c3150;   /* 호버 상태 */

  /* 포인트 컬러 */
  --red-primary:  #e63946;  /* 포켓볼 레드 (CTA, 강조) */
  --red-light:    #ff6b74;  /* 레드 hover/shimmer */
  --yellow-acc:   #ffd166;  /* 전기 타입 옐로우 (보조 강조) */
  --blue-acc:     #4cc9f0;  /* 물 타입 블루 (링크, 스탯바) */

  /* 텍스트 */
  --text-primary:   #f0f2ff;
  --text-secondary: #8892b0;
  --text-muted:     #4a5270;

  /* 타입별 컬러 (badge용) */
  --type-fire:    #ff6b35;
  --type-water:   #4cc9f0;
  --type-grass:   #52b788;
  --type-electric:#ffd166;
  --type-psychic: #c77dff;
  --type-ice:     #90e0ef;
  --type-dragon:  #7b2d8b;
  --type-dark:    #6b705c;
  --type-normal:  #adb5bd;
  --type-fighting:#e07a5f;
  --type-poison:  #9b5de5;
  --type-ground:  #c9a84c;
  --type-flying:  #8ecae6;
  --type-bug:     #95d5b2;
  --type-rock:    #9c6b30;
  --type-ghost:   #4a4e69;
  --type-steel:   #748cab;
  --type-fairy:   #f7a8c4;
}
```

---

## 타이포그래피

```css
/* 타이틀 / 포켓몬 이름 */
font-family: 'Press Start 2P', cursive;
/* CDN: https://fonts.googleapis.com/css2?family=Press+Start+2P */

/* 질문 본문 / UI 텍스트 */
font-family: 'Noto Sans KR', sans-serif;
/* CDN: https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700 */

/* 설명 / 플레이버 텍스트 */
font-family: 'Noto Serif KR', serif;
/* CDN: https://fonts.googleapis.com/css2?family=Noto+Serif+KR */
```

### 폰트 사이즈 스케일

| 역할          | 크기       |
|---------------|------------|
| 메인 타이틀   | 1.8rem     |
| 포켓몬 이름   | 1.2rem     |
| 질문 텍스트   | 1.1rem     |
| 선택지 텍스트 | 0.95rem    |
| 설명 / 플레이버| 0.9rem    |
| 뱃지 / 라벨  | 0.75rem    |

---

## 레이아웃

### 전체 구조

```
body (--bg-deep, 100vh 기준 세로 중앙정렬)
│
├── .app-header         (상단 타이틀 바)
│   └── Press Start 2P 폰트로 "Pokémon 성향 테스트"
│
├── .progress-bar       (현재 질문 진행도 — 얇은 레드 바)
│
├── .card               (메인 콘텐츠 카드 — max-width: 560px, 중앙)
│   ├── [질문 화면]
│   │   ├── .question-number  (Q.01 / 10)
│   │   ├── .question-text
│   │   └── .options-grid     (2열 그리드, 각 선택지 카드)
│   │
│   └── [결과 화면]
│       ├── .result-pokemon-img   (공식 아트워크, 최대 240px)
│       ├── .pokemon-name         (한국어 + 영어)
│       ├── .type-badges          (타입 뱃지들)
│       ├── .flavor-text          (도감 설명)
│       ├── .stat-chart           (SVG 막대 그래프)
│       ├── .personality-desc     (성향 설명 문단)
│       ├── .moves-recommend      (어울리는 기술 3개)
│       └── .retry-btn
│
└── .footer             (PokeAPI 크레딧)
```

### 카드 스타일

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--bg-hover);
  border-radius: 20px;
  padding: 40px 36px;
  box-shadow:
    0 0 0 1px rgba(230,57,70,0.08),
    0 20px 60px rgba(0,0,0,0.5),
    0 0 80px rgba(230,57,70,0.04);
}
```

---

## 컴포넌트 스펙

### 선택지 카드 (`.option-card`)

```css
.option-card {
  background: var(--bg-surface);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.option-card:hover {
  border-color: var(--red-primary);
  background: var(--bg-hover);
  transform: translateY(-2px);
}
.option-card.selected {
  border-color: var(--red-primary);
  background: rgba(230,57,70,0.12);
}
```

### 타입 뱃지 (`.type-badge`)

```css
.type-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: var(--type-{typename});
  color: #0d0f14;
}
```

### 스탯 바 그래프

- SVG 또는 CSS `width` 애니메이션
- 각 스탯바는 `--blue-acc` 그라디언트
- 최댓값 기준(255) 퍼센트 계산
- 바 채워지는 애니메이션: `animation: fillBar 0.8s ease-out forwards`
- 스탯 이름 왼쪽 고정 너비 70px, 숫자 오른쪽 정렬

### 진행 바 (`.progress-bar`)

```css
.progress-bar-fill {
  height: 3px;
  background: linear-gradient(90deg, var(--red-primary), var(--red-light));
  transition: width 0.4s ease;
  box-shadow: 0 0 8px var(--red-primary);
}
```

---

## 애니메이션

| 요소              | 효과                                              |
|-------------------|---------------------------------------------------|
| 질문 전환         | `fadeSlideIn` — opacity 0→1, translateY(16px→0)  |
| 결과 포켓몬 이미지| `popIn` — scale(0.8→1) + opacity, 0.5s spring    |
| 스탯 바 채워짐    | `fillBar` — width 0→실제값, 0.8s ease-out (stagger)|
| 선택지 hover      | translateY(-2px), border glow                     |
| 로딩 스피너       | 포켓볼 SVG 회전 (360deg, 1s infinite linear)      |

### 핵심 keyframes

```css
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.75); }
  70%  { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes fillBar {
  from { width: 0; }
  to   { width: var(--target-width); }
}

@keyframes pokeball-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

---

## 반응형

```css
/* 기본: 560px 카드 */
/* 태블릿 이하 */
@media (max-width: 640px) {
  .card { padding: 24px 20px; border-radius: 0; }
  .options-grid { grid-template-columns: 1fr; }
  .result-pokemon-img { max-width: 180px; }
}
```

---

## 배경 텍스처

```css
body::before {
  content: '';
  position: fixed; inset: 0;
  background-image:
    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(230,57,70,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 60%, rgba(76,201,240,0.04) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}
```
