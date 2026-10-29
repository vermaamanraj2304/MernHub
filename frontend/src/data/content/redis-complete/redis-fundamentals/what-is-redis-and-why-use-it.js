export default {
  id: "redis-what-is-redis-and-why-use-it",
  title: {
    en: "What is Redis & Why Use It? (In-Memory Data Store)",
    hi: "Redis Kya Hai & Kyun Use Karein? (In-Memory Ultra-Fast Cache)",
  },
  difficulty: "Beginner",
  readTime: 14,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Database Bottleneck: Disk I/O vs Sub-Millisecond RAM",
        hi: "1. Database Bottleneck: Disk I/O vs Ultra-Fast RAM Speed",
      },
      body: {
        en: `In standard web applications, every incoming user request usually triggers a database lookup:
\`\`\`
Client ──► Express API Server ──► MongoDB / PostgreSQL (Reads from SSD Disk) ──► JSON Response
[Latency: 30ms - 150ms per request]
\`\`\`

When user traffic spikes (e.g., flash sales, breaking news, viral products), thousands of concurrent requests query the **exact same data** simultaneously. Disk-based databases quickly face:
- **Disk I/O Choke**: High disk queue depths cause query wait times to skyrocket.
- **Connection Pool Exhaustion**: Available pool connections saturate, rejecting new requests with 504 Gateway Timeouts.
- **High CPU Utilization**: Re-evaluating B-tree indexes and disk pages wastes CPU cycles.

---

### Enter Redis (REmote DIctionary Server)
**Redis** is an open-source, in-memory, key-value data structure store used as a database, cache, message broker, and streaming engine.
- **In-Memory Storage**: Data resides directly in computer **RAM** rather than magnetic or SSD disks. RAM access latency is measured in **nanoseconds**, allowing Redis to execute operations in **<1 millisecond** ($O(1)$ constant time).
- **Single-Threaded Event Loop**: Redis uses an event-driven, non-blocking I/O multiplexing architecture (via \`epoll\`/\`kqueue\`). It handles **100,000+ operations per second** on a single CPU core without thread locking contention.
- **Sub-Millisecond Read Latency**: Average reads complete in **0.1ms to 0.5ms**, compared to 30ms-100ms for disk-based databases.`,
        hi: `Traditional MERN apps mein jab client kisi resource ke liye request bhejta hai:
\`\`\`
Client ──► Express API Server ──► MongoDB (SSD Hard Disk se data fetch karta hai) ──► Response
[Time: 30ms se 150ms]
\`\`\`

Agar lakho users ek sath flash sale ya ticket booking kar rahe hon, toh MongoDB ka disk I/O choke ho jata hai, connections full ho jate hain aur site slow ya down ho jati hai.

---

### Redis Kya Hai? (REmote DIctionary Server)
**Redis** ek ultra-fast in-memory key-value database hai jo direct computer ki **RAM** mein data store karta hai:
- **RAM Ki Speed**: Hard disk ya SSD ke mukable RAM hazaro guna tez hoti hai. RAM lookup **1 millisecond se bhi kam** ($O(1)$) time mein ho jata hai.
- **Single-Threaded Event Loop**: Node.js ki tarah Redis bhi single-threaded event loop aur non-blocking I/O multiplexer use karta hai, jisse ek single machine par **1,00,000+ requests per second** smoothly handle ho jati hain.
- **Microsecond Latency**: MongoDB ke aage Redis lagane se **95% queries database tak jati hi nahi hain**, aur API ka response time 80ms se ghat kar 2ms ho jata hai!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "2. Real-World Indian Analogy: Haldiram Cash Counter vs Godown",
        hi: "2. Real-World Desi Analogy: Haldiram Counter vs Central Godown",
      },
      body: {
        en: `### 🍬 The Haldiram Sweet Shop Analogy

Imagine walking into a bustling **Haldiram's sweet shop** on Diwali eve:

1. **Without Cache (Direct Disk Lookup)**:
   Every time a customer asks for a box of *Kaju Katli*, the salesman walks 200 meters into the dark, dusty **central basement godown** (MongoDB on Hard Disk), unseals a large wooden crate, carries 1 box back to the counter, and rings it up.
   - *Result*: A line of 50 customers forms outside, waiting 20 minutes for a simple order!

2. **With Redis Cache (The Display Glass Counter)**:
   The shopkeeper keeps 50 pre-packaged, ready-to-sell boxes of popular sweets (*Kaju Katli*, *Gulab Jamun*) right on the **glass front counter** (Redis in RAM).
   - When a customer orders *Kaju Katli*, the salesman picks it from the counter in **1 second** (Cache Hit).
   - Only when a rare, exotic sweet is requested does someone fetch it from the basement godown (Cache Miss), simultaneously placing an extra sample on the front counter for the next customer.

Redis acts as your ultra-fast front glass display counter!`,
        hi: `### 🍬 Haldiram Mithai Shop Ka Example

Diwali ke din Haldiram ki shop par 500 customers khade hain:

1. **Bina Redis Ke (Direct Disk Fetch)**:
   Har baar jab koi customer *Kaju Katli* maangta hai, counter boy 200 meter door basement ke **central godown** (MongoDB Hard Disk) mein jata hai, bada box kholta hai aur ek dabba lekar counter par aata hai.
   - *Nateeja*: Har customer ko 20 minute line mein khada rehna padta hai aur shop choke ho jati hai!

2. **Redis Cache Ke Sath (Front Glass Display Counter)**:
   Smart dukandar sabse zyada bikne wali mithaiyan (Kaju Katli, Rasgulla) pehle se **glass counter** (Redis in RAM) par ready rakhta hai:
   - Jaise hi customer maangta hai, 1 second mein counter se dabba de diya jata hai (**Cache Hit**).
   - Agar koi aisi rare mithai maangi jo counter par nahi hai, tabhi clerk godown jata hai (**Cache Miss**), aur aate waqt ek box glass counter par bhi rakh deta hai.

Redis aapke application ka wahi ultra-fast front glass counter hai!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "3. Primary Use Cases for Redis in MERN Applications",
        hi: "3. MERN Stack Mein Redis Ke Top Practical Use Cases",
      },
      body: {
        en: `Redis is not just a simple key-value string store; it provides specialized capabilities:

1. **Database Query Caching**:
   Cache expensive MongoDB aggregation pipelines, product catalogs, and user profiles with a Time-To-Live (TTL).
2. **Session Management**:
   Store user session tokens or JWT blocklists in Redis. Since sessions must be checked on every authenticated request, Redis ensures zero auth latency.
3. **API Rate Limiting**:
   Protect Express APIs from DDoS and brute-force attacks using Redis atomic counters (\`INCR\` + \`EXPIRE\`) to limit users to e.g., 100 requests per minute.
4. **Real-Time Leaderboards**:
   Redis Sorted Sets (\`ZSET\`) store scores with elements, allowing real-time rank computation in $O(\\log N)$ time for gaming or quiz platforms.
5. **Pub/Sub & Message Queues**:
   Real-time event broadcasting between microservices without Kafka overhead.`,
        hi: `MERN applications mein Redis ko in 5 mukhya cheezo ke liye use kiya jata hai:

1. **Database Query Caching**:
   MongoDB ke heavy aggregation queries aur product listings ko Redis mein cache karein with TTL (expiry time).
2. **User Session & Auth Storage**:
   User login sessions aur revoked JWT tokens ko Redis mein rakhein taaki har request par auth verification microsecond mein ho sake.
3. **API Rate Limiting**:
   Express server ko DDoS aur brute force se bachane ke liye Redis atomic counters (\`INCR\`) use karke per-user request limit lagayein (jaise 100 req/min).
4. **Live Leaderboards**:
   Redis Sorted Sets (\`ZSET\`) scores ke sath data store karte hain, jisse real-time rank calculate karna super fast ho jata hai.
5. **Pub/Sub Messaging**:
   Multiple servers aur microservices ke beech real-time messages pass karne ke liye.`,
      },
      code: {
        language: "javascript",
        filename: "redisClient.js",
        snippet: `import { createClient } from 'redis';

// Connect to Redis in-memory server
export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('⚡ Connected to Redis in RAM!'));

await redisClient.connect();

// Example 1: Set string with 60s TTL
await redisClient.set('product:101', JSON.stringify({ name: 'MacBook Pro', price: 1999 }), {
  EX: 60 // Expire after 60 seconds
});

// Example 2: Ultra-fast fetch
const cached = await redisClient.get('product:101');
console.log('Cached Data:', JSON.parse(cached));`,
      },
    },
    {
      type: "pitfalls",
      heading: {
        en: "4. Common Pitfalls & What Redis Is NOT",
        hi: "4. Common Galtiyan Aur Redis Kya NAHI Hai",
      },
      body: {
        en: `### ❌ Anti-Patterns & Misconceptions:
1. **Redis is NOT a Permanent Replacement for MongoDB**:
   RAM is volatile and significantly more expensive per gigabyte than SSD storage. Redis is designed for frequently accessed hot data, not cold archives.
2. **Missing Time-To-Live (TTL)**:
   Storing keys without expiration leads to unbounded RAM growth and eventually triggers Out-Of-Memory (OOM) errors. Always set an appropriate TTL.
3. **Storing Massive Objects**:
   Redis is single-threaded. Storing a 50MB JSON object blocks the entire server while serializing/deserializing, causing request latency spikes for other users.
4. **Ignoring Eviction Policies**:
   Configure \`maxmemory-policy\` (e.g., \`allkeys-lru\` or \`volatile-lru\`) so Redis safely evicts least-recently-used keys when RAM fills up rather than crashing.`,
        hi: `### ❌ Yeh Galtiyan Na Karein:
1. **Redis ko MongoDB ka replacement na samjhein**:
   RAM bohot mehngi aur volatile hoti hai. Redis hot data aur caching ke liye hai, permanent data storage ke liye MongoDB hi best hai.
2. **Bina TTL (Expiry) ke keys store karna**:
   Agar aap expiry time nahi lagayenge, toh RAM bhar jayegi aur Redis Out-Of-Memory error throw karega. Hamesha \`EX\` ya \`EXPIRE\` use karein.
3. **Bohot bade JSON objects store karna**:
   Kyunki Redis single-threaded hai, 50MB ka data read/write karte waqt doosre users ki requests pause ho sakti hain.
4. **Eviction Policy set na karna**:
   Production mein hamesha \`allkeys-lru\` set karein taaki RAM bharne par puraana unused data automatically clean ho sake.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "5. Redis Architectural Cheat Sheet",
        hi: "5. Redis Key Concepts Quick Summary",
      },
      body: {
        en: `### 📌 Key Takeaways:
- **Default Port**: 6379
- **Storage Tier**: RAM (Main Memory) with optional RDB/AOF disk persistence
- **Time Complexity**: $O(1)$ for key lookups, $O(\\log N)$ for sorted sets
- **Architecture**: Single-threaded event loop + I/O multiplexer
- **Primary Formula**: Cache Read ($<1\\text{ms}$) + MongoDB Disk Read ($50\\text{ms}$) = 95% Latency Reduction`,
        hi: `### 📌 Revision Points:
- **Default Port**: 6379
- **Storage Location**: Computer RAM (with optional snapshot on disk)
- **Time Complexity**: Key lookup hamesha $O(1)$ constant time hota hai
- **Event Loop**: Single-threaded non-blocking multiplexer
- **Rule**: Hot data Redis mein rakhein, cold data MongoDB mein!`,
      },
    },
  ],
  quiz: [
    {
      q: {
        en: "What is the primary technical reason Redis achieves sub-millisecond query execution speeds?",
        hi: "Redis sub-millisecond query speed achieve karne ke liye primarily kaun si technology use karta hai?",
      },
      question: {
        en: "What is the primary technical reason Redis achieves sub-millisecond query execution speeds?",
        hi: "Redis sub-millisecond query speed achieve karne ke liye primarily kaun si technology use karta hai?",
      },
      options: [
        {
          en: "All datasets reside entirely in computer RAM rather than spinning magnetic or SSD disks",
          hi: "Saara data SSD ya hard disk ke bajaye computer ki RAM mein rehta hai",
        },
        {
          en: "It runs hundreds of parallel operating system processes per single query",
          hi: "Yeh har query ke liye sainkdo parallel OS processes run karta hai",
        },
        {
          en: "It completely disables network protocol handshakes",
          hi: "Yeh network protocols ko completely disable kar deta hai",
        },
        {
          en: "It converts all user queries into uncompressed binary audio waves",
          hi: "Yeh user queries ko audio waves mein convert karta hai",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "RAM memory access latency is measured in nanoseconds, eliminating disk I/O seek times and allowing Redis to execute operations in under 1 millisecond.",
        hi: "RAM lookup nanoseconds mein hota hai jabki disk I/O milliseconds leta hai, isiliye Redis sub-millisecond performance deta hai.",
      },
    },
    {
      q: {
        en: "What is the default port number on which a standard Redis server instance listens?",
        hi: "Standard Redis server default roop se kis port number par listen karta hai?",
      },
      question: {
        en: "What is the default port number on which a standard Redis server instance listens?",
        hi: "Standard Redis server default roop se kis port number par listen karta hai?",
      },
      options: [
        { en: "27017", hi: "27017" },
        { en: "6379", hi: "6379" },
        { en: "3306", hi: "3306" },
        { en: "5432", hi: "5432" },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: "Redis uses port 6379 by default (spelling out 'MERZ' on a phone keypad after creator Salvatore Sanfilippo). 27017 is MongoDB, 3306 is MySQL, and 5432 is PostgreSQL.",
        hi: "Redis ka standard default port 6379 hota hai. 27017 MongoDB ka hai aur 3306 MySQL ka hai.",
      },
    },
    {
      q: {
        en: "Which architectural pattern describes checking Redis for cached data first, and querying MongoDB only when a cache miss occurs?",
        hi: "Pehle Redis cache check karna aur data na milne par MongoDB query karne ke pattern ko kya kehte hain?",
      },
      question: {
        en: "Which architectural pattern describes checking Redis for cached data first, and querying MongoDB only when a cache miss occurs?",
        hi: "Pehle Redis cache check karna aur data na milne par MongoDB query karne ke pattern ko kya kehte hain?",
      },
      options: [
        { en: "Cache-Aside (Lazy Loading)", hi: "Cache-Aside (Lazy Loading) pattern" },
        { en: "Write-Through Only", hi: "Write-Through Only pattern" },
        { en: "Circular Polling", hi: "Circular Polling pattern" },
        { en: "Thread Hijacking", hi: "Thread Hijacking pattern" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Cache-Aside checks the cache first; if present (cache hit), it returns immediately. If missing (cache miss), it reads from database, updates the cache, and returns.",
        hi: "Cache-Aside pattern mein application pehle cache check karti hai; miss hone par database se fetch karke cache update karti hai.",
      },
    },
    {
      q: {
        en: "What occurs if you continuously store data into Redis without specifying a Time-To-Live (TTL) or eviction policy?",
        hi: "Agar aap bina TTL ya eviction policy ke Redis mein data daalte rahein toh kya hoga?",
      },
      question: {
        en: "What occurs if you continuously store data into Redis without specifying a Time-To-Live (TTL) or eviction policy?",
        hi: "Agar aap bina TTL ya eviction policy ke Redis mein data daalte rahein toh kya hoga?",
      },
      options: [
        {
          en: "RAM fills up, triggering Out-Of-Memory (OOM) errors and rejecting further write commands",
          hi: "RAM full ho jayegi aur Out-Of-Memory error aane par naye writes reject hone lagenge",
        },
        {
          en: "Redis automatically converts all hard drives into extra RAM",
          hi: "Redis computer ki hard drive ko RAM mein convert kar dega",
        },
        {
          en: "The network cable automatically disconnects",
          hi: "Network cable physically disconnect ho jayegi",
        },
        {
          en: "Redis deletes the operating system kernel",
          hi: "Redis OS kernel ko delete kar dega",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Without TTL or an LRU eviction policy, memory consumption grows unbounded until maxmemory is reached, causing Redis to return OOM errors for write operations.",
        hi: "Bina TTL ke RAM saturate ho jati hai aur Redis OOM (Out Of Memory) errors return karne lagta hai.",
      },
    },
    {
      q: {
        en: "Which Redis data structure is optimal for maintaining a real-time gaming leaderboard ranked by score?",
        hi: "Real-time gaming leaderboard score ke hisab se rank karne ke liye kaun sa Redis data structure best hai?",
      },
      question: {
        en: "Which Redis data structure is optimal for maintaining a real-time gaming leaderboard ranked by score?",
        hi: "Real-time gaming leaderboard score ke hisab se rank karne ke liye kaun sa Redis data structure best hai?",
      },
      options: [
        { en: "Sorted Sets (ZSET)", hi: "Sorted Sets (ZSET)" },
        { en: "Plain Strings only", hi: "Sirf Plain Strings" },
        { en: "Bitmap Arrays", hi: "Bitmap Arrays" },
        { en: "Unsorted Lists", hi: "Unsorted Lists" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Sorted Sets (ZSET) store unique members mapped to a floating-point score, maintaining order automatically with logarithmic complexity O(log N).",
        hi: "Sorted Sets (ZSET) har element ke sath score store karte hain aur O(log N) mein automatically sorted leaderboard maintain karte hain.",
      },
    },
    {
      q: {
        en: "How does the Redis core execution engine handle high concurrency despite being single-threaded?",
        hi: "Single-threaded hone ke bavajood Redis high concurrency ko kaise handle karta hai?",
      },
      question: {
        en: "How does the Redis core execution engine handle high concurrency despite being single-threaded?",
        hi: "Single-threaded hone ke bavajood Redis high concurrency ko kaise handle karta hai?",
      },
      options: [
        {
          en: "Via non-blocking I/O multiplexing (epoll/kqueue) and CPU-efficient in-memory pointer operations",
          hi: "Non-blocking I/O multiplexing aur fast in-memory operations ke zariye",
        },
        {
          en: "By creating a brand new thread for every connected user",
          hi: "Har user ke liye naya operating system thread bana kar",
        },
        {
          en: "By pausing user requests for 5 seconds between queries",
          hi: "Har request ko 5 second ke liye pause karke",
        },
        {
          en: "By delegating all execution to the client web browser",
          hi: "Saara code client ke browser par delegate karke",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Redis uses an event-driven I/O multiplexer (epoll on Linux) to process thousands of socket connections asynchronously on a single thread without context-switching overhead.",
        hi: "Redis non-blocking event-driven multiplexer use karta hai jo bina thread context switching ke thousands of connections handle karta hai.",
      },
    },
    {
      q: {
        en: "Which Redis command is used to set a key with an automatic 60-second expiration time?",
        hi: "Kisi key ko 60-second ki expiration ke sath set karne ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "Which Redis command is used to set a key with an automatic 60-second expiration time?",
        hi: "Kisi key ko 60-second ki expiration ke sath set karne ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "SET key value EX 60", hi: "SET key value EX 60" },
        { en: "DELETE key AFTER 60", hi: "DELETE key AFTER 60" },
        { en: "SLEEP 60 key value", hi: "SLEEP 60 key value" },
        { en: "SAVE key value TIMEOUT 60", hi: "SAVE key value TIMEOUT 60" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'SET key value EX 60' atomically sets the key and its expiration in seconds. 'SETEX key 60 value' is also equivalent.",
        hi: "'SET key value EX 60' key ko value aur 60 seconds TTL ke sath atomically set karta hai.",
      },
    },
    {
      q: {
        en: "What is the time complexity of looking up a value by its key in Redis using the GET command?",
        hi: "Redis mein GET command ke zariye key se value dhoondhne ki time complexity kya hoti hai?",
      },
      question: {
        en: "What is the time complexity of looking up a value by its key in Redis using the GET command?",
        hi: "Redis mein GET command ke zariye key se value dhoondhne ki time complexity kya hoti hai?",
      },
      options: [
        { en: "O(1) Constant Time", hi: "O(1) Constant Time" },
        { en: "O(N) Linear Time", hi: "O(N) Linear Time" },
        { en: "O(N^2) Quadratic Time", hi: "O(N^2) Quadratic Time" },
        { en: "O(N!) Factorial Time", hi: "O(N!) Factorial Time" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Hash-based key lookups in Redis have an average time complexity of O(1), ensuring instantaneous retrieval regardless of dataset size.",
        hi: "Redis hash table lookup O(1) constant time mein hota hai, chahe database mein kitni bhi keys hon.",
      },
    },
    {
      q: {
        en: "What is a 'Cache Stampede' (or Thundering Herd problem) in Redis caching?",
        hi: "Redis caching mein 'Cache Stampede' problem ka kya matlab hota hai?",
      },
      question: {
        en: "What is a 'Cache Stampede' (or Thundering Herd problem) in Redis caching?",
        hi: "Redis caching mein 'Cache Stampede' problem ka kya matlab hota hai?",
      },
      options: [
        {
          en: "When a popular cached key expires, and thousands of concurrent requests hit MongoDB at the exact same instant",
          hi: "Jab koi popular key expire hoti hai aur thousands of concurrent requests ek sath database par hammer karti hain",
        },
        {
          en: "When Redis cables physically catch fire due to excessive heat",
          hi: "Jab server physically overheat ho jata hai",
        },
        {
          en: "When all clients delete their accounts simultaneously",
          hi: "Jab saare users ek sath account delete kar dein",
        },
        {
          en: "When memory keys duplicate exponentially until hard drives crash",
          hi: "Jab keys bina wajah duplicate hoti hain",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Cache Stampede happens when a high-traffic key expires, causing all incoming requests to simultaneously query the database, crashing it. Mutual exclusion locks or probabilistic early expiration prevent this.",
        hi: "Cache Stampede tab hota hai jab hot key expire hote hi saari concurrent requests MongoDB ko ek sath hit karke crash kar deti hain.",
      },
    },
    {
      q: {
        en: "Which eviction policy instructs Redis to discard the Least Recently Used keys among those with an expiration set?",
        hi: "Kaun si eviction policy Redis ko sirf un keys mein se Least Recently Used data remove karne ko kehti hai jinme expiry set hai?",
      },
      question: {
        en: "Which eviction policy instructs Redis to discard the Least Recently Used keys among those with an expiration set?",
        hi: "Kaun si eviction policy Redis ko sirf un keys mein se Least Recently Used data remove karne ko kehti hai jinme expiry set hai?",
      },
      options: [
        { en: "volatile-lru", hi: "volatile-lru" },
        { en: "noeviction", hi: "noeviction" },
        { en: "allkeys-random", hi: "allkeys-random" },
        { en: "destroy-all", hi: "destroy-all" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'volatile-lru' evicts least recently used keys out of the keys that have an expiration set. 'allkeys-lru' considers all keys.",
        hi: "'volatile-lru' sirf un keys mein se purana data remove karta hai jinpar expiration (TTL) set hoti hai.",
      },
    },
    {
      q: {
        en: "Which mechanism allows Redis to persist in-memory data to disk asynchronously without blocking the event loop?",
        hi: "Redis bina event loop ko block kiye in-memory data ko disk par persist karne ke liye kaun sa mechanism use karta hai?",
      },
      question: {
        en: "Which mechanism allows Redis to persist in-memory data to disk asynchronously without blocking the event loop?",
        hi: "Redis bina event loop ko block kiye in-memory data ko disk par persist karne ke liye kaun sa mechanism use karta hai?",
      },
      options: [
        {
          en: "RDB (Redis Database snapshots using fork) and AOF (Append Only File)",
          hi: "RDB (Background fork snapshots) aur AOF (Append Only File)",
        },
        {
          en: "Writing every transaction to floppy disks via synchronous interrupts",
          hi: "Synchronous interrupts se floppy disk mein likhna",
        },
        {
          en: "Sending email attachments of memory dumps",
          hi: "Memory dump email karna",
        },
        {
          en: "Pausing the server for 30 minutes every hour",
          hi: "Har ghante server ko 30 minute pause karna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Redis uses BGSAVE (forking a child process using Copy-On-Write to generate RDB snapshots) and AOF (appending write commands in the background) for persistence.",
        hi: "Redis BGSAVE fork method (RDB) aur Append-Only File (AOF) ke zariye background mein data save karta hai bina main loop ko roke.",
      },
    },
    {
      q: {
        en: "How can Redis be used to implement an Express API rate limiter for IP addresses?",
        hi: "Redis ke zariye Express API par IP address rate limiting kaise implement ki ja sakti hai?",
      },
      question: {
        en: "How can Redis be used to implement an Express API rate limiter for IP addresses?",
        hi: "Redis ke zariye Express API par IP address rate limiting kaise implement ki ja sakti hai?",
      },
      options: [
        {
          en: "Using INCR on the IP key and setting a TTL window; block if count exceeds threshold",
          hi: "IP key par INCR command chala kar TTL window set karein; limit cross hone par block karein",
        },
        {
          en: "By deleting the client's router via an administrative script",
          hi: "Client ke router ko remote command se delete karke",
        },
        {
          en: "By shutting down the Express server on every 10th request",
          hi: "Har 10th request par server band karke",
        },
        {
          en: "By asking users to solve a physical puzzle by postal mail",
          hi: "Users se postal mail par puzzle mangwa kar",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "By incrementing an IP-keyed counter (INCR ip:127.0.0.1) with an expiration of 60s, requests exceeding the threshold (e.g., 100) are rejected with HTTP 429 Too Many Requests.",
        hi: "Redis counter (INCR) aur 60-second TTL se exact count track hota hai, aur limit exceed hone par 429 status code de diya jata hai.",
      },
    },
    {
      q: {
        en: "Why is Redis preferred over in-memory JavaScript objects (like global Map) for multi-instance production servers?",
        hi: "Production mein multiple server instances ke liye JavaScript in-memory Map ke mukable Redis kyun preferred hai?",
      },
      question: {
        en: "Why is Redis preferred over in-memory JavaScript objects (like global Map) for multi-instance production servers?",
        hi: "Production mein multiple server instances ke liye JavaScript in-memory Map ke mukable Redis kyun preferred hai?",
      },
      options: [
        {
          en: "Redis provides a centralized, shared cache accessible across all clustered Node.js worker processes",
          hi: "Redis ek centralized shared cache provide karta hai jo saare clustered Node.js instances ke beech share hota hai",
        },
        {
          en: "JavaScript objects cannot hold strings longer than 10 characters",
          hi: "JavaScript objects 10 character se bada string store nahi kar sakte",
        },
        {
          en: "Redis consumes zero megabytes of host RAM",
          hi: "Redis bilkul RAM consume nahi karta",
        },
        {
          en: "In-memory objects disable the V8 JavaScript compiler",
          hi: "In-memory objects V8 compiler ko band kar dete hain",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "In a clustered or multi-server environment, in-memory JS objects exist in isolated process memories. Redis provides a single centralized source of truth across all servers.",
        hi: "Local JS Map sirf ek server process mein rehta hai; clustered environment mein Redis centralized source of truth banta hai.",
      },
    },
    {
      q: {
        en: "Which Redis command retrieves all fields and values stored in a Hash data structure?",
        hi: "Redis Hash ke saare fields aur values ek sath fetch karne ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "Which Redis command retrieves all fields and values stored in a Hash data structure?",
        hi: "Redis Hash ke saare fields aur values ek sath fetch karne ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "HGETALL key", hi: "HGETALL key" },
        { en: "GETALL key", hi: "GETALL key" },
        { en: "HASH FETCH key", hi: "HASH FETCH key" },
        { en: "SELECT ALL FROM key", hi: "SELECT ALL FROM key" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "HGETALL returns all field-value pairs stored in the specified Hash. For individual fields, HGET or HMGET are used.",
        hi: "HGETALL kisi bhi Hash ke saare key-value pairs ek sath return karta hai.",
      },
    },
    {
      q: {
        en: "What is the recommended Redis command to safely iterate through millions of keys without freezing the server?",
        hi: "Server ko freeze kiye bina lakho keys ko safely browse karne ke liye kaun sa command use karna chahiye?",
      },
      question: {
        en: "What is the recommended Redis command to safely iterate through millions of keys without freezing the server?",
        hi: "Server ko freeze kiye bina lakho keys ko safely browse karne ke liye kaun sa command use karna chahiye?",
      },
      options: [
        { en: "SCAN (cursor-based iteration)", hi: "SCAN (cursor-based iteration)" },
        { en: "KEYS * (blocking pattern scan)", hi: "KEYS * (blocking pattern scan)" },
        { en: "FLUSHALL", hi: "FLUSHALL" },
        { en: "CRASH NOW", hi: "CRASH NOW" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'KEYS *' blocks the single-threaded server until every key is inspected, causing outages in production. 'SCAN' incrementally iterates with a cursor safely.",
        hi: "Production mein 'KEYS *' kabhi use na karein kyunki yeh server freeze karta hai; hamesha cursor-based 'SCAN' use karein.",
      },
    },
    {
      q: {
        en: "Which Redis feature allows asynchronous messaging where publishers send messages to channels and subscribers listen?",
        hi: "Redis ka kaun sa feature pub-sub messaging provide karta hai jisme publisher channel par message bhejta hai?",
      },
      question: {
        en: "Which Redis feature allows asynchronous messaging where publishers send messages to channels and subscribers listen?",
        hi: "Redis ka kaun sa feature pub-sub messaging provide karta hai jisme publisher channel par message bhejta hai?",
      },
      options: [
        { en: "Pub/Sub (PUBLISH & SUBSCRIBE)", hi: "Pub/Sub (PUBLISH & SUBSCRIBE)" },
        { en: "FTP File Sync", hi: "FTP File Sync" },
        { en: "Direct Mail Gateway", hi: "Direct Mail Gateway" },
        { en: "HTTP Webhooks Only", hi: "HTTP Webhooks Only" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Redis Pub/Sub provides low-latency, real-time message broadcasting across connected subscribers using PUBLISH and SUBSCRIBE commands.",
        hi: "Redis Pub/Sub feature PUBLISH aur SUBSCRIBE commands ke zariye instant real-time message distribution karta hai.",
      },
    },
    {
      q: {
        en: "What is the role of Redis Sentinel in a production high-availability deployment?",
        hi: "Production high-availability setup mein Redis Sentinel ka kya role hota hai?",
      },
      question: {
        en: "What is the role of Redis Sentinel in a production high-availability deployment?",
        hi: "Production high-availability setup mein Redis Sentinel ka kya role hota hai?",
      },
      options: [
        {
          en: "Monitors master/replica health and automatically promotes a replica to master if the master fails (automatic failover)",
          hi: "Master/replica ki health monitor karna aur master down hone par replica ko master promote karna (automatic failover)",
        },
        {
          en: "Compresses images uploaded by frontend users",
          hi: "Frontend images ko compress karna",
        },
        {
          en: "Changes the background color of the Redis CLI terminal",
          hi: "Terminal ka background color change karna",
        },
        {
          en: "Deletes all database records every 24 hours",
          hi: "Har 24 ghante mein database delete karna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Redis Sentinel provides monitoring, notification, and automatic failover, ensuring zero downtime if the primary master crashes.",
        hi: "Redis Sentinel high availability provide karta hai; master crash hote hi automatic failover karke replica ko master bana deta hai.",
      },
    },
    {
      q: {
        en: "Which npm package is the official, recommended modern client for connecting Node.js to Redis?",
        hi: "Node.js ko Redis se connect karne ke liye modern recommended official npm package kaun sa hai?",
      },
      question: {
        en: "Which npm package is the official, recommended modern client for connecting Node.js to Redis?",
        hi: "Node.js ko Redis se connect karne ke liye modern recommended official npm package kaun sa hai?",
      },
      options: [
        { en: "redis (v4+ with native Promise support)", hi: "redis (v4+ with native Promise support)" },
        { en: "old-callback-redis-v1", hi: "old-callback-redis-v1" },
        { en: "jquery-redis", hi: "jquery-redis" },
        { en: "express-cookie-jar", hi: "express-cookie-jar" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "The official 'redis' npm package (or 'ioredis') provides modern async/await promise support, connection pooling, and clustering capabilities.",
        hi: "Official 'redis' npm package modern Promises aur async/await natively support karta hai.",
      },
    },
    {
      q: {
        en: "In a Redis-backed session store, what key benefit does TTL offer for user security?",
        hi: "Redis-backed session store mein TTL user security ke liye kya main fayda deta hai?",
      },
      question: {
        en: "In a Redis-backed session store, what key benefit does TTL offer for user security?",
        hi: "Redis-backed session store mein TTL user security ke liye kya main fayda deta hai?",
      },
      options: [
        {
          en: "Automatically expires and destroys stale sessions without needing a manual background database cleanup cron job",
          hi: "Purani inactive sessions ko automatically expire kar deta hai bina kisi manual cron job ke",
        },
        {
          en: "Encrypts user passwords with 1024-bit quantum keys",
          hi: "Passwords ko quantum keys se encrypt karna",
        },
        {
          en: "Prevents users from typing numbers in passwords",
          hi: "Users ko password mein number daalne se rokna",
        },
        {
          en: "Sends an SMS on every mouse click",
          hi: "Har mouse click par SMS bhejna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Redis TTL handles session lifecycle automatically; once the inactivity window passes, Redis purges the session token instantly.",
        hi: "TTL ke sath inactive sessions automatically destroy ho jati hain, jisse stale token hijack hone ka risk khatam ho jata hai.",
      },
    },
    {
      q: {
        en: "What is the primary difference between Redis RDB snapshots and AOF (Append-Only File)?",
        hi: "Redis RDB snapshots aur AOF (Append-Only File) ke beech primary difference kya hai?",
      },
      question: {
        en: "What is the primary difference between Redis RDB snapshots and AOF (Append-Only File)?",
        hi: "Redis RDB snapshots aur AOF (Append-Only File) ke beech primary difference kya hai?",
      },
      options: [
        {
          en: "RDB creates periodic point-in-time compact binary snapshots; AOF logs every single write command sequentially for near-zero data loss",
          hi: "RDB periodic compact snapshots leta hai; AOF har write command ko sequentially log karta hai taaki data loss na ho",
        },
        {
          en: "RDB is for audio files while AOF is for video files",
          hi: "RDB audio files ke liye hai aur AOF video ke liye",
        },
        {
          en: "RDB runs on Windows only while AOF runs on macOS only",
          hi: "RDB sirf Windows par chalta hai aur AOF sirf Mac par",
        },
        {
          en: "There is no difference, both are identical text files",
          hi: "Dono mein koi difference nahi hai",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "RDB offers compact, fast disaster recovery backups at intervals (e.g., every 15 min), while AOF provides maximum durability by logging write commands as they arrive.",
        hi: "RDB compact binary backup hota hai jo fast restart deta hai; AOF har write ko log karta hai jisse crash hone par bhi data loss nahi hota.",
      },
    },
    {
      q: {
        en: "When scaling an Express API to 10 instances behind a load balancer, how does Redis maintain consistency for WebSocket chat rooms?",
        hi: "Load balancer ke peeche 10 Express instances chalane par Redis WebSocket chat rooms mein consistency kaise banata hai?",
      },
      question: {
        en: "When scaling an Express API to 10 instances behind a load balancer, how does Redis maintain consistency for WebSocket chat rooms?",
        hi: "Load balancer ke peeche 10 Express instances chalane par Redis WebSocket chat rooms mein consistency kaise banata hai?",
      },
      options: [
        {
          en: "By acting as a Redis Pub/Sub adapter, broadcasting socket events to all 10 servers so users on different nodes receive messages",
          hi: "Redis Pub/Sub adapter ke roop mein kaam karke sabhi 10 servers tak socket messages broadcast karta hai",
        },
        {
          en: "By merging all 10 servers into a single physical computer",
          hi: "Saare 10 servers ko ek hi computer mein jod kar",
        },
        {
          en: "By terminating WebSocket connections after 1 message",
          hi: "Ek message ke baad connection kaat kar",
        },
        {
          en: "By saving chats as text files on the client desktop",
          hi: "Chats ko client desktop par save karke",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Socket.IO with the @socket.io/redis-adapter leverages Redis Pub/Sub so that when User A on Server 1 sends a message, it is broadcast to User B connected to Server 10.",
        hi: "Socket.IO Redis Adapter Redis Pub/Sub use karta hai taaki alag-alag server instances par connected users aapas mein real-time chat kar sakein.",
      },
    },
  ],
};
