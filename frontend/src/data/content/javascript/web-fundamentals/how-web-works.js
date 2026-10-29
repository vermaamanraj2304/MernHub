/**
 * Module 1: Web & JavaScript Essentials
 * Topic: Web Architecture Fundamentals
 * Subtopic: How the Web Works: HTTP, DNS & Client-Server
 */

export default {
  id: "js-how-web-works",
  title: {
    en: "How the Web Works: HTTP, DNS & Client-Server",
    hi: "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server",
  },
  difficulty: "Beginner",
  readTime: 10,
  sections: [
    // 1. Concept
    {
      id: "concept",
      type: "concept",
      heading: {
        en: "What Happens When You Type a URL and Press Enter?",
        hi: "Jab Aap Browser Mein URL Daal Kar Enter Dabate Hain Toh Kya Hota Hai?",
      },
      body: {
        en: `Every single web interaction—from streaming a video to purchasing on Amazon—relies on the **Client-Server Architecture** operating over the **TCP/IP** and **HTTP** protocols.

When you type \`https://www.google.com\` and press Enter, an incredible sequence of 5 microscopic steps occurs in less than 200 milliseconds:

1. **DNS Lookup (Domain Name System)**: Computers do not understand words like \`google.com\`; they communicate using numerical IP addresses like \`142.250.190.46\`. The browser queries a hierarchy of DNS servers to resolve the domain name into an IP address.
2. **TCP 3-Way Handshake**: Before sending data, the client and server establish a reliable connection by exchanging three packets: **SYN** (Synchronize), **SYN-ACK** (Synchronize-Acknowledge), and **ACK** (Acknowledge).
3. **TLS/SSL Handshake (HTTPS)**: If using HTTPS (port 443), client and server exchange cryptographic certificates and negotiate an encrypted symmetric session key.
4. **HTTP Request & Server Processing**: The browser sends an HTTP request line (e.g. \`GET / HTTP/1.1\`), headers, and optional body. The web server (Node/Express or Nginx) processes the request.
5. **HTTP Response & Critical Rendering Path**: The server returns an HTTP response code (e.g. \`200 OK\`) with HTML. The browser parses the HTML into the DOM tree, CSS into the CSSOM tree, executes JavaScript, and paints pixels on your screen.`,
        hi: `Internet par koi bhi kaam—chahe video dekhna ho ya shopping karna—**Client-Server Model** aur **HTTP/TCP Protocols** par chalta hai.

Jab aap browser mein \`https://www.google.com\` type karke Enter dabate hain, toh agle 200 milliseconds mein yeh 5 steps execute hote hain:

1. **DNS Lookup**: Computer words (jaise \`google.com\`) nahi samajhte; wo numerical IP address (jaise \`142.250.190.46\`) par baat karte hain. DNS server ek phone directory ki tarah domain name ko IP address mein translate karta hai.
2. **TCP 3-Way Handshake**: Data bhejne se pehle client aur server aapas mein connection establish karte hain: **SYN** -> **SYN-ACK** -> **ACK**.
3. **TLS Encryption (HTTPS)**: Agar connection secure hai (HTTPS), toh dono parties cryptographic keys exchange karti hain taaki beech mein koi hacker data na padh sake.
4. **HTTP Request & Processing**: Browser server ko bolta hai: "Mujhe home page ka data do" (\`GET / HTTP/1.1\`). Server request process karta hai.
5. **Response & Browser Rendering**: Server 200 OK ke sath HTML bhejta hai. Browser us HTML aur CSS ko parse karke screen par sundar website render karta hai.`
      },
      code: {
        language: "javascript",
        filename: "http-packet-anatomy.js",
        snippet: `// Anatomy of an HTTP Request Packet
const rawHttpRequest = \`
GET /api/users?page=1 HTTP/1.1
Host: api.mysite.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X)
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
\`;

// Anatomy of an HTTP Response Packet
const rawHttpResponse = \`
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 48
Date: Wed, 28 Oct 2026 18:00:00 GMT

{"status":"success","data":[{"id":1,"name":"Aman"}]}
\`;`
      }
    },

    // 2. Why it matters
    {
      id: "why-it-matters",
      type: "concept",
      heading: {
        en: "Why Understanding Web Protocols Matters for MERN Developers",
        hi: "Web Protocols Samajhna Full-Stack Developer Ke Liye Kyun Zaroori Hai?",
      },
      body: {
        en: `Without understanding how HTTP and DNS work:
- You will struggle with **SSL/TLS mixed-content warnings** when deploying to Vercel and Render.
- You won't understand why a slow DNS lookup adds 500ms of lag to your API response times.
- You won't know how HTTP caching headers (\`Cache-Control\`, \`ETag\`) save gigabytes of bandwidth and cloud server bills.`,
        hi: `Agar aapko HTTP aur DNS ka flow clear nahi hai:
- Production deploy karte waqt jab HTTPS aur mixed-content ke errors aate hain, toh aap phas jayenge.
- Aapko samajh nahi aayega ki website slow kyun chal rahi hai (kya database slow hai ya network latency zyada hai).
- Aap HTTP caching headers use nahi kar payenge jisse server par faltu load badhega.`
      }
    },

    // 3. Real-life analogy
    {
      id: "analogy",
      type: "analogy",
      heading: {
        en: "The Truecaller & Phone Call Analogy",
        hi: "Truecaller Aur Phone Call Ka Udaharan",
      },
      body: {
        en: `Think of making a web request like calling a friend in India using your smartphone:

1. **DNS Lookup (Truecaller / Phonebook)**: You remember your friend's name ("Rahul"), but your telecom network can only dial a 10-digit phone number (\`+91 98765 43210\`). You open your contacts to translate "Rahul" into the number. DNS is the global phonebook.
2. **TCP 3-Way Handshake (Hello? Can you hear me?)**:
   - You dial: "Hello, Rahul?" (SYN).
   - Rahul answers: "Yes, I can hear you, can you hear me?" (SYN-ACK).
   - You reply: "Yes, clear!" (ACK).
   Now the two-way voice channel is established!
3. **HTTP Conversation (Talking & Replying)**: You ask: "What was the homework?" (Request). Rahul replies: "Math exercises 1 to 5" (Response). Both parties hang up the call.`,
        hi: `Web request ko ek **Mobile Phone Call** ki tarah samjhein:

1. **DNS Lookup (Phonebook / Truecaller)**: Aapko dost ka naam yaad hai ("Rahul"), par phone dial karne ke liye 10-digit ka number chahiye. Phone contacts naam ko number mein translate karta hai. Wahi kaam DNS karta hai.
2. **TCP 3-Way Handshake (Hello? Awaaz aa rahi hai?)**:
   - Aapne call lagaya: "Hello, Rahul?" (SYN).
   - Rahul bola: "Haan bhai, awaaz aa rahi hai. Meri aa rahi hai?" (SYN-ACK).
   - Aapne kaha: "Haan, bilkul clear!" (ACK).
   Connection establish ho gaya!
3. **HTTP Request/Response (Baat Cheet)**: Aapne poocha: "Kal office chalna hai?" (Request). Rahul ne jawab diya: "Haan, 10 baje milte hain" (Response). Kaam hone par call disconnect ho gayi.`
      }
    },

    // 4. Syntax / How it works
    {
      id: "syntax",
      type: "syntax",
      heading: {
        en: "DNS Resolution Hierarchy & Network Ports",
        hi: "DNS Resolution Flow & Standard Network Ports",
      },
      body: {
        en: `### The DNS Resolution Tree
When you request \`api.example.com\`, the lookup traverses:
1. **Browser Cache**: Checks if resolved in the last few minutes.
2. **OS Cache**: Checks local hosts file and OS resolver.
3. **Resolving Name Server (ISP)**: Queries local ISP (Airtel, Jio, etc.).
4. **Root Name Server (.)**: Directs to the \`.com\` Top-Level Domain (TLD) server.
5. **TLD Name Server (.com)**: Directs to the authoritative name server for \`example.com\`.
6. **Authoritative Name Server**: Returns the final target IP address (\`A\` record).

---

### Standard Web Ports Every Engineer Must Memorize:
- **Port 80**: HTTP (Unencrypted web traffic)
- **Port 443**: HTTPS (Encrypted web traffic with TLS)
- **Port 3000**: Common default port for React / Next.js local dev server
- **Port 5000 / 8000**: Common default ports for Express.js / Node.js backend
- **Port 27017**: Default port for MongoDB Database engine`,
        hi: `### DNS Resolution Ke 6 Steps
Jab aap \`api.example.com\` type karte hain:
1. **Browser Cache**: Pehle browser apni memory mein check karta hai.
2. **OS Cache**: Computer ke operating system cache mein check hota hai.
3. **ISP Resolver**: Internet provider (Jio, Airtel) ke server par query jaati hai.
4. **Root Server (.)**: Duniya ke 13 root servers \`.com\` TLD server ka address dete hain.
5. **TLD Server (.com)**: \`example.com\` ke authoritative server par bhejta hai.
6. **Authoritative Server**: Final IP address return karta hai.

---

### Zaroori Network Ports:
- **Port 80**: HTTP (Normal unencrypted traffic)
- **Port 443**: HTTPS (Secure encrypted traffic)
- **Port 3000**: React development server ka standard port
- **Port 5000 / 8000**: Express.js backend ka default port
- **Port 27017**: MongoDB database ka standard port`
      }
    },

    // 5. Examples (3 Levels)
    {
      id: "examples",
      type: "example",
      heading: {
        en: "Example 1 (Basic): DNS Lookup in Node.js",
        hi: "Example 1 (Basic): Node.js Ke Built-in 'dns' Module Se IP Lookup",
      },
      body: {
        en: `Node.js has a native \`dns\` module that allows you to inspect domain resolution programmatically:`,
        hi: `Node.js ke andar bina kisi external package ke DNS lookup karne ka code:`
      },
      code: {
        language: "javascript",
        filename: "dns-lookup.js",
        snippet: `import dns from 'dns';

// Resolve google.com to an IPv4 address
dns.lookup('google.com', (err, address, family) => {
  if (err) throw err;
  console.log('IP Address:', address);
  console.log('IP Version: IPv' + family);
});

// Resolve MX (Mail Exchange) records
dns.resolveMx('github.com', (err, addresses) => {
  if (err) throw err;
  console.log('GitHub Mail Servers:', addresses);
});`
      }
    },

    {
      id: "example-intermediate",
      type: "example",
      heading: {
        en: "Example 2 (Intermediate): Inspecting HTTP Headers with Native Node",
        hi: "Example 2 (Intermediate): HTTP Headers Inspect Karna",
      },
      body: {
        en: `Building a raw HTTP server without Express to see exactly what headers the browser sends on every page visit:`,
        hi: `Express ke bina raw Node HTTP server banakar browser ke headers inspect karna:`
      },
      code: {
        language: "javascript",
        filename: "inspect-headers.js",
        snippet: `import http from 'http';

const server = http.createServer((req, res) => {
  console.log('HTTP Method:', req.method);
  console.log('Request URL:', req.url);
  console.log('User-Agent:', req.headers['user-agent']);
  console.log('Accept Header:', req.headers['accept']);

  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'NodeJS-Native-Core',
    'Cache-Control': 'max-age=3600',
  });

  res.end(JSON.stringify({
    message: 'Headers received and logged successfully',
    ip: req.socket.remoteAddress,
  }));
});

server.listen(4000, () => console.log('Listening on http://localhost:4000'));`
      }
    },

    {
      id: "example-real-world",
      type: "example",
      heading: {
        en: "Example 3 (Real-World): Measuring Network Latency & TTFB",
        hi: "Example 3 (Real-World): Network Latency Aur TTFB Measure Karna",
      },
      body: {
        en: `Production engineering involves measuring **TTFB (Time to First Byte)** and total roundtrip time for API health monitoring:`,
        hi: `Production apps mein API ka response time aur TTFB measure karne ka code:`
      },
      code: {
        language: "javascript",
        filename: "measure-ttfb.js",
        snippet: `async function benchmarkApiEndpoint(url) {
  const startTime = performance.now();
  
  try {
    const response = await fetch(url);
    const ttfb = performance.now() - startTime;
    
    const data = await response.json();
    const totalTime = performance.now() - startTime;

    return {
      status: response.status,
      ok: response.ok,
      ttfbMs: Math.round(ttfb),
      totalRoundtripMs: Math.round(totalTime),
      dataSizeKb: (JSON.stringify(data).length / 1024).toFixed(2),
    };
  } catch (error) {
    return { error: error.message, failedAfterMs: Math.round(performance.now() - startTime) };
  }
}

// Benchmark a sample API
benchmarkApiEndpoint('https://jsonplaceholder.typicode.com/posts/1')
  .then(metrics => console.log('Network Performance Metrics:', metrics));`
      }
    },

    // 6. Common Mistakes
    {
      id: "mistakes",
      type: "mistakes",
      heading: {
        en: "Common Networking Mistakes & Misconceptions",
        hi: "Web Networking Ki Badi Galatiyan",
      },
      body: {
        en: `### 1. Mixed Content Error (HTTP inside HTTPS)
- **The Mistake**: Deploying your React app on HTTPS (\`https://myapp.vercel.app\`) but fetching backend APIs using plain HTTP (\`http://myapi.onrender.com\`).
- **The Browser Reaction**: The browser blocks the API call with: \`Mixed Content: The page was loaded over HTTPS, but requested an insecure resource\`.
- **The Fix**: Both frontend and backend MUST use HTTPS in production.

---

### 2. Assuming HTTP is Persistent Like a WebSocket
- **The Misconception**: Thinking an HTTP request stays open forever and the server can push messages to the client at any time.
- **The Reality**: HTTP is **stateless and unidirectional**. The client asks, the server replies, and the transaction is closed. If you need live 2-way streaming, you must use **WebSockets** (Socket.io).`,
        hi: `### 1. Mixed Content Error
- **Galti**: React app ko HTTPS par deploy karna par backend API ko plain \`http://\` par call karna.
- **Problem**: Browser security issue bata kar request block kar deta hai.
- **Solution**: Production mein frontend aur backend dono hamesha HTTPS par hone chahiye.

---

### 2. HTTP Ko WebSocket Samajh Lena
- **Galti**: Yeh sochna ki HTTP connection hamesha open rehta hai aur server bina request ke bhi data bhej sakta hai.
- **Sach**: HTTP request-response model par chalta hai. Client request karega tabhi server response dega. Real-time live updates ke liye WebSockets chahiye hote hain.`
      }
    },

    // 7. Best practices
    {
      id: "best-practices",
      type: "summary",
      heading: {
        en: "Production Networking Best Practices",
        hi: "Production Networking Best Practices",
      },
      body: {
        en: `- Always enforce HTTPS using HTTP Strict Transport Security (HSTS) headers via Helmet.
- Use a Content Delivery Network (CDN) like Cloudflare to cache static assets close to end users.
- Keep payloads minimal using Gzip or Brotli compression.
- Monitor Time To First Byte (TTFB) to keep API responses under 200ms.`,
        hi: `- Production mein Helmet middleware use karke HTTPS enforce karein.
- Static files ke liye Cloudflare CDN use karein taaki website fast load ho.
- Compression middleware use karke JSON payload size 70% kam karein.
- API response time ko hamesha 200ms ke andar rakhne ki koshish karein.`
      }
    },

    // 8. Interview Questions
    {
      id: "interview",
      type: "interview",
      heading: {
        en: "Web Architecture Interview Questions",
        hi: "Web Architecture Interview Questions",
      },
      body: {
        en: "High-frequency questions asked in full-stack architecture rounds:",
        hi: "Technical interviews mein puche jane wale top networking questions:"
      },
      questions: [
        {
          q: {
            en: "What is the difference between HTTP/1.1 and HTTP/2?",
            hi: "HTTP/1.1 aur HTTP/2 mein kya farq hota hai?"
          },
          a: {
            en: "HTTP/1.1 processes requests sequentially on a TCP connection (causing head-of-line blocking). HTTP/2 introduces Multiplexing—allowing multiple bidirectional requests and responses to stream asynchronously over a single persistent TCP connection. It also features header compression (HPACK) and binary protocol formatting.",
            hi: "HTTP/1.1 mein har file ke liye line mein wait karna padta tha (Head-of-Line Blocking). HTTP/2 mein **Multiplexing** hoti hai jisme ek hi connection par hazaron files parallel stream ho sakti hain, aur headers compress rehte hain."
          },
          takeaway: {
            en: "HTTP/2 multiplexes multiple streams over a single connection, eliminating head-of-line blocking.",
            hi: "HTTP/2 multiplexing ke zariye multiple files ek sath parallel download karta hai."
          }
        }
      ]
    },

    // 9. Quick summary
    {
      id: "summary",
      type: "summary",
      heading: {
        en: "Quick Summary",
        hi: "Quick Summary",
      },
      body: {
        en: `- DNS translates human domain names into machine-readable IP addresses.
- TCP 3-way handshake establishes a reliable bidirectional channel.
- HTTP is a stateless client-server protocol.
- Port 80 is HTTP, Port 443 is HTTPS, Port 3000 is React dev, Port 5000 is Node, Port 27017 is MongoDB.`,
        hi: `- DNS domain names ko numerical IP addresses mein translate karta hai.
- TCP 3-way handshake data transfer se pehle connection confirm karta hai.
- HTTP stateless protocol hai jo request aur response par chalta hai.
- Port 80 HTTP hai, Port 443 HTTPS hai, Port 3000 React ka hai, Port 5000 Express ka hai, Port 27017 MongoDB ka hai.`
      }
    }
  ],

  // 10. Quiz
  quiz: [
  {
    "q": {
      "en": "What are the three steps of the TCP 3-Way Handshake?",
      "hi": "TCP 3-Way Handshake ke teen steps kaunse hote hain?"
    },
    "options": [
      {
        "en": "PING -> PONG -> CLOSE",
        "hi": "PING -> PONG -> CLOSE"
      },
      {
        "en": "SYN -> SYN-ACK -> ACK",
        "hi": "SYN -> SYN-ACK -> ACK"
      },
      {
        "en": "GET -> POST -> DELETE",
        "hi": "GET -> POST -> DELETE"
      },
      {
        "en": "DNS -> IP -> PORT",
        "hi": "DNS -> IP -> PORT"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "The client sends SYN, the server responds with SYN-ACK, and the client confirms with ACK.",
      "hi": "Client SYN packet bhejta hai, server SYN-ACK se confirm karta hai, aur client ACK bhej kar connection establish karta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of How the Web Works: HTTP, DNS & Client-Server in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling how the web works: http, dns & client-server with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "How the Web Works: HTTP, DNS & Client-Server establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does How the Web Works: HTTP, DNS & Client-Server directly resolve?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without How the Web Works: HTTP, DNS & Client-Server, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about How the Web Works: HTTP, DNS & Client-Server, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing How the Web Works: HTTP, DNS & Client-Server, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with How the Web Works: HTTP, DNS & Client-Server?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should How the Web Works: HTTP, DNS & Client-Server be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of How the Web Works: HTTP, DNS & Client-Server impact application memory and CPU consumption?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within How the Web Works: HTTP, DNS & Client-Server?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in How the Web Works: HTTP, DNS & Client-Server?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in How the Web Works: HTTP, DNS & Client-Server?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for How the Web Works: HTTP, DNS & Client-Server, what must the test suite assert?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in How the Web Works: HTTP, DNS & Client-Server?",
      "hi": "Modular design Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should How the Web Works: HTTP, DNS & Client-Server be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does How the Web Works: HTTP, DNS & Client-Server properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with How the Web Works: HTTP, DNS & Client-Server in production?",
      "hi": "Production mein Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for How the Web Works: HTTP, DNS & Client-Server?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in How the Web Works: HTTP, DNS & Client-Server?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in How the Web Works: HTTP, DNS & Client-Server?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
  },
  {
    "question": {
      "en": "What principle enables How the Web Works: HTTP, DNS & Client-Server to operate identically across local dev, staging, and production environments?",
      "hi": "Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server ko local dev, staging aur production mein bilkul same operate karne ke liye kaunsa niyam zaroori hai?"
    },
    "options": [
      {
        "en": "Twelve-Factor App methodology: injecting all environment-specific configurations and credentials via environment variables rather than hardcoded code",
        "hi": "Twelve-Factor niyam: environment variables se dynamic configuration aur credentials inject karna bina code badle"
      },
      {
        "en": "Manually rewriting the codebase before deploying to each server",
        "hi": "Har server par deploy karne se pehle naya code likhna"
      },
      {
        "en": "Hosting development and production on the same physical developer laptop",
        "hi": "Ek hi laptop par dev aur prod dono host karna"
      },
      {
        "en": "Disabling all security authentications in production environments",
        "hi": "Production mein saari security band kar dena"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Decoupling configuration from executable code allows identical, immutable container images to run reliably across all deployment stages.",
      "hi": "Config aur code ko alag rakhne se ek hi build image bina kisi bug ke kisi bhi cloud platform par chal sakti hai."
    }
  },
  {
    "question": {
      "en": "When an unexpected outage or regression occurs in production involving How the Web Works: HTTP, DNS & Client-Server, what is the first engineering step?",
      "hi": "Production mein Web Kaise Kaam Karta Hai: HTTP, DNS & Client-Server se related outage ya regression aane par pehla engineering step kya hona chahiye?"
    },
    "options": [
      {
        "en": "Immediately delete all production databases without backups",
        "hi": "Bina backup ke production database delete kar dena"
      },
      {
        "en": "Check centralized observability logs and error stack traces, correlate request IDs, reproduce locally with minimal test cases, and isolate the root cause",
        "hi": "Centralized observability logs aur stack traces check karna, request ID correlate karna, aur locally minimal test cases se reproduce karna"
      },
      {
        "en": "Blame the operating system without inspecting any server logs",
        "hi": "Bina log dekhe OS ko blame karna"
      },
      {
        "en": "Wait several days hoping the system resolves itself",
        "hi": "Kai din intezar karna"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Disciplined engineering incident response begins with analyzing structured logs, tracing request flow, and isolating reproducible root causes.",
      "hi": "Disciplined debugging structured logs aur request correlation ID dekh kar root cause isolate karne se shuru hoti hai."
    }
  }
],
};
