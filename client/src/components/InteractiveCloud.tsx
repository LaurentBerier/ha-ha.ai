import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  baseAngle: number;
  basePhi: number;
  radius: number;
  color: string;
}

export function InteractiveCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveringRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const rotationYRef = useRef(0);
  const rotationSpeedRef = useRef(0.008);

  const initParticles = useCallback(() => {
    const colors = [
      'hsl(0, 72%, 51%)',
      'hsl(220, 70%, 50%)',
      'hsl(280, 70%, 50%)',
      'hsl(340, 70%, 50%)',
    ];

    const particles: Particle[] = [];
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      particles.push({
        baseAngle: theta,
        basePhi: phi,
        radius: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    for (let i = 0; i < 30; i++) {
      particles.push({
        baseAngle: Math.random() * Math.PI * 2,
        basePhi: Math.random() * Math.PI,
        radius: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let timeOffset = 0;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      timeOffset += 0.015;
      
      const targetSpeed = isHoveringRef.current ? 0.04 : 0.008;
      rotationSpeedRef.current += (targetSpeed - rotationSpeedRef.current) * 0.1;
      rotationYRef.current += rotationSpeedRef.current;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const sphereRadius = Math.min(width, height) * 0.32;

      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, sphereRadius * 1.5
      );
      gradient.addColorStop(0, 'rgba(220, 38, 38, 0.2)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      const rotX = Math.sin(timeOffset * 0.5) * 0.3;

      const transformedParticles = particlesRef.current.map((particle, index) => {
        const theta = particle.baseAngle + rotationYRef.current;
        const phi = particle.basePhi;

        const x3d = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y3d = sphereRadius * Math.cos(phi);
        const z3d = sphereRadius * Math.sin(phi) * Math.sin(theta);

        const y3dRotated = y3d * Math.cos(rotX) - z3d * Math.sin(rotX);
        const z3dRotated = y3d * Math.sin(rotX) + z3d * Math.cos(rotX);

        return {
          x: centerX + x3d,
          y: centerY + y3dRotated,
          z: z3dRotated,
          radius: particle.radius,
          color: particle.color,
          index,
          baseAngle: particle.baseAngle,
        };
      }).sort((a, b) => a.z - b.z);

      transformedParticles.forEach((p) => {
        const depth = (p.z + sphereRadius) / (sphereRadius * 2);
        const scale = 0.5 + depth * 0.5;
        const opacity = 0.3 + depth * 0.7;
        
        const pulseScale = 1 + Math.sin(timeOffset * 2 + p.baseAngle) * 0.2;
        const drawRadius = p.radius * scale * pulseScale;
        const gradientRadius = drawRadius * 2.5;

        if (gradientRadius <= 0) return;

        const particleGradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, gradientRadius
        );
        
        const colorMatch = p.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (colorMatch) {
          const [, h, s, l] = colorMatch;
          particleGradient.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${opacity})`);
          particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          particleGradient.addColorStop(0, p.color);
          particleGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, gradientRadius, 0, Math.PI * 2);
        ctx.fillStyle = particleGradient;
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < transformedParticles.length; i++) {
        const p = transformedParticles[i];
        for (let j = i + 1; j < Math.min(i + 6, transformedParticles.length); j++) {
          const other = transformedParticles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 40 && distance > 0) {
            const lineOpacity = (1 - distance / 40) * 0.25;
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
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        onMouseEnter={() => { isHoveringRef.current = true; }}
        onMouseLeave={() => { isHoveringRef.current = false; }}
        onTouchStart={() => { isHoveringRef.current = true; }}
        onTouchEnd={() => { isHoveringRef.current = false; }}
        className="cursor-pointer touch-none"
        data-testid="canvas-interactive-cloud"
      />
    </div>
  );
}
