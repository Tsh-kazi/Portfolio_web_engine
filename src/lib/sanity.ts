import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

/**
 * Sanity client — only instantiated when a valid project ID is configured.
 * Sanity validates that projectId matches /^[a-z0-9-]+$/, so we guard here
 * to allow local builds before the real ID is added to .env.local.
 */
export const client =
  projectId && /^[a-z0-9-]+$/.test(projectId)
    ? createClient({
        projectId,
        dataset,
        apiVersion: '2026-06-03',
        useCdn: false,
      })
    : null;
