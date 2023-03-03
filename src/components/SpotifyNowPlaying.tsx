import type React from 'react';
import { getCurrentTrack } from "../lib/spotify";
import {FaSpotify} from 'react-icons/fa'

const nowPlayingTrack = await getCurrentTrack()
const data = await nowPlayingTrack.json()

export function SpotifyBadge():React.ReactElement{
    console.log(data)

    return(
        <div className="group w-fit text-[11px] flex items-center justify-center font-medium rounded-lg hover:bg-[#87CB49] px-3 py-1">
    {
    data.isPlaying ? (
      <a
        href={data.url}
        target="_blank"
        rel="noreferrer noopener flex"
        className="flex items-center justify-around group-hover:text-gray-900"
      >
        <FaSpotify className='w-6 h-6'/>
        <p className="pl-2 group-hover:text-gray-900">
          {data.title} - {data.artist}
        </p>
      </a>
    ) : (
      <a
        href="https://open.spotify.com/user/1276702099?si=2475d23fbc7f410f"
        target="_blank"
        rel="noreferrer noopener flex"
        className="flex items-center justify-around group-hover:text-gray-900"
      >
        <FaSpotify/>    
        <p className="pl-2 group-hover:text-gray-900">
          Not playing anything right now!
        </p>
      </a>
    )
  }
</div>
    )
}
