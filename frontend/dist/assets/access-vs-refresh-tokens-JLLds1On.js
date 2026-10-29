const e={id:"auth-tokens-refresh",title:{en:"Access Tokens vs Refresh Tokens Strategy",hi:"Short-lived Access Token vs Refresh Token Strategy"},difficulty:"Advanced",readTime:13,sections:[{type:"concept",heading:{en:"1. The Single-Token Dilemma: Security vs User Convenience",hi:"1. Single-Token Ki Musibat: Security vs User Convenience"},body:{en:`When designing token-based authentication with a single JSON Web Token, software engineers face an impossible tradeoff:

### Option A: The Long-Lived Token (e.g. 30 Days)
- **Convenience**: Users log in once and stay logged in for a whole month.
- **Security Catastrophe**: Because JWTs are stateless, you cannot easily revoke a token! If a token is stolen (via malicious browser extensions, XSS attacks, or network interception), the attacker enjoys unrestricted access to the victim's account for **30 days**.

### Option B: The Short-Lived Token (e.g. 15 Minutes)
- **Security**: Maximum security. If stolen, the token becomes useless after 15 minutes.
- **User Experience Nightmare**: Every 15 minutes, the user's active session expires and they are abruptly booted out to the login screen to re-type their password!

---

### The Dual-Token Solution: Access Token + Refresh Token
The industry-standard solution used by Google, Spotify, and GitHub is the **Dual-Token Architecture**:

1. **Access Token (Short-Lived: 10-15 Minutes)**:
   - Sent in the \`Authorization: Bearer <token>\` header on **every single API request**.
   - Kept in browser memory (JavaScript variables) or a short-lived state.
   - If intercepted, the blast radius is tiny because it expires in minutes.
2. **Refresh Token (Long-Lived: 7-30 Days)**:
   - Stored in a secure, **\`httpOnly\`, \`SameSite=Strict\`, \`secure\` cookie** that JavaScript cannot access.
   - Used **only** at a single endpoint: \`POST /api/v1/auth/refresh-token\`.
   - When the 15-minute access token expires, the client silently calls the refresh endpoint in the background to obtain a fresh access token without user friction!`,hi:`Jab aap sirf ek single JWT token use karte hain, toh ek bohot badi dilemma aati hai:

### Scenario 1: Agar Token 30 Din Ka Banayein
- User ko baar-baar login nahi karna padta (Great UX).
- **Lekin Bada Khatra**: Kyunki JWT stateless hota hai, aap use beech mein cancel nahi kar sakte! Agar kisi hacker ne token chura liya, toh wo 30 din tak user ka account bina kisi rok-tok ke chalayega.

### Scenario 2: Agar Token 15 Minute Ka Banayein
- Super Safe: Hacker ko mil bhi gaya toh 15 minute mein expire ho jayega.
- **Lekin Bekaar UX**: Har 15 minute baad user website se bahar phek diya jayega aur use dobara password daalna padega!

---

### Dual-Token Architecture Ka Solution:
Google aur Amazon jaisi companies **Do Tokens** use karti hain:

1. **Access Token (Chota: 10-15 Minute)**:
   - Har API call ke sath \`Bearer\` header mein jata hai.
   - 15 minute mein expire ho jata hai taaki chori hone par nuksan na ho.
2. **Refresh Token (Lamba: 7-30 Din)**:
   - Isse secure \`httpOnly\` cookie mein rakha jata hai jise koi hacker XSS script se chura nahi sakta.
   - Yeh sirf ek hi kaam karta hai: Jab 15 minute wala Access Token expire ho jata hai, toh background mein chupke se naya Access Token mangwa leta hai bina user ko pareshan kiye!`}},{type:"concept",heading:{en:"2. Refresh Token Rotation (RTR) & Reuse Detection",hi:"2. Refresh Token Rotation (RTR) Aur Hackers Se Reuse Detection"},body:{en:`What happens if an attacker somehow manages to steal a long-lived Refresh Token?
If refresh tokens were permanent, the attacker could generate infinite access tokens forever. To solve this, enterprise systems implement **Refresh Token Rotation (RTR)**:

### How Refresh Token Rotation Works:
1. Every time the client uses a refresh token to get a new access token, the server **invalidates the used refresh token** and issues a **brand-new refresh token** alongside the access token.
2. The client replaces the old refresh token with the new one.
3. Each refresh token can only ever be used **exactly once**!

### Automatic Reuse Detection (The Breach Tripwire):
Suppose an attacker intercepts Refresh Token #1.
1. The legitimate user's browser uses Refresh Token #1 to get Refresh Token #2.
2. 5 minutes later, the attacker attempts to use their stolen Refresh Token #1.
3. The server checks its database, sees that Refresh Token #1 was **already used and invalidated**, and immediately detects a security breach!
4. **The Security Action**: The server instantly invalidates **the entire family of tokens** for that user and revokes all active sessions across every device, forcing the real user to re-authenticate with their password!`,hi:`Agar hacker kisi tarah Refresh Token chura le toh kya hoga? Isse nipatne ke liye **Refresh Token Rotation (RTR)** use kiya jata hai:

### Refresh Token Rotation Kaise Kaam Karta Hai:
1. Har baar jab client refresh token dekar naya access token mangta hai, toh server purane refresh token ko **delete** kar deta hai aur ek **brand new refresh token** issue karta hai.
2. Ek refresh token poori zindagi mein sirf **ek hi baar** use ho sakta hai!

### Reuse Detection (Chor Pakadne Ka Trap):
Socho hacker ne Refresh Token #1 chura liya.
1. Real user ne Token #1 use karke Token #2 le liya.
2. 2 minute baad hacker ne wahi purana Token #1 server ko bheja.
3. Server database mein dekhta hai: *"Token #1 toh pehle hi use ho chuka hai! Yeh pakka hacker hai!"*
4. **Action**: Server turant us user ke saare devices ke saare tokens cancel kar deta hai aur account freeze kar deta hai!`}},{type:"analogy",heading:{en:"Real-Life Analogy: Hotel Room Keycard vs Passport at Reception Safe",hi:"Real-Life Analogy: Hotel Room Ka Keycard vs Reception Ke Safe Mein Passport"},body:{en:`Imagine staying at a luxury 5-star hotel in Goa:

- **The Access Token (The Plastic RFID Room Keycard)**:
  You carry this lightweight plastic card in your pocket to enter your room, open the gym, and unlock the swimming pool gate. It gets swiped 20 times a day. If you accidentally drop the plastic card in the sand, it doesn't matter: the hotel keycard automatically expires after 15 minutes! The person who finds it cannot enter your room tonight.
- **The Refresh Token (Your Original Passport in the Hotel Manager's Safe)**:
  You would NEVER carry your physical government passport to the swimming pool or beach! Your passport stays securely locked inside the hotel manager's vault behind biometric security (\`httpOnly\` cookie).
- **The Silent Rotation**:
  When your 15-minute plastic room card stops working, you walk up to the reception desk. The front desk clerk checks the master registry, takes your old expired plastic card, drops it into a paper shredder (invalidation), and hands you a freshly minted 15-minute card! You continue your vacation seamlessly without having to re-book your entire reservation.`,hi:`Ek 5-star hotel ka example dekhein:

- **Access Token (Plastic RFID Room Card)**:
  Aap ise jeb mein lekar ghoomte hain room ka darwaza kholne ya swimming pool jane ke liye. Agar yeh card pool ke paas gir bhi jaye, toh chinta nahi: yeh 15 minute baad automatically deactivate ho jata hai! Chor isse raat ko aapka kamra nahi khol sakta.
- **Refresh Token (Hotel Ke Safe Mein Rakha Asli Passport)**:
  Aap apna original passport pool ya beach par lekar nahi ghoomte! Passport hotel ke main safe vault (\`httpOnly\` cookie) mein band rehta hai.
- **Silent Rotation Flow**:
  Jab plastic room card expire ho jata hai, aap counter par jaate hain. Manager purana card shredder mein daal kar delete karta hai aur aapko naya plastic card thama deta hai!`}},{type:"syntax",heading:{en:"Syntax & Schema: Dual Secrets & Database Storage",hi:"Syntax Aur Setup: Do Alag Secrets Aur Mongoose Schema"},body:{en:`### 1. Two Dedicated Secrets in \`server/.env\`
Never use the same secret key for both tokens!
\`\`\`env
# server/.env
ACCESS_TOKEN_SECRET=super_secret_access_key_998877665544332211
ACCESS_TOKEN_EXPIRE=15m

REFRESH_TOKEN_SECRET=completely_different_refresh_secret_aabbccddeeff
REFRESH_TOKEN_EXPIRE=7d
\`\`\`

### 2. User Schema with Refresh Token Storage
\`\`\`javascript
// server/src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, default: 'user' },
  // Store active refresh tokens with creation timestamps
  refreshTokens: [
    {
      token: { type: String, required: true },
      createdAt: { type: Date, default: Date.now, expires: '7d' }, // Auto-purge expired tokens
    },
  ],
});
\`\`\`

### 3. Signing Both Tokens
\`\`\`javascript
// Access token: only 15 minutes!
const accessToken = jwt.sign(
  { id: user._id, role: user.role },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: '15m' }
);

// Refresh token: 7 days!
const refreshToken = jwt.sign(
  { id: user._id },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: '7d' }
);
\`\`\``,hi:"Dual token setup karne ke niyam:\n1. `.env` mein **do alag secrets** rakhein: `ACCESS_TOKEN_SECRET` (15 minute) aur `REFRESH_TOKEN_SECRET` (7 din).\n2. User model mein `refreshTokens` array rakhein taaki valid tokens track ho sakein.\n3. Access token mein user ka role aur ID rakhein; refresh token mein sirf User ID."}},{type:"example",heading:{en:"Example 1: Generating Dual Tokens on Login Controller",hi:"Example 1: Login Par Access Token Aur Refresh Cookie Issue Karna"},body:{en:`When a user logs in, the controller generates both tokens, saves the refresh token to the database, sets an \`httpOnly\` cookie for the refresh token, and returns the short-lived access token in the JSON body.

\`\`\`javascript
// server/src/controllers/authTokensController.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 1. Create short-lived Access Token (15 mins)
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // 2. Create long-lived Refresh Token (7 days)
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // 3. Save refresh token to user document in MongoDB
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    // 4. Set refresh token in secure httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 5. Send access token in JSON response
    res.status(200).json({
      success: true,
      accessToken,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};
\`\`\``,hi:`Login par dono tokens ka flow:
- Access token JSON response mein jata hai jise React frontend memory mein rakhta hai.
- Refresh token \`httpOnly\` cookie mein jata hai jise browser chupke se store karta hai aur JavaScript access nahi kar sakti.
- Sath hi refresh token MongoDB mein bhi save hota hai taaki baad mein rotate ho sake.`}},{type:"example",heading:{en:"Example 2: The /refresh-token Controller with Rotation & Reuse Detection",hi:"Example 2: Refresh Token Rotation Aur Reuse Detection Controller"},body:{en:`This endpoint receives the refresh token from the cookie, verifies it, checks for token reuse, rotates the token, and returns a new access token.

\`\`\`javascript
// server/src/controllers/refreshTokenController.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const handleRefreshToken = async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({ success: false, message: 'No refresh token provided' });
  }

  // Clear cookie immediately
  res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });

  // 1. Verify token signature
  let decoded;
  try {
    decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired refresh token' });
  }

  // 2. Find user in database
  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(403).json({ success: false, message: 'User not found' });
  }

  // 3. REUSE DETECTION: Is the incoming token already invalidated?
  const tokenExists = user.refreshTokens.some((t) => t.token === incomingRefreshToken);

  if (!tokenExists) {
    // REUSE DETECTED! Malicious attempt or stolen token!
    // Nuclear option: Invalidate ALL active refresh tokens for this user!
    user.refreshTokens = [];
    await user.save();
    return res.status(403).json({
      success: false,
      message: 'Suspicious token reuse detected! All active sessions have been terminated. Please log in again.',
    });
  }

  // 4. ROTATION: Remove the used token from DB
  user.refreshTokens = user.refreshTokens.filter((t) => t.token !== incomingRefreshToken);

  // 5. Generate NEW Access Token and NEW Refresh Token
  const newAccessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const newRefreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  // Save new refresh token in DB
  user.refreshTokens.push({ token: newRefreshToken });
  await user.save();

  // Set new refresh token in httpOnly cookie
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    accessToken: newAccessToken,
  });
};
\`\`\``,hi:"Yeh enterprise grade security code hai:\n- Agar koi purana use ho chuka token dobara bheje (`!tokenExists`), toh server turant `user.refreshTokens = []` karke saare sessions band kar deta hai (Reuse Detection).\n- Valid token aane par purana token delete karta hai aur naya access token + naya refresh token return karta hai (Rotation)."}},{type:"example",heading:{en:"Example 3: Logout Controller (Revoking Refresh Tokens)",hi:"Example 3: Logout Controller: Database Aur Cookies Dono Se Token Revoke Karna"},body:{en:`When a user clicks "Logout", simply deleting the token from browser memory is not enough. You must also remove the refresh token from MongoDB and clear the cookie!

\`\`\`javascript
// server/src/controllers/logoutController.js
import { User } from '../models/User.js';

export const logout = async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (incomingRefreshToken) {
    // 1. Remove this specific refresh token from database
    await User.updateOne(
      { 'refreshTokens.token': incomingRefreshToken },
      { $pull: { refreshTokens: { token: incomingRefreshToken } } }
    );
  }

  // 2. Clear httpOnly cookie on browser
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const logoutAllDevices = async (req, res) => {
  // Clear ALL refresh tokens belonging to the logged-in user
  await User.findByIdAndUpdate(req.user.id, { $set: { refreshTokens: [] } });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({ success: true, message: 'Logged out of all active devices' });
};
\`\`\``,hi:"Logout par safe cleanup:\n- MongoDB se specific token ko `$pull` karke delete kiya jata hai.\n- `res.clearCookie('refreshToken')` se browser ki cookie hatayi jaati hai.\n- `logoutAllDevices` endpoint se ek click mein sabhi phones aur laptops se session terminate ho jata hai!"}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Common Mistakes Aur Unke Fixes"},body:{en:"### 1. Using the Same Secret Key for Both Tokens\n- **Mistake**: Using `JWT_SECRET` to sign both the access token and the refresh token.\n- **Why it breaks**: A client could submit a valid 15-minute access token to the `/refresh-token` endpoint, and `jwt.verify()` would succeed!\n- **Fix**: Always maintain two separate environment variables: `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`.\n\n### 2. Storing Refresh Tokens in LocalStorage\n- **Mistake**: Storing the 30-day refresh token in `localStorage`.\n- **Why it hurts**: Any Cross-Site Scripting (XSS) vulnerability or rogue third-party npm package in your React app can run `localStorage.getItem('refreshToken')` and steal the long-lived credential!\n- **Fix**: Always store the refresh token in an `httpOnly` cookie.\n\n### 3. Never Purging Old Tokens from MongoDB\n- **Mistake**: Pushing refresh tokens into a user's array on every login without removing expired ones.\n- **Why it hurts**: After months of use, a user document accumulates thousands of dead token objects, bloating MongoDB document sizes.\n- **Fix**: Use MongoDB TTL (Time-To-Live) indexes on the subdocument `createdAt` field or filter out tokens older than 7 days on login.",hi:`### 1. Dono Tokens Ke Liye Same Secret Key Rakhna
- **Galti**: Ek hi \`JWT_SECRET\` se dono tokens sign karna.
- **Nuksan**: User access token ko refresh endpoint par bhejkar naya token le sakta hai.
- **Fix**: Hamesha do alag keys rakhein: \`ACCESS_TOKEN_SECRET\` aur \`REFRESH_TOKEN_SECRET\`.

### 2. Refresh Token Ko LocalStorage Mein Rakhna
- **Galti**: Refresh token ko \`localStorage\` mein daalna.
- **Nuksan**: Koi bhi malicious XSS script browser storage se token chura sakti hai.
- **Fix**: Hamesha \`httpOnly\` cookie use karein.

### 3. Database Mein Purane Tokens Delete Na Karna
- **Galti**: Array mein tokens add karte rehna bina delete kiye.
- **Nuksan**: User document ka size bohot bada ho jata hai.
- **Fix**: TTL index ya rotation ke zariye purane tokens hatayein.`}},{type:"tip",heading:{en:"Best Practices: Industrial Token Management",hi:"Best Practices: Industrial Token Management"},body:{en:`1. **Access Token Lifespan: 10 to 15 Minutes**: Keep access tokens extremely short-lived so exposure windows are negligible.
2. **Refresh Token Lifespan: 7 to 14 Days**: Long enough that users don't have to log in repeatedly during regular weekly usage.
3. **Store Access Token in Memory Only**: Store the access token in a React Context or closure variable in memory. Even if an attacker executes an XSS injection, they cannot easily read memory variables on page reload.
4. **Log Security Events on Reuse Detection**: If a reused refresh token is presented, immediately log an alert to your security monitoring service with IP address and user agent.`,hi:`1. **Access Token 10-15 Minute**: Access token ka time bohot chota rakhein.
2. **Refresh Token 7-14 Din**: Regular users ke liye ek week ka duration perfect rehta hai.
3. **Memory Storage**: Access token ko React state ya memory variable mein rakhein taaki page refresh par XSS se chori na ho sake.
4. **Security Alerts**: Token reuse detect hone par user ki IP aur device info turant security logs mein record karein.`}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:`### Q1: Why is a dual-token (Access + Refresh) system superior to a single long-lived JWT?
**Answer**: A single long-lived JWT creates a security hazard: because JWTs are stateless, a compromised token cannot be revoked without maintaining complex global blacklists. A dual-token system isolates concerns:
- The **Access Token** is short-lived (15 mins), keeping the vulnerability window minimal.
- The **Refresh Token** is stored securely in an \`httpOnly\` cookie (immune to XSS) and is checked against the database only once every 15 minutes, preserving the performance benefits of statelessness while enabling server-side revocation on logout or breach detection.

### Q2: What is Refresh Token Rotation (RTR)?
**Answer**: Refresh Token Rotation is a security mechanism where every time a client submits a refresh token to obtain a new access token, the server revokes the old refresh token and issues a brand-new refresh token. This ensures that every refresh token is single-use only, preventing replay attacks.

### Q3: How does Token Reuse Detection protect against compromised refresh tokens?
**Answer**: If an attacker steals a refresh token and attempts to use it after the legitimate user has already used it (or vice versa), the server recognizes that an already-invalidated token is being presented. This condition proves that two parties possess copies of the same token family. The server immediately terminates the user's active token family and logs out all sessions, protecting the account.

### Q4: Why must different secret keys be used for Access Tokens and Refresh Tokens?
**Answer**: If both tokens were signed with the same secret, their signatures would be mathematically compatible. A malicious client could send an Access Token to the \`/refresh-token\` endpoint, bypassing expiration controls, or submit a Refresh Token to regular API endpoints, causing privilege escalation and security validation bypasses.`,hi:`### Q1: Dual-token system single JWT se behtar kyun hai?
**Jawab**: Single token mein security aur convenience ka conflict hota hai. Dual-token system mein Access token chota (15 min) hota hai jo API calls ke liye fast rehta hai, aur Refresh token secure \`httpOnly\` cookie mein rehta hai jo user ko baar-baar login karne se bachata hai aur server ko logout revoke karne ki power deta hai.

### Q2: Refresh Token Rotation (RTR) kya hai?
**Jawab**: RTR mein har baar refresh token use hone par purana token delete kar diya jata hai aur naya refresh token diya jata hai. Har token sirf ek hi baar use ho sakta hai.

### Q3: Reuse detection kaise kaam karta hai?
**Jawab**: Agar ek hi token do baar use hone ki koshish kare, toh server samajh jata hai ki token chori ho chuka hai. Server turant us user ke saare active sessions ko cancel kar deta hai.

### Q4: Access aur Refresh tokens ke secrets alag kyun hone chahiye?
**Jawab**: Agar secret same hoga, toh user access token ko refresh endpoint par bhej kar naye tokens leta rahega aur security checks bypass ho jayenge.`}},{type:"summary",heading:{en:"Quick Summary: Access vs Refresh Token Cheatsheet",hi:"Quick Summary: Access vs Refresh Token Cheatsheet"},body:{en:"- **Access Token**: 10-15 minutes, transmitted in `Authorization: Bearer` header on every request.\n- **Refresh Token**: 7-30 days, stored in `httpOnly`, `secure`, `SameSite=Strict` cookie.\n- **Two Secrets**: Always configure `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET` separately.\n- **Refresh Token Rotation (RTR)**: Each refresh token is single-use; a new one is issued on each refresh.\n- **Reuse Detection**: Presenting an already-used refresh token invalidates all sessions for that user.\n- **Clean Logout**: Remove the refresh token from MongoDB and clear the cookie on logout.",hi:`- **Access Token**: 10-15 minute, har API request ke header mein jata hai.
- **Refresh Token**: 7-30 din, secure \`httpOnly\` cookie mein store hota hai.
- **Do Secrets**: Dono tokens ke liye alag-alag secret keys use karein.
- **Rotation (RTR)**: Har token single-use hota hai, refresh hone par naya token milta hai.
- **Reuse Detection**: Purana token aane par saare devices se instant logout.
- **Complete Logout**: Database se token \`$pull\` karein aur browser cookie delete karein.`}}],quiz:[{question:{en:"What is the primary security advantage of using a short-lived (15-minute) Access Token?",hi:"Short-lived (15-minute) Access Token use karne ka primary security advantage kya hai?"},options:[{en:"It reduces MongoDB disk storage by 50%",hi:"Yeh MongoDB storage 50% kam kar deta hai"},{en:"If the token is intercepted or leaked, the attacker's window of opportunity is limited to a few minutes",hi:"Agar token chori ya leak ho jaye, toh hacker ke paas access sirf kuch hi minutes ke liye rehta hai"},{en:"It makes web pages load 100 times faster",hi:"Yeh web pages 100 guna tezz load karta hai"},{en:"It replaces the need for HTTPS encryption",hi:"Yeh HTTPS ki zaroorat khatam kar deta hai"}],correctAnswer:1,explanation:{en:"Short-lived access tokens dramatically minimize the blast radius of a credential leak because the token expires in minutes.",hi:"Chote access token se security leak ka nuksan bohot kam ho jata hai kyunki token kuch hi minutes mein expire ho jata hai."}},{question:{en:"Where should the long-lived Refresh Token be stored in the user's browser?",hi:"Browser mein long-lived Refresh Token kahan store hona chahiye?"},options:[{en:"In localStorage",hi:"localStorage mein"},{en:"In a secure, httpOnly, SameSite=Strict cookie that JavaScript cannot access",hi:"Ek secure, httpOnly, SameSite=Strict cookie mein jise JavaScript access nahi kar sakti"},{en:"In the browser's URL search parameters",hi:"Browser ke URL search parameters mein"},{en:"In sessionStorage as plain text",hi:"sessionStorage mein plain text ki tarah"}],correctAnswer:1,explanation:{en:"httpOnly cookies cannot be read or stolen by malicious JavaScript (XSS attacks), making them the safest place for long-lived refresh tokens.",hi:"httpOnly cookies ko JavaScript (XSS scripts) read nahi kar sakti, isliye long-lived refresh tokens ke liye yeh sabse safe jagah hai."}},{question:{en:"What is 'Refresh Token Rotation' (RTR)?",hi:"'Refresh Token Rotation' (RTR) kya hota hai?"},options:[{en:"Changing the database password every 24 hours",hi:"Database password har 24 ghante mein badalna"},{en:"Invalidating the used refresh token and issuing a brand new refresh token every time a new access token is generated",hi:"Har baar naya access token banne par purane refresh token ko invalidate karke naya refresh token issue karna"},{en:"Rotating the browser screen upside down",hi:"Browser screen ko ulta ghumana"},{en:"Restarting the Express server every 10 minutes",hi:"Express server ko har 10 minute mein restart karna"}],correctAnswer:1,explanation:{en:"Refresh Token Rotation guarantees each refresh token can only be used once. Using it yields a new pair, preventing replay attacks.",hi:"Rotation ensure karta hai ki har refresh token sirf ek hi baar use ho sake, jisse purane tokens ko dobara use karne ka attack ruk jata hai."}},{question:{en:"What action should the server take if it detects an already-invalidated refresh token being submitted again (Token Reuse)?",hi:"Agar server par pehle se invalidated refresh token dobara submit ho jaye (Token Reuse), toh server ko kya action lena chahiye?"},options:[{en:"Ignore it and issue an admin account",hi:"Ignore karke admin account bana dena"},{en:"Treat it as a security breach: invalidate all active refresh tokens for that user and terminate all active sessions",hi:"Ise security breach maanein: us user ke saare active refresh tokens invalidate karein aur sabhi devices se logout kar dein"},{en:"Send an email asking the hacker to stop",hi:"Hacker ko rukne ke liye email bhejna"},{en:"Delete the MongoDB database",hi:"MongoDB database delete kar dena"}],correctAnswer:1,explanation:{en:"Token reuse indicates that a token was stolen and used by multiple parties. The server must immediately revoke all tokens in the family to protect the user.",hi:"Token reuse ka matlab hai ki token chori ho chuka hai. User ki security ke liye server ko turant sabhi active sessions terminate kar dene chahiye."}},{question:{en:"What is the core architectural purpose of Access Tokens vs Refresh Tokens Strategy in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Short-lived Access Token vs Refresh Token Strategy ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling access tokens vs refresh tokens strategy with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Short-lived Access Token vs Refresh Token Strategy ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Access Tokens vs Refresh Tokens Strategy establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Short-lived Access Token vs Refresh Token Strategy clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Access Tokens vs Refresh Tokens Strategy directly resolve?",hi:"Short-lived Access Token vs Refresh Token Strategy kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Access Tokens vs Refresh Tokens Strategy, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Short-lived Access Token vs Refresh Token Strategy ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Access Tokens vs Refresh Tokens Strategy, how is its mental model best conceptualized through real-world analogies?",hi:"Short-lived Access Token vs Refresh Token Strategy ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Access Tokens vs Refresh Tokens Strategy, what syntactic convention is essential to prevent runtime errors?",hi:"Short-lived Access Token vs Refresh Token Strategy ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Access Tokens vs Refresh Tokens Strategy?",hi:"Short-lived Access Token vs Refresh Token Strategy ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Access Tokens vs Refresh Tokens Strategy be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Short-lived Access Token vs Refresh Token Strategy ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Access Tokens vs Refresh Tokens Strategy impact application memory and CPU consumption?",hi:"Short-lived Access Token vs Refresh Token Strategy ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Access Tokens vs Refresh Tokens Strategy?",hi:"Short-lived Access Token vs Refresh Token Strategy mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Access Tokens vs Refresh Tokens Strategy?",hi:"Short-lived Access Token vs Refresh Token Strategy mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Access Tokens vs Refresh Tokens Strategy?",hi:"Short-lived Access Token vs Refresh Token Strategy mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Access Tokens vs Refresh Tokens Strategy, what must the test suite assert?",hi:"Short-lived Access Token vs Refresh Token Strategy ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Access Tokens vs Refresh Tokens Strategy?",hi:"Modular design Short-lived Access Token vs Refresh Token Strategy mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Access Tokens vs Refresh Tokens Strategy be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Short-lived Access Token vs Refresh Token Strategy ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Access Tokens vs Refresh Tokens Strategy properly belong and execute?",hi:"Full-stack MERN architecture mein Short-lived Access Token vs Refresh Token Strategy kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Access Tokens vs Refresh Tokens Strategy in production?",hi:"Production mein Short-lived Access Token vs Refresh Token Strategy ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Access Tokens vs Refresh Tokens Strategy?",hi:"Short-lived Access Token vs Refresh Token Strategy ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Access Tokens vs Refresh Tokens Strategy?",hi:"Short-lived Access Token vs Refresh Token Strategy mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
