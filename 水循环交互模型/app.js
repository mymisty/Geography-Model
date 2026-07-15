const steps = [
  {
    label: "蒸发",
    title: "蒸发、蒸腾与蒸散",
    badge: "01 / 07",
    stage: "太阳辐射驱动水分进入大气",
    lead: "太阳辐射提供能量，海洋、湖泊和土壤通过蒸发进入大气，植物通过蒸腾释放水汽，二者合称蒸散，是水循环进入大气的重要环节。",
    points: [
      "能量来源：太阳辐射。",
      "水汽来源：海洋蒸发为主，陆地蒸散也很重要。",
      "课堂追问：为什么海洋是大气水汽的主要来源？",
      "易错辨析：蒸发强弱不仅看温度，还受风速、空气湿度和水面面积影响。"
    ],
    prompt: "从海洋表面和植被冠层各找一条上升箭头，比较二者都需要的共同条件。"
  },
  {
    label: "输送",
    title: "水汽输送",
    badge: "02 / 07",
    stage: "风带和季风把水汽带向陆地",
    lead: "水汽进入大气后，会随大气环流、季风和局地风移动，使海陆之间、低纬与高纬之间发生水分交换。",
    points: [
      "主要动力：大气运动。",
      "常见路径：海洋水汽向陆地、山地迎风坡输送。",
      "课堂追问：我国东部夏季降水为什么常与季风有关？"
    ],
    prompt: "沿白色箭头读出水汽移动方向，再联系海陆位置解释降水空间差异。"
  },
  {
    label: "降水",
    title: "降水形成",
    badge: "03 / 07",
    stage: "水汽冷却凝结后回到地表",
    lead: "水汽在上升冷却或遇冷空气时凝结或凝华成云，云滴或冰晶增长后形成雨、雪、冰雹等降水，补给河流、湖泊、土壤和地下水。",
    points: [
      "形成条件：充足水汽、凝结核和冷却过程。",
      "山地迎风坡常因抬升冷却形成较多降水。",
      "课堂追问：降水落到地表后会分成哪些去向？"
    ],
    prompt: "观察降水集中在山地附近，思考地形抬升怎样改变局地水循环。"
  },
  {
    label: "径流",
    title: "地表径流",
    badge: "04 / 07",
    stage: "地表水沿坡面、河道汇入湖海",
    lead: "降水中未被植被截留、蒸发、蒸腾或入渗的部分，会沿地表坡面和河道流动，最终汇入水库、河流、湖泊或海洋。",
    points: [
      "控制因素：地势起伏、降水强度、地表覆盖状况。",
      "城市硬化地表会加快地表径流形成。",
      "课堂追问：暴雨后城市内涝与地表径流有什么关系？",
      "边界条件：地表径流增加不只由坡度决定，暴雨强度超过入渗能力时也会快速产流。"
    ],
    prompt: "顺着蓝色箭头从山坡追到河流和海洋，标出流速可能变快的位置。"
  },
  {
    label: "入渗",
    title: "入渗与地下径流",
    badge: "05 / 07",
    stage: "部分水进入土壤和含水层",
    lead: "一部分降水和地表水会入渗进入土壤孔隙，补给土壤水和地下水，并以地下径流形式缓慢流向河流、湖泊或海洋。",
    points: [
      "入渗强弱受土壤质地、坡度、植被覆盖、前期含水量和地表硬化影响。",
      "地下径流速度慢，但能维持河流枯水期补给。",
      "课堂追问：为什么植被覆盖区更有利于涵养水源？"
    ],
    prompt: "比较棕色入渗箭头和深蓝地下径流箭头，说明地下水补给为什么具有滞后性。"
  },
  {
    label: "人类影响",
    title: "人类活动影响",
    badge: "06 / 07",
    stage: "工程建设和土地利用改变水循环环节",
    lead: "水库、城市硬化和植被变化会改变水循环的时间分配、空间路径与环节强度，是分析洪涝、干旱和水资源调配的重要切入点。",
    points: [
      "水库：调蓄径流，改变下游流量过程。",
      "城市硬化：减少入渗，增加并加快地表径流，抬高洪峰。",
      "植被：截留降水、增加入渗和蒸散，减缓地表径流。"
    ],
    prompt: "切换三个因子，分别判断它们让“入渗、径流、蒸散”增强还是减弱。"
  },
  {
    label: "循环总结",
    title: "水循环整体联系",
    badge: "07 / 07",
    stage: "大气水、地表水、地下水持续转化",
    lead: "水循环把海洋、大气和陆地联系成统一系统，包括海陆间循环、陆地内循环和海上内循环；各环节在能量、地形、植被和人类活动影响下持续转化。",
    points: [
      "核心线索：蒸发和蒸腾进入大气，水汽输送后需冷却凝结或凝华，并在云中增长，才会产生降水。",
      "陆地去向：地表径流、入渗、地下径流、再蒸发和蒸腾。",
      "综合分析：自然因素决定基础过程，人类活动改变局部强度。",
      "水量平衡：流域分析可用降水量 = 蒸散量 + 径流量 + 储水量变化来校验思路。"
    ],
    prompt: "用一句话串联七个步骤，并指出最容易受人类活动影响的两个环节。"
  }
];

const layerIds = [
  "evaporationLayer",
  "transportLayer",
  "precipitationLayer",
  "runoffLayer",
  "infiltrationLayer",
  "humanLayer",
  "summaryLayer"
];

const stepPositions = steps.map((_, index) => Math.round((index / (steps.length - 1)) * 100));

const svg = document.getElementById("waterCycleSvg");
const progressRange = document.getElementById("progressRange");
const progressValue = document.getElementById("progressValue");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const playPauseText = document.getElementById("playPauseText");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");
const stageLabel = document.getElementById("stageLabel");
const stepBadge = document.getElementById("stepBadge");
const infoTitle = document.getElementById("infoTitle");
const infoLead = document.getElementById("infoLead");
const infoPoints = document.getElementById("infoPoints");
const classPrompt = document.getElementById("classPrompt");
const stepButtons = Array.from(document.querySelectorAll(".step-button"));
const layers = layerIds.map((id) => document.getElementById(id));

const toggles = {
  reservoir: document.getElementById("reservoirToggle"),
  city: document.getElementById("cityToggle"),
  vegetation: document.getElementById("vegetationToggle")
};

let progress = 0;
let activeStep = 0;
let playing = false;
let rafId = 0;
let previousFrame = 0;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function stepFromProgress(value) {
  const segment = 100 / (steps.length - 1);
  return clamp(Math.round(value / segment), 0, steps.length - 1);
}

function renderInfo(stepIndex) {
  const step = steps[stepIndex];
  stageLabel.textContent = step.stage;
  stepBadge.textContent = step.badge;
  infoTitle.textContent = step.title;
  infoLead.textContent = step.lead;
  classPrompt.textContent = step.prompt;

  infoPoints.replaceChildren();
  step.points.forEach((point) => {
    const item = document.createElement("li");
    item.textContent = point;
    infoPoints.appendChild(item);
  });
}

function renderLayers(stepIndex) {
  const summaryMode = stepIndex === steps.length - 1;
  svg.classList.toggle("summary-mode", summaryMode);

  layers.forEach((layer, index) => {
    const current = summaryMode ? true : index === stepIndex;
    layer.classList.toggle("is-active", current);
    layer.classList.toggle("is-past", !summaryMode && index < stepIndex);
  });
}

function renderSteps(stepIndex) {
  stepButtons.forEach((button, index) => {
    const selected = index === stepIndex;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-current", selected ? "step" : "false");
  });
}

function renderProgress() {
  progress = clamp(progress, 0, 100);
  activeStep = stepFromProgress(progress);
  progressRange.value = String(Math.round(progress));
  progressValue.value = `${Math.round(progress)}%`;
  progressValue.textContent = `${Math.round(progress)}%`;
  renderInfo(activeStep);
  renderLayers(activeStep);
  renderSteps(activeStep);
}

function setPlaying(nextPlaying) {
  playing = nextPlaying;
  playPauseIcon.classList.toggle("icon-play", !playing);
  playPauseIcon.classList.toggle("icon-pause", playing);
  playPauseText.textContent = playing ? "暂停" : "播放";
  playPauseBtn.setAttribute("aria-label", playing ? "暂停模型" : "播放模型");
  playPauseBtn.setAttribute("title", playing ? "暂停模型" : "播放模型");

  if (playing) {
    if (progress >= 100) {
      progress = 0;
      renderProgress();
    }
    previousFrame = 0;
    rafId = requestAnimationFrame(tick);
  } else {
    cancelAnimationFrame(rafId);
  }
}

function tick(timestamp) {
  if (!playing) {
    return;
  }

  if (!previousFrame) {
    previousFrame = timestamp;
  }

  const delta = timestamp - previousFrame;
  previousFrame = timestamp;
  progress += delta * 0.0072;

  if (progress > 100) {
    progress = 0;
  }

  renderProgress();
  rafId = requestAnimationFrame(tick);
}

function setStep(stepIndex) {
  setPlaying(false);
  progress = stepPositions[stepIndex];
  renderProgress();

  const activeButton = stepButtons[stepIndex];
  activeButton.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
}

function updateImpactClasses() {
  svg.classList.toggle("reservoir-on", toggles.reservoir.checked);
  svg.classList.toggle("city-on", toggles.city.checked);
  svg.classList.toggle("vegetation-on", toggles.vegetation.checked);
}

function getEmbeddedCss() {
  const chunks = [];

  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      Array.from(sheet.cssRules).forEach((rule) => {
        chunks.push(rule.cssText);
      });
    } catch (error) {
      // Local static use keeps this readable; this fallback protects exported SVGs if a browser blocks cssRules.
    }
  });

  return chunks.join("\n");
}

function exportSvg() {
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "1600");
  clone.setAttribute("height", "960");

  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = getEmbeddedCss();
  clone.insertBefore(style, clone.firstChild);

  const source = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `水循环交互模型-步骤${activeStep + 1}.svg`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 800);
}

playPauseBtn.addEventListener("click", () => setPlaying(!playing));

resetBtn.addEventListener("click", () => {
  setPlaying(false);
  progress = 0;
  renderProgress();
});

exportBtn.addEventListener("click", exportSvg);

progressRange.addEventListener("input", (event) => {
  progress = Number(event.target.value);
  renderProgress();
});

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setStep(Number(button.dataset.step));
  });
});

Object.values(toggles).forEach((toggle) => {
  toggle.addEventListener("change", updateImpactClasses);
});

updateImpactClasses();
renderProgress();
