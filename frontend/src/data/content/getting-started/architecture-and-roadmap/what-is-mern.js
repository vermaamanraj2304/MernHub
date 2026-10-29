/**
 * Module 0: Getting Started & Roadmap
 * Topic: Architecture & Roadmap
 * Subtopic: What is MERN & Architecture Overview
 */

export default {
  id: "gs-what-is-mern",
  title: {
    en: "What is MERN & Architecture Overview",
    hi: "MERN Kya Hai & Architecture Overview",
  },
  difficulty: "Beginner",
  readTime: 10,
  sections: [
    // 1. Concept
    {
      id: "concept",
      type: "concept",
      heading: {
        en: "What is the MERN Stack?",
        hi: "MERN Stack Kya Hota Hai?",
      },
      body: {
        en: `**MERN** is an acronym for four powerhouse technologies that together form a complete, end-to-end full-stack web development suite:

1. **M - MongoDB**: A document-oriented NoSQL database that stores data in flexible, JSON-like BSON documents.
2. **E - Express.js**: A minimalist, fast web application framework for Node.js that handles HTTP routing, request parsing, and middleware pipelines.
3. **R - React.js**: A declarative, component-driven frontend library developed by Meta for building dynamic, high-performance user interfaces.
4. **N - Node.js**: A cross-platform JavaScript runtime environment built on Google Chrome's V8 engine that executes JavaScript on the server side.

### The Unified JavaScript Advantage
The revolutionary advantage of the MERN stack is that **JavaScript is the universal language across the entire application**:
- You write UI components in JavaScript (React).
- You write the server logic and REST APIs in JavaScript (Express + Node).
- You interact with the database using JSON/JavaScript objects (MongoDB + Mongoose).

There is zero context switching between different languages (like writing PHP for backend, SQL for database, and JavaScript for frontend).`,
        hi: `**MERN** chaar aisi powerful technologies ka combination hai jo milkar ek complete full-stack web application banati hain:

1. **M - MongoDB**: Ek NoSQL document database jo data ko JSON jaise BSON format mein flexible documents ke roop mein store karta hai.
2. **E - Express.js**: Node.js ke upar bana ek lightweight framework jo HTTP routes, REST APIs, aur middleware ko handle karta hai.
3. **R - React.js**: Meta (Facebook) dwara banayi gayi frontend library jo reusable components ke zariye fast aur interactive UI banati hai.
4. **N - Node.js**: Chrome ke V8 engine par bana runtime environment jo JavaScript ko browser ke bahar server par execute karta hai.

### Single Language Ka Sabse Bada Fayda
MERN stack ka sabse bada benefit yeh hai ki **poore project mein sirf ek hi language use hoti hai—JavaScript**:
- Frontend UI JavaScript mein likha jata hai (React).
- Backend server aur APIs JavaScript mein banti hain (Express + Node).
- Database mein data bhi JSON/JavaScript objects ke roop mein store hota hai (MongoDB).

Aapko PHP, Java, ya Python aur SQL ke beech baar-baar switch nahi karna padta. Ek hi language se aap poora full-stack software create kar sakte hain.`
      },
      code: {
        language: "javascript",
        filename: "mern-overview.js",
        snippet: `// The MERN Stack Data Harmony
// Frontend (React) sends JSON:
const clientData = { name: "Aman", role: "Fullstack" };

// Backend (Express/Node) receives JSON:
app.post("/api/users", async (req, res) => {
  const { name, role } = req.body;
  
  // Database (MongoDB) stores JSON natively:
  const newUser = await User.create({ name, role });
  res.status(201).json({ success: true, data: newUser });
});`
      }
    },

    // 2. Why it matters
    {
      id: "why-it-matters",
      type: "concept",
      heading: {
        en: "Why Does the MERN Stack Matter in the Industry?",
        hi: "Industry Mein MERN Stack Itna Popular Kyun Hai?",
      },
      body: {
        en: `In traditional web development, a company needed separate teams: frontend developers writing HTML/JS, backend engineers writing Java/PHP/Python, and DBAs writing complex SQL queries.

**MERN completely transformed this paradigm:**
- **Single Developer Efficiency**: A single engineer can build, test, and ship complete features from the UI to the database without cross-team dependencies.
- **JSON Data Flow**: Data flows from React -> Express -> MongoDB and back as pure JSON without translation overhead.
- **Asynchronous & Scalable**: Node.js uses an event-driven, non-blocking I/O model capable of handling tens of thousands of concurrent client connections with low RAM footprint.
- **Thriving Ecosystem**: The npm registry gives access to over 2 million ready-to-use packages, accelerating development speed exponentially.`,
        hi: `Traditional web development mein companies ko alag-alag teams rakhni padti thi: frontend ke liye JS developers, backend ke liye Java/PHP engineers, aur database ke liye SQL experts.

**MERN stack ne is game ko poori tarah badal diya:**
- **Single Developer Power**: Ek akela full-stack engineer poore feature ko UI se lekar database tak bina kisi dependency ke deploy kar sakta hai.
- **Smooth JSON Pipeline**: Data React se Express aur wahan se MongoDB tak bina kisi data conversion ke pure JSON format mein travel karta hai.
- **High Concurrency & Speed**: Node.js ka non-blocking event-driven architecture hazaron simultaneous users ko kam server cost par serve kar sakta hai.
- **World's Largest Ecosystem**: npm registry par 20 lakh se zyada open-source libraries available hain jo development speed ko 5x badha deti hain.`
      }
    },

    // 3. Real-life analogy
    {
      id: "analogy",
      type: "analogy",
      heading: {
        en: "The Indian Restaurant Analogy",
        hi: "Dhaba Aur Restaurant Ka Real-Life Udaharan",
      },
      body: {
        en: `Think of a full-stack MERN application like a busy Indian restaurant (or Dhaba):

1. **React.js (The Dining Hall & Menu Card)**:
   This is what the customer sees and interacts with. The fancy tables, menu card, buttons, and visual food displays. When you decide what to eat and click an order, you are interacting with React.

2. **Express.js (The Waiter & Order Protocol)**:
   The customer never enters the kitchen directly. The waiter takes your order note, checks if you entered a valid dish (validation), ensures you are seated at a table (auth check), and brings your request to the kitchen.

3. **Node.js (The Kitchen Manager & Stove Runtime)**:
   The kitchen environment where cooking actually takes place. Node provides the gas burners, running water, and kitchen staff who process orders asynchronously without stopping.

4. **MongoDB (The Kitchen Storage Pantry & Refrigerator)**:
   Where ingredients, spices, and supplies are organized in neat containers (collections). The chef fetches paneer, butter, and spices (documents) to prepare your dish and save leftovers for later.`,
        hi: `Full-stack MERN app ko ek popular **Indian Restaurant (ya Dhaba)** ki tarah samjhein:

1. **React.js (Dining Area & Menu Card)**:
   Yeh wo jagah hai jo customer ko dikhti hai—clean tables, sundar lights, aur menu card. Customer yahan aakar item select karta hai aur button press karta hai.

2. **Express.js (The Smart Waiter)**:
   Customer kabhi seedha kitchen ke andar nahi jata. Waiter aapse order leta hai, check karta hai ki item available hai ya nahi (validation), aur order ko kitchen tak le jata hai.

3. **Node.js (Kitchen Environment & Gas Burner)**:
   Node wo kitchen setup hai jahan actual kaam hota hai. Yeh gas chulhe, bartan, aur cooks provide karta hai jo non-stop asynchronous tareeqe se multiple dishes sath mein banate hain.

4. **MongoDB (Pantry & Storage Room)**:
   Yeh kitchen ka grocery store aur fridge hai jahan saara raw material (masale, paneer, vegetables) alag-alag containers (collections) mein organized rehta hai. Jab zaroorat hoti hai, chef yahan se data nikalta hai aur save karta hai.`
      }
    },

    // 4. Syntax / How it works
    {
      id: "syntax",
      type: "syntax",
      heading: {
        en: "Architecture & Request-Response Flow",
        hi: "Architecture & Data Communication Flow",
      },
      body: {
        en: `### The 3-Tier Architecture of MERN

\`\`\`
[ Client Tier ]             [ Application Tier ]            [ Database Tier ]
  React.js   ----HTTP/JSON--->  Express.js on Node.js  ---BSON Driver--->  MongoDB
 (Browser UI) <---JSON Data---  (REST API Server)     <---Documents---   (Atlas Cloud)
\`\`\`

1. **User Action**: A user fills a sign-up form in React and clicks "Register".
2. **HTTP Request**: React makes an asynchronous \`fetch()\` or \`axios.post()\` HTTP call with a JSON payload to \`https://api.myproject.com/api/users\`.
3. **Express Middleware**: Express receives the request, runs security checks (Helmet, CORS), parses the JSON body, and routes it to the user controller.
4. **Database Query**: Node executes the Mongoose query \`User.create(req.body)\` over a persistent TCP socket to MongoDB.
5. **MongoDB Persistence**: MongoDB writes the document into the \`users\` collection and returns the generated \`_id\`.
6. **HTTP Response**: Express sends back \`res.status(201).json({ message: "Success" })\`.
7. **UI Update**: React receives the 201 response, updates component state, and displays a success alert to the user.`,
        hi: `### MERN Ka 3-Tier Architecture Model

\`\`\`
[ Client Layer ]             [ Server Layer ]              [ Database Layer ]
   React.js   ----HTTP/JSON--->  Express.js + Node.js  ---TCP Connection--->  MongoDB
 (User Screen) <---JSON Data---  (API Controller)     <---Documents---    (Atlas Cloud)
\`\`\`

1. **User Action**: User React app mein form bharta hai aur "Register" button dabata hai.
2. **HTTP Request**: React browser se \`axios.post('/api/users', data)\` ke zariye backend server ko JSON data bhejta hai.
3. **Express Middleware**: Express request receive karta hai, CORS check karta hai, body parse karta hai aur user controller ko deta hai.
4. **Database Query**: Node Mongoose model ke through MongoDB ko query bhejta hai: \`User.create(data)\`.
5. **MongoDB Save**: MongoDB naya record \`users\` collection mein save karta hai aur \`_id\` generate karta hai.
6. **HTTP Response**: Express status 201 aur JSON response frontend ko return karta hai.
7. **UI Update**: React response aate hi screen par success notification dikha deta hai.`
      }
    },

    // 5. Examples (3 Levels)
    {
      id: "examples",
      type: "example",
      heading: {
        en: "Example 1 (Basic): Simple Server Health Check",
        hi: "Example 1 (Basic): Express Server Health Check Endpoint",
      },
      body: {
        en: `Every production backend starts with a health-check endpoint. It proves Node.js and Express are running and can reply with JSON to the React client.`,
        hi: `Har production backend mein ek health check endpoint hota hai jo batata hai ki server live hai aur frontend ke sath communicate kar sakta hai.`
      },
      code: {
        language: "javascript",
        filename: "server.js",
        snippet: `import express from 'express';

const app = express();
const PORT = 5000;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    service: 'MERN Learning Hub API'
  });
});

app.listen(PORT, () => {
  console.log(\`Backend server running on http://localhost:\${PORT}\`);
});

// Expected Output when visiting http://localhost:5000/api/health:
// {
//   "status": "online",
//   "timestamp": "2026-10-28T17:30:00.000Z",
//   "uptimeSeconds": 14,
//   "service": "MERN Learning Hub API"
// }`
      }
    },

    {
      id: "example-intermediate",
      type: "example",
      heading: {
        en: "Example 2 (Intermediate): Connecting React Frontend to Express",
        hi: "Example 2 (Intermediate): React Se Express API Call Karna",
      },
      body: {
        en: `This example shows how React fetches data from the Express backend using \`useEffect\` and handles loading and error states cleanly.`,
        hi: `Yeh example dikhata hai ki React component backend se data kaise fetch karta hai aur loading/error states ko professional tareeqe se kaise manage karta hai.`
      },
      code: {
        language: "jsx",
        filename: "ServerStatusWidget.jsx",
        snippet: `import React, { useState, useEffect } from 'react';

export default function ServerStatusWidget() {
  const [serverInfo, setServerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch server status from Express API
    fetch('http://localhost:5000/api/health')
      .then((res) => {
        if (!res.ok) throw new Error('Server responded with error');
        return res.json();
      })
      .then((data) => {
        setServerInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-xs text-slate-400">Pinging server...</p>;
  if (error) return <p className="text-xs text-rose-500 font-semibold">Offline: {error}</p>;

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white space-y-1">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
          {serverInfo.status}
        </span>
      </div>
      <p className="text-xs text-slate-300">Service: {serverInfo.service}</p>
      <p className="text-[10px] text-slate-500 font-mono">Uptime: {serverInfo.uptimeSeconds}s</p>
    </div>
  );
}`
      }
    },

    {
      id: "example-real-world",
      type: "example",
      heading: {
        en: "Example 3 (Real-World): Full 4-Layer Registration Flow",
        hi: "Example 3 (Real-World): Complete 4-Layer User Flow (React -> Node -> Mongo)",
      },
      body: {
        en: `Here is the complete end-to-end code demonstrating how all 4 MERN technologies work together during a user signup:
1. **React**: User inputs email and clicks register.
2. **Express**: Validates incoming payload.
3. **Mongoose/MongoDB**: Saves document to cloud database.
4. **Node**: Orchestrates the async pipeline and sends JSON back.`,
        hi: `Yeh complete real-world example dikhata hai ki charo technologies aapas mein kaise milkar kaam karti hain:
1. **React**: User email type karke submit karta hai.
2. **Express**: Request body validate karta hai.
3. **Mongoose/MongoDB**: Database mein naya document save karta hai.
4. **Node**: Async pipeline execute karke response frontend ko bhejta hai.`
      },
      code: {
        language: "javascript",
        filename: "fullstack-flow.js",
        snippet: `// ==========================================
// 1. DATABASE LAYER: Mongoose Schema (MongoDB)
// ==========================================
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', UserSchema);

// ==========================================
// 2. BACKEND LAYER: Express Route (Node.js)
// ==========================================
import express from 'express';
export const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Save directly to MongoDB
    const user = await User.create({ email });
    return res.status(201).json({ success: true, userId: user._id });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ==========================================
// 3. FRONTEND LAYER: React Component (React.js)
// ==========================================
// export function SignupForm() {
//   const [email, setEmail] = useState('');
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('/api/users/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email })
//     });
//     const data = await res.json();
//     if (data.success) alert('User created with ID: ' + data.userId);
//   };
//   return <form onSubmit={handleSubmit}><input value={email} onChange={e=>setEmail(e.target.value)} /></form>;
// }`
      }
    },

    // 6. Common Mistakes
    {
      id: "mistakes",
      type: "mistakes",
      heading: {
        en: "Common Beginner Mistakes in MERN Architecture",
        hi: "MERN Stack Ke Shuruati Mistakes Aur Unka Solution",
      },
      body: {
        en: `### 1. Trying to Connect React Directly to MongoDB
- **The Mistake**: Beginners sometimes look for a MongoDB connection string inside React code.
- **Why it is impossible & dangerous**: React runs inside the user's browser (client-side). If you put your database credentials in React, any user can inspect the source code, extract your credentials, and delete your database!
- **The Fix**: React NEVER connects to MongoDB directly. React only speaks HTTP to Express. Express securely connects to MongoDB behind the firewall.

---

### 2. Confusing Node.js with Express.js
- **The Mistake**: Thinking Node and Express are two alternative programming languages.
- **The Reality**: Node.js is the **engine/runtime** (like the car's engine). Express.js is a **framework** built on top of Node (like the car's steering wheel and dashboard). You cannot run Express without Node.

---

### 3. Writing Synchronous Blocking Code in Node.js
- **The Mistake**: Using functions like \`fs.readFileSync\` or heavy for-loops in route handlers.
- **Why it breaks**: Node.js is single-threaded. If one request takes 5 seconds of CPU blocking time, ALL other users around the world are frozen out until it finishes!
- **The Fix**: Always use asynchronous non-blocking methods with \`async/await\` and Promises.`,
        hi: `### 1. React Ko Direct MongoDB Se Connect Karne Ki Koshish
- **Galti**: Kuch beginners React ke andar MongoDB connection string lagane ki koshish karte hain.
- **Kyun Dangerous Hai**: React user ke browser par chalta hai. Agar aapne database password frontend mein likha, toh koi bhi inspect element karke password chura sakta hai aur poora database delete kar sakta hai!
- **Sahi Solution**: React kabhi database se direct connect nahi karta. React sirf Express API se baat karta hai, aur Express backend server par secure tareeqe se MongoDB se connect hota hai.

---

### 2. Node.js Aur Express.js Mein Confuse Hona
- **Galti**: Yeh sochna ki Node aur Express alag-alag languages hain.
- **Sach**: Node.js **engine** hai (jaise car ka engine), aur Express.js us engine par bana **framework** hai (jaise car ka steering wheel aur dashboard). Bina Node ke Express chal hi nahi sakta.

---

### 3. Node.js Mein Synchronous Blocking Code Likhna
- **Galti**: Route handlers ke andar \`fs.readFileSync\` ya heavy loops chalana.
- **Kyun Dangerous Hai**: Node.js single-threaded hai. Agar ek user ki request ne CPU ko 5 second ke liye block kiya, toh baaki saare users ki requests line mein atak jayengi aur app hang ho jayegi.
- **Sahi Solution**: Hamesha asynchronous non-blocking code (\`async/await\`) use karein.`
      }
    },

    // 7. Best practices
    {
      id: "best-practices",
      type: "summary",
      heading: {
        en: "Production Best Practices for MERN Stack",
        hi: "Production Best Practices Checklist",
      },
      body: {
        en: `- **Strict Separation of Concerns**: Keep frontend (client) and backend (server) in distinct folders or repos with clean API boundaries.
- **Never Expose Secrets in Client**: Keep API secret keys, database URIs, and JWT signing secrets strictly in backend \`.env\` files.
- **Always Validate Input on Backend**: Even if React validates a form with nice error messages, never trust the client! Hackers can bypass React and send raw HTTP requests using Postman or curl.
- **Use Consistent Status Codes**: Always send proper HTTP status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error).`,
        hi: `- **Clean Separation**: Frontend (client) aur backend (server) ka folder structure hamesha alag aur well-organized rakhein.
- **Secrets Ko Backend Par Safe Rakhein**: Database password aur JWT secrets ko sirf backend ke \`.env\` file mein rakhein, frontend par kabhi nahi.
- **Backend Validation Zaroori Hai**: Frontend validation sirf user convenience ke liye hoti hai. Asli security backend validation se aati hai kyunki Postman se koi bhi direct request bhej sakta hai.
- **Proper Status Codes Bhejein**: Har response ke sath sahi HTTP status code (200, 201, 400, 401, 404, 500) return karein.`
      }
    },

    // 8. Interview Questions
    {
      id: "interview",
      type: "interview",
      heading: {
        en: "MERN Architecture Interview Questions",
        hi: "Top MERN Architecture Interview Questions",
      },
      body: {
        en: "Key questions asked about MERN stack design and architecture in senior tech screens:",
        hi: "MERN stack architecture ke top interview questions jo tech interviews mein puche jaate hain:"
      },
      questions: [
        {
          q: {
            en: "Why is MERN considered a 3-tier architecture even though it has 4 technologies?",
            hi: "MERN mein 4 technologies hone ke bawajood ise 3-Tier Architecture kyun kaha jata hai?"
          },
          a: {
            en: "Architecture tiers are defined by logical boundaries, not technology count: Tier 1 is Presentation (React.js in browser), Tier 2 is Application/Business Logic (Express.js running inside Node.js runtime), and Tier 3 is Database/Data Storage (MongoDB). Express and Node together form the single Server tier.",
            hi: "Architecture ke tiers physical roles par depend karte hain: Tier 1 hai Presentation (React frontend), Tier 2 hai Application Logic (Node.js runtime ke upar chalta Express server), aur Tier 3 hai Data Layer (MongoDB). Node aur Express dono milkar ek hi server tier banate hain."
          },
          takeaway: {
            en: "React = Presentation Tier, Express+Node = Application Tier, MongoDB = Data Tier.",
            hi: "React = Client, Express+Node = Server, MongoDB = Database."
          }
        },
        {
          q: {
            en: "What is the difference between client-side rendering (React) and server-side rendering?",
            hi: "Client-Side Rendering (React SPA) aur Server-Side Rendering mein kya farq hota hai?"
          },
          a: {
            en: "In traditional client-side React (SPA), the server sends a minimal HTML shell with an empty div and bundle.js. The browser downloads the JS, builds the DOM, and fetches data via APIs. In Server-Side Rendering (SSR), the server generates the full HTML on the fly and sends ready-to-view HTML to the browser.",
            hi: "Standard React SPA mein server ek khali HTML file aur JavaScript bundle bhejta hai. User ka browser us JavaScript ko execute karke screen par UI render karta hai. SSR mein server pehle se bana-banaya HTML page bhejta hai."
          },
          takeaway: {
            en: "SPAs render in browser using JS; SSR renders HTML on server.",
            hi: "SPA browser mein render hota hai; SSR server par render hota hai."
          }
        },
        {
          q: {
            en: "How does Node.js handle high traffic if it runs on a single thread?",
            hi: "Agar Node.js single-threaded hai, toh yeh hazaron users ka traffic kaise handle karta hai?"
          },
          a: {
            en: "Node.js offloads slow I/O operations (file reading, network calls, database queries) to the operating system kernel or libuv thread pool. The single main thread stays free to accept new incoming HTTP requests without waiting. When an I/O task finishes, an event callback is pushed to the event loop.",
            hi: "Node.js time-taking kaam (jaise database queries ya file read) ko background mein libuv threadpool ko de deta hai. Isse main thread hamesha free rehta hai aur naye users ki requests turant accept karta rehta hai."
          },
          takeaway: {
            en: "Non-blocking event loop delegates heavy I/O to background workers.",
            hi: "Non-blocking event loop heavy I/O tasks ko background mein process karta hai."
          }
        }
      ]
    },

    // 9. Quick summary
    {
      id: "summary",
      type: "summary",
      heading: {
        en: "Quick Summary & Key Takeaways",
        hi: "Quick Summary & Key Takeaways",
      },
      body: {
        en: `- **MERN = MongoDB + Express.js + React.js + Node.js**.
- Complete full-stack unified under **one single programming language: JavaScript**.
- **React** handles user interface and client state.
- **Express on Node** provides the REST API server and business logic.
- **MongoDB** stores data as flexible, schema-free BSON documents.
- React NEVER communicates with MongoDB directly; all communication passes securely through Express.`,
        hi: `- **MERN = MongoDB + Express.js + React.js + Node.js**.
- Poora full-stack development **ek hi language (JavaScript)** se chalta hai.
- **React** user interface aur buttons/forms ko manage karta hai.
- **Express aur Node** server logic aur REST APIs handle karte hain.
- **MongoDB** data ko flexible BSON documents mein store karta hai.
- React kabhi direct database se connect nahi karta; saari requests Express server se hokar jaati hain.`
      }
    }
  ],

  // 10. Quiz
  quiz: [
  {
    "q": {
      "en": "What role does Express.js play in the MERN architecture?",
      "hi": "MERN architecture mein Express.js ka kya role hota hai?"
    },
    "options": [
      {
        "en": "Stores persistent data on the hard drive",
        "hi": "Hard drive par data permanently store karna"
      },
      {
        "en": "Web application framework for Node.js handling HTTP routes and middleware",
        "hi": "Node.js ke liye framework jo HTTP routes aur middleware handle karta hai"
      },
      {
        "en": "Compiles React JSX into HTML in the browser",
        "hi": "Browser ke andar React JSX ko HTML mein compile karna"
      },
      {
        "en": "Manages CSS stylesheets on the client",
        "hi": "Client par CSS stylesheets manage karna"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Express.js is a minimalist web framework for Node.js that provides routing, middleware pipeline, and HTTP request/response handling.",
      "hi": "Express.js ek web framework hai jo Node runtime par chalta hai aur API routes aur middleware manage karta hai."
    }
  },
  {
    "q": {
      "en": "Why should React never connect directly to MongoDB?",
      "hi": "React ko kabhi direct MongoDB se connect kyun nahi karna chahiye?"
    },
    "options": [
      {
        "en": "MongoDB only supports Python drivers",
        "hi": "MongoDB sirf Python drivers support karta hai"
      },
      {
        "en": "React runs in the client browser, so database credentials would be exposed publicly to all users",
        "hi": "React browser mein chalta hai, isliye database password publicly sabhi users ko dikh jayega"
      },
      {
        "en": "React does not support JSON data",
        "hi": "React JSON data support nahi karta"
      },
      {
        "en": "Browser security blocks all outgoing network requests",
        "hi": "Browser saari outgoing network requests ko block kar deta hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Client-side code running in a browser is public. Embedding database connection strings in React exposes your database to total compromise.",
      "hi": "Browser par chalne wala code inspect kiya ja sakta hai. React mein database connection string lagane se koi bhi password chura kar data delete kar sakta hai."
    }
  },
  {
    "q": {
      "en": "What is the primary advantage of using a single language (JavaScript) across the MERN stack?",
      "hi": "Poore MERN stack mein ek hi language (JavaScript) use karne ka sabse bada fayda kya hai?"
    },
    "options": [
      {
        "en": "It makes the computer consume 0% CPU",
        "hi": "Isse computer 0% CPU consume karta hai"
      },
      {
        "en": "Eliminates language context switching and allows seamless sharing of validation logic and JSON data",
        "hi": "Language switch karne ka jhanjhat khatam hota hai aur JSON data/validation code share kiya ja sakta hai"
      },
      {
        "en": "MongoDB refuses to store data written in other languages",
        "hi": "MongoDB kisi doosri language ka data store karne se mana kar deta hai"
      },
      {
        "en": "React cannot communicate with servers built in Java or Python",
        "hi": "React Java ya Python servers se baat nahi kar sakta"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Single-language harmony means one engineer can navigate the whole stack with zero mental friction, sharing types, models, and JSON formats seamlessly.",
      "hi": "Ek hi language hone se developer frontend aur backend mein bina kisi barrier ke tezi se code likh sakta hai aur JSON model share kar sakta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of What is MERN & Architecture Overview in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein MERN Kya Hai & Architecture Overview ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling what is mern & architecture overview with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath MERN Kya Hai & Architecture Overview ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "What is MERN & Architecture Overview establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "MERN Kya Hai & Architecture Overview clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does What is MERN & Architecture Overview directly resolve?",
      "hi": "MERN Kya Hai & Architecture Overview kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without What is MERN & Architecture Overview, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "MERN Kya Hai & Architecture Overview ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about What is MERN & Architecture Overview, how is its mental model best conceptualized through real-world analogies?",
      "hi": "MERN Kya Hai & Architecture Overview ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing What is MERN & Architecture Overview, what syntactic convention is essential to prevent runtime errors?",
      "hi": "MERN Kya Hai & Architecture Overview ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with What is MERN & Architecture Overview?",
      "hi": "MERN Kya Hai & Architecture Overview ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should What is MERN & Architecture Overview be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye MERN Kya Hai & Architecture Overview ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of What is MERN & Architecture Overview impact application memory and CPU consumption?",
      "hi": "MERN Kya Hai & Architecture Overview ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within What is MERN & Architecture Overview?",
      "hi": "MERN Kya Hai & Architecture Overview mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in What is MERN & Architecture Overview?",
      "hi": "MERN Kya Hai & Architecture Overview mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in What is MERN & Architecture Overview?",
      "hi": "MERN Kya Hai & Architecture Overview mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for What is MERN & Architecture Overview, what must the test suite assert?",
      "hi": "MERN Kya Hai & Architecture Overview ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in What is MERN & Architecture Overview?",
      "hi": "Modular design MERN Kya Hai & Architecture Overview mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should What is MERN & Architecture Overview be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par MERN Kya Hai & Architecture Overview ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does What is MERN & Architecture Overview properly belong and execute?",
      "hi": "Full-stack MERN architecture mein MERN Kya Hai & Architecture Overview kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with What is MERN & Architecture Overview in production?",
      "hi": "Production mein MERN Kya Hai & Architecture Overview ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for What is MERN & Architecture Overview?",
      "hi": "MERN Kya Hai & Architecture Overview ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in What is MERN & Architecture Overview?",
      "hi": "MERN Kya Hai & Architecture Overview mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
  },
  {
    "question": {
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in What is MERN & Architecture Overview?",
      "hi": "MERN Kya Hai & Architecture Overview mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
    },
    "options": [
      {
        "en": "To prevent memory leaks where unreachable or orphaned objects remain retained in heap memory, causing gradual performance degradation and crashes",
        "hi": "Memory leaks rokne ke liye taaki unneeded objects RAM mein jama na hon aur server crash na ho"
      },
      {
        "en": "To delete the client's local disk partition",
        "hi": "Client ka local disk partition delete karne ke liye"
      },
      {
        "en": "Because JavaScript engines allow only 5 variables in RAM",
        "hi": "JS engine sirf 5 variables allow karta hai"
      },
      {
        "en": "Cleanup is unnecessary because garbage collection handles 100% of event listeners automatically",
        "hi": "Cleanup ki zaroorat nahi hoti"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Unclosed connections and dangling event listeners create references that prevent garbage collection, leading to severe memory leaks over time.",
      "hi": "Dangling listeners aur unclosed connections memory leaks banate hain jo V8 heap ko exhaust karke process crash kar dete hain."
    }
  }
],
};
