export default {
  id: "js-prototypes-inheritance",
  title: {
    en: "Prototypes & Prototypal Inheritance",
    hi: "Prototypes & Prototypal Inheritance Model (Deep Dive)",
  },
  difficulty: "Advanced",
  readTime: 11,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is Prototypal Inheritance?",
        hi: "1. Prototypal Inheritance Kya Hota Hai?",
      },
      body: {
        en: `Unlike classical object-oriented languages like Java or C++ which use **Class-based inheritance**, JavaScript uses **Prototypal Inheritance**.

In JavaScript:
- Almost every object has an internal hidden link to another object called its **Prototype** (accessible via \`Object.getPrototypeOf(obj)\` or historically \`obj.__proto__\`).
- When you request a property or method on an object (\`obj.greet()\`), JavaScript first checks if it exists directly on that object (own property).
- If not found, JavaScript walks up the **Prototype Chain** to the object's prototype, then that prototype's prototype, until it reaches the end: \`Object.prototype\` (whose prototype is \`null\`).
- If the property is still not found anywhere in the chain, it returns \`undefined\`.

### ES6 \`class\` is Syntactical Sugar
The ES6 \`class\` syntax introduced in 2015 did **not** introduce a new object-oriented inheritance model to JavaScript. Under the hood, JavaScript classes are still functions, and inheritance still operates purely on prototypes!`,
        hi: `Java ya C++ jaise traditional languages mein Class-based inheritance hota hai, lekin JavaScript ka model **Prototypal Inheritance** kehlata hai.

JavaScript mein:
- Lagbhag har object ke paas ek hidden link hota hai jise **Prototype** kehte hain (jise hum \`Object.getPrototypeOf(obj)\` ya \`__proto__\` kehte hain).
- Jab aap kisi object par property ya method access karte ho (\`user.getName()\`), toh JavaScript pehle dekhta hai ki kya yeh property us object ke paas khud ki hai (Own Property).
- Agar wahan nahi milti, toh JS **Prototype Chain** par ek level upar chadh kar uske prototype object mein dhoondhta hai. Aise upar jaate jaate yeh chain ke end (\`Object.prototype\`, jiska prototype \`null\` hota hai) tak search karta hai.
- Agar poori chain mein kahin na mile, tab \`undefined\` return hota hai.

### ES6 \`class\` Sirf Ek Syntactical Sugar Hai
ES6 mein aayi \`class\` keyword ne JavaScript ka internal system change nahi kiya. Classes ke piche aaj bhi wahi purana Prototype inheritance mechanism hi kaam karta hai!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Why Prototypes Matter (Memory Efficiency)",
        hi: "2. Prototypes Kyun Zaroori Hain (Memory Efficiency)?",
      },
      body: {
        en: `Imagine creating 100,000 user objects in memory:
- If each object defines its own methods inside the constructor function, 100,000 identical copies of that function are stored in RAM, causing heavy memory bloat.
- When methods are attached to the **Prototype**, only **one single copy** of the function exists in memory! All 100,000 instances simply reference that one shared prototype method.

In addition, understanding prototypes is mandatory for:
- Writing polyfills for missing browser features.
- Advanced framework debugging (understanding React component prototypes and V8 optimization).
- Deep inheritance hierarchies without redundant code.`,
        hi: `Sochiye agar aapko 100,000 users create karne hon:
- Agar har user object ke constructor ke andar method declare karenge, toh RAM mein 100,000 identical functions ki copies ban jayengi, jisse memory crash ho sakti hai.
- Agar methods ko **Prototype** par lagaya jaye, toh poori memory mein method ki sirf **1 single copy** rehti hai! Sabhi 100,000 users usi single copy ko reference karte hain.

Iske alawa:
- Polyfills likhne ke liye prototype ka gyaan hona anivarya hai.
- React internals aur V8 engine ke object model ko samajhne mein madad milti hai.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Indian Family Heritage Tree",
        hi: "Real-Life Analogy: Parivarik Virasat Aur Khandani Zameen",
      },
      body: {
        en: `Consider an Indian ancestral family tree:

1. **You (Child Object)**: You have your own laptop and watch (*Own Properties*).
2. **Father (Parent Prototype)**: Your father has a car and a family house. If someone asks you for a car, you don't own one directly, but you borrow your father's car (*Prototype Lookup*).
3. **Grandfather / Dadaji (Grandparent Prototype)**: Your grandfather owns ancestral farming land in the village. If asked for agricultural land, neither you nor your father bought it, but you look up the family tree to Dadaji (*Prototype Chain*).
4. **Ancestor / Root (\`Object.prototype\`)**: The root of the family line. Beyond that is \`null\` (no further ancestors).

If someone asks you for a spaceship, you don't have it, your father doesn't have it, Dadaji doesn't have it, and the chain ends -> \`undefined\`!`,
        hi: `Sochiye ek 3-generation Indian Family:

1. **Aap (Child Object)**: Aapke paas apna personal laptop aur bike hai (*Own Properties*).
2. **Pitaji (Parent Prototype)**: Pitaji ke paas ek car aur makaan hai. Agar koi aapse car maange, toh aap kehte ho "haan car hai" kyunki aapke pitaji ke paas hai (*Prototype Chain step 1*).
3. **Dadaji (Grandparent Prototype)**: Dadaji ke paas gaanv mein kheti ki zameen hai. Kheti ki zameen ke liye search pitaji se hoti hui Dadaji tak chali jaati hai (*Prototype Chain step 2*).
4. **Khandan Ka Pehla Purvash (\`Object.prototype\`)**: Sabse top ancestor. Unke upar koi nahi hai (\`null\`).

Agar aapse koi 'Helicopter' maange, toh na aapke paas hai, na Pitaji ke paas, na Dadaji ke paas -> Result: \`undefined\`!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. __proto__ vs prototype: The Crucial Difference",
        hi: "4. __proto__ Aur prototype: Sabse Bada Confusion",
      },
      body: {
        en: `This is the single most tested question in JavaScript interviews:

\`\`\`
[ Function Person ]  --- .prototype --->  [ Person.prototype Object ]
                                                    ^
                                                    |
[ Instance rahul ]   --- .__proto__  ----------------
\`\`\`

1. **\`prototype\`**: A property that exists **ONLY on constructor functions** (and classes). It defines what \`__proto__\` will be assigned to instances created via \`new Person()\`.
2. **\`__proto__\`** (or \`Object.getPrototypeOf()\`)**: An accessor property on **instances/objects** that points to the prototype object it inherits from.

Rule: \`instance.__proto__ === Constructor.prototype\``,
        hi: `Yeh interviewers ka sabse favourite question hai:

1. **\`prototype\`**: Yeh property **sirf constructor functions** (ya classes) ke paas hoti hai. Yeh batata hai ki jab koi \`new\` se object banayega toh uske child ko kya virasat milegi.
2. **\`__proto__\`** (Official method: \`Object.getPrototypeOf(obj)\`): Yeh property **objects/instances** ke paas hoti hai jo batati hai ki is object ka baap (prototype) kaun hai.

Sunehra Niyam: \`rahul.__proto__ === Person.prototype\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: Prototypes, Chains, and Custom Polyfills",
        hi: "5. Practical Examples: Prototypes, Chains, aur Custom Polyfills",
      },
      body: {
        en: `### Example 1: Attaching Shared Methods to Constructor Prototype
Preventing memory duplication across multiple student instances.`,
        hi: `### Example 1: Constructor Prototype Par Methods Lagana
Dekhiye kaise 10,000 students banne par bhi memory mein ek hi \`getDetails\` method share hota hai.`,
      },
      code: {
        language: "javascript",
        filename: "prototypeMethods.js",
        snippet: `// Example 1: Memory-efficient Constructor with Prototype
function Student(name, rollNo, stream) {
  // Instance-specific own properties
  this.name = name;
  this.rollNo = rollNo;
  this.stream = stream;
}

// Attach shared methods to Student.prototype
Student.prototype.getDetails = function() {
  return \`Student: \${this.name} | Roll No: \${this.rollNo} | Stream: \${this.stream}\`;
};

Student.prototype.collegeName = "IIT Delhi"; // Shared constant

const s1 = new Student("Aryan", 101, "Computer Science");
const s2 = new Student("Neha", 102, "Mechanical");

console.log(s1.getDetails()); // Student: Aryan | Roll No: 101 | Stream: Computer Science
console.log(s2.getDetails()); // Student: Neha | Roll No: 102 | Stream: Mechanical

// Verification: Both students share the EXACT same function reference in memory!
console.log(s1.getDetails === s2.getDetails); // true!
console.log(s1.hasOwnProperty("name")); // true (own property)
console.log(s1.hasOwnProperty("getDetails")); // false (inherited from prototype!)`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Manual Prototypal Inheritance (Vehicle -> ElectricCar)",
        hi: "Example 2: Manual Prototypal Inheritance Chain Setup",
      },
      body: {
        en: `### Example 2: Establishing a Multi-Level Prototype Chain
Showing how classes worked prior to ES6 using \`Object.create()\`.`,
        hi: `### Example 2: Object.create() Se Custom Prototype Chain Banana
ES6 aane se pehle parent-child inheritance kaise manually link ki jaati thi.`,
      },
      code: {
        language: "javascript",
        filename: "customInheritance.js",
        snippet: `// Example 2: Prototype Chain without ES6 classes
function Vehicle(brand, wheels) {
  this.brand = brand;
  this.wheels = wheels;
}

Vehicle.prototype.start = function() {
  return \`\${this.brand} is starting its engine...\`;
};

function ElectricCar(brand, batteryCapacity) {
  // 1. Call parent constructor with current context
  Vehicle.call(this, brand, 4);
  this.batteryCapacity = batteryCapacity;
}

// 2. Link prototypes using Object.create (creates fresh object whose __proto__ is Vehicle.prototype)
ElectricCar.prototype = Object.create(Vehicle.prototype);

// 3. Fix constructor reference
ElectricCar.prototype.constructor = ElectricCar;

// 4. Add child-specific methods
ElectricCar.prototype.charge = function() {
  return \`Charging \${this.batteryCapacity} kWh battery of \${this.brand}!\`;
};

const nexonEV = new ElectricCar("Tata Nexon EV", 40.5);

console.log(nexonEV.start()); // Inherited from Vehicle: "Tata Nexon EV is starting its engine..."
console.log(nexonEV.charge()); // Child method: "Charging 40.5 kWh battery of Tata Nexon EV!"
console.log(nexonEV instanceof ElectricCar); // true
console.log(nexonEV instanceof Vehicle); // true`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Building a Custom Polyfill for Array.prototype.myFilter",
        hi: "Example 3: Array.prototype Par Custom Polyfill Likhna",
      },
      body: {
        en: `### Example 3: Extending Native Prototypes Responsibly (Polyfill Pattern)
How developers emulate new language features on older browsers by attaching to \`Array.prototype\`.`,
        hi: `### Example 3: Real-World Polyfill Implementation
Purane browsers par modern JavaScript run karne ke liye Array.prototype par custom filter method banana.`,
      },
      code: {
        language: "javascript",
        filename: "polyfillExample.js",
        snippet: `// Example 3: Writing a custom polyfill for Array.prototype.filter
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function(callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 'this' refers to the array on which .myFilter is called
    const result = [];
    for (let i = 0; i < this.length; i++) {
      // Check if property exists (skip sparse holes)
      if (i in this) {
        if (callback.call(thisArg, this[i], i, this)) {
          result.push(this[i]);
        }
      }
    }
    return result;
  };
}

const numbers = [12, 5, 8, 130, 44, 9];
const filtered = numbers.myFilter(num => num >= 15);
console.log("Filtered Numbers:", filtered); // [130, 44]`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Mistakes & Anti-Patterns",
        hi: "6. Prototypes Mein Hone Wali Badi Galtiyan",
      },
      mistakes: [
        {
          mistake: {
            en: "Directly mutating `obj.__proto__` in performance-critical code.",
            hi: "Live code mein `obj.__proto__ = newProto` ko dynamically change karna.",
          },
          correction: {
            en: "Mutating `__proto__` severely degrades V8 engine optimizations (it deoptimizes hidden classes and inline caches). Always use `Object.create()` to establish prototype at creation time.",
            hi: "Live execution ke dauran `__proto__` modify karne se V8 engine ki internal optimization de-optimize ho jati hai. Hamesha object banate waqt `Object.create()` use karein.",
          },
          code: `// SLOW ANTI-PATTERN:
const cat = { meow: true };
const obj = {};
obj.__proto__ = cat; // Destroys V8 hidden class optimization!

// FAST RECOMMENDED PATTERN:
const fastObj = Object.create(cat); // Created with prototype from start`,
        },
        {
          mistake: {
            en: "Overwriting native prototypes like `Object.prototype` or `Array.prototype` in libraries.",
            hi: "Native prototypes (`Object.prototype`) ko modify karna jisse third-party libraries toot sakti hain (Monkey Patching).",
          },
          correction: {
            en: "Never pollute native prototypes unless writing a verified, standard-compliant polyfill. Adding custom properties to Object.prototype breaks `for...in` loops in unexpected places.",
            hi: "Native prototypes ko monkey-patch na karein. Agar `Object.prototype` par koi property add karenge, toh poore app ke har for...in loop mein woh visible ho jayegi.",
          },
          code: `// DANGEROUS:
// Object.prototype.customHelper = function() {};

// SAFE: Create a standalone helper function instead
function customHelper(obj) { /* ... */ }`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Best Practices for Modern JavaScript",
        hi: "7. Modern JavaScript Mein Prototype Ke Best Practices",
      },
      body: {
        en: `- **Use ES6 Class Syntax for Cleanliness**: ES6 \`class\` and \`extends\` produce cleaner, less error-prone code while compiling down to the same performant prototype structure.
- **Use \`Object.hasOwn(obj, prop)\`**: In modern JS (ES2022+), use \`Object.hasOwn(obj, "prop")\` instead of \`obj.hasOwnProperty()\` because \`hasOwnProperty\` can be shadowed by an object property.
- **Avoid deep prototype chains**: Lookups across chains deeper than 4-5 levels can introduce measurable latency in hot execution loops.`,
        hi: `- **ES6 Class Syntax Use Karein**: Modern apps mein \`class\` aur \`extends\` likhein kyunki syntax readable hai aur prototype automatically handle hota hai.
- **\`Object.hasOwn()\` Use Karein**: ES2022 mein \`Object.hasOwn(obj, prop)\` use karein taaki agar kisi object mein 'hasOwnProperty' naam ki key ho toh code na fate.
- **Lambi Prototype Chains Se Bachein**: Zyada gehri prototype chains (5+ levels) property lookup ko slow kar sakti hain.`,
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
            en: "What is the difference between `__proto__` and `prototype`?",
            hi: "`__proto__` aur `prototype` mein kya basic difference hai?",
          },
          a: {
            en: "`prototype` is an object property present only on constructor functions and classes; it specifies the blueprint that will become the `__proto__` of any object created using `new`. `__proto__` is an internal accessor property on instances that points up to its parent prototype in the prototype chain.",
            hi: "`prototype` sirf constructor functions aur classes ke paas hota hai, jo ye batata hai ki naye bane instances ko kya methods milenge. Jabki `__proto__` har object instance ke paas hota hai jo uske actual prototype ko point karta hai jahan se methods inherit ho rahe hain.",
          },
        },
        {
          q: {
            en: "What is at the very top of the prototype chain in JavaScript?",
            hi: "JavaScript mein prototype chain ke sabse top par kya hota hai?",
          },
          a: {
            en: "At the top of the chain is `Object.prototype`. And `Object.getPrototypeOf(Object.prototype)` returns `null`. This `null` signifies the terminal end of the prototype chain.",
            hi: "Chain ke sabse upar `Object.prototype` hota hai. Aur `Object.prototype.__proto__` hamesha `null` return karta hai, jo ye darshata hai ki chain yahin samapt hoti hai.",
          },
        },
        {
          q: {
            en: "What is property shadowing in JavaScript prototypal inheritance?",
            hi: "JavaScript mein Property Shadowing ka kya matlab hai?",
          },
          a: {
            en: "Property shadowing occurs when an object defines a property with the exact same name as a property that exists on its prototype. The object's own property is found first during lookup, effectively 'shadowing' (hiding) the prototype's property for that instance.",
            hi: "Jab kisi child object ke paas usi naam ki property hoti hai jo uske prototype ke paas bhi hai, toh lookup pehle child ki property ko utha leta hai aur prototype wali property chup jaati hai. Is phenomenon ko Property Shadowing kehte hain.",
          },
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "9. Quick Summary Sheet",
        hi: "9. Quick Summary Sheet",
      },
      body: {
        en: `- **Prototypal vs Classical**: JS objects inherit directly from other objects without rigid class blueprints.
- **Lookup Walk**: Own property -> \`__proto__\` -> \`__proto__.__proto__\` -> \`Object.prototype\` -> \`null\` (returns \`undefined\`).
- **Memory benefit**: Methods stored once on the prototype are shared across unlimited instances.
- **ES6 Class**: Purely syntax sugar over standard prototype linking.`,
        hi: `- **Objects Inherit From Objects**: JS mein koi rigid class compile-time type system nahi hai, runtime par objects link hote hain.
- **Lookup Sequence**: Own property -> Parent prototype -> Object.prototype -> null.
- **Memory Saver**: 100,000 objects bhi same prototype method share karte hain, RAM bachti hai.
- **ES6 Classes**: Under the hood prototypal inheritance ka hi modern syntax hai.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What does `Object.getPrototypeOf(Object.prototype)` evaluate to?",
      "hi": "`Object.getPrototypeOf(Object.prototype)` ka result kya hota hai?"
    },
    "options": [
      {
        "en": "null",
        "hi": "null"
      },
      {
        "en": "undefined",
        "hi": "undefined"
      },
      {
        "en": "Object",
        "hi": "Object"
      },
      {
        "en": "Function.prototype",
        "hi": "Function.prototype"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Object.prototype is the root of the prototype chain. Its prototype is null, marking the terminus of the chain.",
      "hi": "Object.prototype chain ka root hai. Iske upar koi prototype nahi hota, iska prototype null hota hai."
    }
  },
  {
    "q": {
      "en": "Given `const arr = [1, 2, 3]`, which expression is strictly true?",
      "hi": "`const arr = [1, 2, 3]` ke liye kaunsa statement strictly true hai?"
    },
    "options": [
      {
        "en": "Object.getPrototypeOf(arr) === Array.prototype",
        "hi": "Object.getPrototypeOf(arr) === Array.prototype"
      },
      {
        "en": "arr.prototype === Array.prototype",
        "hi": "arr.prototype === Array.prototype"
      },
      {
        "en": "arr.__proto__ === Object.prototype",
        "hi": "arr.__proto__ === Object.prototype"
      },
      {
        "en": "Array.__proto__ === arr",
        "hi": "Array.__proto__ === arr"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Instances have prototypes accessible via Object.getPrototypeOf(arr) (or __proto__), which links to Array.prototype. Only functions have the .prototype property.",
      "hi": "Array instance ka prototype Array.prototype hota hai jise Object.getPrototypeOf(arr) se check kiya ja sakta hai."
    }
  },
  {
    "q": {
      "en": "Why is attaching methods to `Constructor.prototype` superior to defining methods inside `this.method = function() {}`?",
      "hi": "Constructor ke andar `this.method` likhne ke mukable `Constructor.prototype.method` likhna better kyun hai?"
    },
    "options": [
      {
        "en": "Memory efficiency: the method is created only once in memory and shared across all instances",
        "hi": "Memory efficiency: method sirf 1 baar RAM mein banta hai aur sabhi instances share karte hain"
      },
      {
        "en": "It executes faster on the GPU",
        "hi": "Yeh GPU par tez chalta hai"
      },
      {
        "en": "It makes variables strictly private",
        "hi": "Yeh variables ko private bana deta hai"
      },
      {
        "en": "It prevents using the new keyword",
        "hi": "Yeh new keyword use karne se rokta hai"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Defining methods in the constructor allocates a new function closure for every instance created. Attaching it to the prototype shares a single function reference.",
      "hi": "Constructor ke andar likhne par har naye object ke saath ek naya duplicate function banta hai, jabki prototype par sirf 1 copy share hoti hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Prototypes & Prototypal Inheritance in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Prototypes & Prototypal Inheritance Model (Deep Dive) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling prototypes & prototypal inheritance with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Prototypes & Prototypal Inheritance Model (Deep Dive) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Prototypes & Prototypal Inheritance establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Prototypes & Prototypal Inheritance directly resolve?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Prototypes & Prototypal Inheritance, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Prototypes & Prototypal Inheritance, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Prototypes & Prototypal Inheritance, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Prototypes & Prototypal Inheritance?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Prototypes & Prototypal Inheritance be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Prototypes & Prototypal Inheritance Model (Deep Dive) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Prototypes & Prototypal Inheritance impact application memory and CPU consumption?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Prototypes & Prototypal Inheritance?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Prototypes & Prototypal Inheritance?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Prototypes & Prototypal Inheritance?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Prototypes & Prototypal Inheritance, what must the test suite assert?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Prototypes & Prototypal Inheritance?",
      "hi": "Modular design Prototypes & Prototypal Inheritance Model (Deep Dive) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Prototypes & Prototypal Inheritance be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Prototypes & Prototypal Inheritance Model (Deep Dive) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Prototypes & Prototypal Inheritance properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Prototypes & Prototypal Inheritance Model (Deep Dive) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Prototypes & Prototypal Inheritance in production?",
      "hi": "Production mein Prototypes & Prototypal Inheritance Model (Deep Dive) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Prototypes & Prototypal Inheritance?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Prototypes & Prototypal Inheritance?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Prototypes & Prototypal Inheritance?",
      "hi": "Prototypes & Prototypal Inheritance Model (Deep Dive) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
