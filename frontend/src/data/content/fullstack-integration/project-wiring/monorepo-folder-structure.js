export default {
  id: "int-monorepo-structure",
  title: {
    en: "Production MERN Project Folder Structure",
    hi: "Production MERN Project Folder Structure",
  },
  difficulty: "Beginner",
  readTime: 9,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. Multi-Repo vs Monorepo: Choosing the Right Full-Stack Architecture",
        hi: "1. Multi-Repo vs Monorepo: Sahi Full-Stack Architecture Chunna",
      },
      body: {
        en: `When building a MERN (MongoDB, Express, React, Node.js) application, one of the earliest architectural decisions is repository structure:

### 1. Multi-Repo (Separate Repositories)
- **Structure**: \`mern-client\` (React) and \`mern-server\` (Express) exist as two completely independent Git repositories.
- **Challenges**:
  - Developers must open two separate IDE windows, manage two Git commit histories, and coordinate simultaneous pull requests.
  - Harder to synchronize shared configuration, API contracts, or deploy simultaneously.

### 2. Monorepo (Single Unified Repository)
- **Structure**: A single Git repository containing a \`/client\` directory and a \`/server\` directory, coordinated by a root-level \`package.json\`.
- **Why Monorepo is standard for modern MERN teams**:
  - **Single Source of Truth**: One pull request can update an Express backend endpoint AND the corresponding React frontend page at the exact same commit.
  - **Single Command Startup**: Run both frontend (Vite) and backend (Express) concurrently with a single command: \`npm run dev\`.
  - **Simplified CI/CD**: Unified test suites and deployment pipelines for platforms like Render, Railway, Vercel, or AWS.`,
        hi: `Jab aap MERN (MongoDB, Express, React, Node.js) full-stack app banate hain, toh sabse pehla faisla repository structure ka hota hai:

### 1. Multi-Repo (Alag-Alag Repos)
- Frontend React ke liye alag GitHub repository aur backend Express ke liye alag repository.
- **Problem**: Har feature ke liye do alag Git commits, do alag Pull Requests, aur do alag branches maintain karni padti hain jo coordination ko mushkil bana deta hai.

### 2. Monorepo (Single Unified Repo)
- Ek hi GitHub repository ke andar \`/client\` aur \`/server\` dono folders hote hain, aur root par ek master \`package.json\` hota hai.
- **Industry Standard Kyun Hai?**:
  - Ek hi commit mein backend ka naya route aur frontend ka UI component ek saath update ho jata hai.
  - Ek single terminal command (\`npm run dev\`) se frontend aur backend dono ek saath start ho jaate hain.
  - CI/CD pipelines aur deployment bohot simple ho jaati hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Anatomy of an Enterprise MERN Project Tree",
        hi: "2. Enterprise MERN Project Folder Structure Ki Detailed Anatomy",
      },
      body: {
        en: `Here is the battle-tested directory structure used in production MERN engineering:

\`\`\`text
mern-app/
├── package.json              # Root scripts orchestrating client & server
├── .gitignore                # Global gitignore (node_modules, .env, dist)
├── .env.example              # Template documenting required environment variables
├── README.md                 # Setup instructions & API documentation
│
├── client/                   # FRONTEND: React 18 + Vite + Tailwind
│   ├── package.json          # React, Tailwind, Axios, Lucide dependencies
│   ├── vite.config.js        # Vite build tool & API proxy setup
│   ├── tailwind.config.js    # Tailwind design system configuration
│   ├── index.html            # Single page entry HTML
│   └── src/
│       ├── assets/           # Static images, SVGs, icons
│       ├── components/       # Reusable UI primitives (Button, Modal, Card)
│       ├── context/          # Global React context (AuthContext, ThemeContext)
│       ├── hooks/            # Custom hooks (useAuth, useFetch)
│       ├── pages/            # Route-level pages (Home, Login, Dashboard)
│       ├── services/         # Axios API clients & endpoints (api.js, authService.js)
│       ├── utils/            # Helper functions (formatDate, validators)
│       ├── App.jsx           # Master route router
│       └── main.jsx          # React DOM root entry
│
└── server/                   # BACKEND: Node.js + Express + MongoDB
    ├── package.json          # Express, Mongoose, Dotenv, JWT, Cors dependencies
    ├── server.js             # Express app entry & HTTP server listener
    └── src/
        ├── config/           # Database connection (db.js), environment config
        ├── controllers/      # Request handlers & HTTP responses (userController.js)
        ├── middleware/       # Auth guards, error handlers, rate limiters
        ├── models/           # Mongoose schemas & data models (User.js, Product.js)
        ├── routes/           # Express router endpoints (userRoutes.js, authRoutes.js)
        ├── services/         # Reusable business logic & third-party integrations
        └── utils/            # Helper utilities (generateToken.js, apiResponse.js)
\`\`\``,
        hi: `Production-ready MERN project ka structure kuch aisa dikhta hai:

- **Root Level**: Master \`package.json\` jo client aur server dono ko control karta hai.
- **/client**: React frontend code:
  - \`components/\`: Reusable UI elements (Button, Navbar, Modal).
  - \`pages/\`: Full pages jo routes se map hote hain (Login, Dashboard).
  - \`services/\`: Centralized Axios API calls.
  - \`context/\`: Auth aur Theme state.
- **/server**: Express backend code:
  - \`config/\`: MongoDB connection setup.
  - \`models/\`: Mongoose Schemas (User, Order).
  - \`controllers/\`: Business logic aur API response formatting.
  - \`routes/\`: URL endpoints mapping.
  - \`middleware/\`: JWT authentication aur error handling.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: A Commercial Restaurant Building",
        hi: "Real-Life Analogy: Commercial Restaurant Ki Two-Story Building",
      },
      body: {
        en: `Think of your MERN application like a modern, two-story restaurant in Mumbai or Delhi:

- **The Multi-Repo Way (Kitchen & Dining Hall in Two Separate Cities)**:
  Imagine the kitchen (Express Backend) is in Noida, and the customer dining hall (React Frontend) is in Gurgaon. Every time a customer orders a butter chicken, the waiter has to take an express train across state borders, pass toll gates, and bring the dish back. If the chef changes the recipe, the menu printer in Gurgaon has no idea!
- **The Monorepo Way (A Single Building with 2 Floors)**:
  1. **Ground Floor Kitchen (The \`/server\` Folder)**: The chef, stoves, and pantry storage (MongoDB) are strictly managed here. Customers never walk into the kitchen.
  2. **First Floor Dining Hall (The \`/client\` Folder)**: Clean tables, aesthetic lights, printed menus, and friendly waitstaff (React UI components).
  3. **The Food Service Elevator (API Communication)**: When a guest orders via menu, the order slips down the elevator (HTTP Request). The kitchen cooks the dish and sends up a hot plate (JSON Response).
  4. **The Master Electric Board at the Reception (Root \`package.json\`)**: The restaurant manager flips one main switch, and lights turn on simultaneously in both the kitchen and dining hall!`,
        hi: `Ek do-manzila restaurant ka example dekhein:

- **Multi-Repo (Kitchen Delhi Mein, Dining Hall Mumbai Mein)**:
  Customer ne butter naan mangi, aur waiter ko train pakad ke doosre shehar jana pad raha hai khana lane ke liye! Dono branches ke alag-alag rules aur alag managers hain jo sync nahi ho paate.
- **Monorepo (Ek Hi Building Ki Do Floors)**:
  1. **Ground Floor Par Kitchen (\`/server\` folder)**: Gas chulhe, ingredients, aur chef (Express + MongoDB). Customers ko kitchen mein ghusne ki ijazat nahi hoti (Server Security).
  2. **First Floor Par Dining Hall (\`/client\` folder)**: AC, sundar tables, aur menus (React UI).
  3. **Service Elevator (API Network Calls)**: Waiter order slip bhejta hai (API Request), kitchen khana pack karke bhejta hai (JSON Response).
  4. **Main Power Switch (Root \`package.json\`)**: Subah manager ek button dabata hai (\`npm run dev\`), aur kitchen aur dining room dono ek saath shuru ho jaate hain!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax & Root Configuration: concurrently & Scripts",
        hi: "Syntax Aur Root Setup: concurrently Aur Master Scripts",
      },
      body: {
        en: `To orchestrate both frontend and backend from the root repository, install \`concurrently\` as a root dev dependency:

\`\`\`bash
npm install -D concurrently
\`\`\`

### Root \`package.json\`
\`\`\`json
{
  "name": "mern-mastery-hub",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently --kill-others-on-fail -n \"SERVER,CLIENT\" -c \"bgBlue.bold,bgGreen.bold\" \"npm run server:dev\" \"npm run client:dev\"",
    "server:dev": "npm run dev --prefix server",
    "client:dev": "npm run dev --prefix client",
    "install:all": "npm install && npm install --prefix server && npm install --prefix client",
    "build": "npm run build --prefix client",
    "start": "npm start --prefix server"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
\`\`\`

### Key Flags Explained:
- \`--prefix <dir>\`: Tells npm to execute the command inside the target subdirectory without having to \`cd\` into it!
- \`--kill-others-on-fail\`: If either the Express backend or Vite frontend crashes, \`concurrently\` immediately terminates the other process so ports don't get stuck open in the background.
- \`-n "SERVER,CLIENT" -c "bgBlue.bold,bgGreen.bold"\`: Displays colored prefix badges in the terminal output so you immediately know which terminal log came from Express vs Vite!`,
        hi: `Root folder se dono servers ko ek saath chalane ke liye \`concurrently\` package use karte hain:

- \`--prefix server\`: Bina \`cd server\` kiye seedhe server folder ka script run karta hai.
- \`--kill-others-on-fail\`: Agar backend crash ho jaye toh frontend bhi band ho jata hai taaki port block na ho.
- Colored labels (\`-c "bgBlue,bgGreen"\`): Terminal logs mein saaf dikhta hai ki kaunsi line Express ki hai aur kaunsi Vite ki.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Master Root package.json & Single-Command Installation",
        hi: "Example 1: Master Root package.json Aur Single-Command Setup",
      },
      body: {
        en: `This setup allows any new developer joining your team to clone the repository and spin up the complete full-stack environment with just two terminal commands:

\`\`\`bash
# Step 1: Install dependencies across root, server, and client in one shot
npm run install:all

# Step 2: Boot Express (port 5000) and Vite (port 5173) simultaneously
npm run dev
\`\`\`

\`\`\`json
// package.json (At root of mern-app/)
{
  "name": "enterprise-mern",
  "version": "1.0.0",
  "scripts": {
    "install:all": "npm install && npm install --prefix server && npm install --prefix client",
    "dev": "concurrently -n \"BACKEND,FRONTEND\" -c \"magenta,cyan\" \"npm run dev --prefix server\" \"npm run dev --prefix client\"",
    "lint": "npm run lint --prefix client && npm run lint --prefix server",
    "test": "npm test --prefix server && npm test --prefix client"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
\`\`\``,
        hi: `Iss setup ka sabse bada fayda:
Naya developer repo clone karke sirf \`npm run install:all\` aur fir \`npm run dev\` chalata hai. Backend aur frontend dono ek click mein bina kisi manual \`cd\` ke connect ho jaate hain.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Comprehensive Root .gitignore for Clean Commits",
        hi: "Example 2: Comprehensive .gitignore File Secrets Aur Node Modules Se Bachne Ke Liye",
      },
      body: {
        en: `A critical mistake in MERN monorepos is accidentally committing nested \`node_modules\` or local \`.env\` secrets. A robust root \`.gitignore\` covers both tiers:

\`\`\`gitignore
# Root .gitignore for MERN Monorepo

# Dependencies (Root, Client, and Server)
node_modules/
client/node_modules/
server/node_modules/

# Environment Variables & Secrets (CRITICAL: Never commit to Git!)
.env
.env.local
.env.production
client/.env
client/.env.local
server/.env
server/.env.local

# Production Build Outputs
client/dist/
client/build/
server/dist/

# Log Files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
logs/
*.log

# Operating System & IDE Artifacts
.DS_Store
Thumbs.db
.vscode/
.idea/
\`\`\``,
        hi: `MERN Monorepo mein \`.gitignore\` file root par rakhi jaati hai jo client aur server dono ke \`node_modules\` aur secret \`.env\` files ko Git mein upload hone se rokti hai.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Serving Compiled React dist/ in Production from Express",
        hi: "Example 3: Production Mein Express Se Compiled React dist/ Serve Karna",
      },
      body: {
        en: `In monolithic deployment (such as deploying the entire MERN app on a single Render or AWS EC2 instance), the Express backend can serve the compiled Vite production assets directly:

\`\`\`javascript
// server/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// 1. API Endpoints
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);

// 2. Production Static Serving
if (process.env.NODE_ENV === 'production') {
  // Point to the compiled Vite output directory
  const clientDistPath = path.resolve(__dirname, '../client/dist');
  app.use(express.static(clientDistPath));

  // Catch-all: Any non-API route serves index.html so React Router handles routing!
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(clientDistPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running in \${process.env.NODE_ENV || 'development'} mode on port \${PORT}\`);
});
\`\`\``,
        hi: `Production mein jab frontend aur backend ek hi server par deploy hote hain:
- \`client/dist\` folder ko Express \`express.static()\` se serve karta hai.
- Wildcard \`app.get('*')\` par \`index.html\` return kiya jata hai taaki React Router client-side routes (jaise \`/dashboard\`) ko smoothly handle kar sake.`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Common Mistakes Aur Unke Fixes",
      },
      body: {
        en: `### 1. Committing .env Files to GitHub
- **Mistake**: Forgetting to add \`.env\` to \`.gitignore\` and pushing MongoDB Atlas connection strings or JWT secrets to a public Git repository.
- **Nasty Consequence**: Automated hacker bots scan GitHub commits in real-time. Within minutes, unauthorized crypto miners or database wipe bots attack your cluster!
- **Fix**: Never commit \`.env\`. Instead, commit a dummy \`.env.example\` file containing empty variable keys.

### 2. Installing Dependencies in the Root Instead of Subfolders
- **Mistake**: Running \`npm install express\` at the root level of the monorepo instead of inside the \`/server\` directory.
- **Why it breaks**: When deployed to cloud environments like Vercel or Render, the build step inspects the target directory's \`package.json\`. Missing dependencies cause immediate build failures.
- **Fix**: Use \`npm install <pkg> --prefix server\` or \`cd server && npm install <pkg>\`.

### 3. Hardcoding localhost:5000 in React Code
- **Mistake**: Writing \`fetch('http://localhost:5000/api/users')\` directly inside React components.
- **Why it fails**: Works locally, but in production, users' browsers attempt to connect to their own local machines instead of your cloud server!
- **Fix**: Use environment variables (\`import.meta.env.VITE_API_URL\`) or a relative path (\`/api/users\`) with a Vite development proxy.`,
        hi: `### 1. .env Files Ko GitHub Par Push Kar Dena
- **Galti**: \`.gitignore\` mein \`.env\` na daalna aur database password public repo mein bhej dena.
- **Nuksan**: Hacker bots GitHub scan karke aapke MongoDB database ko hijack ya delete kar dete hain!
- **Fix**: Hamesha \`.gitignore\` mein \`.env\` rakhein aur repo mein sirf blank \`.env.example\` commit karein.

### 2. Root Par Packages Install Kar Dena
- **Galti**: Server ke packages root par install kar dena.
- **Nuksan**: Cloud deploy hone par server crash ho jata hai kyunki uske apne \`package.json\` mein dependencies gayab hoti hain.
- **Fix**: Hamesha \`--prefix server\` ya \`--prefix client\` use karein.

### 3. Frontend Mein localhost:5000 Hardcode Karna
- **Galti**: React mein \`fetch('http://localhost:5000/api')\` likhna.
- **Nuksan**: Production mein live website par API calls fail ho jati hain.
- **Fix**: Hamesha environment variable ya Vite proxy use karein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Scalable Full-Stack Engineering",
        hi: "Best Practices: Scalable Full-Stack Project Setup",
      },
      body: {
        en: `1. **Maintain a Detailed .env.example**: Every single required environment variable must be documented with helpful comments so team members can get started immediately without guessing variable names.
2. **Keep Business Logic on the Server**: The React frontend is completely public and runs in the user's browser. Never trust client validation alone; always duplicate critical validation on the Express backend using Joi or Zod.
3. **Use a Centralized API Service**: Never scatter raw \`axios.get()\` calls across 50 components. Group endpoints into dedicated service modules (\`services/authService.js\`, \`services/orderService.js\`).
4. **Use Path Aliases in Vite**: Configure \`@\` aliases in \`vite.config.js\` (e.g., \`@/components\`, \`@/hooks\`) to avoid messy relative paths like \`../../../../components/Button\`.`,
        hi: `1. **.env.example Zaroor Banayein**: Har environment variable ka naam aur format document karein taaki nayi machine par setup aasan ho.
2. **Frontend Par Bharosa Na Karein**: Validation hamesha Express backend par bhi karein kyunki browser ka code koi bhi inspect karke manipulate kar sakta hai.
3. **Centralized API Services**: API calls ko components ke andar direct likhne ke bajaye \`services/\` folder mein organize karein.
4. **Vite Path Aliases**: \`@/components\` jaise aliases configure karein taaki lambe \`../../\` relative paths se chhutkara mile.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Interview Ke Zaroori Sawal Aur Jawab",
      },
      body: {
        en: `### Q1: What are the key architectural advantages of a Monorepo over Multi-Repo for a MERN stack application?
**Answer**:
1. **Atomic Commits**: Full-stack features spanning frontend UI and backend API endpoints are committed together in a single Git revision.
2. **Single Toolchain**: Root scripts orchestrate installations, linting, testing, and concurrent local development with one command (\`npm run dev\`).
3. **Coordinated Versioning**: Eliminates drift between API contracts and UI consuming logic.

### Q2: How does an Express backend serve a React SPA in a single-instance production deployment?
**Answer**: The React app is compiled into a static distribution bundle (\`client/dist\`) via \`npm run build\`. Express serves these static files via \`express.static(clientDistPath)\`. To support client-side routing (React Router), Express includes a catch-all wildcard route (\`app.get('*')\`) that returns \`index.html\` for any non-API request, allowing React to mount and resolve the current browser URL.

### Q3: What is the purpose of npm run-script with the \`--prefix\` flag?
**Answer**: The \`--prefix <path>\` flag instructs npm to execute the target script inside the specified subdirectory as if the user had navigated to that folder with \`cd <path>\`, without having to manually change the working directory in the terminal.

### Q4: Why must client and server have separate package.json files in a MERN project?
**Answer**: Because the client runs in a browser JavaScript runtime and depends on bundlers, JSX transformers, and UI packages (Vite, React, Tailwind), whereas the server runs in a Node.js runtime and requires server packages (Express, Mongoose, Bcrypt, JWT). Combining them into a single \`package.json\` causes dependency pollution, increases deploy sizes, and creates version conflicts between Node and browser environments.`,
        hi: `### Q1: Monorepo vs Multi-Repo ka main advantage kya hai?
**Jawab**: Monorepo mein ek hi commit mein backend ka route aur frontend ka UI sync rehta hai. \`concurrently\` se ek hi terminal mein dono servers chalu ho jaate hain aur deployment bohot straightforward rehti hai.

### Q2: Express React ke build files ko production mein kaise serve karta hai?
**Jawab**: React build run karke \`dist/\` folder banata hai. Express \`express.static('client/dist')\` se un static files ko serve karta hai aur wildcard \`app.get('*')\` se \`index.html\` bhejta hai taaki React Router chal sake.

### Q3: \`--prefix\` flag ka kya kaam hota hai?
**Jawab**: Yeh npm ko bina \`cd\` kiye kisi specific subfolder ke andar script execute karne ki suvidha deta hai.

### Q4: Client aur server ke do alag \`package.json\` kyun hone chahiye?
**Jawab**: Client browser ke liye hota hai (React, Tailwind, Vite) aur server Node.js ke liye (Express, Mongoose). Dono ke dependencies aur runtimes bilkul alag hain, isliye unhe separate rakhna best practice hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: MERN Monorepo Cheatsheet",
        hi: "Quick Summary: MERN Monorepo Cheatsheet",
      },
      body: {
        en: `- **Monorepo Architecture**: Clean separation of \`/client\` (Vite + React) and \`/server\` (Node + Express) under a single Git repo.
- **Root Orchestration**: Use \`concurrently\` and \`--prefix\` in the root \`package.json\` to run both servers with \`npm run dev\`.
- **Strict .gitignore**: Always ignore \`node_modules/\` and all \`.env\` files at root, client, and server tiers.
- **Production Serving**: Express serves \`client/dist\` via \`express.static()\` with a wildcard \`*\` fallback to \`index.html\`.
- **Never Hardcode URLs**: Avoid \`localhost:5000\` in React; use environment variables and development proxies.`,
        hi: `- **Monorepo Structure**: \`/client\` aur \`/server\` ek hi repository ke andar organized rehte hain.
- **Root package.json**: \`concurrently\` se single command mein frontend aur backend run karein.
- **Git Security**: \`node_modules\` aur \`.env\` files ko hamesha \`.gitignore\` mein rakhein.
- **Production Serving**: Express static middleware se React ka \`dist/\` bundle serve karein.
- **No Hardcoding**: Frontend mein URLs hardcode na karein, environment variables use karein.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "What is the primary benefit of using concurrently in a MERN monorepo's root package.json?",
      "hi": "MERN monorepo ke root package.json mein concurrently use karne ka primary fayda kya hai?"
    },
    "options": [
      {
        "en": "It automatically compiles C++ code into JavaScript",
        "hi": "Yeh automatically C++ code ko JavaScript mein compile karta hai"
      },
      {
        "en": "It executes multiple npm scripts (e.g., Express server and Vite frontend) concurrently in a single terminal session",
        "hi": "Yeh ek hi terminal session mein multiple npm scripts (Express aur Vite) ko ek saath run karta hai"
      },
      {
        "en": "It creates a free MongoDB Atlas cluster automatically",
        "hi": "Yeh free MongoDB Atlas cluster automatically bana deta hai"
      },
      {
        "en": "It replaces the need for a web browser",
        "hi": "Yeh browser ki zaroorat khatam kar deta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "concurrently allows running multiple CLI processes simultaneously in one terminal window with formatted, colored prefix tags.",
      "hi": "concurrently ek hi terminal mein frontend aur backend dono processes ko ek saath run karne ki suvidha deta hai."
    }
  },
  {
    "question": {
      "en": "Why should .env files NEVER be committed to a public Git repository?",
      "hi": ".env files ko public Git repository mein KABHI BHI commit kyun nahi karna chahiye?"
    },
    "options": [
      {
        "en": "Git crashes if any file begins with a dot",
        "hi": "Dot se shuru hone wali files se Git crash ho jata hai"
      },
      {
        "en": "They contain sensitive credentials (database passwords, API keys, JWT secrets) that hacker bots can exploit",
        "hi": "Isme sensitive passwords, database keys aur JWT secrets hote hain jinhe hacker bots exploit kar sakte hain"
      },
      {
        "en": "Vite and Express automatically delete repositories with .env files",
        "hi": "Vite aur Express .env files wali repositories delete kar dete hain"
      },
      {
        "en": "It violates CSS formatting specifications",
        "hi": "Yeh CSS formatting ke khilaf hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": ".env files store sensitive secrets. Automated scrapers constantly monitor GitHub for database passwords and API tokens. Always use .gitignore and provide an empty .env.example instead.",
      "hi": ".env files mein sensitive database passwords hote hain. Hacker bots GitHub scan karke unhe chura lete hain. Isliye sirf .env.example commit karein."
    }
  },
  {
    "question": {
      "en": "In a production single-instance deployment, how does Express support client-side React routing?",
      "hi": "Production single-instance deployment mein Express client-side React routing ko kaise support karta hai?"
    },
    "options": [
      {
        "en": "By blocking all HTTP GET requests",
        "hi": "Saari HTTP GET requests block karke"
      },
      {
        "en": "By serving index.html on a wildcard (*) fallback route for any non-API request",
        "hi": "Non-API requests ke liye wildcard (*) route par index.html return karke"
      },
      {
        "en": "By converting all React components into PHP files",
        "hi": "Saare React components ko PHP files mein convert karke"
      },
      {
        "en": "By restarting the server on every URL change",
        "hi": "Har URL change par server restart karke"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "By defining a wildcard route app.get('*', ...) that returns index.html, Express lets React Router take over and render the appropriate page component without 404 server errors.",
      "hi": "app.get('*') se index.html return hota hai jisse browser par React Router URL read karke sahi page dikha deta hai."
    }
  },
  {
    "question": {
      "en": "What does the npm run flag '--prefix <path>' achieve?",
      "hi": "npm run flag '--prefix <path>' kya karta hai?"
    },
    "options": [
      {
        "en": "Renames the computer's hard drive",
        "hi": "Computer ki hard drive ka naam badal deta hai"
      },
      {
        "en": "Runs the npm script inside the specified target directory without changing the current working directory",
        "hi": "Bina working directory badle specified target folder ke andar script run karta hai"
      },
      {
        "en": "Installs a VPN proxy",
        "hi": "VPN proxy install karta hai"
      },
      {
        "en": "Deletes all files inside that directory",
        "hi": "Directory ke saare files delete kar deta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "The --prefix flag instructs npm to execute the command inside the target folder as if you had cd'd into it.",
      "hi": "--prefix flag npm ko target subfolder mein script run karne ki ijazat deta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Production MERN Project Folder Structure in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Production MERN Project Folder Structure ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling production mern project folder structure with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Production MERN Project Folder Structure ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Production MERN Project Folder Structure establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Production MERN Project Folder Structure clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Production MERN Project Folder Structure directly resolve?",
      "hi": "Production MERN Project Folder Structure kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Production MERN Project Folder Structure, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Production MERN Project Folder Structure ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Production MERN Project Folder Structure, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Production MERN Project Folder Structure ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Production MERN Project Folder Structure, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Production MERN Project Folder Structure ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Production MERN Project Folder Structure?",
      "hi": "Production MERN Project Folder Structure ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Production MERN Project Folder Structure be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Production MERN Project Folder Structure ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Production MERN Project Folder Structure impact application memory and CPU consumption?",
      "hi": "Production MERN Project Folder Structure ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Production MERN Project Folder Structure?",
      "hi": "Production MERN Project Folder Structure mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Production MERN Project Folder Structure?",
      "hi": "Production MERN Project Folder Structure mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Production MERN Project Folder Structure?",
      "hi": "Production MERN Project Folder Structure mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Production MERN Project Folder Structure, what must the test suite assert?",
      "hi": "Production MERN Project Folder Structure ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Production MERN Project Folder Structure?",
      "hi": "Modular design Production MERN Project Folder Structure mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Production MERN Project Folder Structure be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Production MERN Project Folder Structure ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Production MERN Project Folder Structure properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Production MERN Project Folder Structure kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Production MERN Project Folder Structure in production?",
      "hi": "Production mein Production MERN Project Folder Structure ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Production MERN Project Folder Structure?",
      "hi": "Production MERN Project Folder Structure ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Production MERN Project Folder Structure?",
      "hi": "Production MERN Project Folder Structure mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
  }
],
};
