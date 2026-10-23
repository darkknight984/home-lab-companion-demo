# Home Lab Companion PWA

**Your Homelab. One Dashboard. Total Control.**

Home Lab Companion is a generic, mobile-friendly Progressive Web App (PWA) for organizing and opening self-hosted applications. It is inspired by a real multi-service homelab, but is designed so other people can adapt it to their own Docker hosts, NAS devices, and services.

## Included

- Responsive dashboard for phones, tablets, and desktop browsers
- Application directory with categories, search, favorites, and sorting
- Add, edit, and delete application entries
- Infrastructure view for NAS devices, servers, and administration tools
- Local browser storage
- JSON configuration import/export
- Dark and light themes
- PWA manifest and service worker for installability and cached app shell
- Example directory based on common homelab services
- No embedded passwords, API keys, tokens, or private keys

## Quick start

PWAs and service workers require a secure context. Use HTTPS for a real deployment, or `localhost` for local testing.

### Option A — Python test server

From this folder, run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` on the same computer. For access from another device, use an HTTPS web server or reverse proxy rather than exposing the Python development server to the internet.

### Option B — Docker

Build the included Nginx container:

```bash
docker compose up -d --build
```

Open `http://localhost:8080` for local testing. For production use, put the service behind your existing HTTPS reverse proxy.

## Configure your applications

1. Open **Settings & Import**.
2. Select **Add application**, or edit an existing card.
3. Set the application name, category, URL, icon, and description.
4. Use **Export configuration** to save a backup.
5. On another browser/device, use **Import configuration** to load the JSON backup.

The example directory includes representative entries for a homelab with NAS systems, Docker management, reverse proxies, monitoring, media, file services, backups, and documentation. URLs that were not confirmed are blank by design. Replace them with your own reachable URLs.

## Important behavior and limitations

- This is an **application launchpad**, not a Docker control plane.
- It does not connect to the Docker socket or Docker API.
- It does not perform live health checks or claim that a listed service is online.
- Browser local storage is per browser profile/device. It does not synchronize automatically.
- Offline support caches the PWA shell. External services still require a network connection.
- Use a complete `https://` or `http://` URL for each service. Prefer HTTPS.
- Authentication remains the responsibility of each linked service and your existing access controls.
- Avoid adding secrets to descriptions or URLs.
- Service worker and install behavior require HTTPS in production (or localhost during development).

## Project layout

```text
home-lab-companion/
├── index.html
├── manifest.json
├── service-worker.js
├── Dockerfile
├── compose.yaml
├── nginx.conf
├── assets/icon.svg
├── css/styles.css
├── js/config.js
├── js/app.js
├── config/applications.example.json
└── docs/
    ├── installation.md
    ├── configuration.md
    └── security.md
```

## Customization

The starter list lives in `js/config.js`. To reset the browser to the original starter list, open **Settings & Import → Restore sample directory**. Existing browser data will be replaced, so export first if you want to keep it.

## License

MIT. See `LICENSE`.
