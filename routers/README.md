# Movies Challenge

This is a project challenge

- vite-version: 4._._
- react-version: 18._._
- typescript-version: 5._._
- sass-version: 1.66.\*

# System Requirements

- Node [v18.17.0]
- Npm [9.7.2]
- Yarn [1.22.19]
- Vite [3]

# Project Settings

# yarn install

    - Downloading project packages

# yarn dev

    - Starts the project(http:localhost:3000)

# yarn build

    - Outputs the project

# yarn watch

    - Shows the project live

# yarn eslint-fix

    - Shows rule errors in the project

# yarn prettier

    - Automatic solutions for rule errors in the project

# Library Mode

    - formats: ['es', 'umd'],

# Rollup Options

    - external: ['react', 'react/jsx-runtime', 'react-dom']
    - output
          - globals
                - react: 'React'
                - 'react/jsx-runtime': 'react/jsx-runtime'
                - 'react-dom': 'ReactDOM'

# Exporting Identification Types (d.ts) Configuration

    - dts (vite-plugin-dts)
        - outDir: path.resolve(__dirname, 'dist')
        - insertTypesEntry: true

# Package Output

    - "main": "./dist/router.umd.js"
    - "module": "./dist/router.es.js"
    - "types": "./dist/index.d.ts"
    - "exports":
        - "types": "./dist/index.d.ts"
        - "import": "./dist/router.es.js"
        - "require": "./dist/router.umd.js"
    - /Link
        - "types": "./dist/components/Link.d.ts"
        - "import": "./dist/router.es.js"
        - "require": "./dist/router.umd.js"

# Main Package Setting

    - devDependencies
        - "@aioc-ui/router": "file: ``Library file path`` ",

# Output Example Uses

    - import Link from '@aioc-ui/router/Link' or import Link from '@aioc-ui/router';

# Dependencies

    - Library Mode

        # peerDependencies
            - react
            - react-dom
            - wouter

# Developer Depencies

    - vite
    - eslint & eslint-plugins
    - prettier
    - lint-staged
    - husky

# Project Folder Structure

```
├── /.husky
├── /public
├── /src
│   ├── /components
│   ├── /constants
│   ├── /hooks
|   ├── /middleware
│   ├── /utils
│   ├── /views
│   ├── index.ts
├── .env
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc.json
├── index.html
├── tsconfig.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vite.config.ts
├── yarn.lock
```
