# Nardoen Frontend

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

For production, create a `.env.production` file:

```env
VITE_API_URL=https://your-production-domain.com
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`


## 🚀 Deployment

### 3-Development

1. Ensure Django backend is running on `http://localhost:8000`
2. Run `npm run dev`
3. Access the app at `http://localhost:5173`

### 4-Production

1. Build the application:
   ```bash
   npm run build
   ```

2. The `dist/` folder contains the production build

3. Serve the `dist/` folder through your Django backend or web server

### Django Integration

For Django integration, the build can be served as static files:

1. Copy the `dist/` contents to your Django static folder
2. Configure Django to serve the React app for non-API routes
3. Set `VITE_API_URL` to your production domain or leave empty for relative URLs


