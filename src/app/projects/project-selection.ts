export interface GithubRepository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  disabled?: boolean;
  size: number;
  stargazers_count: number;
  pushed_at: string;
}

// To hand-pick projects later, add repository names in their preferred order.
export const FEATURED_REPOSITORIES: string[] = [];

export type ProjectCategory = 'Backend' | 'Frontend' | 'Full stack' | 'Software';

export function projectCategory(repo: GithubRepository): ProjectCategory {
  const metadata = [repo.name, repo.description || '', ...(repo.topics || [])].join(' ').toLowerCase();
  const frontend = /\b(react|angular|vue|svelte|nextjs|next-js|frontend|front-end|website|portfolio|ui)\b/.test(metadata) || ['HTML', 'CSS', 'SCSS'].includes(repo.language || '');
  const backend = /\b(backend|back-end|spring|springboot|api|apis|express|nestjs|django|flask|fastapi|microservices|nodejs|node-js|aspnet|asp-net)\b/.test(metadata) || ['Java', 'C#', 'Go'].includes(repo.language || '');
  if (/\b(fullstack|full-stack|mern|mean)\b/.test(metadata) || (frontend && backend)) { return 'Full stack'; }
  return backend ? 'Backend' : frontend ? 'Frontend' : 'Software';
}

export function selectProjects(repositories: GithubRepository[]): GithubRepository[] {
  const score = (repo: GithubRepository) =>
    (repo.description ? 8 : 0) + (repo.language ? 5 : 0) +
    Math.min((repo.topics || []).length, 4) + Math.min(repo.stargazers_count, 10);
  const ranked = repositories.filter(repo =>
    !repo.fork && !repo.archived && !repo.disabled && repo.size > 0 &&
    repo.name.toLowerCase() !== 'msambaraju10'
  ).sort((a, b) => {
    const aFeatured = FEATURED_REPOSITORIES.indexOf(a.name);
    const bFeatured = FEATURED_REPOSITORIES.indexOf(b.name);
    if (aFeatured !== -1 || bFeatured !== -1) {
      return (aFeatured === -1 ? Infinity : aFeatured) - (bFeatured === -1 ? Infinity : bFeatured);
    }
    return score(b) - score(a) || b.pushed_at.localeCompare(a.pushed_at) || a.name.localeCompare(b.name);
  });
  const selected: GithubRepository[] = [];
  // Reserve space for each discipline before filling remaining featured slots.
  for (const category of ['Backend', 'Frontend']) {
    const candidates = ranked.filter(repo => projectCategory(repo) === category || projectCategory(repo) === 'Full stack');
    for (const repo of candidates.slice(0, 2)) {
      if (!selected.some(item => item.id === repo.id)) { selected.push(repo); }
    }
  }
  for (const repo of ranked) {
    if (selected.length >= 4) { break; }
    if (!selected.some(item => item.id === repo.id)) { selected.push(repo); }
  }
  return selected;

}
