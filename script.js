console.log("script.js 로드 확인");

// ============================================
// 전역 상태
// ============================================
const state = {
  answers: [],
  scores: {},
  currentQ: 0,
};

// ============================================
// DOM 참조
// ============================================
const cardEl = document.querySelector("#card");
const progressFill = document.querySelector("#progressFill");

// ============================================
// 앱 초기화 - 시작 화면 표시
// ============================================
function initApp() {
  console.log("initApp 시작");
  renderStart();
}

// ============================================
// 시작 화면
// ============================================
function renderStart() {
  console.log("renderStart");
  updateProgress(0);
  cardEl.innerHTML = `
    <div class="start-screen">
      ${pokeballSvg(80)}
      <p class="intro">
        10개의 질문에 답하면,<br />
        당신의 성향과 가장 닮은 포켓몬을 찾아드립니다.
      </p>
      <button class="btn btn-primary" id="startBtn" style="max-width:240px;">테스트 시작하기</button>
    </div>
  `;
  document.querySelector("#startBtn").addEventListener("click", startHandler);
}

function startHandler() {
  console.log("startHandler - 테스트 시작");
  state.answers = [];
  state.scores = {};
  state.currentQ = 0;
  renderQuestion();
}

// ============================================
// 질문 렌더링
// ============================================
function renderQuestion() {
  console.log("renderQuestion", state.currentQ);
  const idx = state.currentQ;
  const total = QUESTIONS.length;
  const q = QUESTIONS[idx];

  updateProgress((idx / total) * 100);

  const optionsHtml = q.options
    .map(
      (opt, i) => `
      <button class="option-card" data-idx="${i}" type="button">
        ${opt.text}
      </button>
    `,
    )
    .join("");

  cardEl.innerHTML = `
    <div class="question-screen">
      <div class="question-number">Q.${String(idx + 1).padStart(2, "0")} / ${total}</div>
      <h2 class="question-text">${q.q}</h2>
      <div class="options-grid">${optionsHtml}</div>
    </div>
  `;

  // 이벤트 바인딩
  document.querySelectorAll(".option-card").forEach((btn) => {
    btn.addEventListener("click", optionClickHandler);
  });

  // 키보드 포커스 (Enter 지원)
  const first = cardEl.querySelector(".option-card");
  if (first) first.focus();
}

// ============================================
// 선택 핸들러
// ============================================
function optionClickHandler(event) {
  const idx = Number(event.currentTarget.dataset.idx);
  console.log("optionClickHandler 선택", idx);
  const q = QUESTIONS[state.currentQ];
  const tags = q.options[idx].tags;
  state.answers.push(tags);

  // 시각 피드백
  event.currentTarget.classList.add("selected");

  // 살짝 딜레이 후 다음 질문
  setTimeout(() => {
    state.currentQ++;
    if (state.currentQ >= QUESTIONS.length) {
      finishTest();
    } else {
      renderQuestion();
    }
  }, 220);
}

// ============================================
// 테스트 완료 → 매칭 → API 호출 → 결과
// ============================================
async function finishTest() {
  console.log("finishTest 시작");
  state.scores = calculateScores(state.answers);
  const topTags = getTopTags(state.scores, 3);
  console.log("결과 상위 태그", topTags);
  const matched = matchPokemon(state.scores);

  updateProgress(100);
  showLoading();

  try {
    const { pokeData, speciesData } = await getPokeFullData(matched.name);
    await renderResult(pokeData, speciesData, matched, cardEl);
  } catch (err) {
    console.error("결과 API 호출 실패", err);
    showError();
  }
}

// ============================================
// 로딩 화면
// ============================================
function showLoading() {
  console.log("showLoading");
  cardEl.innerHTML = `
    <div class="loading" aria-live="polite">
      ${pokeballSvg(64, "pokeball-spinner")}
      <p class="loading-text">당신과 닮은 포켓몬을 찾는 중...</p>
    </div>
  `;
}

// ============================================
// 에러 화면
// ============================================
function showError() {
  cardEl.innerHTML = `
    <div class="start-screen">
      <p class="intro">⚠️ 포켓몬 데이터를 불러오지 못했어요.<br />잠시 후 다시 시도해주세요.</p>
      <button class="btn btn-primary" id="retryAllBtn" style="max-width:240px;">처음으로</button>
    </div>
  `;
  document.querySelector("#retryAllBtn").addEventListener("click", retryHandler);
}

// ============================================
// 다시하기 핸들러 (result.js에서도 사용)
// ============================================
function retryHandler() {
  console.log("retryHandler - 상태 초기화");
  state.answers = [];
  state.scores = {};
  state.currentQ = 0;
  renderStart();
}

// ============================================
// 진행 바 업데이트
// ============================================
function updateProgress(pct) {
  progressFill.style.width = `${pct}%`;
}

// ============================================
// API 호출: pokemon + species 동시 조회
// ============================================
async function getPokeFullData(nameOrId) {
  console.log("getPokeFullData", nameOrId);
  try {
    const pokeRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId}`,
    );
    const pokeData = pokeRes.data;
    console.log("pokemon API 응답", pokeData);

    const speciesRes = await axios.get(pokeData.species.url);
    const speciesData = speciesRes.data;
    console.log("species API 응답", speciesData);

    return { pokeData, speciesData };
  } catch (err) {
    console.error("getPokeFullData 실패", err);
    throw err;
  }
}

// ============================================
// 포켓볼 SVG (인라인)
// ============================================
function pokeballSvg(size = 64, extraClass = "pokeball-spinner") {
  return `
    <svg class="${extraClass}" width="${size}" height="${size}" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="pb-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff6b74"/>
          <stop offset="100%" stop-color="#e63946"/>
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#1a1d27" stroke="#0d0f14" stroke-width="2"/>
      <path d="M2,32 A30,30 0 0,1 62,32 Z" fill="url(#pb-top)"/>
      <rect x="2" y="30" width="60" height="4" fill="#0d0f14"/>
      <circle cx="32" cy="32" r="8" fill="#22263a" stroke="#0d0f14" stroke-width="2"/>
      <circle cx="32" cy="32" r="3.5" fill="#f0f2ff"/>
    </svg>
  `;
}

// ============================================
// 부팅
// ============================================
initApp();
