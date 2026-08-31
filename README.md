# Simple Ticket System

A simple full-stack ticket management system built with Next.js, Express, and SQLite. Supports creating, listing, redeeming, and deleting tickets.

---

## Database Design

```text
Ticket
├── id         INTEGER  PRIMARY KEY AUTOINCREMENT
├── code       TEXT     NOT NULL UNIQUE  (format: XXXX-XXXX-XXXX, hexadecimal)
├── is_used    INTEGER  NOT NULL DEFAULT 0  (0 = unused, 1 = used)
├── used_at    TEXT     NULLABLE  (ISO 8601 timestamp)
├── created_at TEXT     NOT NULL DEFAULT (datetime('now'))
└── updated_at TEXT     NOT NULL DEFAULT (datetime('now'))
```



---

## API Endpoints

| Method   | Endpoint                      | Description              |
|----------|-------------------------------|--------------------------|
| `GET`    | `/api/tickets`                | List all tickets         |
| `POST`   | `/api/tickets`                | Create a new ticket      |
| `PATCH`  | `/api/tickets/:id/redeem`     | Redeem a ticket          |
| `DELETE` | `/api/tickets/:id`            | Delete an unused ticket  |

---

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Bun](https://bun.sh/) (`npm install -g bun`)

### 1. Clone the repository

```shell script
git clone https://github.com/EddieKardirsson/simple-ticket-system.git
cd simple-ticket-system
```


### 2. Backend

```shell script
cd backend
bun install
```


Create a `.env` file based on the example:

```shell script
cp .env.example .env
```


Start the backend:

```shell script
# Development (with file watching)
bun run dev

# Production
bun run start
```


The backend runs on **http://localhost:3000** by default.

### 3. Frontend

```shell script
cd frontend
bun install
```


Create an `.env` file based on the example:

```shell script
# frontend/.env
cp .env.example .env
```


Start the frontend:

```shell script
# Development
bun run dev

# Production
bun run build
bun run start
```
(I recommend running the build script if it's the first time it's running just to be sure everything is built properly)

The frontend runs on **http://localhost:3001**.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable       | Default                  | Description                        |
|----------------|--------------------------|------------------------------------|
| `PORT`         | `3000`                   | Port the backend server listens on |
| `FRONTEND_URL` | `http://localhost:3001`  | Allowed CORS origin                |
| `DB_PATH`      | `src/data/tickets.db`    | Path to the SQLite database file   |

### Frontend (`frontend/.env`)

| Variable                | Default                 | Description              |
|-------------------------|-------------------------|--------------------------|
| `NEXT_PUBLIC_API_URL`   | `http://localhost:3000` | Backend API base URL     |

---

## Running Tests

### Backend

```shell script
cd backend
bun run test
```


### Frontend

```shell script
cd frontend
bun run test
```
