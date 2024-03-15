import { animate } from 'framer-motion'
import type { NowPlayingTrackResponse } from '@utils/spotify'

export const NowPlaying = ({ props }: { props: NowPlayingTrackResponse }) => {
  const onMouseEnterNowPlaying = (e: any) => {
    e.stopPropagation()
    animate([
      [
        '#first',
        { y: 0, x: 40, rotateZ: 0, opacity: 1 },
        { type: 'spring', bounce: 0.5, duration: 0.5 },
      ],
    ])
  }

  const onMoustLeaveNowPlaying = (e: any) => {
    e.stopPropagation()
    animate([
      ['#first', { y: 0, x: 0, rotateZ: 0, opacity: 0 }, { duration: 0.25 }],
    ])
  }

  return (
    <span
      onMouseEnter={onMouseEnterNowPlaying}
      onMouseLeave={onMoustLeaveNowPlaying}
      className='relative w-fit cursor-pointer'
    >
      <a
        id='first'
        className='absolute -bottom-0 left-0 z-50 hidden transform overflow-hidden whitespace-nowrap rounded-full bg-neutral-600 px-4 py-1 text-sm text-neutral-200 opacity-0 shadow-md hover:text-neon-green md:block md:text-base'
        href={props.url}
      >
        {props.title} - {props.artist}
      </a>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='text-neon-green'
      >
        <polygon points='11 5 6 9 2 9 2 15 6 15 11 19 11 5' />
        <path d='M15.54 8.46a5 5 0 0 1 0 7.07' />
        <path d='M19.07 4.93a10 10 0 0 1 0 14.14' />
      </svg>
    </span>
  )
}
