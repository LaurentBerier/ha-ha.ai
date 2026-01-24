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

export function InteractiveCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [size, setSize] = useState({ width: 300, height: 300 });

  const initParticles = useCallback((width: number, height: number) => {
    const colors = [
      'hsl(220, 70%, 55%)',
      'hsl(210, 80%, 60%)',
      'hsl(200, 75%, 50%)',
      'hsl(0, 0%, 100%)',
    ];

    const particles: Particle[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const cloudRadius = Math.min(width, height) * 0.28;

    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60;
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
        radius: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < 40; i++) {
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
        radius: 3 + Math.random() * 4,
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
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = size.width;
    const height = size.height;
    if (width === 0 || height === 0) return;

    const centerX = width / 2;
    const centerY = height / 2;

    initParticles(width, height);

    const animate = () => {
      timeRef.current += 0.02;
      ctx.clearRect(0, 0, width, height);

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

      shockwavesRef.current = shockwavesRef.current.filter(wave => {
        wave.radius += 4;
        wave.opacity -= 0.015;
        
        if (wave.opacity <= 0) return false;

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${wave.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        const innerGradient = ctx.createRadialGradient(
          wave.x, wave.y, wave.radius * 0.8,
          wave.x, wave.y, wave.radius
        );
        innerGradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
        innerGradient.addColorStop(1, `rgba(147, 197, 253, ${wave.opacity * 0.3})`);
        ctx.fillStyle = innerGradient;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      particlesRef.current.forEach((particle) => {
        const floatX = Math.sin(timeRef.current + particle.phase) * 8;
        const floatY = Math.cos(timeRef.current * 0.7 + particle.phase) * 8;
        const breathe = Math.sin(timeRef.current * 0.5 + particle.phase * 0.5) * 5;

        const dx = particle.baseX - centerX;
        const dy = particle.baseY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const breatheX = dist > 0 ? (dx / dist) * breathe : 0;
        const breatheY = dist > 0 ? (dy / dist) * breathe : 0;

        let targetX = particle.baseX + floatX + breatheX;
        let targetY = particle.baseY + floatY + breatheY;

        shockwavesRef.current.forEach(wave => {
          const pdx = particle.x - wave.x;
          const pdy = particle.y - wave.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          
          if (pdist > 0 && Math.abs(pdist - wave.radius) < 30) {
            const force = wave.opacity * 15;
            targetX += (pdx / pdist) * force;
            targetY += (pdy / pdist) * force;
          }
        });

        particle.vx += (targetX - particle.x) * 0.08;
        particle.vy += (targetY - particle.y) * 0.08;
        particle.vx *= 0.92;
        particle.vy *= 0.92;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const pulseScale = 1 + Math.sin(timeRef.current * 1.5 + particle.phase) * 0.15;
        const drawRadius = particle.radius * pulseScale;
        const gradientRadius = drawRadius * 2.5;

        if (gradientRadius <= 0) return;

        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, gradientRadius
        );
        
        const colorMatch = particle.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (colorMatch) {
          const [, h, s, l] = colorMatch;
          particleGradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, 0.8)`);
          particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          particleGradient.addColorStop(0, particle.color);
          particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, gradientRadius, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        for (let j = i + 1; j < Math.min(i + 8, particlesRef.current.length); j++) {
          const other = particlesRef.current[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50 && distance > 0) {
            const lineOpacity = (1 - distance / 50) * 0.2;
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

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [size, initParticles]);

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
