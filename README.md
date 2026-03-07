# nomox-frontend

SvelteKit frontend for Nomox.

## Local development

```sh
cp .env.example .env   # set VITE_API_URL to your backend address
npm install
npm run dev
```

Open `http://localhost:5173`.

## Docker (local)

`VITE_API_URL` is baked into the bundle at build time, so pass it as a build argument.
The value must be reachable from the **browser**, not just the container network.

```sh
docker build \
  --build-arg VITE_API_URL=http://localhost:8000 \
  -t nomox-frontend .

docker run -p 3000:3000 nomox-frontend
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push the repo to GitHub / GitLab / Bitbucket.
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Under **Settings → Environment Variables** add:

| Variable | Example value |
|---|---|
| `VITE_API_URL` | `https://api.nomox.io` |

4. Deploy. Vercel auto-detects SvelteKit and runs it as a Node.js server.

> `VITE_` variables are embedded at build time. Changing them in Vercel requires a redeploy.

## Environment variables

See [`.env.example`](.env.example) for all available variables.
