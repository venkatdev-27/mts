import React from 'react';
import { BriefcaseBusiness, Building2, CheckCircle2, GraduationCap, ShieldCheck, Target, TrendingUp, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-primary-950 pt-32 pb-16 sm:pt-36 sm:pb-24">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-secondary-500/20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-primary-400/30 bg-primary-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-200">
              About Maruthi Tech Solutions
            </span>
            <h1 className="mt-5 text-3xl font-extrabold text-white sm:text-5xl leading-tight">
              Professional Training and Project Execution for Career-Ready Engineers
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
              We help students move from classroom concepts to confident real-world delivery through structured courses, guided projects,
              and mentor-driven support. Our approach focuses on practical implementation, consistent feedback, and measurable outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Who We Are</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Maruthi Tech Solutions is an education and project mentoring platform built for students who want practical, industry-aligned skills.
                We work closely with learners from planning to delivery, ensuring every learning path leads to real implementation experience.
              </p>
              <p>
                Our programs are designed around current technology expectations in software roles, including web development, app development,
                full stack systems, and AI/ML workflows. Each track combines technical depth with project execution discipline.
              </p>
              <p>
                Our mentors include experienced engineers and trainers who emphasize architecture clarity, code quality, testing standards,
                and portfolio readiness so students are prepared for interviews and production-level responsibilities.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary-200 to-secondary-200 blur-xl opacity-40"></div>
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-5">How We Deliver Value</h3>
              <div className="space-y-4">
                {[
                  'Structured learning paths with milestone-based progression',
                  'Mentor reviews for architecture, implementation, and code quality',
                  'Portfolio-focused projects mapped to current hiring expectations',
                  'Interview and placement preparation with practical guidance',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" />
                    <p className="text-slate-600 text-sm sm:text-base">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-700 mb-6">
              <Target className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
            <p className="text-slate-600">
              Deliver practical, high-quality technology learning that improves employability and helps students execute projects with confidence.
            </p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-700 mb-6">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
            <p className="text-slate-600">
              Build a trusted ecosystem where students, mentors, and industry practices connect to create job-ready engineering talent.
            </p>
          </div>
          <div className="bg-white border border-slate-200 p-8 rounded-2xl text-center shadow-sm hover:shadow-lg transition-shadow">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-700 mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Core Values</h3>
            <p className="text-slate-600">
              Accountability, transparency, student-first guidance, and execution excellence are central to every training and project engagement.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <Building2 className="h-7 w-7 text-primary-700 mb-3" />
            <h4 className="text-lg font-bold text-slate-900 mb-2">Industry Relevance</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our curriculum and projects are continuously aligned with current tools, workflows, and role expectations used in professional teams.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <GraduationCap className="h-7 w-7 text-primary-700 mb-3" />
            <h4 className="text-lg font-bold text-slate-900 mb-2">Mentor-Led Learning</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Learners receive regular guidance through code reviews, solution walkthroughs, and progress checkpoints for consistent improvement.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="h-7 w-7 text-primary-700 mb-3" />
            <h4 className="text-lg font-bold text-slate-900 mb-2">Quality Standards</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              We focus on clean implementation, secure practices, and documentation discipline so students deliver dependable project outcomes.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-50 to-secondary-50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <BriefcaseBusiness className="h-6 w-6 text-primary-700 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Career-Focused Commitment</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Every program we run is designed to improve practical capability and interview readiness. Our goal is not just course completion,
                but confident project delivery, stronger portfolios, and better placement outcomes for every student.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
