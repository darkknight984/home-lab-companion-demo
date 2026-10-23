# Installation

## Deploy with Docker Compose

1. Copy the project folder to your Docker host.
2. Review `compose.yaml`; change the published port if 8080 is already in use.
3. Start the container:

   ```bash
   docker compose up -d --build
   ```

4. Confirm the container is running:

   ```bash
   docker compose ps
   docker compose logs --tail=50 home-lab-companion
   ```

5. For production access, configure your reverse proxy to send HTTPS traffic to the container's port 80. Do not expose an unauthenticated management interface directly to the public internet; this app is a link directory, but the linked services may be sensitive.

## Local development

Run `python3 -m http.server 8080` from the project directory and open `http://localhost:8080`. A service worker will register on localhost. Do not treat the Python server as a production server.

## PWA installation

Open the site over HTTPS in a compatible browser and use that browser's install option. Exact UI wording varies by browser and operating system.
