export default {
  id: "int-react-questions",
  title: {
    en: "Top 25 React.js Interview Questions & Model Answers",
    hi: "Top 25 React Interview Questions & Model Answers",
  },
  difficulty: "Intermediate",
  readTime: 15,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The React Interview Mental Model: What Senior Interviewers Evaluate",
        hi: "1. React Interview Ka Mental Model: Senior Interviewers Kya Dekhte Hain",
      },
      body: {
        en: `When tech leads and senior engineering managers interview candidates for React roles, they are **not** testing whether you memorized the syntax of \`useState\`. They are evaluating your **mental model of the React runtime engine**:

### What Interviewers Really Test:
1. **The Render Lifecycle**: Do you understand the difference between *rendering* (calling component functions and producing JSX Virtual DOM trees) and *committing* (manipulating real browser DOM nodes)?
2. **Reconciliation & Diffing**: How does React's heuristic $O(N)$ reconciliation algorithm use element types and \`key\` props to determine what changed?
3. **Closures & Hooks Internals**: Can you spot stale closures in \`useEffect\`, \`useCallback\`, and event listeners before they cause production bugs?
4. **State Management Boundaries**: Do you know when to use local state, when to use Context, when to use server-state managers (TanStack Query), and when to use client stores (Zustand/Redux)?
5. **Performance Optimization Trade-Offs**: Do you recognize that blindly wrapping every component in \`useMemo\` and \`useCallback\` can actually **hurt** performance due to memory overhead and dependency array comparisons?`,
        hi: `Jab tech leads aur managers React interview lete hain, toh wo ye nahi dekhte ki aapko \`useState\` ka syntax yaad hai ya nahi. Wo ye dekhte hain ki aapko React ke andar ka engine kitna gehraai se samajh aata hai:

### Interviewers Ke 5 Mukhya Checkpoints:
1. **Render vs Commit**: Kya aapko pata hai ki component function execute hona (*Render*) aur browser DOM par HTML badalna (*Commit*) do alag baatein hain?
2. **Virtual DOM Diffing**: React ka reconciliation engine kaise \`key\` prop use karke changes detect karta hai?
3. **Closures Aur Hooks**: Kya aap \`useEffect\` aur callbacks mein aane wale **Stale Closure bugs** ko pakad sakte hain?
4. **State Boundaries**: Server data ke liye TanStack Query aur local UI ke liye \`useState\` ka sahi batwara kaise karein?
5. **Optimization Ka Asli Sach**: Bina zaroorat ke har jagah \`useMemo\` lagane se performance badhne ke badle kaise ghat jaati hai?`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The 4 Categories of React Interview Questions",
        hi: "2. React Interview Questions Ki 4 Mukhya Categories",
      },
      body: {
        en: `React interview questions at tier-1 tech companies generally fall into four core architectural buckets:

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                     THE 4 REACT INTERVIEW PILLARS                      │
│                                                                        │
│  1. CORE INTERNALS & VIRTUAL DOM                                       │
│     - Virtual DOM vs Real DOM, Reconciliation, Fiber Architecture      │
│     - React 18 Concurrent Features (Automatic Batching, Transitions)   │
│                                                                        │
│  2. HOOKS LIFECYCLE & CLOSURES                                         │
│     - useEffect vs useLayoutEffect, Dependency Array Rules             │
│     - Stale closures, useRef for mutable values without re-renders     │
│                                                                        │
│  3. STATE ARCHITECTURE & DATA FLOW                                     │
│     - Lifting state up, Context API re-render mitigation               │
│     - Controlled vs Uncontrolled forms, Server State vs Client State   │
│                                                                        │
│  4. PERFORMANCE OPTIMIZATION & PATTERNS                                │
│     - React.memo, useMemo, useCallback trade-offs                      │
│     - Code splitting (React.lazy + Suspense), List Virtualization      │
└────────────────────────────────────────────────────────────────────────┘
\`\`\``,
        hi: `Top tech companies mein React ke sawal in 4 categories mein aate hain:

1. **React Internals**: Virtual DOM, Fiber engine, React 18 automatic batching, aur reconciliation.
2. **Hooks & Closures**: \`useEffect\` vs \`useLayoutEffect\`, stale closures, aur \`useRef\`.
3. **State Architecture**: Context API re-render issues, controlled inputs, aur data flow.
4. **Performance**: \`React.memo\`, code-splitting, aur lazy loading.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Architect Renovating an Indian Heritage Haveli",
        hi: "Real-Life Analogy: Haveli Ka Renovation (Virtual DOM Ka Diffing Engine)",
      },
      body: {
        en: `Imagine an architect renovating an antique 100-year-old royal Haveli in Jaipur:

- **The Real DOM Way (The Inefficient Contractor)**:
  Every time a guest requests a single new brass lamp in Room 14, the contractor brings in bulldozers, knocks down the entire 3-story haveli, buys 50,000 fresh bricks, rebuilds the entire mansion from scratch, and installs the lamp!
  This is what direct browser DOM manipulation does: destroying and recreating real DOM trees triggers layout thrashing and freezes the UI.
- **The React Virtual DOM & Reconciliation Way (The Smart Blueprints)**:
  The master architect keeps a 3D digital CAD model of the Haveli on his iPad (**The Virtual DOM in RAM**).
  When the guest requests a lamp, the architect updates the 3D digital model in milliseconds.
  His computer runs a diffing algorithm comparing the old blueprint with the new blueprint (**Reconciliation**).
  The algorithm concludes: *"Everything is 100% identical except for two screws on the wall in Room 14."*
  The architect sends a carpenter with two screws and a screwdriver to Room 14. The real haveli is touched only where strictly necessary (**The Commit Phase**). Fast, efficient, and zero disruption!`,
        hi: `Jaipur ki 100 saal purani royal haveli ke renovation ka example dekhein:

- **Direct Real DOM (Bewakoof Thekedaar)**:
  Room number 14 mein ek chota sa bulb lagana tha. Thekedaar ne poori 3-manzil ki haveli tod di, nayi cement-eentein mangwayi aur poori haveli dobara banayi sirf ek bulb lagane ke liye!
  (Direct DOM manipulation se browser freeze ho jata hai kyunki har chote change par poora layout dobara banta hai).
- **React Virtual DOM (Smart Architect Ka 3D Model)**:
  Smart architect ke computer mein haveli ka ek digital 3D model hota hai (**Virtual DOM in RAM**).
  Bulb lagane ki request aane par wo pehle computer ke model mein bulb lagata hai aur purane model se compare karta hai (**Diffing / Reconciliation**).
  Computer batata hai: *"Poori haveli same hai, sirf room 14 ki deewar par 2 screw lagane hain."*
  Architect ek mistri bhej kar sirf wahi 2 screw lagwa deta hai (**The Commit Phase**). Zero tod-phod aur 100% instant kaam!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "React 18 Automatic Batching & Concurrent Primitives",
        hi: "React 18 Automatic Batching Aur Concurrent Features Ka Syntax",
      },
      body: {
        en: `### 1. Automatic Batching in React 18:
Prior to React 18, state updates inside \`setTimeout\`, \`Promise.then\`, or native event listeners triggered **separate re-renders** for each state setter.
In React 18, **all state updates are automatically batched into a single unified render**, regardless of where they are called:

\`\`\`javascript
// In React 18, both setters trigger ONLY 1 SINGLE re-render!
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // React 18 batches these together into 1 render!
}, 1000);
\`\`\`

### 2. Transition Primitives (\`useTransition\`):
Used to mark non-urgent state updates so typing in an input field remains responsive while filtering large datasets:

\`\`\`jsx
import { useState, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // 1. Urgent update: Update input immediately
    setQuery(e.target.value);

    // 2. Non-urgent update: Can be interrupted if user types another letter!
    startTransition(() => {
      setFilteredList(performHeavyFilter(e.target.value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <p>Filtering...</p>}
      <ResultsList list={filteredList} />
    </div>
  );
}
\`\`\``,
        hi: `### 1. React 18 Automatic Batching:
React 17 mein \`setTimeout\` ya \`fetch()\` ke andar 2 state updates hone par component 2 baar render hota tha.
React 18 mein chahe updates kahin bhi hon, React dono ko mila kar **sirf 1 baar re-render** karta hai!

### 2. \`useTransition\` Hook:
Heavy data filter karte waqt input typing ko lag-free rakhne ke liye:
- Input ka text badalna **Urgent** update hai (turant hona chahiye).
- 10,000 items ki list filter karna **Non-Urgent (Transition)** update hai jo background mein ho sakti hai.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: The Classic Stale Closure Bug in useEffect & Its Fix",
        hi: "Example 1: useEffect Mein Aane Wala Stale Closure Bug Aur Solution",
      },
      body: {
        en: `One of the most frequently asked React interview coding questions:

\`\`\`jsx
// ❌ BROKEN COMPONENT: Stale Closure Trap
function BrokenCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // BUG: Because count is 0 when effect mounted,
      // this closure captures count = 0 forever!
      setCount(count + 1); // 0 + 1 = 1 on every single tick!
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array captures initial scope

  return <h1>Count: {count}</h1>; // Displays 1 forever!
}
\`\`\`

### The 2 Correct Solutions:
1. **Functional State Updates (Best Approach)**:
\`\`\`javascript
setCount((prevCount) => prevCount + 1); // Receives fresh state directly from React engine
\`\`\`
2. **Mutable Ref**:
\`\`\`javascript
const countRef = useRef(count);
countRef.current = count;
// Inside setInterval: setCount(countRef.current + 1);
\`\`\``,
        hi: `Interview mein sabse zyada pucha jane wala bug:

\`\`\`jsx
// ❌ BUG WALA CODE: Stale Closure
function BrokenCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1); // Har second 0 + 1 = 1 hi rehta hai!
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <h1>Count: {count}</h1>;
}
\`\`\`

### Sahi Solution:
Functional state update use karein jo React ke internal engine se hamesha taja value leta hai:
\`\`\`javascript
setCount((prev) => prev + 1);
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Splitting Context to Eliminate Unnecessary Child Re-renders",
        hi: "Example 2: Context API Re-renders Rokne Ke Liye Context Ko Split Karna",
      },
      body: {
        en: `A major critique of the Context API is that whenever any value inside the Provider changes, **every single component that calls \`useContext\` re-renders**, even if it only needs the dispatch function!

### The Solution: Split State and Dispatch Contexts
\`\`\`jsx
// context/TodoContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// Custom hooks to consume independently
export const useTodoState = () => useContext(TodoStateContext);
export const useTodoDispatch = () => useContext(TodoDispatchContext);

// Now, a button that only dispatches actions uses \`useTodoDispatch()\`
// and NEVER re-renders when the todo list changes!
\`\`\``,
        hi: `Context API mein problem hoti hai ki jab state badalti hai, toh sirf button render karne wale components bhi bina wajah re-render hote hain!

### Solution: State Aur Dispatch Ko Alag Context Banana:
\`\`\`jsx
const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}
// Button sirf useTodoDispatch() lega aur todo change hone par re-render nahi hoga!
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Production Custom Hook: useDebounce with Cleanup",
        hi: "Example 3: Production Custom Hook: useDebounce Implementation",
      },
      body: {
        en: `Live coding challenge: Implement a reusable \`useDebounce\` hook that delays updating a value until a specified timeout has elapsed without changes:

\`\`\`javascript
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 1. Set timer to update debounced value after delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 2. Clear timer if value changes before delay expires
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage in Component:
// const [search, setSearch] = useState('');
// const debouncedSearch = useDebounce(search, 300);
// useEffect(() => { fetchSearchResults(debouncedSearch); }, [debouncedSearch]);
\`\`\``,
        hi: `Interview coding round mein aksar \`useDebounce\` hook banane ko kaha jata hai:

\`\`\`javascript
// hooks/useDebounce.js
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Naya character aane par purana timer cancel
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
\`\`\``,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common React Interview Mistakes and Traps",
        hi: "React Interviews Mein Hone Wali Aam Galtiyan",
      },
      body: {
        en: `### 1. Saying "Virtual DOM is faster than the Real DOM"
- **Why this is wrong**: The Virtual DOM is **not** faster than the real DOM. Creating and diffing thousands of JavaScript VDOM objects takes CPU time. Svelte and solid.js don't use a Virtual DOM and are faster!
- **The Senior Answer**: *"The Virtual DOM is not about raw speed; it is about declarative developer ergonomics and predictable update batching. It allows developers to write declarative UI without manually managing imperatively targeted DOM mutations, while providing performance that is fast enough for 99% of use cases."*

### 2. Using Array Index as the \`key\` Prop
- **Why it breaks**: If an item is inserted or deleted from the beginning of the list, every item's array index shifts. React matches elements by key and mutates the wrong DOM nodes, causing input values and focus states to leak across items!
- **Fix**: Always use stable, unique IDs (like database \`_id\`).

### 3. Claiming \`useMemo\` and \`useCallback\` Should Be Used Everywhere
- **Why it hurts**: Memoization requires allocating closure memory and executing dependency comparisons on every single render. For cheap operations (like adding two numbers), the overhead of \`useMemo\` exceeds the cost of re-computing!`,
        hi: `### 1. Ye Kehna Ki "Virtual DOM Real DOM Se Fast Hai"
- **Kyun Galat Hai**: Virtual DOM real DOM se fast nahi hota! Virtual objects banana aur diff karna extra CPU time leta hai. Svelte bina Virtual DOM ke zyada fast chalta hai.
- **Senior Answer**: *"Virtual DOM speed ke liye nahi, balki Declarative UI aur predictable updates ke liye banaya gaya hai taaki developers ko manually DOM ke sath mattha na marna pade."*

### 2. List Mein Array Index Ko \`key\` Banana
- **Kyun Galat Hai**: List ke beech mein se koi item delete hone par saare indexes badal jaate hain aur React galat DOM elements ko update kar deta hai.
- **Solution**: Hamesha unique database \`_id\` ko key banayein.

### 3. Har Jagah \`useMemo\` Laga Dena
- **Kyun Galat Hai**: Memoization memory leta hai aur dependency compare karne mein CPU kharch hota hai. Chote functions par ise lagane se ulta performance gir jaati hai.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Production Best Practices for Senior Engineers",
        hi: "Senior Engineers Ke Liye Production Best Practices",
      },
      body: {
        en: `1. **Separate Server State from Client UI State**:
   Never store server data (products, users) in Redux or global Context! Use **TanStack Query (React Query)** or SWR. They handle caching, background refetching, deduping, and stale-while-revalidate automatically.
2. **Co-locate State Close to Where It Is Used**:
   Don't lift state up to the root App component unless multiple distant subtrees genuinely need it. Keeping state local minimizes the re-rendering blast radius.
3. **Use Error Boundaries Around Dynamic Sections**:
   Wrap independent UI widgets (like comments, charts, or payment forms) in React Error Boundaries so a crash in one widget does not blank out the entire website.
4. **Leverage CSS Variables for Themes**:
   Instead of re-rendering the entire React tree via ThemeContext on dark mode toggle, toggle a single \`.dark\` class on \`document.documentElement\` using CSS variables.`,
        hi: `1. **Server State Ke Liye TanStack Query Use Karein**:
   Database se aane wale data ko Redux mein daal kar complicated mat banayein; React Query use karein jo automatic caching aur background refresh karta hai.
2. **State Ko Local Rakhein**:
   State ko faaltu mein root level par mat le jayein; use component ke paas rakhein taaki poori app bina wajah re-render na ho.
3. **Error Boundaries Lagayein**:
   Widgets par Error Boundaries lagayein taaki ek widget crash hone par poori screen blank na ho.
4. **CSS Variables Se Theme Badlein**:
   Dark mode ke liye poore React tree ko re-render karne ke badle CSS \`.dark\` class toggle karein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top 25 React Interview Questions & Model Answers",
        hi: "Top 25 React Interview Questions Aur Model Jawab",
      },
      body: {
        en: `### Q1: What is the difference between Virtual DOM and Real DOM?
**Answer**:
The Real DOM is the browser's physical tree of C++ nodes representing HTML elements. Mutating it triggers synchronous browser reflow and repaint passes.
The Virtual DOM is a lightweight JavaScript representation of the UI tree kept in memory. When state updates, React creates a new Virtual DOM tree, diffs it with the previous one, and batches only the minimal required updates to the Real DOM during the commit phase.

---

### Q2: What is React Fiber and what problem did it solve?
**Answer**:
React Fiber is the complete rewrite of React's reconciliation engine introduced in React 16. The legacy stack reconciler executed reconciliation synchronously and recursively; once started, it could not be paused, causing dropped frames on animations.
Fiber broke reconciliation into small units of work called "fibers" (linked list nodes). This enabled **Concurrent React**: the ability to pause, prioritize, interrupt, and resume rendering work to keep the main thread responsive.

---

### Q3: What is the difference between \`useEffect\` and \`useLayoutEffect\`?
**Answer**:
- **\`useEffect\`**: Runs **asynchronously after** the browser paints the screen. It does not block the user interface and is suitable for 95% of side effects (data fetching, subscriptions).
- **\`useLayoutEffect\`**: Runs **synchronously after** DOM mutations but **before** the browser paints the screen. It blocks visual paint, making it suitable for reading DOM measurements (e.g. element height or tooltip positioning) and mutating styles to prevent visual layout flicker.

---

### Q4: How does React's Reconciliation Diffing Algorithm achieve $O(N)$ complexity?
**Answer**:
A general tree comparison algorithm takes $O(N^3)$ time, which would be unusable. React applies two heuristics to achieve $O(N)$ linear time:
1. **Different Element Types**: Two elements of different types (e.g. \`<div>\` changing to \`<span>\`) produce completely different trees. React tears down the old tree and mounts a fresh one.
2. **Keys on Lists**: When diffing arrays of children, React uses the \`key\` prop to match children across renders, moving existing DOM nodes instead of re-creating them.

---

### Q5: Why can't you call Hooks inside loops, conditions, or nested functions?
**Answer**:
React relies on the **call order** of Hooks to preserve state between renders. Internally, React stores hook states as a singly linked list on the component's Fiber node. If a Hook is wrapped in an \`if\` statement, the order shifts on conditional renders, causing hook pointer indices to desynchronize and corrupting state.

---

### Q6: What is Automatic Batching in React 18?
**Answer**:
In React 17 and earlier, state updates inside promises, timeouts, and native event handlers triggered immediate, separate re-renders. React 18 automatically batches all state updates into a single render pass across all execution contexts, improving runtime performance out of the box.

---

### Q7: What are Controlled vs Uncontrolled Components?
**Answer**:
- **Controlled Component**: Input form data is handled by React state (\`value={val}\`, \`onChange={(e) => setVal(e.target.value)}\`). React is the single source of truth.
- **Uncontrolled Component**: Input form data is handled by the browser DOM itself. Values are retrieved on-demand using a \`useRef()\` pointing to the DOM input node.

---

### Q8: What is Prop Drilling and how do you resolve it?
**Answer**:
Prop drilling occurs when data is passed down through multiple intermediate components that do not need the data themselves, merely to reach a deeply nested child.
**Solutions**:
1. Component Composition: Passing JSX as \`children\` or component props.
2. Context API: For global themes or auth user data.
3. State Management Stores: Redux Toolkit, Zustand, or TanStack Query.

---

### Q9: What is the purpose of \`React.memo\` and when should you avoid it?
**Answer**:
\`React.memo\` is a higher-order component that memoizes the rendered output of a functional component. If its props have not changed (via shallow equality comparison), React skips rendering the component.
**When to avoid**: Avoid on cheap components that re-render quickly, or components whose props are always new object references (inline functions/objects) because the shallow comparison overhead wastes CPU without preventing re-renders.

---

### Q10: What is the difference between \`useCallback\` and \`useMemo\`?
**Answer**:
- \`useMemo(() => computeValue(a, b), [a, b])\`: Memoizes the **result of a function execution** (a computed value, object, or array).
- \`useCallback(fn, deps)\`: Memoizes the **function definition instance itself**, ensuring the function reference remains identical between renders unless dependencies change.

---

### Q11: What is a Stale Closure in React?
**Answer**:
A stale closure occurs when a callback or effect function captures variables from an earlier render cycle and retains those outdated values due to JavaScript's lexical scoping, because the dependency array did not include the changing variable.

---

### Q12: What is the difference between \`useRef\` and a standard JavaScript variable?
**Answer**:
- Standard variable inside a component function: Re-initialized to its initial value on every single render.
- \`useRef\`: Persists its mutable \`.current\` value across all renders without triggering a re-render when mutated.

---

### Q13: What are React Server Components (RSC)?
**Answer**:
React Server Components execute exclusively on the server and stream their UI as a special JSON-like component format to the client with **zero JavaScript bundle size**. They can query databases directly without exposing API endpoints and reduce client bundle weight.

---

### Q14: What is the role of Error Boundaries in React?
**Answer**:
Error Boundaries are React components (implementing \`componentDidCatch\` or \`getDerivedStateFromError\`) that catch JavaScript errors anywhere in their child component tree, log the error, and display a fallback UI instead of crashing the entire React tree.

---

### Q15: How does \`useTransition\` differ from standard state updates?
**Answer**:
Standard state updates are urgent and interrupt rendering until complete. \`startTransition\` marks an update as non-urgent; React can pause or abort its rendering work if a more urgent event (like typing in an input or clicking a button) occurs.

---

### Q16: Why should you avoid mutating state directly in React?
**Answer**:
React uses shallow reference equality (\`Object.is\`) to check if state changed. Mutating an existing object in-place preserves its memory reference, causing React to assume nothing changed and skip re-rendering. It also breaks time-travel debugging and concurrent features.

---

### Q17: What is the purpose of the \`forwardRef\` API?
**Answer**:
By default, the \`ref\` prop cannot be attached to custom functional components. \`forwardRef\` allows a parent component to pass a ref through a child component directly down to an underlying native DOM element.

---

### Q18: What is the difference between Context API and Redux?
**Answer**:
- **Context API**: Built into React for passing data down a component tree without prop drilling. It is not an optimized state management tool: any update to the context value re-renders all subscribing components.
- **Redux / Redux Toolkit**: A centralized external state store featuring selector subscriptions (components only re-render if their selected slice changes), middleware, DevTools, and predictable action dispatches.

---

### Q19: What is Code Splitting and how is it implemented in React?
**Answer**:
Code splitting divides the monolithic JavaScript bundle into smaller chunks loaded on-demand. In React, it is implemented using \`React.lazy()\` and \`<Suspense fallback={<Loading />}>\`:
\`const Profile = React.lazy(() => import('./Profile'));\`

---

### Q20: What are synthetic events in React?
**Answer**:
SyntheticEvent is React's cross-browser wrapper around the browser's native DOM event. It provides an identical API across all browsers and implements event delegation at the root container level (\`#root\`) for optimal memory usage.

---

### Q21: What is Hydration in Server-Side Rendering (SSR)?
**Answer**:
Hydration is the process where client-side React takes over server-rendered static HTML, attaching event listeners and initializing internal component state to make the static page interactive.

---

### Q22: What is the difference between \`Suspense\` for code splitting vs \`Suspense\` for data fetching?
**Answer**:
For code splitting, \`Suspense\` catches asynchronous dynamic \`import()\` promises. For data fetching (via TanStack Query or React 19 \`use\`), components suspend rendering until an asynchronous data promise resolves, displaying a fallback UI in the interim.

---

### Q23: How do you optimize rendering performance for a list of 10,000 items in React?
**Answer**:
Never render 10,000 DOM nodes simultaneously. Use **List Virtualization** (via libraries like \`react-window\` or \`@tanstack/react-virtual\`), which calculates the scroll offset and renders only the 15-20 visible items currently inside the viewport.

---

### Q24: What is the difference between \`useId\` and \`Math.random()\` for generating accessible element IDs?
**Answer**:
\`Math.random()\` generates different IDs on the server versus the client, causing hydration mismatch errors in SSR applications. \`useId\` generates stable, deterministic, collision-free IDs across both SSR and client hydration.

---

### Q25: What is the StrictMode component in React and why does it render twice in development?
**Answer**:
\`<React.StrictMode>\` is a developer tool that highlights potential problems in an application. In development, it intentionally mounts, unmounts, and re-mounts components and double-invokes effect setups to detect impure lifecycle effects and missing cleanup handlers. It has zero impact in production builds.`,
        hi: `### Q1: Virtual DOM aur Real DOM mein kya farq hai?
**Answer**: Real DOM browser ka physical tree hota hai jise badalne par browser reflow aur repaint karta hai. Virtual DOM JavaScript ka memory object hota hai. React changes ko pehle memory mein diff karta hai aur sirf zaroori badlaav hi Real DOM par batch update karta hai.

---

### Q2: React Fiber kya hai aur isne kaunsi problem solve ki?
**Answer**: React 16 mein banaya gaya naya reconciliation engine. Purana engine synchronous tha jise pause nahi kiya ja sakta tha. Fiber rendering work ko chote-chote chunks mein baant kar pause, resume aur prioritize karne ki taqat deta hai (Concurrent React).

---

### Q3: \`useEffect\` aur \`useLayoutEffect\` mein kya antar hai?
**Answer**: \`useEffect\` screen paint hone ke baad asynchronously chalta hai (95% cases mein ye use hota hai). \`useLayoutEffect\` DOM update hote hi screen paint hone se **pehle** synchronously chalta hai taaki layout flicker na aaye.

---

### Q4: React ka Diffing Algorithm $O(N)$ speed kaise deta hai?
**Answer**: Do rules se: 1) Element type badalte hi (div se span) poora tree naya banta hai. 2) Lists mein \`key\` prop use karke React elements ko identify karke reuse karta hai.

---

### Q5: Hooks ko \`if\` conditions ya loops mein kyun nahi daal sakte?
**Answer**: React hooks ke state ko Fiber node par linked list ke sequence se pehchanta hai. Condition lagane par hook ka call order badal jata hai aur state corrupt ho jaati hai.

---

### Q6: React 18 Automatic Batching kya hai?
**Answer**: React 18 mein promises, timeouts aur events ke andar aane wale saare state updates ek sath milakar sirf **1 baar re-render** hote hain.

---

### Q7: Controlled vs Uncontrolled Components?
**Answer**: Controlled inputs ka data React state (\`value\`, \`onChange\`) se chalta hai. Uncontrolled ka data browser ke DOM mein rehta hai aur \`useRef\` se padha jata hai.

---

### Q8: Prop Drilling kya hai aur ise kaise theek karte hain?
**Answer**: Beech ke components ko faaltu mein props pass karna. Iska solution Context API, component composition (\`children\`), ya Redux hota hai.

---

### Q9: \`React.memo\` kab use karein aur kab na karein?
**Answer**: Jab component heavy ho aur props same rehne par dobara render na karna ho. Chote components par shallow comparison ka overhead zyada hota hai isliye wahan use na karein.

---

### Q10: \`useCallback\` vs \`useMemo\`?
**Answer**: \`useMemo\` kisi computation ka **result/value** memoize karta hai. \`useCallback\` function ke **instance/definition** ko memoize karta hai.

---

### Q11: Stale Closure kya hota hai?
**Answer**: Jab koi callback function purane render ki value ko scope mein lock kar leta hai aur dependency array mein update na hone ki wajah se hamesha purana data use karta hai.

---

### Q12: \`useRef\` vs simple variable?
**Answer**: Normal variable har render par reset ho jata hai. \`useRef\` render ke dauran value safe rakhta hai aur badalne par re-render trigger nahi karta.

---

### Q13: React Server Components (RSC) kya hain?
**Answer**: Wo components jo sirf server par chalte hain aur browser ko 0kb JavaScript bhejte hain, seedha database access kar sakte hain.

---

### Q14: Error Boundaries ka kya kaam hai?
**Answer**: JavaScript errors ko catch karke fallback UI dikhana taaki poori app crash na ho.

---

### Q15: \`useTransition\` kya karta hai?
**Answer**: State update ko non-urgent mark karta hai taaki input typing freeze na ho aur background mein heavy filter chalta rahe.

---

### Q16: State ko directly mutate kyun nahi karte?
**Answer**: React reference compare karta hai. Direct mutate karne se reference nahi badalta aur screen update nahi hoti.

---

### Q17: \`forwardRef\` kya hota hai?
**Answer**: Parent component se child component ke native DOM element tak ref pass karne ka tareeqa.

---

### Q18: Context API vs Redux?
**Answer**: Context simple data pass karne ke liye hai (har update par saare children re-render hote hain). Redux optimized store hai jisme sirf wahi component re-render hota hai jiska data badla ho.

---

### Q19: Code Splitting kaise hoti hai?
**Answer**: \`React.lazy()\` aur \`<Suspense>\` se JavaScript bundle ko alag-alag chunks mein load karna.

---

### Q20: Synthetic Events kya hote hain?
**Answer**: React ka cross-browser wrapper jo sabhi browsers par ek jaisa event behavior deta hai.

---

### Q21: SSR mein Hydration kya hota hai?
**Answer**: Server se aayi static HTML par JavaScript event listeners jod kar use interactive banana.

---

### Q22: \`Suspense\` data fetching ke liye kaise kaam karta hai?
**Answer**: Data aane tak component ko pause karke loading spinner dikhata hai.

---

### Q23: 10,000 items ki list kaise optimize karein?
**Answer**: List Virtualization (\`react-window\`) se sirf screen par dikhne wale 20 items render karein.

---

### Q24: \`useId\` SSR mein kyun zaroori hai?
**Answer**: Server aur client dono par exact same stable ID generate karta hai taaki hydration mismatch na aaye.

---

### Q25: Development mein React do baar kyun render hota hai?
**Answer**: \`<React.StrictMode>\` development mein side-effects aur unclosed handlers ko pakadne ke liye do baar render karta hai. Production mein ye nahi hota.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary",
        hi: "Quick Revision Summary",
      },
      body: {
        en: `- **Senior React Interviews** test your mental model of the render cycle, reconciliation, and hooks internals.
- **Virtual DOM**: A declarative architectural abstraction, not a raw speed mechanism.
- **React Fiber**: Enables interruptible, prioritized Concurrent React rendering.
- **React 18 Batching**: Automatically groups state updates into a single render across all event boundaries.
- **Stale Closures**: Solved using functional state updaters \`setCount(c => c + 1)\` or \`useRef\`.
- **Context API vs Redux**: Context passes data down; Redux/Zustand optimizes granular selector-based subscriptions.`,
        hi: `- **Senior Interviews**: Render lifecycle, Fiber engine, aur closures ke deep understanding par focus karte hain.
- **Virtual DOM**: Declarative UI ke liye hai, direct real DOM se tez hone ke liye nahi.
- **Fiber**: Render work ko pause aur resume karne ki Concurrent taqat deta hai.
- **React 18 Batching**: Saare state updates ko 1 single render mein pack karta hai.
- **Stale Closures**: Hamesha \`setCount(prev => prev + 1)\` use karke theek karein.
- **Context vs Redux**: Context data pass karta hai; Redux granular subscriptions se re-renders rokkta hai.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "Why does the statement 'The Virtual DOM is faster than the Real DOM' demonstrate a junior-level misconception?",
      "hi": "'Virtual DOM Real DOM se fast hota hai' bolna junior-level galatfehmi kyun mani jaati hai?"
    },
    "options": [
      {
        "en": "Because Virtual DOM is written in Python",
        "hi": "Kyunki Virtual DOM Python mein likha hai"
      },
      {
        "en": "Creating and diffing in-memory Virtual DOM objects requires computational CPU overhead; frameworks like Svelte bypass the Virtual DOM entirely and are faster. The Virtual DOM is designed for declarative ergonomics and predictable updates, not raw speed",
        "hi": "Virtual DOM objects banana aur unhe diff karna extra CPU time leta hai; Svelte bina Virtual DOM ke zyada fast chalta hai. Virtual DOM declarative developer ergonomics ke liye banaya gaya hai, raw speed ke liye nahi"
      },
      {
        "en": "Because the Real DOM was deleted in HTML5",
        "hi": "Kyunki Real DOM HTML5 mein delete ho gaya tha"
      },
      {
        "en": "Because React only works in terminal consoles",
        "hi": "Kyunki React sirf terminal par chalta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Virtual DOM diffing introduces memory and CPU cost. Its primary value is allowing developers to write declarative state-driven code without manual imperatively targeted DOM mutations.",
      "hi": "Virtual DOM diffing extra CPU leta hai. Iska asli maksad speed nahi balki declarative code likhne ki azaadi dena hai."
    }
  },
  {
    "question": {
      "en": "How does functional state updating (setCount(prev => prev + 1)) resolve stale closure bugs in setInterval or event callbacks?",
      "hi": "Functional state update (setCount(prev => prev + 1)) setInterval mein stale closure bugs ko kaise theek karta hai?"
    },
    "options": [
      {
        "en": "It forces the computer to restart",
        "hi": "Ye computer restart karta hai"
      },
      {
        "en": "It bypasses the closed-over scope variable and asks React's internal fiber state engine directly for the most current pending state value",
        "hi": "Ye purane closure variable ko bypass karke React engine se direct sabse taja state mangwata hai"
      },
      {
        "en": "It deletes the timer immediately",
        "hi": "Ye timer delete kar deta hai"
      },
      {
        "en": "It converts numbers into strings",
        "hi": "Ye numbers ko string banata hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Functional updates pass a callback to React. When executed, React provides the latest committed state as the argument, bypassing stale lexical closure scope.",
      "hi": "Functional update React ko direct fresh value provide karne deta hai, jisse purani scope value par dependency khatam ho jaati hai."
    }
  },
  {
    "question": {
      "en": "What is the primary architectural difference between useEffect and useLayoutEffect?",
      "hi": "useEffect aur useLayoutEffect mein mukhya architectural farq kya hai?"
    },
    "options": [
      {
        "en": "useLayoutEffect is only supported on mobile devices",
        "hi": "useLayoutEffect sirf mobile par chalta hai"
      },
      {
        "en": "useEffect runs asynchronously after the browser paints the screen; useLayoutEffect runs synchronously after DOM mutations but BEFORE the browser paints, blocking visual paint",
        "hi": "useEffect screen paint hone ke baad asynchronously chalta hai; useLayoutEffect DOM mutations ke theek baad paint hone se PEHLE synchronously chalta hai"
      },
      {
        "en": "useEffect cannot fetch data",
        "hi": "useEffect data fetch nahi kar sakta"
      },
      {
        "en": "There is zero difference",
        "hi": "Koi farq nahi hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "useLayoutEffect blocks the browser from painting until it finishes executing, preventing visual flicker when measuring DOM elements or adjusting scroll positions.",
      "hi": "useLayoutEffect paint hone se pehle chalta hai taaki screen flicker na ho jab DOM dimensions napni hon."
    }
  },
  {
    "question": {
      "en": "Why should you avoid using an array index as the key prop in dynamic mutating lists?",
      "hi": "Mutating lists mein array index ko key prop kyun nahi banana chahiye?"
    },
    "options": [
      {
        "en": "Because React throws an immediate syntax error",
        "hi": "Kyunki React syntax error fekta hai"
      },
      {
        "en": "When items are added, removed, or re-sorted, the indexes shift, causing React to associate existing DOM nodes with the wrong state and leaking input values across items",
        "hi": "Items add, delete ya sort hone par indexes badal jaate hain jisse React galat DOM element ko update karta hai aur input focus leak ho jata hai"
      },
      {
        "en": "Because keys must be written in Hindi",
        "hi": "Kyunki keys Hindi mein honi chahiye"
      },
      {
        "en": "To limit list items to 10",
        "hi": "List ko 10 items par limit karne ke liye"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Keys must be stable identifiers. If an item is unshifted to index 0, the previous item at index 0 now has key=1, breaking React's component identity matching.",
      "hi": "Keys stable honi chahiye. Index badalne par React purane element ko naya samajh kar state mismatch kar deta hai."
    }
  },
  {
    "question": {
      "en": "How does React 18's Automatic Batching differ from state batching in React 17?",
      "hi": "React 18 ka Automatic Batching React 17 se kaise alag hai?"
    },
    "options": [
      {
        "en": "React 18 only batches updates if they happen on a Monday",
        "hi": "React 18 sirf Monday ko batch karta hai"
      },
      {
        "en": "React 17 only batched state updates inside React synthetic event handlers; React 18 batches all state updates across promises, setTimeout, and native event handlers into a single render pass",
        "hi": "React 17 sirf React synthetic events ke andar batch karta tha; React 18 promises, setTimeout aur native events sabhi ke updates ko ek single render mein batch karta hai"
      },
      {
        "en": "React 18 stopped batching state updates completely",
        "hi": "React 18 ne batching poori tarah band kar di"
      },
      {
        "en": "React 17 was faster than React 18 in batching",
        "hi": "React 17 React 18 se fast tha"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Prior to React 18, state updates inside async callbacks (like setTimeout or fetch().then) triggered separate renders per setState call. React 18 batches everything by default.",
      "hi": "React 18 se pehle setTimeout ya fetch ke andar har setState par alag render hota tha. React 18 sabhi updates ko automatically ek hi render mein bundle kar deta hai."
    }
  },
  {
    "question": {
      "en": "What is the primary difference between useTransition and useDeferredValue in React 18?",
      "hi": "React 18 mein useTransition aur useDeferredValue mein mukhya farq kya hai?"
    },
    "options": [
      {
        "en": "useTransition wraps the state updater function; useDeferredValue wraps a value or prop directly when you don't control the state setter",
        "hi": "useTransition state updater function ko wrap karta hai; useDeferredValue value ya prop ko direct wrap karta hai jab state setter aapke control mein na ho"
      },
      {
        "en": "useTransition is for CSS animations only",
        "hi": "useTransition sirf CSS animations ke liye hai"
      },
      {
        "en": "useDeferredValue deletes the state after 1 second",
        "hi": "useDeferredValue 1 second baad state delete karta hai"
      },
      {
        "en": "They are exact aliases with zero differences",
        "hi": "Dono mein bilkul koi farq nahi hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "useTransition gives you startTransition(fn) and isPending to defer state updates. useDeferredValue takes a value/prop (e.g. from parent) and defers updating the UI based on that value.",
      "hi": "useTransition state updater ko wrap karta hai jabki useDeferredValue received value ya prop ko defer karta hai."
    }
  },
  {
    "question": {
      "en": "Why can wrapping every component and callback in useMemo and useCallback actually degrade performance?",
      "hi": "Har component aur callback ko blindly useMemo aur useCallback se wrap karne se performance kharab kyun ho sakti hai?"
    },
    "options": [
      {
        "en": "Because React disables all CSS styles when useMemo is called",
        "hi": "Kyunki useMemo se CSS disable ho jaati hai"
      },
      {
        "en": "Each memoization allocates memory closures and executes dependency array comparisons on every single render, which is often more expensive than re-creating simple functions or objects",
        "hi": "Har memoization memory closures allocate karta hai aur har render par dependency array compare karta hai, jo simple function re-create karne se zyada mehnga padta hai"
      },
      {
        "en": "Because useMemo is deprecated in React 18",
        "hi": "Kyunki useMemo deprecate ho gaya hai"
      },
      {
        "en": "Because useMemo limits the component tree to 5 nodes",
        "hi": "Kyunki useMemo component tree ko 5 nodes tak limit karta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Memoization has overhead: creating dependency arrays, checking for changes via Object.is, and holding references in memory. For cheap calculations, the overhead exceeds the cost of re-computation.",
      "hi": "Memoization dependency arrays create aur compare karne ka CPU aur memory overhead leta hai. Choti calculations mein ye fayde ke badle nuksan deta hai."
    }
  },
  {
    "question": {
      "en": "What is the fundamental difference between useRef and useState in React?",
      "hi": "React mein useRef aur useState ke beech sabse bada fundamental farq kya hai?"
    },
    "options": [
      {
        "en": "useRef only works with HTML inputs",
        "hi": "useRef sirf HTML inputs ke saath chalta hai"
      },
      {
        "en": "Mutating useRef.current does NOT trigger a component re-render, whereas calling a useState setter triggers a re-render pass",
        "hi": "useRef.current ko mutate karne par component re-render NAHI hota, jabki useState setter call karne par component re-render hota hai"
      },
      {
        "en": "useState values are lost between renders, while useRef values persist",
        "hi": "useState renders ke beech kho jata hai jabki useRef persist hota hai"
      },
      {
        "en": "useRef is synchronous and useState is always asynchronous in all JS engines",
        "hi": "useRef synchronous hai aur useState hamesha async hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Both persist values across renders, but updating ref.current is a mutable assignment with no render trigger. useState triggers reconciliation.",
      "hi": "Dono renders ke beech value yaad rakhte hain, lekin useRef.current badalne par component dubara render nahi hota jabki useState re-render trigger karta hai."
    }
  },
  {
    "question": {
      "en": "When using React.memo(Component, arePropsEqual), what comparison does React perform by default if arePropsEqual is omitted?",
      "hi": "React.memo(Component) mein agar arePropsEqual function na diya jaye toh React by default kaunsa comparison karta hai?"
    },
    "options": [
      {
        "en": "Deep recursive comparison of all nested object properties",
        "hi": "Deep recursive comparison"
      },
      {
        "en": "Shallow comparison (Object.is) of previous and next props",
        "hi": "Previous aur next props ka Shallow comparison (Object.is)"
      },
      {
        "en": "Comparing string lengths of component names",
        "hi": "Component names ki length compare karta hai"
      },
      {
        "en": "Zero comparison; it always skips rendering",
        "hi": "Koi comparison nahi karta"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "React.memo performs a shallow comparison on each key of the props object using Object.is. If any prop is a newly instantiated object or function reference, it will re-render.",
      "hi": "React.memo props ke har key par shallow comparison (Object.is) karta hai. Agar new object reference pass ho toh re-render ho jata hai."
    }
  },
  {
    "question": {
      "en": "How do you prevent unnecessary child re-renders when using React's Context API?",
      "hi": "React Context API use karte waqt unneeded child re-renders ko kaise roka jata hai?"
    },
    "options": [
      {
        "en": "Split Context into separate StateContext and DispatchContext, or memoize context consumers using useMemo / React.memo",
        "hi": "Context ko do hisson mein tod dein (StateContext aur DispatchContext), ya consumers ko useMemo / React.memo se optimize karein"
      },
      {
        "en": "Place the entire database inside the Context provider",
        "hi": "Poora database Context mein daal dein"
      },
      {
        "en": "Call useContext inside a setInterval loop",
        "hi": "setInterval ke andar useContext call karein"
      },
      {
        "en": "Delete the Context Provider after the first mount",
        "hi": "Pehle mount ke baad Provider delete kar dein"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "When context value changes, every component calling useContext re-renders. Splitting mutable state from stable dispatch functions ensures dispatch-only components never re-render.",
      "hi": "Jab Context value badalti hai toh saare consumer re-render hote hain. State aur Dispatch ko alag karne se dispatch lene wale components bina wajah re-render nahi hote."
    }
  },
  {
    "question": {
      "en": "What is the key architectural difference between Controlled and Uncontrolled form inputs?",
      "hi": "Controlled aur Uncontrolled form inputs mein mukhya architectural farq kya hai?"
    },
    "options": [
      {
        "en": "Controlled inputs store state in React (value + onChange); Uncontrolled inputs let the browser DOM hold input state, accessed via ref on demand",
        "hi": "Controlled inputs ka state React handle karta hai (value + onChange); Uncontrolled inputs ka data browser DOM mein rehta hai aur zaroorat padne par ref se nikala jata hai"
      },
      {
        "en": "Uncontrolled inputs cannot be submitted",
        "hi": "Uncontrolled inputs submit nahi ho sakte"
      },
      {
        "en": "Controlled inputs do not support text",
        "hi": "Controlled inputs text support nahi karte"
      },
      {
        "en": "There is no difference in modern React",
        "hi": "Modern React mein koi farq nahi hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Controlled components keep React state as the single source of truth. Uncontrolled components use the DOM as the source of truth, accessed via useRef only when needed (e.g. form submit).",
      "hi": "Controlled components mein React state sach ka zariya hai. Uncontrolled mein browser DOM state rakhta hai aur ref ke zariye submit par value li jaati hai."
    }
  },
  {
    "question": {
      "en": "Which of the following errors CANNOT be caught by a React Error Boundary?",
      "hi": "Inme se kaunsa error React Error Boundary pakad NAHI sakti?"
    },
    "options": [
      {
        "en": "Errors inside child component render functions",
        "hi": "Child component ke render ke andar aane wale errors"
      },
      {
        "en": "Errors in Event Handlers (e.g. onClick), Asynchronous code (e.g. setTimeout/fetch), and Server-Side Rendering (SSR)",
        "hi": "Event Handlers (onClick), Asynchronous code (setTimeout/fetch), aur Server-Side Rendering (SSR) ke errors"
      },
      {
        "en": "Errors inside child component lifecycle methods",
        "hi": "Child component ke lifecycle methods ke errors"
      },
      {
        "en": "Errors inside child component constructor functions",
        "hi": "Child component ke constructor ke errors"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Error Boundaries catch errors during rendering, lifecycle methods, and constructors in the component tree. They DO NOT catch errors in event handlers, async code, SSR, or errors within the boundary itself.",
      "hi": "Error Boundaries render phase aur lifecycle errors pakadti hain. Lekin onClick handlers, async callbacks (fetch/setTimeout) aur SSR errors ko nahi pakad paati hain."
    }
  },
  {
    "question": {
      "en": "Why does React StrictMode intentionally mount and unmount components twice in local development?",
      "hi": "Local development mein React StrictMode components ko do baar mount aur unmount kyun karta hai?"
    },
    "options": [
      {
        "en": "To stress test the user's monitor refresh rate",
        "hi": "Monitor ki refresh rate test karne ke liye"
      },
      {
        "en": "To detect missing cleanup functions in useEffect, spot accidental impure mutations, and ensure compatibility with Concurrent React features",
        "hi": "useEffect mein missing cleanup functions ko pakadne, impure mutations dhoondhne, aur Concurrent React compatibility check karne ke liye"
      },
      {
        "en": "Because development builds run at 50% speed",
        "hi": "Kyunki dev builds 50% speed par chalti hain"
      },
      {
        "en": "It is a bug in the Vite development server",
        "hi": "Ye Vite server ka bug hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Double mounting exposes components that leak memory (e.g., subscribing without unsubscribing) or have impure render functions that cause bugs when React suspends or restarts renders.",
      "hi": "Double mount karne se aise effects samne aate hain jahan developer ne cleanup function nahi likha ya state mutate kiya hai."
    }
  },
  {
    "question": {
      "en": "In React's Fiber architecture, how are Fiber nodes linked together in memory?",
      "hi": "React ke Fiber architecture mein Fiber nodes memory mein aapas mein kaise jude hote hain?"
    },
    "options": [
      {
        "en": "Using a flat circular array of string names",
        "hi": "Strings ka ek flat circular array"
      },
      {
        "en": "Using singly linked list pointers: 'child' (first child), 'sibling' (next sibling), and 'return' (parent node)",
        "hi": "Singly linked list pointers ke zariye: 'child' (pehla bacha), 'sibling' (agla bhai-behan), aur 'return' (parent node)"
      },
      {
        "en": "Using an external SQLite database file in the browser",
        "hi": "Browser mein SQLite database se"
      },
      {
        "en": "Through binary bitmasks on the window object",
        "hi": "Window object par binary bitmasks se"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Fiber replaced recursive stack traversal with a singly linked list tree (child, sibling, return). This enables interruptible, prioritized units of work that can pause, resume, or abort.",
      "hi": "Fiber recursive call stack ke badle child, sibling aur return pointers ka linked list use karta hai, jisse rendering ko beech mein pause aur resume kiya ja sakta hai."
    }
  },
  {
    "question": {
      "en": "How does event bubbling behave when an element is rendered through ReactDOM.createPortal into a different DOM subtree?",
      "hi": "Jab koi element ReactDOM.createPortal se kisi doosre DOM subtree mein render hota hai, toh event bubbling kaise kaam karti hai?"
    },
    "options": [
      {
        "en": "Events do not bubble at all through portals",
        "hi": "Portals ke through events bilkul bubble nahi hote"
      },
      {
        "en": "Events bubble up according to the React Virtual DOM component tree hierarchy, regardless of the target element's actual position in the real HTML DOM tree",
        "hi": "Events React Virtual DOM component tree ke hisaab se bubble hote hain, chahe real HTML DOM mein wo element kahin bhi render hua ho"
      },
      {
        "en": "Events bubble directly to the document.head",
        "hi": "Events seedhe document.head par bubble hote hain"
      },
      {
        "en": "Events only trigger on mobile touches",
        "hi": "Events sirf mobile touches par trigger hote hain"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Even though a portal renders DOM nodes into document.body or a modal root, React preserves synthetic event bubbling along the React component ancestor tree.",
      "hi": "Portals real DOM mein chahe body ke end mein hon, React synthetic event bubbling React component hierarchy ke mutabiq parent tak pahunchata hai."
    }
  },
  {
    "question": {
      "en": "What is React Suspense primarily designed to do when combined with React 18 Streaming SSR?",
      "hi": "React 18 Streaming SSR ke saath milkar React Suspense ka mukhya maksad kya hota hai?"
    },
    "options": [
      {
        "en": "To pause CSS animations until the page loads",
        "hi": "CSS animations ko page load tak rokna"
      },
      {
        "en": "To stream HTML chunks to the browser as data resolves, showing instant fallbacks for slow components and enabling selective hydration without waiting for all data",
        "hi": "Data aane par HTML chunks stream karna, slow components ke liye fallback dikhana, aur poore data ka wait kiye bina selective hydration karna"
      },
      {
        "en": "To delete slow database queries automatically",
        "hi": "Slow DB queries ko delete karna"
      },
      {
        "en": "To replace Node.js with Python on the server",
        "hi": "Server par Node ko Python se replace karna"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "React Suspense in React 18 allows the server to stream HTML as soon as fast parts are ready, while slow asynchronous widgets show fallbacks and hydrate independently when ready.",
      "hi": "Suspense server ko turant HTML stream karne deta hai aur slow parts ko background mein bhej kar independently hydrate karta hai."
    }
  },
  {
    "question": {
      "en": "What are the two golden 'Rules of Hooks' enforced by the React ESLint plugin?",
      "hi": "React ESLint plugin dwara enforce kiye gaye 'Rules of Hooks' ke 2 golden niyam kaunse hain?"
    },
    "options": [
      {
        "en": "1. Only call Hooks at the top level (never in loops, conditions, or nested functions); 2. Only call Hooks from React function components or custom Hooks",
        "hi": "1. Hooks ko sirf top level par call karein (kabhi loops, conditions ya nested functions mein nahi); 2. Hooks ko sirf React function components ya custom Hooks se call karein"
      },
      {
        "en": "1. Always call Hooks inside for-loops; 2. Never name custom hooks starting with 'use'",
        "hi": "1. Hamesha for-loop mein call karein; 2. 'use' se start na karein"
      },
      {
        "en": "1. Only call Hooks on Tuesdays; 2. Only pass string arguments",
        "hi": "1. Sirf Tuesday ko call karein; 2. Sirf string pass karein"
      },
      {
        "en": "Hooks have no rules in modern React",
        "hi": "Modern React mein hooks ke koi rules nahi hain"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "React relies on the exact invocation order of Hooks between renders to match state cells in the Fiber linked list. Loops or conditions alter this order, corrupting state.",
      "hi": "React fiber linked list mein hooks ko unke exact execution order se match karta hai. Conditions ya loops order badal kar state corrupt kar dete hain."
    }
  },
  {
    "question": {
      "en": "Why did React 17 remove SyntheticEvent pooling (e.g. event.persist() is no longer needed)?",
      "hi": "React 17 ne SyntheticEvent pooling kyun hata di (jisse event.persist() ki zaroorat khatam ho gayi)?"
    },
    "options": [
      {
        "en": "Because modern JavaScript engines have highly optimized garbage collectors, making the small performance gain of event object recycling not worth the subtle async access bugs",
        "hi": "Modern JS engines ke Garbage Collectors itne optimized hain ki event pooling ka chota sa fayda async callbacks mein aane wale bugs ke muqable bekar ho gaya tha"
      },
      {
        "en": "Because browsers banned mouse clicks",
        "hi": "Kyunki browsers ne clicks ban kar diye"
      },
      {
        "en": "Because React 17 deleted all buttons",
        "hi": "Kyunki React 17 ne buttons delete kar diye"
      },
      {
        "en": "To make React apps 100x heavier",
        "hi": "React apps ko heavy banane ke liye"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "In React 16 and older, React recycled synthetic event objects to save memory, which wiped event properties unless event.persist() was called before async operations. React 17 removed pooling entirely.",
      "hi": "React 16 purane events reuse karta tha jisse async callbacks mein event null ho jata tha. Modern JS engines ke tezi ki wajah se React 17 ne pooling permanently band kar di."
    }
  },
  {
    "question": {
      "en": "In a component with useCallback, what happens if you mutate state inside the callback but omit that state variable from the dependency array?",
      "hi": "useCallback mein agar aap state use karein lekin use dependency array mein na daalein toh kya hota hai?"
    },
    "options": [
      {
        "en": "The computer reboots immediately",
        "hi": "Computer restart ho jata hai"
      },
      {
        "en": "The callback captures the state value from the initial render in its lexical closure and continuously operates on that stale value on every subsequent invocation",
        "hi": "Callback pehle render ki purani state value ko closure mein lock kar leta hai aur har call par wahi stale (purana) data use karta hai"
      },
      {
        "en": "React automatically detects the variable and re-runs the callback anyway",
        "hi": "React automatic detect karke callback re-run karta hai"
      },
      {
        "en": "The component throws a fatal syntax error",
        "hi": "Syntax error throw hota hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Without the dependency, useCallback never re-creates the function instance. The cached function retains the closure of the render pass where it was created (stale closure bug).",
      "hi": "Dependency miss hone par useCallback naya function nahi banata aur purani scope (stale closure) mein fase purane variables ko hi use karta rehta hai."
    }
  },
  {
    "question": {
      "en": "What is the primary architectural boundary between React Server Components (RSC) and Client Components ('use client')?",
      "hi": "React Server Components (RSC) aur Client Components ('use client') ke beech mukhya architectural boundary kya hai?"
    },
    "options": [
      {
        "en": "Server components only run on Internet Explorer",
        "hi": "Server components sirf IE par chalte hain"
      },
      {
        "en": "Server Components execute strictly on the server and add ZERO JavaScript bytes to the client bundle; Client Components are hydrated in the browser and enable user interactivity, state, and browser APIs",
        "hi": "Server Components sirf server par execute hote hain aur client bundle size mein 0 KB JS add karte hain; Client Components browser mein hydrate hokar state, events aur interactivity dete hain"
      },
      {
        "en": "Client Components cannot use CSS",
        "hi": "Client components CSS use nahi kar sakte"
      },
      {
        "en": "Server components cannot query databases directly",
        "hi": "Server components direct DB query nahi kar sakte"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "RSC render on the server, can directly query databases or access file systems securely, and ship only the rendered UI tree to the client with zero bundle weight. 'use client' marks the boundary where JavaScript hydration begins.",
      "hi": "Server Components direct DB query kar sakte hain aur unka JS bundle client par nahi jata. 'use client' se browser interactivity aur state shuru hoti hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Top 25 React.js Interview Questions & Model Answers in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Top 25 React Interview Questions & Model Answers ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling top 25 react.js interview questions & model answers with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Top 25 React Interview Questions & Model Answers ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Top 25 React.js Interview Questions & Model Answers establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Top 25 React Interview Questions & Model Answers clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  }
],
};
