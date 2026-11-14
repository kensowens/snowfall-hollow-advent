# Snowfall Hollow Advent Calendar

A cozy snowy-village advent calendar for kids. Static site: plain HTML/CSS/JS, no build step, no backend.
All art, text, code and music are original.

## Run locally
    python3 -m http.server 8000     # then open http://localhost:8000/

## Host
Upload the folder (index.html, css/, js/) to any static host (GitHub Pages, Netlify, Cloudflare Pages, S3...).
Fonts load from Google Fonts. If they are blocked, the site falls back to Georgia/cursive.

## URL options
- `?names=Ava,Leo`: prefill and save the children's names (share this link with family)
- `?preview=1`: unlock every day for testing
- `?today=2026-12-05`: pretend it's a given date (testing date locking)

## How it works
- Day N unlocks on December N in the viewer's local time. The whole calendar also stays open Jan 1–6.
- Opened days are saved in localStorage (`snowfallHollow.opened`). Names are saved in `snowfallHollow.names`.
- Use the gear button to change names. The music box is generated live with Web Audio.
- Content lives in `js/days.js` (list of 25 days), `js/stories.js` (stories and finale) and `js/games.js` (games).
