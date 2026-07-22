# TaskTracker

This project is built as an assignment for **Penthara Technologies**. Its a simple task management app where you can add, edit, delete and track your tasks. You can also filter tasks by status and search through them.

## About the Assignment

The idea was to build a full stack task tracker with basic CRUD operations. The frontend is built with React and the backend is a simple Express server that reads and writes to a JSON file (no database). Tasks have a title, description and a status that cycles through Pending → In-progress → Completed.

### What it can do

- Create new tasks with a title and description
- Edit existing tasks
- Delete tasks
- Toggle task status (Pending → In-progress → Completed → back to Pending)
- Search tasks by title or description
- Filter tasks by there status

## How to Run

You need Node.js installed on your machine. The project has two parts - the frontend (React + Vite) and the backend (Express server). Both need to be running at the same time.

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Start the frontend dev server

```bash
npm run dev
```

This will start the Vite dev server, usually on `http://localhost:5173`.

### 3. Start the backend server

Open a new terminal and run:

```bash
cd server
node index.js
```

The backend runs on `http://localhost:3000`.

> **Note:** Make sure both the frontend and backend are running at the same time otherwise the app wont work properly.

### Building for production

```bash
npm run build
```

This creates a `dist/` folder with the production build.

## Folder Structure

```
TaskTracker/
├── public/                     # static assets
├── server/                     # backend server
│   ├── data/
│   │   └── tasks.json          # tasks stored here (acts as the database)
│   ├── utils/
│   │   └── file.js             # helper functions to read/write tasks.json
│   └── index.js                # express server with all the api routes
├── src/                        # frontend source code
│   ├── components/
│   │   ├── ui/                 # shadcn ui components (button, card, input etc)
│   │   ├── AddTaskModal.jsx    # modal for adding/editing tasks
│   │   ├── Header.jsx          # search bar and filter buttons
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx        # individual task card
│   │   └── TaskList.jsx        # renders the grid of task cards
│   ├── lib/
│   │   └── utils.js            # cn() helper for tailwind class merging
│   ├── pages/
│   │   └── Tasks.jsx           # main page, fetches and displays tasks
│   ├── services/               # all api calls are here
│   │   ├── createTask.js       # POST /tasks
│   │   ├── deleteTask.js       # DELETE /tasks/:id
│   │   ├── getAllTasks.js       # GET /tasks
│   │   ├── searchTasks.js      # GET /search?search=...
│   │   ├── toggleTaskStatus.js # PATCH /tasks/:id/toggle
│   │   └── updateTask.js       # PUT /tasks/:id
│   ├── store/                  # zustand state management
│   │   ├── addTaskModalStore.js
│   │   ├── searchStore.js
│   │   └── taskStore.js
│   ├── utils/
│   │   ├── truncate.js         # truncates long strings
│   │   └── useDebounce.js      # debounce hook for search input
│   ├── App.jsx
│   ├── App.css
│   ├── index.css               # global styles + tailwind
│   └── main.jsx                # entry point
├── index.html
├── package.json
├── vite.config.js
└── components.json             # shadcn config
```

## Tech Stack

**Frontend:**
- React 19
- Vite (build tool and dev server)
- Tailwind CSS v4
- Zustand (state management)
- Shadcn UI (component library)
- Lucide React (icons)

**Backend:**
- Node.js
- Express
- File system based storage (JSON file, no database)

## Dependencies

### Frontend (from package.json)

| Package | What its for |
|---|---|
| react, react-dom | UI library |
| vite, @vitejs/plugin-react | build tooling and dev server |
| tailwindcss, @tailwindcss/vite | styling |
| zustand | global state management |
| shadcn, @base-ui/react | UI component library |
| lucide-react | icon set |
| sonner | toast notifications |

### Backend

The backend dosent have its own package.json, it uses Express, body-parser and cors which are expected to be installed globally or in the root.

| Package | What its for |
|---|---|
| express | web server framework |
| body-parser | parses incoming request bodies |
| cors | enables cross origin requests between frontend and backend |
