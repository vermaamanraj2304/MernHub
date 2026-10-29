export default {
  id: "proj-todo-app",
  title: {
    en: "Project 1: Full-Stack Task & Todo Manager",
    hi: "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery)",
  },
  difficulty: "Beginner",
  readTime: 14,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. Project Overview & Full-Stack System Architecture",
        hi: "1. Project Ka Overview Aur Full-Stack System Architecture",
      },
      body: {
        en: `Every professional full-stack engineer begins their journey with a robust CRUD (Create, Read, Update, Delete) application. While basic tutorial todo apps only store tasks in React local state, our **Full-Stack Task Manager** is an enterprise-patterned portfolio application featuring:

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    REACT CLIENT (Tailwind CSS)                  │
│  - Task List with Tab Filtering (All, Active, Completed)        │
│  - Optimistic UI Toggling (Zero-latency checkbox clicks)        │
│  - Debounced Title Search & Priority Sorting (Low, Med, High)   │
└───────────────────────────────┬─────────────────────────────────┘
                                │ Axios HTTP Requests (JSON)
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS REST API BACKEND                     │
│  - Input validation middleware (Zod schema checking)            │
│  - RESTful routes: POST, GET, PUT, PATCH, DELETE                │
│  - Centralized error handler returning consistent JSON          │
└───────────────────────────────┬─────────────────────────────────┘
                                │ Mongoose ODM
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                             │
│  - Task Collection with compound index on (status, priority)    │
│  - Automatic createdAt and updatedAt timestamps                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Learning Objectives:
1. Building clean RESTful API routes following HTTP specification standards.
2. Modeling data with Mongoose schemas and validation rules.
3. Managing React asynchronous state with **Optimistic UI Updates** and graceful error rollbacks.
4. Implementing responsive filtering, sorting, and search on both frontend and backend.`,
        hi: `Har professional full-stack developer apni shuruat ek solid CRUD (Create, Read, Update, Delete) application se karta hai. Chote tutorials mein log sirf React ke state mein todo save karke chhod dete hain, lekin hum yahan ek **Industry-Level Full-Stack Task Manager** banayenge:

- **React Frontend**: Tailwind CSS styling, tabs filter (All, Pending, Completed), search box, aur **Optimistic UI** (checkbox dabate hi bina network delay ke instant tick mark).
- **Express Backend**: Standard RESTful APIs (POST, GET, PUT, PATCH, DELETE) aur Zod input validation.
- **MongoDB Database**: Task schema, priority (Low, Medium, High), due dates, aur indexed queries.

### Is Project Se Aap Kya Seekhenge:
1. RESTful API architecture aur status codes ka sahi use.
2. Mongoose schema validation aur indexes banana.
3. React mein Optimistic UI updates aur network fail hone par rollback karna.
4. Clean folder structure aur reusable custom hooks.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Database Modeling & Schema Design",
        hi: "2. Database Modeling Aur Task Schema Design",
      },
      body: {
        en: `Our database requires a single high-performance collection: **\`tasks\`**.

### Mongoose Schema Design (\`models/Task.js\`):
\`\`\`javascript
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'in-progress', 'completed'],
        message: '{VALUE} is not a valid task status',
      },
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Compound index to accelerate common dashboard queries: filter by status, sort by priority
taskSchema.index({ status: 1, priority: 1, createdAt: -1 });

export default mongoose.model('Task', taskSchema);
\`\`\`

### Why Compound Indexing Matters:
Users frequently load the task board filtering for \`status: 'pending'\` ordered by \`createdAt: -1\`. Without the compound index, MongoDB scans every document in the collection. With \`{ status: 1, createdAt: -1 }\`, lookups resolve in **<2ms**!`,
        hi: `Database ke liye humein ek clean aur indexed collection chahiye: **\`tasks\`**.

### Schema Ki Mukhya Fields:
- **\`title\`**: Task ka naam (required, max 100 characters).
- **\`description\`**: Extra details (optional, max 500 characters).
- **\`status\`**: Task ki sthiti (\`pending\`, \`in-progress\`, \`completed\`).
- **\`priority\`**: Zaroorat ka level (\`low\`, \`medium\`, \`high\`).
- **\`dueDate\`**: Deadline date.
- **\`timestamps: true\`**: Mongoose automatically \`createdAt\` aur \`updatedAt\` track karta hai.

### Compound Index Kyun Lagaya?
Dashboard par aksar log \`status: 'pending'\` dekh kar latest tasks pehle dekhna chahte hain. \`taskSchema.index({ status: 1, createdAt: -1 })\` lagane se database bina kisi lag ke 2ms mein data nikal leta hai!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Restaurant Kitchen Order Ticket (KOT) Board",
        hi: "Real-Life Analogy: Restaurant Ke Kitchen Ka Order Ticket Board",
      },
      body: {
        en: `Imagine the bustling kitchen of Haldiram's or a busy roadside dhaba:

- **Creating a Task (\`POST /api/tasks\`)**:
  A customer orders 2 Butter Naan and Paneer Tikka. The waiter writes out a numbered **Kitchen Order Ticket (KOT)** slip and clips it onto the revolving kitchen carousel board.
- **Reading Tasks (\`GET /api/tasks?status=pending\`)**:
  The head chef looks up at the board. He ignores yesterday's finished receipts and only glances at the tickets clipped under the "Pending" hook (**Database filter index**).
- **Updating Status (\`PATCH /api/tasks/:id/status\`)**:
  Once the tandoor cook pulls the hot naan out of the clay oven, he slides the KOT ticket from the "Pending" rail to the "Ready to Serve" rail (**Status transition**).
- **Optimistic UI (The Polite Waiter)**:
  When you tell the waiter *"Please bring extra green mint chutney"*, he nods and smiles instantly: *"Coming right up, sir!"* (**UI updates in 0ms**). He doesn't make you sit in silence for 45 seconds while he walks into the pantry, finds the jar, and scoops the chutney before acknowledging your request.
  Only if the chutney jar is completely empty does he return and apologize: *"Sorry sir, we just ran out of mint!"* (**Graceful state rollback**).`,
        hi: `Ek mashhoor restaurant ke kitchen ka example dekhein:

- **Naya Task Banana (\`POST\` Request)**:
  Customer ne Paneer Tikka order kiya. Waiter ne ek parchi (Kitchen Order Ticket) banayi aur kitchen ke revolving board par chipka di.
- **Tasks Padhna (\`GET\` Request)**:
  Head chef board par nazar marta hai aur sirf "Pending" wale orders ko padhta hai taaki tandoor jaldi jaldi chala sake (**Database Index Query**).
- **Status Update (\`PATCH\` Request)**:
  Jaise hi khana ban gaya, chef ne parchi ko "Cooking" se hata kar "Ready" wale hook par taang diya (**Status Transition**).
- **Optimistic UI (Smart Waiter)**:
  Jab aap waiter se extra chutney mangte hain, toh waiter usi second muskura kar bolta hai: *"Zaroor sir, abhi laya!"* (**Screen par turant tick mark aa jana**). Wo aapko 2 minute chupchaap khade hokar intezar nahi karwata.
  Sirf tab agar kitchen mein chutney khatam ho, toh wo wapas aakar bolta hai: *"Maaf kijiye sir, chutney khatam ho gayi thi"* (**Error hone par rollback**).`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "RESTful API Endpoints Specification",
        hi: "RESTful API Endpoints Ka Complete Specification",
      },
      body: {
        en: `Our Task Manager adheres strictly to REST API standards:

| Method | Endpoint | Purpose | Success Code |
| :--- | :--- | :--- | :--- |
| **\`POST\`** | \`/api/tasks\` | Create a new task | \`201 Created\` |
| **\`GET\`** | \`/api/tasks\` | Fetch tasks (supports \`?status=\` and \`?sort=\`) | \`200 OK\` |
| **\`GET\`** | \`/api/tasks/:id\` | Fetch single task by ObjectId | \`200 OK\` |
| **\`PUT\`** | \`/api/tasks/:id\` | Full update (title, description, priority, dueDate) | \`200 OK\` |
| **\`PATCH\`** | \`/api/tasks/:id/toggle\` | Toggle status between \`pending\` and \`completed\` | \`200 OK\` |
| **\`DELETE\`** | \`/api/tasks/:id\` | Delete task permanently | \`200 OK\` |

### Query Filter Flexibility:
- \`GET /api/tasks?status=pending\`: Returns only incomplete tasks.
- \`GET /api/tasks?priority=high&sort=-createdAt\`: Returns urgent tasks ordered from newest to oldest.`,
        hi: `Hamari API standard REST principles follow karti hai:

| Method | Endpoint | Kaam | Status Code |
| :--- | :--- | :--- | :--- |
| **\`POST\`** | \`/api/tasks\` | Naya task create karna | \`201 Created\` |
| **\`GET\`** | \`/api/tasks\` | Saare tasks laana (filters ke sath) | \`200 OK\` |
| **\`GET\`** | \`/api/tasks/:id\` | Kisi ek task ki details laana | \`200 OK\` |
| **\`PUT\`** | \`/api/tasks/:id\` | Task ko poori tarah update karna | \`200 OK\` |
| **\`PATCH\`** | \`/api/tasks/:id/toggle\` | Checkbox dabane par status toggle karna | \`200 OK\` |
| **\`DELETE\`** | \`/api/tasks/:id\` | Task ko hamesha ke liye delete karna | \`200 OK\` |`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Backend Express Controller Implementation",
        hi: "Example 1: Express Backend Controller Ka Complete Code",
      },
      body: {
        en: `Here is the complete \`taskController.js\` featuring input sanitization, query filtering, and atomic status toggling:

\`\`\`javascript
// server/controllers/taskController.js
import Task from '../models/Task.js';

// 1. GET /api/tasks (List with filters & sorting)
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, sort = '-createdAt', search } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (priority && priority !== 'all') {
      filter.priority = priority;
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' }; // Case-insensitive title search
    }

    const tasks = await Task.find(filter).sort(sort).lean();

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// 2. POST /api/tasks (Create task)
export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium',
      dueDate: dueDate || null,
      status: 'pending',
    });

    return res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    next(error);
  }
};

// 3. PATCH /api/tasks/:id/toggle (Fast toggle for optimistic checkbox)
export const toggleTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Toggle logic
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    await task.save();

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// 4. DELETE /api/tasks/:id (Delete task)
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
\`\`\``,
        hi: `Complete \`taskController.js\` jisme filter, search, create, delete aur atomic toggle logic shamil hai:

\`\`\`javascript
// server/controllers/taskController.js
import Task from '../models/Task.js';

// Saare tasks fetch karein filters ke sath
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search } = req.query;
    const filter = {};

    if (status && status !== 'all') filter.status = status;
    if (priority && priority !== 'all') filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const tasks = await Task.find(filter).sort('-createdAt').lean();
    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

// Naya task banayein
export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title zaroori hai' });

    const task = await Task.create({ title, description, priority, dueDate });
    return res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Checkbox toggle endpoint
export const toggleTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task nahi mila' });

    task.status = task.status === 'completed' ? 'pending' : 'completed';
    await task.save();

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// Task delete karein
export const deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Task nahi mila' });

    return res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: React Optimistic UI Custom Hook with Graceful Rollback",
        hi: "Example 2: React Optimistic UI Custom Hook (Rollback Safety Ke Sath)",
      },
      body: {
        en: `This custom hook manages task state. When toggling a task, it updates the React state **immediately (0ms)**, sends the HTTP PATCH in the background, and rolls back if the network fails:

\`\`\`javascript
// client/src/hooks/useTaskManager.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch tasks from backend
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/tasks', {
        params: { status: filterStatus, search: searchQuery },
      });
      setTasks(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filterStatus, searchQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 2. Optimistic Toggle with Rollback
  const toggleTask = async (taskId) => {
    // Save snapshot of previous state for rollback
    const previousTasks = [...tasks];

    // Optimistically flip status in React state immediately!
    setTasks((prev) =>
      prev.map((t) =>
        t._id === taskId
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    );

    try {
      await axios.patch(\`/api/tasks/\${taskId}/toggle\`);
    } catch (err) {
      // ROLLBACK on network failure!
      console.error('Toggle failed, rolling back state:', err);
      setTasks(previousTasks);
      alert('Network error: Could not update task status.');
    }
  };

  // 3. Delete Task with Optimistic Removal
  const deleteTask = async (taskId) => {
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== taskId));

    try {
      await axios.delete(\`/api/tasks/\${taskId}\`);
    } catch (err) {
      setTasks(previousTasks);
      alert('Failed to delete task. Please try again.');
    }
  };

  // 4. Add Task
  const addTask = async (taskData) => {
    try {
      const res = await axios.post('/api/tasks', taskData);
      setTasks((prev) => [res.data.data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to create task' };
    }
  };

  return {
    tasks,
    loading,
    error,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    toggleTask,
    deleteTask,
    addTask,
    refetch: fetchTasks,
  };
};
\`\`\``,
        hi: `React frontend ke liye complete custom hook jo Optimistic UI updates aur automatic rollback handle karta hai:

\`\`\`javascript
// client/src/hooks/useTaskManager.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get('/api/tasks', { params: { status: filterStatus } });
      setTasks(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // Optimistic Toggle: Pehle screen par badlo, phir background mein API call karo
  const toggleTask = async (taskId) => {
    const previousState = [...tasks];

    // Turant UI update
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t))
    );

    try {
      await axios.patch(\`/api/tasks/\${taskId}/toggle\`);
    } catch (err) {
      // Internet fail hone par purana state wapas le aao
      setTasks(previousState);
      alert('Update fail ho gaya, rollback ho raha hai!');
    }
  };

  const deleteTask = async (taskId) => {
    const previousState = [...tasks];
    setTasks((prev) => prev.filter((t) => t._id !== taskId));

    try {
      await axios.delete(\`/api/tasks/\${taskId}\`);
    } catch (err) {
      setTasks(previousState);
    }
  };

  return { tasks, loading, filterStatus, setFilterStatus, toggleTask, deleteTask };
};
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Complete Tailwind CSS Task Board UI Component",
        hi: "Example 3: Complete Responsive Tailwind CSS Task Board UI",
      },
      body: {
        en: `Here is the main \`TaskManager.jsx\` component integrating search, status tabs, task creation form, and responsive task cards:

\`\`\`jsx
// client/src/components/TaskManager.jsx
import React, { useState } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import { CheckCircle2, Circle, Trash2, Plus, Search, Calendar, AlertCircle } from 'lucide-react';

export default function TaskManager() {
  const {
    tasks,
    loading,
    filterStatus,
    setFilterStatus,
    searchQuery,
    setSearchQuery,
    toggleTask,
    deleteTask,
    addTask,
  } = useTaskManager();

  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('medium');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    await addTask({ title: newTitle, priority: newPriority });
    setNewTitle('');
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Full-Stack Task Board</h1>
          <p className="text-slate-500 text-sm mt-1">MERN CRUD Architecture with Optimistic Sync</p>
        </div>
      </header>

      {/* 1. Quick Add Form */}
      <form onSubmit={handleCreate} className="flex gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be accomplished today?"
          className="flex-1 bg-transparent border-0 focus:ring-0 text-slate-800 dark:text-white placeholder-slate-400 text-base outline-none"
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          className="bg-slate-100 dark:bg-slate-700 text-xs font-semibold rounded-lg px-3 py-2 text-slate-700 dark:text-slate-200 border-0 outline-none"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* 2. Search & Status Tabs */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-full sm:w-auto">
          {['all', 'pending', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={\`px-4 py-1.5 text-xs font-semibold rounded-md capitalize transition \${
                filterStatus === tab
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }\`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-800 dark:text-white"
          />
        </div>
      </div>

      {/* 3. Task List Items */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-12 text-slate-400 animate-pulse">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400">
            No tasks found in this view.
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition shadow-sm"
            >
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => toggleTask(task._id)}
                  className="text-slate-400 hover:text-indigo-600 transition focus:outline-none"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <span
                  className={\`text-sm font-medium transition \${
                    task.status === 'completed'
                      ? 'line-through text-slate-400 dark:text-slate-500'
                      : 'text-slate-800 dark:text-slate-100'
                  }\`}
                >
                  {task.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className={\`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider \${priorityColors[task.priority]}\`}>
                  {task.priority}
                </span>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-slate-400 hover:text-red-500 transition p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
\`\`\``,
        hi: `Complete responsive UI component jisme search bar, filter tabs, task add form, aur optimistic checkbox click shamil hai:

\`\`\`jsx
// client/src/components/TaskManager.jsx
import React, { useState } from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import { CheckCircle2, Circle, Trash2, Plus, Search } from 'lucide-react';

export default function TaskManager() {
  const { tasks, loading, filterStatus, setFilterStatus, toggleTask, deleteTask, addTask } = useTaskManager();
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, priority: 'medium' });
    setTitle('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Task Manager Board</h1>

      {/* Add Task Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Naya task likhein..."
          className="flex-1 p-3 border rounded-xl dark:bg-slate-800 dark:text-white"
        />
        <button type="submit" className="px-5 bg-indigo-600 text-white rounded-xl font-medium">
          Add
        </button>
      </form>

      {/* Tabs */}
      <div className="flex gap-2">
        {['all', 'pending', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={\`px-3 py-1 rounded-lg text-sm capitalize \${filterStatus === tab ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}\`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task._id} className="flex justify-between items-center p-3 border rounded-xl bg-white dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <button onClick={() => toggleTask(task._id)}>
                {task.status === 'completed' ? <CheckCircle2 className="text-emerald-500" /> : <Circle className="text-slate-400" />}
              </button>
              <span className={task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white'}>
                {task.title}
              </span>
            </div>
            <button onClick={() => deleteTask(task._id)} className="text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
\`\`\``,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes and How to Avoid Them",
        hi: "Aam Galtiyan Aur Unka Sahi Solution",
      },
      body: {
        en: `### 1. Mutating State Directly in React State Updates
- **Mistake**: Writing \`tasks.find(t => t._id === id).status = 'completed'; setTasks(tasks);\`.
- **Why it breaks**: React compares state references. Mutating the array in place does not change the top-level array memory reference, so React skips re-rendering and the UI fails to update!
- **Fix**: Always return a new array with immutable updates: \`setTasks(prev => prev.map(t => t._id === id ? { ...t, status: 'completed' } : t))\`.

### 2. Failing to Roll Back Optimistic Updates on Network Failure
- **Mistake**: Flipping the checkbox state in React, sending \`axios.patch()\`, and leaving the checkbox checked if the API returns a 500 or network timeout.
- **Why it hurts**: The user thinks the task is safely saved. When they refresh the page 10 minutes later, the task reverts to incomplete, causing confusion and data distrust!
- **Fix**: Save a snapshot of \`const previous = [...tasks]\` and restore \`setTasks(previous)\` inside the \`catch\` block.

### 3. Missing Indexes on High-Frequency Filters
- **Mistake**: Filtering tasks by \`{ status: 'pending' }\` on millions of records without an index.
- **Fix**: Create a compound index in Mongoose: \`taskSchema.index({ status: 1, createdAt: -1 })\`.`,
        hi: `### 1. React State Ko Directly Mutate Karna
- **Galti**: \`tasks[0].status = 'completed'\` karke \`setTasks(tasks)\` likhna.
- **Nuksan**: React memory reference change na hone ki wajah se re-render nahi karta aur screen par checkbox update nahi hota.
- **Solution**: Hamesha naya array return karein: \`setTasks(prev => prev.map(...))\`.

### 2. Network Fail Hone Par Rollback Na Karna
- **Galti**: Screen par tick mark laga diya lekin API call fail hone par purana state wapas nahi laya.
- **Nuksan**: User ko lagta hai kaam ho gaya, par refresh karte hi task wapas incomplete ho jata hai.
- **Solution**: \`catch\` block mein purana snapshot restore karein.

### 3. Filter Columns Par Index Na Lagana
- **Galti**: Lakhon tasks par bina index ke \`status\` filter chalana.
- **Solution**: \`taskSchema.index({ status: 1, createdAt: -1 })\` banayein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Production Best Practices",
        hi: "Production Best Practices & Architecture Tips",
      },
      body: {
        en: `1. **Use Atomic PATCH for Quick Status Toggling**:
   Never use full \`PUT\` requests (which require transmitting the full object) just to toggle a boolean checkbox. A dedicated \`PATCH /api/tasks/:id/toggle\` endpoint transmits less than 50 bytes of network payload.
2. **Implement Debounced Title Search**:
   When users type into the search box, do not trigger an API request on every keystroke. Use a 300ms debounce timer to prevent hammering MongoDB with 10 queries per word.
3. **Trim Strings at Schema Level**:
   Always specify \`trim: true\` on Mongoose string fields so accidental leading/trailing spaces from copy-pasting do not corrupt title search comparisons.
4. **Enforce User Data Isolation in Multi-Tenant Apps**:
   In production apps with login, always attach a \`user: { type: ObjectId, ref: 'User' }\` field and query \`Task.find({ user: req.user._id })\` so users can never view or modify each other's tasks.`,
        hi: `1. **Checkbox Ke Liye Atomic PATCH Use Karein**:
   Sirf ek status badalne ke liye poora object bhejne ki zaroorat nahi hai. \`PATCH /api/tasks/:id/toggle\` endpoint 50 bytes mein instant update kar deta hai.
2. **Search Box Par 300ms Debounce Lagayein**:
   Har single letter type hone par API call mat karein; 300ms ka debounce lagayein taaki database par load na pade.
3. **Schema Mein \`trim: true\` Lagayein**:
   Extra spaces hatane ke liye Mongoose mein \`trim: true\` lagana zaroori hai.
4. **User Isolation (Multi-Tenant Security)**:
   Login feature aane par hamesha \`Task.find({ user: req.user.id })\` chalayein taaki ek user doosre ka task na dekh sake.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Interview Questions & In-Depth Answers",
        hi: "Interview Ke Zaroori Sawal Aur Jawab",
      },
      body: {
        en: `### Q1: What is Optimistic UI, and what are the trade-offs of using it?
**Answer**:
Optimistic UI is an interaction design pattern where the client updates the visual user interface immediately upon user action (e.g. clicking a checkbox or like button) **before receiving confirmation from the backend server**.
- **Benefits**: Delivers an instantaneous, sub-millisecond perceived performance. The user never experiences jarring loading spinners for micro-interactions.
- **Trade-offs**: The frontend must handle failure cases gracefully. If the network drops or the server returns an error, the application must automatically **roll back** the optimistic state to the exact previous snapshot and alert the user.

---

### Q2: What is the architectural difference between HTTP PUT and HTTP PATCH?
**Answer**:
- **HTTP PUT**: Replaces the **entire resource** with the new payload. If a task has \`{ title, description, priority, status }\` and a PUT request sends only \`{ title }\`, the remaining fields should be cleared or reset to defaults according to REST specification.
- **HTTP PATCH**: Applies a **partial modification** to the resource. Only the fields present in the request payload are updated (e.g. toggling only the \`status\` field while leaving \`title\` and \`description\` untouched).

---

### Q3: Why is server-side filtering and pagination superior to fetching all records and filtering with \`tasks.filter()\` in React?
**Answer**:
In small demo apps with 10 tasks, client-side filtering works. In real-world enterprise databases with 50,000 tasks:
1. Fetching all records forces MongoDB to read megabytes from disk, serializes huge JSON over mobile networks, and exhausts browser RAM.
2. Server-side filtering leverages database **B-Tree indexes** on the server, scanning only the exact matching index entries and returning a tiny 20-item JSON chunk in <5ms.`,
        hi: `### Q1: Optimistic UI kya hota hai aur iske kya fayde-nuksan hain?
**Answer**:
Optimistic UI ek aisi technique hai jisme button ya checkbox dabate hi UI bina server ke jawab ka intezar kiye turant update ho jata hai (0ms speed).
- **Fayda**: App superfast lagti hai aur user ko spinner nahi dekhna padta.
- **Nuksan**: Agar internet fail ho jaye, toh frontend ko rollback karke purani state wapas laani padti hai aur user ko error alert dena padta hai.

---

### Q2: HTTP PUT aur HTTP PATCH mein kya farq hai?
**Answer**:
- **HTTP PUT**: Poore resource ko replace karta hai.
- **HTTP PATCH**: Sirf specific fields ko update karta hai (jaise sirf \`status\` ko \`completed\` karna, baaki fields ko bina chhede).

---

### Q3: Server-side filtering client-side \`.filter()\` se behtar kyun hai?
**Answer**:
Agar database mein 50,000 tasks hon aur saara data browser mein mangwa kar JavaScript se \`.filter()\` kiya jaye, toh mobile phone hang ho jayega aur 20MB data kharch hoga.
Server-side filter MongoDB ke B-tree index ka use karke sirf wahi 10 matching tasks bhejta hai jo 2ms mein deliver ho jaate hain.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary",
        hi: "Quick Revision Summary",
      },
      body: {
        en: `- **Full-Stack Task Manager** masters complete RESTful CRUD operations across React, Express, and MongoDB.
- **Mongoose Modeling**: Schema with strict enums (\`status\`, \`priority\`) and compound index \`{ status: 1, createdAt: -1 }\`.
- **Optimistic UI**: Update React state instantly in 0ms, dispatch PATCH in background, and roll back snapshot on error.
- **REST Best Practices**: Use \`POST\` (201), \`GET\` (200), \`PUT\` (full update), \`PATCH\` (partial toggle), and \`DELETE\` (200).
- **Server-Side Filtering**: Filter by status and debounced search on the backend to avoid transmitting megabytes of data.`,
        hi: `- **Full-Stack Task Manager** complete CRUD operations (Create, Read, Update, Delete) sikhata hai.
- **Schema Design**: \`status\` aur \`priority\` par enums lagayein aur fast query ke liye compound index use karein.
- **Optimistic UI**: Checkbox par turant UI update karein aur network error aane par rollback karein.
- **REST Endpoints**: \`POST\`, \`GET\`, \`PUT\`, \`PATCH\` aur \`DELETE\` ka sahi status code ke sath use karein.
- **Backend Filters**: Data hamesha server-side filter karein taaki network bandwidth bache.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "In an Optimistic UI architecture, what critical step must be executed if the background API request fails with a network error?",
      "hi": "Optimistic UI architecture mein agar background API call network error se fail ho jaye, toh kaunsa kadam lena zaroori hai?"
    },
    "options": [
      {
        "en": "Delete the entire application database",
        "hi": "Poora database delete kar dena"
      },
      {
        "en": "Roll back the client state to the exact previous snapshot saved before the optimistic mutation and notify the user",
        "hi": "Client state ko turant pichle saved snapshot par rollback karna aur user ko alert dena"
      },
      {
        "en": "Close the browser window automatically",
        "hi": "Browser window band kar dena"
      },
      {
        "en": "Ignore the error and keep the optimistic state",
        "hi": "Error ignore karke nakli state rehne dena"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Without rollback, the frontend displays state that does not exist in the database, leading to data inconsistency and broken user trust on page reload.",
      "hi": "Rollback na karne par user ko galat data dikhta rahega jo database mein save hi nahi hua hai."
    }
  },
  {
    "question": {
      "en": "Which HTTP method is semantically designed for partially updating a single field (such as toggling task status) without transmitting the full document?",
      "hi": "Poore document ko bheje bina sirf ek single field update karne ke liye kaunsa HTTP method design kiya gaya hai?"
    },
    "options": [
      {
        "en": "GET",
        "hi": "GET"
      },
      {
        "en": "PATCH",
        "hi": "PATCH"
      },
      {
        "en": "PUT",
        "hi": "PUT"
      },
      {
        "en": "POST",
        "hi": "POST"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "HTTP PATCH is explicitly designated by RFC 5789 for partial resource modifications, whereas PUT implies full resource replacement.",
      "hi": "HTTP PATCH partial modifications ke liye hota hai jabki PUT poore resource ko replace karne ke liye hota hai."
    }
  },
  {
    "question": {
      "en": "Why should React state NEVER be updated via direct array mutation (e.g., tasks[0].status = 'completed')?",
      "hi": "React state ko direct mutation (tasks[0].status = 'completed') se update kyun nahi karna chahiye?"
    },
    "options": [
      {
        "en": "Because JavaScript throws a syntax error on array mutation",
        "hi": "Kyunki JavaScript syntax error fek deta hai"
      },
      {
        "en": "React compares memory references; mutating an array in-place preserves the old reference, causing React to skip re-rendering the UI",
        "hi": "React memory references compare karta hai; array mutate karne se reference nahi badalta jisse React re-render skip kar deta hai"
      },
      {
        "en": "Because Node.js does not support arrays",
        "hi": "Kyunki Node.js arrays support nahi karta"
      },
      {
        "en": "Because Tailwind CSS will stop working",
        "hi": "Kyunki Tailwind CSS kaam karna band kar dega"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "React uses reference equality checks. If the top-level array reference does not change, React assumes nothing changed and skips the DOM update.",
      "hi": "React reference equality check karta hai. Purana array reference waisa ka waisa rehne par React ko lagta hai koi change nahi hua aur screen update nahi hoti."
    }
  },
  {
    "question": {
      "en": "Why is taskSchema.index({ status: 1, createdAt: -1 }) beneficial for a task board application?",
      "hi": "Task board application ke liye taskSchema.index({ status: 1, createdAt: -1 }) kyun faydemand hai?"
    },
    "options": [
      {
        "en": "It reduces MongoDB storage cost to zero",
        "hi": "Ye storage cost zero kar deta hai"
      },
      {
        "en": "It allows MongoDB to satisfy queries filtering by status and sorting by creation date using an instant B-Tree index scan in <2ms instead of scanning all documents",
        "hi": "Ye MongoDB ko status filter aur date sort wali queries instant B-Tree index se <2ms mein execute karne deta hai bina saare documents scan kiye"
      },
      {
        "en": "It automatically translates tasks to Hindi",
        "hi": "Ye tasks ko Hindi mein translate karta hai"
      },
      {
        "en": "It prevents tasks from being deleted",
        "hi": "Ye tasks delete hone se rokta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Compound indexes allow the database engine to locate filtered records and return them pre-sorted directly from the index, eliminating expensive collection scans and in-memory sorting.",
      "hi": "Compound index se database ko filtered data pehle se sorted mil jata hai jisse CPU aur Disk par load nahi padta aur query superfast chalti hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Project 1: Full-Stack Task & Todo Manager in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling project 1: full-stack task & todo manager with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ko handle karne ka structured aur scalable pattern provide karta hai"
      },
      {
        "en": "It completely replaces JavaScript with binary machine code in browser tabs",
        "hi": "Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"
      },
      {
        "en": "It is only used for printing documents to physical printers",
        "hi": "Ye sirf physical printers par documents print karne ke liye hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Project 1: Full-Stack Task & Todo Manager establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Project 1: Full-Stack Task & Todo Manager directly resolve?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
    },
    "options": [
      {
        "en": "It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",
        "hi": "Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"
      },
      {
        "en": "It forces the operating system to shut down when errors occur",
        "hi": "Error aane par ye operating system band kar deta hai"
      },
      {
        "en": "It deletes all database records older than 24 hours automatically",
        "hi": "Ye 24 ghante purane DB records delete karta hai"
      },
      {
        "en": "It blocks all outgoing HTTP network requests to conserve bandwidth",
        "hi": "Ye bandwidth bachane ke liye network requests block karta hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Without Project 1: Full-Stack Task & Todo Manager, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Project 1: Full-Stack Task & Todo Manager, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
    },
    "options": [
      {
        "en": "As a completely offline computer with zero network or database connections",
        "hi": "Ek offline computer ki tarah jisme koi connection na ho"
      },
      {
        "en": "As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",
        "hi": "Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"
      },
      {
        "en": "As a random number generator with non-deterministic output",
        "hi": "Random number generator ki tarah jiska koi niyam na ho"
      },
      {
        "en": "As a static text document that cannot be modified or read",
        "hi": "Static text document jo padha na ja sake"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",
      "hi": "Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."
    }
  },
  {
    "question": {
      "en": "When declaring and implementing Project 1: Full-Stack Task & Todo Manager, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
    },
    "options": [
      {
        "en": "Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",
        "hi": "Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"
      },
      {
        "en": "Wrapping every line of code inside an eval() execution block",
        "hi": "Har line ko eval() block mein wrap karna"
      },
      {
        "en": "Omitting import and require statements to reduce file size",
        "hi": "File size ghatane ke liye import statements hatana"
      },
      {
        "en": "Writing all code on a single continuous line without whitespace",
        "hi": "Bina whitespace ke single line par code likhna"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",
      "hi": "ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."
    }
  },
  {
    "question": {
      "en": "What is a common pitfall developers encounter when working with Project 1: Full-Stack Task & Todo Manager?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
    },
    "options": [
      {
        "en": "Writing unit tests before implementing features",
        "hi": "Feature likhne se pehle unit tests likhna"
      },
      {
        "en": "Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",
        "hi": "Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"
      },
      {
        "en": "Using strict equality checks (===) instead of loose equality (==)",
        "hi": "Loose equality ke badle strict equality use karna"
      },
      {
        "en": "Writing clear inline code documentation",
        "hi": "Clear inline code comments likhna"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",
      "hi": "Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."
    }
  },
  {
    "question": {
      "en": "According to production best practices, how should Project 1: Full-Stack Task & Todo Manager be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ko kaise architect karna chahiye?"
    },
    "options": [
      {
        "en": "Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",
        "hi": "Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"
      },
      {
        "en": "Hardcode sensitive database connection strings directly in client-side files",
        "hi": "Database passwords ko client files mein hardcode karna"
      },
      {
        "en": "Disable all linter rules and type warnings globally",
        "hi": "Linter aur type warnings ko globally disable karna"
      },
      {
        "en": "Store all user session variables in global un-scoped memory arrays",
        "hi": "Global memory arrays mein sessions store karna"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",
      "hi": "Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."
    }
  },
  {
    "question": {
      "en": "How does proper optimization of Project 1: Full-Stack Task & Todo Manager impact application memory and CPU consumption?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
    },
    "options": [
      {
        "en": "It increases server CPU temperature to 100 degrees Celsius",
        "hi": "Server CPU temperature 100 degrees kar deta hai"
      },
      {
        "en": "It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",
        "hi": "Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"
      },
      {
        "en": "It doubles heap RAM allocation unconditionally",
        "hi": "Heap RAM ko zabardasti double karta hai"
      },
      {
        "en": "Optimization has zero measurable impact in modern web engines",
        "hi": "Modern web engines par optimization ka koi asar nahi hota"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",
      "hi": "Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."
    }
  },
  {
    "question": {
      "en": "What security principle is non-negotiable when handling data within Project 1: Full-Stack Task & Todo Manager?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
    },
    "options": [
      {
        "en": "Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",
        "hi": "Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"
      },
      {
        "en": "Trust all requests coming from mobile devices or web browsers blindly",
        "hi": "Mobile ya browser se aane wali requests par blind trust karein"
      },
      {
        "en": "Disable HTTPS and SSL certificates to maximize raw network throughput",
        "hi": "Network throughput ke liye HTTPS band karein"
      },
      {
        "en": "Expose database admin credentials to all registered users",
        "hi": "Database admin credentials sabhi users ko expose karein"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",
      "hi": "Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."
    }
  },
  {
    "question": {
      "en": "How does asynchronous non-blocking execution operate in Project 1: Full-Stack Task & Todo Manager?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) mein asynchronous non-blocking execution kaise kaam karta hai?"
    },
    "options": [
      {
        "en": "It freezes the entire operating system until each operation completes",
        "hi": "Har operation complete hone tak operating system freeze rehta hai"
      },
      {
        "en": "I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",
        "hi": "I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"
      },
      {
        "en": "Async operations execute in reverse alphabetical order automatically",
        "hi": "Async operations reverse alphabetical order mein chalte hain"
      },
      {
        "en": "Async code only executes when triggered manually by a user click",
        "hi": "Sirf manual user click par async code chalta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",
      "hi": "Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."
    }
  },
  {
    "question": {
      "en": "What is the recommended pattern for propagating errors that occur in Project 1: Full-Stack Task & Todo Manager?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
    },
    "options": [
      {
        "en": "Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",
        "hi": "Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"
      },
      {
        "en": "Swallowing errors silently with empty catch {} blocks to hide problems from logs",
        "hi": "Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"
      },
      {
        "en": "Shutting down the server machine power immediately",
        "hi": "Server machine power turant band kar dena"
      },
      {
        "en": "Sending internal raw stack traces and database credentials to end-user browsers",
        "hi": "Raw stack trace aur DB passwords browser par bhej dena"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",
      "hi": "Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."
    }
  },
  {
    "question": {
      "en": "When authoring unit or integration tests for Project 1: Full-Stack Task & Todo Manager, what must the test suite assert?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
    },
    "options": [
      {
        "en": "Only that the JavaScript file can be saved to disk",
        "hi": "Sirf ye ki file disk par save ho sake"
      },
      {
        "en": "Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",
        "hi": "Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"
      },
      {
        "en": "That the test suite takes at least 24 hours to finish running",
        "hi": "Test suite ko 24 ghante chalna chahiye"
      },
      {
        "en": "Testing is considered unnecessary in modern full-stack development",
        "hi": "Modern development mein testing zaroori nahi hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",
      "hi": "Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."
    }
  },
  {
    "question": {
      "en": "How does modular design enhance code maintainability in Project 1: Full-Stack Task & Todo Manager?",
      "hi": "Modular design Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) mein code maintainability ko kaise badhata hai?"
    },
    "options": [
      {
        "en": "By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",
        "hi": "Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"
      },
      {
        "en": "By combining all frontend, backend, and database code into a single 50,000-line script",
        "hi": "Saara code ek hi 50,000-line script mein daal kar"
      },
      {
        "en": "By removing all function names and replacing them with random numbers",
        "hi": "Function names hata kar random numbers likhna"
      },
      {
        "en": "By forbidding code comments and documentation across the repository",
        "hi": "Comments aur documentation ban kar dena"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",
      "hi": "Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."
    }
  },
  {
    "question": {
      "en": "When application traffic scales 100x, how should Project 1: Full-Stack Task & Todo Manager be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ko horizontally scale karne ke liye kya design approach honi chahiye?"
    },
    "options": [
      {
        "en": "Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",
        "hi": "Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"
      },
      {
        "en": "Store all user session variables in local in-memory JavaScript objects on the web server",
        "hi": "Server ki local RAM mein session variables store karna"
      },
      {
        "en": "Reboot the production server manually whenever memory usage exceeds 10%",
        "hi": "Memory 10% cross hote hi server manually reboot karna"
      },
      {
        "en": "Block 95% of incoming users using firewall rules",
        "hi": "95% users ko firewall se block kar dena"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",
      "hi": "Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."
    }
  },
  {
    "question": {
      "en": "In the full-stack MERN paradigm, where does Project 1: Full-Stack Task & Todo Manager properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) kahan belong karta hai aur kahan execute hota hai?"
    },
    "options": [
      {
        "en": "In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",
        "hi": "Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"
      },
      {
        "en": "Directly on the end-user's local router firmware",
        "hi": "User ke local router firmware par"
      },
      {
        "en": "Inside the computer motherboard BIOS chip",
        "hi": "Motherboard BIOS chip mein"
      },
      {
        "en": "All MERN code runs strictly inside the MongoDB database engine",
        "hi": "Saara MERN code sirf MongoDB ke andar chalta hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",
      "hi": "Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."
    }
  },
  {
    "question": {
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Project 1: Full-Stack Task & Todo Manager in production?",
      "hi": "Production mein Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
    },
    "options": [
      {
        "en": "The desktop monitor brightness setting of the client",
        "hi": "Client ke monitor ki brightness"
      },
      {
        "en": "Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",
        "hi": "Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"
      },
      {
        "en": "The number of files in the project's root folder",
        "hi": "Root folder mein files ki sankhya"
      },
      {
        "en": "The physical keyboard model used by the engineer",
        "hi": "Engineer ke keyboard ka model"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",
      "hi": "p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."
    }
  },
  {
    "question": {
      "en": "Why is eliminating unintended side effects essential when authoring logic for Project 1: Full-Stack Task & Todo Manager?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
    },
    "options": [
      {
        "en": "Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",
        "hi": "Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"
      },
      {
        "en": "Side effects permanently erase the developer's Git commit history",
        "hi": "Git history permanently delete ho jaati hai"
      },
      {
        "en": "Side effects are strictly required by the JavaScript ECMAScript standard",
        "hi": "ECMAScript mein side effects required hain"
      },
      {
        "en": "Side effects make all algorithms execute in O(1) time",
        "hi": "Saare algorithms O(1) time mein chalte hain"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",
      "hi": "Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."
    }
  },
  {
    "question": {
      "en": "How should client-side state be kept in sync with backend server mutations in Project 1: Full-Stack Task & Todo Manager?",
      "hi": "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
    },
    "options": [
      {
        "en": "By forcing a complete hard page refresh every 3 seconds",
        "hi": "Har 3 second mein poora page hard refresh karke"
      },
      {
        "en": "Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",
        "hi": "Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"
      },
      {
        "en": "By disabling all database update operations permanently",
        "hi": "Database updates ko permanently band karke"
      },
      {
        "en": "By saving user state in local CSV files on the server desktop",
        "hi": "Server desktop par CSV files save karke"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",
      "hi": "Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."
    }
  }
],
};
