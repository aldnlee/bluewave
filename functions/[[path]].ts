// @ts-ignore Hasil build server Astro
import { onRequest as astroHandler } from '../dist/server/entry.mjs';

export const onRequest = astroHandler;