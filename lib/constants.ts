const VERCEL_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
export const URL = VERCEL_URL ? `https://${VERCEL_URL}` : 'http://localhost:3000';
