import { type FC, useEffect, useState } from 'react'
import type { NowPlayingTrackResponse } from '@utils/spotify'

export const SpotifyNowPlaying: FC = () => {
  const [spotifyData, setSpotifyData] = useState<NowPlayingTrackResponse>()
  useEffect(() => {
    fetch('/api/spotify')
      .then((res) => res.json())
      .then((data) => setSpotifyData(data))
  }, [])
  console.log(spotifyData)
  return (
    <li>
      <p>{spotifyData?.title}</p>
    </li>
  )
}
