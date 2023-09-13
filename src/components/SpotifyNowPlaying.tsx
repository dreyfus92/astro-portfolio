import { useState, useEffect } from "preact/hooks"
import { getCurrentTrack } from "@utils/spotify"
import type { FunctionalComponent } from "preact"
import type { NowPlayingTrackResponse } from "@utils/spotify";

export const SpotifyNowPlaying: FunctionalComponent = () => {
    const [data, setData] = useState<NowPlayingTrackResponse>()

    useEffect(() => {
        getCurrentTrack().then(res => res.json()).then(x => setData(x))
    }, [])

    return (
        <div
            id="spotify"
            class="group w-fit text-[11px] flex items-center justify-center font-medium rounded-lg hover:bg-neon-green px-3 py-1"
        >
            { data &&
                data.isPlaying ? (
                    <a
                        href={data.url}
                        target="_blank"
                        rel="noreferrer noopener flex"
                        class="flex items-center justify-around group-hover:text-gray-900"
                    >
                        {/* <Icon
          name="mdi:spotify"
          class="group-hover:text-gray-900 text-neon-green"
        /> */}
                        <p class="pl-2 group-hover:text-gray-900">
                            {data.title} - {data.artist}
                        </p>
                    </a>
                ) : (
                    <a
                        href="https://open.spotify.com/user/1276702099?si=2475d23fbc7f410f"
                        target="_blank"
                        rel="noreferrer noopener flex"
                        class="flex items-center justify-around group-hover:text-gray-900"
                    >
                        {/* <Icon name="mdi:spotify" /> */}
                        <p class="pl-2 group-hover:text-gray-900">
                            Not playing anything right now!
                        </p>
                    </a>
                )
            }
        </div>
    )
}