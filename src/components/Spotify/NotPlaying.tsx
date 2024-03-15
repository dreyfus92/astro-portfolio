import { animate } from 'framer-motion'

export const NotPlaying = () => {
  const onMouseEnterNotPlaying = (e: any) => {
    e.stopPropagation()
    animate([
      [
        '#first',
        { y: 0, x: 40, rotateZ: 0, opacity: 1 },
        { type: 'spring', bounce: 0.5, duration: 0.5 },
      ],
    ])
  }

  const onMouseLeaveNotPlaying = (e: any) => {
    e.stopPropagation()
    animate([
      ['#first', { y: 0, x: 0, rotateZ: 0, opacity: 0 }, { duration: 0.25 }],
    ])
  }

  return (
    <span
      onMouseEnter={onMouseEnterNotPlaying}
      onMouseLeave={onMouseLeaveNotPlaying}
      className='relative w-fit cursor-pointer'
    >
      <span
        id='first'
        className='absolute -bottom-1 left-0 z-50 hidden overflow-hidden whitespace-nowrap rounded-full bg-neutral-600 px-4 py-1 text-sm text-neutral-200 opacity-0 shadow-md md:block md:text-base'
      >
        this guy's just chilling, no tunes playing!
      </span>
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
      </svg>
    </span>
  )
}
