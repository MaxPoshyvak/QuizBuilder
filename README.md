# QuizBuilder

A fullstack application for creating and managing quizzes. Built with **Next.js** (frontend) and **Express + Prisma** (backend), backed by a **PostgreSQL** database.

---

## Project Structure

```
QuizBuilder/
├── frontend/   # Next.js 16 app
└── backend/    # Express + Prisma API
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+ or [Bun](https://bun.sh/)
- [PostgreSQL](https://www.postgresql.org/) running locally or a connection string to a hosted instance

---

## 1. Database Setup

### 1.1 Create a PostgreSQL database

```sql
CREATE DATABASE quizbuilder;
```

### 1.2 Configure the backend environment

Copy the example env file and fill in your database URL:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5009
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/quizbuilder"
```

Replace `USER`, `PASSWORD`, and `quizbuilder` with your actual credentials.

### 1.3 Run database migrations

From the `backend` directory, generate the Prisma client and apply migrations:

```bash
# Install dependencies first (if not done yet)
npm install        # or: bun install

# Apply migrations to create tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to inspect the database
npx prisma studio
```

This will create two tables: `quizes` and `questions`.

---

## 2. Starting the Backend

```bash
cd backend
npm install        # or: bun install
npm run dev        # starts ts-node-dev with hot reload
```

The API will be available at `http://localhost:5009/api`.

**Available endpoints:**

| Method   | Path               | Description         |
| -------- | ------------------ | ------------------- |
| `GET`    | `/api/quizzes`     | List all quizzes    |
| `POST`   | `/api/quizzes`     | Create a new quiz   |
| `GET`    | `/api/quizzes/:id` | Get a quiz by ID    |
| `DELETE` | `/api/quizzes/:id` | Delete a quiz by ID |

---

## 3. Starting the Frontend

```bash
cd frontend
npm install        # or: bun install
npm run dev
```

The app will be available at `http://localhost:3000`.

The frontend expects the backend to be running at the URL defined in `frontend/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5009/api
```

Update this value if your backend runs on a different port.

---

## 4. Creating a Sample Quiz

### Via the UI

1. Open `http://localhost:3000` in your browser.
2. Navigate to **Create Quiz**.
3. Fill in a title and add questions.
4. Submit the form to save the quiz.

### Via the API (curl)

```bash
curl -X POST http://localhost:5009/api/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "General Knowledge Quiz",
    "questions": [
      {
        "type": "single",
        "text": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"]
      },
      {
        "type": "single",
        "text": "Which planet is closest to the Sun?",
        "options": ["Venus", "Mercury", "Earth", "Mars"]
      },
      {
        "type": "open",
        "text": "Name one programming language invented before 1970.",
        "options": null
      }
    ]
  }'
```

A successful response returns the created quiz with its generated `id` and all questions.

### Fetching the quiz back

```bash
# List all quizzes
curl http://localhost:5009/api/quizzes

# Get a specific quiz by ID
curl http://localhost:5009/api/quizzes/<id>
```

---

## Scripts Reference

### Backend

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start with hot reload (ts-node-dev) |
| `npm run build` | Compile TypeScript to `dist/`       |
| `npm start`     | Run compiled production build       |

### Frontend

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start Next.js dev server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |
