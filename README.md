# Anime Codex Gallery - GitHub.io Ready

Website ini dirancang khusus untuk layout mobile (prioritas) dengan tema Anime Fantasy RPG.

## Cara Upload ke GitHub.io:
1. Buat repository baru di GitHub (contoh: `my-anime-codex`).
2. Upload semua file ini (`index.html`, `detail.html`, `style.css`, `app.js`, `data.js`) ke repository tersebut.
3. Pergi ke **Settings > Pages**.
4. Pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu beberapa menit, website Anda akan aktif di `https://username.github.io/my-anime-codex/`.

## Cara Menggunakan Google Sheets:
1. Buat Google Form / Sheet dengan kolom: `id`, `name`, `nickname`, `rarity`, `tags`, `mainImage`, `story`, `extraImage1`, `extraImage2`.
2. Di Google Sheets, klik **File > Share > Publish to web**.
3. Pilih format **Comma-separated values (.csv)**.
4. Copy link CSV tersebut.
5. Buka file `data.js`, masukkan link ke `googleSheetUrl` dan set `useGoogleSheet: true`.

## Fitur:
- **Page 1**: Search, Multi-Tag Filter, Rarity Filter, Grid 3 Layout.
- **Page 2**: Detail Character, Story, Rarity Badge, Manual Slide Gallery.
- **Interaktif**: Loading screen keren, Image Pop-up (Modal), Animasi transisi.
- **Tema**: Merah (Red Theme) dengan ornamen RPG.
