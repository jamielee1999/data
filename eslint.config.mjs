// eslint.config.mjs
import ito from '@ito-frontend/eslint-config';
import eslintPluginAstro from 'eslint-plugin-astro';
import tailwind from 'eslint-plugin-tailwindcss';

export default ito({
  framework: 'react',
  tailwind: true,
  checkFile: {
    enabled: true,
    ignores: ['README.md'],
    files: ['/src/**/*.astro'],
  },
  otherConfigs: [
    ...eslintPluginAstro.configs.recommended,
    ...tailwind.configs['flat/recommended'],
    {
      name: 'tailwindcss:rules',
      rules: {
        'tailwindcss/no-custom-classname': 'off',
      },
      settings: {
        tailwindcss: {
          // These are the default values but feel free to customize
          callees: ['classnames', 'clsx', 'ctl', 'cn'],
        },
      },
    },
  ],
});
