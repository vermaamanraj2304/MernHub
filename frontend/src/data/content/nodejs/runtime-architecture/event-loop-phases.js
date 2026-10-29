export default {
  id: "node-event-loop-phases",
  title: {
    en: "The Node.js Event Loop Phases",
    hi: "Node.js Event Loop Ke 6 Phases Explained",
  },
  difficulty: "Advanced",
  readTime: 13,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The 6 Phases of the Node.js Event Loop",
        hi: "1. Node.js Event Loop Ke 6 Alag Phases",
      },
      body: {
        en: `While the browser's Event Loop has a relatively simple model (Microtasks vs Macrotasks), **Node.js has a sophisticated multi-phase Event Loop** managed by libuv.

Each iteration (tick) of the Node.js Event Loop moves through **6 distinct phases** in a strict circular order:

\`\`\`
   ┌───────────────────────┐
┌─>│        TIMERS         │  -> Executes setTimeout & setInterval callbacks
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │   PENDING CALLBACKS   │  -> Executes deferred I/O callbacks (e.g., TCP socket errors)
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     IDLE, PREPARE     │  -> Used internally by Node.js only
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │         POLL          │  -> Retrieves new I/O events; executes I/O related callbacks
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │        CHECK          │  -> Executes setImmediate() callbacks
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │    CLOSE CALLBACKS    │  -> Executes close callbacks (e.g. socket.on('close'))
└──┴───────────────────────┘
\`\`\`

### The Microtask Interceptors (Crucial!)
Between **EVERY phase transition**, Node.js pauses to completely drain:
1. **\`process.nextTick\` Queue**: The highest priority microtask queue in Node.js.
2. **Standard Promise Microtask Queue**: Promises (\`.then\`, \`.catch\`, \`queueMicrotask\`).`,
        hi: `Browser ke event loop mein sirf Microtask aur Macrotask hote hain, lekin **Node.js ke libuv Event Loop mein 6 alag-alag phases hote hain**.

Har round (tick) mein Event Loop ek-ek karke in 6 phases mein ghoomta hai:

1. **Timers Phase**: \`setTimeout\` aur \`setInterval\` ke expired callbacks execute karta hai.
2. **Pending Callbacks Phase**: Deferred I/O errors (jaise TCP socket connect failure) ko execute karta hai.
3. **Idle, Prepare Phase**: Node.js internally apne system maintenance ke liye use karta hai.
4. **Poll Phase**: Sabse lamba phase jahan nayi incoming HTTP requests aur database responses aate hain aur process hote hain.
5. **Check Phase**: Sirf \`setImmediate()\` callbacks ke liye dedicated phase.
6. **Close Callbacks Phase**: Band hone wale resources ke callbacks (jaise \`socket.on('close')\`).

### Har Phase Ke Beech Ka VIP Checkpoint:
Har phase khatam hote hi agle phase mein jaane se pehle Node.js do queues ko poora khali karta hai:
1. **\`process.nextTick\` Queue**: Node.js ki sabse powerful express queue.
2. **Promise Microtask Queue**: Standard \`Promise.then\` callbacks.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Mystery of setImmediate vs setTimeout",
        hi: "2. setImmediate() vs setTimeout() Ka Secret",
      },
      body: {
        en: `Two of the most frequently asked questions in Node.js interviews are:
> *"What is the difference between \`setImmediate()\` and \`setTimeout(..., 0)\`?"*
> *"Which one runs first?"*

The answer depends entirely on **where they are called**:

### Scenario A: In the Main Top-Level Script
If invoked in the main module, the execution order is **non-deterministic**!
Because \`setTimeout(fn, 0)\` actually has a minimum 1ms boundary in Node.js, depending on how fast the CPU schedules the process, the timer may or may not have expired before the event loop enters the Timers phase.

### Scenario B: Inside an I/O Cycle (e.g. fs.readFile)
Inside an I/O callback, **\`setImmediate\` is GUARANTEED to execute BEFORE \`setTimeout\`**!
Why? Because an I/O callback finishes inside the **Poll phase**. The next phase in the loop is the **Check phase** (where \`setImmediate\` lives), whereas the **Timers phase** requires cycling all the way around to the next tick!`,
        hi: `Node.js interviews ka sabse classic sawaal:
> *"setImmediate() aur setTimeout(..., 0) mein kya farq hai aur kaun pehle chalega?"*

Jawab is baat par depend karta hai ki code kahan likha gaya hai:

### Case 1: Top-Level Script Mein (File ke root par)
Yahan inka chalne ka sequence **unpredictable (random)** hota hai!
Node.js mein \`setTimeout(0)\` ko prepare hone mein ~1ms lagta hai. Agar CPU fast hua toh Timers pehle chal jayega, agar slow hua toh Check phase (\`setImmediate\`) pehle chal jayega.

### Case 2: Kisi I/O Callback Ke Andar (jaise fs.readFile)
I/O callback ke andar **\`setImmediate\` HAMESHA \`setTimeout\` se pehle chalega (100% Guaranteed)**!
Kyunki I/O callback **Poll Phase** mein execute hota hai. Poll phase ke theek baad agla phase **Check Phase** hota hai (jahan \`setImmediate\` baitha hai). Jabki \`setTimeout\` ke liye loop ko poora ghoomkar agle tick ke Timers phase mein aana padega!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The City Roundabout Traffic Controller",
        hi: "Real-Life Analogy: 6 Rasto Wala Traffic Golchakkar",
      },
      body: {
        en: `Imagine a major **City Traffic Roundabout with 6 Ring Exits**:

1. **Exit 1 (Timers Gate)**: Vehicles that have a timer ticket (Alarm clocks).
2. **Exit 2 (System Errors Gate)**: Broken down ambulances and repair vans.
3. **Exit 3 (Police Station Gate)**: Police maintenance vehicle inspection (Idle/Prepare).
4. **Exit 4 (Main Bazaar Gate - Poll Phase)**: The main market entrance where 95% of fresh vegetables and goods arrive (File and Network I/O). The traffic cop waits here until goods arrive!
5. **Exit 5 (Express Check Gate - setImmediate)**: A special express bypass for quick immediate deliveries.
6. **Exit 6 (Toll Exit Gate - Close Callbacks)**: Cars leaving the city (Sockets closing).

And the **Green Emergency Corridor (\`process.nextTick\`)**:
Whenever a VIP convoy arrives, the traffic cop halts the entire roundabout, lets the VIP convoy pass, and only then resumes the circular route!`,
        hi: `Sochiye ek bada **Traffic Roundabout (Golchakkar)** jismein 6 alag gates hain:

1. **Gate 1 (Timers Gate)**: Wo gaadiyan jinka timer alarm baj chuka hai (\`setTimeout\`).
2. **Gate 2 (Pending I/O)**: System error wali gaadiyan.
3. **Gate 3 (Maintenance)**: Internal police checks.
4. **Gate 4 (Main Mandi Gate - Poll Phase)**: Jahan 90% naya saaman (HTTP requests, database files) aata hai. Traffic cop yahan ruk kar gaadiyo ka wait karta hai.
5. **Gate 5 (Express Gate - setImmediate)**: Ek fast bypass gate jo Poll ke theek baad khulta hai.
6. **Gate 6 (Exit Gate)**: Purane connections band hone ka gate.

Aur **VIP Ambulance Lane (\`process.nextTick\`)**:
Jaise hi VIP ambulance aati hai, golchakkar ka saara traffic ruk jata hai aur pehle use rasta diya jata hai!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. Execution Sequence Between Phases",
        hi: "4. Phases Ke Beech Execution Sequence",
      },
      body: {
        en: `Whenever a phase in the Event Loop finishes, Node.js checks:
\`\`\`
Current Phase ends
       ↓
Check process.nextTick Queue (run all until empty)
       ↓
Check Promise Microtask Queue (run all until empty)
       ↓
Move to Next Event Loop Phase
\`\`\`

This means \`process.nextTick\` runs immediately after the current operation completes, before the Event Loop advances to any other phase!`,
        hi: `Har phase ke khatam hote hi Event Loop yeh order follow karta hai:
\`\`\`
Current Phase complete
       ↓
process.nextTick Queue ko poora khali karo
       ↓
Promise Microtask Queue ko poora khali karo
       ↓
Agle Event Loop Phase par aage badho
\`\`\`

Iska matlab hai ki \`process.nextTick\` agle phase par jaane se pehle hi turant execute ho jata hai!`,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: setImmediate vs setTimeout & nextTick Traces",
        hi: "5. Practical Examples: setImmediate vs setTimeout aur Phase Tracing",
      },
      body: {
        en: `### Example 1: Proving setImmediate Wins Inside I/O Callbacks
This test demonstrates why setImmediate always executes first when scheduled inside a file read or socket callback.`,
        hi: `### Example 1: I/O Callback Ke Andar setImmediate Ki Jeet
Dekhiye kaise Poll phase ke baad Check phase aane ki wajah se setImmediate hamesha setTimeout se pehle chalta hai.`,
      },
      code: {
        language: "javascript",
        filename: "setImmediateVsTimeout.js",
        snippet: `// Example 1: setImmediate vs setTimeout inside an I/O callback
const fs = require("fs");

console.log("1. Starting I/O read test...");

// Trigger an asynchronous file read (simulated I/O)
fs.readFile(__filename, () => {
  console.log("\\n--- Inside fs.readFile I/O Callback (Poll Phase) ---");

  // Scheduled to Timers phase (requires full loop cycle)
  setTimeout(() => {
    console.log("TIMERS PHASE: setTimeout(0ms) fired!");
  }, 0);

  // Scheduled to Check phase (executes IMMEDIATELY next!)
  setImmediate(() => {
    console.log("CHECK PHASE: setImmediate() fired!");
  });

  // Microtask
  process.nextTick(() => {
    console.log("VIP MICROTASK: process.nextTick() fired!");
  });
});

console.log("2. Main script finished.");

// GUARANTEED CONSOLE ORDER:
// 1. Starting I/O read test...
// 2. Main script finished.
// --- Inside fs.readFile I/O Callback (Poll Phase) ---
// VIP MICROTASK: process.nextTick() fired!
// CHECK PHASE: setImmediate() fired!  <-- Always beats setTimeout!
// TIMERS PHASE: setTimeout(0ms) fired!`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: The process.nextTick Starvation Bug",
        hi: "Example 2: process.nextTick Se Event Loop Starvation",
      },
      body: {
        en: `### Example 2: Starving the Event Loop with Recursive nextTick
Because \`process.nextTick\` runs recursively before entering the next phase, calling it continuously starves I/O and timers forever!`,
        hi: `### Example 2: nextTick Ka Khatra (Event Loop Starvation)
Agar \`process.nextTick\` recursively call hota rahega toh Event Loop agle phase par ja hi nahi payega aur saare timers aur I/O atak jayenge.`,
      },
      code: {
        language: "javascript",
        filename: "nextTickStarvation.js",
        snippet: `// Example 2: Starvation demonstration
let count = 0;

// This timer is scheduled for 50ms, but will it ever fire?
setTimeout(() => {
  console.log("Timer finally fired after delay!");
}, 50);

function recursiveTick() {
  count++;
  if (count <= 500000) {
    // Keeps adding to nextTick queue, starving the Timers phase!
    process.nextTick(recursiveTick);
  } else {
    console.log(\`Finished \${count} recursive nextTicks. Event Loop now resumes!\`);
  }
}

console.log("Starting nextTick flood...");
recursiveTick();
// Notice how the 50ms timer is delayed until all 500,000 nextTicks finish!`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Comprehensive Multi-Phase Execution Challenge",
        hi: "Example 3: Complete Phase Order Tracing Script",
      },
      body: {
        en: `### Example 3: Full Stack Phase Trace
A complete script mapping the interplay between Main thread, nextTick, Promises, Timers, and setImmediate.`,
        hi: `### Example 3: Saare Phases Ka Combined Execution Trace
Ek detailed script jo Node.js ke internal sequence ko console par clear karti hai.`,
      },
      code: {
        language: "javascript",
        filename: "fullEventLoopTrace.js",
        snippet: `// Example 3: Multi-phase execution order
console.log("1. Synchronous main start");

setTimeout(() => {
  console.log("2. Timers Phase: setTimeout 1");
  process.nextTick(() => console.log("3. nextTick inside setTimeout"));
}, 0);

setImmediate(() => {
  console.log("4. Check Phase: setImmediate");
});

Promise.resolve().then(() => {
  console.log("5. Microtask: Promise 1");
});

process.nextTick(() => {
  console.log("6. nextTick: Priority 1");
});

console.log("7. Synchronous main end");

// Output Sequence:
// 1. Synchronous main start
// 7. Synchronous main end
// 6. nextTick: Priority 1
// 5. Microtask: Promise 1
// 2. Timers Phase: setTimeout 1 (or 4 depending on root tick)
// 3. nextTick inside setTimeout
// 4. Check Phase: setImmediate`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Mistakes with Event Loop Phases",
        hi: "6. Event Loop Phases Ki Badi Galtiyan",
      },
      mistakes: [
        {
          mistake: {
            en: "Using process.nextTick() for normal asynchronous code instead of setImmediate() or Promises.",
            hi: "Har jagah `process.nextTick()` use karna jisse I/O operations starve ho jaati hain.",
          },
          correction: {
            en: "Reserve `process.nextTick()` only for crucial scenarios where you MUST allow an event listener to be bound before an event fires synchronously. For general deferrals, always prefer `setImmediate()` which plays nicely with the Event Loop phases.",
            hi: "Aam async tasks ke liye hamesha `setImmediate()` use karein. `process.nextTick()` sirf tab use karein jab kisi event emitter ko sync constructor ke baad turant run karna ho.",
          },
          code: `// DANGEROUS:
// process.nextTick(heavyFunction);

// RECOMMENDED:
setImmediate(heavyFunction); // Allows other I/O to breathe`,
        },
        {
          mistake: {
            en: "Blocking the Poll Phase by performing synchronous I/O methods like `fs.readFileSync` in production request handlers.",
            hi: "Production API handlers mein `fs.readFileSync` jaise synchronous functions call karna.",
          },
          correction: {
            en: "Never use synchronous methods (`readFileSync`, `writeFileSync`, `pbkdf2Sync`) inside request-response pipelines. They freeze the poll phase and block all other incoming requests from being accepted.",
            hi: "Express handlers mein kabhi bhi Sync methods na use karein. Yeh poll phase ko block karke doosre users ke liye server ko pause kar dete hain.",
          },
          code: `// DISASTROUS ANTI-PATTERN:
// app.get('/data', (req, res) => {
//   const data = fs.readFileSync('huge.json'); // Freezes entire server!
// });

// PROPER ASYNCHRONOUS PATTERN:
// app.get('/data', async (req, res) => {
//   const data = await fs.promises.readFile('huge.json');
// });`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Production Best Practices for Node Phases",
        hi: "7. Node Event Loop Ke Best Practices",
      },
      body: {
        en: `- **Use \`setImmediate\` to break up CPU work**: If an algorithm requires processing a large dataset in segments, schedule subsequent chunks with \`setImmediate()\` so I/O events remain responsive.
- **Do not abuse \`process.nextTick\`**: Calling nextTick too frequently blocks libuv from reaching the poll phase where incoming network connections wait.
- **Monitor Event Loop Lag**: In production, use monitoring libraries like \`event-loop-lag\` or \`clinic.js\` to detect if phases are suffering from high latency.`,
        hi: `- **Chunking Ke Liye \`setImmediate\` Use Karein**: Heavy processing ko split karte waqt agla chunk \`setImmediate()\` se schedule karein taaki network I/O smoothly chalti rahe.
- **nextTick Ko Sambhal Kar Use Karein**: nextTick ka unnecessary use I/O poll phase ko starve kar sakta hai.
- **Event Loop Lag Monitor Karein**: Production mein clinic.js ya monitoring tools se check karein ki loop tick delay kitna hai.`,
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
            en: "What are the 6 phases of the Node.js Event Loop in exact order?",
            hi: "Node.js Event Loop ke 6 phases exact sequence mein kya hain?",
          },
          a: {
            en: "1) Timers (setTimeout, setInterval), 2) Pending Callbacks (I/O errors), 3) Idle/Prepare (internal), 4) Poll (retrieves new I/O events and executes I/O callbacks), 5) Check (setImmediate), 6) Close Callbacks (socket.on('close')).",
            hi: "1) Timers (setTimeout/setInterval), 2) Pending Callbacks (system errors), 3) Idle/Prepare (internal), 4) Poll (I/O events aur data fetch), 5) Check (setImmediate), 6) Close Callbacks (connection close).",
          },
        },
        {
          q: {
            en: "Why is setImmediate guaranteed to run before setTimeout(..., 0) inside an I/O callback?",
            hi: "I/O callback ke andar setImmediate hamesha setTimeout se pehle kyun chalta hai?",
          },
          a: {
            en: "Because I/O callbacks are processed in the Poll phase. The phase directly following Poll in the event loop cycle is the Check phase, which executes setImmediate. To reach the Timers phase (where setTimeout lives), the event loop would have to complete the Check phase, Close callbacks, and loop around to the beginning of the next tick.",
            hi: "Kyunki I/O callbacks Poll phase mein execute hote hain. Poll phase ke theek baad Check phase aata hai (jismein setImmediate execute hota hai). setTimeout ko execute karne ke liye loop ko poora ghoom kar agle tick ke Timers phase mein jana padta hai.",
          },
        },
        {
          q: {
            en: "What is the difference between process.nextTick() and setImmediate()?",
            hi: "process.nextTick() aur setImmediate() mein kya fundamental difference hai?",
          },
          a: {
            en: "Despite their confusing names, process.nextTick() executes immediately after the current operation finishes, before the Event Loop transitions to ANY phase. setImmediate() is queued specifically for the Check phase of the Event Loop.",
            hi: "Naam ulta lagta hai par process.nextTick current operation khatam hote hi agle kisi bhi phase mein jaane se pehle turant execute hota hai. Jabki setImmediate() Event Loop ke Check phase mein execute hota hai.",
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
        en: `- **6 Phases**: Timers -> Pending -> Idle -> Poll -> Check -> Close.
- **Poll Phase**: Where incoming I/O lives and spends most of its time.
- **Check Phase**: Dedicated exclusively to \`setImmediate()\`.
- **nextTick vs Microtasks**: Both drain between phase transitions; \`process.nextTick\` runs first.
- **Rule**: Never block the Poll phase with synchronous I/O!`,
        hi: `- **6 Phases**: Timers -> Pending -> Idle -> Poll -> Check -> Close.
- **Poll Phase**: Jahan 90% requests process hoti hain.
- **Check Phase**: Sirf \`setImmediate()\` ke liye.
- **Priority**: \`process.nextTick\` > Promise Microtasks > Event Loop Phases.
- **Golden Rule**: Poll phase mein sync methods se server block na karein.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "Which phase of the Node.js Event Loop executes setImmediate() callbacks?",
      "hi": "Node.js Event Loop ka kaunsa phase setImmediate() callbacks ko execute karta hai?"
    },
    "options": [
      {
        "en": "Check Phase",
        "hi": "Check Phase"
      },
      {
        "en": "Timers Phase",
        "hi": "Timers Phase"
      },
      {
        "en": "Poll Phase",
        "hi": "Poll Phase"
      },
      {
        "en": "Pending Callbacks Phase",
        "hi": "Pending Callbacks Phase"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "setImmediate callbacks are queued and executed exclusively during the Check phase of the Event Loop.",
      "hi": "setImmediate callbacks Event Loop ke Check phase mein execute hote hain."
    }
  },
  {
    "q": {
      "en": "When does the process.nextTick queue get processed in Node.js?",
      "hi": "Node.js mein process.nextTick queue kab process hoti hai?"
    },
    "options": [
      {
        "en": "Immediately after the current operation, before the Event Loop advances to any other phase",
        "hi": "Current operation khatam hote hi, agle kisi bhi phase par jaane se pehle"
      },
      {
        "en": "Only at the end of the entire application lifecycle",
        "hi": "Sirf app band hone ke waqt"
      },
      {
        "en": "Inside the Timers phase",
        "hi": "Timers phase ke andar"
      },
      {
        "en": "Inside the Close Callbacks phase",
        "hi": "Close Callbacks phase ke andar"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "process.nextTick is not part of libuv's 6 phases; it is an interceptor queue that drains immediately after the current operation before any phase transition.",
      "hi": "process.nextTick libuv ke phases ka hissa nahi hai balki express queue hai jo har phase transition se pehle khali hoti hai."
    }
  },
  {
    "q": {
      "en": "Inside an `fs.readFile()` callback, which of the following is guaranteed to execute first?",
      "hi": "`fs.readFile()` callback ke andar kaunsa pehle execute hone ki guarantee hoti hai?"
    },
    "options": [
      {
        "en": "setImmediate()",
        "hi": "setImmediate()"
      },
      {
        "en": "setTimeout(..., 0)",
        "hi": "setTimeout(..., 0)"
      },
      {
        "en": "Both execute in random non-deterministic order",
        "hi": "Dono random order mein chalte hain"
      },
      {
        "en": "setInterval(..., 0)",
        "hi": "setInterval(..., 0)"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Inside an I/O callback (Poll phase), the Check phase executes immediately next, ensuring setImmediate runs before the loop cycles to the Timers phase.",
      "hi": "I/O callback Poll phase mein hota hai, jiske theek baad Check phase aata hai, isliye setImmediate hamesha setTimeout se pehle chalta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of The Node.js Event Loop Phases in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Node.js Event Loop Ke 6 Phases Explained ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling the node.js event loop phases with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Node.js Event Loop Ke 6 Phases Explained ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "The Node.js Event Loop Phases establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Node.js Event Loop Ke 6 Phases Explained clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does The Node.js Event Loop Phases directly resolve?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without The Node.js Event Loop Phases, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Node.js Event Loop Ke 6 Phases Explained ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about The Node.js Event Loop Phases, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing The Node.js Event Loop Phases, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with The Node.js Event Loop Phases?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should The Node.js Event Loop Phases be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Node.js Event Loop Ke 6 Phases Explained ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of The Node.js Event Loop Phases impact application memory and CPU consumption?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within The Node.js Event Loop Phases?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in The Node.js Event Loop Phases?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in The Node.js Event Loop Phases?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for The Node.js Event Loop Phases, what must the test suite assert?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in The Node.js Event Loop Phases?",
      "hi": "Modular design Node.js Event Loop Ke 6 Phases Explained mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should The Node.js Event Loop Phases be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Node.js Event Loop Ke 6 Phases Explained ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does The Node.js Event Loop Phases properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Node.js Event Loop Ke 6 Phases Explained kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with The Node.js Event Loop Phases in production?",
      "hi": "Production mein Node.js Event Loop Ke 6 Phases Explained ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for The Node.js Event Loop Phases?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in The Node.js Event Loop Phases?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in The Node.js Event Loop Phases?",
      "hi": "Node.js Event Loop Ke 6 Phases Explained mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
