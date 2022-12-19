type track = {
    name: string,
    artists: { name: string }[],
    album: { images: { url: string }[] },
    external_urls: { spotify: string }
};

type artist = {
    name: string,
    images: { url: string }[],
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

const getAccessToken = async () => {
    const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;
    const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${clientId}:${clientSecret}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    })

    return response.json();
}

const nowPlaying = async () => {
    const { access_token } = await getAccessToken();

    return fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};

export const get = async () => {
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
            .map((_artist: artist) => _artist.name)
            .join(", "),
        url: item.external_urls.spotify,
        img: item.album.images[0].url,
    };

    return new Response(JSON.stringify(track), {
        status: 200,
    });
};