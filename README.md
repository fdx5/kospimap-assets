# kospimap-assets

Large static files of kospimap.com (3D models and textures, videos, audio, images), served from
GitHub Pages so the site's own server does not carry their traffic. Copied from the site's
`frontend/public` by `scripts/build_asset_cdn.py`; the site redirects to a file here only while
its own copy is byte-identical (SHA-1 in `backend/app/data/asset_cdn.json`).
Texture and model sources and licenses: see the site repository (`frontend/public/3d/walk/tex/sources-*.json`, `docs/`).
