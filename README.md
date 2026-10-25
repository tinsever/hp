# tinsever-website

Personal site and blog for [Tin Sever](https://github.com/tinsever), built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/).

## Requirements

- [Bun](https://bun.sh/) (or any package manager; lockfile is Bun)
- Node.js ≥ 22.12 (see `package.json` `engines`)

## Commands

| Command        | Action                          |
| -------------- | ------------------------------- |
| `bun install`  | Install dependencies            |
| `bun dev`      | Dev server at `localhost:4321`  |
| `bun build`    | Production build to `dist/`     |
| `bun preview`  | Preview the production build    |
| `bun run check`| Run `astro check` (types / Astro)|

## Configuration

Set the public site URL in `astro.config.mjs` (`site`) so canonical URLs and Open Graph `og:url` match your deployment (default: `https://tin-sever.de`). Change it if your live domain differs.

## Fonts

This repo uses self-hosted [Inter](https://github.com/rsms/inter) for sans-serif text and [Geist Mono](https://github.com/vercel/geist-font) for monospace text. WOFF2 files live under `public/fonts/`. Inter is licensed under the SIL Open Font License — see [Inter-LICENSE.txt](./public/fonts/Inter-LICENSE.txt). Geist font files are subject to the [Geist font license](https://github.com/vercel/geist-font/blob/main/LICENSE.txt). The MIT license in this repo applies to the site source code, not to those font binaries.

## License

Source code is licensed under the MIT License — see [LICENSE](./LICENSE).
