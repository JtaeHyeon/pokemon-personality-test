console.log("result.js 로드 확인");

// ============================================
// 한국어 이름 추출
// ============================================
function getKoName(namesArr) {
  const found = namesArr.find((n) => n.language.name === "ko");
  return found ? found.name : null;
}

// ============================================
// 한국어 도감 설명 추출
// ============================================
function getKoFlavorText(entries) {
  const koEntries = entries.filter((e) => e.language.name === "ko");
  if (koEntries.length === 0) return "도감 설명이 없습니다.";
  const last = koEntries[koEntries.length - 1];
  return last.flavor_text.replace(/[\f\n\r]/g, " ").trim();
}

// ============================================
// 한국어 기술 이름 + 설명 조회
// ============================================
async function getMoveKoData(moveUrl) {
  try {
    const res = await axios.get(moveUrl);
    const koName = getKoName(res.data.names) || res.data.name;
    const koFlavor = res.data.flavor_text_entries.find(
      (e) => e.language.name === "ko",
    );
    const desc = koFlavor
      ? koFlavor.flavor_text.replace(/[\f\n\r]/g, " ").trim()
      : "설명이 없습니다.";
    return { name: koName, desc };
  } catch (err) {
    console.warn("기술 데이터 로드 실패", moveUrl, err);
    return { name: "?", desc: "설명을 불러오지 못했습니다." };
  }
}

// ============================================
// 랜덤 N개 추출
// ============================================
function pickRandom(arr, n) {
  const copy = [...arr];
  const result = [];
  while (result.length < n && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

// ============================================
// 스탯 한국어 라벨
// ============================================
const STAT_LABEL = {
  hp: "HP",
  attack: "공격",
  defense: "방어",
  "special-attack": "특수공격",
  "special-defense": "특수방어",
  speed: "스피드",
};

// ============================================
// 결과 렌더링
// ============================================
async function renderResult(pokeData, speciesData, poolEntry, container) {
  console.log("renderResult 시작", pokeData.name);

  const koName = getKoName(speciesData.names) || pokeData.name;
  const imgUrl =
    pokeData.sprites.other?.["official-artwork"]?.front_default ||
    pokeData.sprites.front_default;
  const flavor = getKoFlavorText(speciesData.flavor_text_entries);
  const types = pokeData.types.map((t) => t.type.name);

  // 스탯 HTML
  const statsHtml = pokeData.stats
    .map((s, idx) => {
      const pct = Math.min(100, Math.round((s.base_stat / 255) * 100));
      const label = STAT_LABEL[s.stat.name] || s.stat.name;
      return `
        <div class="stat-row">
          <div class="stat-name">${label}</div>
          <div class="stat-bar-bg">
            <div class="stat-bar-fill" style="--target-width:${pct}%; --delay:${idx * 0.1}s;"></div>
          </div>
          <div class="stat-value">${s.base_stat}</div>
        </div>
      `;
    })
    .join("");

  // 타입 뱃지
  const typeBadgesHtml = types
    .map((t) => `<span class="type-badge" data-type="${t}">${t}</span>`)
    .join("");

  // 일단 결과 뼈대를 그려놓고 기술은 비동기로 채움
  container.innerHTML = `
    <div class="result-screen" aria-live="polite">
      <img class="result-pokemon-img" src="${imgUrl}" alt="${koName}" />
      <div class="pokemon-name">
        <span class="ko">${koName}</span>
        <span class="en">${pokeData.name} · No.${pokeData.id}</span>
      </div>
      <div class="type-badges">${typeBadgesHtml}</div>
      <p class="personality-desc">${poolEntry.desc}</p>
      <p class="flavor-text">${flavor}</p>

      <div class="stat-chart">
        <h4>능력치</h4>
        ${statsHtml}
      </div>

      <div class="moves-recommend">
        <h4>어울리는 기술</h4>
        <div id="moveList">
          <div class="move-card"><div class="move-desc">기술 정보를 불러오는 중...</div></div>
        </div>
      </div>

      <div class="action-row">
        <button class="btn btn-secondary" id="shareBtn">결과 공유</button>
        <button class="btn btn-primary" id="retryBtn">다시하기</button>
      </div>
    </div>
  `;

  // 기술 비동기 로드
  try {
    const pickedMoves = pickRandom(pokeData.moves, 3);
    console.log("선택된 기술 3개", pickedMoves.map((m) => m.move.name));
    const moveDataArr = await Promise.all(
      pickedMoves.map((m) => getMoveKoData(m.move.url)),
    );
    const moveList = document.querySelector("#moveList");
    moveList.innerHTML = moveDataArr
      .map(
        (m) => `
        <div class="move-card">
          <div class="move-name">${m.name}</div>
          <div class="move-desc">${m.desc}</div>
        </div>
      `,
      )
      .join("");
  } catch (err) {
    console.error("기술 렌더 실패", err);
  }

  // 다시하기 / 공유 버튼 이벤트
  document.querySelector("#retryBtn").addEventListener("click", retryHandler);
  document.querySelector("#shareBtn").addEventListener("click", shareHandler);
}

// ============================================
// 공유 버튼: 클립보드 복사
// ============================================
async function shareHandler() {
  console.log("shareHandler 실행");
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("결과 링크가 복사되었습니다!");
  } catch (err) {
    console.warn("클립보드 복사 실패", err);
    showToast("복사에 실패했습니다.");
  }
}

// ============================================
// 토스트 알림
// ============================================
function showToast(msg) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 2200);
}
