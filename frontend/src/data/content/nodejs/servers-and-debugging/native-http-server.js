export default {
  id: "node-native-http",
  title: {
    en: "Building a Native HTTP Server",
    hi: "Bina Framework Ke Native HTTP Server Banana",
  },
  difficulty: "Intermediate",
  readTime: 11,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Built-in node:http Module",
        hi: "1. Built-in node:http Module Kya Hai?",
      },
      body: {
        en: `Most full-stack tutorials jump straight into Express.js without explaining how Node.js actually communicates over the web.

Here is the secret: **Express.js, Fastify, and NestJS do NOT implement HTTP from scratch!** Under the hood, they are all thin syntactic wrappers built directly on top of Node's built-in **\`node:http\`** module!

When you invoke \`http.createServer((req, res) => {})\`:
- **\`req\` (\`http.IncomingMessage\`)**: A **Readable Stream** representing the incoming client request. It contains \`req.url\`, \`req.method\`, \`req.headers\`, and stream chunks of the request body.
- **\`res\` (\`http.ServerResponse\`)**: A **Writable Stream** representing the response sent back to the client. You write headers, send body data, and signal completion with \`res.end()\`.`,
        hi: `Zyadatar tutorials direct Express.js sikhana shuru kar dete hain bina yeh bataye ki Node.js web par communicate kaise karta hai.

Sach yeh hai ki: **Express.js ya Fastify HTTP ko scratch se nahi banate!** Yeh sabhi frameworks Node.js ke built-in **\`node:http\`** module ke upar banaye gaye lightweight wrappers hain!

Jab aap \`http.createServer((req, res) => {})\` likhte ho:
- **\`req\` (\`http.IncomingMessage\`)**: Ek **Readable Stream** hai jo user ki request ko represent karta hai. Isme \`req.url\`, \`req.method\`, \`req.headers\` aur POST body ke binary data chunks aate hain.
- **\`res\` (\`http.ServerResponse\`)**: Ek **Writable Stream** hai jisse hum browser ya client ko response bhejte hain (\`res.writeHead()\`, \`res.end()\`).`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Why Learning Native HTTP Makes You an Elite Backend Engineer",
        hi: "2. Native HTTP Seekhna Kyun Zaroori Hai?",
      },
      body: {
        en: `In Express, parsing a JSON body is as simple as adding \`app.use(express.json())\`. But what does \`express.json()\` actually do behind the scenes?

In a native HTTP server, incoming POST request data does NOT arrive as a completed string! Because TCP sends data in packets, the body arrives in **asynchronous stream chunks**.
You must:
1. Listen to \`req.on('data', chunk => chunks.push(chunk))\`.
2. Listen to \`req.on('end', () => Buffer.concat(chunks).toString())\`.
3. Wrap it in a \`JSON.parse()\`.

When you understand how to write routing, query parsing, and body streaming natively, debugging complex Express middleware issues or production streaming bottlenecks becomes effortless!`,
        hi: `Express mein JSON body read karne ke liye hum sirf \`app.use(express.json())\` likhte hain. Par kya aapne socha hai ki Express background mein yeh kaise karta hai?

Native HTTP server mein incoming POST request ka data ek baar mein poora nahi milta! TCP network packets alag-alag aate hain, isliye data **stream chunks** mein aata hai.
Aapko khud:
1. \`req.on('data')\` se chunks collect karne padte hain.
2. \`req.on('end')\` aane par Buffer concat karke string banani padti hai.
3. Fir use \`JSON.parse()\` karna padta hai.

Jab aap native routing aur streaming samajh jaate ho, toh Express ke kisi bhi complex middleware ya bug ko debug karna aasan ho jata hai!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Carpenter's Hand Tools vs Ready-Made Furniture",
        hi: "Real-Life Analogy: Badhai (Carpenter) Ke Auzaar vs Ready-Made Furniture",
      },
      body: {
        en: `Consider building a wooden dining table:

- **Express.js is like IKEA Ready-to-Assemble Furniture**:
  - The wood is pre-cut, holes are pre-drilled, and you just tighten a few bolts with an Allen key. It is fast, convenient, and standard.
- **Native \`node:http\` is the Raw Carpenter's Toolkit**:
  - You hold the handsaw, measuring tape, plane, and raw teakwood planks.
  - You learn exactly how joints are fitted and how balance is achieved.
  - When the ready-made table starts wobbling or breaks in production under heavy load, an average developer is helpless, but the master carpenter who understands the raw wood joints can repair it in minutes!`,
        hi: `Sochiye ek dining table banana:

- **Express.js IKEA Ready-Made Furniture Jaisa Hai**:
  - Lakdi pehle se kati hui hai, holes bane hue hain, bas do-chaar bolt tight karne hain. Tez aur convenient.
- **Native \`node:http\` Asal Badhai (Carpenter) Ke Auzaar Hain**:
  - Aapke haath mein aari, measuring tape aur raw lakdi hoti hai.
  - Aap samajhte ho ki lakdi ke joints aapas mein kaise judte hain.
  - Jab production mein heavy traffic se ready-made table ladkhadane lagti hai, toh aam developer ghabra jata hai, par jisne raw joints samajhe hain wo bug ko 2 minute mein fix kar deta hai!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. The Native HTTP Request/Response Lifecycle",
        hi: "4. Native HTTP Server Ka Core Syntax",
      },
      body: {
        en: `\`\`\`javascript
import http from 'node:http';

const server = http.createServer((req, res) => {
  // 1. Inspect Request
  const { method, url, headers } = req;

  // 2. Set Response Headers & Status Code
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Native-Node'
  });

  // 3. Write Body and Terminate Stream
  res.end(JSON.stringify({ message: "Hello from native Node HTTP!" }));
});

server.listen(5000, () => {
  console.log("Native server listening on http://localhost:5000");
});
\`\`\`

> **CRITICAL RULE**: You must ALWAYS call \`res.end()\`! If you forget, the browser or client will keep spinning and waiting forever until a network timeout occurs!`,
        hi: `\`\`\`javascript
import http from 'node:http';

const server = http.createServer((req, res) => {
  // 1. Request details inspect karein
  const { method, url } = req;

  // 2. Status code aur headers set karein
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // 3. Data bhej kar connection close karein
  res.end(JSON.stringify({ status: "OK", server: "Native Node" }));
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
\`\`\`

> **SABSE BADA NIYAM**: Hamesha \`res.end()\` zaroor call karein! Agar aap ise call karna bhool gaye, toh browser ka loader ghoomta hi rahega aur client request timeout ho jayegi!`,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: Multi-Route Server, Body Parser & REST API",
        hi: "5. Practical Examples: Multi-Route Server, Body Parser aur REST API",
      },
      body: {
        en: `### Example 1: Multi-Route Native Router
Handling different HTTP methods and path routes with clean 404 fallback handling.`,
        hi: `### Example 1: Bina Express Ke Multi-Route Server
GET / aur GET /api/health routes handle karna aur 404 response dena.`,
      },
      code: {
        language: "javascript",
        filename: "nativeRouter.js",
        snippet: `// Example 1: Native HTTP Router
import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(\`[\${new Date().toLocaleTimeString()}] \${method} \${url}\`);

  // Route 1: Home page (Plain Text)
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end("<h1>Welcome to the Native Node.js HTTP Server!</h1>");
  }

  // Route 2: System Health API (JSON)
  if (method === "GET" && url === "/api/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      status: "UP",
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }));
  }

  // 404 Not Found Fallback
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found", path: url }));
});

server.listen(4000, () => console.log("Router server online at http://localhost:4000"));`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Manual POST Body Stream Parser",
        hi: "Example 2: Manual POST Request Body Stream Parsing",
      },
      body: {
        en: `### Example 2: How express.json() Works Internally
Manually assembling incoming chunk buffers from the request stream and safely parsing JSON payloads.`,
        hi: `### Example 2: POST Request Body Ko Manually Collect Karna
Dekhiye \`req.on('data')\` aur \`req.on('end')\` se JSON payload assemble karne ka exact tarika.`,
      },
      code: {
        language: "javascript",
        filename: "nativeBodyParser.js",
        snippet: `// Example 2: Parsing JSON request body stream natively
import http from "node:http";

// Reusable native body parser helper
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    // 1. Collect incoming binary chunks
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    // 2. All chunks received
    req.on("end", () => {
      try {
        const rawBody = Buffer.concat(chunks).toString("utf-8");
        if (!rawBody) return resolve({}); // Empty body
        const parsed = JSON.parse(rawBody);
        resolve(parsed);
      } catch (err) {
        reject(new Error("Malformed JSON payload"));
      }
    });

    req.on("error", (err) => reject(err));
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/users") {
    try {
      const body = await parseJsonBody(req);
      console.log("Received POST body:", body);

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ success: true, user: body }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  res.writeHead(404);
  res.end();
});

server.listen(4001, () => console.log("Body parser server at http://localhost:4001"));`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Full Production Mini-REST API with CORS",
        hi: "Example 3: Production Mini-REST API (CORS Aur CRUD Logic Ke Saath)",
      },
      body: {
        en: `### Example 3: Complete In-Memory REST API
A self-contained native server handling CORS preflight (\`OPTIONS\`), GET list, and POST create operations.`,
        hi: `### Example 3: Complete Native REST API
CORS preflight handling aur in-memory database ke saath complete CRUD server.`,
      },
      code: {
        language: "javascript",
        filename: "nativeRestApi.js",
        snippet: `// Example 3: Full Mini REST API with CORS headers
import http from "node:http";

let products = [
  { id: 1, name: "Mechanical Keyboard", price: 3499 },
  { id: 2, name: "Wireless Mouse", price: 1299 }
];

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  // Handle CORS Preflight check
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // GET /api/products
  if (req.method === "GET" && req.url === "/api/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ count: products.length, products }));
  }

  // POST /api/products
  if (req.method === "POST" && req.url === "/api/products") {
    let bodyData = "";
    req.on("data", chunk => { bodyData += chunk; });
    req.on("end", () => {
      try {
        const newProduct = JSON.parse(bodyData);
        newProduct.id = products.length + 1;
        products.push(newProduct);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newProduct));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpoint not found" }));
});

server.listen(4002, () => console.log("Native REST API online at http://localhost:4002"));`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Mistakes in Native HTTP",
        hi: "6. Native HTTP Server Mein Hone Wali Badi Galtiyan",
      },
      mistakes: [
        {
          mistake: {
            en: "Forgetting to call `res.end()` on every code execution branch.",
            hi: "Har execution branch ke end mein `res.end()` call karna bhool jana.",
          },
          correction: {
            en: "If a single `if/else` path forgets `res.end()`, that specific user's browser will hang indefinitely until connection timeout. Always ensure every code path terminates the response stream.",
            hi: "Agar kisi ek path par `res.end()` na ho toh us user ka browser hamesha ke liye atak jata hai. Hamesha har condition mein response terminate karein.",
          },
          code: `// BUG (Hanging request):
if (userFound) {
  res.write("Found"); // Missing res.end()!
}

// FIX:
if (userFound) {
  res.end("Found");
}`,
        },
        {
          mistake: {
            en: "Calling `res.writeHead()` or `res.setHeader()` after headers have already been sent (`ERR_HTTP_HEADERS_SENT`).",
            hi: "Response headers bhej chukne ke baad dobara `res.writeHead()` ya `res.setHeader()` call karna (`ERR_HTTP_HEADERS_SENT`).",
          },
          correction: {
            en: "Once data is sent via `res.write()` or `res.end()`, HTTP headers are locked and transmitted across TCP. Always `return` immediately after sending responses to prevent downstream code from writing headers twice.",
            hi: "Ek baar data send ho jaane ke baad headers lock ho jaate hain. Hamesha `return res.end(...)` likhein taaki aage ka code dobara header set na kare.",
          },
          code: `// BUG:
res.end("Done");
res.writeHead(200); // Throws Error: Cannot set headers after they are sent to the client!

// FIX:
return res.end("Done"); // Halts execution immediately`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Production Best Practices for HTTP Servers",
        hi: "7. Production HTTP Server Ke Best Practices",
      },
      body: {
        en: `- **Set Timeouts**: Prevent Slowloris Denial of Service (DoS) attacks by setting \`server.timeout = 30000\` (30 seconds) and \`server.keepAliveTimeout = 5000\`.
- **Enforce Body Size Limits**: In your body parser, track \`totalBytesReceived\`. If a malicious client uploads 500 MB of JSON, abort the connection immediately with status 413 (Payload Too Large).
- **Graceful Shutdown**: Always bind \`server.close()\` to process \`SIGTERM\` so existing HTTP requests finish cleanly before restarts.`,
        hi: `- **Server Timeout Lagayein**: Hacker attack se bachne ke liye \`server.timeout = 30000\` (30s) zaroor set karein.
- **Payload Size Limit Check**: POST body parse karte waqt byte size check karein taaki koi hacker giant JSON bhej kar server ki RAM na bhar sake (Status 413).
- **Server Close**: Restart ke waqt \`server.close()\` se purane users ki active requests complete hone dein.`,
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
            en: "What stream types do `req` and `res` represent in the native HTTP request handler?",
            hi: "Native HTTP handler mein `req` aur `res` kis stream type ke hote hain?",
          },
          a: {
            en: "`req` is an instance of `http.IncomingMessage`, which is a Readable Stream containing the client's HTTP request body chunks, headers, URL, and method. `res` is an instance of `http.ServerResponse`, which is a Writable Stream used to transmit status codes, response headers, and body payloads back to the client.",
            hi: "`req` ek Readable Stream hota hai (`http.IncomingMessage`) jismein aane wali request ka data chunks mein padha jata hai. `res` ek Writable Stream hota hai (`http.ServerResponse`) jismein hum status codes, headers aur response data write karke bhejte hain.",
          },
        },
        {
          q: {
            en: "What causes the classic error `ERR_HTTP_HEADERS_SENT` in Node.js?",
            hi: "Node.js mein `ERR_HTTP_HEADERS_SENT` error kis wajah se aati hai?",
          },
          a: {
            en: "This error occurs when application code attempts to set HTTP headers or status codes (using `res.writeHead()` or `res.setHeader()`) after the HTTP response headers have already been transmitted to the client (typically because `res.write()` or `res.end()` was already called earlier in execution). It is prevented by ensuring that code paths explicitly return after ending a response.",
            hi: "Yeh error tab aati hai jab response body bhej dene ya `res.end()` call kar dene ke baad code dobara headers ya status code set karne ki koshish karta hai. Ise prevent karne ke liye response send karne ke baad hamesha `return` lagaya jata hai.",
          },
        },
        {
          q: {
            en: "Why is the POST request body not available synchronously on `req.body` in a native HTTP server?",
            hi: "Native HTTP server mein POST request body direct `req.body` par synchronously kyun nahi milti?",
          },
          a: {
            en: "Because HTTP data arrives over TCP network sockets in asynchronous packets. The server cannot guarantee that the entire body has arrived at the exact instant the request callback fires. Therefore, the body must be consumed asynchronously via the Readable stream events (`data` and `end`) before it can be parsed.",
            hi: "Kyunki internet par data TCP packets ke through alag-alag aate hain. Request start hote waqt poora data server tak nahi pahuncha hota. Isliye data ko stream ki tarah asynchronous event listeners (`data` aur `end`) se collect karna padta hai.",
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
        en: `- **Core API**: \`import http from 'node:http'\`.
- **req**: Readable Stream (\`http.IncomingMessage\`).
- **res**: Writable Stream (\`http.ServerResponse\`).
- **Headers**: Set via \`res.writeHead(status, headers)\`.
- **Golden Rule**: Always call \`res.end()\` to terminate every connection!`,
        hi: `- **Module**: \`node:http\`.
- **req**: Readable stream (Client request data).
- **res**: Writable stream (Server response).
- **res.writeHead()**: Status code aur headers set karta hai.
- **Rule**: Har request par \`res.end()\` call karna zaroori hai.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What happens if a developer forgets to call `res.end()` inside a native HTTP request handler?",
      "hi": "Agar developer native HTTP handler ke andar `res.end()` call karna bhool jaye toh kya hoga?"
    },
    "options": [
      {
        "en": "The client's browser keeps waiting and spinning until a network timeout occurs",
        "hi": "Client ka browser ghoomta rahega aur wait karta rahega jab tak network timeout na ho jaye"
      },
      {
        "en": "The server crashes with exit code 1",
        "hi": "Server exit code 1 ke saath crash ho jayega"
      },
      {
        "en": "Node automatically sends an empty 200 OK response after 1 millisecond",
        "hi": "Node automatically 1ms baad empty 200 OK bhej dega"
      },
      {
        "en": "The computer reboots",
        "hi": "Computer reboot ho jayega"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "res is a writable stream. Until res.end() is called, the TCP socket remains open and the client will wait indefinitely until timing out.",
      "hi": "Jab tak res.end() call nahi hota, TCP socket open rehta hai aur browser connection timeout hone tak wait karta rehta hai."
    }
  },
  {
    "q": {
      "en": "Which error is thrown if code attempts to set headers after the response has already been sent to the client?",
      "hi": "Response chale jaane ke baad agar dobara headers set karein toh kaunsi error throw hoti hai?"
    },
    "options": [
      {
        "en": "ERR_HTTP_HEADERS_SENT",
        "hi": "ERR_HTTP_HEADERS_SENT"
      },
      {
        "en": "ERR_SOCKET_CLOSED",
        "hi": "ERR_SOCKET_CLOSED"
      },
      {
        "en": "ERR_STREAM_OVERFLOW",
        "hi": "ERR_STREAM_OVERFLOW"
      },
      {
        "en": "ERR_TCP_RESET",
        "hi": "ERR_TCP_RESET"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "ERR_HTTP_HEADERS_SENT occurs when writeHead or setHeader is invoked after the HTTP header block has already been flushed down the socket.",
      "hi": "ERR_HTTP_HEADERS_SENT tab aati hai jab headers pehle hi client ko bhej diye gaye hon."
    }
  },
  {
    "q": {
      "en": "Why is Express.js preferred over native node:http for large commercial applications?",
      "hi": "Bade commercial projects mein native http ke mukable Express.js kyun use kiya jata hai?"
    },
    "options": [
      {
        "en": "Express provides powerful middleware chaining, built-in body parsing, easy route parameters, and template engine integration",
        "hi": "Express middleware chaining, built-in body parsing, clean route parameters aur router management deta hai"
      },
      {
        "en": "Express is written in C++ and runs 10x faster than native Node",
        "hi": "Express C++ mein likha hai aur 10x fast chalta hai"
      },
      {
        "en": "Native node:http is deprecated by the Node.js foundation",
        "hi": "Native http deprecated ho chuka hai"
      },
      {
        "en": "Express allows running Python code inside Node",
        "hi": "Express Node ke andar Python chalane deta hai"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Express abstracts boilerplate like chunked body aggregation, route matching, query parsing, and error middleware pipelines.",
      "hi": "Express repetitive boilerplate code (body stream collect karna, route matching, status codes) ko aasan bana deta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Building a Native HTTP Server in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Bina Framework Ke Native HTTP Server Banana ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling building a native http server with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Bina Framework Ke Native HTTP Server Banana ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Building a Native HTTP Server establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Bina Framework Ke Native HTTP Server Banana clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Building a Native HTTP Server directly resolve?",
      "hi": "Bina Framework Ke Native HTTP Server Banana kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Building a Native HTTP Server, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Bina Framework Ke Native HTTP Server Banana ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Building a Native HTTP Server, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Bina Framework Ke Native HTTP Server Banana ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Building a Native HTTP Server, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Bina Framework Ke Native HTTP Server Banana ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Building a Native HTTP Server?",
      "hi": "Bina Framework Ke Native HTTP Server Banana ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Building a Native HTTP Server be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Bina Framework Ke Native HTTP Server Banana ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Building a Native HTTP Server impact application memory and CPU consumption?",
      "hi": "Bina Framework Ke Native HTTP Server Banana ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Building a Native HTTP Server?",
      "hi": "Bina Framework Ke Native HTTP Server Banana mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Building a Native HTTP Server?",
      "hi": "Bina Framework Ke Native HTTP Server Banana mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Building a Native HTTP Server?",
      "hi": "Bina Framework Ke Native HTTP Server Banana mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Building a Native HTTP Server, what must the test suite assert?",
      "hi": "Bina Framework Ke Native HTTP Server Banana ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Building a Native HTTP Server?",
      "hi": "Modular design Bina Framework Ke Native HTTP Server Banana mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Building a Native HTTP Server be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Bina Framework Ke Native HTTP Server Banana ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Building a Native HTTP Server properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Bina Framework Ke Native HTTP Server Banana kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Building a Native HTTP Server in production?",
      "hi": "Production mein Bina Framework Ke Native HTTP Server Banana ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Building a Native HTTP Server?",
      "hi": "Bina Framework Ke Native HTTP Server Banana ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Building a Native HTTP Server?",
      "hi": "Bina Framework Ke Native HTTP Server Banana mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Building a Native HTTP Server?",
      "hi": "Bina Framework Ke Native HTTP Server Banana mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
