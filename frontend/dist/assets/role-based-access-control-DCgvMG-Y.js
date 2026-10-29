const e={id:"auth-rbac-roles",title:{en:"Role-Based Access Control (Admin, User, Moderator)",hi:"Role-Based Access Control (RBAC Permissions)"},difficulty:"Intermediate",readTime:10,sections:[{type:"concept",heading:{en:"1. Authentication vs Authorization (AuthN vs AuthZ)",hi:"1. Authentication vs Authorization (AuthN vs AuthZ) Ka Mukhya Antar"},body:{en:`In cybersecurity and full-stack software architecture, developers frequently confuse these two distinct concepts:

### Authentication (AuthN) = Identity Verification
- **Question Asked**: *"Who are you?"*
- **Mechanism**: The user submits their email and password or OAuth token. The server verifies the credentials and confirms: *"Yes, you are user Aman Verma (ID: 65a1f89b)."*
- **Failure Code**: **HTTP 401 Unauthorized** (You are not logged in, or your token is invalid/expired).

### Authorization (AuthZ) = Permission Verification
- **Question Asked**: *"What are you allowed to do?"*
- **Mechanism**: The server checks the authenticated user's permissions: *"Aman is logged in, but does he possess permission to delete this user account or access financial revenue charts?"*
- **Failure Code**: **HTTP 403 Forbidden** (The server knows who you are, but you are strictly forbidden from performing this action!).

---

### What is Role-Based Access Control (RBAC)?
**Role-Based Access Control (RBAC)** is the industry-standard approach for managing system access. Instead of assigning individual permissions to each of 10,000 users, permissions are grouped into **Roles** (e.g. \`user\`, \`moderator\`, \`admin\`, \`superadmin\`), and users are assigned one or more roles.`,hi:`Web security mein **Authentication** aur **Authorization** do alag-alag steps hote hain:

### 1. Authentication (AuthN) = Pehchan (Identity)
- **Sawal**: *"Aap kaun hain?"*
- **Kaise hota hai**: User email aur password se login karta hai. Server bolta hai: *"Haan, aap Aman Verma hain."*
- **Error Code**: **HTTP 401 Unauthorized** (Aap logged in nahi hain ya token expire ho gaya hai).

### 2. Authorization (AuthZ) = Adhikar (Permissions)
- **Sawal**: *"Aapko kya karne ki permission hai?"*
- **Kaise hota hai**: Server dekhta hai ki kya Aman ko doosre user ka account delete karne ka adhikar hai?
- **Error Code**: **HTTP 403 Forbidden** (Server aapko pehchanta hai, lekin aapke paas yeh action karne ki permission nahi hai!).

---

### Role-Based Access Control (RBAC) Kya Hai?
RBAC mein hum har user ko alag-alag permission dene ke bajaye **Roles** banate hain (jaise \`user\`, \`moderator\`, \`admin\`), aur users ko unke role ke hisaab se access milta hai.`}},{type:"concept",heading:{en:"2. The Middleware Factory Pattern in Express",hi:"2. Express Mein Middleware Factory Pattern Ka Use"},body:{en:`In Express, how do we pass dynamic arguments (like allowed roles) to a middleware? We use a **Higher-Order Function (Middleware Factory)**:

\`\`\`javascript
export const authorize = (...roles) => {
  // Returns the actual Express middleware function!
  return (req, res, next) => {
    // 1. Ensure user has been authenticated by the prior protect middleware
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    // 2. Check if user's role is in the allowed list
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`User role '\${req.user.role}' is forbidden from accessing this resource.\`,
      });
    }

    // 3. Role approved! Proceed to controller!
    next();
  };
};
\`\`\`

### Execution Chain:
\`\`\`text
router.delete('/users/:id', protect, authorize('admin', 'superadmin'), deleteUserController);
\`\`\`
1. \`protect\` runs first: verifies token, populates \`req.user\`.
2. \`authorize\` runs second: checks if \`req.user.role\` is either \`'admin'\` or \`'superadmin'\`.
3. \`deleteUserController\` runs third: executes database deletion!`,hi:"Express mein kisi middleware ko dynamic arguments (jaise allowed roles) dene ke liye **Middleware Factory** use ki jaati hai:\n\n`authorize('admin', 'moderator')` ek function call hai jo andar se ek actual Express middleware `(req, res, next)` return karta hai.\n\n### Route Chaining Ka Order:\n`router.delete('/users/:id', protect, authorize('admin'), deleteUser);`\n1. Pehle `protect` chalta hai: Token verify karke `req.user` banata hai.\n2. Fir `authorize` chalta hai: Check karta hai ki kya `req.user.role === 'admin'` hai.\n3. Fir actual controller chalta hai aur database record delete hota hai!"}},{type:"analogy",heading:{en:"Real-Life Analogy: Metro Station Passenger vs Train Driver Cabin",hi:"Real-Life Analogy: Metro Station Ka Passenger vs Metro Driver Ka Cabin"},body:{en:`Consider traveling on the Delhi or Bangalore Metro Rail:

- **Authentication (Smart Card Tap at the Turnstile)**:
  You tap your Metro Smart Card at the entry gate. The machine beeps green and the gate opens. You are officially an **authenticated passenger** inside the metro premises.
  - If you have no ticket or card: The gate remains locked (HTTP 401 Unauthorized).
- **Authorization (Accessing Different Areas Inside the Station)**:
  Now that you are inside, can you walk into ANY room?
  1. **Platform & Passenger Coaches (Role: "user")**: Yes, your passenger ticket allows you to stand on the platform and sit on the train seats.
  2. **Station Master & Security Room (Role: "moderator")**: You cannot enter here. Only station staff with an authorized keycard can open this door.
  3. **The Train Driver's Control Cabin (Role: "admin")**: You want to drive the train. As you turn the driver's door handle, an armed guard stops you: *"Sir, you have a valid passenger ticket, but you are NOT an authorized driver! Step away immediately!"* (HTTP 403 Forbidden!).`,hi:`Metro station ka real-life example dekhein:

- **Authentication (Gate Par Metro Card Tap Karna)**:
  Aapne gate par Metro card tap kiya aur turnstile khul gaya. Aap verified passenger ban gaye.
  - Agar card nahi hai toh gate nahi khulega (HTTP 401 Unauthorized).
- **Authorization (Station Ke Andar Alag-Alag Kamre)**:
  Andar ghusne ke baad kya aap kisi bhi kamre mein ja sakte hain?
  1. **Train Ki Seat (Role: "user")**: Haan, aap train mein baith sakte hain.
  2. **CCTV Control Room (Role: "moderator")**: Normal public ke liye band hai, sirf station staff ja sakta hai.
  3. **Driver Ka Cabin (Role: "admin")**: Aapne train chalane ke liye driver ka darwaza khola. Guard aapko turant rok leta hai: *"Aapke paas ticket hai, lekin aap train chalane ke liye authorized nahi hain!"* (HTTP 403 Forbidden!).`}},{type:"syntax",heading:{en:"Syntax & Setup: Role Enums & Authorize Middleware",hi:"Syntax Aur Setup: Role Enums Aur Authorize Middleware"},body:{en:`### 1. Define Strict Role Constants (\`server/src/config/roles.js\`)
Avoid typo bugs across your codebase by defining standardized role constants:
\`\`\`javascript
export const ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

export const ALL_ROLES = Object.values(ROLES);
\`\`\`

### 2. User Mongoose Model Integration
\`\`\`javascript
// server/src/models/User.js
import mongoose from 'mongoose';
import { ROLES, ALL_ROLES } from '../config/roles.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ALL_ROLES,
    default: ROLES.USER,
  },
});
\`\`\`

### 3. The Authorize Middleware Factory
\`\`\`javascript
// server/src/middleware/authMiddleware.js
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`Access forbidden. Role '\${req.user.role}' lacks permission for this action.\`,
      });
    }

    next();
  };
};
\`\`\``,hi:"RBAC setup karne ka clean structure:\n1. `ROLES` constants file banayein taaki spelling mistake na ho (`ROLES.ADMIN`).\n2. Mongoose schema mein `enum: ALL_ROLES` lagayein.\n3. `authorize(...allowedRoles)` middleware banayein jo check kare ki `allowedRoles.includes(req.user.role)` true hai ya nahi."}},{type:"example",heading:{en:"Example 1: Tiered Express Route Protection",hi:"Example 1: Tiered Express Routes (User, Moderator, Admin)"},body:{en:`This example shows how different API endpoints within a single feature route require escalating levels of authorization.

\`\`\`javascript
// server/src/routes/courseRoutes.js
import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { ROLES } from '../config/roles.js';
import {
  getAllCourses,
  getCourseById,
  enrollInCourse,
  flagCourseReview,
  createCourse,
  deleteCourse,
} from '../controllers/courseController.js';

const router = express.Router();

// 1. PUBLIC: Any guest can browse courses
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// 2. AUTHENTICATED USERS (Any logged-in user)
router.post('/:id/enroll', protect, enrollInCourse);

// 3. MODERATORS & ADMINS (Content Moderation)
router.patch(
  '/:id/reviews/:reviewId/flag',
  protect,
  authorize(ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPERADMIN),
  flagCourseReview
);

// 4. INSTRUCTORS & ADMINS ONLY (Course Creation)
router.post('/', protect, authorize(ROLES.ADMIN, ROLES.SUPERADMIN), createCourse);

// 5. SUPERADMIN ONLY (Destructive Deletion)
router.delete('/:id', protect, authorize(ROLES.SUPERADMIN), deleteCourse);

export default router;
\`\`\``,hi:"Tiered security architecture:\n- `GET /`: Public (koi bhi dekh sakta hai).\n- `POST /enroll`: Sirf logged-in user (`protect`).\n- `PATCH /flag`: Moderator ya Admin (`authorize(MODERATOR, ADMIN)`).\n- `DELETE /:id`: Sirf Superadmin (`authorize(SUPERADMIN)`). Ek hi router mein har level ki security clean dikhti hai!"}},{type:"example",heading:{en:"Example 2: Granular Permission-Based Authorization (Beyond Simple Roles)",hi:"Example 2: Granular Permissions Mapping (Permission-Based Access)"},body:{en:`In complex enterprise SaaS products, simple role strings can become rigid. A more scalable approach is mapping **Roles to Sets of Permissions**:

\`\`\`javascript
// server/src/config/permissions.js
export const PERMISSIONS = {
  READ_USERS: 'read:users',
  DELETE_USERS: 'delete:users',
  MANAGE_BILLING: 'manage:billing',
  PUBLISH_COURSE: 'publish:course',
};

// Role-to-Permissions Matrix
export const ROLE_PERMISSIONS = {
  user: [PERMISSIONS.READ_USERS],
  moderator: [PERMISSIONS.READ_USERS, PERMISSIONS.PUBLISH_COURSE],
  admin: [
    PERMISSIONS.READ_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.MANAGE_BILLING,
    PERMISSIONS.PUBLISH_COURSE,
  ],
};
\`\`\`

\`\`\`javascript
// server/src/middleware/permissionMiddleware.js
import { ROLE_PERMISSIONS } from '../config/permissions.js';

export const requirePermission = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user?.role || 'user';
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({
        success: false,
        message: \`Forbidden: Missing required permission '\${requiredPermission}'\`,
      });
    }

    next();
  };
};

// Usage on routes:
// router.delete('/users/:id', protect, requirePermission('delete:users'), deleteUser);
\`\`\``,hi:"Badi SaaS apps mein Permissions Matrix use hoti hai:\n- Roles ko specific permissions (`read:users`, `delete:users`) assign ki jaati hain.\n- Middleware check karta hai: `requirePermission('delete:users')`.\n- Isse kal agar naya role (jaise \"editor\") add karna ho, toh saare routes ko chhede bina sirf permissions matrix mein ek line likhni padti hai!"}},{type:"example",heading:{en:"Example 3: Declarative Frontend Authorization Component (<Can>)",hi:"Example 3: React Mein Declarative Permission Component (<Can>)"},body:{en:`In the React frontend, instead of scattering \`if (user.role === 'admin')\` statements across 40 files, create a declarative wrapper component:

\`\`\`jsx
// client/src/components/auth/Can.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';

export function Can({ roles = [], children, fallback = null }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return fallback;
  }

  // Check if user possesses one of the allowed roles
  const hasAccess = roles.length === 0 || roles.includes(user.role);

  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
}
\`\`\`

\`\`\`jsx
// client/src/pages/UserManagement.jsx
import React from 'react';
import { Can } from '../components/auth/Can';

export function UserManagement({ userList, onDeleteUser }) {
  return (
    <div>
      <h2>User Directory</h2>
      {userList.map((targetUser) => (
        <div key={targetUser._id} className="flex justify-between items-center p-3 border-b">
          <span>{targetUser.name} ({targetUser.role})</span>

          {/* Delete button is visible ONLY to Admins & Superadmins! */}
          <Can roles={['admin', 'superadmin']}>
            <button
              onClick={() => onDeleteUser(targetUser._id)}
              className="px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded"
            >
              Delete User
            </button>
          </Can>
        </div>
      ))}
    </div>
  );
}
\`\`\``,hi:`React frontend mein declarative authorization:
- \`<Can roles={['admin']}>\` wrapper ke andar button daal dein.
- Agar user Admin nahi hai, toh button render hi nahi hoga!
- Code clean aur readable rehta hai.`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Common Mistakes Aur Unke Fixes"},body:{en:"### 1. Placing authorize BEFORE protect in Route Chains\n- **Mistake**: Writing `router.delete('/users/:id', authorize('admin'), protect, handler)`.\n- **Why it breaks**: `authorize` relies on `req.user` to check the user's role. Because `protect` hasn't executed yet, `req.user` is `undefined`, causing an immediate crash or 401 rejection on every request!\n- **Fix**: ALWAYS place `protect` first: `router.delete('/...', protect, authorize('admin'), handler)`.\n\n### 2. Returning HTTP 401 Instead of HTTP 403 on Role Denials\n- **Mistake**: Sending `res.status(401)` when a normal user tries to access an admin route.\n- **Why it breaks**: 401 means \"Unauthenticated / Session expired\". The frontend Axios interceptor will catch the 401, think the user's login expired, and redirect them to the login screen!\n- **Fix**: Use **HTTP 403 Forbidden** for role and permission denials.\n\n### 3. Relying Solely on Frontend UI Button Hiding\n- **Mistake**: Hiding the \"Delete\" button in React, but failing to put `authorize('admin')` on the Express `DELETE /api/users/:id` endpoint.\n- **Why this is catastrophic**: Any authenticated normal user can open Postman, send a DELETE request directly to your API, and delete any record in your database!\n- **Fix**: Always enforce authorization checks on the backend API!",hi:`### 1. authorize Ko protect Se Pehle Likh Dena
- **Galti**: \`router.delete('/', authorize('admin'), protect, handler)\`.
- **Nuksan**: \`authorize\` ko \`req.user\` chahiye hota hai jo abhi bana hi nahi hai! Server crash ho jata hai.
- **Fix**: Hamesha pehle \`protect\`, fir \`authorize\` likhein.

### 2. 403 Ke Badle 401 Return Kar Dena
- **Galti**: Role mana hone par 401 error bhejna.
- **Nuksan**: Frontend ka Axios interceptor samjhega session expire ho gaya aur user ko zabardasti logout karke login page par phek dega!
- **Fix**: Hamesha **403 Forbidden** use karein.

### 3. Sirf Frontend Mein Button Chhupa Dena
- **Galti**: React mein button hide kar diya lekin backend endpoint par check nahi lagaya.
- **Nuksan**: Hacker Postman se seedha call karke database uda dega!
- **Fix**: Backend endpoint par \`authorize\` lagana 100% zaroori hai.`}},{type:"tip",heading:{en:"Best Practices: Scalable Authorization Architecture",hi:"Best Practices: Scalable Authorization Guidelines"},body:{en:"1. **Use Strict Constants for Roles**: Never use raw strings like `'admin'` or `'Admin'` scattered across files. Use `ROLES.ADMIN` from a central constants file.\n2. **Resource Ownership Checks**: In addition to role checks, verify resource ownership (e.g., a user can edit their *own* comment, but an admin can edit *any* comment):\n   ```javascript\n   if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {\n     return res.status(403).json({ message: 'Not authorized to edit this comment' });\n   }\n   ```\n3. **Audit Logging for High-Privilege Actions**: Whenever an admin deletes a user, updates a role, or modifies billing, log the action with timestamp and admin user ID to an audit log table in MongoDB.",hi:"1. **Role Constants**: Hamesha `ROLES.ADMIN` use karein taaki case-sensitivity ya spelling mistake na ho.\n2. **Ownership Check**: Role ke sath ownership bhi check karein (User apna comment edit kar sakta hai, aur admin kisi ka bhi comment edit kar sakta hai).\n3. **Audit Logs**: Jab bhi koi admin kisi user ko delete kare, toh database mein log save karein ki kis admin ne kab delete kiya."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:"### Q1: What is the fundamental difference between HTTP 401 Unauthorized and HTTP 403 Forbidden?\n**Answer**:\n- **401 Unauthorized**: Means **unauthenticated**. The client has not provided valid authentication credentials, or their session token has expired. The client can retry the request after authenticating (e.g. logging in).\n- **403 Forbidden**: Means **unauthorized**. The server understands who the user is (they are authenticated), but the user's role or permissions do not allow them to access the requested resource. Authenticating again will NOT change the result.\n\n### Q2: Why must the protect middleware always run before the authorize middleware in Express?\n**Answer**: The `authorize` middleware verifies user permissions by inspecting `req.user.role`. The `req.user` object is created and injected into the request exclusively by the `protect` middleware after validating the JWT. If `authorize` runs first, `req.user` is undefined, resulting in an unhandled exception or immediate rejection.\n\n### Q3: What is the difference between Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC)?\n**Answer**:\n- **RBAC (Role-Based)**: Access is determined purely by the user's assigned role (e.g., Admins can view analytics; Users cannot). It is coarse-grained and simple to manage.\n- **ABAC (Attribute-Based)**: Access is determined dynamically by evaluating attributes of the user, the resource, and the environment (e.g., A doctor can access patient records ONLY IF the doctor is assigned to that patient AND the request originates from within the hospital network during work hours). It is fine-grained and context-aware.\n\n### Q4: How does a higher-order middleware factory function work in Express?\n**Answer**: An Express route handler expects a function with the signature `(req, res, next) => {}`. A middleware factory is an outer function that accepts configuration parameters (e.g. `authorize('admin', 'editor')`) and returns a closure function adhering to the `(req, res, next)` signature that retains access to the outer parameters.",hi:"### Q1: 401 Unauthorized aur 403 Forbidden mein kya antar hai?\n**Jawab**:\n- **401**: User logged in nahi hai ya token expire ho gaya hai. Login karke dobara try karein.\n- **403**: Server pehchanta hai ki aap kaun hain, lekin aapke paas permission nahi hai (jaise normal user ka admin dashboard access karna).\n\n### Q2: protect middleware hamesha authorize se pehle kyun aana chahiye?\n**Jawab**: Kyunki `authorize` `req.user.role` check karta hai. Aur `req.user` object sirf `protect` middleware hi banata hai. Agar authorize pehle chalega toh `req.user` undefined milega aur crash ho jayega.\n\n### Q3: RBAC aur ABAC mein kya farq hai?\n**Jawab**: RBAC mein access user ke Role par depend karta hai (Admin vs User). ABAC mein access context aur attributes par depend karta hai (jaise office timing, location, ya file ownership)."}},{type:"summary",heading:{en:"Quick Summary: Role-Based Access Control Cheatsheet",hi:"Quick Summary: Role-Based Access Control Cheatsheet"},body:{en:"- **AuthN vs AuthZ**: Authentication verifies identity (401); Authorization checks permissions (403).\n- **Middleware Factory**: `authorize(...roles)` returns a middleware checking `req.user.role`.\n- **Order Matters**: Always chain `protect` BEFORE `authorize`.\n- **403 Forbidden**: Always return 403 for role violations to avoid triggering client logout loops.\n- **Dual Enforcement**: Hide buttons in React for UX, but ALWAYS enforce checks on Express endpoints for security.\n- **Ownership Checks**: Combine role checks with resource ownership (`item.user.toString() === req.user.id`).",hi:"- **AuthN vs AuthZ**: Pehchan ke liye 401, Adhikar ke liye 403.\n- **Middleware Factory**: `authorize('admin')` `req.user.role` check karta hai.\n- **Order Zaroori Hai**: Hamesha pehle `protect`, fir `authorize`.\n- **403 Status**: Permission deny hone par 403 use karein taaki user logout na ho.\n- **Backend Security**: React mein button chupana kafi nahi hai, Express API par check zaroor lagayein.\n- **Ownership Check**: Check karein ki user apna hi document modify kar raha hai ya nahi."}}],quiz:[{question:{en:"Which HTTP status code should be returned when an authenticated normal user attempts to access an admin-only endpoint?",hi:"Jab koi authenticated normal user kisi admin-only endpoint ko access karne ki koshish kare, tab kaunsa HTTP status code return hona chahiye?"},options:[{en:"401 Unauthorized",hi:"401 Unauthorized"},{en:"403 Forbidden",hi:"403 Forbidden"},{en:"404 Not Found",hi:"404 Not Found"},{en:"500 Internal Server Error",hi:"500 Internal Server Error"}],correctAnswer:1,explanation:{en:"403 Forbidden is used when the server understands who the user is, but the user does not possess the required permissions. 401 is only for missing or invalid authentication credentials.",hi:"403 Forbidden tab use hota hai jab server pehchanta hai user kaun hai, lekin user ke paas permission nahi hoti. 401 sirf unauthenticated users ke liye hota hai."}},{question:{en:"What happens if you place the authorize middleware before the protect middleware in an Express route?",hi:"Agar Express route mein authorize middleware ko protect middleware se pehle rakh diya jaye, toh kya hoga?"},options:[{en:"The route will run twice as fast",hi:"Route do guna tezz chalega"},{en:"req.user will be undefined because protect has not yet extracted the token, causing an error or immediate access rejection",hi:"req.user undefined hoga kyunki protect ne abhi tak token parse nahi kiya hai, jisse error ya rejection aa jayega"},{en:"The database will be converted to SQLite",hi:"Database SQLite ban jayega"},{en:"React will refuse to render the page",hi:"React page render karne se mana kar dega"}],correctAnswer:1,explanation:{en:"authorize depends on req.user.role. Because protect is responsible for verifying the token and populating req.user, protect must always execute first.",hi:"authorize ko req.user.role chahiye hota hai jo sirf protect middleware hi banata hai. Isliye protect ka pehle chalna anivarya hai."}},{question:{en:"Why is hiding a 'Delete User' button in the React UI not enough to prevent unauthorized deletions?",hi:"Unauthorized deletions rokne ke liye React UI mein 'Delete User' button chupana kaafi kyun nahi hota?"},options:[{en:"Because CSS cannot hide buttons in Chrome",hi:"Kyunki CSS Chrome mein buttons nahi chupa sakti"},{en:"Because any authenticated user can send a DELETE HTTP request directly to the backend API using Postman, curl, or browser console fetch",hi:"Kyunki koi bhi authenticated user Postman, curl ya browser console fetch se seedhe backend API par DELETE request bhej sakta hai"},{en:"Because buttons automatically reappear after 10 seconds",hi:"Kyunki buttons 10 second baad wapas aa jaate hain"},{en:"Because HTML forms ignore React state",hi:"Kyunki HTML forms React state ignore kar dete hain"}],correctAnswer:1,explanation:{en:"UI hiding is purely cosmetic. Attackers can fire direct HTTP requests to the API. Security must be enforced on the backend endpoint using authorize middleware.",hi:"UI hiding sirf dikhawe ke liye hoti hai. Hacker seedhe API par request bhej sakta hai, isliye backend par authorize check hona zaroori hai."}},{question:{en:"What is the primary advantage of Role-Based Access Control (RBAC)?",hi:"Role-Based Access Control (RBAC) ka primary advantage kya hai?"},options:[{en:"It reduces code complexity by grouping permissions into roles rather than assigning dozens of individual permissions to every user",hi:"Yeh hazaron users ko individual permissions dene ke bajaye permissions ko roles mein group karke code complexity kam karta hai"},{en:"It automatically purchases SSL certificates",hi:"Yeh SSL certificates automatically purchase karta hai"},{en:"It eliminates the need for MongoDB indexes",hi:"Yeh MongoDB indexes ki zaroorat khatam kar deta hai"},{en:"It speeds up browser JavaScript compilation",hi:"Yeh browser JavaScript compilation tezz karta hai"}],correctAnswer:0,explanation:{en:"RBAC simplifies permission management at scale by mapping permissions to roles, and roles to users.",hi:"RBAC har user ko alag permission dene ke jhanjhat ko khatam karke roles ke through clean access management provide karta hai."}},{question:{en:"What is the core architectural purpose of Role-Based Access Control (Admin, User, Moderator) in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Role-Based Access Control (RBAC Permissions) ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling role-based access control (admin, user, moderator) with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Role-Based Access Control (RBAC Permissions) ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Role-Based Access Control (Admin, User, Moderator) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Role-Based Access Control (RBAC Permissions) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Role-Based Access Control (Admin, User, Moderator) directly resolve?",hi:"Role-Based Access Control (RBAC Permissions) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Role-Based Access Control (Admin, User, Moderator), applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Role-Based Access Control (RBAC Permissions) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Role-Based Access Control (Admin, User, Moderator), how is its mental model best conceptualized through real-world analogies?",hi:"Role-Based Access Control (RBAC Permissions) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Role-Based Access Control (Admin, User, Moderator), what syntactic convention is essential to prevent runtime errors?",hi:"Role-Based Access Control (RBAC Permissions) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Role-Based Access Control (Admin, User, Moderator)?",hi:"Role-Based Access Control (RBAC Permissions) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Role-Based Access Control (Admin, User, Moderator) be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Role-Based Access Control (RBAC Permissions) ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Role-Based Access Control (Admin, User, Moderator) impact application memory and CPU consumption?",hi:"Role-Based Access Control (RBAC Permissions) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Role-Based Access Control (Admin, User, Moderator)?",hi:"Role-Based Access Control (RBAC Permissions) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Role-Based Access Control (Admin, User, Moderator)?",hi:"Role-Based Access Control (RBAC Permissions) mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Role-Based Access Control (Admin, User, Moderator)?",hi:"Role-Based Access Control (RBAC Permissions) mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Role-Based Access Control (Admin, User, Moderator), what must the test suite assert?",hi:"Role-Based Access Control (RBAC Permissions) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Role-Based Access Control (Admin, User, Moderator)?",hi:"Modular design Role-Based Access Control (RBAC Permissions) mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Role-Based Access Control (Admin, User, Moderator) be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Role-Based Access Control (RBAC Permissions) ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Role-Based Access Control (Admin, User, Moderator) properly belong and execute?",hi:"Full-stack MERN architecture mein Role-Based Access Control (RBAC Permissions) kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Role-Based Access Control (Admin, User, Moderator) in production?",hi:"Production mein Role-Based Access Control (RBAC Permissions) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Role-Based Access Control (Admin, User, Moderator)?",hi:"Role-Based Access Control (RBAC Permissions) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Role-Based Access Control (Admin, User, Moderator)?",hi:"Role-Based Access Control (RBAC Permissions) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
