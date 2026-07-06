import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateOgImage } from '../src/utils/og/generate'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')
const blogDir = join(root, 'src/data/blog')

type PostMeta = {
  id: string
  title: string
  description: string
  pubDate: string
  draft: boolean
}

function getField(fm: string, key: string): string | undefined {
  const lines = fm.split('\n')
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].startsWith(`${key}:`)) continue

    let value = lines[i].slice(key.length + 1).trim()
    if (!value) {
      const parts: string[] = []
      while (i + 1 < lines.length && /^[\s\t]/.test(lines[i + 1])) {
        i++
        parts.push(lines[i].trim())
      }
      value = parts.join(' ')
    }

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    return value
  }
  return undefined
}

function parseMdx(filePath: string): PostMeta | null {
  const raw = readFileSync(filePath, 'utf8')
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null

  const fm = match[1]
  const title = getField(fm, 'title')
  const description = getField(fm, 'description')
  const pubDate = getField(fm, 'pubDate')
  if (!title || !description || !pubDate) return null

  return {
    id: basename(filePath, '.mdx'),
    title,
    description,
    pubDate,
    draft: getField(fm, 'draft') === 'true',
  }
}

function writePng(path: string, png: Buffer) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, png)
  console.log(`wrote ${path.replace(root + '/', '')}`)
}

async function main() {
  const ogDir = join(publicDir, 'og')
  mkdirSync(ogDir, { recursive: true })

  writePng(
    join(ogDir, 'default.png'),
    await generateOgImage({
      command: 'whoami',
      title: 'Paul Valladares',
      description:
        'Fullstack dev and open source maintainer. TypeScript, Node.js, and CLI tools.',
    }),
  )

  writePng(
    join(ogDir, 'posts.png'),
    await generateOgImage({
      command: 'cat ./posts/README',
      title: 'Posts',
      description:
        'Coding quirks, tech discoveries, historical mysteries and occasional life musings.',
    }),
  )

  const posts = readdirSync(blogDir)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((f) => parseMdx(join(blogDir, f)))
    .filter((p): p is PostMeta => p !== null && !p.draft)

  for (const post of posts) {
    writePng(
      join(publicDir, 'posts', post.id, 'og.png'),
      await generateOgImage({
        command: `cat ./posts/${post.id}.mdx`,
        title: post.title,
        description: post.description,
        date: post.pubDate,
      }),
    )
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
