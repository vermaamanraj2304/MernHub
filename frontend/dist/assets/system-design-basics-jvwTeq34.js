const e={id:"int-system-design-basics",title:{en:"Full-Stack System Design Basics (Load Balancer, Caching, DB)",hi:"Full-Stack System Design Basics (Junior to Mid Level)"},difficulty:"Advanced",readTime:16,sections:[{type:"concept",heading:{en:"1. The Full-Stack System Design Mental Model",hi:"1. Full-Stack System Design Ka Mental Model: Junior Se Mid-Level Tak"},body:{en:`In full-stack engineering interviews, System Design questions test your ability to transform a business requirement into a **scalable, fault-tolerant, and cost-effective distributed architecture**. Junior-to-mid level interviewers do not expect you to design Netflix's global multi-region CDN on day one; they evaluate whether you understand **where bottlenecks occur** and how to resolve them using standard architectural primitives.

### The 3 Core Tenets of System Design:
1. **Scalability**: Can the system handle a 100x increase in concurrent traffic or data volume without collapsing?
2. **Reliability & Availability**: If an individual server, database node, or third-party API crashes, does the application remain operational (High Availability)?
3. **Latency & Performance**: Does the API respond within acceptable thresholds (e.g. p95 < 200ms) under heavy peak load?`,hi:`System Design interviews mein ye dekha jata hai ki kya aap ek simple web app ko 1 lakh ya 10 lakh concurrent users ke liye scale kar sakte hain ya nahi:

### 3 Mukhya Siddhant:
1. **Scalability**: Traffic 100x badhne par kya server bina crash hue sambhal sakta hai?
2. **High Availability**: Agar ek server ya database node band ho jaye, toh kya users ke liye service chalti rahegi?
3. **Latency**: Peak load ke waqt bhi kya API response fast (under 200ms) aata hai?`}},{type:"concept",heading:{en:"2. The Anatomy of a High-Scale MERN Architecture",hi:"2. High-Scale MERN Architecture Ka Poora Blueprint"},body:{en:`A production-ready distributed MERN application is structured across 5 distinct tiers:

\`\`\`
[Clients: Mobile / Web]
         │ HTTPS
         ▼
[1. CDN Edge Layer (Cloudflare / CloudFront)] ──> Serves static JS/CSS/Images at edge
         │ Dynamic API Requests
         ▼
[2. Reverse Proxy & Load Balancer (Nginx / AWS ALB)] ──> SSL Termination, Rate Limiting
         │ Round-Robin / Least Connections
   ┌─────┴─────────────────────────┐
   ▼                               ▼
[Node.js App Server 1]     [Node.js App Server 2] (Stateless Containers)
   │                               │
   ├───────────────┬───────────────┤
   ▼               ▼               ▼
[3. Distributed Cache]   [4. Message Queue]    [5. Primary Database]
  (Redis Cluster)          (BullMQ / Redis)       (MongoDB Replica Set)
  - Sessions               - Emails / SMS         - Master (Writes)
  - Hot API data           - Image Transcoding    - Secondaries (Reads)
\`\`\`

### Key Architectural Rules:
- **Stateless Application Servers**: App servers must never store sessions or files locally on their ephemeral disk. All sessions reside in Redis; all uploads reside in Cloud Storage (S3 / Cloudinary).
- **Read/Write Separation**: Route writes to MongoDB Primary, route heavy analytical or read-only queries to Secondaries.`,hi:`Production MERN architecture in 5 tiers mein banta hota hai:

1. **CDN Edge Layer**: Static files (React HTML, CSS, images) ko user ke nazdeek se deliver karta hai.
2. **Load Balancer (Nginx/ALB)**: Traffic ko multiple Node.js instances ke beech baant-ta hai aur SSL terminate karta hai.
3. **Stateless App Servers**: Node.js servers par koi session ya local file save nahi hoti; sab stateless containers hote hain.
4. **Redis Cache & Queue**: Sessions aur fast data Redis mein rehte hain; heavy jobs (emails, processing) BullMQ queue mein jate hain.
5. **MongoDB Replica Set**: Primary node par writes aur Secondary nodes par reads route hote hain.`}},{type:"analogy",heading:{en:"Real-Life Analogy: The Mumbai Municipal Corporation Water Supply Network",hi:"Real-Life Analogy: Mumbai Ka Water Supply Network (Caching & Load Balancing)"},body:{en:`Understanding distributed caching and database offloading through Mumbai's water supply:

- **The Primary Database (Bhatsa Dam / Main Central Reservoir)**:
  Located 100km away outside the city. It holds the authoritative master water supply (Persistent disk storage).
  *Problem*: If every citizen in Mumbai opened their kitchen tap and water had to travel 100km directly from the Dam through a single pipe, the pipe would burst and pressure would drop to zero!
- **The Distributed Cache (Overhead Building Rooftop Water Tanks - Redis)**:
  Every apartment building maintains a local rooftop water tank.
  When you open your kitchen tap, water flows instantly from the rooftop tank in 1 second (**Cache HIT**).
  Only once a day does a pump fetch water from the main city pipeline to refill the tank (**Cache Invalidation / Write-Through**).
- **The Browser Cache (The Water Filter in Your Kitchen Sink)**:
  The purified water already inside your water bottle on the table. Instant access with zero pipe travel.
- **The Load Balancer (The Central Pressure Regulator Valves)**:
  Directs water volume evenly across different neighborhoods so South Mumbai doesn't flood while Bandra suffers a drought.`,hi:`Mumbai ke water supply network ka example dekhein:

- **Database (Main Dam / Reservoir)**:
  100km door bana main dam. Agar har aadmi kitchen ka nal kholte hi direct dam se paani mangwayega, toh pipe phat jayega aur server crash ho jayega.
- **Redis Cache (Building Ka Rooftop Water Tank)**:
  Building ki chhat par rakha tank. Nal kholte hi 1 second mein paani mil jata hai (**Cache HIT**). Dam se paani sirf tab mangwaya jata hai jab chhat ka tank khali ho.
- **Browser Cache (Kitchen Ka Water Purifier)**:
  Aapke kitchen table par rakhi bottle jo bina kisi pipe ke instant paani deti hai.
- **Load Balancer (Pressure Control Valves)**:
  Paani ke dabav ko har gali mein barabar baant-ta hai taaki ek ilaqe mein flood aur doosre mein sookha na pade.`}},{type:"syntax",heading:{en:"Distributed Caching: The Cache-Aside Pattern with Redis",hi:"Distributed Caching: Redis Ke Saath Cache-Aside Pattern Ka Implementation"},body:{en:`The **Cache-Aside (Lazy Loading)** pattern is the most common caching pattern for web applications:
1. Application receives a read request.
2. Checks Redis cache.
3. If **Cache HIT**: Returns data immediately from Redis ($< 2ms$).
4. If **Cache MISS**: Queries MongoDB ($> 50ms$), writes the result into Redis with a **TTL (Time-To-Live)**, and returns data to the client.

\`\`\`javascript
// services/cacheService.js
import { createClient } from 'redis';

const redisClient = createClient({ url: process.env.REDIS_URL });
await redisClient.connect();

/**
 * High-performance Cache-Aside wrapper
 * @param {string} key - Cache key
 * @param {number} ttlSeconds - Expiration time
 * @param {Function} fetchFn - DB fallback query
 */
export async function getOrSetCache(key, ttlSeconds, fetchFn) {
  try {
    // 1. Check Redis
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (err) {
    console.warn('[Redis Read Failure, falling back to DB]:', err.message);
  }

  // 2. Fetch from database
  const freshData = await fetchFn();

  // 3. Populate Redis asynchronously with TTL
  if (freshData) {
    try {
      await redisClient.setEx(key, ttlSeconds, JSON.stringify(freshData));
    } catch (err) {
      console.warn('[Redis Write Failure]:', err.message);
    }
  }

  return freshData;
}
\`\`\``,hi:`### Cache-Aside (Lazy Loading) Pattern:
1. Pehle Redis mein check karein.
2. Agar data mila (**Cache HIT**), toh direct return karein (1ms response).
3. Agar data nahi mila (**Cache MISS**), toh MongoDB se laayein, Redis mein TTL ke saath save karein, aur return karein.`}},{type:"example",heading:{en:"Example 1: Designing a Scalable URL Shortener (TinyURL)",hi:"Example 1: Scalable URL Shortener (TinyURL) Ka Complete System Design"},body:{en:`A classic interview question: *"Design a service like bit.ly or TinyURL that handles 100M new URLs per month and 1B redirects per month."*

### 1. Requirements & Scale Estimation:
- **Write Traffic**: 100M URLs / month $\\approx$ 40 writes / sec.
- **Read Traffic (Redirects)**: 1B redirects / month $\\approx$ 400 reads / sec (10:1 Read-to-Write ratio).
- **Storage**: 500 bytes per URL $\\times$ 100M $\\times$ 12 months $\\times$ 5 years $\\approx$ 3 Terabytes.

### 2. URL Shortening Algorithm: Base62 Encoding
Instead of random hashing (which causes hash collisions), use a distributed auto-incrementing ID generator (or Snowflake ID) converted to Base62 (\`[0-9, a-z, A-Z]\`):
- A 7-character Base62 string yields $62^7 \\approx 3.5$ Trillion unique URLs!

\`\`\`javascript
// utils/base62.js
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BigInt(ALPHABET.length);

export function encodeBase62(num) {
  let n = BigInt(num);
  if (n === 0n) return ALPHABET[0];
  let str = '';
  while (n > 0n) {
    str = ALPHABET[Number(n % BASE)] + str;
    n = n / BASE;
  }
  return str;
}
\`\`\`

### 3. High-Performance Redirect Controller with Redis Caching:
\`\`\`javascript
// controllers/redirectController.js
export async function handleRedirect(req, res) {
  const { code } = req.params;

  // Step 1: Query ultra-fast Redis cache
  const cachedUrl = await redisClient.get(\`url:\${code}\`);
  if (cachedUrl) {
    // 302 Temporary Redirect preserves analytics; 301 Permanent Redirect allows browser caching
    return res.redirect(302, cachedUrl);
  }

  // Step 2: Fall back to MongoDB (indexed on 'shortCode')
  const record = await UrlMapping.findOne({ shortCode: code }).lean();
  if (!record) {
    return res.status(404).json({ error: 'Short URL not found or expired' });
  }

  // Step 3: Populate Redis with 24-hour TTL
  await redisClient.setEx(\`url:\${code}\`, 86400, record.originalUrl);

  // Step 4: Asynchronously queue click analytics counter to avoid blocking redirect
  analyticsQueue.add('trackClick', { shortCode: code, ip: req.ip, userAgent: req.headers['user-agent'] });

  return res.redirect(302, record.originalUrl);
}
\`\`\``,hi:`TinyURL System Design ka solution:
- **Base62 Encoding**: \`[0-9, a-z, A-Z]\` ke 7 characters use karke 3.5 Trillion unique links bante hain.
- **Redis Cache**: 90% traffic hot links par hota hai. Redis se redirect 302 bhejne se database par zero load padta hai.
- **Async Analytics**: Click count update karne ke liye request ko slow na karein; BullMQ queue mein background event daal dein.`}},{type:"example",heading:{en:"Example 2: Asynchronous Workloads via BullMQ Message Queue",hi:"Example 2: Heavy Tasks Ke Liye BullMQ Message Queue Architecture"},body:{en:`When a user uploads a profile picture or registers, never perform image transcoding or welcome email delivery synchronously inside the Express request-response cycle. Offload it to a background worker queue:

\`\`\`javascript
// queues/emailQueue.js
import { Queue, Worker } from 'bullmq';
import nodemailer from 'nodemailer';

const connection = { host: '127.0.0.1', port: 6379 };

// 1. Producer Queue (Mounted in Express Controller)
export const emailQueue = new Queue('emailNotificationQueue', { connection });

// 2. Controller adds job and responds immediately (< 10ms)
export async function registerUserController(req, res) {
  const user = await User.create(req.body);

  // Enqueue background email job with automatic retries and exponential backoff
  await emailQueue.add(
    'sendWelcomeEmail',
    { email: user.email, name: user.name },
    {
      attempts: 5,
      backoff: { type: 'exponential', delay: 3000 },
      removeOnComplete: true,
    }
  );

  res.status(201).json({ success: true, message: 'User registered successfully!' });
}

// 3. Independent Background Worker Process (Runs on separate worker container)
export const emailWorker = new Worker(
  'emailNotificationQueue',
  async (job) => {
    console.log(\`Processing job \${job.id} for: \${job.data.email}\`);
    await sendActualEmail(job.data.email, job.data.name);
    console.log(\`Job \${job.id} completed!\`);
  },
  { connection, concurrency: 10 }
);
\`\`\``,hi:"Registration ke waqt welcome email bhejna ya video process karna synchronous HTTP request mein nahi hona chahiye. Express turant response deta hai aur task ko BullMQ queue mein daal deta hai. Alag worker process background mein us job ko execute karta hai with automatic retries."}},{type:"example",heading:{en:"Example 3: Horizontal Pod Autoscaling (HPA) & Load Balancing",hi:"Example 3: Load Balancing Algorithms Aur Horizontal Auto-scaling"},body:{en:`### Load Balancing Algorithms Comparison:
| Algorithm | How it Works | Best Used When... |
|---|---|---|
| **Round Robin** | Distributes requests sequentially: 1, 2, 3, 1, 2, 3... | All backend servers have identical hardware and request workloads are uniform. |
| **Least Connections** | Routes request to the server with the fewest active TCP connections. | Requests have varying processing durations (e.g. some take 2ms, others take 500ms). |
| **IP Hash** | Computes a hash of the client's IP to map to a specific server. | Sticky sessions are required (though Redis session store is vastly superior). |
| **Weighted Round Robin** | Allocates higher request ratios to servers with more CPU/RAM capacity. | Heterogeneous server fleets (e.g. 4-core servers mixed with 16-core servers). |

### Nginx Layer 7 Reverse Proxy Configuration:
\`\`\`nginx
upstream node_backend_cluster {
    least_conn; # Route to server with fewest active connections
    server app-node-1:5000 max_fails=3 fail_timeout=10s;
    server app-node-2:5000 max_fails=3 fail_timeout=10s;
    server app-node-3:5000 max_fails=3 fail_timeout=10s;
    keepalive 64; # Re-use established TCP sockets
}

server {
    listen 80;
    server_name api.myservice.com;

    location / {
        proxy_pass http://node_backend_cluster;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
\`\`\``,hi:`Load Balancer algorithms:
- **Round Robin**: Baari-baari sabko request bhejta hai.
- **Least Connections**: Jis server ke paas sabse kam active connections hain wahan request bhejta hai (best for variable workloads).
- **IP Hash**: Ek IP hamesha ek hi server par jaati hai.`}},{type:"mistakes",heading:{en:"Classic System Design Failure Modes",hi:"System Design Ki 4 Badi Failure Modes Aur Unka Bachav"},body:{en:`### 1. The Cache Stampede (Dogpiling / Thundering Herd)
- **Problem**: A high-frequency cache key expires (TTL reaches zero). Suddenly, 50,000 concurrent user requests experience a **Cache MISS at the exact same millisecond**. All 50,000 requests hit the primary MongoDB database simultaneously, instantly exhausting the connection pool and crashing the database!
- **Fix**:
  1. **Mutex Lock / SingleFlight**: The first request acquires a distributed lock in Redis to recompute the cache; all other 49,999 requests wait for the lock or receive stale data.
  2. **Probabilistic Early Expiration (XFetch)**: Recompute the cache in the background slightly before it officially expires.

### 2. Single Point of Failure (SPOF)
- **Problem**: Deploying a single primary database without replicas, or a single Redis server without Sentinel/Cluster. If that machine reboots, 100% of the platform goes dark.
- **Fix**: Redundancy at every layer: Multi-AZ MongoDB replica sets (minimum 3 nodes), Redis Sentinel with automated failover, and multi-instance stateless web servers behind an ALB.

### 3. Storing Ephemeral State on Application Containers
- **Problem**: Saving uploaded files to \`./uploads/\` on the Node.js local disk or storing session variables in in-memory JavaScript objects (\`const sessions = {}\`).
- **Consequence**: When the auto-scaler terminates or spawns containers, user sessions are wiped out and uploaded files vanish!
- **Fix**: Stateless containers: Always store sessions in Redis and assets in Amazon S3 or Cloudinary.`,hi:`### 1. Cache Stampede (Thundering Herd):
Popular cache key expire hote hi 10,000 requests ek saath database par toot padti hain aur DB crash ho jata hai. Redis mutex lock ya background early re-computation se ise rokein.

### 2. Single Point of Failure (SPOF):
Sirf ek database machine rakhna. Agar wo restart hui toh poori app band. Hamesha minimum 3 nodes ka replica set rakhein.

### 3. Server Par Local Files / Session Rakhna:
Stateless architecture follow karein: Sessions hamesha Redis mein aur files S3 par rakhein.`}},{type:"best-practices",heading:{en:"Production Architecture Best Practices",hi:"Production System Architecture Best Practices"},body:{en:"1. **Rate Limiting with Sliding Window Counter**: Protect public endpoints against DDoS and credential-stuffing attacks using Redis sliding window rate limiters.\n2. **Circuit Breaker Pattern**: If a downstream service (e.g. payment gateway or SMS provider) is failing or timing out, trip the circuit breaker to fail fast immediately rather than queuing up thousands of hanging TCP sockets.\n3. **Graceful Degradation**: If Redis goes down, gracefully fall back to the primary database; if search indexing is slow, display cached static results rather than a 500 error page.\n4. **Health Check Endpoints**: Provide `/health/live` (is the process alive?) and `/health/ready` (are database and Redis connections established?) so load balancers can route around unhealthy pods.\n5. **Database Connection Pooling**: Ensure the total connection pool of all clustered Node instances ($Instances \\times maxPoolSize$) does not exceed MongoDB's maximum connection limit.",hi:`1. **Rate Limiting**: Sliding window algorithm se brute-force aur bot attacks ko rokein.
2. **Circuit Breaker**: Downstream API fail hone par turant fail-fast karein taaki threads hang na hon.
3. **Graceful Degradation**: Agar cache fail ho jaye toh database se data dein, user ko error na dikhayein.
4. **Health Checks**: \`/health/ready\` endpoint banayein taaki load balancer sirf swasth instances ko traffic bheje.`}},{type:"interview",heading:{en:"Top 15 System Design Interview Questions Bank",hi:"Top 15 Full-Stack System Design Interview Questions Bank"},body:{en:`### Q1: What is the CAP Theorem and how does it apply to modern web applications?
**Answer**: The CAP Theorem states that a distributed data store can guarantee at most **two out of three** properties simultaneously in the presence of a network partition:
- **Consistency (C)**: Every read receives the most recent write or an error.
- **Availability (A)**: Every non-failing node returns a non-error response, without guaranteeing it contains the most recent write.
- **Partition Tolerance (P)**: The system continues to operate despite arbitrary message loss or network communication failure between nodes.
Since network partitions are inevitable in real-world distributed networks (**P is non-negotiable**), distributed databases must choose between **CP** (e.g. MongoDB with majority write concern, preferring consistency over availability during split-brain) or **AP** (e.g. Cassandra, DynamoDB, preferring availability with eventual consistency).

---

### Q2: What is the difference between Vertical Scaling and Horizontal Scaling?
**Answer**:
- **Vertical Scaling (Scale Up)**: Adding more compute power (more CPU cores, more RAM, faster NVMe SSDs) to an existing single server machine.
  - *Pros*: Simple, no architectural changes required, zero distributed data sync overhead.
  - *Cons*: Hard physical hardware ceiling, exponentially increasing costs, introduces a Single Point of Failure.
- **Horizontal Scaling (Scale Out)**: Adding more machine instances to your resource pool (e.g. running 10 commodity servers behind a load balancer).
  - *Pros*: Virtually unlimited scaling ceiling, high fault tolerance (any node can fail), cost-effective commodity hardware.
  - *Cons*: Requires stateless application architecture, load balancers, distributed caching, and database replication/sharding.

---

### Q3: How do Layer 4 and Layer 7 Load Balancers differ?
**Answer**:
- **Layer 4 (Transport Layer - TCP/UDP)**: Routes traffic based on IP address and TCP/UDP port without inspecting the message contents or payload. Ultra-fast and computationally lightweight because it does not decrypt or parse packets (e.g., AWS Network Load Balancer).
- **Layer 7 (Application Layer - HTTP/HTTPS)**: Inspects the actual HTTP payload, including headers, cookies, URL paths, and query parameters. Enables intelligent routing (e.g., routing \`/api/video/*\` to a video streaming cluster and \`/api/auth/*\` to an authentication cluster), SSL termination, and cookie-based sticky routing (e.g., AWS Application Load Balancer, Nginx).

---

### Q4: Explain the difference between Cache-Aside, Write-Through, and Write-Back caching strategies.
**Answer**:
- **Cache-Aside (Lazy Loading)**: The application code reads from cache; on miss, it reads from DB and writes to cache. Writes go directly to the DB, and the cache entry is invalidated or updated. Most common and resilient.
- **Write-Through**: The application writes data to the cache, and the cache immediately writes synchronously to the database before acknowledging success. Guarantees consistency, but introduces write latency.
- **Write-Back (Write-Behind)**: The application writes to the cache, which acknowledges immediately. The cache queues the writes and updates the database asynchronously in batches. Ultra-fast writes, but risks data loss if the cache crashes before flushing to disk.

---

### Q5: What is the difference between Database Sharding and Database Partitioning?
**Answer**:
- **Database Partitioning (Vertical / Horizontal)**: Splitting a large table into smaller distinct subsets within the **same single database instance** (e.g., partitioning a sales table by year).
- **Database Sharding**: A form of horizontal partitioning where data subsets are distributed **across multiple separate physical server machines or database clusters**. Each shard holds a unique subset of data identified by a Shard Key.

---

### Q6: How do you design an Idempotent API?
**Answer**: An idempotent API operation produces the exact same server state regardless of whether it is called once or 100 times with identical inputs (e.g. \`GET\`, \`PUT\`, \`DELETE\` are idempotent by HTTP specification; \`POST\` is not).
**Making POST Idempotent**:
1. Client generates a unique **Idempotency Key** (UUID v4) and passes it in the header: \`Idempotency-Key: 7b8c8d32-...\`.
2. Server checks Redis for the key:
   - If key exists and processing is complete, return the cached previous response.
   - If key exists and is in-flight, return \`409 Conflict\` or wait.
   - If key does not exist, acquire a distributed lock, execute the operation inside a DB transaction, cache the response in Redis for 24h, and return.

---

### Q7: What is the Database Connection Pool Exhaustion problem and how is it mitigated?
**Answer**: Each database connection maintains an open TCP socket and consumes RAM/threads on the database server (MongoDB/PostgreSQL typically max out around 1,000–5,000 connections). If you horizontally scale to 50 serverless container instances where each instance sets \`maxPoolSize: 100\`, a traffic surge causes 5,000 connections, crashing the database engine.
**Mitigation**:
1. Implement a database connection proxy (e.g. AWS RDS Proxy, Prisma Accelerate, or PgBouncer).
2. Right-size client connection pool limits (\`maxPoolSize: 10-20\` per instance).
3. Use Redis caching to eliminate 80%+ of direct database read queries.

---

### Q8: What is Database Read-Replication Lag and how do you handle it?
**Answer**: In asynchronous replication, changes committed on the Primary take a few milliseconds to seconds to replicate to Secondaries. If a user updates their profile and immediately refreshes the page, routing the read to a lagging Secondary returns the old profile (**Read-Your-Own-Writes inconsistency**).
**Solutions**:
1. **Read-After-Write Consistency**: Route reads for the specific updating user to the Primary for 5–10 seconds following a mutation, while routing other users' reads to Secondaries.
2. Use strong consistency read concerns (\`readConcern: "linearizable"\` or \`"majority"\`) when freshness is mandatory.

---

### Q9: How does a Content Delivery Network (CDN) work?
**Answer**: A CDN is a geographically distributed network of proxy Edge Servers (PoPs - Points of Presence). When a user in Delhi requests a static asset (e.g. \`bundle.js\` or an image):
1. Anycast DNS routes the request to the nearest edge PoP in Mumbai or Delhi.
2. If the edge has the file cached, it serves it in < 15ms (**Edge Cache HIT**).
3. If not cached, the edge fetches it from the origin server (S3 bucket or App Server), caches it based on \`Cache-Control: max-age=31536000, immutable\`, and delivers it to the user.

---

### Q10: What is a Message Queue and why is it preferred over synchronous HTTP calls for microservice communication?
**Answer**: A Message Queue (RabbitMQ, Kafka, BullMQ) decouples service producers from consumers asynchronously.
**Why it is superior to synchronous HTTP**:
1. **Fault Isolation**: If the email or billing service goes down, the producer continues accepting user orders without failing; jobs simply queue up until the consumer restarts.
2. **Traffic Smoothing (Peak Levelling)**: During sudden traffic spikes (e.g., Flash Sale), the queue buffers incoming jobs, allowing workers to process them at a steady, sustainable rate without crashing backend servers.

---

### Q11: What is the difference between Polling, Long-Polling, WebSockets, and Server-Sent Events (SSE)?
**Answer**:
- **Short Polling**: Client sends HTTP requests at fixed intervals (e.g. every 2s). High server overhead and wasted bandwidth.
- **Long Polling**: Client requests data; server holds connection open until new data is available or timeout occurs. Better than short polling, but still HTTP request overhead.
- **WebSockets**: Full-duplex, bidirectional, persistent single TCP connection. Ideal for high-frequency interactive apps (chat, multiplayer gaming).
- **Server-Sent Events (SSE)**: Unidirectional persistent connection (Server to Client only) over standard HTTP. Ideal for live dashboards, stock tickers, and LLM text streaming.

---

### Q12: How do you prevent and mitigate DDoS attacks at the architectural level?
**Answer**:
1. **Edge Protection**: Use Cloudflare or AWS Shield at Layer 3/4 to absorb volumetric packet floods (SYN floods, UDP amplification).
2. **Web Application Firewall (WAF)**: Inspect Layer 7 traffic to block malicious signatures, SQLi, and scrapers.
3. **Rate Limiting**: Enforce IP-based and token-based rate limits at the API Gateway / Nginx layer.
4. **Static Caching**: Cache public API responses at the CDN edge so backend origin servers never see the traffic.

---

### Q13: What is the difference between Strongly Consistent and Eventually Consistent data models?
**Answer**:
- **Strong Consistency**: Guarantees that any read operation immediately following a write returns the updated value across all nodes in the cluster (higher latency, reduced availability during splits).
- **Eventual Consistency**: If no new updates are made, all replicas will eventually converge to the same value within a finite time window. Temporary stale reads are permitted in exchange for ultra-low latency and maximum availability.

---

### Q14: What is Consistent Hashing and why is it used in distributed caching?
**Answer**: In traditional modulo hashing (\`serverIndex = hash(key) % N\`), adding or removing a single cache server causes virtually all keys to remap to different servers, resulting in a **100% cache miss storm**. Consistent Hashing maps both servers and cache keys to a logical circular ring ($0$ to $2^{32}-1$). When a server is added or removed, only $K/N$ keys need to be remapped on average, protecting the cache fleet from catastrophic invalidation.

---

### Q15: How do you design a Notification System that supports Push, Email, and SMS?
**Answer**:
1. **API Gateway**: Accepts notification requests with recipient, template ID, and channel preference.
2. **Message Queue**: Pushes tasks into prioritized queues (e.g., \`high-priority-otp\`, \`marketing-promo\`).
3. **Notification Workers**: Pluggable microservice workers dedicated to individual providers (Twilio for SMS, SendGrid for Email, FCM/APNS for Push).
4. **User Preference Service**: Checks if the user has opted out of marketing emails or disabled push notifications before invoking third-party APIs.
5. **Rate Limiter & Deduplication**: Prevents sending duplicate emails within 5 minutes if client retries.`,hi:`### Top 15 System Design Q&A:
CAP Theorem, Horizontal vs Vertical scaling, Layer 4 vs Layer 7 Load Balancing, Caching strategies (Cache-Aside, Write-Through), Database Sharding vs Partitioning, Idempotent APIs, Connection pool exhaustion, Read replication lag, CDNs, Message queues, WebSockets vs SSE, DDoS mitigation, Consistent Hashing, aur Multi-channel notification architecture sabhi covered hain.`}},{type:"summary",heading:{en:"Quick Summary & Architecture Principles",hi:"Quick Summary & Architectural Principles"},body:{en:`- **Stateless Servers**: Keep Node.js instances purely stateless; offload sessions to Redis and media to S3.
- **Cache-Aside Pattern**: Always check Redis before querying database; set appropriate TTLs to prevent stale data.
- **Message Queues**: Decouple slow synchronous tasks (emails, transcoding) using BullMQ/Redis worker processes.
- **Database Scaling**: Implement compound indexes with ESR, utilize read replicas, and shard by high-cardinality keys.
- **High Availability**: Eliminate single points of failure (SPOF) with multi-instance clustering and automatic failover.`,hi:`- **Stateless**: Node.js servers par local state ya file save na karein; Redis aur S3 use karein.
- **Cache-Aside**: DB se pehle hamesha Redis check karein with TTL.
- **Message Queue**: Slow tasks ke liye BullMQ background workers use karein.
- **Database Scaling**: Read replicas aur proper ESR compound indexes ka use karein.
- **No SPOF**: Har service ke minimum 2-3 instances rakhein taaki koi single point of failure na rahe.`}}],quiz:[{question:{en:"What catastrophic event happens during a 'Cache Stampede' (Thundering Herd)?",hi:"'Cache Stampede' (Thundering Herd) ke dauran kaunsi badi samasya aati hai?"},options:[{en:"The server room physically overheats",hi:"Server room over-heat ho jata hai"},{en:"A popular cache key expires, causing thousands of concurrent requests to experience a cache miss simultaneously and flood the primary database, crashing it",hi:"Popular cache key expire hote hi hazaron concurrent requests ek saath DB par aati hain aur database crash ho jata hai"},{en:"Redis deletes all backup files",hi:"Redis backups delete kar deta hai"},{en:"The browser deletes all local cookies",hi:"Browser cookies delete kar deta hai"}],correctAnswer:1,explanation:{en:"Cache stampede occurs when a high-traffic cached item expires and all concurrent requests simultaneously query the un-cached database to recompute it.",hi:"Jab hot cache key expire hoti hai toh hazaron requests ek saath database par toot padti hain aur use crash kar deti hain."}},{question:{en:"Why must production Node.js application containers be strictly stateless?",hi:"Production Node.js containers ko strictly stateless kyun hona chahiye?"},options:[{en:"Because Node.js cannot write to hard disks",hi:"Kyunki Node.js disk par likh nahi sakta"},{en:"To allow horizontal auto-scalers and load balancers to dynamically spin up or terminate container instances without losing user sessions or uploaded files",hi:"Taaki auto-scaler aur load balancer bina session ya file gavaye naye container instances add ya delete kar sakein"},{en:"Because stateful code is illegal in web standards",hi:"Kyunki stateful code allowed nahi hai"},{en:"To avoid using RAM",hi:"RAM bachane ke liye"}],correctAnswer:1,explanation:{en:"Statelessness allows any request to be routed to any container instance safely, enabling seamless horizontal auto-scaling and zero-downtime rolling updates.",hi:"Stateless architecture auto-scaling ko aasan banata hai kyunki kisi bhi instance ke band ya shuru hone se user session par asar nahi padta."}},{question:{en:"Which caching strategy writes data directly to the cache, with the cache writing asynchronously to the database in background batches?",hi:"Kaunsi caching strategy data pehle cache mein likhti hai aur fir background mein asynchronously DB ko update karti hai?"},options:[{en:"Cache-Aside",hi:"Cache-Aside"},{en:"Write-Through",hi:"Write-Through"},{en:"Write-Back (Write-Behind)",hi:"Write-Back (Write-Behind)"},{en:"Read-Through",hi:"Read-Through"}],correctAnswer:2,explanation:{en:"Write-Back acknowledges writes immediately upon caching and flushes changes to the underlying database asynchronously in batches, offering maximum write performance.",hi:"Write-Back cache mein turant save karke acknowledge karta hai aur database ko background batches mein update karta hai."}},{question:{en:"According to the CAP theorem, when a network partition (P) inevitably occurs in a distributed database, what choice must the system make?",hi:"CAP theorem ke anusaar jab network partition (P) hota hai, toh system ko kin do cheezon mein se ek chunna padta hai?"},options:[{en:"Between React or Vue",hi:"React ya Vue mein se"},{en:"Between Consistency (refusing writes/reads to prevent stale data) or Availability (accepting reads/writes with potential stale data)",hi:"Consistency (galat data rokne ke liye operations band karna) ya Availability (stale data ke saath bhi service chalu rakhna)"},{en:"Between Windows or Linux",hi:"Windows ya Linux mein se"},{en:"Between HTTP or FTP",hi:"HTTP ya FTP mein se"}],correctAnswer:1,explanation:{en:"During a partition, the system must choose between returning an error/waiting for sync (Consistency - CP) or returning potentially stale data (Availability - AP).",hi:"Network partition hone par ya toh aap data ki freshness (Consistency) guarantee kar sakte hain ya service ka chalu rehna (Availability)."}},{question:{en:"What is the primary difference between a Layer 4 and a Layer 7 Load Balancer?",hi:"Layer 4 aur Layer 7 Load Balancer mein mukhya farq kya hota hai?"},options:[{en:"Layer 4 routes packets based on IP and TCP/UDP ports without inspecting payload; Layer 7 inspects HTTP paths, headers, and cookies to perform content-based routing",hi:"Layer 4 bina content dekhe IP aur port par route karta hai; Layer 7 HTTP URL, headers aur cookies inspect karke intelligent routing karta hai"},{en:"Layer 4 only works on mobile phones",hi:"Layer 4 sirf mobile par chalta hai"},{en:"Layer 7 cannot handle SSL certificates",hi:"Layer 7 SSL handle nahi kar sakta"},{en:"There is zero difference",hi:"Dono mein koi farq nahi hai"}],correctAnswer:0,explanation:{en:"Layer 4 (Transport layer) is fast and packet-level. Layer 7 (Application layer) parses HTTP requests, allowing routing /api/video to video servers and /api/auth to auth servers.",hi:"Layer 4 packet level par fast routing karta hai. Layer 7 HTTP request headers aur URL inspect karke specific microservices tak traffic bhejta hai."}},{question:{en:"What is the major architectural disadvantage of Vertical Scaling (Scale Up) compared to Horizontal Scaling (Scale Out)?",hi:"Horizontal Scaling ke muqable Vertical Scaling (Scale Up) ka sabse bada architectural nuksan kya hai?"},options:[{en:"It hits a hard physical hardware limit and creates a single point of failure (SPOF)",hi:"Isme hardware ki ek physical limit hoti hai aur ye single point of failure (SPOF) create karta hai"},{en:"It requires installing Linux",hi:"Linux install karna padta hai"},{en:"It deletes the database automatically",hi:"Database delete ho jata hai"},{en:"It cannot run JavaScript",hi:"JS nahi chala sakta"}],correctAnswer:0,explanation:{en:"You can only add so much RAM and CPU to a single machine before costs become astronomical and physical limits are reached. If that machine crashes, everything fails.",hi:"Ek machine mein RAM aur CPU badhane ki seema hoti hai aur bohot mehnga hota hai. Agar wo machine band hui toh poori service band ho jaati hai."}},{question:{en:"In the Cache-Aside (Lazy Loading) pattern, what steps happen when a read request experiences a Cache MISS?",hi:"Cache-Aside pattern mein Cache MISS hone par kaunse steps execute hote hain?"},options:[{en:"The server immediately returns an HTTP 500 error",hi:"Server 500 error deta hai"},{en:"The application queries the database, writes the retrieved data into the cache with a TTL, and returns the result to the client",hi:"Application database se data laata hai, use TTL ke saath cache mein save karta hai, aur client ko return karta hai"},{en:"The application deletes the cache completely",hi:"Cache delete kar deta hai"},{en:"The request hangs forever",hi:"Request hang ho jaati hai"}],correctAnswer:1,explanation:{en:"On cache miss, the application is responsible for querying the primary database, populating the cache for subsequent requests, and returning data.",hi:"Cache miss hone par app database se data fetch karta hai, agle requests ke liye cache populate karta hai aur client ko bhejta hai."}},{question:{en:"What is the key difference between Database Sharding and Database Partitioning?",hi:"Database Sharding aur Database Partitioning mein kya farq hota hai?"},options:[{en:"Partitioning splits tables within the SAME physical database instance; Sharding distributes data subsets across MULTIPLE separate server machines or clusters",hi:"Partitioning ek hi machine ke andar table ko hisson mein baant-ti hai; Sharding data ko MULTIPLE alag-alag physical servers ya clusters par divide karti hai"},{en:"Sharding only works on MySQL; Partitioning only works on MongoDB",hi:"Sharding sirf MySQL mein hoti hai"},{en:"They are exact synonyms with zero difference",hi:"Dono identical hain"},{en:"Partitioning deletes old data automatically",hi:"Partitioning data delete karti hai"}],correctAnswer:0,explanation:{en:"Partitioning divides data internally on one host. Sharding is horizontal scaling across multiple independent database nodes linked via shard keys.",hi:"Partitioning ek hi database ke andar table split karti hai jabki Sharding alag-alag machines par data baant kar scale karti hai."}},{question:{en:"How does an API guarantee idempotency for POST requests (such as processing a payment or creating an order)?",hi:"Payment process karne ya order banane jaise POST requests ke liye API idempotency kaise guarantee karti hai?"},options:[{en:"By blocking all users with the same name",hi:"Same naam ke users ko block karke"},{en:"Client sends a unique Idempotency-Key header (UUID); server checks Redis/DB for that key, returns cached response if already processed, or executes once atomically using a distributed lock",hi:"Client unique Idempotency-Key (UUID) bhejta hai; server Redis mein check karta hai, pehle se processed hone par cached response deta hai aur dobara duplicate charge nahi karta"},{en:"By disabling retries completely in mobile apps",hi:"Retries band karke"},{en:"By restarting the server after every transaction",hi:"Server restart karke"}],correctAnswer:1,explanation:{en:"An idempotency key ensures that network retries by the client or payment gateway do not create duplicate charges or records. The server executes it once and returns cached results for duplicates.",hi:"Idempotency key duplicate requests aane par dobara payment debit hone se rokkta hai aur pehle ka hi confirmed response return karta hai."}},{question:{en:"What causes Database Connection Pool Exhaustion when deploying horizontal serverless or container instances?",hi:"Horizontal containers ya serverless deploy karte waqt Database Connection Pool Exhaustion kyun hota hai?"},options:[{en:"Because the internet cable gets unplugged",hi:"Internet cable disconnect hone se"},{en:"Each container instance opens its own pool of TCP connections (e.g. 50 instances * 100 maxPoolSize = 5,000 connections), overwhelming the database engine's connection limit",hi:"Har container apna alag connection pool kholta hai (50 instances * 100 maxPoolSize = 5000 connections), jisse database ka connection limit crash ho jata hai"},{en:"Because MongoDB only supports 1 connection total",hi:"MongoDB sirf 1 connection support karta hai"},{en:"Because Node.js cannot open TCP sockets",hi:"Node TCP sockets nahi khol sakta"}],correctAnswer:1,explanation:{en:"Databases have finite thread/socket limits (~1,000 - 5,000). Many scaled-out backend instances multiplying their connection pools will quickly exhaust database capacity.",hi:"Multiple container instances jab apna apna connection pool banate hain toh database par hazaron sockets khul jaate hain jisse DB crash ho jata hai. RDS Proxy ya PgBouncer ise solve karta hai."}},{question:{en:"What is 'Read-Your-Own-Writes' consistency in a database cluster with asynchronous read replicas?",hi:"Asynchronous read replicas wale cluster mein 'Read-Your-Own-Writes' consistency ka kya matlab hota hai?"},options:[{en:"The database automatically writes to a diary",hi:"Database diary mein likhta hai"},{en:"Ensuring that when a user updates their own profile or post, their subsequent reads are routed to the Primary (or a synced replica) so they never see stale data due to replication lag",hi:"Ye ensure karna ki jab user apna profile update kare toh agla read request Primary node par jaye taaki replication lag ki wajah se user ko purana data na dikhe"},{en:"Deleting the user's data after every write",hi:"Data delete karna"},{en:"Requiring users to write raw SQL queries",hi:"Users se raw SQL likhwana"}],correctAnswer:1,explanation:{en:"Because replication is asynchronous, a replica might lag behind the primary by 500ms. Routing the updating user's reads to the Primary for a few seconds ensures they immediately see their own changes.",hi:"Secondary nodes par replication lag hone ki wajah se user ko apna update turant nahi dikhta. Updating user ko kuch seconds ke liye Primary par route karke ye samasya hal hoti hai."}},{question:{en:"How does a Content Delivery Network (CDN) accelerate delivery of static web assets?",hi:"Content Delivery Network (CDN) static assets ki delivery ko kaise tez karta hai?"},options:[{en:"By compressing all images into text files",hi:"Images ko text file bana kar"},{en:"By caching static files on globally distributed Edge Points of Presence (PoPs) closest to the user, using Anycast DNS to serve requests in < 20ms without hitting the origin server",hi:"Static files ko duniya bhar ke Edge servers par cache karke aur user ke sabse nazdeek wale server se 20ms mein serve karke without origin load"},{en:"By disabling HTML parsing in browsers",hi:"HTML parsing disable karke"},{en:"By replacing JavaScript with WebAssembly",hi:"JS ko WebAssembly se badal kar"}],correctAnswer:1,explanation:{en:"CDNs store cached static bundles at edge data centers worldwide. Users download files from a server in their city rather than waiting for round-trips across oceans to origin servers.",hi:"CDN static files ko user ke kareeb wale edge server par cache karta hai jisse network latency 200ms se ghat kar 15ms reh jaati hai."}},{question:{en:"Why is an asynchronous Message Queue (BullMQ / RabbitMQ) superior to synchronous HTTP calls for sending emails or processing videos?",hi:"Emails bhejne ya videos process karne ke liye synchronous HTTP ke muqable asynchronous Message Queue kyun behtar hai?"},options:[{en:"Because message queues make videos higher resolution",hi:"Queues videos ko high resolution banati hain"},{en:"It provides Fault Isolation (if the email service crashes, requests don't fail) and Traffic Smoothing (buffers traffic surges during flash sales so workers process at a steady pace)",hi:"Ye Fault Isolation deta hai (email provider down hone par bhi user register ho jata hai) aur Traffic Smoothing deta hai (peak load par queue buffer karta hai)"},{en:"Because HTTP requests cannot carry text",hi:"HTTP text carry nahi kar sakta"},{en:"Message queues eliminate the need for databases",hi:"Queue se DB ki zaroorat khatam ho jaati hai"}],correctAnswer:1,explanation:{en:"Queues decouple long-running slow tasks from API requests. The API responds in 5ms, and background workers process the queue with automatic retries and rate limiting.",hi:"Message queue slow tasks ko API response se alag karta hai. User ko turant response milta hai aur background worker steady pace par task process karta hai."}},{question:{en:"When should you choose WebSockets over Server-Sent Events (SSE)?",hi:"Server-Sent Events (SSE) ke muqable WebSockets kab chunna chahiye?"},options:[{en:"When the application requires bidirectional, low-latency, full-duplex communication (e.g. multiplayer gaming, interactive collaborative whiteboards, or chat)",hi:"Jab application ko dono taraf (bidirectional) full-duplex real-time communication chahiye ho (jaise online gaming, collaborative canvas ya live chat)"},{en:"When displaying a simple static news article",hi:"Simple static news ke liye"},{en:"When sending one-way stock price tickers to the client",hi:"One-way stock tickers ke liye"},{en:"WebSockets should never be used in 2026",hi:"WebSockets use nahi karne chahiye"}],correctAnswer:0,explanation:{en:"SSE is lightweight and unidirectional (Server-to-Client only) over standard HTTP. WebSockets provide full-duplex bidirectional streams where client and server both send messages rapidly.",hi:"SSE sirf server-se-client data bhejta hai. WebSockets dono taraf full-duplex messaging permit karta hai jo gaming aur chat ke liye zaroori hai."}},{question:{en:"How does Consistent Hashing prevent catastrophic cache invalidation storms when scaling distributed cache nodes?",hi:"Distributed cache nodes scale karte waqt Consistent Hashing poori cache khali hone (invalidation storm) se kaise bachata hai?"},options:[{en:"By encrypting cache keys in SHA-512",hi:"Keys ko encrypt karke"},{en:"It maps keys and servers onto a circular 360-degree ring; adding or removing a node only remaps K/N keys (where K is total keys and N is servers) rather than invalidating 100% of keys",hi:"Ye keys aur servers ko ek circular ring par map karta hai; naya node aane ya hatne par sirf K/N keys remap hoti hain baaki 90%+ keys apni jagah bani rehti hain"},{en:"By storing all keys on a single master machine",hi:"Ek master machine par rakh kar"},{en:"It restarts the cache automatically",hi:"Cache restart karke"}],correctAnswer:1,explanation:{en:"Traditional modulo hashing (hash % N) remaps almost all keys when N changes. Consistent hashing ensures only a fraction of keys (K/N) move to the new or adjacent node.",hi:"Modulo hashing mein N badalne par lagbhag 100% cache invalid ho jaati hai. Consistent Hashing circular ring use karke sirf chote se hisse (K/N) ko remap karta hai."}},{question:{en:"What are the three states of the Circuit Breaker pattern in distributed microservices?",hi:"Distributed microservices mein Circuit Breaker pattern ki 3 states kaunsi hoti hain?"},options:[{en:"Closed (normal traffic flows), Open (fails immediately without calling downstream), and Half-Open (tests a limited probe of requests to check if service recovered)",hi:"Closed (normal traffic chalta hai), Open (downstream service down hone par turant fail karta hai), aur Half-Open (test requests bhej kar check karta hai ki service theek hui ya nahi)"},{en:"Red, Yellow, Green",hi:"Red, Yellow, Green"},{en:"Start, Stop, Pause",hi:"Start, Stop, Pause"},{en:"Active, Inactive, Deleted",hi:"Active, Inactive, Deleted"}],correctAnswer:0,explanation:{en:"When failures exceed a threshold, the breaker 'Opens' to protect failing services and stop cascading failures. In 'Half-Open', trial requests verify recovery before closing again.",hi:"Service fail hone par circuit Open ho jata hai taaki server hang na ho. Recovery test karne ke liye Half-Open state limited requests bhejta hai."}},{question:{en:"What is the operational difference between /health/live and /health/ready endpoints in Kubernetes / container orchestration?",hi:"Container orchestration mein /health/live aur /health/ready endpoints mein kya operational farq hota hai?"},options:[{en:"/health/live checks if process is alive (if fails, container is restarted); /health/ready checks if dependencies (DB, Redis) are connected (if fails, traffic is stopped without killing container)",hi:"/health/live check karta hai process zinda hai ya nahi (fail hone par restart karta hai); /health/ready check karta hai DB/Redis ready hain ya nahi (fail hone par sirf traffic rokta hai)"},{en:"They are identical endpoints",hi:"Dono identical hain"},{en:"/health/ready is for frontend only",hi:"/health/ready sirf frontend ke liye hai"},{en:"Neither endpoint is used in production",hi:"Dono use nahi hote"}],correctAnswer:0,explanation:{en:"Liveness probe restarts deadlock/zombie processes. Readiness probe temporarily stops routing incoming HTTP traffic until the container finishes warming up or reconnects to dependencies.",hi:"Liveness probe process crash hone par restart karta hai. Readiness probe traffic tab tak nahi aane deta jab tak DB connections ready na hon."}},{question:{en:"In a URL shortener system (like TinyURL), why is Base62 encoding preferred over MD5 or SHA-256 hashing?",hi:"TinyURL jaise system mein MD5 ya SHA-256 hashing ke muqable Base62 encoding kyun prefer ki jaati hai?"},options:[{en:"Because Base62 is encrypted with military-grade keys",hi:"Base62 military-grade encrypt hota hai"},{en:"A distributed counter or Snowflake ID encoded in 7 Base62 characters [0-9, a-z, A-Z] yields 3.5 trillion short, URL-safe codes with ZERO hash collisions",hi:"Distributed counter ID ko 7 Base62 characters mein encode karne par bina kisi hash collision ke 3.5 Trillion short aur clean URLs ban jaate hain"},{en:"Because MD5 hashes cannot be sent over HTTP",hi:"MD5 HTTP par nahi ja sakta"},{en:"Because Base62 converts URLs into audio files",hi:"Base62 audio banata hai"}],correctAnswer:1,explanation:{en:"MD5 produces 128-bit hashes that must be truncated to be short, leading to frequent hash collisions. Base62 bijectively maps auto-incrementing 64-bit integer IDs with zero collisions.",hi:"Hash functions truncate karne par collisions create karte hain. Base62 numeric ID ko direct compact alphanumeric string banata hai jisme zero collision hota hai."}},{question:{en:"How do you eliminate a Single Point of Failure (SPOF) in a high-scale MERN backend?",hi:"High-scale MERN backend mein Single Point of Failure (SPOF) ko kaise khatam kiya jata hai?"},options:[{en:"By putting the entire app on the fastest single server in the datacenter",hi:"App ko sabse tez single server par rakh kar"},{en:"By introducing redundancy at every tier: multiple stateless Node.js containers across Availability Zones behind an ALB, multi-node MongoDB replica sets, and Redis Sentinel/Cluster",hi:"Har tier par redundancy dekar: ALB ke peeche multiple stateless Node containers, Multi-AZ MongoDB replica sets, aur Redis Sentinel cluster"},{en:"By disabling error logs",hi:"Logs disable karke"},{en:"By using SQLite instead of MongoDB",hi:"SQLite use karke"}],correctAnswer:1,explanation:{en:"SPOF is eliminated by ensuring no single machine or zone can bring down the system. Every component (Load Balancer, App Servers, Cache, Database) must have automated failover replicas.",hi:"SPOF khatam karne ke liye har level par duplicate backup machines (replicas) rakhi jaati hain jo automated failover ke saath ready rehti hain."}},{question:{en:"What is the primary function of a Web Application Firewall (WAF) in front of an API Gateway?",hi:"API Gateway ke aage Web Application Firewall (WAF) lagane ka mukhya kaam kya hota hai?"},options:[{en:"To format JSON outputs cleanly",hi:"JSON format karna"},{en:"To inspect Layer 7 HTTP requests and block malicious traffic patterns, such as SQL/NoSQL injection, Cross-Site Scripting (XSS), bad bot scrapers, and volumetric layer-7 floods",hi:"Layer 7 HTTP traffic ko inspect karna aur SQLi/NoSQL injection, XSS, malicious bots, aur cyber attacks ko origin server pahunchne se pehle block karna"},{en:"To run unit tests automatically",hi:"Unit tests chalana"},{en:"To minify CSS files",hi:"CSS minify karna"}],correctAnswer:1,explanation:{en:"WAF operates at Layer 7, inspecting request headers and payloads against security rules to reject malicious patterns before they can consume application server resources.",hi:"WAF application layer par guard ka kaam karta hai aur hackers ke malicious payloads (SQLi, XSS) ko server tak pahunchne se pehle hi drop kar deta hai."}},{question:{en:"What is the core architectural purpose of Full-Stack System Design Basics (Load Balancer, Caching, DB) in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Full-Stack System Design Basics (Junior to Mid Level) ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling full-stack system design basics (load balancer, caching, db) with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Full-Stack System Design Basics (Junior to Mid Level) ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Full-Stack System Design Basics (Load Balancer, Caching, DB) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Full-Stack System Design Basics (Junior to Mid Level) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}}]};export{e as default};
