export default {
  id: "node-debugging-apps",
  title: {
    en: "Debugging Node.js Apps with Chrome DevTools & VS Code",
    hi: "Node Apps Debug Karna: Breakpoints & DevTools",
  },
  difficulty: "Intermediate",
  readTime: 9,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. Moving Beyond console.log()",
        hi: "1. console.log() Se Aage: Professional Debugging",
      },
      body: {
        en: `Every beginner starts debugging by peppering their code with dozens of \`console.log("here 1")\` and \`console.log("user data:", data)\` statements.

While quick, "console debugging" has severe drawbacks:
- It requires modifying source code and restarting the server.
- It floods terminal logs with unformatted noise.
- It cannot pause execution to inspect the live Call Stack or closure variables.
- Leftover logs pollute production server log storage.

### The V8 Inspector Protocol
Node.js comes with a built-in **V8 Debugger** that communicates over WebSockets using the **Chrome DevTools Protocol**.
By passing the **\`--inspect\`** flag to Node, you expose an internal debugging port (default \`127.0.0.1:9229\`).
You can then attach either:
1. **Google Chrome DevTools** (via \`chrome://inspect\`)
2. **VS Code Debugger** (via standard \`launch.json\` or the built-in JavaScript Debug Terminal)`,
        hi: `Lagbhag har beginner developer code mein bugs dhoondhne ke liye har jagah 50 \`console.log("yahan aaya")\` aur \`console.log("data", res)\` likhta hai.

Lekin console debugging ke bohot saare nuksaan hain:
- Har baar code modify karke server restart karna padta hai.
- Terminal mein bekaar ka kachra jama ho jata hai.
- Yeh chalte hue code ko pause karke variables ya call stack ko live inspect nahi kar sakta.
- Production mein leftover logs server ki hard disk bhar dete hain.

### V8 Inspector Protocol Kya Hai?
Node.js ke paas ek built-in **V8 Debugger** hota hai jo WebSocket ke zariye Chrome DevTools Protocol par baat karta hai.
Jab aap terminal mein **\`node --inspect server.js\`** likhte ho, toh Node ek secret debugging port (\`9229\`) open kar deta hai.
Iske baad aap:
1. **Google Chrome DevTools** (\`chrome://inspect\` se)
2. **VS Code Debugger** (F5 press karke ya JavaScript Debug Terminal se)
...apne live chalte hue backend code ke andar jhaank sakte ho!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Breakpoints, Conditional Breaks & Memory Profiling",
        hi: "2. Breakpoints, Conditional Breaks Aur Memory Leaks",
      },
      body: {
        en: `Professional debugging unlocks capabilities that \`console.log\` can never provide:

1. **Breakpoints**: Click to the left of any line number. When execution reaches that line, Node.js freezes in time! You can hover over any variable, inspect the Call Stack, and step into functions line-by-line.
2. **Conditional Breakpoints**: Pause execution *only when a specific condition is met* (e.g. \`user.id === 4029\` or \`cart.total < 0\`). Perfect for bugs that only occur on the 500th iteration of a loop!
3. **Logpoints**: Log formatted messages to the console *without modifying or saving your source code*!
4. **Memory Profiling & Heap Snapshots**: If your Node server's RAM climbs from 100 MB to 1.5 GB over three days, taking two Heap Snapshots in Chrome DevTools highlights the exact leaked objects retaining memory!`,
        hi: `Professional debugging se aap wo sab kar sakte ho jo console.log se namumkin hai:

1. **Breakpoints (Code Ko Pause Karna)**: Kisi bhi line number ke bagal mein click karein. Jaise hi request wahan pahunchegi, Node usi moment par freeze ho jayega! Aap kisi bhi variable par cursor le jaakar uski value dekh sakte ho.
2. **Conditional Breakpoints**: Code sirf tabhi pause hoga jab aapki specific shart poori ho (jaise \`user.age < 0\` ya \`i === 999\`). Hazaron loop iterations mein bug pakadne ke liye yeh best hai!
3. **Logpoints**: Bina source code ko chhue terminal mein custom message print karna!
4. **Heap Snapshots (Memory Leak Pakadna)**: Agar server ki RAM lagataar badhti ja rahi hai, toh Chrome DevTools mein 2 Heap Snapshots lekar compare karein; yeh exact un objects ko highlight kar dega jo memory leak kar rahe hain!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Village Vaidya vs The Hospital MRI Scanner",
        hi: "Real-Life Analogy: Nadi Vaidya vs Hospital Ka Digital MRI Scanner",
      },
      body: {
        en: `Consider diagnosing an internal medical illness:

- **\`console.log\` is like checking a patient's wrist pulse from outside**:
  - The doctor touches the wrist, guesses based on temperature, and prescribes medicine blindly.
  - You only observe what is surfaced on the exterior skin.
- **The Node Debugger & Profiler is a High-Resolution MRI Scanner**:
  - You slide the patient into the machine and freeze the 3D scan at any millisecond (*Breakpoint*).
  - You zoom into the exact blood vessels, inspect the liver cells (*Memory Heap inspection*), and spot hidden microscopic tumors (*Memory leaks*) without ever cutting open the patient's body!`,
        hi: `Sochiye kisi bimari ka ilaaj karna:

- **\`console.log\` Nadi Dekh Kar Andaaza Lagane Jaisa Hai**:
  - Doctor kalai pakad kar nabz dekhta hai aur tinke ka sahara lekar tukka lagata hai.
  - Aap sirf bahar se dekh pa rahe ho, andar kya chal raha hai kuch pata nahi.
- **Node Debugger & Profiler Digital MRI Machine Jaisa Hai**:
  - Patient ko machine mein daal kar samay ko usi second par rok diya jata hai (*Breakpoint*).
  - Ek-ek nas aur organ ko 3D mein inspect kiya jata hai (*Call Stack & Heap*), aur hidden bimari (*Memory Leak*) turant screen par pakad mein aa jaati hai!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. CLI Flags & VS Code launch.json Configuration",
        hi: "4. Debugger Flags Aur VS Code Configuration",
      },
      body: {
        en: `### The Two Core Terminal Flags:
- **\`node --inspect server.js\`**: Starts the server normally and opens the debugging WebSocket port on \`127.0.0.1:9229\`.
- **\`node --inspect-brk server.js\`**: Starts the server and **immediately pauses on the very first line of code** before executing anything. Perfect for debugging server bootup crashes!

### The Native \`debugger;\` Statement
You can write \`debugger;\` anywhere inside your JavaScript code. If a debugger is attached, Node will automatically pause execution on that line. If no debugger is attached, Node ignores the statement completely.`,
        hi: `### Do Zaroori Debugger Commands:
- **\`node --inspect server.js\`**: Server ko normal start karta hai aur background mein debug port \`9229\` open karta hai.
- **\`node --inspect-brk server.js\`**: Server ko pehli line par hi pause karke baith jata hai jab tak aap debugger attach na kar lo. Server start hote hi crash hone wale bugs ke liye yeh best hai!

### \`debugger;\` Statement:
Aap code mein kisi bhi line par \`debugger;\` likh sakte ho. Jab debugger attach hoga, toh code wahan ruk jayega.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: VS Code Setup, Heap Leak & Debugger Statement",
        hi: "5. Practical Examples: VS Code Config, Memory Leak Hunt aur Debugger Statement",
      },
      body: {
        en: `### Example 1: Enterprise VS Code launch.json Configuration
Configuring the one-click F5 debug workflow for an ES Module MERN backend.`,
        hi: `### Example 1: VS Code launch.json Configuration File
F5 press karke direct Node backend ko debug karne ke liye standard \`.vscode/launch.json\` file.`,
      },
      code: {
        language: "json",
        filename: ".vscode/launch.json",
        snippet: `{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "🚀 Debug MERN Backend",
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "\${workspaceFolder}/src/server.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "envFile": "\${workspaceFolder}/.env"
    },
    {
      "type": "node",
      "request": "attach",
      "name": "🔗 Attach to Running Process (port 9229)",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Simulating and Diagnosing a Memory Leak",
        hi: "Example 2: Memory Leak Scenario Banana Aur Diagnose Karna",
      },
      body: {
        en: `### Example 2: Reproducing a Common Closure Memory Leak
A global array that continuously retains client request objects without ever freeing them. We use Chrome DevTools Heap Snapshots to find the leak.`,
        hi: `### Example 2: Memory Leak Ka Practical Example
Dekhiye kaise ek global array mein data store karne se memory lagataar badhti rehti hai.`,
      },
      code: {
        language: "javascript",
        filename: "memoryLeakDemo.js",
        snippet: `// Example 2: Simulating a memory leak in Node.js
import http from "node:http";

// BUG: Global cache array that never gets purged
const requestHistoryCache = [];

const server = http.createServer((req, res) => {
  // Creating a 1 MB binary buffer on every request and retaining reference in global array
  const heavyPayload = {
    url: req.url,
    timestamp: new Date(),
    buffer: new Array(100000).fill("Leaking Memory Payload Data")
  };

  requestHistoryCache.push(heavyPayload); // Reference never garbage collected!

  const memMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);
  console.log(\`Request served. Heap Used: \${memMB} MB | Cached Items: \${requestHistoryCache.length}\`);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "OK", heapUsed: \`\${memMB} MB\` }));
});

// Run with: node --inspect memoryLeakDemo.js
// Open Chrome -> chrome://inspect -> Take Heap Snapshot 1 -> Send 50 requests -> Take Snapshot 2
// Compare snapshots: Notice 'requestHistoryCache' holds 50 MB of uncollected memory!
server.listen(5050, () => console.log("Memory test server listening on http://localhost:5050"));`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Conditional Breakpoints with Native debugger Statement",
        hi: "Example 3: Native debugger Statement Aur Conditional Triggers",
      },
      body: {
        en: `### Example 3: Precision Debugging with the debugger Keyword
Stepping through an algorithmic transaction calculation and pausing only on corrupted or negative order totals.`,
        hi: `### Example 3: \`debugger;\` Statement Ka Smart Use
Negative ya corrupt transactions aane par code ko programmatically pause karna.`,
      },
      code: {
        language: "javascript",
        filename: "conditionalDebug.js",
        snippet: `// Example 3: Using the debugger; statement selectively
function processInvoice(order) {
  let subtotal = 0;

  for (const item of order.items) {
    subtotal += item.price * item.quantity;
  }

  const finalTotal = subtotal - order.discount;

  // If a bug causes the final total to drop below zero:
  if (finalTotal < 0) {
    console.warn("CRITICAL BUG DETECTED: Order total cannot be negative!");
    // When node --inspect is attached, execution freezes here automatically!
    debugger;
  }

  return finalTotal;
}

// Valid Order
console.log("Invoice 1 Total: ₹", processInvoice({
  items: [{ price: 500, quantity: 2 }],
  discount: 100
})); // 900

// Corrupted Buggy Order (triggers debugger breakpoint!)
console.log("Invoice 2 Total: ₹", processInvoice({
  items: [{ price: 200, quantity: 1 }],
  discount: 800 // Huge discount makes total negative!
}));`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Dangerous Pitfalls in Node.js Debugging",
        hi: "6. Node Debugging Ki Badi Galtiyan Aur Security Risks",
      },
      mistakes: [
        {
          mistake: {
            en: "Exposing the `--inspect` port to the public internet on production servers (`--inspect=0.0.0.0:9229`).",
            hi: "Production server par `--inspect=0.0.0.0:9229` open chhod dena (Huge Security Risk!).",
          },
          correction: {
            en: "The V8 Inspector Protocol does not have password authentication. Exposing port 9229 on a public IP allows anyone to connect with Chrome DevTools and execute arbitrary shell commands inside your server (Remote Code Execution)! Always bind strictly to `127.0.0.1` and use SSH tunneling if remote debugging is needed.",
            hi: "V8 Inspector par koi password nahi hota. Agar production mein port 9229 public ho gaya toh koi bhi hacker Chrome se connect karke aapka server hack kar sakta hai. Hamesha `127.0.0.1` par hi bind karein.",
          },
          code: `# DANGEROUS SECURITY HOLE:
# node --inspect=0.0.0.0:9229 server.js

# SECURE (Localhost only):
node --inspect=127.0.0.1:9229 server.js`,
        },
        {
          mistake: {
            en: "Accidentally deploying code with hardcoded `debugger;` statements to production.",
            hi: "Code mein likhe `debugger;` statements ko remove kiye bina production par deploy kar dena.",
          },
          correction: {
            en: "Use an ESLint rule (`no-debugger: error`) in your CI pipeline so that builds automatically fail if any rogue `debugger;` statements remain in committed code.",
            hi: "ESLint mein `no-debugger: error` rule lagayein taaki production build se pehle debugger statements pakad mein aa jayein.",
          },
          code: `// In your .eslintrc.json:
{
  "rules": {
    "no-debugger": "error",
    "no-console": "warn"
  }
}`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Production Debugging Best Practices",
        hi: "7. Professional Debugging Ke Best Practices",
      },
      body: {
        en: `- **Use the JavaScript Debug Terminal in VS Code**: In VS Code, open the terminal dropdown and click 'JavaScript Debug Terminal'. Any Node script you run inside it automatically attaches full breakpoint debugging without any launch configs!
- **Use Logpoints over \`console.log\`**: When investigating local issues, right-click on the line gutter and select 'Add Logpoint'. It prints messages without dirtying your git diff.
- **Node Diagnostic Reports**: For crash analysis in production, enable Node's diagnostic reporting with \`--report-on-fatalerror\` to automatically output an environmental JSON dump upon unhandled crashes.`,
        hi: `- **VS Code Debug Terminal Use Karein**: VS Code mein 'JavaScript Debug Terminal' open karein. Isme jo bhi command chalayenge wo automatically debug mode mein run hogi.
- **Logpoints Ka Use Karein**: Code dirty kiye bina messages print karne ke liye VS Code mein Logpoints lagayein.
- **Diagnostic Reports**: Production crashes ke waqt automatic JSON report generate karne ke liye \`--report-on-fatalerror\` flag use karein.`,
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
            en: "What is the difference between `node --inspect` and `node --inspect-brk`?",
            hi: "`node --inspect` aur `node --inspect-brk` mein kya antar hota hai?",
          },
          a: {
            en: "`node --inspect` starts the application normally while opening the WebSocket debugging port on 9229; the script begins executing immediately without waiting. `node --inspect-brk` opens the debugging port and pauses execution on the very first line of the entry script, waiting for a debugger client (like VS Code or Chrome DevTools) to connect before continuing.",
            hi: "`node --inspect` server ko normal start karta hai aur debug port open karta hai; script bina ruke execute hona shuru ho jaati hai. `node --inspect-brk` script ko execute nahi hone deta balki pehli line par hi pause ho jata hai aur debugger connect hone ka intezaar karta hai.",
          },
        },
        {
          q: {
            en: "How do you detect a memory leak in a Node.js application using Chrome DevTools?",
            hi: "Chrome DevTools se Node.js application mein Memory Leak kaise detect kiya jata hai?",
          },
          a: {
            en: "1) Launch Node with `--inspect` and navigate to `chrome://inspect` in Google Chrome. 2) Under the 'Memory' tab, take an initial Heap Snapshot. 3) Simulate incoming user traffic (e.g. running 500 requests using Artillery or Autocannon). 4) Take a second Heap Snapshot. 5) Select the 'Comparison' view between Snapshot 2 and Snapshot 1 and sort by 'Size Delta' to find objects whose count and memory footprint grew without being garbage collected.",
            hi: "1) Node ko `--inspect` se run karke `chrome://inspect` kholein. 2) Memory tab mein pehla Heap Snapshot lein. 3) Server par traffic bhej kar load dalein. 4) Doosra Heap Snapshot lein. 5) Dono snapshots ko compare karein aur 'Delta' se sort karein; jo objects delete hone ki jagah lagataar badh rahe hain wahi memory leak ka kaaran hain.",
          },
        },
        {
          q: {
            en: "Why is running `node --inspect=0.0.0.0:9229` considered a severe security vulnerability in production?",
            hi: "Production par `node --inspect=0.0.0.0:9229` chalana ek bada security risk kyun hai?",
          },
          a: {
            en: "The V8 Inspector Protocol is designed for local development and has no authentication or password protection. Binding it to `0.0.0.0` exposes the port to the public internet, allowing any attacker to connect via Chrome DevTools and execute arbitrary JavaScript code inside your server process, resulting in complete Remote Code Execution (RCE) and server compromise.",
            hi: "Inspector protocol mein koi password protection nahi hoti. `0.0.0.0` par bind karne se internet ka koi bhi hacker Chrome se connect karke server ke andar malicious code execute kar sakta hai (Remote Code Execution), jisse server poori tarah hack ho sakta hai.",
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
        en: `- **Flags**: \`--inspect\` (live port), \`--inspect-brk\` (break at first line).
- **Default Port**: \`127.0.0.1:9229\`.
- **Chrome**: \`chrome://inspect\`.
- **VS Code**: F5 launch config or JavaScript Debug Terminal.
- **Security Rule**: NEVER expose the inspector on a public IP!`,
        hi: `- **Flags**: \`--inspect\` (debug port), \`--inspect-brk\` (pehli line pe pause).
- **Default Port**: \`127.0.0.1:9229\`.
- **Tools**: Chrome DevTools (\`chrome://inspect\`) aur VS Code.
- **Rule**: Production mein inspector port ko public na karein.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What URL must you enter into Google Chrome to connect DevTools to a Node.js process running with `--inspect`?",
      "hi": "`--inspect` ke saath chal rahe Node process se connect hone ke liye Chrome mein kaunsa URL daala jata hai?"
    },
    "options": [
      {
        "en": "chrome://inspect",
        "hi": "chrome://inspect"
      },
      {
        "en": "http://localhost:9229",
        "hi": "http://localhost:9229"
      },
      {
        "en": "chrome://debug",
        "hi": "chrome://debug"
      },
      {
        "en": "about:nodejs",
        "hi": "about:nodejs"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "chrome://inspect is Chrome's dedicated interface for discovering and connecting to remote targets and Node.js inspector instances.",
      "hi": "chrome://inspect Chrome ka official debugging page hai jahan se Node instances ko inspect kiya jata hai."
    }
  },
  {
    "q": {
      "en": "What happens when you run a Node script with `node --inspect-brk app.js`?",
      "hi": "`node --inspect-brk app.js` run karne par kya hota hai?"
    },
    "options": [
      {
        "en": "The process pauses immediately on the very first line of code and waits for a debugger to attach",
        "hi": "Process pehli hi line par pause ho jata hai aur debugger connect hone ka intezaar karta hai"
      },
      {
        "en": "It prints all breakpoints to the console and exits",
        "hi": "Yeh saare breakpoints print karke exit ho jata hai"
      },
      {
        "en": "It deletes the node_modules folder",
        "hi": "Yeh node_modules delete kar deta hai"
      },
      {
        "en": "It breaks the server connection permanently",
        "hi": "Yeh connection tod deta hai"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "--inspect-brk sets a breakpoint on the first executable line so you can debug the application's bootup sequence.",
      "hi": "--inspect-brk pehli line par breakpoint laga deta hai taaki aap startup logic ko debug kar sakein."
    }
  },
  {
    "q": {
      "en": "What tool inside Chrome DevTools is specifically used to diagnose and locate memory leaks in Node.js applications?",
      "hi": "Node.js apps mein memory leak diagnose karne ke liye Chrome DevTools ka kaunsa tool use hota hai?"
    },
    "options": [
      {
        "en": "Heap Snapshot (under the Memory tab)",
        "hi": "Heap Snapshot (Memory tab ke andar)"
      },
      {
        "en": "The Network Tab",
        "hi": "Network Tab"
      },
      {
        "en": "The Elements DOM Inspector",
        "hi": "Elements DOM Inspector"
      },
      {
        "en": "The Security Tab",
        "hi": "Security Tab"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Heap Snapshots show memory distribution across JavaScript objects and highlight un-garbage-collected references causing memory leaks.",
      "hi": "Heap Snapshot memory distribution dikhata hai aur memory leak karne wale un-collected objects ko pakadta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Debugging Node.js Apps with Chrome DevTools & VS Code in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Node Apps Debug Karna: Breakpoints & DevTools ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling debugging node.js apps with chrome devtools & vs code with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Node Apps Debug Karna: Breakpoints & DevTools ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Debugging Node.js Apps with Chrome DevTools & VS Code establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Debugging Node.js Apps with Chrome DevTools & VS Code directly resolve?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Debugging Node.js Apps with Chrome DevTools & VS Code, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Debugging Node.js Apps with Chrome DevTools & VS Code, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Debugging Node.js Apps with Chrome DevTools & VS Code, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Debugging Node.js Apps with Chrome DevTools & VS Code?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Debugging Node.js Apps with Chrome DevTools & VS Code be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Node Apps Debug Karna: Breakpoints & DevTools ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Debugging Node.js Apps with Chrome DevTools & VS Code impact application memory and CPU consumption?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Debugging Node.js Apps with Chrome DevTools & VS Code?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Debugging Node.js Apps with Chrome DevTools & VS Code?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Debugging Node.js Apps with Chrome DevTools & VS Code?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Debugging Node.js Apps with Chrome DevTools & VS Code, what must the test suite assert?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Debugging Node.js Apps with Chrome DevTools & VS Code?",
      "hi": "Modular design Node Apps Debug Karna: Breakpoints & DevTools mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Debugging Node.js Apps with Chrome DevTools & VS Code be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Node Apps Debug Karna: Breakpoints & DevTools ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Debugging Node.js Apps with Chrome DevTools & VS Code properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Node Apps Debug Karna: Breakpoints & DevTools kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Debugging Node.js Apps with Chrome DevTools & VS Code in production?",
      "hi": "Production mein Node Apps Debug Karna: Breakpoints & DevTools ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Debugging Node.js Apps with Chrome DevTools & VS Code?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Debugging Node.js Apps with Chrome DevTools & VS Code?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Debugging Node.js Apps with Chrome DevTools & VS Code?",
      "hi": "Node Apps Debug Karna: Breakpoints & DevTools mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
