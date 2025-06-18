# PowerCycles Workout Planner

## Prerequisites

- Java 21
- PostgreSQL

## Database Setup

1. Install PostgreSQL if not already installed
2. Create a PostgreSQL database and update the properties in `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:YOUR_PORT/YOUR_DATABASE_NAME
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```

## Running the Application

The application uses Maven to automatically handle all dependencies and build processes, including the frontend setup. Just run:

```bash
cd backend

# On Windows
mvnw.cmd spring-boot:run

# On Unix/Linux/macOS
./mvnw spring-boot:run
```

P.S. If you are using VSCode or other IDEs that automatically run Maven plugins, wait until the `node` and `node_modules` folders appear in the frontend directory. Alternatively, you can disable automatic Maven plugin execution in your IDE settings to avoid waiting for Node.js and dependencies download.

The application will be available at http://localhost:8080

## Features

- Strength and Hypertrophy training program generation
- Program export (PDF/Excel)
- User profile management
- Nutrition information
- Exercise guides

## Tech Stack

- Spring Boot 3.4.5
- PostgreSQL
- React/TypeScript
- Vite
- Tailwind CSS
