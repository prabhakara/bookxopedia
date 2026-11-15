# Bookxopedia

Bookxopedia is a Next.js app powered by the Google Books API and a local SQLite database.

## Setup

1. Install dependencies:

   ```sh
   npm ci
   ```

2. Copy `.env.example` to `.env` (on Windows PowerShell, run
   `Copy-Item .env.example .env`) and set `NEXT_PUBLIC_BOOKS_API_KEY` to a
   Google Books API key. `DATABASE_URL` can remain set to `file:./data.db` for
   local development.

3. Generate the Prisma client, create the database, and seed the genres:

   ```sh
   npx prisma generate
   npx prisma migrate deploy
   npx prisma db seed
   ```

## Run in development

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is in use,
start the app on another port with `npm run dev -- -p 3001`.

## Run in production

`npm start` runs the production server and requires a production build first:

```sh
npm run build
npm start
```

The build generates Prisma Client, applies pending migrations, seeds the genre
list, and builds the app. Book data is fetched when the pages are requested, so
a valid Google Books API key must be configured before building and running the
app. To use a non-default port, run `npm start -- -p 3001`.

## Learn more

See the [Next.js documentation](https://nextjs.org/docs) and
[Prisma documentation](https://www.prisma.io/docs).
