const e={id:"react-hooks-custom",title:{en:"Building Custom Hooks for Reusable Logic",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage)"},difficulty:"Intermediate",readTime:12,sections:[{type:"concept",heading:{en:"1. What is a Custom Hook?",hi:"1. Custom Hook Kya Hota Hai?"},body:{en:'When multiple components need to execute the same stateful logic—such as fetching data from an API, syncing with `localStorage`, or listening to window dimensions—copy-pasting `useState` and `useEffect` into 5 different files violates the **DRY (Don\'t Repeat Yourself)** principle.\n\nA **Custom Hook** is simply a JavaScript function whose name starts with **`use`** and that can call other React hooks (`useState`, `useEffect`, `useRef`, etc.).\n\n### Sharing Stateful Logic, NOT State:\n> **Crucial Rule**: Custom hooks share **stateful logic**, NOT the state itself!\n\nIf Component A and Component B both call `const [theme, setTheme] = useLocalStorage("theme")`, each component receives its **own independent state copy**. They do not share the same state variable in memory unless wrapped in a Context Provider!',hi:'Jab kai alag-alag components ko ek jaisa logic chahiye hota hai—jaise API se data fetch karna, `localStorage` se sync karna ya window size sunna—toh baar-baar wahi `useState` aur `useEffect` copy-paste karna galat practice hai.\n\n**Custom Hook** ek aisi JavaScript function hoti hai jiska naam **`use`** se shuru hota hai aur jo apne andar doosre React hooks ko call kar sakti hai.\n\n### Logic Share Hota Hai, State Nahi:\n> **Zaroori Baat**: Custom hooks **stateful logic** ko share karte hain, state ki memory ko nahi!\n\nAgar do alag components `useLocalStorage("theme")` call karte hain, toh dono ko apni-apni alag state milti hai. Ek ka change doosre ko tab tak nahi dikhega jab tak dono Context Provider se na jude hon.'}},{type:"concept",heading:{en:"2. The Rules of Custom Hooks",hi:"2. Custom Hooks Ke Strict Niyam"},body:{en:"To ensure that React can properly track hook order and enforce static code analysis, custom hooks must adhere to these rules:\n\n1. **Must Start with `use`**: E.g., `useFetch`, `useDebounce`, `useOnlineStatus`. The `use` prefix informs React and ESLint that this function follows the Rules of Hooks.\n2. **Can Call Other Hooks**: Unlike regular helper functions, custom hooks have full permission to call `useState`, `useEffect`, `useMemo`, etc.\n3. **Can Return Anything**: A custom hook can return:\n   - A tuple array (like `useState`): `[value, setValue]`\n   - An object: `{ data, isLoading, error, refetch }`\n   - A single primitive or boolean: `isOnline`\n4. **If it doesn't use any React Hooks, it's NOT a Custom Hook**: If your function only calculates math or formats strings without calling hooks, make it a plain utility function (`calculateTotal`), not a custom hook!",hi:"React Fiber reconciliation aur linter checks ke liye custom hooks ko in niyamon ka palan karna padta hai:\n\n1. **Naam `use` Se Shuru Hona Chahiye**: Jaise `useFetch`, `useDebounce`. Is prefix se React aur ESLint samajhte hain ki yeh ek hook hai.\n2. **Doosre Hooks Call Kar Sakta Hai**: Yeh normal functions se alag hota hai kyunki yeh apne andar `useState`, `useEffect` call kar sakta hai.\n3. **Kuch Bhi Return Kar Sakta Hai**: Custom hook object (`{ data, loading, error }`), array (`[val, setVal]`) ya direct value return kar sakta hai.\n4. **Agar Hook Use Nahi Hota Toh Yeh Normal Utility Hai**: Agar function ke andar koi bhi React hook call nahi ho raha, toh use `use` prefix na dein, use simple utility function banayein."}},{type:"analogy",heading:{en:"Real-Life Analogy: The Electrician's Multi-Tool vs Carrying 10 Loose Screwdrivers",hi:"Real-Life Analogy: Electrician Ka Swiss Knife vs 10 Khule Pechkas"},body:{en:`Consider an electrician fixing wiring in an apartment complex:

- **Without Custom Hooks (Loose Tools Everywhere)**:
  - In Flat 101, the electrician opens their bag, takes out wire cutters, stripping pliers, voltage tester, and electrical tape. They spend 15 minutes setting up.
  - In Flat 102, they unpack all 4 tools again.
  - In Flat 103, they repeat the same setup (**Copy-pasting 20 lines of useState and useEffect into every component**).
- **With a Custom Hook (The Swiss Electrician Multi-Tool)**:
  - The electrician builds a single compact all-in-one multi-tool with cutter, tester, and stripper combined (**\`useElectricalTool()\`**).
  - In every flat, they simply pull out the one multi-tool from their pocket and get to work instantly (**Clean, reusable 1-line hook calls**)!`,hi:`Bijli mistri (Electrician) ke tools se samjhein:

- **Bina Custom Hook Ke (Har Room Mein 10 Khule Pechkas Le Jana)**:
  - Flat 101 mein mistri ne taar katne wala, voltage napne wala aur tape nikala.
  - Flat 102 mein dobara wahi saare 5 auzaar khol kar baitha.
  - Har component mein 20-20 lines ka \`useState\` aur \`useEffect\` copy-paste karna isi tarah thaka dene wala hota hai.
- **Custom Hook (Swiss Army Knife Multi-Tool)**:
  - Mistri ne ek aisa compact all-in-one tool bana liya jisme tester, cutter aur stripper ek sath jude hain (**\`useElectricalTool()\`**).
  - Har flat mein bas pocket se ek tool nikalte hain aur turant kaam shuru ho jata hai (**1-line clean hook call**)!`}},{type:"syntax",heading:{en:"Syntax: Anatomy of a Custom Hook",hi:"Syntax: Custom Hook Banane Ka Standard Format"},body:{en:`### Custom Hook Blueprint:
\`\`\`javascript
import { useState, useEffect } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline; // Returns single boolean
}
\`\`\``,hi:`### Custom Hook Ka Basic Structure:
\`\`\`javascript
import { useState, useEffect } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return isOnline; // Boolean return karta hai
}
\`\`\``}},{type:"example",heading:{en:"Example 1: useLocalStorage Hook (Syncing State with Browser Storage)",hi:"Example 1: useLocalStorage Hook (Browser Storage Se Auto-Sync)"},body:{en:"A production-ready custom hook that behaves just like `useState`, but automatically serializes and persists state to browser `localStorage`.",hi:"Custom hook jo `useState` ki tarah kaam karta hai par data ko automatically `localStorage` mein save rakhta hai."},code:{language:"jsx",filename:"useLocalStorage.js",snippet:`import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // 1. Initialize state with stored value or fallback
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  // 2. Sync to localStorage whenever key or storedValue changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  // Returns identical tuple signature to useState!
  return [storedValue, setStoredValue];
}

// Consuming Component
export default function LocalStorageDemo() {
  const [name, setName] = useLocalStorage("learner_name", "Aman");

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm space-y-3">
      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
        useLocalStorage Demo
      </h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-800 dark:text-slate-200"
      />
      <p className="text-xs text-slate-500">
        Refresh the page! Your input persists in browser storage: <strong>{name}</strong>
      </p>
    </div>
  );
}`}},{type:"example",heading:{en:"Example 2: useDebounce Hook for High-Speed Search Optimization",hi:"Example 2: useDebounce Hook Se Search API Calls Kam Karna"},body:{en:"Delaying search execution until the user stops typing for 400ms, preventing server overload and API rate limiting.",hi:"Typing ke dauran har keystroke par API call rokne ke liye 400ms ka debounce delay lagana."},code:{language:"jsx",filename:"useDebounce.js",snippet:`import React, { useState, useEffect } from "react";

// The Custom Hook: Delays updating debouncedValue until 'delay' ms has passed without changes
export function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timer to update state after specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If 'value' or 'delay' changes before timer completes, clear the timer!
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Consuming Component: Search Bar
export default function DebouncedSearch() {
  const [query, setQuery] = useState("");
  // debouncedQuery only updates 500ms after user stops typing!
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      console.log(\`⚡ Firing backend search API query for: "\${debouncedQuery}"\`);
    }
  }, [debouncedQuery]);

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm space-y-3">
      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
        useDebounce Search
      </h3>

      <input
        type="text"
        placeholder="Type quickly..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white"
      />

      <div className="text-xs space-y-1 font-mono">
        <p className="text-slate-400">Live Input: "{query}"</p>
        <p className="text-indigo-600 dark:text-indigo-400 font-bold">
          Debounced API Query: "{debouncedQuery}"
        </p>
      </div>
    </div>
  );
}`}},{type:"example",heading:{en:"Example 3: useFetch Hook with Loading, Error & Manual Refetch",hi:"Example 3: useFetch Hook (Loading, Error Aur Refetch Support)"},body:{en:"A reusable data fetching hook managing network state, abort signals, and exposing a `refetch` trigger function.",hi:"Production-grade `useFetch` custom hook jo loading, error aur manual refetch support karta hai."},code:{language:"jsx",filename:"useFetch.js",snippet:`import React, { useState, useEffect, useCallback } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Manual trigger to force re-fetch
  const [fetchIndex, setFetchIndex] = useState(0);
  const refetch = useCallback(() => setFetchIndex(i => i + 1), []);

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`Network response error: \${res.status}\`);
        return res.json();
      })
      .then(result => setData(result))
      .catch(err => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [url, fetchIndex]);

  return { data, loading, error, refetch };
}

// Consuming Component
export default function FetchHookDemo() {
  const { data, loading, error, refetch } = useFetch("https://jsonplaceholder.typicode.com/posts/1");

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">useFetch Demo</h3>
        <button
          onClick={refetch}
          className="text-xs px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-medium"
        >
          Refetch ⟳
        </button>
      </div>

      {loading && <p className="text-xs text-indigo-500 animate-pulse">Fetching post...</p>}
      {error && <p className="text-xs text-rose-500">Error: {error}</p>}
      {data && (
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs">
          <p className="font-semibold text-slate-800 dark:text-slate-100">{data.title}</p>
        </div>
      )}
    </div>
  );
}`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Aam Galatiyan Aur Unka Solution"},body:{en:`### 1. Forgetting the 'use' Prefix in the Name
- **Mistake**: Naming your custom hook \`fetchData()\` instead of \`useFetch()\`.
- **Consequence**: ESLint and the React compiler will not recognize it as a hook. You will lose automated linting for the Rules of Hooks, and calling it conditionally won't be flagged!
- **Fix**: Always prefix with lowercase \`use\`.

### 2. Assuming Custom Hooks Share State Universally
- **Mistake**: Thinking that updating state inside a custom hook in Component A updates Component B automatically.
- **Reality**: Each component that calls a custom hook gets its own isolated instance of the hook's state.
- **Fix**: If you need global state sharing, combine custom hooks with **React Context**.

### 3. Turning Plain Helpers into Custom Hooks
- **Mistake**: Writing \`function useCapitalize(str) { return str.toUpperCase(); }\` when no React hooks are used inside.
- **Fix**: If it doesn't call other hooks, keep it as a plain utility function: \`capitalize(str)\`.`,hi:"### 1. Naam Mein 'use' Prefix Bhool Jana\n- **Galati**: Hook ka naam `fetchData()` rakhna `useFetch()` ke bajaye.\n- **Nuksan**: React linter ise hook nahi samjhega aur Rules of Hooks check fail ho jayenge.\n- **Solution**: Hamesha lowercase `use` se naam shuru karein.\n\n### 2. Sochna Ki Custom Hook Se State Globally Share Hoti Hai\n- **Galati**: Sochna ki ek component mein hook state badalne par doosre component mein bhi badal jayegi.\n- **Sach**: Har component ko apni alag independent copy milti hai.\n- **Solution**: Global sharing ke liye custom hook ko Context API ke sath jodein.\n\n### 3. Faltu Functions Ko Custom Hook Banana\n- **Galati**: Aise function par `use` lagana jisme koi `useState` ya `useEffect` hai hi nahi.\n- **Solution**: Agar koi hook use nahi ho raha toh use normal utility function banayein."}},{type:"tip",heading:{en:"Best Practices: Custom Hook Design",hi:"Custom Hook Design Ke Best Practices"},body:{en:"1. **Return Tuple Arrays for 1-2 Values**: Like `useState`, returning `[val, setVal]` lets consumers name the destructured variables anything they like without aliasing.\n2. **Return Objects for 3+ Values**: Returning `{ data, loading, error, refetch }` allows consumers to destructure only the specific properties they need without caring about argument order.\n3. **Keep Custom Hooks Focused on a Single Responsibility**: A hook should do one thing well (e.g. `useWindowSize`, `useDebounce`, `useLocalStorage`).\n4. **Clean Up Effects Inside Custom Hooks**: If your custom hook sets up timers, listeners, or socket connections, always clean them up in the hook's `useEffect` return!",hi:"1. **1-2 Values Ke Liye Tuple Array**: `[val, setVal]` return karne se consumer apni marzi ka naam rakh sakta hai.\n2. **3 Ya Zyada Values Ke Liye Object**: `{ data, loading, error }` return karne se consumer sirf zaroori properties destructure kar sakta hai.\n3. **Single Responsibility**: Hook sirf ek specific kaam kare (jaise sirf storage ya sirf debounce).\n4. **Cleanup Zaroor Karein**: Agar hook ke andar timer ya listener laga hai, toh hook ke `useEffect` mein cleanup zaroor return karein."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Top Interview Sawaal Aur Jawab"},body:{en:`### Q1: What is a custom hook in React, and why do we build them?
**Answer**:
A custom hook is a JavaScript function whose name starts with \`use\` and that can call other React hooks. They are built to extract and reuse stateful logic (like data fetching, event subscriptions, or form handling) across multiple components without duplicating code, following the DRY principle and keeping components lean and UI-focused.

### Q2: Do two components using the exact same custom hook share the same state?
**Answer**:
No. Custom hooks share stateful *logic*, not state itself. Each component calling a custom hook receives an entirely independent, isolated set of state variables and lifecycle hooks. To share state values globally, custom hooks must be combined with the Context API or an external store like Redux Toolkit.

### Q3: Why must custom hook names strictly start with the prefix 'use'?
**Answer**:
The \`use\` prefix is a strict convention enforced by the React compiler and the official ESLint plugin (\`eslint-plugin-react-hooks\`). It tells tooling that the function follows the Rules of Hooks (i.e. cannot be called inside loops or conditions), allowing linters to statically verify that hooks are called consistently across all renders.`,hi:`### Q1: React mein custom hook kya hota hai aur ise kyun banate hain?
**Jawab**:
Custom hook ek aisi JS function hoti hai jiska naam \`use\` se shuru hota hai aur jo doosre React hooks ko call kar sakti hai. Iska use component ke stateful logic (jaise API call, local storage, debounce) ko alag karke reusable banane ke liye hota hai taaki code duplicate na ho.

### Q2: Kya do components same custom hook use karne par ek hi state share karte hain?
**Jawab**:
Nahi. Custom hooks logic share karte hain, state nahi. Har component ko apna alag state instance milta hai. Global state sharing ke liye Context API ya Redux ka use karna padta hai.

### Q3: Custom hook ka naam 'use' se shuru hona kyun zaroori hai?
**Jawab**:
'use' prefix ek convention hai jise React compiler aur ESLint enforce karte hain. Isse linter ko pata chalta hai ki yeh function Rules of Hooks follow karta hai aur kisi condition ya loop ke andar call nahi hona chahiye.`}},{type:"summary",heading:{en:"Quick Summary: Custom Hooks",hi:"Quick Summary: Custom Hooks"},body:{en:`- **Reusable Stateful Logic**: Extracts repetitive hook patterns into clean, testable functions.
- **Must Start with 'use'**: Enforces Rules of Hooks via ESLint and React compiler.
- **Independent State**: Each component calling a custom hook receives its own isolated state.
- **Return Flexible Data**: Return arrays for 1-2 values, objects for 3+ properties.
- **Clean Up Resources**: Always handle effect cleanups inside custom hooks.`,hi:`- **Reusable Logic**: Baar-baar use hone wale hooks ko ek function mein pack karta hai.
- **'use' Prefix Zaroori**: Linter aur React compiler ko rules check karne mein madad karta hai.
- **Independent State**: Har component ko apna alag state milta hai.
- **Flexible Return**: 1-2 values ke liye array aur zyada ke liye object return karein.
- **Cleanup Return Karein**: Listeners aur timers ko hook ke andar hi clean karein.`}}],quiz:[{q:{en:"Do two components calling the exact same custom hook share the same state in memory?",hi:"Kya do components jo same custom hook call karte hain, memory mein wahi same state share karte hain?"},options:[{en:"Yes, all custom hooks create a global singleton state automatically",hi:"Haan, global singleton ban jata hai"},{en:"No, each component receives its own independent instance of the hook's state and lifecycle",hi:"Nahi, har component ko hook ke state aur lifecycle ki apni alag independent copy milti hai"},{en:"Only in production builds",hi:"Sirf production mein"},{en:"Only if the hook is exported as default",hi:"Sirf default export mein"}],answerIndex:1,explanation:{en:"Custom hooks share stateful logic, not state. Each component invocation creates an independent set of state variables.",hi:"Custom hooks logic share karte hain, state nahi. Har component ko apna alag state variable milta hai."}},{q:{en:"Why must custom hooks strictly start with the lowercase 'use' prefix (e.g. useDebounce)?",hi:"Custom hooks ka naam strictly lowercase 'use' prefix se shuru hona kyun zaroori hai?"},options:[{en:"It is required by the JavaScript V8 engine",hi:"V8 engine ka niyam hai"},{en:"It enables ESLint and React tools to enforce the Rules of Hooks automatically",hi:"Yeh ESLint aur React tools ko automatically Rules of Hooks enforce karne ki permission deta hai"},{en:"It converts the function into a React class",hi:"React class bana deta hai"},{en:"It automatically saves the function to localStorage",hi:"localStorage mein save karta hai"}],answerIndex:1,explanation:{en:"The 'use' prefix allows static analysis tools (like eslint-plugin-react-hooks) to identify hook calls and ensure they follow hook rules.",hi:"'use' prefix se ESLint aur React samajhte hain ki yeh hook hai aur Rules of Hooks verify karte hain."}},{q:{en:"When should you NOT turn a function into a custom hook?",hi:"Kisi function ko custom hook kab NAHI banana chahiye?"},options:[{en:"When the function returns an object",hi:"Jab function object return kare"},{en:"When the function does not call any existing React hooks (it should be a plain utility function instead)",hi:"Jab function ke andar koi bhi React hook call na ho raha ho (ise normal utility function hona chahiye)"},{en:"When the function is asynchronous",hi:"Jab function async ho"},{en:"When the function accepts arguments",hi:"Jab function arguments accept kare"}],answerIndex:1,explanation:{en:"If a function does not utilize any React hooks, it has no need for the 'use' prefix and should simply be a plain JavaScript utility function.",hi:"Agar function ke andar koi React hook use nahi ho raha, toh use normal utility function banana chahiye, custom hook nahi."}},{question:{en:"What is the core architectural purpose of Building Custom Hooks for Reusable Logic in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling building custom hooks for reusable logic with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Building Custom Hooks for Reusable Logic establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Building Custom Hooks for Reusable Logic directly resolve?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Building Custom Hooks for Reusable Logic, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Building Custom Hooks for Reusable Logic, how is its mental model best conceptualized through real-world analogies?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Building Custom Hooks for Reusable Logic, what syntactic convention is essential to prevent runtime errors?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Building Custom Hooks for Reusable Logic?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Building Custom Hooks for Reusable Logic be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Building Custom Hooks for Reusable Logic impact application memory and CPU consumption?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Building Custom Hooks for Reusable Logic?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Building Custom Hooks for Reusable Logic?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Building Custom Hooks for Reusable Logic?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Building Custom Hooks for Reusable Logic, what must the test suite assert?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Building Custom Hooks for Reusable Logic?",hi:"Modular design Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Building Custom Hooks for Reusable Logic be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Building Custom Hooks for Reusable Logic properly belong and execute?",hi:"Full-stack MERN architecture mein Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Building Custom Hooks for Reusable Logic in production?",hi:"Production mein Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Building Custom Hooks for Reusable Logic?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Building Custom Hooks for Reusable Logic?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}},{question:{en:"Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Building Custom Hooks for Reusable Logic?",hi:"Custom Hooks Banana (useFetch, useDebounce, useLocalStorage) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"},options:[{en:"To prevent memory leaks where unreachable or orphaned objects remain retained in heap memory, causing gradual performance degradation and crashes",hi:"Memory leaks rokne ke liye taaki unneeded objects RAM mein jama na hon aur server crash na ho"},{en:"To delete the client's local disk partition",hi:"Client ka local disk partition delete karne ke liye"},{en:"Because JavaScript engines allow only 5 variables in RAM",hi:"JS engine sirf 5 variables allow karta hai"},{en:"Cleanup is unnecessary because garbage collection handles 100% of event listeners automatically",hi:"Cleanup ki zaroorat nahi hoti"}],correctAnswer:0,explanation:{en:"Unclosed connections and dangling event listeners create references that prevent garbage collection, leading to severe memory leaks over time.",hi:"Dangling listeners aur unclosed connections memory leaks banate hain jo V8 heap ko exhaust karke process crash kar dete hain."}}]};export{e as default};
