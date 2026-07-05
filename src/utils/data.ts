type Project = {
  name: string
  description: string
  link: string
  meta: string
  cmd: string
  langColor: string
}

/* commands worth showing for repos we know; anything else gets gh repo clone */
const cmdOverrides: Record<string, string> = {
  clack: 'npm i @clack/prompts',
  cli: 'npx @e18e/cli analyze',
  studiocms: 'npm create studiocms@latest',
}

/* static fallback when the pinned-repos service is down */
const fallbackProjects: Project[] = [
  {
    name: 'clack',
    description:
      'Effortlessly build beautiful command-line apps. Prompts people actually enjoy.',
    link: 'https://github.com/bombshell-dev/clack',
    meta: 'TypeScript · bombshell-dev',
    cmd: 'npm i @clack/prompts',
    langColor: '#3178c6',
  },
  {
    name: 'e18e/cli',
    description:
      'A powerful CLI for analyzing and optimizing your JS/TS projects.',
    link: 'https://github.com/e18e/cli',
    meta: 'TypeScript · e18e',
    cmd: 'npx @e18e/cli analyze',
    langColor: '#3178c6',
  },
  {
    name: 'studiocms',
    description:
      'Astro-native headless CMS, built from the ground up by and for the Astro community.',
    link: 'https://github.com/withstudiocms/studiocms',
    meta: 'TypeScript · withstudiocms',
    cmd: 'npm create studiocms@latest',
    langColor: '#3178c6',
  },
  {
    name: 'docs maintainership',
    description:
      'Astro Docs, Starlight and Tauri Docs. The unglamorous work that decides whether anyone can use the glamorous work.',
    link: 'https://github.com/withastro/docs',
    meta: 'MDX · withastro · tauri-apps',
    cmd: 'gh repo clone withastro/docs',
    langColor: '#fcb32c',
  },
]

type PinnedRepo = {
  owner: string
  repo: string
  description: string
  language: string
  languageColor: string
}

async function fetchPinned(): Promise<Project[]> {
  const res = await fetch(
    'https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=dreyfus92',
    { signal: AbortSignal.timeout(3000) },
  )
  if (!res.ok) throw new Error(`pinned repos: ${res.status}`)
  const repos: PinnedRepo[] = await res.json()
  return repos.map((r) => {
    const owner = r.owner.replace(/\/+$/, '')
    return {
      name: r.repo,
      description: r.description,
      link: `https://github.com/${owner}/${r.repo}`,
      meta: `${r.language} · ${owner}`,
      cmd: cmdOverrides[r.repo] ?? `gh repo clone ${owner}/${r.repo}`,
      langColor: r.languageColor,
    }
  })
}

/* module-scope cache: only the first request after a cold start waits on the
   scraper; after the TTL we serve stale and refresh in the background */
const TTL_MS = 10 * 60 * 1000
let cache: { projects: Project[]; at: number } | null = null
let refreshing: Promise<void> | null = null

export async function getProjects(): Promise<Project[]> {
  if (cache) {
    if (Date.now() - cache.at >= TTL_MS) {
      refreshing ??= fetchPinned()
        .then((projects) => {
          cache = { projects, at: Date.now() }
        })
        .catch(() => {}) // keep serving stale if the scraper is down
        .finally(() => {
          refreshing = null
        })
    }
    return cache.projects
  }

  try {
    const projects = await fetchPinned()
    cache = { projects, at: Date.now() }
    return projects
  } catch {
    return fallbackProjects
  }
}

const stack = [
  { name: 'typescript', color: '#3178c6' },
  { name: 'javascript', color: '#f7df1e' },
  { name: 'node.js', color: '#5fa04e' },
  { name: 'astro', color: '#bc52ee' },
  { name: 'react', color: '#61dafb' },
  { name: 'tailwindcss', color: '#38bdf8' },
  { name: 'vite', color: '#646cff' },
  { name: 'go', color: '#00add8' },
  { name: 'python', color: '#3776ab' },
  { name: 'docker', color: '#2496ed' },
]

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/dreyfus92',
    ariaLabel: 'Paul Valladares GitHub Profile',
  },
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/dreyfus11.bsky.social',
    ariaLabel: 'Paul Valladares Bluesky Profile',
  },
  {
    name: 'X / Twitter',
    url: 'https://twitter.com/soysarcasme',
    ariaLabel: 'Paul Valladares Twitter Profile',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/paul-valladares',
    ariaLabel: 'Paul Valladares LinkedIn Profile',
  },
  {
    name: 'Discord',
    url: 'https://discord.com/users/603517171175391242',
    ariaLabel: 'Paul Valladares Discord Profile',
  },
]

export { socials, stack }
export type { Project }
