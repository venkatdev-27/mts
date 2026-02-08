import React, { useEffect, useState, useRef } from 'react';
import { Stat } from '../types';

const stats: Stat[] = [
  { label: 'Projects Delivered', value: 500, suffix: '+' },
  { label: 'Happy Students', value: 300, suffix: '+' },
  { label: 'Latest Technologies', value: 50, suffix: '+' },
  { label: 'Years Experience', value: 5, suffix: '+' },
];

const CountUp: React.FC<{ end: number; duration: number; suffix: string }> = ({ end, duration, suffix }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      
      const currentCount = Math.floor(easeOutQuart(percentage) * end);
      
      setCount(currentCount);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const request = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(request);
  }, [end, duration, hasStarted]);

  return (
    <span ref={elementRef} className="text-4xl md:text-5xl font-extrabold text-primary-600 block mb-2">
      {count}{suffix}
    </span>
  );
};

const StatsCounter: React.FC = () => {
  return (
    <div className="bg-primary-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 rounded-lg">
              <CountUp end={stat.value} duration={2000} suffix={stat.suffix} />
              <p className="text-lg font-medium text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;