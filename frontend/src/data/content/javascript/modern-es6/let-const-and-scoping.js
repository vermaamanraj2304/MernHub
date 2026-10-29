/**
 * Module 1: Web & JavaScript Essentials
 * Topic: Modern ES6+ Features
 * Subtopic: let, const, Scoping & Temporal Dead Zone
 */

export default {
  id: "js-let-const-scope",
  title: {
    en: "let, const, Scoping & Temporal Dead Zone",
    hi: "let, const, Scoping & Temporal Dead Zone (TDZ)",
  },
  difficulty: "Beginner",
  readTime: 9,
  sections: [
    // 1. Concept
    {
      id: "concept",
      type: "concept",
      heading: {
        en: "Variable Declarations: var vs let vs const",
        hi: "Variable Declarations: var, let Aur const Ka Antar",
      },
      body: {
        en: `In ES6 (ECMAScript 2015), JavaScript introduced **\`let\`** and **\`const\`** to fix the notorious design flaws of the legacy \`var\` keyword.

### The 3 Core Differences:
1. **Scope**:
   - \`var\` is **function-scoped**. It leaks outside \`if\` blocks, \`for\` loops, and \`while\` blocks.
   - \`let\` and \`const\` are **block-scoped** (enclosed by curly braces \`{ }\`).
2. **Hoisting & The Temporal Dead Zone (TDZ)**:
   - \`var\` is hoisted and initialized with \`undefined\`. Accessing it before declaration yields \`undefined\`.
   - \`let\` and \`const\` are hoisted, but **NOT initialized**. The period between entering their scope and their declaration line is called the **Temporal Dead Zone (TDZ)**. Accessing them inside the TDZ throws a \`ReferenceError\`.
3. **Re-assignment**:
   - \`var\` and \`let\` can be reassigned.
   - \`const\` cannot be reassigned (though objects declared with const can still have their internal properties mutated!).`,
        hi: `ES6 (2015) mein JavaScript ne \`var\` ki purani galtiyon ko sudharne ke liye **\`let\`** aur **\`const\`** introduce kiya.

### Inke 3 Bada Differences:
1. **Scope (Hadd)**:
   - \`var\` **function-scoped** hota hai. Yeh \`if\` blocks aur loops ke bahar leak ho jata hai.
   - \`let\` aur \`const\` **block-scoped** hote hain (sirf curly braces \`{ }\` ke andar rehte hain).
2. **Hoisting Aur Temporal Dead Zone (TDZ)**:
   - \`var\` ko declare karne se pehle access karein toh \`undefined\` milta hai.
   - \`let\` aur \`const\` ko declare karne se pehle access karne par JavaScript turant **ReferenceError** throw karta hai. Scope shuru hone se line execute hone tak ke samay ko **Temporal Dead Zone (TDZ)** kehte hain.
3. **Re-assignment**:
   - \`var\` aur \`let\` ki value dubara badli ja sakti hai.
   - \`const\` ko naya value re-assign nahi kiya ja sakta.`
      },
      code: {
        language: "javascript",
        filename: "scope-comparison.js",
        snippet: `// 1. var leaks outside blocks
if (true) {
  var leakedVar = "I escaped the if-block!";
  let safeLet = "I am trapped inside!";
}
console.log(leakedVar); // "I escaped the if-block!"
// console.log(safeLet); // ReferenceError: safeLet is not defined

// 2. The Temporal Dead Zone (TDZ)
// console.log(tdzVariable); // ReferenceError: Cannot access before initialization!
let tdzVariable = "Now I am alive";`
      }
    },

    // 2. Why it matters
    {
      id: "why-it-matters",
      type: "concept",
      heading: {
        en: "Why var Was Harmful in Asynchronous Code",
        hi: "var Asynchronous Code Mein Bugs Kyun Create Karta Tha?",
      },
      body: {
        en: `The classic JavaScript interview question:
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3!
\`\`\`
Because \`var i\` was function-scoped, all 3 callbacks closed over the **exact same variable reference** in memory. By the time the 100ms timer elapsed, the loop had finished and \`i\` was 3!

Replacing \`var\` with \`let\`:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2!
\`\`\`
Because \`let\` is block-scoped, JavaScript creates a **brand new binding** of \`i\` for every single iteration of the loop!`,
        hi: `Yeh classic interview question dekhein:
\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output aayega: 3, 3, 3!
\`\`\`
Kyunki \`var i\` ek single variable tha jo poore function mein shared tha. Jab tak 100ms baad timeout chala, tab tak loop khatam ho chuka tha aur \`i\` ki value 3 ho gayi thi!

Jab hum \`let\` use karte hain:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output aayega: 0, 1, 2!
\`\`\`
Kyunki \`let\` block-scoped hai, isliye har loop cycle ke liye JavaScript memory mein ek naya alag \`i\` create karta hai!`
      }
    },

    // 3. Real-life analogy
    {
      id: "analogy",
      type: "analogy",
      heading: {
        en: "The School Blackboard vs Personal Notebook Analogy",
        hi: "School Ka Chalk Board Aur Personal Notebook Ka Udaharan",
      },
      body: {
        en: `Think of scope like notes in a school:

- **\`var\` (The Main Hallway Notice Board)**: Anyone walking past can erase, rewrite, or overwrite what is on the notice board. If Class 10 writes "Exam at 2pm" and Class 12 overwrites it with "Football match at 2pm", confusion reigns.
- **\`let\` and \`const\` (The Locked Private Classroom Notebook)**: Whatever you write inside Room 204 belongs strictly to Room 204. No student in the hallway or in Room 205 can see it or overwrite it.
- **The Temporal Dead Zone (Entering the Exam Hall Before Paper Distribution)**: You enter the examination hall at 9:55am. The question paper exists in the room, but you are legally forbidden from touching it until exactly 10:00am. Touching it early gets you disqualified (ReferenceError)!`,
        hi: `Scope ko school ke example se samjhein:

- **\`var\` (Corridor Ka Notice Board)**: Wahan jo bhi likha hai, koi bhi student aakar mita sakta hai aur naya likh sakta hai. Ek class ne kuch likha, doosri class ne use overwrite kar diya.
- **\`let\` aur \`const\` (Classroom Ka Locked Register)**: Room 204 ka register sirf Room 204 ke bacchon ke liye hai. Bahar corridor mein koi use touch nahi kar sakta.
- **Temporal Dead Zone (Exam Hall Mein Entry)**: Aap 9:55 AM par exam room mein baith gaye hain. Paper desk par rakha hai, par 10:00 AM se pehle use chhoona mana hai. Agar chhua toh turant disqualification (ReferenceError)!`
      }
    },

    // 4. Syntax / How it works
    {
      id: "syntax",
      type: "syntax",
      heading: {
        en: "Syntax Rules & Immutability Nuances",
        hi: "Syntax Rules & const Ke Sath Mutation Ka Sach",
      },
      body: {
        en: `### The 'const' Object Mutation Nuance
Beginners assume \`const\` makes data frozen. **It does not!**

\`const\` prevents **re-assigning the variable identifier to a new memory address**:

\`\`\`javascript
const user = { name: "Aman" };

// VALID: Mutating internal properties is allowed!
user.name = "Rahul"; 
user.age = 24;

// ERROR: Reassigning to a brand new object is forbidden!
// user = { name: "New Person" }; // TypeError: Assignment to constant variable
\`\`\`

If you want an object to be genuinely immutable, you must use \`Object.freeze(user)\`.`,
        hi: `### const Ke Sath Object Mutate Kyun Ho Jata Hai?
Naye developers sochte hain ki \`const\` likhne se object freeze ho jata hai. **Aisa nahi hota!**

\`const\` sirf variable ka **pointer (memory address) badalna mana karta hai**:

\`\`\`javascript
const user = { name: "Aman" };

// ALLOWED: Object ke andar ki property badalna allowed hai!
user.name = "Rahul";
user.age = 24;

// FORBIDDEN: Pure user ko naye object se replace karna mana hai!
// user = { name: "Kunal" }; // TypeError dega!
\`\`\`

Agar aapko object ki properties ko bhi lock karna hai, toh aapko \`Object.freeze(user)\` use karna padega.`
      }
    },

    // 5. Examples (3 Levels)
    {
      id: "examples",
      type: "example",
      heading: {
        en: "Example 1 (Basic): Block Scope Demonstration",
        hi: "Example 1 (Basic): Block Scope Ka Clean Demonstration",
      },
      body: {
        en: `Demonstrating variable shadowing and block scope isolation:`,
        hi: `Variable shadowing aur block scope ka example:`
      },
      code: {
        language: "javascript",
        filename: "block-scope.js",
        snippet: `let score = 50;

if (true) {
  // Shadowing: This 'score' belongs strictly to this block
  let score = 99;
  console.log("Inside block score:", score); // 99
}

console.log("Outside block score:", score); // 50 (Unchanged!)`
      }
    },

    {
      id: "example-intermediate",
      type: "example",
      heading: {
        en: "Example 2 (Intermediate): Object.freeze vs const",
        hi: "Example 2 (Intermediate): Object.freeze Vs const Deep Dive",
      },
      body: {
        en: `How to make objects deeply immutable in modern JavaScript:`,
        hi: `JavaScript mein object ko sach mein read-only banane ka tareeqa:`
      },
      code: {
        language: "javascript",
        filename: "deep-freeze.js",
        snippet: `function deepFreeze(obj) {
  Object.keys(obj).forEach(prop => {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      deepFreeze(obj[prop]);
    }
  });
  return Object.freeze(obj);
}

const config = deepFreeze({
  api: {
    baseUrl: 'https://api.domain.com',
    timeout: 5000
  }
});

// In strict mode, this throws TypeError: Cannot assign to read-only property
// config.api.timeout = 10000;
console.log('Timeout remains locked at:', config.api.timeout); // 5000`
      }
    },

    {
      id: "example-real-world",
      type: "example",
      heading: {
        en: "Example 3 (Real-World): Clean Module Configuration Pattern",
        hi: "Example 3 (Real-World): Production Configuration Pattern",
      },
      body: {
        en: `A production-grade configuration module using \`const\` declarations and environment fallbacks:`,
        hi: `Production standard configuration module jisme const use karke safe keys maintain ki jaati hain:`
      },
      code: {
        language: "javascript",
        filename: "appConfig.js",
        snippet: `// Immutable App Configuration
export const APP_CONFIG = Object.freeze({
  ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  CORS_ORIGIN: process.env.CLIENT_URL || 'http://localhost:3000',
  JWT: Object.freeze({
    SECRET: process.env.JWT_SECRET || 'dev_secret_fallback_do_not_use_in_prod',
    EXPIRES_IN: '7d'
  })
});`
      }
    },

    // 6. Common Mistakes
    {
      id: "mistakes",
      type: "mistakes",
      heading: {
        en: "Common Scoping Mistakes",
        hi: "Scoping Ke Common Mistakes",
      },
      body: {
        en: `### 1. Using var in Modern Codebases
- **Rule**: There is zero reason to write \`var\` in modern JavaScript.
- **Default Principle**: Always use \`const\` by default. Only switch to \`let\` if you know the variable will be reassigned (e.g. an accumulator loop or counter).

---

### 2. Accessing Variables in the TDZ
- **The Mistake**: Writing code that uses a variable above its \`const\` or \`let\` declaration.
- **The Fix**: Declare all variables at the top of their enclosing block.`,
        hi: `- **Rule**: Modern JavaScript mein \`var\` likhna bilkul band karein.
- **Best Strategy**: By default hamesha \`const\` use karein. Sirf tab \`let\` use karein jab value sach mein badalni ho.
- **TDZ Error**: Variables ko hamesha block ke top par declare karein.`
      }
    },

    // 7. Best practices
    {
      id: "best-practices",
      type: "summary",
      heading: {
        en: "Scoping Best Practices",
        hi: "Scoping Best Practices",
      },
      body: {
        en: `- 90% of your variables should be \`const\`.
- Keep variable scopes as narrow as possible.
- Use uppercase snake_case for true compile-time constants (\`MAX_RETRIES\`, \`DEFAULT_TIMEOUT\`).`,
        hi: `- 90% variables ko \`const\` banayein.
- Variable ka scope jitna chota ho sake utna chota rakhein.
- Hardcoded constants ko capital mein likhein (\`MAX_USERS\`).`
      }
    },

    // 8. Interview Questions
    {
      id: "interview",
      type: "interview",
      heading: {
        en: "Scoping Interview Questions",
        hi: "Scoping Interview Questions",
      },
      body: {
        en: "Classic scoping interview questions:",
        hi: "Scoping ke classic interview questions:"
      },
      questions: [
        {
          q: {
            en: "Are let and const hoisted in JavaScript?",
            hi: "Kya let aur const JavaScript mein hoist hote hain?"
          },
          a: {
            en: "YES, let and const ARE hoisted to the top of their block scope by the JavaScript engine during the creation phase. However, unlike var (which is initialized with undefined), let and const remain UNINITIALIZED. The period between entering the scope and the line of declaration is the Temporal Dead Zone (TDZ). Attempting to read them throws a ReferenceError.",
            hi: "HAAN, let aur const hoist HOTE HAIN. Lekin \`var\` ki tarah unhe \`undefined\` se initialize nahi kiya jata. Jab tak code execution unke declaration tak nahi pahunchta, wo **Temporal Dead Zone (TDZ)** mein rehte hain aur access karne par ReferenceError milta hai."
          },
          takeaway: {
            en: "let/const are hoisted, but uninitialized (TDZ).",
            hi: "let aur const hoist hote hain par uninitialized rehte hain."
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
        en: `- \`var\` = function-scoped, hoisted to undefined.
- \`let\` = block-scoped, reassignable, subject to TDZ.
- \`const\` = block-scoped, non-reassignable pointer, subject to TDZ.
- \`const\` objects can have properties modified; use \`Object.freeze()\` to lock them.`,
        hi: `- \`var\` function-scoped hota hai aur leak hota hai.
- \`let\` block-scoped hota hai aur reassign ho sakta hai.
- \`const\` block-scoped hota hai aur reassign nahi hota.
- Object ko freeze karne ke liye \`Object.freeze()\` use karein.`
      }
    }
  ],

  // 10. Quiz
  quiz: [
  {
    "q": {
      "en": "What happens if you try to log a 'let' variable before its declaration line?",
      "hi": "Agar aap 'let' variable ko uski declaration line se pehle log karein, toh kya hoga?"
    },
    "options": [
      {
        "en": "Logs undefined",
        "hi": "undefined log hoga"
      },
      {
        "en": "Throws ReferenceError: Cannot access before initialization (TDZ)",
        "hi": "ReferenceError: Cannot access before initialization aayega (TDZ)"
      },
      {
        "en": "Logs null",
        "hi": "null log hoga"
      },
      {
        "en": "Logs 0",
        "hi": "0 log hoga"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "let variables reside in the Temporal Dead Zone until their declaration line executes, triggering a ReferenceError if accessed.",
      "hi": "let variables declaration line tak Temporal Dead Zone mein rehte hain aur access karne par ReferenceError throw karte hain."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of let, const, Scoping & Temporal Dead Zone in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein let, const, Scoping & Temporal Dead Zone (TDZ) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling let, const, scoping & temporal dead zone with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath let, const, Scoping & Temporal Dead Zone (TDZ) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "let, const, Scoping & Temporal Dead Zone establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does let, const, Scoping & Temporal Dead Zone directly resolve?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without let, const, Scoping & Temporal Dead Zone, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about let, const, Scoping & Temporal Dead Zone, how is its mental model best conceptualized through real-world analogies?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing let, const, Scoping & Temporal Dead Zone, what syntactic convention is essential to prevent runtime errors?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with let, const, Scoping & Temporal Dead Zone?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should let, const, Scoping & Temporal Dead Zone be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye let, const, Scoping & Temporal Dead Zone (TDZ) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of let, const, Scoping & Temporal Dead Zone impact application memory and CPU consumption?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within let, const, Scoping & Temporal Dead Zone?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in let, const, Scoping & Temporal Dead Zone?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in let, const, Scoping & Temporal Dead Zone?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for let, const, Scoping & Temporal Dead Zone, what must the test suite assert?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in let, const, Scoping & Temporal Dead Zone?",
      "hi": "Modular design let, const, Scoping & Temporal Dead Zone (TDZ) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should let, const, Scoping & Temporal Dead Zone be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par let, const, Scoping & Temporal Dead Zone (TDZ) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does let, const, Scoping & Temporal Dead Zone properly belong and execute?",
      "hi": "Full-stack MERN architecture mein let, const, Scoping & Temporal Dead Zone (TDZ) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with let, const, Scoping & Temporal Dead Zone in production?",
      "hi": "Production mein let, const, Scoping & Temporal Dead Zone (TDZ) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for let, const, Scoping & Temporal Dead Zone?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in let, const, Scoping & Temporal Dead Zone?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in let, const, Scoping & Temporal Dead Zone?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
      "en": "What principle enables let, const, Scoping & Temporal Dead Zone to operate identically across local dev, staging, and production environments?",
      "hi": "let, const, Scoping & Temporal Dead Zone (TDZ) ko local dev, staging aur production mein bilkul same operate karne ke liye kaunsa niyam zaroori hai?"
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
      "en": "When an unexpected outage or regression occurs in production involving let, const, Scoping & Temporal Dead Zone, what is the first engineering step?",
      "hi": "Production mein let, const, Scoping & Temporal Dead Zone (TDZ) se related outage ya regression aane par pehla engineering step kya hona chahiye?"
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
