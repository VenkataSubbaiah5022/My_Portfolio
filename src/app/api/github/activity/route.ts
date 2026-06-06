import { NextResponse } from "next/server";
import type { GitHubActivitySnapshot } from "@/lib/github-activity";

const USERNAME = "VenkataSubbaiah5022";
const GITHUB_HEADERS = {
  Accept: "application/vnd.github+json",
  "User-Agent": "venkata-portfolio",
};

type GitHubUser = {
  public_repos: number;
  html_url: string;
};

type GitHubRepo = {
  name: string;
  html_url: string;
  pushed_at: string;
  language: string | null;
  description: string | null;
  stargazers_count: number;
  fork: boolean;
};

export async function GET() {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: GITHUB_HEADERS,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=8&type=owner`,
        { headers: GITHUB_HEADERS, next: { revalidate: 3600 },
        },
      ),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      return NextResponse.json({ error: "Unable to load GitHub activity." }, { status: 502 });
    }

    const user = (await userResponse.json()) as GitHubUser;
    const repos = (await reposResponse.json()) as GitHubRepo[];

    const payload: GitHubActivitySnapshot = {
      username: USERNAME,
      profileUrl: user.html_url,
      publicRepos: user.public_repos,
      repos: repos
        .filter((repo) => !repo.fork)
        .slice(0, 5)
        .map((repo) => ({
          name: repo.name,
          url: repo.html_url,
          pushedAt: repo.pushed_at,
          language: repo.language,
          description: repo.description,
          stars: repo.stargazers_count,
        })),
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: "Unable to load GitHub activity." }, { status: 500 });
  }
}
