/**
 * MERN Learning Hub - Complete Master Curriculum Tree
 * 12 Modules (0 to 11) covering zero to job-ready full-stack engineering
 * 3-Level hierarchy: Module > Topic > Subtopic
 */

const baseCurriculum = [
  // -------------------------------------------------------------
  // MODULE 0: Getting Started & Roadmap
  // -------------------------------------------------------------
  {
    id: "module-getting-started",
    number: 0,
    slug: "getting-started",
    icon: "Rocket",
    badgeColor: "indigo",
    title: {
      en: "Getting Started & Roadmap",
      hi: "Getting Started & MERN Roadmap",
    },
    description: {
      en: "Understand what MERN is, how the 4 technologies connect, and setup your full-stack development environment.",
      hi: "Samjhein MERN kya hai, charo technologies aapas mein kaise connect hoti hain, aur apna complete developer environment setup karein.",
    },
    topics: [
      {
        id: "gs-arch",
        slug: "architecture-and-roadmap",
        title: {
          en: "Architecture & Roadmap",
          hi: "Architecture & Learning Roadmap",
        },
        subtopics: [
          {
            id: "gs-what-is-mern",
            slug: "what-is-mern",
            title: {
              en: "What is MERN & Architecture Overview",
              hi: "MERN Kya Hai & Architecture Overview",
            },
            difficulty: "Beginner",
            readTime: 7,
            summary: {
              en: "Deep dive into MongoDB, Express, React, and Node.js roles and communication flows.",
              hi: "MongoDB, Express, React, aur Node.js ke role aur communication flow ki detailed samajh.",
            },
          },
          {
            id: "gs-four-parts-connect",
            slug: "how-four-parts-connect",
            title: {
              en: "How the 4 Parts Connect (Client, Server, DB)",
              hi: "4 Parts Aapas Mein Kaise Connect Hote Hain",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Step-by-step lifecycle of a request from browser click to database and back.",
              hi: "Browser click se lekar database query aur response aane tak ka complete lifecycle.",
            },
          },
          {
            id: "gs-mern-roadmap",
            slug: "mern-roadmap",
            title: {
              en: "Zero to Job-Ready MERN Roadmap",
              hi: "Zero to Job-Ready MERN Roadmap (Step-by-Step)",
            },
            difficulty: "Beginner",
            readTime: 6,
            summary: {
              en: "Milestones, estimated timeline, recommended daily routine, and project goals.",
              hi: "Full-stack banne ke clear milestones, timeline aur daily study schedule.",
            },
          },
        ],
      },
      {
        id: "gs-tools",
        slug: "tools-setup",
        title: {
          en: "Developer Tools Setup",
          hi: "Dev Tools Setup & Environment",
        },
        subtopics: [
          {
            id: "gs-vscode-terminal",
            slug: "vscode-and-terminal",
            title: {
              en: "VS Code, Extensions & Terminal Setup",
              hi: "VS Code, Pro Extensions & Terminal Setup",
            },
            difficulty: "Beginner",
            readTime: 7,
            summary: {
              en: "Configuring VS Code, essential extensions (Prettier, ESLint), and bash/zsh shortcuts.",
              hi: "VS Code ke essential extensions aur fast workflow ke liye terminal settings.",
            },
          },
          {
            id: "gs-node-git-setup",
            slug: "node-git-setup",
            title: {
              en: "Node.js, npm & Git Installation",
              hi: "Node.js, npm & Git Installation Guide",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Installing LTS Node.js, checking npm versions, and initializing Git repositories.",
              hi: "Node LTS install karna, npm test karna aur Git initialize karne ke basic steps.",
            },
          },
          {
            id: "gs-postman-atlas-setup",
            slug: "postman-and-atlas",
            title: {
              en: "Postman & MongoDB Atlas Account Setup",
              hi: "Postman & MongoDB Atlas Cloud Setup",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Testing APIs with Postman collections and creating your free MongoDB cloud cluster.",
              hi: "APIs test karne ke liye Postman setup aur MongoDB Atlas pe free cluster banana.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 1: Web & JavaScript Essentials
  // -------------------------------------------------------------
  {
    id: "module-javascript",
    number: 1,
    slug: "javascript",
    icon: "FileCode",
    badgeColor: "amber",
    title: {
      en: "Web & JavaScript Essentials",
      hi: "Web & Modern JavaScript Essentials",
    },
    description: {
      en: "Core web protocols (HTTP, REST) and modern ES6+ concepts essential for building robust MERN applications.",
      hi: "Web protocols aur modern ES6+ concepts jo professional full-stack development ke liye zaroori hain.",
    },
    topics: [
      {
        id: "js-web-fundamentals",
        slug: "web-fundamentals",
        title: {
          en: "Web Architecture Fundamentals",
          hi: "Web Architecture Fundamentals",
        },
        subtopics: [
          {
            id: "js-how-web-works",
            slug: "how-web-works",
            title: {
              en: "How the Web Works: HTTP, DNS & Client-Server",
              hi: "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "DNS lookup, TCP/IP handshake, HTTP requests/responses, and browser rendering pipeline.",
              hi: "URL enter karne se page render hone tak ka internet communication flow.",
            },
          },
          {
            id: "js-rest-http-methods",
            slug: "rest-and-http-methods",
            title: {
              en: "REST Architecture, Status Codes & HTTP Headers",
              hi: "REST Architecture, Status Codes & HTTP Headers",
            },
            difficulty: "Beginner",
            readTime: 10,
            summary: {
              en: "GET, POST, PUT, PATCH, DELETE idempotency, 2xx/3xx/4xx/5xx status codes, and headers.",
              hi: "REST API ke 6 core constraints, HTTP methods, aur status codes ka correct use.",
            },
          },
          {
            id: "js-json-fetch-api",
            slug: "json-and-fetch-api",
            title: {
              en: "JSON Format & The Native Fetch API",
              hi: "JSON Format & Native Fetch API Ka Use",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Parsing and stringifying JSON, making async HTTP requests with fetch, handling errors.",
              hi: "JSON data interchange format aur browser fetch API se data mangwana.",
            },
          },
        ],
      },
      {
        id: "js-modern-es6",
        slug: "modern-es6",
        title: {
          en: "Modern ES6+ Features",
          hi: "Modern ES6+ Features",
        },
        subtopics: [
          {
            id: "js-let-const-scope",
            slug: "let-const-and-scoping",
            title: {
              en: "let, const, Scoping & Temporal Dead Zone",
              hi: "let, const, Scoping & Temporal Dead Zone (TDZ)",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Block scope vs function scope, variable hoisting mechanics, and TDZ pitfalls.",
              hi: "var, let, const ka detailed comparison, hoisting aur TDZ ke rules.",
            },
          },
          {
            id: "js-arrow-functions-this",
            slug: "arrow-functions-and-this",
            title: {
              en: "Arrow Functions & Lexical 'this' Binding",
              hi: "Arrow Functions & Lexical 'this' Binding",
            },
            difficulty: "Beginner",
            readTime: 7,
            summary: {
              en: "Concise syntax, implicit returns, and how arrow functions resolve 'this' lexically.",
              hi: "Arrow functions ka syntax aur unme 'this' kaise behave karta hai.",
            },
          },
          {
            id: "js-destructuring-spread-rest",
            slug: "destructuring-spread-rest",
            title: {
              en: "Destructuring, Rest & Spread Operators",
              hi: "Destructuring, Rest & Spread Operators",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Unpack values cleanly from arrays/objects and master immutable data operations.",
              hi: "Objects aur arrays ko unpack karna aur immutability maintain karne ke best practices.",
            },
          },
          {
            id: "js-template-literals-modules",
            slug: "template-literals-and-modules",
            title: {
              en: "Template Literals & ES Modules (import/export)",
              hi: "Template Literals & ES Modules (import/export)",
            },
            difficulty: "Beginner",
            readTime: 7,
            summary: {
              en: "String interpolation, multiline strings, named exports, and default exports.",
              hi: "String interpolation aur modular code likhne ke liye modern import/export syntax.",
            },
          },
        ],
      },
      {
        id: "js-core-internals",
        slug: "core-internals",
        title: {
          en: "Core JavaScript Internals",
          hi: "JavaScript Core Internals & Algorithms",
        },
        subtopics: [
          {
            id: "js-map-filter-reduce",
            slug: "map-filter-reduce",
            title: {
              en: "Array Methods: map, filter, and reduce",
              hi: "Array Methods: map, filter, aur reduce In-Depth",
            },
            difficulty: "Beginner",
            readTime: 12,
            summary: {
              en: "Functional transformations, chaining array methods, and real-world aggregations.",
              hi: "Data transform karne ke functional methods aur real-world data crunching examples.",
            },
          },
          {
            id: "js-closures-lexical-scope",
            slug: "closures-and-lexical-scope",
            title: {
              en: "Closures & Lexical Environment",
              hi: "Closures & Lexical Environment (Interview Favorite)",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "How functions retain access to their outer scope, data privacy, and memoization.",
              hi: "Outer scope ko yaad rakhne ki function ki power aur encapsulation ke examples.",
            },
          },
          {
            id: "js-this-call-apply-bind",
            slug: "this-call-apply-bind",
            title: {
              en: "The 'this' Keyword & call, apply, bind",
              hi: "The 'this' Keyword & Explicit Binding (call, apply, bind)",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Global vs object method vs constructor binding, explicit binding methods.",
              hi: "JavaScript mein 'this' ke 4 rules aur call/apply/bind se context badalna.",
            },
          },
          {
            id: "js-prototypes-inheritance",
            slug: "prototypes-and-inheritance",
            title: {
              en: "Prototypes & Prototypal Inheritance",
              hi: "Prototypes & Prototypal Inheritance Model",
            },
            difficulty: "Advanced",
            readTime: 11,
            summary: {
              en: "Prototype chain, __proto__ vs prototype property, ES6 class syntax desugaring.",
              hi: "JavaScript ka prototype inheritance model aur classes ke piche ka mechanism.",
            },
          },
          {
            id: "js-error-handling",
            slug: "error-handling-patterns",
            title: {
              en: "Error Handling: try, catch, finally & Custom Errors",
              hi: "Error Handling: try, catch, finally & Custom Errors",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Throwing errors, extending the built-in Error class, synchronous vs async errors.",
              hi: "Graceful error recovery, custom error classes aur async code mein errors handle karna.",
            },
          },
        ],
      },
      {
        id: "js-async",
        slug: "asynchronous-javascript",
        title: {
          en: "Asynchronous JavaScript & Concurrency",
          hi: "Asynchronous JavaScript & Concurrency",
        },
        subtopics: [
          {
            id: "js-callbacks-callback-hell",
            slug: "callbacks-and-inversion",
            title: {
              en: "Callbacks & The Pyramid of Doom",
              hi: "Callbacks & Callback Hell Ki Problem",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Higher-order functions, inversion of control, and why callback hell breaks code.",
              hi: "Callback functions kya hote hain aur nested callbacks se code unreadable kyun hota hai.",
            },
          },
          {
            id: "js-promises-in-depth",
            slug: "promises-in-depth",
            title: {
              en: "Promises: States, Chaining & Combinators",
              hi: "Promises: States, Chaining & Promise.all/race",
            },
            difficulty: "Intermediate",
            readTime: 12,
            summary: {
              en: "Pending/Fulfilled/Rejected states, Promise.all, allSettled, race, and any.",
              hi: "Promise lifecycle, then/catch chaining aur multiple promises ko parallel handle karna.",
            },
          },
          {
            id: "js-async-await",
            slug: "async-await-mastery",
            title: {
              en: "Async / Await & Clean Error Handling",
              hi: "Async / Await & Clean Error Handling",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Writing asynchronous code that reads like synchronous code with try/catch.",
              hi: "Promises ka modern readable wrapper aur try/catch ke saath robust handling.",
            },
          },
          {
            id: "js-event-loop-internals",
            slug: "event-loop-internals",
            title: {
              en: "Event Loop, Call Stack & Microtask Queue",
              hi: "Event Loop, Call Stack & Microtask Queue (Deep Dive)",
            },
            difficulty: "Advanced",
            readTime: 14,
            summary: {
              en: "V8 memory heap, call stack execution, macrotasks (setTimeout) vs microtasks (Promises).",
              hi: "Single thread pe JavaScript concurrency kaise execute karta hai step-by-step trace.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 2: Node.js Fundamentals & Runtime
  // -------------------------------------------------------------
  {
    id: "module-nodejs",
    number: 2,
    slug: "nodejs",
    icon: "Server",
    badgeColor: "emerald",
    title: {
      en: "Node.js Fundamentals",
      hi: "Node.js Fundamentals & Runtime",
    },
    description: {
      en: "Master server-side JavaScript runtime, V8 engine internals, CommonJS vs ESM, and core system modules.",
      hi: "Server-side JavaScript runtime, V8 engine internals, aur core Node modules ko depth mein samjhein.",
    },
    topics: [
      {
        id: "node-runtime",
        slug: "runtime-architecture",
        title: {
          en: "Node Runtime Architecture",
          hi: "Node Runtime Architecture",
        },
        subtopics: [
          {
            id: "node-v8-libuv",
            slug: "what-is-node-v8",
            title: {
              en: "What is Node.js, V8 Engine & Libuv",
              hi: "Node.js Kya Hai, V8 Engine & Libuv Internals",
            },
            difficulty: "Beginner",
            readTime: 10,
            summary: {
              en: "Non-blocking I/O model, thread pool (UV_THREADPOOL_SIZE), and C++ bindings.",
              hi: "Node.js browser ke bahar JavaScript kaise chalata hai aur libuv thread pool ka role.",
            },
          },
          {
            id: "node-event-loop-phases",
            slug: "event-loop-phases",
            title: {
              en: "The Node.js Event Loop Phases",
              hi: "Node.js Event Loop Ke 6 Phases Explained",
            },
            difficulty: "Advanced",
            readTime: 13,
            summary: {
              en: "Timers, pending callbacks, idle/prepare, poll, check (setImmediate), and close callbacks.",
              hi: "Browser event loop se alag Node event loop ke 6 distinct phases aur setImmediate vs setTimeout.",
            },
          },
          {
            id: "node-commonjs-esm",
            slug: "commonjs-vs-esm",
            title: {
              en: "Module Systems: CommonJS vs ESM",
              hi: "Module Systems: CommonJS (require) vs ESM (import)",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "require() vs import, package.json 'type: module', and interop pitfalls.",
              hi: "Node mein module systems ka farq aur synchronous vs asynchronous loading.",
            },
          },
          {
            id: "node-npm-packages",
            slug: "npm-and-package-json",
            title: {
              en: "npm, package.json & Semantic Versioning",
              hi: "npm, package.json & SemVer (^ vs ~)",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "dependencies vs devDependencies, package-lock.json integrity, and semantic versioning rules.",
              hi: "Package management, lock file ka importance aur version bumping conventions.",
            },
          },
        ],
      },
      {
        id: "node-core-apis",
        slug: "core-modules",
        title: {
          en: "Node Core Modules",
          hi: "Node Core Modules & System APIs",
        },
        subtopics: [
          {
            id: "node-fs-path",
            slug: "fs-and-path",
            title: {
              en: "Filesystem (fs) & Path Module",
              hi: "Filesystem (fs/promises) & Path Module",
            },
            difficulty: "Beginner",
            readTime: 11,
            summary: {
              en: "Sync vs async file reading/writing, path.join vs path.resolve, and directory traversal.",
              hi: "Files read aur write karna, directory create karna aur cross-platform paths handle karna.",
            },
          },
          {
            id: "node-os-process",
            slug: "os-and-process",
            title: {
              en: "OS, Process & Environment Variables",
              hi: "OS, Process & Environment Variables (process.env)",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Inspecting CPU/RAM, process.exit, process.argv, and dotenv configuration.",
              hi: "System hardware check karna, arguments parse karna aur secret keys load karna.",
            },
          },
          {
            id: "node-events-emitter",
            slug: "events-and-eventemitter",
            title: {
              en: "EventEmitter & Event-Driven Architecture",
              hi: "EventEmitter & Event-Driven Architecture",
            },
            difficulty: "Intermediate",
            readTime: 9,
            summary: {
              en: "Publish-subscribe pattern in Node, on(), emit(), once(), and memory leak detection.",
              hi: "Custom events create karna, unhe listen karna aur event-driven programming pattern.",
            },
          },
          {
            id: "node-streams-buffers",
            slug: "streams-and-buffers",
            title: {
              en: "Streams & Buffers: High-Performance I/O",
              hi: "Streams & Buffers (Handling Gigabytes of Data)",
            },
            difficulty: "Advanced",
            readTime: 13,
            summary: {
              en: "Readable, Writable, Duplex, Transform streams, piping, backpressure, and binary buffers.",
              hi: "Bina memory crash kiye badi files ko chunk by chunk stream aur process karna.",
            },
          },
        ],
      },
      {
        id: "node-servers-debug",
        slug: "servers-and-debugging",
        title: {
          en: "Servers & Debugging",
          hi: "HTTP Servers & Application Debugging",
        },
        subtopics: [
          {
            id: "node-native-http",
            slug: "native-http-server",
            title: {
              en: "Building a Native HTTP Server",
              hi: "Bina Framework Ke Native HTTP Server Banana",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "http.createServer, handling req.url and req.method, writing headers and body chunks.",
              hi: "Express ke bina raw HTTP server banana taaki request/response lifecycle clear ho sake.",
            },
          },
          {
            id: "node-debugging-apps",
            slug: "debugging-nodejs",
            title: {
              en: "Debugging Node.js Apps with Chrome DevTools & VS Code",
              hi: "Node Apps Debug Karna: Breakpoints & DevTools",
            },
            difficulty: "Intermediate",
            readTime: 9,
            summary: {
              en: "Using --inspect flag, VS Code debugger launch configs, and profiling memory leaks.",
              hi: "Console.log se aage: breakpoints lagana, call stack inspect karna aur bugs pakadna.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 3: Express.js Web Framework
  // -------------------------------------------------------------
  {
    id: "module-express",
    number: 3,
    slug: "express",
    icon: "Network",
    badgeColor: "slate",
    title: {
      en: "Express.js Web Framework",
      hi: "Express.js Web Framework & REST APIs",
    },
    description: {
      en: "Build robust backend web APIs with Express routing, middleware architecture, controllers, and validation.",
      hi: "Robust REST APIs banayein Express routing, middleware architecture, aur controllers ke saath.",
    },
    topics: [
      {
        id: "exp-setup-routing",
        slug: "routing-and-request",
        title: {
          en: "Setup & Routing Mechanics",
          hi: "Setup & Routing Mechanics",
        },
        subtopics: [
          {
            id: "exp-app-setup",
            slug: "express-setup",
            title: {
              en: "Express App Setup & Architecture",
              hi: "Express Setup & Application Instance",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Creating express() instance, app.listen, JSON body parser middleware, and port management.",
              hi: "Express app initialize karna aur JSON data parse karne ke basic rules.",
            },
          },
          {
            id: "exp-routing-params",
            slug: "routing-and-route-params",
            title: {
              en: "Routing, Route Parameters & Query Strings",
              hi: "Routing, Route Params (:id) & Query Strings (?search=)",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "express.Router(), modular route files, dynamic URL parameters, and req.query extraction.",
              hi: "Modular routes banana, URL se dynamic IDs nikalna aur query params filter karna.",
            },
          },
          {
            id: "exp-req-res-lifecycle",
            slug: "req-res-lifecycle",
            title: {
              en: "Request-Response Lifecycle in Depth",
              hi: "Request-Response Lifecycle In-Depth",
            },
            difficulty: "Intermediate",
            readTime: 9,
            summary: {
              en: "Headers sent errors, res.json vs res.send vs res.status, and pipeline termination.",
              hi: "Request aane se lekar response finish hone tak ka pipeline aur common errors.",
            },
          },
        ],
      },
      {
        id: "exp-middleware",
        slug: "middleware-pipeline",
        title: {
          en: "Middleware Architecture",
          hi: "Middleware Architecture & Security",
        },
        subtopics: [
          {
            id: "exp-middleware-concept",
            slug: "middleware-basics",
            title: {
              en: "Middleware: Concept, Execution Order & next()",
              hi: "Middleware Concept, Execution Order & next() Function",
            },
            difficulty: "Beginner",
            readTime: 11,
            summary: {
              en: "The heart of Express: how middleware executes sequentially, passes control, and mutates req.",
              hi: "Airport security check analogy: har request ko route handler se pehle inspect karna.",
            },
          },
          {
            id: "exp-error-handling",
            slug: "error-handling-middleware",
            title: {
              en: "Global Error-Handling Middleware Pipeline",
              hi: "Global Error-Handling Middleware Pipeline",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Special 4-argument (err, req, res, next) signature, central error formatter, and async errors.",
              hi: "Saare errors ko ek jagah handle karke structured JSON error response bhejna.",
            },
          },
          {
            id: "exp-cors-config",
            slug: "cors-configuration",
            title: {
              en: "CORS Middleware & Whitelisting Origins",
              hi: "CORS Error & Whitelisting Allowed Origins",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Preflight OPTIONS requests, Access-Control-Allow-Origin headers, and production whitelist.",
              hi: "Frontend se API call karte waqt aane wale CORS error ko solve karna.",
            },
          },
          {
            id: "exp-security-helmet-rate-limit",
            slug: "security-helmet-rate-limit",
            title: {
              en: "Security: Helmet, Morgan Logging & Rate Limiting",
              hi: "Security Best Practices: Helmet, Morgan & Rate Limiting",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "Hiding X-Powered-By, setting secure HTTP headers, access logging, and DDoS prevention.",
              hi: "API ko hackers aur brute-force attacks se protect karne ke essential middleware.",
            },
          },
        ],
      },
      {
        id: "exp-architecture",
        slug: "api-architecture",
        title: {
          en: "Production Architecture & Validation",
          hi: "Production API Architecture & Validation",
        },
        subtopics: [
          {
            id: "exp-controllers-services",
            slug: "controllers-services-folder-structure",
            title: {
              en: "Clean Folder Structure: Controllers & Services",
              hi: "Clean Folder Structure: Routes, Controllers & Services Pattern",
            },
            difficulty: "Intermediate",
            readTime: 12,
            summary: {
              en: "Separation of concerns: keeping route files skinny, business logic in services.",
              hi: "Enterprise level clean code structure jo scalable applications mein use hota hai.",
            },
          },
          {
            id: "exp-validation-express-validator",
            slug: "request-validation",
            title: {
              en: "Input Validation with Express-Validator & Joi",
              hi: "Input Validation with Express-Validator & Joi",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Sanitizing input, schema validation rules, and returning 422 Unprocessable Entity.",
              hi: "Malicious data rokne ke liye user input sanitize aur validate karna.",
            },
          },
          {
            id: "exp-file-upload-multer",
            slug: "file-upload-multer",
            title: {
              en: "File Uploads with Multer (Images & Docs)",
              hi: "File Uploads with Multer (Handling Multipart Data)",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "multipart/form-data parsing, disk storage engine, file type filtering, and size limits.",
              hi: "Profile picture aur files upload karna, size limits aur disk pe safe store karna.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 4: MongoDB & Mongoose ODM
  // -------------------------------------------------------------
  {
    id: "module-mongodb",
    number: 4,
    slug: "mongodb",
    icon: "Database",
    badgeColor: "green",
    title: {
      en: "MongoDB & Mongoose ODM",
      hi: "MongoDB & Mongoose ODM (Database Layer)",
    },
    description: {
      en: "NoSQL document database mastery, CRUD operations, indexing, aggregation pipeline, and Mongoose schemas.",
      hi: "NoSQL database mastery, CRUD operations, indexing, aggregation pipeline aur Mongoose schemas.",
    },
    topics: [
      {
        id: "mongo-fundamentals",
        slug: "nosql-and-atlas",
        title: {
          en: "NoSQL Architecture & Cloud Setup",
          hi: "NoSQL Architecture & Cloud Atlas",
        },
        subtopics: [
          {
            id: "mongo-nosql-vs-sql",
            slug: "nosql-vs-sql",
            title: {
              en: "NoSQL vs SQL & Document Database Basics",
              hi: "NoSQL vs SQL & Document Database Basics",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Tables/Rows vs Collections/Documents, dynamic schemas, and horizontal scaling.",
              hi: "RDBMS aur Document DB ka comparison aur MongoDB kab choose karein.",
            },
          },
          {
            id: "mongo-bson-format",
            slug: "documents-and-bson",
            title: {
              en: "Documents, Collections & BSON Data Types",
              hi: "Documents, Collections & BSON Data Types (ObjectId)",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Binary JSON, ObjectId timestamp anatomy, 16MB document size limit, and data types.",
              hi: "BSON format JSON se kaise behtar hai aur ObjectId ke 12 bytes ka breakdown.",
            },
          },
          {
            id: "mongo-atlas-connection",
            slug: "mongodb-atlas-setup",
            title: {
              en: "MongoDB Atlas Cloud Cluster & Connection String",
              hi: "MongoDB Atlas Cloud Cluster & Network Whitelisting",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Provisioning M0 free tier, IP access lists, database users, and SRV connection strings.",
              hi: "Cloud database cluster banana, IP whitelist karna aur connection string secure karna.",
            },
          },
        ],
      },
      {
        id: "mongo-crud",
        slug: "crud-and-operators",
        title: {
          en: "CRUD Operations & Query Operators",
          hi: "CRUD Operations & Advanced Query Operators",
        },
        subtopics: [
          {
            id: "mongo-insert-find",
            slug: "insert-and-find",
            title: {
              en: "Insert & Find: Comparison & Logical Operators",
              hi: "Insert & Find: Operators ($gt, $in, $and, $or)",
            },
            difficulty: "Beginner",
            readTime: 10,
            summary: {
              en: "insertOne, insertMany, find, findOne with $eq, $ne, $gt, $in, $regex operators.",
              hi: "Database mein documents store karna aur complex filters se data search karna.",
            },
          },
          {
            id: "mongo-update-delete",
            slug: "update-and-delete",
            title: {
              en: "Update & Delete: Atomic Field Operators",
              hi: "Update & Delete: Atomic Operators ($set, $inc, $push)",
            },
            difficulty: "Beginner",
            readTime: 10,
            summary: {
              en: "updateOne, updateMany, deleteOne with $set, $unset, $inc, $push, $pull operators.",
              hi: "Atomic updates karna, arrays mein items push/pull karna aur safe deletes.",
            },
          },
          {
            id: "mongo-sorting-pagination",
            slug: "projection-sorting-pagination",
            title: {
              en: "Projection, Sorting & Pagination (skip/limit)",
              hi: "Projection, Sorting & Pagination (skip aur limit)",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Selecting specific fields with projection, sort({ createdAt: -1 }), and page calculation.",
              hi: "Zaroori fields filter karna aur fast pagination implement karna.",
            },
          },
          {
            id: "mongo-indexes",
            slug: "indexes-and-performance",
            title: {
              en: "Indexes & Query Performance Optimization",
              hi: "Indexes & Query Performance (COLLSCAN vs IXSCAN)",
            },
            difficulty: "Intermediate",
            readTime: 12,
            summary: {
              en: "Single field, compound, unique, and text indexes, explain('executionStats').",
              hi: "Database queries ko 100x fast banana aur explain stats check karna.",
            },
          },
        ],
      },
      {
        id: "mongo-advanced",
        slug: "aggregation-and-relationships",
        title: {
          en: "Aggregation Pipeline & Data Modeling",
          hi: "Aggregation Pipeline & Relationships",
        },
        subtopics: [
          {
            id: "mongo-aggregation-pipeline",
            slug: "aggregation-pipeline",
            title: {
              en: "The Aggregation Pipeline: $match, $group, $lookup",
              hi: "Aggregation Pipeline: $match, $group, $lookup & $project",
            },
            difficulty: "Advanced",
            readTime: 14,
            summary: {
              en: "Multi-stage data transformation pipeline, joins with $lookup, grouping and calculations.",
              hi: "Complex reports aur analytics ke liye data pipeline chalana.",
            },
          },
          {
            id: "mongo-embedding-referencing",
            slug: "embedding-vs-referencing",
            title: {
              en: "Relationships: Embedding vs Referencing (1:1, 1:N, N:M)",
              hi: "Data Modeling: Embedding vs Referencing Ka Sahi Decision",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "Denormalization vs normalization, 16MB document boundary, and query access patterns.",
              hi: "Kab documents nest karein aur kab IDs se reference karein.",
            },
          },
          {
            id: "mongo-transactions",
            slug: "transactions-and-acid",
            title: {
              en: "Multi-Document Transactions & ACID Guarantees",
              hi: "Multi-Document Transactions & ACID Guarantees",
            },
            difficulty: "Advanced",
            readTime: 12,
            summary: {
              en: "session.startTransaction(), commitTransaction(), abortTransaction() across replica sets.",
              hi: "Bank balance transfer jaise critical operations ko atomic transaction mein karna.",
            },
          },
        ],
      },
      {
        id: "mongo-mongoose",
        slug: "mongoose-odm",
        title: {
          en: "Mongoose ODM Deep Dive",
          hi: "Mongoose ODM Deep Dive",
        },
        subtopics: [
          {
            id: "mongo-mongoose-schemas",
            slug: "schemas-models",
            title: {
              en: "Schemas, Models & Built-in Validation",
              hi: "Mongoose Schemas, Models & Validation",
            },
            difficulty: "Beginner",
            readTime: 11,
            summary: {
              en: "Defining strict schemas, required, trim, minLength, enum, and custom validators.",
              hi: "Strict schema rules define karna aur clean validation errors generate karna.",
            },
          },
          {
            id: "mongo-mongoose-hooks",
            slug: "middleware-and-hooks",
            title: {
              en: "Mongoose Middleware: Pre & Post Hooks",
              hi: "Mongoose Middleware: Pre & Post Hooks (Password Hashing)",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "pre('save'), pre('find'), post('remove') hooks, hashing passwords before save.",
              hi: "Document save hone se theek pehle automatic operations (jaise password hash) chalana.",
            },
          },
          {
            id: "mongo-mongoose-populate",
            slug: "populate-and-relations",
            title: {
              en: "Relationships & Populate (Joining Documents)",
              hi: "Relationships & .populate() (Simulating SQL Joins)",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Ref property, populate('user', 'name email'), nested populate, and performance trade-offs.",
              hi: "Referenced documents ka complete data ek query mein fetch karna.",
            },
          },
          {
            id: "mongo-mongoose-virtuals",
            slug: "virtuals-and-methods",
            title: {
              en: "Virtual Properties, Instance & Static Methods",
              hi: "Virtual Properties, Instance & Static Methods",
            },
            difficulty: "Intermediate",
            readTime: 9,
            summary: {
              en: "Computed properties that do not persist to MongoDB, custom business logic on models.",
              hi: "Computed fields (jaise fullName) aur custom model methods banana.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 5: React.js Mastery
  // -------------------------------------------------------------
  {
    id: "module-react",
    number: 5,
    slug: "react",
    icon: "Atom",
    badgeColor: "cyan",
    title: {
      en: "React.js Mastery",
      hi: "React.js Frontend Mastery",
    },
    description: {
      en: "Modern component-driven UI development, JSX, props, state, custom hooks, and React Router.",
      hi: "Modern declarative UI development, JSX, props, state management, hooks aur routing.",
    },
    topics: [
      {
        id: "react-core",
        slug: "core-concepts",
        title: {
          en: "Components, Props & State",
          hi: "Components, Props & State",
        },
        subtopics: [
          {
            id: "react-jsx-and-components",
            slug: "jsx-and-virtual-dom",
            title: {
              en: "JSX, React Elements & Virtual DOM Reconciliation",
              hi: "JSX, Virtual DOM & Fiber Reconciliation Algorithm",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "How JSX compiles to React.createElement, diffing algorithm, and DOM updates.",
              hi: "JSX background mein kaise compile hota hai aur Virtual DOM actual DOM se tezi se kaise update hota hai.",
            },
          },
          {
            id: "react-props-immutability",
            slug: "props-data-flow",
            title: {
              en: "Props & One-Way Data Flow",
              hi: "Props & One-Way Data Flow (Parent to Child)",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Passing data parent-to-child, prop-types, default props, and children prop composition.",
              hi: "Parent se child mein data bhejna, props validation, aur children prop ka magic.",
            },
          },
          {
            id: "react-state-fundamentals",
            slug: "state-fundamentals",
            title: {
              en: "Component State & Triggering Re-renders",
              hi: "Component State & Re-render Lifecycle",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Why regular variables do not trigger UI updates, state persistence across renders.",
              hi: "Normal variables aur React state ka farq aur re-render kaise trigger hota hai.",
            },
          },
          {
            id: "react-event-handling",
            slug: "event-handling",
            title: {
              en: "Event Handling & Synthetic Events",
              hi: "Event Handling & SyntheticEvent System",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "onClick, onChange, cross-browser wrapper, passing arguments, and event delegation.",
              hi: "Events handle karna, inline arrow functions ke trade-offs aur SyntheticEvent wrapper.",
            },
          },
          {
            id: "react-conditional-rendering",
            slug: "conditional-rendering",
            title: {
              en: "Conditional Rendering Patterns",
              hi: "Conditional Rendering Patterns (&&, Ternary, Early Return)",
            },
            difficulty: "Beginner",
            readTime: 7,
            summary: {
              en: "Ternary operators, logical AND guard clauses (and the 0 pitfall), switch/early returns.",
              hi: "Conditions ke hisaab se UI elements show ya hide karne ke clean patterns.",
            },
          },
          {
            id: "react-lists-keys",
            slug: "lists-and-keys",
            title: {
              en: "Lists, Keys & Reconciliation Optimization",
              hi: "Lists, Keys & Array Rendering Rules",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Why index as key causes subtle bugs, stable IDs, and efficient list reordering.",
              hi: "Array ko map karke render karna aur key prop ka reconciliation mein role.",
            },
          },
          {
            id: "react-forms",
            slug: "forms-controlled-uncontrolled",
            title: {
              en: "Controlled vs Uncontrolled Form Inputs",
              hi: "Controlled vs Uncontrolled Forms",
            },
            difficulty: "Beginner",
            readTime: 10,
            summary: {
              en: "Single source of truth via value & onChange, FormData API, and useRef fallback.",
              hi: "Forms handle karna, inputs ko React state se control karna aur validation.",
            },
          },
          {
            id: "react-lifting-state",
            slug: "lifting-state-up",
            title: {
              en: "Lifting State Up & Component Composition",
              hi: "Lifting State Up (Sharing State Between Siblings)",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Sharing state between sibling components by moving state to their common ancestor.",
              hi: "Sibling components ke beech data share karne ke liye state ko parent pe shift karna.",
            },
          },
        ],
      },
      {
        id: "react-hooks",
        slug: "hooks-deep-dive",
        title: {
          en: "React Hooks Deep Dive",
          hi: "React Hooks Deep Dive (State & Lifecycle)",
        },
        subtopics: [
          {
            id: "react-hooks-usestate",
            slug: "usestate",
            title: {
              en: "useState Hook: State in Functional Components",
              hi: "useState Hook: Functional Components Mein State",
            },
            difficulty: "Beginner",
            readTime: 10,
            summary: {
              en: "Managing component state, batching updates, object/array state, and common pitfalls.",
              hi: "Component state manage karna, automatic batching, complex objects aur common mistakes.",
            },
          },
          {
            id: "react-hooks-useeffect",
            slug: "useeffect",
            title: {
              en: "useEffect Hook: Side Effects & Lifecycle",
              hi: "useEffect Hook: Side Effects & Lifecycle Management",
            },
            difficulty: "Intermediate",
            readTime: 12,
            summary: {
              en: "API calls, subscriptions, dependency array nuances, and cleanup functions.",
              hi: "API calls, timer cleanup, dependency array ke rules aur infinite loops se bachna.",
            },
          },
          {
            id: "react-hooks-useref",
            slug: "useref",
            title: {
              en: "useRef Hook: DOM Access & Persistent Values",
              hi: "useRef Hook: DOM Access & Mutable Values",
            },
            difficulty: "Intermediate",
            readTime: 8,
            summary: {
              en: "Holding values that survive renders without re-rendering, accessing DOM nodes.",
              hi: "Aise values store karna jo render hone pe bhi persist karein bina extra re-render ke.",
            },
          },
          {
            id: "react-hooks-usecontext",
            slug: "usecontext",
            title: {
              en: "useContext & Context API",
              hi: "useContext & Context API (Global State)",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Eliminate prop drilling with global context providers and custom hook wrappers.",
              hi: "Prop drilling khatam karein aur global state clean tareeqe se share karein.",
            },
          },
          {
            id: "react-hooks-usereducer",
            slug: "usereducer",
            title: {
              en: "useReducer Hook: Complex State Logic",
              hi: "useReducer Hook: Complex State Logic & Actions",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "Redux-style action dispatching, pure reducer functions, and managing complex multi-field state.",
              hi: "Jab state complex ho jaye to Redux pattern ke pure reducers se manage karna.",
            },
          },
          {
            id: "react-hooks-memo-callback",
            slug: "usememo-usecallback",
            title: {
              en: "useMemo & useCallback: Memoization in React",
              hi: "useMemo & useCallback: Performance Optimization",
            },
            difficulty: "Advanced",
            readTime: 12,
            summary: {
              en: "Caching expensive calculations with useMemo, referential equality of callbacks with useCallback.",
              hi: "Unnecessary re-renders aur heavy calculations ko memoize karke performance badhana.",
            },
          },
          {
            id: "react-hooks-custom",
            slug: "custom-hooks",
            title: {
              en: "Building Custom Hooks for Reusable Logic",
              hi: "Custom Hooks Banana (useFetch, useDebounce, useLocalStorage)",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "Extracting repetitive stateful logic into clean, composable custom hooks.",
              hi: "Stateful logic ko alag function mein nikal kar multiple components mein reuse karna.",
            },
          },
        ],
      },
      {
        id: "react-routing-ecosystem",
        slug: "routing-and-ecosystem",
        title: {
          en: "Routing & State Ecosystem",
          hi: "Routing & State Ecosystem",
        },
        subtopics: [
          {
            id: "react-router-v6",
            slug: "react-router-v6",
            title: {
              en: "React Router v6: Nested Routes, NavLink & Outlet",
              hi: "React Router v6: Nested Routes & Layouts",
            },
            difficulty: "Intermediate",
            readTime: 12,
            summary: {
              en: "Client-side routing, useParams, useNavigate, Outlet layouts, and 404 handling.",
              hi: "Bina page reload kiye fast navigation, dynamic URL params aur nested layout routes.",
            },
          },
          {
            id: "react-redux-toolkit",
            slug: "redux-toolkit-basics",
            title: {
              en: "Redux Toolkit (RTK) Essentials",
              hi: "Redux Toolkit (RTK) Basics: Store, Slices & Dispatch",
            },
            difficulty: "Intermediate",
            readTime: 13,
            summary: {
              en: "createSlice, configureStore, useSelector, useDispatch, and Immer immutability.",
              hi: "Large-scale apps mein global state manage karne ke liye modern standard Redux Toolkit.",
            },
          },
          {
            id: "react-tanstack-query",
            slug: "react-query-basics",
            title: {
              en: "Server State with React Query (TanStack Query)",
              hi: "React Query (TanStack Query): Server State & Caching",
            },
            difficulty: "Advanced",
            readTime: 13,
            summary: {
              en: "Automatic background refetching, query caching, loading/error states, and mutations.",
              hi: "API calls ke liye boilerplate khatam karein: caching, deduping aur pagination.",
            },
          },
          {
            id: "react-styling",
            slug: "styling-approaches",
            title: {
              en: "Modern Styling: Tailwind CSS vs CSS Modules",
              hi: "Modern Styling: Tailwind CSS vs CSS Modules",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Utility-first CSS, dark mode class strategy, responsive prefixes, and design systems.",
              hi: "Fast development ke liye utility classes aur component-scoped CSS ka comparison.",
            },
          },
        ],
      },
      {
        id: "react-production",
        slug: "production-and-performance",
        title: {
          en: "Production Architecture",
          hi: "Production Optimization & Reliability",
        },
        subtopics: [
          {
            id: "react-perf-memo",
            slug: "performance-optimization",
            title: {
              en: "React.memo, Code Splitting & Profiling",
              hi: "Performance Optimization: React.memo & React DevTools Profiler",
            },
            difficulty: "Advanced",
            readTime: 12,
            summary: {
              en: "Preventing unnecessary renders, measuring render durations, and code-splitting bundles.",
              hi: "Heavy renders spot karna aur component re-render cycle optimize karna.",
            },
          },
          {
            id: "react-code-splitting-lazy",
            slug: "code-splitting-and-lazy",
            title: {
              en: "Code Splitting with React.lazy & Suspense",
              hi: "Code Splitting with React.lazy & Suspense",
            },
            difficulty: "Intermediate",
            readTime: 9,
            summary: {
              en: "Dynamic import(), route-based code splitting, fallback skeletons, and bundle reduction.",
              hi: "Initial bundle size chota rakhne ke liye components ko on-demand download karna.",
            },
          },
          {
            id: "react-error-boundaries",
            slug: "error-boundaries",
            title: {
              en: "Error Boundaries & Graceful UI Fallbacks",
              hi: "Error Boundaries: UI Crash Hone Se Bachana",
            },
            difficulty: "Intermediate",
            readTime: 8,
            summary: {
              en: "Catching JavaScript errors anywhere in the component tree and displaying a fallback UI.",
              hi: "Ek component ke crash hone se poora web app band na ho iske liye safety wrapper.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 6: Connecting MERN (Full-Stack Integration)
  // -------------------------------------------------------------
  {
    id: "module-integration",
    number: 6,
    slug: "fullstack-integration",
    icon: "Workflow",
    badgeColor: "purple",
    title: {
      en: "Connecting MERN (Full-Stack Integration)",
      hi: "Connecting MERN (Frontend + Backend Integration)",
    },
    description: {
      en: "Wire React to Express API, configure CORS, Axios client, loading/error states, and environment variables.",
      hi: "React frontend ko Express backend se connect karein, CORS issues solve karein aur robust API calls banayein.",
    },
    topics: [
      {
        id: "int-setup",
        slug: "project-wiring",
        title: {
          en: "Project Setup & Environment",
          hi: "Full-Stack Setup & Environment",
        },
        subtopics: [
          {
            id: "int-monorepo-structure",
            slug: "monorepo-folder-structure",
            title: {
              en: "Production MERN Project Folder Structure",
              hi: "Production MERN Project Folder Structure",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Structuring client and server folders, shared types, package scripts, and gitignore.",
              hi: "Client aur server ko ek clean repo mein organize karne ke industry best practices.",
            },
          },
          {
            id: "int-env-management",
            slug: "env-management",
            title: {
              en: "Managing Environment Variables (VITE_ vs process.env)",
              hi: "Environment Variables: VITE_ Prefix & Backend Security",
            },
            difficulty: "Beginner",
            readTime: 8,
            summary: {
              en: "Why frontend env vars are public, securing backend secrets, and .env.example files.",
              hi: "Frontend aur backend ke environment variables ka farq aur secret keys safe rakhna.",
            },
          },
          {
            id: "int-cors-and-proxy",
            slug: "cors-and-proxy",
            title: {
              en: "CORS Configuration & Vite Proxy Setup",
              hi: "CORS Problem & Vite Proxy Setup",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Why CORS errors occur in development and how to configure proxy and Express CORS middleware.",
              hi: "CORS error kyun aata hai aur ise backend CORS package aur Vite proxy se kaise theek karein.",
            },
          },
        ],
      },
      {
        id: "int-communication",
        slug: "api-communication",
        title: {
          en: "API Communication & State Sync",
          hi: "API Communication & State Sync",
        },
        subtopics: [
          {
            id: "int-axios-client",
            slug: "axios-api-client",
            title: {
              en: "Configuring Axios: BaseURL, Headers & Interceptors",
              hi: "Axios Client Setup: Interceptors & Global Error Handling",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "Creating an API singleton, attaching auth tokens automatically, handling 401 redirects.",
              hi: "Ek central axios instance banana jo automatically token bheje aur errors handle kare.",
            },
          },
          {
            id: "int-loading-error-states",
            slug: "loading-error-states",
            title: {
              en: "Handling Loading, Error & Empty UI States",
              hi: "UI States: Loading Skeletons, Error Alerts & Empty Screens",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Building responsive loading skeletons, graceful error toasts, and informative empty states.",
              hi: "User experience ko professional banana: shimmer effects aur friendly error messages.",
            },
          },
          {
            id: "int-optimistic-ui",
            slug: "optimistic-ui-sync",
            title: {
              en: "Optimistic UI Updates & State Synchronization",
              hi: "Optimistic UI Updates (Instant Feedback Pattern)",
            },
            difficulty: "Advanced",
            readTime: 11,
            summary: {
              en: "Updating UI immediately before server confirms, and rolling back smoothly on network failure.",
              hi: "Like button ya todo checkmark click karte hi instant update dikhana bina wait kiye.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 7: Authentication & Authorization
  // -------------------------------------------------------------
  {
    id: "module-auth",
    number: 7,
    slug: "authentication",
    icon: "ShieldCheck",
    badgeColor: "rose",
    title: {
      en: "Authentication & Authorization",
      hi: "Authentication & Authorization (JWT & Security)",
    },
    description: {
      en: "Production authentication with bcrypt password hashing, JSON Web Tokens (JWT), httpOnly cookies, and protected routes.",
      hi: "Production auth system: bcrypt hashing, JWT tokens, secure cookies aur protected routes.",
    },
    topics: [
      {
        id: "auth-cryptography",
        slug: "cryptography-and-tokens",
        title: {
          en: "Passwords & Token Architecture",
          hi: "Passwords & Token Architecture",
        },
        subtopics: [
          {
            id: "auth-bcrypt-hashing",
            slug: "password-hashing-bcrypt",
            title: {
              en: "Password Hashing with Bcrypt & Salt Rounds",
              hi: "Password Hashing: Salt Rounds & Bcrypt Algorithm",
            },
            difficulty: "Beginner",
            readTime: 9,
            summary: {
              en: "Why plain text passwords in databases are unacceptable, salting, and rainbow table defense.",
              hi: "Passwords ko plaintext mein store na karna aur cryptographic salt ke sath hash karna.",
            },
          },
          {
            id: "auth-jwt-architecture",
            slug: "jwt-tokens",
            title: {
              en: "JSON Web Tokens (JWT) Architecture",
              hi: "JWT Tokens: Architecture & Generation",
            },
            difficulty: "Intermediate",
            readTime: 12,
            summary: {
              en: "Header, payload, signature anatomy and how stateless token verification works.",
              hi: "JWT token ke teen parts (Header, Payload, Signature) aur stateless authentication model.",
            },
          },
          {
            id: "auth-tokens-refresh",
            slug: "access-vs-refresh-tokens",
            title: {
              en: "Access Tokens vs Refresh Tokens Strategy",
              hi: "Short-lived Access Token vs Refresh Token Strategy",
            },
            difficulty: "Advanced",
            readTime: 13,
            summary: {
              en: "15-minute access tokens, 7-day refresh tokens, rotating refresh tokens, and revocation lists.",
              hi: "Security standard: chote access token aur automatic silent refresh flow.",
            },
          },
        ],
      },
      {
        id: "auth-protection",
        slug: "storage-and-protection",
        title: {
          en: "Storage, Protection & Roles",
          hi: "Token Storage & Protected Routes",
        },
        subtopics: [
          {
            id: "auth-cookies-vs-localstorage",
            slug: "cookies-vs-localstorage",
            title: {
              en: "httpOnly Cookies vs LocalStorage (XSS vs CSRF)",
              hi: "httpOnly Cookies vs LocalStorage Security",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "Why storing JWT in localStorage exposes you to XSS, SameSite cookie flags, and CSRF protection.",
              hi: "Token kahan save karein? XSS attacks aur CSRF protection ka complete comparison.",
            },
          },
          {
            id: "auth-backend-middleware",
            slug: "backend-auth-middleware",
            title: {
              en: "Backend Auth Middleware & req.user Injection",
              hi: "Backend Auth Middleware (verifyToken) & req.user",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Extracting Bearer token from headers or cookies, jwt.verify, and attaching user to req.",
              hi: "Har protected route pe request verify karke user identity inject karna.",
            },
          },
          {
            id: "auth-frontend-protected",
            slug: "frontend-protected-routes",
            title: {
              en: "Frontend Protected Routes with React Router v6",
              hi: "Frontend Protected Routes & Auth Redirects",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Creating a <ProtectedRoute /> wrapper component, preserving attempted URL for post-login redirect.",
              hi: "Unauthenticated users ko login page pe redirect karna aur role check karna.",
            },
          },
          {
            id: "auth-rbac-roles",
            slug: "role-based-access-control",
            title: {
              en: "Role-Based Access Control (Admin, User, Moderator)",
              hi: "Role-Based Access Control (RBAC Permissions)",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Multi-role schemas, authorize('admin', 'editor') middleware, and conditional UI components.",
              hi: "User permissions: admin dashboard aur normal user ke rights ko alag karna.",
            },
          },
          {
            id: "auth-oauth-overview",
            slug: "oauth-overview",
            title: {
              en: "OAuth 2.0 & Social Login Overview (Google & GitHub)",
              hi: "OAuth 2.0 & Google / GitHub Social Login Flow",
            },
            difficulty: "Advanced",
            readTime: 12,
            summary: {
              en: "Authorization code grant flow, client ID/secret, callback routes, and linking social accounts.",
              hi: "'Login with Google' kaise kaam karta hai aur uska authorization flow.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 8: Advanced Full-Stack Engineering
  // -------------------------------------------------------------
  {
    id: "module-advanced",
    number: 8,
    slug: "advanced-topics",
    icon: "Sparkles",
    badgeColor: "teal",
    title: {
      en: "Advanced MERN Topics",
      hi: "Advanced Full-Stack Engineering",
    },
    description: {
      en: "Real-time communication with WebSockets/Socket.io, server-side caching with Redis, pagination, and testing.",
      hi: "Real-time Socket.io communication, Redis caching, pagination techniques, aur automated testing.",
    },
    topics: [
      {
        id: "adv-realtime",
        slug: "real-time-websockets",
        title: {
          en: "Real-Time Communication",
          hi: "Real-Time WebSockets (Socket.io)",
        },
        subtopics: [
          {
            id: "adv-socket-io",
            slug: "socket-io",
            title: {
              en: "Real-Time Communication with Socket.io",
              hi: "Socket.io Se Real-Time Bi-Directional Apps",
            },
            difficulty: "Advanced",
            readTime: 13,
            summary: {
              en: "Bi-directional event-driven architecture, rooms, broadcasts, and connection events.",
              hi: "Full-duplex real-time communication, events emit/listen karna aur chat rooms banana.",
            },
          },
          {
            id: "adv-socket-rooms",
            slug: "socket-rooms-broadcasts",
            title: {
              en: "Socket.io Rooms, Namespaces & Private Messaging",
              hi: "Socket.io Rooms, Namespaces & Private Chat Flow",
            },
            difficulty: "Advanced",
            readTime: 12,
            summary: {
              en: "Joining rooms, broadcasting to everyone except sender, socket authentication with JWT.",
              hi: "Group chat aur 1-on-1 private messaging ke liye socket rooms ka use.",
            },
          },
        ],
      },
      {
        id: "adv-data-scale",
        slug: "data-scale-and-caching",
        title: {
          en: "Data Scaling & Performance",
          hi: "Data Scaling & High-Speed Caching",
        },
        subtopics: [
          {
            id: "adv-pagination-strategies",
            slug: "pagination-cursor-offset",
            title: {
              en: "Pagination Strategies: Offset vs Cursor-Based",
              hi: "Pagination: Offset vs Cursor-Based (High-Scale Feeds)",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "Why skip() degrades at millions of documents, cursor-based pagination using _id timestamps.",
              hi: "Millions of records pe slow skip() se bach kar fast cursor pagination karna.",
            },
          },
          {
            id: "adv-infinite-scroll",
            slug: "infinite-scroll",
            title: {
              en: "Building Infinite Scroll in React (Intersection Observer)",
              hi: "React Mein Infinite Scroll Banana (IntersectionObserver)",
            },
            difficulty: "Intermediate",
            readTime: 10,
            summary: {
              en: "Detecting sentinel DOM element visibility, fetching next page chunk, and avoiding layout jumps.",
              hi: "Instagram/Twitter jaisa infinite scroll experience implement karna.",
            },
          },
          {
            id: "adv-redis-caching",
            slug: "redis-caching",
            title: {
              en: "Server-Side Caching with Redis",
              hi: "Server-Side Caching with Redis (Sub-Millisecond APIs)",
            },
            difficulty: "Advanced",
            readTime: 13,
            summary: {
              en: "In-memory key-value store, cache-aside pattern, TTL expiration, and cache invalidation.",
              hi: "Frequently accessed data ko RAM mein cache karke database load 90% kam karna.",
            },
          },
        ],
      },
      {
        id: "adv-testing-devops",
        slug: "testing-and-devops",
        title: {
          en: "Testing & Containerization",
          hi: "Automated Testing & Docker Basics",
        },
        subtopics: [
          {
            id: "adv-testing-backend",
            slug: "jest-supertest",
            title: {
              en: "Backend Testing with Jest & Supertest",
              hi: "Backend REST API Testing: Jest & Supertest",
            },
            difficulty: "Intermediate",
            readTime: 12,
            summary: {
              en: "Writing unit and integration tests for Express routes, mocking MongoDB with in-memory DB.",
              hi: "APIs ke automated tests likhna taaki production mein breaking bugs na aayein.",
            },
          },
          {
            id: "adv-testing-frontend",
            slug: "react-testing-library",
            title: {
              en: "Frontend Testing with React Testing Library",
              hi: "React Testing Library: Testing User Interactions",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "Testing what user sees, screen.getByRole, fireEvent/userEvent, and mocking API calls.",
              hi: "User ke perspective se components test karna aur mock API responses handle karna.",
            },
          },
          {
            id: "adv-docker-basics",
            slug: "docker-basics",
            title: {
              en: "Docker Basics for MERN Developers",
              hi: "Docker Basics: Containerizing Node & MongoDB",
            },
            difficulty: "Intermediate",
            readTime: 12,
            summary: {
              en: "Dockerfile, images vs containers, docker-compose.yml for running multi-service MERN apps.",
              hi: "'Mere system pe chal raha tha' problem khatam: complete app ko containerize karna.",
            },
          },
          {
            id: "adv-cicd-github-actions",
            slug: "cicd-github-actions",
            title: {
              en: "CI/CD Pipelines with GitHub Actions",
              hi: "CI/CD Automation: GitHub Actions Workflows",
            },
            difficulty: "Intermediate",
            readTime: 11,
            summary: {
              en: "Automated linting, testing, and building on git push before merging pull requests.",
              hi: "Har git push pe tests aur build automatic verify karna deploy hone se pehle.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 9: Production Deployment & DevOps
  // -------------------------------------------------------------
  {
    id: "module-deployment",
    number: 9,
    slug: "deployment",
    icon: "CloudUpload",
    badgeColor: "blue",
    title: {
      en: "Production Deployment",
      hi: "Production Deployment & DevOps",
    },
    description: {
      en: "Deploy full-stack MERN apps to Vercel (frontend) and Render/Railway (backend) with Atlas database connection.",
      hi: "Frontend ko Vercel pe aur backend ko Render/Railway pe deploy karein production best practices ke saath.",
    },
    topics: [
      {
        id: "dep-platforms",
        slug: "cloud-platforms",
        title: {
          en: "Cloud Hosting Providers",
          hi: "Cloud Hosting: Frontend & Backend",
        },
        subtopics: [
          {
            id: "dep-vercel-frontend",
            slug: "vercel-frontend-deploy",
            title: {
              en: "Deploying React Frontend to Vercel & Netlify",
              hi: "React Frontend Ko Vercel & Netlify Pe Deploy Karna",
            },
            difficulty: "Beginner",
            readTime: 10,
            summary: {
              en: "Git integration, build command (npm run build), SPA routing redirects (vercel.json).",
              hi: "Vercel pe zero-config deployment aur client-side routing 404 fixes.",
            },
          },
          {
            id: "dep-render-backend",
            slug: "render-backend-deploy",
            title: {
              en: "Deploying Express API to Render & Railway",
              hi: "Express Backend Ko Render & Railway Pe Deploy Karna",
            },
            difficulty: "Intermediate",
            readTime: 12,
            summary: {
              en: "Web service setup, start command (node server.js), environment variable injection.",
              hi: "Production backend service live karna aur logs monitor karna.",
            },
          },
          {
            id: "dep-atlas-production",
            slug: "production-atlas-config",
            title: {
              en: "Production Database Security on MongoDB Atlas",
              hi: "Production MongoDB Atlas Security & Network Rules",
            },
            difficulty: "Intermediate",
            readTime: 9,
            summary: {
              en: "Limiting network access to server IP, backup snapshots, monitoring connection pools.",
              hi: "Production database access secure karna aur auto-backups on rakhna.",
            },
          },
        ],
      },
      {
        id: "dep-readiness",
        slug: "production-readiness",
        title: {
          en: "Production Checklist & Security",
          hi: "Production Checklist & Monitoring",
        },
        subtopics: [
          {
            id: "dep-secrets-management",
            slug: "secrets-env-management",
            title: {
              en: "Secrets & Environment Variable Management",
              hi: "Secrets & Environment Variables Production Guide",
            },
            difficulty: "Intermediate",
            readTime: 9,
            summary: {
              en: "Never committing .env files, rotating compromised secrets, and platform env consoles.",
              hi: "Production secrets ko securely inject karna aur API keys safe rakhna.",
            },
          },
          {
            id: "dep-production-checklist",
            slug: "production-checklist",
            title: {
              en: "The Pre-Launch Production Readiness Checklist",
              hi: "Pre-Launch Production Readiness Checklist (25 Points)",
            },
            difficulty: "Intermediate",
            readTime: 13,
            summary: {
              en: "25-point audit: security headers, gzip/brotli compression, error masking, rate limits.",
              hi: "Live hone se pehle check karne wale 25 critical points ka complete checklist.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 10: Hands-on Full-Stack Projects
  // -------------------------------------------------------------
  {
    id: "module-projects",
    number: 10,
    slug: "projects",
    icon: "FolderKanban",
    badgeColor: "violet",
    title: {
      en: "Hands-on Full-Stack Projects",
      hi: "Hands-on Full-Stack MERN Projects",
    },
    description: {
      en: "Four comprehensive end-to-end projects: Todo App, Dev Blog, E-Commerce Store, and Real-Time Chat App.",
      hi: "4 complete industry-level projects step-by-step guides aur complete architecture ke saath.",
    },
    topics: [
      {
        id: "proj-essential",
        slug: "essential-apps",
        title: {
          en: "Foundational Applications",
          hi: "Foundational Portfolio Projects",
        },
        subtopics: [
          {
            id: "proj-todo-app",
            slug: "project-todo-app",
            title: {
              en: "Project 1: Full-Stack Task & Todo Manager",
              hi: "Project 1: Full-Stack Task & Todo Manager (CRUD Mastery)",
            },
            difficulty: "Beginner",
            readTime: 14,
            summary: {
              en: "Complete CRUD workflow, MongoDB schema, REST API, optimistic UI filtering in React.",
              hi: "Complete CRUD architecture, API list, folder structure aur step-by-step build guide.",
            },
          },
          {
            id: "proj-blog-platform",
            slug: "project-blog-platform",
            title: {
              en: "Project 2: Dev Blog & Publishing Platform (Auth + Images)",
              hi: "Project 2: Dev Blog & Publishing Platform (Auth + Multer)",
            },
            difficulty: "Intermediate",
            readTime: 16,
            summary: {
              en: "JWT auth, Markdown editor, cover image uploads, user profiles, and comment system.",
              hi: "User registration, article publishing, image storage aur comments architecture.",
            },
          },
        ],
      },
      {
        id: "proj-advanced",
        slug: "advanced-apps",
        title: {
          en: "Advanced Enterprise Applications",
          hi: "Advanced Enterprise Scale Applications",
        },
        subtopics: [
          {
            id: "proj-ecommerce",
            slug: "project-ecommerce",
            title: {
              en: "Project 3: E-Commerce Store with Cart & Stripe Payments",
              hi: "Project 3: E-Commerce Store with Cart & Stripe Payments",
            },
            difficulty: "Advanced",
            readTime: 19,
            summary: {
              en: "Product catalog, Redux cart, order management, Stripe checkout webhook, and admin panel.",
              hi: "Complete shopping experience, Stripe payment gateway, orders database aur admin controls.",
            },
          },
          {
            id: "proj-chat-app",
            slug: "project-chat-app",
            title: {
              en: "Project 4: Real-Time Chat Application with Socket.io",
              hi: "Project 4: Real-Time Chat App with Socket.io & Online Presence",
            },
            difficulty: "Advanced",
            readTime: 18,
            summary: {
              en: "1-on-1 and group messaging, online presence indicators, message history, and typing status.",
              hi: "WhatsApp jaisa real-time chat, typing indicators, online/offline status aur history.",
            },
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // MODULE 11: MERN Interview Preparation
  // -------------------------------------------------------------
  {
    id: "module-interview-prep",
    number: 11,
    slug: "interview-prep",
    icon: "Briefcase",
    badgeColor: "fuchsia",
    title: {
      en: "MERN Interview Preparation",
      hi: "MERN Stack Job Interview Preparation",
    },
    description: {
      en: "100+ top technical interview questions across MongoDB, Express, React, Node, and System Design.",
      hi: "100+ high-frequency interview questions with detailed bilingual answers aur coding challenges.",
    },
    topics: [
      {
        id: "int-tech-questions",
        slug: "technical-interviews",
        title: {
          en: "Technical Interview Question Bank",
          hi: "Technical Interview Question Bank (100+ Questions)",
        },
        subtopics: [
          {
            id: "int-react-questions",
            slug: "top-react-questions",
            title: {
              en: "Top 25 React.js Interview Questions & Model Answers",
              hi: "Top 25 React Interview Questions & Model Answers",
            },
            difficulty: "Intermediate",
            readTime: 15,
            summary: {
              en: "Virtual DOM diffing, useEffect dependencies, custom hooks, and state batching.",
              hi: "Virtual DOM reconciliation, hook lifecycle, closures aur performance questions.",
            },
          },
          {
            id: "int-node-express-questions",
            slug: "top-node-express-questions",
            title: {
              en: "Top 25 Node.js & Express Interview Questions",
              hi: "Top 25 Node.js & Express Interview Questions",
            },
            difficulty: "Intermediate",
            readTime: 15,
            summary: {
              en: "Event loop phases, streams vs buffers, error handling middleware, and cluster module.",
              hi: "Event loop internals, non-blocking I/O, middleware lifecycle aur clustering.",
            },
          },
          {
            id: "int-mongodb-questions",
            slug: "top-mongodb-questions",
            title: {
              en: "Top 25 MongoDB & Database Interview Questions",
              hi: "Top 25 MongoDB & Database Interview Questions",
            },
            difficulty: "Intermediate",
            readTime: 14,
            summary: {
              en: "Indexing strategies, aggregation pipeline stages, embedding vs referencing, and ACID.",
              hi: "Aggregation pipeline, compound indexes, BSON limits aur transactions.",
            },
          },
          {
            id: "int-javascript-questions",
            slug: "top-javascript-questions",
            title: {
              en: "Top 25 Core JavaScript & Asynchronous Questions",
              hi: "Top 25 Core JavaScript & Asynchronous JS Questions",
            },
            difficulty: "Intermediate",
            readTime: 15,
            summary: {
              en: "Closures, event loop microtasks, prototypes, this binding, and promise combinators.",
              hi: "Closures ke practical use cases, event loop priority aur prototypes.",
            },
          },
        ],
      },
      {
        id: "int-system-coding",
        slug: "system-design-and-coding",
        title: {
          en: "System Design & Live Coding",
          hi: "System Design & Live Coding Challenges",
        },
        subtopics: [
          {
            id: "int-system-design-basics",
            slug: "system-design-basics",
            title: {
              en: "Full-Stack System Design Basics (Load Balancer, Caching, DB)",
              hi: "Full-Stack System Design Basics (Junior to Mid Level)",
            },
            difficulty: "Advanced",
            readTime: 16,
            summary: {
              en: "Designing scalable URL shortener or Twitter feed, database sharding, and Redis caching.",
              hi: "Scalable web systems design karna: load balancers, caching aur database replicas.",
            },
          },
          {
            id: "int-common-coding-problems",
            slug: "common-coding-problems",
            title: {
              en: "Top 10 Live Coding Challenges in MERN Interviews",
              hi: "Top 10 Live Coding Challenges in MERN Interviews",
            },
            difficulty: "Intermediate",
            readTime: 16,
            summary: {
              en: "Debounce/throttle implementation, deep clone, flatten array, and API rate limiter.",
              hi: "Debounce function banana, deep clone implement karna aur custom middleware code karna.",
            },
          },
        ],
      },
    ],
  },
];

import { getAllChecklistItems, deepDiveTracks } from './masterChecklist.js';

// Convert deep-dive tracks into first-class curriculum modules (Redis, Docker, CI/CD, Git)
const deepDiveModules = deepDiveTracks.map((track, idx) => ({
  id: `module-${track.slug}`,
  number: 12 + idx,
  slug: track.slug,
  icon: track.icon || 'Layers',
  badgeColor: track.badgeColor || 'rose',
  isDeepDiveTrack: true,
  title: {
    en: track.name,
    hi: track.name,
  },
  description: track.description,
  topics: track.topics.map((top) => ({
    id: top.id,
    slug: top.slug,
    title: {
      en: top.name,
      hi: top.name,
    },
    subtopics: top.items.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: {
        en: item.title,
        hi: `${item.title} (Hinglish)`,
      },
      difficulty: 'Intermediate',
      readTime: 12,
      summary: {
        en: `Comprehensive production guide and 20+ interview MCQs for ${item.title}.`,
        hi: `${item.title} ka complete conceptual guide aur 20+ practice MCQs.`,
      },
    })),
  })),
}));

export const curriculum = [
  ...baseCurriculum,
  ...deepDiveModules,
];

/**
 * Utility helpers to traverse the curriculum tree
 */

// Flatten all subtopics for search, stats, and flat navigation
export function getAllSubtopics() {
  const list = [];
  curriculum.forEach((mod) => {
    mod.topics.forEach((topic) => {
      topic.subtopics.forEach((sub) => {
        list.push({
          ...sub,
          moduleSlug: mod.slug,
          moduleTitle: mod.title,
          moduleBadgeColor: mod.badgeColor,
          moduleNumber: mod.number,
          topicSlug: topic.slug,
          topicTitle: topic.title,
          fullPath: `/learn/${mod.slug}/${topic.slug}/${sub.slug}`,
        });
      });
    });
  });

  // Also include items from Master Checklist for full-text search & navigation
  const checklistItems = getAllChecklistItems();
  checklistItems.forEach((item) => {
    // Avoid exact duplicate path if already in curriculum
    if (!list.some((existing) => existing.fullPath === item.fullPath)) {
      list.push({
        id: item.id,
        slug: item.slug,
        title: {
          en: item.title,
          hi: `${item.title} (Hinglish Guide)`,
        },
        difficulty: 'Intermediate',
        readTime: 12,
        summary: {
          en: `Comprehensive study guide and 20+ interview MCQs for ${item.title}.`,
          hi: `${item.title} ka complete conceptual guide aur 20+ practice MCQs.`,
        },
        moduleSlug: item.moduleSlug,
        moduleTitle: { en: item.moduleName, hi: item.moduleName },
        moduleBadgeColor: item.badgeColor || 'indigo',
        moduleNumber: item.moduleNumber || 0,
        topicSlug: item.topicSlug,
        topicTitle: {
          en: item.topicSlug.replace(/-/g, ' ').toUpperCase(),
          hi: item.topicSlug.replace(/-/g, ' ').toUpperCase(),
        },
        fullPath: item.fullPath,
      });
    }
  });

  return list;
}

// Find a specific subtopic by moduleSlug, topicSlug, subtopicSlug
export function findSubtopicBySlugs(moduleSlug, topicSlug, subtopicSlug) {
  const mod = curriculum.find((m) => m.slug === moduleSlug);
  if (mod) {
    const topic = mod.topics.find((t) => t.slug === topicSlug);
    if (topic) {
      const subtopic = topic.subtopics.find((s) => s.slug === subtopicSlug);
      if (subtopic) {
        return {
          subtopic,
          topic,
          module: mod,
        };
      }
    }
  }

  // Check master checklist items if not found in base curriculum
  const checklistItems = getAllChecklistItems();
  const matchedItem = checklistItems.find(
    (item) =>
      item.moduleSlug === moduleSlug &&
      item.topicSlug === topicSlug &&
      item.slug === subtopicSlug
  );

  if (matchedItem) {
    return {
      subtopic: {
        id: matchedItem.id,
        slug: matchedItem.slug,
        title: {
          en: matchedItem.title,
          hi: `${matchedItem.title} (Hinglish)`,
        },
        difficulty: 'Intermediate',
        readTime: 12,
        summary: {
          en: `In-depth technical breakdown and 20+ MCQs for ${matchedItem.title}.`,
          hi: `${matchedItem.title} ki complete theory aur 20+ MCQs.`,
        },
      },
      topic: {
        id: matchedItem.topicSlug,
        slug: matchedItem.topicSlug,
        title: {
          en: matchedItem.topicSlug.replace(/-/g, ' ').toUpperCase(),
          hi: matchedItem.topicSlug.replace(/-/g, ' ').toUpperCase(),
        },
      },
      module: {
        id: `module-${matchedItem.moduleSlug}`,
        slug: matchedItem.moduleSlug,
        title: {
          en: matchedItem.moduleName || matchedItem.moduleSlug.replace(/-/g, ' ').toUpperCase(),
          hi: matchedItem.moduleName || matchedItem.moduleSlug.replace(/-/g, ' ').toUpperCase(),
        },
        badgeColor: matchedItem.badgeColor || 'indigo',
        icon: matchedItem.icon || 'BookOpen',
      },
    };
  }

  // Fallback synthesis so no legitimate link ever 404s
  const humanSub = subtopicSlug.replace(/-/g, ' ').toUpperCase();
  const humanTop = topicSlug.replace(/-/g, ' ').toUpperCase();
  const humanMod = moduleSlug.replace(/-/g, ' ').toUpperCase();

  return {
    subtopic: {
      id: `${moduleSlug}-${topicSlug}-${subtopicSlug}`,
      slug: subtopicSlug,
      title: {
        en: humanSub,
        hi: `${humanSub} (Hinglish)`,
      },
      difficulty: 'Intermediate',
      readTime: 12,
      summary: {
        en: `Detailed guide and 20+ practice MCQs for ${humanSub}.`,
        hi: `${humanSub} ka complete guide aur 20+ MCQs.`,
      },
    },
    topic: {
      id: topicSlug,
      slug: topicSlug,
      title: {
        en: humanTop,
        hi: humanTop,
      },
    },
    module: {
      id: `module-${moduleSlug}`,
      slug: moduleSlug,
      title: {
        en: humanMod,
        hi: humanMod,
      },
      badgeColor: 'indigo',
      icon: 'BookOpen',
    },
  };
}

// Find navigation neighbors (previous and next subtopic)
export function getSubtopicNeighbors(moduleSlug, topicSlug, subtopicSlug) {
  const all = getAllSubtopics();
  const currentIndex = all.findIndex(
    (item) =>
      item.moduleSlug === moduleSlug &&
      item.topicSlug === topicSlug &&
      item.slug === subtopicSlug
  );

  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;

  return { prev, next };
}
