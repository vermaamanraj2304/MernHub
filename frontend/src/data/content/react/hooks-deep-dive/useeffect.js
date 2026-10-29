export default {
  id: "react-hooks-useeffect",
  title: {
    en: "useEffect Hook: Side Effects & Lifecycle",
    hi: "useEffect Hook: Side Effects & Lifecycle Management",
  },
  difficulty: "Intermediate",
  readTime: 12,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is a Side Effect & Why useEffect?",
        hi: "1. Side Effect Kya Hota Hai Aur useEffect Ki Zaroorat Kyun Hai?",
      },
      body: {
        en: `In React, the primary responsibility of a component function is to take props and state and return JSX. React components must be **pure functions** during rendering—they should not make network requests, set timers, or mutate the browser DOM directly in the body of the function.

A **Side Effect** (or simply "effect") is any operation that affects something outside the scope of the current function being executed:
- Fetching data from a backend REST or GraphQL API
- Subscribing to WebSockets or chat services
- Setting up timers with \`setInterval\` or \`setTimeout\`
- Manually manipulating the browser DOM (e.g. setting \`document.title\`)
- Reading or writing to \`localStorage\`

**\`useEffect\`** is the built-in React hook designed specifically to synchronize your component with external systems **after** React has updated the screen.`,
        hi: `React mein component function ka main kaam hota hai: props aur state lekar JSX return karna. Render hote waqt component ko **pure** rehna chahiye—yani rendering ke beech mein direct API call karna ya timer lagana mana hota hai.

**Side Effect** har us kaam ko kehte hain jo component ke render hone ke dauran bahar ki duniya se interact karta hai:
- Backend API se data fetch karna
- WebSockets ya socket.io chat room join karna
- \`setInterval\` ya \`setTimeout\` timer lagana
- Browser ka \`document.title\` badalna
- \`localStorage\` mein data save karna

**\`useEffect\`** React ka woh hook hai jo screen render hone ke **baad** in side effects ko surakshit tareeqe se chalata hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Dependency Array & The Cleanup Function",
        hi: "2. Dependency Array Ke Niyam Aur Cleanup Function",
      },
      body: {
        en: `The behavior of \`useEffect\` is governed entirely by its second argument: the **Dependency Array**.

### The 3 Modes of the Dependency Array:
1. **No Dependency Array**:
   \`useEffect(() => { ... });\`
   Runs after **every single render** of the component. (Dangerous! Frequently causes performance bottlenecks).
2. **Empty Dependency Array (\`[]\`)**:
   \`useEffect(() => { ... }, []);\`
   Runs **only once** after the initial mount (similar to \`componentDidMount\` in class components).
3. **With Dependencies (\`[id, filter]\`)**:
   \`useEffect(() => { ... }, [id, filter]);\`
   Runs on initial mount AND re-runs whenever any dependency (\`id\` or \`filter\`) changes reference (\`Object.is\` check).

### The Cleanup Function:
If your effect returns a function, React executes this **cleanup function**:
1. Before re-running the effect with new dependencies.
2. When the component unmounts (leaves the screen).
Use cleanup to unsubscribe from sockets, clear timers (\`clearInterval\`), or abort pending network requests (\`abortController.abort()\`).`,
        hi: `\`useEffect\` ka behavior uske doosre argument yani **Dependency Array** par nirbhar karta hai.

### Dependency Array Ke 3 Modes:
1. **Bina Dependency Array Ke**:
   \`useEffect(() => { ... });\`
   Har ek render ke baad chalta hai. (Khatarnak: Isse performance slow ho sakti hai).
2. **Empty Array (\`[]\`)**:
   \`useEffect(() => { ... }, []);\`
   Sirf **ek baar** chalta hai jab component screen par pehli baar mount hota hai.
3. **Dependencies Ke Sath (\`[userId]\`)**:
   \`useEffect(() => { ... }, [userId]);\`
   Pehle mount par chalta hai aur jab bhi \`userId\` badalta hai tab dobara chalta hai.

### Cleanup Function (Safai Karne Wala Function):
Agar aapka effect ek function return karta hai, toh React use **cleanup function** kehta hai:
1. Naye effect chalne se pehle purane effect ko saaf karta hai.
2. Jab component screen se unmount (gayab) hota hai.
Iska use timers rokne (\`clearInterval\`), sockets disconnect karne ya API calls ko abort karne ke liye hota hai.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Hotel Guest Check-In & Check-Out",
        hi: "Real-Life Analogy: Hotel Room Mein Check-In Aur Check-Out Ka Niyam",
      },
      body: {
        en: `Think of staying at an Indian hotel (Oyo or Taj):

- **Mounting (Guest Checks In)**:
  - You open the room door, insert your keycard into the master slot, switch on the AC, and turn on the television (**Effect executes on mount**).
- **Dependency Update (Changing Preferences)**:
  - At 2:00 PM you feel cold, so you change the AC remote from 18°C to 24°C (**Effect re-runs because dependency changed**).
- **Unmounting & Cleanup (Guest Checks Out)**:
  - At 11:00 AM on check-out day, you don't leave the AC running, water tap open, and TV blaring forever!
  - You turn off all lights, pull out the keycard, lock the door, and hand the key to reception (**The Cleanup Function runs on unmount to prevent resource leaks**)!`,
        hi: `Hotel ke kamre mein rukne se samjhein:

- **Mounting (Check-In Karna)**:
  - Aap room mein aate hain, keycard slot mein lagate hain, AC on karte hain aur TV chalu karte hain (**Mount hone par effect chalta hai**).
- **Dependency Change (AC Ka Temperature Badlna)**:
  - Dopahar ko thand lagti hai toh aap AC 18 se badal kar 24 kar dete hain (**Dependency badalne par effect dobara execute hua**).
- **Unmounting & Cleanup (Check-Out Karna)**:
  - Check-out karte waqt aap AC aur paani ka nal khula chhod kar nahi bhagte.
  - Aap light band karte hain, TV off karte hain aur reception par chabi jama karte hain (**Cleanup function resource leaks rokta hai**)!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax & The Async Function Rule",
        hi: "Syntax: useEffect Mein Async Functions Ka Sahi Rule",
      },
      body: {
        en: `### The Golden Rule: useEffect Cannot Directly Take an Async Function
\`\`\`javascript
// ❌ STRICTLY FORBIDDEN:
// useEffect expects its callback to return either nothing or a cleanup function!
// An async function returns a Promise, not a cleanup function!
useEffect(async () => {
  const data = await fetchUsers();
}, []);

// ✅ CORRECT PATTERN:
// Declare an inner async function and call it immediately:
useEffect(() => {
  let isMounted = true;

  async function loadData() {
    const data = await fetchUsers();
    if (isMounted) setUsers(data);
  }

  loadData();

  // Return synchronous cleanup function
  return () => {
    isMounted = false;
  };
}, []);
\`\`\``,
        hi: `### Zaroori Niyam: useEffect Callback Ko Direct \`async\` Na Banayein
\`\`\`javascript
// ❌ BILKUL GALAT:
// useEffect ko cleanup function chahiye hota hai, lekin async function Promise return karta hai!
useEffect(async () => {
  const res = await fetch("/api");
}, []);

// ✅ BILKUL SAHI TAREENA:
// Andar ek async function banayein aur use call karein:
useEffect(() => {
  async function fetchData() {
    const res = await fetch("/api");
    const data = await res.json();
    setData(data);
  }

  fetchData();

  // Cleanup function synchronous hona chahiye
  return () => {
    console.log("Cleanup executed");
  };
}, []);
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Safe Data Fetching with AbortController",
        hi: "Example 1: AbortController Ke Sath Safe API Data Fetching",
      },
      body: {
        en: `Fetching user data from a REST API with loading, error, and race-condition prevention using browser-native \`AbortController\`.`,
        hi: `API call ke dauran race conditions aur memory leaks se bachne ke liye \`AbortController\` ka use karna.`,
      },
      code: {
        language: "jsx",
        filename: "UserDataFetcher.jsx",
        snippet: `import React, { useState, useEffect } from "react";

export default function UserDataFetcher({ userId = 1 }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Create AbortController to cancel request if userId changes or unmounts
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function fetchUser() {
      try {
        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/users/\${userId}\`,
          { signal: controller.signal } // Link abort signal
        );
        if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        // Ignore deliberate abort cancellations
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    // 2. Cleanup: Cancel in-flight HTTP request on unmount or dependency change
    return () => {
      controller.abort();
    };
  }, [userId]); // Re-runs whenever userId prop changes

  if (loading) return <p className="text-xs text-indigo-500 animate-pulse">Loading user profile...</p>;
  if (error) return <p className="text-xs text-rose-500">Error: {error}</p>;
  if (!user) return null;

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm">
      <h3 className="font-bold text-slate-800 dark:text-white text-sm">{user.name}</h3>
      <p className="text-xs text-slate-400">{user.email}</p>
      <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-300">
        📍 {user.address?.city}
      </span>
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Window Event Listener with Cleanup",
        hi: "Example 2: Window Resize Event Listener Aur Timer Cleanup",
      },
      body: {
        en: `Listening to window \`resize\` events to detect viewport dimensions, removing the listener in cleanup to prevent massive memory leaks.`,
        hi: `Window resize event ko sunna aur cleanup mein \`removeEventListener\` chala kar memory leak rokna.`,
      },
      code: {
        language: "jsx",
        filename: "WindowDimensionTracker.jsx",
        snippet: `import React, { useState, useEffect } from "react";

export default function WindowDimensionTracker() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // 1. Attach native browser window listener
    window.addEventListener("resize", handleResize);
    console.log("Attached window resize listener.");

    // 2. CRITICAL CLEANUP: Remove listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("Cleaned up window resize listener!");
    };
  }, []); // Empty array: Attach once on mount, remove on unmount

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm space-y-2">
      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
        Viewport Dimensions
      </h3>
      <div className="flex gap-4 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 flex-1 text-center">
          <span className="text-slate-400 block text-[10px]">Width</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{dimensions.width}px</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 flex-1 text-center">
          <span className="text-slate-400 block text-[10px]">Height</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">{dimensions.height}px</span>
        </div>
      </div>
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Document Title & LocalStorage Sync on Dependency Change",
        hi: "Example 3: State Badalne Par Document Title Aur LocalStorage Sync",
      },
      body: {
        en: `Synchronizing browser tab document title and persisting theme state to localStorage whenever state changes.`,
        hi: `Theme ya state badalne par browser title aur localStorage ko automatically sync rakhna.`,
      },
      code: {
        language: "jsx",
        filename: "ThemePreferences.jsx",
        snippet: `import React, { useState, useEffect } from "react";

export default function ThemePreferences() {
  // Read initial value from localStorage or fallback
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("mern_theme") || "light";
  });

  // Effect runs on mount AND whenever 'theme' state changes
  useEffect(() => {
    // 1. Sync to browser localStorage
    localStorage.setItem("mern_theme", theme);

    // 2. Sync to browser tab title
    document.title = \`MERN Hub (\${theme.toUpperCase()} Mode)\`;

    // 3. Update DOM class on root html tag
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]); // Dependency: theme

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
        Appearance Settings
      </h3>
      <p className="text-xs text-slate-500">
        Current Theme: <strong className="capitalize">{theme}</strong>
      </p>

      <button
        onClick={() => setTheme(prev => (prev === "light" ? "dark" : "light"))}
        className="w-full py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition"
      >
        Toggle to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
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
        en: `### 1. The Infinite Re-render Loop
- **Mistake**: Calling a state setter inside \`useEffect\` without a dependency array, or including that same state in the dependency array:
  \`useEffect(() => { setCount(count + 1); }, [count]);\`
- **Why**: Effect updates \`count\` -> triggers re-render -> effect runs again -> triggers re-render -> infinite crash!
- **Fix**: Use functional updaters or remove redundant setters from effect dependencies.

### 2. Passing an \`async\` Callback to \`useEffect\`
- **Mistake**: \`useEffect(async () => { ... }, [])\`.
- **Why**: Async functions return a Promise. React expects the effect return value to be a synchronous cleanup function.
- **Fix**: Define the async function inside the effect and call it: \`useEffect(() => { async function run() { ... } run(); }, [])\`.

### 3. Missing Dependencies (The Stale Closure Bug)
- **Mistake**: Using a prop or state variable inside the effect but omitting it from the \`[]\` array to avoid re-running.
- **Consequence**: The effect closes over the stale initial value from the first render forever!
- **Fix**: Always include all reactive variables used inside the effect in the dependency array.`,
        hi: `### 1. Infinite Re-render Loop Bug
- **Galati**: \`useEffect(() => { setCount(count + 1); }, [count]);\` likhna.
- **Nuksan**: Effect count badhata hai -> re-render hota hai -> effect dobara chalta hai -> app freeze ho jaati hai!
- **Solution**: Dependency array mein wahi state na rakhein jise aap effect ke andar update kar rahe hain.

### 2. \`useEffect\` Callback Ko Direct \`async\` Banana
- **Galati**: \`useEffect(async () => { ... })\` likhna.
- **Wajah**: Async function Promise return karta hai, cleanup function nahi.
- **Solution**: Andar alag se async function banayein aur call karein.

### 3. Stale Closure (Dependencies Miss Karna)
- **Galati**: Effect ke andar state use karna lekin \`[]\` array mein na daalna.
- **Nuksan**: Effect hamesha pehle render wali purani value use karta rehta hai.
- **Solution**: Effect ke andar use hone wale saare variables ko dependency array mein daalein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: useEffect Architecture",
        hi: "useEffect Ke Best Practices",
      },
      body: {
        en: `1. **Always Return Cleanup for Subscriptions & Timers**: Every \`addEventListener\` must have a matching \`removeEventListener\`; every \`setInterval\` must have \`clearInterval\`.
2. **Use AbortController for Fetch Requests**: Canceling abandoned HTTP requests prevents updating state on unmounted components and avoids network race conditions.
3. **Don't Use useEffect for Transforming Data**: If you can calculate a value from existing props or state, compute it directly during render: \`const filtered = items.filter(...)\`. Don't store it in a separate state with an effect!
4. **Split Unrelated Logic into Multiple useEffect Hooks**: Don't put data fetching, analytics tracking, and window event listeners into a single giant 100-line effect. Create separate, focused \`useEffect\` blocks for each responsibility.`,
        hi: `1. **Hamesha Cleanup Return Karein**: Har \`setInterval\` ke sath \`clearInterval\` aur listener ke sath \`removeEventListener\` zaroor lagayein.
2. **Data Fetching Mein AbortController Use Karein**: User ke page chhodne par network call ko cancel kar dena best practice hai.
3. **Calculations Ke Liye useEffect Na Lagayein**: Jo data render time par calculate ho sakta hai (jaise \`items.filter()\`), uske liye alag state aur effect na banayein.
4. **Alag Kaamon Ke Liye Alag useEffect Banayein**: API call, timer aur document title ko ek hi effect mein na thoonsein; alag-alag chhote \`useEffect\` blocks use karein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Top Interview Sawaal Aur Jawab",
      },
      body: {
        en: `### Q1: Why can't the useEffect callback function be async?
**Answer**:
React expects the return value of a \`useEffect\` callback to be either \`undefined\` or a synchronous **cleanup function** that it can invoke when the component unmounts or before re-running the effect. An \`async\` function in JavaScript inherently returns a \`Promise\`. If React tried to invoke the returned Promise as a cleanup function, it would fail with a TypeError: \`destructor is not a function\`.

### Q2: How does React determine whether an effect should re-run based on the dependency array?
**Answer**:
React performs a shallow comparison of each dependency in the array against its value from the previous render using the \`Object.is()\` algorithm. If any dependency has changed reference or value (\`Object.is(prev, next) === false\`), React queues the effect to run after the current render's DOM commit.

### Q3: What is the difference between an empty dependency array [] and omitting the dependency array entirely?
**Answer**:
- **Empty Array (\`[]\`)**: The effect runs exactly once after the initial mount and cleans up on unmount. It never re-runs on subsequent state/prop changes.
- **Omitted Array**: The effect runs after **every single render** (mount and every update), which is computationally expensive and can easily cause infinite loops if the effect modifies state.`,
        hi: `### Q1: useEffect callback function \`async\` kyun nahi ho sakta?
**Jawab**:
React expect karta hai ki effect callback ya toh kuch na return kare ya ek synchronous **cleanup function** return kare. Async function hamesha ek **Promise** return karta hai. React Promise ko function ki tarah execute nahi kar sakta, isliye error aata hai.

### Q2: React kaise decide karta hai ki effect dobara chalna chahiye ya nahi?
**Jawab**:
React purani dependencies aur nayi dependencies ka \`Object.is()\` se shallow comparison karta hai. Agar ek bhi dependency ka reference ya value badla ho, toh React render ke baad effect ko dobara chalata hai.

### Q3: Empty array \`[]\` aur bina array ke useEffect mein kya farq hai?
**Jawab**:
- **Empty Array (\`[]\`)**: Sirf ek baar initial mount par chalta hai.
- **Bina Array Ke**: Har ek single render ke baad chalta hai jo performance ke liye bohot heavy hota hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: useEffect Hook",
        hi: "Quick Summary: useEffect Hook",
      },
      body: {
        en: `- **Side Effects Manager**: Synchronizes components with external systems after render.
- **Dependency Array**: Controls execution (Omitted = every render; \`[]\` = mount only; \`[deps]\` = when deps change).
- **Cleanup Function**: Essential for canceling timers, sockets, and aborting network requests.
- **Never Async Directly**: Declare inner async functions inside the effect callback.
- **AbortController**: Industry standard for canceling in-flight fetch requests.`,
        hi: `- **Side Effects Manager**: Render hone ke baad external systems se sync karta hai.
- **Dependencies**: No array = har render par; \`[]\` = sirf mount par; \`[deps]\` = value badalne par.
- **Cleanup Function**: Timers, sockets aur network calls ko band karne ke liye zaroori hai.
- **Direct Async Na Karein**: Andar alag se async function banayein.
- **AbortController**: Pending API requests ko cancel karne ka standard tareeka hai.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "Why is useEffect(async () => { await fetch('/api'); }, []) invalid in React?",
      "hi": "React mein useEffect(async () => { await fetch('/api'); }, []) invalid kyun hai?"
    },
    "options": [
      {
        "en": "fetch() is not supported in React",
        "hi": "fetch support nahi hai"
      },
      {
        "en": "An async function returns a Promise, but React expects useEffect to return either undefined or a synchronous cleanup function",
        "hi": "Async function Promise return karta hai jabki React cleanup function expect karta hai"
      },
      {
        "en": "Empty dependency arrays do not allow network requests",
        "hi": "Empty array mein network call allow nahi hai"
      },
      {
        "en": "It forces the component to render on the server",
        "hi": "Server par render force karta hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Async functions return a Promise. React expects the return value to be a synchronous cleanup function.",
      "hi": "Async function Promise return karta hai, jabki React cleanup function expect karta hai isliye direct async allow nahi hai."
    }
  },
  {
    "q": {
      "en": "When does the cleanup function returned by useEffect execute?",
      "hi": "useEffect dwara return kiya gaya cleanup function kab chalta hai?"
    },
    "options": [
      {
        "en": "Only when the browser window closes",
        "hi": "Sirf browser band hone par"
      },
      {
        "en": "Before re-running the effect with new dependencies, and when the component unmounts",
        "hi": "Naye dependencies ke sath effect chalne se pehle aur component ke unmount hone par"
      },
      {
        "en": "Every time the user moves their mouse",
        "hi": "Mouse move hone par"
      },
      {
        "en": "Immediately before the initial mount",
        "hi": "Mount se pehle"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "React runs cleanup functions to tear down the previous effect before executing the next one, and when the component is removed from the DOM.",
      "hi": "Purana effect hatane ke liye naye effect se pehle aur component unmount hone par cleanup execute hota hai."
    }
  },
  {
    "q": {
      "en": "What happens if you omit the dependency array entirely: useEffect(() => { ... })?",
      "hi": "Agar aap dependency array ko poori tarah chhod dein (useEffect(() => { ... })) toh kya hoga?"
    },
    "options": [
      {
        "en": "The effect will never execute",
        "hi": "Effect kabhi nahi chalega"
      },
      {
        "en": "The effect will execute after every single render of the component",
        "hi": "Effect component ke har ek single render ke baad chalega"
      },
      {
        "en": "React will throw a compilation error",
        "hi": "Compilation error aayega"
      },
      {
        "en": "It runs only on Thursdays",
        "hi": "Sirf ek baar chalega"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Without a dependency array, React executes the effect callback after the initial mount and after every subsequent update render.",
      "hi": "Bina dependency array ke effect har ek re-render ke baad execute hota hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of useEffect Hook: Side Effects & Lifecycle in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein useEffect Hook: Side Effects & Lifecycle Management ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling useeffect hook: side effects & lifecycle with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath useEffect Hook: Side Effects & Lifecycle Management ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "useEffect Hook: Side Effects & Lifecycle establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does useEffect Hook: Side Effects & Lifecycle directly resolve?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without useEffect Hook: Side Effects & Lifecycle, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about useEffect Hook: Side Effects & Lifecycle, how is its mental model best conceptualized through real-world analogies?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing useEffect Hook: Side Effects & Lifecycle, what syntactic convention is essential to prevent runtime errors?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with useEffect Hook: Side Effects & Lifecycle?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should useEffect Hook: Side Effects & Lifecycle be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye useEffect Hook: Side Effects & Lifecycle Management ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of useEffect Hook: Side Effects & Lifecycle impact application memory and CPU consumption?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within useEffect Hook: Side Effects & Lifecycle?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in useEffect Hook: Side Effects & Lifecycle?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in useEffect Hook: Side Effects & Lifecycle?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for useEffect Hook: Side Effects & Lifecycle, what must the test suite assert?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in useEffect Hook: Side Effects & Lifecycle?",
      "hi": "Modular design useEffect Hook: Side Effects & Lifecycle Management mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should useEffect Hook: Side Effects & Lifecycle be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par useEffect Hook: Side Effects & Lifecycle Management ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does useEffect Hook: Side Effects & Lifecycle properly belong and execute?",
      "hi": "Full-stack MERN architecture mein useEffect Hook: Side Effects & Lifecycle Management kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with useEffect Hook: Side Effects & Lifecycle in production?",
      "hi": "Production mein useEffect Hook: Side Effects & Lifecycle Management ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for useEffect Hook: Side Effects & Lifecycle?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in useEffect Hook: Side Effects & Lifecycle?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in useEffect Hook: Side Effects & Lifecycle?",
      "hi": "useEffect Hook: Side Effects & Lifecycle Management mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
