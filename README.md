# SSSNAKE

![](https://media.giphy.com/media/RlqvXhhDZNcZunAvNd/giphy.gif)

[![Build Status](https://travis-ci.org/hex22a/sssnake.svg?branch=master)](https://travis-ci.org/hex22a/sssnake)

## What

This is the most basic <a href="https://en.wikipedia.org/wiki/Snake_(video_game_genre)">Snake Game</a> implemented on TypeScript and running in your browser.

Latest demo is available at https://hex22a.github.io/sssnake/

To control snake use arrow key on your keyboard. The only way to restart the game is to completely reload the page (**⇧⌘+R**).

## Why

First of all: because I can. And then I wish at some point to train an AI to play this game and somehow visualise the "game recordings". Then this exercise will be useful.

### Deployment

```bash
yarn deploy:patch
```

Increases patch number by [semver](https://semver.org/spec/v2.0.0.html) and pushes the corresponding commit to current branch.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
