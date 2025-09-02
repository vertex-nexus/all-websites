import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from "@mui/material/styles";
import { tokens } from '../Theme/themes';

interface IParticle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  life: number;
  alpha: number;
  age: number;
  rot: number;
  spin: number;
  grainPhase: number;
  swirlyness: number;
  colorOffset: number;
  dispersed: boolean;
  lifeDecay?: number;
  reset: (x: number, y: number, r: number, life: number) => void;
  step: (
    dt: number,
    pointer: { x: number; y: number; active: boolean; down: boolean; lastMove: number; influence: number },
    isHoveringCard: boolean,
    settings: ISettings
  ) => void;
  disperse: (centerX: number, centerY: number, force?: number) => void;
  draw: (ctx: CanvasRenderingContext2D, grainCanvas: HTMLCanvasElement | null, colors: any) => void;
}

interface ISettings {
  baseCount: number;
  densityMul: number;
  intensity: number;
  maxParticlesHard: number;
  particleSizeMin: number;
  particleSizeMax: number;
  lifeDecayMin: number;
  lifeDecayMax: number;
  swirl: number;
  glowRadius: number;
  glowStrength: number;
  fpsTarget: number;
  dispersalForce: number;
  dispersalRadius: number;
  dispersalCount: number;
}

interface IMousePosition {
  x: number;
  y: number;
  lastMove: number;
}

const AuroraBackground = ({ mousePositionRef }: { mousePositionRef: React.RefObject<IMousePosition> }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isHoveringCard] = useState(false);

  const settings: ISettings = {
    baseCount: 120,
    densityMul: 0.7,
    intensity: 1.2,
    maxParticlesHard: 1000,
    particleSizeMin: 0.1,
    particleSizeMax: 0.6,
    lifeDecayMin: 0.0008,
    lifeDecayMax: 0.0028,
    swirl: 1.8,
    glowRadius: 120,
    glowStrength: 1.0,
    fpsTarget: 60,
    dispersalForce: 8.0, // Increased from 2.5 for much stronger dispersal
    dispersalRadius: 400, // Increased from 250 for wider effect area
    dispersalCount: 50 // Increased from 30 for more particles affected
  };

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const dimensionsRef = useRef({ W: 0, H: 0 });
  const rafRef = useRef<number | null>(null);
  const frameStatsRef = useRef({ lastFrameTime: 0, frameCount: 0, fps: 0, adaptCounter: 0 });
  const particleSystemRef = useRef<{ particlePool: IParticle[]; activeParticles: IParticle[] }>({ particlePool: [], activeParticles: [] });
  const grainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false, down: false, lastMove: 0, influence: 0 });
  const lastNowRef = useRef(0);

  class Particle implements IParticle {
    x = 0;
    y = 0;
    r = 0;
    vx = 0;
    vy = 0;
    life = 0;
    alpha = 0;
    age = 0;
    rot = 0;
    spin = 0;
    grainPhase = 0;
    swirlyness = 0;
    colorOffset = 0;
    dispersed = false;
    lifeDecay = 0;

    constructor() {
      this.reset(0, 0, 0, 0);
    }

    reset(x: number, y: number, r: number, life: number) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.life = life;
      this.alpha = 0.96 * (0.7 + Math.random() * 0.5);
      this.age = 0;
      this.rot = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.03;
      this.grainPhase = Math.random();
      this.swirlyness = 0.9 + Math.random() * 0.7;
      this.colorOffset = Math.random();
    }

    step(dt: number, pointer: any, isHoveringCard: boolean, settings: ISettings) {
      // Reduced friction for dispersed particles to maintain momentum longer
      const friction = this.dispersed ? 0.995 : 0.98;
      this.vx *= friction;
      this.vy *= friction;
      this.vy -= 0.0006 * dt * (0.6 + Math.random() * 1.0);
      this.rot += this.spin;

      if (!this.dispersed) {
        const dx = this.x - pointer.x;
        const dy = this.y - pointer.y;
        const dist = Math.hypot(dx, dy) + 0.0001;
        const ndx = dx / dist;
        const ndy = dy / dist;
        const influenceFactor = isHoveringCard ? 0.15 : pointer.influence;
        const influence = Math.max(0, (settings.glowRadius - dist) / settings.glowRadius) * influenceFactor;

        if (influence > 0) {
          const perpX = -ndy;
          const perpY = ndx;
          const strength = (0.05 + 0.07 * Math.random()) * settings.intensity * influence * this.swirlyness;
          
          this.vx += perpX * strength * settings.swirl;
          this.vy += perpY * strength * settings.swirl;
          
          this.vx -= ndx * strength * 0.2;
          this.vy -= ndy * strength * 0.2;
        }
        
        const randomWalkX = (Math.random() - 0.5) * 0.002;
        const randomWalkY = (Math.random() - 0.5) * 0.002;
        this.vx += randomWalkX;
        this.vy += randomWalkY;
      }
 if (this.dispersed) {
    this.radiusScale -= dt * 0.5; // Slowly reduce the scale over time
    this.radiusScale = Math.max(1.0, this.radiusScale); // Don't let it go below 1.0
  }
      this.x += this.vx * dt * 68;
      this.y += this.vy * dt * 68;

      const sway = Math.sin((this.age + this.grainPhase) * 0.8) * 0.05;
      this.x += sway * dt * 38;

      this.age += dt * 0.6;
      this.life -= (this.lifeDecay || 0.002) * dt * 68;

      if (this.life <= 0.01 || this.alpha < 0.05) {
        this.reset(pointer.x + (Math.random() - 0.5) * settings.glowRadius, pointer.y + (Math.random() - 0.5) * settings.glowRadius, this.r, 1.0);
      }
    }

    radiusScale = 1.0;
    disperse(centerX: number, centerY: number, force = 1.0) {
      const dx = this.x - centerX;
      const dy = this.y - centerY;
      const dist = Math.hypot(dx, dy) + 0.0001;
      const ndx = dx / dist;
      const ndy = dy / dist;
      
      // Increased angle randomness for more varied dispersal directions
      const angle = Math.atan2(ndy, ndx) + (Math.random() - 0.5) * 1.2;
      
      // Much stronger dispersal force with distance-based scaling
      const distanceMultiplier = Math.max(0.3, 1 - (dist / settings.dispersalRadius));
      const dispersalStrength = force * settings.dispersalForce * (1.2 + Math.random() * 0.8) * distanceMultiplier;
      
      this.vx += Math.cos(angle) * dispersalStrength;
      this.vy += Math.sin(angle) * dispersalStrength;
      
      // Increased vertical and horizontal variation
      this.vy -= Math.random() * 2.5;
      this.vx += (Math.random() - 0.5) * 1.8;
      
      this.radiusScale = 12.2; // Set the scale instead of directly changing the radius
      this.dispersed = true;
      this.life = Math.min(1.0, this.life + 1.5); // Extended life for dispersed particles
      this.alpha = Math.min(1.0, this.alpha + 0.3);
      this.spin *= 12.0; // More dramatic spin on dispersal
      // Make dispersed particles bigger and more visible
      this.r *= 1.5;
    }

    draw(ctx: CanvasRenderingContext2D, grainCanvas: HTMLCanvasElement | null, colors: any) {
      const alpha = Math.max(0, this.alpha * Math.min(1, this.life));
      if (alpha <= 0.03) return;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      if (grainCanvas) {
         ctx.beginPath();
  ctx.arc(0, 0, this.r * this.radiusScale * 8, 0, Math.PI * 2);
  ctx.fill();
      } else {
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.r * 8);
        
        g.addColorStop(0, colors.secondary[500]);
        g.addColorStop(0.6, colors.secondary[400]);
        g.addColorStop(1, colors.secondary[900]);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, this.r * 8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  const initPool = useCallback((size: number) => {
    particleSystemRef.current.particlePool = [];
    particleSystemRef.current.activeParticles = [];
    for (let i = 0; i < size; i++) {
      particleSystemRef.current.particlePool.push(new Particle());
    }
  }, []);

  const spawnParticle = useCallback((x: number, y: number, hintR: number | null = null) => {
    const { particlePool, activeParticles } = particleSystemRef.current;
    if (particlePool.length === 0) {
      if (activeParticles.length > 0) {
        const p = activeParticles.shift();
        if (p) {
          p.reset(
            x,
            y,
            hintR ?? Math.random() * (settings.particleSizeMax - settings.particleSizeMin) + settings.particleSizeMin,
             1.0 + Math.random() * 0.6
          );
          activeParticles.push(p);
        }
        return p;
      }
      return null;
    }
    const p = particlePool.pop();
    if (p) {
      p.reset(
        x,
        y,
        hintR ?? Math.random() * (settings.particleSizeMax - settings.particleSizeMin) + settings.particleSizeMin,
        1.0 + Math.random() * 0.6
      );
      activeParticles.push(p);
    }
    return p;
  }, [settings]);

  const reclaimParticle = useCallback((p: IParticle) => {
    particleSystemRef.current.particlePool.push(p);
  }, []);

  const renderBackground = useCallback((ctx: CanvasRenderingContext2D, colors: any) => {
    if (!ctx) return;
    const { W, H } = dimensionsRef.current;
    ctx.save();
    ctx.fillStyle = colors.primary[900];
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }, [colors]);

  const renderMouseGlow = useCallback(
    (ctx: CanvasRenderingContext2D, pointer: any, colors: any) => {
      if (!ctx) return;
      const glowFactor = Math.max(0.15, pointer.influence);
      const radius = settings.glowRadius * glowFactor;
      const strength = settings.glowStrength * glowFactor;
      const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, radius);
      
      g.addColorStop(0, `${colors.secondary[500]}${Math.round(0.12 * strength * 255).toString(16).padStart(2, '0')}`);
      g.addColorStop(0.3, `${colors.secondary[500]}${Math.round(0.1 * strength * 255).toString(16).padStart(2, '0')}`);
      g.addColorStop(0.6, `${colors.secondary[500]}${Math.round(0.08 * strength * 255).toString(16).padStart(2, '0')}`);
      g.addColorStop(1, `${colors.secondary[900]}${Math.round(0 * 255).toString(16).padStart(2, '0')}`);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    },
    [settings.glowRadius, settings.glowStrength, colors]
  );

  const renderLoop = useCallback(
    (now: number) => {
      if (!isClient) {
        rafRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      const dt = Math.min(0.033, (now - lastNowRef.current) / 1000);
      lastNowRef.current = now;

      const ctx = ctxRef.current;
      if (!ctx) {
        rafRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      const { W, H } = dimensionsRef.current;
      const { particlePool, activeParticles } = particleSystemRef.current;
      const pointer = pointerRef.current;
      const mouseData = mousePositionRef.current;

      if (mouseData) {
        pointer.x = mouseData.x;
        pointer.y = mouseData.y;
        pointer.active = true;
      pointerRef.current.influence = 0.5; // Max influence on click
   }

      renderBackground(ctx, colors);

      if (pointer.active) {
        renderMouseGlow(ctx, pointer, colors);
      }

      const targetCount = Math.min(settings.maxParticlesHard, Math.round(settings.baseCount * settings.densityMul));
      if (particlePool.length + activeParticles.length < targetCount) {
        const need = targetCount - (particlePool.length + activeParticles.length);
        for (let i = 0; i < need; i++) particlePool.push(new Particle());
      }

      const spawnRate = Math.max(2, Math.round(targetCount * 0.007 * settings.intensity));
      for (let i = 0; i < spawnRate; i++) {
        if (Math.random() < 0.35) {
          spawnParticle(Math.random() * W, Math.random() * H);
        } else if (pointer.active && Math.random() < 0.75) {
          const jitter = settings.glowRadius * 0.8;
          spawnParticle(pointer.x + (Math.random() - 0.5) * jitter, pointer.y + (Math.random() - 0.5) * jitter);
        }
      }

      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        p.step(dt, pointer, isHoveringCard, settings);
        if (p.life <= 0.01) {
          const removed = activeParticles.splice(i, 1)[0];
          reclaimParticle(removed);
          continue;
        }
        p.draw(ctx, grainCanvasRef.current, colors);
      }

      rafRef.current = requestAnimationFrame(renderLoop);
    },
    [isClient, renderBackground, renderMouseGlow, spawnParticle, reclaimParticle, isHoveringCard, settings, colors]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timer = setTimeout(() => {
      if (!isClient) return;

      const canvas = canvasRef.current;
      const ratio = Math.max(1, window.devicePixelRatio || 1);
      const W = rootRef.current?.offsetWidth || 0;
      const H = rootRef.current?.offsetHeight || 0;
      dimensionsRef.current = { W, H };

      if (canvas) {
        canvas.width = Math.floor(W * ratio);
        canvas.height = Math.floor(H * ratio);
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;

        const context = canvas.getContext('2d', { alpha: true });
        if (context) {
          ctxRef.current = context;
          ctxRef.current.setTransform(ratio, 0, 0, ratio, 0, 0);
        }
      }

      initPool(Math.max(450, Math.round(settings.baseCount * 2.8)));
      lastNowRef.current = performance.now();
      frameStatsRef.current.lastFrameTime = performance.now();
      rafRef.current = requestAnimationFrame(renderLoop);
    }, 100);

    return () => clearTimeout(timer);
  }, [isClient, initPool, renderLoop, settings.baseCount, colors]);

  useEffect(() => {
  const handleMouseDown = (event: MouseEvent) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const clickX = (event.clientX - rect.left) * scaleX;
  const clickY = (event.clientY - rect.top) * scaleY;

  // ✅ Force spawn more particles near click
  for (let i = 0; i < 40; i++) {
    spawnParticle(
      clickX + (Math.random() - 0.5) * settings.glowRadius * 0.6,
      clickY + (Math.random() - 0.5) * settings.glowRadius * 0.6
    );
  }

  const { activeParticles } = particleSystemRef.current;
  let dispersedCount = 0;

  for (const p of activeParticles) {
    if (dispersedCount >= settings.dispersalCount) break;
    const dist = Math.hypot(p.x - clickX, p.y - clickY);
    if (dist < settings.dispersalRadius) {
      p.disperse(clickX, clickY);
      dispersedCount++;
    }
  }
};


    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [settings.dispersalCount, settings.dispersalRadius]);

  return (
    <div
      ref={rootRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        zIndex: -1,
        background: colors.primary[900],
        pointerEvents: 'none'
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

export default AuroraBackground;