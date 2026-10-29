export default {
  id: "js-event-loop-internals",
  title: {
    en: "Event Loop, Call Stack & Microtask Queue",
    hi: "Event Loop, Call Stack & Microtask Queue (Deep Dive)",
  },
  difficulty: "Advanced",
  readTime: 14,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Single-Threaded Nature of JavaScript",
        hi: "1. JavaScript Ka Single-Threaded Architecture",
      },
      body: {
        en: `JavaScript is a **single-threaded language**. This means it has only **one Call Stack** and can execute only **one statement at a time**.

Yet, modern JavaScript applications can perform thousands of concurrent operations—handling HTTP requests, database transactions, animations, and user inputs—without freezing. How is this possible?

The secret lies in the **JavaScript Runtime Environment** (provided by the browser or Node.js with \`libuv\`), which consists of:
1. **Memory Heap**: Where variables, objects, and memory allocations are stored.
2. **Call Stack**: Where functions are pushed when invoked and popped off when they return (LIFO: Last-In, First-Out).
3. **Web APIs (or Node C++ APIs)**: Background threads provided by the host environment for timers (\`setTimeout\`), network requests (\`fetch\`), and file IO (\`fs\`).
4. **Microtask Queue (Job Queue)**: High-priority queue reserved for Promise callbacks (\`.then\`, \`.catch\`, \`.finally\`), \`queueMicrotask()\`, and MutationObservers.
5. **Macrotask Queue (Task / Callback Queue)**: Standard queue for \`setTimeout\`, \`setInterval\`, \`setImmediate\`, and UI rendering events.
6. **The Event Loop**: A continuous, non-stop loop that monitors the Call Stack and queues.`,
        hi: `JavaScript ek **single-threaded language** hai. Iska matlab hai ki iske paas sirf **ek Call Stack** hota hai aur yeh ek samay par sirf **ek hi code statement** execute kar sakta hai.

Toh sawaal uthta hai: JavaScript bina freeze hue hazaron network requests aur database queries ek saath kaise sambhal leta hai?

Yeh kamal hai **JavaScript Runtime Environment** ka (Browser ya Node.js with \`libuv\`), jiske 6 mukhya ang hote hain:
1. **Memory Heap**: Jahan objects aur variables store hote hain.
2. **Call Stack**: Jahan chalne wale functions push aur pop hote hain (LIFO order).
3. **Web APIs (Node C++ APIs)**: Browser ya operating system ke background threads jo timers (\`setTimeout\`), fetch aur file reading ko background mein sambhalte hain.
4. **Microtask Queue**: VIP High-Priority queue jo Promises (\`.then\`, \`.catch\`) aur \`queueMicrotask()\` ke liye reserved hoti hai.
5. **Macrotask Queue**: Normal queue jismein \`setTimeout\`, \`setInterval\` aur click events aate hain.
6. **The Event Loop**: Ek continuous watchman jo stack aur queues ko lagataar monitor karta hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Exact Algorithm of the Event Loop",
        hi: "2. Event Loop Ka Exact Working Algorithm",
      },
      body: {
        en: `The Event Loop follows this strict, unyielding priority algorithm on every single tick:

\`\`\`
1. Check if the Call Stack is empty.
2. If NOT empty -> Wait. Never interrupt the currently executing synchronous code!
3. If EMPTY:
   a. Drain the ENTIRE Microtask Queue (execute every pending Promise callback until the queue is completely empty).
   b. If new microtasks are enqueued while draining, execute those too!
   c. Once ALL microtasks are exhausted -> Pick the OLDEST task from the Macrotask Queue and push it to the Call Stack.
   d. Execute that single macrotask until completion.
   e. Repeat the entire cycle!
\`\`\`

> **Core Insight**: Microtasks ALWAYS have absolute priority over Macrotasks. A \`setTimeout(..., 0)\` will NEVER run before pending Promise \`.then\` callbacks!`,
        hi: `Event Loop har moment par is strict algorithm ko follow karta hai:

\`\`\`
1. Dekho kya Call Stack khali hai?
2. Agar khali NAHI hai -> Wait karo. Chalte hue synchronous code ko beech mein mat roko!
3. Agar Call Stack KHALI ho gaya:
   a. Microtask Queue ko poora khali karo (saare pending Promises ek ke baad ek execute karo).
   b. Agar microtask chalte waqt naya microtask add ho jaye, use bhi usi waqt khatam karo!
   c. Jab Microtask Queue bilkul 0 ho jaye -> Macrotask Queue se SIRF 1 task uthao aur Stack pe bhejo.
   d. Us task ko poora execute karo.
   e. Wapas Step 1 par jao aur repeat karo!
\`\`\`

> **Golden Rule**: Microtasks ki priority hamesha Macrotasks se zyada hoti hai. \`setTimeout(..., 0)\` kabhi bhi Promise \`.then\` se pehle execute nahi ho sakta!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Single-Window Bank Teller & VIP Token Lane",
        hi: "Real-Life Analogy: Bank Ka Single Teller Counter Aur VIP Token Line",
      },
      body: {
        en: `Imagine a busy rural **State Bank of India branch with only ONE Cashier (The Call Stack)**:

- **Current Customer at Counter (Synchronous Code)**: The cashier is actively counting cash for Mr. Sharma. Nobody else can be served.
- **Deposit Slip Desk (Web APIs)**: Other customers are filling out Challan forms at the side tables. They don't block the cashier's window.
- **General Waiting Line (Macrotask Queue / setTimeout)**: Customers who finished filling their forms stand in the general line with tokens #1, #2, #3.
- **VIP Senior Citizen Desk (Microtask Queue / Promises)**: A special express lane exists for defense veterans and senior citizens.
- **The Bank Security Guard (The Event Loop)**:
  - As soon as Mr. Sharma leaves the window, the guard checks the **VIP Senior Citizen line (Microtasks)** first.
  - If 5 VIPs are in line, the guard serves ALL 5 of them before touching the general line!
  - Only when the VIP line is completely empty will the guard call the NEXT single customer from the general line.`,
        hi: `Sochiye **SBI Bank ki Branch** jahan cash lene-dene ke liye sirf **1 Cashier Window (Call Stack)** hai:

- **Window par khada customer (Synchronous Code)**: Cashier abhi Sharma ji ke note gin raha hai. Jab tak wo gin raha hai, koi doosra window par nahi aa sakta.
- **Form bharne ki side table (Web APIs)**: Baaki log side mein khade hokar deposit slip bhar rahe hain, wo cashier ka time block nahi kar rahe.
- **Normal Token Line (Macrotask Queue / setTimeout)**: Jin logo ka form bhar gaya wo normal chairs par aakar baith gaye (#1, #2, #3).
- **VIP / Emergency Line (Microtask Queue / Promises)**: Ek special express counter line hai VIP customers ke liye.
- **Guard Ki Duty (Event Loop)**:
  - Jaise hi Sharma ji ka kaam khatam hua, guard pehle **VIP line (Microtasks)** dekhta hai.
  - Agar VIP line mein 3 log khade hain, toh guard pehle un teeno ko niptayega!
  - Jab VIP line bilkul khali ho jayegi, tabhi guard normal chairs se agle **1** aam customer ko bulayega.`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. Execution Priority: Visualizing the Order",
        hi: "4. Execution Priority: Kaun Pehle Chalega?",
      },
      body: {
        en: `Understanding the priority hierarchy determines the exact output order of asynchronous scripts:

\`\`\`
1. Synchronous Main Script (Call Stack)
       ↓
2. process.nextTick() (Node.js microtask priority queue)
       ↓
3. Promises / queueMicrotask() (Standard Microtasks)
       ↓
4. setTimeout / setInterval / setImmediate (Macrotasks)
\`\`\`

Let's test this order with a famous interview challenge snippet:
\`\`\`javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2
\`\`\``,
        hi: `Asynchronous JavaScript mein execution ka order hamesha ye hota hai:

\`\`\`
1. Synchronous Code (Seedhe Call Stack par)
       ↓
2. process.nextTick() (Node.js ki super-priority queue)
       ↓
3. Promises / queueMicrotask() (Microtask Queue)
       ↓
4. setTimeout / setInterval (Macrotask Queue)
\`\`\`

Standard Interview Puzzle:
\`\`\`javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output order: 1, 4, 3, 2
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: Tracing Execution Order, Chunking & Node.js Timers",
        hi: "5. Practical Examples: Execution Order Trace, Heavy Loop Chunking aur Node.js Timers",
      },
      body: {
        en: `### Example 1: The Multi-Queue Execution Order Challenge
Traces every step through synchronous code, microtasks, and macrotasks.`,
        hi: `### Example 1: The Ultimate Event Loop Execution Order
Dekhiye kaise synchronous statements, nested promises aur timers stack par step-by-step execute hote hain.`,
      },
      code: {
        language: "javascript",
        filename: "eventLoopTrace.js",
        snippet: `// Example 1: Full Event Loop Lifecycle Trace
console.log("A: Synchronous Start");

// Macrotask 1
setTimeout(() => {
  console.log("B: Macrotask (setTimeout 0ms)");
}, 0);

// Microtask 1
Promise.resolve()
  .then(() => {
    console.log("C: Microtask 1 (Promise)");
    // Enqueue a nested microtask during microtask phase
    return Promise.resolve();
  })
  .then(() => {
    console.log("D: Microtask 2 (Chained Promise)");
  });

// Explicit Microtask
queueMicrotask(() => {
  console.log("E: Microtask 3 (queueMicrotask)");
});

console.log("F: Synchronous End");

// EXACT CONSOLE OUTPUT:
// A: Synchronous Start
// F: Synchronous End
// C: Microtask 1 (Promise)
// E: Microtask 3 (queueMicrotask)
// D: Microtask 2 (Chained Promise)
// B: Macrotask (setTimeout 0ms)`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Non-Blocking CPU Chunking with setTimeout",
        hi: "Example 2: Heavy Loop Ko Chunk Karke Browser Freeze Hone Se Bachana",
      },
      body: {
        en: `### Example 2: Chunking Heavy Computation
A continuous synchronous loop with 100,000,000 iterations freezes the UI thread completely (no scrolling or clicks). Breaking it into macrotasks yields control back to the browser!`,
        hi: `### Example 2: CPU-Intensive Tasks Ko Split Karna
Bade 10 crore calculation loops ko \`setTimeout(..., 0)\` se todna taaki webpage freeze na ho aur smooth chale.`,
      },
      code: {
        language: "javascript",
        filename: "chunkComputation.js",
        snippet: `// Example 2: Breaking heavy loops into non-blocking macrotasks
function processHugeDataset(totalItems = 100000, chunkSize = 10000) {
  let processed = 0;

  function doChunk() {
    const end = Math.min(processed + chunkSize, totalItems);
    for (; processed < end; processed++) {
      // Intensive mathematical computation simulation
      Math.sqrt(processed) * Math.sin(processed);
    }

    console.log(\`Progress: \${((processed / totalItems) * 100).toFixed(0)}% processed\`);

    if (processed < totalItems) {
      // Yield to Event Loop! Allows UI rendering, clicks, and animations to run!
      setTimeout(doChunk, 0);
    } else {
      console.log("All data chunks processed cleanly without freezing UI!");
    }
  }

  doChunk();
}

processHugeDataset();`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Node.js Specific Phases: process.nextTick vs setImmediate",
        hi: "Example 3: Node.js Internals: process.nextTick vs setImmediate",
      },
      body: {
        en: `### Example 3: Node.js Concurrency Queues
In Node.js, \`process.nextTick()\` runs before any standard Promise microtasks, and \`setImmediate()\` is designed for check phase execution.`,
        hi: `### Example 3: Node.js Concurrency Internals
Node.js runtime mein \`nextTick\` aur \`setImmediate\` ka special behavior samjhein.`,
      },
      code: {
        language: "javascript",
        filename: "nodeEventLoop.js",
        snippet: `// Example 3: Node.js Specific Timing Mechanics
console.log("1: Main Thread Script");

// Node.js Macrotask Check phase
setTimeout(() => {
  console.log("2: setTimeout Timer phase");
}, 0);

// Node.js Immediate phase
if (typeof setImmediate !== "undefined") {
  setImmediate(() => {
    console.log("3: setImmediate Check phase");
  });
}

// Microtask Queue
Promise.resolve().then(() => {
  console.log("4: Promise Microtask");
});

// Highest priority microtask in Node.js
if (typeof process !== "undefined" && process.nextTick) {
  process.nextTick(() => {
    console.log("5: process.nextTick (Top priority!)");
  });
}

console.log("6: Main Thread Done");

// Typical Node.js Output:
// 1: Main Thread Script
// 6: Main Thread Done
// 5: process.nextTick (Top priority!)
// 4: Promise Microtask
// 2: setTimeout Timer phase (or 3 depending on IO phase entry)
// 3: setImmediate Check phase`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Mistakes & The 'Microtask Starvation' Trap",
        hi: "6. Event Loop Ki Galtiyan Aur Microtask Starvation",
      },
      mistakes: [
        {
          mistake: {
            en: "Infinite Microtask Recursion (Microtask Starvation).",
            hi: "Recursively microtasks schedule karna jisse Macrotask Queue starve ho jati hai aur UI freeze ho jata hai.",
          },
          correction: {
            en: "Because the Event Loop drains ALL microtasks before moving to macrotasks or UI repainting, recursively enqueuing microtasks (via Promise.resolve() or queueMicrotask) will freeze the browser indefinitely! Use setTimeout(..., 0) if you need cooperative yielding.",
            hi: "Event Loop microtasks ko poora khali karne ke baad hi browser repaint karta hai. Agar microtask ke andar microtask schedule karte rahenge toh UI hamesha ke liye atak jayega. Yield karne ke liye `setTimeout(..., 0)` use karein.",
          },
          code: `// DANGEROUS CRASH LOOP (Freezes tab completely):
// function starve() {
//   Promise.resolve().then(starve);
// }
// starve(); // Browser will hang and crash!

// SAFE YIELDING LOOP:
function safeYield() {
  setTimeout(safeYield, 0); // Allows browser to render between ticks
}`,
        },
        {
          mistake: {
            en: "Assuming setTimeout(fn, 1000) will execute at exactly 1000ms.",
            hi: "Yeh manna ki setTimeout(fn, 1000) theek 1000ms baad hi chalega.",
          },
          correction: {
            en: "The delay in setTimeout represents the MINIMUM wait time, not guaranteed exact timing. If the Call Stack is busy executing heavy synchronous code at 1000ms, the callback must wait until the stack is completely clear.",
            hi: "setTimeout ka delay MINIMUM time hota hai. Agar 1000ms par Call Stack busy hua, toh callback tab tak wait karega jab tak stack khali nahi ho jata.",
          },
          code: `setTimeout(() => console.log("Fired"), 1000);

// If this synchronous loop takes 3000ms to finish:
const end = Date.now() + 3000;
while (Date.now() < end) {} // Blocks stack for 3 seconds!

// The setTimeout callback will fire after ~3000ms, NOT 1000ms!`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Best Practices for Event Loop Optimization",
        hi: "7. Event Loop Optimization Ke Best Practices",
      },
      body: {
        en: `- **Never Block the Main Thread**: Avoid running heavy cryptographic or image-processing loops on the main thread. Offload CPU-bound tasks to Web Workers (browser) or Worker Threads (Node.js).
- **Use \`requestAnimationFrame\` for Visuals**: In browsers, coordinate DOM animations with the browser's refresh rate using \`requestAnimationFrame()\` rather than \`setInterval()\`.
- **Prefer Promises for Fast Asynchrony**: Microtasks execute immediately after the current stack frame, making them significantly faster and more responsive than macrotasks.`,
        hi: `- **Main Thread Ko Kabhi Block Na Karein**: Heavy calculations (jaise image filter ya heavy cryptography) ko Worker Threads par bhejein.
- **Animations Ke Liye \`requestAnimationFrame\`**: Browser animations ke liye \`setInterval\` ki jagah \`requestAnimationFrame\` use karein taaki smooth 60fps frame rate mile.
- **Fast Response Ke Liye Promises**: Microtasks stack khali hote hi bina delay ke chalte hain, isliye normal async data handling ke liye Promises best hain.`,
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
            en: "What is the difference between the Microtask Queue and the Macrotask Queue?",
            hi: "Microtask Queue aur Macrotask Queue mein kya antar hai?",
          },
          a: {
            en: "The Microtask Queue (Job Queue) holds high-priority tasks like Promise .then/.catch callbacks, queueMicrotask(), and process.nextTick. The Macrotask Queue holds tasks from setTimeout, setInterval, setImmediate, and I/O events. The Event Loop prioritizes the Microtask Queue: whenever the Call Stack empties, it drains ALL pending microtasks completely before taking even a single task from the Macrotask Queue.",
            hi: "Microtask Queue mein high-priority tasks hote hain jaise Promise .then callbacks aur queueMicrotask. Macrotask Queue mein setTimeout, setInterval aur I/O tasks hote hain. Event Loop hamesha Microtask Queue ko pehle poora khali karta hai, uske baad hi Macrotask Queue se ek task uthata hai.",
          },
        },
        {
          q: {
            en: "Why is JavaScript called 'single-threaded non-blocking'?",
            hi: "JavaScript ko 'single-threaded non-blocking' kyun kaha jata hai?",
          },
          a: {
            en: "It is single-threaded because the V8 engine has only one Call Stack and executes code one instruction at a time. It is non-blocking because long-running tasks (network fetch, timers, disk reads) are offloaded to background C++ threads provided by the browser or libuv. When finished, their callbacks are queued and executed later via the Event Loop without halting the main thread.",
            hi: "Single-threaded isliye kyunki V8 engine ke paas sirf ek Call Stack hota hai aur ek waqt mein ek line chalti hai. Non-blocking isliye kyunki heavy tasks (jaise network request ya file read) background C++ threads (libuv/browser) ko de diye jaate hain, aur unka result aane par Event Loop callback ko stack pe bhej deta hai bina main thread ko roke.",
          },
        },
        {
          q: {
            en: "What will this output?\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
            hi: "Is code ka output sequence kya hoga?\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
          },
          a: {
            en: "Output: 1, 4, 3, 2. 1 and 4 log first because they are synchronous. The Promise callback is placed in the Microtask Queue, while setTimeout(0) is placed in the Macrotask Queue. As soon as synchronous execution completes, the Event Loop drains microtasks first (logging 3), and finally executes the macrotask (logging 2).",
            hi: "Output: 1, 4, 3, 2. 1 aur 4 synchronous code hain toh pehle print honge. Promise ka callback Microtask Queue mein jata hai aur setTimeout ka callback Macrotask Queue mein. Synchronous code khatam hote hi Event Loop pehle Microtask ko chalayega (3 print hoga), aur last mein Macrotask chalega (2 print hoga).",
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
        en: `- **Call Stack**: Executes synchronous code (LIFO).
- **Web/Host APIs**: Background threads for timers, fetch, and disk IO.
- **Microtask Queue**: Promises, queueMicrotask (Drained COMPLETELY first).
- **Macrotask Queue**: setTimeout, setInterval (One task executed per tick).
- **Golden Priority**: Synchronous > Microtasks > Macrotasks.`,
        hi: `- **Call Stack**: Synchronous code execute karta hai (LIFO).
- **Web/Host APIs**: Background operations handle karte hain.
- **Microtask Queue**: Promises aur microtasks (Hamesha pehle poora khali hoga).
- **Macrotask Queue**: setTimeout, setInterval (Har round mein sirf 1 task).
- **Priority Sequence**: Synchronous > Microtasks > Macrotasks.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What will be printed to the console?\n\nconsole.log('Start');\nsetTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\nconsole.log('End');",
      "hi": "Console par kya print hoga?\n\nconsole.log('Start');\nsetTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\nconsole.log('End');"
    },
    "options": [
      {
        "en": "Start, End, Promise, Timeout",
        "hi": "Start, End, Promise, Timeout"
      },
      {
        "en": "Start, Timeout, Promise, End",
        "hi": "Start, Timeout, Promise, End"
      },
      {
        "en": "Start, Promise, Timeout, End",
        "hi": "Start, Promise, Timeout, End"
      },
      {
        "en": "Start, End, Timeout, Promise",
        "hi": "Start, End, Timeout, Promise"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Start and End run synchronously. Then the Event Loop drains the Microtask Queue ('Promise') before pulling from the Macrotask Queue ('Timeout').",
      "hi": "Start aur End pehle synchronously chalte hain. Fir Event Loop Microtask Queue se 'Promise' print karta hai aur aakhiri mein Macrotask se 'Timeout'."
    }
  },
  {
    "q": {
      "en": "How many tasks does the Event Loop take from the Macrotask Queue in a single iteration before checking microtasks again?",
      "hi": "Event Loop microtasks ko dobara check karne se pehle Macrotask Queue se ek baar mein kitne tasks uthata hai?"
    },
    "options": [
      {
        "en": "Exactly 1 macrotask",
        "hi": "Sirf aur sirf 1 macrotask"
      },
      {
        "en": "All pending macrotasks",
        "hi": "Saare pending macrotasks"
      },
      {
        "en": "Up to 10 macrotasks",
        "hi": "Zyada se zyada 10 macrotasks"
      },
      {
        "en": "It alternates between both queues equally",
        "hi": "Dono queues se barabar tasks uthata hai"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "The Event Loop executes exactly one macrotask from the queue, then immediately checks and drains the entire Microtask Queue before taking the next macrotask.",
      "hi": "Event Loop Macrotask Queue se sirf 1 task uthata hai, use execute karta hai, aur turant Microtask Queue check karne wapas chala jata hai."
    }
  },
  {
    "q": {
      "en": "Which API has higher priority in Node.js than standard Promise.then() microtasks?",
      "hi": "Node.js mein standard Promise.then() se bhi zyada priority kiski hoti hai?"
    },
    "options": [
      {
        "en": "process.nextTick()",
        "hi": "process.nextTick()"
      },
      {
        "en": "setTimeout()",
        "hi": "setTimeout()"
      },
      {
        "en": "setImmediate()",
        "hi": "setImmediate()"
      },
      {
        "en": "fs.readFile()",
        "hi": "fs.readFile()"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "In Node.js, the nextTick queue is processed immediately before the standard Promise microtask queue at every phase boundary.",
      "hi": "Node.js mein process.nextTick ki apni alag express queue hoti hai jo Promise microtasks se bhi pehle execute hoti hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Event Loop, Call Stack & Microtask Queue in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Event Loop, Call Stack & Microtask Queue (Deep Dive) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling event loop, call stack & microtask queue with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Event Loop, Call Stack & Microtask Queue (Deep Dive) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Event Loop, Call Stack & Microtask Queue establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Event Loop, Call Stack & Microtask Queue directly resolve?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Event Loop, Call Stack & Microtask Queue, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Event Loop, Call Stack & Microtask Queue, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Event Loop, Call Stack & Microtask Queue, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Event Loop, Call Stack & Microtask Queue?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Event Loop, Call Stack & Microtask Queue be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Event Loop, Call Stack & Microtask Queue (Deep Dive) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Event Loop, Call Stack & Microtask Queue impact application memory and CPU consumption?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Event Loop, Call Stack & Microtask Queue?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Event Loop, Call Stack & Microtask Queue?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Event Loop, Call Stack & Microtask Queue?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Event Loop, Call Stack & Microtask Queue, what must the test suite assert?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Event Loop, Call Stack & Microtask Queue?",
      "hi": "Modular design Event Loop, Call Stack & Microtask Queue (Deep Dive) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Event Loop, Call Stack & Microtask Queue be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Event Loop, Call Stack & Microtask Queue (Deep Dive) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Event Loop, Call Stack & Microtask Queue properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Event Loop, Call Stack & Microtask Queue (Deep Dive) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Event Loop, Call Stack & Microtask Queue in production?",
      "hi": "Production mein Event Loop, Call Stack & Microtask Queue (Deep Dive) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Event Loop, Call Stack & Microtask Queue?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Event Loop, Call Stack & Microtask Queue?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Event Loop, Call Stack & Microtask Queue?",
      "hi": "Event Loop, Call Stack & Microtask Queue (Deep Dive) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
