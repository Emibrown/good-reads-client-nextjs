This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First make sure the graphQL server is running
[https://github.com/Emibrown/Good-Reads-App](https://github.com/Emibrown/Good-Reads-App)

Next Setup environment variable on:

```bash
# .env.local
NEXT_PUBLIC_HTTP_URL=<graphQl_server_url_http> #Example http://localhost:8081/graphql
NEXT_PUBLIC_WS_URL=<graphQl_server_url_ws>   #Example ws://localhost:8081/graphql

...

Next Install all npm dependencies

```bash
npm install

...

Finally, run the next.js server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.