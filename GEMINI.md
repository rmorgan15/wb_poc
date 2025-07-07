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

### Core Concepts & Architecture
The application is designed as a multi-tenant API management workspace. Its primary purpose is to allow a user to interact with different deployments (tenants) of a single customer's API, facilitate data comparison between these tenants, and ensure safe data handling practices, especially concerning Personal Data.

The architecture remains a decoupled system, with a React Single Page Application (SPA) for the frontend and a Fastify server for the backend API and proxy.

Profile: Space for managing application-wide preferences for a User, such as theme settings (e.g., Light vs. Dark Mode).

Workspace: This is the user's primary container for organizing their work. A workspace holds multiple Customer Projects.

Customer Project: Represents a single customer's API ecosystem. A project contains a shared API schema and a set of tenant configurations.

Tenant Endpoint: Represents a specific deployment of the customer's API (e.g., Development, Testing, Staging, Production). Each tenant has a unique host but shares the same fundamental API structure defined in the project.
