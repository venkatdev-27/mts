import { resolveImageUrl } from './resolveImageUrl';

export interface UICourse {
  id: string;
  title: string;
  image: string;
  price: number;
  discountedPrice: number;
  category: 'Elite' | 'Premium';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  author: string;
  rating: number;
  students: number;
  durationMonths: number;
  totalHours: number;
  placementAssistance: boolean;
  summary: string;
  skills: string[];
  overviewParagraph: string;
}

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
    const category = (raw?.category || 'Elite') as 'Elite' | 'Premium';
    const durationMonths = parseDurationMonths(raw?.durationMonths ?? raw?.duration);
    const title = String(raw?.title ?? `Course ${index + 1}`);

    return {
      id: String(raw?._id ?? raw?.id ?? index + 1),
      title,
      image: resolveImageUrl(raw?.image ?? ''),
      price: Number(raw?.price ?? 0),
      discountedPrice: Number(raw?.discountedPrice ?? 0),
      category,
      level: (raw?.level || 'Beginner') as 'Beginner' | 'Intermediate' | 'Advanced',
      author: String(raw?.author ?? ''),
      rating: Number(raw?.rating ?? 4.5),
      students: Number(raw?.students ?? 0),
      durationMonths,
      totalHours: Number(raw?.totalHours ?? durationMonths * 60),
      placementAssistance: Boolean(raw?.placementAssistance ?? category === 'Premium'),
      summary: String(raw?.summary ?? buildFallbackSummary(title)),
      skills: Array.isArray(raw?.skills) && raw.skills.length > 0
        ? raw.skills
        : Array.isArray(raw?.topSkills) && raw.topSkills.length > 0
          ? raw.topSkills
        : fallbackSkillsByCategory[category],
      overviewParagraph: String(
        raw?.overviewParagraph ?? raw?.overview ?? buildFallbackOverview(title)
      ),
    };
  });
};

export const defaultUICourses: UICourse[] = [];
