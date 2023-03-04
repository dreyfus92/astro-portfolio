import { Buffer } from 'buffer/';
import type React from 'react';
import { useEffect, useState } from 'react';
import { FaSpotify } from 'react-icons/fa/index.js';

export type Artist = {
    name: string,
    images: Array<{ url: string }>,
    external_urls: { spotify: string },
    followers: { total: number },
}

export type NowPlayingTrackResponse = {
    isPlaying: boolean;
    title: string;
    artist: string;
    url: string;
    img: string;
};

// Get access token from Spotify
export const getAccessToken = async () => {
    // Get environment variables
    const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;
    const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
    const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64")
    const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });
    return response.json();
}

// Get authorization for currently playing scope
export const nowPlaying = async () => {
    const { access_token } = await getAccessToken();
    return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

//Get currently playing track
export const getCurrentTrack = async () => {
    const response = await nowPlaying();

    if (response.status === 204 || response.status > 400) {
        return new Response(JSON.stringify({ isPlaying: false }), {
            status: 200,
        });
    }

    const { item } = await response.json();

    const track = {
        isPlaying: true,
        title: item.name,
        artist: item.artists
            .map((_artist: Artist) => _artist.name)
            .join(", "),
        url: item.external_urls.spotify,
        img: item.album.images[0].url,
    };

    return new Response(JSON.stringify(track), {
        status: 200,
    });
};

export function SpotifyBadge():React.ReactElement{

    const [isPlaying, setIsPlaying] = useState(false)
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        getCurrentTrack().then((res) => res.json()).then((data: NowPlayingTrackResponse) => {
            console.log("Información obtenida: ", data.isPlaying, data.title, data.artist, data.url)
            setIsPlaying(data.isPlaying)
            setTitle(data.title)
            setArtist(data.artist)
            setUrl(data.url)
        })
    },[])

    return(
        <div className="group w-fit text-[11px] flex items-center justify-center font-medium rounded-lg hover:bg-[#87CB49] px-3 py-1">
    {
    isPlaying ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer noopener flex"
        className="flex items-center justify-around group-hover:text-gray-900"
      >
        <FaSpotify className='w-6 h-6'/>
        <p className="pl-2 group-hover:text-gray-900">
          {title} - {artist}
        </p>
      </a>
    ) : (
      <a
        href="https://open.spotify.com/user/1276702099?si=2475d23fbc7f410f"
        target="_blank"
        rel="noreferrer noopener flex"
        className="flex items-center justify-around group-hover:text-gray-900"
      >
        <FaSpotify className='w-6 h-6'/>    
        <p className="pl-2 group-hover:text-gray-900">
          Not playing anything right now!
        </p>
      </a>
    )
  }
</div>
    )
}
