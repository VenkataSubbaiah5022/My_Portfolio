export type GitHubActivityRepo = {
  name: string;
  url: string;
  pushedAt: string;
  language: string | null;
  description: string | null;
  stars: number;
};

export type GitHubActivitySnapshot = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  repos: GitHubActivityRepo[];
  fetchedAt: string;
};

export function formatGitHubRelativeTime(iso: string) {
  const pushed = new Date(iso);
  const diffMs = Date.now() - pushed.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mo ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? "1 yr ago" : `${years} yr ago`;
}

export function isRecentlyActive(iso: string, withinDays = 30) {
  const diffMs = Date.now() - new Date(iso).getTime();
  return diffMs <= withinDays * 24 * 60 * 60 * 1000;
}
