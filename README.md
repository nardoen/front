# Nardoen Frontend

### 1. Environment Setup

Ensure your development environment is properly configured. Install all dependencies using:
```bash
npm install
```

### 2. Start Development Server

To start the development server, run:
```bash
npm run dev
```
The application will be available on the Vite development server.

You can define a proxy in `vite.config.js` to point to your local Django server endpoint.

### 3. Production

1. Build the application:
   ```bash
   npm run build
   ```

2. The `dist/` folder will contain the production build.

3. Serve the `dist/` folder through your Django backend or any web server.

### Django Integration

To integrate with Django, serve the build as static files:

1. Copy the contents of the `dist/` folder to your Django static folder.
2. Ensure Django is configured to serve static files correctly.



