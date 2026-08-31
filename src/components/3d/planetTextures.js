import * as THREE from 'three';

// Cache generated textures
const textureCache = {};

function createNoiseCanvas(width, height, drawFn) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// 1. Sun Texture
export function getSunTexture() {
  if (textureCache.sun) return textureCache.sun;
  
  textureCache.sun = createNoiseCanvas(1024, 512, (ctx, w, h) => {
    // Base radial gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#ff4500');
    grad.addColorStop(0.3, '#ff8c00');
    grad.addColorStop(0.5, '#ffd700');
    grad.addColorStop(0.7, '#ff8c00');
    grad.addColorStop(1, '#ff3700');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Solar granulization & spots
    for (let i = 0; i < 1500; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 8 + 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 255, 200, 0.4)' : 'rgba(180, 40, 0, 0.35)';
      ctx.fill();
    }
  });

  return textureCache.sun;
}

// 2. Earth Texture (Continents & Oceans)
export function getEarthTexture() {
  if (textureCache.earth) return textureCache.earth;

  textureCache.earth = createNoiseCanvas(1024, 512, (ctx, w, h) => {
    // Deep blue ocean base
    ctx.fillStyle = '#0f387a';
    ctx.fillRect(0, 0, w, h);

    // Ocean depth variations
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = 'rgba(10, 40, 110, 0.2)';
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 40 + 10, 0, Math.PI * 2);
      ctx.fill();
    }

    // Continents
    const continentColors = ['#2e7d32', '#388e3c', '#1b5e20', '#4caf50', '#8d6e63', '#d7ccc8'];
    for (let i = 0; i < 120; i++) {
      const cx = Math.random() * w;
      const cy = Math.random() * (h * 0.75) + h * 0.12;
      const size = Math.random() * 90 + 30;
      
      for (let j = 0; j < 12; j++) {
        ctx.fillStyle = continentColors[Math.floor(Math.random() * continentColors.length)];
        ctx.beginPath();
        const offsetX = (Math.random() - 0.5) * size;
        const offsetY = (Math.random() - 0.5) * size * 0.6;
        ctx.ellipse(cx + offsetX, cy + offsetY, Math.random() * 35 + 10, Math.random() * 25 + 10, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Polar ice caps
    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, w, h * 0.08);
    ctx.fillRect(0, h * 0.92, w, h * 0.08);
  });

  return textureCache.earth;
}

// 3. Clouds Texture (for Earth atmosphere layer)
export function getCloudsTexture() {
  if (textureCache.clouds) return textureCache.clouds;

  textureCache.clouds = createNoiseCanvas(1024, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';

    for (let i = 0; i < 300; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const rw = Math.random() * 120 + 30;
      const rh = Math.random() * 25 + 5;
      
      ctx.beginPath();
      ctx.ellipse(x, y, rw, rh, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.3})`;
      ctx.fill();
    }
  });

  return textureCache.clouds;
}

// 4. Jupiter Banded Texture + Great Red Spot
export function getJupiterTexture() {
  if (textureCache.jupiter) return textureCache.jupiter;

  textureCache.jupiter = createNoiseCanvas(1024, 512, (ctx, w, h) => {
    const colors = [
      '#a57c58', '#d6b896', '#8c5836', '#e0c7a8', 
      '#7b4625', '#c49a6c', '#ebd8be', '#935d37'
    ];
    
    // Draw horizontal cloud bands with turbulent noise
    let y = 0;
    while (y < h) {
      const bandHeight = Math.random() * 20 + 8;
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(0, y, w, bandHeight);
      y += bandHeight;
    }

    // Add atmospheric swirls
    for (let i = 0; i < 300; i++) {
      const sx = Math.random() * w;
      const sy = Math.random() * h;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(80, 30, 10, 0.2)';
      ctx.beginPath();
      ctx.ellipse(sx, sy, Math.random() * 60 + 20, Math.random() * 8 + 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Great Red Spot
    ctx.fillStyle = '#b73212';
    ctx.beginPath();
    ctx.ellipse(w * 0.65, h * 0.62, 50, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#db4c2a';
    ctx.beginPath();
    ctx.ellipse(w * 0.65, h * 0.62, 35, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  return textureCache.jupiter;
}

// 5. Mars Texture
export function getMarsTexture() {
  if (textureCache.mars) return textureCache.mars;

  textureCache.mars = createNoiseCanvas(512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#b24419';
    ctx.fillRect(0, 0, w, h);

    const shades = ['#8c300f', '#cc5422', '#691e05', '#d46533'];
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = shades[Math.floor(Math.random() * shades.length)];
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 35 + 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Polar caps
    ctx.fillStyle = '#f0e0d6';
    ctx.fillRect(0, 0, w, h * 0.06);
    ctx.fillRect(0, h * 0.94, w, h * 0.06);
  });

  return textureCache.mars;
}

// 6. Venus Texture
export function getVenusTexture() {
  if (textureCache.venus) return textureCache.venus;

  textureCache.venus = createNoiseCanvas(512, 256, (ctx, w, h) => {
    ctx.fillStyle = '#e3bb76';
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 235, 180, 0.25)' : 'rgba(180, 120, 50, 0.2)';
      ctx.beginPath();
      ctx.ellipse(Math.random() * w, Math.random() * h, Math.random() * 90 + 20, Math.random() * 15 + 4, (Math.random() - 0.5) * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  return textureCache.venus;
}

// 7. Saturn Ring Texture
export function getSaturnRingTexture() {
  if (textureCache.saturnRing) return textureCache.saturnRing;

  textureCache.saturnRing = createNoiseCanvas(512, 64, (ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0.0, 'rgba(0,0,0,0)');
    grad.addColorStop(0.1, 'rgba(215, 185, 135, 0.8)');
    grad.addColorStop(0.25, 'rgba(180, 150, 105, 0.9)');
    grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.1)'); // Cassini division
    grad.addColorStop(0.5, 'rgba(230, 205, 160, 0.95)');
    grad.addColorStop(0.75, 'rgba(200, 170, 125, 0.7)');
    grad.addColorStop(0.9, 'rgba(160, 130, 95, 0.4)');
    grad.addColorStop(1.0, 'rgba(0,0,0,0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });

  return textureCache.saturnRing;
}
