# Frutiger Surfer 🌊

Endless runner game with Frutiger Aero aesthetic.

---

## Supabase Setup (do this first)

1. Go to your Supabase project → **SQL Editor**
2. Run this SQL to create the scores table:

```sql
create table scores (
  id bigserial primary key,
  username text not null,
  score integer not null,
  created_at timestamptz default now()
);

-- Allow anyone to read and insert (no login needed)
alter table scores enable row level security;

create policy "Anyone can read scores"
  on scores for select using (true);

create policy "Anyone can insert scores"
  on scores for insert with check (true);
```

3. Go to **Settings → API** and copy:
   - **Project URL** (looks like `https://xxxx.supabase.co`)
   - **anon public** key

---

## Vercel Setup

1. Push this folder to a GitHub repo
2. Import the repo on [vercel.com](https://vercel.com)
3. In Vercel project settings → **Environment Variables**, add:
   - `SUPABASE_URL` = your project URL
   - `SUPABASE_ANON_KEY` = your anon key
4. Deploy!

**Wait — one more step.** Because this is a plain HTML file (no framework), you need to pass the env vars into the page. Add this tiny `_headers` trick OR use a simple script injection:

### Option A: Use a `api/config.js` serverless function (recommended)

Create `api/config.js`:
```js
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`
    window.ENV_SUPABASE_URL = "${process.env.SUPABASE_URL}";
    window.ENV_SUPABASE_ANON = "${process.env.SUPABASE_ANON_KEY}";
  `);
}
```

Then add this line to `index.html` in the `<head>` before the closing `</head>`:
```html
<script src="/api/config"></script>
```

### Option B: Hardcode directly (simpler, less secure but fine for anon key)
In `index.html`, replace the two lines at the top of the script:
```js
const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
const SUPABASE_ANON = 'your-anon-key-here';
```

The anon key is safe to expose publicly — it's read-only and protected by Row Level Security.

---

## Controls

| Key | Action |
|-----|--------|
| ← → | Switch lanes |
| Space | Jump / Double jump |

---

## Game feel tips
- Speed increases every 200 points
- Towers spawn faster as score climbs
- Dodge left/right between 3 lanes
- Fish appear as background decoration only (not obstacles)
