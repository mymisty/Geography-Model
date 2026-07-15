if (!window.THREE || !window.THREE.OrbitControls) {
  const scenePanel = document.querySelector(".scene-panel");
  if (scenePanel) {
    scenePanel.innerHTML =
      '<div class="load-error"><strong>三维库加载失败</strong><span>请确认 vendor 文件夹与 index.html 在同一目录，或解压后双击 start-server.bat 打开。</span></div>';
  }
  throw new Error("Three.js or OrbitControls did not load.");
}

const OrbitControls = THREE.OrbitControls;

const container = document.querySelector("#scene-canvas");
const labelLayer = document.querySelector("#label-layer");
const deltaSlider = document.querySelector("#delta-slider");
const deltaOutput = document.querySelector("#delta-output");
const deltaReadout = document.querySelector("#delta-readout");
const meterFill = document.querySelector("#meter-fill");
const playToggle = document.querySelector("#play-toggle");
const resetBtn = document.querySelector("#reset-btn");
const labelToggle = document.querySelector("#label-toggle");
const stageButtons = [...document.querySelectorAll(".stage-btn")];
const stageIndexEl = document.querySelector("#stage-index");
const stageTitleEl = document.querySelector("#stage-title");
const stageDescriptionEl = document.querySelector("#stage-description");
const keywordWrap = document.querySelector("#keyword-wrap");
const stageTipEl = document.querySelector("#stage-tip");

const state = {
  currentStage: 5,
  deltaT: 10,
  isPlaying: true,
  labelsVisible: true,
};

const stages = {
  1: {
    title: "阶段一：地表受热不均",
    description:
      "地表受热差异是热力环流形成的根本原因。受热区域获得较多热量，地表温度升高；冷却区域温度较低，两地之间形成明显的温度差异。",
    keywords: ["冷热不均", "地表受热差异", "温度差异"],
    tip: "先观察左右地表颜色：左侧更暖、右侧更冷，这是后续空气运动的起点。",
  },
  2: {
    title: "阶段二：空气垂直运动",
    description:
      "受热区近地面空气受热膨胀，密度减小，空气上升；冷却区空气冷却收缩，密度增大，空气下沉。冷热差异首先引起空气的垂直运动。",
    keywords: ["空气膨胀", "密度减小", "上升气流", "空气收缩", "下沉气流"],
    tip: "注意两个垂直箭头：受热区只能上升，冷却区只能下沉。",
  },
  3: {
    title: "阶段三：近地面气压差异形成",
    description:
      "受热区空气上升后，近地面空气减少，形成低压；冷却区空气下沉后，近地面空气堆积，形成高压。气压差异为水平气流的产生提供条件。",
    keywords: ["低压", "高压", "气压差异", "空气堆积", "空气减少"],
    tip: "不要把温度高直接理解为近地面高压：受热区近地面空气减少，因此是 L 低压。",
  },
  4: {
    title: "阶段四：水平气流产生",
    description:
      "在近地面，空气由高压区流向低压区，即由冷却区流向受热区；在高空，空气由受热区上空流向冷却区上空，形成反向补偿流动。",
    keywords: ["水平气压梯度力", "近地面风", "高空补偿气流", "高压流向低压"],
    tip: "近地面箭头从右向左，高空箭头从左向右，两者方向相反。",
  },
  5: {
    title: "阶段五：完整热力环流形成",
    description:
      "地表冷热不均引起空气垂直运动，垂直运动导致近地面气压差异，气压差异进一步引起水平气流。垂直运动与水平运动共同作用，最终形成闭合的热力环流。温差越大，环流越明显。",
    keywords: ["闭合环流", "垂直运动", "水平运动", "热力差异", "空气循环"],
    tip: "观察粒子路径：受热区上升，高空向右，冷却区下沉，近地面向左，构成闭合环流。",
  },
};

let scene;
let camera;
let renderer;
let controls;
let clock;
let heatTexture;
let coolTexture;
let heatTopMaterial;
let coolTopMaterial;
let heatPlume;
let coolPlume;
let circulationCurve;
let circulationTube;
let diagnosticsEl;

const defaultCameraPosition = new THREE.Vector3(0, 4.6, 8.4);
const defaultTarget = new THREE.Vector3(0, 1.55, 0);
const groups = {};
const arrows = {};
const particles = [];
const labels = new Map();

initScene();
createGround();
createTemperaturePlumes();
createPressureMarkers();
createAirflowArrows();
createCirculationPath();
createParticles();
createLabels();
bindUI();
exposeDiagnostics();
updateDeltaT(10);
updateStage(5);
animate();

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x11151c);
  scene.fog = new THREE.Fog(0x11151c, 8, 18);

  camera = new THREE.PerspectiveCamera(45, getAspect(), 0.1, 100);
  camera.position.copy(defaultCameraPosition);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.copy(defaultTarget);
  controls.minDistance = 5.6;
  controls.maxDistance = 12;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.minPolarAngle = Math.PI * 0.2;
  controls.update();

  clock = new THREE.Clock();

  const ambient = new THREE.AmbientLight(0xffffff, 0.62);
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(-4, 6, 6);
  const coolLight = new THREE.PointLight(0x4fb4ff, 1.4, 12);
  coolLight.position.set(4, 3, 3);
  const warmLight = new THREE.PointLight(0xff7a30, 1.5, 12);
  warmLight.position.set(-4, 2.2, 2);
  scene.add(ambient, keyLight, coolLight, warmLight);

  const grid = new THREE.GridHelper(13, 26, 0x334052, 0x26303d);
  grid.position.y = -0.08;
  grid.material.transparent = true;
  grid.material.opacity = 0.42;
  scene.add(grid);

  window.addEventListener("resize", onResize);
}

function createGround() {
  groups.ground = new THREE.Group();

  heatTexture = makeTemperatureTexture("heat", 0.5);
  coolTexture = makeTemperatureTexture("cool", 0.5);

  const blockGeometry = new THREE.BoxGeometry(5.7, 0.14, 4.25);
  const heatBlock = new THREE.Mesh(
    blockGeometry,
    new THREE.MeshStandardMaterial({ color: 0x5d2a1f, roughness: 0.82, metalness: 0.02 })
  );
  heatBlock.position.set(-3, -0.08, 0);

  const coolBlock = new THREE.Mesh(
    blockGeometry,
    new THREE.MeshStandardMaterial({ color: 0x183656, roughness: 0.82, metalness: 0.02 })
  );
  coolBlock.position.set(3, -0.08, 0);

  heatTopMaterial = new THREE.MeshStandardMaterial({
    map: heatTexture,
    roughness: 0.72,
    metalness: 0.03,
    emissive: 0xff4d2f,
    emissiveIntensity: 0.16,
  });
  coolTopMaterial = new THREE.MeshStandardMaterial({
    map: coolTexture,
    roughness: 0.72,
    metalness: 0.03,
    emissive: 0x237bff,
    emissiveIntensity: 0.12,
  });

  const topGeometry = new THREE.PlaneGeometry(5.7, 4.25, 24, 12);
  const heatTop = new THREE.Mesh(topGeometry, heatTopMaterial);
  heatTop.rotation.x = -Math.PI / 2;
  heatTop.position.set(-3, 0.002, 0);

  const coolTop = new THREE.Mesh(topGeometry, coolTopMaterial);
  coolTop.rotation.x = -Math.PI / 2;
  coolTop.position.set(3, 0.002, 0);

  const divider = new THREE.Mesh(
    new THREE.BoxGeometry(0.045, 0.08, 4.45),
    new THREE.MeshBasicMaterial({ color: 0xf4f7fb, transparent: true, opacity: 0.42 })
  );
  divider.position.set(0, 0.05, 0);

  groups.ground.add(heatBlock, coolBlock, heatTop, coolTop, divider);
  scene.add(groups.ground);
}

function createTemperaturePlumes() {
  groups.plumes = new THREE.Group();

  heatPlume = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makePlumeTexture("heat"),
      color: 0xff7040,
      transparent: true,
      opacity: 0.38,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  heatPlume.material.userData.baseOpacity = heatPlume.material.opacity;
  heatPlume.position.set(-3, 1.45, 0.1);
  heatPlume.scale.set(2.6, 3.25, 1);

  coolPlume = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makePlumeTexture("cool"),
      color: 0x55bdff,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  coolPlume.material.userData.baseOpacity = coolPlume.material.opacity;
  coolPlume.position.set(3, 1.35, 0.1);
  coolPlume.scale.set(2.45, 3.0, 1);

  groups.plumes.add(heatPlume, coolPlume);
  scene.add(groups.plumes);
}

function createPressureMarkers() {
  groups.pressure = new THREE.Group();

  const lowDisk = makePressureDisk(0xff463a, 0.3);
  lowDisk.position.set(-3, 0.035, -1.58);
  const highDisk = makePressureDisk(0x4aa8ff, 0.3);
  highDisk.position.set(3, 0.035, -1.58);

  groups.pressure.add(lowDisk, highDisk);
  groups.pressure.userData.targetOpacity = 1;
  scene.add(groups.pressure);
}

function createAirflowArrows() {
  groups.verticalArrows = new THREE.Group();
  groups.horizontalArrows = new THREE.Group();

  // 热力环流的垂直运动：左侧受热区上升，右侧冷却区下沉。
  arrows.up = makeArrow({
    name: "up",
    start: new THREE.Vector3(-3, 0.34, 0),
    direction: new THREE.Vector3(0, 1, 0),
    length: 2.55,
    color: 0xff7a2d,
    baseRadius: 0.07,
  });
  arrows.down = makeArrow({
    name: "down",
    start: new THREE.Vector3(3, 3.05, 0),
    direction: new THREE.Vector3(0, -1, 0),
    length: 2.45,
    color: 0x52bdff,
    baseRadius: 0.07,
  });

  // 水平运动：近地面由右侧高压 H 流向左侧低压 L，高空方向相反。
  arrows.ground = makeArrow({
    name: "ground",
    start: new THREE.Vector3(3.8, 0.56, -0.55),
    direction: new THREE.Vector3(-1, 0, 0),
    length: 6.3,
    color: 0xf4f8ff,
    baseRadius: 0.055,
  });
  arrows.upper = makeArrow({
    name: "upper",
    start: new THREE.Vector3(-3.7, 3.25, 0.55),
    direction: new THREE.Vector3(1, 0, 0),
    length: 6.25,
    color: 0xc9adff,
    baseRadius: 0.055,
  });

  groups.verticalArrows.add(arrows.up.group, arrows.down.group);
  groups.horizontalArrows.add(arrows.ground.group, arrows.upper.group);
  scene.add(groups.verticalArrows, groups.horizontalArrows);
}

function createCirculationPath() {
  groups.circulation = new THREE.Group();

  circulationCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-3, 0.52, 0.35),
      new THREE.Vector3(-3.35, 1.35, 0.45),
      new THREE.Vector3(-3, 2.85, 0.45),
      new THREE.Vector3(-1.4, 3.35, 0.58),
      new THREE.Vector3(1.4, 3.35, 0.58),
      new THREE.Vector3(3, 2.85, 0.45),
      new THREE.Vector3(3.35, 1.35, 0.45),
      new THREE.Vector3(3, 0.52, 0.35),
      new THREE.Vector3(1.2, 0.42, -0.55),
      new THREE.Vector3(-1.2, 0.42, -0.55),
    ],
    true,
    "catmullrom",
    0.42
  );

  circulationTube = new THREE.Mesh(
    new THREE.TubeGeometry(circulationCurve, 160, 0.025, 10, true),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.46,
      depthWrite: false,
    })
  );
  circulationTube.material.userData.baseOpacity = circulationTube.material.opacity;
  groups.circulation.add(circulationTube);
  scene.add(groups.circulation);
}

function createParticles() {
  groups.particles = new THREE.Group();
  const particleGeometry = new THREE.SphereGeometry(0.075, 18, 12);
  const particleCount = 34;

  for (let i = 0; i < particleCount; i += 1) {
    const t = i / particleCount;
    const material = new THREE.MeshBasicMaterial({
      color: colorForPathPosition(t),
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
    });
    material.userData.baseOpacity = material.opacity;
    const particle = new THREE.Mesh(particleGeometry, material);
    particle.userData.progress = t;
    particle.userData.offset = t;
    particle.position.copy(circulationCurve.getPointAt(t));
    particles.push(particle);
    groups.particles.add(particle);
  }

  scene.add(groups.particles);
}

function createLabels() {
  addLabel("heat", "受热区", new THREE.Vector3(-3.15, 0.36, 2.22), [1, 2, 3, 4, 5], "warm");
  addLabel("cool", "冷却区", new THREE.Vector3(3.15, 0.36, 2.22), [1, 2, 3, 4, 5], "cool");
  addLabel("up", "上升气流", new THREE.Vector3(-4.35, 2.1, 0.1), [2, 3, 4, 5], "warm");
  addLabel("down", "下沉气流", new THREE.Vector3(4.35, 2.0, 0.1), [2, 3, 4, 5], "cool");
  addLabel("low", "L 低压", new THREE.Vector3(-3, 0.55, -2.15), [3, 4, 5], "pressure-low");
  addLabel("high", "H 高压", new THREE.Vector3(3, 0.55, -2.15), [3, 4, 5], "pressure-high");
  addLabel("groundWind", "近地面风：H → L", new THREE.Vector3(0, 0.9, -1.18), [4, 5], "");
  addLabel("upperWind", "高空补偿气流", new THREE.Vector3(0, 3.65, 0.95), [4, 5], "");
}

function bindUI() {
  deltaSlider.addEventListener("input", (event) => {
    updateDeltaT(Number(event.target.value));
  });

  stageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateStage(Number(button.dataset.stage));
    });
  });

  playToggle.addEventListener("click", () => {
    state.isPlaying = !state.isPlaying;
    playToggle.textContent = state.isPlaying ? "暂停动画" : "播放动画";
  });

  resetBtn.addEventListener("click", resetSimulation);

  labelToggle.addEventListener("click", () => {
    state.labelsVisible = !state.labelsVisible;
    labelToggle.textContent = state.labelsVisible ? "隐藏标签" : "显示标签";
    updateLabels();
  });
}

function exposeDiagnostics() {
  diagnosticsEl = document.createElement("div");
  diagnosticsEl.id = "sim-diagnostics";
  diagnosticsEl.hidden = true;
  document.body.appendChild(diagnosticsEl);

  window.thermalSim = {
    getState: () => ({
      currentStage: state.currentStage,
      deltaT: state.deltaT,
      isPlaying: state.isPlaying,
      labelsVisible: state.labelsVisible,
    }),
    getParticleSamples: () =>
      particles.slice(0, 5).map((particle) => ({
        x: Number(particle.position.x.toFixed(3)),
        y: Number(particle.position.y.toFixed(3)),
        z: Number(particle.position.z.toFixed(3)),
      })),
  };
  updateDiagnostics();
}

function updateDiagnostics() {
  if (!diagnosticsEl) return;
  diagnosticsEl.dataset.stage = String(state.currentStage);
  diagnosticsEl.dataset.deltaT = String(state.deltaT);
  diagnosticsEl.dataset.isPlaying = String(state.isPlaying);
  diagnosticsEl.dataset.labelsVisible = String(state.labelsVisible);
  diagnosticsEl.dataset.particles = JSON.stringify(
    particles.slice(0, 5).map((particle) => ({
      x: Number(particle.position.x.toFixed(3)),
      y: Number(particle.position.y.toFixed(3)),
      z: Number(particle.position.z.toFixed(3)),
    }))
  );
}

function updateStage(stage) {
  state.currentStage = stage;

  const config = stages[stage];
  stageIndexEl.textContent = `阶段 ${stage} / 5`;
  stageTitleEl.textContent = config.title;
  stageDescriptionEl.textContent = config.description;
  stageTipEl.textContent = config.tip;
  keywordWrap.innerHTML = "";
  config.keywords.forEach((word) => {
    const tag = document.createElement("span");
    tag.className = "keyword";
    tag.textContent = word;
    keywordWrap.appendChild(tag);
  });

  stageButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.stage) === stage);
  });

  const visibility = {
    verticalArrows: stage >= 2 ? 1 : 0,
    pressure: stage >= 3 ? 1 : 0,
    horizontalArrows: stage >= 4 ? 1 : 0,
    circulation: stage === 4 ? 0.38 : stage === 5 ? 0.86 : 0,
    particles: stage === 4 ? 0.22 : stage === 5 ? 1 : 0,
    plumes: stage >= 1 ? 1 : 0,
  };

  Object.entries(visibility).forEach(([key, value]) => {
    setTargetOpacity(groups[key], value);
  });

  updateLabels();
}

function updateDeltaT(value) {
  state.deltaT = value;
  const strength = getStrength();
  deltaOutput.textContent = `${value}℃`;
  deltaReadout.textContent = `${value}℃`;
  meterFill.style.width = `${strength * 100}%`;

  heatTexture.dispose();
  coolTexture.dispose();
  heatTexture = makeTemperatureTexture("heat", strength);
  coolTexture = makeTemperatureTexture("cool", strength);
  heatTopMaterial.map = heatTexture;
  coolTopMaterial.map = coolTexture;
  heatTopMaterial.emissiveIntensity = 0.06 + strength * 0.26;
  coolTopMaterial.emissiveIntensity = 0.04 + strength * 0.2;
  heatTopMaterial.needsUpdate = true;
  coolTopMaterial.needsUpdate = true;

  heatPlume.material.userData.baseOpacity = 0.14 + strength * 0.42;
  coolPlume.material.userData.baseOpacity = 0.12 + strength * 0.38;
  heatPlume.scale.set(2.2 + strength * 1.0, 2.6 + strength * 1.3, 1);
  coolPlume.scale.set(2.1 + strength * 0.95, 2.5 + strength * 1.15, 1);

  Object.values(arrows).forEach((arrow) => {
    updateArrowStrength(arrow, strength);
  });

  particles.forEach((particle) => {
    particle.scale.setScalar(0.72 + strength * 0.85);
    particle.material.userData.baseOpacity = 0.28 + strength * 0.62;
  });

  circulationTube.material.userData.baseOpacity = 0.18 + strength * 0.48;
}

function resetSimulation() {
  state.isPlaying = true;
  state.labelsVisible = true;
  playToggle.textContent = "暂停动画";
  labelToggle.textContent = "隐藏标签";
  deltaSlider.value = "10";
  updateDeltaT(10);
  updateStage(5);
  camera.position.copy(defaultCameraPosition);
  controls.target.copy(defaultTarget);
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.04);
  const elapsed = clock.elapsedTime;
  const strength = getStrength();

  controls.update();
  easeGroupOpacity(groups.verticalArrows, 0.12);
  easeGroupOpacity(groups.horizontalArrows, 0.12);
  easeGroupOpacity(groups.pressure, 0.12);
  easeGroupOpacity(groups.circulation, 0.1);
  easeGroupOpacity(groups.particles, 0.1);
  easeGroupOpacity(groups.plumes, 0.1);

  if (state.isPlaying) {
    const speed = (0.035 + strength * 0.12) * delta;
    particles.forEach((particle, index) => {
      particle.userData.progress = (particle.userData.progress + speed) % 1;
      const point = circulationCurve.getPointAt(particle.userData.progress);
      particle.position.copy(point);
      particle.material.color.set(colorForPathPosition(particle.userData.progress));
      const pulse = 1 + Math.sin(elapsed * 4 + index * 0.4) * (0.05 + strength * 0.07);
      particle.scale.setScalar((0.72 + strength * 0.85) * pulse);
    });
  }

  Object.values(arrows).forEach((arrow, index) => {
    const pulse = 1 + Math.sin(elapsed * 2.6 + index) * (0.012 + strength * 0.026);
    arrow.group.scale.setScalar(pulse);
  });

  updateLabels();
  updateDiagnostics();
  renderer.render(scene, camera);
}

function makeTemperatureTexture(type, strength) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const base = type === "heat" ? "#6f2c22" : "#17385e";
  const mid = type === "heat" ? "#d9562d" : "#2386d8";
  const bright = type === "heat" ? "#ffd16b" : "#83e8ff";

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, base);
  gradient.addColorStop(0.45, mixColor(base, mid, 0.35 + strength * 0.5));
  gradient.addColorStop(1, mixColor(mid, bright, 0.25 + strength * 0.55));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalAlpha = 0.08 + strength * 0.18;
  for (let i = 0; i < 18; i += 1) {
    const x = (i / 17) * canvas.width;
    ctx.fillStyle = type === "heat" ? "#fff1c1" : "#d7f7ff";
    ctx.fillRect(x, 0, 2, canvas.height);
  }
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makePlumeTexture(type) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  const radial = ctx.createRadialGradient(128, 350, 12, 128, 260, 210);
  if (type === "heat") {
    radial.addColorStop(0, "rgba(255, 232, 150, 0.95)");
    radial.addColorStop(0.45, "rgba(255, 114, 52, 0.42)");
  } else {
    radial.addColorStop(0, "rgba(187, 241, 255, 0.8)");
    radial.addColorStop(0.45, "rgba(67, 166, 255, 0.36)");
  }
  radial.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makePressureDisk(color, opacity) {
  const group = new THREE.Group();
  const disk = new THREE.Mesh(
    new THREE.CircleGeometry(0.78, 64),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false })
  );
  disk.material.userData.baseOpacity = opacity;
  disk.rotation.x = -Math.PI / 2;

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.82, 0.9, 64),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: opacity + 0.18, side: THREE.DoubleSide })
  );
  ring.material.userData.baseOpacity = opacity + 0.18;
  ring.rotation.x = -Math.PI / 2;

  group.add(disk, ring);
  return group;
}

function makeArrow({ name, start, direction, length, color, baseRadius }) {
  const group = new THREE.Group();
  group.name = name;
  group.position.copy(start);
  group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 1, 24),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.18,
      roughness: 0.34,
      transparent: true,
      opacity: 1,
    })
  );
  shaft.material.userData.baseOpacity = 1;
  const head = new THREE.Mesh(
    new THREE.ConeGeometry(1, 1, 28),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.22,
      roughness: 0.34,
      transparent: true,
      opacity: 1,
    })
  );
  head.material.userData.baseOpacity = 1;

  group.add(shaft, head);
  const arrow = { group, shaft, head, length, baseRadius };
  updateArrowStrength(arrow, getStrength());
  return arrow;
}

function updateArrowStrength(arrow, strength) {
  const effective = 0.22 + strength * 0.78;
  const totalLength = arrow.length * effective;
  const headLength = Math.min(0.48 + strength * 0.18, totalLength * 0.36);
  const shaftLength = Math.max(totalLength - headLength, 0.1);
  const radius = arrow.baseRadius * (0.65 + strength * 1.15);

  arrow.shaft.scale.set(radius, shaftLength, radius);
  arrow.shaft.position.y = shaftLength / 2;
  arrow.head.scale.set(radius * 2.75, headLength, radius * 2.75);
  arrow.head.position.y = shaftLength + headLength / 2;

  arrow.shaft.material.opacity = 0.22 + strength * 0.78;
  arrow.head.material.opacity = 0.28 + strength * 0.72;
  arrow.shaft.material.userData.baseOpacity = 0.22 + strength * 0.78;
  arrow.head.material.userData.baseOpacity = 0.28 + strength * 0.72;
  arrow.shaft.material.emissiveIntensity = 0.08 + strength * 0.34;
  arrow.head.material.emissiveIntensity = 0.1 + strength * 0.42;
}

function setTargetOpacity(group, opacity) {
  if (!group) return;
  group.userData.targetOpacity = opacity;
  if (opacity > 0) {
    group.visible = true;
  }
}

function easeGroupOpacity(group, speed) {
  if (!group) return;
  const target = group.userData.targetOpacity ?? 1;
  const currentGroupOpacity = group.userData.currentOpacity ?? target;
  const nextGroupOpacity = THREE.MathUtils.lerp(currentGroupOpacity, target, speed);
  group.userData.currentOpacity = nextGroupOpacity;
  let visibleMaterial = false;

  group.traverse((object) => {
    if (!object.material) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      material.transparent = true;
      const baseOpacity = material.userData.baseOpacity ?? 1;
      material.opacity = baseOpacity * nextGroupOpacity;
      material.needsUpdate = true;
      if (material.opacity > 0.015) visibleMaterial = true;
    });
  });

  if (target <= 0 && !visibleMaterial) {
    group.visible = false;
  }
}

function addLabel(key, text, position, visibleStages, className) {
  const el = document.createElement("div");
  el.className = `scene-label ${className}`.trim();
  el.textContent = text;
  labelLayer.appendChild(el);
  labels.set(key, {
    el,
    position,
    visibleStages,
  });
}

function updateLabels() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  labels.forEach((item) => {
    const projected = item.position.clone().project(camera);
    const visible =
      state.labelsVisible &&
      item.visibleStages.includes(state.currentStage) &&
      projected.z > -1 &&
      projected.z < 1;

    const x = (projected.x * 0.5 + 0.5) * width;
    const y = (-projected.y * 0.5 + 0.5) * height;
    item.el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    item.el.style.opacity = visible ? "1" : "0";
  });
}

function colorForPathPosition(t) {
  if (t < 0.28) return new THREE.Color(0xff8442);
  if (t < 0.52) return new THREE.Color(0xcbb2ff);
  if (t < 0.76) return new THREE.Color(0x57bdff);
  return new THREE.Color(0xf8fbff);
}

function getStrength() {
  return THREE.MathUtils.clamp(state.deltaT / 20, 0, 1);
}

function getAspect() {
  return Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1);
}

function onResize() {
  camera.aspect = getAspect();
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
  updateLabels();
}

function mixColor(hexA, hexB, amount) {
  const a = new THREE.Color(hexA);
  const b = new THREE.Color(hexB);
  a.lerp(b, THREE.MathUtils.clamp(amount, 0, 1));
  return `#${a.getHexString()}`;
}
