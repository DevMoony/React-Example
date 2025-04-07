# Discord Bot Dashboard

A beautiful and responsive Discord bot dashboard with user leveling, boosters, and AFK tracking.

## Features

- Dashboard with bot statistics
- User leaderboard with level progression
- Server boosters list
- AFK user tracking
- Bot commands by category
- Dark theme design

## Deployment Instructions

### Frontend (GitHub Pages)

1. Create a repository on GitHub and push this project's code.
2. Set up GitHub Pages to deploy from the `main` branch.
3. Create a GitHub Secret named `API_URL` with your backend API server URL.
4. The dashboard will be available at `https://yourusername.github.io/unity-bot/dashboard/`.

### Backend (Any Node.js Host)

1. Set up your server environment.
2. Configure the following environment variables:
   - `PORT`: The port for your server (default: 5000)
   - `API_URL`: Your public API URL for logging/debugging
3. Deploy only the server portion of this application.
4. Make sure CORS is properly configured with your GitHub Pages URL.

### Environment Configuration

The frontend uses two environment variables:
- `VITE_BASE_PATH`: Set to `/unity-bot/dashboard` for GitHub Pages
- `VITE_API_URL`: The URL of your backend API server

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:5000`

## API Endpoints

### Leaderboard

- `GET /api/leaderboard` - Get all leaderboard users
- `GET /api/leaderboard/:id` - Get a specific user
- `POST /api/leaderboard` - Add a new user
- `PATCH /api/leaderboard/:id` - Update a user
- `DELETE /api/leaderboard/:id` - Delete a user

### Other Endpoints

- `GET /api/boosters` - Get all server boosters
- `GET /api/afk` - Get all AFK users
- `GET /api/commands` - Get all bot commands
- `GET /api/commands/:category` - Get commands by category
- `GET /api/stats` - Get dashboard statistics
- `GET /api/servers` - Get server stats
- `GET /api/activity/recent` - Get recent activities

## License

MIT