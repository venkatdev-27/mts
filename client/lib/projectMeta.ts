import { Project } from '../types';

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const getProjectMeta = (project: Pick<Project, 'id' | 'title'>) => {
  const seed = hashString(`${project.id}-${project.title}`);

  const durationMonths = (seed % 2) + 1;
  const ratingBase = 43 + (seed % 8); // 4.3 to 5.0
  const rating = Number((ratingBase / 10).toFixed(1));

  return {
    durationMonths,
    durationLabel: `${durationMonths} ${durationMonths === 1 ? 'Month' : 'Months'}`,
    rating,
  };
};

