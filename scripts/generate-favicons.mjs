import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '../public')
const outDir = join(publicDir, 'favicon')
const svgPath = join(outDir, 'favicon.svg')

const pngSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'mstile-150x150.png', size: 150 },
]

/** Build a multi-size ICO from PNG buffers (PNG-in-ICO, Vista+). */
function pngBuffersToIco(entries) {
  const count = entries.length
  const headerSize = 6 + count * 16
  let offset = headerSize
  const parts = []

  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(count, 4)
  parts.push(header)

  const dirEntries = []
  for (const { size, data } of entries) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(size >= 256 ? 0 : size, 0) // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1) // height
    entry.writeUInt8(0, 2) // color count
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(data.length, 8)
    entry.writeUInt32LE(offset, 12)
    dirEntries.push(entry)
    offset += data.length
  }

  parts.push(...dirEntries)
  for (const { data } of entries) parts.push(data)

  return Buffer.concat(parts)
}

const icoEntries = []

for (const { name, size } of pngSizes) {
  const png = await sharp(svgPath).resize(size, size).png().toBuffer()
  writeFileSync(join(outDir, name), png)
  console.log(`wrote ${name}`)

  if (size === 16 || size === 32) {
    icoEntries.push({ size, data: png })
  }
}

const ico = pngBuffersToIco(icoEntries)
writeFileSync(join(outDir, 'favicon.ico'), ico)
writeFileSync(join(publicDir, 'favicon.ico'), ico)
console.log('wrote favicon.ico')
console.log('wrote ../favicon.ico (site root)')
