# Gemini Project Helper

This file helps Gemini understand how to work with this project.

## Common Commands

### Database Seeding

To seed the database, you must execute the command from within the running application container.

- **Command:** `docker-compose exec projectwb npx prisma db seed`
- **Reason:** The database is running in a separate Docker container with the hostname `db`. This hostname is only accessible from other containers within the same Docker network, not from your host machine. The `docker-compose exec` command runs the seed script inside the `projectwb` container, allowing it to connect to the database.

### Other Commands

- **Start services:** `docker-compose up -d`
- **Stop services:** `docker-compose down`
- **Build Docker image:** `docker build -t project_wb .`
