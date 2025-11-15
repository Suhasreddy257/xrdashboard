const fs = require('fs');
const dotenv = require('dotenv');

// Determine mode from CLI arg: node set-env.js [local|production]
const mode = (process.argv[2] || 'local').toLowerCase();
const isProduction = mode === 'production';

// Load a single .env file at project root
const result = dotenv.config();

if (result.error) {
  console.error('❌ Failed to load .env. Ensure the file exists at project root.');
  process.exit(1);
}

const env = result.parsed;
const targetPath = './src/environments/environment.ts';
const apiUrl = isProduction ? env.API_URL_PRODUCTION : env.API_URL_LOCAL;

const envFileContent = `
export const environment = {
  production: ${isProduction},
  apiUrl: '${apiUrl}',
  appVersion: '${env.APP_VERSION}'
};
`;

fs.writeFileSync(targetPath, envFileContent);
console.log(`✅ Environment file generated successfully for ${isProduction ? 'production' : 'local'} at`, targetPath);
