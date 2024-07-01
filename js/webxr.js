// Variáveis globais para WebXR
let xrSession = null;
let xrRefSpace = null;

// Função para iniciar a sessão WebXR
async function initXR() {
  if (!navigator.xr) {
    console.error('WebXR não está disponível no seu navegador.');
    return;
  }

  try {
    // Solicitar uma sessão XR
    xrSession = await navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test']
    });

    // Configurar a câmera do Three.js com a câmera XR
    const gl = renderer.getContext();
    gl.xrCompatible = true;
    const xrLayer = new XRWebGLLayer(gl, xrSession);
    xrSession.updateRenderState({ baseLayer: xrLayer });

    // Adicionar a câmera XR ao Three.js
    const xrReferenceSpace = await xrSession.requestReferenceSpace('local');
    const xrViewerPose = await xrSession.requestAnimationFrame(onXRFrame);

    // Atualizar a posição da câmera Three.js com a câmera XR
    camera.projectionMatrix.fromArray(xrViewerPose.views[0].projectionMatrix);
    camera.matrixAutoUpdate = false;

    // Iniciar o loop de renderização XR
    xrSession.requestAnimationFrame(onXRFrame);
  } catch (error) {
    console.error('Falha ao iniciar a sessão XR:', error);
  }
}

// Função de atualização de quadro XR
function onXRFrame(timestamp, frame) {
  const pose = frame.getViewerPose(xrRefSpace);
  if (pose) {
    const view = pose.views[0];
    const viewport = xrSession.renderState.baseLayer.getViewport(view);
    renderer.setSize(viewport.width, viewport.height);

    camera.matrix.fromArray(view.transform.matrix);
    camera.projectionMatrix.fromArray(view.projectionMatrix);
    camera.updateMatrixWorld(true);

    // Atualizar a cena Three.js e renderizar
    renderer.render(scene, camera);

    // Continuar o loop de renderização XR
    xrSession.requestAnimationFrame(onXRFrame);
  }
}

// Iniciar a sessão WebXR ao carregar a página
window.addEventListener('DOMContentLoaded', initXR);
