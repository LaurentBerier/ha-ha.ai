import { useEffect, useRef, useCallback, useState } from 'react';

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

export function InteractiveCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);
  const [size, setSize] = useState({ width: 300, height: 300 });
  const [mobile, setMobile] = useState(false);

  const initParticles = useCallback((width: number, height: number, isMobileDevice: boolean) => {
    const colors = [
      'rgba(96, 165, 250, 0.8)',
      'rgba(59, 130, 246, 0.8)',
      'rgba(37, 99, 235, 0.8)',
      'rgba(255, 255, 255, 0.9)',
    ];

    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const cloudRadius = Math.min(width, height) * 0.28;

    const outerCount = isMobileDevice ? 25 : 60;
    const innerCount = isMobileDevice ? 15 : 40;

    for (let i = 0; i < outerCount; i++) {
      const angle = (Math.PI * 2 * i) / outerCount;
      const r = cloudRadius * (0.6 + Math.random() * 0.4);
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      
      particles.push({
        baseX: x,
        baseY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        radius: isMobileDevice ? 3 + Math.random() * 2 : 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < innerCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * cloudRadius * 0.7;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      
      particles.push({
        baseX: x,
        baseY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        radius: isMobileDevice ? 4 + Math.random() * 3 : 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  const triggerShockwave = useCallback((x: number, y: number) => {
    shockwavesRef.current.push({
      x,
      y,
      radius: 0,
      maxRadius: 150,
      opacity: 0.6,
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const newSize = Math.floor(Math.min(rect.width, rect.height));
      if (newSize > 0) {
        setSize({ width: newSize, height: newSize });
      }
      setMobile(isMobile());
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const width = size.width;
    const height = size.height;
    if (width === 0 || height === 0) return;

    const centerX = width / 2;
    const centerY = height / 2;
    const isMobileDevice = mobile;
    const targetFPS = isMobileDevice ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    initParticles(width, height, isMobileDevice);

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastFrameRef.current;
      
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameRef.current = timestamp - (elapsed % frameInterval);
      timeRef.current += 0.02;
      
      ctx.clearRect(0, 0, width, height);

      if (!isMobileDevice) {
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, width * 0.35
        );
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
        gradient.addColorStop(0.5, 'rgba(96, 165, 250, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, width * 0.45, 0, Math.PI * 2);
        ctx.fill();
      }

      shockwavesRef.current = shockwavesRef.current.filter(wave => {
        wave.radius += 4;
        wave.opacity -= 0.02;
        
        if (wave.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${wave.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        return true;
      });

      const particles = particlesRef.current;
      const time = timeRef.current;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const floatX = Math.sin(time + particle.phase) * 6;
        const floatY = Math.cos(time * 0.7 + particle.phase) * 6;

        let targetX = particle.baseX + floatX;
        let targetY = particle.baseY + floatY;

        const waves = shockwavesRef.current;
        for (let w = 0; w < waves.length; w++) {
          const wave = waves[w];
          const pdx = particle.x - wave.x;
          const pdy = particle.y - wave.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          
          if (pdist > 0 && Math.abs(pdist - wave.radius) < 30) {
            const force = wave.opacity * 12;
            targetX += (pdx / pdist) * force;
            targetY += (pdy / pdist) * force;
          }
        }

        particle.vx += (targetX - particle.x) * 0.1;
        particle.vy += (targetY - particle.y) * 0.1;
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      }

      if (!isMobileDevice) {
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < particles.length; i += 2) {
          const p = particles[i];
          for (let j = i + 2; j < Math.min(i + 6, particles.length); j += 2) {
            const other = particles[j];
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 2500) {
              const lineOpacity = (1 - Math.sqrt(distSq) / 50) * 0.15;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [size, mobile, initParticles]);

  const handleInteraction = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if ('touches' in e) {
      x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
      y = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
    } else {
      x = (e.clientX - rect.left) * (canvas.width / rect.width);
      y = (e.clientY - rect.top) * (canvas.height / rect.height);
    }

    triggerShockwave(x, y);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={size.width}
        height={size.height}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        className="cursor-pointer touch-none"
        style={{ width: size.width, height: size.height }}
        data-testid="canvas-interactive-cloud"
      />
    </div>
  );
}
