const e={id:"auth-backend-middleware",title:{en:"Backend Auth Middleware & req.user Injection",hi:"Backend Auth Middleware (verifyToken) & req.user"},difficulty:"Intermediate",readTime:10,sections:[{type:"concept",heading:{en:"1. The Role of Authentication Middleware in Express",hi:"1. Express Mein Auth Middleware Ka Role"},body:{en:`In a RESTful Express API, public routes (like browsing products or viewing landing pages) can be accessed by anyone. However, protected routes (like viewing a user profile, creating an order, or accessing admin dashboards) require verified identity.

Instead of writing token extraction and verification logic inside every single route controller, Express utilizes **Middleware**:

\`\`\`
[ Incoming Request: GET /api/v1/orders ]
                  │
                  ▼
         [ protect Middleware ]
         1. Extracts token from Authorization header or cookie
         2. Verifies token with jwt.verify()
         3. Fetches user from MongoDB & checks if account is active
         4. Attaches user to req.user
         5. Calls next()
                  │
                  ▼
         [ orderController.getUserOrders ]
         Directly reads req.user.id to filter orders from database!
\`\`\`

### What is \`req.user\` Injection?
Express request objects (\`req\`) are mutable JavaScript objects passed along the middleware chain. By assigning \`req.user = currentUser;\`, the auth middleware injects the authenticated user document directly into the request. Any downstream controller or middleware can immediately access \`req.user._id\`, \`req.user.email\`, and \`req.user.role\` without repeating database lookups!`,hi:`Express REST APIs mein kuch routes public hote hain (jaise products dekhna), lekin sensitive routes (jaise profile update karna ya order place karna) ke liye user ka login hona zaroori hota hai.

Har controller ke andar token check karne ka code likhne ke bajaye hum **Express Middleware** use karte hain:

1. **protect Middleware**:
   - Request se token nikalta hai.
   - \`jwt.verify()\` se signature check karta hai.
   - Database mein check karta hai ki user active hai ya nahi.
   - \`req.user = currentUser\` inject karta hai.
   - \`next()\` call karke agle controller ko request pass kar deta hai.
2. **Controller**:
   - Seedhe \`req.user.id\` se user ka data fetch karta hai bina dobara token verify kiye!`}},{type:"concept",heading:{en:"2. Why Database Verification is Essential Beyond jwt.verify()",hi:"2. Sirf jwt.verify() Kaafi Kyun Nahi Hai? Database Verification Ki Zaroorat"},body:{en:`A common junior developer mistake is verifying the JWT signature and immediately calling \`next()\` without checking the database:

\`\`\`javascript
// ❌ INSECURE JUNIOR PATTERN:
const decoded = jwt.verify(token, secret);
req.user = decoded; // DANGEROUS!
next();
\`\`\`

### Why This is a Serious Security Flaw:
1. **Deleted or Banned Users**: Suppose an employee is fired or a user account is suspended for fraud. Their 15-minute token is still cryptographically valid! Without a database check, the banned user can continue accessing sensitive APIs until the token expires.
2. **Password Changes**: If a user's account is compromised and they change their password, all previously issued tokens must become invalid immediately.
3. **Role Revocation**: If an admin demotes a user from "admin" to "user", the old token still claims \`"role": "admin"\` unless verified against live database state!

### The Production Standard:
Always query the database (\`User.findById(decoded.id)\`) to ensure the user still exists, is not deactivated, and has not changed their password after the token was issued.`,hi:`Sirf \`jwt.verify()\` karke request aage badha dena ek bohot badi security mistake hai:

### Yeh Khatarnak Kyun Hai?
1. **Banned Ya Deleted Users**: Agar kisi fraud user ko admin ne block ya delete kar diya ho, toh bhi uska token valid rahega! Bina database check ke blocked user API use karta rahega.
2. **Password Badalna**: Agar user ne password change kar liya, toh purane devices ke tokens turant reject hone chahiye.
3. **Role Change**: Agar kisi admin ko demote karke normal user bana diya gaya, toh purane token mein abhi bhi admin likha hoga jab tak database check na ho.

### Production Rule:
Hamesha \`User.findById(decoded.id)\` se verify karein ki user database mein zinda hai, active hai, aur uska role sahi hai!`}},{type:"analogy",heading:{en:"Real-Life Analogy: The CISF Security Checkpoint at an Executive Summit",hi:"Real-Life Analogy: Executive Summit Ka Security Checkpoint"},body:{en:`Imagine an exclusive corporate summit at a 5-star convention center:

- **Without Auth Middleware (Chaos)**:
  Anyone from the street walks into the private boardroom, listens to confidential company mergers, and eats from the buffet.
- **With Auth Middleware (The CISF Officer at the Door)**:
  1. **Badge Check (Token Extraction)**: As you walk towards the boardroom, an armed officer stops you: *"Please present your digital delegate pass"*.
  2. **Hologram Scan (jwt.verify)**: The officer scans the pass under a scanner. If the pass is counterfeit or expired, the buzzer sounds and you are escorted out (401 Unauthorized).
  3. **Live Security Tablet Check (Database Query)**: The officer types your badge number into their live security tablet. If your company revoked your pass 5 minutes ago, access is denied immediately!
  4. **The VIP Pin (req.user Injection)**: Once verified, the officer clips a glowing green VIP badge onto your lapel (\`req.user\`) and opens the heavy oak door (\`next()\`).
  5. Inside the boardroom, the waiter serving tea doesn't need to ask for your passport; they just glance at your pinned VIP badge to know who you are!`,hi:`Ek 5-star hotel ke private VIP lounge ka example dekhein:

- **Bina Middleware Ke**:
  Koi bhi bahar se aakar VIP lounge mein baith kar free khana khane lagta hai.
- **Auth Middleware (Darwaze Par Khada Security Officer)**:
  1. **Pass Verification**: Officer aapka delegate pass mangta hai (Bearer Token).
  2. **Hologram Scan**: Scanner se pass check karta hai (\`jwt.verify\`). Agar nakli pass hua toh turant bahar nikal deta hai (401 Unauthorized).
  3. **Live Tablet Check**: Officer apne computer par check karta hai ki kya aapki company ne pass cancel toh nahi kar diya (Database check).
  4. **VIP Badge Lagana (\`req.user\` Injection)**: Sab theek hone par officer aapki shirt par verified badge laga deta hai (\`req.user\`) aur darwaza khol deta hai (\`next()\`).
  5. Andar waiter ko dobara aapse ID mangne ki zaroorat nahi padti; wo aapka badge dekh kar samajh jata hai ki aap kaun hain!`}},{type:"syntax",heading:{en:"Syntax & Structure: The protect Middleware Function",hi:"Syntax Aur Implementation: protect Middleware Function"},body:{en:`Create \`server/src/middleware/authMiddleware.js\`:

\`\`\`javascript
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Extract Bearer token from Authorization header or cookie
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // 2. Reject if token is missing
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. You must be logged in to view this resource.',
    });
  }

  try {
    // 3. Verify cryptographic signature & expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Verify user exists in DB and is active (exclude password)
    const currentUser = await User.findById(decoded.id).select('-password');
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // 5. Inject user into request object
    req.user = currentUser;

    // 6. Grant access to next middleware or route controller!
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token.',
    });
  }
};
\`\`\``,hi:"`protect` middleware ka standard code:\n- `Authorization` header ya cookie se token nikalta hai.\n- `jwt.verify()` se token validate karta hai.\n- `User.findById(decoded.id).select('-password')` se user database se mangwata hai (password ko chhod kar).\n- `req.user = currentUser` inject karta hai aur `next()` call karta hai.\n- Error aane par clean 401 response return karta hai."}},{type:"example",heading:{en:"Example 1: Applying Middleware to Specific Routes vs Route Groups",hi:"Example 1: Specific Routes vs Poore Router Par Middleware Apply Karna"},body:{en:`Express provides two flexible ways to attach auth middleware: individual route attachment or router-level scoping.

\`\`\`javascript
// server/src/routes/productRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// 1. PUBLIC ROUTES: Anyone can browse products
router.get('/', getProducts);
router.get('/:id', getProductById);

// 2. PROTECTED ROUTES: Only logged-in users can modify products
// Attached individually to sensitive HTTP methods
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
\`\`\`

\`\`\`javascript
// server/src/routes/userRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getProfile, updateProfile, getMyOrders } from '../controllers/userController.js';

const router = express.Router();

// 3. ROUTER-WIDE PROTECTION:
// Protects ALL routes declared BELOW this line!
router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/orders', getMyOrders);

export default router;
\`\`\``,hi:"Middleware lagane ke do tareeqe:\n1. **Specific Routes Par**: `router.post('/', protect, createProduct)`. Public aur private routes ko mix karne ke liye best.\n2. **Poore Router Par**: `router.use(protect)` likhne ke baad neeche ke saare routes automatically protected ho jaate hain. User profile ya settings routes ke liye best."}},{type:"example",heading:{en:"Example 2: Route Controller Consuming req.user for Database Actions",hi:"Example 2: Controller Mein req.user Ka Use Karke Order Create Karna"},body:{en:`This controller demonstrates how clean route handlers become when relying on \`req.user\`. The controller does not need to accept an insecure \`userId\` from the request body!

\`\`\`javascript
// server/src/controllers/orderController.js
import { Order } from '../models/Order.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;

    // SECURITY CRITICAL:
    // Never trust req.body.userId! A hacker could create orders under someone else's ID!
    // Always use the verified identity injected by the protect middleware:
    const userId = req.user._id;

    const newOrder = await Order.create({
      user: userId,
      userEmail: req.user.email,
      items,
      shippingAddress,
      totalAmount,
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      order: newOrder,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    // Fetch orders strictly belonging to the authenticated user!
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
};
\`\`\``,hi:"Security ka sabse bada niyam:\nFrontend se aane wale `req.body.userId` par kabhi bharosa na karein! Hacker body mein kisi doosre user ki ID bhej sakta hai.\nHamesha `req.user._id` use karein jo middleware ne verified token se nikal kar inject kiya hai!"}},{type:"example",heading:{en:"Example 3: Invalidation on Password Change (passwordChangedAt Check)",hi:"Example 3: Password Badalane Ke Baad Purane Tokens Invalidate Karna"},body:{en:`If a user suspects their account is compromised and changes their password, all previously generated tokens should immediately become invalid.

\`\`\`javascript
// In server/src/models/User.js:
userSchema.add({
  passwordChangedAt: Date,
});

// Helper instance method checking if password changed after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // Convert Date to seconds to compare with JWT iat timestamp
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false; // Password was never changed
};
\`\`\`

\`\`\`javascript
// In server/src/middleware/authMiddleware.js:
// Inside protect middleware, after finding currentUser:
if (currentUser.changedPasswordAfter(decoded.iat)) {
  return res.status(401).json({
    success: false,
    message: 'User recently changed password! Please log in again.',
  });
}
\`\`\``,hi:"Password security enhancement:\n- User schema mein `passwordChangedAt` timestamp store kiya jata hai.\n- Agar token issue hone ke baad password badla gaya ho (`decoded.iat < changedTimestamp`), toh middleware token ko turant reject kar deta hai taaki hacker purane token se login na reh sake!"}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Common Mistakes Aur Unke Fixes"},body:{en:"### 1. Forgetting to RETURN on Error Responses\n- **Mistake**: Writing `res.status(401).json(...); next();` or forgetting the `return` keyword before sending an error response.\n- **Why it breaks**: Express continues executing subsequent code and invokes the controller, triggering the infamous: `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`!\n- **Fix**: Always prefix error responses with `return res.status(401).json(...);`.\n\n### 2. Forgetting to Call next() on Success\n- **Mistake**: Successfully verifying the token and setting `req.user`, but omitting `next()`.\n- **Why it breaks**: Express never hands control over to the route handler. The client's request hangs indefinitely until the browser times out!\n- **Fix**: Always call `next()` at the very end of your middleware's success path.\n\n### 3. Trusting req.body.userId Instead of req.user._id\n- **Mistake**: In controllers, writing `Order.create({ user: req.body.userId })`.\n- **Why this is catastrophic**: Any authenticated user can modify the JSON payload in Postman and place orders or delete resources belonging to ANY other user on your platform (IDOR vulnerability)!\n- **Fix**: Always read identity from `req.user._id`.",hi:"### 1. Error Bhejte Waqt return Bhool Jana\n- **Galti**: `res.status(401).json(...)` ke aage `return` na lagana.\n- **Nuksan**: Code aage badhkar controller bhi chala deta hai aur `Cannot set headers after they are sent` error crash aa jata hai!\n- **Fix**: Hamesha `return res.status(...)` likhein.\n\n### 2. next() Call Karna Bhool Jana\n- **Galti**: User verify ho gaya lekin `next()` nahi lagaya.\n- **Nuksan**: Request hamesha ke liye atak jaati hai aur browser spinner ghoomaata rehta hai.\n- **Fix**: Success hone par hamesha `next()` call karein.\n\n### 3. req.body.userId Par Bharosa Karna\n- **Galti**: `req.body.userId` se database query karna.\n- **Nuksan**: Hacker Postman se kisi aur user ki ID bhejkar uska data chura sakta hai (IDOR vulnerability).\n- **Fix**: Hamesha `req.user._id` use karein."}},{type:"tip",heading:{en:"Best Practices: High-Performance Middleware",hi:"Best Practices: Fast Aur Secure Middleware"},body:{en:"1. **Exclude Password and Heavy Fields in Database Queries**: Always use `.select('-password')` when querying for `req.user` so password hashes never live in request objects.\n2. **Keep Error Messages Informative for Debugging**: Distinguish between expired tokens (`TokenExpiredError`) and invalid tokens (`JsonWebTokenError`) so frontend Axios interceptors know when to trigger refresh token calls.\n3. **Handle Edge Cases in Header Splitting**: Ensure your header parser safely handles malformed strings like `\"Bearer\"` with no token attached using optional chaining (`req.headers.authorization?.startsWith('Bearer')`).",hi:"1. **Password Exclude Karein**: `User.findById().select('-password')` use karein taaki request object mein password hash na rahe.\n2. **TokenExpiredError Ko Pehchanein**: Expiry error ko alag message dein taaki frontend ka Axios interceptor refresh token call kar sake.\n3. **Safe String Splitting**: Optional chaining (`req.headers.authorization?.startsWith`) use karein taaki header missing hone par server crash na ho."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:"### Q1: What is the purpose of req.user injection in Express authentication middleware?\n**Answer**: In Express, the `req` object is shared across the entire middleware pipeline for that specific HTTP request. By attaching the authenticated user document to `req.user` inside the auth middleware, subsequent route handlers and authorization checks have immediate, trusted access to the user's identity, role, and permissions without having to repeatedly parse tokens or query the database.\n\n### Q2: Why should an authentication middleware verify the user in the database after jwt.verify() succeeds?\n**Answer**: While `jwt.verify()` proves that the token was signed with the server's secret and has not expired, it cannot verify the **current operational status** of the user. Without querying the database, an attacker could continue using a valid token belonging to an account that was recently banned, deleted, or had its permissions revoked.\n\n### Q3: What causes the \"Cannot set headers after they are sent to the client\" error in an Express middleware?\n**Answer**: This error occurs when a middleware sends an HTTP response (e.g. `res.status(401).json(...)`) but fails to terminate execution with a `return` statement. JavaScript continues executing subsequent lines and either sends a second response or invokes `next()`, prompting a downstream controller to attempt sending another response on the same HTTP socket.\n\n### Q4: How does router.use(protect) differ from passing protect to individual routes?\n**Answer**:\n- Passing `protect` to individual routes (`router.post('/', protect, handler)`) applies the guard selectively to that specific HTTP method and path.\n- Calling `router.use(protect)` mounts the middleware globally for that router, automatically intercepting and protecting **every single route** declared beneath that line.",hi:'### Q1: req.user injection ka kya purpose hota hai?\n**Jawab**: Express mein `req` object har middleware ke beech share hota hai. Middleware `req.user = currentUser` set kar deta hai taaki downstream controllers seedhe user ki ID aur role access kar sakein bina token ko dobara parse kiye.\n\n### Q2: jwt.verify() ke baad database query kyun zaroori hai?\n**Jawab**: Kyunki token verify hone ka matlab yeh nahi hai ki user abhi bhi valid hai. Agar user ka account delete ya suspend ho chuka ho, toh sirf database check hi use rok sakta hai.\n\n### Q3: "Cannot set headers after they are sent" error kyun aata hai?\n**Jawab**: Jab middleware response bhejne ke baad code ko `return` nahi karta aur `next()` bhi call kar deta hai, toh do responses ek sath bhejne ki koshish hoti hai aur Node.js crash ho jata hai.\n\n### Q4: router.use(protect) aur individual route protect mein kya farq hai?\n**Jawab**: `router.use(protect)` us file ke neeche aane wale sabhi routes ko ek sath protect kar deta hai, jabki individual protect sirf us specific method par chalta hai.'}},{type:"summary",heading:{en:"Quick Summary: Backend Auth Middleware Cheatsheet",hi:"Quick Summary: Backend Auth Middleware Cheatsheet"},body:{en:"- **Protect Sensitive Routes**: Intercepts requests before reaching controllers.\n- **Dual Source Extraction**: Check `Authorization: Bearer <token>` first, then fallback to `req.cookies.token`.\n- **Verify Signature**: Use `jwt.verify(token, process.env.JWT_SECRET)`.\n- **Database Safety Check**: Verify the user still exists in MongoDB using `User.findById(decoded.id)`.\n- **req.user Injection**: Attach the user document to `req.user` for downstream controllers.\n- **Always RETURN on Error**: Prevent header conflicts by using `return res.status(401).json(...)`.\n- **Always Call next() on Success**: Allow the request to proceed to the controller.",hi:"- **Route Protection**: Sensitive controllers tak pahunchne se pehle check karta hai.\n- **Token Extraction**: `Authorization` header aur cookies dono se token nikalta hai.\n- **Signature Check**: `jwt.verify()` se secret key validate karta hai.\n- **Database Verification**: Check karta hai ki user abhi bhi database mein exist karta hai.\n- **req.user Injection**: User data ko `req.user` par bind karta hai.\n- **return on Error**: Header crashes se bachne ke liye hamesha `return res.status(401)` karein.\n- **next() on Success**: Controller chalane ke liye `next()` call karein."}}],quiz:[{question:{en:"What is the primary purpose of assigning req.user = currentUser inside an authentication middleware?",hi:"Authentication middleware ke andar req.user = currentUser assign karne ka primary maksad kya hai?"},options:[{en:"To change the user's password in MongoDB",hi:"MongoDB mein user ka password badalna"},{en:"To inject the verified user document into the request object so subsequent controllers can immediately access user identity without repeating queries",hi:"Request object mein verified user document inject karna taaki agle controllers bina dobara query kiye user identity access kar sakein"},{en:"To convert the Express server into an HTML page",hi:"Express server ko HTML page mein convert karna"},{en:"To delete the user's cookies",hi:"User ke cookies delete karna"}],correctAnswer:1,explanation:{en:"Attaching the user to req.user makes user data universally available across all downstream route handlers and controllers for that request.",hi:"req.user inject karne se downstream controllers ko verified user data bina kisi extra database query ke seedhe mil jata hai."}},{question:{en:"Why is verifying the user in MongoDB essential even after jwt.verify() succeeds?",hi:"jwt.verify() success hone ke baad bhi user ko MongoDB mein verify karna kyun zaroori hai?"},options:[{en:"Because JWT tokens are illegal without MongoDB",hi:"Kyunki MongoDB ke bina JWT tokens illegal hote hain"},{en:"To ensure the user account has not been deleted, banned, or had its permissions revoked since the token was issued",hi:"Yeh check karne ke liye ki token banne ke baad kahin user account delete, ban ya demote toh nahi ho gaya"},{en:"Because Node.js requires all databases to be queried every second",hi:"Kyunki Node.js ko har second database query chahiye hoti hai"},{en:"To download images from the internet",hi:"Internet se images download karne ke liye"}],correctAnswer:1,explanation:{en:"A token is stateless and remains cryptographically valid until expiration. Querying the database prevents deleted, banned, or demoted users from accessing private APIs.",hi:"Stateless token expiry tak valid rehta hai. Database query ensure karti hai ki deleted ya suspended users API access na kar sakein."}},{question:{en:"What error occurs if an Express middleware sends a 401 response but forgets to use 'return', and then calls next()?",hi:"Agar Express middleware 401 response bhej de lekin 'return' lagana bhool jaye aur next() call kar de, toh kaunsa error aata hai?"},options:[{en:"Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client",hi:"Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"},{en:"MongoDB connection timeout",hi:"MongoDB connection timeout"},{en:"CSS syntax error",hi:"CSS syntax error"},{en:"Vite dev server terminated",hi:"Vite dev server terminated"}],correctAnswer:0,explanation:{en:"Failing to return causes execution to continue to next(), which invokes the downstream controller to send another response, triggering ERR_HTTP_HEADERS_SENT.",hi:"return na lagane par next() call ho jata hai aur controller doosra response bhejne ki koshish karta hai jisse ERR_HTTP_HEADERS_SENT crash ho jata hai."}},{question:{en:"In an order creation controller, why should you use req.user._id instead of req.body.userId?",hi:"Order creation controller mein req.body.userId ke badle req.user._id kyun use karna chahiye?"},options:[{en:"Because req.body is deprecated in Express 4",hi:"Kyunki req.body Express 4 mein deprecated hai"},{en:"Because req.user._id is the verified identity from the authenticated token, whereas req.body.userId can be forged by attackers to create orders under another person's name",hi:"Kyunki req.user._id verified token se aata hai, jabki req.body.userId ko hacker manipulate karke kisi doosre ke naam par order bana sakta hai"},{en:"Because req.body cannot contain numbers",hi:"Kyunki req.body mein numbers nahi ho sakte"},{en:"Because MongoDB only accepts uppercase IDs",hi:"Kyunki MongoDB sirf uppercase IDs accept karta hai"}],correctAnswer:1,explanation:{en:"Accepting identity from request bodies creates an Insecure Direct Object Reference (IDOR) vulnerability. Always trust identity from req.user.",hi:"Request body se ID lene par IDOR vulnerability paida hoti hai jisse hacker kisi aur ka account use kar sakta hai. Hamesha req.user par bharosa karein."}},{question:{en:"What is the core architectural purpose of Backend Auth Middleware & req.user Injection in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Backend Auth Middleware (verifyToken) & req.user ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling backend auth middleware & req.user injection with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Backend Auth Middleware (verifyToken) & req.user ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Backend Auth Middleware & req.user Injection establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Backend Auth Middleware (verifyToken) & req.user clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Backend Auth Middleware & req.user Injection directly resolve?",hi:"Backend Auth Middleware (verifyToken) & req.user kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Backend Auth Middleware & req.user Injection, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Backend Auth Middleware (verifyToken) & req.user ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Backend Auth Middleware & req.user Injection, how is its mental model best conceptualized through real-world analogies?",hi:"Backend Auth Middleware (verifyToken) & req.user ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Backend Auth Middleware & req.user Injection, what syntactic convention is essential to prevent runtime errors?",hi:"Backend Auth Middleware (verifyToken) & req.user ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Backend Auth Middleware & req.user Injection?",hi:"Backend Auth Middleware (verifyToken) & req.user ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Backend Auth Middleware & req.user Injection be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Backend Auth Middleware (verifyToken) & req.user ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Backend Auth Middleware & req.user Injection impact application memory and CPU consumption?",hi:"Backend Auth Middleware (verifyToken) & req.user ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Backend Auth Middleware & req.user Injection?",hi:"Backend Auth Middleware (verifyToken) & req.user mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Backend Auth Middleware & req.user Injection?",hi:"Backend Auth Middleware (verifyToken) & req.user mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Backend Auth Middleware & req.user Injection?",hi:"Backend Auth Middleware (verifyToken) & req.user mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Backend Auth Middleware & req.user Injection, what must the test suite assert?",hi:"Backend Auth Middleware (verifyToken) & req.user ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Backend Auth Middleware & req.user Injection?",hi:"Modular design Backend Auth Middleware (verifyToken) & req.user mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Backend Auth Middleware & req.user Injection be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Backend Auth Middleware (verifyToken) & req.user ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Backend Auth Middleware & req.user Injection properly belong and execute?",hi:"Full-stack MERN architecture mein Backend Auth Middleware (verifyToken) & req.user kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Backend Auth Middleware & req.user Injection in production?",hi:"Production mein Backend Auth Middleware (verifyToken) & req.user ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Backend Auth Middleware & req.user Injection?",hi:"Backend Auth Middleware (verifyToken) & req.user ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Backend Auth Middleware & req.user Injection?",hi:"Backend Auth Middleware (verifyToken) & req.user mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
