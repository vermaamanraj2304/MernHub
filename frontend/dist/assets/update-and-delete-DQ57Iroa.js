const e={id:"mongo-update-delete",title:{en:"Update & Delete: Atomic Field Operators",hi:"Update & Delete: Atomic Operators ($set, $inc, $push)"},difficulty:"Beginner",readTime:10,sections:[{type:"concept",heading:{en:"1. Atomic Updates in MongoDB ($set, $inc, $unset)",hi:"1. MongoDB Mein Atomic Updates ($set, $inc, $unset)"},body:{en:"In MongoDB, document updates are **atomic at the single-document level**. Even if multiple network requests hit the server at the exact same millisecond, MongoDB executes each document mutation sequentially, preventing corrupted state.\n\n### Field Update Operators:\n- **`$set`**: Replaces the value of a field, or creates the field if it does not exist. (Never pass a plain object to `updateOne` without `$set`!).\n- **`$unset`**: Deletes a specific field from the document entirely.\n- **`$inc`**: Increments (or decrements with negative numbers) a numeric field by a specified value atomically.\n- **`$min` / `$max`**: Only updates the field if the specified value is less than / greater than the existing value.\n- **`$rename`**: Renames a field key without moving or rewriting the document.\n\n### Update Methods:\n- `updateOne(filter, updateDoc, options)`: Updates the first document that matches the filter.\n- `updateMany(filter, updateDoc, options)`: Updates all documents that match the filter.\n- `replaceOne(filter, replacementDoc)`: Completely replaces the entire document (except for the immutable `_id`).",hi:"MongoDB mein updates **single-document level par atomic** hote hain. Agar hazaron users ek sath ek hi product par click karein, toh bhi MongoDB har update ko bina data corrupt kiye safe tareeqe se execute karta hai.\n\n### Field Update Operators:\n- **`$set`**: Kisi field ki value ko update karta hai, aur agar field na ho toh naya bana deta hai.\n- **`$unset`**: Document se kisi specific field ko poori tarah mita deta hai.\n- **`$inc`**: Number field ko atomically badhata ya ghatata hai (negative value se decrease hota hai). Race conditions se bachne ke liye best tareeka.\n- **`$min` / `$max`**: Field ko tabhi update karta hai agar nayi value purani se chhoti ya badi ho.\n- **`$rename`**: Field ka naam badalta hai bina poora document rewrite kiye.\n\n### Update Methods:\n- `updateOne(filter, updateDoc, options)`: Filter se match hone wale pehle document ko update karta hai.\n- `updateMany(filter, updateDoc, options)`: Match hone wale sabhi documents ko update karta hai.\n- `replaceOne(filter, replacementDoc)`: `_id` ko chhod kar poore document ko naye object se replace kar deta hai."}},{type:"concept",heading:{en:"2. Array Manipulation Operators & Upsert Option",hi:"2. Array Update Operators aur Upsert Ka Option"},body:{en:"MongoDB treats arrays as first-class citizen fields. Rather than fetching the array into JavaScript, modifying it, and saving it back, MongoDB provides powerful atomic array operators:\n\n### Array Operators:\n- **`$push`**: Appends an element to an array field.\n- **`$addToSet`**: Appends an element to an array **only if it does not already exist** (guarantees unique sets, preventing duplicates).\n- **`$pull`**: Removes all elements from an array that match a specified value or condition.\n- **`$pop`**: Removes the first (`-1`) or last (`1`) element from an array.\n- **Modifiers (`$each`, `$slice`, `$sort`)**: Used with `$push` to append multiple items, trim array lengths, or keep arrays sorted.\n\n### The `upsert: true` Flag:\n`upsert` is a combination of **UPDATE + INSERT**. If a matching document is found, it performs an update. If **no document matches**, it automatically creates and inserts a brand new document!",hi:"MongoDB mein arrays first-class data type hote hain. Array ko pehle Node.js mein fetch karke modify karne ke bajaye seedhe MongoDB server par atomic operators chalaye jaate hain:\n\n### Array Mutation Operators:\n- **`$push`**: Array ke aakhir mein naya item add karta hai.\n- **`$addToSet`**: Array mein item tabhi jodta hai jab woh **pehle se maujood na ho** (duplicates se bachata hai).\n- **`$pull`**: Array mein se condition match karne wale items ko remove kar deta hai.\n- **`$pop`**: Array ka pehla (`-1`) ya aakhiri (`1`) element delete karta hai.\n- **Modifiers (`$each`, `$slice`)**: Ek sath multiple items add karne ya array size limit karne ke liye use hote hain.\n\n### `upsert: true` Flag:\n`upsert` ka matlab hai **Update + Insert**. Agar filter se document mil gaya toh update hoga; agar koi document nahi mila, toh wahi data naya document ban kar insert ho jayega!"}},{type:"analogy",heading:{en:"Real-Life Analogy: Indian Ration Card & Bank Passbook Entry",hi:"Real-Life Analogy: Ration Card Mein Naya Naam Jodna Aur Bank Balance Entry"},body:{en:"Consider how government and banking records are updated in everyday life:\n\n- **`$set` (Address Change)**: When you move to a new rented flat, the clerk takes your Aadhaar card and crosses out the old street address, writing the new address on top.\n- **`$inc` (Bank Passbook Printing)**: When you deposit ₹5,000 cash, the bank teller doesn't calculate `currentBalance + 5000` on an external calculator. The core banking server runs an atomic increment (`balance + 5000`). Even if an ATM withdrawal happens at the exact same second, both transactions queue cleanly without losing money.\n- **`$addToSet` (Adding a Newborn to Ration Card)**: When adding a new family member to your Ration Card, the food officer checks if the name already exists. If the child is already registered, they won't duplicate the name.\n- **`$pull` (Removing a Member After Marriage)**: When a daughter marries and moves to another family, her name is pulled from her parent's Ration Card.\n- **`deleteOne` vs `deleteMany`**: Shredding one specific cancelled cheque vs incinerating an entire box of 10-year-old expired receipts.",hi:"Rozmarrah ki zindagi se update aur delete ke tareeqe samjhein:\n\n- **`$set` (Pata Badalne Ka Form)**: Jab aap naye ghar mein shift hote hain, toh clerk purane pate ki jagah naya address `$set` kar deta hai.\n- **`$inc` (Bank Passbook Mein Cash Jama Karna)**: Jab aap bank counter par ₹5,000 jama karte hain, toh teller calculator par calculate karke purana balance overwrite nahi karta. System atomically `balance + 5000` kar deta hai. Agar usi second ATM se paise nikal rahe hon, tab bhi race condition nahi aati!\n- **`$addToSet` (Ration Card Mein Naya Parivaar Sadasya)**: Ration card mein jab naye sadasya ka naam likha jata hai, toh officer check karta hai ki naam pehle se toh nahi hai. Agar pehle se hai toh dobara nahi judega.\n- **`$pull` (Ration Card Se Naam Katwana)**: Shadi ke baad beti ka naam parent ke ration card se hata diya jata hai (`$pull`).\n- **`deleteOne` vs `deleteMany`**: Ek specific expired passbook ko raddh karna vs 10 saal purane saare kachre ke dhabbe ko ek sath aag lagana."}},{type:"syntax",heading:{en:"Syntax & Signatures: Update & Delete",hi:"Syntax & Signatures: Update aur Delete Ke Formats"},body:{en:`### Update Operations Syntax:
\`\`\`javascript
// Update Single Document
const res = await collection.updateOne(
  { _id: new ObjectId("...") },
  {
    $set: { status: "shipped", updatedAt: new Date() },
    $inc: { version: 1 }
  },
  { upsert: false }
);
console.log(res.matchedCount, res.modifiedCount);

// Upsert Example: Create counter if not present, else increment
await collection.updateOne(
  { metric: "page_views", date: "2026-10-28" },
  { $inc: { count: 1 } },
  { upsert: true }
);

// Delete Operations
const delOne = await collection.deleteOne({ _id: new ObjectId("...") });
console.log(delOne.deletedCount); // 1 or 0

const delMany = await collection.deleteMany({ status: "abandoned" });
console.log(delMany.deletedCount);
\`\`\``,hi:`### Update Operations Ka Syntax:
\`\`\`javascript
// Single document update
const res = await collection.updateOne(
  { _id: new ObjectId("...") },
  {
    $set: { status: "shipped", updatedAt: new Date() },
    $inc: { attempts: 1 }
  }
);
console.log(res.matchedCount, res.modifiedCount);

// Upsert: agar record nahi mila toh naya create karein
await collection.updateOne(
  { key: "daily_hits", date: "2026-10-28" },
  { $inc: { total: 1 } },
  { upsert: true }
);

// Delete operations
await collection.deleteOne({ _id: new ObjectId("...") });
await collection.deleteMany({ isBanned: true });
\`\`\``}},{type:"example",heading:{en:"Example 1: Basic Field Updates, Increments & Upsert",hi:"Example 1: Basic Fields, $inc aur Upsert Execution"},body:{en:"Performing atomic field modifications, numeric score updates, and tracking daily visits via `upsert: true`.",hi:"Atomic field update, score increment aur daily hits ko `upsert: true` se track karna."},code:{language:"javascript",filename:"basic-update-upsert.js",snippet:`import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function run() {
  await client.connect();
  const db = client.db("gameDB");
  const players = db.collection("players");
  const stats = db.collection("daily_stats");

  await players.deleteMany({});
  await stats.deleteMany({});

  // Insert player
  await players.insertOne({
    username: "pro_gamer_99",
    coins: 100,
    level: 1,
    inventory: ["wooden_sword"]
  });

  // 1. Atomic level up and coin addition ($inc & $set)
  const updateRes = await players.updateOne(
    { username: "pro_gamer_99" },
    {
      $inc: { coins: 250, level: 1 },
      $set: { lastActive: new Date() }
    }
  );
  console.log("Matched:", updateRes.matchedCount, "Modified:", updateRes.modifiedCount);

  // 2. Upsert: Record daily login stat
  // If record for today doesn't exist, create it and set totalLogins to 1
  const today = "2026-10-28";
  const upsertRes = await stats.updateOne(
    { date: today, region: "ap-south-1" },
    {
      $inc: { totalLogins: 1 },
      $setOnInsert: { createdAt: new Date() } // only sets if document is created
    },
    { upsert: true }
  );

  console.log("Upserted ID:", upsertRes.upsertedId || "Updated existing record");

  const playerDoc = await players.findOne({ username: "pro_gamer_99" });
  console.log("Updated Player:", {
    username: playerDoc.username,
    coins: playerDoc.coins,
    level: playerDoc.level
  });

  await client.close();
}

run().catch(console.error);

/*
Expected Output:
Matched: 1 Modified: 1
Upserted ID: ObjectId("...")
Updated Player: { username: 'pro_gamer_99', coins: 350, level: 2 }
*/`}},{type:"example",heading:{en:"Example 2: Array Mutations ($push, $addToSet, $pull, $slice)",hi:"Example 2: Array Mutations ($push, $addToSet, $pull, $slice)"},body:{en:"Managing an e-commerce shopping cart and tags using atomic array operators without duplicate tags and capped history arrays.",hi:"E-commerce shopping cart aur tags ko bina race conditions aur duplicates ke manage karna."},code:{language:"javascript",filename:"array-operators.js",snippet:`import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function manageUserArrays() {
  await client.connect();
  const users = client.db("shopDB").collection("users");

  await users.deleteMany({});
  await users.insertOne({
    name: "Sunita Roy",
    tags: ["tech", "gadgets"],
    recentViews: ["phone_1", "laptop_2"],
    cart: [
      { productId: "p101", quantity: 1, price: 500 }
    ]
  });

  // 1. $addToSet: Try adding existing tag 'tech' and new tag 'deals'
  // 'tech' will be skipped; 'deals' will be added!
  await users.updateOne(
    { name: "Sunita Roy" },
    { $addToSet: { tags: { $each: ["tech", "deals", "ai"] } } }
  );

  // 2. $push with $slice: Keep only the latest 3 recently viewed items
  await users.updateOne(
    { name: "Sunita Roy" },
    {
      $push: {
        recentViews: {
          $each: ["watch_3", "tablet_4"],
          $slice: -3 // Keeps only the last 3 elements
        }
      }
    }
  );

  // 3. $pull: Remove item 'p101' from cart
  await users.updateOne(
    { name: "Sunita Roy" },
    { $pull: { cart: { productId: "p101" } } }
  );

  const updatedUser = await users.findOne({ name: "Sunita Roy" });
  console.log("Updated Tags (no duplicate tech):", updatedUser.tags);
  console.log("Recent Views (capped at last 3):", updatedUser.recentViews);
  console.log("Cart after $pull:", updatedUser.cart);

  await client.close();
}

manageUserArrays().catch(console.error);

/*
Expected Output:
Updated Tags (no duplicate tech): [ 'tech', 'gadgets', 'deals', 'ai' ]
Recent Views (capped at last 3): [ 'laptop_2', 'watch_3', 'tablet_4' ]
Cart after $pull: []
*/`}},{type:"example",heading:{en:"Example 3: Real-World Inventory Deduction Service (Preventing Negative Stock)",hi:"Example 3: Safe Inventory Deduction Service (Negative Stock Se Bachav)"},body:{en:"Handling concurrent flash-sale purchases with atomic condition-based stock decrements, ensuring stock never falls below zero.",hi:"Flash sale ke dauran atomic `$inc` aur conditional filter ke zariye out-of-stock race condition se suraksha."},code:{language:"javascript",filename:"inventory-service.js",snippet:`import { MongoClient, ObjectId } from "mongodb";

/**
 * Atomically deducts inventory for a product during order checkout.
 * CRITICAL: The filter verifies that stockQuantity >= quantityRequested.
 * If stock is insufficient, matchedCount is 0, guaranteeing no negative stock!
 */
export async function deductProductStock(db, productId, quantityRequested) {
  const products = db.collection("products");

  const result = await products.updateOne(
    {
      _id: new ObjectId(productId),
      stockQuantity: { $gte: quantityRequested } // Guard condition
    },
    {
      $inc: { stockQuantity: -quantityRequested },
      $set: { lastOrderedAt: new Date() }
    }
  );

  if (result.matchedCount === 0) {
    // Either product does not exist OR insufficient stock available
    const product = await products.findOne({ _id: new ObjectId(productId) });
    if (!product) {
      throw new Error(\`Product \${productId} not found.\`);
    }
    throw new Error(
      \`Insufficient inventory. Available: \${product.stockQuantity}, Requested: \${quantityRequested}\`
    );
  }

  return { success: true, message: \`Deducted \${quantityRequested} units from stock.\` };
}

// Test Simulation
async function simulateFlashSale() {
  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();
  const db = client.db("inventoryDB");
  const products = db.collection("products");

  await products.deleteMany({});
  const { insertedId } = await products.insertOne({
    title: "iPhone 16 Pro Max",
    stockQuantity: 3
  });

  console.log("Initial stock: 3 units");

  // Buyer 1: Requests 2 units -> Should succeed
  const buy1 = await deductProductStock(db, insertedId, 2);
  console.log("Order 1:", buy1.message);

  // Buyer 2: Requests 2 units -> Only 1 left, should safely fail!
  try {
    await deductProductStock(db, insertedId, 2);
  } catch (err) {
    console.log("Order 2 caught safely:", err.message);
  }

  const finalDoc = await products.findOne({ _id: insertedId });
  console.log("Final verified stock remaining:", finalDoc.stockQuantity);

  await client.close();
}

simulateFlashSale().catch(console.error);

/*
Expected Output:
Initial stock: 3 units
Order 1: Deducted 2 units from stock.
Order 2 caught safely: Insufficient inventory. Available: 1, Requested: 2
Final verified stock remaining: 1
*/`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Aam Galatiyan Aur Unka Solution"},body:{en:"### 1. Accidental Document Replacement (Omitting `$set`)\n- **Mistake**: In older MongoDB drivers or careless code, executing an update without an operator like `updateOne({ _id }, { status: 'paid' })` replaces the entire document with only `{ _id, status: 'paid' }`, obliterating all other fields!\n- **Fix**: Always specify operator verbs: `$set: { status: 'paid' }`.\n\n### 2. The Read-Modify-Write Race Condition\n- **Mistake**: Writing `const p = await db.products.findOne({ _id }); await db.products.updateOne({ _id }, { $set: { views: p.views + 1 } })`. Under high concurrency, 50 concurrent requests will overwrite each other's calculations, resulting in lost updates!\n- **Fix**: Always use atomic operators: `updateOne({ _id }, { $inc: { views: 1 } })`.\n\n### 3. Using `$push` Instead of `$addToSet` for Unique Lists\n- **Mistake**: Adding user hobbies or role permissions with `$push`. Clicking the button twice creates duplicate entries (`['admin', 'admin']`).\n- **Fix**: Use `$addToSet`.\n\n### 4. Running `deleteMany({})` Without Safety Checks\n- **Mistake**: Passing an empty filter object `deleteMany({})` wipes out the entire collection in production!\n- **Fix**: Never construct delete queries from unchecked user parameters. Validate that mandatory identifiers exist before invoking delete operations.",hi:"### 1. Bina `$set` Ke Poora Document Overwrite Ho Jana\n- **Galati**: Update mein bina operator ke seedhe field pass kar dena. Isse `_id` ko chhod kar document ke baaki saare fields delete ho jaate hain!\n- **Solution**: Hamesha operator specify karein: `$set: { status: 'paid' }`.\n\n### 2. Read-Modify-Write Ki Race Condition\n- **Galati**: Pehle document fetch karna, JavaScript mein variable badhana (`views + 1`), aur phir `$set` karna. Concurrent traffic mein views count galat ho jayega.\n- **Solution**: Hamesha database-level atomic operator use karein: `$inc: { views: 1 }`.\n\n### 3. Unique Tags Ke Liye `$push` Ka Use Karna\n- **Galati**: Tags ya roles mein `$push` use karna jisse duplicate values jama ho jaati hain.\n- **Solution**: `$addToSet` ka use karein jo pehle check karta hai ki value already hai ya nahi.\n\n### 4. Empty Filter Par `deleteMany({})` Chal Jana\n- **Galati**: Galti se khaali filter `{}` pass kar dena jisse poori collection ka saara data bina kisi warning ke udd jata hai.\n- **Solution**: Delete API mein hamesha check karein ki valid ID ya condition maujood hai."}},{type:"tip",heading:{en:"Best Practices: Updates & Soft Deletes",hi:"Best Practices: Updates Aur Soft Deletion"},body:{en:"1. **Adopt Soft Deletes (`isDeleted: true`)**: In production e-commerce, banking, and SaaS apps, never permanently hard delete records. Add `isDeleted: true` and `deletedAt: new Date()`. This preserves audit logs, protects foreign references, and allows instant undeletion.\n2. **Combine Guard Conditions with `$inc`**: Always write `{ _id, stock: { $gte: qty } }` when decrementing inventory to make the operation completely thread-safe without external locks.\n3. **Use `$setOnInsert` with Upserts**: When `upsert: true` triggers a new document insertion, use `$setOnInsert` for fields like `createdAt` or initial baseline stats that should never be overwritten during subsequent updates.\n4. **Log Matched vs Modified Count**: `res.matchedCount` tells you if the query found the target document; `res.modifiedCount` tells you if the fields were actually different and updated.",hi:"1. **Soft Delete Pattern Apnayein (`isDeleted: true`)**: Production apps mein data ko hard delete karne ke bajaye `isDeleted: true` mark karein. Isse audit logs safe rehte hain aur galti se delete hua data wapas laya ja sakta hai.\n2. **Conditional Filter Ke Sath `$inc` Lagayein**: Stock ghatate waqt query filter mein `stock: { $gte: qty }` shart zaroor rakhein, jisse stock kabhi negative na ho sake.\n3. **Upsert Ke Sath `$setOnInsert` Use Karein**: Document pehli baar create hote waqt jo fields set hone chahiye (jaise `createdAt`), unhe `$setOnInsert` mein rakhein taaki baad ke updates mein woh na badlein.\n4. **Matched vs Modified Ka Dhyan Rakhein**: `matchedCount` batata hai ki document mila ya nahi, aur `modifiedCount` batata hai ki value sach mein badli ya nahi."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Top Interview Sawaal Aur Jawab"},body:{en:'### Q1: What is the difference between `$push` and `$addToSet`?\n**Answer**:\nBoth operators append elements to an array field. However:\n- `$push`: Appends the item blindly, allowing identical duplicate values to accumulate in the array.\n- `$addToSet`: Treats the array as a mathematical set. It checks if the item is already present. If present, it does nothing; if absent, it appends it.\n\n### Q2: What is the difference between `updateOne()` and `replaceOne()`?\n**Answer**:\n- `updateOne(filter, { $set: { age: 30 } })`: Modifies only the specified fields, leaving all existing fields in the document intact.\n- `replaceOne(filter, { name: "Aman", age: 30 })`: Wipes out all existing fields (except `_id`) and replaces the entire document with the new object structure.\n\n### Q3: How do you perform an upsert in MongoDB, and what does `$setOnInsert` do?\n**Answer**:\nPass `{ upsert: true }` in the options argument of `updateOne`. If no document matches the filter, MongoDB creates a new document combining the filter criteria and the update operators. `$setOnInsert` lets you define fields (such as `createdAt` or initial balance) that are **only written when a new document is inserted**, and completely ignored if an existing document is updated.',hi:"### Q1: `$push` aur `$addToSet` mein kya mukhya antar hai?\n**Jawab**:\nDono array mein item add karte hain, lekin:\n- `$push`: Bina check kiye item append karta hai, jisse duplicate values aa sakti hain.\n- `$addToSet`: Array ko set ki tarah treat karta hai. Agar value pehle se hai toh dobara add nahi karta (duplicate-free).\n\n### Q2: `updateOne()` aur `replaceOne()` mein kya farq hai?\n**Jawab**:\n- `updateOne`: Sirf unhi fields ko badalta hai jo `$set` ya `$inc` mein diye gaye hon, baaki document waisa hi rehta hai.\n- `replaceOne`: Purane document ke saare fields mita kar naya object rakh deta hai (sirf `_id` wahi rehta hai).\n\n### Q3: MongoDB mein Upsert kya hota hai aur `$setOnInsert` kab use hota hai?\n**Jawab**:\n`updateOne` ke options mein `{ upsert: true }` pass karne par agar record na mile toh naya document insert ho jata hai. `$setOnInsert` un properties ko set karne ke liye hota hai jo sirf naye document insert hone par apply hone chahiye (jaise `createdAt`)."}},{type:"summary",heading:{en:"Quick Summary: Update & Delete Operators",hi:"Quick Summary: Update & Delete Operators"},body:{en:"- **Atomic Field Operators**: Use `$set` to modify fields, `$unset` to delete fields, and `$inc` for thread-safe counters.\n- **Array Mutation**: Use `$push` to add, `$addToSet` for unique items, and `$pull` to remove matching items.\n- **Upsert Flag**: `{ upsert: true }` automatically creates a document if no match is found; pair with `$setOnInsert`.\n- **Concurrency Protection**: Combine guard conditions in filters (`{ stock: { $gte: qty } }`) with atomic updates to avoid race conditions without locks.\n- **Soft Deletion**: Prefer `$set: { isDeleted: true }` over hard `deleteOne` for audit trails and recoverable data.",hi:"- **Field Operators**: Field update ke liye `$set`, hatane ke liye `$unset`, aur counter ke liye `$inc` atomic operator use karein.\n- **Array Operators**: `$push` naya item dalne ke liye, `$addToSet` unique items ke liye, aur `$pull` delete karne ke liye.\n- **Upsert Flag**: `{ upsert: true }` se update or insert hota hai; `$setOnInsert` pehli baar create hone par chalta hai.\n- **Race Condition Prevention**: Guard filters (`stock: { $gte: req }`) ke sath `$inc` use karne se negative stock kabhi nahi banta.\n- **Soft Delete**: Permanent delete ke bajaye `isDeleted: true` mark karna enterprise applications ka standard rule hai."}}],quiz:[{q:{en:"What happens if you run collection.updateOne({ id: 1 }, { status: 'active' }) without an update operator verb?",hi:"Agar aap bina kisi operator verb ke collection.updateOne({ id: 1 }, { status: 'active' }) chalayein toh kya hoga?"},options:[{en:"MongoDB safely defaults to $set for all properties",hi:"MongoDB automatically $set maan leta hai"},{en:"In modern drivers, it throws a MongoInvalidArgumentError requiring atomic operators",hi:"Modern drivers mein MongoInvalidArgumentError throw hota hai kyunki operator zaroori hai"},{en:"It deletes the document from the collection",hi:"Document collection se delete ho jata hai"},{en:"It creates a duplicate document",hi:"Ek duplicate document ban jata hai"}],answerIndex:1,explanation:{en:"Modern MongoDB drivers require top-level update documents to contain atomic operator verbs like $set, throwing an error otherwise to prevent accidental document overwrites.",hi:"Modern drivers mein update document ke top-level par atomic operator ($set, $inc etc.) hona anivarya hai, warna error aata hai."}},{q:{en:"Which operator should you use to guarantee an array never contains duplicate tags?",hi:"Yeh pakka karne ke liye ki array mein duplicate tags na aayein, kaunsa operator use karna chahiye?"},options:[{en:"$push",hi:"$push"},{en:"$addToSet",hi:"$addToSet"},{en:"$appendUnique",hi:"$appendUnique"},{en:"$insertArray",hi:"$insertArray"}],answerIndex:1,explanation:{en:"$addToSet appends the value only if it does not already exist in the array, maintaining unique set semantics.",hi:"$addToSet tabhi item add karta hai jab woh array mein pehle se maujood na ho."}},{q:{en:"When using { upsert: true }, when does the $setOnInsert operator execute?",hi:"{ upsert: true } use karte waqt $setOnInsert operator kab execute hota hai?"},options:[{en:"On every single update operation",hi:"Har single update operation par"},{en:"Only when a brand new document is inserted because no match existed",hi:"Sirf tab jab koi match na milne par naya document insert hota hai"},{en:"Only when an existing document is being updated",hi:"Sirf tab jab purane document ko update kiya ja raha ho"},{en:"Only when the document is being deleted",hi:"Sirf tab jab document delete ho raha ho"}],answerIndex:1,explanation:{en:"$setOnInsert only executes during the initial document creation phase of an upsert, making it ideal for fields like createdAt.",hi:"$setOnInsert sirf tab apply hota hai jab upsert ke dauran naya document insert kiya jata hai."}},{q:{en:"Why is collection.updateOne({ _id, stock: { $gte: 1 } }, { $inc: { stock: -1 } }) safe from concurrency race conditions?",hi:"collection.updateOne({ _id, stock: { $gte: 1 } }, { $inc: { stock: -1 } }) race condition se safe kyun hai?"},options:[{en:"MongoDB places an explicit server-wide lock on the database",hi:"MongoDB poore database par lock laga deta hai"},{en:"MongoDB document writes are atomic, evaluating filter and update in one indivisible operation",hi:"MongoDB document writes atomic hote hain, filter aur update ek sath execute hote hain"},{en:"Node.js runs single-threaded so race conditions are physically impossible",hi:"Node.js single-threaded hai isliye race condition ho hi nahi sakti"},{en:"It rolls back using an automatic undo log",hi:"Automatic undo log se rollback ho jata hai"}],answerIndex:1,explanation:{en:"MongoDB evaluates document filters and atomic operators as an indivisible atomic step per document, ensuring stock cannot be decremented below the condition even under thousands of concurrent requests.",hi:"MongoDB document level par atomic hota hai, filter check aur decrement ek indivisible step mein hota hai jisse concurrency safe rehti hai."}},{question:{en:"What is the core architectural purpose of Update & Delete: Atomic Field Operators in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Update & Delete: Atomic Operators ($set, $inc, $push) ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling update & delete: atomic field operators with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Update & Delete: Atomic Operators ($set, $inc, $push) ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Update & Delete: Atomic Field Operators establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Update & Delete: Atomic Field Operators directly resolve?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Update & Delete: Atomic Field Operators, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Update & Delete: Atomic Field Operators, how is its mental model best conceptualized through real-world analogies?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Update & Delete: Atomic Field Operators, what syntactic convention is essential to prevent runtime errors?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Update & Delete: Atomic Field Operators?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Update & Delete: Atomic Field Operators be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Update & Delete: Atomic Operators ($set, $inc, $push) ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Update & Delete: Atomic Field Operators impact application memory and CPU consumption?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Update & Delete: Atomic Field Operators?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Update & Delete: Atomic Field Operators?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Update & Delete: Atomic Field Operators?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Update & Delete: Atomic Field Operators, what must the test suite assert?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Update & Delete: Atomic Field Operators?",hi:"Modular design Update & Delete: Atomic Operators ($set, $inc, $push) mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Update & Delete: Atomic Field Operators be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Update & Delete: Atomic Operators ($set, $inc, $push) ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Update & Delete: Atomic Field Operators properly belong and execute?",hi:"Full-stack MERN architecture mein Update & Delete: Atomic Operators ($set, $inc, $push) kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Update & Delete: Atomic Field Operators in production?",hi:"Production mein Update & Delete: Atomic Operators ($set, $inc, $push) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Update & Delete: Atomic Field Operators?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Update & Delete: Atomic Field Operators?",hi:"Update & Delete: Atomic Operators ($set, $inc, $push) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
