// this is something specific to this deployment,
// VERCEL_URL will be the deployment url that vercel uses and ultimately proxies with any kind of domain
// assignment, as such, the CORS requests will fail, even tho they are the same deployment.
// I've set this value to https://nextjs-example.micro-stacks.dev as it's where this demo will live
// in your own apps you should do something similar
const CUSTOM_APP_URL_ENV_VAR =
  process.env.NODE_ENV === 'production' && 'https://nextjs-example.micro-stacks.dev';
const VERCEL_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

export const APP_URL =
  CUSTOM_APP_URL_ENV_VAR ?? VERCEL_URL ? `https://${VERCEL_URL}` : 'http://localhost:3000';
