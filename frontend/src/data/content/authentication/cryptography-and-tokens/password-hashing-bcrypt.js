export default {
  id: "auth-bcrypt-hashing",
  title: {
    en: "Password Hashing with Bcrypt & Salt Rounds",
    hi: "Password Hashing: Salt Rounds & Bcrypt Algorithm",
  },
  difficulty: "Beginner",
  readTime: 9,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Cardinal Rule of Security: Never Store Plain-Text Passwords",
        hi: "1. Security Ka Pehla Niyam: Plain-Text Passwords Kabhi Store Na Karein",
      },
      body: {
        en: `In software engineering, storing user passwords as plain text (e.g. \`"mypassword123"\`) in a database is an unforgivable security vulnerability. If a malicious attacker, disgruntled employee, or rogue SQL/NoSQL injection dumps your database, **every user account across your platform is immediately compromised**. Furthermore, because most humans reuse passwords across multiple sites, a leak on your platform compromises their email, banking, and social media accounts!

### Encryption vs Hashing: The Critical Distinction
- **Encryption is a TWO-WAY function**: Data is encrypted using an algorithm and a secret key, and can be decrypted back into plain text if you have the key. If an attacker breaches the server and steals your decryption key, every single password is instantly revealed.
- **Hashing is a ONE-WAY mathematical function**: Plain text data is transformed into a fixed-length string of characters (a hash). It is mathematically impossible to reverse a hash back to its original plain text.

### Why Not MD5 or SHA-256?
Older algorithms like MD5 and SHA-256 were designed to be **ultra-fast** for file integrity checks. However, modern GPUs can calculate **billions of SHA-256 hashes per second**! Attackers use precomputed lookup databases called **Rainbow Tables** to crack SHA-256 passwords in milliseconds.

### The Bcrypt Solution
**Bcrypt** is a cryptographic hash function specifically engineered for password storage. It has two foundational defenses:
1. **Adaptive Slowness (Cost Factor / Salt Rounds)**: Configurable difficulty that slows down the hashing calculation. A hash takes ~100ms on your server (unnoticeable to a logging-in user), but makes brute-forcing billions of guesses computationally impossible for hackers.
2. **Built-in Random Salt**: Generates a unique cryptographic salt for every user, making Rainbow Tables completely useless!`,
        hi: `Software development mein user ka password plain text (jaise \`"secret123"\`) mein database mein save karna sabse badi laparwahi maani jaati hai. Agar kal kisi hacker ne MongoDB ka data leak kar diya, toh sabhi users ke accounts hack ho jayenge!

### Encryption vs Hashing: Dono Ka Mukhya Antar
- **Encryption (Two-Way)**: Data ko lock kiya jata hai aur key se wapas open (decrypt) kiya ja sakta hai. Agar hacker ko key mil gayi, toh wo saare passwords padh lega.
- **Hashing (One-Way)**: Yeh ek taraf ka mathematical formula hai. Password ko hash mein badal diya jata hai, aur hash se wapas original password nikalna mathematically namumkin hota hai!

### MD5 aur SHA-256 Kyun Use Nahi Karte?
MD5 aur SHA-256 bohot tezz hote hain. Aaj kal ke gaming GPUs 1 second mein hazaron croro SHA-256 hashes calculate kar sakte hain. Hackers pehle se bani hui tables (**Rainbow Tables**) se seconds mein password crack kar lete hain.

### Bcrypt Kyun Best Hai?
1. **Slow by Design (Salt Rounds)**: Bcrypt ko janbujhkar thoda slow banaya gaya hai. Ek password check hone mein 100ms lagte hain, jisse login karne wale user ko pata bhi nahi chalta, lekin hacker ka brute-force attack saalon tak ke liye freeze ho jata hai.
2. **Automatic Random Salt**: Har user ke password ke sath ek unique random string jodi jaati hai jisse Rainbow Tables bekar ho jaati hain!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Anatomy of a Bcrypt Hash",
        hi: "2. Bcrypt Hash String Ka Post-Mortem",
      },
      body: {
        en: `When you hash a password with bcrypt, the resulting string looks like this:

\`\`\`text
$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdCp1fS67Wrqy7LZyW6
├───┼──┼────────────────────┼──────────────────────────────┤
 │   │           │                         │
 │   │           │                         └─ 31 Characters: The Hash Output
 │   │           └─ 22 Characters: The Cryptographic Salt
 │   └─ 2 Digits: Cost Factor (Salt Rounds: 2^10 = 1,024 iterations)
 └─ 3 Characters: Algorithm Identifier ($2a$, $2b$, or $2y$)
\`\`\`

### How Does Bcrypt Verification Work Without Decryption?
When a user logs in with their plain password:
1. Express fetches the stored hash from MongoDB.
2. Bcrypt extracts the embedded salt and cost factor directly from the hash prefix.
3. Bcrypt hashes the newly entered password using that **exact same salt**.
4. It compares the newly generated hash with the stored hash using a constant-time comparison. If they match, the password is correct!`,
        hi: `Bcrypt se bana hash string kuch aisa dikhta hai:

\`$2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdCp1fS67Wrqy7LZyW6\`

- **$2b$**: Bcrypt algorithm version.
- **10**: Cost factor / Salt rounds (\`2^10 = 1024\` rounds).
- **nOUIs5kJ7naTuTFkBy1veu**: 22 characters ka unique Salt.
- **K0kSxUFXfuaOKdCp1fS67Wrqy7LZyW6**: Final 31 characters ka hash.

### Bina Decrypt Kiye Password Verify Kaise Hota Hai?
Login ke waqt:
1. User apna plain password enter karta hai.
2. Bcrypt database ke hash mein se purana salt nikalta hai.
3. User ke naye password ko usi purane salt ke sath hash karta hai.
4. Dono hashes ko compare karta hai. Agar dono match ho gaye, toh password sahi hai!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: Cooking Tomato Soup vs Unlocking a Safe",
        hi: "Real-Life Analogy: Tamatar Ka Soup Banana vs Tijori Ka Taala",
      },
      body: {
        en: `Consider the difference between a physical lock and cooking tomato soup:

- **Encryption (The Physical Padlock)**:
  You put your secret note inside a metal safe and lock it with a golden key. As long as you have the key, you can turn it to open the door and read the original handwriting. But if a thief steals that key, they can open every safe in the house and read all notes.
- **One-Way Hashing (Blending Tomato Soup)**:
  You take fresh whole tomatoes, chopped garlic, basil, and cream, put them in a high-speed blender, and boil them into a bowl of thick tomato soup. Once blended and cooked, **no scientist or master chef in the world can physically reverse the soup back into intact, whole, raw tomatoes**!
- **The Salt (The Unique Pinch of Spices)**:
  Even if two customers order the exact same tomato soup, the chef drops a completely unique, randomized pinch of mountain spices into each customer's bowl. Looking at the two bowls, their chemical signatures and aromas are distinct. A thief cannot look at Bowl A and use a cheat sheet to guess what was in Bowl B!`,
        hi: `Ek physical taala aur tamatar ke soup ka example dekhein:

- **Encryption (Tijori Ka Taala)**:
  Aapne password paper par likh kar tijori mein band kar diya. Chaabi ghumane par paper wapas nikal aata hai. Lekin agar chor chaabi chura le, toh saare secrets khul jaate hain.
- **One-Way Hashing (Tamatar Ka Soup)**:
  Aapne tamatar, pyaz, garlic aur masale ko mixer mein pees kar garam soup bana diya. Ek baar soup ban gaya, toh duniya ka koi bhi doctor ya chef us soup se wapas khada sabut tamatar nahi nikal sakta! Yeh One-Way process hai.
- **The Salt (Chutki Bhar Anokha Masala)**:
  Chahe do logon ka password same ho (\`password123\`), chef dono ke soup mein alag-alag random masala daal deta hai. Dono ke soup ka final taste aur texture bilkul alag ho jata hai, jisse chor pre-made cheat sheets (Rainbow Tables) use nahi kar pata!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax: Generating Salts, Hashing & Comparing with bcryptjs",
        hi: "Syntax Aur Methods: genSalt, hash Aur compare",
      },
      body: {
        en: `In Node.js MERN applications, we use \`bcryptjs\` (pure JavaScript implementation) or \`bcrypt\` (native C++ bindings):

\`\`\`bash
npm install bcryptjs --prefix server
\`\`\`

### 1. Manual Hashing
\`\`\`javascript
import bcrypt from 'bcryptjs';

// Step 1: Generate a cryptographic salt with 10 rounds
const salt = await bcrypt.genSalt(10);

// Step 2: Hash the password with the generated salt
const hashedPassword = await bcrypt.hash('myPlainPassword123', salt);
console.log('Stored in DB:', hashedPassword);
\`\`\`

### 2. Manual Password Comparison
\`\`\`javascript
// Step 3: Compare entered plain password with stored hash
const isMatch = await bcrypt.compare('myPlainPassword123', hashedPassword);
console.log('Password valid?:', isMatch); // true or false
\`\`\`

### Why You Must ALWAYS Use Asynchronous Methods:
Never use \`bcrypt.hashSync()\` or \`bcrypt.compareSync()\` in an Express web server! Bcrypt is CPU-intensive. Synchronous hashing freezes the entire Node.js single-threaded Event Loop for 100-300ms, blocking every other concurrent user from loading pages or APIs! Always use \`await bcrypt.hash()\` and \`await bcrypt.compare()\`.`,
        hi: `Node.js mein hum \`bcryptjs\` package use karte hain:

1. \`genSalt(10)\`: 10 rounds ka random salt generate karta hai.
2. \`hash(plainPassword, salt)\`: Password aur salt ko combine karke final hash string banata hai.
3. \`compare(candidatePassword, storedHash)\`: User ke enter kiye hue password ko verify karta hai.

> **Zaroori Niyam**: Express server mein kabhi bhi \`hashSync\` ya \`compareSync\` use na karein! Bcrypt CPU-heavy hota hai, sync use karne se Node.js ka Event Loop freeze ho jayega aur doosre users ki requests atak jayengi. Hamesha \`async/await\` use karein.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Basic Hashing and Verification Benchmark Script",
        hi: "Example 1: Basic Hashing Aur Verification Ka Standalone Script",
      },
      body: {
        en: `This standalone Node.js script demonstrates how two identical passwords produce two completely different hashes thanks to unique salts, and benchmarks execution time.

\`\`\`javascript
// testBcrypt.js
import bcrypt from 'bcryptjs';

async function runBenchmark() {
  const password = 'SuperSecretPassword@2026';

  console.log('--- Generating Hashes for Same Password ---');
  const start1 = performance.now();
  const salt1 = await bcrypt.genSalt(10);
  const hash1 = await bcrypt.hash(password, salt1);
  const end1 = performance.now();

  const salt2 = await bcrypt.genSalt(10);
  const hash2 = await bcrypt.hash(password, salt2);

  console.log('Hash 1:', hash1);
  console.log('Hash 2:', hash2);
  console.log('Are hashes identical?:', hash1 === hash2); // FALSE!
  console.log(\`Time taken for 10 rounds: \${(end1 - start1).toFixed(2)} ms\`);

  console.log('\n--- Verifying Password Matches ---');
  const match1 = await bcrypt.compare(password, hash1);
  const match2 = await bcrypt.compare('WrongPasswordHere', hash1);

  console.log('Correct password match?:', match1); // true
  console.log('Wrong password match?:', match2);   // false
}

runBenchmark();
\`\`\``,
        hi: `Yeh script run karke dekhein:
- Dono baar same password diya gaya, lekin \`hash1\` aur \`hash2\` bilkul alag aate hain kyunki dono ka random salt alag hai!
- Iske bawajood \`bcrypt.compare(password, hash1)\` aur \`bcrypt.compare(password, hash2)\` dono \`true\` return karte hain.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Mongoose User Model with pre('save') Middleware",
        hi: "Example 2: Mongoose Model Mein pre('save') Hook Se Auto-Hashing",
      },
      body: {
        en: `In professional MERN apps, passwords should be hashed automatically whenever a user document is saved or updated. We also set \`select: false\` so the password is never accidentally returned in user queries!

\`\`\`javascript
// server/src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false, // CRITICAL: Never return password in find() queries by default!
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// Pre-save middleware: Automatically hash password before saving to MongoDB
userSchema.pre('save', async function (next) {
  // Only hash password if it has been modified (or is newly created!)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method: Convenient helper to verify password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
\`\`\``,
        hi: `Yeh industry standard Mongoose User schema hai:
- \`select: false\`: User find karne par password field automatically hide rehti hai taaki API response mein password leak na ho.
- \`userSchema.pre('save')\`: Document save hone se pehle password automatically hash ho jata hai.
- \`if (!this.isModified('password'))\`: Agar user sirf apna naam ya email update kare, toh purana hashed password dobara hash nahi hota!
- \`user.comparePassword(candidate)\`: Login controller ke liye clean helper method.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Register & Login Controller with Timing-Attack Defense",
        hi: "Example 3: Register Aur Login Controller Timing Attack Protection Ke Saath",
      },
      body: {
        en: `This Express controller safely handles user registration and login, explicitly selecting the hidden password field and preventing account enumeration timing attacks.

\`\`\`javascript
// server/src/controllers/authController.js
import { User } from '../models/User.js';

// Dummy hash used to balance response time if user is not found (prevents timing attacks!)
const DUMMY_HASH = '$2b$10$wK1kKk1kKk1kKk1kKk1kKeK0kSxUFXfuaOKdCp1fS67Wrqy7LZyW6';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    // pre('save') hook in User model handles hashing automatically!
    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Must use .select('+password') because select: false is enabled on schema!
    const user = await User.findOne({ email }).select('+password');

    // Timing-attack prevention: Always run bcrypt.compare even if user doesn't exist!
    const hashToCompare = user ? user.password : DUMMY_HASH;
    const isMatch = await (user ? user.comparePassword(password) : bcrypt.compare(password, DUMMY_HASH));

    if (!user || !isMatch) {
      // Vague error message prevents user enumeration!
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};
\`\`\``,
        hi: `Yeh professional authentication controller hai:
- \`User.findOne().select('+password')\`: Schema mein hidden password ko login ke waqt explicitly mangwaya jata hai.
- **Timing Attack Defense**: Agar email galat ho, tab bhi \`bcrypt.compare\` execute hota hai taaki hacker request ke response time se yeh andaza na laga sake ki email database mein exist karta hai ya nahi.
- Generic error message (*"Invalid email or password"*) hackers ko email enumeration karne se rokta hai.`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Common Mistakes Aur Unke Fixes",
      },
      body: {
        en: `### 1. Re-Hashing Already Hashed Passwords on User Profile Updates
- **Mistake**: When updating a user's profile (e.g. \`user.name = 'Aman'\`), saving the document without checking \`isModified('password')\`.
- **Why it breaks**: Bcrypt re-hashes the already-hashed password string. Next time the user attempts to log in, their password will fail forever!
- **Fix**: Always include \`if (!this.isModified('password')) return next();\` inside your Mongoose pre-save hook.

### 2. Setting Salt Rounds Too High (> 14) or Too Low (< 8)
- **Mistake**: Setting salt rounds to 16 thinking "higher is always better", or setting to 4 to make it fast.
- **Why it hurts**: Salt rounds are exponential (\`2^rounds\`). Round 10 takes ~100ms. Round 16 takes **6.4 seconds per login**, freezing your Node server! Conversely, Round 4 is so weak it can be brute-forced in seconds.
- **Fix**: Use **10 to 12 rounds** (the industry-standard sweet spot).

### 3. Using Synchronous Methods in Web Requests
- **Mistake**: Writing \`bcrypt.hashSync()\` inside an Express route handler.
- **Why it hurts**: Blocks the single Node.js main thread completely for 150ms per request. If 10 users click login at the same time, the 10th user waits 1.5 seconds!
- **Fix**: Always use the asynchronous promise-based \`await bcrypt.hash()\`.`,
        hi: `### 1. Profile Update Par Dobara Hash Kar Dena
- **Galti**: User ne sirf naam update kiya aur \`isModified('password')\` check nahi lagaya.
- **Nuksan**: Purana hash dobara hash ho jata hai aur user ka login hamesha ke liye block ho jata hai!
- **Fix**: Pre-save hook mein hamesha \`if (!this.isModified('password')) return next()\` lagayein.

### 2. Salt Rounds Bohot Zyada Rakh Dena
- **Galti**: Salt rounds 16 rakh dena.
- **Nuksan**: Rounds exponential hote hain (\`2^rounds\`). Round 16 har login par 6-7 second ka CPU time lega aur server freeze ho jayega!
- **Fix**: Hamesha **10 se 12** rounds use karein.

### 3. hashSync Use Karna
- **Galti**: Express route mein \`bcrypt.hashSync()\` likhna.
- **Nuksan**: Node.js ka main thread block ho jata hai aur baaki users ki requests ruk jaati hain.
- **Fix**: Hamesha \`await bcrypt.hash()\` use karein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Password Security Hygiene",
        hi: "Best Practices: Password Security Guidelines",
      },
      body: {
        en: `1. **Always Set select: false on Password Fields**: Prevent accidental password exposure by hiding the field from default MongoDB query projections.
2. **Never Return Hashed Passwords in API Responses**: Even though bcrypt hashes are irreversible, exposing hashes lets attackers perform offline dictionary attacks.
3. **Use Vague Error Messages**: Always return *"Invalid email or password"*. Never tell the user *"Incorrect password"* or *"Email not found"*, as this allows automated username enumeration attacks.
4. **Enforce Password Complexity on the Backend**: Validate that passwords are at least 8 characters long and contain numbers, uppercase letters, and symbols before hashing.`,
        hi: `1. **select: false Zaroor Lagayein**: Mongoose schema mein \`select: false\` lagayein taaki \`User.find()\` mein password leak na ho.
2. **API Response Mein Hash Na Bhejein**: Hash ko bhi frontend par nahi bhejna chahiye.
3. **Vague Error Messages**: Hamesha *"Invalid email or password"* bole, yeh na batayein ki email sahi tha ya password galat tha.
4. **Backend Validation**: Kam se kam 8 characters aur special characters ka validation lagayein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Interview Ke Zaroori Sawal Aur Jawab",
      },
      body: {
        en: `### Q1: What is the fundamental difference between Encryption and Hashing?
**Answer**:
- **Encryption** is a two-way cryptographic operation intended to obscure data so it can later be decrypted back to plain text using a secret key (e.g., AES-256).
- **Hashing** is a one-way mathematical function that irreversibly transforms arbitrary data into a fixed-size digest. There is no key that can reverse a hash back to its input. Passwords must always be hashed, never encrypted.

### Q2: What is a Salt in password hashing, and what vulnerability does it eliminate?
**Answer**: A salt is a cryptographically strong random string appended to the plain password before hashing. It eliminates two major vulnerabilities:
1. **Rainbow Table Attacks**: Attackers cannot use precomputed databases of hashes because the random salt changes the resulting hash completely.
2. **Identical Password Collisions**: If two users choose the password \`"password123"\`, their resulting hashes are completely different because each receives a distinct random salt.

### Q3: What does the "Salt Rounds" (Cost Factor) parameter in bcrypt control?
**Answer**: The salt rounds number determines the computational work factor as an exponential power: \`2^rounds\` iterations (e.g. 10 rounds = \`2^10 = 1,024\` iterations; 12 rounds = \`2^12 = 4,096\` iterations). It controls how long the algorithm takes to compute, allowing administrators to increase difficulty as computer hardware becomes faster over time.

### Q4: Why must we use asynchronous bcrypt methods in an Express web server?
**Answer**: Node.js operates on a single-threaded Event Loop. Bcrypt's mathematical algorithms are computationally intensive (taking 100-200ms of pure CPU time). Synchronous methods like \`bcrypt.hashSync()\` block the main thread completely, preventing the server from processing any other incoming HTTP requests until the hash finishes. Asynchronous \`bcrypt.hash()\` offloads the work to the Libuv worker thread pool, keeping the main Event Loop responsive.`,
        hi: `### Q1: Encryption aur Hashing mein kya farq hai?
**Jawab**: Encryption two-way process hai jise secret key se decrypt kiya ja sakta hai. Hashing one-way mathematical function hai jise reverse karke original password nikalna namumkin hai. Passwords ko hamesha hash kiya jata hai.

### Q2: Salt kya hai aur yeh kis attack se bachata hai?
**Jawab**: Salt ek random unique string hoti hai jo password ke sath combine ki jaati hai. Yeh Rainbow Table attacks ko bekar kar deti hai aur agar do users ka password same ho tab bhi unke hashes bilkul alag banati hai.

### Q3: Salt Rounds kya control karta hai?
**Jawab**: Salt rounds algorithm ki computational complexity (\`2^rounds\`) control karta hai. Isse hashing ko intentionally slow rakha jata hai taaki hackers brute-force na kar sakein.

### Q4: Async methods use karna kyun zaroori hai?
**Jawab**: Bcrypt CPU-heavy hota hai. Agar sync use karenge toh Node.js ka single-threaded Event Loop freeze ho jayega aur doosre users ki requests ruk jayengi. Async method Libuv thread pool par kaam bhejta hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Bcrypt Password Hashing Cheatsheet",
        hi: "Quick Summary: Bcrypt Password Hashing Cheatsheet",
      },
      body: {
        en: `- **Never Store Plain Passwords**: Always hash passwords using bcrypt before saving to MongoDB.
- **One-Way Process**: Hashing is mathematically irreversible; passwords are verified via \`bcrypt.compare()\`.
- **Random Salt**: Neutralizes Rainbow Table dictionary attacks and identical password collisions.
- **Salt Rounds**: Use 10 to 12 rounds for optimal security without degrading server latency.
- **Mongoose pre('save')**: Check \`this.isModified('password')\` before hashing to prevent re-hashing on profile edits.
- **Always Async**: Use \`await bcrypt.hash()\` and \`await bcrypt.compare()\` to avoid blocking the Node.js Event Loop.`,
        hi: `- **Plain Text Mana Hai**: Passwords ko hamesha database mein save karne se pehle hash karein.
- **One-Way Math**: Hash ko wapas password mein nahi badla ja sakta; verify karne ke liye \`bcrypt.compare()\` use hota hai.
- **Salt Ka Magic**: Rainbow Tables ko bekar banata hai aur unique hash generate karta hai.
- **10-12 Rounds**: Security aur server speed ka perfect balance.
- **isModified Check**: Profile update par password ko dobara hash hone se rokein.
- **Async Zaroori Hai**: Event loop ko freeze hone se bachane ke liye hamesha async/await use karein.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "Why is Hashing preferred over Encryption for storing user passwords?",
      "hi": "User passwords store karne ke liye Encryption ke muqable Hashing ko kyun prefer kiya jata hai?"
    },
    "options": [
      {
        "en": "Hashing compresses data by 90%",
        "hi": "Hashing data ko 90% compress kar deta hai"
      },
      {
        "en": "Hashing is a one-way mathematical function that cannot be reversed, so even if the database is leaked, plain passwords cannot be decrypted",
        "hi": "Hashing ek one-way function hai jise reverse nahi kiya ja sakta, isliye database leak hone par bhi plain passwords decrypt nahi ho sakte"
      },
      {
        "en": "Encryption does not work with letters or symbols",
        "hi": "Encryption letters aur symbols ke sath kaam nahi karti"
      },
      {
        "en": "MongoDB refuses to store encrypted strings",
        "hi": "MongoDB encrypted strings store karne se mana kar deta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Because hashing is one-way, there is no decryption key to steal. Passwords can only be verified, never recovered.",
      "hi": "Hashing one-way mathematical process hai jise decrypt nahi kiya ja sakta, isliye database dump hone par bhi passwords safe rehte hain."
    }
  },
  {
    "question": {
      "en": "What attack does a unique cryptographic 'Salt' specifically prevent?",
      "hi": "Unique cryptographic 'Salt' specific roop se kis attack ko prevent karta hai?"
    },
    "options": [
      {
        "en": "SQL Injection",
        "hi": "SQL Injection"
      },
      {
        "en": "Rainbow Table attacks and precomputed dictionary lookups",
        "hi": "Rainbow Table attacks aur precomputed dictionary lookups"
      },
      {
        "en": "Cross-Site Scripting (XSS)",
        "hi": "Cross-Site Scripting (XSS)"
      },
      {
        "en": "Distributed Denial of Service (DDoS)",
        "hi": "Distributed Denial of Service (DDoS)"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "A salt ensures identical passwords produce distinct hashes, rendering precomputed Rainbow Tables completely useless.",
      "hi": "Salt har password ke hash ko unique bana deta hai jisse hackers ki precomputed Rainbow Tables bekar ho jaati hain."
    }
  },
  {
    "question": {
      "en": "What critical bug occurs if you forget 'if (!this.isModified('password')) return next();' in a Mongoose pre-save hook?",
      "hi": "Mongoose pre-save hook mein 'if (!this.isModified('password')) return next();' bhool jane par kaunsa critical bug aata hai?"
    },
    "options": [
      {
        "en": "MongoDB will delete the entire user collection",
        "hi": "MongoDB poora user collection delete kar dega"
      },
      {
        "en": "Updating non-password profile fields (like name) will re-hash the existing hash, permanently locking the user out of their account",
        "hi": "Profile fields (jaise name) update karne par purana hash dobara hash ho jayega, aur user hamesha ke liye apne account se lock out ho jayega"
      },
      {
        "en": "The server will shut down automatically",
        "hi": "Server automatically band ho jayega"
      },
      {
        "en": "The browser will refuse to load JavaScript",
        "hi": "Browser JavaScript load karne se mana kar dega"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Without isModified('password'), any update (e.g. changing name or avatar) re-hashes the stored hash, corrupting the password and preventing future logins.",
      "hi": "isModified check na hone par name update karne par bhi purana hash dobara hash ho jata hai aur user ka password kharab ho jata hai."
    }
  },
  {
    "question": {
      "en": "Why should you never use bcrypt.hashSync() in an Express production route?",
      "hi": "Express production route mein bcrypt.hashSync() kabhi kyun nahi use karna chahiye?"
    },
    "options": [
      {
        "en": "It deletes the user's browser history",
        "hi": "Yeh browser history delete kar deta hai"
      },
      {
        "en": "It blocks Node.js's single-threaded Event Loop, freezing the server for all other concurrent users during computation",
        "hi": "Yeh Node.js ke single-threaded Event Loop ko block kar deta hai, jisse computation ke dauran baaki sabhi users ke liye server freeze ho jata hai"
      },
      {
        "en": "It produces insecure hashes",
        "hi": "Yeh kamzor hashes banata hai"
      },
      {
        "en": "It is banned by the npm registry",
        "hi": "Yeh npm registry par banned hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Bcrypt is CPU-intensive. Synchronous execution halts the Node.js event loop completely, causing server lag for all incoming traffic. Always use asynchronous bcrypt.hash().",
      "hi": "Bcrypt CPU-heavy hota hai. Sync use karne se Node.js ka main thread freeze ho jata hai aur baaki users ki requests atak jaati hain."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Password Hashing with Bcrypt & Salt Rounds in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Password Hashing: Salt Rounds & Bcrypt Algorithm ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling password hashing with bcrypt & salt rounds with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Password Hashing: Salt Rounds & Bcrypt Algorithm ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Password Hashing with Bcrypt & Salt Rounds establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Password Hashing with Bcrypt & Salt Rounds directly resolve?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Password Hashing with Bcrypt & Salt Rounds, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Password Hashing with Bcrypt & Salt Rounds, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Password Hashing with Bcrypt & Salt Rounds, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Password Hashing with Bcrypt & Salt Rounds?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Password Hashing with Bcrypt & Salt Rounds be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Password Hashing: Salt Rounds & Bcrypt Algorithm ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Password Hashing with Bcrypt & Salt Rounds impact application memory and CPU consumption?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Password Hashing with Bcrypt & Salt Rounds?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Password Hashing with Bcrypt & Salt Rounds?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Password Hashing with Bcrypt & Salt Rounds?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Password Hashing with Bcrypt & Salt Rounds, what must the test suite assert?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Password Hashing with Bcrypt & Salt Rounds?",
      "hi": "Modular design Password Hashing: Salt Rounds & Bcrypt Algorithm mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Password Hashing with Bcrypt & Salt Rounds be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Password Hashing: Salt Rounds & Bcrypt Algorithm ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Password Hashing with Bcrypt & Salt Rounds properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Password Hashing: Salt Rounds & Bcrypt Algorithm kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Password Hashing with Bcrypt & Salt Rounds in production?",
      "hi": "Production mein Password Hashing: Salt Rounds & Bcrypt Algorithm ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Password Hashing with Bcrypt & Salt Rounds?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Password Hashing with Bcrypt & Salt Rounds?",
      "hi": "Password Hashing: Salt Rounds & Bcrypt Algorithm mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
