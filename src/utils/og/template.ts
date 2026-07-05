export type OgImageProps = {
  command: string
  title: string
  description: string
  date?: string
}

type OgNode = {
  type: string
  props: {
    style?: Record<string, string | number>
    children?: OgNode | OgNode[] | string
  }
}

const WIDTH = 1200
const HEIGHT = 630

const colors = {
  bg: '#0d0a14',
  panel: '#131020',
  border: '#261e3c',
  ink: '#dcd6ec',
  dim: '#8b80a6',
  faint: '#524868',
  accent: '#a970ff',
}

function el(
  type: string,
  style: Record<string, string | number>,
  children?: OgNode | OgNode[] | string,
): OgNode {
  return { type, props: { style, children } }
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1)}…`
}

export function buildOgTemplate({
  command,
  title,
  description,
  date,
}: OgImageProps): OgNode {
  return el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: colors.bg,
      backgroundImage:
        'radial-gradient(circle at 70% -10%, rgba(135, 26, 255, 0.12) 0%, transparent 55%)',
      padding: '56px 64px',
      fontFamily: 'JetBrains Mono',
      color: colors.ink,
    },
    [
      el('div', { display: 'flex', alignItems: 'center', fontSize: 22 }, [
        el('span', { color: colors.accent, fontWeight: 700 }, 'paul'),
        el('span', { color: colors.dim }, '@valladares:'),
        el('span', { color: colors.ink, marginLeft: 0 }, '~'),
      ]),
      el('div', {
        width: '100%',
        height: 2,
        backgroundColor: colors.border,
        marginTop: 20,
        marginBottom: 40,
      }),
      el('div', { display: 'flex', alignItems: 'center', fontSize: 20 }, [
        el('span', { color: colors.accent, marginRight: 12 }, '❯'),
        el('span', { color: colors.dim }, command),
      ]),
      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          marginTop: 24,
          padding: '32px 36px',
          backgroundColor: colors.panel,
          border: `2px solid ${colors.border}`,
        },
        [
          el('div', {
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            color: colors.ink,
            marginBottom: 20,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }, truncate(title, 72)),
          el('div', {
            fontSize: 24,
            lineHeight: 1.45,
            color: colors.dim,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }, truncate(description, 120)),
        ],
      ),
      el(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 28,
          fontSize: 18,
          color: colors.faint,
        },
        [
          el('span', {}, 'paulvall.dev'),
          date ? el('span', { color: colors.dim }, date) : '',
        ].filter(Boolean) as OgNode[],
      ),
    ],
  )
}
