export default {
  id: "js-promises-in-depth",
  title: {
    en: "Promises: States, Chaining & Combinators",
    hi: "Promises: States, Chaining & Combinators (Deep Dive)",
  },
  difficulty: "Intermediate",
  readTime: 12,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is a Promise in JavaScript?",
        hi: "1. JavaScript Mein Promise Kya Hota Hai?",
      },
      body: {
        en: `A **Promise** is a built-in JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

Instead of passing a callback function into a third-party function and losing control, an asynchronous function immediately returns a **Promise object**—a trustable placeholder for a future result.

### The 3 Immutable States of a Promise
A promise exists in one of three mutually exclusive states:
1. **Pending**: The initial state; the asynchronous operation is still in progress.
2. **Fulfilled (Resolved)**: The operation completed successfully, producing a value.
3. **Rejected**: The operation failed, producing a reason (an error).

> **Crucial Rule: Once a Promise settles (Fulfilled or Rejected), its state and value become permanently immutable!** It can never resolve twice, can never reject after resolving, and can never change its value.`,
        hi: `**Promise** JavaScript ka ek built-in object hai jo kisi asynchronous operation ke future result (ya failure) ko represent karta hai.

Kisi doosre function ko callback dekar control khone ki jagah, async function turant humein ek **Promise object** return karta hai—jo future value ka ek bharosemand token hota hai.

### Promise Ki 3 Immutable States
Har Promise in 3 mein se kisi ek state mein hota hai:
1. **Pending**: Shuruati state; asynchronous task abhi background mein chal raha hai.
2. **Fulfilled (Resolved)**: Task successfully complete ho gaya aur data mil gaya.
3. **Rejected**: Task fail ho gaya aur error generate hui.

> **Sabse Bada Niyam**: Ek baar jab Promise settle (Fulfilled ya Rejected) ho jata hai, toh uski state aur value **hamesha ke liye freeze (immutable)** ho jaati hai! Yeh kabhi 2 baar resolve nahi ho sakta aur na hi resolve hone ke baad reject ho sakta hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. How Promises Solve Inversion of Control & Callback Hell",
        hi: "2. Promises Ne Callbacks Ki Problems Kaise Solve Ki?",
      },
      body: {
        en: `Promises revolutionize asynchronous JavaScript by solving the core problems of callbacks:

1. **Guaranteed Trust (IoC Solved)**:
   - A promise resolves **at most once**.
   - Callbacks attached with \`.then()\` are **guaranteed to run asynchronously** via the Microtask Queue, never synchronously messing up stack execution.
   - If an error is thrown anywhere inside an executor or \`.then()\`, it is automatically caught and converted into a rejected promise.
2. **Linear Chaining instead of Deep Nesting**:
   - Any value returned from a \`.then()\` callback is automatically wrapped in a new Promise.
   - If you return another Promise from inside \`.then()\`, JavaScript waits for it to settle before continuing down the chain.
   - A single \`.catch()\` at the bottom of the chain catches errors from **any** preceding step!`,
        hi: `Promises ne asynchronous JavaScript ko poori tarah transform kar diya:

1. **Guaranteed Trust (Bharosa)**:
   - Promise zyada se zyada **sirf 1 baar** resolve hoga.
   - \`.then()\` ke callbacks Microtask Queue ke zariye hamesha asynchronously hi execute honge.
   - Agar code mein koi error aati hai toh Promise use reject karke automatic \`.catch()\` mein bhej deta hai.
2. **Linear Chaining (Pyramid of Doom Khatam)**:
   - \`.then()\` ke andar se return ki gayi value automatically agle \`.then()\` ko pass ho jaati hai.
   - Nested callbacks ki jagah code ek seedhi line mein niche chalta hai: \`.then().then().then().catch()\`.
   - Poori chain mein kisi bhi step par aane wali error ko pakadne ke liye aakhiri mein sirf **ek \`.catch()\`** kaafi hota hai!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Haldiram Food Court Electronic Buzzer",
        hi: "Real-Life Analogy: Food Court Ka Electronic Token Buzzer",
      },
      body: {
        en: `Imagine ordering Chole Bhature at a busy **Haldiram's Food Court**:

- You make the payment at the counter. The food is not ready yet, but the cashier hands you an **Electronic Buzzer Token** (A Promise in \`pending\` state).
- You take a seat and chat with your friends. You don't have to stand at the counter peeking into the kitchen (Non-blocking).
- When the bhature are hot and ready, the buzzer beeps and flashes green (**Fulfilled / Resolved**). You pick up your plate.
- If the gas cylinder runs out and they cannot serve food, the buzzer flashes red and beeps with a buzzer error (**Rejected**). You proceed to the counter for a refund (\`.catch()\`).
- Once the buzzer flashes, its state is done. It can never vibrate twice or change your order.`,
        hi: `Sochiye aap **Haldiram ke Food Court** mein Chole Bhature order karte hain:

- Counter par paise dene ke baad cashier aapko turant ek **Electronic Buzzer Device** de deta hai (Yeh hai hamara Promise jo abhi \`pending\` hai).
- Aap table par aakar aaram se baith jaate ho. Aapko kitchen ke saamne khade rehkar line nahi lagani padti (Non-blocking).
- Jab khana tayyar ho jata hai, buzzer green light ke saath vibrate karta hai (**Fulfilled / Resolved**). Aap counter se food collect kar lete ho.
- Agar chole khatam ho gaye, toh buzzer red flash karta hai (**Rejected**). Aap refund lene counter chale jaate ho (\`.catch()\`).
- Ek baar buzzer chalne ke baad freeze ho jata hai, wo dubara confuse nahi kar sakta.`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. Syntax: Promise Constructor & The 4 Combinators",
        hi: "4. Syntax: Promise Constructor & 4 Combinator Methods",
      },
      body: {
        en: `### Creating a Promise
\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  // Executor runs immediately synchronously
  const success = true;
  if (success) {
    resolve("Operation Succeeded!");
  } else {
    reject(new Error("Operation Failed!"));
  }
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error.message))
  .finally(() => console.log("Done."));
\`\`\`

### The 4 Promise Combinators
When managing multiple concurrent asynchronous operations:
- **\`Promise.all([p1, p2, p3])\`**: Waits for **ALL** to fulfill. If **ANY single one rejects**, the entire collection immediately rejects (Fail-Fast).
- **\`Promise.allSettled([p1, p2, p3])\`**: Waits for **ALL** promises to complete, whether fulfilled or rejected. Returns an array of \`{ status, value/reason }\`. Never short-circuits!
- **\`Promise.race([p1, p2, p3])\`**: Settles as soon as the **first** promise settles (either fulfilled or rejected). Ideal for network timeouts!
- **\`Promise.any([p1, p2, p3])\`**: Resolves as soon as the **first promise fulfills**. Ignores rejections unless *all* reject (returns \`AggregateError\`).`,
        hi: `### Promise Banana Aur Consume Karna
\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  if (success) resolve("Kaam ho gaya!");
  else reject(new Error("Kaam ruk gaya!"));
});

myPromise
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log("Finished."));
\`\`\`

### Multiple Promises Ke 4 Combinators
Jab ek saath kai async tasks chalane hon:
- **\`Promise.all()\`**: Sabhi ke complete hone ka wait karta hai. Agar **ek bhi reject hua**, toh poora batch turant fail (Fail-fast)!
- **\`Promise.allSettled()\`**: Sabhi ke settle hone ka wait karta hai chahe pass ho ya fail. Har task ka status aur result deta hai. Kabhi reject nahi hota!
- **\`Promise.race()\`**: Jo sabse pehle finish hoga (chahe resolve ho ya reject), uska result le lega. Network timeouts ke liye best hai.
- **\`Promise.any()\`**: Jo sabse pehle **resolve (success)** hoga use uthayega. Rejections ko ignore karta hai.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: Chaining, Parallel Batches & Timeout Racing",
        hi: "5. Practical Examples: Chaining, Parallel Execution aur Timeout Race",
      },
      body: {
        en: `### Example 1: Clean Linear Promise Chaining
Transforming the previous e-commerce callback hell into a clear, flat sequential chain.`,
        hi: `### Example 1: Clean Sequential Promise Chaining
E-commerce order flow ko linear chain mein convert karna jismein sirf 1 \`.catch()\` lagta hai.`,
      },
      code: {
        language: "javascript",
        filename: "promiseChaining.js",
        snippet: `// Example 1: Clean Sequential Promise Chain
const authenticate = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, username: "Arjun" }), 100);
  });
};

const getCart = (user) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ cartId: 442, items: ["Smartphone", "Cover"] }), 100);
  });
};

const processPayment = (cart) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random payment failure check
      const paymentSuccess = true;
      if (paymentSuccess) {
        resolve({ txnId: "TXN_9921", status: "PAID", amount: 24999 });
      } else {
        reject(new Error("Payment declined by bank"));
      }
    }, 100);
  });
};

// Beautiful flat chaining
authenticate("user_789")
  .then((user) => {
    console.log("1. Authenticated:", user.username);
    return getCart(user); // Returning a promise passes its resolved value to the next .then
  })
  .then((cart) => {
    console.log("2. Fetched Cart with items:", cart.items.join(", "));
    return processPayment(cart);
  })
  .then((receipt) => {
    console.log("3. Payment Complete! Txn ID:", receipt.txnId);
    return receipt.status;
  })
  .catch((err) => {
    // Single centralized error handler for ANY failure in the chain!
    console.error("Order processing aborted:", err.message);
  })
  .finally(() => {
    console.log("Checkout workflow terminated.");
  });`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Promise.all vs Promise.allSettled for Dashboard Widgets",
        hi: "Example 2: Promise.all vs Promise.allSettled Dashboard API Aggregation",
      },
      body: {
        en: `### Example 2: Concurrent API Calls for a Dashboard
When rendering multiple dashboard cards, \`Promise.allSettled\` prevents one failed widget from blanking the entire page.`,
        hi: `### Example 2: Dashboard Ke Multiple Widgets Fetch Karna
\`Promise.allSettled\` ka use taaki agar ek widget fail ho toh bhi baaki page load ho sake.`,
      },
      code: {
        language: "javascript",
        filename: "dashboardFetch.js",
        snippet: `// Example 2: Promise.allSettled for robust dashboards
const fetchUserProfile = () => Promise.resolve({ name: "Kavita", role: "Admin" });
const fetchNotifications = () => Promise.resolve(["New message", "System update"]);
const fetchAnalytics = () => Promise.reject(new Error("Analytics microservice 503 Unavailable"));

async function loadDashboard() {
  console.log("Fetching dashboard services in parallel...");

  const results = await Promise.allSettled([
    fetchUserProfile(),
    fetchNotifications(),
    fetchAnalytics()
  ]);

  results.forEach((res, index) => {
    const serviceName = ["Profile", "Notifications", "Analytics"][index];
    if (res.status === "fulfilled") {
      console.log(\`✅ [\${serviceName}]: Loaded successfully\`, res.value);
    } else {
      console.warn(\`⚠️ [\${serviceName}]: Failed gracefully -> \${res.reason.message}\`);
    }
  });
}

loadDashboard();`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Promise.race() for Network Request Timeouts",
        hi: "Example 3: Promise.race() Se Network Request Timeout Lagana",
      },
      body: {
        en: `### Example 3: Aborting Slow API Requests
Racing a slow network fetch against a strict timeout promise.`,
        hi: `### Example 3: Slow API Requests Par Timeout Constraint Lagana
Agar API 2 second se zyada le toh use abort/reject karne ke liye \`Promise.race\` ka real-world use.`,
      },
      code: {
        language: "javascript",
        filename: "promiseRaceTimeout.js",
        snippet: `// Example 3: Implementing an API Timeout with Promise.race()
function fetchWithTimeout(fetchPromise, timeoutMs = 2000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(\`Request timed out after \${timeoutMs}ms!\`));
    }, timeoutMs);
  });

  // Returns whichever finishes first!
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Simulated slow third-party API (takes 3500ms)
const slowWeatherAPI = new Promise((resolve) => {
  setTimeout(() => resolve({ temperature: 32, city: "Mumbai" }), 3500);
});

// Test with 2000ms threshold
fetchWithTimeout(slowWeatherAPI, 2000)
  .then((data) => console.log("Weather:", data))
  .catch((err) => console.error("Network Failure:", err.message));
// Logs: Network Failure: Request timed out after 2000ms!`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Mistakes with Promises",
        hi: "6. Promises Mein Hone Wali Badi Galtiyan",
      },
      mistakes: [
        {
          mistake: {
            en: "Nesting promises inside .then() callbacks (recreating Callback Hell with Promises).",
            hi: "`.then()` ke andar dobara promises nest karna (Promise Hell).",
          },
          correction: {
            en: "Always `return` the inner promise and chain another `.then()` at the top level to keep the chain flat.",
            hi: "Inner promise ko `return` karein aur agla `.then()` bahar top-level chain mein jodein.",
          },
          code: `// BAD (Nested Promise Hell):
getUser().then(u => {
  getOrders(u).then(o => {
    getInvoice(o).then(i => console.log(i));
  });
});

// GOOD (Flat linear chain):
getUser()
  .then(u => getOrders(u))
  .then(o => getInvoice(o))
  .then(i => console.log(i))
  .catch(err => console.error(err));`,
        },
        {
          mistake: {
            en: "Forgetting to return a value inside a .then() handler.",
            hi: "`.then()` handler ke andar se value return karna bhool jana.",
          },
          correction: {
            en: "If you don't return anything, the next `.then()` in the chain will receive `undefined` as its argument.",
            hi: "Agar aap return nahi karenge toh agli `.then()` step ko argument mein `undefined` milega.",
          },
          code: `// BUG:
fetchUser()
  .then(user => {
    user.name.toUpperCase(); // Forgot 'return'!
  })
  .then(capitalized => console.log(capitalized)); // undefined!`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Best Practices for Modern Asynchronous Code",
        hi: "7. Production Asynchronous Code Ke Best Practices",
      },
      body: {
        en: `- **Always Attach \`.catch()\` or Handle Rejections**: Unhandled promise rejections can crash modern Node.js processes.
- **Use \`Promise.allSettled\` for Independent Batches**: When batch-fetching independent data (e.g. notifications, user badges), never use \`Promise.all\` which aborts on a single failure.
- **Use \`Promise.resolve()\` / \`Promise.reject()\` for instant wrappers**: Convert existing synchronous values into promises instantly without creating a \`new Promise\` wrapper.`,
        hi: `- **Hamesha Rejections Handle Karein**: Node.js mein unhandled promise rejections process crash kar sakti hain.
- **Independent Calls Ke Liye \`Promise.allSettled\` Use Karein**: Agar multiple independent APIs hain toh \`Promise.all\` ki jagah \`allSettled\` use karein taaki ek ke fail hone se sab na rukein.
- **\`Promise.resolve()\` Shortcut**: Agar synchronous value ko turant Promise banana ho toh \`Promise.resolve(val)\` use karein.`,
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
            en: "What is the difference between Promise.all() and Promise.allSettled()?",
            hi: "Promise.all() aur Promise.allSettled() mein kya mukhya antar hai?",
          },
          a: {
            en: "Promise.all() is fail-fast: if any single promise rejects, the entire returned promise immediately rejects with that error, ignoring the remaining promises. Promise.allSettled() waits for ALL promises to complete regardless of their outcomes, returning an array of objects with status 'fulfilled' (and value) or 'rejected' (and reason). It never rejects.",
            hi: "Promise.all() fail-fast hota hai: agar ek bhi promise fail hui toh poora batch turant usi error ke saath fail ho jata hai. Jabki Promise.allSettled() sabhi promises ke khatam hone ka wait karta hai chahe pass hon ya fail, aur sabka result array of objects ke roop mein deta hai. Yeh kabhi reject nahi hota.",
          },
        },
        {
          q: {
            en: "Can a Promise change its state after being fulfilled or rejected?",
            hi: "Kya Promise ek baar fulfill ya reject hone ke baad apni state badal sakta hai?",
          },
          a: {
            en: "No. A promise state transition is strictly one-way and irreversible. Once settled, calling resolve() or reject() again has zero effect. The settled value or error reason is immutable.",
            hi: "Nahi. Promise ki state irreversible hoti hai. Ek baar jab promise resolve ya reject ho jata hai, uske baad dubara resolve() ya reject() call karne par koi asar nahi hota.",
          },
        },
        {
          q: {
            en: "In which queue do Promise callbacks (.then, .catch, .finally) execute in the Event Loop?",
            hi: "Event Loop mein Promise ke callbacks (.then, .catch) kis queue mein execute hote hain?",
          },
          a: {
            en: "Promise callbacks execute in the Microtask Queue (Job Queue). The Microtask Queue has higher priority than the Macrotask Queue (Callback Queue). The Event Loop drains all pending microtasks immediately after the Call Stack empties, before executing any macrotask like setTimeout or setInterval.",
            hi: "Promise callbacks Microtask Queue (Job Queue) mein jaate hain. Microtask Queue ki priority Macrotask Queue (setTimeout) se zyada hoti hai. Call stack khali hote hi pehle saare microtasks chalte hain, uske baad hi koi timer execute hota hai.",
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
        en: `- **States**: Pending -> Fulfilled OR Rejected (Immutable once settled).
- **Consuming**: \`.then()\` for success, \`.catch()\` for errors, \`.finally()\` for cleanup.
- **Combinators**:
  - \`Promise.all\`: All fulfill or first reject.
  - \`Promise.allSettled\`: Wait for all to finish; never rejects.
  - \`Promise.race\`: First to settle (fulfilled or rejected).
  - \`Promise.any\`: First to fulfill (ignores rejections).`,
        hi: `- **States**: Pending -> Fulfilled YA Rejected (Settle hone ke baad freeze).
- **Methods**: \`.then()\` (success), \`.catch()\` (error), \`.finally()\` (har haal mein).
- **Combinators**:
  - \`Promise.all\`: Sabhi pass hon ya pehla fail ho.
  - \`Promise.allSettled\`: Sabhi ke khatam hone ka wait karega.
  - \`Promise.race\`: Jo sabse pehle finish ho.
  - \`Promise.any\`: Jo pehla success resolve ho.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What will this code print?\n\nconst p = new Promise((resolve, reject) => {\n  resolve('A');\n  reject('B');\n  resolve('C');\n});\np.then(res => console.log(res));",
      "hi": "Yeh code kya print karega?\n\nconst p = new Promise((resolve, reject) => {\n  resolve('A');\n  reject('B');\n  resolve('C');\n});\np.then(res => console.log(res));"
    },
    "options": [
      {
        "en": "A",
        "hi": "A"
      },
      {
        "en": "B",
        "hi": "B"
      },
      {
        "en": "C",
        "hi": "C"
      },
      {
        "en": "A B C",
        "hi": "A B C"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "A promise can only be settled once. The first resolve('A') immediately locks its state to fulfilled. Subsequent reject and resolve calls are completely ignored.",
      "hi": "Promise sirf pehli baar hi settle hota hai. Pehla resolve('A') state ko lock kar deta hai, isliye baad ke reject('B') aur resolve('C') ignore ho jaate hain."
    }
  },
  {
    "q": {
      "en": "Which Promise combinator will NOT reject if one of the promises fails?",
      "hi": "Agar koi ek promise fail ho jaye, tab bhi kaunsa combinator reject nahi hota?"
    },
    "options": [
      {
        "en": "Promise.allSettled()",
        "hi": "Promise.allSettled()"
      },
      {
        "en": "Promise.all()",
        "hi": "Promise.all()"
      },
      {
        "en": "Promise.race()",
        "hi": "Promise.race()"
      },
      {
        "en": "Promise.reject()",
        "hi": "Promise.reject()"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Promise.allSettled() always resolves after every promise in the input array finishes, regardless of how many fulfilled or rejected.",
      "hi": "Promise.allSettled() sabhi input promises ke khatam hone ke baad hamesha resolve hota hai aur kabhi reject nahi hota."
    }
  },
  {
    "q": {
      "en": "What happens if you do not return anything inside a .then() callback?",
      "hi": "Agar aap `.then()` callback ke andar se kuch bhi return nahi karte, toh kya hota hai?"
    },
    "options": [
      {
        "en": "The subsequent .then() receives undefined",
        "hi": "Agla .then() undefined receive karta hai"
      },
      {
        "en": "The promise chain immediately rejects",
        "hi": "Promise chain turant reject ho jaati hai"
      },
      {
        "en": "The next .then() is skipped",
        "hi": "Agla .then() skip ho jata hai"
      },
      {
        "en": "A SyntaxError is thrown",
        "hi": "SyntaxError throw hota hai"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "In JavaScript, a function without an explicit return statement returns undefined. Thus, the resolved value passed to the next .then is undefined.",
      "hi": "JavaScript functions jinme return na ho wo undefined return karte hain, isliye agle .then ko undefined milta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Promises: States, Chaining & Combinators in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Promises: States, Chaining & Combinators (Deep Dive) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling promises: states, chaining & combinators with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Promises: States, Chaining & Combinators (Deep Dive) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Promises: States, Chaining & Combinators establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Promises: States, Chaining & Combinators directly resolve?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Promises: States, Chaining & Combinators, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Promises: States, Chaining & Combinators, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Promises: States, Chaining & Combinators, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Promises: States, Chaining & Combinators?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Promises: States, Chaining & Combinators be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Promises: States, Chaining & Combinators (Deep Dive) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Promises: States, Chaining & Combinators impact application memory and CPU consumption?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Promises: States, Chaining & Combinators?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Promises: States, Chaining & Combinators?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Promises: States, Chaining & Combinators?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Promises: States, Chaining & Combinators, what must the test suite assert?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Promises: States, Chaining & Combinators?",
      "hi": "Modular design Promises: States, Chaining & Combinators (Deep Dive) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Promises: States, Chaining & Combinators be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Promises: States, Chaining & Combinators (Deep Dive) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Promises: States, Chaining & Combinators properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Promises: States, Chaining & Combinators (Deep Dive) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Promises: States, Chaining & Combinators in production?",
      "hi": "Production mein Promises: States, Chaining & Combinators (Deep Dive) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Promises: States, Chaining & Combinators?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Promises: States, Chaining & Combinators?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Promises: States, Chaining & Combinators?",
      "hi": "Promises: States, Chaining & Combinators (Deep Dive) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
