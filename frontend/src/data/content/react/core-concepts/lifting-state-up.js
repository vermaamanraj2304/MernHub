export default {
  id: "react-lifting-state",
  title: {
    en: "Lifting State Up & Component Composition",
    hi: "Lifting State Up (Sharing State Between Siblings)",
  },
  difficulty: "Beginner",
  readTime: 11,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is 'Lifting State Up'?",
        hi: "1. 'Lifting State Up' Kya Hai Aur Iski Zaroorat Kyun Hoti Hai?",
      },
      body: {
        en: `In React, data flows strictly downwards from Parent to Child. Sibling components (components on the same hierarchical level) **cannot talk to each other directly**.

Often, two or more components need to reflect the same changing data. For example:
- A \`<ProductCard />\` sibling has an "Add to Cart" button.
- A \`<HeaderNavbar />\` sibling needs to show the live cart item counter badge.

### The Solution:
Instead of trying to pass data horizontally between siblings, you **lift the state up** to their **closest common ancestor component**.
The common parent component:
1. Owns the state (\`const [cart, setCart] = useState([])\`).
2. Passes the current state value down to Sibling A via props.
3. Passes a state updater callback function down to Sibling B via props.`,
        hi: `React mein data hamesha Parent se Child ki taraf niche behta hai. Sibling components (jo aapas mein bhai-behen hain) **aapas mein seedhe baat nahi kar sakte**.

Lekin kai baar do alag-alag components ko ek hi data chahiye hota hai. Jaise:
- \`<ProductList />\` component mein "Add to Cart" button hai.
- \`<Navbar />\` component mein cart badge ka counter hai jo turant badalna chahiye.

### Solution:
Siblings ke beech data transfer karne ke bajaye, hum state ko unke **sabse kareebi common parent component** mein shift (lift) kar dete hain.
Common Parent component:
1. State ko apne paas rakhta hai (\`const [cart, setCart] = useState([])\`).
2. Current cart data \`<Navbar />\` ko bhejta hai.
3. Cart update karne ka function \`<ProductList />\` ko bhejta hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Single Source of Truth Principle",
        hi: "2. Single Source of Truth Ka Siddhant",
      },
      body: {
        en: `In React applications, there should be a **Single Source of Truth** for any piece of data that changes.

### The Anti-Pattern: Mirroring Props in State
A common beginner mistake is copying a prop into a child's local state:
\`\`\`jsx
// ❌ ANTI-PATTERN: State duplication
function Child({ count }) {
  const [localCount, setLocalCount] = useState(count);
  // localCount will NOT update when parent's count changes!
}
\`\`\`
If two components each maintain their own copy of the same data, they will inevitably get out of sync. Lifting state up ensures that exactly **one** component holds the data, and all other components merely consume it via props.`,
        hi: `React architecture ka sabse bada niyam hai: **Single Source of Truth**.

### Sabse Badi Galati: Props Ko Local State Mein Copy Karna
Beginners aksar parent ke prop ko child ki local state mein copy kar dete hain:
\`\`\`jsx
// ❌ ANTI-PATTERN: Duplicate State
function Child({ count }) {
  const [myCount, setMyCount] = useState(count);
}
\`\`\`
Isse do alag-alag copies ban jaati hain. Agar parent ka count badlega, toh child ka local count purana hi reh jayega aur dono sync se bahar ho jayenge. Lifting State Up pakka karta hai ki data ki **sirf 1 master copy** ho.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Family Common Piggy Bank",
        hi: "Real-Life Analogy: Desi Parivaar Ki Common Gullak Aur Papa Ka Purse",
      },
      body: {
        en: `Consider two brothers (Rohan and Aman) living in the same home:

- **Without Common Ancestor (Independent State)**:
  - Rohan has his own ₹500 piggy bank; Aman has his own ₹500 piggy bank.
  - If Rohan buys vegetables for the house, Aman's wallet doesn't know about it. They have no idea how much total family grocery money is left.
- **Lifting State Up to Father (Common Parent)**:
  - The family money is kept in **Father's wallet (Common Parent Component)**: Total = ₹10,000.
  - When Rohan needs to buy milk, he asks Father: *"Papa, I spent ₹100"* (**invoking the callback \`onSpend(100)\`**).
  - Father deducts ₹100 from his wallet: Balance = ₹9,900 (**Parent state updates**).
  - Father announces the new balance to both Rohan and Aman (**Parent passes updated balance down via props**). Both brothers always see the exact same reality!`,
        hi: `Ghar ke do bhaiyon (Rohan aur Aman) se samjhein:

- **Bina Common Parent Ke (Alag-alag State)**:
  - Rohan ke paas alag ₹500 hain, Aman ke paas alag ₹500 hain.
  - Agar Rohan rashan lata hai, toh Aman ko pata nahi chalta ki ghar ka total kitna kharch hua.
- **Lifting State Up (Papa Ka Purse)**:
  - Ghar ka main paisa **Papa ke purse (Common Parent)** mein rehta hai: Total ₹10,000.
  - Jab Rohan sabzi khareedta hai, toh woh Papa se kehta hai: *"Papa ₹100 kharch ho gaye"* (**Callback function trigger hua**).
  - Papa purse se ₹100 kam karte hain (**Parent ka state update hua**).
  - Papa dono bhaiyon ko bata dete hain ki ab ₹9,900 bache hain (**Props ke zariye naya balance dono tak pahunch gaya**). Dono hamesha sync rehte hain!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax: Wiring Up Lifted State Between Siblings",
        hi: "Syntax: Siblings Ke Beech Lifted State Ko Connect Karna",
      },
      body: {
        en: `### Standard Lifted State Architecture:
\`\`\`jsx
function Parent() {
  const [sharedValue, setSharedValue] = useState("");

  return (
    <div>
      {/* Sibling A: Modifies the state via callback */}
      <InputSibling onValueChange={setSharedValue} />

      {/* Sibling B: Consumes the state via props */}
      <DisplaySibling value={sharedValue} />
    </div>
  );
}
\`\`\``,
        hi: `### Lifted State Ka Standard Pattern:
\`\`\`jsx
function Parent() {
  const [text, setText] = useState("");

  return (
    <div>
      {/* Sibling A: Input field jo text change karega */}
      <SearchInput onSearchChange={setText} />

      {/* Sibling B: Jo search text ko display ya filter karega */}
      <SearchResults query={text} />
    </div>
  );
}
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Synchronized Temperature Converter",
        hi: "Example 1: Celsius Aur Fahrenheit Ka Synchronized Converter",
      },
      body: {
        en: `The classic React documentation pattern: Typing in either Celsius or Fahrenheit automatically recalculates and synchronizes the other input in real-time.`,
        hi: `Celsius mein type karne par Fahrenheit aur Fahrenheit mein type karne par Celsius dynamically sync hona.`,
      },
      code: {
        language: "jsx",
        filename: "TemperatureConverter.jsx",
        snippet: `import React, { useState } from "react";

// Sibling Component for individual input
function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const scaleNames = { c: "Celsius (°C)", f: "Fahrenheit (°F)" };

  return (
    <div className="flex-1 space-y-1">
      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
        Enter temperature in {scaleNames[scale]}:
      </label>
      <input
        type="number"
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
      />
    </div>
  );
}

// Parent Component: Owns temperature state and conversion math
export default function TemperatureConverter() {
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");

  const toCelsius = (f) => ((f - 32) * 5) / 9;
  const toFahrenheit = (c) => (c * 9) / 5 + 32;

  const tryConvert = (temp, convertFn) => {
    const input = parseFloat(temp);
    if (Number.isNaN(input)) return "";
    const output = convertFn(input);
    return Math.round(output * 100) / 100;
  };

  const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md max-w-lg space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-white">
        Synchronized Temperature Converter
      </h3>

      <div className="flex gap-4">
        {/* Sibling 1 */}
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={(val) => {
            setScale("c");
            setTemperature(val);
          }}
        />

        {/* Sibling 2 */}
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={(val) => {
            setScale("f");
            setTemperature(val);
          }}
        />
      </div>

      {celsius && parseFloat(celsius) >= 100 && (
        <p className="text-xs text-rose-500 font-semibold bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-800">
          🔥 The water would boil at this temperature!
        </p>
      )}
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Single-Open Synced Accordion (Only 1 Open at a Time)",
        hi: "Example 2: Accordion List (Ek Baar Mein Sirf Ek Tab Khulega)",
      },
      body: {
        en: `Controlling multiple accordion panels from a parent component so that opening panel B automatically collapses panel A.`,
        hi: `Parent component se accordion state control karna taaki naya panel khulne par purana panel khud-b-khud band ho jaye.`,
      },
      code: {
        language: "jsx",
        filename: "SyncedAccordion.jsx",
        snippet: `import React, { useState } from "react";

// Sibling Panel Component
function AccordionPanel({ title, isOpen, onToggle, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left font-semibold text-xs flex justify-between items-center text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span>{title}</span>
        <span className="text-slate-400 font-bold">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 mt-2">
          {children}
        </div>
      )}
    </div>
  );
}

// Parent Component: Holds the ID of currently open panel
export default function SyncedAccordion() {
  const [openPanelId, setOpenPanelId] = useState("p1"); // 'p1' is open initially

  const handleToggle = (id) => {
    // If clicked panel is already open, close it (set null), else open it
    setOpenPanelId(prev => (prev === id ? null : id));
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-w-md space-y-3">
      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
        FAQ (Single Active Panel)
      </h3>

      <AccordionPanel
        title="What is MERN stack?"
        isOpen={openPanelId === "p1"}
        onToggle={() => handleToggle("p1")}
      >
        MERN stands for MongoDB, Express.js, React.js, and Node.js.
      </AccordionPanel>

      <AccordionPanel
        title="Why lift state up?"
        isOpen={openPanelId === "p2"}
        onToggle={() => handleToggle("p2")}
      >
        Lifting state up shares state cleanly across sibling components via their common parent.
      </AccordionPanel>

      <AccordionPanel
        title="What is reconciliation?"
        isOpen={openPanelId === "p3"}
        onToggle={() => handleToggle("p3")}
      >
        Reconciliation is React Fiber's diffing algorithm that updates only mutated DOM elements.
      </AccordionPanel>
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: E-Commerce Catalog Sibling and Cart Header Sibling",
        hi: "Example 3: Product List Sibling Aur Navbar Cart Counter Sibling",
      },
      body: {
        en: `Connecting a product list sibling (which adds items) with a sticky header navbar sibling (which displays live item count and total bill) via parent state.`,
        hi: `Product card sibling par click karne par Navbar sibling mein live count aur total bill update hona.`,
      },
      code: {
        language: "jsx",
        filename: "EcommerceMiniStore.jsx",
        snippet: `import React, { useState } from "react";

// Sibling 1: Header displaying cart summary
function StoreHeader({ cartCount, cartTotal }) {
  return (
    <header className="flex justify-between items-center p-4 rounded-2xl bg-indigo-600 text-white shadow-md">
      <span className="font-bold text-sm tracking-wide">Desi Kirana Hub</span>
      <div className="flex items-center gap-3 text-xs font-semibold">
        <span className="bg-indigo-700 px-3 py-1 rounded-full">
          🛒 {cartCount} items
        </span>
        <span className="bg-white text-indigo-700 px-3 py-1 rounded-full shadow-xs">
          ₹{cartTotal.toLocaleString("en-IN")}
        </span>
      </div>
    </header>
  );
}

// Sibling 2: Product grid adding items
function ProductGrid({ onAddToCart }) {
  const products = [
    { id: 1, name: "Tata Tea Gold (500g)", price: 320 },
    { id: 2, name: "Aashirvaad Atta (5kg)", price: 260 },
    { id: 3, name: "Fortune Sunflower Oil (1L)", price: 155 }
  ];

  return (
    <div className="space-y-2 pt-2">
      {products.map(prod => (
        <div
          key={prod.id}
          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center"
        >
          <div>
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {prod.name}
            </h4>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              ₹{prod.price}
            </span>
          </div>
          <button
            onClick={() => onAddToCart(prod)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
          >
            + Add
          </button>
        </div>
      ))}
    </div>
  );
}

// Parent Component: Owns cart state and coordinates siblings
export default function EcommerceMiniStore() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const totalBill = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-w-md space-y-3">
      {/* Sibling 1 receives computed totals */}
      <StoreHeader cartCount={cartItems.length} cartTotal={totalBill} />

      {/* Sibling 2 receives callback to mutate cart */}
      <ProductGrid onAddToCart={handleAddToCart} />
    </div>
  );
}`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Aam Galatiyan Aur Unka Solution",
      },
      body: {
        en: `### 1. Lifting State "Too High" (Global State Pollution)
- **Mistake**: Moving temporary local input state (like search bar typing) all the way up to the root \`<App />\` component.
- **Consequence**: Every single keystroke in the search box triggers a complete re-render of the entire web application!
- **Fix**: Lift state only to the **closest common parent** of the components that actually need it.

### 2. Copying Props into Child Local State
- **Mistake**: Writing \`const [val, setVal] = useState(props.val)\`. The local state is only initialized once on initial mount; subsequent changes to \`props.val\` from the parent are completely ignored by the child!
- **Fix**: Use \`props.val\` directly (Controlled Component) rather than duplicating state.

### 3. Prop Drilling Through 6+ Layers Instead of Composition
- **Mistake**: Passing \`cart\` and \`onAddToCart\` through 6 levels of container components.
- **Fix**: Use component composition (\`children\`) or Context API.`,
        hi: `### 1. State Ko Zaroorat Se Zyada Upar Lift Kar Dena
- **Galati**: Search box ke local text ko root \`<App />\` component mein daal dena.
- **Nuksan**: Search box mein ek akshar type karte hi poori website re-render hone lagti hai jisse typing slow ho jaati hai!
- **Solution**: State ko sirf un dono components ke **sabse kareebi common parent** tak hi lift karein.

### 2. Parent Ke Prop Ko Child Ki State Mein Copy Karna
- **Galati**: \`const [value, setValue] = useState(props.value)\` likhna. Child ki state sirf pehli baar banti hai, baad mein parent ka prop badalne par child update nahi hota.
- **Solution**: Prop ko seedhe use karein, local state mein duplicate na karein.

### 3. Prop Drilling Se Code Kharaab Hona
- **Galati**: 6 layers tak props pass karte jana.
- **Solution**: \`children\` prop composition use karein ya Context API apnayein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: State Elevation Strategy",
        hi: "State Elevation Ke Best Practices",
      },
      body: {
        en: `1. **Find the Lowest Common Ancestor**: Identify all components that need to read or write the data, and move state to their immediate shared parent.
2. **Derive Values in the Parent**: Instead of storing \`cartItems\`, \`cartCount\`, and \`cartTotal\` in state, store only \`cartItems\` and compute count and total dynamically with \`.length\` and \`.reduce()\`.
3. **Pass Domain Callbacks**: Instead of passing raw \`setCartItems\`, pass descriptive callbacks: \`onAddToCart={handleAddToCart}\` or \`onRemoveItem={handleRemove}\`.
4. **Colocate State**: If a piece of state is only used by one component, keep it local. Only lift when another component genuinely needs it.`,
        hi: `1. **Lowest Common Parent Dhoondein**: Sirf unhi components ke immediate parent par state rakhein jinhe data chahiye.
2. **Derived Values State Mein Mat Rakhein**: \`cartCount\` aur \`cartTotal\` ke liye alag state na banayein; \`cartItems.length\` aur \`.reduce()\` se calculate karein.
3. **Specific Callbacks Pass Karein**: Raw setter \`setItems\` bhejne ke bajaye \`onAddToCart\` jaisa descriptive function bhejein.
4. **State Colocation**: Jab tak zaroorat na ho, state ko component ke andar hi rakhein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Top Interview Sawaal Aur Jawab",
      },
      body: {
        en: `### Q1: What does "Lifting State Up" mean in React, and when should you do it?
**Answer**:
Lifting state up means moving a piece of state from child components to their closest common parent component. It is required when two or more sibling components need to access, share, or mutate the same data. By placing the state in the common parent, the parent acts as the single source of truth, passing down data as props and mutator functions as callbacks.

### Q2: What are the performance pitfalls of lifting state up too high?
**Answer**:
If state is lifted too high (such as placing high-frequency form input state in the root \`<App />\` component), every state update will cause the parent and all of its descendant child components to re-render. This causes unnecessary Virtual DOM diffing, input lag, and frame drops. State should only be lifted to the lowest common ancestor.

### Q3: Why is mirroring a prop into local state (useState(props.data)) considered an anti-pattern?
**Answer**:
Because \`useState(initialValue)\` only evaluates the initial argument during the component's initial mount. If the parent passes updated props later, the child's local state will not synchronize with the new prop, leading to stale data and divergent UI states.`,
        hi: `### Q1: React mein "Lifting State Up" ka kya matlab hai?
**Jawab**:
Jab do sibling components ko ek hi data dekhna ya update karna ho, toh data ko unke common parent mein rakhne ko "Lifting State Up" kehte hain. Parent Single Source of Truth banta hai aur props & callbacks se dono ko sync rakhta hai.

### Q2: State ko bohot zyada upar lift karne ka kya nuksan hai?
**Jawab**:
Agar high-frequency data (jaise text typing) root component mein rakh diya jaye, toh har keystroke par poori app re-render hogi jisse lag aayega. State ko hamesha lowest common parent par hi rakhna chahiye.

### Q3: Prop ko local state mein copy karna (\`useState(props.val)\`) anti-pattern kyun hai?
**Jawab**:
Kyunki \`useState\` sirf pehli baar mount hone par initial value set karta hai. Baad mein parent se naya prop aane par child ka local state update nahi hota aur UI purani value dikhata rehta hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Lifting State Up",
        hi: "Quick Summary: Lifting State Up",
      },
      body: {
        en: `- **Siblings Cannot Talk Directly**: React enforces strictly unidirectional top-down data flow.
- **Lift to Lowest Common Ancestor**: Shared state lives in the closest shared parent.
- **Single Source of Truth**: Exactly one component holds and manages the state.
- **Derive Don't Duplicate**: Calculate totals and counts from the master array instead of separate states.
- **Avoid Prop Duplication**: Do not mirror props into local child state.`,
        hi: `- **Siblings Direct Baat Nahi Kar Sakte**: Data hamesha upar se niche flow hota hai.
- **Lowest Common Parent**: Shared state dono ke kareebi parent mein rehta hai.
- **Single Source of Truth**: Data ki sirf ek master copy hoti hai.
- **Derived Values**: Totals aur counts ko calculate karein, alag state na banayein.
- **No Prop Mirroring**: Prop ko child ke \`useState\` mein copy na karein.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "Where should state be moved when two sibling components need to access and modify the same data?",
      "hi": "Jab do sibling components ko ek hi data access aur update karna ho toh state ko kahan move karna chahiye?"
    },
    "options": [
      {
        "en": "To window.sessionStorage",
        "hi": "sessionStorage mein"
      },
      {
        "en": "To their closest common ancestor (parent) component",
        "hi": "Unke sabse kareebi common parent component mein"
      },
      {
        "en": "Directly into the child component's DOM attribute",
        "hi": "DOM attribute mein"
      },
      {
        "en": "To an external CSS file",
        "hi": "CSS file mein"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Lifting state up to the closest common parent establishes a Single Source of Truth that can distribute data downwards via props.",
      "hi": "Closest common parent mein state rakhne se data ek jagah rehta hai aur dono siblings ko props ke zariye mil jata hai."
    }
  },
  {
    "q": {
      "en": "What is the primary risk of lifting state up all the way to the top-level App component?",
      "hi": "State ko poori tarah top-level App component tak lift karne ka sabse bada khatra kya hai?"
    },
    "options": [
      {
        "en": "It forces the application to convert to TypeScript",
        "hi": "TypeScript mein convert ho jata hai"
      },
      {
        "en": "High-frequency updates (like keystrokes) cause the entire application to re-render unnecessarily, degrading performance",
        "hi": "Keystroke jaise high-frequency updates poori app ko re-render karte hain jisse performance slow ho jaati hai"
      },
      {
        "en": "React will refuse to compile the JSX",
        "hi": "Compile nahi hoga"
      },
      {
        "en": "It disables browser cookies",
        "hi": "Cookies disable ho jaati hain"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Lifting state too high triggers cascading re-renders across the entire component tree, causing input lag and poor frame rates.",
      "hi": "State bohot upar hone se har chote change par poori website re-render hone lagti hai jisse lag aata hai."
    }
  },
  {
    "q": {
      "en": "Why is function Child({ count }) { const [val, setVal] = useState(count); } considered buggy in React?",
      "hi": "function Child({ count }) { const [val, setVal] = useState(count); } ko React mein buggy kyun mana jata hai?"
    },
    "options": [
      {
        "en": "useState cannot accept numeric initial values",
        "hi": "Numbers allow nahi hain"
      },
      {
        "en": "The local state is only initialized once on initial mount; subsequent changes to the count prop from the parent will be ignored",
        "hi": "Local state sirf pehle mount par banti hai; baad mein parent se count prop badalne par child update nahi hota"
      },
      {
        "en": "It violates strict mode in JavaScript",
        "hi": "Strict mode todta hai"
      },
      {
        "en": "It causes an infinite loop",
        "hi": "Infinite loop banata hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "useState ignores updates to its initial argument on re-renders. The child will be stuck with stale state, breaking synchronization with the parent.",
      "hi": "useState re-render hone par initial argument ko dobara evaluate nahi karta, isliye parent ka naya prop child mein nahi dikhta."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Lifting State Up & Component Composition in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Lifting State Up (Sharing State Between Siblings) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling lifting state up & component composition with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Lifting State Up (Sharing State Between Siblings) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Lifting State Up & Component Composition establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Lifting State Up (Sharing State Between Siblings) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Lifting State Up & Component Composition directly resolve?",
      "hi": "Lifting State Up (Sharing State Between Siblings) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Lifting State Up & Component Composition, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Lifting State Up (Sharing State Between Siblings) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Lifting State Up & Component Composition, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Lifting State Up (Sharing State Between Siblings) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Lifting State Up & Component Composition, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Lifting State Up (Sharing State Between Siblings) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Lifting State Up & Component Composition?",
      "hi": "Lifting State Up (Sharing State Between Siblings) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Lifting State Up & Component Composition be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Lifting State Up (Sharing State Between Siblings) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Lifting State Up & Component Composition impact application memory and CPU consumption?",
      "hi": "Lifting State Up (Sharing State Between Siblings) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Lifting State Up & Component Composition?",
      "hi": "Lifting State Up (Sharing State Between Siblings) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Lifting State Up & Component Composition?",
      "hi": "Lifting State Up (Sharing State Between Siblings) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Lifting State Up & Component Composition?",
      "hi": "Lifting State Up (Sharing State Between Siblings) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Lifting State Up & Component Composition, what must the test suite assert?",
      "hi": "Lifting State Up (Sharing State Between Siblings) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Lifting State Up & Component Composition?",
      "hi": "Modular design Lifting State Up (Sharing State Between Siblings) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Lifting State Up & Component Composition be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Lifting State Up (Sharing State Between Siblings) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Lifting State Up & Component Composition properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Lifting State Up (Sharing State Between Siblings) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Lifting State Up & Component Composition in production?",
      "hi": "Production mein Lifting State Up (Sharing State Between Siblings) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Lifting State Up & Component Composition?",
      "hi": "Lifting State Up (Sharing State Between Siblings) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Lifting State Up & Component Composition?",
      "hi": "Lifting State Up (Sharing State Between Siblings) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Lifting State Up & Component Composition?",
      "hi": "Lifting State Up (Sharing State Between Siblings) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
