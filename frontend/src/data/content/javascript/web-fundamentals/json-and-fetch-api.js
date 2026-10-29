/**
 * Module 1: Web & JavaScript Essentials
 * Topic: Web Architecture Fundamentals
 * Subtopic: JSON Format & The Native Fetch API
 */

export default {
  id: "js-json-fetch-api",
  title: {
    en: "JSON Format & The Native Fetch API",
    hi: "JSON Format & Native Fetch API Ka Use",
  },
  difficulty: "Beginner",
  readTime: 9,
  sections: [
    // 1. Concept
    {
      id: "concept",
      type: "concept",
      heading: {
        en: "What is JSON & The Fetch API?",
        hi: "JSON Aur Native Fetch API Kya Hote Hain?",
      },
      body: {
        en: `**JSON (JavaScript Object Notation)** is a lightweight, human-readable, language-independent data-interchange format. Although derived from JavaScript object syntax, JSON is pure **text**.

Every web client and server—whether built in Node.js, Python, Java, or Go—can read and write JSON strings effortlessly.

### JSON Syntax Strict Rules:
- Keys **MUST** be wrapped in double quotes (\`"name": "Aman"\`). Single quotes are invalid!
- Values can only be strings, numbers, booleans, null, arrays, or other JSON objects.
- Functions, \`undefined\`, \`Date\` instances, and \`NaN\` are **not allowed**.

### The Modern Fetch API
The browser's native **\`fetch()\`** function provides an asynchronous, Promise-based interface for making HTTP network requests, completely replacing the obsolete, verbose \`XMLHttpRequest\` (AJAX) of the past.`,
        hi: `**JSON (JavaScript Object Notation)** ek lightweight, text-based data format hai jiska use internet par do computers ke beech data exchange karne ke liye hota hai.

Chahe backend Python mein ho, Java mein, ya Node.js mein—duniya ka har computer JSON text ko aasaani se samajh sakta hai.

### JSON Ke Strict Rules:
- Object ke saare keys **hamesha double quotes** mein hone chahiye (\`"email": "test@mail.com"\`). Single quotes bilkul mana hain!
- Values sirf string, number, boolean, array, object, ya \`null\` ho sakte hain.
- Functions, \`undefined\`, aur \`Date\` objects JSON mein store nahi ho sakte.

### Native Fetch API
Browser ka built-in **\`fetch()\`** function asynchronous network calls karne ke liye use hota hai. Yeh puraana aur lamba \`XMLHttpRequest\` (AJAX) replace karta hai aur modern Promises par chalta hai.`
      },
      code: {
        language: "javascript",
        filename: "json-vs-object.js",
        snippet: `// A JavaScript Object (In Memory)
const userObject = {
  name: 'Aman',
  active: true,
  roles: ['developer', 'educator'],
  loginTime: new Date() // Date instance
};

// Converting to JSON String (for Network Transport)
const jsonString = JSON.stringify(userObject);
console.log(typeof jsonString); // "string"
console.log(jsonString);
// Output: '{"name":"Aman","active":true,"roles":["developer","educator"],"loginTime":"2026-10-28T18:00:00.000Z"}'

// Converting JSON String back into JavaScript Object
const parsedObject = JSON.parse(jsonString);
console.log(parsedObject.name); // "Aman"`
      }
    },

    // 2. Why it matters
    {
      id: "why-it-matters",
      type: "concept",
      heading: {
        en: "Why Fetch & JSON are the Foundation of MERN",
        hi: "Fetch Aur JSON MERN Stack Ki Rehad Ki Haddi Kyun Hain?",
      },
      body: {
        en: `Every single feature you build in a MERN application involves this exact pipeline:
1. React takes form inputs -> Converts them to JSON using \`JSON.stringify()\`.
2. React sends that JSON across the internet using \`fetch()\`.
3. Express parses that JSON -> Stores it as BSON in MongoDB.
4. Express queries MongoDB -> Serializes to JSON -> Sends it back.
5. React receives the stream -> Parses it using \`response.json()\` -> Updates component state.`,
        hi: `MERN app ka har ek feature isi pipeline par chalta hai:
1. React form data leta hai -> Use \`JSON.stringify()\` se string banata hai.
2. \`fetch()\` ke zariye internet par backend ko bhejta hai.
3. Express JSON padhkar MongoDB mein save karta hai.
4. Database se data wapas JSON banakar React ko return kiya jata hai.
5. React \`response.json()\` se data padhta hai aur screen update kar deta hai.`
      }
    },

    // 3. Real-life analogy
    {
      id: "analogy",
      type: "analogy",
      heading: {
        en: "The Universal Shipping Container Analogy",
        hi: "International Shipping Container Ka Udaharan",
      },
      body: {
        en: `Imagine international ocean cargo shipping:
- Before standard shipping containers existed, loading a ship was chaotic: barrels of oil, loose grain bags, wooden crates, and cattle all required different hooks, causing massive port delays.
- In 1956, the **Standard Intermodal Shipping Container** was invented. Now, whether you ship electronics from Japan, spices from India, or clothes from Bangladesh, every cargo ship, crane, and truck in the world uses the exact same steel container.

**JSON is the digital shipping container.** Whether your backend is written in Node.js, Python, or Go, all data is packed in standard JSON containers. And **\`fetch()\` is the cargo truck** that carries the container between the port and the warehouse.`,
        hi: `Shipping container ka real-world example lijiye:
- Pehle zamane mein jahazo par samaan load karna bohot muskhil tha—kisi ka tel ka dabba, kisi ki lakdi ki peti.
- Phir ek standard **Steel Shipping Container** banaya gaya. Ab chahe India se masale bhejne hon ya Japan se cars, poori duniya ke jahaz usi same size ke container ko handle karte hain.

**JSON internet ka wahi shipping container hai.** Chahe client React ho ya mobile app, saara data JSON ke standard container mein pack hota hai. Aur **\`fetch()\` wo cargo delivery van hai** jo is container ko ek jagah se doosri jagah le jaati hai.`
      }
    },

    // 4. Syntax / How it works
    {
      id: "syntax",
      type: "syntax",
      heading: {
        en: "Syntax of the Fetch API & The 2-Step Stream Process",
        hi: "Fetch API Ka Syntax & 2-Step Streaming Process",
      },
      body: {
        en: `### Why Does Fetch Require Two 'await' Calls?
Beginners often ask: *"Why do I need to await fetch and then await res.json()?"*

\`\`\`javascript
const res = await fetch(url);      // 1. Await HTTP Headers
const data = await res.json();     // 2. Await Full Body Stream Reading
\`\`\`

1. **First \`await fetch(url)\`**: Resolves as soon as the **HTTP response headers** arrive from the server (status code 200, Content-Type). The body has not finished downloading yet!
2. **Second \`await res.json()\`**: Reads the remaining incoming stream of raw bytes from the network card to completion, parses the text as JSON, and produces a native JavaScript object.

> [!CRITICAL]
> **Fetch does NOT reject on HTTP 404 or 500 errors!** \`fetch()\` only rejects on network failures (loss of internet or DNS failure). You **MUST check \`res.ok\`** manually!`,
        hi: `### Fetch Mein Do Baar 'await' Kyun Karna Padta Hai?
Shuruati developers aksar sochte hain: *"Do baar await kyun lagana padta hai?"*

\`\`\`javascript
const res = await fetch(url);      // 1. HTTP Headers aane ka wait
const data = await res.json();     // 2. Poori Body download hone ka wait
\`\`\`

1. **Pehla \`await fetch(url)\`**: Yeh tabhi resolve ho jata hai jab server se sirf **HTTP Headers** aate hain (status code 200 wagairah). Body abhi download ho hi rahi hoti hai.
2. **Doosra \`await res.json()\`**: Yeh network se aane wale bache hue data chunks ko download karta hai aur JSON parse karke usable JavaScript object banata hai.

> [!CRITICAL]
> **Fetch 404 ya 500 aane par error throw NAHI karta!** Fetch sirf tab fail hota hai jab internet hi band ho jaye. Isliye hamesha manually \`res.ok\` check karna zaroori hota hai!`
      }
    },

    // 5. Examples (3 Levels)
    {
      id: "examples",
      type: "example",
      heading: {
        en: "Example 1 (Basic): Safe GET Request with 'res.ok' Check",
        hi: "Example 1 (Basic): Safe GET Request (res.ok Validation)",
      },
      body: {
        en: `The correct way to execute a GET request with production-grade error checking:`,
        hi: `Production standard tareeqe se GET request execute karne ka code:`
      },
      code: {
        language: "javascript",
        filename: "safe-fetch-get.js",
        snippet: `async function fetchUserProfile(userId) {
  try {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);

    // CRITICAL: Check if HTTP status is within 200-299 range
    if (!res.ok) {
      throw new Error(\`HTTP Error! Status: \${res.status} (\${res.statusText})\`);
    }

    const user = await res.json();
    console.log("Fetched User:", user.name, user.email);
    return user;
  } catch (error) {
    console.error("Network or Parsing Failure:", error.message);
  }
}

fetchUserProfile(1);`
      }
    },

    {
      id: "example-intermediate",
      type: "example",
      heading: {
        en: "Example 2 (Intermediate): POST Request with JSON & Auth Headers",
        hi: "Example 2 (Intermediate): Headers Aur Body Ke Sath POST Request",
      },
      body: {
        en: `Sending JSON data and custom headers in a POST request:`,
        hi: `Backend ko JSON data aur token headers ke sath POST request bhejna:`
      },
      code: {
        language: "javascript",
        filename: "fetch-post.js",
        snippet: `async function createNewPost(postData) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tells backend body is JSON
        'Authorization': 'Bearer sample_token_jwt',
      },
      body: JSON.stringify(postData), // Serialize object to JSON string!
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || \`Server returned status \${res.status}\`);
    }

    const createdPost = await res.json();
    console.log('Post created successfully with ID:', createdPost.id);
    return createdPost;
  } catch (error) {
    console.error('Failed to create post:', error.message);
  }
}

createNewPost({ title: 'MERN Stack Guide', body: 'Learning Fetch & JSON' });`
      }
    },

    {
      id: "example-real-world",
      type: "example",
      heading: {
        en: "Example 3 (Real-World): Production 'apiClient' Wrapper with Timeout & AbortController",
        hi: "Example 3 (Real-World): Reusable Production apiClient Wrapper",
      },
      body: {
        en: `Senior full-stack developers never call raw \`fetch\` directly in components. They build a resilient wrapper that automatically handles timeouts, aborts, and auth headers:`,
        hi: `Production code mein raw \`fetch\` baar-baar likhne ke bajaye ek reusable \`apiClient\` wrapper banaya jata hai:`
      },
      code: {
        language: "javascript",
        filename: "apiClient.js",
        snippet: `// Reusable resilient fetch wrapper
export async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const token = localStorage.getItem('auth_token');

  // Automatic timeout after 8 seconds using AbortController
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: \`Bearer \${token}\` } : {}),
    ...customConfig.headers,
  };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers,
    signal: controller.signal,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(endpoint, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return Promise.reject(new Error(errorData.error || \`HTTP Status \${response.status}\`));
    }

    // Handle 204 No Content
    if (response.status === 204) return null;

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return Promise.reject(new Error('Request timed out after 8000ms'));
    }
    return Promise.reject(err);
  }
}`
      }
    },

    // 6. Common Mistakes
    {
      id: "mistakes",
      type: "mistakes",
      heading: {
        en: "3 Common Mistakes with Fetch & JSON",
        hi: "Fetch & JSON Ke 3 Badi Galatiyan",
      },
      body: {
        en: `### 1. Forgetting 'Content-Type: application/json' on POST
- **The Mistake**: Sending \`body: JSON.stringify(data)\` without setting the \`Content-Type\` header.
- **Why Express fails**: Express receives the bytes, but because the header is missing, \`express.json()\` ignores it. In your backend, \`req.body\` ends up completely empty (\`{}\`)!

---

### 2. Assuming Fetch Rejects on 404 or 500
- **The Mistake**: Wrapping \`fetch()\` in \`try/catch\` and assuming a 404 Not Found jumps to \`catch\`.
- **The Reality**: The Promise fulfills successfully because the server replied! You **MUST** check \`if (!response.ok)\`.

---

### 3. Calling 'response.json()' Multiple Times
- **The Error**: \`TypeError: Failed to execute 'json' on 'Response': body stream already read\`.
- **The Fix**: The response body is a readable stream that can only be consumed **once**. Store the result in a variable: \`const data = await response.json();\`.`,
        hi: `### 1. 'Content-Type: application/json' Header Bhool Jana
- **Galti**: POST request mein body toh bhej di par header nahi lagaya.
- **Problem**: Backend ka \`express.json()\` ise ignore kar deta hai aur server mein \`req.body\` khali (\`{}\`) aata hai.

---

### 2. 404 Aane Par Sochna Ki Catch Block Chalega
- **Galti**: Yeh sochna ki 404 aane par \`try/catch\` ka catch chalega.
- **Sach**: Fetch sirf network fail hone par reject hota hai. 404 aane par bhi \`try\` hi chalta hai. Isliye \`if (!res.ok)\` check karna zaroori hai.

---

### 3. 'res.json()' Ko Do Baar Call Karna
- **Error**: \`body stream already read\`.
- **Kyun**: Response stream sirf ek baar read ho sakti hai. Hamesha data ko variable mein save karein: \`const data = await res.json();\`.`
      }
    },

    // 7. Best practices
    {
      id: "best-practices",
      type: "summary",
      heading: {
        en: "Production Best Practices",
        hi: "Production Best Practices",
      },
      body: {
        en: `- Always check \`response.ok\` before calling \`response.json()\`.
- Always set \`Content-Type: application/json\` when sending bodies.
- Use \`AbortController\` to implement network timeouts on slow 3G mobile connections.
- Build a central \`apiClient\` wrapper to avoid duplicating token attachment and error handling.`,
        hi: `- \`res.json()\` call karne se pehle hamesha \`res.ok\` verify karein.
- POST request bhejte waqt \`Content-Type: application/json\` header zaroor lagayein.
- Slow network par request atakne se bachne ke liye \`AbortController\` se timeout lagayein.
- Ek central \`apiClient\` function banayein taaki token har jagah baar-baar na lagana pade.`
      }
    },

    // 8. Interview Questions
    {
      id: "interview",
      type: "interview",
      heading: {
        en: "Fetch & JSON Interview Questions",
        hi: "Fetch & JSON Interview Questions",
      },
      body: {
        en: "Questions on browser networking asked in technical rounds:",
        hi: "Browser networking ke standard questions:"
      },
      questions: [
        {
          q: {
            en: "Why doesn't the native fetch API reject its Promise on an HTTP 404 or 500 status code?",
            hi: "HTTP 404 ya 500 aane par Fetch API ka Promise reject kyun nahi hota?"
          },
          a: {
            en: "From an HTTP networking perspective, an HTTP 404 or 500 is a completely successful network transaction: the client sent an HTTP request, and the server sent an HTTP response. Fetch only rejects if the network communication itself fails (e.g. DNS resolution failure, offline device, or CORS policy rejection). Developers must explicitly check the boolean 'response.ok' (which checks if status is 200-299).",
            hi: "Networking ke hisaab se 404 ya 500 aane ka matlab hai ki server ne request ka jawab de diya hai, isliye network call fail nahi hui. Fetch ka Promise sirf tab reject hota hai jab network connection physically toot jaye (jaise internet band hona). Isliye developers ko manually \`response.ok\` check karna padta hai."
          },
          takeaway: {
            en: "Fetch resolves on any server response; it only rejects on network failures.",
            hi: "Fetch har server response par resolve hota hai; sirf network cut hone par reject hota hai."
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
        en: `- JSON is string text with strict double-quoted keys.
- \`JSON.stringify()\` converts objects to text; \`JSON.parse()\` converts text to objects.
- \`fetch()\` requires two awaits: headers first, then stream body.
- Always check \`if (!response.ok)\` to handle 4xx and 5xx errors properly.`,
        hi: `- JSON text format hai jisme keys hamesha double quotes mein hoti hain.
- \`JSON.stringify()\` object ko text banata hai; \`JSON.parse()\` text ko object banata hai.
- \`fetch()\` mein do await lagte hain: pehle headers, fir body stream.
- 4xx aur 5xx errors pakadne ke liye hamesha \`if (!res.ok)\` check karein.`
      }
    }
  ],

  // 10. Quiz
  quiz: [
  {
    "q": {
      "en": "What is the return type of 'JSON.stringify({ name: \"Aman\" })'?",
      "hi": "'JSON.stringify({ name: \"Aman\" })' ka return type kya hota hai?"
    },
    "options": [
      {
        "en": "Object",
        "hi": "Object"
      },
      {
        "en": "String",
        "hi": "String"
      },
      {
        "en": "Binary Buffer",
        "hi": "Binary Buffer"
      },
      {
        "en": "Promise",
        "hi": "Promise"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "JSON.stringify() converts any JavaScript object into a primitive string representation.",
      "hi": "JSON.stringify() JavaScript object ko ek plain string text mein convert karta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of JSON Format & The Native Fetch API in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein JSON Format & Native Fetch API Ka Use ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling json format & the native fetch api with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath JSON Format & Native Fetch API Ka Use ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "JSON Format & The Native Fetch API establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "JSON Format & Native Fetch API Ka Use clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does JSON Format & The Native Fetch API directly resolve?",
      "hi": "JSON Format & Native Fetch API Ka Use kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without JSON Format & The Native Fetch API, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "JSON Format & Native Fetch API Ka Use ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about JSON Format & The Native Fetch API, how is its mental model best conceptualized through real-world analogies?",
      "hi": "JSON Format & Native Fetch API Ka Use ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing JSON Format & The Native Fetch API, what syntactic convention is essential to prevent runtime errors?",
      "hi": "JSON Format & Native Fetch API Ka Use ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with JSON Format & The Native Fetch API?",
      "hi": "JSON Format & Native Fetch API Ka Use ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should JSON Format & The Native Fetch API be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye JSON Format & Native Fetch API Ka Use ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of JSON Format & The Native Fetch API impact application memory and CPU consumption?",
      "hi": "JSON Format & Native Fetch API Ka Use ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within JSON Format & The Native Fetch API?",
      "hi": "JSON Format & Native Fetch API Ka Use mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in JSON Format & The Native Fetch API?",
      "hi": "JSON Format & Native Fetch API Ka Use mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in JSON Format & The Native Fetch API?",
      "hi": "JSON Format & Native Fetch API Ka Use mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for JSON Format & The Native Fetch API, what must the test suite assert?",
      "hi": "JSON Format & Native Fetch API Ka Use ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in JSON Format & The Native Fetch API?",
      "hi": "Modular design JSON Format & Native Fetch API Ka Use mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should JSON Format & The Native Fetch API be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par JSON Format & Native Fetch API Ka Use ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does JSON Format & The Native Fetch API properly belong and execute?",
      "hi": "Full-stack MERN architecture mein JSON Format & Native Fetch API Ka Use kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with JSON Format & The Native Fetch API in production?",
      "hi": "Production mein JSON Format & Native Fetch API Ka Use ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for JSON Format & The Native Fetch API?",
      "hi": "JSON Format & Native Fetch API Ka Use ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in JSON Format & The Native Fetch API?",
      "hi": "JSON Format & Native Fetch API Ka Use mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in JSON Format & The Native Fetch API?",
      "hi": "JSON Format & Native Fetch API Ka Use mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
      "en": "What principle enables JSON Format & The Native Fetch API to operate identically across local dev, staging, and production environments?",
      "hi": "JSON Format & Native Fetch API Ka Use ko local dev, staging aur production mein bilkul same operate karne ke liye kaunsa niyam zaroori hai?"
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
      "en": "When an unexpected outage or regression occurs in production involving JSON Format & The Native Fetch API, what is the first engineering step?",
      "hi": "Production mein JSON Format & Native Fetch API Ka Use se related outage ya regression aane par pehla engineering step kya hona chahiye?"
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
