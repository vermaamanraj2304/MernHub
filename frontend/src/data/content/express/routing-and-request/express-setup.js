export default {
  id: "exp-app-setup",
  title: {
    en: "Express App Setup & Architecture",
    hi: "Express Setup & Application Instance",
  },
  difficulty: "Beginner",
  readTime: 8,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is Express.js?",
        hi: "1. Express.js Kya Hai?",
      },
      body: {
        en: `**Express.js** is a fast, unopinionated, minimalist web framework for Node.js. It is the 'E' in the MERN stack and acts as the backbone for building RESTful APIs, microservices, and server-rendered web applications.

When you install Express and call \`const app = express()\`, you are creating an **Express Application Instance**.

### What does the \`app\` object provide?
1. **Routing System**: Directing incoming HTTP requests to specific handler functions based on URL paths and HTTP methods (\`app.get\`, \`app.post\`, \`app.put\`, \`app.delete\`).
2. **Middleware Pipeline**: A sequential chain of functions that inspect, mutate, or authenticate incoming requests before they reach the controller.
3. **HTTP Server Abstraction**: Convenient wrappers for status codes (\`res.status(200)\`), response formatting (\`res.json()\`), and network listening (\`app.listen()\`).`,
        hi: `**Express.js** Node.js ke liye ek fast, minimalist aur flexible web framework hai. Yeh MERN stack ka 'E' hai aur backend RESTful APIs aur web servers banane ke liye industry standard hai.

Jab aap \`const app = express()\` likhte ho, toh aap ek **Express Application Instance** create karte ho.

### \`app\` Object Humein Kya Deta Hai?
1. **Routing System**: Incoming requests ko unke URL aur HTTP method ke hisab se sahi handler function tak pahunchana (\`app.get\`, \`app.post\`, etc.).
2. **Middleware Pipeline**: Functions ki ek chain jo request ko route tak pahunchne se pehle check karti hai (jaise authentication ya JSON data parse karna).
3. **Clean Helper Functions**: \`res.json()\`, \`res.status()\` jaise readable methods jo native Node ke 10-line ke code ko 1 line mein samet dete hain.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Why Express Over Native Node HTTP?",
        hi: "2. Raw Node HTTP Ke Mukable Express Kyun?",
      },
      body: {
        en: `In the previous module, we built a native HTTP server with \`node:http\`. Doing that in production requires:
- Manually parsing query strings using the \`URL\` API.
- Manually collecting request stream chunks for POST bodies (\`req.on('data')\`).
- Writing messy nested \`if/else\` blocks for URL matching.
- Manually handling CORS headers, status codes, and content-type headers.

### The Express Advantage:
With Express, all that manual plumbing is reduced to 2 lines of code:
\`\`\`javascript
app.use(express.json()); // Automatically parses incoming JSON request bodies!
app.get('/api/users', (req, res) => res.json(users)); // Clean, expressive routing!
\`\`\``,
        hi: `Pichle module mein humne dekha tha ki bina framework ke raw \`node:http\` mein:
- Query parameters alag parse karne padte the.
- POST request ka body data collect karne ke liye stream chunks aur Buffer concat lagana padta tha.
- URL match karne ke liye lambe \`if/else\` likhne padte the.

### Express Ka Fayda:
Express is saare repetitive jhanjhat ko 2 lines mein khatam kar deta hai:
\`\`\`javascript
app.use(express.json()); // Har aane wali JSON request ko automatically parse karega!
app.get('/api/users', (req, res) => res.json(users)); // Ek line mein clean routing!
\`\`\``,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The National Expressway Toll Plaza",
        hi: "Real-Life Analogy: Expressway Ka High-Tech Toll Plaza",
      },
      body: {
        en: `Imagine driving onto the **Delhi-Mumbai Expressway**:

- **The Toll Plaza Entry (\`const app = express()\`)**: The entire checkpoint infrastructure facility.
- **The Toll Lanes & Security Barricades (Middlewares)**:
  - **Lane 1 (Body Parser)**: Inspects the vehicle type and cargo weight (\`express.json()\`).
  - **Lane 2 (Security Check)**: Checks driver credentials and permits (\`authMiddleware\`).
  - **Lane 3 (Access Log)**: Scans FASTag and prints timestamp (\`morgan logger\`).
- **The Destination Exits (Routes)**:
  - \`/jaipur\` -> Takes you to Jaipur destination handler (\`app.get('/jaipur', ...)\`).
  - \`/agra\` -> Takes you to Agra destination handler.
- If a car does not have a valid FASTag or cargo permit, the security barricade stops them right at the toll gate, never allowing them to enter the highway!`,
        hi: `Sochiye **Delhi-Mumbai Expressway Ka Toll Plaza**:

- **Toll Plaza Facility (\`app = express()\`)**: Poora highway entry gate infrastructure.
- **Toll Booths & Security Check (Middlewares)**:
  - **Booth 1 (Body Parser)**: Gaadi ka saaman check karta hai (\`express.json()\`).
  - **Booth 2 (Security)**: Driver ka FASTag aur permit verify karta hai (\`authMiddleware\`).
  - **Booth 3 (Camera)**: Time aur number plate record karta hai (\`logger\`).
- **Highway Exits (Routes)**:
  - \`/jaipur\` exit -> Jaipur route handler.
  - \`/agra\` exit -> Agra route handler.
- Agar kisi gaadi ke paas permit nahi hai, toh toll plaza ka barrier use yahin rok deta hai aur highway par enter nahi hone deta!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. Syntax: Application Setup & Built-in Middlewares",
        hi: "4. Syntax: Express Setup Aur Built-in Middlewares",
      },
      body: {
        en: `\`\`\`javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Parse JSON payloads (Content-Type: application/json)
app.use(express.json());

// 2. Parse URL-encoded form submissions (Content-Type: application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// 3. Serve static files from the 'public' directory
app.use(express.static('public'));

// 4. Sample Route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to MERN Express API!" });
});

// 5. Start listening for incoming connections
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
\`\`\``,
        hi: `\`\`\`javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Incoming JSON request data ko parse karne ke liye zaroori
app.use(express.json());

// 2. HTML Form data (URL-encoded) ko parse karne ke liye
app.use(express.urlencoded({ extended: true }));

// 3. Images, CSS, HTML files ko directly serve karne ke liye
app.use(express.static('public'));

// 4. Basic Root Route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Express Server Active!" });
});

// 5. Port par server start karna
app.listen(PORT, () => {
  console.log(\`Server online at port \${PORT}\`);
});
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: Express Setup, Static Assets & Port Binding",
        hi: "5. Practical Examples: Express Setup, Static Files aur Server Startup",
      },
      body: {
        en: `### Example 1: Complete Minimalist REST API Skeleton
Demonstrating clean setup with health check and JSON body handling.`,
        hi: `### Example 1: Minimalist Express API Setup
Health check route aur POST JSON body handling ka clean structure.`,
      },
      code: {
        language: "javascript",
        filename: "serverSetup.js",
        snippet: `// Example 1: Minimalist Express Server
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable JSON body parsing middleware
app.use(express.json());

// 1. Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 2. Echo POST route
app.post("/api/echo", (req, res) => {
  // req.body is available because of express.json()!
  const payload = req.body;
  res.status(201).json({
    message: "Payload received successfully",
    data: payload
  });
});

app.listen(PORT, () => {
  console.log(\`🚀 Express server listening at http://localhost:\${PORT}\`);
});`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Static Asset Serving with express.static",
        hi: "Example 2: express.static Se Images Aur HTML Files Serve Karna",
      },
      body: {
        en: `### Example 2: Serving Client Assets
Configuring public directories to serve static images, PDFs, and client bundles with caching headers.`,
        hi: `### Example 2: Static Folder Configure Karna
Images aur downloaded documents ko public URL par expose karne ka standard method.`,
      },
      code: {
        language: "javascript",
        filename: "staticAssets.js",
        snippet: `// Example 2: Serving Static Files with Options
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static assets from the 'public' folder with 1-day browser caching
const publicDirectory = path.join(__dirname, "public");

app.use("/static", express.static(publicDirectory, {
  maxAge: "1d", // Cache headers (Cache-Control: max-age=86400)
  etag: true,
  dotfiles: "ignore" // Security: ignore hidden files like .env
}));

// Accessing an image inside public/images/logo.png:
// GET http://localhost:5000/static/images/logo.png

app.listen(5001, () => {
  console.log("Static asset server listening on port 5001");
});`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Safe Port Management with Fallbacks",
        hi: "Example 3: Environment-Aware Dynamic Port Management",
      },
      body: {
        en: `### Example 3: Handling Port Clashes & Environment Switching
Safely choosing ports between cloud hosts (Render/Heroku injects \`process.env.PORT\`) and local dev machines.`,
        hi: `### Example 3: Cloud Deployment Friendly Port Configuration
Cloud hosting platforms ke dynamic ports ko gracefully handle karne ka pattern.`,
      },
      code: {
        language: "javascript",
        filename: "portManagement.js",
        snippet: `// Example 3: Production Port Binding & Host Configuration
import express from "express";

const app = express();

// In production (Render, Heroku, AWS), process.env.PORT is injected dynamically.
// Locally on laptop, it falls back to 5000.
const PORT = parseInt(process.env.PORT, 10) || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.get("/", (req, res) => {
  res.json({ environment: NODE_ENV, port: PORT });
});

const server = app.listen(PORT, () => {
  console.log(\`===============================================\`);
  console.log(\`  Server Status:  ONLINE\`);
  console.log(\`  Environment:    \${NODE_ENV.toUpperCase()}\`);
  console.log(\`  Active Port:    \${PORT}\`);
  console.log(\`  Local Address:  http://localhost:\${PORT}\`);
  console.log(\`===============================================\`);
});

// Handling port-in-use errors gracefully
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(\`❌ Port \${PORT} is already in use by another application!\`);
    process.exit(1);
  }
});`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Mistakes in Express Setup",
        hi: "6. Express Setup Mein Hone Wali Badi Galtiyan",
      },
      mistakes: [
        {
          mistake: {
            en: "Forgetting `app.use(express.json())`, leading to `req.body` being undefined in POST and PUT requests.",
            hi: "`app.use(express.json())` likhna bhool jana jiski wajah se `req.body` undefined aati hai.",
          },
          correction: {
            en: "Express 4.16+ has built-in JSON parsing. Always place `app.use(express.json())` at the top of your server file before defining any route handlers.",
            hi: "Hamesha routes define karne se pehle file ke top par `app.use(express.json())` zaroor lagayein.",
          },
          code: `// BUG:
// app.post('/users', (req, res) => {
//   console.log(req.body.name); // TypeError: Cannot read properties of undefined!
// });

// FIX:
app.use(express.json()); // Must be mounted BEFORE routes!
app.post('/users', (req, res) => {
  console.log(req.body.name); // Works cleanly!
});`,
        },
        {
          mistake: {
            en: "Hardcoding port numbers like `app.listen(3000)` without checking `process.env.PORT`.",
            hi: "Port number ko hardcode `app.listen(3000)` likhna.",
          },
          correction: {
            en: "Cloud platforms (Render, Railway, Vercel) assign random dynamic ports via `process.env.PORT`. Hardcoding port 3000 causes deployments to fail with timeout errors. Always use `process.env.PORT || 5000`.",
            hi: "Cloud hosting platforms dynamic port assign karte hain. Hamesha `const PORT = process.env.PORT || 5000;` use karein.",
          },
          code: `// BAD:
// app.listen(3000); // Fails on Render/Heroku!

// GOOD:
const PORT = process.env.PORT || 5000;
app.listen(PORT);`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Production Best Practices",
        hi: "7. Production Express Setup Ke Best Practices",
      },
      body: {
        en: `- **Separate app and server**: Export \`app\` from an \`app.js\` file and start \`app.listen()\` in a separate \`server.js\` file. This makes testing with Supertest effortless without starting real network ports!
- **Configure Request Body Size Limits**: Protect your server from memory exhaustion by setting payload limits: \`app.use(express.json({ limit: '10kb' }))\`.
- **Disable X-Powered-By**: Express sets an \`X-Powered-By: Express\` header by default. Disable it with \`app.disable('x-powered-by')\` so attackers cannot fingerprint your technology stack.`,
        hi: `- **app.js Aur server.js Ko Alag Rakhein**: \`app\` object ko \`app.js\` mein banayein aur \`app.listen()\` ko \`server.js\` mein rakhein taaki automated testing aasan ho sake.
- **Payload Limit Lagayein**: DoS attack se bachne ke liye limit lagayein: \`app.use(express.json({ limit: '10kb' }))\`.
- **X-Powered-By Header Hide Karein**: Hackers se framework chupane ke liye \`app.disable('x-powered-by')\` likhein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "8. Top Interview Questions & Answers",
        hi: "8. Top Interview Sawal Aur Jawab",
      },
      questions: [
        {
          q: {
            en: "What does `app.use(express.json())` do under the hood?",
            hi: "`app.use(express.json())` background mein kya kaam karta hai?",
          },
          a: {
            en: "It is a built-in middleware that checks the incoming request's Content-Type header. If it matches 'application/json', it reads and buffers the incoming body stream chunks, concatenates them, parses the raw JSON string into a JavaScript object, and attaches the parsed object to `req.body`. If parsing fails, it forwards a 400 Bad Request error.",
            hi: "Yeh ek built-in middleware hai jo request ka Content-Type check karta hai. Agar wo 'application/json' hota hai, toh yeh aane wale body stream chunks ko collect karke JSON string ko parse karta hai aur parsed object ko `req.body` par attach kar deta hai.",
          },
        },
        {
          q: {
            en: "Why is it best practice to separate `app.js` and `server.js` in Express?",
            hi: "Express mein `app.js` aur `server.js` ko alag files mein rakhna best practice kyun hai?",
          },
          a: {
            en: "Separating the Express application declaration (`app.js`) from the network port listener (`server.js`) enables automated API testing using test runners like Jest and Supertest. Testing frameworks can import the `app` instance directly and send simulated HTTP requests in-memory without binding to actual network ports, preventing port conflict errors (`EADDRINUSE`) during parallel test runs.",
            hi: "`app.js` (routes/middlewares) aur `server.js` (`app.listen`) ko alag rakhne se Jest aur Supertest ke zariye testing karna aasan ho jata hai. Test runner direct `app` ko import karke in-memory test kar sakta hai bina actual port open kiye.",
          },
        },
        {
          q: {
            en: "How does Express handle static files using `express.static`?",
            hi: "Express static files ko `express.static` se kaise serve karta hai?",
          },
          a: {
            en: "express.static is the only built-in middleware in Express that serves static files (HTML, CSS, images). It maps requested URL paths directly to matching files in the designated filesystem directory, automatically sets the correct Content-Type header based on file extension, and supports HTTP caching headers like ETag and Last-Modified.",
            hi: "express.static Express ka built-in middleware hai jo public folder ki images aur CSS files ko serve karta hai. Yeh file extension dekh kar automatic sahi Content-Type aur caching headers laga deta hai.",
          },
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "9. Summary Cheatsheet",
        hi: "9. Summary Cheatsheet",
      },
      body: {
        en: `- **Initialize**: \`const app = express()\`.
- **JSON Body**: \`app.use(express.json())\` (MANDATORY for POST/PUT).
- **Static Assets**: \`app.use(express.static('public'))\`.
- **Port**: \`process.env.PORT || 5000\`.
- **Security**: \`app.disable('x-powered-by')\`.`,
        hi: `- **Initialize**: \`const app = express()\`.
- **JSON Parser**: \`app.use(express.json())\` routes se pehle lagayein.
- **Static Files**: \`app.use(express.static('public'))\`.
- **Dynamic Port**: \`process.env.PORT || 5000\`.
- **Security**: \`app.disable('x-powered-by')\` karein.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What is the value of `req.body` in a POST route handler if `app.use(express.json())` is omitted?",
      "hi": "Agar `app.use(express.json())` na lagaya jaye toh POST route mein `req.body` ki value kya hoti hai?"
    },
    "options": [
      {
        "en": "undefined",
        "hi": "undefined"
      },
      {
        "en": "An empty object {}",
        "hi": "Ek empty object {}"
      },
      {
        "en": "null",
        "hi": "null"
      },
      {
        "en": "A raw Buffer",
        "hi": "Ek raw Buffer"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Without body parser middleware, Express does not parse the incoming request body stream, leaving req.body as undefined.",
      "hi": "Bina express.json() ke Express body parse nahi karta aur req.body undefined rehta hai."
    }
  },
  {
    "q": {
      "en": "Why should you use `process.env.PORT || 5000` instead of a hardcoded `3000`?",
      "hi": "Hardcoded 3000 ki jagah `process.env.PORT || 5000` use karna kyun zaroori hai?"
    },
    "options": [
      {
        "en": "Cloud hosting platforms (Render, Railway, Heroku) inject the port dynamically via process.env.PORT",
        "hi": "Cloud hosting platforms (Render, Railway) port ko dynamically process.env.PORT se inject karte hain"
      },
      {
        "en": "Port 3000 is reserved only for React frontends",
        "hi": "Port 3000 sirf React ke liye reserve hota hai"
      },
      {
        "en": "Node.js throws a syntax error if an integer is passed to app.listen",
        "hi": "app.listen mein number pass karne par syntax error aati hai"
      },
      {
        "en": "To enable HTTP/3 encryption automatically",
        "hi": "HTTP/3 encryption enable karne ke liye"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Cloud PaaS hosts assign dynamic port numbers at runtime via environment variables.",
      "hi": "Cloud platforms server start karte waqt environment variable ke through port assign karte hain."
    }
  },
  {
    "q": {
      "en": "Which Express method disables the `X-Powered-By: Express` header for security?",
      "hi": "Security ke liye `X-Powered-By: Express` header ko kaunsa Express method disable karta hai?"
    },
    "options": [
      {
        "en": "app.disable('x-powered-by')",
        "hi": "app.disable('x-powered-by')"
      },
      {
        "en": "app.removeHeader('express')",
        "hi": "app.removeHeader('express')"
      },
      {
        "en": "res.hideTechnology()",
        "hi": "res.hideTechnology()"
      },
      {
        "en": "express.setSecurity(true)",
        "hi": "express.setSecurity(true)"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "app.disable('x-powered-by') prevents Express from advertising itself in HTTP response headers.",
      "hi": "app.disable('x-powered-by') Express ko response headers mein advertise hone se rokta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Express App Setup & Architecture in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Express Setup & Application Instance ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling express app setup & architecture with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Express Setup & Application Instance ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Express App Setup & Architecture establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Express Setup & Application Instance clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Express App Setup & Architecture directly resolve?",
      "hi": "Express Setup & Application Instance kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Express App Setup & Architecture, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Express Setup & Application Instance ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Express App Setup & Architecture, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Express Setup & Application Instance ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Express App Setup & Architecture, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Express Setup & Application Instance ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Express App Setup & Architecture?",
      "hi": "Express Setup & Application Instance ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Express App Setup & Architecture be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Express Setup & Application Instance ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Express App Setup & Architecture impact application memory and CPU consumption?",
      "hi": "Express Setup & Application Instance ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Express App Setup & Architecture?",
      "hi": "Express Setup & Application Instance mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Express App Setup & Architecture?",
      "hi": "Express Setup & Application Instance mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Express App Setup & Architecture?",
      "hi": "Express Setup & Application Instance mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Express App Setup & Architecture, what must the test suite assert?",
      "hi": "Express Setup & Application Instance ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Express App Setup & Architecture?",
      "hi": "Modular design Express Setup & Application Instance mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Express App Setup & Architecture be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Express Setup & Application Instance ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Express App Setup & Architecture properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Express Setup & Application Instance kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Express App Setup & Architecture in production?",
      "hi": "Production mein Express Setup & Application Instance ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Express App Setup & Architecture?",
      "hi": "Express Setup & Application Instance ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Express App Setup & Architecture?",
      "hi": "Express Setup & Application Instance mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Express App Setup & Architecture?",
      "hi": "Express Setup & Application Instance mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
