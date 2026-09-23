# Aaron Udho: portfolio

Video-game themed engineering portfolio built with **React + Vite** (JavaScript, JSX, HTML, CSS).
Every word, number and photo on the site comes from **`src/data.js`**, so updating the site means editing that one file.

---

## Put it on GitHub Pages (about 5 minutes, free)

1. **Make the repo.** On github.com click **New repository**. Name it `portfolio` (or anything), set it to **Public**, and click **Create repository**. Don't add a README.
2. **Upload the files.** On the new repo page click **uploading an existing file**. Drag in *everything inside this folder* (not the folder itself): `src`, `public`, `scripts`, `.github`, `index.html`, `package.json`, `package-lock.json`, `vite.config.js`, `.gitignore`, `README.md`. Click **Commit changes**.
   - `.github` is a hidden folder. On a Mac press **Cmd + Shift + .** in Finder to show it. On Windows: File Explorer > View > Show > Hidden items.
   - If it still won't upload, click **Add file > Create new file**, type `.github/workflows/deploy.yml` as the name, paste in the contents of that file from this folder, and commit.
3. **Turn on Pages.** Go to **Settings > Pages**. Under *Build and deployment*, set **Source** to **GitHub Actions**.
4. **Wait for the green check.** Open the **Actions** tab. The "Deploy portfolio to GitHub Pages" run takes about a minute. If it hasn't started, click it and press **Run workflow**.
5. **Your link:** `https://YOUR-USERNAME.github.io/portfolio/`
   Each project also has its own link, e.g. `.../portfolio/#phone-stand` or `.../portfolio/#engine`.

Every time you change a file on GitHub (the pencil icon works fine), the site rebuilds itself.

> Want the link to be just `https://YOUR-USERNAME.github.io/`? Name the repo exactly `YOUR-USERNAME.github.io` instead.

---

## Editing content

Open `src/data.js`:

- **Change text or numbers:** edit the strings.
- **Add your GitHub link:** fill in `github` and `githubLabel` in `player`.
- **Add a project:** copy one object in `projects`, give it a new `id`, drop photos in `src/assets/`, import them at the top of the file, and fill in the fields. The project filters, level numbers, "Explored" counter and project page all update on their own.
- **Link a PDF or code:** put the file in `public/` and add `links: [{ label: 'Read it', href: './your-file.pdf' }]` to the project.
- **Mark a certification as earned:** set `unlocked: true` in `achievements`.

## Run it on your computer (optional)

Needs Node.js 20.19+ or 22+.
```bash
npm install
npm run dev        # opens http://localhost:5173
npm run build      # the finished site goes in dist/
```

## What's inside

- `src/data.js`: all content
- `src/components/Projects.jsx`: the "level select" project grid and filters
- `src/components/ProjectView.jsx`: the project page (photo viewer, objectives, patch notes)
- `src/components/StandSim.jsx`: playable model of the herringbone phone stand
- `src/gears.js`: gear geometry (all gears share one module, so they mesh)
- `src/motion.jsx`: animation clock, reduced-motion support, and the Konami-code "overdrive"
- `src/route.js`: gives every project its own link and makes the Back button close it
- `.github/workflows/deploy.yml`: builds and publishes the site to GitHub Pages
- `public/`: files served as-is (the trunk reacher notebook PDF)
