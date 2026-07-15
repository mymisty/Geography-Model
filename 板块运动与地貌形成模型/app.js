const steps = [
  {
    name: "张裂",
    progress: 0,
    caption: "大陆岩石圈受张力拉伸，裂谷开始发育",
    title: "张裂：岩石圈被拉伸",
    copy: "在张性应力作用下，岩石圈变薄并产生断裂，裂谷带和正断层开始出现；地幔物质上涌可进一步促进岩浆活动。",
    evidence: [
      "张力作用使两侧岩石圈块体相背运动。",
      "裂隙为岩浆上涌提供通道。",
      "早期地貌以裂谷、断层陡崖为主。",
      "易错辨析：板块指岩石圈板块，包含地壳和上地幔顶部，不等同于单独的地壳。"
    ],
    concept: "看箭头方向：相背运动对应生长边界的起点。"
  },
  {
    name: "洋中脊",
    progress: 20,
    caption: "岩浆冷却形成新洋壳，洋中脊持续扩张",
    title: "洋中脊：新洋壳生成",
    copy: "岩浆沿裂隙上涌并冷却凝固，形成新的洋壳；两侧洋壳不断被推离中脊，海底扩张持续进行。",
    evidence: [
      "生长边界处物质补给明显。",
      "洋中脊高于两侧洋盆，常伴随浅源地震。",
      "新洋壳年龄由中脊向两侧逐渐变老。",
      "判读证据：洋中脊两侧常呈大致对称的岩石年龄和古地磁条带。"
    ],
    concept: "生长边界的核心证据是“新岩石圈产生”。"
  },
  {
    name: "俯冲",
    progress: 43,
    caption: "较冷较密的洋壳下插，海沟与消亡边界形成",
    title: "俯冲：海沟标记消亡边界",
    copy: "较老、较冷、密度较大的大洋岩石圈可在汇聚边界处向下俯冲；本图以洋陆俯冲为例，板块边缘形成深而狭长的海沟，旧洋壳开始被消耗。",
    evidence: [
      "海沟通常位于大洋岩石圈开始俯冲的入口附近。",
      "俯冲带反映岩石圈物质向地幔返回。",
      "消亡边界常与强烈构造活动相伴。"
    ],
    concept: "消亡边界不是地貌消失，而是旧洋壳被俯冲消耗。"
  },
  {
    name: "火山地震",
    progress: 62,
    caption: "俯冲带脱水熔融，地震震源呈带状分布",
    title: "火山地震：能量沿俯冲带释放",
    copy: "俯冲板块脱水使上覆地幔楔发生部分熔融，岩浆上升形成火山弧；震源常从浅到深沿俯冲面呈带状排列。",
    evidence: [
      "浅、中、深源地震沿俯冲板块分布。",
      "岩浆上升在大陆边缘形成火山弧。",
      "海沟、火山弧、地震带常呈平行带状组合。"
    ],
    concept: "把海沟、火山弧、震源带连起来，可判读俯冲方向。"
  },
  {
    name: "碰撞造山",
    progress: 82,
    caption: "板块继续汇聚，沉积层受挤压褶皱隆升",
    title: "碰撞造山：褶皱山形成",
    copy: "当大陆板块持续汇聚，边缘沉积层和地壳被强烈挤压，发生褶皱、逆冲断裂和隆升，形成高大的褶皱山系。",
    evidence: [
      "挤压力使岩层缩短、增厚并弯曲。",
      "大陆碰撞处常出现宽广高大的山脉。",
      "造山带记录了长期的板块汇聚过程。"
    ],
    concept: "褶皱山是水平挤压长期累积后的地貌结果。"
  },
  {
    name: "地貌总结",
    progress: 100,
    caption: "边界类型决定地貌组合，运动方向决定演化路径",
    title: "地貌总结：从运动到地貌",
    copy: "本模型并列展示典型边界：板块相背运动产生生长边界、洋中脊和新洋壳；板块相向运动可形成消亡边界、海沟、火山弧、地震带或陆陆碰撞褶皱山。",
    evidence: [
      "相背运动：张裂、岩浆上涌、洋中脊。",
      "洋陆或洋洋汇聚：海沟、俯冲、火山弧、地震带。",
      "陆陆碰撞：地壳增厚、褶皱隆升、山脉形成。",
      "模型边界：火山和地震不只发生在板块边界，热点火山和板内地震需要另作分析。"
    ],
    concept: "先判读箭头方向，再匹配边界类型和典型地貌；不要把图中阶段理解为同一地点必然连续发生。"
  }
];

const elements = {
  svg: document.getElementById("tectonicSvg"),
  range: document.getElementById("progressRange"),
  progressValue: document.getElementById("progressValue"),
  timeLabel: document.getElementById("timeLabel"),
  playPauseBtn: document.getElementById("playPauseBtn"),
  playPauseSymbol: document.getElementById("playPauseSymbol"),
  playPauseText: document.getElementById("playPauseText"),
  resetBtn: document.getElementById("resetBtn"),
  prevStepBtn: document.getElementById("prevStepBtn"),
  nextStepBtn: document.getElementById("nextStepBtn"),
  exportBtn: document.getElementById("exportBtn"),
  stepPill: document.getElementById("stepPill"),
  stageCaption: document.getElementById("stageCaption"),
  infoIndex: document.getElementById("infoIndex"),
  infoTitle: document.getElementById("infoTitle"),
  infoCopy: document.getElementById("infoCopy"),
  evidenceList: document.getElementById("evidenceList"),
  conceptText: document.getElementById("conceptText"),
  stepButtons: Array.from(document.querySelectorAll(".step-button")),
  leftPlate: document.getElementById("leftPlate"),
  rightOceanPlate: document.getElementById("rightOceanPlate"),
  ridgeMagma: document.getElementById("ridgeMagma"),
  ridgeFeature: document.getElementById("ridgeFeature"),
  riftCrack: document.getElementById("riftCrack"),
  subductionLayer: document.getElementById("subductionLayer"),
  subductingSlab: document.getElementById("subductingSlab"),
  continentPlate: document.getElementById("continentPlate"),
  volcanoArc: document.getElementById("volcanoArc"),
  foldMountains: document.getElementById("foldMountains"),
  earthquakeGroup: document.getElementById("earthquakeGroup"),
  motionArrows: document.getElementById("motionArrows"),
  leftMotionArrow: document.getElementById("leftMotionArrow"),
  rightMotionArrow: document.getElementById("rightMotionArrow"),
  subductionArrow: document.getElementById("subductionArrow"),
  collisionArrow: document.getElementById("collisionArrow")
};

let progress = 0;
let isPlaying = false;
let animationFrame = null;
let lastFrameTime = null;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0, edge1, value) {
  const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

function getActiveStepIndex(value) {
  return steps.reduce((activeIndex, step, index) => {
    return value >= step.progress ? index : activeIndex;
  }, 0);
}

function setGroupState(group, opacity, translateX = 0, translateY = 0) {
  group.style.opacity = opacity.toFixed(3);
  group.setAttribute("transform", `translate(${translateX.toFixed(2)} ${translateY.toFixed(2)})`);
}

function renderEvidence(items) {
  elements.evidenceList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    elements.evidenceList.appendChild(li);
  });
}

function updateInfoPanel(activeStep, activeIndex) {
  elements.stepPill.textContent = activeStep.name;
  elements.stageCaption.textContent = activeStep.caption;
  elements.infoIndex.textContent = String(activeIndex + 1).padStart(2, "0");
  elements.infoTitle.textContent = activeStep.title;
  elements.infoCopy.textContent = activeStep.copy;
  elements.conceptText.textContent = activeStep.concept;
  renderEvidence(activeStep.evidence);
}

function updateStepButtons(activeIndex) {
  elements.stepButtons.forEach((button, index) => {
    const active = index === activeIndex;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "step" : "false");
  });
}

function updateScene(nextProgress) {
  progress = clamp(nextProgress, 0, 100);
  const ratio = progress / 100;
  const activeIndex = getActiveStepIndex(progress);
  const activeStep = steps[activeIndex];

  elements.range.value = String(Math.round(progress));
  elements.progressValue.textContent = `${Math.round(progress)}%`;
  elements.timeLabel.textContent = `演化进度 ${Math.round(progress)}%`;

  updateInfoPanel(activeStep, activeIndex);
  updateStepButtons(activeIndex);

  const spread = smoothstep(0, 28, progress);
  const subduction = smoothstep(34, 62, progress);
  const seismic = smoothstep(52, 72, progress);
  const collision = smoothstep(72, 94, progress);
  const summary = smoothstep(92, 100, progress);

  const leftShift = -42 * spread;
  const rightShift = 24 * spread - 18 * subduction;
  setGroupState(elements.leftPlate, 1, leftShift, 0);
  setGroupState(elements.rightOceanPlate, 1, rightShift, 0);

  elements.ridgeMagma.style.opacity = (0.22 + 0.78 * smoothstep(3, 24, progress)).toFixed(3);
  elements.ridgeMagma.setAttribute("transform", `scale(1 ${0.62 + 0.38 * spread}) translate(0 ${90 * (1 - spread)})`);
  elements.ridgeFeature.setAttribute("transform", `translate(0 ${-12 * spread})`);
  elements.riftCrack.style.strokeDashoffset = String(56 - 56 * spread);

  elements.subductionLayer.style.opacity = subduction.toFixed(3);
  elements.subductionLayer.setAttribute("transform", `translate(${-18 * subduction} ${8 * (1 - subduction)})`);
  elements.subductingSlab.style.filter = subduction > 0.2 ? "url(#softShadow)" : "none";

  elements.continentPlate.setAttribute("transform", `translate(${-18 * collision} 0)`);
  elements.volcanoArc.style.opacity = (0.1 + 0.9 * seismic).toFixed(3);
  elements.volcanoArc.setAttribute("transform", `translate(${-14 * collision} ${12 * (1 - seismic)})`);
  elements.earthquakeGroup.style.opacity = seismic.toFixed(3);
  elements.earthquakeGroup.setAttribute("transform", `translate(${-10 * subduction} 0)`);
  elements.foldMountains.style.opacity = (0.18 + 0.82 * collision).toFixed(3);
  elements.foldMountains.setAttribute("transform", `translate(${-30 * collision} ${10 * (1 - collision)}) scale(${1 + 0.05 * collision} ${1 + 0.1 * collision})`);

  elements.leftMotionArrow.style.opacity = (0.42 + 0.58 * spread).toFixed(3);
  elements.rightMotionArrow.style.opacity = (0.42 + 0.58 * spread).toFixed(3);
  elements.subductionArrow.style.opacity = (0.12 + 0.88 * subduction).toFixed(3);
  elements.collisionArrow.style.opacity = (0.16 + 0.84 * collision).toFixed(3);
  elements.motionArrows.style.strokeDashoffset = String(-ratio * 90);

  const quakeScale = 1 + 0.13 * Math.sin(Date.now() / 180);
  elements.earthquakeGroup.querySelectorAll(".quake-ring").forEach((ring, index) => {
    ring.style.transformBox = "fill-box";
    ring.style.transformOrigin = "center";
    ring.style.transform = `scale(${seismic > 0 ? quakeScale + index * 0.03 : 1})`;
  });

  elements.svg.dataset.phase = activeStep.name;
  elements.svg.style.outline = summary > 0 ? "4px solid rgba(245, 165, 36, 0.18)" : "none";
}

function setPlaying(nextState) {
  isPlaying = nextState;
  elements.playPauseSymbol.textContent = isPlaying ? "⏸" : "▶";
  elements.playPauseText.textContent = isPlaying ? "暂停" : "播放";
  elements.playPauseBtn.setAttribute("aria-label", isPlaying ? "暂停模型" : "播放模型");

  if (isPlaying) {
    lastFrameTime = null;
    animationFrame = requestAnimationFrame(tick);
  } else if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

function tick(timestamp) {
  if (!isPlaying) {
    return;
  }

  if (lastFrameTime === null) {
    lastFrameTime = timestamp;
  }

  const delta = timestamp - lastFrameTime;
  lastFrameTime = timestamp;
  const nextProgress = progress + delta / 190;

  if (nextProgress >= 100) {
    updateScene(100);
    setPlaying(false);
    return;
  }

  updateScene(nextProgress);
  animationFrame = requestAnimationFrame(tick);
}

function goToStep(index) {
  const step = steps[clamp(index, 0, steps.length - 1)];
  setPlaying(false);
  updateScene(step.progress);
}

function exportSvg() {
  const clone = elements.svg.cloneNode(true);
  clone.removeAttribute("style");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "2400");
  clone.setAttribute("height", "1440");

  const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.textContent = `
    .motion-arrow{fill:none;stroke-width:7;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:12 12}
    .blue{stroke:#0f718f}.red{stroke:#c2410c}
    .svg-labels .label rect{fill:rgba(255,255,255,.92);stroke:rgba(23,33,43,.18)}
    .svg-labels .label text{fill:#17212b;font-size:22px;font-weight:800;font-family:Microsoft YaHei,Arial,sans-serif}
    .leader{fill:none;stroke:#1f2937;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:6 6}
    .quake-focus{fill:#ef4444;stroke:#7f1d1d;stroke-width:2.5}
    .quake-ring{fill:none;stroke:#ef4444;stroke-width:4;opacity:.72}
    .axis-note rect{fill:rgba(255,255,255,.82);stroke:rgba(23,33,43,.14)}
    .axis-note text{fill:#334155;font-size:18px;font-weight:700;font-family:Microsoft YaHei,Arial,sans-serif}
  `;
  clone.insertBefore(style, clone.firstChild);

  const serializer = new XMLSerializer();
  const source = `<?xml version="1.0" encoding="UTF-8"?>\n${serializer.serializeToString(clone)}`;
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `板块运动与地貌形成模型-${Math.round(progress)}.svg`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

elements.playPauseBtn.addEventListener("click", () => {
  if (progress >= 100 && !isPlaying) {
    updateScene(0);
  }
  setPlaying(!isPlaying);
});

elements.resetBtn.addEventListener("click", () => {
  setPlaying(false);
  updateScene(0);
});

elements.range.addEventListener("input", (event) => {
  setPlaying(false);
  updateScene(Number(event.target.value));
});

elements.prevStepBtn.addEventListener("click", () => {
  goToStep(getActiveStepIndex(progress) - 1);
});

elements.nextStepBtn.addEventListener("click", () => {
  const activeIndex = getActiveStepIndex(progress);
  const nextIndex = activeIndex + 1;
  goToStep(nextIndex);
});

elements.exportBtn.addEventListener("click", exportSvg);

elements.stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    goToStep(Number(button.dataset.step));
  });
});

window.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) {
    return;
  }

  if (event.code === "Space") {
    event.preventDefault();
    elements.playPauseBtn.click();
  }

  if (event.key === "ArrowLeft") {
    elements.prevStepBtn.click();
  }

  if (event.key === "ArrowRight") {
    elements.nextStepBtn.click();
  }
});

updateScene(0);
