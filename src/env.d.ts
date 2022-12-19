/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly SPOTIFY_REFRESH_TOKEN: string;
    readonly SPOTIFY_CLIENT_ID: string;
    readonly SPOTIFY_CLIENT_SECRET: string;
    readonly URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
