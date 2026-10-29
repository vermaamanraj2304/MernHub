export default {
  id: "node-v8-libuv",
  title: {
    en: "What is Node.js, V8 Engine & Libuv",
    hi: "Node.js Kya Hai, V8 Engine & Libuv Internals",
  },
  difficulty: "Beginner",
  readTime: 10,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is Node.js Really?",
        hi: "1. Node.js Asal Mein Kya Hai?",
      },
      body: {
        en: `There is a common misconception among beginners that Node.js is a programming language or a framework. It is neither!

> **Node.js is an open-source, cross-platform JavaScript Runtime Environment** created by Ryan Dahl in 2009. It allows developers to execute JavaScript code outside the browser, directly on a server or computer operating system.

Before Node.js, JavaScript could only run inside web browsers to animate buttons and validate forms. Ryan Dahl took Google Chrome's blazing-fast **V8 JavaScript Engine**, wrapped it in C++ system bindings, and combined it with a high-performance C library called **libuv**.

### The Three Core Pillars of Node.js:
1. **Google V8 Engine**: Written in C++, V8 compiles JavaScript directly into native machine code (x86, ARM) at runtime using Just-In-Time (JIT) compilation.
2. **libuv**: A multi-platform C library that provides the event loop, non-blocking asynchronous I/O, and a background Worker Thread Pool (default 4 threads).
3. **C++ Core Bindings**: The bridge that connects high-level JavaScript code to low-level operating system APIs (file system, network sockets, crypto).`,
        hi: `Beginners mein aksar yeh galatfehmi hoti hai ki Node.js koi programming language ya framework hai. Yeh dono nahi hai!

> **Node.js ek open-source, cross-platform JavaScript Runtime Environment hai** jise Ryan Dahl ne 2009 mein banaya tha. Yeh JavaScript ko browser ke bahar kisi bhi server ya operating system par direct chalane ki aazadi deta hai.

Node.js se pehle JavaScript sirf browser ke andar buttons hilane ya forms validate karne ke kaam aati thi. Ryan Dahl ne Google Chrome ke fast **V8 Engine** ko uthaya, use C++ bindings ke saath wrap kiya aur ek powerful C library **libuv** ke saath jod kar Node.js banaya.

### Node.js Ke 3 Mukhya Pillars:
1. **Google V8 Engine**: C++ mein likha gaya engine jo JavaScript code ko Just-In-Time (JIT) compilation ke through direct native machine code (0s aur 1s) mein convert karta hai.
2. **libuv Library**: Ek high-performance C library jo Event Loop chalati hai aur background mein 4 worker threads ka Thread Pool provide karti hai.
3. **C++ Bindings**: Wo pull (bridge) jo hamare JavaScript code ko computer ke OS (Hard Disk, Network Card, CPU) se connect karta hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Why Node.js Matters: The Non-Blocking I/O Paradigm",
        hi: "2. Node.js Kyun Powerful Hai: Non-Blocking I/O",
      },
      body: {
        en: `Traditional web servers (like Apache on PHP or Java Tomcat) follow a **Multi-Threaded Blocking Model**:
- Every incoming HTTP request spawns or reserves a dedicated OS thread (consuming ~2 MB of memory per thread).
- If that thread queries a slow database, it sits idle, blocked waiting for the database to respond.
- At 10,000 concurrent requests, the server runs out of RAM and crashes under thread-switching overhead.

### The Node.js Difference: Single-Threaded Event-Driven Non-Blocking
Node.js handles requests using a **single main thread**:
- When a database query or file read occurs, Node hands off the I/O task to the OS kernel or libuv background threads.
- The main thread **never waits**! It immediately moves on to serve request #2, request #3, and request #100.
- When the database finishes, libuv alerts the event loop, and the callback returns the response.
- Result: Node.js can easily handle tens of thousands of concurrent connections on modest server hardware!`,
        hi: `Purane traditional servers (jaise Apache ya Tomcat) **Multi-Threaded Blocking Model** par kaam karte the:
- Har naye user ki request ke liye server ek poora naya OS Thread banata tha (~2MB RAM per thread).
- Agar user database se data maangta hai, toh wo thread chupchap baithkar wait karta rehta tha (blocked).
- 10,000 users ek saath aane par server ki RAM khatam ho jaati thi aur server crash ho jata tha.

### Node.js Ka Kamaal: Single-Threaded Non-Blocking
Node.js sirf **ek single main thread** par kaam karta hai:
- Jaise hi koi database query aati hai, Node us task ko libuv ke background workers ko de deta hai.
- Main thread **1 second ke liye bhi nahi rukta**! Wo turant agle user ki request lene chala jata hai.
- Jab database se data aa jata hai, Event Loop callback ko stack pe daal kar response bhej deta hai.
- Nateeja: Node.js kam hardware RAM mein bhi hazaron concurrent users ko aasaani se handle kar leta hai!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: Head Chef (V8) & Kitchen Assistants (Libuv)",
        hi: "Real-Life Analogy: Dhaba Head Chef (V8) Aur Helper Chhotu (Libuv)",
      },
      body: {
        en: `Imagine a famous **Indian Dhaba / Restaurant Kitchen**:

- **Head Chef (The V8 Main Thread)**: Master chef who cooks recipes at lightning speed at the main stove. There is only ONE head chef.
- **The Orders (Client HTTP Requests)**: 50 customers arrive simultaneously placing orders for Butter Chicken and Naan.
- **Helper Assistants (Libuv Thread Pool - default 4 helpers)**:
  - If the head chef stopped cooking to peel 5 kg of onions or run to the market for spices, the entire kitchen would halt!
  - Instead, the chef shouts: *"Chhotu, peel these onions and grind the masala!"* (Delegating to Libuv worker thread).
  - The chef immediately begins cooking the next customer's gravy on the flame.
  - When the assistant finishes grinding the masala, they place the bowl next to the chef (*Push to Event Queue*). The chef tosses it into the pan when free.`,
        hi: `Sochiye ek busy **Dhaba Kitchen**:

- **Head Chef (V8 Main Thread)**: Ek single master chef jo gas par tez speed se khana banata hai.
- **Customers Ke Orders (HTTP Requests)**: 50 log ek saath aakar Dal Makhani aur Roti order karte hain.
- **Kitchen Ke 4 Helpers (Libuv Thread Pool)**:
  - Agar master chef khud 5 kilo pyaaz kaatne baith jaye ya market masala lene chala jaye, toh poora dhaba ruk jayega (Blocking)!
  - Master chef aage se orders leta rehta hai aur helpers ko bolta hai: *"Chhotu, tamatar paste banao aur tandoor garam karo"* (Libuv ko task delegate kiya).
  - Chef agle customer ka order process karta rehta hai.
  - Jaise hi helper pyaaz kaat leta hai, wo plate chef ke counter pe rakh deta hai (*Event Queue*). Chef free hote hi use sabzi mein daal deta hai.`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. Node.js Architectural Anatomy",
        hi: "4. Node.js Ka Architecture Diagram",
      },
      body: {
        en: `Here is how code travels from your editor to the operating system:

\`\`\`
+-----------------------------------------------------------+
|               YOUR JAVASCRIPT APPLICATION                 |
|             (Express, Mongoose, Socket.io)                |
+-----------------------------------------------------------+
                             ↓
+-----------------------------------------------------------+
|                   NODE.JS STANDARD LIBRARY                |
|             (fs, path, http, crypto, stream)              |
+-----------------------------------------------------------+
                             ↓
+-----------------------------------------------------------+
|                   NODE.JS C++ BINDINGS                    |
|             (V8 API wrappers, socket bridges)             |
+-----------------------------------------------------------+
               ↙                             ↘
+-----------------------------+   +-------------------------+
|      GOOGLE V8 ENGINE       |   |          LIBUV          |
|  - Compiles JS to Machine   |   |  - Event Loop           |
|    Code via JIT             |   |  - Thread Pool (4 default)
|  - Call Stack & Memory Heap |   |  - Asynchronous I/O     |
+-----------------------------+   +-------------------------+
                                               ↓
                                  +-------------------------+
                                  |    OPERATING SYSTEM     |
                                  |  (Linux, macOS, Windows)|
                                  +-------------------------+
\`\`\`

### What runs on the Libuv Thread Pool?
Only 4 things by default run on the libuv thread pool:
1. **File System operations** (\`fs.readFile\`, etc.)
2. **DNS Lookups** (\`dns.lookup\`)
3. **Cryptography** (\`crypto.pbkdf2\`, \`crypto.scrypt\`)
4. **Compression** (\`zlib\`)

*(Network sockets and HTTP requests do NOT use the thread pool; they use native non-blocking OS primitives like epoll on Linux or kqueue on macOS).*`,
        hi: `Samjhein ki code aapke editor se computer hardware tak kaise travel karta hai:

\`\`\`
+-----------------------------------------------------------+
|                   AAPKA JAVASCRIPT CODE                   |
|               (Express server, controllers)               |
+-----------------------------------------------------------+
                             ↓
+-----------------------------------------------------------+
|                   NODE CORE MODULES (JS)                  |
|                 (fs, http, crypto, events)                |
+-----------------------------------------------------------+
                             ↓
+-----------------------------------------------------------+
|                   NODE C++ BINDINGS                       |
+-----------------------------------------------------------+
               ↙                             ↘
+-----------------------------+   +-------------------------+
|          V8 ENGINE          |   |          LIBUV          |
|  - JS ko machine code mein  |   |  - Event Loop chalata hai|
|    compile karta hai        |   |  - 4 Worker Threads     |
|  - Call Stack & Heap        |   |  - File & OS I/O        |
+-----------------------------+   +-------------------------+
                                               ↓
                                  +-------------------------+
                                  |    OPERATING SYSTEM     |
                                  +-------------------------+
\`\`\`

### Libuv Thread Pool Mein Kya Chalta Hai?
Normal network calls thread pool use nahi karti (wo OS ke non-blocking epoll/kqueue par chalti hain). Thread Pool sirf 4 heavy tasks sambhalta hai:
1. **File System** (\`fs\`)
2. **DNS Lookups** (\`dns.lookup\`)
3. **Cryptography** (\`crypto.pbkdf2\`, hashing)
4. **Zlib Compression** (Gzip, zip files)`,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: Runtime Metadata & Thread Pool Benchmarking",
        hi: "5. Practical Examples: Runtime Metadata Aur Thread Pool Benchmark",
      },
      body: {
        en: `### Example 1: Inspecting Node Runtime Versions & Environment
Examine the underlying V8, libuv, and OpenSSL engine versions powering your Node instance.`,
        hi: `### Example 1: Node Runtime Ki Internal Versions Check Karna
Dekhiye aapke system par V8, libuv, aur OpenSSL ke kaunse versions chal rahe hain.`,
      },
      code: {
        language: "javascript",
        filename: "nodeInternals.js",
        snippet: `// Example 1: Inspecting Node.js Runtime Engine Metadata
console.log("=== Node.js Runtime Environment ===");
console.log("Node Version:      ", process.version);
console.log("V8 Engine Version: ", process.versions.v8);
console.log("libuv Version:     ", process.versions.uv);
console.log("OpenSSL Version:   ", process.versions.openssl);
console.log("Platform / OS:     ", process.platform, process.arch);

// Inspect memory usage of the V8 heap
const mem = process.memoryUsage();
console.log("\\n=== V8 Memory Footprint ===");
console.log("Heap Used:  ", (mem.heapUsed / 1024 / 1024).toFixed(2), "MB");
console.log("Heap Total: ", (mem.heapTotal / 1024 / 1024).toFixed(2), "MB");
console.log("RSS (Total):", (mem.rss / 1024 / 1024).toFixed(2), "MB");`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Benchmarking the Libuv Thread Pool Parallelism",
        hi: "Example 2: Libuv Ke 4 Threads Ki Parallelism Test Karna",
      },
      body: {
        en: `### Example 2: Proving the Default 4-Thread Pool Limit
We trigger 5 heavy password hashing operations simultaneously. Notice how calls 1 to 4 finish together, while call 5 has to wait for a thread to become free!`,
        hi: `### Example 2: Libuv Ke 4 Worker Threads Ka Live Proof
5 heavy cryptographic hashing calls ek saath lagayein. Notice karein ki 1 se 4 ek saath khatam hoti hain, aur 5th call ko wait karna padta hai!`,
      },
      code: {
        language: "javascript",
        filename: "threadPoolBenchmark.js",
        snippet: `// Example 2: Testing libuv thread pool with crypto.pbkdf2
const crypto = require("crypto");

const start = Date.now();

function hashPassword(callNumber) {
  crypto.pbkdf2("secretPassword123", "randomSaltKey", 100000, 64, "sha512", () => {
    const elapsed = Date.now() - start;
    console.log(\`Call #\${callNumber} finished in: \${elapsed}ms\`);
  });
}

console.log("Starting 5 heavy cryptographic hash operations concurrently...");

// The default thread pool size is 4.
// Calls 1-4 occupy the 4 worker threads simultaneously.
// Call 5 must wait in line until thread 1 finishes!
hashPassword(1);
hashPassword(2);
hashPassword(3);
hashPassword(4);
hashPassword(5);

// Expected Output Pattern:
// Call #1 finished in: ~180ms
// Call #2 finished in: ~185ms
// Call #3 finished in: ~190ms
// Call #4 finished in: ~192ms
// Call #5 finished in: ~370ms (Almost double! Because it had to wait!)`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Overriding Thread Pool Size with UV_THREADPOOL_SIZE",
        hi: "Example 3: UV_THREADPOOL_SIZE Se Worker Threads Badhana",
      },
      body: {
        en: `### Example 3: Scaling Thread Pool for Heavy Backend I/O
Setting \`UV_THREADPOOL_SIZE = 8\` before any asynchronous calls allows all 5 operations to finish concurrently in the same timeframe.`,
        hi: `### Example 3: Worker Threads Ko 4 Se Badhakar 8 Karna
Production servers par heavy file processing ke liye thread pool size badhane ka code.`,
      },
      code: {
        language: "javascript",
        filename: "scaleThreadPool.js",
        snippet: `// Example 3: Scaling UV_THREADPOOL_SIZE
// Note: Must be set before any async operations execute in the script!
process.env.UV_THREADPOOL_SIZE = "8";

const crypto = require("crypto");
const start = Date.now();

console.log("UV_THREADPOOL_SIZE set to:", process.env.UV_THREADPOOL_SIZE);

for (let i = 1; i <= 6; i++) {
  crypto.pbkdf2("masterPassword", "salt99", 100000, 64, "sha512", () => {
    console.log(\`Task #\${i} resolved in: \${Date.now() - start}ms\`);
  });
}

// With 8 threads available, all 6 tasks now execute concurrently!
// All 6 tasks will resolve around the ~200ms mark instead of lagging.`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Misconceptions & Mistakes",
        hi: "6. Node.js Ke Bare Mein Badi Galtiyan Aur Myths",
      },
      mistakes: [
        {
          mistake: {
            en: "Myth: 'Node.js is multithreaded so my JavaScript functions run on multiple cores in parallel.'",
            hi: "Myth: 'Node.js multithreaded hai isliye mera JavaScript code multiple cores par parallel chalta hai.'",
          },
          correction: {
            en: "JavaScript execution itself is strictly single-threaded on the V8 Call Stack. Only C++ background operations (libuv file/crypto I/O) run on worker threads. To utilize multi-core CPUs in JS, use the 'cluster' module or 'worker_threads'.",
            hi: "Aapka JavaScript code hamesha single thread par hi chalta hai. Sirf libuv ke internal C++ operations threads par chalte hain. Multi-core CPU use karne ke liye Node ke `cluster` module ya `worker_threads` ka use karna padta hai.",
          },
          code: `// BLOCKING ANTI-PATTERN (Freezes the entire server for all users!):
app.get("/heavy", (req, res) => {
  // Heavy synchronous calculation blocks the single V8 thread!
  for (let i = 0; i < 1e10; i++) {} 
  res.send("Finished");
});

// SOLUTION: Offload CPU-heavy computation to Worker Threads or a task queue`,
        },
        {
          mistake: {
            en: "Attempting to change process.env.UV_THREADPOOL_SIZE after an asynchronous call has already started.",
            hi: "Pehla async call hone ke baad `process.env.UV_THREADPOOL_SIZE` set karna.",
          },
          correction: {
            en: "libuv initializes its thread pool when the very first asynchronous task is dispatched. Setting UV_THREADPOOL_SIZE after that has zero effect. Set it via terminal environment variable before launching Node (`UV_THREADPOOL_SIZE=8 node server.js`).",
            hi: "libuv pehla async task aate hi thread pool initialize kar leta hai. Isliye thread pool size script ke bilkul top par ya terminal se pass karein (`UV_THREADPOOL_SIZE=8 node app.js`).",
          },
          code: `// RUN VIA TERMINAL:
// UV_THREADPOOL_SIZE=8 node server.js`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Production Best Practices for Node.js",
        hi: "7. Production Node.js Ke Best Practices",
      },
      body: {
        en: `- **Never Block the Event Loop**: Keep synchronous execution fast (< 10ms). Any heavy CPU work blocks all other concurrent incoming user requests!
- **Use Cluster Module or PM2**: Scale Node.js across all CPU cores of your production server by running one process per core with a reverse proxy like PM2 or NGINX.
- **Tune Thread Pool for Disk/Crypto I/O**: If your application does heavy image resizing, video transcoding, or file uploads, increase \`UV_THREADPOOL_SIZE\` to match CPU cores.`,
        hi: `- **Event Loop Ko Kabhi Block Na Karein**: Main thread par heavy calculations na chalayein warna doosre users ka server ruk jayega.
- **PM2 / Cluster Use Karein**: Production mein server ke saare CPU cores use karne ke liye PM2 process manager ka use karein.
- **Thread Pool Ko Tune Karein**: Agar app mein heavy file uploads ya crypto operations hain toh \`UV_THREADPOOL_SIZE\` badhayein.`,
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
            en: "What is the role of libuv in the Node.js architecture?",
            hi: "Node.js architecture mein libuv library ka kya role hai?",
          },
          a: {
            en: "libuv is a cross-platform C library that handles the Event Loop, asynchronous non-blocking I/O operations, and manages a background Worker Thread Pool (default 4 threads) for heavy tasks like file system access, DNS queries, and cryptographic computations.",
            hi: "libuv ek C library hai jo Node.js mein Event Loop ko chalati hai, asynchronous non-blocking I/O handle karti hai, aur background mein 4 worker threads ka Thread Pool manage karti hai jisse file reading aur crypto operations execute hote hain.",
          },
        },
        {
          q: {
            en: "How can Node.js be single-threaded if it handles thousands of concurrent requests?",
            hi: "Node.js single-threaded hote hue bhi hazaron requests ek saath kaise handle karta hai?",
          },
          a: {
            en: "Node.js is single-threaded in terms of JavaScript execution on the V8 Call Stack, but non-blocking in I/O. When an I/O operation (database query, network request) occurs, Node delegates it to the underlying OS kernel (via epoll/kqueue) or libuv thread pool. The single JS thread never waits idle; it continues serving other requests and processes completion callbacks via the Event Loop when notified.",
            hi: "JavaScript execution V8 stack par single-threaded hoti hai, par I/O non-blocking hota hai. Network ya database calls ko Node OS ke background kernel (epoll) ko de deta hai. Main thread rukta nahi hai aur lagataar doosre users ko serve karta rehta hai. Jab data ready hota hai, Event Loop callback chala deta hai.",
          },
        },
        {
          q: {
            en: "What is the default size of the libuv thread pool, and how can it be changed?",
            hi: "Libuv thread pool ka default size kya hota hai aur ise kaise badla jata hai?",
          },
          a: {
            en: "The default size is 4 threads. It can be changed up to a maximum of 1024 threads by setting the environment variable `UV_THREADPOOL_SIZE` before launching the application (e.g. `UV_THREADPOOL_SIZE=8 node app.js`) or at the very top of the script with `process.env.UV_THREADPOOL_SIZE = '8'`.",
            hi: "Default size 4 threads hota hai. Ise maximum 1024 tak badhaya ja sakta hai environment variable `UV_THREADPOOL_SIZE` set karke (jaise terminal mein `UV_THREADPOOL_SIZE=8 node app.js`).",
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
        en: `- **Runtime, Not Language**: Node.js is a C++ runtime embedding Google V8 + libuv.
- **V8**: Compiles JavaScript to native machine code via JIT.
- **libuv**: Powers Event Loop + 4 Worker Threads.
- **Non-blocking I/O**: The main thread delegates slow I/O and never waits.
- **Scaling**: Use Cluster or PM2 to utilize multiple CPU cores.`,
        hi: `- **Runtime Hai, Language Nahi**: Node.js V8 engine aur libuv ka C++ runtime package hai.
- **V8**: JS ko fast machine code mein badalta hai.
- **libuv**: Event Loop aur 4 background worker threads chalata hai.
- **Non-blocking**: Main thread slow I/O ke liye rukta nahi hai.
- **Multi-core**: Saare CPU cores use karne ke liye PM2 cluster mode use karein.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What programming language is the Google V8 engine written in?",
      "hi": "Google V8 Engine kis programming language mein likha gaya hai?"
    },
    "options": [
      {
        "en": "C++",
        "hi": "C++"
      },
      {
        "en": "JavaScript",
        "hi": "JavaScript"
      },
      {
        "en": "Python",
        "hi": "Python"
      },
      {
        "en": "Rust",
        "hi": "Rust"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "V8 is Google's open-source high-performance JavaScript and WebAssembly engine, written in C++.",
      "hi": "V8 Google ka high-performance JavaScript engine hai jo C++ mein likha gaya hai."
    }
  },
  {
    "q": {
      "en": "What is the default number of worker threads in the libuv thread pool?",
      "hi": "Libuv thread pool mein default roop se kitne worker threads hote hain?"
    },
    "options": [
      {
        "en": "4",
        "hi": "4"
      },
      {
        "en": "1",
        "hi": "1"
      },
      {
        "en": "8",
        "hi": "8"
      },
      {
        "en": "16",
        "hi": "16"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "By default, libuv allocates 4 worker threads to handle file system, crypto, and DNS lookup operations.",
      "hi": "libuv default mein 4 worker threads allocate karta hai heavy file aur crypto tasks ke liye."
    }
  },
  {
    "q": {
      "en": "Which of the following operations does NOT use the libuv thread pool by default?",
      "hi": "Inme se kaunsa operation default mein libuv thread pool use NAHI karta?"
    },
    "options": [
      {
        "en": "Incoming HTTP network sockets",
        "hi": "Incoming HTTP network sockets"
      },
      {
        "en": "crypto.pbkdf2 hashing",
        "hi": "crypto.pbkdf2 hashing"
      },
      {
        "en": "fs.readFile() file access",
        "hi": "fs.readFile() file access"
      },
      {
        "en": "zlib compression",
        "hi": "zlib compression"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Network sockets use native OS non-blocking multiplexing mechanisms (such as epoll on Linux or kqueue on macOS) and do not consume worker threads.",
      "hi": "Network sockets operating system ke direct non-blocking system (epoll/kqueue) par chalte hain aur thread pool consume nahi karte."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of What is Node.js, V8 Engine & Libuv in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Node.js Kya Hai, V8 Engine & Libuv Internals ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling what is node.js, v8 engine & libuv with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Node.js Kya Hai, V8 Engine & Libuv Internals ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "What is Node.js, V8 Engine & Libuv establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does What is Node.js, V8 Engine & Libuv directly resolve?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without What is Node.js, V8 Engine & Libuv, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about What is Node.js, V8 Engine & Libuv, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing What is Node.js, V8 Engine & Libuv, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with What is Node.js, V8 Engine & Libuv?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should What is Node.js, V8 Engine & Libuv be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Node.js Kya Hai, V8 Engine & Libuv Internals ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of What is Node.js, V8 Engine & Libuv impact application memory and CPU consumption?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within What is Node.js, V8 Engine & Libuv?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in What is Node.js, V8 Engine & Libuv?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in What is Node.js, V8 Engine & Libuv?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for What is Node.js, V8 Engine & Libuv, what must the test suite assert?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in What is Node.js, V8 Engine & Libuv?",
      "hi": "Modular design Node.js Kya Hai, V8 Engine & Libuv Internals mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should What is Node.js, V8 Engine & Libuv be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Node.js Kya Hai, V8 Engine & Libuv Internals ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does What is Node.js, V8 Engine & Libuv properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Node.js Kya Hai, V8 Engine & Libuv Internals kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with What is Node.js, V8 Engine & Libuv in production?",
      "hi": "Production mein Node.js Kya Hai, V8 Engine & Libuv Internals ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for What is Node.js, V8 Engine & Libuv?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in What is Node.js, V8 Engine & Libuv?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in What is Node.js, V8 Engine & Libuv?",
      "hi": "Node.js Kya Hai, V8 Engine & Libuv Internals mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
