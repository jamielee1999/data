// eslint.config.mjs
import ito from '@ito-frontend/eslint-config';

export default ito({
  framework: 'astro',
  tailwind: true,
  checkFile: {
    enabled: true,
    ignores: ['README.md', 'src/**/index.astro', 'src/**/*.ts'],
    files: ['src/**/*.astro'],
    fileNamingStyle: 'PASCAL_CASE',
  },
});
