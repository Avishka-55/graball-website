# GrabAll website

Official website and public downloads for **GrabAll**, the download manager for
Android and Windows.

- Site: https://avishka-55.github.io/graball-website/ (GitHub Pages)
- Android app: GrabAll for Android (Kotlin) — private repo `Avishka-55/grab-all`
- PC app: GrabAll Download Manager for Windows / Linux / macOS (Go) — private
  repo `Aviz-66/grab-all-pc`

## What lives here

- `index.html`, `styles.css`, `app.js` — the static website (no build step).
- `latest.json` — the current version, file, size, SHA-256 and download URL for
  each app. The site reads this file, so the download buttons always show the
  newest release.
- `.github/workflows/sync-releases.yml` — automation that mirrors new releases
  from the two private app repos into public releases in this repo.

## What does NOT live here

**Source code.** This repo contains only the website and the built release
files (APK, zips, extension). The app source stays in the private repos and
is never copied here. The browser extension zip ships as plain JavaScript, as
all browser extensions do — that is the only readable code in the downloads.

## How releases get here

Every 6 hours (or when run by hand from the Actions tab) the sync workflow
checks the latest release of both private app repos. When a new version
appears it downloads only the built assets, publishes them as a release in
this repo (`android-vX.Y.Z` / `pc-vX.Y.Z`), and updates `latest.json`.

The workflow needs a token that can *read* the two private repos. That token
is **not** in this repo. It is the Actions secret `SYNC_TOKEN`, created once
by the repo owner as a fine-grained personal access token with **Contents:
Read-only** on `Avishka-55/grab-all` and `Aviz-66/grab-all-pc` only, and
revocable at any time. Without it the workflow skips cleanly and the site
keeps serving the last mirrored release. See the header comment in
`.github/workflows/sync-releases.yml` for the exact steps.
