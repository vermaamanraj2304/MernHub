export default {
  id: "redis-cache-aside-pattern",
  title: {
    en: "Cache-Aside Pattern & Cache Invalidation Strategies",
    hi: "Cache-Aside Pattern & Cache Invalidation (Deep Dive)",
  },
  difficulty: "Intermediate",
  readTime: 14,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is the Cache-Aside (Lazy Loading) Pattern?",
        hi: "1. Cache-Aside (Lazy Loading) Pattern Kya Hai?",
      },
      body: {
        en: `The **Cache-Aside Pattern** (also called Lazy Loading) is the industry standard caching strategy in full-stack MERN architecture. The application code directly orchestrates both the cache (Redis) and the database (MongoDB):

\`\`\`
                          [ Cache Hit: 0.8ms ]
                ┌──────────────────────────────────────┐
                │                                      ▼
Client ──► Express API ──► Check Redis Cache? ──► Return Cached JSON
                │ (Cache Miss: 45ms)
                ▼
          Query MongoDB ──► Save in Redis (TTL: 1h) ──► Return JSON Response
\`\`\`

### Step-by-Step Flow:
1. **Read Request**: When a client requests data (\`GET /api/products/123\`), Express first calculates the cache key (\`product:123\`) and checks Redis.
2. **Cache Hit**: If found, Redis immediately returns the cached JSON string. Express parses and returns it in **<1ms**. MongoDB is never touched!
3. **Cache Miss**: If the key does not exist or has expired, Express executes the MongoDB query (\`Product.findById(123)\`).
4. **Cache Population**: Express writes the fresh MongoDB record into Redis with an explicit **TTL** (\`EX: 3600\`) and returns the response to the client. Subsequent requests hit the cache!`,
        hi: `**Cache-Aside Pattern** MERN stack production mein sabse zyada use hone wali caching strategy hai:

\`\`\`
                          [ Cache Hit: 0.8ms ]
                ┌──────────────────────────────────────┐
                │                                      ▼
Client ──► Express API ──► Redis Cache Check ──► Direct Fast Response
                │ (Cache Miss: 45ms)
                ▼
          MongoDB Query ──► Redis Mein Save (TTL: 1h) ──► Client Response
\`\`\`

### Step-by-Step Lifecycle:
1. **Request Aati Hai**: Client \`GET /api/products/123\` call karta hai.
2. **Cache Hit**: Express pehle Redis se \`product:123\` maangta hai. Agar mil gaya, toh **1 millisecond se kam** mein user ko response mil jata hai. MongoDB bilkul free rehta hai!
3. **Cache Miss**: Agar data Redis mein nahi hai ya expire ho chuka hai, toh Express MongoDB se data fetch karta hai.
4. **Redis Update**: Express us data ko Redis mein **TTL** (jaise 1 ghanta) ke sath save karta hai aur client ko bhej deta hai. Agli baar wahi query aane par instant cache hit hota hai!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "2. Real-World Indian Analogy: Photocopy Shop Reference Notebook",
        hi: "2. Real-World Desi Analogy: Engineering College Photocopy Shop",
      },
      body: {
        en: `### 📚 The Engineering College Photocopy Shop Analogy

Imagine a busy photocopy shop outside an engineering college during exams:

1. **Without Cache (Pure Database)**:
   Every time a student asks for "Chapter 4 Notes", the shopkeeper climbs up a ladder, searches through dusty shelves, finds the professor's original handwritten spiral notebook, photocopies it, and hands it over.
   - *Time taken*: 10 minutes per student. Line stretches down the street!

2. **Cache-Aside Pattern**:
   The shopkeeper keeps a fresh photocopy stack right on the front counter:
   - When Student 1 asks for "Chapter 4", the counter is empty (**Cache Miss**). The shopkeeper climbs the ladder to get the original, prints 1 copy for the student, and **prints 5 extra copies to place on the front counter** (**Populate Cache** with 2-hour TTL).
   - Students 2 through 50 get their copies from the front counter in **3 seconds** (**Cache Hit**)!
   - If the professor updates Chapter 4, the shopkeeper tears up the old stack on the counter (**Cache Invalidation**).`,
        hi: `### 📚 Engineering College Ki Photocopy Shop Ka Example

Exam ke dino mein photocopy shop par 200 students khade hain:

1. **Bina Cache Ke**:
   Har student "Unit 3 Notes" maangta hai. Shopkeeper har baar andar library mein jata hai, professor ka handwritten register dhoondhta hai aur copy karke deta hai.
   - *Time*: Har student ko 10 minute lagte hain aur line 1 kilometer lambi ho jati hai!

2. **Cache-Aside Pattern**:
   Smart shopkeeper pehli baar original se copy nikalte waqt 5 extra copies nikal kar **samne counter par rakh leta hai** (**Cache Population** with TTL):
   - Agle 50 students ko counter se 3 second mein notes mil jate hain (**Cache Hit**).
   - Agar professor syllabus badal dete hain, toh shopkeeper counter se purane notes faad kar fek deta hai (**Cache Invalidation**).`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "3. Complete Express & Redis Cache-Aside Implementation",
        hi: "3. Production Express.js + Redis Implementation Code",
      },
      body: {
        en: `Here is a production-grade, reusable caching middleware wrapper for Express endpoints:`,
        hi: `Express.js mein Cache-Aside implement karne ka reusable aur safe code:`,
      },
      code: {
        language: "javascript",
        filename: "cacheMiddleware.js",
        snippet: `import { redisClient } from './redisClient.js';
import Product from '../models/Product.js';

// Cache-Aside Helper Function
export async function getOrSetCache(key, cb, ttlSeconds = 3600) {
  try {
    // 1. Check Redis Cache
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      console.log(\`⚡ [Cache HIT]: \${key}\`);
      return JSON.parse(cachedData);
    }

    // 2. Cache Miss: Execute callback (MongoDB query)
    console.log(\`🐢 [Cache MISS]: \${key} - Querying MongoDB...\`);
    const freshData = await cb();

    if (freshData) {
      // 3. Write to Redis with TTL
      await redisClient.set(key, JSON.stringify(freshData), {
        EX: ttlSeconds,
      });
    }

    return freshData;
  } catch (error) {
    console.error('Redis Cache Error, falling back to direct DB:', error);
    return await cb(); // Graceful degradation: DB still serves data if Redis is down
  }
}

// Controller usage
export async function getProductById(req, res) {
  const { id } = req.params;
  const cacheKey = \`product:\${id}\`;

  const product = await getOrSetCache(cacheKey, async () => {
    return await Product.findById(id).lean();
  }, 1800); // 30 minutes TTL

  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ success: true, data: product });
}`,
      },
    },
    {
      type: "pitfalls",
      heading: {
        en: "4. The Hardest Problem: Cache Invalidation Strategies",
        hi: "4. Sabse Bada Challenge: Cache Invalidation (Kab Delete Karein?)",
      },
      body: {
        en: `There is a famous quote in Computer Science by Phil Karlton:
> *"There are only two hard things in Computer Science: cache invalidation and naming things."*

### How to Prevent Stale Data:
1. **Write-Through Invalidation (Immediate Purge)**:
   When an admin updates a product (\`PUT /api/products/123\`), your Express controller must immediately delete the cached key:
   \`await redisClient.del('product:123');\`
2. **Pattern-Based Purge**:
   When a new product is added, delete list caches:
   \`await redisClient.del('products:list:page*');\`
3. **Probabilistic Early Expiration (XFetch)**:
   Refreshes the cache slightly before it expires to prevent a Cache Stampede when thousands of users request data at the moment of expiry.`,
        hi: `Computer Science ki famous kahawat hai:
> *"Computer Science mein do hi sabse mushkil kaam hain: Cache Invalidation aur Naming Things!"*

### Stale (Purana) Data Aane Se Kaise Bachein:
1. **Immediate Invalidation (Update par Delete)**:
   Jab bhi admin product ka price change kare (\`PUT /api/products/123\`), MongoDB update hone ke turant baad Redis key delete karein:
   \`await redisClient.del('product:123');\`
2. **TTL (Time To Live) Lagayein**:
   Har key par expiration lagayein taaki agar delete command miss bhi ho jaye, toh 1 ghante mein data automatically refresh ho jaye.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "5. Cache-Aside Best Practices Summary",
        hi: "5. Best Practices Quick Revision",
      },
      body: {
        en: `### 📌 Production Checklist:
- Always wrap Redis calls in \`try/catch\` with MongoDB fallback for graceful degradation.
- Always use semantic key naming: \`<entity>:<id>\` (e.g., \`user:65a1b2c\`, \`product:101\`).
- Always set an explicit \`EX\` (TTL in seconds).
- Invalidate cache on mutations (\`POST\`, \`PUT\`, \`DELETE\`).`,
        hi: `### 📌 Mukhya Niyam:
- Redis fail hone par app crash nahi honi chahiye (try/catch mein MongoDB fallback zaroor rakhein).
- Meaningful key names rakhein: \`product:101\`, \`cart:user_99\`.
- Hamesha TTL lagayein.
- Update/Delete par \`redisClient.del()\` zaroor chalayein.`,
      },
    },
  ],
  quiz: [
    {
      q: {
        en: "In the Cache-Aside pattern, what action is performed immediately after a Cache Miss occurs?",
        hi: "Cache-Aside pattern mein Cache Miss hone ke turant baad application kya karti hai?",
      },
      question: {
        en: "In the Cache-Aside pattern, what action is performed immediately after a Cache Miss occurs?",
        hi: "Cache-Aside pattern mein Cache Miss hone ke turant baad application kya karti hai?",
      },
      options: [
        {
          en: "Queries the primary database (MongoDB), writes the retrieved record into Redis with a TTL, and returns the data",
          hi: "MongoDB se data query karti hai, use Redis mein TTL ke sath save karti hai aur client ko return karti hai",
        },
        {
          en: "Returns an HTTP 500 Server Error to the client",
          hi: "Client ko 500 Internal Server Error bhej deti hai",
        },
        {
          en: "Deletes the entire Redis database to free RAM",
          hi: "RAM free karne ke liye poora Redis delete kar deti hai",
        },
        {
          en: "Blocks incoming network requests for 10 minutes",
          hi: "10 minute ke liye network requests block kar deti hai",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "On a cache miss, the application lazily fetches data from MongoDB, populates Redis so future requests hit the cache, and returns the response.",
        hi: "Cache miss par MongoDB se data lekar Redis mein store kiya jata hai taaki next request cache hit ban sake.",
      },
    },
    {
      q: {
        en: "Why should you always wrap Redis read operations in a try/catch block with a direct database fallback?",
        hi: "Redis calls ko hamesha direct database fallback ke sath try/catch mein wrap kyun karna chahiye?",
      },
      question: {
        en: "Why should you always wrap Redis read operations in a try/catch block with a direct database fallback?",
        hi: "Redis calls ko hamesha direct database fallback ke sath try/catch mein wrap kyun karna chahiye?",
      },
      options: [
        {
          en: "To ensure Graceful Degradation: if Redis is temporarily unreachable or restarted, the application continues serving users from MongoDB rather than crashing",
          hi: "Graceful Degradation ke liye: agar Redis down bhi ho jaye, toh app crash hone ke bajaye direct MongoDB se users ko data serve karti rahe",
        },
        {
          en: "Because JavaScript functions cannot run without try/catch",
          hi: "Kyunki try/catch ke bina JS execute nahi hoti",
        },
        {
          en: "To encrypt the TCP network packets with SSL",
          hi: "Network packets ko SSL encrypt karne ke liye",
        },
        {
          en: "To reduce server electricity consumption by 50%",
          hi: "Server ki bijli bachane ke liye",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Graceful degradation ensures your core application survives cache infrastructure outages. Caches enhance performance, but their temporary unavailability should not break your service.",
        hi: "Cache ek performance optimization layer hai. Agar Redis restart ho raha ho, toh try/catch fallback ke zariye site chalti rehni chahiye.",
      },
    },
    {
      q: {
        en: "What should an Express API controller do when a user updates their profile via 'PUT /api/user/profile'?",
        hi: "Jab user 'PUT /api/user/profile' par apna profile update karta hai, toh Express controller ko kya karna chahiye?",
      },
      question: {
        en: "What should an Express API controller do when a user updates their profile via 'PUT /api/user/profile'?",
        hi: "Jab user 'PUT /api/user/profile' par apna profile update karta hai, toh Express controller ko kya karna chahiye?",
      },
      options: [
        {
          en: "Update MongoDB and immediately invalidate/delete the corresponding Redis cache key (e.g., redisClient.del('user:123'))",
          hi: "MongoDB update karein aur turant Redis key delete karein (jaise redisClient.del('user:123'))",
        },
        {
          en: "Ignore MongoDB and only write to Redis",
          hi: "MongoDB ko ignore karke sirf Redis mein likhein",
        },
        {
          en: "Force the user to clear their browser history",
          hi: "User se browser history clear karwayein",
        },
        {
          en: "Reboot the physical server hardware",
          hi: "Physical server reboot karein",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "To prevent serving stale data, write operations must invalidate the affected cache key so subsequent reads fetch fresh data from MongoDB.",
        hi: "Stale (purana) data dikhane se bachne ke liye update ke baad purani cache key ko turant delete karna zaroori hai.",
      },
    },
    {
      q: {
        en: "Which Redis command removes a specific key from the cache immediately?",
        hi: "Redis se kisi specific key ko turant remove karne ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "Which Redis command removes a specific key from the cache immediately?",
        hi: "Redis se kisi specific key ko turant remove karne ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "DEL key", hi: "DEL key" },
        { en: "DROP key", hi: "DROP key" },
        { en: "REMOVE key", hi: "REMOVE key" },
        { en: "CLEAR key", hi: "CLEAR key" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "The 'DEL' command deletes one or more specified keys from Redis. It returns the number of keys that were removed.",
        hi: "Redis mein key delete karne ke liye 'DEL key' command use kiya jata hai.",
      },
    },
    {
      q: {
        en: "What is an industry standard convention for structuring Redis cache keys in a clean, namespace-segregated manner?",
        hi: "Redis keys ko clean aur collision-free rakhne ke liye industry standard naming convention kya hai?",
      },
      question: {
        en: "What is an industry standard convention for structuring Redis cache keys in a clean, namespace-segregated manner?",
        hi: "Redis keys ko clean aur collision-free rakhne ke liye industry standard naming convention kya hai?",
      },
      options: [
        { en: "Colon-separated entity hierarchies like 'entity:id:subproperty' (e.g., 'user:101:profile')", hi: "Colon-separated hierarchy jaise 'entity:id' (e.g., 'user:101:profile')" },
        { en: "Random uppercase strings without numbers", hi: "Random uppercase strings" },
        { en: "Raw HTML strings as keys", hi: "HTML code as keys" },
        { en: "Storing all keys as single letters A, B, C", hi: "Single letters A, B, C" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Using colon separation (e.g., 'products:catalog', 'user:42:cart') establishes clear visual hierarchy and enables pattern searching in monitoring tools.",
        hi: "Colon separation ('user:101', 'order:55') standard namespace structure deta hai jisse keys aapas mein collide nahi hoti.",
      },
    },
    {
      q: {
        en: "What is the primary risk of setting an excessively long TTL (e.g., 30 days) on rapidly changing product pricing data?",
        hi: "Regularly change hone wale pricing data par 30 din ka lamba TTL lagane ka sabse bada risk kya hai?",
      },
      question: {
        en: "What is the primary risk of setting an excessively long TTL (e.g., 30 days) on rapidly changing product pricing data?",
        hi: "Regularly change hone wale pricing data par 30 din ka lamba TTL lagane ka sabse bada risk kya hai?",
      },
      options: [
        {
          en: "Users may view outdated (stale) prices for up to 30 days if cache invalidation fails or is missed",
          hi: "Agar invalidation miss ho jaye, toh users ko 30 din tak purana (outdated) price dikhta rahega",
        },
        {
          en: "The hard disk will overheat and catch fire",
          hi: "Hard disk jal sakti hai",
        },
        {
          en: "Redis will automatically switch to MySQL",
          hi: "Redis MySQL ban jayega",
        },
        {
          en: "Node.js will delete the frontend codebase",
          hi: "Frontend code delete ho jayega",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Long TTLs increase the window of data inconsistency if an invalidation event is lost. Frequently mutated entities require shorter TTLs or active write-through invalidation.",
        hi: "Bohot lamba TTL data inconsistency ka risk badha deta hai; dynamic data ke liye short TTL aur active invalidation use karni chahiye.",
      },
    },
    {
      q: {
        en: "How does the Cache-Aside pattern differ from the Read-Through caching pattern?",
        hi: "Cache-Aside pattern aur Read-Through caching ke beech kya difference hota hai?",
      },
      question: {
        en: "How does the Cache-Aside pattern differ from the Read-Through caching pattern?",
        hi: "Cache-Aside pattern aur Read-Through caching ke beech kya difference hota hai?",
      },
      options: [
        {
          en: "In Cache-Aside, the application code handles both cache and database queries; in Read-Through, the cache library/plugin automatically fetches from the database transparently",
          hi: "Cache-Aside mein application code cache aur DB dono ko manage karta hai; Read-Through mein cache library automatically DB se data fetch kar leti hai",
        },
        {
          en: "Cache-Aside is for images; Read-Through is for audio",
          hi: "Cache-Aside images ke liye hai aur Read-Through audio ke liye",
        },
        {
          en: "Read-Through only works in mobile apps",
          hi: "Read-Through sirf mobile apps mein chalta hai",
        },
        {
          en: "There is no difference whatsoever",
          hi: "Dono mein koi difference nahi hai",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "In Cache-Aside, your Node.js code explicitly coordinates Redis and MongoDB. In Read-Through, a caching provider automatically queries the datastore behind the scenes.",
        hi: "Cache-Aside mein developer ka Express code Redis aur MongoDB dono ko call karta hai; Read-Through mein cache provider khud database ko call kar leta hai.",
      },
    },
    {
      q: {
        en: "Which technique helps mitigate the Thundering Herd / Cache Stampede problem when a high-traffic cache key expires?",
        hi: "High traffic key expire hone par Cache Stampede se bachne ke liye kaun si technique use hoti hai?",
      },
      question: {
        en: "Which technique helps mitigate the Thundering Herd / Cache Stampede problem when a high-traffic cache key expires?",
        hi: "High traffic key expire hone par Cache Stampede se bachne ke liye kaun si technique use hoti hai?",
      },
      options: [
        {
          en: "Using distributed mutex locks (Redlock) or probabilistic early background recomputation (XFetch)",
          hi: "Distributed mutex lock (Redlock) ya background early recomputation use karna",
        },
        {
          en: "Turning off all network firewalls",
          hi: "Firewalls band kar dena",
        },
        {
          en: "Writing all responses to text files on client desktops",
          hi: "Client desktop par text files save karna",
        },
        {
          en: "Restarting the router every 15 seconds",
          hi: "Router bar-bar restart karna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "A mutex lock ensures that only ONE worker queries MongoDB to regenerate the cache while other incoming requests wait for the lock to release.",
        hi: "Distributed mutex lock lagane se sirf ek request database query karti hai aur baaki requests wait karti hain, jisse DB crush nahi hota.",
      },
    },
    {
      q: {
        en: "When serializing a MongoDB document into Redis, which standard JavaScript method is used?",
        hi: "MongoDB document ko Redis mein save karne ke liye JavaScript ka kaun sa standard method use hota hai?",
      },
      question: {
        en: "When serializing a MongoDB document into Redis, which standard JavaScript method is used?",
        hi: "MongoDB document ko Redis mein save karne ke liye JavaScript ka kaun sa standard method use hota hai?",
      },
      options: [
        { en: "JSON.stringify(document)", hi: "JSON.stringify(document)" },
        { en: "document.toXML()", hi: "document.toXML()" },
        { en: "escape(document)", hi: "escape(document)" },
        { en: "encodeURIComponent(document)", hi: "encodeURIComponent(document)" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Redis string values store plain text or binary buffers. Complex JavaScript objects are serialized using JSON.stringify() and parsed with JSON.parse().",
        hi: "Redis strings text store karte hain, isiliye JS objects ko JSON.stringify se string banakar store kiya jata hai.",
      },
    },
    {
      q: {
        en: "What performance advantage does Mongoose's '.lean()' method offer when preparing documents for Redis caching?",
        hi: "Redis caching ke liye data prepare karte waqt Mongoose ke '.lean()' method ka kya fayda hota hai?",
      },
      question: {
        en: "What performance advantage does Mongoose's '.lean()' method offer when preparing documents for Redis caching?",
        hi: "Redis caching ke liye data prepare karte waqt Mongoose ke '.lean()' method ka kya fayda hota hai?",
      },
      options: [
        {
          en: "Returns plain JavaScript objects instead of heavy Mongoose Document instances with internal getters/setters, saving CPU and RAM",
          hi: "Heavy Mongoose documents ke badle lightweight plain JS objects return karta hai, jisse CPU aur RAM dono bachte hain",
        },
        {
          en: "Deletes the database collection immediately",
          hi: "Database collection delete kar deta hai",
        },
        {
          en: "Encrypts the document with RSA-4096",
          hi: "RSA se encrypt karna",
        },
        {
          en: "Converts strings to uppercase automatically",
          hi: "Uppercase banana",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: ".lean() skips hydrating full Mongoose Document instances with schema tracking and change detection, making queries up to 4x faster and faster to JSON.stringify().",
        hi: ".lean() plain JS object deta hai bina kisi Mongoose virtuals ya tracking overhead ke, jisse execution 4x fast ho jata hai.",
      },
    },
    {
      q: {
        en: "What is 'Cache Penetration' and how can it be prevented in a MERN application?",
        hi: "Redis mein 'Cache Penetration' kya hai aur ise kaise roka jata hai?",
      },
      question: {
        en: "What is 'Cache Penetration' and how can it be prevented in a MERN application?",
        hi: "Redis mein 'Cache Penetration' kya hai aur ise kaise roka jata hai?",
      },
      options: [
        {
          en: "When requests query non-existent IDs, constantly bypassing Redis and hitting MongoDB; prevented by caching null values with short TTL or using Bloom Filters",
          hi: "Jab malicious requests fake IDs bhejti hain jo na cache mein milti hain na DB mein; ise rokne ke liye null values cache karein ya Bloom Filter lagayein",
        },
        {
          en: "When hacker physically opens the server case",
          hi: "Server case open karna",
        },
        {
          en: "When a query executes faster than light",
          hi: "Light se tez query chalna",
        },
        {
          en: "When user deletes their account 3 times",
          hi: "Account delete karna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Cache Penetration occurs when attackers query IDs that don't exist in MongoDB, forcing DB queries on every request. Caching null with a 60s TTL or using a Bloom filter protects the DB.",
        hi: "Cache Penetration fake IDs ki wajah se hoti hai jo DB par direct load dalti hain. Fake IDs ka null result bhi 60s ke liye cache karne se DB safe rehta hai.",
      },
    },
    {
      q: {
        en: "Which Redis command checks whether a key exists in memory without retrieving its entire value?",
        hi: "Value download kiye bina check karne ke liye ki key Redis mein exist karti hai ya nahi, kaun sa command use hota hai?",
      },
      question: {
        en: "Which Redis command checks whether a key exists in memory without retrieving its entire value?",
        hi: "Value download kiye bina check karne ke liye ki key Redis mein exist karti hai ya nahi, kaun sa command use hota hai?",
      },
      options: [
        { en: "EXISTS key", hi: "EXISTS key" },
        { en: "IS_HERE key", hi: "IS_HERE key" },
        { en: "CHECK key", hi: "CHECK key" },
        { en: "TEST key", hi: "TEST key" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'EXISTS key' returns 1 if the key exists, or 0 if it does not, without paying the network serialization penalty of transferring the payload.",
        hi: "'EXISTS key' check karta hai ki key available hai ya nahi aur 1 ya 0 return karta hai bina data transfer overhead ke.",
      },
    },
    {
      q: {
        en: "What is the purpose of setting a 'Jitter' (randomized delta) on cache TTLs across thousands of keys?",
        hi: "Hazaro keys ke TTL par thoda random 'Jitter' (delta time) add karne ka kya fayda hota hai?",
      },
      question: {
        en: "What is the purpose of setting a 'Jitter' (randomized delta) on cache TTLs across thousands of keys?",
        hi: "Hazaro keys ke TTL par thoda random 'Jitter' (delta time) add karne ka kya fayda hota hai?",
      },
      options: [
        {
          en: "Prevents all keys from expiring at the exact same second, avoiding simultaneous mass cache misses that overwhelm MongoDB",
          hi: "Saari keys ko ek hi second mein expire hone se rokta hai taaki database par achanak load na aaye",
        },
        {
          en: "Improves monitor refresh rates",
          hi: "Monitor refresh rate improve karna",
        },
        {
          en: "Encrypts user passwords",
          hi: "Passwords encrypt karna",
        },
        {
          en: "Enables multi-touch trackpad gestures",
          hi: "Trackpad gestures enable karna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Adding random jitter (e.g., TTL = 3600 + Math.random() * 300) staggers expiration times, smoothing out database load over a wider time window.",
        hi: "Jitter add karne se saari keys alag alag seconds par expire hoti hain jisse database par ek sath spike nahi aata.",
      },
    },
    {
      q: {
        en: "What command retrieves the remaining Time-To-Live of a key in seconds?",
        hi: "Kisi key ka remaining Time-To-Live seconds mein check karne ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "What command retrieves the remaining Time-To-Live of a key in seconds?",
        hi: "Kisi key ka remaining Time-To-Live seconds mein check karne ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "TTL key", hi: "TTL key" },
        { en: "TIME_LEFT key", hi: "TIME_LEFT key" },
        { en: "EXPIRE_CHECK key", hi: "EXPIRE_CHECK key" },
        { en: "REMAINING key", hi: "REMAINING key" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'TTL key' returns the remaining time to live in seconds. It returns -1 if the key has no expiry, and -2 if the key does not exist.",
        hi: "'TTL key' remaining seconds batata hai. -1 ka matlab no expiry aur -2 ka matlab key exist nahi karti.",
      },
    },
    {
      q: {
        en: "Why is the Cache-Aside pattern considered resilient against cache node crashes?",
        hi: "Cache-Aside pattern cache node crash hone par resilient kyun mana jata hai?",
      },
      question: {
        en: "Why is the Cache-Aside pattern considered resilient against cache node crashes?",
        hi: "Cache-Aside pattern cache node crash hone par resilient kyun mana jata hai?",
      },
      options: [
        {
          en: "Because the primary database remains the ultimate source of truth, allowing the application to continue serving requests directly from the database if Redis fails",
          hi: "Kyunki primary source of truth MongoDB hai; Redis fail hone par bhi app direct database se queries fulfill karti rehti hai",
        },
        {
          en: "Because Redis copies its data to paper printed slips",
          hi: "Redis slips print karta hai",
        },
        {
          en: "Because crashed caches automatically rebuild the computer motherboard",
          hi: "Motherboard rebuild karna",
        },
        {
          en: "Because the application shuts down until a human technician arrives",
          hi: "Technician aane tak band rehna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Unlike primary databases, a cache failure in Cache-Aside results only in degraded performance (higher latency) rather than a complete application outage.",
        hi: "Cache-Aside mein cache sirf speed boost karta hai. Agar cache fail ho jaye toh system slow hoga, lekin crash nahi hoga.",
      },
    },
    {
      q: {
        en: "Which HTTP header is commonly set by Express caching middleware to inform frontend clients whether an API response came from cache or database?",
        hi: "Express caching middleware generally kaun sa custom HTTP header set karta hai yeh batane ke liye ki response cache se aaya ya DB se?",
      },
      question: {
        en: "Which HTTP header is commonly set by Express caching middleware to inform frontend clients whether an API response came from cache or database?",
        hi: "Express caching middleware generally kaun sa custom HTTP header set karta hai yeh batane ke liye ki response cache se aaya ya DB se?",
      },
      options: [
        { en: "X-Cache: HIT (or X-Cache: MISS)", hi: "X-Cache: HIT (ya X-Cache: MISS)" },
        { en: "Content-Type: text/cache", hi: "Content-Type: text/cache" },
        { en: "Authorization: Bearer Cache", hi: "Authorization: Bearer Cache" },
        { en: "User-Agent: RedisBrowser", hi: "User-Agent: RedisBrowser" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Engineers commonly set custom diagnostic headers like 'X-Cache: HIT' or 'X-Cache: MISS' for observability and DevTools debugging.",
        hi: "'X-Cache: HIT' ya 'X-Cache: MISS' header se frontend developers DevTools network tab mein aasani se cache behavior verify kar lete hain.",
      },
    },
    {
      q: {
        en: "When storing cart items in Redis for an e-commerce platform, which Redis command removes all expiration restrictions, making the key persistent?",
        hi: "Kisi key ki expiration hata kar use permanent persistent banane ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "When storing cart items in Redis for an e-commerce platform, which Redis command removes all expiration restrictions, making the key persistent?",
        hi: "Kisi key ki expiration hata kar use permanent persistent banane ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "PERSIST key", hi: "PERSIST key" },
        { en: "UNEXPIRE key", hi: "UNEXPIRE key" },
        { en: "KEEP_FOREVER key", hi: "KEEP_FOREVER key" },
        { en: "NO_TTL key", hi: "NO_TTL key" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "The 'PERSIST' command removes the existing timeout on a key, turning an expiring volatile key into a persistent key.",
        hi: "'PERSIST key' command key se timeout hata kar use persistent bana deta hai.",
      },
    },
    {
      q: {
        en: "Why is it an anti-pattern to cache the results of frequently updating real-time stock ticker prices with a 1-hour TTL?",
        hi: "Har second change hone wale stock ticker prices ko 1 ghante ke TTL ke sath cache karna anti-pattern kyun hai?",
      },
      question: {
        en: "Why is it an anti-pattern to cache the results of frequently updating real-time stock ticker prices with a 1-hour TTL?",
        hi: "Har second change hone wale stock ticker prices ko 1 ghante ke TTL ke sath cache karna anti-pattern kyun hai?",
      },
      options: [
        {
          en: "Because stock prices require near-zero latency accuracy; serving 1-hour-old stale financial prices causes severe inaccuracies and financial loss",
          hi: "Kyunki financial data real-time accuracy maangta hai; 1 ghante purana price dikhane se heavy financial loss ho sakta hai",
        },
        {
          en: "Because Redis refuses to store numbers with decimals",
          hi: "Kyunki Redis decimals store nahi karta",
        },
        {
          en: "Because stock symbols cannot be stored in RAM",
          hi: "Stock symbols RAM mein nahi rehte",
        },
        {
          en: "Because internet routers ban stock data",
          hi: "Routers stock data ban kar dete hain",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Caches must be tuned to the volatility of data. Highly volatile real-time metrics require sub-second TTLs or WebSocket event streams rather than static 1-hour caches.",
        hi: "Volatile real-time data ke liye long caching anti-pattern hai; isme WebSockets ya ultra-short sub-second cache use hona chahiye.",
      },
    },
    {
      q: {
        en: "Which command deletes all keys across all databases in the current Redis server instance?",
        hi: "Current Redis server ke saare databases ki saari keys delete karne ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "Which command deletes all keys across all databases in the current Redis server instance?",
        hi: "Current Redis server ke saare databases ki saari keys delete karne ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "FLUSHALL", hi: "FLUSHALL" },
        { en: "DELETE *", hi: "DELETE *" },
        { en: "DROP ALL", hi: "DROP ALL" },
        { en: "PURGE_SERVER", hi: "PURGE_SERVER" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'FLUSHALL' purges all keys across all databases on the server. 'FLUSHDB' purges only the currently selected database.",
        hi: "'FLUSHALL' poore Redis server ke saare databases ko clean kar deta hai. Production mein ise cautiously use karein.",
      },
    },
    {
      q: {
        en: "In a Redis-backed session store, what happens when a user clicks 'Logout'?",
        hi: "Redis-backed session store mein jab user 'Logout' par click karta hai, toh kya hota hai?",
      },
      question: {
        en: "In a Redis-backed session store, what happens when a user clicks 'Logout'?",
        hi: "Redis-backed session store mein jab user 'Logout' par click karta hai, toh kya hota hai?",
      },
      options: [
        {
          en: "The Express server calls redisClient.del(sessionId), immediately revoking access even if the JWT/cookie hasn't expired on the client",
          hi: "Express server redisClient.del(sessionId) call karta hai, jisse session turant revoke ho jata hai",
        },
        {
          en: "The user's computer monitor turns off",
          hi: "User ka monitor band ho jata hai",
        },
        {
          en: "Redis changes the user's password to a random string",
          hi: "Password random string ban jata hai",
        },
        {
          en: "The session is permanently transferred to the dark web",
          hi: "Session dark web par transfer ho jata hai",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "By deleting the session key in Redis, subsequent requests fail authentication immediately, providing true real-time revocation that stateless JWTs cannot achieve alone.",
        hi: "Redis se session key delete karte hi token instantly invalid ho jata hai aur user ka access turant terminate ho jata hai.",
      },
    },
    {
      q: {
        en: "What is the primary benefit of pipeline batching in Redis (e.g., redisClient.multi())?",
        hi: "Redis mein pipeline batching (multi/exec) use karne ka primary benefit kya hai?",
      },
      question: {
        en: "What is the primary benefit of pipeline batching in Redis (e.g., redisClient.multi())?",
        hi: "Redis mein pipeline batching (multi/exec) use karne ka primary benefit kya hai?",
      },
      options: [
        {
          en: "Sends multiple commands across the network in a single TCP round-trip, dramatically cutting network latency overhead",
          hi: "Ek hi TCP network round-trip mein multiple commands bhejta hai, jisse network latency drastic kam ho jati hai",
        },
        {
          en: "Compresses all data into MP3 audio",
          hi: "Data ko MP3 audio banana",
        },
        {
          en: "Translates commands into French",
          hi: "French mein convert karna",
        },
        {
          en: "Allows Redis to run without a CPU",
          hi: "Bina CPU ke chalana",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Pipelining groups multiple write/read operations into a single network packet, eliminating the latency of separate TCP request-response cycles.",
        hi: "Pipelining ek sath multiple commands ko single TCP round trip mein execute karke network latency overhead ko khatam karta hai.",
      },
    },
  ],
};
