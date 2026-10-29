export default {
  id: "mongo-mongoose-virtuals",
  title: {
    en: "Virtual Properties, Instance & Static Methods",
    hi: "Virtual Properties, Instance & Static Methods",
  },
  difficulty: "Intermediate",
  readTime: 12,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. Virtual Properties (Getters & Setters)",
        hi: "1. Virtual Properties (Getters Aur Setters Ka Concept)",
      },
      body: {
        en: `In database design, storing derived or computed data directly in the database is an anti-pattern. If you store \`firstName\`, \`lastName\`, and \`fullName\` separately, you risk data inconsistency: what happens when \`firstName\` is updated, but someone forgets to update \`fullName\`?

**Virtuals** are document properties that you can get and set like normal fields, but they are **NOT persisted in MongoDB storage**. They exist purely in JavaScript memory inside your Node.js application.

### Virtual Getters & Setters:
- **Getter**: Computes a value dynamically on the fly whenever the property is accessed (e.g. \`fullName = firstName + " " + lastName\`, or calculating price including 18% GST).
- **Setter**: Deconstructs an assigned value and updates the underlying stored fields (e.g. assigning \`user.fullName = "Aman Verma"\` automatically splits the string and sets \`firstName = "Aman"\` and \`lastName = "Verma"\`).

### Crucial Serialization Rule:
By default, Mongoose **does not include virtuals** when converting documents to JSON (via \`JSON.stringify()\` or Express \`res.json()\`).
To expose virtuals in API responses, you must configure your schema options:
\`\`\`javascript
const schema = new mongoose.Schema({ ... }, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
\`\`\``,
        hi: `Database design mein calculated data ko physical storage mein store karna galat practice mani jaati hai. Agar aap \`firstName\`, \`lastName\` aur \`fullName\` teeno alag-alag save karenge, toh kal ko agar first name badla aur full name badalna bhool gaye, toh data corrupt ho jayega.

**Virtuals** aisi properties hoti hain jinhe aap normal field ki tarah read aur write kar sakte hain, lekin woh **MongoDB database mein store nahi hoti**. Yeh sirf aapki Node.js application ki memory mein dynamically calculate hoti hain.

### Virtual Getters Aur Setters:
- **Getter**: Jab bhi aap property access karte hain, yeh dynamically value calculate karta hai (jaise \`fullName = firstName + " " + lastName\`, ya 18% GST jodkar price calculate karna).
- **Setter**: Jab aap virtual field par value assign karte hain (\`user.fullName = "Aman Verma"\`), toh yeh use tod kar asli fields (\`firstName = "Aman"\`, \`lastName = "Verma"\`) ko update kar deta hai.

### Zaroori Setting (\`toJSON\`):
By default jab Express API \`res.json(user)\` bhejti hai, toh Mongoose virtuals ko include nahi karta. Virtuals ko JSON response mein bhejne ke liye schema options mein yeh lagana anivarya hai:
\`\`\`javascript
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
\`\`\``,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Document Instance Methods vs Model Static Methods",
        hi: "2. Instance Methods vs Static Methods Ka Antar",
      },
      body: {
        en: `Encapsulating business logic directly into Mongoose schemas creates **"Fat Models and Skinny Controllers"**—a core software engineering best practice that keeps Express route controllers clean, testable, and reusable.

### Instance Methods (\`schema.methods\`):
- Bound to **individual document instances**.
- \`this\` refers to the **specific document** executing the method.
- *Examples*:
  - \`user.comparePassword(candidatePassword)\`
  - \`user.generateAuthToken()\`
  - \`order.calculateDiscount(couponCode)\`

### Static Methods (\`schema.statics\`):
- Bound to the **Model constructor itself** (collection-level logic).
- \`this\` refers to the **Mongoose Model** (e.g. \`User\`, \`Product\`).
- *Examples*:
  - \`User.findByCredentials(email, password)\`
  - \`Product.findTrending(category)\`
  - \`Order.getMonthlyRevenue(year, month)\``,
        hi: `Business logic ko Express controllers mein bikhrene ke bajaye Mongoose schema ke andar rakhna software engineering ka **"Fat Models, Skinny Controllers"** principle kehlata hai. Isse code clean aur reusable banta hai.

### Instance Methods (\`schema.methods\`):
- Yeh ek **single document instance** par chalte hain.
- Yahan \`this\` us **specific document** ko point karta hai.
- *Examples*:
  - \`user.comparePassword(enteredPassword)\`: Ek specific user ka password check karna.
  - \`user.generateJWT()\`: Us specific user ke liye token banana.

### Static Methods (\`schema.statics\`):
- Yeh poore **Model constructor** par chalte hain (collection level).
- Yahan \`this\` us **Model** ko point karta hai.
- *Examples*:
  - \`User.findByCredentials(email, password)\`: Email se user dhoond kar verify karna.
  - \`Product.findTopRated()\`: Top rated products nikalna.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Car Dashboard, Ignition Key, and Dealership",
        hi: "Real-Life Analogy: Car Ka Speedometer, Chaabi Aur Maruti Suzuki Dealership",
      },
      body: {
        en: `Consider an automobile to understand these three Mongoose features:

- **Virtual Property (The Digital Speedometer Display)**:
  - Your car's tire spins and emits pulses. The digital dashboard calculates and displays *"60 km/h"* (or toggles to *"37 mph"* for US roads).
  - The number "60 km/h" is not physically stamped into the rubber tire or written onto the chassis. It is a live, dynamic calculation (**Virtual Getter**)!
- **Instance Method (Your Specific Car's Ignition Key & Accelerator)**:
  - You sit inside *your specific Swift Dzire* (License Plate: MH-02-AB-1234).
  - You turn the ignition key and press the gas pedal: \`myCar.accelerate(20)\`.
  - It only accelerates *your car*, not your neighbor's car (**Instance Method acting on a specific document instance**).
- **Static Method (The Maruti Suzuki Central Dealership Headquarters)**:
  - You call Maruti Suzuki corporate headquarters and ask: *"How many total Swift cars were manufactured across all factories in 2026?"*
  - You don't ask your personal steering wheel; you ask the brand model itself: \`Car.getTotalManufactured(2026)\` (**Static Method on the Model class**).`,
        hi: `Ek gaadi (car) ke example se teeno ko samjhein:

- **Virtual Property (Car Ka Digital Speedometer)**:
  - Gaadi ka pahiya ghoomta hai aur dashboard par likha aata hai *"60 km/h"*.
  - Yeh "60" ka number pahiye ke tyre par permanently khuda nahi hota. Yeh ek live calculation hai jo zarurat padne par screen par dikhta hai (**Virtual Getter**)!
- **Instance Method (Aapki Apni Car Ki Chaabi)**:
  - Aap apni specific car (Number: DL-01-AB-1234) ke andar baith kar accelerator dabate hain: \`myCar.accelerate()\`.
  - Yeh sirf aapki gaadi ko tez karta hai, padosi ki gaadi ko nahi (**Instance Method on a single document**).
- **Static Method (Maruti Suzuki Ka Head Office)**:
  - Aap Maruti Suzuki company ko phone karke poochte hain: *"Saal 2026 mein poore desh mein kitni Swift cars biki?"*
  - Yeh sawaal aap apni steering wheel se nahi poochte, balki poori company se poochte hain: \`Car.getTotalSales(2026)\` (**Static Method on Model Class**).`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax & Declaration: Virtuals, Methods & Statics",
        hi: "Syntax: Virtuals, Methods Aur Statics Define Karne Ka Format",
      },
      body: {
        en: `### 1. Virtual Getter & Setter Declaration:
\`\`\`javascript
userSchema.virtual("fullName")
  .get(function() {
    return \`\${this.firstName} \${this.lastName}\`.trim();
  })
  .set(function(v) {
    const parts = v.split(" ");
    this.firstName = parts[0] || "";
    this.lastName = parts.slice(1).join(" ") || "";
  });
\`\`\`

### 2. Instance Method Declaration:
\`\`\`javascript
userSchema.methods.comparePassword = async function(candidatePassword) {
  // 'this' is the document instance
  return bcrypt.compare(candidatePassword, this.password);
};
\`\`\`

### 3. Static Method Declaration:
\`\`\`javascript
userSchema.statics.findByEmail = function(email) {
  // 'this' is the Model constructor
  return this.findOne({ email: email.toLowerCase().trim() });
};
\`\`\``,
        hi: `### 1. Virtual Getter Aur Setter Ka Syntax:
\`\`\`javascript
userSchema.virtual("fullName")
  .get(function() {
    return \`\${this.firstName} \${this.lastName}\`.trim();
  })
  .set(function(v) {
    const parts = v.split(" ");
    this.firstName = parts[0] || "";
    this.lastName = parts.slice(1).join(" ") || "";
  });
\`\`\`

### 2. Instance Method Ka Syntax:
\`\`\`javascript
userSchema.methods.comparePassword = async function(candidatePassword) {
  // 'this' document instance hota hai
  return bcrypt.compare(candidatePassword, this.password);
};
\`\`\`

### 3. Static Method Ka Syntax:
\`\`\`javascript
userSchema.statics.findByEmail = function(email) {
  // 'this' Model constructor hota hai
  return this.findOne({ email: email.toLowerCase().trim() });
};
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Virtual Properties (Full Name & GST Calculation)",
        hi: "Example 1: Virtual Properties (Full Name Aur 18% GST Calculation)",
      },
      body: {
        en: `Creating virtual getters for full names and dynamic tax computations (MRP with 18% GST) without polluting MongoDB storage.`,
        hi: `Bina database storage waste kiye full name aur 18% GST MRP calculate karne ke liye virtual getters aur setters.`,
      },
      code: {
        language: "javascript",
        filename: "virtual-properties.js",
        snippet: `import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    basePrice: { type: Number, required: true }, // Stored in DB
    gstRate: { type: Number, default: 0.18 } // 18% GST
  },
  {
    // CRITICAL: Must enable virtuals for JSON serialization
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// 1. Virtual Getter: Calculate total price with GST dynamically
productSchema.virtual("priceWithGST").get(function() {
  const taxAmount = this.basePrice * this.gstRate;
  return Math.round((this.basePrice + taxAmount) * 100) / 100;
});

// 2. Virtual Getter: Formatted Indian Rupee currency string
productSchema.virtual("formattedPrice").get(function() {
  return \`₹\${this.priceWithGST.toLocaleString("en-IN")}\`;
});

const Product = mongoose.model("ProductVirt", productSchema);

async function testVirtuals() {
  await mongoose.connect("mongodb://127.0.0.1:27017/virtDemoDB");
  await Product.deleteMany({});

  const laptop = await Product.create({
    title: "MacBook Air M3",
    basePrice: 100000 // ₹1,00,000 base
  });

  console.log("Direct Property Access:");
  console.log("Base Price:", laptop.basePrice);
  console.log("Virtual Price with GST:", laptop.priceWithGST); // 118000
  console.log("Virtual Formatted Price:", laptop.formattedPrice); // ₹1,18,000

  // Verify JSON output
  const jsonOutput = JSON.parse(JSON.stringify(laptop));
  console.log("\\nSerialized JSON Output for API:");
  console.log(jsonOutput);

  await mongoose.disconnect();
}

testVirtuals().catch(console.error);

/*
Expected Output:
Direct Property Access:
Base Price: 100000
Virtual Price with GST: 118000
Virtual Formatted Price: ₹1,18,000

Serialized JSON Output for API:
{
  "_id": "...",
  "title": "MacBook Air M3",
  "basePrice": 100000,
  "gstRate": 0.18,
  "priceWithGST": 118000,
  "formattedPrice": "₹1,18,000",
  "id": "..."
}
*/`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Instance Methods (Password Verification & JWT Token Generation)",
        hi: "Example 2: Instance Methods (Password Match Aur Auth Token Banana)",
      },
      body: {
        en: `Attaching business methods to user document instances to compare hashed passwords and generate signed JWT authentication tokens.`,
        hi: `User document par instance methods laga kar password match aur JWT token create karna.`,
      },
      code: {
        language: "javascript",
        filename: "instance-methods.js",
        snippet: `import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

// Pre-save hook to hash password
userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// 1. Instance Method: Verify candidate password against hashed password
userSchema.methods.comparePassword = async function(candidatePassword) {
  // 'this' is the user document instance
  return bcrypt.compare(candidatePassword, this.password);
};

// 2. Instance Method: Generate temporary password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token and save to document instance
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetToken = hashedToken;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken; // Return unhashed token to send via email
};

const User = mongoose.model("UserMethods", userSchema);

async function testInstanceMethods() {
  await mongoose.connect("mongodb://127.0.0.1:27017/methodDemoDB");
  await User.deleteMany({});

  const user = await User.create({
    name: "Sunil Gavaskar",
    email: "sunil@example.com",
    password: "SecretCricketPassword123"
  });

  // Fetch user including hidden password field
  const foundUser = await User.findById(user._id).select("+password");

  // Test Password Comparison Method
  const isMatchCorrect = await foundUser.comparePassword("SecretCricketPassword123");
  const isMatchWrong = await foundUser.comparePassword("WrongPassword999");

  console.log("Correct password matches:", isMatchCorrect); // true
  console.log("Wrong password matches:", isMatchWrong); // false

  // Test Password Reset Token Method
  const resetToken = foundUser.createPasswordResetToken();
  console.log("Generated Plain Reset Token (for email):", resetToken);

  await mongoose.disconnect();
}

testInstanceMethods().catch(console.error);

/*
Expected Output:
Correct password matches: true
Wrong password matches: false
Generated Plain Reset Token (for email): 3a8f...
*/`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Static Methods for Authentication & Collection Analytics",
        hi: "Example 3: Static Methods (findByCredentials Login Helper)",
      },
      body: {
        en: `Attaching collection-level static methods to the Model constructor to encapsulate login authentication logic in one reusable function.`,
        hi: `Model level static method \`findByCredentials\` jo email aur password verify karke authenticated user return karta hai.`,
      },
      code: {
        language: "javascript",
        filename: "static-methods.js",
        snippet: `import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const accountSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  loginAttempts: { type: Number, default: 0 },
  isLocked: { type: Boolean, default: false }
});

accountSchema.pre("save", async function() {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * STATIC METHOD: Attached directly to the Account Model
 * Finds user by email, verifies password, and handles account locking logic.
 */
accountSchema.statics.findByCredentials = async function(email, plainPassword) {
  // 'this' refers to the Model constructor (Account)
  const account = await this.findOne({ email: email.toLowerCase().trim() }).select("+password");

  if (!account) {
    throw new Error("Invalid email or password.");
  }

  if (account.isLocked) {
    throw new Error("Account is temporarily locked due to excessive failed attempts.");
  }

  const isMatch = await bcrypt.compare(plainPassword, account.password);

  if (!isMatch) {
    account.loginAttempts += 1;
    if (account.loginAttempts >= 3) {
      account.isLocked = true;
    }
    await account.save();
    throw new Error("Invalid email or password.");
  }

  // Reset failed attempts on successful login
  account.loginAttempts = 0;
  await account.save();

  return account;
};

const Account = mongoose.model("AccountStatic", accountSchema);

// Express Login Controller Simulation
async function simulateLoginController() {
  await mongoose.connect("mongodb://127.0.0.1:27017/staticDemoDB");
  await Account.deleteMany({});

  await Account.create({
    email: "neha@example.com",
    password: "SecurePassword2026"
  });

  console.log("Testing static method Account.findByCredentials()...");

  // Successful Login
  const authenticatedUser = await Account.findByCredentials("neha@example.com", "SecurePassword2026");
  console.log("Login Successful for:", authenticatedUser.email);

  // Failed Login Attempt
  try {
    await Account.findByCredentials("neha@example.com", "WrongPassword");
  } catch (err) {
    console.log("Failed attempt handled safely:", err.message);
  }

  await mongoose.disconnect();
}

simulateLoginController().catch(console.error);

/*
Expected Output:
Testing static method Account.findByCredentials()...
Login Successful for: neha@example.com
Failed attempt handled safely: Invalid email or password.
*/`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Aam Galatiyan Aur Unka Solution",
      },
      body: {
        en: `### 1. Using Arrow Functions on Virtuals or Methods
- **Mistake**: Writing \`schema.methods.getDiscount = () => { return this.price * 0.1; }\`. Arrow functions prevent dynamic \`this\` binding, so \`this\` is \`undefined\`!
- **Fix**: Always use regular function declarations: \`schema.methods.getDiscount = function() { return this.price * 0.1; }\`.

### 2. Attempting to Query Virtual Properties in \`find()\`
- **Mistake**: Writing \`User.find({ fullName: 'Aman Verma' })\`. Virtuals exist strictly in Node.js memory and **do not exist on MongoDB disk**. The query will return 0 results!
- **Fix**: Query the actual stored physical fields: \`User.find({ firstName: 'Aman', lastName: 'Verma' })\`.

### 3. Missing \`toJSON: { virtuals: true }\` Schema Option
- **Mistake**: Defining a virtual property and wondering why it is missing from Express \`res.json(doc)\` responses.
- **Fix**: Add \`{ toJSON: { virtuals: true }, toObject: { virtuals: true } }\` to the schema options object.

### 4. Confusing \`schema.methods\` with \`schema.statics\`
- **Mistake**: Attaching a method to \`schema.methods\` and trying to call it on the Model (\`User.comparePassword()\`), or attaching to \`schema.statics\` and calling on a document (\`userDoc.findByEmail()\`).
- **Fix**: Remember: \`methods\` = document instance (\`user.method()\`); \`statics\` = Model class (\`User.static()\`).`,
        hi: `### 1. Methods Ya Virtuals Mein Arrow Function Lagana
- **Galati**: \`schema.methods.getDiscount = () => { return this.price * 0.1; }\` likhna. Arrow function mein \`this\` undefined ho jata hai.
- **Solution**: Hamesha regular function use karein: \`function() { return this.price * 0.1; }\`.

### 2. Virtual Fields Par \`find()\` Query Chalana
- **Galati**: \`User.find({ fullName: 'Aman Verma' })\` likhna. Virtuals database mein exist hi nahi karte, isliye koi record match nahi hoga!
- **Solution**: Asli stored fields par query karein: \`User.find({ firstName: 'Aman', lastName: 'Verma' })\`.

### 3. \`toJSON: { virtuals: true }\` Bhool Jana
- **Galati**: Virtual getter define karna lekin frontend API response mein field na aana.
- **Solution**: Schema options mein \`{ toJSON: { virtuals: true } }\` lagana zaroori hai.

### 4. \`methods\` Aur \`statics\` Ko Mix Karna
- **Galati**: Document method ko Model par call karna (\`User.comparePassword()\`) ya static method ko document par call karna.
- **Solution**: \`methods\` = document instance (\`user.comparePassword()\`); \`statics\` = Model (\`User.findByCredentials()\`).`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Model-Driven Architecture",
        hi: "Best Practices: Model-Driven Architecture",
      },
      body: {
        en: `1. **Skinny Controllers, Fat Models**: Keep your Express route controllers minimal (3-5 lines). Delegate business operations, hashing, and lookups to instance and static methods on your Mongoose models.
2. **Use Virtuals to Format Display Attributes**: Format currencies, relative times, and combined names using virtual getters rather than duplicating strings across your database.
3. **Always Expose Virtuals in JSON Options**: Configure \`{ toJSON: { virtuals: true, getters: true } }\` so third-party consumers and React frontends receive computed properties seamlessly.
4. **Use Query Helpers for Chainable Filters**: Use \`schema.query.byRole = function(role) { return this.where({ role }); }\` to enable clean query chaining like \`User.find().byRole('admin')\`.`,
        hi: `1. **Skinny Controllers, Fat Models**: Express controllers ko chhota aur saaf rakhein. Authentication aur calculations ka logic Model ke static aur instance methods mein rakhein.
2. **Formatted Data Ke Liye Virtuals Use Karein**: Currency format, tax calculations aur full names ke liye virtual getters use karein taaki database mein duplicate data na bhare.
3. **JSON Serialization On Rakhein**: Schema mein \`{ toJSON: { virtuals: true } }\` zaroor configure karein taaki React frontend ko computed fields automatically mil sakein.
4. **Chainable Queries Ke Liye Query Helpers**: Common filters ko \`schema.query\` mein define karein taaki \`User.find().byRole('admin')\` jaisa clean code likh sakein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Top Interview Sawaal Aur Jawab",
      },
      body: {
        en: `### Q1: What is the key difference between a Mongoose Instance Method and a Static Method?
**Answer**:
- **Instance Method (\`schema.methods\`)**: Invoked on an individual document instance. Inside the function, \`this\` refers to that specific document (e.g. \`user.comparePassword()\`).
- **Static Method (\`schema.statics\`)**: Invoked on the Model class itself. Inside the function, \`this\` refers to the Mongoose Model constructor (e.g. \`User.findByCredentials()\`).

### Q2: Can you execute a MongoDB query filter on a virtual field? Why or why not?
**Answer**:
No, you cannot query virtual fields via \`find({ myVirtual: value })\`. Virtual properties are computed purely in Node.js memory at runtime. They are never serialized or stored inside MongoDB's BSON collection on disk, and therefore have no index or physical representation in the database engine.

### Q3: What is the purpose of a Virtual Setter in Mongoose?
**Answer**:
A virtual setter allows you to accept a composite value and automatically distribute it into multiple underlying schema fields. For example, setting \`user.fullName = "Aarav Sharma"\` triggers a virtual setter that splits the string by space and assigns \`this.firstName = "Aarav"\` and \`this.lastName = "Sharma"\` before the document is saved.`,
        hi: `### Q1: Mongoose Instance Method aur Static Method mein kya antar hai?
**Jawab**:
- **Instance Method (\`schema.methods\`)**: Single document par chalta hai. Yahan \`this\` us document instance ko point karta hai (jaise \`user.comparePassword()\`).
- **Static Method (\`schema.statics\`)**: Poore Model class par chalta hai. Yahan \`this\` Model constructor hota hai (jaise \`User.findByCredentials()\`).

### Q2: Kya virtual field par \`find()\` query filter lagaya ja sakta hai?
**Jawab**:
Nahi. Virtual fields sirf Node.js memory mein dynamically bante hain aur MongoDB disk par physically store nahi hote. Database engine ko inka koi pata nahi hota, isliye in par query nahi chal sakti.

### Q3: Mongoose mein Virtual Setter ka kya kaam hota hai?
**Jawab**:
Virtual Setter ek combined value ko accept karke use tod kar alag-alag actual fields mein set karta hai. Jaise \`user.fullName = "Aarav Sharma"\` likhne par setter automatically \`this.firstName = "Aarav"\` aur \`this.lastName = "Sharma"\` assign kar deta hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Virtuals, Methods & Statics",
        hi: "Quick Summary: Virtuals, Methods & Statics",
      },
      body: {
        en: `- **Virtuals**: Dynamic derived properties in memory; not stored in MongoDB.
- **Virtual Getters**: Compute values on access; pair with \`{ toJSON: { virtuals: true } }\`.
- **Instance Methods (\`methods\`)**: Attached to individual documents; \`this\` is the document.
- **Static Methods (\`statics\`)**: Attached to the Model class; \`this\` is the Model constructor.
- **Do NOT use Arrow Functions**: Normal functions preserve dynamic \`this\` context binding.`,
        hi: `- **Virtuals**: Memory mein banne wali properties; database mein store nahi hoti.
- **Virtual Getters**: On-the-fly calculation karte hain; \`{ toJSON: { virtuals: true } }\` zaroori hai.
- **Instance Methods**: Single document par chalte hain (\`this\` document hota hai).
- **Static Methods**: Poore Model par chalte hain (\`this\` Model hota hai).
- **Arrow Function Na Lagayein**: \`this\` binding maintain rakhne ke liye regular functions use karein.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "Why does User.find({ fullName: 'Rahul Dravid' }) return no documents if fullName is a virtual property?",
      "hi": "Agar fullName ek virtual property hai toh User.find({ fullName: 'Rahul Dravid' }) koi document return kyun nahi karta?"
    },
    "options": [
      {
        "en": "Virtual properties require an explicit text index",
        "hi": "Virtual properties ke liye text index chahiye"
      },
      {
        "en": "Virtual properties only exist in Node.js memory and are not stored in MongoDB on disk",
        "hi": "Virtual properties sirf Node.js memory mein banti hain aur MongoDB disk par store nahi hoti"
      },
      {
        "en": "Mongoose automatically renames virtual properties with an underscore prefix",
        "hi": "Mongoose virtual properties ka naam badal deta hai"
      },
      {
        "en": "The database query timed out",
        "hi": "Query time out ho gayi"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Virtual properties are calculated on the fly in JavaScript. Because they are not stored in MongoDB collections, the database engine cannot filter by them.",
      "hi": "Virtual properties database mein physically exist nahi karti, isliye MongoDB engine unhe dhoond nahi sakta."
    }
  },
  {
    "q": {
      "en": "What does 'this' point to inside a static method defined on userSchema.statics.myStatic = function() { ... }?",
      "hi": "userSchema.statics.myStatic = function() { ... } ke andar 'this' kis cheez ko point karta hai?"
    },
    "options": [
      {
        "en": "A specific user document instance",
        "hi": "Ek specific user document instance"
      },
      {
        "en": "The compiled User Model constructor class",
        "hi": "Compiled User Model constructor class"
      },
      {
        "en": "The Express request object",
        "hi": "Express request object"
      },
      {
        "en": "The global V8 runtime window",
        "hi": "Global window"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "In static methods, 'this' refers to the Model constructor itself, allowing you to call other Model methods like this.find() or this.create().",
      "hi": "Static methods ke andar 'this' poore Model constructor ko point karta hai, jisse aap this.find() ya this.create() chala sakte hain."
    }
  },
  {
    "q": {
      "en": "Which schema option must be set to true for virtual fields to appear in JSON responses sent via res.json(doc)?",
      "hi": "res.json(doc) dwara bheje gaye JSON response mein virtual fields dikhane ke liye kaunsa schema option true hona chahiye?"
    },
    "options": [
      {
        "en": "toJSON: { virtuals: true }",
        "hi": "toJSON: { virtuals: true }"
      },
      {
        "en": "exposeVirtuals: true",
        "hi": "exposeVirtuals: true"
      },
      {
        "en": "allowVirtualJSON: true",
        "hi": "allowVirtualJSON: true"
      },
      {
        "en": "serializeMemory: true",
        "hi": "serializeMemory: true"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Mongoose strips virtuals during JSON conversion by default unless toJSON: { virtuals: true } is explicitly declared on the schema.",
      "hi": "By default Mongoose JSON conversion ke dauran virtuals ko drop kar deta hai jab tak toJSON: { virtuals: true } na lagaya jaye."
    }
  },
  {
    "q": {
      "en": "What is the primary benefit of the 'Skinny Controllers, Fat Models' architecture in Node.js / Mongoose?",
      "hi": "Node.js / Mongoose mein 'Skinny Controllers, Fat Models' architecture ka sabse bada fayda kya hai?"
    },
    "options": [
      {
        "en": "It automatically creates TypeScript definitions",
        "hi": "TypeScript definitions banata hai"
      },
      {
        "en": "It encapsulates business logic in reusable, easily testable model methods rather than cluttering HTTP controllers",
        "hi": "Yeh business logic ko reusable aur easily testable banata hai aur HTTP controllers ko clean rakhta hai"
      },
      {
        "en": "It reduces MongoDB storage costs by 50%",
        "hi": "Storage cost 50% kam karta hai"
      },
      {
        "en": "It replaces Express routing entirely",
        "hi": "Express routing ko replace kar deta hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Encapsulating logic in model methods (statics, methods, virtuals) makes business operations reusable across controllers, workers, and CLI scripts, while keeping controllers concise.",
      "hi": "Logic ko Model methods mein rakhne se code reusable aur testable banta hai, aur Express controllers bohot chhote aur saaf rehte hain."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Virtual Properties, Instance & Static Methods in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Virtual Properties, Instance & Static Methods ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling virtual properties, instance & static methods with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Virtual Properties, Instance & Static Methods ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Virtual Properties, Instance & Static Methods establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Virtual Properties, Instance & Static Methods clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Virtual Properties, Instance & Static Methods directly resolve?",
      "hi": "Virtual Properties, Instance & Static Methods kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Virtual Properties, Instance & Static Methods, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Virtual Properties, Instance & Static Methods ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Virtual Properties, Instance & Static Methods, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Virtual Properties, Instance & Static Methods ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Virtual Properties, Instance & Static Methods, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Virtual Properties, Instance & Static Methods ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Virtual Properties, Instance & Static Methods?",
      "hi": "Virtual Properties, Instance & Static Methods ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Virtual Properties, Instance & Static Methods be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Virtual Properties, Instance & Static Methods ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Virtual Properties, Instance & Static Methods impact application memory and CPU consumption?",
      "hi": "Virtual Properties, Instance & Static Methods ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Virtual Properties, Instance & Static Methods?",
      "hi": "Virtual Properties, Instance & Static Methods mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Virtual Properties, Instance & Static Methods?",
      "hi": "Virtual Properties, Instance & Static Methods mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Virtual Properties, Instance & Static Methods?",
      "hi": "Virtual Properties, Instance & Static Methods mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Virtual Properties, Instance & Static Methods, what must the test suite assert?",
      "hi": "Virtual Properties, Instance & Static Methods ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Virtual Properties, Instance & Static Methods?",
      "hi": "Modular design Virtual Properties, Instance & Static Methods mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Virtual Properties, Instance & Static Methods be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Virtual Properties, Instance & Static Methods ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Virtual Properties, Instance & Static Methods properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Virtual Properties, Instance & Static Methods kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Virtual Properties, Instance & Static Methods in production?",
      "hi": "Production mein Virtual Properties, Instance & Static Methods ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Virtual Properties, Instance & Static Methods?",
      "hi": "Virtual Properties, Instance & Static Methods ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Virtual Properties, Instance & Static Methods?",
      "hi": "Virtual Properties, Instance & Static Methods mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
