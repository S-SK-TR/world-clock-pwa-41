import { useState, useEffect, useRef } from 'react';
import { format, addHours } from 'date-fns';
import { Timezone } from '../../shared/types/timezone';

interface ClockProps {
  timezone: Timezone;
}

export const Clock = ({ timezone }: ClockProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(new Date());
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock(); // İlk çağrı

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9;

    const drawClock = () => {
      // Saat arka planı
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f3f4f6';
      ctx.fill();
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Saat işaretleri
      for (let i = 0; i < 12; i++) {
        const angle = (i - 3) * (Math.PI * 2) / 12;
        const x1 = centerX + Math.cos(angle) * radius * 0.85;
        const y1 = centerY + Math.sin(angle) * radius * 0.85;
        const x2 = centerX + Math.cos(angle) * radius;
        const y2 = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = i % 3 === 0 ? 3 : 1;
        ctx.stroke();
      }

      // Zaman dilimi ofseti uygula
      const localTime = addHours(currentTime, timezone.offset);

      // Saat işaretleri
      const hour = localTime.getHours() % 12;
      const minute = localTime.getMinutes();
      const second = localTime.getSeconds();

      // Saat işareti
      const hourAngle = (hour + minute / 60) * (Math.PI * 2) / 12 - Math.PI / 2;
      const hourX = centerX + Math.cos(hourAngle) * radius * 0.5;
      const hourY = centerY + Math.sin(hourAngle) * radius * 0.5;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(hourX, hourY);
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Dakika işareti
      const minuteAngle = (minute + second / 60) * (Math.PI * 2) / 60 - Math.PI / 2;
      const minuteX = centerX + Math.cos(minuteAngle) * radius * 0.7;
      const minuteY = centerY + Math.sin(minuteAngle) * radius * 0.7;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(minuteX, minuteY);
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Saniye işareti
      const secondAngle = second * (Math.PI * 2) / 60 - Math.PI / 2;
      const secondX = centerX + Math.cos(secondAngle) * radius * 0.7;
      const secondY = centerY + Math.sin(secondAngle) * radius * 0.7;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(secondX, secondY);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Merkez nokta
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
    };

    const animate = () => {
      drawClock();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      // Cleanup
    };
  }, [currentTime, timezone]);

  return (
    <div className="clock">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="clock-face"
      />
      <div className="clock-info">
        <h3>{timezone.name}</h3>
        <p>{timezone.city}</p>
        <p className="time-display">
          {format(addHours(currentTime, timezone.offset), 'HH:mm:ss')}
        </p>
      </div>
    </div>
  );
};