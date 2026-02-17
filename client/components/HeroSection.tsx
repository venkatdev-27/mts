import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import AnimatedBadge from "@/registry/eldoraui/animated-badge";
import { AnimatedShinyButton } from "./ui/animated-shiny-button";

export function AnimatedBadgeDemo() {
  return (
    <div className="relative" suppressHydrationWarning>
      <AnimatedBadge
        text="Introducing Maruthi Tech Solutions"
        color="#22d3ee"
      />
    </div>
  );
}

export default function Hero() {

  const educationCapUrl = `${import.meta.env.BASE_URL}models/edu.png`;

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617] text-white selection:bg-teal-500 selection:text-white">

      {/* 🌌 BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Teal/Blue Gradient Base matching screenshot */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f4c75] via-[#002b4d] to-[#020617]" />

        {/* Glow Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />

        {/* Grid pattern overlay (optional tech feel) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center pt-32 pb-20">

        {/* 📝 CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeIn}>
            <AnimatedBadgeDemo />
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white/90">
            <span className="relative inline-block">
              <img
                src={educationCapUrl}
                alt="Education cap"
                className="absolute -left-6 -top-4 md:-left-8 md:-top-6 w-12 h-12 md:w-16 md:h-16 object-contain pointer-events-none select-none z-0"
              />
              <span className="relative z-10">Build</span>
            </span>{' '}
            Real Skills. <br className="hidden md:block" />
            Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 drop-shadow-[0_0_10px_rgba(45,212,191,0.2)]">Career-Ready</span> Fast.
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
            Master in-demand technologies with hands-on projects,
            strong mentorship, and placement support at MTS.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-4 justify-center">
            <AnimatedShinyButton
              url="/register"
              className="px-8 py-3.5 rounded-xl font-bold text-[#022c44] shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center gap-2 overflow-hidden"
              style={{
                "--shiny-cta-bg": "#14b8a6",
                "--shiny-cta-bg-subtle": "#0d9488",
                "--shiny-cta-fg": "#022c44",
                "--shiny-cta-highlight": "#ffffff",
                "--shiny-cta-highlight-subtle": "#f1f5f9",
              } as React.CSSProperties}
            >
              <span className="relative z-10">Get Started</span>
            </AnimatedShinyButton>


          </motion.div>

          {/* Stats Row */}
          <motion.div variants={fadeIn} className="grid grid-cols-3 gap-12 pt-12 border-t border-white/10 w-full max-w-3xl mx-auto">
            <div className="flex flex-col">
              <div className="flex justify-center items-center gap-2 text-4xl font-bold text-white">
                3k+
              </div>
              <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Enrollments</span>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center items-center gap-2 text-4xl font-bold text-white">
                97%
              </div>
              <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Success Rate</span>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-center items-center gap-2 text-4xl font-bold text-white">
                45+
              </div>
              <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Courses& projects</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
