# Security notes

- The app does not require Docker socket access, host mounts, API credentials, or privileged container mode.
- Keep each linked service protected by its own authentication and network controls.
- Use HTTPS for deployment and prefer HTTPS links for the services you add.
- Do not put passwords, access tokens, API keys, private IP allowlists, or other secrets in app descriptions or URLs.
- Imported JSON is treated as configuration data; import only files you trust.
- The current implementation does not query services for live status. Do not interpret a link or favorite indicator as an uptime check.
- The Compose file uses a read-only root filesystem, drops Linux capabilities except binding the web port, and enables `no-new-privileges`. Review these settings against your deployment environment before production use.
- This is a static launchpad, not an authenticated multi-user application. Browser-local configuration is not centrally managed.
