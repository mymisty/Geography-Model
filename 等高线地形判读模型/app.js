const steps = [
  {
    title: "读数：先找等高距",
    lead: "先确认等高距和比例尺，再按“由低到高、由疏到密”的顺序读图。",
    focus: [],
    points: [
      "图中主等高线以 100m 为一组；闭合线若没有洼地示坡线，通常越向内海拔越高。",
      "等高线一般不相交、不分叉；陡崖处可能密集到近似重合。同一条等高线上各点海拔相同。",
      "先读外围低值，再读内部高值，可以避免把山谷和山脊看反。",
      "易错辨析：比较坡度前必须确认比例尺和等高距一致，否则线距不能直接横向比较。"
    ],
    tip: "课堂练习可先让学生用手指沿 100m、200m、300m 逐圈追踪，建立“高度阶梯”的感觉。"
  },
  {
    title: "山顶：闭合等高线中心",
    lead: "山顶通常表现为一组闭合等高线，数值向中心递增；若闭合线内有示坡线，则应判为洼地或盆地。没有高程点时，闭合线中心只能判断高度范围，不能直接读出精确高度。",
    focus: ["summit"],
    points: [
      "主峰中心位于 600m 闭合线内，若无更高等高线或高程点，只能判断其海拔高于 600m、低于下一条可能等高线。",
      "右侧次峰也有闭合等高线，但高度和范围小于主峰。",
      "若图上出现小黑三角或高程点，可用来校正山顶高度。"
    ],
    tip: "判断山顶时，先问“线是不是闭合”，再问“数值是不是向内升高”，最后确认有没有洼地示坡线。"
  },
  {
    title: "山脊山谷：看等高线弯曲方向",
    lead: "山脊和山谷都常呈 V 字形弯曲，关键是判断 V 字尖端指向高处还是低处。",
    focus: ["ridge", "valley", "river"],
    points: [
      "山谷处等高线向高处凸出，水流常沿谷线从高处流向低处。",
      "山脊处等高线向低处凸出，是两侧坡面分水的凸起部位。",
      "图中蓝色河流沿山谷向东南方向流出。",
      "判读边界：河流流向要结合高低值判断，不能只凭蓝色箭头或线条弯曲方向猜测。"
    ],
    tip: "口诀可用“谷线尖指高，脊线尖指低；河流总往低处去”。"
  },
  {
    title: "鞍部：两个山顶之间的低缓处",
    lead: "鞍部位于两个山顶或两个高地之间，像马鞍中部的低陷通道。",
    focus: ["saddle", "summit"],
    points: [
      "图中主峰和次峰之间的淡紫色圈示出鞍部位置。",
      "鞍部两侧通向高处，另外两侧通向较低地带。",
      "道路、山口、分水岭常与鞍部判读有关。"
    ],
    tip: "看见两个闭合高地相邻时，优先检查中间是否存在鞍部。"
  },
  {
    title: "陡崖：等高线密集或重合",
    lead: "等高线越密，单位水平距离内高差越大，坡度越陡；极密集处可判为陡崖。",
    focus: ["cliff", "steep"],
    points: [
      "图左下多条等高线靠得很近，并配有短齿状符号，表示陡崖。",
      "陡崖附近地势突变，不适合普通道路直接穿越。",
      "若等高线在图上重合，应特别注意崖顶和崖底高程范围；陡崖高度只能估算范围，不能只用一条线判断。"
    ],
    tip: "学生容易只看颜色不看线距，讲陡崖时要把“密集程度”作为第一证据。"
  },
  {
    title: "坡度：线密坡陡，线疏坡缓",
    lead: "坡度判读不看单独一条线，而看一组等高线之间的水平间距。",
    focus: ["steep", "gentle", "cliff"],
    points: [
      "左下侧等高线间距小，说明坡度较陡。",
      "右下侧等高线间距大，说明坡度较缓。",
      "同一等高距条件下，线距越密，坡面越陡。"
    ],
    tip: "做剖面图前，先在平面图上圈出最密和最疏的区域，坡形判断会清楚很多。"
  },
  {
    title: "综合判读：把部位连成地形过程",
    lead: "综合题要把海拔、部位、坡度和水系放在同一张图里解释。",
    focus: ["summit", "ridge", "valley", "saddle", "cliff", "steep", "gentle", "river"],
    points: [
      "主峰在西部偏中，次峰在东北侧，两峰之间有鞍部。",
      "东侧山谷汇水形成河流，河流由西北高处流向东南低处。",
      "左下坡陡并出现陡崖，右下坡缓，适合布置较平缓的通行路线。",
      "应用边界：选线、聚落和工程布局还要结合地质稳定性、洪水风险、坡向和水源条件。"
    ],
    tip: "答题时可按“高度读数、地形部位、坡度变化、河流方向、生产生活影响”的顺序组织语言。"
  }
];

const features = {
  summit: {
    type: "地形部位",
    title: "山顶",
    text: "闭合等高线向内数值增大，中心为山顶或高地。本图主峰中心高于 600m，但精确高度需看高程点或下一条等高线。",
    rule: "判读规则：闭合线内高外低为山顶；若有向内短线的洼地示坡线，可能是盆地或洼地。"
  },
  ridge: {
    type: "地形部位",
    title: "山脊",
    text: "山脊是向外伸出的高地，等高线弯曲处通常向低处凸出。",
    rule: "判读规则：脊线多为分水线，水流从山脊两侧分散。"
  },
  valley: {
    type: "地形部位",
    title: "山谷",
    text: "山谷是两侧较高、中间较低的汇水部位，等高线常向高处凸出。",
    rule: "判读规则：谷线往往与河流一致，V 字尖端指向上游高处。"
  },
  saddle: {
    type: "地形部位",
    title: "鞍部",
    text: "鞍部位于两个山顶之间，是相对低缓的过渡地带。",
    rule: "判读规则：两个闭合高地之间，若出现一处低而开阔的连接部位，多为鞍部。"
  },
  cliff: {
    type: "地形部位",
    title: "陡崖",
    text: "陡崖处高差变化突然，等高线会非常密集，甚至在图上接近重合。",
    rule: "判读规则：陡崖高度范围常用崖顶、崖底等高线数值估算。"
  },
  steep: {
    type: "坡度判读",
    title: "坡度陡",
    text: "相同等高距下，等高线间隔越小，坡度越大。",
    rule: "判读规则：线密坡陡，线疏坡缓；先比较同一比例尺、同一等高距区域。"
  },
  gentle: {
    type: "坡度判读",
    title: "坡度缓",
    text: "等高线间隔宽，说明同样高差需要更长水平距离完成，坡面较缓。",
    rule: "应用提示：坡缓处更利于道路、聚落或梯田布局，但仍需结合水源和地质条件。"
  },
  river: {
    type: "水系判读",
    title: "河流流向",
    text: "河流沿山谷由高处流向低处，图中蓝色箭头指向东南侧低地。",
    rule: "判读规则：河流穿过等高线时，等高线 V 字尖端指向上游。"
  }
};

let currentStep = 0;
let selectedFeature = "";
let timer = null;

const playPause = document.getElementById("playPause");
const playText = document.getElementById("playText");
const prevStep = document.getElementById("prevStep");
const nextStep = document.getElementById("nextStep");
const resetModel = document.getElementById("resetModel");
const exportSvgButton = document.getElementById("exportSvg");
const range = document.getElementById("progressRange");
const progressLabel = document.getElementById("progressLabel");
const panelKicker = document.getElementById("panelKicker");
const panelTitle = document.getElementById("panelTitle");
const panelLead = document.getElementById("panelLead");
const panelPoints = document.getElementById("panelPoints");
const classroomTip = document.getElementById("classroomTip");
const featureCard = document.getElementById("featureCard");
const featureType = document.getElementById("featureType");
const featureTitle = document.getElementById("featureTitle");
const featureText = document.getElementById("featureText");
const featureRule = document.getElementById("featureRule");
const contourMap = document.getElementById("contourMap");
const stepChips = Array.from(document.querySelectorAll(".step-chip"));
const terrainFeatures = Array.from(document.querySelectorAll(".terrain-feature"));
const featureTargets = Array.from(document.querySelectorAll(".feature-target"));
const clickableFeatures = [...terrainFeatures, ...featureTargets];

function setStep(step, options = {}) {
  currentStep = Math.max(0, Math.min(steps.length - 1, step));
  if (!options.keepFeature) {
    selectedFeature = "";
  }

  const data = steps[currentStep];
  range.value = String(currentStep);
  progressLabel.value = data.title.split("：")[0];
  progressLabel.textContent = data.title.split("：")[0];
  panelKicker.textContent = `第 ${currentStep + 1} 步 / ${steps.length}`;
  panelTitle.textContent = data.title;
  panelLead.textContent = data.lead;
  classroomTip.textContent = data.tip;
  panelPoints.replaceChildren(
    ...data.points.map((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      return li;
    })
  );

  stepChips.forEach((chip) => {
    chip.classList.toggle("is-active", Number(chip.dataset.step) === currentStep);
  });

  renderFeatureState();
}

function renderFeatureState() {
  const activeFeatures = new Set(steps[currentStep].focus);
  terrainFeatures.forEach((feature) => {
    const key = feature.dataset.feature;
    feature.classList.toggle("is-highlighted", activeFeatures.has(key));
    feature.classList.toggle("is-selected", selectedFeature === key);
  });
  featureTargets.forEach((feature) => {
    const key = feature.dataset.feature;
    feature.classList.toggle("is-highlighted", activeFeatures.has(key));
    feature.classList.toggle("is-selected", selectedFeature === key);
  });

  if (selectedFeature && features[selectedFeature]) {
    const feature = features[selectedFeature];
    featureCard.hidden = false;
    featureType.textContent = feature.type;
    featureTitle.textContent = feature.title;
    featureText.textContent = feature.text;
    featureRule.textContent = feature.rule;
  } else {
    featureCard.hidden = true;
  }
}

function togglePlay() {
  if (timer) {
    pause();
    return;
  }
  if (currentStep === steps.length - 1) {
    setStep(0);
  }
  play();
}

function play() {
  playPause.setAttribute("aria-label", "暂停");
  playPause.querySelector(".icon").textContent = "Ⅱ";
  playText.textContent = "暂停";
  timer = window.setInterval(() => {
    if (currentStep >= steps.length - 1) {
      pause();
      return;
    }
    setStep(currentStep + 1);
  }, 1800);
}

function pause() {
  window.clearInterval(timer);
  timer = null;
  playPause.setAttribute("aria-label", "播放");
  playPause.querySelector(".icon").textContent = "▶";
  playText.textContent = "播放";
}

function exportCurrentSvg() {
  const clone = contourMap.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "2160");
  clone.setAttribute("height", "1440");

  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = `
    text { font-family: "Microsoft YaHei", Arial, sans-serif; }
    .contour { fill: none; stroke: #8b5e34; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .contour-100, .contour-150 { stroke-width: 2.4; }
    .contour-500, .contour-600 { stroke: #6c4629; stroke-width: 3.8; }
    .grid-layer path { stroke: rgba(67, 85, 68, 0.08); fill: none; }
    .map-label, .contour-labels text, .legend-box text { fill: #25313a; font-weight: 800; paint-order: stroke; stroke: rgba(255,252,242,.92); stroke-width: 7px; }
    .map-label { font-size: 27px; }
    .contour-labels text { font-size: 22px; }
    .ridge-line { fill: none; stroke: #d97706; stroke-width: 7; stroke-linecap: round; stroke-dasharray: 16 13; }
    .valley-line { fill: none; stroke: #0f8a7b; stroke-width: 6; stroke-linecap: round; stroke-dasharray: 10 13; }
    .river-line { fill: none; stroke: #1d6fb8; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; }
    .cliff-edge { fill: none; stroke: #b3392f; stroke-width: 7; stroke-linecap: round; }
    .cliff-hatch, .close-contour, .slope-bracket, .slope-tick, .gentle-zone { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    .hotspot { display: none; }
  `;
  clone.insertBefore(style, clone.firstChild);

  const serializer = new XMLSerializer();
  const source = `<?xml version="1.0" encoding="UTF-8"?>\n${serializer.serializeToString(clone)}`;
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "等高线地形判读模型.svg";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

playPause.addEventListener("click", togglePlay);

prevStep.addEventListener("click", () => {
  pause();
  setStep(currentStep - 1);
});

nextStep.addEventListener("click", () => {
  pause();
  setStep(currentStep + 1);
});

resetModel.addEventListener("click", () => {
  pause();
  setStep(0);
});

exportSvgButton.addEventListener("click", exportCurrentSvg);

range.addEventListener("input", (event) => {
  pause();
  setStep(Number(event.target.value));
});

stepChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    pause();
    setStep(Number(chip.dataset.step));
  });
});

clickableFeatures.forEach((feature) => {
  const select = () => {
    pause();
    selectedFeature = feature.dataset.feature;
    renderFeatureState();
  };

  feature.addEventListener("click", select);
  feature.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select();
    }
  });
});

setStep(0);
