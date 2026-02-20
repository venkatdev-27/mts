import React, { useEffect, useState, Suspense, lazy } from 'react';
import HeroSection from '../components/HeroSection';
import { services } from '../data/services';
import {
  BookOpen,
  Award,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Code,
  FileText,
  Layers,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { courseAPI, projectAPI } from '../services/api';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { defaultUICourses, toUICourses, UICourse } from '../lib/courseHelpers';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/animate-ui/components/radix/accordion';

// Lazy loaded components
const Testimonials = lazy(() => import('../components/Testimonials'));
const StatsCounter = lazy(() => import('../components/StatsCounter'));
const SkillsCloud = lazy(() => import('../components/SkillsCloud').then(module => ({ default: module.SkillsCloud })));

const ACCORDION_ITEMS = [
  {
    title: 'How do course enrollment and project support work together?',
    content:
      'After you enroll in a course, we assign a guided learning path and then map you to project tracks that match your skill level. You complete milestone tasks, review sessions, and hands-on implementation so your course learning directly turns into portfolio-ready project outcomes.',
  },
  {
    title: 'What tools and technologies are included in project execution?',
    content:
      'Each project includes a clear stack based on domain needs, such as React, Node.js, MongoDB, Python, cloud tooling, version control, and testing workflows. We explain why each tool is used in the architecture so you understand practical production choices, not just code snippets.',
  },
  {
    title: 'Do premium and elite courses include mentorship and placement help?',
    content:
      'Yes. Elite courses run in compact timelines with focused mentor sessions, while premium courses include extended mentorship, project reviews, interview preparation, and placement assistance. This structure helps you progress from learning concepts to completing deployable work confidently.',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [homeCourses, setHomeCourses] = useState<UICourse[]>(defaultUICourses);
  const [isHomeDataLoading, setIsHomeDataLoading] = useState(true);
  const [isServerWaking, setIsServerWaking] = useState(false);
  const [serviceHoverThemeById, setServiceHoverThemeById] = useState<Record<string, number>>({});
  const [showIntroVideo, setShowIntroVideo] = useState<boolean>(true);
  const [isWhatsappImageError, setIsWhatsappImageError] = useState(false);
  const introVideoUrl = `${import.meta.env.BASE_URL}models/ai.mp4`;
  const whatsappLogoUrl = `${import.meta.env.BASE_URL}models/wp.png`;
  const whatsappPhone = '916309616945';
  const whatsappMessage =
    'Hello Maruthi Tech Solutions team, I am interested in your training programs. Please share complete details about available courses, duration, fees, upcoming batches, demo class availability, certification, and placement support.';
  const encodedWhatsappMessage = encodeURIComponent(whatsappMessage);
  const whatsappWebUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodedWhatsappMessage}`;

  const openWhatsApp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const whatsappAppUrl = `whatsapp://send?phone=${whatsappPhone}&text=${encodedWhatsappMessage}`;

    if (!isMobile) return;

    event.preventDefault();
    window.location.href = whatsappAppUrl;
    window.setTimeout(() => {
      window.location.href = whatsappWebUrl;
    }, 700);
  };

  const serviceHoverThemes = [
    {
      border: 'hover:border-blue-200',
      overlay: 'from-blue-50/70 to-white',
      iconColor: 'text-blue-600',
      iconBgHover: 'group-hover:bg-blue-600',
      iconShadow: 'group-hover:shadow-blue-600/30',
      titleHover: 'group-hover:text-blue-700',
    },
    {
      border: 'hover:border-emerald-200',
      overlay: 'from-emerald-50/70 to-white',
      iconColor: 'text-emerald-600',
      iconBgHover: 'group-hover:bg-emerald-600',
      iconShadow: 'group-hover:shadow-emerald-600/30',
      titleHover: 'group-hover:text-emerald-700',
    },
    {
      border: 'hover:border-orange-200',
      overlay: 'from-orange-50/70 to-white',
      iconColor: 'text-orange-600',
      iconBgHover: 'group-hover:bg-orange-600',
      iconShadow: 'group-hover:shadow-orange-600/30',
      titleHover: 'group-hover:text-orange-700',
    },
    {
      border: 'hover:border-rose-200',
      overlay: 'from-rose-50/70 to-white',
      iconColor: 'text-rose-600',
      iconBgHover: 'group-hover:bg-rose-600',
      iconShadow: 'group-hover:shadow-rose-600/30',
      titleHover: 'group-hover:text-rose-700',
    },
    {
      border: 'hover:border-violet-200',
      overlay: 'from-violet-50/70 to-white',
      iconColor: 'text-violet-600',
      iconBgHover: 'group-hover:bg-violet-600',
      iconShadow: 'group-hover:shadow-violet-600/30',
      titleHover: 'group-hover:text-violet-700',
    },
  ];

  const setRandomServiceTheme = (serviceId: string) => {
    setServiceHoverThemeById((prev) => {
      const current = prev[serviceId] ?? 0;
      let next = current;
      if (serviceHoverThemes.length > 1) {
        while (next === current) {
          next = Math.floor(Math.random() * serviceHoverThemes.length);
        }
      }
      return { ...prev, [serviceId]: next };
    });
  };

  useEffect(() => {
    let wakeTimer: ReturnType<typeof setTimeout> | null = null;
    wakeTimer = setTimeout(() => setIsServerWaking(true), 3500);

    const loadHomeData = async () => {
      try {
        const [projectsData, coursesData] = await Promise.all([
          projectAPI.getAllProjects(),
          courseAPI.getAllCourses(),
        ]);

        const allProjects = Array.isArray(projectsData) ? projectsData : (projectsData?.projects || []);
        if (allProjects.length > 0) {
          const categories = ['Full Stack', 'App Development', 'Web Development', 'AI & Machine Learning'];
          const selectedProjects: Project[] = [];
          const seenIds = new Set<string>();

          categories.forEach((cat) => {
            const proj = allProjects.find((p: Project) => p.category === cat && !seenIds.has(p.id));
            if (proj) {
              selectedProjects.push(proj);
              seenIds.add(proj.id);
            }
          });

          for (const proj of allProjects) {
            if (selectedProjects.length >= 5) break;
            if (!seenIds.has(proj.id)) {
              selectedProjects.push(proj);
              seenIds.add(proj.id);
            }
          }

          setFeaturedProjects(selectedProjects);
        }

        if (Array.isArray(coursesData) && coursesData.length > 0) {
          setHomeCourses(toUICourses(coursesData));
        }
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setIsHomeDataLoading(false);
        if (wakeTimer) clearTimeout(wakeTimer);
      }
    };

    loadHomeData();

    return () => {
      if (wakeTimer) clearTimeout(wakeTimer);
    };
  }, []);

  useEffect(() => {
    if (!showIntroVideo) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showIntroVideo]);

  const closeIntroVideo = () => {
    setShowIntroVideo(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {showIntroVideo && (
        <div className="fixed inset-0 z-[120] bg-black flex items-center justify-center">
          <video
            className="w-full h-full object-contain md:object-cover"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={closeIntroVideo}
            onError={closeIntroVideo}
          >
            <source src={introVideoUrl} type="video/mp4" />
            <source src="/models/ai.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <HeroSection />

      {/* Courses Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-100/40 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {isHomeDataLoading && (
            <div className="mb-8 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-current" />
                <span className="font-semibold">
                  {isServerWaking ? 'Server is waking up. This can take a minute on free tier.' : 'Loading latest content...'}
                </span>
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl w-full text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <span className="h-px w-8 bg-primary-600"></span>
                <span className="text-sm text-primary-600 font-bold tracking-widest uppercase">Grow Your Skills</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Masterclasses</span>
              </h3>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Link to="/courses" className="text-primary-600 hover:text-primary-700 font-bold flex items-center">
                See All Courses <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative group">
            <button
              onClick={() => {
                const container = document.getElementById('courses-scroll-container');
                if (container) container.scrollLeft -= 400;
              }}
              className="flex absolute left-0 top-1/2 -translate-y-1/2 -ml-2 md:-ml-5 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-slate-100 items-center justify-center text-slate-700 hover:text-primary-600 hover:scale-110 transition-all duration-300 opacity-100"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={() => {
                const container = document.getElementById('courses-scroll-container');
                if (container) container.scrollLeft += 400;
              }}
              className="flex absolute right-0 top-1/2 -translate-y-1/2 -mr-2 md:-mr-5 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-slate-100 items-center justify-center text-slate-700 hover:text-primary-600 hover:scale-110 transition-all duration-300 opacity-100"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div
              id="courses-scroll-container"
              className="flex overflow-x-auto gap-6 pb-12 -mx-4 px-4 scroll-smooth hide-scrollbar snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {(() => {
                const eliteCourses = homeCourses.filter((course) => course.category === 'Elite').slice(0, 3);
                const premiumCourses = homeCourses.filter((course) => course.category === 'Premium').slice(0, 3);
                return [...eliteCourses, ...premiumCourses];
              })().map((course) => (
                <div
                  key={course.id}
                  className="min-w-full sm:min-w-[340px] md:min-w-[380px] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col snap-center relative"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-slate-800">{course.rating}</span>
                      </div>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-primary-600 text-white shadow-sm">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative">
                    <div className="mb-3 flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-primary-500" /> {course.students} Students</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-secondary-500" /> {course.level}</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
                      {course.title}
                    </h4>

                    <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 line-through font-medium">₹{course.price.toLocaleString()}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-extrabold text-slate-900">₹{course.discountedPrice.toLocaleString()}</span>
                        </div>
                        <span className="text-xs text-red-600 font-bold mt-1">
                          {Math.round(((course.price - course.discountedPrice) / course.price) * 100)}% OFF
                        </span>
                      </div>
                      <button
                        onClick={() => navigate('/register', { state: { course: course.title } })}
                        className="h-10 px-6 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white md:bg-none md:bg-slate-50 md:text-slate-900 flex items-center justify-center md:group-hover:bg-primary-600 md:group-hover:text-white transition-all duration-300 shadow-lg shadow-primary-500/30 md:shadow-sm md:group-hover:shadow-md hover:scale-105 active:scale-95 font-bold text-sm gap-2"
                      >
                        <span>Enroll</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center md:hidden">
            <Link
              to="/courses"
              className="inline-flex items-center justify-between w-[92%] mx-auto px-4 py-3 rounded-full text-white font-extrabold transition-all shadow-[0_14px_30px_-18px_rgba(15,23,42,0.9)] bg-gradient-to-r from-[#03163E] via-[#2B177A] to-[#8B2CF5] hover:brightness-110 active:scale-[0.98]"
            >
              <span className="inline-flex items-center gap-2 text-base">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12 border border-white/20">
                  <BookOpen className="w-4 h-4" />
                </span>
                Explore All Courses
              </span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Projects</h3>
              <p className="mt-2 text-slate-500">Explore real project work delivered across modern tech domains.</p>
            </div>
            <Link to="/projects" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-bold">
              View All Projects <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {isHomeDataLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`home-project-skeleton-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="h-48 rounded-xl bg-slate-200 animate-pulse" />
                  <div className="mt-4 h-5 w-2/3 rounded bg-slate-200 animate-pulse" />
                  <div className="mt-3 h-4 w-full rounded bg-slate-100 animate-pulse" />
                </div>
              ))}
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200 text-slate-500">
              Projects are loading. Please refresh in a moment.
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-50/50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-secondary-50/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm text-primary-600 font-bold tracking-widest uppercase mb-3">What We Offer</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Educational Support</span>
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              We provide end-to-end guidance for professional growth, from technical training to final project execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => {
              let Icon = Layers;
              if (service.iconName === 'BookOpen') Icon = BookOpen;
              else if (service.iconName === 'Code') Icon = Code;
              else if (service.iconName === 'CheckCircle') Icon = CheckCircle;
              else if (service.iconName === 'FileText') Icon = FileText;
              else if (index === 0) Icon = BookOpen;
              else if (index === 1) Icon = Zap;
              else if (index === 2) Icon = CheckCircle;
              else Icon = Users;
              const hoverTheme = serviceHoverThemes[serviceHoverThemeById[service.id] ?? (index % serviceHoverThemes.length)];

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setRandomServiceTheme(service.id)}
                  className={`group bg-slate-50 rounded-2xl p-8 transition-all duration-300 border border-slate-100 ${hoverTheme.border} hover:shadow-xl hover:-translate-y-1 relative overflow-hidden cursor-default`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-100 transition-opacity duration-300"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${hoverTheme.overlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm ${hoverTheme.iconBgHover} ${hoverTheme.iconShadow} transition-all duration-300 border border-slate-100 group-hover:scale-110`}>
                      <Icon className={`w-8 h-8 ${hoverTheme.iconColor} group-hover:text-white transition-colors duration-300`} />
                    </div>
                    <h3 className={`text-xl font-bold text-slate-900 mb-3 ${hoverTheme.titleHover} transition-colors`}>{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/services"
              className="inline-flex md:hidden items-center justify-between w-[92%] mx-auto px-4 py-3 rounded-full text-white font-extrabold transition-all shadow-[0_14px_30px_-18px_rgba(5,150,105,0.9)] bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#22C55E] hover:brightness-110 active:scale-[0.98]"
            >
              <span className="inline-flex items-center gap-2 text-base">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/12 border border-white/20">
                  <Layers className="w-4 h-4" />
                </span>
                View All Services
              </span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </Link>
            <Link
              to="/services"
              className="hidden md:inline-flex items-center text-slate-700 font-bold hover:text-primary-600 transition-colors bg-white border border-slate-200 px-6 py-3 rounded-xl shadow-sm hover:shadow-md"
            >
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Cloud Section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center bg-slate-50"><div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div></div>}>
        <SkillsCloud />
      </Suspense>

      {/* Accordion Section */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 mb-4">
              <HelpCircle className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-bold text-primary-700 tracking-wide uppercase">Quick FAQ</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Common Questions</h3>
            <p className="mt-2 text-slate-500">Clear answers about how our platform and components work.</p>
          </div>

          <div className="mx-auto w-full max-w-2xl lg:max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 lg:p-8">
            <Accordion type="single" collapsible className="w-full text-base lg:text-lg">
              {ACCORDION_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger showArrow>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="h-96 bg-white"></div>}>
        <Testimonials />
      </Suspense>

      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-50 border border-secondary-100 mb-6">
              <span className="text-xs font-bold text-secondary-700 uppercase tracking-wide">Our Impact</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6 leading-tight">
              Driving Career <span className="text-primary-600">Success</span>
            </h2>
            <p className="text-lg text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto">
              We take pride in the numbers that define our journey. From guiding students to placing them in top companies, our results speak for themselves.
            </p>

            <Suspense fallback={<div className="h-32"></div>}>
              <StatsCounter />
            </Suspense>
          </div>
        </div>
      </section>

      <a
        href={whatsappWebUrl}
        onClick={openWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[130] w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-90 transition-transform"
      >
        {isWhatsappImageError ? (
          <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-300 flex items-center justify-center drop-shadow-[0_6px_12px_rgba(16,185,129,0.18)]">
            <MessageCircle className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
          </span>
        ) : (
          <img
            src={whatsappLogoUrl}
            alt="WhatsApp"
            loading="lazy"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover brightness-90 contrast-75 saturate-55 sm:brightness-95 sm:contrast-85 sm:saturate-65 drop-shadow-[0_6px_12px_rgba(16,185,129,0.18)]"
            onError={() => setIsWhatsappImageError(true)}
          />
        )}
      </a>
    </div>
  );
};

export default Home;
