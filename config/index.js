// import chalk from 'chalk';

import development from './config.development';
import production from './config.production';

const config = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production' ? production : development;
config.env = process.env;

export default config;
