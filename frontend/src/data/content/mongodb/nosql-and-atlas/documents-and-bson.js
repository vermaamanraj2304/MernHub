export default {
  id: "mongo-bson-format",
  title: {
    en: "Documents, Collections & BSON Data Types",
    hi: "Documents, Collections & BSON Data Types (ObjectId)",
  },
  difficulty: "Beginner",
  readTime: 8,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is BSON (Binary JSON)?",
        hi: "1. BSON (Binary JSON) Kya Hota Hai?",
      },
      body: {
        en: `While developers write queries and interact with MongoDB using standard JSON (JavaScript Object Notation), **MongoDB does NOT store data on disk as text JSON**. Instead, MongoDB stores and transmits data using **BSON (Binary JSON)**.

### Why not raw JSON?
JSON is a fantastic data interchange format for humans, but it has severe limitations for high-performance databases:
1. **Inefficient Parsing**: To find a field deep inside a text JSON string, a parser must scan through every single character from the beginning. BSON prepends **byte-length prefixes**, allowing MongoDB to skip directly to specific fields in nanoseconds!
2. **Limited Data Types**: Standard JSON only supports 6 data types (String, Number, Object, Array, Boolean, Null). It has NO native support for Dates, 64-bit Integers, Binary Blobs, or Precise Financial Decimals.

### BSON to the Rescue:
BSON is a binary serialization format that preserves JSON's document structure while adding **rich data types** and high-speed traversal capabilities.`,
        hi: `Hum developers MongoDB ke sath kaam karte waqt normal JSON likhte hain, lekin **MongoDB disk par data ko text JSON mein save NAHI karta**. MongoDB data ko **BSON (Binary JSON)** format mein store karta hai.

### Normal JSON Kyun Nahi?
JSON insano ke padhne ke liye bohot accha hai, par databases ke liye isme do badi kamiya hain:
1. **Slow Scanning**: Text JSON mein kisi field ko dhoondhne ke liye poore text ko shuru se aakhiri tak scan karna padta hai. BSON har field ke aage uska **byte length** likh deta hai, jisse MongoDB direct jump karke microsecond mein data nikal leta hai!
2. **Limited Types**: JSON mein sirf 6 data types hote hain. Isme Dates, 64-bit Integers, aur Currency decimals ka koi native support nahi hota.

### BSON Ka Solution:
BSON ek binary format hai jo JSON ki flexibility ko retain karte hue **Dates, ObjectId, aur precise financial types** provide karta hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Anatomy of an ObjectId (12 Bytes)",
        hi: "2. ObjectId Ka 12-Byte Internal Structure",
      },
      body: {
        en: `Whenever a document is inserted into MongoDB without specifying an \`_id\`, MongoDB automatically generates a unique **\`ObjectId\`** (a 24-character hexadecimal string).

An \`ObjectId\` is **NOT a random number**! It is a 12-byte binary value composed of three deterministic components:

\`\`\`
+-----------------------+---------------------+---------------------+
|   4-Byte Timestamp    | 5-Byte Random Value |  3-Byte Increment   |
| (Seconds since epoch) | (Machine & Process) | (Counter from rand) |
+-----------------------+---------------------+---------------------+
  [ 0  1  2  3 ]          [ 4  5  6  7  8 ]     [ 9  10  11 ]
\`\`\`

1. **4-Byte Timestamp**: Records the exact Unix second when the document was created. You can extract the creation time directly using \`_id.getTimestamp()\` without needing an extra \`createdAt\` field!
2. **5-Byte Random Value**: Unique to the physical machine and process ID, preventing collisions across distributed clusters.
3. **3-Byte Incrementing Counter**: A counter initialized to a random value that increments per document created in that process.

> **Pro-Tip**: Because the first 4 bytes represent a timestamp, MongoDB documents are **naturally ordered chronologically by insertion time** when sorting by \`_id\`!`,
        hi: `Jab bhi aap MongoDB mein koi document save karte ho, MongoDB automatically ek unique **\`ObjectId\`** (24-character hex string) generate karta hai.

\`ObjectId\` koi aam random number nahi hota! Yeh **12 bytes** ka ek structured code hota hai:

\`\`\`
+-----------------------+---------------------+---------------------+
|   4-Byte Timestamp    | 5-Byte Random Value |  3-Byte Increment   |
| (Unix epoch seconds)  | (Machine + Process) |  (Counter number)   |
+-----------------------+---------------------+---------------------+
  [ 0  1  2  3 ]          [ 4  5  6  7  8 ]     [ 9  10  11 ]
\`\`\`

1. **Pehle 4 Bytes (Timestamp)**: Yeh exact wo second record karta hai jab document insert hua tha. Aap \`_id.getTimestamp()\` se bina kisi \`createdAt\` field ke document ka creation time nikal sakte ho!
2. **Agle 5 Bytes (Machine + Process)**: Yeh computer aur process ID ka unique code hota hai taaki do alag servers par same ID na bane.
3. **Aakhiri 3 Bytes (Counter)**: Har naye document par 1 badhne wala counter.

> **Super Tip**: Pehle 4 bytes timestamp hone ki wajah se, MongoDB documents ko \`_id: 1\` se sort karne par wo automatically **time ke hisab se chronologically sort** ho jaate hain!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Indian Smart Card Driving License",
        hi: "Real-Life Analogy: Smart Card Driving License Ka Microchip",
      },
      body: {
        en: `Consider your **Smart Card Driving License**:

- **Raw JSON is a Paper Photostat Copy**:
  - Contains visible printed text. Anyone can read it, but you cannot verify when the ink was printed or whether it's authentic without reading every line.
- **BSON is the Embedded Gold Microchip on the Smart Card**:
  - The chip stores information in compressed binary format.
  - When the traffic police insert the card into their handheld scanner, the scanner doesn't visually parse the plastic; it jumps directly to the byte address for blood group and violation points in 1 millisecond!
- **The \`ObjectId\` is the License Number Encoding**:
  - The first characters encode the year of issue (\`DL-042018...\` = 2018), the middle encodes the regional RTO authority, and the tail is the sequence counter!`,
        hi: `Sochiye aapka **Smart Card Driving License**:

- **Normal JSON Paper Photocopy Jaisa Hai**:
  - Saamne sab kuch text mein likha hai. Par validity check karne ke liye traffic police ko poora paper dhyan se padhna padega.
- **BSON License Ke Gold Microchip Jaisa Hai**:
  - Chip ke andar data binary format mein store hota hai.
  - Traffic police jaise hi chip ko scanner machine mein daalti hai, machine direct byte address padh kar 1 millisecond mein blood group aur challan history nikal leti hai!
- **\`ObjectId\` License Number Jaisa Hai**:
  - Shuru ke characters issue year batate hain (\`DL-042020...\` = 2020), beech ka hissa RTO office ka code hota hai, aur aakhiri hissa serial number hota hai!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. Key BSON Data Types in MongoDB",
        hi: "4. MongoDB Ke Mukhya BSON Data Types",
      },
      body: {
        en: `| BSON Data Type | Example in Node / Mongoose | Why it Matters |
| :--- | :--- | :--- |
| **ObjectId** | \`new mongoose.Types.ObjectId()\` | 12-byte unique primary key with embedded timestamp |
| **Date** | \`new Date()\` | 64-bit integer tracking milliseconds; enables \`$gte\` range queries |
| **Int32** | \`100\` | 32-bit signed integer |
| **Int64 (Long)** | \`mongoose.Schema.Types.BigInt\` | 64-bit large integers |
| **Decimal128** | \`mongoose.Types.Decimal128.fromString("149.99")\` | High-precision 128-bit decimal for **financial / currency** data |
| **Binary** | \`Buffer.from(...)\` | Storing small files, hashes, or encryption keys |
| **Regex** | \`/^aman/i\` | Native pattern matching for search queries |`,
        hi: `| BSON Data Type | Node / Mongoose Mein Example | Iska Fayda |
| :--- | :--- | :--- |
| **ObjectId** | \`new mongoose.Types.ObjectId()\` | 12-byte primary key jismein timestamp embedded hota hai |
| **Date** | \`new Date()\` | 64-bit date format jo \`$gte\` range search allow karta hai |
| **Decimal128** | \`Decimal128.fromString("99.95")\` | Paise/Rupees ke accurate calculations bina floating point error ke |
| **Binary** | \`Buffer.from(...)\` | Small files aur encryption keys store karne ke liye |
| **Regex** | \`/^search/i\` | Search queries ke liye native pattern matching |`,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: ObjectId Extraction, Date Range & Decimal128",
        hi: "5. Practical Examples: ObjectId Timestamp, Date Range aur Decimal128",
      },
      body: {
        en: `### Example 1: Deconstructing an ObjectId to Extract Creation Time
Extracting the creation timestamp directly from the 12-byte ObjectId without storing a separate createdAt field.`,
        hi: `### Example 1: ObjectId Se Direct Creation Timestamp Nikalna
Dekhiye kaise \`_id.getTimestamp()\` se exact time pata chal jata hai.`,
      },
      code: {
        language: "javascript",
        filename: "objectIdTimestamp.js",
        snippet: `// Example 1: Extracting metadata from MongoDB ObjectId
import mongoose from "mongoose";

// Generate a sample ObjectId
const sampleId = new mongoose.Types.ObjectId();

console.log("24-Character Hex String: ", sampleId.toString());
console.log("Raw 12-Byte Buffer:      ", sampleId.id);

// Extract the embedded creation timestamp
const creationDate = sampleId.getTimestamp();
console.log("Embedded Creation Time:  ", creationDate.toISOString());

// Verifying chronological ordering:
const id1 = new mongoose.Types.ObjectId();
const id2 = new mongoose.Types.ObjectId();
console.log("id2 created after id1:  ", id2 > id1); // true!`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Querying with BSON Date Ranges",
        hi: "Example 2: BSON Date Range Queries ($gte, $lte)",
      },
      body: {
        en: `### Example 2: Finding Records Created in the Last 7 Days
Demonstrating why storing dates as BSON \`Date\` objects enables native chronological comparisons that fail with plain strings.`,
        hi: `### Example 2: Pichle 7 Dino Ka Data Fetch Karna
BSON Date use karke date filtering queries execute karna.`,
      },
      code: {
        language: "javascript",
        filename: "dateQueries.js",
        snippet: `// Example 2: Efficient BSON Date Range Queries
import mongoose from "mongoose";

// Mock user document
const userSchema = new mongoose.Schema({
  username: String,
  registeredAt: { type: Date, default: Date.now }
});

const User = mongoose.model("UserDateDemo", userSchema);

async function findRecentUsers() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // MongoDB native date comparison: $gte (Greater than or equal to)
  const recentUsersQuery = {
    registeredAt: {
      $gte: sevenDaysAgo,
      $lte: new Date()
    }
  };

  console.log("Filtering users registered since:", sevenDaysAgo.toLocaleDateString());
  // In real DB: const users = await User.find(recentUsersQuery);
}

findRecentUsers();`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Precision Financial Calculations with Decimal128",
        hi: "Example 3: Currency Aur Finance Ke Liye Decimal128 Ka Use",
      },
      body: {
        en: `### Example 3: Preventing JavaScript Floating Point Rounding Errors
Standard JavaScript numbers suffer from rounding bugs (e.g. \`0.1 + 0.2 === 0.30000000000000004\`). In banking and e-commerce, \`Decimal128\` guarantees 100% exact currency math.`,
        hi: `### Example 3: Decimal128 Se Currency Calculation Bug Fix
JavaScript mein \`0.1 + 0.2\` calculate karne par floating point error aata hai. BSON \`Decimal128\` paise aur currency ko bilkul exact store karta hai.`,
      },
      code: {
        language: "javascript",
        filename: "decimalAccuracy.js",
        snippet: `// Example 3: Why Decimal128 is mandatory for currency
import mongoose from "mongoose";

// ❌ The JavaScript Floating Point Problem:
const itemA = 0.1;
const itemB = 0.2;
console.log("Standard JS 0.1 + 0.2 = ", itemA + itemB); // 0.30000000000000004! (DANGEROUS IN BANKING!)

// ✅ The BSON Decimal128 Solution:
const walletSchema = new mongoose.Schema({
  accountHolder: String,
  balance: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
});

const Wallet = mongoose.model("Wallet", walletSchema);

const userWallet = new Wallet({
  accountHolder: "Rahul Sharma",
  balance: mongoose.Types.Decimal128.fromString("1499.95")
});

console.log("Stored Exact Decimal128 Balance: ₹", userWallet.balance.toString()); // Exactly 1499.95!`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common BSON Mistakes",
        hi: "6. BSON Aur Data Types Ki Common Galtiyan",
      },
      mistakes: [
        {
          mistake: {
            en: "Passing a plain 24-character string to native MongoDB queries expecting it to match an ObjectId.",
            hi: "Native MongoDB queries mein ObjectId ki jagah direct plain string pass kar dena.",
          },
          correction: {
            en: "In the native MongoDB driver, an ObjectId is a binary object, NOT a string. Querying `{ _id: '507f1f77bcf86cd799439011' }` returns null! You must wrap it: `{ _id: new ObjectId(id) }`. (Note: Mongoose automatically casts strings to ObjectIds, but native MongoDB driver does not!).",
            hi: "Native MongoDB driver mein string match nahi hoti. Hamesha `{ _id: new ObjectId(id) }` se wrap karein (Mongoose yeh automatically kar deta hai).",
          },
          code: `// FAILS in native driver:
// db.collection('users').findOne({ _id: '65e01f77bcf86cd799439011' }); // Returns null!

// WORKS:
import { ObjectId } from 'mongodb';
db.collection('users').findOne({ _id: new ObjectId('65e01f77bcf86cd799439011') });`,
        },
        {
          mistake: {
            en: "Storing timestamps as plain formatted strings (e.g. '28-10-2026').",
            hi: "Dates ko plain text string ('28-10-2026') ke roop mein store karna.",
          },
          correction: {
            en: "Storing dates as strings destroys MongoDB's ability to perform chronological range queries (`$gte`, `$lte`) and date aggregation operators. Always store dates using native BSON `Date` (`new Date()`).",
            hi: "Dates ko string banakar store karne se date range filters ($gte, $lte) toot jaate hain. Hamesha native BSON `Date` use karein.",
          },
          code: `// BAD:
// createdAt: "28/10/2026" // String sorting is alphabetical, not chronological!

// GOOD:
createdAt: new Date() // Native BSON 64-bit millisecond integer`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Production Best Practices for BSON",
        hi: "7. BSON Ke Best Practices",
      },
      body: {
        en: `- **Leverage \`_id.getTimestamp()\`**: You don't always need a separate \`createdAt\` field if you only care about insertion time; the first 4 bytes of \`_id\` already store it.
- **Use Decimal128 for E-Commerce**: For product prices and wallet balances, always use \`mongoose.Schema.Types.Decimal128\` to eliminate rounding loss.
- **Respect 16 MB Document Size**: BSON documents cannot exceed 16 MB. Monitor document size using \`Object.bsonsize(doc)\` in the mongo shell.`,
        hi: `- **_id Se Timestamp Use Karein**: Insertion time janne ke liye alag se field banane ki zaroorat nahi hoti, \`_id.getTimestamp()\` use karein.
- **Prices Ke Liye Decimal128**: E-Commerce aur payments mein floating point bugs se bachne ke liye \`Decimal128\` use karein.
- **16 MB Limit**: Document size ko monitor karein taaki 16 MB limit cross na ho.`,
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
            en: "What is BSON and why does MongoDB use it instead of JSON?",
            hi: "BSON kya hai aur MongoDB JSON ke badle BSON kyun use karta hai?",
          },
          a: {
            en: "BSON stands for Binary JSON. It is a binary-encoded serialization of JSON-like documents. MongoDB uses BSON because it allows for high-speed scanning (using internal length prefixes to skip fields without parsing every byte) and supports rich enterprise data types that JSON lacks, such as native Dates, ObjectIds, Decimal128 for currency, and raw binary Buffers.",
            hi: "BSON ka matlab Binary JSON hai. MongoDB ise isliye use karta hai kyunki binary format hone ki wajah se yeh scanning mein bohot tez hota hai (length prefix ki wajah se bina poora data padhe fields skip kar sakta hai) aur isme JSON ke mukable Dates, ObjectIds aur Currency Decimal128 jaise rich data types natively support hote hain.",
          },
        },
        {
          q: {
            en: "Describe the internal 12-byte composition of a MongoDB ObjectId.",
            hi: "MongoDB ObjectId ke 12 bytes ka internal breakdown samjhaiye.",
          },
          a: {
            en: "A 12-byte ObjectId consists of three parts: 1) A 4-byte Unix epoch timestamp representing seconds since 1970, 2) A 5-byte random value unique to the machine and process ID, and 3) A 3-byte incrementing counter initialized to a random number. This 12-byte structure guarantees global uniqueness across distributed server clusters.",
            hi: "ObjectId 12 bytes ka hota hai: 1) Pehle 4 bytes Unix timestamp hote hain jo creation second batate hain, 2) Agle 5 bytes machine aur process ka unique random value hote hain, aur 3) Aakhiri 3 bytes ek incrementing counter hota hai. Yeh structure distributed systems mein global uniqueness guarantee karta hai.",
          },
        },
        {
          q: {
            en: "Can you sort documents chronologically by `_id`?",
            hi: "Kya documents ko `_id` ke hisab se time order mein sort kiya ja sakta hai?",
          },
          a: {
            en: "Yes! Because the first 4 bytes of every standard ObjectId encode the Unix epoch creation timestamp in big-endian byte order, sorting by `{ _id: 1 }` or `{ _id: -1 }` naturally sorts documents chronologically by insertion time without requiring a secondary index on a `createdAt` field.",
            hi: "Haan! Kyunki ObjectId ke shuru ke 4 bytes Unix timestamp hote hain, isliye `{ _id: 1 }` ya `{ _id: -1 }` se sort karne par documents naturally unke insertion time ke chronological order mein sort ho jaate hain.",
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
        en: `- **BSON**: Binary JSON format; fast traversal + rich data types.
- **ObjectId**: 12 bytes (4-byte timestamp, 5-byte machine/process, 3-byte counter).
- **Embedded Time**: Extract creation date with \`_id.getTimestamp()\`.
- **Decimal128**: Exact precision for money and currency.
- **Limit**: Max 16 MB per BSON document.`,
        hi: `- **BSON**: Fast binary format + extra data types.
- **ObjectId**: 12 bytes (Timestamp + Machine ID + Counter).
- **Time Extract**: \`_id.getTimestamp()\` se time nikalein.
- **Decimal128**: Paise/Currency ke liye exact decimal.
- **Limit**: Maximum 16 MB per document.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "How many bytes make up a standard MongoDB ObjectId?",
      "hi": "Standard MongoDB ObjectId kitne bytes ka hota hai?"
    },
    "options": [
      {
        "en": "12 bytes (represented as 24 hexadecimal characters)",
        "hi": "12 bytes (24 hexadecimal characters)"
      },
      {
        "en": "16 bytes",
        "hi": "16 bytes"
      },
      {
        "en": "4 bytes",
        "hi": "4 bytes"
      },
      {
        "en": "64 bytes",
        "hi": "64 bytes"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "An ObjectId is a 12-byte binary value, conventionally displayed as a 24-character hexadecimal string.",
      "hi": "ObjectId 12 bytes ka binary data hota hai jise 24-character hex string ke roop mein dikhaya jata hai."
    }
  },
  {
    "q": {
      "en": "What information is encoded in the first 4 bytes of an ObjectId?",
      "hi": "ObjectId ke shuru ke 4 bytes mein kya information encode hoti hai?"
    },
    "options": [
      {
        "en": "A Unix epoch timestamp (seconds since Jan 1, 1970)",
        "hi": "Unix epoch timestamp (seconds)"
      },
      {
        "en": "The database name",
        "hi": "Database ka naam"
      },
      {
        "en": "The client's IP address",
        "hi": "Client ka IP address"
      },
      {
        "en": "A random cryptographic salt",
        "hi": "Random cryptographic salt"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "The first 4 bytes represent seconds since the Unix epoch, allowing extraction via _id.getTimestamp().",
      "hi": "Pehle 4 bytes creation time ka Unix epoch timestamp hote hain."
    }
  },
  {
    "q": {
      "en": "Which BSON data type should be used to store financial currency and wallet balances without rounding errors?",
      "hi": "Currency aur wallet balance store karne ke liye kaunsa BSON data type use karna chahiye taaki calculation error na ho?"
    },
    "options": [
      {
        "en": "Decimal128",
        "hi": "Decimal128"
      },
      {
        "en": "Double",
        "hi": "Double"
      },
      {
        "en": "String",
        "hi": "String"
      },
      {
        "en": "Int32",
        "hi": "Int32"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Decimal128 provides 128-bit decimal floating point precision designed specifically for monetary calculations.",
      "hi": "Decimal128 floating point error se bachata hai aur exact currency values store karta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Documents, Collections & BSON Data Types in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Documents, Collections & BSON Data Types (ObjectId) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling documents, collections & bson data types with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Documents, Collections & BSON Data Types (ObjectId) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Documents, Collections & BSON Data Types establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Documents, Collections & BSON Data Types directly resolve?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Documents, Collections & BSON Data Types, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Documents, Collections & BSON Data Types, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Documents, Collections & BSON Data Types, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Documents, Collections & BSON Data Types?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Documents, Collections & BSON Data Types be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Documents, Collections & BSON Data Types (ObjectId) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Documents, Collections & BSON Data Types impact application memory and CPU consumption?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Documents, Collections & BSON Data Types?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Documents, Collections & BSON Data Types?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Documents, Collections & BSON Data Types?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Documents, Collections & BSON Data Types, what must the test suite assert?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Documents, Collections & BSON Data Types?",
      "hi": "Modular design Documents, Collections & BSON Data Types (ObjectId) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Documents, Collections & BSON Data Types be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Documents, Collections & BSON Data Types (ObjectId) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Documents, Collections & BSON Data Types properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Documents, Collections & BSON Data Types (ObjectId) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Documents, Collections & BSON Data Types in production?",
      "hi": "Production mein Documents, Collections & BSON Data Types (ObjectId) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Documents, Collections & BSON Data Types?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Documents, Collections & BSON Data Types?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Documents, Collections & BSON Data Types?",
      "hi": "Documents, Collections & BSON Data Types (ObjectId) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
