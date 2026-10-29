const e={id:"react-state-fundamentals",title:{en:"Component State & Triggering Re-renders",hi:"Component State & Re-render Lifecycle"},difficulty:"Beginner",readTime:11,sections:[{type:"concept",heading:{en:"1. What is Component State? (Props vs State)",hi:"1. State Kya Hai? Props Aur State Ka Asli Antar"},body:{en:`While **Props** are external inputs passed into a component from its parent (like arguments to a function), **State** is a component's **internal, private memory**.

A regular JavaScript variable inside a component function disappears when the function finishes executing. State, however, is preserved across renders by React!

### The Differences Between Props and State:
| Feature | Props | State |
| :--- | :--- | :--- |
| **Origin** | Passed from Parent component | Created and managed inside the component |
| **Mutability** | Strictly Read-Only (Immutable) | Mutable via state setter function |
| **Purpose** | Configure child component | Track interactive, changing data over time |
| **Re-render** | Changing props triggers child re-render | Changing state triggers component re-render |`,hi:`Jahan **Props** bahar se milne wale inputs hote hain (jaise function arguments), wahin **State** component ki **apni personal memory** hoti hai.

Normal JavaScript variables function khatam hote hi memory se gayab ho jaate hain. Lekin React State renders ke beech bhi data ko surakshit yaad rakhta hai!

### Props vs State Comparison Table:
| Khasiyat | Props | State |
| :--- | :--- | :--- |
| **Kahan se aata hai** | Parent component se pass hota hai | Component ke andar khud banta hai |
| **Badlaav** | Read-Only (immutable) | Setter function se badal sakte hain |
| **Kaam** | Child component ko data dena | User interaction aur changing data track karna |
| **Re-render** | Naye props aane par child re-render hota hai | State badalne par component re-render hota hai |`}},{type:"concept",heading:{en:"2. The Render Lifecycle & Automatic Batching in React 18",hi:"2. Render Lifecycle Aur React 18 Ka Automatic Batching"},body:{en:`Every time a state setter function is called, React schedules a re-render. Understanding the **Three Phases of the Render Cycle** is essential:

1. **Triggering a Render**: The initial mount or a state setter (\`setCount\`) is called.
2. **Rendering the Component**: React executes your component function to calculate what the new Virtual DOM should look like.
3. **Committing to the DOM**: React calculates the diff and updates the physical browser DOM nodes.

### Automatic Batching in React 18:
In older React versions, state updates inside \`setTimeout\`, promises, or native fetch callbacks were not batched, causing multiple unnecessary renders.
In **React 18**, **Automatic Batching** groups all state updates together into a single re-render, regardless of whether they occur inside event handlers, \`setTimeout\`, or async \`fetch\` promises!

\`\`\`javascript
// In React 18, both updates are batched into ONE single re-render!
setTimeout(() => {
  setCount(c => c + 1);
  setIsLoading(false);
  // Only 1 render happens here!
}, 1000);
\`\`\``,hi:"Jab bhi state setter function chalta hai, React ek re-render schedule karta hai. Render cycle ke **3 mukhya phases** hote hain:\n\n1. **Trigger**: Initial page load par ya jab koi state setter (`setCount`) call hota hai.\n2. **Render**: React aapke component function ko execute karke naya Virtual DOM banata hai.\n3. **Commit**: React purane aur naye VDOM ka farq nikal kar sirf badle hue elements ko Real DOM mein update karta hai.\n\n### React 18 Automatic Batching:\nPurane React mein `setTimeout` ya promises ke andar hone wale multiple `setState` alag-alag re-renders trigger karte the.\n**React 18** mein chahe state updates event handler mein hon, timer mein hon ya `fetch` ke andar hon, React un sabhi updates ko ek sath jod kar **sirf 1 single re-render** chalata hai!"}},{type:"analogy",heading:{en:"Real-Life Analogy: The Restaurant Printed Menu vs The Daily Specials Blackboard",hi:"Real-Life Analogy: Hotel Ka Printed Menu vs Daily Specials Ka Blackboard"},body:{en:`Imagine sitting at a traditional South Indian restaurant:

- **Props (The Laminated Printed Menu)**:
  - Masala Dosa: ₹120, Filter Coffee: ₹40.
  - Printed at the printing press, sealed in plastic. Every customer sitting at Table 4 gets the exact same menu. Customers cannot take a marker and rewrite the prices (**Props are external, immutable configuration**).
- **State (The Waiter's Order Notepad & The Kitchen Blackboard)**:
  - On the kitchen wall, there is a chalk blackboard: *"Today's Special: Mysore Pak (12 portions left)"*.
  - When customer #1 orders 2 portions, the waiter wipes the chalk and writes: *"10 portions left"*.
  - When the count reaches 0, the waiter crosses it off (**State changes dynamically**).
  - The blackboard's number only exists inside this restaurant (**Local component state**), and updating it triggers the waiter to announce it to new customers (**State update triggers re-render**) !`,hi:`South Indian Dosa restaurant se samjhein:

- **Props (Laminated Printed Menu Card)**:
  - Masala Dosa ₹120, Idli ₹60.
  - Har customer ko wahi same menu milta hai. Koi grahak pen se menu par price badal nahi sakta (**Props read-only hote hain**).
- **State (Kitchen Ka Chalk Blackboard)**:
  - Kitchen ke gate par blackboard laga hai: *"Special Halwa — Sirf 5 plate bachi hain"*.
  - Jaise hi 2 plate biki, waiter ne chalk se 5 mita kar 3 likh diya (**State update hua**).
  - 0 hote hi counter par out-of-stock ka board lag gaya (**UI re-render hua**).
  - Yeh count sirf us dukaan ke andar ka local data hai (**Component State**).`}},{type:"syntax",heading:{en:"Syntax: State Declaration & Immutability Rules",hi:"Syntax: useState Declaration Aur Immutability Ke Niyam"},body:{en:`### 1. Declaring State:
\`\`\`jsx
import { useState } from "react";

const [count, setCount] = useState(0); // [currentValue, setterFunction]
\`\`\`

### 2. Functional State Updates:
When new state depends on the previous state, **always pass an updater function**:
\`\`\`javascript
// ✅ Correct: Guarantees latest state value even during batching
setCount(prevCount => prevCount + 1);

// ❌ Risky when multiple updates occur in the same tick:
setCount(count + 1);
\`\`\`

### 3. Updating Objects (Spread Operator):
Never mutate an object directly! Copy the previous state and overwrite the target field:
\`\`\`javascript
const [user, setUser] = useState({ name: "Aman", role: "user" });

// ✅ Correct:
setUser(prev => ({ ...prev, role: "admin" }));

// ❌ FORBIDDEN:
user.role = "admin"; // React will not detect this change!
\`\`\``,hi:`### 1. State Banane Ka Syntax:
\`\`\`jsx
import { useState } from "react";

const [count, setCount] = useState(0);
\`\`\`

### 2. Functional State Updates (Updater Function):
Jab nayi state purani value par depend kare, toh hamesha function pass karein:
\`\`\`javascript
// ✅ Bilkul Sahi: Hamesha latest value milti hai
setCount(prev => prev + 1);

// ❌ Batching mein purani value lene ka khatra:
setCount(count + 1);
\`\`\`

### 3. Objects Ko Update Karne Ka Niyam (Spread Operator):
Object ko seedhe mutate na karein, purani properties ko copy karke naya object banayein:
\`\`\`javascript
setUser(prev => ({ ...prev, role: "admin" }));
\`\`\``}},{type:"example",heading:{en:"Example 1: Batching & The Functional Updater Pattern",hi:"Example 1: Multiple Updates Aur Functional Updater Pattern"},body:{en:"Demonstrating why `setCount(count + 1)` fails three consecutive times, and how `setCount(prev => prev + 1)` correctly increments by 3.",hi:"Ek sath 3 baar count badhane par functional updater (`prev => prev + 1`) kyun zaroori hota hai."},code:{language:"jsx",filename:"BatchingCounter.jsx",snippet:`import React, { useState } from "react";

export default function BatchingCounter() {
  const [count, setCount] = useState(0);

  // BUGGY: All three call setCount(0 + 1) because count is stale in this render tick!
  const handleBuggyTripleIncrement = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Result: count only becomes 1, NOT 3!
  };

  // CORRECT: Functional updater receives pending state from queue
  const handleCorrectTripleIncrement = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // Result: count correctly increments by 3!
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md space-y-4">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white">
        State Batching Demo
      </h2>
      <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
        {count}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleBuggyTripleIncrement}
          className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium text-xs transition"
        >
          Buggy +3 (Adds 1)
        </button>
        <button
          onClick={handleCorrectTripleIncrement}
          className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition"
        >
          Correct +3 (Adds 3)
        </button>
        <button
          onClick={() => setCount(0)}
          className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`}},{type:"example",heading:{en:"Example 2: Managing Complex State Objects Immutably",hi:"Example 2: Complex State Objects Ko Immutably Update Karna"},body:{en:"Updating multi-field form state using a single generic `handleInputChange` function with the spread operator.",hi:"Ek single generic function aur spread operator se poore form ke state object ko update karna."},code:{language:"jsx",filename:"UserProfileForm.jsx",snippet:`import React, { useState } from "react";

export default function UserProfileForm() {
  const [profile, setProfile] = useState({
    username: "aman_verma",
    email: "aman@example.com",
    city: "Bengaluru",
    notifications: true
  });

  // Generic handler updating nested keys by dynamic input name
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    setProfile(prev => ({
      ...prev, // Copy all existing properties
      [name]: finalValue // Overwrite only the changed key
    }));
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-md space-y-4">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
        Edit User Profile
      </h2>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="notif"
            name="notifications"
            checked={profile.notifications}
            onChange={handleChange}
            className="h-4 w-4 rounded text-indigo-600"
          />
          <label htmlFor="notif" className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Receive email notifications
          </label>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs text-slate-600 dark:text-slate-400">
        Live State: {JSON.stringify(profile)}
      </div>
    </div>
  );
}`}},{type:"example",heading:{en:"Example 3: Dynamic State Arrays (Add, Toggle, Delete Operations)",hi:"Example 3: Dynamic State Arrays (Item Add, Toggle Aur Delete Karna)"},body:{en:"Executing pure array modifications in state: appending with spread (`[...prev, item]`), toggling with `.map()`, and deleting with `.filter()`.",hi:"React state mein arrays ke sath safe operations: `[...prev]` se add karna, `.map()` se update karna, aur `.filter()` se delete karna."},code:{language:"jsx",filename:"ShoppingList.jsx",snippet:`import React, { useState } from "react";

export default function ShoppingList() {
  const [items, setItems] = useState([
    { id: 1, text: "Amul Butter", completed: false },
    { id: 2, text: "Basmati Rice 5kg", completed: true }
  ]);
  const [inputText, setInputText] = useState("");

  // 1. ADD: Creates new array using spread
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newItem = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false
    };

    setItems(prev => [...prev, newItem]);
    setInputText("");
  };

  // 2. TOGGLE: Returns new array using .map()
  const handleToggle = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // 3. DELETE: Returns new array using .filter()
  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md max-w-md space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Grocery Shopping List
      </h2>

      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          type="text"
          placeholder="Add grocery item..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-sm transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {items.map(item => (
          <li
            key={item.id}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
          >
            <button
              onClick={() => handleToggle(item.id)}
              className={\`text-sm font-medium text-left flex-1 \${
                item.completed
                  ? "line-through text-slate-400"
                  : "text-slate-800 dark:text-slate-200"
              }\`}
            >
              {item.completed ? "✓ " : "○ "}
              {item.text}
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-xs text-rose-500 hover:text-rose-700 font-bold px-2 py-1"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Aam Galatiyan Aur Unka Solution"},body:{en:"### 1. Expecting State to Update Synchronously on the Next Line\n- **Mistake**: Calling `setCount(count + 1); console.log(count);` and expecting `count` to reflect the new number immediately.\n- **Why**: State setters do not mutate variables in place; they schedule a re-render for the **next** cycle. In the current execution frame, `count` remains the exact same value.\n- **Fix**: If you need the new value immediately in that function, store it in a local constant: `const next = count + 1; setCount(next); doSomething(next);`.\n\n### 2. Direct Mutation of State Arrays (`.push()`, `.splice()`)\n- **Mistake**: Writing `items.push(newItem); setItems(items);`. The array reference (`items`) has not changed. React compares references (`prev === next`), detects no difference, and **skips re-rendering completely**!\n- **Fix**: Always return a new array reference: `setItems(prev => [...prev, newItem])`.\n\n### 3. Storing Redundant or Derived State\n- **Mistake**: Storing `firstName`, `lastName`, AND `fullName` in three separate state variables.\n- **Fix**: Calculate derived values on the fly during render: `const fullName = `${firstName} ${lastName}`;`.",hi:"### 1. Agli Hi Line Par Nayi State Ki Ummeed Karna\n- **Galati**: `setCount(count + 1); console.log(count);` likhna aur sochna ki console mein badhi hui value aayegi.\n- **Wajah**: State setter agle render ke liye update schedule karta hai. Current render tick mein `count` purana hi rehta hai.\n- **Solution**: Nayi value ko local variable mein rakhein: `const nextCount = count + 1; setCount(nextCount);`.\n\n### 2. State Array Par `.push()` Chalana\n- **Galati**: `todos.push(newTodo); setTodos(todos);` likhna. Isse array ka memory reference wahi rehta hai, aur React sochta hai ki kuch badla hi nahi, isliye **screen re-render hi nahi hoti**!\n- **Solution**: Hamesha naya array banayein: `setTodos(prev => [...prev, newTodo])`.\n\n### 3. Faltu Ya Derived State Banana\n- **Galati**: `firstName`, `lastName` ke sath alag se `fullName` bhi state mein rakhna.\n- **Solution**: Jo data calculate ho sakta hai use state mein mat rakhein, seedhe render time par calculate karein."}},{type:"tip",heading:{en:"Best Practices: State Management Hygiene",hi:"State Management Ke Best Practices"},body:{en:"1. **Keep State as Local as Possible**: Don't lift state up or put it into global context until sibling components genuinely need to share it.\n2. **Always Use Functional Updaters for Counters and Lists**: When new state depends on old state, write `set(prev => ...)` to protect against stale closures and batching delays.\n3. **Never Mutate: Always Copy**: Use `[...arr]` to copy arrays, `{...obj}` to copy objects, `.filter()` to delete, and `.map()` to modify items.\n4. **Don't Put Derived Values into State**: If a value can be computed from existing props or state (like filtered products or total price), calculate it in a local constant rather than creating another `useState`.",hi:"1. **State Ko Local Rakhein**: Jab tak doosre components ko data na chahiye ho, state ko component ke andar hi rakhein.\n2. **Functional Updaters Ka Use Karein**: Jab nayi state purani par depend kare, toh `set(prev => ...)` ka use karein taaki stale state bugs na aayein.\n3. **Mutate Kabhi Na Karein, Copy Banayein**: Arrays ke liye `[...arr]`, objects ke liye `{...obj}`, delete ke liye `.filter()`, aur update ke liye `.map()` use karein.\n4. **Derived Values Ko State Mein Na Dalein**: Agar koi value calculate ho sakti hai (jaise cart total ya filtered items), toh use state banane ke bajaye variable mein calculate karein."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Top Interview Sawaal Aur Jawab"},body:{en:"### Q1: Why is state update asynchronous in React, and what is Automatic Batching?\n**Answer**:\nState updates are asynchronous because React waits to see if multiple state changes are triggered within the same browser tick before initiating an expensive Virtual DOM re-render. In React 18, **Automatic Batching** groups all state updates (even those occurring inside `setTimeout`, promises, or native event listeners) into a single re-render, optimizing frame rates and avoiding UI jitter.\n\n### Q2: Why does items.push(newItem); setItems(items); fail to trigger a re-render?\n**Answer**:\nReact checks if a component should re-render by comparing the previous state reference with the new state reference using Object.is (`prev === next`). Because `.push()` mutates the array in place without changing its memory reference, React evaluates `items === items` as true and skips rendering entirely.\n\n### Q3: When should you use a functional state update (setCount(prev => prev + 1))?\n**Answer**:\nWhenever the next state depends on the previous state. Because React batches state updates and state variables are snapshot closures of the current render, multiple consecutive updates like `setCount(count + 1)` in the same tick will all reference the old count value. The functional updater guarantees access to the queued pending state.",hi:"### Q1: React mein state updates asynchronous kyun hote hain aur Automatic Batching kya hai?\n**Jawab**:\nPerformance fast rakhne ke liye React multiple state updates ko ikattha karta hai taaki baar-baar Real DOM re-render na karna pade. React 18 mein **Automatic Batching** ke tehat promises aur `setTimeout` ke andar hone wale saare updates ko jodkar sirf 1 single re-render chalaya jata hai.\n\n### Q2: `arr.push()` karne ke baad `setArr(arr)` chalane se component re-render kyun nahi hota?\n**Jawab**:\nReact purane aur naye state ka memory address (reference) compare karta hai (`prev === next`). `.push()` karne se array ka reference nahi badalta, isliye React samajhta hai ki data same hai aur re-render skip kar deta hai.\n\n### Q3: Functional state update (`prev => prev + 1`) kab use karna chahiye?\n**Jawab**:\nJab bhi nayi state purani value par nirbhar kare. Batching ke dauran closure variable purana reh sakta hai, functional updater hamesha queue mein pending latest state provide karta hai."}},{type:"summary",heading:{en:"Quick Summary: Component State",hi:"Quick Summary: Component State"},body:{en:"- **State is Local Memory**: Persists across renders and triggers UI re-renders on change.\n- **Three Render Phases**: Trigger -> Render (Virtual DOM diff) -> Commit (Real DOM update).\n- **React 18 Automatic Batching**: Groups multiple state updates into a single re-render.\n- **Functional Updaters**: Use `set(prev => prev + 1)` whenever next state depends on previous state.\n- **Strict Immutability**: Always use `...` spread, `.map()`, and `.filter()` instead of direct mutations.",hi:"- **State Local Memory Hai**: Renders ke dauran data yaad rakhta hai aur badalne par re-render karta hai.\n- **3 Phases**: Trigger -> Render (VDOM) -> Commit (Real DOM).\n- **Automatic Batching**: Multiple updates ko 1 single re-render mein merge karta hai.\n- **Functional Updater**: Purani value par depend hone par `prev => ...` use karein.\n- **Immutability Niyam**: Arrays aur objects ki nayi copy banayein (`...`, `.map()`, `.filter()`)."}}],quiz:[{q:{en:"What happens if you call setCount(count + 1) three consecutive times inside a single button click handler without a functional updater?",hi:"Agar aap ek button click par bina functional updater ke teen baar setCount(count + 1) chalayein toh count kitna badhega?"},options:[{en:"It increments by 3",hi:"3 se badhega"},{en:"It increments by only 1, because all 3 calls close over the same stale count value",hi:"Sirf 1 se badhega kyunki teeno calls purana count value lete hain"},{en:"It throws a maximum update depth exceeded error",hi:"Error throw karega"},{en:"The component unmounts",hi:"Component unmount ho jata hai"}],answerIndex:1,explanation:{en:"Inside the current render tick, count is a constant snapshot. Each call evaluates to setCount(0 + 1), resulting in a net increment of only 1.",hi:"Current render mein count constant hota hai, isliye teeno calls setCount(0 + 1) evaluate karti hain aur count sirf 1 badhta hai."}},{q:{en:"Why does React skip re-rendering if you update state using todos.push(newTodo); setTodos(todos)?",hi:"todos.push(newTodo); setTodos(todos) chalane par React re-render kyun nahi karta?"},options:[{en:"todos is reserved keyword in React",hi:"todos reserved keyword hai"},{en:"The memory reference of the array did not change, so React's shallow comparison (prev === next) detects no change",hi:"Array ka memory reference nahi badla, isliye React shallow comparison se samajhta hai ki data badla hi nahi"},{en:"push() only works on server components",hi:"push sirf server par chalta hai"},{en:"setTodos is synchronous",hi:"setTodos synchronous hota hai"}],answerIndex:1,explanation:{en:"React performs an Object.is reference equality check. Because the mutated array has the exact same reference, React concludes no render is needed.",hi:"React reference equality check karta hai. Reference same rehne par React samajhta hai koi change nahi hua aur render skip kar deta hai."}},{q:{en:"What is Automatic Batching in React 18?",hi:"React 18 mein Automatic Batching ka kya matlab hai?"},options:[{en:"It compresses all images in the project into WebP format",hi:"Images ko compress karta hai"},{en:"It groups multiple state updates (even in async timeouts and promises) into a single re-render pass",hi:"Multiple state updates (timeouts aur promises ke andar bhi) ko jodkar ek hi re-render chalata hai"},{en:"It automatically saves form data to a SQL database",hi:"SQL database mein save karta hai"},{en:"It batches network requests to Google Analytics",hi:"Analytics requests batch karta hai"}],answerIndex:1,explanation:{en:"Automatic Batching in React 18 groups all state updates across event handlers, timers, and promises into a single unified re-render to maximize performance.",hi:"React 18 sabhi state updates ko ek sath jod kar sirf ek baar component re-render karta hai jisse performance behtar hoti hai."}},{question:{en:"What is the core architectural purpose of Component State & Triggering Re-renders in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Component State & Re-render Lifecycle ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling component state & triggering re-renders with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Component State & Re-render Lifecycle ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Component State & Triggering Re-renders establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Component State & Re-render Lifecycle clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Component State & Triggering Re-renders directly resolve?",hi:"Component State & Re-render Lifecycle kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Component State & Triggering Re-renders, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Component State & Re-render Lifecycle ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Component State & Triggering Re-renders, how is its mental model best conceptualized through real-world analogies?",hi:"Component State & Re-render Lifecycle ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Component State & Triggering Re-renders, what syntactic convention is essential to prevent runtime errors?",hi:"Component State & Re-render Lifecycle ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Component State & Triggering Re-renders?",hi:"Component State & Re-render Lifecycle ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Component State & Triggering Re-renders be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Component State & Re-render Lifecycle ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Component State & Triggering Re-renders impact application memory and CPU consumption?",hi:"Component State & Re-render Lifecycle ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Component State & Triggering Re-renders?",hi:"Component State & Re-render Lifecycle mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Component State & Triggering Re-renders?",hi:"Component State & Re-render Lifecycle mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Component State & Triggering Re-renders?",hi:"Component State & Re-render Lifecycle mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Component State & Triggering Re-renders, what must the test suite assert?",hi:"Component State & Re-render Lifecycle ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Component State & Triggering Re-renders?",hi:"Modular design Component State & Re-render Lifecycle mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Component State & Triggering Re-renders be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Component State & Re-render Lifecycle ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Component State & Triggering Re-renders properly belong and execute?",hi:"Full-stack MERN architecture mein Component State & Re-render Lifecycle kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Component State & Triggering Re-renders in production?",hi:"Production mein Component State & Re-render Lifecycle ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Component State & Triggering Re-renders?",hi:"Component State & Re-render Lifecycle ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Component State & Triggering Re-renders?",hi:"Component State & Re-render Lifecycle mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}},{question:{en:"Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Component State & Triggering Re-renders?",hi:"Component State & Re-render Lifecycle mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"},options:[{en:"To prevent memory leaks where unreachable or orphaned objects remain retained in heap memory, causing gradual performance degradation and crashes",hi:"Memory leaks rokne ke liye taaki unneeded objects RAM mein jama na hon aur server crash na ho"},{en:"To delete the client's local disk partition",hi:"Client ka local disk partition delete karne ke liye"},{en:"Because JavaScript engines allow only 5 variables in RAM",hi:"JS engine sirf 5 variables allow karta hai"},{en:"Cleanup is unnecessary because garbage collection handles 100% of event listeners automatically",hi:"Cleanup ki zaroorat nahi hoti"}],correctAnswer:0,explanation:{en:"Unclosed connections and dangling event listeners create references that prevent garbage collection, leading to severe memory leaks over time.",hi:"Dangling listeners aur unclosed connections memory leaks banate hain jo V8 heap ko exhaust karke process crash kar dete hain."}}]};export{e as default};
