const steps = [
  {
    title: "下垫面",
    keyword: "下垫面性质",
    summary: "城市中心以沥青、混凝土和高密度建筑为主，蒸散弱、储热多、长波辐射散失受阻；郊区绿地、水体和农田的蒸散、热容量和通风条件不同。",
    points: [
      "比较硬化面、绿地、水体在反照率、热容量、蒸散和粗糙度上的差异。",
      "把建筑密度与天空视域减小、通风受阻、热量积累联系起来。",
      "易错辨析：地表温度和距地约 2 米的空气温度不同，遥感热图不能直接等同于人体感受到的气温。"
    ],
    metricPrimary: "硬化面比例高",
    metricSecondary: "蒸散、储热、长波辐射与通风"
  },
  {
    title: "升温",
    keyword: "吸热与蓄热",
    summary: "白天太阳辐射进入城市后，暗色硬化地面和建筑外墙吸收较多能量；建筑材料储热、蒸散减弱，机动车、空调和工业活动还会释放人为热。",
    points: [
      "低反照率表面吸收短波辐射，部分转化为感热并加热近地面空气。",
      "建筑材料热容量大，街谷结构又削弱长波辐射散失，热量不容易迅速释放到外部。"
    ],
    metricPrimary: "城区升温速度快",
    metricSecondary: "太阳辐射 + 储热 + 人为热"
  },
  {
    title: "热岛环流",
    keyword: "城市热低压",
    summary: "城区空气受热上升，近地面可形成浅层相对低压；郊区较冷空气从两侧补偿进入，构成局地热岛环流。",
    points: [
      "弱背景风条件下，近地面风可从郊区吹向城市中心。",
      "上空空气向外扩散，形成局地闭合环流；强风天气下该环流会被削弱。"
    ],
    metricPrimary: "暖空气在城区上升",
    metricSecondary: "热力差异驱动浅层局地风"
  },
  {
    title: "污染扩散",
    keyword: "污染物抬升",
    summary: "热岛环流可把地面附近的颗粒物和废气抬升，并在城市上空形成污染羽；若背景风弱或出现逆温，污染更容易滞留。",
    points: [
      "污染源集中在交通、工业和生活能源使用区。",
      "上升气流改变污染物的垂直分布，但能否扩散还取决于风速、边界层高度和大气稳定度。"
    ],
    metricPrimary: "污染羽流向上伸展",
    metricSecondary: "扩散条件受风速和层结影响"
  },
  {
    title: "绿地水体",
    keyword: "蒸散降温",
    summary: "绿地通过遮阴和蒸腾消耗热量，水体因比热容较大而白天升温较慢；两者能在城市内部形成较凉的斑块，但夜间水体也可能缓慢放热。",
    points: [
      "公园、水系和湿地可削弱局地热量积累。",
      "蓝绿空间连通后，降温影响范围更大。"
    ],
    metricPrimary: "局地气温下降",
    metricSecondary: "遮阴、蒸散和水体调节"
  },
  {
    title: "夜间差异",
    keyword: "夜间热岛",
    summary: "夜晚没有太阳短波辐射输入，但城市建筑和路面持续释放白天储存的热量，街谷长波辐射散失受阻，因此夜间城市热岛往往更明显。",
    points: [
      "郊区地表降温快，城区硬化面降温慢。",
      "夜间温差常比白天更突出。",
      "边界条件：晴朗、少云、风弱的夜晚热岛强度更容易突出，强风或降雨会削弱热岛。"
    ],
    metricPrimary: "示意温差：城区 31°C，郊区 27°C",
    metricSecondary: "储热释放 + 长波散失受阻"
  },
  {
    title: "治理",
    keyword: "缓解措施",
    summary: "治理城市热岛需要提高蓝绿空间比例，改善通风廊道，使用高反照率或高辐射冷却材料、透水铺装，并减少交通与建筑能耗。",
    points: [
      "增加绿地、水体和屋顶绿化，提升蒸散降温能力。",
      "保护通风廊道，降低人为热排放，改善城市微气候。",
      "治理评估：降温措施要同时考虑白天遮阴、夜间散热、用水需求和维护成本。"
    ],
    metricPrimary: "热岛强度被削弱",
    metricSecondary: "蓝绿空间 + 通风 + 节能材料"
  }
];

const svg = document.querySelector("#heatIslandSvg");
const playPause = document.querySelector("#playPause");
const playIcon = document.querySelector("#playIcon");
const resetBtn = document.querySelector("#resetBtn");
const progressRange = document.querySelector("#progressRange");
const progressText = document.querySelector("#progressText");
const stepKicker = document.querySelector("#stepKicker");
const stepBadge = document.querySelector("#stepBadge");
const keywordBadge = document.querySelector("#keywordBadge");
const stepTitle = document.querySelector("#stepTitle");
const stepSummary = document.querySelector("#stepSummary");
const conceptList = document.querySelector("#conceptList");
const metricPrimary = document.querySelector("#metricPrimary");
const metricSecondary = document.querySelector("#metricSecondary");
const exportBtn = document.querySelector("#exportSvg");
const exportStatus = document.querySelector("#exportStatus");
const stepButtons = Array.from(document.querySelectorAll("[data-step]"));

let currentStep = 0;
let timer = null;

function setStep(nextStep) {
  currentStep = Math.max(0, Math.min(steps.length - 1, Number(nextStep)));
  const data = steps[currentStep];

  svg.classList.remove(...steps.map((_, index) => `step-${index}`));
  svg.classList.add(`step-${currentStep}`);

  progressRange.value = String(currentStep);
  progressText.textContent = `${currentStep + 1}/7`;
  stepKicker.textContent = `步骤 ${currentStep + 1} / 7 · ${data.title}`;
  stepBadge.textContent = `步骤 ${currentStep + 1} / 7`;
  keywordBadge.textContent = data.keyword;
  stepTitle.textContent = data.title;
  stepSummary.textContent = data.summary;
  metricPrimary.textContent = data.metricPrimary;
  metricSecondary.textContent = data.metricSecondary;

  conceptList.replaceChildren(
    ...data.points.map((point) => {
      const item = document.createElement("li");
      item.textContent = point;
      return item;
    })
  );

  stepButtons.forEach((button) => {
    const isActive = Number(button.dataset.step) === currentStep;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "step" : "false");
  });
}

function setPlaying(isPlaying) {
  if (isPlaying) {
    if (timer) return;
    svg.classList.add("is-playing");
    playIcon.textContent = "⏸";
    playPause.setAttribute("aria-label", "暂停");
    playPause.setAttribute("title", "暂停");
    timer = window.setInterval(() => {
      const nextStep = currentStep >= steps.length - 1 ? 0 : currentStep + 1;
      setStep(nextStep);
    }, 2300);
    return;
  }

  window.clearInterval(timer);
  timer = null;
  svg.classList.remove("is-playing");
  playIcon.textContent = "▶";
  playPause.setAttribute("aria-label", "播放");
  playPause.setAttribute("title", "播放");
}

function exportCurrentSvg() {
  const clone = svg.cloneNode(true);
  clone.classList.remove("is-playing");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "1280");
  clone.setAttribute("height", "820");

  const serialized = `<?xml version="1.0" encoding="UTF-8"?>\n${clone.outerHTML}`;
  const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `城市热岛效应模型-步骤${currentStep + 1}-${steps[currentStep].title}.svg`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  exportStatus.textContent = `已导出：步骤 ${currentStep + 1} · ${steps[currentStep].title}`;
  window.setTimeout(() => {
    exportStatus.textContent = "";
  }, 2600);
}

playPause.addEventListener("click", () => {
  setPlaying(!timer);
});

resetBtn.addEventListener("click", () => {
  setPlaying(false);
  setStep(0);
});

progressRange.addEventListener("input", (event) => {
  setPlaying(false);
  setStep(event.target.value);
});

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPlaying(false);
    setStep(button.dataset.step);
  });
});

exportBtn.addEventListener("click", exportCurrentSvg);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    setPlaying(false);
    setStep(currentStep + 1);
  }
  if (event.key === "ArrowLeft") {
    setPlaying(false);
    setStep(currentStep - 1);
  }
  if (event.key === " " && event.target === document.body) {
    event.preventDefault();
    setPlaying(!timer);
  }
});

setStep(0);
