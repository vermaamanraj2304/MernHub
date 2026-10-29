const e={id:"mongo-transactions",title:{en:"Multi-Document Transactions & ACID Guarantees",hi:"Multi-Document Transactions & ACID Guarantees"},difficulty:"Advanced",readTime:12,sections:[{type:"concept",heading:{en:"1. ACID Guarantees & Multi-Document Transactions",hi:"1. ACID Guarantees Aur Multi-Document Transactions"},body:{en:`Historically, critics of NoSQL databases claimed they could not handle mission-critical financial applications because they lacked ACID guarantees. Since MongoDB 4.0 (Replica Sets) and 4.2 (Sharded Clusters), MongoDB provides **full multi-document, multi-collection ACID transactions**.

### The ACID Principles:
- **A - Atomicity**: "All or Nothing." Every write operation in the transaction succeeds, or if a single error occurs, all previous operations are completely rolled back to their original state.
- **C - Consistency**: The database transitions strictly from one valid state to another, respecting all schema validators and unique constraints.
- **I - Isolation**: Operations inside a transaction are invisible to other concurrent connections until the transaction is committed (\`Read Concern: snapshot\`).
- **D - Durability**: Once committed with \`Write Concern: majority\` and journaling (\`j: true\`), the changes survive server power failure or restarts.

### Single-Document vs Multi-Document:
- **Single-Document**: In MongoDB, any update affecting a single document is **always atomic by default** without starting a transaction.
- **Multi-Document**: Required when updating across multiple documents or multiple collections simultaneously (e.g. Bank Account A -> Bank Account B).`,hi:`Pehle log sochte the ki NoSQL databases mein banking ya payments jaise critical kaam nahi ho sakte kyunki unme ACID guarantees nahi hoti. Lekin MongoDB 4.0 ke baad se **complete multi-document ACID transactions** ka support maujood hai!

### ACID Ka Matlab:
- **A - Atomicity (Sab ya Kuch Nahi)**: Ya toh transaction ke saare writes commit honge, ya ek bhi fail hua toh sab kuch pehle jaisa rollback ho jayega.
- **C - Consistency**: Database hamesha rules aur validation constraints follow karta hai.
- **I - Isolation**: Jab tak transaction commit nahi hota, tab tak doosre users ko adha-adhura data nahi dikhta.
- **D - Durability**: Commit hone ke baad agar server crash bhi ho jaye, toh bhi data surakshit rehta hai.

### Single vs Multi-Document:
- **Single Document**: Ek document par hone wala update hamesha **by default atomic** hota hai, iske liye transaction shuru karne ki zaroorat nahi hoti.
- **Multi-Document**: Jab alag-alag documents ya collections ke beech simultaneous updates karne hon (jaise do bank accounts ke beech paisa transfer), tab transaction lagana padta hai.`}},{type:"concept",heading:{en:"2. Client Sessions & The withTransaction() Helper",hi:"2. Client Sessions Aur withTransaction() Ka Tareeka"},body:{en:"Transactions in MongoDB operate through **Client Sessions** (`client.startSession()`). A session encapsulates the isolation context across network calls.\n\n### Core Prerequisite:\n> Multi-document transactions **require a Replica Set** (or MongoDB Atlas cluster). They cannot run on an uninitialized standalone single-node `mongod` instance.\n\n### Two Ways to Execute Transactions:\n1. **Core API (Manual Control)**:\n   - `session.startTransaction()`\n   - Perform writes, passing `{ session }` in every database call.\n   - `await session.commitTransaction()` or `await session.abortTransaction()`.\n   - `session.endSession()` in a `finally` block.\n2. **Callback API (`session.withTransaction()`) - RECOMMENDED**:\n   - Automatically handles starting the transaction, committing on success, and rolling back on unhandled exceptions.\n   - Automatically retries transient network errors (`TransientTransactionError`) and write conflicts without writing custom retry loops!",hi:"MongoDB mein transactions **Client Sessions** (`client.startSession()`) ke through chalte hain jo network calls ke dauran isolation context maintain karte hain.\n\n### Zaroori Shart:\n> Multi-document transactions ke liye **Replica Set** (ya MongoDB Atlas) hona anivarya hai. Standalone single `mongod` instance par transaction nahi chal sakta.\n\n### Transaction Chalane Ke Do Tareeqe:\n1. **Manual API**:\n   - `session.startTransaction()` shuru karein.\n   - Har query call mein `{ session }` pass karein.\n   - Error aane par `session.abortTransaction()` karein aur end mein `session.endSession()`.\n2. **Callback API (`session.withTransaction()`) - BEST PRACTICE**:\n   - Yeh automatically transaction start karta hai aur error aane par rollback karta hai.\n   - Network errors aur write conflicts aane par transaction ko khud-b-khud retry kar deta hai!"}},{type:"analogy",heading:{en:"Real-Life Analogy: The UPI Bank Transfer (PhonePe / Google Pay)",hi:"Real-Life Analogy: PhonePe / Google Pay Se UPI Money Transfer"},body:{en:`Consider transferring ₹2,000 from Ramesh's SBI account to Suresh's HDFC account using UPI:

1. **Step 1 (Deduct)**: The banking system deducts ₹2,000 from Ramesh's account balance.
2. **Step 2 (The Failure)**: Just before the system can credit Suresh's account, HDFC's server throws a timeout error or network cable gets cut!
3. **Without a Transaction (Disaster)**:
   - Ramesh's money is gone (-₹2,000).
   - Suresh never received it.
   - Ramesh panics and calls customer support for 3 days!
4. **With an ACID Transaction**:
   - Because Step 2 failed, MongoDB immediately fires \`session.abortTransaction()\`.
   - The deduction in Step 1 is instantaneously rolled back.
   - Ramesh's ₹2,000 balance is immediately restored. Neither account loses a single paisa!`,hi:`UPI ke zariye Ramesh ke account se Suresh ke account mein ₹2,000 bhejne se samjhein:

1. **Step 1 (Paisa Katna)**: Ramesh ke bank account se ₹2,000 kat jaate hain.
2. **Step 2 (Network Fail)**: Suresh ke account mein credit hone se theek pehle HDFC ka server down ho jata hai ya connection toot jata hai!
3. **Bina Transaction Ke (Bohot Badi Musibat)**:
   - Ramesh ke paise kat gaye (-₹2,000).
   - Suresh ko paise mile hi nahi.
   - Ramesh bank ke chakkar kaat raha hai aur pareshaan hai!
4. **ACID Transaction Ke Sath**:
   - Kyunki Step 2 fail hua, MongoDB turant \`abortTransaction()\` chala deta hai.
   - Step 1 ka kata hua paisa wapas Ramesh ke account mein refund ho jata hai.
   - Dono accounts mein balance pehle jaisa ho jata hai aur ek rupaye ka bhi loss nahi hota!`}},{type:"syntax",heading:{en:"Syntax & Signatures: The withTransaction API",hi:"Syntax & Signatures: withTransaction() Ka Code Structure"},body:{en:`### The withTransaction() Pattern:
\`\`\`javascript
const session = client.startSession();

try {
  await session.withTransaction(
    async () => {
      // Step 1: Must pass { session }
      await accounts.updateOne(
        { _id: fromAccount, balance: { $gte: amount } },
        { $inc: { balance: -amount } },
        { session }
      );

      // Step 2: Must pass { session }
      await accounts.updateOne(
        { _id: toAccount },
        { $inc: { balance: amount } },
        { session }
      );
    },
    {
      readPreference: "primary",
      readConcern: { level: "local" },
      writeConcern: { w: "majority" }
    }
  );
} finally {
  await session.endSession();
}
\`\`\``,hi:`### withTransaction() Ka Standard Syntax:
\`\`\`javascript
const session = client.startSession();

try {
  await session.withTransaction(
    async () => {
      // Step 1: { session } pass karna zaroori hai!
      await accounts.updateOne(
        { _id: fromUser },
        { $inc: { balance: -amount } },
        { session }
      );

      // Step 2: Yahan bhi { session } pass karein
      await accounts.updateOne(
        { _id: toUser },
        { $inc: { balance: amount } },
        { session }
      );
    }
  );
} finally {
  await session.endSession();
}
\`\`\``}},{type:"example",heading:{en:"Example 1: Complete Bank Account Money Transfer",hi:"Example 1: Complete Bank Account Money Transfer Service"},body:{en:"Executing a multi-document balance transfer with balance validation, rolling back automatically if the sender has insufficient funds.",hi:"Do accounts ke beech paisa transfer karna aur balance kam hone par safely rollback karna."},code:{language:"javascript",filename:"bank-transfer-transaction.js",snippet:`import { MongoClient, ObjectId } from "mongodb";

// Note: Transactions require a Replica Set (e.g. Atlas or local rs0)
const uri = "mongodb://127.0.0.1:27017/?replicaSet=rs0";
const client = new MongoClient(uri);

export async function transferMoney(fromId, toId, amount) {
  const session = client.startSession();

  try {
    const result = await session.withTransaction(async () => {
      const db = client.db("bankDB");
      const accounts = db.collection("accounts");
      const ledger = db.collection("audit_ledger");

      // 1. Debit from sender (with balance guard condition)
      const debitRes = await accounts.updateOne(
        { _id: new ObjectId(fromId), balance: { $gte: amount } },
        { $inc: { balance: -amount } },
        { session } // CRITICAL: must pass session!
      );

      if (debitRes.matchedCount === 0) {
        throw new Error("Debit failed: Insufficient funds or invalid account.");
      }

      // 2. Credit to receiver
      const creditRes = await accounts.updateOne(
        { _id: new ObjectId(toId) },
        { $inc: { balance: amount } },
        { session }
      );

      if (creditRes.matchedCount === 0) {
        throw new Error("Credit failed: Target account does not exist.");
      }

      // 3. Record in audit ledger
      await ledger.insertOne(
        {
          fromId: new ObjectId(fromId),
          toId: new ObjectId(toId),
          amount,
          transferredAt: new Date()
        },
        { session }
      );

      return { success: true, message: \`Successfully transferred ₹\${amount}\` };
    });

    return result;
  } finally {
    await session.endSession();
  }
}

// Test Runner
async function runTest() {
  await client.connect();
  const accounts = client.db("bankDB").collection("accounts");
  await accounts.deleteMany({});

  const ramesh = await accounts.insertOne({ name: "Ramesh", balance: 5000 });
  const suresh = await accounts.insertOne({ name: "Suresh", balance: 1000 });

  console.log("Initial: Ramesh = ₹5,000, Suresh = ₹1,000");

  // Transfer ₹2,000 from Ramesh to Suresh
  const transfer1 = await transferMoney(ramesh.insertedId, suresh.insertedId, 2000);
  console.log("Tx 1:", transfer1.message);

  // Attempt to transfer ₹10,000 (Insufficient funds -> Rollback)
  try {
    await transferMoney(ramesh.insertedId, suresh.insertedId, 10000);
  } catch (err) {
    console.log("Tx 2 safely aborted:", err.message);
  }

  const finalRamesh = await accounts.findOne({ _id: ramesh.insertedId });
  const finalSuresh = await accounts.findOne({ _id: suresh.insertedId });
  console.log(\`Final: Ramesh = ₹\${finalRamesh.balance}, Suresh = ₹\${finalSuresh.balance}\`);

  await client.close();
}

runTest().catch(console.error);

/*
Expected Output:
Initial: Ramesh = ₹5,000, Suresh = ₹1,000
Tx 1: Successfully transferred ₹2000
Tx 2 safely aborted: Debit failed: Insufficient funds or invalid account.
Final: Ramesh = ₹3000, Suresh = ₹3000
*/`}},{type:"example",heading:{en:"Example 2: Multi-Collection E-Commerce Checkout Transaction",hi:"Example 2: Multi-Collection E-Commerce Checkout Transaction"},body:{en:"Executing a complete e-commerce checkout: Decrementing inventory, creating an order record, and clearing the user cart atomically.",hi:"Stock kam karna, order record create karna aur user cart ko ek sath atomic transaction mein clear karna."},code:{language:"javascript",filename:"ecommerce-checkout-tx.js",snippet:`import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/?replicaSet=rs0");

export async function processCheckout({ userId, productId, quantity, totalPaid }) {
  const session = client.startSession();

  try {
    const orderDetails = await session.withTransaction(async () => {
      const db = client.db("storeDB");
      const products = db.collection("products");
      const orders = db.collection("orders");
      const users = db.collection("users");

      // 1. Deduct Inventory with stock guard
      const stockRes = await products.updateOne(
        { _id: new ObjectId(productId), stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
        { session }
      );

      if (stockRes.matchedCount === 0) {
        throw new Error("Item out of stock during checkout.");
      }

      // 2. Create Order document
      const orderRes = await orders.insertOne(
        {
          customerId: new ObjectId(userId),
          items: [{ productId: new ObjectId(productId), quantity }],
          totalPaid,
          status: "confirmed",
          createdAt: new Date()
        },
        { session }
      );

      // 3. Clear user active shopping cart
      await users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { activeCart: [] } },
        { session }
      );

      return { orderId: orderRes.insertedId, status: "confirmed" };
    });

    return orderDetails;
  } finally {
    await session.endSession();
  }
}

// Simulation Test
async function simulate() {
  await client.connect();
  const db = client.db("storeDB");

  const pRes = await db.collection("products").insertOne({ title: "Smart Watch", stock: 1 });
  const uRes = await db.collection("users").insertOne({ name: "Anil", activeCart: [{ item: "Smart Watch" }] });

  console.log("Processing order for last in-stock item...");
  const order = await processCheckout({
    userId: uRes.insertedId,
    productId: pRes.insertedId,
    quantity: 1,
    totalPaid: 2999
  });
  console.log("Order confirmed with ID:", order.orderId);

  // Second checkout should fail atomically
  try {
    await processCheckout({
      userId: uRes.insertedId,
      productId: pRes.insertedId,
      quantity: 1,
      totalPaid: 2999
    });
  } catch (err) {
    console.log("Second checkout safely failed:", err.message);
  }

  await client.close();
}

simulate().catch(console.error);

/*
Expected Output:
Processing order for last in-stock item...
Order confirmed with ID: ObjectId("...")
Second checkout safely failed: Item out of stock during checkout.
*/`}},{type:"example",heading:{en:"Example 3: Handling Write Conflicts & Transient Errors Gracefully",hi:"Example 3: Write Conflicts Aur Transient Errors Ko Handle Karna"},body:{en:"Demonstrating why `session.withTransaction()` is preferred: It automatically detects write conflict aborts and transparently re-runs the transaction function.",hi:"`session.withTransaction()` ka magic: Jab do simultaneous transactions ek hi document par takrate hain toh automatic retry kaise kaam karta hai."},code:{language:"javascript",filename:"write-conflict-handling.js",snippet:`import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/?replicaSet=rs0");

/**
 * Demonstrates how withTransaction automatically handles write conflicts
 * and TransientTransactionErrors without needing a manual while-retry loop!
 */
async function concurrentTicketBooking(seatDocId, customerName) {
  const session = client.startSession();

  try {
    // withTransaction will automatically retry if a WriteConflict occurs!
    const result = await session.withTransaction(async () => {
      const seats = client.db("cinemaDB").collection("seats");

      const seat = await seats.findOne({ _id: new ObjectId(seatDocId) }, { session });

      if (seat.isBooked) {
        throw new Error(\`Seat already booked by \${seat.bookedBy}\`);
      }

      // Simulate network lag inside the transaction window
      await new Promise(r => setTimeout(r, 50));

      await seats.updateOne(
        { _id: new ObjectId(seatDocId), isBooked: false },
        { $set: { isBooked: true, bookedBy: customerName } },
        { session }
      );

      return \`Seat successfully booked for \${customerName}!\`;
    });

    console.log(result);
  } catch (err) {
    console.log(\`Booking failed for \${customerName}: \${err.message}\`);
  } finally {
    await session.endSession();
  }
}

async function runSimulation() {
  await client.connect();
  const seats = client.db("cinemaDB").collection("seats");
  await seats.deleteMany({});

  const { insertedId } = await seats.insertOne({ seatNo: "A1", isBooked: false, bookedBy: null });

  console.log("Simulating 2 users clicking 'Book Seat A1' concurrently...");
  // Launch both requests simultaneously
  await Promise.all([
    concurrentTicketBooking(insertedId, "Amit"),
    concurrentTicketBooking(insertedId, "Sunil")
  ]);

  const finalSeat = await seats.findOne({ _id: insertedId });
  console.log(\`Final status of seat A1: Booked by \${finalSeat.bookedBy}\`);

  await client.close();
}

runSimulation().catch(console.error);

/*
Expected Output:
Simulating 2 users clicking 'Book Seat A1' concurrently...
Seat successfully booked for Amit!
Booking failed for Sunil: Seat already booked by Amit
Final status of seat A1: Booked by Amit
*/`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Aam Galatiyan Aur Unka Solution"},body:{en:"### 1. Forgetting to Pass `{ session }` to Database Operations\n- **Mistake**: Writing `await accounts.updateOne({ _id }, { $inc: { balance: 100 } });` inside a transaction without passing `{ session }`. The operation executes **outside the transaction** immediately on the primary database, breaking atomicity and isolation!\n- **Fix**: Every read, insert, update, and delete inside the transaction must include `{ session }`.\n\n### 2. Attempting Transactions on a Standalone mongod\n- **Mistake**: Trying to run `client.startSession()` on a local single-node MongoDB without initializing a replica set. The call fails with: `Transaction numbers are only allowed on a replica set member or mongos`.\n- **Fix**: Use MongoDB Atlas (which is always a 3-node replica set), or initiate a local replica set with `rs.initiate()`.\n\n### 3. Long-Running Transactions (Exceeding the 60-Second Limit)\n- **Mistake**: Performing slow external API calls (e.g. Stripe checkout or sending emails) inside the `withTransaction` block. If a transaction stays open longer than 60 seconds (`transactionLifetimeLimitSeconds`), MongoDB aborts it automatically!\n- **Fix**: Perform external API calls *before* or *after* the transaction. Keep database transactions ultra-fast (under 1-2 seconds).\n\n### 4. Overusing Transactions for Everything\n- **Mistake**: Using transactions for simple updates on a single document where atomic operators (`$inc`, `$set`) already guarantee safety. Transactions incur network overhead and lock synchronization.\n- **Fix**: Only use transactions when multi-document consistency is strictly required.",hi:'### 1. Database Operations Mein `{ session }` Pass Karna Bhool Jana\n- **Galati**: Transaction ke andar `updateOne()` likhna lekin `{ session }` na lagana. Isse woh operation transaction ke bahar turant execute ho jata hai aur rollback hone par bhi reverse nahi hota!\n- **Solution**: Transaction ke andar har query mein `{ session }` zaroor pass karein.\n\n### 2. Standalone Instance Par Transaction Chalana\n- **Galati**: Local single-node mongod par transaction chalana. Error aata hai: *"Transaction numbers are only allowed on replica set"*.\n- **Solution**: MongoDB Atlas use karein ya local machine par `rs.initiate()` chala kar replica set on karein.\n\n### 3. Transaction Ke Andar Slow External APIs Call Karna\n- **Galati**: Transaction ke beech mein Stripe payment API ya email bhejne ka wait karna. 60 seconds se zyada open rehne par MongoDB transaction ko automatically abort kar deta hai!\n- **Solution**: External APIs ko transaction se pehle ya baad mein chalayein. Database transaction ko 1 second ke andar finish karein.\n\n### 4. Har Choti Cheez Ke Liye Transaction Use Karna\n- **Galati**: Single document update ke liye bhi transaction lagana.\n- **Solution**: Single document par `$inc` ya `$set` pehle se hi atomic hote hain. Transaction sirf multiple documents ke liye use karein.'}},{type:"tip",heading:{en:"Best Practices: Transaction Architecture",hi:"Best Practices: Transaction Architecture"},body:{en:"1. **Always Use `session.withTransaction()`**: Avoid writing manual `startTransaction` / `commitTransaction` / `abortTransaction` loops. The callback API automatically handles transient retry logic and session lifecycle cleanup.\n2. **Keep Transactions Short & Focused**: Minimize the number of operations inside a transaction to prevent WiredTiger storage engine write lock contention.\n3. **Always End Sessions in a `finally` Block**: Never let sessions leak in memory: `finally { await session.endSession(); }`.\n4. **Prefer Denormalization Over Transactions**: If two pieces of data are always modified together, consider embedding them into a single document! Single-document atomic operations are 10x faster than distributed multi-document transactions.",hi:"1. **Hamesha `session.withTransaction()` Use Karein**: Manual commit/abort ke bajaye callback API use karein jo automatic retry handle karti hai.\n2. **Transaction Ko Chhota Aur Tez Rakhein**: Transaction ke andar kam se kam queries rakhein taaki database par locks zyada der tak na rahein.\n3. **Session Ko `finally` Block Mein End Karein**: Memory leak se bachne ke liye hamesha `finally { await session.endSession(); }` likhein.\n4. **Embedding Ko Prathmikta Dein**: Agar possible ho toh related data ko ek hi document mein embed karein taaki transaction lagane ki zaroorat hi na pade."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Top Interview Sawaal Aur Jawab"},body:{en:`### Q1: Are multi-document transactions in MongoDB as ACID-compliant as PostgreSQL or MySQL?
**Answer**:
Yes. Starting with MongoDB 4.0 (Replica Sets) and 4.2 (Distributed Sharded Clusters), MongoDB provides full multi-document ACID compliance. It uses snapshot isolation, ensures write durability via majority commit journal logging, and guarantees atomicity across multiple collections.

### Q2: What happens if an unhandled error is thrown inside \`session.withTransaction()\`?
**Answer**:
\`withTransaction()\` catches the error, automatically issues a rollback command (\`session.abortTransaction()\`) to cancel all uncommitted writes, cleans up internal state, and then rethrows the error to your application code.

### Q3: Why do multi-document transactions require a MongoDB Replica Set?
**Answer**:
Transactions rely on the **Oplog (Operations Log)** and distributed consensus across replica set nodes to guarantee durability, coordinate multi-document snapshot isolation, and handle failovers if the primary node crashes during a transaction.`,hi:`### Q1: Kya MongoDB ke transactions SQL (PostgreSQL/MySQL) jitne hi ACID-compliant hain?
**Jawab**:
Haan. MongoDB 4.0 aur 4.2 ke baad se multi-document transactions poori tarah ACID compliant hain. Yeh snapshot isolation use karte hain, majority journal write se durability dete hain, aur failure par poora rollback karte hain.

### Q2: \`session.withTransaction()\` ke andar error aane par kya hota hai?
**Jawab**:
\`withTransaction()\` error ko pakad kar turant \`abortTransaction()\` execute karta hai jisse saare writes cancel ho jaate hain, aur phir error ko aapke application code tak pahocha deta hai.

### Q3: Multi-document transactions ke liye Replica Set kyun zaroori hai?
**Jawab**:
Transactions ko snapshot isolation maintain karne aur durability guarantee karne ke liye **Oplog (Operations Log)** aur nodes ke beech consensus ki zaroorat hoti hai jo sirf Replica Set mein maujood hota hai.`}},{type:"summary",heading:{en:"Quick Summary: Multi-Document Transactions",hi:"Quick Summary: Multi-Document Transactions"},body:{en:"- **ACID Support**: Available for replica sets and sharded clusters.\n- **Single-Document Atomicity**: Single-document updates are always atomic by default.\n- **Client Sessions**: Transactions require an active session via `client.startSession()`.\n- **withTransaction Helper**: Preferred approach; handles commit, rollback, and transient error retries automatically.\n- **Critical Rule**: Always pass `{ session }` into every operation inside the transaction block.",hi:`- **ACID Support**: Replica Sets aur Atlas clusters par available hai.
- **Single-Document Atomicity**: Ek document par updates by default hamesha atomic hote hain.
- **Client Sessions**: Transaction chalane ke liye session banana padta hai.
- **withTransaction() Helper**: Sabse safe tareeka; commit, rollback aur auto-retry khud handle karta hai.
- **Zaroori Niyam**: Transaction ke andar har query mein \`{ session }\` zaroor pass karein.`}}],quiz:[{q:{en:"What happens if you execute collection.updateOne(...) inside a transaction WITHOUT passing { session }?",hi:"Agar aap transaction ke andar bina { session } pass kiye collection.updateOne(...) chalayein toh kya hoga?"},options:[{en:"It automatically infers the active session from context",hi:"Context se session automatically infer ho jata hai"},{en:"It executes immediately outside the transaction, violating atomicity and rollback guarantees",hi:"Yeh transaction ke bahar turant execute ho jata hai, jisse atomicity aur rollback toot jata hai"},{en:"The database halts and shuts down",hi:"Database band ho jata hai"},{en:"It converts into an in-memory mock operation",hi:"Mock operation ban jata hai"}],answerIndex:1,explanation:{en:"Operations that omit { session } do not participate in the transaction. They execute immediately on the primary node and cannot be rolled back if the transaction aborts.",hi:"Bina { session } wali query transaction ka hissa nahi banti aur turant execute ho jaati hai, isliye abort hone par rollback nahi ho pati."}},{q:{en:"What infrastructure configuration is strictly required to execute multi-document transactions in MongoDB?",hi:"MongoDB mein multi-document transactions chalane ke liye kaunsa setup anivarya hai?"},options:[{en:"A Replica Set (or MongoDB Atlas cluster)",hi:"Replica Set (ya MongoDB Atlas cluster)"},{en:"A standalone single-node instance without oplog",hi:"Standalone single instance bina oplog ke"},{en:"An external Apache Kafka broker",hi:"External Apache Kafka broker"},{en:"Redis cache memory",hi:"Redis cache memory"}],answerIndex:0,explanation:{en:"Multi-document transactions require the replication oplog and consensus mechanisms present only in a Replica Set or MongoDB Atlas.",hi:"Transactions ko oplog aur consensus ki zaroorat hoti hai jo sirf Replica Set ya Atlas mein hota hai."}},{q:{en:"What is the primary advantage of session.withTransaction() over manual start/commit transaction calls?",hi:"Manual start/commit ke mukable session.withTransaction() ka sabse bada fayda kya hai?"},options:[{en:"It encrypts database network traffic",hi:"Yeh traffic encrypt karta hai"},{en:"It automatically retries transient errors and write conflicts, and handles rollback cleanly",hi:"Yeh transient errors aur write conflicts ko automatically retry karta hai aur rollback cleanly handle karta hai"},{en:"It makes database queries run 100x faster",hi:"Yeh queries ko 100x fast bana deta hai"},{en:"It removes the need for database indexes",hi:"Index ki zaroorat khatam kar deta hai"}],answerIndex:1,explanation:{en:"withTransaction() includes built-in retry logic for TransientTransactionError and WriteConflict exceptions, and aborts automatically on unhandled errors.",hi:"withTransaction() mein retry logic built-in hota hai jo transient network errors aur write conflicts aane par automatically dobara try karta hai."}},{q:{en:"Why should long-running operations like sending emails or calling external payment APIs be kept OUTSIDE of a MongoDB transaction?",hi:"Email bhejna ya payment APIs call karna MongoDB transaction ke BAHAR kyun rakhna chahiye?"},options:[{en:"External network latency can cause the transaction to exceed MongoDB's default 60-second lifetime limit and abort",hi:"External network delay ki wajah se transaction 60-second limit cross karke abort ho sakta hai"},{en:"MongoDB cannot send HTTP network requests directly",hi:"MongoDB direct HTTP request nahi bhej sakta"},{en:"Email servers will block MongoDB IP addresses",hi:"Email servers IP block kar denge"},{en:"It causes the Node.js event loop to terminate",hi:"Event loop band ho jata hai"}],answerIndex:0,explanation:{en:"MongoDB enforces a default 60-second transaction lifetime limit. Slow external network calls risk exceeding this threshold and holding storage locks unnecessarily.",hi:"MongoDB transactions par 60 second ki limit hoti hai. Slow external APIs ki wajah se transaction abort ho sakta hai aur database locks fase reh sakte hain."}},{question:{en:"What is the core architectural purpose of Multi-Document Transactions & ACID Guarantees in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Multi-Document Transactions & ACID Guarantees ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling multi-document transactions & acid guarantees with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Multi-Document Transactions & ACID Guarantees ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Multi-Document Transactions & ACID Guarantees establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Multi-Document Transactions & ACID Guarantees clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Multi-Document Transactions & ACID Guarantees directly resolve?",hi:"Multi-Document Transactions & ACID Guarantees kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Multi-Document Transactions & ACID Guarantees, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Multi-Document Transactions & ACID Guarantees ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Multi-Document Transactions & ACID Guarantees, how is its mental model best conceptualized through real-world analogies?",hi:"Multi-Document Transactions & ACID Guarantees ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Multi-Document Transactions & ACID Guarantees, what syntactic convention is essential to prevent runtime errors?",hi:"Multi-Document Transactions & ACID Guarantees ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Multi-Document Transactions & ACID Guarantees?",hi:"Multi-Document Transactions & ACID Guarantees ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Multi-Document Transactions & ACID Guarantees be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Multi-Document Transactions & ACID Guarantees ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Multi-Document Transactions & ACID Guarantees impact application memory and CPU consumption?",hi:"Multi-Document Transactions & ACID Guarantees ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Multi-Document Transactions & ACID Guarantees?",hi:"Multi-Document Transactions & ACID Guarantees mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Multi-Document Transactions & ACID Guarantees?",hi:"Multi-Document Transactions & ACID Guarantees mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Multi-Document Transactions & ACID Guarantees?",hi:"Multi-Document Transactions & ACID Guarantees mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Multi-Document Transactions & ACID Guarantees, what must the test suite assert?",hi:"Multi-Document Transactions & ACID Guarantees ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Multi-Document Transactions & ACID Guarantees?",hi:"Modular design Multi-Document Transactions & ACID Guarantees mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Multi-Document Transactions & ACID Guarantees be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Multi-Document Transactions & ACID Guarantees ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Multi-Document Transactions & ACID Guarantees properly belong and execute?",hi:"Full-stack MERN architecture mein Multi-Document Transactions & ACID Guarantees kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Multi-Document Transactions & ACID Guarantees in production?",hi:"Production mein Multi-Document Transactions & ACID Guarantees ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Multi-Document Transactions & ACID Guarantees?",hi:"Multi-Document Transactions & ACID Guarantees ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Multi-Document Transactions & ACID Guarantees?",hi:"Multi-Document Transactions & ACID Guarantees mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
