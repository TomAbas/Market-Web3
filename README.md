# Metaspacecy Xmas Event Interface <!-- omit in toc -->

[![https://badges.frapsoft.com/os/mit/mit.svg?v=102](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)

<img src="./assets/icon.png" alt="Metaspacecy Logo">

Published on [GitHub](https://github.com/MetaSpacecy/metaspacecy-xmas-event.git)

## Installation

We recommend switching to Node.js version 10 to make sure common crypto dependencies work.

Use the package manager _[npm](https://nodejs.org/en/download/)_ to install package.

```bash
npm install
```

Use the package manager _[yarn](https://yarnpkg.com/getting-started/install)_ to install package.

```bash
yarn install
```

## Configuration

Copy _.env_ file.

```bash
cp -R .env.example .env
```

Fill in _.env_ file.

```bash
SKIP_PREFLIGHT_CHECK=
REACT_APP_CHAIN_ID=
REACT_APP_NETWORK_URL=
ENV=
```

## Available Scripts

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

_[MIT](https://spdx.org/licenses/MIT.html)_