# Minimal microfrontend (React + TypeScript)

- `src/host`: the page (port 3000). Loads Header and Content, has its own footer.
- `src/header`: exposes `Header` (port 3001, also viewable on its own).
- `src/content`: exposes `Content` (port 3002, also viewable on its own).

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit the `<ul>` in `src/content/Content.tsx` to change the data.
