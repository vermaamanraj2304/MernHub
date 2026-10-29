export default {
  id: "int-env-management",
  title: {
    en: "Managing Environment Variables (VITE_ vs process.env)",
    hi: "Environment Variables: VITE_ Prefix & Backend Security",
  },
  difficulty: "Beginner",
  readTime: 8,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. Client-Side vs Server-Side Environment Variables",
        hi: "1. Client-Side vs Server-Side Environment Variables Ka Farq",
      },
      body: {
        en: `In full-stack MERN applications, configuration parameters (ports, database URIs, API base URLs, secret tokens) must never be hardcoded into source code. Instead, they are stored in **Environment Variables** loaded from \`.env\` files.

However, there is a fundamental security and architectural divide between how the server and client handle environment variables:

### 1. Server-Side Variables (\`process.env\` in Node.js)
- **Runtime Environment**: Executes on the secure Node.js backend.
- **Security Level**: **100% Private & Protected**. Users and browsers cannot access or view these variables.
- **Examples**: MongoDB Atlas connection string, JWT signing secret, Stripe secret key, AWS S3 secret credentials.
- **How it works**: Loaded using the \`dotenv\` package into \`process.env\`.

### 2. Client-Side Variables (\`import.meta.env\` in Vite / React)
- **Runtime Environment**: Bundled into static JavaScript and sent to the **user's web browser**.
- **Security Level**: **100% Public!** Any variable bundled into React can be read by anyone opening Chrome DevTools or inspecting the network tab.
- **Vite Security Guardrail**: Vite will **completely ignore** any environment variable unless it is explicitly prefixed with **\`VITE_\`** (e.g., \`VITE_API_URL\`). This prevents accidentally leaking backend secrets into the public client bundle!`,
        hi: `Full-stack MERN apps mein ports, database URLs, aur secret keys ko kabhi bhi code mein hardcode nahi kiya jata. Inhe \`.env\` files ke andar **Environment Variables** ki tarah rakha jata hai.

Lekin Server aur Client ke environment variables mein zameen-aasmaan ka farq hota hai:

### 1. Server-Side Variables (\`process.env\` in Node.js)
- **Kahan chalta hai**: Server par, jahan browser ki koi reach nahi hoti.
- **Security**: **100% Safe aur Private**.
- **Examples**: MongoDB database password, JWT secret token, payment gateway private key.
- **Kaise use hota hai**: Node.js mein \`dotenv.config()\` ke baad \`process.env.VARIABLE_NAME\`.

### 2. Client-Side Variables (\`import.meta.env\` in Vite)
- **Kahan chalta hai**: User ke phone ya laptop ke browser mein.
- **Security**: **100% Public!** React bundle mein compile hone ke baad koi bhi DevTools kholkar in variables ko dekh sakta hai.
- **Vite Ka Security Guard**: Vite sirf unhi variables ko React code mein bhejta hai jinke aage **\`VITE_\`** likha ho (jaise \`VITE_API_URL\`). Agar aapne \`VITE_\` nahi lagaya toh Vite use client bundle mein leak nahi karega!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Golden Security Rule: Never Put Secrets in Client .env",
        hi: "2. Golden Rule: Client .env Mein Kabhi Secrets Na Dalein",
      },
      body: {
        en: `> [!CAUTION]
> **ANYTHING prefixed with \`VITE_\` is NOT a secret!**
> When you run \`npm run build\`, Vite literally replaces every occurrence of \`import.meta.env.VITE_MY_KEY\` with its plain-text string value inside the compiled JavaScript bundle. If you write:
> \`\`\`env
> # DISASTER: Leaks your database credentials to the entire world!
> VITE_MONGO_URI=mongodb+srv://admin:mypassword@cluster0.mongodb.net
> \`\`\`
> Any user on the internet can view your JavaScript sources in browser DevTools, find the password, and wipe your entire database within seconds!

### What BELONGS in \`client/.env\`:
- \`VITE_API_BASE_URL\` (e.g. \`http://localhost:5000/api\` or \`https://api.myapp.com\`)
- \`VITE_APP_TITLE\` (e.g. \`MERN Mastery Hub\`)
- \`VITE_STRIPE_PUBLISHABLE_KEY\` (Stripe *public* key, starts with \`pk_\`)
- \`VITE_FIREBASE_PUBLIC_CONFIG\`

### What MUST STAY in \`server/.env\`:
- \`MONGO_URI\`
- \`JWT_SECRET\` & \`JWT_EXPIRES_IN\`
- \`STRIPE_SECRET_KEY\` (starts with \`sk_\`)
- \`AWS_SECRET_ACCESS_KEY\`
- \`SMTP_EMAIL_PASSWORD\``,
        hi: `> [!CAUTION]
> **\`VITE_\` se shuru hone wali koi bhi cheez Secret nahi hoti!**
> Build ke waqt Vite \`import.meta.env.VITE_*\` ki jagah plain text string paste kar deta hai. Agar aapne galti se \`VITE_MONGO_URI\` likh diya, toh duniya ka koi bhi insaan aapki website par Right Click -> Inspect karke aapka database password dekh sakta hai aur data delete kar sakta hai!

### Client \`.env\` mein kya hona chahiye:
- \`VITE_API_BASE_URL\`: Backend API ka public URL.
- \`VITE_STRIPE_PUBLISHABLE_KEY\`: Stripe ka public key (\`pk_test_...\`).

### Server \`.env\` mein kya rehna chahiye:
- \`MONGO_URI\`: Database connection string.
- \`JWT_SECRET\`: Authentication tokens sign karne ki key.
- \`STRIPE_SECRET_KEY\`: Payment deduct karne ki private key (\`sk_test_...\`).`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Bank Manager's Locker vs The Reception Notice Board",
        hi: "Real-Life Analogy: Bank Manager Ka Vault Locker vs Reception Ka Notice Board",
      },
      body: {
        en: `Consider how confidentiality works inside an Indian bank branch:

- **Server-Side Environment Variables (\`process.env\`) = The Strongroom Locker**:
  The vault combination lock, branch keys, and master cash reserves are stored strictly inside the manager's private cabin behind biometric security. Bank customers standing in line cannot see the locker combination, and no teller is allowed to shout it in the lobby.
- **Client-Side Environment Variables (\`import.meta.env.VITE_\`) = The LED Notice Board in the Lobby**:
  Above the teller counter, a large digital LED screen displays:
  - Today's Fixed Deposit Interest Rate (7.1%)
  - Branch IFSC Code (\`SBIN0001234\`)
  - Customer Care Hotline Number
  This board is designed specifically for public viewing. If the bank manager accidentally types the vault password onto the lobby LED board, anyone in the street can walk in, read the numbers, and loot the bank!`,
        hi: `Bank ki security ka example dekhein:

- **Server-Side Variables (\`process.env\`) = Manager Ka Strongroom Locker**:
  Bank ki tijori ka password aur cash locker ki chaabi sirf manager ke cabin mein band rehti hai. Bahar line mein khada koi bhi customer use nahi dekh sakta.
- **Client-Side Variables (\`import.meta.env.VITE_\`) = Lobby Ka LED Notice Board**:
  Bank ke counter ke upar laga bada screen jahan sabke samne dikhta hai:
  - Aaj ka Gold Loan interest rate.
  - Branch ka IFSC code.
  - Helpline number.
  Yeh information public ke dekhne ke liye hoti hai. Socho agar manager galti se tijori ka password us notice board par print kar de, toh koi bhi aakar poora bank loot lega!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax & Usage: dotenv in Express & import.meta.env in Vite",
        hi: "Syntax Aur Setup: Express Mein dotenv Aur Vite Mein import.meta.env",
      },
      body: {
        en: `### 1. Backend Setup (\`server/.env\` & \`server.js\`)
Install \`dotenv\`:
\`\`\`bash
npm install dotenv --prefix server
\`\`\`

Create \`server/.env\`:
\`\`\`env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://admin:secret123@cluster0.abcde.mongodb.net/mern_db?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_key_998877
JWT_EXPIRE=7d
\`\`\`

Access in \`server/src/server.js\`:
\`\`\`javascript
import express from 'express';
import dotenv from 'dotenv';

// Must invoke config() at the very top of application entry!
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('FATAL ERROR: MONGO_URI is not defined in environment variables!');
  process.exit(1);
}
\`\`\`

---

### 2. Frontend Setup (\`client/.env\` & React Component)
Create \`client/.env\`:
\`\`\`env
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME="MERN Learning Hub"
\`\`\`

Access in \`client/src/services/api.js\`:
\`\`\`javascript
import axios from 'axios';

// Vite provides environment variables through import.meta.env
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
\`\`\`

### Built-in Vite Environment Constants:
- \`import.meta.env.MODE\`: Current running mode (\`development\`, \`production\`, or \`test\`).
- \`import.meta.env.DEV\`: Boolean (\`true\` during \`npm run dev\`, \`false\` during production build).
- \`import.meta.env.PROD\`: Boolean (\`true\` in production build).`,
        hi: `### Backend Mein Setup:
1. \`dotenv\` package install karein.
2. \`server.js\` ke top par \`dotenv.config()\` call karein.
3. \`process.env.PORT\` aur \`process.env.MONGO_URI\` se variables access karein.

### Frontend Mein Setup (Vite):
1. \`client/.env\` file mein variables ke aage **\`VITE_\`** lagayein: \`VITE_API_URL=http://localhost:5000/api\`.
2. React components mein \`import.meta.env.VITE_API_URL\` se read karein.
3. Vite built-in booleans deta hai: \`import.meta.env.DEV\` aur \`import.meta.env.PROD\`.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Safe Configuration Module with Fallbacks in Express",
        hi: "Example 1: Express Mein Fallbacks Ke Saath Safe Config Module",
      },
      body: {
        en: `Instead of scattering \`process.env\` calls throughout dozens of files, centralize all backend configuration inside a single, validated config module:

\`\`\`javascript
// server/src/config/env.js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT || '5000', 10),
  db: {
    uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_local_db',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_fallback_secret_do_not_use_in_prod',
    expiresIn: process.env.JWT_EXPIRE || '30d',
  },
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  },
};

// Fail fast in production if critical secrets are missing!
if (config.isProd && !process.env.JWT_SECRET) {
  throw new Error('PRODUCTION SECURITY HALT: JWT_SECRET must be explicitly set in production!');
}
\`\`\``,
        hi: `Har file mein alag se \`process.env\` likhne ke bajaye ek central \`config/env.js\` banayein:
- Defaults provide karta hai taaki local machine par app bina crash hue chale.
- Production mein agar \`JWT_SECRET\` gayab ho toh app ko turant halt kar deta hai taaki insecure code live na ho.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Dynamic API Base URL Switching in React",
        hi: "Example 2: React Mein Development vs Production API URL Auto-Switch",
      },
      body: {
        en: `In professional applications, the frontend automatically switches between local development backend and live cloud backend without changing a single line of code, using Vite's mode files.

\`\`\`env
# client/.env.development
VITE_API_URL=http://localhost:5000/api
VITE_ENABLE_MOCK_DATA=true
\`\`\`

\`\`\`env
# client/.env.production
VITE_API_URL=https://api.my-mern-app.com/api
VITE_ENABLE_MOCK_DATA=false
\`\`\`

\`\`\`jsx
// client/src/components/NetworkStatusBadge.jsx
import React from 'react';

export function NetworkStatusBadge() {
  const isDev = import.meta.env.DEV;
  const apiUrl = import.meta.env.VITE_API_URL;
  const appTitle = import.meta.env.VITE_APP_NAME || 'MERN Platform';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
      <span>{appTitle}</span>
      {isDev && (
        <span style={{ backgroundColor: '#fef08a', color: '#854d0e', padding: '2px 6px', borderRadius: '4px' }}>
          DEV MODE (Connecting to: {apiUrl})
        </span>
      )}
    </div>
  );
}
\`\`\``,
        hi: `Vite mode files se development aur production automatically alag ho jate hain:
- \`.env.development\`: Localhost par point karta hai.
- \`.env.production\`: Live cloud server par point karta hai.
- \`npm run build\` karte waqt Vite automatically \`.env.production\` ke values use kar leta hai.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Server-Side Environment Variable Validation with Zod",
        hi: "Example 3: Zod Se Server Startup Par Environment Variables Validate Karna",
      },
      body: {
        en: `In enterprise systems, if an administrator forgets to set an environment variable on cloud deployment, the server might start fine but crash at 2 AM when a user tries to checkout. Validating environment variables on startup prevents this completely.

\`\`\`javascript
// server/src/config/validateEnv.js
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

// Define strict schema for all required environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('5000'),
  MONGO_URI: z.string().url({ message: 'MONGO_URI must be a valid MongoDB connection string' }),
  JWT_SECRET: z.string().min(32, { message: 'JWT_SECRET must be at least 32 characters long for security' }),
  CLIENT_ORIGIN: z.string().url().default('http://localhost:5173'),
});

export function getValidatedEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ FATAL: Invalid or Missing Environment Variables:');
    result.error.issues.forEach((issue) => {
      console.error(\`  - \${issue.path.join('.')}: \${issue.message}\`);
    });
    process.exit(1); // Abort server boot immediately!
  }

  return result.data;
}

export const env = getValidatedEnv();
\`\`\``,
        hi: `Yeh enterprise grade validation hai:
- Zod schema check karta hai ki kya \`MONGO_URI\` sahi URL hai aur \`JWT_SECRET\` kam se kam 32 characters ka hai ya nahi.
- Agar koi variable miss ho gaya ho, toh server start hote hi clean error log karke process exit kar deta hai taaki raat ko 2 baje production crash na ho!`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Common Mistakes Aur Unke Fixes",
      },
      body: {
        en: `### 1. Trying to Use process.env in Vite React Code
- **Mistake**: Writing \`const api = process.env.REACT_APP_API_URL;\` inside a Vite project.
- **Why it breaks**: \`process\` is a global variable exclusive to the Node.js runtime. Modern browser bundlers like Vite do NOT inject a fake \`process\` object by default. This throws \`Uncaught ReferenceError: process is not defined\` in the browser console.
- **Fix**: Use \`import.meta.env.VITE_API_URL\`.

### 2. Calling dotenv.config() After Using process.env
- **Mistake**: Importing a database module that reads \`process.env.MONGO_URI\` BEFORE \`dotenv.config()\` has been invoked in \`server.js\`.
- **Why it breaks**: \`process.env.MONGO_URI\` will evaluate to \`undefined\`, causing Mongoose connection errors!
- **Fix**: Call \`dotenv.config()\` at the very first line of your server entry file before any local configuration imports.

### 3. Assuming .env Changes Auto-Reload Without Restarting
- **Mistake**: Editing a value in \`.env\` and wondering why the application behavior didn't change.
- **Fix**: Environment files are read **once** when the process initializes. You must restart the Node.js / Vite development server whenever you edit a \`.env\` file.`,
        hi: `### 1. Vite Mein process.env Likh Dena
- **Galti**: Vite React app mein \`process.env.API_URL\` likhna.
- **Nuksan**: Browser mein \`ReferenceError: process is not defined\` crash aa jata hai.
- **Fix**: Vite mein hamesha \`import.meta.env.VITE_*\` use karein.

### 2. dotenv.config() Call Karne Se Pehle Variables Read Karna
- **Galti**: Database connect hone ke baad \`dotenv.config()\` likhna.
- **Nuksan**: \`process.env.MONGO_URI\` undefined aata hai aur database connect nahi hota.
- **Fix**: Server file ki pehli line par \`dotenv.config()\` lagayein.

### 3. .env Edit Karke Server Restart Na Karna
- **Fix**: \`.env\` file server boot hone par sirf ek baar padhi jaati hai. Value change karne par terminal mein server restart zaroor karein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Environment Security Hygiene",
        hi: "Best Practices: Environment Security Hygiene",
      },
      body: {
        en: `1. **Commit a Clean .env.example**: Always keep a documented template in your git repo:
   \`\`\`env
   # server/.env.example
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
   JWT_SECRET=your_minimum_32_char_random_secret_here
   \`\`\`
2. **Rotate Secrets Regularly**: If an employee leaves your team or an API key is accidentally exposed for even 5 seconds, rotate the secret immediately in your cloud console.
3. **Use Secret Managers in Production**: On enterprise platforms (AWS Secrets Manager, GCP Secret Manager, Vault), inject secrets into cloud runtime environments directly rather than storing plain-text \`.env\` files on disk.`,
        hi: `1. **.env.example Maintain Karein**: Hamesha ek placeholder \`.env.example\` file Git mein commit karein taaki team members ko pata rahe ki kaunse variables zaroori hain.
2. **Secrets Rotate Karein**: Agar koi key compromise ho jaye, toh turant cloud console mein jakar naya secret generate karein.
3. **Production Mein Secret Managers**: Badi companies mein server disk par \`.env\` rakhne ke bajaye AWS Secrets Manager ya cloud environment settings use kiye jaate hain.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Interview Ke Zaroori Sawal Aur Jawab",
      },
      body: {
        en: `### Q1: Why does Vite require environment variables to be prefixed with VITE_?
**Answer**: Security. In client-side build tools, environment variables are statically inlined into the client-side JavaScript bundle and transmitted to public web browsers. If Vite exposed all environment variables by default, any system secret present on the developer's computer or CI server (e.g., \`AWS_SECRET_KEY\`, \`DATABASE_PASSWORD\`) would be exposed to the public internet. The \`VITE_\` prefix acts as an explicit opt-in requirement.

### Q2: What is the difference between process.env and import.meta.env?
**Answer**:
- \`process.env\` is a runtime object provided by Node.js to access OS-level environment variables in server environments.
- \`import.meta.env\` is a standard ECMAScript metadata object populated by modern ESM bundlers like Vite at build/dev time to provide static client-side configuration.

### Q3: Can a React frontend securely communicate with a payment gateway using secret keys?
**Answer**: Absolutely NOT. Secret keys (like Stripe's Secret Key or PayPal's Client Secret) must **only** reside on the Express backend. The frontend should only use the Publishable Key to collect tokenized card details, which are then passed to an Express endpoint where the secret key is used securely on the server to charge the card.

### Q4: What is the precedence order of environment files in Vite?
**Answer**: Vite loads environment files in the following order (lower files override higher files):
1. \`.env\` (loaded in all cases)
2. \`.env.local\` (loaded in all cases, ignored by git)
3. \`.env.[mode]\` (only loaded in specified mode, e.g. \`.env.development\`)
4. \`.env.[mode].local\` (loaded in specified mode, ignored by git and highest priority).`,
        hi: `### Q1: Vite VITE_ prefix kyun mangta hai?
**Jawab**: Security ke liye. React ka code user ke browser mein download hota hai. Agar Vite saare variables bhej deta, toh system ke private keys internet par leak ho jaate. \`VITE_\` prefix se developer explicitly chunata hai ki kaunsa variable public banana safe hai.

### Q2: process.env aur import.meta.env mein kya antar hai?
**Jawab**: \`process.env\` Node.js backend ka feature hai jo server runtime par chalta hai. \`import.meta.env\` Vite ka modern ESM feature hai jo browser client ke liye variables provide karta hai.

### Q3: Kya payment gateway ka secret key React mein rakh sakte hain?
**Jawab**: Kabhi nahi! Secret key hamesha Express server par rehti hai. React sirf public key use karta hai token generate karne ke liye.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Environment Management Cheatsheet",
        hi: "Quick Summary: Environment Management Cheatsheet",
      },
      body: {
        en: `- **Server Secrets Stay on Server**: Use \`process.env\` via \`dotenv\` for database credentials, JWT secrets, and private API keys.
- **Client Variables Are Public**: Any variable prefixed with \`VITE_\` and read via \`import.meta.env\` is visible in browser DevTools.
- **Never Hardcode Secrets**: Keep secrets strictly in \`.env\` and add \`.env\` to \`.gitignore\`.
- **Provide .env.example**: Keep a blank template with instructions for onboarding.
- **Fail Fast on Boot**: Validate environment variables at server startup using Zod to prevent runtime crashes in production.`,
        hi: `- **Server Secrets**: Database passwords aur JWT keys hamesha server par \`process.env\` se manage karein.
- **Client Variables Public Hain**: \`VITE_\` se shuru hone wali har cheez browser ke inspect element mein dikhti hai.
- **Git Security**: \`.env\` files ko hamesha \`.gitignore\` mein rakhein.
- **.env.example Zaroori Hai**: Team ke liye template maintain karein.
- **Startup Validation**: Server boot hote hi Zod se check karein ki saare variables present hain ya nahi.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "What happens if you store your MongoDB connection string in client/.env as VITE_MONGO_URI?",
      "hi": "Agar aap apna MongoDB connection string client/.env mein VITE_MONGO_URI naam se save kar dete hain, toh kya hota hai?"
    },
    "options": [
      {
        "en": "It is encrypted automatically with AES-256 in the browser",
        "hi": "Browser mein automatically AES-256 se encrypt ho jata hai"
      },
      {
        "en": "It is compiled as plain text into the public JavaScript bundle, allowing any visitor to read your database credentials via DevTools",
        "hi": "Yeh public JS bundle mein plain text ki tarah compile ho jata hai, jisse koi bhi visitor DevTools se database password dekh sakta hai"
      },
      {
        "en": "Vite throws a compile-time error and halts the build",
        "hi": "Vite build halt kar deta hai"
      },
      {
        "en": "MongoDB Atlas automatically creates a firewall block",
        "hi": "MongoDB Atlas firewall block bana deta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "All VITE_ prefixed variables are statically embedded into client JavaScript bundles. Anyone inspecting the website sources can see the value.",
      "hi": "VITE_ wale saare variables client-side JavaScript mein plain text ban jaate hain, isliye database credentials public ho jaate hain."
    }
  },
  {
    "question": {
      "en": "How do you access client-side environment variables in a modern Vite React application?",
      "hi": "Modern Vite React application mein client-side environment variables kaise access kiye jaate hain?"
    },
    "options": [
      {
        "en": "process.env.VITE_VARIABLE_NAME",
        "hi": "process.env.VITE_VARIABLE_NAME"
      },
      {
        "en": "import.meta.env.VITE_VARIABLE_NAME",
        "hi": "import.meta.env.VITE_VARIABLE_NAME"
      },
      {
        "en": "window.ENV.VITE_VARIABLE_NAME",
        "hi": "window.ENV.VITE_VARIABLE_NAME"
      },
      {
        "en": "document.getEnvironmentVariable()",
        "hi": "document.getEnvironmentVariable()"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Vite uses the standard ECMAScript import.meta.env metadata object to expose environment variables to frontend code.",
      "hi": "Vite frontend code mein variables provide karne ke liye import.meta.env use karta hai."
    }
  },
  {
    "question": {
      "en": "Where should dotenv.config() be called in an Express application?",
      "hi": "Express application mein dotenv.config() kahan call hona chahiye?"
    },
    "options": [
      {
        "en": "Inside a React component's useEffect hook",
        "hi": "React component ke useEffect hook ke andar"
      },
      {
        "en": "At the very top of the server entry file before any configuration or database imports",
        "hi": "Server entry file ki sabse pehli line par kisi bhi database import se pehle"
      },
      {
        "en": "Inside the package.json file",
        "hi": "package.json file ke andar"
      },
      {
        "en": "Inside the MongoDB shell",
        "hi": "MongoDB shell ke andar"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "dotenv.config() must run as early as possible so that process.env is populated before any subsequent module accesses it.",
      "hi": "dotenv.config() ko server entry file ke top par hona chahiye taaki baaki modules ke read karne se pehle process.env populate ho sake."
    }
  },
  {
    "question": {
      "en": "Why is environment variable validation on server startup (e.g. using Zod) considered a best practice?",
      "hi": "Server startup par environment variables ko validate karna (jaise Zod se) best practice kyun maana jata hai?"
    },
    "options": [
      {
        "en": "It increases internet speed by 50%",
        "hi": "Yeh internet speed badha deta hai"
      },
      {
        "en": "It causes the server to fail fast with an informative error on boot if critical secrets are missing, rather than crashing unexpectedly later during user requests",
        "hi": "Agar critical secrets miss ho gaye hon toh server startup par hi crash hoke clear error de deta hai, taaki baad mein live user requests par unexpected crash na ho"
      },
      {
        "en": "It prevents users from using dark mode",
        "hi": "Yeh users ko dark mode use karne se rokta hai"
      },
      {
        "en": "It automatically purchases cloud hosting",
        "hi": "Yeh automatically cloud hosting purchase karta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Validating environment variables at startup ensures that configuration errors are caught immediately during deployment rather than causing latent runtime exceptions in production.",
      "hi": "Startup validation se configuration errors deployment ke waqt hi pakad mein aa jaate hain jisse production mein unexpected downtime nahi hota."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Managing Environment Variables (VITE_ vs process.env) in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Environment Variables: VITE_ Prefix & Backend Security ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling managing environment variables (vite_ vs process.env) with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Environment Variables: VITE_ Prefix & Backend Security ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Managing Environment Variables (VITE_ vs process.env) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Managing Environment Variables (VITE_ vs process.env) directly resolve?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Managing Environment Variables (VITE_ vs process.env), applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Managing Environment Variables (VITE_ vs process.env), how is its mental model best conceptualized through real-world analogies?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Managing Environment Variables (VITE_ vs process.env), what syntactic convention is essential to prevent runtime errors?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Managing Environment Variables (VITE_ vs process.env)?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Managing Environment Variables (VITE_ vs process.env) be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Environment Variables: VITE_ Prefix & Backend Security ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Managing Environment Variables (VITE_ vs process.env) impact application memory and CPU consumption?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Managing Environment Variables (VITE_ vs process.env)?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Managing Environment Variables (VITE_ vs process.env)?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Managing Environment Variables (VITE_ vs process.env)?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Managing Environment Variables (VITE_ vs process.env), what must the test suite assert?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Managing Environment Variables (VITE_ vs process.env)?",
      "hi": "Modular design Environment Variables: VITE_ Prefix & Backend Security mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Managing Environment Variables (VITE_ vs process.env) be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Environment Variables: VITE_ Prefix & Backend Security ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Managing Environment Variables (VITE_ vs process.env) properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Environment Variables: VITE_ Prefix & Backend Security kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Managing Environment Variables (VITE_ vs process.env) in production?",
      "hi": "Production mein Environment Variables: VITE_ Prefix & Backend Security ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Managing Environment Variables (VITE_ vs process.env)?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Managing Environment Variables (VITE_ vs process.env)?",
      "hi": "Environment Variables: VITE_ Prefix & Backend Security mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
