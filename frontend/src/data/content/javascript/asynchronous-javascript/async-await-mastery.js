export default {
  id: "js-async-await",
  title: {
    en: "Async / Await & Clean Error Handling",
    hi: "Async / Await & Clean Error Handling (Mastery)",
  },
  difficulty: "Intermediate",
  readTime: 10,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is async / await?",
        hi: "1. async / await Kya Hai?",
      },
      body: {
        en: `Introduced in ES2017 (ES8), **\`async\`** and **\`await\`** provide special syntax designed to write asynchronous code that reads and behaves like synchronous code.

Under the hood, **\`async/await\` is NOT a brand-new asynchronous engine; it is pure syntactical sugar built directly on top of ES6 Promises and Generators.**

### The Two Core Rules:
1. **The \`async\` Keyword**:
   - Placed before a function declaration or arrow function.
   - **Always forces the function to return a Promise.** If the function returns a primitive value (like a string or number), JavaScript automatically wraps it in \`Promise.resolve(value)\`.
2. **The \`await\` Keyword**:
   - Can only be used inside an \`async\` function (or top-level modules).
   - Pauses the execution of the \`async\` function until the awaited Promise settles.
   - It **unpacks** the resolved value from the Promise.
   - If the Promise rejects, \`await\` throws that rejected error, making it catchable by standard \`try...catch\` blocks!`,
        hi: `ES2017 (ES8) mein introduce kiya gaya **\`async\`** aur **\`await\`** ek aisa modern syntax hai jo asynchronous code ko dekhne aur padhne mein bilkul synchronous code jaisa bana deta hai.

Dhayan rahe: **\`async/await\` koi alag naya system nahi hai, yeh ES6 Promises aur Generators ke upar banaya gaya ek clean syntactical wrapper hai.**

### Iske 2 Golden Rules:
1. **\`async\` Keyword**:
   - Function ke aage lagaya jata hai.
   - **Yeh guarantee karta hai ki function hamesha ek Promise return karega.** Agar aap normal value \`return 5\` bhi karenge, toh JS use \`Promise.resolve(5)\` bana dega.
2. **\`await\` Keyword**:
   - Sirf \`async\` function ke andar hi use ho sakta hai.
   - Yeh function ke execution ko tab tak pause karta hai jab tak samne wala Promise settle na ho jaye.
   - Yeh Promise ke andar se data ko unpack karke nikalta hai.
   - Agar Promise reject ho jaye, toh \`await\` use seedha error bana ke throw karta hai, jise hum standard \`try...catch\` se pakad sakte hain!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Why async/await Revolutionized Full-Stack JavaScript",
        hi: "2. async/await Ne JavaScript Ko Kaise Badla?",
      },
      body: {
        en: `Before \`async/await\`, consuming multiple promises required verbose \`.then()\` chains. With \`async/await\`:

1. **Synchronous Mental Model**: Code reads top-to-bottom sequentially.
2. **Unified Error Handling**: A single standard \`try...catch\` block handles both synchronous runtime errors and asynchronous promise rejections seamlessly.
3. **Better Stack Traces & Debugging**: When stepping through code in Chrome DevTools or VS Code debugger, breakpoints pause naturally on the exact \`await\` line instead of jumping through callback queues.
4. **Conditional Branching**: Writing standard \`if/else\` and loops around asynchronous steps is straightforward without awkward promise composition.`,
        hi: `\`async/await\` ke aane se developers ki zindagi bohot aasan ho gayi:

1. **Top-to-Bottom Flow**: Code bilkul normal synchronous code ki tarah seedha line-by-line padha ja sakta hai.
2. **Standard Try-Catch**: Synchronous syntax errors aur async API failures dono ko ek hi normal \`try...catch\` block se handle kiya ja sakta hai.
3. **Flawless Debugging**: VS Code ya Chrome DevTools mein debugging karte waqt breakpoints usi exact \`await\` line par pause hote hain.
4. **Normal Loops & Conditionals**: Async code mein \`if/else\` ya \`for\` loops lagana behad simple ho gaya.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: FASTag Highway Toll Booth",
        hi: "Real-Life Analogy: National Highway Ka FASTag Toll Plaza",
      },
      body: {
        en: `Consider driving through a modern **FASTag Toll Plaza**:

- **With Old Callbacks / Promises**: You stop your car, hand your phone number to a toll worker, park on the shoulder, wait for a text message, go back to the counter, show the receipt, and then drive through.
- **With \`async / await\`**:
  - Your car approaches the lane (\`async function\`).
  - You pause for 1 second at the barrier (\`await scanFastag()\`).
  - The RFID sensor deducts ₹100, the barrier lifts automatically, and you accelerate forward on the highway without getting out of your vehicle!
  - If your FASTag balance is negative, the barrier remains down, an alarm sounds (\`throw error\`), and you are diverted to the cash assistance booth (\`catch\` block).`,
        hi: `Sochiye aap gaadi se **FASTag Toll Plaza** par pahunche:

- **Purane Tareeke (Callbacks/Promises)**: Gaadi roko, form bharo, side mein khade hoke SMS ka wait karo, fir receipt dikhao aur aage badho.
- **\`async / await\` Ka Tareeka**:
  - Aapki gaadi toll lane mein enter hui (\`async function\`).
  - Barrier ke paas gaadi 1 second ke liye rukti hai (\`await verifyFastag()\`).
  - Scanner ne beep kiya, ₹100 kate, barrier upar hua, aur aap bina kisi jhanjhat ke seedhe aage nikal gaye!
  - Agar FASTag mein balance low hua, toh buzzer baja aur red light jali (\`catch error\`), aur security ne aapko side mein bhej diya.`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. Syntax: Declaration, Awaiting & Error Handling",
        hi: "4. Syntax: Declaration, Await Aur Error Handling",
      },
      body: {
        en: `### Standard Patterns
\`\`\`javascript
// 1. Function declaration
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to load user:", error.message);
    throw error; // Rethrow or return fallback
  }
}

// 2. Arrow function
const getOrders = async () => {
  const orders = await orderDb.find();
  return orders;
};
\`\`\``,
        hi: `### Standard Code Patterns
\`\`\`javascript
// 1. Normal async function
async function getUser(id) {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("API error:", err.message);
  }
}

// 2. Arrow function syntax
const getProducts = async () => {
  const products = await Product.find({});
  return products;
};
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: Sequential vs Parallel & Production Controller",
        hi: "5. Practical Examples: Sequential vs Parallel aur Production Controller",
      },
      body: {
        en: `### Example 1: Basic Linear Data Fetching
A clean sequence of dependent tasks executed step-by-step.`,
        hi: `### Example 1: Basic Sequential Fetching
Ek task ke baad doosra task execute karne ka crystal clear flow.`,
      },
      code: {
        language: "javascript",
        filename: "basicAsyncAwait.js",
        snippet: `// Example 1: Clean Sequential Steps
const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function executeUserRegistration(email, username) {
  console.log("1. Starting user registration...");

  await delay(150); // Simulate network latency
  console.log(\`2. Validated credentials for \${username} (\${email})\`);

  await delay(150);
  const userId = "USR_" + Math.floor(Math.random() * 10000);
  console.log(\`3. Saved user record to MongoDB with ID: \${userId}\`);

  await delay(100);
  console.log("4. Welcome email dispatched!");

  return { success: true, userId };
}

// Invocations
executeUserRegistration("aman@example.com", "amanverma")
  .then(res => console.log("Registration complete:", res));`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Avoiding the 'Async Waterfall' with Promise.all",
        hi: "Example 2: Async Waterfall Problem Ko Promise.all Se Theek Karna",
      },
      body: {
        en: `### Example 2: Parallelizing Independent Async Operations
When fetching data from two independent sources, awaiting them sequentially doubles total execution time. Using \`Promise.all()\` with \`await\` runs them simultaneously!`,
        hi: `### Example 2: Independent APIs Ko Parallel Mein Chalana
Agar User Profile aur Latest News ka aapas mein koi lena-dena nahi hai, toh unhe ek ke baad ek await karke time barbaad karne ki jagah ek saath run karein.`,
      },
      code: {
        language: "javascript",
        filename: "parallelAwait.js",
        snippet: `// Example 2: Serial Waterfall vs Parallel Execution
const fetchUsers = () => new Promise(res => setTimeout(() => res(["User1", "User2"]), 1000));
const fetchProducts = () => new Promise(res => setTimeout(() => res(["Phone", "Laptop"]), 1000));

// SLOW: Serial Waterfall (Takes ~2000ms total)
async function fetchSlowly() {
  console.time("Waterfall execution");
  const users = await fetchUsers(); // Waits 1000ms
  const products = await fetchProducts(); // Waits ANOTHER 1000ms
  console.timeEnd("Waterfall execution"); // ~2000ms
  return { users, products };
}

// FAST: Parallel Execution (Takes ~1000ms total!)
async function fetchFast() {
  console.time("Parallel execution");
  // Both promises start immediately concurrently!
  const [users, products] = await Promise.all([
    fetchUsers(),
    fetchProducts()
  ]);
  console.timeEnd("Parallel execution"); // ~1000ms!
  return { users, products };
}

fetchSlowly().then(() => fetchFast());`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Production MERN API Controller with Try/Catch/Finally",
        hi: "Example 3: Production MERN API Controller (Complete Flow)",
      },
      body: {
        en: `### Example 3: Enterprise Express Controller Simulation
A real-world controller handling database transactions, audit logging, and response status codes.`,
        hi: `### Example 3: Real-World MERN Express API Controller
Database query, status codes aur finally cleanup ke saath enterprise-level controller code.`,
      },
      code: {
        language: "javascript",
        filename: "orderController.js",
        snippet: `// Example 3: Production-Ready Express API Controller
const mockDatabase = {
  findProduct: async (id) => {
    if (id === "p99") return null;
    return { id, title: "Wireless Headphones", stock: 15, price: 2999 };
  },
  createOrder: async (orderData) => {
    return { orderId: "ORD_" + Date.now(), ...orderData };
  }
};

async function createOrderController(req, res) {
  const startTime = Date.now();
  const { productId, quantity } = req.body;

  try {
    // 1. Validation
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Invalid product ID or quantity" });
    }

    // 2. Fetch product from database
    const product = await mockDatabase.findProduct(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // 3. Stock availability check
    if (product.stock < quantity) {
      return res.status(409).json({ success: false, message: "Insufficient inventory" });
    }

    // 4. Save order record
    const totalAmount = product.price * quantity;
    const newOrder = await mockDatabase.createOrder({ productId, quantity, totalAmount });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder
    });
  } catch (error) {
    console.error("[Order Controller Exception]:", error);
    return res.status(500).json({ success: false, message: "Internal server error occurred" });
  } finally {
    const duration = Date.now() - startTime;
    console.log(\`[Audit Log]: POST /api/orders processed in \${duration}ms\`);
  }
}

// Simulating Express req and res
const mockReq = { body: { productId: "p101", quantity: 2 } };
const mockRes = {
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    console.log(\`Response [\${this.statusCode}]:\`, payload);
  }
};

createOrderController(mockReq, mockRes);`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Mistakes with async/await",
        hi: "6. async/await Mein Hone Wali Common Galtiyan",
      },
      mistakes: [
        {
          mistake: {
            en: "Using await inside an Array.prototype.forEach loop expecting it to wait.",
            hi: "`forEach` loop ke andar `await` use karna aur sochna ki loop sequential chalega.",
          },
          correction: {
            en: "`forEach` does not await promises; it fires them all synchronously without waiting. Use a modern `for...of` loop for sequential execution, or `Promise.all(arr.map(...))` for concurrent execution.",
            hi: "`forEach` promises ka wait nahi karta. Sequential execution ke liye `for...of` loop use karein ya parallel ke liye `await Promise.all(arr.map())` use karein.",
          },
          code: `// BUG: forEach will NOT pause!
// [1, 2, 3].forEach(async (id) => {
//   await saveToDb(id);
// });
// console.log("Done"); // Runs BEFORE saveToDb finishes!

// FIX 1 (Sequential):
for (const id of [1, 2, 3]) {
  await saveToDb(id);
}

// FIX 2 (Parallel):
await Promise.all([1, 2, 3].map(id => saveToDb(id)));`,
        },
        {
          mistake: {
            en: "Forgetting the 'await' keyword and wondering why variables return `[object Promise]`.",
            hi: "`await` lagana bhool jana jiski wajah se variable mein data ki jagah Promise object reh jata hai.",
          },
          correction: {
            en: "Without `await`, the function immediately assigns the pending Promise instance instead of the unwrapped resolved data.",
            hi: "`await` ke bina variable ko resolved value nahi balki raw pending Promise milta hai.",
          },
          code: `// BUG:
const user = fetchUser(); // user is Promise { <pending> }
console.log(user.name); // undefined!

// FIX:
const userFixed = await fetchUser();
console.log(userFixed.name); // Works!`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Best Practices for async/await",
        hi: "7. async/await Ke Best Practices",
      },
      body: {
        en: `- **Never create sequential bottlenecks**: If two requests are independent, combine them with \`await Promise.all([a(), b()])\`.
- **Top-Level Await**: In ES Modules (\`.mjs\` or \`"type": "module"\`), you can use \`await\` directly at the root of a file without an enclosing \`async function\`.
- **Wrap in Express asyncHandler**: In backend route files, use a helper wrapper so you don't have to repeat \`try/catch\` blocks inside every single controller.`,
        hi: `- **Unnecessary Waterfall Se Bachein**: Agar 2 API calls independent hain, toh unhe sequential ki jagah \`await Promise.all([call1(), call2()])\` se execute karein.
- **Top-Level Await**: Modern ES Modules mein aap file ke top level par bina wrapper function ke direct \`await\` use kar sakte hain.
- **Express asyncHandler Wrapper**: Express mein har controller mein repetitive try/catch se bachne ke liye custom \`asyncHandler\` ka use karein.`,
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
            en: "What does an async function return if you return a plain number like `return 42`?",
            hi: "Agar kisi async function se plain number `return 42` kiya jaye, toh wo kya return karta hai?",
          },
          a: {
            en: "An async function always returns a Promise. If a primitive value like 42 is returned, JavaScript automatically wraps it into `Promise.resolve(42)`.",
            hi: "Async function hamesha ek Promise return karta hai. Agar aap plain value 42 return karenge, toh engine automatically use `Promise.resolve(42)` mein wrap kar dega.",
          },
        },
        {
          q: {
            en: "How do you handle errors with async/await compared to Promises?",
            hi: "Promises ke mukable async/await mein errors kaise handle kiye jaate hain?",
          },
          a: {
            en: "With Promises, errors are handled via `.catch()` callback chaining. With async/await, errors are handled using standard synchronous `try...catch...finally` blocks. If an awaited promise rejects, the rejection reason is thrown as a catchable exception.",
            hi: "Promises mein errors `.catch()` callback se handle hote the. Async/await mein hum standard `try...catch` block use karte hain. Jab bhi koi awaited promise reject hota hai, engine use exception ki tarah throw karta hai jo catch block mein pakad li jaati hai.",
          },
        },
        {
          q: {
            en: "What is the 'Async Waterfall' anti-pattern and how do you resolve it?",
            hi: "'Async Waterfall' anti-pattern kya hai aur ise kaise solve karte hain?",
          },
          a: {
            en: "The Async Waterfall occurs when independent asynchronous operations are awaited one after another sequentially, causing unnecessary cumulative delays. It is resolved by initiating the promises simultaneously and waiting for them concurrently using `await Promise.all([p1, p2])`.",
            hi: "Async Waterfall tab hota hai jab independent tasks ko ek ke baad ek await kiya jata hai, jisse total execution time double-triple ho jata hai. Ise solve karne ke liye tasks ko simultaneously trigger karke `await Promise.all([p1, p2])` lagaya jata hai.",
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
        en: `- **async**: Flags a function to always return a Promise.
- **await**: Pauses the async function until the Promise settles; unpacks the value.
- **Error Handling**: Wrapped cleanly inside standard \`try...catch\`.
- **Parallelism**: Combine with \`Promise.all()\` to avoid serial waterfalls.
- **Loops**: Use \`for...of\` for sequential awaiting; avoid \`forEach\`.`,
        hi: `- **async**: Function ko Promise return karne ke liye mark karta hai.
- **await**: Promise settle hone tak rukta hai aur value unpack karta hai.
- **Error Handling**: Standard \`try...catch\` se hoti hai.
- **Speed**: Independent calls ke liye \`Promise.all\` use karein.
- **Loops**: Sequential wait ke liye \`for...of\` use karein, \`forEach\` nahi.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What will `typeof (async () => 'hello')()` evaluate to?",
      "hi": "`typeof (async () => 'hello')()` ka result kya aayega?"
    },
    "options": [
      {
        "en": "'object' (specifically an instance of Promise)",
        "hi": "'object' (Promise ka instance)"
      },
      {
        "en": "'string'",
        "hi": "'string'"
      },
      {
        "en": "'function'",
        "hi": "'function'"
      },
      {
        "en": "'undefined'",
        "hi": "'undefined'"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Invoking any async function immediately returns a Promise object, whose typeof in JavaScript is 'object'.",
      "hi": "Kisi bhi async function ko call karne par Promise object return hota hai, aur JavaScript mein object ka typeof 'object' hota hai."
    }
  },
  {
    "q": {
      "en": "Why should you NOT use `await` inside an `Array.prototype.forEach` callback?",
      "hi": "`Array.prototype.forEach` callback ke andar `await` use kyun nahi karna chahiye?"
    },
    "options": [
      {
        "en": "forEach does not wait for promises to resolve before finishing",
        "hi": "forEach promises ke resolve hone ka wait kiye bina khatam ho jata hai"
      },
      {
        "en": "It throws a fatal SyntaxError in strict mode",
        "hi": "Strict mode mein SyntaxError throw hota hai"
      },
      {
        "en": "It mutates the original array",
        "hi": "Yeh original array ko mutate karta hai"
      },
      {
        "en": "It forces the browser to reload",
        "hi": "Yeh browser ko reload kar deta hai"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "forEach is synchronous and ignores the returned promises from its callback. Use for...of instead.",
      "hi": "forEach synchronous hota hai aur callback ke returned promises ko ignore kar deta hai. Isliye for...of use karna chahiye."
    }
  },
  {
    "q": {
      "en": "How do you run two independent async functions `getUser()` and `getPosts()` concurrently using async/await?",
      "hi": "Do independent functions `getUser()` aur `getPosts()` ko concurrently chalane ke liye kya use karenge?"
    },
    "options": [
      {
        "en": "const [user, posts] = await Promise.all([getUser(), getPosts()]);",
        "hi": "const [user, posts] = await Promise.all([getUser(), getPosts()]);"
      },
      {
        "en": "const user = await getUser(); const posts = await getPosts();",
        "hi": "const user = await getUser(); const posts = await getPosts();"
      },
      {
        "en": "const user = await getUser(getPosts());",
        "hi": "const user = await getUser(getPosts());"
      },
      {
        "en": "const [user, posts] = await [getUser, getPosts];",
        "hi": "const [user, posts] = await [getUser, getPosts];"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Promise.all triggers both async operations simultaneously in parallel, halving total execution latency.",
      "hi": "Promise.all dono async tasks ko parallel mein execute karta hai, jisse latency aadhi ho jaati hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Async / Await & Clean Error Handling in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Async / Await & Clean Error Handling (Mastery) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling async / await & clean error handling with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Async / Await & Clean Error Handling (Mastery) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Async / Await & Clean Error Handling establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Async / Await & Clean Error Handling (Mastery) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Async / Await & Clean Error Handling directly resolve?",
      "hi": "Async / Await & Clean Error Handling (Mastery) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Async / Await & Clean Error Handling, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Async / Await & Clean Error Handling (Mastery) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Async / Await & Clean Error Handling, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Async / Await & Clean Error Handling (Mastery) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Async / Await & Clean Error Handling, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Async / Await & Clean Error Handling (Mastery) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Async / Await & Clean Error Handling?",
      "hi": "Async / Await & Clean Error Handling (Mastery) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Async / Await & Clean Error Handling be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Async / Await & Clean Error Handling (Mastery) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Async / Await & Clean Error Handling impact application memory and CPU consumption?",
      "hi": "Async / Await & Clean Error Handling (Mastery) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Async / Await & Clean Error Handling?",
      "hi": "Async / Await & Clean Error Handling (Mastery) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Async / Await & Clean Error Handling?",
      "hi": "Async / Await & Clean Error Handling (Mastery) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Async / Await & Clean Error Handling?",
      "hi": "Async / Await & Clean Error Handling (Mastery) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Async / Await & Clean Error Handling, what must the test suite assert?",
      "hi": "Async / Await & Clean Error Handling (Mastery) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Async / Await & Clean Error Handling?",
      "hi": "Modular design Async / Await & Clean Error Handling (Mastery) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Async / Await & Clean Error Handling be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Async / Await & Clean Error Handling (Mastery) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Async / Await & Clean Error Handling properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Async / Await & Clean Error Handling (Mastery) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Async / Await & Clean Error Handling in production?",
      "hi": "Production mein Async / Await & Clean Error Handling (Mastery) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Async / Await & Clean Error Handling?",
      "hi": "Async / Await & Clean Error Handling (Mastery) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Async / Await & Clean Error Handling?",
      "hi": "Async / Await & Clean Error Handling (Mastery) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Async / Await & Clean Error Handling?",
      "hi": "Async / Await & Clean Error Handling (Mastery) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
