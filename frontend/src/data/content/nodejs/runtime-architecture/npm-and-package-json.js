export default {
  id: "node-npm-packages",
  title: {
    en: "npm, package.json & Semantic Versioning",
    hi: "npm, package.json & SemVer (^ vs ~)",
  },
  difficulty: "Beginner",
  readTime: 8,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is npm and package.json?",
        hi: "1. npm Aur package.json Kya Hai?",
      },
      body: {
        en: `**npm (Node Package Manager)** is the world's largest software registry, containing over 2 million open-source reusable JavaScript packages. It also provides a Command Line Interface (CLI) bundled with Node.js to install, manage, and share dependencies.

The **\`package.json\`** file is the manifest and control center of any Node.js project. It records:
- **Metadata**: Project name, version, author, license, and git repository.
- **Scripts**: Custom terminal commands (e.g. \`npm start\`, \`npm run build\`).
- **Dependencies**: Third-party libraries required for the application to function in production (e.g., \`express\`, \`mongoose\`, \`bcrypt\`).
- **devDependencies**: Packages needed strictly during local development and testing (e.g., \`nodemon\`, \`eslint\`, \`jest\`).`,
        hi: `**npm (Node Package Manager)** duniya ki sabse badi open-source code registry hai, jismein 20 lakh se zyada pre-built packages maujood hain. Node.js install karne par npm CLI tool automatically milta hai jisse hum packages install aur update karte hain.

**\`package.json\`** file kisi bhi Node.js project ka ID card aur control center hoti hai. Isme likha hota hai:
- **Project Metadata**: App ka naam, current version, author aur license.
- **Scripts**: Short commands jo terminal mein chalaaye jaate hain (jaise \`npm run dev\`).
- **dependencies**: Wo packages jo live production server par app chalane ke liye zaroori hain (jaise \`express\`, \`mongoose\`).
- **devDependencies**: Wo tools jo sirf developer ke laptop par coding aur testing ke waqt chahiye hote hain (jaise \`nodemon\`, \`eslint\`).`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Semantic Versioning (SemVer) & The ^ vs ~ Mystery",
        hi: "2. SemVer Rules: Caret (^) Aur Tilde (~) Ka Matlab",
      },
      body: {
        en: `Every npm package follows **Semantic Versioning (SemVer)** formatted as three numbers separated by dots:

\`\`\`
  MAJOR  .  MINOR  .  PATCH
    1    .    4    .    2
\`\`\`

1. **MAJOR (1.x.x)**: Incremented when there are **Breaking API Changes**. Code written for version 1 may fail on version 2.
2. **MINOR (x.4.x)**: Incremented when **New Features** are added in a backwards-compatible manner.
3. **PATCH (x.x.2)**: Incremented for backwards-compatible **Bug Fixes & Security Patches**.

### Version Prefixes:
- **Caret (\`^1.4.2\`)**: Allows updates to the latest **MINOR** and **PATCH** versions (e.g. up to \`< 2.0.0\`). *Default behavior when running \`npm install\`!*
- **Tilde (\`~1.4.2\`)**: Allows updates ONLY to the latest **PATCH** versions (e.g. up to \`< 1.5.0\`).
- **Exact (\`1.4.2\`)**: Strict lockdown; will never automatically update.
- **Wildcard (\`*\`)**: Installs the latest version available (Dangerous in production!).`,
        hi: `Har npm package **Semantic Versioning (SemVer)** rule follow karta hai jo 3 numbers se milkar banta hai:

\`\`\`
  MAJOR  .  MINOR  .  PATCH
    1    .    4    .    2
\`\`\`

1. **MAJOR (1.0.0 -> 2.0.0)**: Jab aise changes aaye hon jo purane code ko tod dein (**Breaking Changes**).
2. **MINOR (1.4.0 -> 1.5.0)**: Jab naye features add hue hon par purana code waise hi chalta rahe (**New Features**).
3. **PATCH (1.4.2 -> 1.4.3)**: Jab choti-moti galtiyan ya security bugs theek kiye gaye hon (**Bug Fixes**).

### Prefixes Ka Magic:
- **Caret (\`^1.4.2\`)**: Kehta hai *"Minor aur Patch update accept kar lo, par Major change mat karna"* (e.g. 1.9.9 tak le jayega par 2.0.0 nahi).
- **Tilde (\`~1.4.2\`)**: Kehta hai *"Sirf bug fixes (Patch) accept karo, features bhi mat badlo"* (e.g. 1.4.9 tak le jayega par 1.5.0 nahi).
- **Exact (\`1.4.2\`)**: Bina kisi sign ke; yeh version bilkul freeze rehta hai.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Restaurant Recipe vs Verified Grocery Receipt",
        hi: "Real-Life Analogy: Hotel Ki Recipe Card Aur Mother Dairy Ki Raseed",
      },
      body: {
        en: `Consider cooking in an upscale restaurant:

- **\`package.json\` is the Chef's Recipe Card**:
  - It says: *"We need Paneer around 500g (version ^1.0.0)"*.
  - It leaves room for variation based on what is available in the grocery store today.
- **\`package-lock.json\` is the Exact Cashier Receipt with Barcode**:
  - It specifies: *"Mother Dairy Paneer, Batch #9982, barcode hash \`sha512-ab47...\`, manufactured at 6:15 AM."*
  - If a substitute chef cooks the meal in Mumbai or London, having the exact lock receipt guarantees the dish tastes 100% identical!
  - If you delete the lock file, cook A might buy cow milk paneer, and cook B buys buffalo milk paneer, ruining consistency across developer laptops.`,
        hi: `Sochiye ek 5-Star Hotel ka kitchen:

- **\`package.json\` Chef Ka Recipe Card Hai**:
  - Recipe card pe likha hai: *"Paneer chahiye lagbhag 500g (^1.0.0)"*.
  - Isme exact brand ya batch nahi likha, bas requirement likhi hai.
- **\`package-lock.json\` Mother Dairy Ki Exact Barcode Wali Raseed Hai**:
  - Raseed par likha hai: *"Mother Dairy Batch #9982, Barcode SHA-512 Hash, expiry 28 Oct."*
  - Agar yahi dish London ya Bangalore ki branch mein banegi, toh lock file ensure karegi ki wahi exact packet use ho taaki taste bilkul same rahe!
  - Agar aap lock file delete kar doge, toh alag-alag developers ke computer par alag version download ho jayega aur bug aane lagenge.`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. package-lock.json & npm install vs npm ci",
        hi: "4. package-lock.json Aur npm install vs npm ci",
      },
      body: {
        en: `### Why \`package-lock.json\` is Mandatory in Git
When you run \`npm install\`, npm resolves the dependency tree and creates \`package-lock.json\`.
It locks the **exact version**, **nested sub-dependencies**, and cryptographic integrity checksum (\`integrity: sha512-...\`) for every installed module.
> **Rule: ALWAYS commit \`package-lock.json\` to your Git repository! Never put it in \`.gitignore\`.**

### npm install vs npm ci (Clean Install)
| Command | Primary Use Case | Modifies lockfile? | Deletes node_modules first? | Speed |
| :--- | :--- | :--- | :--- | :--- |
| **\`npm install\`** | Local development | Yes (may update lockfile if versions change) | No | Moderate |
| **\`npm ci\`** | CI/CD Pipelines & Deployments (Vercel, Render) | **NEVER** (fails if mismatch exists) | Yes | **2x-3x Faster** |`,
        hi: `### package-lock.json Git Mein Kyun Zaroori Hai?
Jab aap \`npm install\` karte ho, toh npm \`package-lock.json\` generate karta hai.
Yeh file har package ka **exact version**, uske nested dependencies aur security hash (\`integrity: sha512...\`) lock kar deti hai.
> **Niyam: \`package-lock.json\` ko hamesha Git mein commit karein! Ise \`.gitignore\` mein daalne ki galti kabhi na karein.**

### \`npm install\` vs \`npm ci\`
- **\`npm install\`**: Local laptop par naye packages add karte waqt use hota hai. Yeh lockfile ko modify kar sakta hai.
- **\`npm ci\` (Clean Install)**: Production deployment (Render, Docker, GitHub Actions) ke liye hota hai. Yeh pehle \`node_modules\` ko delete karta hai aur bina lockfile ko chhue 100% exact code install karta hai (2-3 guna tez).`,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: Annotated package.json & Lifecycle Scripts",
        hi: "5. Practical Examples: Annotated package.json aur Lifecycle Scripts",
      },
      body: {
        en: `### Example 1: Enterprise Production package.json Anatomy
A clean, real-world manifest for an Express and Mongoose backend service.`,
        hi: `### Example 1: Real-World MERN Backend package.json
Express aur MongoDB backend ke liye professional \`package.json\` ka structure.`,
      },
      code: {
        language: "json",
        filename: "package.json",
        snippet: `{
  "name": "mern-api-server",
  "version": "1.0.0",
  "description": "Production REST API for MERN Learning Hub",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --detectOpenHandles",
    "lint": "eslint src/**/*.js",
    "format": "prettier --write src/**/*.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.1"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "jest": "^29.7.0",
    "nodemon": "^3.1.0",
    "prettier": "^3.2.5"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: npm Lifecycle Hooks (pre and post scripts)",
        hi: "Example 2: Custom npm Lifecycle Hooks (pre aur post scripts)",
      },
      body: {
        en: `### Example 2: Automatic Pre/Post Hooks
npm automatically executes scripts prefixed with \`pre\` before the main command, and \`post\` after!`,
        hi: `### Example 2: Automatic Pre Aur Post Scripts
Dekhiye kaise \`prebuild\` aur \`postbuild\` main \`build\` command se pehle aur baad automatically chalti hain.`,
      },
      code: {
        language: "json",
        filename: "scripts-lifecycle.json",
        snippet: `{
  "scripts": {
    "prebuild": "npm run clean && npm run lint",
    "build": "vite build",
    "postbuild": "echo 'Production bundle generated successfully! Ready for deployment.'",
    "clean": "rm -rf dist"
  }
}

// When you run: npm run build
// Step 1: npm automatically runs 'prebuild' (cleaning dist and running linter)
// Step 2: npm runs 'build' (compiling bundle)
// Step 3: npm automatically runs 'postbuild' (printing success message)`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Essential npm Diagnostic CLI Commands",
        hi: "Example 3: Zaroori npm Diagnostic Terminal Commands",
      },
      body: {
        en: `### Example 3: Auditing and Inspecting Dependencies
Commands every professional developer uses to maintain healthy repositories.`,
        hi: `### Example 3: Dependencies Ko Inspect Aur Audit Karna
Terminal commands jinse dependencies ka health check kiya jata hai.`,
      },
      code: {
        language: "bash",
        filename: "npmCommands.sh",
        snippet: `# 1. Check for outdated packages against the npm registry
npm outdated

# 2. View full dependency tree up to 1 level deep
npm ls --depth=0

# 3. Security vulnerability scan
npm audit

# 4. Install production dependencies only (skips devDependencies)
npm install --omit=dev

# 5. Clean, deterministic install using package-lock.json directly
npm ci`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Pitfalls & Mistakes with npm",
        hi: "6. npm Aur Dependencies Mein Hone Wali Badi Galtiyan",
      },
      mistakes: [
        {
          mistake: {
            en: "Adding package-lock.json to .gitignore.",
            hi: "`package-lock.json` ko `.gitignore` mein daal dena.",
          },
          correction: {
            en: "Ignoring the lock file causes team members and CI/CD production servers to install slightly different versions, triggering 'it works on my machine' bugs. Always commit package-lock.json.",
            hi: "Lock file ignore karne se production server par naya version install ho sakta hai jo local code ko crash kar de. Hamesha ise Git mein commit karein.",
          },
          code: `# IN YOUR .gitignore:
node_modules/       # CORRECT to ignore
.env                # CORRECT to ignore
package-lock.json   # WRONG! NEVER ignore this file!`,
        },
        {
          mistake: {
            en: "Blindly running `npm audit fix --force` when security warnings appear.",
            hi: "Warning aate hi bina soche samjhe `npm audit fix --force` chala dena.",
          },
          correction: {
            en: "`--force` instructs npm to upgrade packages across MAJOR breaking changes, which frequently breaks your application build. Inspect the vulnerability and update manually.",
            hi: "`--force` lagane se npm packages ke MAJOR versions upgrade kar deta hai jisse code toot jata hai. Hamesha manual update karein.",
          },
          code: `# DANGEROUS:
# npm audit fix --force

# SAFE:
npm audit
npm update <specific-package>`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Best Practices for Package Management",
        hi: "7. Package Management Ke Best Practices",
      },
      body: {
        en: `- **Use \`npm ci\` in Production**: In your Dockerfile or CI/CD runner, always use \`npm ci\` instead of \`npm install\`.
- **Specify Node Engines**: Define \`"engines": { "node": ">=18.0.0" }\` in \`package.json\` so hosting platforms use the correct runtime version.
- **Audit Dependencies Regularly**: Run \`npm audit\` monthly to catch zero-day vulnerabilities in third-party packages.`,
        hi: `- **Production Mein \`npm ci\` Use Karein**: Deployments aur Docker images mein hamesha \`npm ci\` likhein.
- **Node Engine Specify Karein**: \`package.json\` mein Node version mention karein taaki cloud platforms theek version use karein.
- **Audit Karein**: Har mahine \`npm audit\` run karke check karein ki koi vulnerable package toh nahi hai.`,
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
            en: "What is the difference between dependencies and devDependencies?",
            hi: "dependencies aur devDependencies mein kya antar hota hai?",
          },
          a: {
            en: "dependencies are packages required for the application to run in production (e.g., Express, Mongoose, JWT). devDependencies are tools needed only for local development, compilation, and testing (e.g., Nodemon, Jest, ESLint, Vite). When deploying to production with `npm install --omit=dev`, devDependencies are skipped to save bandwidth and memory.",
            hi: "dependencies wo packages hain jo production server par app chalane ke liye zaroori hote hain (Express, Mongoose). devDependencies sirf developer ke laptop par coding, linting aur testing ke liye chahiye hote hain (Nodemon, Jest). Production build banate waqt devDependencies ko download nahi kiya jata.",
          },
        },
        {
          q: {
            en: "What does the caret symbol (^) mean in `^2.4.1` compared to the tilde (~)?",
            hi: "SemVer mein caret (^) aur tilde (~) mein kya farq hai?",
          },
          a: {
            en: "The caret (^) allows backwards-compatible updates up to the next MAJOR release (e.g., ^2.4.1 permits updates to 2.9.9, but blocks 3.0.0). The tilde (~) is more restrictive, permitting only PATCH updates within the same minor release (e.g., ~2.4.1 permits 2.4.9, but blocks 2.5.0).",
            hi: "Caret (^) Minor aur Patch dono updates allow karta hai jab tak Major version change na ho (^2.4.1 se 2.9.9 allow hai par 3.0.0 nahi). Tilde (~) sirf Patch updates allow karta hai (~2.4.1 se 2.4.9 allow hai par 2.5.0 nahi).",
          },
        },
        {
          q: {
            en: "Why should you use `npm ci` instead of `npm install` in CI/CD pipelines?",
            hi: "CI/CD pipelines mein `npm install` ki jagah `npm ci` kyun use karna chahiye?",
          },
          a: {
            en: "1) npm ci strictly requires a package-lock.json and installs the exact versions without modifying the lockfile. 2) If the package.json and lockfile are out of sync, npm ci fails immediately, preventing corrupted builds. 3) It deletes existing node_modules first and installs from clean cache, running 2-3x faster than npm install.",
            hi: "1) npm ci strictly package-lock.json ke hisab se exact versions install karta hai aur lockfile ko modify nahi karta. 2) Agar package.json aur lockfile match na ho toh build turant fail kar deta hai. 3) Yeh pehle node_modules delete karke clean install karta hai jo 2-3 guna zyada tez hota hai.",
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
        en: `- **SemVer**: MAJOR.MINOR.PATCH (Breaking.Features.Fixes).
- **Caret (^)**: Allows minor & patch updates (< next major).
- **Tilde (~)**: Allows patch updates only (< next minor).
- **package-lock.json**: Cryptographic lock of exact versions; ALWAYS commit it.
- **npm ci**: Fast, deterministic install for deployments.`,
        hi: `- **SemVer**: MAJOR.MINOR.PATCH.
- **Caret (^)**: Minor + Patch updates allow karta hai.
- **Tilde (~)**: Sirf Patch bug fixes allow karta hai.
- **package-lock.json**: Exact version freeze karta hai; Git mein commit zaroor karein.
- **npm ci**: Production deployment ke liye best command.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "Given the version constraint `\"express\": \"^4.18.2\"`, which version will npm NEVER automatically install?",
      "hi": "`\"express\": \"^4.18.2\"` constraint ke saath npm inme se kaunsa version kabhi install NAHI karega?"
    },
    "options": [
      {
        "en": "5.0.0",
        "hi": "5.0.0"
      },
      {
        "en": "4.19.0",
        "hi": "4.19.0"
      },
      {
        "en": "4.18.3",
        "hi": "4.18.3"
      },
      {
        "en": "4.20.1",
        "hi": "4.20.1"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "The caret (^) allows minor and patch increments within the same major version (4.x.x), but strictly blocks major version jumps like 5.0.0.",
      "hi": "Caret (^) 4.x.x ke andar update karega par major breaking version 5.0.0 par kabhi nahi jayega."
    }
  },
  {
    "q": {
      "en": "Where should test frameworks like Jest or linter tools like ESLint be placed in package.json?",
      "hi": "Jest ya ESLint jaise testing aur linting tools ko package.json mein kahan rakhna chahiye?"
    },
    "options": [
      {
        "en": "devDependencies",
        "hi": "devDependencies"
      },
      {
        "en": "dependencies",
        "hi": "dependencies"
      },
      {
        "en": "peerDependencies",
        "hi": "peerDependencies"
      },
      {
        "en": "bundledDependencies",
        "hi": "bundledDependencies"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Tools only needed for development and testing belong in devDependencies to avoid bloating the production deployment bundle.",
      "hi": "Testing aur development tools devDependencies mein jaate hain taaki production server lightweight rahe."
    }
  },
  {
    "q": {
      "en": "Why is `package-lock.json` committed to Git?",
      "hi": "`package-lock.json` ko Git mein commit kyun kiya jata hai?"
    },
    "options": [
      {
        "en": "To guarantee that all developers and servers install 100% identical dependency versions",
        "hi": "Yeh ensure karne ke liye ki sabhi developers aur servers par 100% exact same version install ho"
      },
      {
        "en": "To speed up git push operations",
        "hi": "Git push ko tez karne ke liye"
      },
      {
        "en": "Because GitHub requires it to display repository size",
        "hi": "Kyunki GitHub repository size dikhane ke liye yeh mangta hai"
      },
      {
        "en": "To replace the need for package.json",
        "hi": "package.json ki zaroorat khatam karne ke liye"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "The lockfile guarantees deterministic builds by freezing exact versions and cryptographic checksums across all environments.",
      "hi": "Lockfile exact versions aur checksum freeze karti hai jisse sabhi computers par identical setup banta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of npm, package.json & Semantic Versioning in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein npm, package.json & SemVer (^ vs ~) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling npm, package.json & semantic versioning with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath npm, package.json & SemVer (^ vs ~) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "npm, package.json & Semantic Versioning establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "npm, package.json & SemVer (^ vs ~) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does npm, package.json & Semantic Versioning directly resolve?",
      "hi": "npm, package.json & SemVer (^ vs ~) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without npm, package.json & Semantic Versioning, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "npm, package.json & SemVer (^ vs ~) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about npm, package.json & Semantic Versioning, how is its mental model best conceptualized through real-world analogies?",
      "hi": "npm, package.json & SemVer (^ vs ~) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing npm, package.json & Semantic Versioning, what syntactic convention is essential to prevent runtime errors?",
      "hi": "npm, package.json & SemVer (^ vs ~) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with npm, package.json & Semantic Versioning?",
      "hi": "npm, package.json & SemVer (^ vs ~) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should npm, package.json & Semantic Versioning be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye npm, package.json & SemVer (^ vs ~) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of npm, package.json & Semantic Versioning impact application memory and CPU consumption?",
      "hi": "npm, package.json & SemVer (^ vs ~) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within npm, package.json & Semantic Versioning?",
      "hi": "npm, package.json & SemVer (^ vs ~) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in npm, package.json & Semantic Versioning?",
      "hi": "npm, package.json & SemVer (^ vs ~) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in npm, package.json & Semantic Versioning?",
      "hi": "npm, package.json & SemVer (^ vs ~) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for npm, package.json & Semantic Versioning, what must the test suite assert?",
      "hi": "npm, package.json & SemVer (^ vs ~) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in npm, package.json & Semantic Versioning?",
      "hi": "Modular design npm, package.json & SemVer (^ vs ~) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should npm, package.json & Semantic Versioning be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par npm, package.json & SemVer (^ vs ~) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does npm, package.json & Semantic Versioning properly belong and execute?",
      "hi": "Full-stack MERN architecture mein npm, package.json & SemVer (^ vs ~) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with npm, package.json & Semantic Versioning in production?",
      "hi": "Production mein npm, package.json & SemVer (^ vs ~) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for npm, package.json & Semantic Versioning?",
      "hi": "npm, package.json & SemVer (^ vs ~) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in npm, package.json & Semantic Versioning?",
      "hi": "npm, package.json & SemVer (^ vs ~) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in npm, package.json & Semantic Versioning?",
      "hi": "npm, package.json & SemVer (^ vs ~) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
