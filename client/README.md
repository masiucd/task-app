# Task Management App

A basic task management application built with React, TypeScript, and modern web technologies. This app allows users to create, manage, and track tasks with a focus on simplicity and usability.

## ✨ Features

- **Task Management**: Create, read, update, and delete tasks
- **Priority System**: Organize tasks by priority levels (LOW, MEDIUM, HIGH, VITAL)
- **Completion Tracking**: Mark tasks as completed/incomplete
- **Real-time Updates**: Optimistic UI updates with React Query
- **Responsive Design**: Beautiful, modern interface built with Mantine and Tailwind CSS
- **Type Safety**: Full TypeScript support with Zod schema validation
- **Routing**: File-based routing with TanStack Router
- **Testing**: Comprehensive test suite with Vitest and Testing Library

## 🛠️ Tech Stack

### Frontend Framework

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast development and build tool

### State Management & Data Fetching

- **TanStack React Query** - Server state management with caching
- **TanStack Router** - Type-safe routing with file-based routing

### UI & Styling

- **Mantine** - Modern React components library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Development Tools

- **Biome** - Fast formatter and linter
- **Vitest** - Fast unit testing framework
- **Testing Library** - Simple and complete testing utilities
- **TypeScript** - Static type checking

### Schema Validation

- **Zod** - TypeScript-first schema validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd task-app/client
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3333`

## 📜 Available Scripts

- `pnpm dev` - Start development server on port 3333
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests in watch mode
- `pnpm test:ui` - Run tests with UI
- `pnpm test:run` - Run tests once
- `pnpm test:coverage` - Run tests with coverage report

## 🏗️ Project Structure

```
src/
├── api/                 # API layer and data fetching
│   └── tasks.ts
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── task/           # Task-specific components
├── lib/                # Utility functions and constants
├── routes/             # File-based routing
├── schemas/            # Zod schemas for validation
└── test/               # Test utilities and setup
```

## 🔧 Configuration

### API Configuration

The application connects to a backend API. Update the base URL in `src/lib/constants.ts`:

```typescript
export const baseUrl = "http://0.0.0.0:8080/tasks/api/v1";
```

### Path Aliases

The project uses path aliases for cleaner imports:

- `@/*` maps to `./src/*`

## 🧪 Testing

The project includes a comprehensive testing setup:

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: API and user interaction tests
- **Test Utilities**: Custom render functions and mocks

Run tests with:

```bash
pnpm test
```

## 📦 Task Schema

Tasks follow this TypeScript interface:

```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "VITAL";
  completed: boolean;
}
```

## 🔗 API Integration

The application expects a REST API with the following endpoints:

- `GET /tasks/api/v1` - Get all tasks
- `POST /tasks/api/v1` - Create a new task
- `PUT /tasks/api/v1/:id` - Update a task
- `DELETE /tasks/api/v1/:id` - Delete a task

## 🚀 Deployment

1. Build the application:

```bash
pnpm build
```

2. The `dist` folder contains the production build ready for deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request
