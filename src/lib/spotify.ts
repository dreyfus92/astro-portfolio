type Artist = {
    name: string,
    images: { url: string }[],
    external_urls: { spotify: string },
    followers: { total: number },
}

export const getAccessToken = async () => {
    let refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;
    let clientId = import.meta.env.SPOTIFY_CLIENT_ID;
    let clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

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

export { nowPlaying };
export type { Artist };