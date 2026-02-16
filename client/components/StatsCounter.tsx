import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Users, Briefcase, Star, Lightbulb } from 'lucide-react';

const stats = [
  {
    id: 1,
    label: "Members Joined",
    value: 2000,
    suffix: "+",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-100"
  },
  {
    id: 2,
    label: "Placements Given",
    value: 700,
    suffix: "+",
    icon: Briefcase,
    color: "text-green-600",
    bg: "bg-green-100"
  },
  {
    id: 3,
    label: "Average Rating",
    value: 4.8,
    suffix: "/5",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    isDecimal: true
  },
  {
    id: 4,
    label: "Hiring Partners",
    value: 120,
    suffix: "+",
    icon: Lightbulb,
    color: "text-purple-600",
    bg: "bg-purple-100"
  }
];

const Counter = ({ value, isDecimal = false }) => {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 }); // Smooth counting
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (isDecimal) {
        setDisplayValue(Number(latest.toFixed(1)));
      } else {
        setDisplayValue(Math.floor(latest));
      }
    });
  }, [springValue, isDecimal]);

  return <span ref={ref}>{displayValue}</span>;
};


export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg hover:border-slate-200 transition-all duration-300 group">
          <div className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 mb-1">
            <Counter value={stat.value} isDecimal={stat.isDecimal} />
            <span className="text-2xl">{stat.suffix}</span>
          </h3>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
