# Configuration

## Add an application

Use **Settings & Import → Add application**. Set a name, category, optional URL, icon, and description. You can pin important entries to Favorites. Entries without a URL remain in the directory and display a prompt to configure their address.

## Import and export

Export downloads `home-lab-companion-config.json`. Import validates that the JSON has an `apps` array and then asks for confirmation before replacing the current directory.

The included `config/applications.example.json` is a portable sample. It is not automatically loaded by the app; use Settings → Import to load a JSON configuration into browser storage.

## Data storage

The application stores workspace preferences and the directory in localStorage for the current browser origin. Browser data may be cleared by browser settings and is not shared across devices. Export backups before clearing browser data or changing hostnames.
