import { useEffect, useRef, useState } from 'react';

interface GoldOrbProps {
  isTalking: boolean;
}

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

export function GoldOrb({ isTalking }: GoldOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastFrameRef = useRef(0);
  const talkScaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const [mobile] = useState(isMobile);

  useEffect(() => {
    targetScaleRef.current = isTalking ? 1.15 : 1;
  }, [isTalking]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;
    const centerX = size / 2;
    const centerY = size / 2;
    
    const targetFPS = mobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    const particleCount = mobile ? 10 : 20;

    const particles: { angle: number; radius: number; speed: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.random() * 40,
        speed: 0.005 + Math.random() * 0.01,
        size: 1 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.5,
      });
    }

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastFrameRef.current;
      
      if (elapsed < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameRef.current = timestamp - (elapsed % frameInterval);
      timeRef.current += 0.016;
      
      talkScaleRef.current += (targetScaleRef.current - talkScaleRef.current) * 0.15;
      
      ctx.clearRect(0, 0, size, size);
      
      const scale = talkScaleRef.current;
      const breathe = 1 + Math.sin(timeRef.current * 0.8) * 0.03;
      const totalScale = scale * breathe;
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(totalScale, totalScale);
      ctx.translate(-centerX, -centerY);
      
      const outerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 90);
      outerGlow.addColorStop(0, 'rgba(255, 180, 50, 0)');
      outerGlow.addColorStop(0.5, 'rgba(255, 150, 30, 0.1)');
      outerGlow.addColorStop(0.8, 'rgba(255, 120, 20, 0.05)');
      outerGlow.addColorStop(1, 'rgba(255, 100, 0, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
      ctx.fill();

      const coreGradient = ctx.createRadialGradient(centerX - 15, centerY - 15, 0, centerX, centerY, 55);
      coreGradient.addColorStop(0, 'rgba(255, 220, 150, 0.9)');
      coreGradient.addColorStop(0.3, 'rgba(255, 180, 80, 0.8)');
      coreGradient.addColorStop(0.6, 'rgba(255, 140, 40, 0.6)');
      coreGradient.addColorStop(1, 'rgba(255, 100, 20, 0.3)');
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(timeRef.current * 0.3);
      ctx.translate(-centerX, -centerY);
      
      for (let i = 0; i < 3; i++) {
        const ringOffset = i * (Math.PI * 2 / 3);
        ctx.beginPath();
        ctx.ellipse(
          centerX, 
          centerY, 
          45, 
          15, 
          timeRef.current * 0.2 + ringOffset, 
          0, 
          Math.PI * 2
        );
        const ringOpacity = 0.3 + Math.sin(timeRef.current + i) * 0.1;
        ctx.strokeStyle = `rgba(255, 200, 100, ${ringOpacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      ctx.restore();

      particles.forEach(p => {
        p.angle += p.speed;
        const x = centerX + Math.cos(p.angle + timeRef.current * 0.5) * p.radius;
        const y = centerY + Math.sin(p.angle + timeRef.current * 0.3) * p.radius * 0.6;
        
        const sparkle = 0.5 + Math.sin(timeRef.current * 3 + p.angle * 5) * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, p.size * sparkle, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 180, ${p.opacity * sparkle})`;
        ctx.fill();
      });

      ctx.restore();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="relative w-[200px] h-[200px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        data-testid="canvas-gold-orb"
      />
    </div>
  );
}
