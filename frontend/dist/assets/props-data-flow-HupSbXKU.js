const e={id:"react-props-immutability",title:{en:"Props & One-Way Data Flow",hi:"Props & One-Way Data Flow (Parent to Child)"},difficulty:"Beginner",readTime:10,sections:[{type:"concept",heading:{en:"1. What are Props & One-Way Data Flow?",hi:"1. Props Kya Hote Hain Aur One-Way Data Flow Ka Concept"},body:{en:`In React, **Props (short for Properties)** are arbitrary inputs passed from a **Parent component to a Child component**, just like arguments passed to a JavaScript function.

### One-Way (Unidirectional) Data Flow:
Data in React flows strictly in one direction: **downwards from Parent to Child**.
- A parent component can pass data (strings, numbers, objects, arrays, functions, or even other JSX elements) down to its children via props.
- A child component **cannot** directly mutate its parent's state. If a child needs to send information back up, the parent passes down an **event handler callback function** as a prop!

\`\`\`
       [Parent Component: App] (owns state: user)
                 │
                 ▼  (passes: user={user})
     [Child Component: Navbar]
                 │
                 ▼  (passes: name={user.name})
  [Grandchild Component: UserAvatar]
\`\`\``,hi:`React mein **Props (Properties ka short form)** aise inputs hote hain jo ek **Parent component apne Child component ko** bhejta hai, bilkul waise hi jaise JavaScript function mein arguments pass kiye jaate hain.

### One-Way (Unidirectional) Data Flow:
React mein data hamesha ek hi disha mein behta hai: **Upar (Parent) se Niche (Child) ki taraf**.
- Parent apne child ko strings, numbers, arrays, objects ya functions props ke zariye bhej sakta hai.
- Child component parent ke data ko seedhe change nahi kar sakta. Agar child ko parent ko kuch batana ho, toh parent ek **callback function** prop ke roop mein bhejta hai jise child call karta hai.`}},{type:"concept",heading:{en:"2. Props are Read-Only (Immutability Rule)",hi:"2. Props Read-Only Hote Hain (Pure Functions Ka Niyam)"},body:{en:`### The Golden Rule of React:
> **All React components must act like pure functions with respect to their props.**

A component must **NEVER modify its own props**:
\`\`\`javascript
// ❌ STRICTLY FORBIDDEN: Mutating props directly
function UserCard(props) {
  props.name = "Aman"; // TypeError: Cannot assign to read only property
  props.score += 10;   // Mutates parent state by reference!
  return <h1>{props.name}</h1>;
}
\`\`\`

If a component's output needs to change over time in response to user interaction or network responses, that dynamic data must be managed as **State** (\`useState\`), not by mutating props!`,hi:`### React Ka Sabse Bada Niyam:
> **React ke saare components ko apne props ke mamle mein Pure Functions ki tarah behave karna chahiye.**

Koi bhi component apne mile hue props ko **kabhi modify nahi kar sakta**:
\`\`\`javascript
// ❌ BILKUL GALAT: Props ko seedhe badalna
function UserCard(props) {
  props.name = "Aman"; // Error! Props read-only hote hain
  return <h1>{props.name}</h1>;
}
\`\`\`

Agar kisi data ko user ke click ya typing par badalna hai, toh use props badalne ke bajaye **State** (\`useState\`) mein rakhna chahiye!`}},{type:"analogy",heading:{en:"Real-Life Analogy: The Sealed Speed Post Envelope",hi:"Real-Life Analogy: Sarkari Speed Post Ka Sealed Lifafa"},body:{en:`Consider receiving an official Speed Post envelope from your university:

- **The University (Parent Component)** puts your Degree Certificate and Final Marks into a sealed waterproof envelope with your name on it.
- **The Delivery (Passing Props)**: The postman brings the sealed envelope to your hostel door (**Props flowing downwards**).
- **Read-Only Nature**: You are the student (**Child Component**). You can open the envelope, read your marks, frame it on the wall, or show it to employers. But you **cannot** take a pen, cross out 65%, write 95%, and expect the university database to change (**Props are immutable**)!
- **Child to Parent Communication (Callback Prop)**: If there is a calculation error, you don't rewrite the certificate yourself. You fill out a formal Correction Request Form (**calling the callback function passed by the University**) and submit it back to the Exam Controller!`,hi:`University se aane wale Speed Post lifafe se samjhein:

- **University (Parent Component)** ne aapki marksheet par 75% likh kar ek sealed lifafe mein band kar di.
- **Delivery (Passing Props)**: Postman lifafa aapke ghar deliver karta hai (**Data top-to-bottom flow hua**).
- **Read-Only (Props Badalne Ki Manaahi)**: Aap (Child) lifafa khol kar marksheet padh sakte hain, photo kheench sakte hain. Lekin aap pen se 75% ko kaat kar 95% nahi likh sakte (**Props immutable hain**)!
- **Callback Function (Child se Parent ko batana)**: Agar marksheet mein koi galati hai, toh aap university ke Re-evaluation Form par sign karke bhejte hain (**Callback function trigger karna**), aur university naya data bhejti hai.`}},{type:"syntax",heading:{en:"Syntax: Destructuring, Defaults & The children Prop",hi:"Syntax: Props Destructuring, Default Values Aur children Prop"},body:{en:`### 1. Modern Destructuring with Default Values:
Instead of writing \`props.title\` everywhere, destructure directly in the function arguments:
\`\`\`jsx
export default function Button({
  label = "Click Me", // Default value
  variant = "primary",
  disabled = false,
  onClick
}) {
  return (
    <button onClick={onClick} disabled={disabled} className={\`btn btn-\${variant}\`}>
      {label}
    </button>
  );
}
\`\`\`

### 2. The Special \`children\` Prop:
Any JSX passed between component opening and closing tags is received as \`props.children\`:
\`\`\`jsx
// Usage:
<Card title="Analytics">
  <p>Total Revenue: ₹45,000</p>
  <button>Export CSV</button>
</Card>

// Definition:
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}
\`\`\``,hi:`### 1. Props Destructuring Aur Default Values:
Har jagah \`props.title\` likhne ke bajaye arguments mein hi destructure karein:
\`\`\`jsx
export default function Button({
  label = "Submit", // Default value agar parent na bheje
  variant = "primary",
  onClick
}) {
  return (
    <button onClick={onClick} className={\`btn-\${variant}\`}>
      {label}
    </button>
  );
}
\`\`\`

### 2. Special \`children\` Prop:
Jab aap kisi component ke opening aur closing tag ke beech koi content likhte hain, toh woh child component ko \`children\` prop ke roop mein milta hai:
\`\`\`jsx
// Use karte waqt:
<Card title="Analytics">
  <p>Paisa: ₹45,000</p>
</Card>

// Component ke andar:
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
\`\`\``}},{type:"example",heading:{en:"Example 1: Clean Prop Destructuring & Optional Defaults",hi:"Example 1: Prop Destructuring Aur Default Values Ka Example"},body:{en:"A reusable StatusBadge component demonstrating primitive props, default fallback values, and boolean flags.",hi:"Reusable StatusBadge component jo props destructuring aur default parameters demonstrate karta hai."},code:{language:"jsx",filename:"StatusBadge.jsx",snippet:`import React from "react";

/**
 * Reusable StatusBadge Component
 * Demonstrates default props, string, and boolean prop handling.
 */
export default function StatusBadge({
  status = "pending", // fallback default
  label,
  showPulse = false,
  size = "md"
}) {
  const statusStyles = {
    active: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 ring-emerald-500",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 ring-amber-500",
    failed: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 ring-rose-500"
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  const activeColor = statusStyles[status] || statusStyles.pending;
  const activeSize = sizeStyles[size] || sizeStyles.md;

  return (
    <span
      className={\`inline-flex items-center gap-1.5 font-medium rounded-full ring-1 ring-inset \${activeColor} \${activeSize}\`}
    >
      {showPulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {label || status.toUpperCase()}
    </span>
  );
}`}},{type:"example",heading:{en:"Example 2: The Container Wrapper Pattern Using children Prop",hi:"Example 2: children Prop Se Flexible Container Modal Banana"},body:{en:"Creating an accessible, reusable Modal Dialog shell component that accepts arbitrary child JSX content via the `children` prop.",hi:"`children` prop ka use karke flexible Modal Dialog shell component design karna."},code:{language:"jsx",filename:"ModalDialog.jsx",snippet:`import React from "react";

export default function ModalDialog({
  isOpen = false,
  title = "Notification",
  onClose,
  children // Any JSX passed inside <ModalDialog>...</ModalDialog>
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Body content projected via children */}
        <div className="py-4 text-slate-600 dark:text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}`}},{type:"example",heading:{en:"Example 3: Child-to-Parent Communication via Callback Props",hi:"Example 3: Callback Props Se Child Se Parent Ko Data Bhejna"},body:{en:"Demonstrating how a child FilterBar communicates user filter clicks back up to the parent component using callback function props.",hi:"Child component (FilterBar) se parent component ko selected category bhejne ke liye function prop ka use."},code:{language:"jsx",filename:"CategoryFilterBar.jsx",snippet:`import React, { useState } from "react";

// Child Component: Receives activeCategory and onSelectCategory callback
export function CategoryFilterBar({
  categories = ["All", "Mobiles", "Laptops", "Audio", "Wearables"],
  activeCategory = "All",
  onSelectCategory = () => {}
}) {
  return (
    <div className="flex flex-wrap gap-2 py-3">
      {categories.map(cat => {
        const isSelected = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)} // Invokes parent callback!
            className={\`px-4 py-2 rounded-xl text-xs font-semibold transition-all \${
              isSelected
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
            }\`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

// Parent Component: Owns the active filter state
export default function ProductCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Product Catalog
      </h1>
      
      {/* Passing state down and callback handler down as props */}
      <CategoryFilterBar
        activeCategory={selectedCategory}
        onSelectCategory={(newCat) => {
          console.log("Parent received category change:", newCat);
          setSelectedCategory(newCat);
        }}
      />

      <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 text-sm">
        Currently displaying products filtered by: <strong>{selectedCategory}</strong>
      </div>
    </div>
  );
}`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Aam Galatiyan Aur Unka Solution"},body:{en:'### 1. Mutating Props Directly Inside a Child\n- **Mistake**: Writing `props.items.push(newItem)` or `props.isActive = true`. In JavaScript, objects and arrays are passed by reference. Mutating a prop modifies the parent\'s state outside React\'s knowledge, breaking change detection and causing unpredictable bugs!\n- **Fix**: Treat props as strictly read-only. Make a copy: `const updatedItems = [...props.items, newItem]`.\n\n### 2. Passing Numbers and Booleans as Strings\n- **Mistake**: Writing `<Pagination page="1" isLast="true" count="10" />`. The child receives `"1"` (string) instead of `1` (number), causing bugs like `"1" + 1 = "11"` instead of `2`!\n- **Fix**: Use JSX curly braces for non-string literals: `<Pagination page={1} isLast={true} count={10} />`.\n\n### 3. Prop Drilling Through 7+ Layers\n- **Mistake**: Passing `user` and `theme` props through 8 intermediate components that do not even care about them, just to deliver them to a deeply nested child.\n- **Fix**: Use **Component Composition** (passing the child directly via `children`) or React\'s **Context API** (`useContext`).',hi:'### 1. Child Component Mein Props Ko Modify Karna\n- **Galati**: `props.items.push(newItem)` likhna. JavaScript mein arrays reference se pass hote hain, isse parent ka state React ki jankari ke bina mutate ho jata hai aur UI sync toot jata hai.\n- **Solution**: Props ko read-only samjhein aur copy banayein: `[...props.items, newItem]`.\n\n### 2. Numbers Aur Booleans Ko String Bana Kar Bhejna\n- **Galati**: `<Card count="5" isVerified="false" />` likhna. Isse `"false"` truthy string ban jata hai aur `count + 1` ka result `"51"` ban jata hai!\n- **Solution**: Non-string values ko hamesha curly braces mein pass karein: `<Card count={5} isVerified={false} />`.\n\n### 3. Prop Drilling (8 Layers Tak Data Bhejna)\n- **Galati**: Beech ke 6 components ko zabardasti props pass karna jinhe us data ki zaroorat hi nahi hai.\n- **Solution**: Component Composition (`children` prop) use karein ya **Context API** (`useContext`) ka sahara lein.'}},{type:"tip",heading:{en:"Best Practices: Component Props Architecture",hi:"Props Architecture Ke Best Practices"},body:{en:"1. **Always Destructure in Function Parameters**: Writing `({ title, price, inStock = true })` makes the component's required inputs visible at a single glance.\n2. **Prefer Composition Over Prop Explosions**: Instead of passing 15 configuration flags (`hasHeader`, `headerTitle`, `hasFooter`, `footerButton`), pass children: `<Dialog header={<Header />} footer={<Footer />}>`.\n3. **Use Default Values for Optional Props**: Prevent runtime crashes like `Cannot read property of undefined` by supplying fallback empty arrays (`items = []`) or no-op functions (`onClick = () => {}`).\n4. **Keep Props Flat and Shallow**: Avoid passing deeply nested objects like `<Card data={a.b.c.d} />`. Pass only the specific properties the component actually needs: `<Card title={a.b.title} price={a.b.price} />`.",hi:"1. **Function Signature Mein Destructure Karein**: `({ title, price, inStock })` likhne se pehli nazar mein pata chal jata hai ki component ko kya chahiye.\n2. **Composition Ko Prefer Karein**: 20 alag-alag props bhejne ke bajaye `children` prop ka use karein.\n3. **Optional Props Ke Default Values Set Karein**: Crash se bachne ke liye `items = []` ya `onClick = () => {}` default parameters lagayein.\n4. **Props Ko Flat Aur Shallow Rakhein**: Deep nested objects bhejne ke bajaye sirf wahi data bhejein jiski zaroorat ho."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Top Interview Sawaal Aur Jawab"},body:{en:`### Q1: What does "Unidirectional Data Flow" mean in React?
**Answer**:
Unidirectional data flow means that state lives in parent components and flows strictly downwards to children via props. Children cannot directly mutate their parent's state. To communicate back up, children invoke callback functions supplied by the parent. This pattern makes state mutations predictable and easy to debug.

### Q2: Why are props immutable in React?
**Answer**:
Props are read-only to preserve component purity and maintain predictable rendering. If child components could mutate incoming props, multiple components sharing the same object would produce silent side effects, race conditions, and cause React's Fiber reconciliation diffing algorithm to fail to detect state changes.

### Q3: What is "Prop Drilling" and what are the best ways to solve it?
**Answer**:
Prop drilling is the process of passing props down through multiple layers of intermediate components that do not need the data themselves, merely to deliver it to a deeply nested child. Solutions:
1. **Component Composition**: Pass components as \`children\` or slots so intermediate wrappers don't need to know about the props.
2. **Context API (\`useContext\`)**: For global state like current user, theme, or language.
3. **External State Managers**: Redux Toolkit or Zustand for complex application-wide state.`,hi:`### Q1: React mein "Unidirectional Data Flow" ka kya matlab hota hai?
**Jawab**:
Iska matlab hai ki data hamesha Parent se Child ki taraf niche behta hai. Child seedhe parent ka state change nahi kar sakta. Agar child ko koi message bhejna ho toh woh parent dwara diye gaye callback function ko call karta hai. Isse debugging aasan ho jaati hai.

### Q2: React mein props immutable (read-only) kyun hote hain?
**Jawab**:
Pure components aur predictable rendering ke liye props read-only hote hain. Agar child props ko mutate karne lage, toh same object share karne wale doosre components mein unexpected bugs aa jayenge aur React Fiber diffing fail ho jayegi.

### Q3: "Prop Drilling" kya hai aur ise kaise theek karein?
**Jawab**:
Jab kisi deeply nested child tak data pahunchane ke liye beech ke kai components ko be-wajah props pass karne padein, toh use Prop Drilling kehte hain. Iske solutions:
1. **Component Composition**: \`children\` prop ka use karna.
2. **Context API (\`useContext\`)**: Global state (theme, user auth) ke liye.
3. **State Management**: Redux Toolkit ya Zustand use karna.`}},{type:"summary",heading:{en:"Quick Summary: Props & Data Flow",hi:"Quick Summary: Props & Data Flow"},body:{en:`- **Props Flow Downwards**: Parent to Child unidirectional data architecture.
- **Props are Read-Only**: Never mutate incoming props directly; treat components as pure functions.
- **Child-to-Parent Communication**: Handled by passing event handler callback functions down as props.
- **children Prop**: Enables flexible container components and slots.
- **Pass Non-Strings in Braces**: Numbers, booleans, arrays, and objects must be wrapped in \`{}\`.`,hi:`- **Props Niche Flow Hote Hain**: Parent se Child ki taraf unidirectional data.
- **Props Read-Only Hote Hain**: Props ko kabhi mutate na karein, components ko pure rakhein.
- **Child se Parent Communication**: Callback function pass karke handle kiya jata hai.
- **children Prop**: Flexible UI wrappers banane ke kaam aata hai.
- **Non-String Values**: Numbers aur booleans ko hamesha \`{}\` mein pass karein.`}}],quiz:[{q:{en:"What happens if a child component tries to execute props.user.name = 'New Name'?",hi:"Agar child component props.user.name = 'New Name' likh kar prop badalne ki koshish kare toh kya hoga?"},options:[{en:"React creates a new isolated copy of the user object automatically",hi:"React user object ki nayi copy bana deta hai"},{en:"It mutates the shared parent object by reference, breaking React's immutability principles and causing unpredictable bugs",hi:"Yeh parent ke object ko reference se mutate kar deta hai jisse unpredictable bugs aate hain"},{en:"It automatically saves the new name to MongoDB",hi:"MongoDB mein save ho jata hai"},{en:"The browser reloads immediately",hi:"Browser reload ho jata hai"}],answerIndex:1,explanation:{en:"Objects are passed by reference in JavaScript. Mutating a prop directly modifies the parent's data outside React's state management, causing state desynchronization.",hi:"Objects reference se pass hote hain. Child mein prop mutate karne se parent ka data chupchap badal jata hai aur React re-render trigger nahi kar pata."}},{q:{en:"How does a child component send information back up to its parent component?",hi:"Ek child component apne parent component ko data ya message wapas kaise bhejta hai?"},options:[{en:"By modifying window.localStorage directly",hi:"localStorage modify karke"},{en:"By invoking a callback function passed down as a prop from the parent",hi:"Parent dwara prop ke roop mein bheje gaye callback function ko call karke"},{en:"By firing a DOM document.dispatchEvent event",hi:"DOM event fire karke"},{en:"Children cannot communicate with parents in React under any circumstances",hi:"Child parent se baat kar hi nahi sakta"}],answerIndex:1,explanation:{en:"In React's unidirectional data flow, parents pass callback functions down to children. When an event occurs, the child executes the callback with the new data.",hi:"Parent child ko callback function prop mein deta hai. Event hone par child us function ko arguments ke sath call karta hai."}},{q:{en:'What is the difference between <Card count="5" /> and <Card count={5} />?',hi:'<Card count="5" /> aur <Card count={5} /> mein kya antar hai?'},options:[{en:"There is no difference; React parses all attributes into numbers",hi:"Koi antar nahi hai"},{en:`count="5" passes a string primitive ('5'), while count={5} passes a numeric primitive (5)`,hi:'count="5" string pass karta hai, jabki count={5} number pass karta hai'},{en:"count={5} will trigger a syntax compiler error in JSX",hi:"Syntax error aayega"},{en:'count="5" renders 5 times faster',hi:"5 times faster hota hai"}],answerIndex:1,explanation:{en:"Quotes always pass strings. Curly braces evaluate JavaScript expressions, preserving number, boolean, array, and object types.",hi:"Quotes hamesha string pass karte hain. Numbers ya booleans bhejne ke liye curly braces {} zaroori hote hain."}},{question:{en:"What is the core architectural purpose of Props & One-Way Data Flow in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Props & One-Way Data Flow (Parent to Child) ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling props & one-way data flow with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Props & One-Way Data Flow (Parent to Child) ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Props & One-Way Data Flow establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Props & One-Way Data Flow (Parent to Child) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Props & One-Way Data Flow directly resolve?",hi:"Props & One-Way Data Flow (Parent to Child) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Props & One-Way Data Flow, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Props & One-Way Data Flow (Parent to Child) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Props & One-Way Data Flow, how is its mental model best conceptualized through real-world analogies?",hi:"Props & One-Way Data Flow (Parent to Child) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Props & One-Way Data Flow, what syntactic convention is essential to prevent runtime errors?",hi:"Props & One-Way Data Flow (Parent to Child) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Props & One-Way Data Flow?",hi:"Props & One-Way Data Flow (Parent to Child) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Props & One-Way Data Flow be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Props & One-Way Data Flow (Parent to Child) ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Props & One-Way Data Flow impact application memory and CPU consumption?",hi:"Props & One-Way Data Flow (Parent to Child) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Props & One-Way Data Flow?",hi:"Props & One-Way Data Flow (Parent to Child) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Props & One-Way Data Flow?",hi:"Props & One-Way Data Flow (Parent to Child) mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Props & One-Way Data Flow?",hi:"Props & One-Way Data Flow (Parent to Child) mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Props & One-Way Data Flow, what must the test suite assert?",hi:"Props & One-Way Data Flow (Parent to Child) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Props & One-Way Data Flow?",hi:"Modular design Props & One-Way Data Flow (Parent to Child) mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Props & One-Way Data Flow be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Props & One-Way Data Flow (Parent to Child) ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Props & One-Way Data Flow properly belong and execute?",hi:"Full-stack MERN architecture mein Props & One-Way Data Flow (Parent to Child) kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Props & One-Way Data Flow in production?",hi:"Production mein Props & One-Way Data Flow (Parent to Child) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Props & One-Way Data Flow?",hi:"Props & One-Way Data Flow (Parent to Child) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Props & One-Way Data Flow?",hi:"Props & One-Way Data Flow (Parent to Child) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}},{question:{en:"Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Props & One-Way Data Flow?",hi:"Props & One-Way Data Flow (Parent to Child) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"},options:[{en:"To prevent memory leaks where unreachable or orphaned objects remain retained in heap memory, causing gradual performance degradation and crashes",hi:"Memory leaks rokne ke liye taaki unneeded objects RAM mein jama na hon aur server crash na ho"},{en:"To delete the client's local disk partition",hi:"Client ka local disk partition delete karne ke liye"},{en:"Because JavaScript engines allow only 5 variables in RAM",hi:"JS engine sirf 5 variables allow karta hai"},{en:"Cleanup is unnecessary because garbage collection handles 100% of event listeners automatically",hi:"Cleanup ki zaroorat nahi hoti"}],correctAnswer:0,explanation:{en:"Unclosed connections and dangling event listeners create references that prevent garbage collection, leading to severe memory leaks over time.",hi:"Dangling listeners aur unclosed connections memory leaks banate hain jo V8 heap ko exhaust karke process crash kar dete hain."}}]};export{e as default};
