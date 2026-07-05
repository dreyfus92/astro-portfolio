import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import satori from 'satori'
import sharp from 'sharp'
import { buildOgTemplate, type OgImageProps } from './template'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fontDir = join(
  __dirname,
  '../../../node_modules/@fontsource/jetbrains-mono/files',
)

type Font = {
  name: string
  data: Buffer
  weight: 400 | 700
  style: 'normal'
}

let fonts: Font[] | null = null

function getFonts(): Font[] {
  if (!fonts) {
    fonts = [
      {
        name: 'JetBrains Mono',
        data: readFileSync(
          join(fontDir, 'jetbrains-mono-latin-400-normal.woff'),
        ),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'JetBrains Mono',
        data: readFileSync(
          join(fontDir, 'jetbrains-mono-latin-700-normal.woff'),
        ),
        weight: 700,
        style: 'normal',
      },
    ]
  }
  return fonts
}

export async function generateOgImage(props: OgImageProps): Promise<Buffer> {
  const svg = await satori(buildOgTemplate(props), {
    width: 1200,
    height: 630,
    fonts: getFonts(),
  })

  return sharp(Buffer.from(svg)).png().toBuffer()
}
