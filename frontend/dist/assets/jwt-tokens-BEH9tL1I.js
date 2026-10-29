const e={id:"auth-jwt-architecture",title:{en:"JSON Web Tokens (JWT) Architecture",hi:"JWT Tokens: Architecture & Generation"},difficulty:"Intermediate",readTime:12,sections:[{type:"concept",heading:{en:"1. Statefulness vs Statelessness: Why JWTs Dominate Modern Web APIs",hi:"1. Stateful Sessions vs Stateless JWT: Modern Web APIs Ka Standard"},body:{en:`In traditional web applications (like PHP or early Express), authentication was **Stateful**:
1. When a user logged in, the server created a session object in server memory (RAM) and sent back a \`sessionId\` cookie.
2. On every request, the server looked up the \`sessionId\` in RAM to find the user.
3. **The Scaling Problem**: When you scale your application across 5 different server instances or cloud containers behind a load balancer, Server B does not have Server A's RAM memory! You are forced to setup a centralized Redis cluster or configure sticky sessions, introducing infrastructure complexity.

### The Stateless Token Solution: JSON Web Tokens (JWT)
A **JSON Web Token (JWT)** is an open industry standard (RFC 7519) for representing claims securely between two parties.
- Authentication is completely **Stateless**: The server does NOT store the token in RAM or database!
- Instead, the server cryptographically **signs** the token using a secret key and sends it to the client.
- When the client includes the token in future HTTP requests, **any** server instance with the secret key can verify the signature mathematically in microseconds without querying a database or cache!`,hi:`Purani web applications mein authentication **Stateful** hoti thi:
- User login karta tha toh server ki memory (RAM) mein session banta tha aur browser ko \`sessionId\` cookie milti thi.
- **Problem**: Jab app badi hoti hai aur load balancer ke peeche 5 alag-alag servers chalte hain, toh Server 2 ko pata hi nahi hota ki Server 1 ki RAM mein kya session hai! Iske liye alag se Redis cluster lagana padta tha.

### Stateless JWT Ka Solution:
**JSON Web Token (JWT)** authentication ko **Stateless** bana deta hai:
- Server token ko apni memory mein store **nahi** karta!
- Server user ka data (jaise user ID aur role) ek token mein pack karke ek secret key se **digital sign** karke client ko de deta hai.
- Agli baar jab user request bhejta hai, toh load balancer chahe kisi bhi server par request bhej de, wo server bina database ya Redis ko chhue sirf mathematical signature check karke turant verify kar leta hai!`}},{type:"concept",heading:{en:"2. The Anatomy of a JWT: Header, Payload & Signature",hi:"2. JWT Token Ke Teen Parts: Header, Payload Aur Signature"},body:{en:`A JWT is a single string consisting of three distinct parts separated by dots (\`.\`):

\`\`\`text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTFmODliIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDY1NDAwMDB9.s1e8Vw-wP1c_9YQZ2kLm8X0pQr4vWs7jK
├───────────────────────────────────┼──────────────────────────────────────────────────────────┼───────────────────────────────────────┤
                │                                                │                                                 │
          1. HEADER                                         2. PAYLOAD                                       3. SIGNATURE
\`\`\`

### 1. Header (Metadata)
Identifies the token type and cryptographic hashing algorithm used:
\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`
Encoded into Base64Url: \`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\`.

### 2. Payload (The Claims)
Contains the statements about the user and additional metadata:
\`\`\`json
{
  "id": "65a1f89b1234567890abcdef",
  "role": "admin",
  "iat": 1706540000,
  "exp": 1706543600
}
\`\`\`
- \`iat\` (Issued At): Timestamp when token was created.
- \`exp\` (Expiration Time): Timestamp when token expires.
- **CRITICAL WARNING**: **The payload is NOT encrypted!** It is simply Base64Url encoded. Anyone can decode it at [jwt.io](https://jwt.io). **Never store passwords, credit card numbers, or sensitive PII in a JWT payload!**

### 3. Signature (Tamper-Proof Seal)
Created by taking the encoded header, the encoded payload, and your private secret key, and hashing them using HMAC-SHA256:
\`\`\`javascript
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  process.env.JWT_SECRET
)
\`\`\`
The signature guarantees **integrity**. If an attacker edits the payload (e.g. changing \`"role": "user"\` to \`"role": "admin"\`), the signature calculation will no longer match, and the server will reject the token immediately!`,hi:'Ek JWT token teen parts se milkar banta hai jo dots (`.`) se jude hote hain:\n\n`header.payload.signature`\n\n### 1. Header:\nYeh batata hai ki token kis algorithm se bana hai (`HS256`) aur iska type `JWT` hai.\n\n### 2. Payload (Claims):\nIsme user ki information hoti hai (User ID, Role, Expiry time `exp`).\n> **Dhyan Dein**: **Payload Encrypted nahi hota!** Yeh sirf Base64 format mein hota hai jise koi bhi insaan decode karke padh sakta hai. Isliye isme kabhi bhi password ya sensitive data na dalein!\n\n### 3. Signature (Tamper-Proof Seal):\nHeader aur Payload ko aapki secret key (`JWT_SECRET`) ke sath combine karke ek cryptographic seal banayi jaati hai.\nAgar koi hacker payload mein apna role `"user"` se badalkar `"admin"` karne ki koshish karega, toh signature mismatch ho jayega aur server use turant block kar dega!'}},{type:"analogy",heading:{en:"Real-Life Analogy: The Airport Boarding Pass with Encrypted Barcode",hi:"Real-Life Analogy: Airport Ka Boarding Pass Aur Digital Barcode"},body:{en:`Consider how airline boarding passes work at Indira Gandhi International Airport in New Delhi:

- **The Header**:
  The top printed banner: *"Airline: IndiGo, Barcode Standard: IATA-PDF417"*. It tells scanners what format to expect.
- **The Payload (Plain Text Info)**:
  Printed clearly on the paper pass:
  - Passenger: Aman Verma
  - Flight: 6E-204 (Delhi to Bengaluru)
  - Seat: 24B (Economy)
  - Date & Gate: Gate 3, 10:30 AM
  Anyone sitting next to you can glance at your boarding pass and read your name and seat number. It is not encrypted!
- **The Signature (The Encrypted Barcode)**:
  At the bottom of the pass is a 2D QR code / barcode. It was cryptographically generated by IndiGo's airline computer using their private master key.
- **What happens if someone tampers with the pass?**:
  Suppose a passenger takes a black pen and scribbles over "24B (Economy)", neatly rewriting **"1A (First Class Business Suite)"**. When they reach the boarding gate, the CISF security scanner scans the barcode. The barcode mathematically decodes to "24B". The scanner flashes a loud red alarm: *"Tampered Boarding Pass! Detain passenger!"* Because the passenger did not possess the airline's secret signing key, they could not generate a valid new barcode!`,hi:`Airport ke boarding pass ka example dekhein:

- **Header**: Boarding pass ke upar likha hota hai: *"Airline: Air India, Barcode Standard"*.
- **Payload (Saaf Aksharon Mein Data)**:
  Boarding pass par sabke samne likha hota hai:
  - Yatri ka naam: Aman Verma
  - Seat: 28C (Economy)
  - Flight: AI-101
  Yeh data koi bhi padh sakta hai, yeh chupa hua nahi hota.
- **Signature (Official Barcode)**:
  Boarding pass par airline ke private server dwara print kiya gaya digital barcode hota hai.
- **Tampering Ka Anjam**:
  Agar koi passenger pen se apni seat \`28C\` kaat kar \`1A (Business Class)\` likh le aur flight mein ghusne lage, toh gate par scanner barcode scan karte hi red siren baja dega: *"Tampered pass!"* Kyunki us passenger ke paas airline ka official secret digital stamp nahi tha!`}},{type:"syntax",heading:{en:"Syntax & Setup: jsonwebtoken in Node.js",hi:"Syntax Aur Methods: jwt.sign Aur jwt.verify"},body:{en:`Install the \`jsonwebtoken\` package:
\`\`\`bash
npm install jsonwebtoken --prefix server
\`\`\`

### 1. Generating a Token (\`jwt.sign\`)
\`\`\`javascript
import jwt from 'jsonwebtoken';

// Payload should contain non-sensitive identifiers
const payload = {
  id: user._id,
  role: user.role,
};

// Sign with secret key and options
const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: '1d', // 1 day expiration (e.g. '15m', '7d', '24h')
  issuer: 'mern-learning-hub',
});
\`\`\`

### 2. Verifying a Token (\`jwt.verify\`)
\`\`\`javascript
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Token is valid! User ID:', decoded.id);
  console.log('Role:', decoded.role);
  console.log('Expires at:', new Date(decoded.exp * 1000));
} catch (err) {
  if (err.name === 'TokenExpiredError') {
    console.error('Session expired. Please log in again.');
  } else if (err.name === 'JsonWebTokenError') {
    console.error('Invalid token. Signature verification failed!');
  }
}
\`\`\``,hi:"`jsonwebtoken` package use karne ka syntax:\n\n1. `jwt.sign(payload, secret, options)`: Naya token generate karta hai. `expiresIn: '1d'` se expiry set hoti hai.\n2. `jwt.verify(token, secret)`: Token verify karta hai:\n   - Agar token valid hai toh decoded payload return karta hai.\n   - Agar token expire ho gaya ho toh `TokenExpiredError` throw karta hai.\n   - Agar signature galat ho toh `JsonWebTokenError` throw karta hai."}},{type:"example",heading:{en:"Example 1: Centralized JWT Service Helper",hi:"Example 1: Centralized JWT Helper Utility"},body:{en:`In professional applications, all token creation, verification, and decoding logic is isolated inside a reusable utility module:

\`\`\`javascript
// server/src/utils/jwt.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_temporary_fallback_secret_key_123';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const jwtService = {
  // Sign a new token
  generateToken: (payload, expiresIn = JWT_EXPIRES_IN) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
  },

  // Verify token signature & expiration
  verifyToken: (token) => {
    try {
      return { valid: true, decoded: jwt.verify(token, JWT_SECRET), error: null };
    } catch (err) {
      return { valid: false, decoded: null, error: err.name };
    }
  },

  // Decode without verifying (useful for reading expiry on client without secret)
  decodeToken: (token) => {
    return jwt.decode(token);
  },
};
\`\`\`

\`\`\`javascript
// Test usage
const token = jwtService.generateToken({ id: 'user_456', role: 'admin' });
console.log('Generated JWT:', token);

const result = jwtService.verifyToken(token);
console.log('Verification Success?:', result.valid); // true
console.log('User Role:', result.decoded.role);     // admin
\`\`\``,hi:"Yeh clean reusable utility hai:\n- `generateToken`: Consistent options ke sath token sign karta hai.\n- `verifyToken`: Error aane par crash hone ke bajaye `{ valid: false, error }` clean object return karta hai.\n- `decodeToken`: Bina signature check kiye payload inspect karne ke liye use hota hai."}},{type:"example",heading:{en:"Example 2: Issuing JWT on Login with httpOnly Cookie Option",hi:"Example 2: Login Par JWT Generate Karke httpOnly Cookie Mein Bhejna"},body:{en:`This controller shows how to issue a JWT upon successful authentication and deliver it both in JSON response and as a secure \`httpOnly\` cookie:

\`\`\`javascript
// server/src/utils/sendTokenResponse.js
import { jwtService } from './jwt.js';

export const sendTokenResponse = (user, statusCode, res) => {
  // 1. Generate JWT containing user ID and role
  const token = jwtService.generateToken({ id: user._id, role: user.role }, '7d');

  // 2. Cookie options
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true, // Prevents malicious JavaScript from reading cookie via XSS!
    secure: isProduction, // HTTPS only in production!
    sameSite: isProduction ? 'strict' : 'lax', // CSRF protection
  };

  // 3. Set cookie and send JSON payload
  res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token, // Also provided for mobile apps or Bearer header clients
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
};
\`\`\``,hi:"Login ke waqt token bhejne ka best practice:\n- `httpOnly: true` cookie set karne se browser ke XSS attacks se token chori nahi ho sakta.\n- `secure: true` se cookie sirf HTTPS par transmit hoti hai.\n- Sath hi JSON response mein bhi token return kiya jata hai taaki mobile apps aur Postman testing aasan rahe."}},{type:"example",heading:{en:"Example 3: Verifying Bearer Token in Express Auth Middleware",hi:"Example 3: Express Middleware Mein Bearer Token Verify Karna"},body:{en:`This Express middleware intercepts requests to protected routes, extracts the token from the \`Authorization: Bearer <token>\` header or cookie, verifies its signature, and injects \`req.user\` into subsequent route handlers.

\`\`\`javascript
// server/src/middleware/protect.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check Authorization Bearer header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Fallback: Check httpOnly cookie
  else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // If no token exists, block request
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. Not logged in.' });
  }

  try {
    // 3. Verify signature & expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Fetch user from DB to verify user still exists and hasn't been deleted
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists.' });
    }

    // 5. Inject user into request object for controllers to use!
    req.user = currentUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid authentication token.' });
  }
};
\`\`\``,hi:"Protected routes ke liye middleware:\n1. `req.headers.authorization` ya cookies se token nikalta hai.\n2. `jwt.verify()` se signature check karta hai.\n3. Database se user verify karta hai (taaki deleted users block ho sakein).\n4. `req.user = currentUser` set karke next route handler ko control de deta hai!"}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Common Mistakes Aur Unke Fixes"},body:{en:"### 1. Storing Passwords or Sensitive Data in the JWT Payload\n- **Mistake**: Writing `jwt.sign({ id: user._id, password: user.password }, secret)`.\n- **Why this is catastrophic**: The payload is **NOT encrypted**! It is merely Base64Url encoded. Anyone with access to network logs, browser storage, or jwt.io can decode and read the plain password instantly!\n- **Fix**: Store only minimal, non-sensitive claims (e.g. `id` and `role`).\n\n### 2. Using a Short or Weak Secret Key\n- **Mistake**: Using a trivial string like `JWT_SECRET=\"secret123\"`.\n- **Why it breaks**: Hackers can use offline dictionary cracking tools (like Hashcat) to test billions of combinations against a captured token and discover your secret in seconds. Once discovered, they can forge valid admin tokens!\n- **Fix**: Use a cryptographically generated 256-bit secret:\n  ```bash\n  node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"\n  ```\n\n### 3. Not Setting an Expiration Time (expiresIn)\n- **Mistake**: Calling `jwt.sign({ id: user._id }, secret)` without specifying `expiresIn`.\n- **Why it hurts**: If no expiration is configured, the token remains **valid forever**! If a user's token is intercepted, the attacker has permanent access until the secret key is changed.\n- **Fix**: Always configure an expiration (e.g. `expiresIn: '15m'` or `expiresIn: '24h'`).",hi:`### 1. Payload Mein Passwords Ya Secrets Daal Dena
- **Galti**: \`jwt.sign({ password: user.password })\` likhna.
- **Nuksan**: Payload bilkul encrypted nahi hota! Yeh Base64 mein hota hai jise koi bhi jwt.io par paste karke ek second mein padh sakta hai.
- **Fix**: Payload mein sirf User ID aur Role hi rakhein.

### 2. Kamzor Secret Key Rakhna
- **Galti**: \`JWT_SECRET="mysecret123"\` rakhna.
- **Nuksan**: Hackers offline brute force tools se 10 second mein aapka secret guess kar lenge aur khud Admin token bana lenge!
- **Fix**: Kam se kam 32 characters ka random cryptographic hex key use karein.

### 3. Expiration Time Na Lagana
- **Galti**: \`expiresIn\` bhool jana.
- **Nuksan**: Token hamesha ke liye zinda rehta hai. Agar kisi ka token chori hua toh hacker hamesha uske account mein ghusa rahega.
- **Fix**: Hamesha short-lived expiration (\`'15m'\` ya \`'1d'\`) set karein.`}},{type:"tip",heading:{en:"Best Practices: Scalable Token Architecture",hi:"Best Practices: Scalable Token Architecture"},body:{en:'1. **Keep Payloads Small**: Keep payload under 1 KB. Remember that every single HTTP request will transmit this string in the headers. Bloated tokens degrade network bandwidth.\n2. **Never Put Database Objects in Payload**: Do not put the entire `user` Mongoose document inside `jwt.sign(user)`. It exposes internal properties and inflates token size.\n3. **Use Asymmetric Keys (RS256) for Microservices**: In multi-service microservice architectures, the Auth service signs tokens using a Private Key, and all other services verify tokens using a Public Key without needing access to the private signing secret.\n4. **Implement Token Revocation**: Because JWTs are stateless, you cannot "delete" a valid token before it expires. For instant logouts, maintain a Redis token blacklist or increment a `tokenVersion` counter in the user database model.',hi:"1. **Payload Chota Rakhein**: Poora Mongoose document token mein na dalein. Har API call ke sath yeh header mein jata hai, isliye sirf `id` aur `role` hi rakhein.\n2. **Microservices Ke Liye RS256**: Badi apps mein Private/Public key pair use karein taaki verification services ko private key ki zaroorat na pade.\n3. **Token Revocation (Logout)**: JWT ko expire hone se pehle revoke karne ke liye Redis blacklist ya user schema mein `tokenVersion` maintain karein."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:'### Q1: What are the three parts of a JSON Web Token and how are they separated?\n**Answer**: A JWT consists of three parts separated by period dots (`.`):\n1. **Header**: Base64Url-encoded JSON containing the token type (`JWT`) and signing algorithm (e.g. `HS256`).\n2. **Payload**: Base64Url-encoded JSON containing claims (e.g. user ID, role, issued at, expiration time).\n3. **Signature**: A cryptographic hash generated by hashing the encoded header + encoded payload with the server\'s private secret key.\n\n### Q2: Is the payload of a standard JWT encrypted?\n**Answer**: **NO.** In a standard JWS (JSON Web Signature), the payload is only **encoded** using Base64Url, NOT encrypted. Anyone who intercepts the token can decode it and read all claims. JWTs provide **data integrity and tamper-evidence**, NOT confidentiality. Sensitive data (passwords, social security numbers) must never be stored in a JWT payload.\n\n### Q3: How does the server verify a JWT without checking a database?\n**Answer**: The server takes the incoming token\'s header and payload, and applies the same HMAC-SHA256 mathematical algorithm using its own private `JWT_SECRET`. It then compares the resulting hash against the token\'s signature. If they match, the server mathematically guarantees that the payload was created by the server and has not been altered in transit, all without querying a database.\n\n### Q4: What happens if an attacker tampers with the payload of a JWT?\n**Answer**: If an attacker alters any character in the payload (for instance, changing `"role": "user"` to `"role": "admin"`), the server\'s signature recalculation will produce a completely different cryptographic hash than the signature sent by the attacker. Because the attacker does not possess the server\'s `JWT_SECRET`, they cannot compute the correct corresponding signature. `jwt.verify()` will reject the token with `JsonWebTokenError: invalid signature`.',hi:`### Q1: JWT ke teen parts kaunse hote hain?
**Jawab**:
1. **Header**: Algorithm aur type (\`HS256\`).
2. **Payload**: User claims (ID, role, exp).
3. **Signature**: Header aur payload ko secret key se hash karke banayi gayi cryptographic seal.
Teeno dots (\`.\`) se jude hote hain.

### Q2: Kya JWT ka payload encrypted hota hai?
**Jawab**: **Nahi.** Payload sirf Base64 format mein hota hai jise koi bhi padh sakta hai. JWT ka maksad data ko chupana nahi balki yeh ensure karna hota hai ki data raste mein modify na hua ho (Tamper-proofing).

### Q3: Server bina database ke token kaise verify karta hai?
**Jawab**: Server aane wale token ke header aur payload ko apni secret key se dobara hash karta hai. Agar naya hash token ke signature se match ho jaye, toh mathematically prove ho jata hai ki token authentic hai aur kisi ne use chheda nahi hai.

### Q4: Agar hacker payload badal de toh kya hoga?
**Jawab**: Signature mismatch ho jayega aur server \`invalid signature\` error dekar request turant reject kar dega.`}},{type:"summary",heading:{en:"Quick Summary: JWT Architecture Cheatsheet",hi:"Quick Summary: JWT Architecture Cheatsheet"},body:{en:"- **Stateless Authentication**: Server verifies signatures mathematically without storing session state in RAM.\n- **Three-Part Structure**: `header.payload.signature` separated by dots.\n- **Payload Is NOT Secret**: Base64Url encoded; never store passwords or sensitive data in it.\n- **Signature Guarantees Integrity**: Any modification to the payload invalidates the signature.\n- **Always Configure Expiry**: Always pass `expiresIn: '15m'` or `'24h'`.\n- **Strong Secret Key**: Use at least 256 bits of cryptographically random characters for `JWT_SECRET`.",hi:`- **Stateless**: Server ko session RAM mein store karne ki zaroorat nahi padti.
- **3 Parts**: \`header.payload.signature\` dots se separated hote hain.
- **Payload Secret Nahi Hai**: Isme sirf ID aur role dalein, sensitive data nahi.
- **Signature Se Tamper-Proofing**: Payload change karne par signature invalid ho jata hai.
- **Expiration Zaroori Hai**: Hamesha \`expiresIn\` set karein.
- **Strong Secret**: Kam se kam 32 characters ka random hex key use karein.`}}],quiz:[{question:{en:"Why is it unsafe to store passwords or credit card numbers in a standard JWT payload?",hi:"Standard JWT payload mein password ya credit card numbers store karna unsafe kyun hai?"},options:[{en:"Because JWT payloads are automatically converted into public YouTube videos",hi:"Kyunki JWT payloads YouTube videos ban jaate hain"},{en:"Because JWT payloads are only Base64Url encoded (not encrypted), meaning anyone who intercepts the token can decode and read the plain text data",hi:"Kyunki JWT payloads sirf Base64Url encoded hote hain (encrypted nahi), jisse koi bhi token ko decode karke plain text padh sakta hai"},{en:"Because MongoDB deletes JWT tokens automatically",hi:"Kyunki MongoDB JWT tokens delete kar deta hai"},{en:"Because JSON does not support numbers",hi:"Kyunki JSON numbers support nahi karta"}],correctAnswer:1,explanation:{en:"A standard JWT provides tamper-evidence (integrity), not confidentiality. Base64Url encoding is easily reversible by anyone visiting jwt.io.",hi:"JWT payload encrypted nahi hota, sirf Base64Url encoded hota hai jise koi bhi insaan bina kisi key ke decode kar sakta hai."}},{question:{en:"How does an Express server verify that a JWT has not been tampered with by a malicious user?",hi:"Express server yeh kaise verify karta hai ki kisi hacker ne JWT token ke sath chhedchhad nahi ki hai?"},options:[{en:"By calling the user on their mobile phone",hi:"User ko phone call karke"},{en:"By taking the header and payload, re-calculating the HMAC-SHA256 signature using its secret key, and comparing it to the token's signature",hi:"Header aur payload ko apni secret key se dobara hash karke token ke signature se compare karke"},{en:"By restarting the operating system",hi:"Operating system restart karke"},{en:"By asking Google Chrome for permission",hi:"Google Chrome se permission maang kar"}],correctAnswer:1,explanation:{en:"The server re-hashes the incoming header and payload with JWT_SECRET. If the resulting hash matches the signature on the token, the token is verified.",hi:"Server secret key se naya hash calculate karta hai aur dekhta hai ki kya wo token ke signature se match karta hai."}},{question:{en:"Which HTTP header is standard for transmitting a JWT from a frontend client to an Express API?",hi:"Frontend se Express API tak JWT bhejne ke liye kaunsa standard HTTP header use kiya jata hai?"},options:[{en:"Content-Type: token/jwt",hi:"Content-Type: token/jwt"},{en:"Authorization: Bearer <token>",hi:"Authorization: Bearer <token>"},{en:"User-Agent: JWT",hi:"User-Agent: JWT"},{en:"Accept-Token: <token>",hi:"Accept-Token: <token>"}],correctAnswer:1,explanation:{en:"The RFC standard for HTTP token authentication is the Authorization header with the Bearer scheme: Authorization: Bearer <token>.",hi:"Standard header Authorization hota hai jisme Bearer scheme ke sath token bheja jata hai: Authorization: Bearer <token>."}},{question:{en:"What error does jwt.verify() throw when a token has passed its exp timestamp?",hi:"Jab token ka exp timestamp nikal chuka hota hai, tab jwt.verify() kaunsa error throw karta hai?"},options:[{en:"TokenExpiredError",hi:"TokenExpiredError"},{en:"DatabaseConnectionError",hi:"DatabaseConnectionError"},{en:"SyntaxError",hi:"SyntaxError"},{en:"PortBlockedError",hi:"PortBlockedError"}],correctAnswer:0,explanation:{en:"The jsonwebtoken library throws TokenExpiredError when the current time is greater than the exp claim timestamp.",hi:"jsonwebtoken library TokenExpiredError throw karti hai jab token expire ho chuka ho."}},{question:{en:"What is the core architectural purpose of JSON Web Tokens (JWT) Architecture in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein JWT Tokens: Architecture & Generation ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling json web tokens (jwt) architecture with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath JWT Tokens: Architecture & Generation ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"JSON Web Tokens (JWT) Architecture establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"JWT Tokens: Architecture & Generation clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does JSON Web Tokens (JWT) Architecture directly resolve?",hi:"JWT Tokens: Architecture & Generation kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without JSON Web Tokens (JWT) Architecture, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"JWT Tokens: Architecture & Generation ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about JSON Web Tokens (JWT) Architecture, how is its mental model best conceptualized through real-world analogies?",hi:"JWT Tokens: Architecture & Generation ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing JSON Web Tokens (JWT) Architecture, what syntactic convention is essential to prevent runtime errors?",hi:"JWT Tokens: Architecture & Generation ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with JSON Web Tokens (JWT) Architecture?",hi:"JWT Tokens: Architecture & Generation ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should JSON Web Tokens (JWT) Architecture be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye JWT Tokens: Architecture & Generation ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of JSON Web Tokens (JWT) Architecture impact application memory and CPU consumption?",hi:"JWT Tokens: Architecture & Generation ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within JSON Web Tokens (JWT) Architecture?",hi:"JWT Tokens: Architecture & Generation mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in JSON Web Tokens (JWT) Architecture?",hi:"JWT Tokens: Architecture & Generation mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in JSON Web Tokens (JWT) Architecture?",hi:"JWT Tokens: Architecture & Generation mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for JSON Web Tokens (JWT) Architecture, what must the test suite assert?",hi:"JWT Tokens: Architecture & Generation ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in JSON Web Tokens (JWT) Architecture?",hi:"Modular design JWT Tokens: Architecture & Generation mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should JSON Web Tokens (JWT) Architecture be architected to support horizontal scaling?",hi:"Traffic 100x badhne par JWT Tokens: Architecture & Generation ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does JSON Web Tokens (JWT) Architecture properly belong and execute?",hi:"Full-stack MERN architecture mein JWT Tokens: Architecture & Generation kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with JSON Web Tokens (JWT) Architecture in production?",hi:"Production mein JWT Tokens: Architecture & Generation ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for JSON Web Tokens (JWT) Architecture?",hi:"JWT Tokens: Architecture & Generation ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in JSON Web Tokens (JWT) Architecture?",hi:"JWT Tokens: Architecture & Generation mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
