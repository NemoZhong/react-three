// https://umijs.org/config/
import { defineConfig } from 'umi';
import { resolve } from 'path';
import { routes } from './routes';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  base: './',
  publicPath: './',
  alias: {
    '@': resolve(__dirname, './src'),
  },
  targets: {
    ie: 11,
  },
  mock: {
    exclude: process.env.API_ENV === 'mock' ? [] : ['mock'],
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  title: 'demo',
  ignoreMomentLocale: true,
});
