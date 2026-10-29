/**
 * Module 1: Web & JavaScript Essentials
 * Topic: Modern ES6+ Features
 * Subtopic: Template Literals & ES Modules (import/export)
 */

export default {
  id: "js-template-literals-modules",
  title: {
    en: "Template Literals & ES Modules (import/export)",
    hi: "Template Literals & ES Modules (import/export)",
  },
  difficulty: "Beginner",
  readTime: 8,
  sections: [
    // 1. Concept
    {
      id: "concept",
      type: "concept",
      heading: {
        en: "Template Literals & Native JavaScript Modules",
        hi: "Template Literals Aur Modern ES Modules (ESM)",
      },
      body: {
        en: `ES6 revolutionized two everyday tasks in JavaScript: working with strings, and organizing code into reusable files.

### 1. Template Literals (Backtick Strings)
Before ES6, combining strings and variables required messy plus signs:
\`\`\`javascript
"Hello, " + user.name + "! You have " + (5 + 3) + " items in your cart.";
\`\`\`

Template literals use **backticks (\` \`)** and the **dollar-curly syntax (\`\${expression}\`)** to perform **String Interpolation**. Inside \`\${}\`, you can place any valid JavaScript expression (variables, function calls, math). They also support **multi-line strings** natively without typing \`\\n\`.

---

### 2. ES Modules (ESM)
Before ES6, JavaScript had no official module system; Node.js used \`require()\` (CommonJS), and browsers relied on global script tags.

**ES Modules (import / export)** is the official, static ECMAScript standard:
- **Named Exports**: Export multiple functions or constants from a file.
- **Default Export**: Export one primary entity per file.
- **Static Analysis & Tree-Shaking**: Bundlers like Vite and Rollup analyze your import statements and eliminate unused functions from the final production bundle!`,
        hi: `ES6 ne JavaScript ke do bohot common kaamo ko aasan banaya: strings format karna aur code ko alag-alag modular files mein todna.

### 1. Template Literals (Backtick Strings)
ES6 se pehle strings jodna bohot irritating tha:
\`\`\`javascript
"Hello, " + user.name + "! Aapke cart mein " + count + " items hain.";
\`\`\`

Template literals mein hum **backticks (\` \`)** use karte hain aur **\`\${expression}\`** ke zariye direct variables inject kar sakte hain. Isme aap multiline strings bhi aasaani se likh sakte hain bina \`\\n\` lagaye.

---

### 2. ES Modules (import / export)
Pehle JavaScript mein modules ka koi official standard nahi tha. Node mein \`require()\` chalta tha aur browser mein global scripts.

**ES Modules (ESM)** official international standard hai:
- **Named Exports**: Ek file se multiple functions export karna (\`export const add = ...\`).
- **Default Export**: Ek file se ek main feature export karna (\`export default App\`).
- **Tree-Shaking**: Vite aur Rollup jaise modern bundlers un functions ko final build se delete kar dete hain jo kahi import nahi hue!`
      },
      code: {
        language: "javascript",
        filename: "template-literal-demo.js",
        snippet: `// Multiline String Interpolation
const user = { name: "Aman", role: "Architect", points: 1250 };

const welcomeCard = \`
  <div class="card">
    <h2>Welcome, \${user.name}!</h2>
    <p>Role: \${user.role}</p>
    <p>Status: \${user.points > 1000 ? "Pro Member" : "Standard"}</p>
  </div>
\`;

console.log(welcomeCard);`
      }
    },

    // 2. Why it matters
    {
      id: "why-it-matters",
      type: "concept",
      heading: {
        en: "Why ES Modules Form the Backbone of Modern Tooling (Vite)",
        hi: "Vite Aur Modern React Mein ESM Ka Kya Role Hai?",
      },
      body: {
        en: `Older build tools like Webpack bundled your entire application into a massive file every time you changed a line of code, causing 10-second reload delays.

**Vite uses native browser ES Modules:**
When you save a file in Vite, the browser requests ONLY the specific module that changed using standard \`import\`. This allows instant **Hot Module Replacement (HMR)** in under 50 milliseconds regardless of project size!`,
        hi: `Purane tools (jaise Webpack) har baar file save karne par poore project ko dobara bundle karte the, jisme 10 second lagte the.

**Vite native ES Modules par chalta hai:**
Jab aap Vite mein file save karte hain, browser sirf usi ek badli hui file ko \`import\` karta hai. Isiliye Vite mein code badalna 50 milliseconds se bhi kam samay mein screen par reflect ho jata hai!`
      }
    },

    // 3. Real-life analogy
    {
      id: "analogy",
      type: "analogy",
      heading: {
        en: "The Lego Brick & Modular Furniture Analogy",
        hi: "Lego Blocks Aur Modular Furniture Ka Udaharan",
      },
      body: {
        en: `Think of modules like Lego bricks or modular IKEA furniture:

- **Without Modules (Single 10,000-line File)**: Imagine trying to assemble a house carved out of a single gigantic block of stone. If you want to change the bathroom window, you have to risk breaking the whole house.
- **With ES Modules**: You build your house out of modular Lego bricks. One file contains the \`Door\` module, another contains the \`Window\` module. You can plug in the \`Door\` module into any room, upgrade it independently, and if you don't need a chimney, you simply don't import it!`,
        hi: `Modules ko **Lego Bricks ya Modular Furniture** ki tarah samjhein:

- **Bina Modules Ke (Ek Hi Badi File)**: Ek hi lakdi ke tukde se poora ghar banana. Agar ek darwaza theek karna ho toh poora ghar tootne ka darr rehta hai.
- **ES Modules Ke Sath**: Aapka project alag-alag Lego bricks se banta hai. Ek file mein \`Button\` hai, doosri mein \`Navbar\`. Aap jahan chahein Button module ko \`import\` kar sakte hain aur test kar sakte hain.`
      }
    },

    // 4. Syntax / How it works
    {
      id: "syntax",
      type: "syntax",
      heading: {
        en: "Named Exports vs Default Exports Syntax",
        hi: "Named Exports Vs Default Exports Syntax Comparison",
      },
      body: {
        en: `### 1. Named Exports (Multiple per file)
\`\`\`javascript
// mathUtils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Importing with exact names inside { }
import { add, subtract } from './mathUtils.js';
\`\`\`

---

### 2. Default Export (Exactly ONE per file)
\`\`\`javascript
// Button.jsx
export default function Button() {
  return <button>Click me</button>;
}

// Importing with ANY name you choose without { }
import MyCustomButton from './Button.jsx';
\`\`\`

---

### 3. Dynamic Imports (Code Splitting)
You can load modules on-demand only when a user performs an action:
\`\`\`javascript
button.addEventListener('click', async () => {
  const { calculateTaxes } = await import('./heavyMath.js');
  calculateTaxes();
});
\`\`\``,
        hi: `### 1. Named Exports (Ek file se kayi cheezein)
\`\`\`javascript
// mathUtils.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

// Curly braces { } ke andar exact wahi naam import karein
import { add, subtract } from './mathUtils.js';
\`\`\`

---

### 2. Default Export (File ki ek main cheez)
\`\`\`javascript
// Button.jsx
export default function Button() {
  return <button>Click</button>;
}

// Bina curly braces ke kisi bhi naam se import kar sakte hain
import MyButton from './Button.jsx';
\`\`\`

---

### 3. Dynamic Imports (On-Demand Loading)
Jab user click kare tabhi heavy code download karna:
\`\`\`javascript
button.addEventListener('click', async () => {
  const { downloadPdf } = await import('./pdfGenerator.js');
  downloadPdf();
});
\`\`\``
      }
    },

    // 5. Examples (3 Levels)
    {
      id: "examples",
      type: "example",
      heading: {
        en: "Example 1 (Basic): Tagged Template Literals",
        hi: "Example 1 (Basic): Tagged Template Literals Ka Use",
      },
      body: {
        en: `Tagged templates allow you to parse template literals with a function (this is how libraries like \`styled-components\` work!):`,
        hi: `Tagged template function template string ke text aur values ko process karta hai:`
      },
      code: {
        language: "javascript",
        filename: "tagged-template.js",
        snippet: `// A sanitizer tag function that auto-escapes unsafe HTML
function sanitize(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    const safeValue = String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return result + safeValue + str;
  });
}

const maliciousUser = '<script>alert("hacked!")</script>';
const cleanHtml = sanitize\`<div>User: \${maliciousUser}</div>\`;

console.log(cleanHtml);
// Output: <div>User: &lt;script&gt;alert("hacked!")&lt;/script&gt;</div>`
      }
    },

    {
      id: "example-intermediate",
      type: "example",
      heading: {
        en: "Example 2 (Intermediate): Combining Named and Default Exports",
        hi: "Example 2 (Intermediate): Default Aur Named Exports Ek Sath",
      },
      body: {
        en: `Exporting a primary component alongside secondary utility constants:`,
        hi: `Ek file se main component ke sath helper constants bhi export karna:`
      },
      code: {
        language: "javascript",
        filename: "cardModule.js",
        snippet: `// Secondary Named Exports
export const CARD_VARIANTS = {
  PRIMARY: 'bg-brand-500 text-white',
  OUTLINE: 'border border-slate-300 text-slate-900',
};

export const formatCardTitle = (title) => title.trim().toUpperCase();

// Primary Default Export
export default function Card({ title, variant = CARD_VARIANTS.PRIMARY }) {
  console.log(\`Rendering card [\${formatCardTitle(title)}] with variant [\${variant}]\`);
}

// In another file:
// import Card, { CARD_VARIANTS, formatCardTitle } from './cardModule.js';`
      }
    },

    {
      id: "example-real-world",
      type: "example",
      heading: {
        en: "Example 3 (Real-World): Feature Flag Dynamic Module Loader",
        hi: "Example 3 (Real-World): Dynamic Module Loading Pattern",
      },
      body: {
        en: `Loading analytics or heavy chart libraries on-demand only when a feature is toggled on:`,
        hi: `Heavy analytics ya charting libraries ko sirf tabhi download karna jab feature enable ho:`
      },
      code: {
        language: "javascript",
        filename: "featureLoader.js",
        snippet: `async function loadAnalyticsEngine(isProduction) {
  if (!isProduction) {
    console.log("Development mode: Skipping analytics bundle download.");
    return { track: (event) => console.log(\`[DEV TRACK]: \${event}\`) };
  }

  try {
    // Dynamic import splits this into a separate JS file chunk in Vite!
    const { ProductionAnalytics } = await import('./analyticsBundle.js');
    return new ProductionAnalytics();
  } catch (err) {
    console.error("Failed to load analytics module", err);
    return { track: () => {} }; // Fallback dummy
  }
}

loadAnalyticsEngine(true).then(tracker => tracker.track('Page_View'));`
      }
    },

    // 6. Common Mistakes
    {
      id: "mistakes",
      type: "mistakes",
      heading: {
        en: "Common Module & Template Mistakes",
        hi: "Modules Aur Template Literals Ki Galatiyan",
      },
      body: {
        en: `### 1. Mixing Up Named and Default Imports
- **The Mistake**: Writing \`import { MyComponent } from './MyComponent'\` when the file exported via \`export default MyComponent\`.
- **The Symptom**: \`MyComponent\` evaluates to \`undefined\`, causing \`Element type is invalid\` crashes in React!
- **The Rule**: No curly braces for default exports; curly braces are mandatory for named exports.

---

### 2. Forgetting to Add "type": "module" in Node.js
- In Node.js, using \`import\` statements throws: \`SyntaxError: Cannot use import statement outside a module\`.
- **The Fix**: Add \`"type": "module"\` to your \`package.json\`.`,
        hi: `### 1. Named Aur Default Import Ko Mix Karna
- **Galti**: Default export wali file ko \`import { Component }\` curly braces ke sath import karna.
- **Problem**: Component \`undefined\` ban jata hai aur React crash ho jata hai.
- **Rule**: Default export ke liye curly braces NAHI lagte; named exports ke liye curly braces ZAROORI hain.

---

### 2. Node.js Mein "type": "module" Bhool Jana
- Node.js mein import likhne par error: \`Cannot use import statement outside a module\`.
- **Solution**: \`package.json\` mein \`"type": "module"\` add karein.`
      }
    },

    // 7. Best practices
    {
      id: "best-practices",
      type: "summary",
      heading: {
        en: "Module Best Practices",
        hi: "Module Best Practices",
      },
      body: {
        en: `- Prefer named exports for utility libraries; prefer default exports for React pages and main components.
- Avoid circular dependencies (File A imports B, while File B imports A).
- Use dynamic \`import()\` for route-based code splitting to keep initial bundle size small.`,
        hi: `- Helper functions ke liye named exports use karein; React components ke liye default exports use karein.
- Circular dependency se bachein (File A aur B ek doosre ko import na karein).
- Badi heavy libraries ke liye dynamic \`import()\` use karein.`
      }
    },

    // 8. Interview Questions
    {
      id: "interview",
      type: "interview",
      heading: {
        en: "ESM vs CommonJS Interview Questions",
        hi: "ESM vs CommonJS Interview Questions",
      },
      body: {
        en: "Key architectural questions asked about JavaScript module systems:",
        hi: "Module systems ke interview questions:"
      },
      questions: [
        {
          q: {
            en: "What is Tree-Shaking, and why is it only possible with ES Modules (import) and not CommonJS (require)?",
            hi: "Tree-Shaking kya hoti hai aur yeh sirf ES Modules mein kyun possible hai, CommonJS mein kyun nahi?"
          },
          a: {
            en: "Tree-shaking is the automated elimination of dead/unused code from the final bundle. ES Modules are STATIC: import and export statements must appear at the top level, allowing the bundler to determine the entire dependency tree at build time without running code. CommonJS is DYNAMIC: require() calls can be placed inside if-statements or loops at runtime, making it impossible for bundlers to safely predict what code is needed without executing it.",
            hi: "Tree-shaking ka matlab hai unused code ko final build se delete karna. ES Modules **static** hote hain (hamesha top level par rehte hain), isliye build ke time bina code chalaye pata chal jata hai ki kaunsa function use ho raha hai. CommonJS **dynamic** hota hai (require ko if-condition ke andar bhi likha ja sakta hai), isliye compile time par unused code pehchanna namumkin hota hai."
          },
          takeaway: {
            en: "Static ESM syntax enables build-time tree-shaking; dynamic CJS prevents it.",
            hi: "Static ESM build time par dead code ko eliminate kar deta hai."
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
        en: `- Template literals use backticks \` \` and \`\${expression}\` for interpolation.
- Default exports are imported without curly braces; named exports require { }.
- ES Modules enable static analysis and tree-shaking in modern bundlers like Vite.
- Dynamic \`import()\` loads chunks on-demand.`,
        hi: `- Template literals backtick aur \`\${}\` se strings ko interpolate karte hain.
- Default exports bina curly braces ke import hote hain; named exports mein { } lagta hai.
- ES Modules se Vite unused code ko tree-shake kar deta hai.
- Dynamic \`import()\` se code splitting hoti hai.`
      }
    }
  ],

  // 10. Quiz
  quiz: [
  {
    "q": {
      "en": "How do you import a module that was exported using 'export default function App() {}'?",
      "hi": "'export default function App() {}' se export kiye gaye component ko kaise import karte hain?"
    },
    "options": [
      {
        "en": "import App from './App'",
        "hi": "import App from './App'"
      },
      {
        "en": "import { App } from './App'",
        "hi": "import { App } from './App'"
      },
      {
        "en": "require({ App })",
        "hi": "require({ App })"
      },
      {
        "en": "import * as default from './App'",
        "hi": "import * as default from './App'"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Default exports are imported directly without curly braces. You can name the imported identifier whatever you want.",
      "hi": "Default export ko bina curly braces ke direct import kiya jata hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Template Literals & ES Modules (import/export) in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Template Literals & ES Modules (import/export) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling template literals & es modules (import/export) with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Template Literals & ES Modules (import/export) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Template Literals & ES Modules (import/export) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Template Literals & ES Modules (import/export) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Template Literals & ES Modules (import/export) directly resolve?",
      "hi": "Template Literals & ES Modules (import/export) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Template Literals & ES Modules (import/export), applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Template Literals & ES Modules (import/export) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Template Literals & ES Modules (import/export), how is its mental model best conceptualized through real-world analogies?",
      "hi": "Template Literals & ES Modules (import/export) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Template Literals & ES Modules (import/export), what syntactic convention is essential to prevent runtime errors?",
      "hi": "Template Literals & ES Modules (import/export) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Template Literals & ES Modules (import/export)?",
      "hi": "Template Literals & ES Modules (import/export) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Template Literals & ES Modules (import/export) be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Template Literals & ES Modules (import/export) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Template Literals & ES Modules (import/export) impact application memory and CPU consumption?",
      "hi": "Template Literals & ES Modules (import/export) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Template Literals & ES Modules (import/export)?",
      "hi": "Template Literals & ES Modules (import/export) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Template Literals & ES Modules (import/export)?",
      "hi": "Template Literals & ES Modules (import/export) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Template Literals & ES Modules (import/export)?",
      "hi": "Template Literals & ES Modules (import/export) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Template Literals & ES Modules (import/export), what must the test suite assert?",
      "hi": "Template Literals & ES Modules (import/export) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Template Literals & ES Modules (import/export)?",
      "hi": "Modular design Template Literals & ES Modules (import/export) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Template Literals & ES Modules (import/export) be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Template Literals & ES Modules (import/export) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Template Literals & ES Modules (import/export) properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Template Literals & ES Modules (import/export) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Template Literals & ES Modules (import/export) in production?",
      "hi": "Production mein Template Literals & ES Modules (import/export) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Template Literals & ES Modules (import/export)?",
      "hi": "Template Literals & ES Modules (import/export) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Template Literals & ES Modules (import/export)?",
      "hi": "Template Literals & ES Modules (import/export) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Template Literals & ES Modules (import/export)?",
      "hi": "Template Literals & ES Modules (import/export) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
      "en": "What principle enables Template Literals & ES Modules (import/export) to operate identically across local dev, staging, and production environments?",
      "hi": "Template Literals & ES Modules (import/export) ko local dev, staging aur production mein bilkul same operate karne ke liye kaunsa niyam zaroori hai?"
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
      "en": "When an unexpected outage or regression occurs in production involving Template Literals & ES Modules (import/export), what is the first engineering step?",
      "hi": "Production mein Template Literals & ES Modules (import/export) se related outage ya regression aane par pehla engineering step kya hona chahiye?"
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
