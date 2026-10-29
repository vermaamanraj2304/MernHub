/**
 * Module 1: Web & JavaScript Essentials
 * Topic: Web Architecture Fundamentals
 * Subtopic: REST Architecture, Status Codes & HTTP Headers
 */

export default {
  id: "js-rest-http-methods",
  title: {
    en: "REST Architecture, Status Codes & HTTP Headers",
    hi: "REST Architecture, Status Codes & HTTP Headers",
  },
  difficulty: "Beginner",
  readTime: 11,
  sections: [
    // 1. Concept
    {
      id: "concept",
      type: "concept",
      heading: {
        en: "What is REST Architecture?",
        hi: "REST Architecture Kya Hoti Hai?",
      },
      body: {
        en: `**REST** stands for **Representational State Transfer**. Introduced by Roy Fielding in his 2000 doctoral dissertation, it is not a protocol, software library, or programming language; it is an **architectural style** for designing networked APIs.

An API is considered **RESTful** if it adheres to 6 core architectural constraints:
1. **Stateless**: Every HTTP request from client to server must contain all the information necessary to understand and process the request. The server never stores client session context in its memory.
2. **Client-Server Separation**: The user interface concerns (React) are cleanly separated from data storage and business logic concerns (Express + MongoDB).
3. **Uniform Interface**: Resources are identified by standard URIs (e.g. \`/api/products\`), and actions are expressed through standard HTTP verbs (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`).
4. **Cacheable**: Responses must define whether they are cacheable to prevent redundant network trips.
5. **Layered System**: The client cannot tell whether it is connected directly to the end server, or through a load balancer, CDN, or proxy.
6. **Code on Demand (Optional)**: Servers can temporarily extend client functionality by transferring executable code (e.g., JavaScript scripts).`,
        hi: `**REST** ka full form hai **Representational State Transfer**. Yeh koi alag software ya language nahi hai, balki APIs design karne ke **international rules aur principles ka ek set** hai.

Kisi API ko **RESTful** tab mana jata hai jab wo in 6 rules ko follow karti hai:
1. **Stateless (Bina Session Memory)**: Har request apne aap mein complete honi chahiye. Server ko agle request ke liye purana session yaad rakhne ki zaroorat nahi honi chahiye (isiliye hum JWT tokens use karte hain).
2. **Client-Server Alag-Alag**: Frontend UI (React) aur Backend Database (Node + Mongo) poori tarah independent hone chahiye.
3. **Uniform Interface**: Har resource ka ek unique URL path hota hai (jaise \`/api/users\`), aur actions standard HTTP methods se bataye jaate hain.
4. **Cacheable**: Response mein bataya jaye ki data browser mein cache kiya ja sakta hai ya nahi.
5. **Layered Architecture**: Client ko farq nahi padta ki beech mein load balancer ya firewall laga hai.
6. **Code on Demand**: Zaroorat padne par server client ko scripts execute karne bhej sakta hai.`
      },
      code: {
        language: "javascript",
        filename: "rest-endpoints.js",
        snippet: `// Standard RESTful Resource Design for 'Articles'
// GET    /api/articles          -> Fetch all articles (Read)
// GET    /api/articles/:id      -> Fetch specific article by ID (Read)
// POST   /api/articles          -> Create a new article (Create)
// PUT    /api/articles/:id      -> Replace entire article (Full Update)
// PATCH  /api/articles/:id      -> Update specific fields like title (Partial Update)
// DELETE /api/articles/:id      -> Remove article by ID (Delete)`
      }
    },

    // 2. Why it matters
    {
      id: "why-it-matters",
      type: "concept",
      heading: {
        en: "Why Following REST Standards Matters",
        hi: "REST Standards Follow Karna Kyun Zaroori Hai?",
      },
      body: {
        en: `Without standard REST conventions, backends become a chaotic nightmare:
- One developer creates \`/deleteUserById?id=5\` as a GET request.
- Another creates \`/updateUser_now\` as a POST request.
- Mobile app developers and frontend engineers have to guess how each endpoint behaves.

**With REST:**
Any frontend engineer in the world knows that sending \`GET /api/users/42\` fetches user 42, and sending \`DELETE /api/users/42\` removes them. Predictability and clean collaboration are built into the design.`,
        hi: `Agar REST ke standards na ho toh har developer apni marzi se ulti-seedhi APIs banayega:
- Koi \`/getUserDetails\` banayega, koi \`/fetch_user_fast\` banayega.
- Koi data delete karne ke liye GET method use karega.

**REST ka sabse bada fayda:**
Duniya ka koi bhi frontend developer bina poochhe samajh jata hai ki \`GET /api/products/10\` se product ka data aayega aur \`DELETE /api/products/10\` se delete hoga. Poori industry mein ek standard ban jata hai.`
      }
    },

    // 3. Real-life analogy
    {
      id: "analogy",
      type: "analogy",
      heading: {
        en: "The Bank Counter & Token System Analogy",
        hi: "Bank Counter Aur Token Slip Ka Udaharan",
      },
      body: {
        en: `Imagine visiting your local State Bank of India (SBI) branch:

1. **Uniform Interface (Standard Slips)**:
   You don't write requests on random scraps of paper. You pick a green slip to deposit cash (POST), a blue slip to withdraw cash (DELETE), or view your passbook at the counter (GET).
2. **Statelessness (The Token Number)**:
   The teller serves 500 people a day. The teller does not remember your face or your personal details from yesterday. Every time your token is called, you must hand over your passbook and signed slip. The slip contains everything required to complete the transaction right then and there.
3. **Status Codes**:
   - The cashier stamps "Approved" and hands you cash (\`200 OK\`).
   - The cashier says "Insufficient funds" (\`400 Bad Request\`).
   - The cashier says "Your signature doesn't match" (\`401 Unauthorized\`).
   - The server network is down (\`500 Internal Server Error\`).`,
        hi: `REST architecture ko **Bank ke Cash Counter** ki tarah samjhein:

1. **Standard Slips (HTTP Verbs)**:
   Aap kisi bhi kagaz par likh kar paise nahi maangte. Paisa jama karne ke liye deposit slip (POST), nikalne ke liye withdrawal slip (DELETE), aur passbook entry ke liye machine (GET) use hoti hai.
2. **Statelessness (Bank Teller)**:
   Cashier ko hazaron customers ka chehra yaad rakhne ki zaroorat nahi hoti. Jab aapka number aata hai, aap apni slip aur ID dikhate hain. Us ek slip mein poora data hota hai.
3. **Status Codes (Cashier Ka Jawab)**:
   - Cashier ne cash de diya: \`200 OK\`.
   - Form mein amount galat bhara: \`400 Bad Request\`.
   - Signature match nahi hua: \`401 Unauthorized\`.
   - Bank ka server down hai: \`500 Internal Server Error\`.`
      }
    },

    // 4. Syntax / How it works
    {
      id: "syntax",
      type: "syntax",
      heading: {
        en: "HTTP Verbs, Idempotency & Status Code Families",
        hi: "HTTP Verbs, Idempotency & Status Codes Cheatsheet",
      },
      body: {
        en: `### What is Idempotency?
An HTTP method is **idempotent** if sending the identical request multiple times produces the **exact same server state** as sending it once.

| Method | Role | Idempotent? | Safe? (Read-only) |
|---|---|---|---|
| **GET** | Read resource | **Yes** | **Yes** |
| **POST** | Create resource | **No** (Creates duplicates!) | **No** |
| **PUT** | Replace entire resource | **Yes** | **No** |
| **PATCH** | Partial update | **No** (Can append to array) | **No** |
| **DELETE** | Remove resource | **Yes** (Deleting once or 5x leaves it gone) | **No** |

---

### The 5 HTTP Status Code Families:
- **2xx Success**:
  - \`200 OK\`: Standard successful response.
  - \`201 Created\`: Successful creation of a new resource (POST).
  - \`204 No Content\`: Action succeeded, but there is no body to return (common for DELETE).
- **3xx Redirection**:
  - \`301 Moved Permanently\`: Resource has a new permanent URL.
  - \`304 Not Modified\`: Browser cached version is still fresh.
- **4xx Client Errors (User made a mistake)**:
  - \`400 Bad Request\`: Malformed syntax or missing required fields.
  - \`401 Unauthorized\`: Missing or invalid authentication token.
  - \`403 Forbidden\`: Authenticated, but lacking permission (e.g., normal user trying to access admin panel).
  - \`404 Not Found\`: Resource does not exist.
  - \`422 Unprocessable Entity\`: Validation error (e.g. password too short).
- **5xx Server Errors (Backend developer made a mistake)**:
  - \`500 Internal Server Error\`: Unhandled crash or database error.
  - \`502 Bad Gateway\`: Reverse proxy could not reach Node.js.
  - \`503 Service Unavailable\`: Server overloaded or under maintenance.`,
        hi: `### Idempotency Kya Hoti Hai?
Ek HTTP method ko **Idempotent** tab kehte hain jab ek hi request ko baar-baar 10 baar bhejne par bhi database mein wahi same result rahe jo pehli baar bhejne par hua tha.

| Method | Kaam | Idempotent? | Safe? |
|---|---|---|---|
| **GET** | Data fetch karna | **Yes** | **Yes** |
| **POST** | Naya record banana | **No** (Baar-baar naye records ban jayenge) | **No** |
| **PUT** | Poora record replace karna | **Yes** | **No** |
| **PATCH** | Specific fields update karna | **No** | **No** |
| **DELETE** | Record delete karna | **Yes** (Ek baar delete ho gaya toh delete hi rahega) | **No** |

---

### Status Codes Ka Complete Cheatsheet:
- **2xx (Sab Badhiya Hai)**:
  - \`200 OK\`: Request successful.
  - \`201 Created\`: Naya record successfully create ho gaya.
  - \`204 No Content\`: Kaam ho gaya par wapas bhejne ke liye koi data nahi hai.
- **4xx (Client Ki Galti)**:
  - \`400 Bad Request\`: User ne galat data bheja.
  - \`401 Unauthorized\`: User logged in nahi hai (Token missing).
  - \`403 Forbidden\`: Logged in hai par permission nahi hai (Admin only).
  - \`404 Not Found\`: URL ya ID database mein nahi mili.
  - \`422 Unprocessable Entity\`: Validation fail ho gayi (jaise weak password).
- **5xx (Backend Developer Ki Galti)**:
  - \`500 Internal Server Error\`: Server code crash ho gaya.`
      }
    },

    // 5. Examples (3 Levels)
    {
      id: "examples",
      type: "example",
      heading: {
        en: "Example 1 (Basic): Proper HTTP Status Codes in Express",
        hi: "Example 1 (Basic): Express Mein Sahi Status Codes Bhejna",
      },
      body: {
        en: `This example shows an Express route returning distinct 200, 201, 400, and 404 status codes:`,
        hi: `Yeh example dikhata hai ki Express mein sahi status codes kaise return kiye jaate hain:`
      },
      code: {
        language: "javascript",
        filename: "status-codes-demo.js",
        snippet: `import express from 'express';

const app = express();
app.use(express.json());

let products = [{ id: 1, name: 'Mechanical Keyboard', price: 2999 }];

// GET: Fetch all products (200 OK)
app.get('/api/products', (req, res) => {
  res.status(200).json({ count: products.length, data: products });
});

// POST: Create a new product (201 Created vs 400 Bad Request)
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required fields' });
  }

  const newProduct = { id: Date.now(), name, price };
  products.push(newProduct);
  return res.status(201).json({ success: true, data: newProduct });
});

// DELETE: Remove product (204 No Content vs 404 Not Found)
app.delete('/api/products/:id', (req, res) => {
  const targetId = Number(req.params.id);
  const exists = products.some(p => p.id === targetId);

  if (!exists) {
    return res.status(404).json({ error: 'Product with specified ID not found' });
  }

  products = products.filter(p => p.id !== targetId);
  return res.status(204).send(); // 204 sends empty body
});`
      }
    },

    {
      id: "example-intermediate",
      type: "example",
      heading: {
        en: "Example 2 (Intermediate): PUT vs PATCH Implementation",
        hi: "Example 2 (Intermediate): PUT Aur PATCH Ka Real Difference",
      },
      body: {
        en: `Understanding the difference between full replacement (\`PUT\`) and partial modification (\`PATCH\`):`,
        hi: `Poore record ko replace karne (PUT) aur sirf kuch fields update karne (PATCH) ka farq:`
      },
      code: {
        language: "javascript",
        filename: "put-vs-patch.js",
        snippet: `import express from 'express';
const app = express();
app.use(express.json());

let userProfile = {
  id: 101,
  username: "aman_verma",
  bio: "Full Stack Engineer",
  country: "India"
};

// PUT: Replaces the ENTIRE resource
// If client forgets to send 'country', country becomes undefined!
app.put('/api/user', (req, res) => {
  const { username, bio, country } = req.body;
  userProfile = { id: userProfile.id, username, bio, country };
  res.status(200).json({ message: "Profile completely replaced", data: userProfile });
});

// PATCH: Partial update (Modifies ONLY the fields provided)
app.patch('/api/user', (req, res) => {
  // Merge incoming fields onto existing object
  userProfile = { ...userProfile, ...req.body };
  res.status(200).json({ message: "Profile partially updated", data: userProfile });
});`
      }
    },

    {
      id: "example-real-world",
      type: "example",
      heading: {
        en: "Example 3 (Real-World): Standard REST Controller Class",
        hi: "Example 3 (Real-World): Production REST Controller Pattern",
      },
      body: {
        en: `In scalable MERN architectures, senior engineers structure routes using dedicated Controller classes that encapsulate HTTP logic:`,
        hi: `Production standard code mein routes ko clean rakhne ke liye Controller class pattern use hota hai:`
      },
      code: {
        language: "javascript",
        filename: "ArticleController.js",
        snippet: `export class ArticleController {
  // GET /api/articles?page=1&limit=10
  static async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const [articles, totalCount] = await Promise.all([
        Article.find().skip(skip).limit(limit),
        Article.countDocuments()
      ]);

      return res.status(200).json({
        success: true,
        data: articles,
        meta: { totalCount, page, totalPages: Math.ceil(totalCount / limit) }
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch articles" });
    }
  }

  // GET /api/articles/:id
  static async getById(req, res) {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      return res.status(200).json({ success: true, data: article });
    } catch (err) {
      return res.status(400).json({ error: "Invalid Article ObjectId" });
    }
  }
}`
      }
    },

    // 6. Common Mistakes
    {
      id: "mistakes",
      type: "mistakes",
      heading: {
        en: "4 REST Anti-Patterns to Avoid",
        hi: "REST APIs Banate Waqt Ki 4 Badi Galatiyan",
      },
      body: {
        en: `### 1. Returning '200 OK' with an Error Object
- **The Anti-Pattern**: \`res.status(200).json({ success: false, error: "Password wrong" })\`.
- **Why it breaks clients**: Axios and Fetch treat any 2xx response as successful! The \`.catch()\` block will never trigger.
- **The Fix**: Send appropriate status codes: \`res.status(401).json({ error: "Password wrong" })\`.

---

### 2. Using Verbs in URIs (e.g. /api/getUsers or /api/deleteProduct)
- **The Anti-Pattern**: Putting actions in the URL path.
- **The Fix**: The URI must represent the **noun** (resource), while the HTTP verb represents the **action**:
  - \`GET /api/users\` (NOT \`/api/getUsers\`)
  - \`DELETE /api/products/42\` (NOT \`/api/deleteProduct\`)

---

### 3. Using GET to Delete or Modify Data
- **The Danger**: Web crawlers (like Googlebot) crawl all \`<a>\` links. If your delete action is a GET link, a bot indexing your site can wipe out your entire database!`,
        hi: `### 1. Error Aane Par Bhi '200 OK' Bhejna
- **Galti**: \`res.status(200).json({ success: false, error: "Password galat hai" })\`.
- **Kyun Galat Hai**: Frontend ka Axios 200 dekh kar sochta hai sab theek hai aur \`.catch()\` block trigger nahi hota.
- **Solution**: Hamesha 401 ya 400 status bhejein.

---

### 2. URL Mein Verbs (Actions) Likhna
- **Galti**: \`/api/getUser\` ya \`/api/deleteProduct\` banana.
- **Solution**: URL hamesha **Noun (Cheez)** hona chahiye, aur action HTTP method batata hai:
  - \`GET /api/users\`
  - \`DELETE /api/products/42\`

---

### 3. GET Request Se Data Delete Karna
- **Dangerous Galti**: \`GET /api/delete/5\` bana dena.
- **Kyun**: Google ke web crawlers har link par GET request bhejte hain. Aise mein bot aapka poora database delete kar sakta hai!`
      }
    },

    // 7. Best practices
    {
      id: "best-practices",
      type: "summary",
      heading: {
        en: "RESTful Design Best Practices",
        hi: "RESTful Design Best Practices",
      },
      body: {
        en: `- Use plural nouns for resources (\`/api/users\`, \`/api/orders\`).
- Use kebab-case for multi-word paths (\`/api/order-items\`).
- Send consistent JSON response structures across all endpoints.
- Always include pagination metadata (\`page\`, \`limit\`, \`totalCount\`) on list endpoints.`,
        hi: `- Resources ke liye hamesha plural nouns use karein (\`/api/users\`).
- Multi-word URLs ke liye kebab-case use karein (\`/api/order-items\`).
- Sabhi responses ka JSON format consistent rakhein.
- List APIs mein pagination metadata zaroor provide karein.`
      }
    },

    // 8. Interview Questions
    {
      id: "interview",
      type: "interview",
      heading: {
        en: "REST & HTTP Interview Questions",
        hi: "REST & HTTP Interview Questions",
      },
      body: {
        en: "Core REST architectural questions asked in senior full-stack rounds:",
        hi: "Senior full-stack interviews ke essential questions:"
      },
      questions: [
        {
          q: {
            en: "What is the difference between PUT and PATCH HTTP methods?",
            hi: "PUT aur PATCH HTTP methods mein kya technical difference hota hai?"
          },
          a: {
            en: "PUT is a full replacement of the target resource. If you send { name: 'Aman' } to a PUT endpoint that previously had { name: 'Aman', age: 24 }, the age field is deleted! PATCH is a partial update; it only mutates the specific attributes provided in the payload while preserving existing attributes.",
            hi: "PUT poore document ko naye data se replace karta hai (agar aapne purane fields chhod diye toh wo delete ho jayenge). PATCH sirf un specific fields ko update karta hai jo body mein bheje gaye hain, baaki fields safe rehte hain."
          },
          takeaway: {
            en: "PUT replaces entire object; PATCH partially updates specific fields.",
            hi: "PUT poora replace karta hai; PATCH partial update karta hai."
          }
        },
        {
          q: {
            en: "What is the difference between 401 Unauthorized and 403 Forbidden?",
            hi: "401 Unauthorized aur 403 Forbidden mein kya farq hota hai?"
          },
          a: {
            en: "401 Unauthorized means 'Unauthenticated'—the client has not provided valid credentials (missing or expired JWT). 403 Forbidden means 'Authenticated but Not Authorized'—the server knows who you are, but your role (e.g. standard User) lacks permission to access the resource (e.g. Admin Settings).",
            hi: "401 ka matlab hai user logged in nahi hai (Authentication issue). 403 ka matlab hai user logged in toh hai, par uske paas is page ko dekhne ki permission nahi hai (Role issue)."
          },
          takeaway: {
            en: "401 = Who are you? 403 = I know who you are, but you cannot enter.",
            hi: "401 = Login karo. 403 = Logged in ho par permission nahi hai."
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
        en: `- REST is an architectural standard based on statelessness and uniform URIs.
- Use GET (Read), POST (Create), PUT (Replace), PATCH (Modify), DELETE (Remove).
- GET, PUT, and DELETE are idempotent; POST and PATCH are not.
- 2xx = Success, 3xx = Redirect, 4xx = Client Mistake, 5xx = Server Mistake.`,
        hi: `- REST statelessness aur uniform URLs par chalta hai.
- GET (Read), POST (Create), PUT (Replace), PATCH (Update), DELETE (Remove).
- GET, PUT, DELETE idempotent hote hain; POST aur PATCH nahi hote.
- 2xx = Success, 4xx = Client ki galti, 5xx = Server ki galti.`
      }
    }
  ],

  // 10. Quiz
  quiz: [
  {
    "q": {
      "en": "Which HTTP status code should be returned after successfully creating a new user document?",
      "hi": "Naya user create hone ke baad kaunsa HTTP status code return karna chahiye?"
    },
    "options": [
      {
        "en": "200 OK",
        "hi": "200 OK"
      },
      {
        "en": "201 Created",
        "hi": "201 Created"
      },
      {
        "en": "204 No Content",
        "hi": "204 No Content"
      },
      {
        "en": "304 Not Modified",
        "hi": "304 Not Modified"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "HTTP 201 Created is the specific REST standard status code indicating that a new resource has been successfully generated on the server.",
      "hi": "HTTP 201 Created standard status code hai jo batata hai ki naya resource server par ban chuka hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of REST Architecture, Status Codes & HTTP Headers in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein REST Architecture, Status Codes & HTTP Headers ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling rest architecture, status codes & http headers with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath REST Architecture, Status Codes & HTTP Headers ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "REST Architecture, Status Codes & HTTP Headers establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "REST Architecture, Status Codes & HTTP Headers clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does REST Architecture, Status Codes & HTTP Headers directly resolve?",
      "hi": "REST Architecture, Status Codes & HTTP Headers kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without REST Architecture, Status Codes & HTTP Headers, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "REST Architecture, Status Codes & HTTP Headers ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about REST Architecture, Status Codes & HTTP Headers, how is its mental model best conceptualized through real-world analogies?",
      "hi": "REST Architecture, Status Codes & HTTP Headers ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing REST Architecture, Status Codes & HTTP Headers, what syntactic convention is essential to prevent runtime errors?",
      "hi": "REST Architecture, Status Codes & HTTP Headers ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with REST Architecture, Status Codes & HTTP Headers?",
      "hi": "REST Architecture, Status Codes & HTTP Headers ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should REST Architecture, Status Codes & HTTP Headers be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye REST Architecture, Status Codes & HTTP Headers ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of REST Architecture, Status Codes & HTTP Headers impact application memory and CPU consumption?",
      "hi": "REST Architecture, Status Codes & HTTP Headers ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within REST Architecture, Status Codes & HTTP Headers?",
      "hi": "REST Architecture, Status Codes & HTTP Headers mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in REST Architecture, Status Codes & HTTP Headers?",
      "hi": "REST Architecture, Status Codes & HTTP Headers mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in REST Architecture, Status Codes & HTTP Headers?",
      "hi": "REST Architecture, Status Codes & HTTP Headers mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for REST Architecture, Status Codes & HTTP Headers, what must the test suite assert?",
      "hi": "REST Architecture, Status Codes & HTTP Headers ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in REST Architecture, Status Codes & HTTP Headers?",
      "hi": "Modular design REST Architecture, Status Codes & HTTP Headers mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should REST Architecture, Status Codes & HTTP Headers be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par REST Architecture, Status Codes & HTTP Headers ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does REST Architecture, Status Codes & HTTP Headers properly belong and execute?",
      "hi": "Full-stack MERN architecture mein REST Architecture, Status Codes & HTTP Headers kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with REST Architecture, Status Codes & HTTP Headers in production?",
      "hi": "Production mein REST Architecture, Status Codes & HTTP Headers ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for REST Architecture, Status Codes & HTTP Headers?",
      "hi": "REST Architecture, Status Codes & HTTP Headers ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in REST Architecture, Status Codes & HTTP Headers?",
      "hi": "REST Architecture, Status Codes & HTTP Headers mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in REST Architecture, Status Codes & HTTP Headers?",
      "hi": "REST Architecture, Status Codes & HTTP Headers mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
      "en": "What principle enables REST Architecture, Status Codes & HTTP Headers to operate identically across local dev, staging, and production environments?",
      "hi": "REST Architecture, Status Codes & HTTP Headers ko local dev, staging aur production mein bilkul same operate karne ke liye kaunsa niyam zaroori hai?"
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
      "en": "When an unexpected outage or regression occurs in production involving REST Architecture, Status Codes & HTTP Headers, what is the first engineering step?",
      "hi": "Production mein REST Architecture, Status Codes & HTTP Headers se related outage ya regression aane par pehla engineering step kya hona chahiye?"
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
