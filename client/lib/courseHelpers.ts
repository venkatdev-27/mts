import { Course, courses as staticCourses } from '../data/courses';
import { resolveImageUrl } from './resolveImageUrl';

export type UICourse = Course & {
  id: string;
};

const parseDurationMonths = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) return value;
  if (typeof value === 'string') {
    const match = value.match(/\d+/);
    if (match) return Math.max(1, Number(match[0]));
  }
  return 3;
};

const fallbackSkillsByCategory: Record<'Elite' | 'Premium', string[]> = {
  Elite: ['Core Programming', 'Problem Solving', 'Code Quality', 'Debugging', 'Fundamentals'],
  Premium: ['System Design', 'Production Workflow', 'Deployment', 'Interview Readiness', 'Real Projects'],
};

const buildFallbackSummary = (title: string) =>
  `${title} with practical sessions, hands-on coding tasks, and industry-aligned implementation exercises.`;

const buildFallbackOverview = (title: string) =>
  `${title} is delivered through a structured learning path that combines theory, guided implementation, and consistent practice. ` +
  `The curriculum is designed to improve conceptual clarity, coding discipline, and production-ready development habits. ` +
  `Each module includes practical assignments so learners can apply concepts in realistic scenarios instead of relying on passive content. ` +
  `Regular reviews, milestone checks, and project-focused execution help students gain confidence in solving real technical problems. ` +
  `By the end of the course, participants are expected to build deployable outcomes and present their work with strong technical communication.`;

export const toUICourses = (apiCourses: any[]): UICourse[] => {
  return apiCourses.map((raw, index) => {
    const staticMatch = staticCourses.find((c) => c.title === raw?.title);
    const category = (raw?.category || staticMatch?.category || 'Elite') as 'Elite' | 'Premium';
    const durationMonths = parseDurationMonths(raw?.durationMonths ?? staticMatch?.durationMonths ?? raw?.duration);

    return {
      id: String(raw?._id ?? raw?.id ?? staticMatch?.id ?? index + 1),
      title: String(raw?.title ?? staticMatch?.title ?? `Course ${index + 1}`),
      image: resolveImageUrl(raw?.image ?? staticMatch?.image ?? ''),
      price: Number(raw?.price ?? staticMatch?.price ?? 0),
      discountedPrice: Number(raw?.discountedPrice ?? staticMatch?.discountedPrice ?? 0),
      category,
      level: (raw?.level || staticMatch?.level || 'Beginner') as 'Beginner' | 'Intermediate' | 'Advanced',
      author: String(raw?.author ?? staticMatch?.author ?? ''),
      rating: Number(raw?.rating ?? staticMatch?.rating ?? 4.5),
      students: Number(raw?.students ?? staticMatch?.students ?? 0),
      durationMonths,
      totalHours: Number(raw?.totalHours ?? staticMatch?.totalHours ?? durationMonths * 60),
      placementAssistance: Boolean(raw?.placementAssistance ?? staticMatch?.placementAssistance ?? category === 'Premium'),
      summary: String(raw?.summary ?? staticMatch?.summary ?? buildFallbackSummary(raw?.title ?? staticMatch?.title ?? 'this course')),
      skills: Array.isArray(raw?.skills) && raw.skills.length > 0
        ? raw.skills
        : staticMatch?.skills ?? fallbackSkillsByCategory[category],
      overviewParagraph: String(
        raw?.overviewParagraph ??
        staticMatch?.overviewParagraph ??
        buildFallbackOverview(raw?.title ?? staticMatch?.title ?? 'This course')
      ),
    };
  });
};

export const defaultUICourses: UICourse[] = staticCourses.map((course) => ({
  ...course,
  id: String(course.id),
  image: resolveImageUrl(course.image),
}));

