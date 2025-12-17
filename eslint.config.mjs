import { config as defaultConfig } from '@epic-web/config/eslint'
import perfectionist from 'eslint-plugin-perfectionist'

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: [
      '.netlify/',
      'build/',
      'public/build/',
      'ignore/',
      'app/graphql/__generated/**',
    ],
  },
  ...defaultConfig,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'import/order': 'off', // Disable import/order in favor of native sort-imports
      'perfectionist/sort-interfaces': ['warn'],
      'perfectionist/sort-jsx-props': [
        'warn',
        {
          ignoreCase: true,
          order: 'asc',
          type: 'natural',
        },
      ],
      'perfectionist/sort-object-types': ['warn'],
      'perfectionist/sort-objects': [
        'warn',
        {
          ignoreCase: true,
          order: 'asc',
          partitionByComment: true,
          type: 'natural',
        },
      ],
    },
  },
]
