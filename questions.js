console.log("questions.js 로드 확인");

// ============================================
// 질문 데이터 (10개, 각 4지선다)
// ============================================
const QUESTIONS = [
  {
    q: "주말 오전, 당신의 이상적인 시간은?",
    options: [
      { text: "야외에서 활발하게 움직인다", tags: ["active", "physical", "energetic"] },
      { text: "혼자 조용히 책을 읽거나 생각한다", tags: ["calm", "special", "wise"] },
      { text: "친구들과 수다를 떨며 논다", tags: ["social", "balanced", "cheerful"] },
      { text: "아무것도 안 하고 집에서 쉰다", tags: ["defensive", "calm", "endurance"] },
    ],
  },
  {
    q: "갑자기 길에서 낯선 사람이 도움을 요청한다면?",
    options: [
      { text: "망설임 없이 바로 돕는다", tags: ["fighting", "physical", "brave"] },
      { text: "상황을 파악하고 신중하게 행동한다", tags: ["wise", "special", "psychic"] },
      { text: "도움은 주지만 거리는 유지한다", tags: ["calm", "defensive", "ghost"] },
      { text: "못 본 척 빠르게 지나친다", tags: ["speed", "evasive", "dark"] },
    ],
  },
  {
    q: "나는 스트레스를 받으면 어떻게 반응하는가?",
    options: [
      { text: "운동이나 신체 활동으로 푼다", tags: ["physical", "active", "fire"] },
      { text: "음악을 듣거나 혼자만의 시간을 갖는다", tags: ["calm", "psychic", "ice"] },
      { text: "친구에게 털어놓고 공감을 받는다", tags: ["social", "fairy", "water"] },
      { text: "그냥 참고 버틴다", tags: ["defensive", "endurance", "steel"] },
    ],
  },
  {
    q: "내가 가장 중요하게 여기는 가치는?",
    options: [
      { text: "자유 — 아무것도 나를 구속하지 않기를 바란다", tags: ["speed", "flying", "evasive"] },
      { text: "정의 — 옳고 그름이 분명해야 한다", tags: ["fighting", "physical", "brave"] },
      { text: "조화 — 모두가 사이좋게 지내는 것이 최고다", tags: ["fairy", "social", "water"] },
      { text: "지식 — 끊임없이 배우고 성장하고 싶다", tags: ["wise", "special", "psychic"] },
    ],
  },
  {
    q: "친구들이 나를 한 마디로 표현한다면?",
    options: [
      { text: '"에너지 넘쳐"', tags: ["energetic", "active", "fire"] },
      { text: '"의외로 차분해"', tags: ["calm", "ice", "defensive"] },
      { text: '"눈치가 빨라"', tags: ["speed", "wise", "dark"] },
      { text: '"믿음직해"', tags: ["endurance", "steel", "defensive"] },
    ],
  },
  {
    q: "나는 어떤 환경에서 가장 집중이 잘 되는가?",
    options: [
      { text: "탁 트인 야외나 햇빛이 드는 곳", tags: ["fire", "active", "flying"] },
      { text: "조용하고 서늘한 실내", tags: ["ice", "calm", "psychic"] },
      { text: "사람이 많고 활기찬 카페", tags: ["social", "water", "cheerful"] },
      { text: "깊고 고요한 밤", tags: ["ghost", "dark", "wise"] },
    ],
  },
  {
    q: "갑작스러운 변화가 생겼을 때 나는?",
    options: [
      { text: "빠르게 적응하고 앞으로 나아간다", tags: ["speed", "active", "energetic"] },
      { text: "상황을 분석하고 최선책을 찾는다", tags: ["wise", "special", "psychic"] },
      { text: "주변 사람들과 함께 해결한다", tags: ["social", "fairy", "balanced"] },
      { text: "감정을 추스르는 데 시간이 걸린다", tags: ["defensive", "endurance", "calm"] },
    ],
  },
  {
    q: "나는 어떤 종류의 영화를 좋아하는가?",
    options: [
      { text: "액션 — 손에 땀을 쥐는 장면들", tags: ["physical", "fire", "fighting"] },
      { text: "미스터리/스릴러 — 숨겨진 진실", tags: ["dark", "ghost", "wise"] },
      { text: "로맨스/드라마 — 감동적인 이야기", tags: ["fairy", "social", "water"] },
      { text: "SF/판타지 — 새로운 세계관", tags: ["psychic", "special", "flying"] },
    ],
  },
  {
    q: "나의 행동 패턴에 가깝다고 느끼는 것은?",
    options: [
      { text: "먼저 행동하고 나중에 생각한다", tags: ["physical", "energetic", "brave"] },
      { text: "오래 고민하고 신중하게 결정한다", tags: ["wise", "defensive", "calm"] },
      { text: "직감을 많이 따른다", tags: ["psychic", "speed", "evasive"] },
      { text: "경험을 토대로 움직인다", tags: ["endurance", "steel", "balanced"] },
    ],
  },
  {
    q: "내가 포켓몬이라면 가장 원하는 능력은?",
    options: [
      { text: "엄청난 힘과 체력", tags: ["physical", "endurance", "fighting"] },
      { text: "빛의 속도로 움직이는 스피드", tags: ["speed", "evasive", "electric"] },
      { text: "마음을 꿰뚫는 직관과 지혜", tags: ["psychic", "wise", "special"] },
      { text: "어떤 상황도 버티는 단단함", tags: ["defensive", "steel", "calm"] },
    ],
  },
];

// ============================================
// 후보 포켓몬 풀 (성향 태그 + 성향 설명)
// ============================================
const POKEMON_POOL = [
  { name: "charizard", id: 6, tags: ["fire", "active", "energetic", "brave"], desc: "당신은 리자몽처럼 뜨거운 열정과 강한 추진력을 가졌습니다. 한번 결정한 일은 끝까지 밀어붙이는 카리스마가 있어요." },
  { name: "blastoise", id: 9, tags: ["water", "defensive", "endurance", "calm"], desc: "당신은 거북왕처럼 침착하고 듬직한 사람입니다. 위기 상황에서도 흔들리지 않는 단단한 멘탈이 강점이에요." },
  { name: "venusaur", id: 3, tags: ["grass", "balanced", "social", "endurance"], desc: "당신은 이상해꽃처럼 안정적이고 균형 잡힌 사람입니다. 주변을 따뜻하게 감싸는 포용력이 있어요." },
  { name: "pikachu", id: 25, tags: ["electric", "energetic", "social", "speed"], desc: "당신은 피카츄처럼 밝고 활기차며 어디서든 사랑받는 매력의 소유자입니다." },
  { name: "jigglypuff", id: 39, tags: ["fairy", "social", "cheerful", "calm"], desc: "당신은 푸린처럼 부드럽고 따뜻한 분위기로 사람들을 편안하게 만드는 사람입니다." },
  { name: "mewtwo", id: 150, tags: ["psychic", "wise", "special", "evasive"], desc: "당신은 뮤츠처럼 깊이 사고하며 본질을 꿰뚫어 보는 통찰력을 가졌습니다." },
  { name: "gengar", id: 94, tags: ["ghost", "dark", "evasive", "wise"], desc: "당신은 팬텀처럼 신비롭고 자유로운 영혼입니다. 자신만의 독특한 관점으로 세상을 봐요." },
  { name: "machamp", id: 68, tags: ["fighting", "physical", "brave", "endurance"], desc: "당신은 괴력몬처럼 강인하고 정의로운 사람입니다. 약자를 돕는 데 망설임이 없어요." },
  { name: "alakazam", id: 65, tags: ["psychic", "wise", "special", "speed"], desc: "당신은 후딘처럼 명석한 두뇌와 빠른 판단력을 갖춘 사람입니다." },
  { name: "snorlax", id: 143, tags: ["defensive", "endurance", "calm", "physical"], desc: "당신은 잠만보처럼 여유롭고 묵직한 존재감을 지녔습니다. 흔들리지 않는 자기만의 페이스가 매력이에요." },
  { name: "dragonite", id: 149, tags: ["flying", "balanced", "brave", "energetic"], desc: "당신은 망나뇽처럼 강인하지만 따뜻한 마음을 가진 듬직한 사람입니다." },
  { name: "eevee", id: 133, tags: ["balanced", "social", "calm", "cheerful"], desc: "당신은 이브이처럼 무한한 가능성을 가진 사람입니다. 어떤 환경에서도 자신을 새롭게 발견해요." },
  { name: "vaporeon", id: 134, tags: ["water", "calm", "endurance", "social"], desc: "당신은 샤미드처럼 유연하고 부드러우며 어떤 상황에도 자연스럽게 녹아드는 사람입니다." },
  { name: "jolteon", id: 135, tags: ["electric", "speed", "energetic", "evasive"], desc: "당신은 쥬피썬더처럼 번개같이 빠른 감각과 민첩함을 자랑하는 사람입니다." },
  { name: "flareon", id: 136, tags: ["fire", "physical", "brave", "active"], desc: "당신은 부스터처럼 뜨겁게 타오르는 열정과 추진력을 지닌 사람입니다." },
  { name: "espeon", id: 196, tags: ["psychic", "wise", "special", "calm"], desc: "당신은 에브이처럼 우아하고 직관이 뛰어난 사람입니다. 마음의 흐름을 잘 읽어내요." },
  { name: "umbreon", id: 197, tags: ["dark", "defensive", "endurance", "calm"], desc: "당신은 블래키처럼 신중하고 깊이 있는 사람입니다. 조용하지만 강한 신뢰감을 줍니다." },
  { name: "lapras", id: 131, tags: ["water", "ice", "calm", "social"], desc: "당신은 라프라스처럼 평화롭고 따뜻한 마음으로 주변을 보살피는 사람입니다." },
  { name: "scyther", id: 123, tags: ["physical", "speed", "active", "brave"], desc: "당신은 스라크처럼 날카로운 감각과 빠른 결단력을 가진 사람입니다." },
  { name: "hitmonlee", id: 106, tags: ["fighting", "physical", "speed", "active"], desc: "당신은 시라소몬처럼 민첩하고 도전적인 에너지로 가득 차 있습니다." },
  { name: "hitmonchan", id: 107, tags: ["fighting", "physical", "endurance", "brave"], desc: "당신은 홍수몬처럼 끈기 있고 정직한 노력파입니다." },
  { name: "slowbro", id: 80, tags: ["psychic", "calm", "defensive", "wise"], desc: "당신은 야도란처럼 느긋하지만 깊은 사색가입니다. 서두르지 않는 지혜로움이 매력이에요." },
  { name: "haunter", id: 93, tags: ["ghost", "evasive", "dark", "special"], desc: "당신은 고우스트처럼 자유롭고 장난기 많은 영혼입니다. 평범함을 거부해요." },
  { name: "raichu", id: 26, tags: ["electric", "energetic", "speed", "cheerful"], desc: "당신은 라이츄처럼 강력한 에너지와 밝은 매력으로 분위기를 이끄는 사람입니다." },
  { name: "articuno", id: 144, tags: ["ice", "calm", "wise", "flying"], desc: "당신은 프리저처럼 고고하고 우아한 분위기를 지닌 신비로운 사람입니다." },
  { name: "zapdos", id: 145, tags: ["electric", "flying", "energetic", "brave"], desc: "당신은 썬더처럼 강렬하고 자유로운 영혼입니다. 한계를 두려워하지 않아요." },
  { name: "moltres", id: 146, tags: ["fire", "flying", "energetic", "active"], desc: "당신은 파이어처럼 화려하고 정열적인 카리스마를 가진 사람입니다." },
  { name: "absol", id: 359, tags: ["dark", "wise", "evasive", "brave"], desc: "당신은 앱솔처럼 직관이 뛰어나고 위험을 미리 감지하는 예리한 감각의 소유자입니다." },
  { name: "gardevoir", id: 282, tags: ["psychic", "fairy", "wise", "social"], desc: "당신은 가디안처럼 우아하고 헌신적이며 소중한 사람을 끝까지 지키는 사람입니다." },
  { name: "lucario", id: 448, tags: ["fighting", "psychic", "brave", "wise"], desc: "당신은 루카리오처럼 강한 신념과 뛰어난 직관을 모두 갖춘 균형 잡힌 사람입니다." },
  { name: "glaceon", id: 471, tags: ["ice", "calm", "defensive", "special"], desc: "당신은 글레이시아처럼 차분하고 신비로운 분위기로 사람들을 매료시키는 사람입니다." },
  { name: "leafeon", id: 470, tags: ["grass", "active", "balanced", "calm"], desc: "당신은 리피아처럼 자연스럽고 평온하며 주변에 청량함을 주는 사람입니다." },
  { name: "togekiss", id: 468, tags: ["fairy", "flying", "social", "cheerful"], desc: "당신은 토게키스처럼 행운과 따뜻함을 주변에 전하는 사랑스러운 사람입니다." },
  { name: "garchomp", id: 445, tags: ["physical", "speed", "brave", "active"], desc: "당신은 한카리아스처럼 강력한 추진력과 빠른 결단력으로 목표를 이뤄내는 사람입니다." },
  { name: "typhlosion", id: 157, tags: ["fire", "energetic", "active", "speed"], desc: "당신은 블레이범처럼 폭발적인 에너지와 민첩함을 동시에 갖춘 사람입니다." },
  { name: "feraligatr", id: 160, tags: ["water", "physical", "brave", "endurance"], desc: "당신은 장크로다일처럼 강인하고 거침없으며 자신의 길을 개척하는 사람입니다." },
  { name: "meganium", id: 154, tags: ["grass", "calm", "social", "balanced"], desc: "당신은 메가니움처럼 따뜻하고 부드러우며 주변에 평화를 가져오는 사람입니다." },
  { name: "ampharos", id: 181, tags: ["electric", "special", "calm", "balanced"], desc: "당신은 전룡처럼 부드러운 외면 안에 강한 에너지를 품은 사람입니다." },
  { name: "heracross", id: 214, tags: ["fighting", "active", "endurance", "brave"], desc: "당신은 헤라크로스처럼 우직하고 성실하며 자신의 길을 묵묵히 가는 사람입니다." },
  { name: "sceptile", id: 254, tags: ["grass", "speed", "active", "wise"], desc: "당신은 나무킹처럼 빠르고 영리하며 자신의 영역을 지키는 데 능숙한 사람입니다." },
];

// ============================================
// 점수 계산: 누적 태그 빈도
// ============================================
function calculateScores(answers) {
  console.log("calculateScores 시작", answers);
  const scores = {};
  answers.forEach((tagList) => {
    tagList.forEach((tag) => {
      scores[tag] = (scores[tag] || 0) + 1;
    });
  });
  console.log("점수 집계 결과", scores);
  return scores;
}

// ============================================
// 상위 N개 태그 추출
// ============================================
function getTopTags(scores, n = 3) {
  const top = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([tag]) => tag);
  console.log("상위 태그", top);
  return top;
}

// ============================================
// 포켓몬 매칭: POKEMON_POOL과 교집합 점수 비교
// ============================================
function matchPokemon(scores) {
  console.log("matchPokemon 시작");
  let bestMatch = null;
  let bestScore = -1;

  POKEMON_POOL.forEach((poke) => {
    let score = 0;
    poke.tags.forEach((tag) => {
      if (scores[tag]) score += scores[tag];
    });
    if (score > bestScore) {
      bestScore = score;
      bestMatch = poke;
    }
  });

  console.log("매칭된 포켓몬", bestMatch, "점수", bestScore);
  return bestMatch;
}
