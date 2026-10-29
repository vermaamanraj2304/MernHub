const e={id:"mongo-mongoose-schemas",title:{en:"Schemas, Models & Built-in Validation",hi:"Mongoose Schemas, Models & Validation"},difficulty:"Beginner",readTime:11,sections:[{type:"concept",heading:{en:"1. What is Mongoose ODM? (Schema vs Model)",hi:"1. Mongoose ODM Kya Hai? (Schema vs Model Ka Antar)"},body:{en:"While MongoDB itself is schema-less and flexible, production backend applications require strict structure: user passwords cannot be empty, prices must be positive numbers, and emails must follow standard patterns.\n\n**Mongoose** is an **Object Data Modeling (ODM)** library for Node.js. It provides a structured, schema-based solution to model your application data, handling type casting, validation, query building, business logic hooks, and relationship population out of the box.\n\n### The Two Core Pillars of Mongoose:\n1. **Schema**: The blueprint. Defines the shape of the document, data types, default values, validators, and indexes:\n   `const userSchema = new mongoose.Schema({ name: String, email: String });`\n2. **Model**: The compiled constructor. Represents the actual collection in MongoDB and provides all CRUD query methods (`User.find()`, `User.create()`, `User.findByIdAndUpdate()`).\n   `const User = mongoose.model(\"User\", userSchema);`\n\n### Mongoose Collection Naming Convention:\nWhen you compile `mongoose.model('User', userSchema)`, Mongoose automatically lowercases and pluralizes the model name to determine the MongoDB collection name:\n- `'User'` ──> `'users'`\n- `'Category'` ──> `'categories'`\n- `'Person'` ──> `'people'`",hi:"MongoDB flexible aur schema-less hota hai, lekin production web apps mein strict rules chahiye hote hain: user ka email valid ho, password khali na ho, aur price positive number ho.\n\n**Mongoose** Node.js ke liye ek **ODM (Object Data Modeling)** library hai. Yeh application data ko strict structure, automatic validation, default values, middleware hooks, aur type safety deta hai.\n\n### Mongoose Ke Do Mukhya Pillars:\n1. **Schema (Naksha / Blueprint)**: Yeh document ka structure, data types, validation rules aur default values define karta hai:\n   `const userSchema = new mongoose.Schema({ name: String, email: String });`\n2. **Model (Karyakarta / Constructor)**: Schema se compile hokar banta hai aur MongoDB collection ke sath baat karta hai (`User.create()`, `User.find()`).\n   `const User = mongoose.model(\"User\", userSchema);`\n\n### Automatic Collection Naming:\nMongoose model ke naam ko automatically lowercase aur plural bana kar collection ka naam rakhta hai:\n- `'User'` ──> `'users'`\n- `'Category'` ──> `'categories'`\n- `'Person'` ──> `'people'`"}},{type:"concept",heading:{en:"2. Built-in & Custom Schema Validators",hi:"2. Built-in Aur Custom Schema Validators"},body:{en:"Mongoose runs validation **before** saving a document to the database. If any validation rule fails, the write operation is aborted, and an informative `ValidationError` is thrown.\n\n### Built-in Schema Types & Validators:\n- **All Types**: `required: [true, 'Field is mandatory']`, `default: value`\n- **Strings**:\n  - `minlength: [3, 'Must be at least 3 characters']`\n  - `maxlength: [50, 'Cannot exceed 50 characters']`\n  - `enum: { values: ['admin', 'customer', 'vendor'], message: '{VALUE} is not allowed' }`\n  - `match: [/regex/, 'Invalid format']`\n  - `trim: true`, `lowercase: true`\n- **Numbers & Dates**:\n  - `min: [0, 'Price cannot be negative']`\n  - `max: [1000000, 'Price exceeds limit']`\n\n### Custom Async/Sync Validators:\nFor business rules not covered by built-in operators, define custom functions:\n```javascript\nvalidate: {\n  validator: function(v) {\n    return /^(\\+91)?[6-9]\\d{9}$/.test(v); // Indian mobile number validation\n  },\n  message: props => `${props.value} is not a valid 10-digit Indian phone number!`\n}\n```",hi:"Mongoose data ko MongoDB mein save karne se **pehle** validation check karta hai. Agar koi rule toot ta hai, toh write ruk jata hai aur `ValidationError` throw hota hai.\n\n### Built-in Validators:\n- **Sabhi Types Ke Liye**: `required: [true, 'Message']`, `default: value`\n- **Strings Ke Liye**:\n  - `minlength`, `maxlength`\n  - `enum`: Allowed values ki list (`['admin', 'user']`)\n  - `match`: Regex validation\n  - `trim: true` (shuru aur aakhir ke spaces hatata hai), `lowercase: true`\n- **Numbers Ke Liye**:\n  - `min: [0, 'Price negative nahi ho sakta']`, `max`\n\n### Custom Validators:\nApne custom business rules ke liye validator function likhein:\n```javascript\nvalidate: {\n  validator: function(v) {\n    return /^(\\+91)?[6-9]\\d{9}$/.test(v); // Desi mobile number check\n  },\n  message: props => `${props.value} ek valid phone number nahi hai!`\n}\n```"}},{type:"analogy",heading:{en:"Real-Life Analogy: Government Stamp Paper vs Printed Legal Contract",hi:"Real-Life Analogy: Sarkari Stamp Paper Ka Format vs Laminated Passport"},body:{en:`Consider how official documents are prepared in India:

- **Schema (The Official Government Stamp Paper & Form Format)**:
  - The Ministry of External Affairs prints an empty Passport Application Form.
  - Box 1: Name (Min 2 chars, text only).
  - Box 2: Aadhaar Number (Must be exactly 12 digits -> \`match\` validator).
  - Box 3: Nationality (Default: "Indian").
  - The blank form itself cannot travel or board an airplane; it is just a formal **template** specifying the rules and schema.
- **Model (The Regional Passport Office)**:
  - The Passport Office is the authority that accepts forms, validates them against government rules, and stamps them.
- **Document / Instance (Your Laminated Physical Passport)**:
  - When your specific details are filled in and verified without errors, the Passport Office prints your unique, laminated Passport Booklet with an official stamp and issue date (**\`createdAt\` timestamp**).`,hi:`Sarkari dastavezon ke bante waqt ke process se samjhein:

- **Schema (Sarkari Form Ka Format Aur Niyam)**:
  - Passport Office ka khali form jisme niyam chhape hote hain:
  - Naam: kam se kam 2 akshar hone chahiye.
  - Aadhaar: exact 12 digits ka hona chahiye (\`match\` validator).
  - Nationality: default "Indian".
  - Yeh khali form khud airplane mein travel nahi kar sakta; yeh sirf ek **blueprint / Schema** hai.
- **Model (Passport Seva Kendra)**:
  - Passport office jo form ko check karta hai, rules verify karta hai aur naya passport issue karta hai.
- **Document / Instance (Aapka Laminated Passport)**:
  - Jab aapki details verify ho jaati hain, toh ek unique passport booklet print hoti hai jisme stamp aur date (**\`createdAt\` timestamp**) lagti hai.`}},{type:"syntax",heading:{en:"Syntax & Schema Definition: Comprehensive Setup",hi:"Syntax & Schema Definition: Complete Setup"},body:{en:`### Defining a Production Mongoose Schema:
\`\`\`javascript
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [120, "Title cannot exceed 120 characters"]
    },
    price: {
      type: Number,
      required: [true, "Price must be specified"],
      min: [0, "Price cannot be negative"]
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ["Electronics", "Apparel", "Home", "Books"],
        message: "{VALUE} is not a supported category"
      }
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
    versionKey: false // Disables internal __v field if not needed
  }
);

export const Product = mongoose.model("Product", productSchema);
\`\`\``,hi:`### Production Schema Banane Ka Syntax:
\`\`\`javascript
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title zaroori hai"],
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price negative nahi ho sakta"]
    },
    category: {
      type: String,
      enum: ["Electronics", "Books", "Clothing"]
    }
  },
  {
    timestamps: true // createdAt aur updatedAt automatic banata hai
  }
);

export const Product = mongoose.model("Product", productSchema);
\`\`\``}},{type:"example",heading:{en:"Example 1: Comprehensive User Schema with Built-in & Custom Validators",hi:"Example 1: Complete User Schema With Custom Validation"},body:{en:"Defining a full User schema with email regex matching, Indian mobile phone validation, role enums, and timestamps.",hi:"Email regex, mobile number format aur role enums ke sath complete User schema define karna."},code:{language:"javascript",filename:"user-schema-definition.js",snippet:`import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is strictly mandatory"],
      trim: true,
      minlength: [2, "Name must have at least 2 characters"],
      maxlength: [60, "Name cannot exceed 60 characters"]
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true, // Creates a unique index in MongoDB
      lowercase: true,
      trim: true,
      match: [
        /^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/,
        "Please provide a valid email address format"
      ]
    },
    phoneNumber: {
      type: String,
      required: [true, "Indian mobile number is required"],
      validate: {
        validator: function(v) {
          // Indian phone numbers: optional +91, starts with 6-9, followed by 9 digits
          return /^(?:\\+91)?[6-9]\\d{9}$/.test(v);
        },
        message: props => \`\${props.value} is not a valid 10-digit Indian mobile number!\`
      }
    },
    role: {
      type: String,
      enum: {
        values: ["user", "vendor", "admin"],
        message: "Role '{VALUE}' is invalid. Allowed: user, vendor, admin"
      },
      default: "user"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // Automatically creates createdAt and updatedAt fields
  }
);

export const User = mongoose.model("User", userSchema);`}},{type:"example",heading:{en:"Example 2: Validation Error Handling in Action",hi:"Example 2: Validation Fail Hone Par Error Handling"},body:{en:"Attempting to insert invalid documents and capturing detailed field-level validation messages from `err.errors`.",hi:"Galat data insert karke Mongoose ke `ValidationError` ko format karna."},code:{language:"javascript",filename:"test-validation.js",snippet:`import mongoose from "mongoose";
import { User } from "./user-schema-definition.js";

async function testValidation() {
  // Connect to local test instance or Atlas
  await mongoose.connect("mongodb://127.0.0.1:27017/validationTestDB");
  await User.deleteMany({});

  // 1. Attempting to create user with multiple invalid fields
  try {
    await User.create({
      name: "A", // Violates minlength: 2
      email: "not-an-email", // Violates regex match
      phoneNumber: "12345", // Violates custom Indian phone regex
      role: "super-owner" // Violates enum
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      console.log("Mongoose Validation Caught Safely! Errors list:");
      const formattedErrors = Object.values(err.errors).map(e => ({
        field: e.path,
        rejectedValue: e.value,
        message: e.message
      }));
      console.table(formattedErrors);
    } else {
      console.error("Other Error:", err);
    }
  }

  // 2. Creating a valid user
  const validUser = await User.create({
    name: "Rohan Verma",
    email: "rohan.verma@example.com",
    phoneNumber: "+919876543210",
    role: "user"
  });
  console.log("Valid User Successfully Created:", {
    id: validUser._id,
    name: validUser.name,
    createdAt: validUser.createdAt
  });

  await mongoose.disconnect();
}

testValidation().catch(console.error);

/*
Expected Output:
Mongoose Validation Caught Safely! Errors list:
┌─────────┬───────────────┬─────────────────┬────────────────────────────────────────────────────────┐
│ (index) │     field     │  rejectedValue  │                        message                         │
├─────────┼───────────────┼─────────────────┼────────────────────────────────────────────────────────┤
│    0    │    'name'     │       'A'       │       'Name must have at least 2 characters'           │
│    1    │    'email'    │  'not-an-email' │       'Please provide a valid email address format'    │
│    2    │ 'phoneNumber' │     '12345'     │ '12345 is not a valid 10-digit Indian mobile number!' │
│    3    │    'role'     │  'super-owner'  │ 'Role 'super-owner' is invalid. Allowed: ...'        │
└─────────┴───────────────┴─────────────────┴────────────────────────────────────────────────────────┘
Valid User Successfully Created: { id: ObjectId("..."), name: 'Rohan Verma', createdAt: ... }
*/`}},{type:"example",heading:{en:"Example 3: Production Express Controller with runValidators",hi:"Example 3: Production Express Controller Mein runValidators Ka Use"},body:{en:"Building an Express update route using `findByIdAndUpdate()` with `{ runValidators: true, new: true }` to ensure schema rules are never bypassed during updates.",hi:"Express update API controller jahan `runValidators: true` lagane se updates par bhi validation enforce hoti hai."},code:{language:"javascript",filename:"user-controller.js",snippet:`import { User } from "./user-schema-definition.js";

/**
 * Controller: Updates user details.
 * CRITICAL: In Mongoose, findOneAndUpdate() does NOT run validators by default!
 * You MUST pass { runValidators: true } in the options argument!
 */
export async function updateUserController(req, res) {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true, // Returns the modified document rather than the original
        runValidators: true // Enforces schema validation during update!
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      // Extract clean error dictionary for frontend forms
      const errors = {};
      for (const field in err.errors) {
        errors[field] = err.errors[field].message;
      }
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors
      });
    }

    return res.status(500).json({ success: false, message: "Server error" });
  }
}`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Aam Galatiyan Aur Unka Solution"},body:{en:"### 1. Forgetting `runValidators: true` on Updates\n- **Mistake**: Calling `User.findByIdAndUpdate(id, { role: 'hacker' })`. By default, Mongoose only validates documents during `.save()` and `.create()`. Update queries bypass validation, inserting invalid roles into your database!\n- **Fix**: Always specify: `{ runValidators: true, new: true }`.\n\n### 2. Assuming `unique: true` in Schema is a Mongoose Validator\n- **Mistake**: Treating `unique: true` as a validation rule and expecting a `ValidationError` on duplicates.\n- **Reality**: `unique: true` is an index helper, NOT a validator. If a duplicate is inserted, MongoDB's storage engine throws a duplicate key error (`code: 11000`), not a Mongoose `ValidationError`!\n- **Fix**: Handle `err.code === 11000` specifically in your error handler.\n\n### 3. Confusing `this` Context in Custom Validators\n- **Mistake**: Using an arrow function for custom validators: `validator: (v) => this.password === v`. Arrow functions do not bind `this`, so `this` is `undefined`!\n- **Fix**: Use regular `function(v) { return this.otherField === v; }` syntax whenever you need to reference other document fields.\n\n### 4. Relying on Schema Defaults for Updates\n- **Mistake**: Expecting `default: 'user'` to be applied during an update if the field is missing from `$set`. Defaults only apply on new document creation.",hi:"### 1. Update Karte Waqt `runValidators: true` Bhool Jana\n- **Galati**: `findByIdAndUpdate()` chalana. By default Mongoose sirf `.save()` par validation check karta hai, update queries par validation skip kar deta hai!\n- **Solution**: Hamesha `{ runValidators: true, new: true }` options mein pass karein.\n\n### 2. `unique: true` Ko Mongoose Validator Samajhna\n- **Galati**: Samajhna ki duplicate email par `ValidationError` aayega.\n- **Sach**: `unique: true` MongoDB engine mein index banata hai, validator nahi hai. Duplicate hone par MongoDB ka `code: 11000` E11000 duplicate key error aata hai.\n- **Solution**: Error handler mein check karein `if (err.code === 11000)`.\n\n### 3. Custom Validator Mein Arrow Function Lagana\n- **Galati**: `validator: (v) => this.someField === v` likhna. Arrow functions mein `this` nahi hota aur `undefined` milta hai.\n- **Solution**: Regular function use karein: `validator: function(v) { ... }`.\n\n### 4. Updates Par Default Values Ka Intezar Karna\n- **Galati**: Sochna ki update karte waqt bhi schema ka `default` value apply hoga. Default sirf nayi creation par chalta hai."}},{type:"tip",heading:{en:"Best Practices: Schema Hygiene",hi:"Best Practices: Mongoose Schema Hygiene"},body:{en:"1. **Always Use `{ timestamps: true }`**: Never manually create `createdAt` and `updatedAt` fields. The built-in option manages both automatically, even during `findOneAndUpdate`.\n2. **Provide Custom Error Messages in Validator Arrays**: Instead of default Mongoose messages, provide user-friendly messages: `min: [0, 'Item price cannot be less than zero']`.\n3. **Use `trim: true` and `lowercase: true` on String Identifiers**: Clean up leading/trailing whitespaces and normalize emails automatically before documents touch the database.\n4. **Use `.select(false)` for Sensitive Properties**: In your schema, define `password: { type: String, select: false }` so user passwords are never accidentally returned in `find()` queries unless explicitly requested via `.select('+password')`.",hi:"1. **Hamesha `{ timestamps: true }` Use Karein**: Manually date likhne ke bajaye Mongoose ka built-in timestamps option on rakhein.\n2. **Array Format Mein User-Friendly Messages Dein**: `min: [0, 'Price negative nahi ho sakta']` likhein taaki frontend ko saaf error message mile.\n3. **Strings Par `trim` Aur `lowercase` Lagayein**: Emails aur usernames se aage-piche ke faltu spaces hatane aur case normalize karne ke liye inka use karein.\n4. **Sensitive Fields Par `select: false` Lagayein**: Password field par `select: false` lagayein taaki `User.find()` mein galti se bhi password leak na ho sake."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Top Interview Sawaal Aur Jawab"},body:{en:"### Q1: What is the difference between a Mongoose Schema and a Mongoose Model?\n**Answer**:\n- **Schema**: Defines the structural blueprint of the document (field names, types, validators, default values, and middleware hooks). It has no direct interaction with the database.\n- **Model**: A compiled JavaScript class derived from the schema. It interfaces directly with MongoDB to execute CRUD operations (`create`, `find`, `updateOne`, `deleteMany`) against a specific collection.\n\n### Q2: Why does `findByIdAndUpdate()` bypass Mongoose schema validation by default, and how do you enforce it?\n**Answer**:\nMongoose update queries (`updateMany`, `findOneAndUpdate`, `findByIdAndUpdate`) send commands directly to the MongoDB server without instantiating full document instances for performance reasons. To enforce validation, you must explicitly supply `{ runValidators: true }` in the query options.\n\n### Q3: How does Mongoose determine collection names from model names?\n**Answer**:\nMongoose takes the model name (e.g. `'Product'`), converts it to lowercase (`'product'`), and applies English pluralization rules using the `inflection` library (`'products'`). If you need a custom collection name, pass it as the 3rd argument to `mongoose.model('Product', productSchema, 'my_custom_products')`.",hi:"### Q1: Mongoose Schema aur Mongoose Model mein kya antar hai?\n**Jawab**:\n- **Schema**: Document ka structure, data types, validation aur rules define karta hai (sirf blueprint hai, database se seedhe connect nahi hota).\n- **Model**: Schema se compile hokar banta hai aur seedhe MongoDB collection se communicate karke CRUD queries (`find`, `create`, `update`) chalata hai.\n\n### Q2: `findByIdAndUpdate()` by default validation skip kyun karta hai aur ise kaise on karein?\n**Jawab**:\nPerformance fast rakhne ke liye update queries seedhe MongoDB server ko bhej di jaati hain bina Mongoose document instance banaye. Validation chalane ke liye options mein `{ runValidators: true }` pass karna padta hai.\n\n### Q3: Mongoose Model naam se Collection naam kaise banata hai?\n**Jawab**:\nMongoose model name ko lowercase karta hai aur English grammar ke hisaab se plural (bahuvachan) bana deta hai (jaise `'User'` -> `'users'`). Custom collection name ke liye model ke teesre argument mein naam pass kar sakte hain: `mongoose.model('User', schema, 'custom_users')`."}},{type:"summary",heading:{en:"Quick Summary: Schemas & Validation",hi:"Quick Summary: Schemas & Validation"},body:{en:"- **Schema is the blueprint; Model is the interface**: Schema sets the structure, Model queries the database.\n- **Automatic Pluralization**: Model `User` maps to collection `users`.\n- **Built-in Validators**: `required`, `min`, `max`, `minlength`, `maxlength`, `enum`, and `match`.\n- **Enforce on Update**: Always supply `{ runValidators: true }` during `findOneAndUpdate`.\n- **Timestamps**: Enable `{ timestamps: true }` to automatically generate and maintain `createdAt` and `updatedAt`.",hi:"- **Schema blueprint hai, Model query interface hai**: Schema rules banata hai, Model database se data lata hai.\n- **Automatic Plural Names**: Model `User` collection `users` banata hai.\n- **Built-in Validators**: `required`, `min`, `max`, `enum`, `match` regex.\n- **Update Par Validation**: `findOneAndUpdate` ke sath `{ runValidators: true }` lagana zaroori hai.\n- **Timestamps Option**: `{ timestamps: true }` se `createdAt` aur `updatedAt` automatically maintain hote hain."}}],quiz:[{q:{en:"What collection name will Mongoose create by default for mongoose.model('Category', categorySchema)?",hi:"mongoose.model('Category', categorySchema) ke liye Mongoose by default collection ka kya naam rakhega?"},options:[{en:"category",hi:"category"},{en:"categories",hi:"categories"},{en:"categorys",hi:"categorys"},{en:"Categories",hi:"Categories"}],answerIndex:1,explanation:{en:"Mongoose applies English pluralization rules, changing 'Category' to lowercase plural 'categories'.",hi:"Mongoose model name ko lowercase karta hai aur English plural rules ke tehat 'Category' ko 'categories' bana deta hai."}},{q:{en:"Why does User.findByIdAndUpdate(id, { age: -5 }) succeed even if the schema has min: [0, 'Age cannot be negative']?",hi:"Schema mein min: 0 hone ke bavajood User.findByIdAndUpdate(id, { age: -5 }) bina error ke save kyun ho jata hai?"},options:[{en:"Mongoose does not support minimum value validation on numbers",hi:"Mongoose numbers par min validation support nahi karta"},{en:"Mongoose update queries do not run validators by default unless { runValidators: true } is explicitly provided",hi:"Mongoose update queries by default validation nahi chalati jab tak { runValidators: true } na diya jaye"},{en:"Negative numbers are automatically converted to positive absolute numbers",hi:"Negative numbers positive ban jaate hain"},{en:"The age field was not marked as indexed",hi:"Age field indexed nahi tha"}],answerIndex:1,explanation:{en:"Update operations in Mongoose bypass schema validators by default. You must supply { runValidators: true } in the options argument.",hi:"Mongoose mein update operations by default validation run nahi karte. Iske liye options mein { runValidators: true } dena padta hai."}},{q:{en:"What type of error is thrown when inserting a duplicate value for a field marked unique: true in Mongoose?",hi:"Mongoose mein unique: true wale field mein duplicate value dalne par kaunsa error aata hai?"},options:[{en:"A Mongoose ValidationError with path 'unique'",hi:"Mongoose ValidationError"},{en:"A native MongoDB duplicate key error with code 11000",hi:"MongoDB ka native duplicate key error code 11000"},{en:"A Node.js RangeError",hi:"Node.js RangeError"},{en:"A silent undefined response",hi:"Silent undefined response"}],answerIndex:1,explanation:{en:"unique: true is a MongoDB index directive, not a Mongoose validation rule. The error is thrown by the MongoDB engine as error code 11000.",hi:"unique: true koi validator nahi balki MongoDB index hai. Duplicate aane par database engine error code 11000 throw karta hai."}},{q:{en:"Why should regular functions be preferred over arrow functions when defining custom schema validators or methods?",hi:"Custom validators ya methods banate waqt arrow functions ke mukable regular functions kyun prefer kiye jaate hain?"},options:[{en:"Regular functions run faster in V8",hi:"Regular functions V8 mein fast chalte hain"},{en:"Arrow functions do not bind 'this', preventing access to the document instance being validated",hi:"Arrow functions mein 'this' bind nahi hota jisse document instance access nahi kiya ja sakta"},{en:"Arrow functions cannot be asynchronous",hi:"Arrow functions async nahi ho sakte"},{en:"Mongoose schemas reject arrow function syntax",hi:"Mongoose schema arrow syntax reject kar deta hai"}],answerIndex:1,explanation:{en:"Mongoose binds 'this' to the document being validated. Arrow functions use lexical scoping, losing the document's 'this' context.",hi:"Mongoose 'this' ko document instance se bind karta hai. Arrow function mein 'this' lexical hota hai isliye document access nahi ho pata."}},{question:{en:"What is the core architectural purpose of Schemas, Models & Built-in Validation in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Mongoose Schemas, Models & Validation ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling schemas, models & built-in validation with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Mongoose Schemas, Models & Validation ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Schemas, Models & Built-in Validation establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Mongoose Schemas, Models & Validation clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Schemas, Models & Built-in Validation directly resolve?",hi:"Mongoose Schemas, Models & Validation kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Schemas, Models & Built-in Validation, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Mongoose Schemas, Models & Validation ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Schemas, Models & Built-in Validation, how is its mental model best conceptualized through real-world analogies?",hi:"Mongoose Schemas, Models & Validation ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Schemas, Models & Built-in Validation, what syntactic convention is essential to prevent runtime errors?",hi:"Mongoose Schemas, Models & Validation ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Schemas, Models & Built-in Validation?",hi:"Mongoose Schemas, Models & Validation ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Schemas, Models & Built-in Validation be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Mongoose Schemas, Models & Validation ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Schemas, Models & Built-in Validation impact application memory and CPU consumption?",hi:"Mongoose Schemas, Models & Validation ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Schemas, Models & Built-in Validation?",hi:"Mongoose Schemas, Models & Validation mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Schemas, Models & Built-in Validation?",hi:"Mongoose Schemas, Models & Validation mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Schemas, Models & Built-in Validation?",hi:"Mongoose Schemas, Models & Validation mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Schemas, Models & Built-in Validation, what must the test suite assert?",hi:"Mongoose Schemas, Models & Validation ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Schemas, Models & Built-in Validation?",hi:"Modular design Mongoose Schemas, Models & Validation mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Schemas, Models & Built-in Validation be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Mongoose Schemas, Models & Validation ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Schemas, Models & Built-in Validation properly belong and execute?",hi:"Full-stack MERN architecture mein Mongoose Schemas, Models & Validation kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Schemas, Models & Built-in Validation in production?",hi:"Production mein Mongoose Schemas, Models & Validation ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Schemas, Models & Built-in Validation?",hi:"Mongoose Schemas, Models & Validation ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Schemas, Models & Built-in Validation?",hi:"Mongoose Schemas, Models & Validation mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
