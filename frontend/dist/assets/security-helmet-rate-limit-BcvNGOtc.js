const e={id:"exp-security-helmet-rate-limit",title:{en:"Security: Helmet, Morgan Logging & Rate Limiting",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting"},difficulty:"Intermediate",readTime:11,sections:[{type:"concept",heading:{en:"1. Hardening Express for Production",hi:"1. Express Ko Production Ke Liye Secure Karna"},body:{en:`By default, Express is completely unopinionated and comes with zero security headers. An unhardened Express server is vulnerable to:
- **Clickjacking**: Embedding your website in an invisible iframe to steal clicks.
- **Cross-Site Scripting (XSS)**: Injecting malicious client-side scripts.
- **MIME-Type Sniffing**: Tricking browsers into executing text files as JavaScript.
- **Brute-Force & Denial of Service (DoS)**: Automated bot scripts bombarding your login route with 10,000 password attempts per second!

To protect enterprise applications, the industry standard security stack consists of three essential middlewares:
1. **Helmet (\`helmet\`)**: Secures HTTP response headers.
2. **Rate Limiting (\`express-rate-limit\`)**: Restricts repeated requests to public APIs and authentication endpoints.
3. **Morgan (\`morgan\`)**: Professional HTTP request logging for security auditing and debugging.`,hi:`Default roop se Express mein koi built-in security headers nahi hote. Ek unprotected Express server par kai tarah ke attacks ho sakte hain:
- **Clickjacking**: Kisi fraud website ke andar invisible iframe mein aapka page khol kar user se zabardasti click karwana.
- **XSS (Cross-Site Scripting)**: Malicious script inject karna.
- **MIME-Type Sniffing**: Browser ko confuse karke normal text file ko executable virus ki tarah run karwana.
- **Brute-Force Attack**: Bot scripts dwara har second hazaron passwords try karke account hack karna.

Inse bachne ke liye industry standard 3 security middlewares use kiye jaate hain:
1. **Helmet**: 15 alag-alag secure HTTP response headers lagata hai.
2. **Rate Limiting**: Ek IP address se aane wali requests par limit lagata hai taaki bots server crash na kar sakein.
3. **Morgan**: Production mein har ek aane wali request ka audit log record karta hai.`}},{type:"concept",heading:{en:"2. The 'trust proxy' Trap with Rate Limiting",hi:"2. Rate Limiting Aur 'trust proxy' Ka Sabse Bada Trap"},body:{en:`When deploying MERN applications to modern cloud hosting platforms (like Render, Vercel, AWS Elastic Beanstalk, or behind an NGINX reverse proxy):
- The client does NOT connect directly to your Node process.
- The client connects to the **Cloud Load Balancer / Reverse Proxy**, which forwards the request to your Node server.
- As a result, the direct socket IP (\`req.socket.remoteAddress\`) will be the **IP address of the Load Balancer, NOT the real client!**

### The Catastrophic Bug:
If you do not configure Express to trust the proxy, **every single user around the world appears to have the exact same IP address!**
If User A fails their login 5 times, your rate limiter triggers and blocks the Load Balancer IP—instantly locking out EVERY user across the globe!

### The One-Line Fix:
\`\`\`javascript
app.set('trust proxy', 1); // Instructs Express to look at the 'X-Forwarded-For' header!
\`\`\``,hi:`Jab aap kisi cloud platform (Render, AWS, NGINX) par backend deploy karte ho:
- User ka direct connection aapke Node server se nahi hota.
- User pehle Cloud ke **Load Balancer / NGINX Proxy** se connect hota hai, aur proxy request aapke server ko forward karti hai.
- Is wajah se Express ko user ka real IP nahi balki NGINX load balancer ka IP dikhta hai!

### Iska Bhayankar Nuksaan:
Agar aapne Express ko proxy trust karna nahi sikhaya, toh **duniya bhar ke sabhi users ka IP Express ko SAME dikhega!**
Agar kisi ek user ne 5 baar galat password daala, toh rate limiter poore load balancer IP ko block kar dega—aur poori duniya ke saare genuine users lock out ho jayenge!

### Iska 1-Line Solution:
\`\`\`javascript
app.set('trust proxy', 1); // Express ko 'X-Forwarded-For' header se real user IP lene ko kehta hai!
\`\`\``}},{type:"analogy",heading:{en:"Real-Life Analogy: The Bank Vault Fortress & Armed Guard",hi:"Real-Life Analogy: Bank Ka Main Locker, ATM Guard Aur CCTV Cameras"},body:{en:`Imagine the physical security of a **Reserve Bank of India Currency Vault**:

- **Helmet is the Fortified Steel Vault Door**:
  - It locks down all microscopic cracks, shields weak windows, and removes the manufacturer label so thieves cannot research blueprints (**Hides \`X-Powered-By: Express\`**).
- **Rate Limiting is the Security Guard at the ATM Door**:
  - The guard permits you 3 attempts to insert your card and enter your PIN.
  - If a suspicious person attempts 10 wrong PINs within 60 seconds, the guard locks the ATM glass door for 15 minutes (\`429 Too Many Requests\`)!
- **Morgan is the 24x7 Night-Vision CCTV Camera**:
  - It silently records every license plate, visitor entry time, and door badge swipe on digital tape (**Access Audit Log**).`,hi:`Sochiye **Bank Ki High-Security Branch**:

- **Helmet Bank Ka Mazboot Steel Gate Hai**:
  - Yeh saari kamzor khidkiyon ko band karta hai aur building se brand name hata deta hai taaki choron ko pata na chale ki taale kis company ke hain (**\`X-Powered-By\` hide karta hai**).
- **Rate Limiting ATM Ke Gate Par Baitha Guard Hai**:
  - Guard har user ko ATM mein 3 baar PIN try karne deta hai.
  - Agar koi fraud machine mein lagataar 10 baar galat PIN daale, toh guard ATM ka door 15 minute ke liye lock kar deta hai (**Status 429 Too Many Requests**)!
- **Morgan 24 Ghante Chalne Wala HD CCTV Camera Hai**:
  - Yeh aane-jaane wale har insaan ka time, token number aur status video mein record karta rehta hai (**Audit Logging**).`}},{type:"syntax",heading:{en:"4. Syntax: Configuring Helmet, Morgan, and express-rate-limit",hi:"4. Syntax: Helmet, Morgan Aur Rate Limit Ka Setup"},body:{en:`\`\`\`bash
npm install helmet express-rate-limit morgan
\`\`\`

\`\`\`javascript
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

const app = express();

// 1. Trust Reverse Proxy (Mandatory for cloud deployments)
app.set('trust proxy', 1);

// 2. Helmet Security Headers (Mount early)
app.use(helmet());

// 3. HTTP Request Logging (morgan 'combined' for prod, 'dev' for local)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 4. Global API Rate Limiter (Max 100 requests per 15 minutes per IP)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // Limit each IP to 100 requests per windowMs
  standardHeaders: true,     // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false,      // Disable X-RateLimit-* headers
  message: {
    status: 429,
    error: "Too many requests from this IP, please try again in 15 minutes."
  }
});

app.use('/api', globalLimiter);
\`\`\``,hi:`\`\`\`bash
npm install helmet express-rate-limit morgan
\`\`\`

\`\`\`javascript
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

const app = express();

// 1. Cloud proxy ko trust karein
app.set('trust proxy', 1);

// 2. Helmet headers activate karein
app.use(helmet());

// 3. Request Logging activate karein
app.use(morgan('dev'));

// 4. Rate Limiter create karein (15 minute mein max 100 requests)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Aapne bohot zyada requests bhej di hain, 15 minute baad koshish karein."
  }
});

app.use('/api', apiLimiter);
\`\`\``}},{type:"example",heading:{en:"5. Practical Examples: Strict Auth Limiter, File Logging & Helmet Rules",hi:"5. Practical Examples: Strict Auth Limiter, File Logging aur Helmet Rules"},body:{en:"### Example 1: Strict Authentication Rate Limiter (Anti-Brute-Force)\nA dedicated rate limiter attached strictly to `/api/auth/login` and `/api/auth/forgot-password` allowing only 5 attempts every 15 minutes.",hi:`### Example 1: Login Route Par Strict Rate Limiter (Brute-Force Se Bachav)
Login aur Password Reset par sirf 5 attempts allow karne ka dedicated limiter.`},code:{language:"javascript",filename:"authRateLimiter.js",snippet:`// Example 1: Dedicated Login Rate Limiter
import express from "express";
import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json());
app.set("trust proxy", 1);

// Strict limiter for sensitive authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15-minute observation window
  max: 5,                   // Maximum 5 login attempts per IP
  skipSuccessfulRequests: true, // Don't penalize users who type the correct password!
  message: {
    success: false,
    statusCode: 429,
    error: "Too many failed login attempts. For security, your IP is suspended for 15 minutes."
  }
});

// Applying strictly to the login route
app.post("/api/auth/login", authLimiter, (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "pass123") {
    return res.status(200).json({ success: true, token: "jwt_token_sample" });
  }

  // Failed login (increments the rate limit counter!)
  return res.status(401).json({ success: false, error: "Invalid credentials" });
});

app.listen(5013, () => console.log("Security auth server running on port 5013"));`}},{type:"example",heading:{en:"Example 2: Logging Production Access to a Disk File with Morgan",hi:"Example 2: Morgan Se Access Logs Ko Disk File Mein Save Karna"},body:{en:"### Example 2: Permanent Audit Trail\nPiping Morgan HTTP access logs into a local `access.log` file using an appendable file stream.",hi:"### Example 2: Server Access Logs Ko File Mein Write Karna\nProduction audit ke liye `fs.createWriteStream` se `access.log` file generate karna."},code:{language:"javascript",filename:"fileLogging.js",snippet:`// Example 2: Persistent Morgan Logging with WriteStream
import express from "express";
import fs from "node:fs";
import path from "node:path";
import morgan from "morgan";

const app = express();

// Create an appendable write stream for access logs
const logFilePath = path.join(process.cwd(), "access.log");
const accessLogStream = fs.createWriteStream(logFilePath, { flags: "a" });

// 1. Log to console during local development
app.use(morgan("dev"));

// 2. Simultaneously append standard Apache/Combined logs to disk file
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Sneha" }]);
});

app.listen(5014, () => {
  console.log("Logging server online. Appending requests to access.log");
});`}},{type:"example",heading:{en:"Example 3: Customized Helmet Content Security Policy (CSP)",hi:"Example 3: Helmet Content Security Policy (CSP) Rules Customize Karna"},body:{en:`### Example 3: Configuring Safe CSP Directives
Allowing external Google Fonts or Stripe JS libraries through Helmet's Content Security Policy without weakening overall protection.`,hi:`### Example 3: Custom Helmet CSP Directives
Google Fonts ya Stripe libraries ko allow karne ke liye Helmet ka custom configuration.`},code:{language:"javascript",filename:"customHelmet.js",snippet:`// Example 3: Customizing Helmet Headers
import express from "express";
import helmet from "helmet";

const app = express();

// Customizing Content-Security-Policy (CSP)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://js.stripe.com"], // Allow Stripe checkout script
        styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
        connectSrc: ["'self'", "https://api.stripe.com"]
      }
    },
    crossOriginEmbedderPolicy: false // Allows loading cross-origin images smoothly
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Secure Headers Configured with Helmet!</h1>");
});

app.listen(5015, () => console.log("Helmet server online at port 5015"));`}},{type:"mistakes",heading:{en:"6. Common Security Configuration Mistakes",hi:"6. Security Configuration Ki Badi Galtiyan"},mistakes:[{mistake:{en:"Omitting `app.set('trust proxy', 1)` when deploying rate limiting behind NGINX or Render.",hi:"NGINX ya Render ke peeche `app.set('trust proxy', 1)` lagana bhool jana."},correction:{en:"Without trust proxy, all incoming requests share the IP address of the reverse proxy, causing your rate limiter to block all users globally when one user triggers the limit.",hi:"Hamesha `app.set('trust proxy', 1)` likhein taaki Express 'X-Forwarded-For' header se real user ka IP pehchaan sake."},code:`// MANDATORY for all cloud deployments:
app.set('trust proxy', 1);`},{mistake:{en:"Logging sensitive user passwords or credit card data inside Morgan log files.",hi:"Morgan logs mein user ka password ya credit card data print kar dena."},correction:{en:"Never use custom Morgan formats that dump the entire `req.body` without sanitizing passwords, CVVs, or secret tokens. Log only query paths, status codes, and IP addresses.",hi:"Morgan mein poora `req.body` print na karein warna server logs mein passwords plain text mein save ho jayenge."},code:`// DANGEROUS:
// morgan(':method :url :body'); // Leaks passwords!

// SAFE:
morgan('combined'); // Standard safe Apache format`}]},{type:"summary",heading:{en:"7. Production Security Checklist",hi:"7. Production Security Checklist"},body:{en:"- **Always Install Helmet**: `app.use(helmet())` is zero-effort protection against 15 known web vulnerabilities.\n- **Differentiate Rate Limits**: Use a generous rate limit for read-only routes (100 req/15min) and a strict limit for authentication routes (5 failed attempts/15min).\n- **Rotate Logs Daily**: If logging to files, use `rotating-file-stream` so log files are compressed and archived daily rather than filling up your server's SSD.",hi:`- **Helmet Hamesha Lagayein**: Ek line mein 15 essential security headers add ho jaate hain.
- **Login Par Strict Rate Limit**: Read APIs ke liye 100 requests par login route par sirf 5 attempts allow karein.
- **Log Rotation**: Disk files mein log karte waqt purani logs ko daily compress karke archive karein.`}},{type:"interview",heading:{en:"8. Top Interview Questions & Answers",hi:"8. Top Interview Sawal Aur Jawab"},questions:[{q:{en:"What does the Helmet middleware package actually do?",hi:"Helmet middleware package asal mein kya kaam karta hai?"},a:{en:"Helmet is a collection of 15 smaller middleware functions that configure security-related HTTP response headers. It hides the X-Powered-By header, configures Content-Security-Policy (CSP) against XSS, sets X-Frame-Options against Clickjacking, enforces Strict-Transport-Security (HSTS) for HTTPS, and prevents MIME-type sniffing with X-Content-Type-Options: nosniff.",hi:"Helmet 15 security-related HTTP response headers ko automatically set karta hai. Yeh X-Powered-By header ko hide karta hai, XSS se bachne ke liye Content-Security-Policy lagata hai, Clickjacking se bachne ke liye X-Frame-Options set karta hai aur HTTPS enforce karta hai."}},{q:{en:"Why is `app.set('trust proxy', 1)` essential when using express-rate-limit behind a load balancer?",hi:"Load balancer ke peeche rate limiting use karte waqt `app.set('trust proxy', 1)` lagana zaroori kyun hota hai?"},a:{en:"When deployed behind a reverse proxy (like NGINX, Cloudflare, or Render), the incoming network socket IP (`req.ip`) belongs to the proxy, not the client. Setting 'trust proxy' tells Express to extract the actual client IP from the `X-Forwarded-For` header. Without this setting, all users share the proxy IP and a single user's failed attempts will trigger the rate limiter for every user worldwide.",hi:"Cloud platforms par aane wali request pehle load balancer se aati hai, isliye Express ko client ka real IP nahi balki proxy ka IP milta hai. 'trust proxy' enable karne se Express `X-Forwarded-For` header se real user ka IP uthata hai, warna ek user ke block hote hi poore server ke saare users block ho jayenge."}},{q:{en:"What HTTP status code is returned by `express-rate-limit` when a client exceeds their allowance?",hi:"Jab client rate limit exceed kar deta hai toh kaunsa HTTP status code return hota hai?"},a:{en:"HTTP Status Code 429 Too Many Requests. The response also conventionally includes `RateLimit-Limit`, `RateLimit-Remaining`, and `RateLimit-Reset` headers indicating when the client may retry.",hi:"HTTP Status Code 429 Too Many Requests return hota hai, jiske saath retry time batane wale headers bhi aate hain."}}]},{type:"summary",heading:{en:"9. Summary Cheatsheet",hi:"9. Summary Cheatsheet"},body:{en:"- **Helmet**: Secures HTTP response headers; hides `X-Powered-By`.\n- **Rate Limit**: Prevents brute-force & DoS (`429 Too Many Requests`).\n- **Morgan**: Access logging (`dev` locally, `combined` in prod).\n- **Cloud Rule**: Always add `app.set('trust proxy', 1)`.",hi:`- **Helmet**: Security headers lagata hai.
- **Rate Limit**: Brute force attacks rokta hai (Status 429).
- **Morgan**: Access logger.
- **Cloud Niyam**: \`app.set('trust proxy', 1)\` zaroor lagayein.`}}],quiz:[{q:{en:"What HTTP status code is sent when an IP exceeds the allowed threshold in express-rate-limit?",hi:"express-rate-limit mein limit paar hone par kaunsa HTTP status code bheja jata hai?"},options:[{en:"429 Too Many Requests",hi:"429 Too Many Requests"},{en:"403 Forbidden",hi:"403 Forbidden"},{en:"503 Service Unavailable",hi:"503 Service Unavailable"},{en:"400 Bad Request",hi:"400 Bad Request"}],answerIndex:0,explanation:{en:"RFC 6585 specifies HTTP 429 Too Many Requests for rate limiting.",hi:"Rate limiting ke liye official status code 429 Too Many Requests hota hai."}},{q:{en:"Why is `app.set('trust proxy', 1)` required when deploying an Express app on Render or behind an NGINX proxy?",hi:"Render ya NGINX ke peeche Express app deploy karte waqt `app.set('trust proxy', 1)` kyun zaroori hai?"},options:[{en:"To obtain the real client IP address from the X-Forwarded-For header instead of the proxy's IP",hi:"Load balancer ke IP ki jagah X-Forwarded-For header se real client ka IP lene ke liye"},{en:"To double the CPU clock speed of the server",hi:"Server ki CPU speed double karne ke liye"},{en:"To bypass CORS security checks",hi:"CORS check bypass karne ke liye"},{en:"To encrypt all passwords using AES-256",hi:"Passwords encrypt karne ke liye"}],answerIndex:0,explanation:{en:"Trust proxy ensures req.ip points to the client's actual IP from the X-Forwarded-For header rather than the proxy's internal address.",hi:"Yeh Express ko real user IP identify karne mein madad karta hai taaki rate limiter sahi se kaam kare."}},{q:{en:"Which dangerous HTTP header does Helmet disable by default to prevent attackers from discovering your backend framework?",hi:"Backend framework ka pata lagane se rokne ke liye Helmet kaunsa header default mein hide karta hai?"},options:[{en:"X-Powered-By",hi:"X-Powered-By"},{en:"Content-Type",hi:"Content-Type"},{en:"Host",hi:"Host"},{en:"Authorization",hi:"Authorization"}],answerIndex:0,explanation:{en:"Helmet removes the X-Powered-By header so attackers cannot tell that your backend is running on Express.",hi:"Helmet X-Powered-By header ko delete kar deta hai taaki hacker ko pata na chale ki backend Express par chal raha hai."}},{question:{en:"What is the core architectural purpose of Security: Helmet, Morgan Logging & Rate Limiting in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Security Best Practices: Helmet, Morgan & Rate Limiting ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling security: helmet, morgan logging & rate limiting with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Security Best Practices: Helmet, Morgan & Rate Limiting ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Security: Helmet, Morgan Logging & Rate Limiting establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Security: Helmet, Morgan Logging & Rate Limiting directly resolve?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Security: Helmet, Morgan Logging & Rate Limiting, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Security: Helmet, Morgan Logging & Rate Limiting, how is its mental model best conceptualized through real-world analogies?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Security: Helmet, Morgan Logging & Rate Limiting, what syntactic convention is essential to prevent runtime errors?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Security: Helmet, Morgan Logging & Rate Limiting?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Security: Helmet, Morgan Logging & Rate Limiting be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Security Best Practices: Helmet, Morgan & Rate Limiting ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Security: Helmet, Morgan Logging & Rate Limiting impact application memory and CPU consumption?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Security: Helmet, Morgan Logging & Rate Limiting?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Security: Helmet, Morgan Logging & Rate Limiting?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Security: Helmet, Morgan Logging & Rate Limiting?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Security: Helmet, Morgan Logging & Rate Limiting, what must the test suite assert?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Security: Helmet, Morgan Logging & Rate Limiting?",hi:"Modular design Security Best Practices: Helmet, Morgan & Rate Limiting mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Security: Helmet, Morgan Logging & Rate Limiting be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Security Best Practices: Helmet, Morgan & Rate Limiting ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Security: Helmet, Morgan Logging & Rate Limiting properly belong and execute?",hi:"Full-stack MERN architecture mein Security Best Practices: Helmet, Morgan & Rate Limiting kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Security: Helmet, Morgan Logging & Rate Limiting in production?",hi:"Production mein Security Best Practices: Helmet, Morgan & Rate Limiting ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Security: Helmet, Morgan Logging & Rate Limiting?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Security: Helmet, Morgan Logging & Rate Limiting?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}},{question:{en:"Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Security: Helmet, Morgan Logging & Rate Limiting?",hi:"Security Best Practices: Helmet, Morgan & Rate Limiting mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"},options:[{en:"To prevent memory leaks where unreachable or orphaned objects remain retained in heap memory, causing gradual performance degradation and crashes",hi:"Memory leaks rokne ke liye taaki unneeded objects RAM mein jama na hon aur server crash na ho"},{en:"To delete the client's local disk partition",hi:"Client ka local disk partition delete karne ke liye"},{en:"Because JavaScript engines allow only 5 variables in RAM",hi:"JS engine sirf 5 variables allow karta hai"},{en:"Cleanup is unnecessary because garbage collection handles 100% of event listeners automatically",hi:"Cleanup ki zaroorat nahi hoti"}],correctAnswer:0,explanation:{en:"Unclosed connections and dangling event listeners create references that prevent garbage collection, leading to severe memory leaks over time.",hi:"Dangling listeners aur unclosed connections memory leaks banate hain jo V8 heap ko exhaust karke process crash kar dete hain."}}]};export{e as default};
