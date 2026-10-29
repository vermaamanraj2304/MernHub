const e={id:"mongo-sorting-pagination",title:{en:"Projection, Sorting & Pagination (skip/limit)",hi:"Projection, Sorting & Pagination (skip aur limit)"},difficulty:"Beginner",readTime:10,sections:[{type:"concept",heading:{en:"1. Document Projection: Inclusion vs Exclusion",hi:"1. Document Projection: Inclusion Aur Exclusion Ka Niyam"},body:{en:"By default, MongoDB queries return the entire document with all of its fields. In production applications where documents contain large text bodies, embedded logs, or sensitive passwords, transferring entire documents wastes database RAM and network bandwidth.\n\n**Projection** allows you to specify exactly which fields MongoDB should return from the database engine to your Node.js application.\n\n### Projection Rules:\n- **Inclusion (`1` or `true`)**: Returns *only* the specified fields.\n  `collection.find({}, { projection: { name: 1, email: 1 } })`\n- **Exclusion (`0` or `false`)**: Returns *all* fields *except* the specified fields.\n  `collection.find({}, { projection: { passwordHash: 0, internalNotes: 0 } })`\n- **The Golden Rule**: You **cannot mix** inclusion and exclusion in the same projection!\n  - ❌ *Invalid*: `{ name: 1, password: 0 }` (Throws a MongoServerError)\n  - ✅ *The One Exception*: The `_id` field is included by default in inclusion projections. You must explicitly suppress it: `{ name: 1, email: 1, _id: 0 }`.",hi:"By default MongoDB query poora document saare fields ke sath return karti hai. Lekin production apps mein jahan documents mein password hash, internal logs ya lambe descriptions hote hain, poora data lane se RAM aur network bandwidth dono barbaad hote hain.\n\n**Projection** ke zariye aap MongoDB ko batate hain ki sirf wahi fields Node.js ko bheje jinhe aap dekhna chahte hain.\n\n### Projection Ke Niyam:\n- **Inclusion (`1` ya `true`)**: Sirf chune hue fields return karta hai.\n  `collection.find({}, { projection: { name: 1, email: 1 } })`\n- **Exclusion (`0` ya `false`)**: Diye gaye fields ko chhod kar baaki sab return karta hai.\n  `collection.find({}, { projection: { passwordHash: 0 } })`\n- **Ek Zaroori Niyam**: Aap ek hi projection mein `1` aur `0` ko **mix nahi kar sakte**!\n  - ❌ *Galat*: `{ name: 1, password: 0 }` (MongoDB error throw karega)\n  - ✅ *Ek Single Exception*: `_id` field by default hamesha aata hai. Use hatane ke liye aap `{ name: 1, _id: 0 }` likh sakte hain."}},{type:"concept",heading:{en:"2. Sorting & Pagination Strategies (Offset vs Keyset)",hi:"2. Sorting aur Pagination: Offset vs Cursor Keyset"},body:{en:"When displaying lists of users, products, or blog posts, you need to sort results and display them page by page.\n\n### Sorting:\n- `.sort({ field: 1 })`: Ascending order (A to Z, 0 to 9, oldest to newest).\n- `.sort({ field: -1 })`: Descending order (Z to A, 9 to 0, newest to oldest).\n- **Compound Sort**: `.sort({ role: 1, createdAt: -1 })` sorts primarily by role ascending, and ties by date descending.\n\n### Pagination Strategy 1: Offset Pagination (`skip()` & `limit()`)\n- **Formula**: `skip = (pageNumber - 1) * pageSize`\n- **Example**: Page 3 with 10 items/page -> `.skip(20).limit(10)`.\n- **Drawback**: MongoDB must scan and discard all `skip` documents sequentially from disk. Skipping 1,000,000 documents causes huge disk I/O and slow response times!\n\n### Pagination Strategy 2: Keyset / Cursor Pagination (Infinite Scroll)\n- Instead of counting and skipping, use the last seen `_id` or timestamp:\n  `find({ _id: { $lt: lastSeenId } }).sort({ _id: -1 }).limit(10)`\n- **Benefit**: Runs in instant $O(1)$ time using the B-Tree primary index, regardless of whether you are on item 10 or item 10,000,000!",hi:"Jab e-commerce products ya blog posts dikhani hoti hain, toh results ko sort karke pages mein divide karna padta hai.\n\n### Sorting:\n- `.sort({ field: 1 })`: Ascending (Chhote se bada, Purane se naya).\n- `.sort({ field: -1 })`: Descending (Bade se chhota, Naye se purana).\n- **Compound Sort**: `.sort({ role: 1, createdAt: -1 })` pehle role se sort karega, barabar hone par date se.\n\n### Pagination Tareeka 1: Offset Pagination (`skip()` aur `limit()`)\n- **Formula**: `skip = (page - 1) * limit`\n- **Example**: Page 3 par 10 items -> `.skip(20).limit(10)`.\n- **Kamzori**: MongoDB ko shuru ke 20 documents padh kar drop karne padte hain. Agar page 10,000 ho toh 1 lakh documents scan karne padenge jisse database slow ho jata hai.\n\n### Pagination Tareeka 2: Keyset / Cursor Pagination (Social Feeds)\n- Skip karne ke bajaye aakhiri dekhe gaye document ki `_id` ka use karein:\n  `find({ _id: { $lt: lastSeenId } }).sort({ _id: -1 }).limit(10)`\n- **Fayda**: Seedhe index par jump karta hai ($O(1)$ time), chahe aap 1st record par hon ya 10 lakhwe record par!"}},{type:"analogy",heading:{en:"Real-Life Analogy: The College Library Ledger & Flipbook",hi:"Real-Life Analogy: College Library Register Aur Kitab Ke Panne"},body:{en:`Imagine visiting a college library looking through the 5,000-student register:

- **Projection**: The librarian only needs to check your Roll Number and Name to verify you are a valid student. They don't copy down your home address, blood group, and mother's maiden name onto the daily entry slip. That is projection—extracting only the relevant columns!
- **Sorting**: The librarian keeps the register sorted alphabetically by Surname. When finding "Verma", they don't read from "Agarwal" to "Upadhyay"; they flip straight to the 'V' section.
- **Offset Pagination (\`skip\` / \`limit\`)**: You ask the librarian: *"Count down 500 names from the top, and read me the next 10 names."* The librarian has to physically touch and count all 500 names before reading name 501. Very tiring for high page numbers!
- **Keyset Pagination (Bookmark)**: You tell the librarian: *"Last time I stopped at student Roll No. 542. Read me the next 10 names starting from there."* The librarian opens directly to bookmark 542 in 1 second!`,hi:`College library ke 5,000 students wale register se samjhein:

- **Projection**: Librarian gate par sirf aapka Roll No aur Naam note karta hai. Woh aapka ghar ka pata, blood group aur phone number register se daily slip par copy nahi karta. Sirf zaroori data lena hi Projection hai!
- **Sorting**: Librarian ne register ko Surname ke hisaab se A to Z sort karke rakha hai. "Verma" dhoondne ke liye pehle page se shuru nahi karna padta, seedhe 'V' section kholte hain.
- **Offset Pagination (\`skip\` aur \`limit\`)**: Aap librarian se kahein: *"Shuru se 500 naam gino, aur 501 se aage ke 10 naam padh kar sunao."* Librarian ko ungli rakh kar 500 naam ginne padenge. Badi pages par yeh bohot thaka dene wala hota hai!
- **Keyset Pagination (Bookmark)**: Aap librarian se kehte hain: *"Kal main Roll No 542 tak padh chuka tha, uske aage ke agle 10 naam bataiye."* Librarian seedhe bookmark 542 par ungli rakhta hai aur agle 10 naam turant padh deta hai!`}},{type:"syntax",heading:{en:"Syntax & Signatures: Projection, Sort & Pagination",hi:"Syntax & Signatures: Projection, Sort aur Pagination"},body:{en:`### Chaining Cursor Methods in MongoDB Driver:
\`\`\`javascript
const cursor = collection
  .find(
    { status: "active" },
    { projection: { name: 1, email: 1, role: 1, _id: 0 } } // Projection
  )
  .sort({ createdAt: -1 }) // Sort newest first
  .skip(20)                // Skip first 20 records (Page 3)
  .limit(10);              // Take 10 records

const results = await cursor.toArray();
\`\`\`

### Mongoose Equivalent Syntax:
\`\`\`javascript
const users = await User.find({ status: "active" })
  .select("name email role -_id") // 'select' is Mongoose projection ('-' excludes)
  .sort({ createdAt: -1 })
  .skip(20)
  .limit(10)
  .lean(); // Returns plain JS objects instead of Mongoose Documents for speed
\`\`\``,hi:`### Native MongoDB Driver Chaining Syntax:
\`\`\`javascript
const cursor = collection
  .find(
    { status: "active" },
    { projection: { name: 1, email: 1, _id: 0 } }
  )
  .sort({ createdAt: -1 }) // Newest pehle
  .skip(20)                // 20 records chhod dein
  .limit(10);              // Agle 10 lein

const results = await cursor.toArray();
\`\`\`

### Mongoose Shorthand Syntax:
\`\`\`javascript
const users = await User.find({ status: "active" })
  .select("name email -_id") // Mongoose mein select use hota hai
  .sort({ createdAt: -1 })
  .skip(20)
  .limit(10)
  .lean(); // Performance boost ke liye plain JS objects
\`\`\``}},{type:"example",heading:{en:"Example 1: Projection, Inclusion & Sorting",hi:"Example 1: Field Projection Aur Multi-Field Sorting"},body:{en:"Querying employees with selective field projection, suppressing the internal `_id`, and applying multi-level compound sorting.",hi:"Employees collection se specific fields project karna aur salary & department ke hisaab se compound sort lagana."},code:{language:"javascript",filename:"projection-sorting.js",snippet:`import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function run() {
  await client.connect();
  const db = client.db("companyDB");
  const employees = db.collection("employees");

  await employees.deleteMany({});
  await employees.insertMany([
    { name: "Suresh Rao", dept: "Engineering", salary: 95000, secretNotes: "Promo ready" },
    { name: "Anil Kapoor", dept: "Engineering", salary: 120000, secretNotes: "High retention risk" },
    { name: "Meera Nair", dept: "Design", salary: 85000, secretNotes: "Excellent portfolio" },
    { name: "Deepak Sethi", dept: "Engineering", salary: 95000, secretNotes: "On probation" },
    { name: "Pooja Hegde", dept: "Marketing", salary: 70000, secretNotes: "Campaign lead" }
  ]);

  // 1. Inclusion Projection: Return only name, dept, and salary. Exclude _id and secretNotes.
  // 2. Sort: Department ascending (A-Z), then salary descending (highest first)
  const results = await employees
    .find(
      {},
      {
        projection: {
          name: 1,
          dept: 1,
          salary: 1,
          _id: 0 // Explicitly suppress _id
        }
      }
    )
    .sort({ dept: 1, salary: -1 })
    .toArray();

  console.log("Projected & Sorted Employees:");
  console.table(results);

  await client.close();
}

run().catch(console.error);

/*
Expected Output:
Projected & Sorted Employees:
┌─────────┬──────────────┬──────────────┬────────┐
│ (index) │     name     │     dept     │ salary │
├─────────┼──────────────┼──────────────┼────────┤
│    0    │ 'Meera Nair' │   'Design'   │ 85000  │
│    1    │ 'Anil Kapoor'│'Engineering' │ 120000 │
│    2    │ 'Suresh Rao' │'Engineering' │ 95000  │
│    3    │'Deepak Sethi'│'Engineering' │ 95000  │
│    4    │'Pooja Hegde' │ 'Marketing'  │ 70000  │
└─────────┴──────────────┴──────────────┴────────┘
(Notice: secretNotes and _id are completely omitted!)
*/`}},{type:"example",heading:{en:"Example 2: Standard Offset Pagination Service for REST APIs",hi:"Example 2: Express REST API Ke Liye Offset Pagination Service"},body:{en:"A reusable pagination helper returning paginated records alongside metadata (`totalDocs`, `totalPages`, `hasNextPage`, `hasPrevPage`).",hi:"Production API helper function jo frontend tables ke liye page metadata aur records calculate karta hai."},code:{language:"javascript",filename:"offset-pagination.js",snippet:`import { MongoClient } from "mongodb";

/**
 * Reusable offset pagination utility function
 */
export async function paginateCollection({
  collection,
  filter = {},
  projection = {},
  sort = { _id: -1 },
  page = 1,
  limit = 10
}) {
  const currentPage = Math.max(1, parseInt(page, 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(limit, 10))); // clamp between 1 and 100
  const skip = (currentPage - 1) * pageSize;

  // Run data fetch and total count in parallel using Promise.all
  const [data, totalDocs] = await Promise.all([
    collection
      .find(filter, { projection })
      .sort(sort)
      .skip(skip)
      .limit(pageSize)
      .toArray(),
    collection.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(totalDocs / pageSize) || 1;

  return {
    data,
    pagination: {
      totalDocs,
      totalPages,
      currentPage,
      pageSize,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    }
  };
}

// Test Simulation
async function test() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const coll = client.db("testDB").collection("articles");

  await coll.deleteMany({});
  // Insert 25 sample articles
  const docs = Array.from({ length: 25 }, (_, i) => ({
    title: \`Article #\${i + 1}\`,
    views: (i + 1) * 100,
    createdAt: new Date(Date.now() - i * 3600000)
  }));
  await coll.insertMany(docs);

  // Request Page 2 with 5 items per page, sorted by views descending
  const pageResult = await paginateCollection({
    collection: coll,
    projection: { title: 1, views: 1, _id: 0 },
    sort: { views: -1 },
    page: 2,
    limit: 5
  });

  console.log("Pagination Metadata:", pageResult.pagination);
  console.log("Page 2 Items:", pageResult.data.map(d => \`\${d.title} (views: \${d.views})\`));

  await client.close();
}

test().catch(console.error);

/*
Expected Output:
Pagination Metadata: {
  totalDocs: 25,
  totalPages: 5,
  currentPage: 2,
  pageSize: 5,
  hasNextPage: true,
  hasPrevPage: true
}
Page 2 Items: [
  'Article #20 (views: 2000)',
  'Article #19 (views: 1900)',
  'Article #18 (views: 1800)',
  'Article #17 (views: 1700)',
  'Article #16 (views: 1600)'
]
*/`}},{type:"example",heading:{en:"Example 3: High-Performance Keyset (Cursor-Based) Pagination",hi:"Example 3: High-Performance Cursor / Keyset Pagination (Infinite Scroll)"},body:{en:"Implementing an O(1) cursor-based pagination mechanism for social media feeds (Twitter/Instagram infinite scroll style) using B-Tree index traversal.",hi:"Social media feeds aur infinite scrolling ke liye B-Tree based high performance cursor pagination."},code:{language:"javascript",filename:"keyset-pagination.js",snippet:`import { MongoClient, ObjectId } from "mongodb";

/**
 * Keyset / Cursor-based Pagination
 * Fetches the next batch of items strictly older than the 'cursor' (_id)
 * No skip() needed! Runs in O(1) indexed lookup time.
 */
export async function fetchFeedCursor({ collection, cursor = null, limit = 5 }) {
  const query = {};

  if (cursor) {
    // We want posts with _id less than cursor because we are sorting descending (newest first)
    query._id = { $lt: new ObjectId(cursor) };
  }

  // Fetch limit + 1 items to know if there is a next page
  const items = await collection
    .find(query)
    .sort({ _id: -1 })
    .limit(limit + 1)
    .toArray();

  const hasMore = items.length > limit;
  if (hasMore) {
    items.pop(); // Remove the extra inspection element
  }

  const nextCursor = items.length > 0 ? items[items.length - 1]._id : null;

  return {
    data: items,
    hasMore,
    nextCursor
  };
}

// Test Simulation
async function testFeed() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const posts = client.db("socialDB").collection("feed_posts");

  await posts.deleteMany({});
  const inserted = await posts.insertMany([
    { text: "Post 1 (Oldest)" },
    { text: "Post 2" },
    { text: "Post 3" },
    { text: "Post 4" },
    { text: "Post 5" },
    { text: "Post 6" },
    { text: "Post 7 (Newest)" }
  ]);

  console.log("--- Batch 1 (Initial Load, limit 3) ---");
  const batch1 = await fetchFeedCursor({ collection: posts, limit: 3 });
  console.log("Batch 1 Posts:", batch1.data.map(p => p.text));
  console.log("Next Cursor:", batch1.nextCursor);

  console.log("\\n--- Batch 2 (Infinite Scroll, using nextCursor) ---");
  const batch2 = await fetchFeedCursor({
    collection: posts,
    cursor: batch1.nextCursor,
    limit: 3
  });
  console.log("Batch 2 Posts:", batch2.data.map(p => p.text));
  console.log("Next Cursor:", batch2.nextCursor);

  await client.close();
}

testFeed().catch(console.error);

/*
Expected Output:
--- Batch 1 (Initial Load, limit 3) ---
Batch 1 Posts: [ 'Post 7 (Newest)', 'Post 6', 'Post 5' ]
Next Cursor: ObjectId("...")

--- Batch 2 (Infinite Scroll, using nextCursor) ---
Batch 2 Posts: [ 'Post 4', 'Post 3', 'Post 2' ]
Next Cursor: ObjectId("...")
*/`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Aam Galatiyan Aur Unka Solution"},body:{en:"### 1. Mixing `1` and `0` in Projections\n- **Mistake**: Writing `{ projection: { name: 1, email: 1, password: 0 } }`. MongoDB will reject this with: `Cannot do inclusion on field ... in exclusion projection`.\n- **Fix**: Choose one mode. If you use inclusion (`1`), all other fields are excluded automatically. The only field allowed to be `0` in an inclusion projection is `_id: 0`.\n\n### 2. Using Deep Offset Pagination (`skip(100000)`)\n- **Mistake**: Building pagination on a 10-million row collection where a user requests page 10,000. `skip(100000)` forces MongoDB to scan through 100,000 index keys, causing query timeouts and CPU spikes.\n- **Fix**: Use keyset/cursor pagination (`{ _id: { $lt: lastId } }`) for deep scrolling and infinite feeds.\n\n### 3. Forgetting to Handle Tie-Breakers in Sorts\n- **Mistake**: Sorting solely by `{ createdAt: -1 }`. If 20 documents share the exact same millisecond timestamp, their ordering between page 1 and page 2 is indeterminate, causing items to duplicate or disappear between pages!\n- **Fix**: Always include a unique tie-breaker field: `.sort({ createdAt: -1, _id: -1 })`.\n\n### 4. Sequential Await on Data and Count\n- **Mistake**: Writing `const data = await find()...; const total = await countDocuments();`. This runs in sequence, doubling the API latency.\n- **Fix**: Use `Promise.all([findPromise, countPromise])` to execute both operations concurrently.",hi:"### 1. Projection Mein `1` aur `0` Ko Ek Sath Milana\n- **Galati**: `{ projection: { name: 1, password: 0 } }` likhna. MongoDB isme error deta hai.\n- **Solution**: Ya toh sirf `1` use karein ya sirf `0`. Sirf `_id: 0` ko `1` ke sath likhne ki chhoot hai.\n\n### 2. Bohot Bada `skip()` Chalana (Deep Pagination)\n- **Galati**: Lakhon records par `skip(50000)` chalana. Database ko 50,000 records bekaar mein scan karne padte hain jisse server slow ho jata hai.\n- **Solution**: Infinite feeds aur badhe tables ke liye Keyset / Cursor pagination (`{ _id: { $lt: lastId } }`) use karein.\n\n### 3. Sort Mein Unique Tie-Breaker Na Rakhna\n- **Galati**: Sirf `{ date: -1 }` se sort karna. Agar do records ka time same hua toh page change karne par wahi record dobara dikh sakta hai.\n- **Solution**: Hamesha unique `_id` ko secondary sort banayein: `.sort({ createdAt: -1, _id: -1 })`.\n\n### 4. Data Aur Count Ko Sequentially Await Karna\n- **Galati**: Pehle `await find()...;` phir agli line par `await countDocuments();`. Isse API response time double ho jata hai.\n- **Solution**: `Promise.all([findPromise, countPromise])` ka use karke dono ko parallel chalayein."}},{type:"tip",heading:{en:"Best Practices: Optimization & Indexing",hi:"Best Practices: Performance Optimization"},body:{en:"1. **Combine Projections with Indexes (Covered Queries)**: If all fields in your query filter and projection exist within an index, MongoDB satisfies the entire query directly from RAM index memory without touching the physical collection data files (Execution stats show: `totalDocsExamined: 0`).\n2. **Cap Maximum Page Limits**: Never trust client inputs like `req.query.limit`. Always enforce a maximum ceiling (e.g. `Math.min(100, requestedLimit)`) to prevent malicious users from requesting `?limit=1000000` and exhausting server memory.\n3. **Use `.lean()` in Mongoose**: When executing read-only paginated queries in Mongoose, always append `.lean()`. This skips the heavy overhead of creating full Mongoose document instances, resulting in up to 4x faster response times!\n4. **Use `estimatedDocumentCount()` for Fast Unfiltered Counts**: For large collections with millions of rows where no filter is applied, `collection.estimatedDocumentCount()` returns in instant O(1) time using collection metadata instead of scanning documents.",hi:"1. **Covered Queries Banayein**: Agar filter aur projection ke saare fields index mein maujood hon, toh MongoDB ko disk se documents uthane hi nahi padte (`totalDocsExamined: 0`).\n2. **Page Limit Par Maximum Cap Lagayein**: User ke `limit` query parameter par hamesha ceiling lagayein (`Math.min(100, limit)`), taaki koi `?limit=500000` bhej kar server crash na kar sake.\n3. **Mongoose Mein `.lean()` Zaroor Lagayein**: Read-only queries par `.lean()` lagane se Mongoose internal wrapper objects nahi banata, jisse query 4x fast ho jaati hai.\n4. **Bina Filter Ke `estimatedDocumentCount()` Use Karein**: Agar poori collection ka total count chahiye, toh `countDocuments()` ke bajaye `estimatedDocumentCount()` instant O(1) time mein count deta hai."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Top Interview Sawaal Aur Jawab"},body:{en:`### Q1: What is a "Covered Query" in MongoDB and why is it so fast?
**Answer**:
A covered query is a query where:
1. All the fields in the query filter are part of an index.
2. All the fields returned in the projection are part of the same index.
3. No fields in the projection are unindexed, and \`_id\` is excluded (unless \`_id\` is part of the index).
Because the index contains all necessary data, MongoDB fulfills the query entirely from RAM index structures without ever reading the actual documents from disk (\`totalDocsExamined = 0\`).

### Q2: Compare Offset Pagination (\`skip/limit\`) vs Keyset Pagination (\`_id\` cursor). When would you choose which?
**Answer**:
- **Offset Pagination (\`skip/limit\`)**:
  - *Pros*: Easy to implement; supports jumping directly to arbitrary page numbers (e.g., jump to Page 17).
  - *Cons*: Performance degrades linearly ($O(N)$) as skip increases; susceptible to pagination drift when records are inserted/deleted during browsing.
  - *Best for*: Administrative dashboards with small dataset tables.
- **Keyset Pagination (\`cursor\`)**:
  - *Pros*: Constant $O(1)$ performance regardless of collection size; completely immune to pagination drift and duplicate items.
  - *Cons*: Cannot jump to arbitrary page numbers (only next/previous relative navigation).
  - *Best for*: Infinite scroll feeds (Twitter, Instagram, TikTok) and high-volume data streaming APIs.

### Q3: Why is \`_id\` returned by default even in an inclusion projection?
**Answer**:
In MongoDB, the \`_id\` field is the universal primary key and unique identifier of every document. To preserve object identity across application layers, MongoDB includes it by default. To omit it, you must explicitly declare \`_id: 0\`.`,hi:`### Q1: MongoDB mein "Covered Query" kya hoti hai aur yeh itni fast kyun hai?
**Jawab**:
Covered Query tab hoti hai jab:
1. Filter ke saare fields index mein maujood hon.
2. Projection ke saare fields usi index mein hon.
3. \`_id\` ko suppress kiya gaya ho (\`_id: 0\`) agar woh index mein nahi hai.
Isme MongoDB ko disk par documents scan nahi karne padte, saara data RAM ke B-Tree index se instant mil jata hai (\`totalDocsExamined: 0\`).

### Q2: Offset Pagination aur Keyset / Cursor Pagination mein kya farq hai?
**Jawab**:
- **Offset Pagination (\`skip/limit\`)**:
  - *Fayda*: Kisi bhi specific page number (jaise Page 5) par seedhe jump kar sakte hain.
  - *Nuksan*: Badi pages par bohot slow ho jata hai ($O(N)$ cost).
  - *Use Case*: Admin panel tables.
- **Keyset / Cursor Pagination**:
  - *Fayda*: Hamesha $O(1)$ fast rehta hai; infinite scroll mein naye items aane par records repeat nahi hote.
  - *Nuksan*: Seedhe Page 10 par jump nahi kar sakte (sirf Next / Prev chalta hai).
  - *Use Case*: Social media feeds aur infinite scrolling.

### Q3: Inclusion projection mein bhi \`_id\` by default kyun aata hai?
**Jawab**:
MongoDB mein \`_id\` har document ka unique primary key hota hai. Identity maintain karne ke liye engine use automatically bhejta hai. Agar aapko nahi chahiye toh aapko explicitly \`_id: 0\` likhna padta hai.`}},{type:"summary",heading:{en:"Quick Summary: Projection, Sorting & Pagination",hi:"Quick Summary: Projection, Sorting & Pagination"},body:{en:"- **Projection**: Select fields with `1` (inclusion) or exclude with `0`. Never mix `1` and `0` in the same projection, with `_id: 0` as the sole exception.\n- **Sorting**: `1` for ascending, `-1` for descending; always include a unique tie-breaker (`_id: -1`).\n- **Offset Pagination**: `.skip((page - 1) * limit).limit(limit)` is simple for small dashboards but scales poorly for deep pages.\n- **Keyset Pagination**: `{ _id: { $lt: lastCursor } }` provides instant $O(1)$ execution for infinite scroll feeds.\n- **Concurrency**: Fetch paginated data and total count in parallel using `Promise.all`.",hi:"- **Projection**: Sirf zaroori fields lene ke liye `1` aur hatane ke liye `0` use karein; dono ko mix na karein (`_id: 0` ke alawa).\n- **Sorting**: Ascending ke liye `1` aur descending ke liye `-1`; duplicate sorting se bachne ke liye secondary sort mein `_id` rakhein.\n- **Offset Pagination**: `skip` aur `limit` chote admin panels ke liye theek hai par deep pages par slow hota hai.\n- **Keyset Pagination**: `_id` cursor ke zariye infinite scroll mein constant $O(1)$ high performance milti hai.\n- **Parallel Querying**: Data aur count ko `Promise.all` se parallel fetch karein."}}],quiz:[{q:{en:"Which of the following projection specifications will throw an error in MongoDB?",hi:"MongoDB mein inme se kaunsa projection specification error throw karega?"},options:[{en:"{ name: 1, email: 1, _id: 0 }",hi:"{ name: 1, email: 1, _id: 0 }"},{en:"{ passwordHash: 0, internalNotes: 0 }",hi:"{ passwordHash: 0, internalNotes: 0 }"},{en:"{ name: 1, email: 1, passwordHash: 0 }",hi:"{ name: 1, email: 1, passwordHash: 0 }"},{en:"{ title: 1, views: 1 }",hi:"{ title: 1, views: 1 }"}],answerIndex:2,explanation:{en:"You cannot mix inclusion (1) and exclusion (0) in the same projection object, unless suppressing the _id field.",hi:"Aap ek hi projection object mein inclusion (1) aur exclusion (0) ko mix nahi kar sakte (sirf _id: 0 exception hai)."}},{q:{en:"What is the primary performance issue with using .skip(500000).limit(20) on a large collection?",hi:"Badi collection par .skip(500000).limit(20) chalane mein sabse badi performance samasya kya hai?"},options:[{en:"MongoDB refuses to execute queries with skip higher than 1000",hi:"MongoDB 1000 se upar skip allow nahi karta"},{en:"MongoDB must still scan and discard 500,000 documents or index entries before returning the 20 results",hi:"MongoDB ko 20 results dene se pehle 500,000 records scan karke fekne padte hain"},{en:"The database table gets locked exclusively",hi:"Database table poori tarah lock ho jaati hai"},{en:"It automatically clears the query cache",hi:"Query cache clear ho jata hai"}],answerIndex:1,explanation:{en:"skip(N) requires the storage engine to walk through N records and discard them one by one, consuming significant CPU and disk I/O.",hi:"skip(N) engine ko N records ek-ek karke scan aur discard karne par majboor karta hai jisse CPU aur Disk I/O badh jata hai."}},{q:{en:"What is a 'Covered Query' in MongoDB?",hi:"MongoDB mein 'Covered Query' kise kehte hain?"},options:[{en:"A query that has an encryption layer wrapping the network payload",hi:"Ek aisi query jiska network payload encrypted ho"},{en:"A query satisfied entirely from an index in RAM without inspecting the underlying documents on disk",hi:"Aisi query jiska saara data disk se document padhe bina seedhe RAM ke index se mil jata hai"},{en:"A query protected by a unit test suite",hi:"Unit test suite se protect ki gayi query"},{en:"A query that updates multiple collections simultaneously",hi:"Ek query jo multiple collections ko ek sath update kare"}],answerIndex:1,explanation:{en:"When all queried and projected fields are present inside an index (and _id is excluded or indexed), MongoDB satisfies the request entirely from index memory, resulting in totalDocsExamined: 0.",hi:"Jab filter aur projection ke saare fields index mein hi mil jayein, toh MongoDB bina disk ko chhue RAM se turant result de deta hai."}},{q:{en:"In Mongoose, why is appending .lean() recommended for read-only paginated list queries?",hi:"Mongoose mein read-only paginated queries par .lean() lagane ki salah kyun di jaati hai?"},options:[{en:"It compresses the JSON output across the wire",hi:"Yeh network par JSON output ko compress kar deta hai"},{en:"It skips instantiating heavy Mongoose Document wrapper classes, returning lightweight plain JS objects",hi:"Yeh bhari Mongoose Document wrapper classes banane se bachta hai aur lightweight plain JS objects deta hai"},{en:"It converts relational SQL tables into MongoDB documents automatically",hi:"Yeh SQL tables ko automatically MongoDB mein convert karta hai"},{en:"It enforces strict type safety at compile time",hi:"Yeh compile time par type safety check karta hai"}],answerIndex:1,explanation:{en:".lean() instructs Mongoose to skip creating full Mongoose Document instances (with getters, setters, and change tracking), providing up to 4x faster execution.",hi:".lean() se Mongoose full document instance nahi banata, balki simple plain JavaScript object deta hai jisse query 4x fast ho jaati hai."}},{question:{en:"What is the core architectural purpose of Projection, Sorting & Pagination (skip/limit) in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Projection, Sorting & Pagination (skip aur limit) ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling projection, sorting & pagination (skip/limit) with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Projection, Sorting & Pagination (skip aur limit) ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Projection, Sorting & Pagination (skip/limit) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Projection, Sorting & Pagination (skip aur limit) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Projection, Sorting & Pagination (skip/limit) directly resolve?",hi:"Projection, Sorting & Pagination (skip aur limit) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Projection, Sorting & Pagination (skip/limit), applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Projection, Sorting & Pagination (skip aur limit) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Projection, Sorting & Pagination (skip/limit), how is its mental model best conceptualized through real-world analogies?",hi:"Projection, Sorting & Pagination (skip aur limit) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Projection, Sorting & Pagination (skip/limit), what syntactic convention is essential to prevent runtime errors?",hi:"Projection, Sorting & Pagination (skip aur limit) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Projection, Sorting & Pagination (skip/limit)?",hi:"Projection, Sorting & Pagination (skip aur limit) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Projection, Sorting & Pagination (skip/limit) be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Projection, Sorting & Pagination (skip aur limit) ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Projection, Sorting & Pagination (skip/limit) impact application memory and CPU consumption?",hi:"Projection, Sorting & Pagination (skip aur limit) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Projection, Sorting & Pagination (skip/limit)?",hi:"Projection, Sorting & Pagination (skip aur limit) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Projection, Sorting & Pagination (skip/limit)?",hi:"Projection, Sorting & Pagination (skip aur limit) mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Projection, Sorting & Pagination (skip/limit)?",hi:"Projection, Sorting & Pagination (skip aur limit) mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Projection, Sorting & Pagination (skip/limit), what must the test suite assert?",hi:"Projection, Sorting & Pagination (skip aur limit) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Projection, Sorting & Pagination (skip/limit)?",hi:"Modular design Projection, Sorting & Pagination (skip aur limit) mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Projection, Sorting & Pagination (skip/limit) be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Projection, Sorting & Pagination (skip aur limit) ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Projection, Sorting & Pagination (skip/limit) properly belong and execute?",hi:"Full-stack MERN architecture mein Projection, Sorting & Pagination (skip aur limit) kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Projection, Sorting & Pagination (skip/limit) in production?",hi:"Production mein Projection, Sorting & Pagination (skip aur limit) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Projection, Sorting & Pagination (skip/limit)?",hi:"Projection, Sorting & Pagination (skip aur limit) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Projection, Sorting & Pagination (skip/limit)?",hi:"Projection, Sorting & Pagination (skip aur limit) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
