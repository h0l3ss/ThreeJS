// Variáveis globais para Three.js
let scene, camera, renderer;
let cube;

// Função de inicialização da cena Three.js
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Exemplo: adicionar um cubo como objeto 3D
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  animate();
}

// Função para animar a cena (renderização contínua)
function animate() {
  renderer.setAnimationLoop(render);
}

// Função de renderização da cena
function render() {
  renderer.render(scene, camera);
}

// Iniciar a aplicação ao carregar a página
window.addEventListener('DOMContentLoaded', init);
