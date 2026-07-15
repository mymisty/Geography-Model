const steps = [
  {
    title: "气团",
    at: 0,
    chip: "观察起点",
    summary: "冷暖气团相遇前，先比较它们的温度、密度和稳定度特征。本模型把冷锋、暖锋并列演示，不表示一次天气过程必然按此顺序发生。",
    tempTrend: "暖区较高，冷区较低",
    pressureTrend: "冷气团一侧偏高",
    rainTrend: "云雨尚未发展",
    points: [
      "冷气团温度低、密度大，常贴近地面；暖气团温度高、密度小，更容易抬升。",
      "冷暖气团交界处形成锋面，暖空气位于锋面上方，锋面通常向冷空气一侧倾斜。",
      "判断锋面天气时，先找气团性质，再看哪一侧主动推进。",
      "易错辨析：锋前、锋后是相对于锋面移动方向而言，不是地图上的固定东、西方向。"
    ],
    prompt: "拖动进度条，注意冷暖气团交界面为什么不是垂直的。"
  },
  {
    title: "冷锋",
    at: 20,
    chip: "冷空气推进",
    summary: "冷气团主动向暖气团推进，密度较大的冷空气楔入暖空气下方，迫使暖空气较快抬升。",
    tempTrend: "锋前偏暖",
    pressureTrend: "锋前较低",
    rainTrend: "云雨开始增强",
    points: [
      "冷锋的锋面坡度较陡，暖空气被迫抬升更剧烈。",
      "地面锋线常用蓝色三角表示，三角指向冷锋移动方向。",
      "锋线附近常出现大风、积雨云和短时较强降水，但具体强度还取决于水汽和稳定度。"
    ],
    prompt: "观察蓝色冷气团向前推进时，暖空气的抬升速度有什么变化。"
  },
  {
    title: "冷锋过境",
    at: 40,
    chip: "降温增压",
    summary: "冷锋过境时天气变化快，降水区常较窄；过境后受冷气团控制，气温下降，气压升高。",
    tempTrend: "明显下降",
    pressureTrend: "快速升高",
    rainTrend: "短时强降水",
    points: [
      "高中判读中，冷锋降水多集中在锋线附近或锋后，云雨带相对狭窄。",
      "过境后受冷气团控制，气温降低，气压升高，天气逐渐转晴。",
      "读图时可用“气温骤降、气压上升、降水集中”识别冷锋过境。",
      "边界条件：若暖空气水汽少或层结稳定，冷锋也可能以大风、降温为主，降水不明显。"
    ],
    prompt: "把曲线读数与云雨区位置对应起来，判断锋线最可能在哪里。"
  },
  {
    title: "暖锋",
    at: 60,
    chip: "暖空气爬升",
    summary: "暖气团主动沿冷空气上方缓慢爬升，形成坡度较缓、抬升范围较宽的锋面。",
    tempTrend: "缓慢回升",
    pressureTrend: "仍偏低",
    rainTrend: "连续性降水",
    points: [
      "暖锋锋面坡度较缓，暖空气爬升范围更广。",
      "地面锋线常用红色半圆表示，半圆指向暖锋移动方向。",
      "云系常由高云到低云逐渐增厚，降水多出现在锋前较大范围内。"
    ],
    prompt: "比较暖锋和冷锋的坡度，思考为什么暖锋降水范围更宽。"
  },
  {
    title: "暖锋过境",
    at: 80,
    chip: "转暖转稳",
    summary: "暖锋过境后暖气团占据近地面，气温回升；气压通常在锋前较低，过境后逐渐趋稳或回升。",
    tempTrend: "逐步升高",
    pressureTrend: "先降后升",
    rainTrend: "雨带移出",
    points: [
      "暖锋降水以连续性降水为主，强度通常比冷锋更平稳。",
      "过境后气温上升，湿度较高，能见度和云量会逐渐改善。",
      "暖锋天气变化节奏较慢，常需要结合云序、连续性降水和气压趋势判断。"
    ],
    prompt: "观察红色暖锋符号与雨带的位置关系，找出锋前降水区。"
  },
  {
    title: "天气变化",
    at: 100,
    chip: "要素对比",
    summary: "综合气温、气压和降水曲线，对比冷锋与暖锋过境的典型天气差异；实际个例还会受水汽、地形和季节背景影响。",
    tempTrend: "冷锋骤降，暖锋缓升",
    pressureTrend: "冷锋后升高明显",
    rainTrend: "冷锋窄强，暖锋宽稳",
    points: [
      "冷锋过境常表现为降温、升压、短时强降水。",
      "暖锋过境常表现为升温、气压先降后升、连续性降水。",
      "解题时把锋面坡度、云雨区宽度和三条天气曲线放在同一时段判断。",
      "模型边界：剖面图会夸大锋面坡度，实际锋面是三维倾斜面，需结合地面天气图判读。"
    ],
    prompt: "尝试用“锋前、锋线、锋后”描述一次完整的天气变化过程。"
  }
];

const weatherSamples = [
  { at: 0, temp: 24, pressure: 1006, rain: 5 },
  { at: 20, temp: 23, pressure: 1003, rain: 35 },
  { at: 40, temp: 14, pressure: 1014, rain: 90 },
  { at: 60, temp: 16, pressure: 1010, rain: 45 },
  { at: 80, temp: 20, pressure: 1005, rain: 70 },
  { at: 100, temp: 19, pressure: 1008, rain: 20 }
];

const chartSpecs = {
  width: 760,
  temp: { base: 12, amp: 11, min: 12, max: 25 },
  pressure: { base: 44, amp: 11, min: 1002, max: 1015 },
  rain: { base: 76, amp: 12, min: 0, max: 100 }
};

const els = {};
let progress = 0;
let isPlaying = false;
let playFrame = 0;
let lastFrameTime = 0;
const playDurationMs = 18000;

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  buildStepButtons();
  bindEvents();
  drawChartCurves();
  render();
});

function bindElements() {
  [
    "playBtn",
    "playIcon",
    "playText",
    "resetBtn",
    "exportBtn",
    "progressRange",
    "progressReadout",
    "phaseChip",
    "weatherSvg",
    "coldScene",
    "warmScene",
    "coldFrontMover",
    "warmFrontMover",
    "coldRainZone",
    "warmRainZone",
    "coldCloudZone",
    "warmCloudZone",
    "coldAirFlow",
    "warmAirFlow",
    "chartCursor",
    "tempCurve",
    "pressureCurve",
    "rainCurve",
    "tempDot",
    "pressureDot",
    "rainDot",
    "tempSvgValue",
    "pressureSvgValue",
    "rainSvgValue",
    "panelKicker",
    "stageTitle",
    "stageSummary",
    "tempValue",
    "pressureValue",
    "rainValue",
    "tempTrend",
    "pressureTrend",
    "rainTrend",
    "stagePoints",
    "teacherPrompt",
    "stepButtons"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function buildStepButtons() {
  const fragment = document.createDocumentFragment();
  steps.forEach((step, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "step-button";
    button.textContent = step.title;
    button.dataset.index = String(index);
    button.dataset.progress = String(step.at);
    button.setAttribute("aria-label", `跳转到${step.title}`);
    button.addEventListener("click", () => {
      pause();
      setProgress(step.at);
    });
    fragment.appendChild(button);
  });
  els.stepButtons.appendChild(fragment);
}

function bindEvents() {
  els.playBtn.addEventListener("click", () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  });

  els.resetBtn.addEventListener("click", () => {
    pause();
    setProgress(0);
  });

  els.exportBtn.addEventListener("click", exportCurrentSvg);

  els.progressRange.addEventListener("input", (event) => {
    pause();
    setProgress(Number(event.target.value));
  });

  document.addEventListener("keydown", (event) => {
    if (event.target && ["INPUT", "BUTTON"].includes(event.target.tagName)) {
      return;
    }
    if (event.code === "Space") {
      event.preventDefault();
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    }
    if (event.code === "Home") {
      event.preventDefault();
      pause();
      setProgress(0);
    }
  });
}

function play() {
  if (progress >= 100) {
    setProgress(0);
  }
  isPlaying = true;
  lastFrameTime = performance.now();
  els.playIcon.textContent = "⏸";
  els.playText.textContent = "暂停";
  els.playBtn.setAttribute("aria-label", "暂停模型");
  playFrame = requestAnimationFrame(tick);
}

function pause() {
  isPlaying = false;
  cancelAnimationFrame(playFrame);
  els.playIcon.textContent = "▶";
  els.playText.textContent = "播放";
  els.playBtn.setAttribute("aria-label", "播放模型");
}

function tick(now) {
  if (!isPlaying) {
    return;
  }
  const delta = now - lastFrameTime;
  lastFrameTime = now;
  const next = progress + (delta / playDurationMs) * 100;
  setProgress(Math.min(100, next));
  if (progress >= 100) {
    pause();
    return;
  }
  playFrame = requestAnimationFrame(tick);
}

function setProgress(value) {
  progress = clamp(value, 0, 100);
  render();
}

function render() {
  const stageIndex = getStageIndex(progress);
  const stage = steps[stageIndex];
  const sample = interpolateWeather(progress);

  els.progressRange.value = String(Math.round(progress));
  els.progressReadout.textContent = `${Math.round(progress)}% · ${stage.title}`;
  els.phaseChip.textContent = stage.chip;

  renderScenes(progress);
  renderChartCursor(progress, sample);
  renderPanel(stage, stageIndex, sample);
  renderActiveStep(stageIndex);
}

function renderScenes(value) {
  const p = value / 100;
  const coldCore = clamp(1 - smoothstep(0.46, 0.62, p), 0, 1);
  const warmCore = clamp(smoothstep(0.42, 0.62, p), 0, 1);
  const finalCompare = smoothstep(0.9, 1, p);

  const coldOpacity = Math.max(coldCore, finalCompare * 0.26);
  const warmOpacity = Math.max(warmCore, finalCompare * 0.72);
  els.coldScene.setAttribute("opacity", coldOpacity.toFixed(2));
  els.warmScene.setAttribute("opacity", warmOpacity.toFixed(2));

  const coldAdvance = clamp(p / 0.4, 0, 1);
  const warmAdvance = clamp((p - 0.52) / 0.34, 0, 1);

  els.coldFrontMover.setAttribute("transform", `translate(${(coldAdvance * 64).toFixed(1)} 0)`);
  els.coldAirFlow.setAttribute("transform", `translate(${(coldAdvance * 24).toFixed(1)} 0)`);
  els.coldRainZone.setAttribute("opacity", (0.22 + smoothstep(0.16, 0.4, p) * 0.78).toFixed(2));
  els.coldCloudZone.setAttribute("transform", `translate(${(570 + coldAdvance * 48).toFixed(1)} ${236 - coldAdvance * 16}) scale(${(0.9 + coldAdvance * 0.16).toFixed(2)})`);

  els.warmFrontMover.setAttribute("transform", `translate(${(warmAdvance * 38).toFixed(1)} 0)`);
  els.warmAirFlow.setAttribute("transform", `translate(${(warmAdvance * 22).toFixed(1)} 0)`);
  els.warmRainZone.setAttribute("opacity", (0.24 + smoothstep(0.58, 0.82, p) * 0.68).toFixed(2));
  els.warmCloudZone.setAttribute("transform", `translate(${(warmAdvance * 22).toFixed(1)} ${-warmAdvance * 10})`);
}

function renderPanel(stage, index, sample) {
  els.panelKicker.textContent = `步骤 ${index + 1} / ${steps.length}`;
  els.stageTitle.textContent = stage.title;
  els.stageSummary.textContent = stage.summary;
  els.tempValue.textContent = `${Math.round(sample.temp)}℃`;
  els.pressureValue.textContent = `${Math.round(sample.pressure)} hPa`;
  els.rainValue.textContent = `${Math.round(sample.rain)}%`;
  els.tempTrend.textContent = stage.tempTrend;
  els.pressureTrend.textContent = stage.pressureTrend;
  els.rainTrend.textContent = stage.rainTrend;
  els.teacherPrompt.textContent = stage.prompt;

  els.stagePoints.innerHTML = "";
  const fragment = document.createDocumentFragment();
  stage.points.forEach((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    fragment.appendChild(li);
  });
  els.stagePoints.appendChild(fragment);
}

function renderActiveStep(index) {
  const buttons = els.stepButtons.querySelectorAll(".step-button");
  buttons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "step" : "false");
  });
}

function drawChartCurves() {
  els.tempCurve.setAttribute("d", buildCurvePath("temp"));
  els.pressureCurve.setAttribute("d", buildCurvePath("pressure"));
  els.rainCurve.setAttribute("d", buildCurvePath("rain"));
}

function renderChartCursor(value, sample) {
  const x = progressToChartX(value);
  els.chartCursor.setAttribute("x1", x.toFixed(1));
  els.chartCursor.setAttribute("x2", x.toFixed(1));

  positionDot(els.tempDot, x, valueToY(sample.temp, chartSpecs.temp));
  positionDot(els.pressureDot, x, valueToY(sample.pressure, chartSpecs.pressure));
  positionDot(els.rainDot, x, valueToY(sample.rain, chartSpecs.rain));

  els.tempSvgValue.textContent = `气温 ${Math.round(sample.temp)}℃`;
  els.pressureSvgValue.textContent = `气压 ${Math.round(sample.pressure)} hPa`;
  els.rainSvgValue.textContent = `降水 ${Math.round(sample.rain)}%`;
}

function positionDot(dot, x, y) {
  dot.setAttribute("cx", x.toFixed(1));
  dot.setAttribute("cy", y.toFixed(1));
}

function buildCurvePath(key) {
  return weatherSamples
    .map((sample, index) => {
      const x = progressToChartX(sample.at);
      const y = valueToY(sample[key], chartSpecs[key]);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function progressToChartX(value) {
  return (clamp(value, 0, 100) / 100) * chartSpecs.width;
}

function valueToY(value, spec) {
  const ratio = (value - spec.min) / (spec.max - spec.min);
  return spec.base + spec.amp - clamp(ratio, 0, 1) * spec.amp * 2;
}

function interpolateWeather(value) {
  const p = clamp(value, 0, 100);
  for (let i = 0; i < weatherSamples.length - 1; i += 1) {
    const current = weatherSamples[i];
    const next = weatherSamples[i + 1];
    if (p >= current.at && p <= next.at) {
      const local = (p - current.at) / (next.at - current.at);
      return {
        temp: lerp(current.temp, next.temp, local),
        pressure: lerp(current.pressure, next.pressure, local),
        rain: lerp(current.rain, next.rain, local)
      };
    }
  }
  return weatherSamples[weatherSamples.length - 1];
}

function getStageIndex(value) {
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;
  steps.forEach((step, index) => {
    const distance = Math.abs(step.at - value);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
  return closestIndex;
}

function exportCurrentSvg() {
  const clone = els.weatherSvg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "1800");
  clone.setAttribute("height", "1080");

  const source = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `锋面天气模型-${Math.round(progress)}.svg`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0, edge1, value) {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}
