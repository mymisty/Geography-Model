const steps = [
  {
    title: "海陆热力性质差异",
    badge: "热力性质差异",
    text: "陆地比热容小，升温和降温都快；海洋比热容大，升温和降温都慢。季节尺度上的海陆热力性质差异会改变近地面气压场，这是季风形成的重要基础。",
    points: ["季风是季节尺度的大范围环流，不等同于昼夜尺度的海陆风。", "热的下垫面上空空气易受热上升，近地面常形成相对低压。", "易错辨析：海陆热力性质差异是重要基础，但季风还受气压带风带季节移动和地形影响。"],
    landState: "升温快 · 低压",
    seaState: "升温慢 · 高压",
    progress: 0
  },
  {
    title: "夏季风形成",
    badge: "夏季：海风入陆",
    text: "夏季大陆强烈增温，亚洲大陆形成热低压；邻近海洋相对较冷，近地面气压较高。近地面空气总体由海洋流向大陆，并受地转偏向力和地形影响而改变具体风向。",
    points: ["水平气压梯度力由高压指向低压，实际风向还会受地转偏向力影响。", "来自海洋的夏季风通常较暖湿，是我国东部夏季降水的重要水汽来源。"],
    landState: "热 · 低压",
    seaState: "较冷 · 高压",
    progress: 0.2
  },
  {
    title: "水汽输送与降水",
    badge: "夏季：水汽与降水",
    text: "夏季风把海洋水汽输送到陆地，但有水汽并不必然降水；还需要抬升、冷却和凝结条件。迎风坡、锋面和低压辐合区更容易形成明显降水。",
    points: ["水汽来源主要在海洋，输送路径受风向和地形共同控制。", "降水区常与季风路径、迎风坡抬升、锋面活动和低压辐合有关。"],
    landState: "湿热 · 上升",
    seaState: "水汽来源",
    progress: 0.4
  },
  {
    title: "冬季风形成",
    badge: "冬季：陆风出海",
    text: "冬季大陆迅速冷却，形成冷高压；海洋降温慢，相对较暖，近地面气压较低。近地面空气总体由大陆流向海洋，并在东亚表现为偏北、偏西北的冬季风。",
    points: ["冬季风多来自内陆，通常寒冷干燥。", "东亚冬季风常造成降温、大风、寒潮等天气过程，南下途中也可能在沿海或山地形成降水。"],
    landState: "冷 · 高压",
    seaState: "较暖 · 低压",
    progress: 0.6
  },
  {
    title: "夏冬季风对比",
    badge: "对比：风向反转",
    text: "季风的核心特征是盛行风向随季节显著转变。夏季海洋到大陆，利于水汽输送；冬季大陆到海洋，空气多较干冷。",
    points: ["重要原因：海陆热力性质差异叠加行星风带季节移动。", "直接表现：气压中心改变，近地面盛行风向发生季节性转换。", "区域差异：南亚季风、东亚季风的风向和雨季进退并不完全相同，要结合海陆位置和地形分析。"],
    landState: "夏低冬高",
    seaState: "夏高冬低",
    progress: 0.8
  },
  {
    title: "总结迁移",
    badge: "总结：因果链条",
    text: "分析季风环流时，可以按“海陆热力性质差异 → 气压场季节变化 → 盛行风向 → 水汽输送 → 抬升冷却 → 降水差异”的链条组织答案。",
    points: ["答题时同时说清季节、气压中心、盛行风向和地转偏向力影响。", "解释降水时要补充水汽输送、抬升条件、地形迎背风和区域差异。", "模型边界：图中箭头表示总体趋势，不能替代具体天气图中的等压线、风向和雨带位置判读。"],
    landState: "控制气压季节变化",
    seaState: "提供水汽并调节温度",
    progress: 1
  }
];

const el = {
  svg: document.querySelector("#monsoonSvg"),
  playPause: document.querySelector("#playPause"),
  playIcon: document.querySelector("#playIcon"),
  playText: document.querySelector("#playText"),
  reset: document.querySelector("#resetBtn"),
  export: document.querySelector("#exportBtn"),
  range: document.querySelector("#progressRange"),
  output: document.querySelector("#progressOutput"),
  stepButtons: [...document.querySelectorAll(".step-btn")],
  seasonBadge: document.querySelector("#seasonBadge"),
  stepNumber: document.querySelector("#stepNumber"),
  stepTitle: document.querySelector("#stepTitle"),
  stepText: document.querySelector("#stepText"),
  keyPoints: document.querySelector("#keyPoints"),
  landState: document.querySelector("#landState"),
  seaState: document.querySelector("#seaState"),
  seaTempLabel: document.querySelector("#seaTempLabel"),
  landTempLabel: document.querySelector("#landTempLabel"),
  seaPressureMain: document.querySelector("#seaPressureMain"),
  seaPressureSub: document.querySelector("#seaPressureSub"),
  landPressureMain: document.querySelector("#landPressureMain"),
  landPressureSub: document.querySelector("#landPressureSub"),
  seaPressure: document.querySelector("#seaPressure"),
  landPressure: document.querySelector("#landPressure"),
  oceanShape: document.querySelector("#oceanShape"),
  landShape: document.querySelector("#landShape"),
  sunGroup: document.querySelector("#sunGroup"),
  summerWinds: document.querySelector("#summerWinds"),
  winterWinds: document.querySelector("#winterWinds"),
  moistureLayer: document.querySelector("#moistureLayer"),
  rainLayer: document.querySelector("#rainLayer"),
  winterDryLayer: document.querySelector("#winterDryLayer"),
  comparisonLayer: document.querySelector("#comparisonLayer"),
  summaryLayer: document.querySelector("#summaryLayer"),
  verticalMotion: document.querySelector("#verticalMotion")
};

let progress = 0;
let playing = false;
let rafId = null;
let lastTime = 0;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0, edge1, value) {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

function getStepIndex(value) {
  let index = 0;
  steps.forEach((step, i) => {
    if (value >= step.progress - 0.001) index = i;
  });
  return index;
}

function setLayerOpacity(layer, amount) {
  layer.style.opacity = String(clamp(amount));
}

function renderKeyPoints(step) {
  el.keyPoints.innerHTML = "";
  step.points.forEach((point, index) => {
    const item = document.createElement("div");
    item.className = `key-point${index % 2 ? " warn" : ""}`;
    item.textContent = point;
    el.keyPoints.appendChild(item);
  });
}

function updatePanel(stepIndex) {
  const step = steps[stepIndex];
  el.stepNumber.textContent = String(stepIndex + 1).padStart(2, "0");
  el.stepTitle.textContent = step.title;
  el.stepText.textContent = step.text;
  el.seasonBadge.textContent = step.badge;
  el.landState.textContent = step.landState;
  el.seaState.textContent = step.seaState;
  renderKeyPoints(step);

  el.stepButtons.forEach((button, index) => {
    button.classList.toggle("active", index === stepIndex);
  });
}

function updateThermalAndPressure(value) {
  const winter = smoothstep(0.52, 0.66, value);
  const summer = 1 - winter;

  if (value < 0.52 || value >= 0.78) {
    el.landTempLabel.textContent = value >= 0.78 ? "夏热冬冷" : "相对较热";
    el.seaTempLabel.textContent = value >= 0.78 ? "夏冷冬暖" : "相对较冷";
    el.landPressureMain.textContent = value >= 0.78 ? "低/高压" : "低压";
    el.landPressureSub.textContent = value >= 0.78 ? "季节转换" : "热而上升";
    el.seaPressureMain.textContent = value >= 0.78 ? "高/低压" : "高压";
    el.seaPressureSub.textContent = value >= 0.78 ? "季节转换" : "冷而下沉";
  } else {
    el.landTempLabel.textContent = "相对较冷";
    el.seaTempLabel.textContent = "相对较暖";
    el.landPressureMain.textContent = "高压";
    el.landPressureSub.textContent = "冷而下沉";
    el.seaPressureMain.textContent = "低压";
    el.seaPressureSub.textContent = "暖而上升";
  }

  const landWarm = Math.round(210 + 20 * summer - 70 * winter);
  const oceanCool = Math.round(205 + 34 * winter);
  el.landShape.style.fill = winter > 0.55 ? "#bfa36f" : `rgb(${landWarm}, ${142 + 24 * winter}, ${76 + 54 * winter})`;
  el.oceanShape.style.fill = winter > 0.55 ? "#5ba0cb" : `rgb(70, ${145 + oceanCool * 0.08}, ${196 + oceanCool * 0.05})`;

  el.landPressure.classList.toggle("land", value < 0.52 || value >= 0.78);
  el.seaPressure.classList.toggle("land", value >= 0.52 && value < 0.78);
  el.sunGroup.style.opacity = String(value >= 0.52 && value < 0.78 ? 0.48 : 1);
  el.sunGroup.style.transform = value >= 0.52 && value < 0.78 ? "translate(180px, 122px) scale(0.82)" : "translate(180px, 122px) scale(1)";
}

function updateSvg(value) {
  const summerAmount = smoothstep(0.12, 0.28, value) * (1 - smoothstep(0.54, 0.66, value));
  const moistureAmount = smoothstep(0.26, 0.42, value) * (1 - smoothstep(0.54, 0.66, value));
  const rainAmount = smoothstep(0.32, 0.48, value) * (1 - smoothstep(0.54, 0.66, value));
  const winterAmount = smoothstep(0.52, 0.68, value) * (1 - smoothstep(0.78, 0.9, value));
  const compareAmount = smoothstep(0.72, 0.84, value) * (1 - smoothstep(0.9, 0.98, value));
  const summaryAmount = smoothstep(0.88, 1, value);

  setLayerOpacity(el.summerWinds, Math.max(summerAmount, compareAmount * 0.6));
  setLayerOpacity(el.moistureLayer, Math.max(moistureAmount, compareAmount * 0.45));
  setLayerOpacity(el.rainLayer, Math.max(rainAmount, compareAmount * 0.45));
  setLayerOpacity(el.winterWinds, Math.max(winterAmount, compareAmount * 0.6));
  setLayerOpacity(el.winterDryLayer, Math.max(winterAmount, compareAmount * 0.4));
  setLayerOpacity(el.comparisonLayer, compareAmount);
  setLayerOpacity(el.summaryLayer, summaryAmount);

  el.verticalMotion.style.opacity = String(value >= 0.78 ? 0.46 : 1);
  updateThermalAndPressure(value);
}

function setProgress(value, syncRange = true) {
  progress = clamp(value);
  if (syncRange) {
    el.range.value = Math.round(progress * 1000);
  }
  el.output.textContent = `${Math.round(progress * 100)}%`;
  const stepIndex = getStepIndex(progress);
  updatePanel(stepIndex);
  updateSvg(progress);
}

function setPlaying(nextPlaying) {
  playing = nextPlaying;
  el.playIcon.textContent = playing ? "Ⅱ" : "▶";
  el.playText.textContent = playing ? "暂停" : "播放";
  el.playPause.setAttribute("aria-label", playing ? "暂停" : "播放");

  if (playing) {
    lastTime = performance.now();
    rafId = requestAnimationFrame(tick);
  } else if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

function tick(now) {
  const delta = Math.min(0.08, (now - lastTime) / 1000);
  lastTime = now;
  const next = progress + delta / 18;

  if (next >= 1) {
    setProgress(1);
    setPlaying(false);
    return;
  }

  setProgress(next);
  rafId = requestAnimationFrame(tick);
}

function downloadSvg() {
  const clone = el.svg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "1200");
  clone.setAttribute("height", "760");

  const style = document.createElement("style");
  style.textContent = [...document.styleSheets]
    .map((sheet) => {
      try {
        return [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");
  clone.insertBefore(style, clone.firstChild);

  const source = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
  const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "季风环流模型.svg";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

el.playPause.addEventListener("click", () => {
  if (progress >= 1) setProgress(0);
  setPlaying(!playing);
});

el.reset.addEventListener("click", () => {
  setPlaying(false);
  setProgress(0);
});

el.export.addEventListener("click", downloadSvg);

el.range.addEventListener("input", (event) => {
  setPlaying(false);
  setProgress(Number(event.target.value) / 1000, false);
});

el.stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setPlaying(false);
    const stepIndex = Number(button.dataset.step);
    setProgress(steps[stepIndex].progress);
  });
});

setProgress(0);
