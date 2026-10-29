export default {
  id: "int-mongodb-questions",
  title: {
    en: "Top 25 MongoDB & Database Interview Questions & Model Answers",
    hi: "Top 25 MongoDB & Database Interview Questions & Model Answers",
  },
  difficulty: "Intermediate",
  readTime: 16,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The MongoDB Mental Model: What Database Interviewers Test",
        hi: "1. MongoDB Mental Model: Database Interviews Mein Kya Test Kiya Jata Hai",
      },
      body: {
        en: `In full-stack MERN interviews, MongoDB questions focus on **data modeling trade-offs, indexing mechanics, and aggregation efficiency**. Interviewers want to verify that you understand NoSQL is not merely "schema-less freedom," but an architecture that demands deliberate design around your application's query patterns.

### The 4 Pillars of MongoDB Interview Evaluation:
1. **Schema Design & Relationships**: When to embed documents (denormalization) vs when to reference ObjectIds (normalization) across 1:1, 1:N, and N:M relationships.
2. **Indexing Architecture & Query Optimization**: How B-tree indexes work, the **ESR Rule** (Equality, Sort, Range), index intersection, covered queries, and avoiding costly \`COLLSCAN\` operations via \`explain("executionStats")\`.
3. **The Aggregation Pipeline Framework**: Transforming, filtering, grouping, and joining collections in-memory on the database engine using pipeline stages (\`$match\`, \`$lookup\`, \`$unwind\`, \`$facet\`).
4. **Consistency, Availability & Scalability**: Replica set quorum elections, primary/secondary replication lag, read preferences, write concerns (\`w: "majority"\`), and ACID multi-document transactions.`,
        hi: `Full-stack interviews mein MongoDB ke sawal data modeling, indexing aur aggregation pipeline ke around ghoomte hain:

### 4 Mukhya Evaluation Pillars:
1. **Embedding vs Referencing**: Kab sub-document embed karna chahiye aur kab ObjectId reference karna chahiye.
2. **Indexing & ESR Rule**: B-tree indexes, Equality-Sort-Range rule, covered queries, aur \`COLLSCAN\` ko avoid karna.
3. **Aggregation Pipeline**: Multi-stage data processing (\`$match\`, \`$group\`, \`$lookup\`, \`$facet\`) database server par perform karna.
4. **Transactions & Replication**: Replica sets, write concerns (\`w: "majority"\`), aur multi-document ACID transactions.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The ESR Rule: The Golden Law of Compound Indexes",
        hi: "2. The ESR Rule: Compound Indexes Ka Sabse Mahatvapurna Niyam",
      },
      body: {
        en: `When creating a compound index on multiple fields in MongoDB, the order of the fields inside the index definition determines whether MongoDB can use index scan (\`IXSCAN\`) for filtering **and** avoid an expensive in-memory sort (\`SORT\` stage).

The **ESR (Equality, Sort, Range)** rule states that compound index keys must be defined in this exact sequence:

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                        THE ESR RULE SEQUENCE                           │
│                                                                        │
│   1. [E] EQUALITY : Exact match fields (e.g. status: "active", orgId)  │
│   2. [S] SORT     : Ordering direction fields (e.g. createdAt: -1)    │
│   3. [R] RANGE    : Range comparison fields (e.g. price: { $gte: 10 }) │
└────────────────────────────────────────────────────────────────────────┘
\`\`\`

### Why this order matters:
- **Equality first**: Pinpoints the exact index sub-tree instantly.
- **Sort second**: Because the equality matches land on pre-sorted index keys, MongoDB returns rows in order with **zero in-memory sorting** (\`sort: null\` in explain plan).
- **Range last**: Range scans branch out; placing a range field before a sort field destroys the sorted order of subsequent keys, forcing MongoDB into a blocking in-memory sort!`,
        hi: `Compound index banate waqt fields ka sequence tay karta hai ki query fast hogi ya server ki RAM mein blocking sort karegi.

### ESR (Equality, Sort, Range) Ka Niyam:
1. **[E] Equality**: Exact match wale fields pehle (jaise \`status: "active"\`).
2. **[S] Sort**: Jis field par \`sort()\` lagana hai (jaise \`createdAt: -1\`).
3. **[R] Range**: \`$gte\`, \`$lt\` wale fields sabse aakhri mein (jaise \`price: { $gte: 500 }\`).

> [!IMPORTANT]
> Agar Range field ko Sort field se pehle daal diya, toh index ka sorted order toot jata hai aur MongoDB ko RAM mein memory-heavy sort karna padta hai.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Indian Passport Seva Kendra Directory",
        hi: "Real-Life Analogy: Passport Seva Kendra Ka Register (ESR Indexing vs COLLSCAN)",
      },
      body: {
        en: `Imagine searching for a citizen's passport application file in a central regional records warehouse with 10,000,000 physical folders:

- **COLLSCAN (The Inefficient Officer)**:
  There is no indexed catalogue. To find a resident of Pune named Rohan born in 1995, the clerk walks into the warehouse and opens **every single one of the 10,000,000 folders one-by-one from folder #1 to folder #10,000,000**!
  (In MongoDB, a Collection Scan (\`COLLSCAN\`) reads every document from disk, spiking CPU to 100% and timing out requests).
- **Compound Index with ESR Rule (The Master Card Register)**:
  The warehouse maintains a 3-tier organized master register:
  1. **Equality [E]**: The register is organized into rooms by City (**Pune** room). The clerk walks straight to the Pune room without inspecting Mumbai, Delhi, or Bangalore folders.
  2. **Sort [S]**: Inside the Pune room, files are physically pre-arranged alphabetically on the shelves by **Surname** (A to Z).
  3. **Range [R]**: For the matching surname, files have a color-coded strip corresponding to **Birth Year range (1990–2000)**.
  The clerk walks directly to Pune -> shelf 'V' -> pull years 90-00. Total time: 3 seconds! Total files touched: 12.`,
        hi: `10 lakh records wale government warehouse ka example dekhein:

- **COLLSCAN (Bina Index Ka Thekedaar)**:
  Koi register ya slip nahi hai. Pune ke Rohan ki file dhoondhne ke liye clerk pehle folder se lekar 10 lakhwe folder tak har folder ko khol-khol kar dekhta hai. Disk I/O 100% ho jata hai aur server hang ho jata hai.
- **ESR Rule Compound Index (Master Directory)**:
  1. **Equality [E]**: Sabse pehle Pune room mein jao (baaki saare rooms reject).
  2. **Sort [S]**: Pune room ke andar files pehle se Surname ke hisaab se A-to-Z arranged hain (zero re-sorting).
  3. **Range [R]**: Shelf par 1990 se 2000 birth year ke beech ka section utha lo.
  10 lakh files check karne ke badle sirf 5 files check karke exact result mil gaya!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Aggregation Pipeline & Compound Index Syntax",
        hi: "Aggregation Pipeline Stages Aur Index Creation Ka Syntax",
      },
      body: {
        en: `### 1. Creating Compound Index with ESR Rule:
\`\`\`javascript
// Schema definition with compound index
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], required: true },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

// ESR Order:
// Equality: status
// Sort:     createdAt (-1 for descending)
// Range:    totalAmount
OrderSchema.index({ status: 1, createdAt: -1, totalAmount: 1 });

// This query utilizes the index with ZERO in-memory sort:
// db.orders.find({ status: 'shipped', totalAmount: { $gte: 1000 } }).sort({ createdAt: -1 })
\`\`\`

### 2. Aggregation Pipeline Syntax:
\`\`\`javascript
const stats = await Order.aggregate([
  // Stage 1: Filter active orders (use index!)
  { $match: { status: 'delivered' } },

  // Stage 2: Group by month and calculate totals
  {
    $group: {
      _id: { $month: '$createdAt' },
      totalRevenue: { $sum: '$totalAmount' },
      orderCount: { $sum: 1 },
      avgOrderValue: { $avg: '$totalAmount' },
    },
  },

  // Stage 3: Sort by highest revenue
  { $sort: { totalRevenue: -1 } },

  // Stage 4: Reshape output
  {
    $project: {
      _id: 0,
      month: '$_id',
      totalRevenue: { $round: ['$totalRevenue', 2] },
      orderCount: 1,
      avgOrderValue: { $round: ['$avgOrderValue', 2] },
    },
  },
]);
\`\`\``,
        hi: `### Compound Index Aur Aggregation Syntax:
- **ESR Index**: \`OrderSchema.index({ status: 1, createdAt: -1, totalAmount: 1 })\`
- **Aggregation Pipeline**: Multi-stage array jahan ek stage ka output agle stage ka input banta hai: \`$match\` -> \`$group\` -> \`$sort\` -> \`$project\`.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: High-Performance Paginated Facet Aggregation",
        hi: "Example 1: Single Database Round-Trip Mein Pagination Aur Totals ($facet)",
      },
      body: {
        en: `A common anti-pattern in pagination is running two separate queries: \`find().skip().limit()\` AND \`countDocuments()\`. Using \`$facet\` allows computing both in a **single database network round-trip**:

\`\`\`javascript
// services/productService.js
export async function getPaginatedProducts({ category, minPrice, maxPrice, page = 1, limit = 20 }) {
  const skip = (page - 1) * limit;

  const matchFilter = {};
  if (category) matchFilter.category = category;
  if (minPrice || maxPrice) {
    matchFilter.price = {};
    if (minPrice) matchFilter.price.$gte = Number(minPrice);
    if (maxPrice) matchFilter.price.$lte = Number(maxPrice);
  }

  const [result] = await Product.aggregate([
    { $match: matchFilter },
    {
      $facet: {
        // Sub-pipeline 1: Compute total matching documents
        metadata: [{ $count: 'total' }],
        // Sub-pipeline 2: Fetch current page items
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              title: 1,
              price: 1,
              category: 1,
              createdAt: 1,
            },
          },
        ],
      },
    },
  ]);

  const total = result.metadata[0]?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return {
    products: result.data,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
    },
  };
}
\`\`\``,
        hi: `Pagination mein do alag queries (\`find\` aur \`countDocuments\`) chalane ke bajaye \`$facet\` stage use karein. Isse ek hi round-trip mein data items aur total count mil jate hain.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: ACID Multi-Document Transactions with Mongoose Client Session",
        hi: "Example 2: Mongoose Client Session Ke Saath ACID Multi-Document Transactions",
      },
      body: {
        en: `When transferring funds between two bank accounts or processing an e-commerce order with stock decrement, both mutations must succeed together or roll back completely:

\`\`\`javascript
// services/transferService.js
import mongoose from 'mongoose';
import { Account } from '../models/Account.js';

export async function transferFunds(fromAccountId, toAccountId, amount) {
  // Start client session
  const session = await mongoose.startSession();

  try {
    let result;
    // Execute all mutations atomically inside transaction
    await session.withTransaction(async () => {
      // 1. Deduct from sender account (with balance safety check)
      const sender = await Account.findOneAndUpdate(
        { _id: fromAccountId, balance: { $gte: amount } },
        { $inc: { balance: -amount } },
        { session, new: true }
      );

      if (!sender) {
        throw new Error('Insufficient balance or sender account invalid');
      }

      // 2. Credit to receiver account
      const receiver = await Account.findByIdAndUpdate(
        toAccountId,
        { $inc: { balance: amount } },
        { session, new: true }
      );

      if (!receiver) {
        throw new Error('Receiver account not found');
      }

      result = { sender, receiver };
    });

    console.log('Transaction committed successfully!');
    return result;
  } catch (error) {
    console.error('Transaction automatically aborted due to error:', error.message);
    throw error;
  } finally {
    // Always end the session to release connection to pool
    await session.endSession();
  }
}
\`\`\``,
        hi: `Bank transfer ya checkout mein do documents ko atomically update karne ke liye Mongoose transactions use karte hain. \`session.withTransaction\` ke andar agar koi bhi operation fail hota hai, toh automatically poora change rollback ho jata hai. Session ko hamesha \`finally\` block mein end karein.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Query Profiling via explain('executionStats')",
        hi: "Example 3: explain('executionStats') Se Query Ki Performance Audit Karna",
      },
      body: {
        en: `How to prove to an interviewer that your index solved a production latency issue:

\`\`\`javascript
// Run query profiling in mongo shell or node script
const stats = await Order.find({
  status: 'shipped',
  createdAt: { $gte: new Date('2025-01-01') },
})
  .sort({ createdAt: -1 })
  .explain('executionStats');

console.log({
  winningPlanStage: stats.executionStats.executionStages.stage,
  totalDocsExamined: stats.executionStats.totalDocsExamined,
  totalKeysExamined: stats.executionStats.totalKeysExamined,
  nReturned: stats.executionStats.nReturned,
  executionTimeMillis: stats.executionStats.executionTimeMillis,
});

/*
IDEAL RESULT (Covered / Well-indexed query):
- winningPlanStage: "IXSCAN" (NOT "COLLSCAN")
- totalKeysExamined === nReturned (Every examined index key matched a result)
- totalDocsExamined === nReturned
- executionTimeMillis: < 5ms

RED FLAGS TO SPOT:
- stage: "COLLSCAN" (Scanned every document on disk!)
- stage: "SORT" (In-memory sort; index did not cover sort order!)
- totalDocsExamined: 100,000, nReturned: 5 (Index is poorly selective!)
*/
\`\`\``,
        hi: `Interview mein \`explain("executionStats")\` ka output samajhna senior level skill hai:
- **IXSCAN**: Query index use kar rahi hai (Good).
- **COLLSCAN**: Poora database scan ho raha hai (Danger).
- **SORT**: RAM mein sort ho raha hai kyunki index ne sort cover nahi kiya.
- **totalDocsExamined vs nReturned**: Agar 10,000 docs examine karke sirf 2 returned hue, toh index bekar hai.`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common MongoDB Candidate Mistakes in Interviews",
        hi: "MongoDB Interviews Mein Candidates Ki 3 Sabse Badi Galatiyan",
      },
      body: {
        en: `### 1. The 16MB BSON Document Limit Violation
- **Mistake**: Embedding an unbounded array (e.g., storing all user activity logs, messages, or comments inside a single parent document: \`user.logs: [...]\`).
- **Consequence**: As user activity grows over months, the document eventually hits MongoDB's strict **16MB BSON document limit**, permanently corrupting writes to that user document!
- **Fix**: Apply the "Bucket Pattern" or normalize 1:Many relationships by giving each log document its own record with a \`userId\` reference.

### 2. Over-Indexing Every Field
- **Mistake**: Adding \`{ index: true }\` on every field in the Mongoose schema hoping it speeds up all queries.
- **Consequence**: Every \`insert\`, \`update\`, and \`delete\` becomes dramatically slower because MongoDB must synchronously update every B-tree index on disk. Indexes also consume significant RAM (Working Set).
- **Fix**: Index only fields present in high-frequency query filters (\`$match\`, \`find\`) and sorting operations.

### 3. Blindly Treating MongoDB Like a Relational Database
- **Mistake**: Creating 15 normalized collections and performing chains of 10 \`$lookup\` joins across collections on every read.
- **Consequence**: Horrible read latency. MongoDB is not an optimized relational join engine.
- **Fix**: Denormalize immutable or frequently read data (e.g. copying \`productTitle\` and \`unitPrice\` directly into \`order.items\` array).`,
        hi: `### 1. Unbounded Arrays (16MB BSON Limit Trap):
User document ke andar bina kisi limit ke chat messages ya logs push karte jana. 16MB cross hote hi write fail ho jata hai. Hamesha referencing use karein.

### 2. Har Field Par Index Laga Dena:
Har field ko index karne se disk space aur RAM bharti hai aur \`insert\` / \`update\` queries bohot dheemi ho jaati hain.

### 3. $lookup Ki Bharmaar Karna:
MongoDB ko relational database samajh kar 10 collections ko \`$lookup\` se join karna. Denormalization ka istemal karein jahan zaroorat ho.`,
      },
    },
    {
      type: "best-practices",
      heading: {
        en: "Production Database Best Practices",
        hi: "MongoDB Production Architecture Best Practices",
      },
      body: {
        en: `1. **Keep Working Set in RAM**: Ensure total indexes plus active data fit within available server RAM to prevent expensive disk swapping.
2. **Use TTL Indexes for Ephemeral Data**: Automatically delete expired OTPs, temporary password reset tokens, and guest carts using \`{ expireAfterSeconds: 3600 }\`.
3. **Configure Connection Pool Appropriately**: Default Mongoose \`maxPoolSize\` is 100. Size pool appropriately based on concurrent server instances (\`maxPoolSize: 20-50\` per serverless or clustered container).
4. **Use Atomic Operators**: Always prefer atomic operators (\`$inc\`, \`$set\`, \`$push\`, \`$addToSet\`) over fetching a document into Node, modifying properties, and saving back.
5. **Enforce Schema Validation at Database Level**: In addition to Mongoose validation, define MongoDB JSON Schema Validation so unauthorized or malformed writes via direct database connections are rejected.`,
        hi: `1. **Working Set in RAM**: Saare indexes RAM mein fit hone chahiye taaki disk reading na karni pade.
2. **TTL Indexes**: OTPs aur temporary tokens ke liye \`expireAfterSeconds\` index use karein jo unhe automatically delete kar deta hai.
3. **Atomic Operators**: Data fetch karke JS mein modify karne ke badle \`$inc\`, \`$push\`, \`$set\` jaise atomic operators use karein.
4. **Connection Pooling**: Mongoose ke \`maxPoolSize\` ko server resources ke anusaar tune karein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top 25 MongoDB Interview Questions Bank",
        hi: "Top 25 MongoDB Interview Questions Bank (Comprehensive Q&A)",
      },
      body: {
        en: `### Q1: What is BSON, and how does it differ from JSON?
**Answer**: BSON (Binary JSON) is the binary-encoded serialization format MongoDB uses to store documents on disk and transmit them across the network. Unlike plain JSON (which only supports string, number, boolean, array, object, null), BSON adds support for rich data types such as \`ObjectId\`, \`Date\` (64-bit integer timestamp), \`Decimal128\`, \`Int32\`, \`Int64\`, and raw \`Binary\` data (Buffer). BSON is also designed for fast traversability, prefixing fields with length bytes.

---

### Q2: What is the 16MB document size limit in MongoDB, and why does it exist?
**Answer**: MongoDB limits a single BSON document to 16 Megabytes. This architectural limit ensures:
1. A single document cannot monopolize excessive RAM in the working set.
2. Network transmission bandwidth remains predictable.
If an application needs to store files larger than 16MB (such as high-res videos, large PDFs, or images), MongoDB provides **GridFS**, which automatically chunks the file into 255KB parts across two collections (\`fs.files\` and \`fs.chunks\`).

---

### Q3: When should you Embed vs Reference documents in MongoDB?
**Answer**:
- **Embed (Denormalize)** when:
  - There is a "contains" relationship (e.g. an Order contains Line Items).
  - The embedded data is queried together with the parent document in the majority of queries.
  - The cardinality is 1:1 or 1:Few (bounded array).
  - High read performance is critical without multi-collection joins.
- **Reference (Normalize)** when:
  - The related data is updated frequently and independently of the parent.
  - The relationship is 1:Many (unbounded) or Many:Many (e.g. Users to Groups, Authors to Books).
  - Embedding would cause document size to approach the 16MB limit.
  - The embedded data would be duplicated across thousands of parent records.

---

### Q4: Explain the ESR (Equality, Sort, Range) rule for compound indexes.
**Answer**: When designing a compound index for a query that involves equality filters, sorting, and range conditions:
1. Put fields with **Equality** matches first (\`{ status: "active" }\`).
2. Put the field used for **Sorting** next (\`{ createdAt: -1 }\`).
3. Put fields with **Range** conditions last (\`{ price: { $gte: 100 } }\`).
Following ESR ensures the index can satisfy both the filter and the sort order without needing an in-memory \`SORT\` stage in RAM.

---

### Q5: What is a "Covered Query" in MongoDB?
**Answer**: A covered query is a query that can be satisfied **entirely from the index keys** without inspecting any actual document on disk or in the data pages (\`totalDocsExamined: 0\`). For a query to be covered:
1. All fields in the query filter must be part of the index.
2. All fields returned in the projection must be part of that same index.
3. The \`_id\` field must be explicitly excluded in the projection (\`{ _id: 0, fieldA: 1 }\`) unless \`_id\` is part of the index.

---

### Q6: What is the difference between \`COLLSCAN\` and \`IXSCAN\` in an explain plan?
**Answer**:
- \`COLLSCAN\` (Collection Scan): The database engine traverses every single document in the collection from beginning to end on disk. Highly inefficient on large collections ($O(N)$).
- \`IXSCAN\` (Index Scan): The engine navigates a balanced B-tree index structure to locate matching keys ($O(\\log N)$), then fetches only the corresponding document storage pointers (record IDs).

---

### Q7: How does a MongoDB Replica Set maintain high availability?
**Answer**: A Replica Set consists of a group of mongod instances maintaining the same dataset:
- Exactly **one Primary node** accepts all write operations and records them to its replication log (**oplog**).
- **Secondary nodes** continuously replicate the oplog and apply operations to their datasets.
- If the Primary node goes offline or fails health heartbeats (default 10s), the remaining secondaries conduct an automated Raft-like election using quorum majority ($N/2 + 1$) to elect a new Primary.

---

### Q8: What are Write Concerns and Read Concerns in MongoDB?
**Answer**:
- **Write Concern**: Controls the level of acknowledgment requested from MongoDB for write operations.
  - \`w: 1\`: Acknowledged by Primary only (fast, but data could be lost if Primary crashes before replicating).
  - \`w: "majority"\`: Acknowledged once written to a majority of replica set members (safe against failover data loss).
  - \`j: true\`: Acknowledged only after writing to the on-disk journal file.
- **Read Concern**: Controls the isolation level of read queries (e.g. \`"local"\`, \`"majority"\`, \`"linearizable"\`).

---

### Q9: How do ACID multi-document transactions work in MongoDB?
**Answer**: Since MongoDB 4.0 (replica sets) and 4.2 (sharded clusters), multi-document ACID transactions are natively supported using client sessions (\`session.withTransaction()\`). All operations inside the transaction use snapshot isolation. If any statement fails or throws an exception, the entire transaction aborts, ensuring atomicity across multiple collections and documents.

---

### Q10: What are the primary stages of the Aggregation Pipeline?
**Answer**:
- \`$match\`: Filters documents (analogous to SQL \`WHERE\`).
- \`$project\`: Reshapes fields, computes expressions, or includes/excludes keys (\`SELECT\`).
- \`$group\`: Groups documents by an expression and computes aggregates (\`GROUP BY\`).
- \`$sort\`: Orders documents (\`ORDER BY\`).
- \`$limit\` / \`$skip\`: Pagination controls.
- \`$lookup\`: Performs left outer equality joins with other collections (\`LEFT JOIN\`).
- \`$unwind\`: Deconstructs an array field from input documents to output a document for each element.
- \`$facet\`: Processes multiple aggregation pipelines in parallel within a single stage.

---

### Q11: What is the difference between \`$addToSet\` and \`$push\`?
**Answer**:
- \`$push\`: Appends a value to an array unconditionally, permitting duplicates.
- \`$addToSet\`: Appends a value to an array only if that exact value does not already exist in the array (ensuring set uniqueness).

---

### Q12: What is Database Sharding and when should you shard?
**Answer**: Sharding is horizontal database partitioning where MongoDB distributes data subsets (chunks) across multiple physical server machines (shards) based on a **Shard Key**.
You should consider sharding when:
1. Total dataset size exceeds the disk storage capacity of a single machine.
2. The working set exceeds the maximum RAM achievable on a single server.
3. System write throughput exceeds the I/O capabilities of a single primary node.

---

### Q13: What is a Shard Key and what makes a good Shard Key?
**Answer**: A Shard Key is an indexed field or compound fields that determine which shard stores a given document. A good shard key exhibits:
1. **High Cardinality**: Many unique values (e.g. \`userId\` or UUID, NOT \`status: active/inactive\`).
2. **Even Write Distribution**: Non-monotonic values to prevent "hot spotting" (e.g., auto-incrementing IDs or timestamps cause all writes to hit a single shard).
3. **Query Isolation**: Frequent queries include the shard key, allowing the \`mongos\` router to target a single shard rather than broadcasting to all shards (scatter-gather).

---

### Q14: What is the MongoDB Oplog (Operations Log)?
**Answer**: The oplog is a capped collection (\`local.oplog.rs\`) that records a rolling history of all operations modifying database state on the Primary replica node. Secondary nodes continuously tail this collection to replicate changes asynchronously. Change Streams in MongoDB are also powered by the oplog.

---

### Q15: What is a Capped Collection?
**Answer**: A fixed-size collection that maintains insertion order. Once the collection reaches its allocated maximum byte or document limit, MongoDB automatically overwrites the oldest documents in circular FIFO order (like a circular buffer). Useful for logging, activity streams, and message caching.

---

### Q16: What is a TTL (Time-To-Live) Index?
**Answer**: A special single-field index on a Date field with the \`expireAfterSeconds\` property. MongoDB's background thread runs once every 60 seconds to automatically delete documents whose timestamp is older than the configured duration. Ideal for session stores, OTP verification codes, and temporary caches.

---

### Q17: What is the difference between Mongoose \`.lean()\` and standard query?
**Answer**:
- Standard Mongoose query (\`User.find()\`): Hydrates raw BSON into full Mongoose Document instances with change tracking, virtuals, getters/setters, and helper methods. Heavy memory and CPU overhead.
- \`.lean()\` (\`User.find().lean()\`): Returns high-performance, raw, plain JavaScript objects directly from the driver, bypassing hydration. Typically **3x to 5x faster** with significantly lower RAM usage for read-only operations.

---

### Q18: What is an In-Memory Sort limit in MongoDB?
**Answer**: MongoDB limits unindexed in-memory sorts to **32 Megabytes** of RAM. If a query requires sorting on an unindexed field and the matching dataset exceeds 32MB, the database will abort the query with an error (\`Executor error during sort: Sort exceeded memory limit of 32MB\`), unless an index is created or \`allowDiskUse: true\` is explicitly enabled in aggregation pipelines.

---

### Q19: How do Partial Indexes differ from Sparse Indexes?
**Answer**:
- **Sparse Index**: Only indexes documents that contain the specified field, even if the value is null.
- **Partial Index**: More flexible; only indexes documents that meet a specified filter expression (\`partialFilterExpression\`), such as indexing emails only where \`isVerified: true\` or \`rating > 4\`. Saves significant disk space and index RAM.

---

### Q20: What is Read Preference in Replica Sets?
**Answer**: Determines how client read queries are routed among replica set members:
- \`primary\` (default): Read strictly from Primary (guarantees read-after-write consistency).
- \`primaryPreferred\`: Read from Primary; fall back to Secondaries if Primary unavailable.
- \`secondary\`: Read strictly from Secondaries (distributes read traffic, but risks replication lag).
- \`secondaryPreferred\`: Read from Secondaries; fall back to Primary.
- \`nearest\`: Read from the node with the lowest network latency.

---

### Q21: What is a Geospatial Index in MongoDB?
**Answer**: Indexes designed to query coordinates on a two-dimensional flat plane (\`2d\`) or a spherical Earth surface (\`2dsphere\`). Supports GeoJSON objects (Point, LineString, Polygon) and spatial queries like \`$near\`, \`$geoWithin\`, and \`$geoIntersects\`.

---

### Q22: What is the difference between optimistic locking and pessimistic locking?
**Answer**:
- **Optimistic Locking**: Assumes conflicting concurrent updates are rare. Documents track an internal version key (\`__v\` in Mongoose). Updates verify that the version in DB matches the version read: \`findOneAndUpdate({ _id, __v: currentVersion }, { ..., $inc: { __v: 1 } })\`. If version mismatch occurs, the update fails and application retries.
- **Pessimistic Locking**: Explicitly locks the row or document so no other transaction can read or mutate it until the lock is released (heavier performance penalty).

---

### Q23: How do you perform full-text search in MongoDB?
**Answer**: By creating a text index on string fields: \`schema.index({ title: 'text', description: 'text' })\`. Queries utilize the \`$text\` operator with \`$search\`, supporting stemming, stop-word removal, case-insensitivity, and text relevance scoring (\`{ score: { $meta: 'textScore' } }\`).

---

### Q24: What is the purpose of the \`_id\` field and how is ObjectId generated?
**Answer**: Every MongoDB document requires a unique primary key in the \`_id\` field. By default, MongoDB assigns a 12-byte \`ObjectId\` consisting of:
1. **4 bytes**: Unix epoch timestamp in seconds.
2. **5 bytes**: Random value unique to the machine and process.
3. **3 bytes**: Incrementing counter initialized to a random value.
Because the first 4 bytes are timestamps, ObjectIds are naturally roughly sorted by insertion time.

---

### Q25: How do you back up and restore a MongoDB database in production?
**Answer**:
- **mongodump & mongorestore**: Command-line utilities that read BSON data from a live database and dump to disk / restore. Suitable for small to mid-sized databases.
- **File System Snapshots (LVM / EBS)**: Instant point-in-time storage volume snapshots (requires locking or journaling enabled).
- **MongoDB Atlas Backup**: Automated continuous incremental backups with Point-In-Time Recovery (PITR) to any second within the retention window.`,
        hi: `### Top 25 MongoDB Q&A:
BSON vs JSON, 16MB document limit, Embedding vs Referencing, ESR rule, Covered queries, Explain plan analysis, Replica sets, Write concerns, Multi-document transactions, Aggregation pipeline stages, Sharding, aur Mongoose \`.lean()\` optimization sabhi model answers ke saath detailed hain.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary & Key Takeaways",
        hi: "Quick Summary & Key Takeaways",
      },
      body: {
        en: `- **ESR Rule**: Always sequence compound index fields in Equality -> Sort -> Range order.
- **Explain Plans**: Never deploy without checking \`explain("executionStats")\`; ensure \`stage: "IXSCAN"\` and low \`totalDocsExamined\`.
- **BSON Limit**: Single documents cannot exceed 16MB; prevent unbounded arrays by referencing or bucketing.
- **Covered Queries**: When an index contains all queried and projected fields, MongoDB reads directly from RAM index without touching disk.
- **ACID Transactions**: Supported via \`session.withTransaction()\` across replica sets and sharded clusters.`,
        hi: `- **ESR Rule**: Compound index hamesha Equality -> Sort -> Range order mein banayein.
- **Explain Plans**: Production query mein hamesha \`IXSCAN\` dekhein, \`COLLSCAN\` ko khatam karein.
- **16MB BSON Limit**: Arrays ko unbounded na banayein, referencing use karein.
- **Covered Queries**: Jab query aur projection dono index se satisfy hote hain, toh disk touch nahi hoti.
- **ACID Transactions**: Mongoose \`startSession()\` aur \`withTransaction()\` se multiple documents ko ek saath safely update karein.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "According to the ESR rule for compound indexes, what is the correct ordering sequence of fields?",
      "hi": "Compound indexes ke ESR rule ke mutabiq fields ka sahi sequence kya hai?"
    },
    "options": [
      {
        "en": "Range, Sort, Equality",
        "hi": "Range, Sort, Equality"
      },
      {
        "en": "Equality, Sort, Range",
        "hi": "Equality, Sort, Range"
      },
      {
        "en": "Sort, Range, Equality",
        "hi": "Sort, Range, Equality"
      },
      {
        "en": "Range, Equality, Sort",
        "hi": "Range, Equality, Sort"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "ESR stands for Equality first (narrowing down records), Sort second (providing pre-ordered index keys), and Range last (inequality comparisons).",
      "hi": "ESR ka matlab hai pehle Equality, fir Sort, aur aakhri mein Range filters."
    }
  },
  {
    "question": {
      "en": "What is the maximum file size limit for a single standard BSON document in MongoDB?",
      "hi": "MongoDB mein ek single BSON document ka maximum size limit kitna hota hai?"
    },
    "options": [
      {
        "en": "2 Megabytes",
        "hi": "2 Megabytes"
      },
      {
        "en": "16 Megabytes",
        "hi": "16 Megabytes"
      },
      {
        "en": "1 Gigabyte",
        "hi": "1 Gigabyte"
      },
      {
        "en": "Unlimited",
        "hi": "Unlimited"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "MongoDB enforces a strict 16MB document limit to ensure individual documents do not exhaust server RAM. Files exceeding 16MB must use GridFS.",
      "hi": "MongoDB mein maximum document size 16MB hoti hai. Badi files ke liye GridFS use hota hai."
    }
  },
  {
    "question": {
      "en": "Why does adding .lean() to a read-only Mongoose query improve performance by 3x-5x?",
      "hi": "Read-only Mongoose query mein .lean() lagane se performance 3x-5x kyun badh jaati hai?"
    },
    "options": [
      {
        "en": "It automatically compiles the query to WebAssembly",
        "hi": "Ye query ko WebAssembly mein badalta hai"
      },
      {
        "en": "It bypasses Mongoose document hydration, returning lightweight plain JavaScript objects without getters, setters, or change tracking",
        "hi": "Ye Mongoose document hydration ko bypass karta hai aur bina heavy prototype/getters ke plain JS objects return karta hai"
      },
      {
        "en": "It deletes the database cache",
        "hi": "Ye cache delete karta hai"
      },
      {
        "en": "It converts strings to binary numbers",
        "hi": "Ye string ko binary banata hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Standard Mongoose queries wrap results in heavy Mongoose Document class instances. .lean() skips this instantiation, delivering raw POJOs directly.",
      "hi": ".lean() Mongoose ke heavy class wrappers ko hata kar seedha plain JavaScript objects deta hai, jisse memory aur CPU dono bachte hain."
    }
  },
  {
    "question": {
      "en": "What does the winningPlan stage 'COLLSCAN' indicate when analyzing an explain() query execution plan?",
      "hi": "Explain plan mein winningPlan stage 'COLLSCAN' ka kya matlab hota hai?"
    },
    "options": [
      {
        "en": "The query used a high-speed in-memory Redis cache",
        "hi": "Query ne Redis cache use kiya"
      },
      {
        "en": "No matching index was used; MongoDB had to scan every document in the entire collection on disk",
        "hi": "Koi index use nahi hua; MongoDB ko disk par poori collection ka har document scan karna pada"
      },
      {
        "en": "The query completed with zero errors in 0 milliseconds",
        "hi": "Query 0ms mein complete hui"
      },
      {
        "en": "The collection was encrypted with AES-256",
        "hi": "Collection encrypt hui"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "COLLSCAN means Collection Scan (full table scan). Every single document was read sequentially, indicating a missing or unused index.",
      "hi": "COLLSCAN ka matlab Collection Scan hai, jahan database bina index ke poora table scan karta hai. Iska matlab index gayab hai."
    }
  },
  {
    "question": {
      "en": "What conditions must be satisfied for a MongoDB query to be classified as a 'Covered Query'?",
      "hi": "Kisi MongoDB query ko 'Covered Query' kehlaane ke liye kin sharton ka poora hona zaroori hai?"
    },
    "options": [
      {
        "en": "The query must run inside an SSL connection",
        "hi": "Query SSL mein chalni chahiye"
      },
      {
        "en": "All fields in the query filter and all fields in the projection must be present in the index, and _id must be explicitly excluded (or part of index), resulting in totalDocsExamined: 0",
        "hi": "Filter aur projection ke sabhi fields index ka hissa hon, aur _id explicitly exclude ho, jisse totalDocsExamined: 0 ho"
      },
      {
        "en": "The query must return more than 10,000 documents",
        "hi": "10,000 se zyada documents return hon"
      },
      {
        "en": "The collection must be sharded across 10 servers",
        "hi": "Collection 10 servers par sharded ho"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "In a covered query, MongoDB satisfies the entire query (filtering and returning data) directly from the index in RAM without inspecting any actual documents on disk.",
      "hi": "Covered query mein MongoDB bina disk se documents uthaye, saara data RAM mein maujood index se direct return kar deta hai."
    }
  },
  {
    "question": {
      "en": "When is referencing (normalization) strictly required over embedding (denormalization) in MongoDB schema design?",
      "hi": "MongoDB schema design mein embedding ke badle referencing kab zaroori ho jaati hai?"
    },
    "options": [
      {
        "en": "When the related data array is unbounded (e.g. infinite logs, comments, or sensor readings) that could cause the document to breach 16MB",
        "hi": "Jab related data ka array unbounded ho (jaise unginat logs, comments ya messages) jo 16MB limit cross kar sakta ho"
      },
      {
        "en": "When storing simple addresses with only city and state",
        "hi": "Chote addresses store karte waqt"
      },
      {
        "en": "When documents have less than 3 fields",
        "hi": "Jab documents mein 3 se kam fields hon"
      },
      {
        "en": "Referencing is never recommended in MongoDB",
        "hi": "Referencing kabhi recommend nahi hoti"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Unbounded arrays grow indefinitely over time. Once a document reaches 16MB, subsequent updates fail catastrophically. Referencing prevents this.",
      "hi": "Unbounded arrays samay ke saath 16MB cross kar jaate hain aur writes fail ho jaate hain. Isliye referencing zaroori hoti hai."
    }
  },
  {
    "question": {
      "en": "How do you achieve ACID multi-document transactions in MongoDB using Mongoose?",
      "hi": "Mongoose mein multi-document ACID transactions kaise achieve kiye jaate hain?"
    },
    "options": [
      {
        "en": "By restarting MongoDB before every write",
        "hi": "Har write se pehle MongoDB restart karke"
      },
      {
        "en": "Start a client session via mongoose.startSession() and execute mutations inside session.withTransaction(), passing the session option to every query",
        "hi": "mongoose.startSession() se session shuru karein aur session.withTransaction() ke andar mutations execute karein with { session } option"
      },
      {
        "en": "Transactions only work in MySQL and PostgreSQL, not MongoDB",
        "hi": "Transactions sirf MySQL mein chalte hain"
      },
      {
        "en": "By using Model.insertMany() with no options",
        "hi": "insertMany() use karke"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "session.withTransaction automatically commits the transaction if all operations succeed, or aborts and rolls back completely if any error is thrown.",
      "hi": "session.withTransaction() sabhi operations ke succeed hone par commit karta hai, aur error aane par rollback kar deta hai."
    }
  },
  {
    "question": {
      "en": "What is the memory limit for unindexed in-memory sorts in MongoDB before an error is thrown?",
      "hi": "MongoDB mein unindexed in-memory sort ke liye maximum kitni RAM limit hoti hai?"
    },
    "options": [
      {
        "en": "512 Kilobytes",
        "hi": "512 Kilobytes"
      },
      {
        "en": "32 Megabytes",
        "hi": "32 Megabytes"
      },
      {
        "en": "1 Gigabyte",
        "hi": "1 Gigabyte"
      },
      {
        "en": "10 Gigabytes",
        "hi": "10 Gigabytes"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "MongoDB restricts in-memory sorts to 32MB to prevent queries from consuming all server RAM. If exceeded, create an index or specify allowDiskUse: true in aggregations.",
      "hi": "MongoDB 32MB se zyada ka sort RAM mein allow nahi karta. Isse bachne ke liye index lagayein ya allowDiskUse: true use karein."
    }
  },
  {
    "question": {
      "en": "What does writeConcern: { w: 'majority' } guarantee in a MongoDB Replica Set?",
      "hi": "MongoDB Replica Set mein writeConcern: { w: 'majority' } kya guarantee deta hai?"
    },
    "options": [
      {
        "en": "The write is acknowledged only after being committed to a majority of replica set voting members, preventing data loss on Primary failover",
        "hi": "Write tabhi acknowledge hota hai jab wo majority voting nodes par save ho jaye, jisse Primary fail hone par bhi data safe rehta hai"
      },
      {
        "en": "The write is written to disk in 100 milliseconds",
        "hi": "Write 100ms mein disk par likha jata hai"
      },
      {
        "en": "All users receive an SMS confirmation",
        "hi": "Sabhi users ko SMS milta hai"
      },
      {
        "en": "The write is executed on Secondaries only",
        "hi": "Write sirf secondaries par hota hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "w: 'majority' ensures the write cannot be rolled back if the primary crashes immediately afterward, because a majority of nodes hold the committed oplog entry.",
      "hi": "w: 'majority' ye pakka karta hai ki majority nodes par data replicate ho chuka hai, jisse election ke dauran data loss nahi hota."
    }
  },
  {
    "question": {
      "en": "Which read preference routes read queries to secondary replica nodes but falls back to the primary if secondaries are unavailable?",
      "hi": "Kaunsa read preference reads ko secondaries par bhejta hai lekin secondaries down hone par primary par fall back karta hai?"
    },
    "options": [
      {
        "en": "primary",
        "hi": "primary"
      },
      {
        "en": "secondaryPreferred",
        "hi": "secondaryPreferred"
      },
      {
        "en": "nearest",
        "hi": "nearest"
      },
      {
        "en": "primaryPreferred",
        "hi": "primaryPreferred"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "secondaryPreferred queries secondaries first to offload read traffic. If no secondary is reachable, it routes reads to the primary.",
      "hi": "secondaryPreferred pehle secondaries se data padhta hai, aur agar wo available na hon toh primary par shift ho jata hai."
    }
  },
  {
    "question": {
      "en": "In a 5-node MongoDB replica set, how many voting members must be healthy and reachable to successfully elect a new Primary?",
      "hi": "5-node MongoDB replica set mein naya Primary chunne ke liye minimum kitne nodes ka reachable hona zaroori hai?"
    },
    "options": [
      {
        "en": "1 node",
        "hi": "1 node"
      },
      {
        "en": "3 nodes (Strict Majority: N/2 + 1 = 5/2 + 1 = 3)",
        "hi": "3 nodes (Strict Majority: N/2 + 1 = 3)"
      },
      {
        "en": "5 nodes (All nodes must be healthy)",
        "hi": "5 nodes"
      },
      {
        "en": "0 nodes",
        "hi": "0 nodes"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Replica sets use a Raft-like consensus protocol requiring a strict majority of voting members (N/2 + 1). In a 5-node cluster, at least 3 nodes must reach consensus.",
      "hi": "Consensus quorum ke liye N/2 + 1 majority chahiye hoti hai. 5-node cluster mein 3 nodes ka healthy hona zaroori hai."
    }
  },
  {
    "question": {
      "en": "In a sharded MongoDB cluster, what is the role of the 'mongos' process?",
      "hi": "Sharded MongoDB cluster mein 'mongos' process ka kya role hota hai?"
    },
    "options": [
      {
        "en": "It acts as a query router and load balancer that inspects shard keys and directs client queries to the appropriate shard(s)",
        "hi": "Ye query router aur load balancer hai jo shard keys check karke client queries ko sahi shard par bhejta hai"
      },
      {
        "en": "It stores all data on its local hard disk",
        "hi": "Ye sara data local disk par store karta hai"
      },
      {
        "en": "It generates HTML pages for the browser",
        "hi": "Ye HTML pages generate karta hai"
      },
      {
        "en": "It is an antivirus scanner for MongoDB",
        "hi": "Ye antivirus scanner hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "mongos acts as the single entry point for clients. It consults the config servers to determine which shard contains the target data and routes queries seamlessly.",
      "hi": "mongos router clients ke liye gateway hai jo config servers se metadata lekar query ko sahi shard par bhejta hai."
    }
  },
  {
    "question": {
      "en": "Why is a monotonically increasing value (like an auto-incrementing integer or timestamp) considered a POOR shard key in MongoDB?",
      "hi": "Monotonically increasing value (jaise auto-incrementing ID ya timestamp) ek kharab shard key kyun mani jaati hai?"
    },
    "options": [
      {
        "en": "Because MongoDB cannot store numbers",
        "hi": "Kyunki MongoDB numbers store nahi karta"
      },
      {
        "en": "Because all new write operations will target the single shard that holds the highest range of values (creating a severe write hotspot and negating horizontal scaling)",
        "hi": "Kyunki saari nayi write operations sirf ek hi shard par aayengi (write hotspot banega aur horizontal scaling fail ho jayegi)"
      },
      {
        "en": "Because it makes queries 100x larger in size",
        "hi": "Kyunki query size badh jata hai"
      },
      {
        "en": "Because timestamps are banned in NoSQL databases",
        "hi": "Kyunki timestamps allowed nahi hain"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Monotonic shard keys route all current writes to the last chunk on a single shard. Other shards sit idle, causing a severe bottleneck.",
      "hi": "Monotonic keys mein saari nayi inserts aakhri shard par jaati hain jisse baaki shards khali rehte hain aur ek single server par hotspot ban jata hai."
    }
  },
  {
    "question": {
      "en": "What is the MongoDB oplog (operations log) and what is its primary purpose?",
      "hi": "MongoDB oplog (operations log) kya hai aur iska mukhya maksad kya hai?"
    },
    "options": [
      {
        "en": "A text file on the desktop logging console errors",
        "hi": "Desktop par text file"
      },
      {
        "en": "A capped collection (local.oplog.rs) on the primary that records all data-modifying mutations, which secondaries continuously tail to replicate changes asynchronously",
        "hi": "Primary par ek capped collection jo sabhi mutations record karta hai aur secondaries ise read karke data replicate karte hain"
      },
      {
        "en": "A list of all registered developer usernames",
        "hi": "Developers ke usernames ki list"
      },
      {
        "en": "An encryption key generator for passwords",
        "hi": "Encryption key generator"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "The oplog is the backbone of MongoDB replication and Change Streams. Secondaries continuously replicate oplog entries to maintain byte-identical copies of data.",
      "hi": "oplog capped collection hai jisme primary ke saare writes likhe jaate hain aur secondaries ise copy karke synchronized rehte hain."
    }
  },
  {
    "question": {
      "en": "How frequently does MongoDB's background TTL (Time-To-Live) index thread run to purge expired documents?",
      "hi": "Expired documents delete karne ke liye MongoDB ka background TTL index thread kitni der mein chalta hai?"
    },
    "options": [
      {
        "en": "Once every 60 seconds",
        "hi": "Har 60 seconds mein ek baar"
      },
      {
        "en": "Every 1 millisecond",
        "hi": "Har 1 millisecond mein"
      },
      {
        "en": "Once every 24 hours",
        "hi": "24 ghante mein ek baar"
      },
      {
        "en": "Only when the server reboots",
        "hi": "Sirf server reboot hone par"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "MongoDB's background TTL monitor runs once every 60 seconds. Therefore, documents may remain in the database for up to 60 seconds after their expiration timestamp.",
      "hi": "TTL monitor thread har 60 seconds mein ek baar chalta hai, isliye expired document delete hone mein 60 second tak lag sakte hain."
    }
  },
  {
    "question": {
      "en": "How do Partial Indexes in MongoDB improve performance and resource efficiency over standard indexes?",
      "hi": "MongoDB mein Partial Indexes standard indexes ke muqable performance aur resources kaise bachate hain?"
    },
    "options": [
      {
        "en": "They only index documents that satisfy a specified filter expression (partialFilterExpression), drastically reducing index size and RAM usage",
        "hi": "Ye sirf un documents ko index karte hain jo filter condition satisfy karte hain, jisse index size aur RAM footprint bohot kam ho jata hai"
      },
      {
        "en": "They only index half of every word",
        "hi": "Ye aadha word index karte hain"
      },
      {
        "en": "They delete records older than 1 year",
        "hi": "Ye purane records delete karte hain"
      },
      {
        "en": "They only work on Tuesdays",
        "hi": "Ye sirf Tuesday ko chalte hain"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Partial indexes index only documents matching partialFilterExpression (e.g. rating > 4 or status: 'active'), saving RAM and reducing index write overhead.",
      "hi": "Partial indexes specific criteria wale documents ko hi index karte hain, jisse index ka size chota rehta hai aur memory bachti hai."
    }
  },
  {
    "question": {
      "en": "What is the difference between the $push and $addToSet update operators in MongoDB?",
      "hi": "MongoDB update operators $push aur $addToSet mein kya farq hai?"
    },
    "options": [
      {
        "en": "$push appends a value unconditionally permitting duplicates; $addToSet appends the value only if it does not already exist in the array (ensuring uniqueness)",
        "hi": "$push bina check kiye value add karta hai (duplicates allow); $addToSet sirf tab add karta hai agar value array mein pehle se na ho (uniqueness guarantee)"
      },
      {
        "en": "$addToSet is only for numbers; $push is only for strings",
        "hi": "$addToSet sirf numbers ke liye hai"
      },
      {
        "en": "$push deletes the array; $addToSet creates it",
        "hi": "$push array delete karta hai"
      },
      {
        "en": "They are exact synonyms with zero difference",
        "hi": "Dono bilkul same hain"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "$push appends items blindly. $addToSet treats the array like a Set, preventing duplicate values from being inserted.",
      "hi": "$push hamesha value append karta hai jabki $addToSet duplicate entry hone par use insert nahi karta."
    }
  },
  {
    "question": {
      "en": "Why should $match and $project stages be placed as early as possible in a MongoDB Aggregation Pipeline?",
      "hi": "MongoDB Aggregation Pipeline mein $match aur $project stages ko shuru mein kyun lagana chahiye?"
    },
    "options": [
      {
        "en": "Because MongoDB throws a syntax error if $match is not first",
        "hi": "Kyunki syntax error aata hai"
      },
      {
        "en": "Early $match allows MongoDB to utilize indexes and reduce document volume before memory-heavy stages ($group, $sort, $lookup); early $project discards unneeded fields to reduce RAM pipeline memory",
        "hi": "Pehle $match lagane se index use hota hai aur data filter hota hai; pehle $project lagane se unneeded fields hat jaate hain aur RAM bachti hai"
      },
      {
        "en": "To make the pipeline return XML data",
        "hi": "XML return karne ke liye"
      },
      {
        "en": "It has zero impact on performance",
        "hi": "Performance par koi asar nahi padta"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Filtering documents early shrinks the working dataset immediately, minimizing CPU and RAM overhead for subsequent grouping, sorting, and lookup operations.",
      "hi": "Early filtering se agle stages ($group, $sort) ke liye bohot kam documents bachte hain, jisse query 10x tezi se execute hoti hai."
    }
  },
  {
    "question": {
      "en": "What are the 3 structural components of a standard 12-byte MongoDB ObjectId?",
      "hi": "Standard 12-byte MongoDB ObjectId ke 3 components kaunse hote hain?"
    },
    "options": [
      {
        "en": "4-byte timestamp (seconds since Unix epoch), 5-byte random value (machine/process unique), 3-byte incrementing counter",
        "hi": "4-byte timestamp (Unix epoch), 5-byte random machine/process value, aur 3-byte incrementing counter"
      },
      {
        "en": "12 letters of the user's first name",
        "hi": "User ke naam ke 12 letters"
      },
      {
        "en": "6 bytes for IP address and 6 bytes for port",
        "hi": "IP address aur port"
      },
      {
        "en": "12 random binary zeros",
        "hi": "12 binary zeros"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "ObjectIds pack a 4-byte timestamp first (making them naturally time-sortable), a 5-byte random identifier, and a 3-byte counter initialized to a random value.",
      "hi": "Pehle 4 bytes timestamp hote hain jisse ObjectIds creation time ke hisaab se naturally sorted hote hain."
    }
  },
  {
    "question": {
      "en": "What problem does MongoDB GridFS solve when working with large binary assets?",
      "hi": "Badi binary files store karte waqt MongoDB GridFS kaunsi samasya solve karta hai?"
    },
    "options": [
      {
        "en": "It converts videos to MP3 format",
        "hi": "Videos ko MP3 banata hai"
      },
      {
        "en": "It splits files exceeding the 16MB BSON limit into 255KB chunks across two collections (fs.files and fs.chunks), allowing large media to be stored and streamed reliably",
        "hi": "Ye 16MB se badi files ko 255KB ke chote chunks mein baant kar do collections (fs.files aur fs.chunks) mein store aur stream karta hai"
      },
      {
        "en": "It deletes files after 7 days automatically",
        "hi": "Files 7 din baad delete karta hai"
      },
      {
        "en": "It replaces AWS S3 completely with zero disk cost",
        "hi": "S3 ko replace karta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "GridFS overcomes the 16MB document boundary by storing metadata in fs.files and chunking the binary payload into 255KB blocks in fs.chunks.",
      "hi": "GridFS 16MB limit ko bypass karne ke liye files ko 255KB ke chote tukdon mein baant kar seamlessly store karta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Top 25 MongoDB & Database Interview Questions & Model Answers in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Top 25 MongoDB & Database Interview Questions & Model Answers ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling top 25 mongodb & database interview questions & model answers with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Top 25 MongoDB & Database Interview Questions & Model Answers ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Top 25 MongoDB & Database Interview Questions & Model Answers establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Top 25 MongoDB & Database Interview Questions & Model Answers clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  }
],
};
