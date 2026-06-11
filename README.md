# testApp - Botanical Plant Search Application

A Svelte-based web application that integrates with the Trefle botanical API to provide a searchable database of plants. Users can search for plants by name and retrieve detailed information including scientific names, families, and botanical data.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [TREFLE API Overview](#trefle-api-overview)
- [API Setup & Configuration](#api-setup--configuration)
- [Project Architecture](#project-architecture)

---

## Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- A Trefle API account and token (see [API Setup](#api-setup--configuration))

### Steps

1. **Navigate to the testApp directory:**
   ```bash
   cd testApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install all required packages including:
   - `svelte` - UI framework
   - `@sveltejs/kit` - Full-stack framework
   - `typescript` - Type safety
   - `vite` - Build tool
   - `trefle-api` - Trefle API package

---

## Running the Application

### Development Mode

Start the development server with hot module reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Type Checking

Check TypeScript types without building:

```bash
npm run check
```

Watch for type errors automatically:

```bash
npm run check:watch
```

---

## TREFLE API Overview

### What is Trefle?

[Trefle](https://trefle.io) is a comprehensive, open-source API providing access to an extensive botanical database with information on plants, species, and botanical data. It's free to use and doesn't require authentication for basic requests, though using an API token allows for higher rate limits.

### Features Used

This application leverages Trefle to:
- **Search plants** by common or scientific name
- **Retrieve plant details** including:
  - Common and scientific names
  - Plant family classification
  - Genus information
  - Image URLs for visual reference
  - Historical data (year of description)
  - Taxonomic rank

### API Endpoints Used

- **Plant Search**: `GET https://trefle.io/api/v1/plants/search?q={query}&token={token}`
  - Query plants by keyword
  - Returns paginated results with plant data

- **Species Filter**: `GET https://trefle.io/api/v1/species?token={token}&filter[...]=value`
  - Advanced filtering of species data
  - Supports multiple filter parameters

---

## API Setup & Configuration

### Getting a Trefle API Token

1. Visit [https://trefle.io](https://trefle.io)
2. Sign up for a free account
3. Navigate to your profile/API settings
4. Copy your API token

### Environment Configuration

This project uses environment variables to securely manage the API token.

#### Step 1: Create a `.env.local` file

In the root of the `testApp` directory, create a `.env.local` file:

```bash
# testApp/.env.local
PUBLIC_TREFLE_API_TOKEN=your_api_token_here
```

**Important:** Replace `your_api_token_here` with your actual Trefle API token from your account.

#### Step 2: Environment Variable Handling

The app uses `$env/dynamic/public` from SvelteKit to access the token:

```typescript
// src/lib/apis/trefle.ts
import { env as publicEnv } from '$env/dynamic/public';

export const TREFLE_API_BASE_URL = 'https://trefle.io/api/v1';

// The token is accessed at runtime
const url = `${TREFLE_API_BASE_URL}/plants/search?token=${publicEnv.PUBLIC_TREFLE_API_TOKEN}&q=${query}`;
```

### Why CORS Handling is Important

Due to browser security restrictions (CORS), direct requests to external APIs from client-side code are blocked. This app implements a two-tier approach:

**Browser (Client-Side):**
- Routes search queries to the local endpoint: `/api/plants?q=...`
- This avoids CORS issues while protecting the API token

**Server-Side:**
- The `/api/plants` endpoint (in `src/routes/api/plants/+server.ts`) handles the actual Trefle API call
- Includes the API token in the request
- Returns results back to the client

#### How It Works

```typescript
export async function searchPlants(urlOrQuery: string = ''): Promise<any[]> {
    if (browser) {
        // Client code: route through our server endpoint
        url = `/api/plants?q=${encodeURIComponent(urlOrQuery)}`;
    } else {
        // Server code: call Trefle directly with token
        url = `${TREFLE_API_BASE_URL}/plants/search?token=${publicEnv.PUBLIC_TREFLE_API_TOKEN}&q=${encodeURIComponent(urlOrQuery)}`;
    }
    
    const response = await fetch(url);
    return response.json();
}
```

---

## Project Architecture

```
testApp/
├── src/
│   ├── lib/
│   │   ├── apis/
│   │   │   └── trefle.ts              # Trefle API integration
│   │   ├── components/
│   │   │   ├── +SearchField.svelte    # Search input component
│   │   │   ├── +CropList.svelte       # Plant list display
│   │   │   └── +CropDetails.svelte    # Plant details view
│   │   └── types/
│   │       ├── plants.ts              # Plant data types
│   │       └── crops.ts               # Crop data types
│   ├── routes/
│   │   ├── +page.svelte               # Main page
│   │   └── api/
│   │       └── plants/
│   │           └── +server.ts         # Server-side API handler
│   ├── app.html
│   └── app.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── svelte.config.js
└── README.md
```

---

## Troubleshooting

### "API Token not found" Error

- Ensure `.env.local` file exists in the `testApp` directory
- Verify the `PUBLIC_TREFLE_API_TOKEN` variable is set correctly
- Restart the development server after updating `.env.local`

### CORS Errors

- Make sure all API requests go through `/api/plants` endpoint, not directly to Trefle
- The server-side routing ensures the token is included safely

### No Search Results

- Verify your Trefle API token is valid at [https://trefle.io](https://trefle.io)
- Check the browser console for error messages
- Try a different plant name (e.g., "tomato", "basil", "rose")

---

## Resources

- [Trefle API Documentation](https://trefle.io/api)
- [SvelteKit Documentation](https://kit.svelte.dev)
- [Vite Documentation](https://vitejs.dev)
