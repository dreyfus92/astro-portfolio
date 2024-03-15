import { type FC, useEffect, useState } from 'react'
import type { NowPlayingTrackResponse } from '@utils/spotify'
import { NotPlaying } from './NotPlaying'
import { NowPlaying } from './NowPlaying'

export const SpotifyNowPlaying: FC = () => {
  const [spotifyData, setSpotifyData] = useState<NowPlayingTrackResponse>()
  useEffect(() => {
    fetch('/api/spotify')
      .then((res) => res.json())
      .then((data) => setSpotifyData(data))
  }, [])
  console.log(spotifyData)
  return (
    <li className='hidden md:block'>
      {spotifyData?.isPlaying ? (
        <NowPlaying props={spotifyData} />
      ) : (
        <NotPlaying />
      )}
    </li>
  )
}
