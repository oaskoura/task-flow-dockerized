# Task Manager - Docker Deployment Guide

A modern, responsive task management system built with React, TypeScript, and Tailwind CSS.

## Features

- ✅ Create, edit, and delete tasks
- 🏷️ Organize tasks by categories and priorities
- 📊 Real-time statistics dashboard
- 🔍 Advanced filtering and search
- 📱 Responsive design for all devices
- 💾 Local storage persistence
- 🐳 Docker ready for easy deployment

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed on your system

### Option 1: Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <your-repo-url>
cd task-manager
```

2. Build and run with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application at `http://localhost:3000`

### Option 2: Using Docker directly

1. Build the Docker image:
```bash
docker build -t task-manager .
```

2. Run the container:
```bash
docker run -d -p 3000:80 --name task-manager-app task-manager
```

3. Access the application at `http://localhost:3000`

## Docker Commands

### Development Commands

```bash
# Build the image
docker build -t task-manager .

# Run in development mode
docker run -p 3000:80 task-manager

# View container logs
docker logs task-manager-app

# Stop the container
docker stop task-manager-app

# Remove the container
docker rm task-manager-app
```

### Production Deployment

```bash
# Build for production
docker build --target production -t task-manager:prod .

# Run in production
docker run -d -p 80:80 --name task-manager-prod task-manager:prod
```

## Environment Configuration

The application uses environment variables for configuration:

- `NODE_ENV`: Set to 'production' for production builds
- `PORT`: Port for the nginx server (default: 80)

## Performance Features

- Gzip compression enabled
- Static asset caching
- Optimized nginx configuration
- Security headers included

## File Structure

```
├── src/                 # Source code
├── public/             # Static assets
├── Dockerfile          # Docker build instructions
├── docker-compose.yml  # Docker Compose configuration
├── nginx.conf          # Nginx server configuration
└── .dockerignore      # Docker ignore file
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: React Hooks + Local Storage
- **Containerization**: Docker, Nginx
- **Icons**: Lucide React

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.