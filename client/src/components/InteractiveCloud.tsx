import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  originalColor: string;
}

export function InteractiveCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isOver: false });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      const container = canvas.parentElement;
      if (container) {
        const size = Math.min(container.clientWidth, 500);
        setDimensions({ width: size, height: size });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const colors = {
      primary: 'hsl(0, 72%, 51%)',
      secondary: 'hsl(220, 70%, 50%)',
      accent1: 'hsl(280, 70%, 50%)',
      accent2: 'hsl(340, 70%, 50%)',
    };

    const colorArray = [colors.primary, colors.secondary, colors.accent1, colors.accent2];

    const initParticles = () => {
      const particles: Particle[] = [];
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const particleCount = 120;

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const radius = 80 + Math.random() * 60;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const color = colorArray[Math.floor(Math.random() * colorArray.length)];

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: 2 + Math.random() * 4,
          color,
          originalColor: color,
        });
      }

      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 50;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const color = colorArray[Math.floor(Math.random() * colorArray.length)];

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          radius: 3 + Math.random() * 5,
          color,
          originalColor: color,
        });
      }

      particlesRef.current = particles;
    };

    initParticles();

    const animate = () => {
      timeRef.current += 0.02;
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 180
      );
      gradient.addColorStop(0, 'rgba(220, 38, 38, 0.15)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 180, 0, Math.PI * 2);
      ctx.fill();

      particlesRef.current.forEach((particle, index) => {
        const floatX = Math.sin(timeRef.current + index * 0.1) * 8;
        const floatY = Math.cos(timeRef.current * 0.8 + index * 0.1) * 8;

        let targetX = particle.baseX + floatX;
        let targetY = particle.baseY + floatY;

        if (mouseRef.current.isOver) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 120;

          if (distance < maxDistance && distance > 1) {
            const force = (1 - distance / maxDistance) * 40;
            targetX += (dx / distance) * force;
            targetY += (dy / distance) * force;
          }
        }

        particle.vx += (targetX - particle.x) * 0.08;
        particle.vy += (targetY - particle.y) * 0.08;
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const pulseScale = 1 + Math.sin(timeRef.current * 2 + index * 0.2) * 0.3;
        const drawRadius = particle.radius * pulseScale;

        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, drawRadius * 2
        );
        particleGradient.addColorStop(0, particle.color);
        particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, drawRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'lighter';
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            const opacity = (1 - distance / 50) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [dimensions.width, dimensions.height]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isOver: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isOver = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
      isOver: true,
    };
  };

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 rounded-full blur-3xl animate-pulse" />
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        className="relative z-10 cursor-pointer touch-none"
        data-testid="canvas-interactive-cloud"
      />
    </div>
  );
}
