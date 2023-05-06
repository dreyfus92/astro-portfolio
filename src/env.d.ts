/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly SPOTIFY_REFRESH_TOKEN: string;
    readonly SPOTIFY_CLIENT_ID: string;
    readonly SPOTIFY_CLIENT_SECRET: string;
    readonly TIGRIS_BRANCH: string;
    readonly TIGRIS_PROJECT_NAME: string;
    readonly TIGRIS_PROJECT_ID: string;
    readonly TIGRIS_CLIENT_SECRET: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
