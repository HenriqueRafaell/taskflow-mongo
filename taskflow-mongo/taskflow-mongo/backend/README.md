# TaskFlow Backend (MongoDB)

## Setup
1. Copy `.env.example` to `.env` and fill `MONGO_URI` (MongoDB Atlas connection string) and `JWT_SECRET`.
2. Install dependencies:
```
npm install
```
3. Run server:
```
npm run dev
```

API endpoints:
- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password }
- GET /api/tasks (auth required)
- POST /api/tasks { title, description } (auth required)
- PUT /api/tasks/:id (auth required)
- DELETE /api/tasks/:id (auth required)

