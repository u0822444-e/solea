# SOLEA — GitHub Pages deployment

These files configure an existing React + Vite project for GitHub Pages.

## Copy into your existing project

Copy `.github/workflows/deploy.yml` into your project root. Merge the supplied
`vite.config.js`, `index.html`, and `.gitignore` with existing files; do not delete
your app code.

Expected key files:

```text
solea-prototype/
├── .github/workflows/deploy.yml
├── src/main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

The Vite config assumes the repository is named `solea`, published at
https://u0822444-e.github.io/solea/. If the repo name differs, update `base`
to `'/YOUR-REPOSITORY-NAME/'`.

Ensure `package.json` has these scripts (keep your existing dependencies):

```json
"scripts": {
  "dev": "vite",
  "build": "vite",
  "preview": "vite preview"
}
```

## Test and push

Run in PowerShell from the project root:

```powershell
npm install
npm run build
git add .
git commit -m "Configure GitHub Pages deployment"
git push -u origin main
```

If Git says there is nothing to commit, continue with the push.

## Enable GitHub Pages

In the GitHub repository, open **Settings → Pages** and set **Build and deployment → Source**
to **GitHub Actions**. Then check the **Actions** tab for a successful deployment.

Site URL: https://u0822444-e.github.io/solea/

GitHub Pages serves static frontend files only. It does not run PHP, databases, or server-side authentication.
