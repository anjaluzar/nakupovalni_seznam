Setup for Vercel (frontend) and Render (backend)

Client (Vercel):
- Set environment variable `REACT_APP_API_URL` to your Render backend URL, e.g. https://your-render-service.onrender.com
- Vercel will inject this at build time. Example: `REACT_APP_API_URL=https://nakupovalni-server.onrender.com`

Server (Render):
- In Render service settings, set `CLIENT_ORIGIN` to your Vercel deployment URL, e.g. https://your-frontend.vercel.app
- Ensure `MONGO_URI` is set in Render environment variables.

Local development:
- `client/.env` may contain `REACT_APP_API_URL=http://localhost:5000` for local testing.
- Server defaults to permissive CORS when `CLIENT_ORIGIN` is not set.

Notes:
- The client now uses `process.env.REACT_APP_API_URL` (falls back to `http://localhost:5000`).
- The server reads `CLIENT_ORIGIN` and will restrict CORS to that origin when set.
- After changing env vars on Vercel/Render, redeploy each service.
