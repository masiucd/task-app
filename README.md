# 📋 Fullstack Task Management Application

A modern, full-stack task management application built with React and Kotlin. This application provides a clean, intuitive interface for managing tasks with CRUD operations, priority levels, and real-time updates.

![Task Management App](https://img.shields.io/badge/Stack-React%20%7C%20Kotlin%20%7C%20PostgreSQL-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 📝 **Full CRUD Operations** - Create, read, update, and delete tasks
- 🎯 **Priority Levels** - Organize tasks by priority (LOW, MEDIUM, HIGH, VITAL)
- ✅ **Task Completion** - Mark tasks as completed or pending
- 🎨 **Modern UI** - Clean, responsive interface built with Mantine components
- 🔄 **Real-time Updates** - Optimistic updates with React Query
- 📱 **Mobile Responsive** - Works seamlessly on all device sizes
- 🧪 **Comprehensive Testing** - Unit and integration tests
- 🚀 **Type Safety** - Full TypeScript and Kotlin type safety

## 🏗️ Architecture

```
📦 task-app/
├── 🎨 client/          # React frontend application
│   ├── src/
│   │   ├── api/        # API layer and data fetching
│   │   ├── components/ # Reusable UI components
│   │   ├── routes/     # File-based routing with TanStack Router
│   │   ├── schemas/    # Zod schemas for validation
│   │   └── test/       # Test utilities and setup
│   └── ...
├── 🔧 server/          # Kotlin backend application
│   └── ktor-exposed-db-app/
│       ├── src/main/kotlin/
│       │   ├── dto/    # Data transfer objects
│       │   ├── model/  # Repository layer
│       │   └── ...
│       └── ...
└── 📚 README.md        # This file
```

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast development and build tool
- **TanStack Router** - Type-safe file-based routing
- **TanStack React Query** - Server state management with caching
- **Mantine** - Modern React components library
- **Tailwind CSS** - Utility-first CSS framework
- **Zod** - TypeScript-first schema validation
- **Vitest** - Fast unit testing framework

### Backend

- **Kotlin** - Modern JVM language
- **Ktor** - Asynchronous web framework
- **Exposed** - Kotlin SQL framework
- **Kotlinx Serialization** - JSON serialization
- **PostgreSQL** - Robust relational database

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Java** 17+
- **Docker** & **Docker Compose**
- **pnpm** (recommended) or npm

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-app
```

### 2. Setup PostgreSQL Database with Docker

Create a `docker-compose.yml` file in the root directory:

```yaml
version: "3.8"
services:
  postgres:
    image: postgres:16-alpine
    container_name: task-app-postgres
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: root
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

Start the PostgreSQL database:

```bash
docker-compose up -d postgres
```

Verify the database is running:

```bash
docker-compose ps
```

### 3. Start the Backend Server

Navigate to the server directory and run:

```bash
cd server/ktor-exposed-db-app
./gradlew run
```

The server will start on `http://localhost:8080`

### 4. Start the Frontend Application

Open a new terminal and navigate to the client directory:

```bash
cd client
pnpm install
pnpm dev
```

The frontend will start on `http://localhost:3333`

### 5. Access the Application

Open your browser and navigate to `http://localhost:3333` to start managing your tasks!

## 📜 Available Scripts

### Frontend (client/)

```bash
# Development
pnpm dev              # Start development server on port 3333
pnpm build            # Build for production
pnpm preview          # Preview production build

# Testing
pnpm test             # Run tests in watch mode
pnpm test:ui          # Run tests with UI
pnpm test:run         # Run tests once
pnpm test:coverage    # Run tests with coverage report

# Code Quality
pnpm format           # Format code with Biome
pnpm format:check     # Check code formatting
pnpm lint             # Lint code with Biome
pnpm lint:fix         # Fix linting issues
```

### Backend (server/ktor-exposed-db-app/)

```bash
# Development
./gradlew run         # Start the server
./gradlew build       # Build the application
./gradlew test        # Run tests

# Gradle wrapper (if needed)
./gradlew clean       # Clean build artifacts
```

## 🗄️ Database Setup

### Using Docker (Recommended)

The easiest way to set up PostgreSQL is using Docker Compose:

1. **Create docker-compose.yml** (already provided above)
2. **Start the database:**
   ```bash
   docker-compose up -d postgres
   ```
3. **Connect to the database** (optional):
   ```bash
   docker exec -it task-app-postgres psql -U postgres -d postgres
   ```

### Manual PostgreSQL Installation

If you prefer to install PostgreSQL manually:

1. **Install PostgreSQL** following your OS-specific instructions
2. **Create database and user:**
   ```sql
   CREATE DATABASE postgres;
   CREATE USER postgres WITH PASSWORD 'root';
   GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
   ```
3. **Update connection settings** in `server/ktor-exposed-db-app/src/main/resources/application.yaml`

### Database Configuration

The application expects the following database configuration:

```yaml
postgres:
  url: "jdbc:postgresql://localhost:5432/postgres"
  user: postgres
  password: root
```

## 🔌 API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | `/tasks/api/v1`      | Get all tasks     |
| GET    | `/tasks/api/v1/{id}` | Get task by ID    |
| POST   | `/tasks/api/v1`      | Create a new task |
| PUT    | `/tasks/api/v1/{id}` | Update a task     |
| DELETE | `/tasks/api/v1/{id}` | Delete a task     |

### Task Schema

```kotlin
data class Task(
  val id: Int,
  val title: String,
  val description: String,
  val priority: Priority, // LOW, MEDIUM, HIGH, VITAL
  val completed: Boolean = false
)
```

## 🧪 Testing

### Frontend Testing

The frontend includes comprehensive testing:

- **Unit Tests** - Component and utility function tests
- **Integration Tests** - API and user interaction tests
- **Test Utilities** - Custom render functions and mocks

```bash
cd client
pnpm test              # Run tests in watch mode
pnpm test:coverage     # Run with coverage report
```

### Backend Testing

```bash
cd server/ktor-exposed-db-app
./gradlew test
```

## 🔧 Configuration

### Frontend Configuration

Update API base URL in `client/src/lib/constants.ts`:

```typescript
export const baseUrl = "http://localhost:8080/tasks/api/v1";
```

### Backend Configuration

Database and server settings in `server/ktor-exposed-db-app/src/main/resources/application.yaml`:

```yaml
ktor:
  deployment:
    port: 8080
postgres:
  url: "jdbc:postgresql://localhost:5432/postgres"
  user: postgres
  password: root
```

## 🚀 Deployment

### Frontend Deployment

1. **Build the application:**
   ```bash
   cd client
   pnpm build
   ```
2. **Deploy the `dist` folder** to your hosting provider

### Backend Deployment

1. **Build the application:**
   ```bash
   cd server/ktor-exposed-db-app
   ./gradlew build
   ```
2. **Run the JAR file:**
   ```bash
   java -jar build/libs/ktor-exposed-db-app-0.0.1-all.jar
   ```

### Docker Deployment

You can extend the `docker-compose.yml` to include the application services:

```yaml
version: "3.8"
services:
  postgres:
    # ... (same as above)

  backend:
    build: ./server/ktor-exposed-db-app
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: jdbc:postgresql://postgres:5432/postgres

  frontend:
    build: ./client
    ports:
      - "3333:3333"
    depends_on:
      - backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [React Documentation](https://react.dev/)
- [Kotlin Documentation](https://kotlinlang.org/docs/)
- [Ktor Documentation](https://ktor.io/docs/)
- [Mantine Documentation](https://mantine.dev/)
- [TanStack Router](https://tanstack.com/router)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

Made with ❤️ using modern web technologies
