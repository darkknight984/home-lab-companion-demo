# Home Lab Companion — GitHub Pages Demo

This folder is a **public, static demo build** intended for a hackathon review. It is separate from any private NAS deployment.

## Safety properties

- Sample service URLs are blank by default, including the primary NAS, secondary NAS, and wiki.
- No Docker API, UGOS API, private network, monitoring endpoint, or live service check is configured.
- The interface runs in the visitor's browser and uses browser-local storage.
- The banner identifies the site as a demo with no live NAS connection.
- The app is a static HTML/CSS/JavaScript site; it does not require a server-side runtime.

**Important:** Review the published files before deployment. Do not add credentials, tokens, internal hostnames, private IP addresses, or live NAS URLs. Any URLs manually entered into the browser-based app are stored in that visitor's browser and are not sent to your NAS by this static site.

## Publish with GitHub Pages

1. Create a **new public GitHub repository** for the demo, for example `home-lab-companion-demo`.
2. Upload the *contents of this folder* to the repository root. `index.html` should be at the root, not inside another nested folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then save.
6. Wait for GitHub Pages to finish publishing, then open the published URL shown in Settings → Pages.
7. Test the URL in a private/incognito window and on a device outside your home network.

GitHub's UI may change. Use GitHub's current Pages documentation if a menu label differs:
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Before sharing with UGREEN

- Confirm the site works when your DX4700 is powered off.
- Search the repository files for `404nas.com`, `192.168.1.`, `100.123.`, and other private hostnames or addresses; none should be included as service targets.
- Confirm there are no secrets in the repository history or files.
- Confirm all service URLs are blank in the sample directory.
- Describe the page as a **concept/demo PWA**, not a completed UGREEN AI NAS Skill or live NAS integration.

## Local test

From this folder, run:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`. The Python server is for local testing only; do not expose it directly to the internet.

## Feature and implementation note

This is an application launchpad prototype. Search, categories, favorites, theme preferences, and browser-local configuration are client-side features. It does not report live online/offline status and does not control containers.
