This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
# then
npm run dev
# or
yarn dev
# or
pnpm dev
```

**Setup environment variables**

Create your file named `.env` in the root of your project and add the following content:

```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_PROD_API_ENDPOINT=

DATABASE_URL=

UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=

AUTH_SECRET=

# Required for workflow
QSTASH_URL=
QSTASH_TOKEN=

# RESEND_TOKEN=
RESEND_TOKEN=
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Chapter One 
Chapter one is a book management system that just allows you view books and borrow them its just an online simulation of a library...in which the libarian has access o the admin panel and can see who is borrowing books then you can get it phhysically from the library

## Admin Features
- Create new book 

To login to admin account use these details:
- email: **example@gmail.com**
- password: **example123**

# Features
- Sign and Login with your student information
- View all books on home page
- View book details page
- Borrow a book
- View your profile

# Tech Stack

- Next.js
- TypeScript
- PostgreSQL
- Upstash
- ImageKit
- Tailwind
- Resend