const e={id:"react-perf-memo",title:{en:"React.memo, Code Splitting & Profiling",hi:"Performance Optimization: React.memo & React DevTools Profiler"},difficulty:"Advanced",readTime:12,sections:[{type:"concept",heading:{en:"1. The Default React Render Lifecycle & The Wasteful Re-render Problem",hi:"1. React Ka Default Render Behavior Aur Unnecessary Re-renders"},body:{en:`By default in React, **when a parent component re-renders, every single one of its child components re-renders as well**, cascading all the way down the subtree.

In standard scenarios, React's Virtual DOM reconciliation is extremely fast, and re-rendering small components takes less than a millisecond. However, performance bottlenecks emerge when:
1. **Large Lists or Tables**: A parent component updates (e.g., ticking a single checkbox or typing in a search bar), causing hundreds of table rows or complex cards to re-render needlessly.
2. **Heavy Calculations or Charts**: Child components contain heavy computations, complex SVG graph updates, or canvas animations.
3. **Dropped Frames (Jank)**: Frame rate drops below 60 FPS, making animations stutter and typing feel sluggish.

### What is React.memo?
\`React.memo\` is a **Higher-Order Component (HOC)** used to memoize functional components. It intercepts the re-render process and performs a **shallow equality check** on the component's incoming props (\`prevProps === nextProps\`):
- If the props have **not** changed reference or value, React skips re-rendering the component and reuses its previously rendered DOM output!
- If any prop has changed, React re-renders the component normally.

> **Important**: \`React.memo\` only prevents re-renders caused by **parent re-renders**. If the memoized component's own internal \`useState\` changes or a subscribed \`useContext\` updates, it will still re-render!`,hi:`React ka default rule bohot seedha hai: **Jab bhi koi Parent component re-render hota hai, uske andar ke saare Child components bhi automatically re-render hote hain**, chahe unke props badle hon ya na badle hon!

Choti apps mein isse koi farq nahi padta kyunki Virtual DOM diffing bohot fast hoti hai. Lekin badi apps mein dikkat tab aati hai jab:
1. Ek search input mein har letter type karne par neeche ke 500 product cards baar-baar re-render hote hain.
2. Data grid ya complex dashboard charts har second freeze hone lagte hain.

### React.memo Kya Hai?
\`React.memo\` ek Higher-Order Component (HOC) hai jo kisi component ko wrap karke uske props ka **shallow comparison** karta hai:
- Agar parent ke re-render hone par bhi child ke props bilkul pehle jaise hain, toh React child ko dobara render nahi karta aur purana DOM result reuse kar leta hai.
- Agar koi prop badal gaya hai, tabhi component dobara render hota hai.

> **Dhyan Dein**: \`React.memo\` sirf parent ke re-render ko rokta hai. Agar component ki apni \`useState\` badlegi ya koi Context update hoga, toh component tab bhi re-render hoga!`}},{type:"concept",heading:{en:"2. The Holy Trinity: React.memo + useCallback + useMemo",hi:"2. The Holy Trinity: React.memo + useCallback + useMemo"},body:{en:`Wrapping a component with \`React.memo\` alone is often **completely useless** if you pass function or object props incorrectly!

### Why Shallow Equality Fails on Objects & Functions
In JavaScript:
\`\`\`javascript
// Primitive comparison
5 === 5; // true
"Aman" === "Aman"; // true

// Object & Function referential comparison
{} === {}; // false! Different memory references
(() => {}) === (() => {}); // false! Newly allocated function in memory
\`\`\`

Every time the parent component re-renders:
1. Any inline object (\`config={{ theme: 'dark' }}\`) gets a **brand new memory address**.
2. Any inline arrow function (\`onClick={() => handleSelect(id)}\`) is **recreated with a new function reference**.
3. \`React.memo\` compares \`prevProps.onClick === nextProps.onClick\`, sees two different references, and **re-renders anyway**, completely defeating the optimization!

### The Solution:
- Wrap function props passed to children in \`useCallback\`.
- Wrap object/array props passed to children in \`useMemo\`.
- Wrap the child component itself in \`React.memo\`.
Together, they ensure referential stability so \`React.memo\`'s shallow comparison succeeds!`,hi:"Sirf `React.memo` lagana aksar bilkul bekar saabit hota hai agar aap child ko functions ya objects prop mein bhej rahe hon:\n\nJavaScript mein primitives (`5 === 5`) toh true hote hain, lekin har render par banne wale naye objects `{} === {}` aur functions `(() => {}) === (() => {})` ka memory reference alag hota hai!\n\nJab parent re-render hota hai:\n1. Har inline function aur object memory mein naye address par banta hai.\n2. `React.memo` shallow comparison karta hai, use reference badla hua lagta hai, aur wo **child ko dobara re-render kar deta hai**!\n\n### The Holy Trinity Solution:\n- Child component ko `React.memo` se wrap karein.\n- Child ko pass hone wale functions ko parent mein `useCallback` se wrap karein.\n- Child ko pass hone wale objects/arrays ko parent mein `useMemo` se wrap karein."}},{type:"analogy",heading:{en:"Real-Life Analogy: School Attendance Roll Call vs Raising Hand on Call",hi:"Real-Life Analogy: School Attendance Roll Call vs Sirf Zaroorat Par Khada Hona"},body:{en:`Imagine a classroom with 50 students:

- **Default React Re-render (Mass Attendance)**:
  Every morning, the class monitor asks: *"Is student #5 present?"* In a naive system, all 50 students stand up, say present, and sit down again. 49 students wasted their energy for no reason.
- **Optimized with React.memo**:
  Each student wears a desk number tag. The monitor only points to student #5. Only student #5 stands up and responds. The remaining 49 students sit quietly and focus on their studies.
- **The Broken Memo (Passing Inline Functions)**:
  Now imagine the teacher gives each student a fresh, newly printed slip of paper every second, even if the text on the paper is identical. The student has to stop, pick up the paper, inspect it, and respond: *"Wait, this is a new piece of paper, I have to stand up!"* (Referential inequality!).
  When you use \`useCallback\` and \`useMemo\`, the teacher keeps the original laminated card on the desk instead of handing out fresh paper every time.`,hi:`School ke classroom ka example dekhein:

- **Default React Render (Saare Bacche Khade Ho Gaye)**:
  Class teacher aate hain aur puchte hain *"Roll no 12 aaya hai kya?"* Aur poori class ke 50 bacche ek saath bench se khade ho jaate hain aur baith jaate hain! 49 baccho ki energy bekar kharch hui.
- **React.memo Se Optimization**:
  Har student ki bench par naam likha hai. Teacher sirf Roll no 12 ko bolti hain, aur sirf wahi khada hota hai. Baaki 49 bacche chupchaap apna padhai ka kaam karte rehte hain bina hile.
- **Inline Functions Ki Galati**:
  Socho teacher har 2 second mein sabhi baccho ke haath mein ek naya paper pakda de rahi hain, chahe paper par same cheez likhi ho. Baccha bolega: *"Naya paper mila hai, mujhe check karne ke liye khada hona padega!"* (Naya function reference!).
  \`useCallback\` aur \`useMemo\` usi purane laminated card ko desk par rakhte hain taaki baccha bina wajah khada na ho.`}},{type:"syntax",heading:{en:"Syntax & Profiling Tools: React.memo & React DevTools Profiler",hi:"Syntax Aur Profiling: React.memo Aur React DevTools Profiler"},body:{en:`### 1. Basic React.memo Syntax
\`\`\`jsx
import React from 'react';

// Wrap functional component
export const UserCard = React.memo(function UserCard({ name, email }) {
  console.log('Rendering UserCard for:', name);
  return (
    <div className="card">
      <h4>{name}</h4>
      <p>{email}</p>
    </div>
  );
});
\`\`\`

### 2. Custom arePropsEqual Comparator
By default, \`React.memo\` compares props using shallow equality (\`Object.is\`). You can provide a custom comparison function as the second argument:
\`\`\`javascript
function arePropsEqual(prevProps, nextProps) {
  // Return true if passing nextProps to render would return the same result as prevProps
  return prevProps.user.id === nextProps.user.id && 
         prevProps.user.lastActive === nextProps.user.lastActive;
}

export const MemoizedUserProfile = React.memo(UserProfile, arePropsEqual);
\`\`\`

### 3. Profiling with React DevTools
1. Install **React Developer Tools** extension in Chrome / Edge.
2. Open DevTools -> Switch to the **Profiler** tab.
3. Click the Gear icon (Settings) -> Check **"Record why each component rendered while profiling"**.
4. Click the Blue "Record" button -> Perform the slow action (e.g. typing or clicking) -> Click "Stop".
5. Inspect the **Flamegraph**: Yellow/orange bars represent components that took a long time to render. Hover over components to see exact render time and why they re-rendered.`,hi:`### React.memo Syntax:
Functional component ko \`React.memo()\` ke andar wrap kar dein.

### Custom Comparator:
Agar deep comparison karna ho toh second argument mein \`arePropsEqual(prevProps, nextProps)\` function pass karein jo \`true\` return kare agar props same hon.

### React DevTools Profiler:
1. Chrome DevTools mein **Profiler** tab kholein.
2. Settings mein **"Record why each component rendered"** tick karein.
3. Record button dabayein, action perform karein, aur stop karein. Flamegraph mein yellow bars slow components ko highlight karte hain.`}},{type:"example",heading:{en:"Example 1: Parent Counter with Regular vs Memoized Child",hi:"Example 1: Parent Counter Aur Regular vs Memoized Child Ka Comparison"},body:{en:`This side-by-side example demonstrates the exact console output difference between a standard child component and a memoized child when the parent component state updates.

\`\`\`jsx
// src/components/CounterComparison.jsx
import React, { useState } from 'react';

// Regular Child: Re-renders every time Parent updates!
function RegularChild({ label }) {
  console.log('%cRegularChild rendered! 🔴', 'color: red');
  return <div style={{ padding: '8px', background: '#ffebee' }}>Regular Child: {label}</div>;
}

// Memoized Child: Skips rendering because 'label' prop remains identical!
const MemoizedChild = React.memo(function MemoizedChild({ label }) {
  console.log('%cMemoizedChild rendered! 🟢', 'color: green');
  return <div style={{ padding: '8px', background: '#e8f5e9' }}>Memoized Child: {label}</div>;
});

export function ParentCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>Parent Count: {count}</h3>
      <button onClick={() => setCount((c) => c + 1)}>Increment Parent Count (+1)</button>

      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <RegularChild label="Static Header Text" />
        <MemoizedChild label="Static Header Text" />
      </div>
    </div>
  );
}
\`\`\``,hi:"Jab aap button click karke `count` badhate hain:\n- `ParentCounter` re-render hota hai.\n- Console mein `RegularChild rendered! 🔴` har click par print hota hai.\n- Jabki `MemoizedChild rendered! 🟢` sirf pehli baar print hota hai aur subsequent clicks par re-render completely skip ho jata hai kyunki uska `label` prop nahi badla!"}},{type:"example",heading:{en:"Example 2: Interactive Todo List with 500 Items & useCallback Handlers",hi:"Example 2: 500 Items Ki Todo List Aur useCallback Se Optimization"},body:{en:`In this example, without \`React.memo\` and \`useCallback\`, toggling a single todo checkbox causes all 500 rows to re-render. With memoization, ONLY the single toggled row re-renders!

\`\`\`jsx
// src/components/OptimizedTodoList.jsx
import React, { useState, useCallback } from 'react';

// Individual Row wrapped in React.memo
const TodoItem = React.memo(function TodoItem({ todo, onToggle, onDelete }) {
  console.log('Rendering row:', todo.id);

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: 'auto', color: 'red' }}>
        ✕
      </button>
    </li>
  );
});

export function OptimizedTodoList() {
  // Generate 500 initial tasks
  const [todos, setTodos] = useState(() =>
    Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      text: \`Task #\${i + 1} - Complete MERN architecture milestone\`,
      completed: false,
    }))
  );

  // useCallback prevents recreating new function instances on each render!
  const handleToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '16px' }}>
      <h3>High Performance Task List (500 items)</h3>
      <p style={{ color: '#666', fontSize: '13px' }}>
        Open DevTools console. Notice clicking one checkbox logs ONLY that 1 row!
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
\`\`\``,hi:"500 items ki list mein optimization ka jadu:\n- `handleToggle` aur `handleDelete` ko `useCallback` se memoize kiya gaya hai.\n- `TodoItem` ko `React.memo` se wrap kiya gaya hai.\n- Jab user kisi ek task ko tick karta hai, toh baaki ke 499 rows bilkul re-render nahi hote! Sirf wahi 1 row render hoti hai jiska status badla hai. App 60 FPS par buttery smooth chalti hai."}},{type:"example",heading:{en:"Example 3: Custom arePropsEqual Comparator for Complex Data Objects",hi:"Example 3: Custom arePropsEqual Comparator Se Deep Objects Ko Optimize Karna"},body:{en:`When props are complex objects with frequently changing timestamps or internal metadata that do not affect the visible UI, a custom comparator gives you granular control over when to re-render.

\`\`\`jsx
// src/components/StockTickerRow.jsx
import React from 'react';

function StockTickerRow({ stock, onBuy }) {
  console.log('Rendering stock:', stock.symbol);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
      <div>
        <strong>{stock.symbol}</strong> ({stock.companyName})
      </div>
      <div>
        <span style={{ color: stock.change >= 0 ? 'green' : 'red', marginRight: '12px' }}>
          ₹{stock.price.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.change}%)
        </span>
        <button onClick={() => onBuy(stock.symbol)}>Buy</button>
      </div>
    </div>
  );
}

// Custom comparator: Ignore background ping timestamps!
function areStockPropsEqual(prevProps, nextProps) {
  return (
    prevProps.stock.symbol === nextProps.stock.symbol &&
    prevProps.stock.price === nextProps.stock.price &&
    prevProps.stock.change === nextProps.stock.change &&
    prevProps.onBuy === nextProps.onBuy
  );
}

export const MemoizedStockRow = React.memo(StockTickerRow, areStockPropsEqual);
\`\`\``,hi:"Agar backend har 1 second mein naye metadata timestamps bhejta hai lekin share ka price aur change percentage same hai:\n- `areStockPropsEqual` function sirf `price` aur `change` compare karta hai.\n- Agar background timestamps badal bhi rahe hon, tab bhi screen par koi wasteful re-render nahi hota!"}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Common Mistakes Aur Unke Fixes"},body:{en:"### 1. Premature Optimization (Wrapping Every Single Component in React.memo)\n- **Mistake**: Wrapping simple components like `<span>` or 3-line buttons in `React.memo`.\n- **Why it hurts**: `React.memo` is not free! React must store previous props in memory and perform prop comparisons on every render cycle. For trivial components, running the shallow comparison is actually **slower** than just letting React re-render the lightweight Virtual DOM element!\n- **Fix**: Only memoize components that are expensive to render, appear in large lists, or have proven to be bottlenecks in the React Profiler.\n\n### 2. Passing Inline Arrow Functions or Object Literals to Memoized Components\n- **Mistake**: `<MemoizedCard onClick={() => doSomething()} style={{ margin: 10 }} />`.\n- **Why it fails**: Generates new object and function references on every parent render, completely breaking the shallow equality check.\n- **Fix**: Hoist static objects outside the component, use `useCallback` for event handlers, and use `useMemo` for dynamic objects.\n\n### 3. Assuming React.memo Prevents Internal State Updates\n- **Mistake**: Thinking wrapping a component in `React.memo` stops it from updating when its own internal state or consumed Context changes.\n- **Fix**: Remember that `React.memo` ONLY checks incoming props from the parent. Internal state and Context subscriptions will still trigger normal re-renders.",hi:`### 1. Har Chote Component Par React.memo Laga Dena (Premature Optimization)
- **Galti**: Simple 2-line buttons ya labels par bhi \`React.memo\` laga dena.
- **Nuksan**: Props compare karne mein bhi CPU time aur memory kharch hoti hai. Chote components ko compare karna unhe re-render karne se zyada costly ho sakta hai!
- **Fix**: Sirf heavy components ya lambi lists par hi memoization lagayein jahan Profiler mein actual lag dikh raha ho.

### 2. Memoized Component Ko Inline Function Ya Object Dena
- **Galti**: \`<MemoizedItem onClick={() => handleClick(id)} />\` likhna.
- **Nuksan**: Har render par naya function banne ki wajah se shallow comparison fail ho jata hai aur memoization ka koi fayda nahi hota.
- **Fix**: Hamesha \`useCallback\` use karein.

### 3. Samajhna Ki Memo Se State Update Bhi Ruk Jayegi
- **Fix**: \`React.memo\` sirf parent se aane wale props par guard lagata hai. Component ki apni \`useState\` badalne par wo hamesha render hoga.`}},{type:"tip",heading:{en:"Best Practices: Render Optimization Architecture",hi:"Best Practices: Clean Render Optimization Strategy"},body:{en:"1. **Push State Down (State Colocation)**: Before reaching for `React.memo`, move state as close as possible to the component that actually needs it. If an input text state lives only in the search bar, the parent dashboard won't re-render on every keystroke!\n2. **Lift Content Up via the `children` Prop**: Components passed via `{children}` are evaluated in the parent's parent scope. If the middle container re-renders due to its own state, `children` will NOT re-render because its element reference hasn't changed!\n3. **Use Windowing / Virtualization for Massive Lists**: For lists with 1,000+ items (like Flipkart search results or infinite feeds), use **TanStack Virtual** or `react-window` to render **only the 10-15 rows currently visible in the viewport**.\n4. **Always Measure with React Profiler First**: Never optimize based on guesswork. Record a session in React DevTools Profiler to identify the exact components causing dropped frames before writing memoization code.",hi:`1. **State Colocation (State Ko Pass Rakhein)**: State ko wahan rakhein jahan wo use hoti hai. Agar search input ki state parent dashboard mein hogi toh har letter par poora page hilega. Input ko alag component mein encapsulate karein.
2. **Children Prop Composition**: \`children\` prop ke zariye pass kiye gaye components parent ke re-render hone par bhi dobara render nahi hote kyunki unka element reference same rehta hai.
3. **Virtualization (react-window / TanStack Virtual)**: 1,000+ items ki list mein sirf wahi 10-15 items screen par render karein jo user ki screen par visible hain.
4. **Pehle Profile Karein**: Andaze se code optimize na karein. React DevTools Profiler se pehle lag ka exact reason khojein.`}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:"### Q1: How does React.memo determine whether to re-render a component?\n**Answer**: By default, `React.memo` performs a **shallow equality comparison** (`Object.is`) on each key of `prevProps` against `nextProps`.\n- For primitive props (strings, numbers, booleans), it compares their values.\n- For reference props (objects, arrays, functions), it compares their memory references.\nIf all props are shallowly equal, React reuses the previous rendered output and skips the component's render execution.\n\n### Q2: Why is React.memo not enabled on all components by default?\n**Answer**:\n1. **Comparison Overhead**: Comparing props has an inherent CPU cost. For lightweight components, the time spent comparing props is often greater than the time it takes React to simply run the component and diff the Virtual DOM.\n2. **False Assumptions**: In idiomatic React, developers frequently pass inline callbacks and object literals. If all components were memoized by default, those comparisons would almost always fail (returning `false`), adding pure overhead with zero performance savings.\n\n### Q3: What is the difference between useMemo and React.memo?\n**Answer**:\n- `React.memo` is a **Higher-Order Component** used to memoize an entire React component to prevent it from re-rendering if its props have not changed.\n- `useMemo` is a **React Hook** used inside a component to cache the calculated result of an expensive function call between renders.\n\n### Q4: How does Component Composition with `children` optimize re-renders without React.memo?\n**Answer**: In React, JSX elements like `<ExpensiveTree />` passed as `children` are created in the outer parent scope. When the wrapper component updates its own state, it re-renders itself, but the `children` prop remains the exact same JavaScript object reference from the outer scope, allowing React to skip re-rendering `children` automatically without any `React.memo` wrapper!",hi:`### Q1: React.memo kaise decide karta hai ki re-render karna hai ya nahi?
**Jawab**: \`React.memo\` previous props aur next props ka **shallow comparison** (\`Object.is\`) karta hai. Agar saare primitives ke values aur objects/functions ke memory references same hain, toh re-render skip ho jata hai.

### Q2: React sabhi components ko default memoize kyun nahi karta?
**Jawab**: Har render par props compare karne mein bhi time lagta hai. Chote components ko diff karna compare karne se zyada fast hota hai. Doosra, developers aksar inline functions pass karte hain jisse memoization fail ho jata hai aur bina kisi fayde ke extra overhead badhta hai.

### Q3: useMemo aur React.memo mein kya farq hai?
**Jawab**:
- \`React.memo\` ek **Higher-Order Component** hai jo poore component ke re-render ko rokta hai.
- \`useMemo\` ek **Hook** hai jo kisi specific function ki expensive calculation ko memoize karta hai.`}},{type:"summary",heading:{en:"Quick Summary: React Performance Optimization Cheatsheet",hi:"Quick Summary: React Performance Optimization Cheatsheet"},body:{en:"- **Default Cascade**: Parent re-renders cause all children to re-render by default.\n- **React.memo**: Higher-Order Component that skips re-rendering when props are shallowly equal.\n- **Referential Stability**: Always pair `React.memo` with `useCallback` (for functions) and `useMemo` (for objects/arrays).\n- **Custom Comparator**: Supply `arePropsEqual(prevProps, nextProps)` for custom deep or granular comparisons.\n- **State Colocation**: Push state down to child components to keep parent components static.\n- **React DevTools Profiler**: Measure render durations and inspect the Flamegraph before optimizing.\n- **Avoid Premature Optimization**: Do not wrap every small component in `React.memo` without profiling proof.",hi:"- **Default Behavior**: Parent ke update hone par saare children re-render hote hain.\n- **React.memo**: Props same hone par child re-render skip karne wala HOC.\n- **The Holy Trinity**: `React.memo` ke saath functions ke liye `useCallback` aur objects ke liye `useMemo` zaroor lagayein.\n- **Custom Comparator**: Custom logic ke liye `arePropsEqual` function provide karein.\n- **State Colocation**: State ko wahan shift karein jahan uski zaroorat ho taaki parent re-render na ho.\n- **Profiler First**: React DevTools Profiler se pehle slow components identify karein.\n- **Over-optimization Se Bachein**: Har chote button ya span par memoization na lagayein."}}],quiz:[{question:{en:"What type of comparison does React.memo perform on incoming props by default?",hi:"React.memo default roop se aane wale props par kaunsa comparison karta hai?"},options:[{en:"Deep recursive comparison",hi:"Deep recursive comparison"},{en:"Shallow equality comparison (Object.is)",hi:"Shallow equality comparison (Object.is)"},{en:"JSON stringify comparison",hi:"JSON stringify comparison"},{en:"Cryptographic hash comparison",hi:"Cryptographic hash comparison"}],correctAnswer:1,explanation:{en:"React.memo performs a shallow equality comparison (Object.is) between each key of prevProps and nextProps.",hi:"React.memo har prop key par shallow comparison (Object.is) perform karta hai."}},{question:{en:"Why does passing an inline arrow function (e.g. onClick={() => doSomething()}) often break React.memo?",hi:"Inline arrow function (jaise onClick={() => doSomething()}) pass karne se React.memo aksar kyun toot jata hai?"},options:[{en:"React does not support arrow functions in JSX",hi:"React JSX mein arrow functions support nahi karta"},{en:"A new function instance with a different memory reference is created on every parent render",hi:"Har parent render par alag memory reference ke saath naya function banta hai"},{en:"Arrow functions cannot access component props",hi:"Arrow functions component props access nahi kar sakte"},{en:"The browser deletes arrow functions after 1 second",hi:"Browser 1 second baad arrow functions delete kar deta hai"}],correctAnswer:1,explanation:{en:"In JavaScript, functions are objects compared by reference. Each re-render produces a new function in memory, causing React.memo's shallow check to see a changed prop and re-render.",hi:"JavaScript mein functions reference se compare hote hain. Har render par naya function reference banne ki wajah se shallow check fail ho jata hai."}},{question:{en:"What does the second argument of React.memo(Component, arePropsEqual) expect arePropsEqual to return if re-rendering SHOULD BE SKIPPED?",hi:"React.memo ke custom comparator function arePropsEqual ko re-render ROKNE ke liye kya return karna chahiye?"},options:[{en:"true",hi:"true"},{en:"false",hi:"false"},{en:"null",hi:"null"},{en:"undefined",hi:"undefined"}],correctAnswer:0,explanation:{en:"Unlike shouldComponentUpdate (which returns true to update), arePropsEqual returns true if props are equal and re-rendering should be skipped.",hi:"arePropsEqual tab true return karta hai jab props equal hon aur re-render skip karna ho."}},{question:{en:"Which technique is recommended for efficiently rendering lists with 5,000+ items?",hi:"5,000+ items ki list ko smoothly render karne ke liye kaunsi technique recommended hai?"},options:[{en:"Wrapping each row in 5 nested Providers",hi:"Har row ko 5 nested Providers mein wrap karna"},{en:"List Virtualization / Windowing (e.g., rendering only rows visible in viewport)",hi:"List Virtualization / Windowing (sirf screen par dikhne wali rows render karna)"},{en:"Disabling JavaScript in the browser",hi:"Browser mein JavaScript disable kar dena"},{en:"Converting all components into class components",hi:"Saare components ko class components mein convert karna"}],correctAnswer:1,explanation:{en:"List virtualization (e.g., TanStack Virtual or react-window) renders only the DOM nodes currently inside the user's viewport, keeping memory usage constant regardless of list size.",hi:"Virtualization se sirf screen par dikhne wale 10-15 elements render hote hain, chahe poori list mein 10,000 items kyun na hon."}},{question:{en:"What is the core architectural purpose of React.memo, Code Splitting & Profiling in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Performance Optimization: React.memo & React DevTools Profiler ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling react.memo, code splitting & profiling with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Performance Optimization: React.memo & React DevTools Profiler ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"React.memo, Code Splitting & Profiling establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Performance Optimization: React.memo & React DevTools Profiler clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does React.memo, Code Splitting & Profiling directly resolve?",hi:"Performance Optimization: React.memo & React DevTools Profiler kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without React.memo, Code Splitting & Profiling, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Performance Optimization: React.memo & React DevTools Profiler ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about React.memo, Code Splitting & Profiling, how is its mental model best conceptualized through real-world analogies?",hi:"Performance Optimization: React.memo & React DevTools Profiler ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing React.memo, Code Splitting & Profiling, what syntactic convention is essential to prevent runtime errors?",hi:"Performance Optimization: React.memo & React DevTools Profiler ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with React.memo, Code Splitting & Profiling?",hi:"Performance Optimization: React.memo & React DevTools Profiler ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should React.memo, Code Splitting & Profiling be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Performance Optimization: React.memo & React DevTools Profiler ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of React.memo, Code Splitting & Profiling impact application memory and CPU consumption?",hi:"Performance Optimization: React.memo & React DevTools Profiler ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within React.memo, Code Splitting & Profiling?",hi:"Performance Optimization: React.memo & React DevTools Profiler mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in React.memo, Code Splitting & Profiling?",hi:"Performance Optimization: React.memo & React DevTools Profiler mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in React.memo, Code Splitting & Profiling?",hi:"Performance Optimization: React.memo & React DevTools Profiler mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for React.memo, Code Splitting & Profiling, what must the test suite assert?",hi:"Performance Optimization: React.memo & React DevTools Profiler ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in React.memo, Code Splitting & Profiling?",hi:"Modular design Performance Optimization: React.memo & React DevTools Profiler mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should React.memo, Code Splitting & Profiling be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Performance Optimization: React.memo & React DevTools Profiler ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does React.memo, Code Splitting & Profiling properly belong and execute?",hi:"Full-stack MERN architecture mein Performance Optimization: React.memo & React DevTools Profiler kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with React.memo, Code Splitting & Profiling in production?",hi:"Production mein Performance Optimization: React.memo & React DevTools Profiler ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for React.memo, Code Splitting & Profiling?",hi:"Performance Optimization: React.memo & React DevTools Profiler ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in React.memo, Code Splitting & Profiling?",hi:"Performance Optimization: React.memo & React DevTools Profiler mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
