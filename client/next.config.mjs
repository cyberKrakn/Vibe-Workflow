import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load root .env so monorepo env vars are available to Next.js API routes
const rootEnv = path.resolve(process.cwd(), '../.env');
if (fs.existsSync(rootEnv)) {
  for (const line of fs.readFileSync(rootEnv, 'utf-8').split('\n')) {
    const eq = line.indexOf('=');
    if (eq > 0) {
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim();
      if (key && !process.env[key]) process.env[key] = val;
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['workflow-builder'],
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    config.resolve.alias['react'] = path.resolve(__dirname, '../node_modules/react');
    config.resolve.alias['react-dom'] = path.resolve(__dirname, '../node_modules/react-dom');
    return config;
  },
};

export default nextConfig;
