export default {
  id: "int-common-coding-problems",
  title: {
    en: "Top 10 Live Coding Challenges in MERN Interviews",
    hi: "Top 10 Live Coding Challenges in MERN Interviews",
  },
  difficulty: "Intermediate",
  readTime: 16,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Machine Coding Round Mental Model",
        hi: "1. Machine Coding Round Ka Mental Model: Live Evaluation Kya Hai",
      },
      body: {
        en: `In modern technical interviews at top product companies (such as Uber, Amazon, Atlassian, Swiggy, and Razorpay), standard LeetCode DSA questions are increasingly complemented or replaced by **Machine Coding Rounds** and **JavaScript Utility Polyfill Challenges**.

### What Interviewers Really Evaluate:
1. **Clean Code & Modularity**: Do you write readable, self-documenting code with meaningful variable names, or messy hacky scripts?
2. **Edge Case Resilience**: Do you proactively handle \`null\`, \`undefined\`, empty arrays, circular references, and negative delays without being prompted?
3. **Context & Scope Preservation**: Do you preserve \`this\` and arguments correctly using \`fn.apply(this, args)\`?
4. **Time & Space Complexity**: Can you implement utilities in optimal $O(1)$ or $O(N)$ time without unneeded memory allocations?
5. **Practical Production Awareness**: For React hooks, do you clean up timers and abort network controllers to prevent memory leaks?`,
        hi: `Top tech companies mein LeetCode DSA ke saath-saath **Machine Coding Rounds** liye jaate hain jahan aapko live screen-share par production-grade JavaScript utilities aur custom hooks code karne hote hain:

### Interviewer Ke 5 Mukhya Checkpoints:
1. **Clean Code**: Readable aur modular code jo production mein deploy kiya ja sake.
2. **Edge Cases**: \`null\`, \`undefined\`, circular references, aur empty inputs ko pehle se handle karna.
3. **\`this\` Context**: Callbacks mein \`this\` aur arguments ko \`apply/bind\` se sahi preserve karna.
4. **Time Complexity**: Optimal $O(1)$ ya $O(N)$ time aur memory complexity achieve karna.
5. **Memory Safety**: React hooks aur timers mein memory leaks ko unmount par cleanup karna.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Top 10 High-Frequency Machine Coding Challenges",
        hi: "2. MERN Interviews Ke Top 10 Machine Coding Challenges",
      },
      body: {
        en: `These 10 challenges represent 90%+ of all JavaScript & React machine coding problems asked in interviews:

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│               THE TOP 10 MERN MACHINE CODING CHALLENGES                │
│                                                                        │
│   1. debounce(fn, delay, immediate) with cancel/flush methods          │
│   2. throttle(fn, limit) with leading and trailing options             │
│   3. deepClone(obj) supporting circular references, Dates, & RegExps   │
│   4. flattenArray(arr, depth) recursive & iterative variants           │
│   5. Promise.allSettled(promises) polyfill                             │
│   6. Express Token Bucket Rate Limiter custom middleware               │
│   7. LRU Cache (Least Recently Used) with O(1) get & put               │
│   8. React usePrevious(value) custom hook                              │
│   9. React useFetch(url) with cache, retry, & AbortController          │
│  10. Custom EventEmitter class (on, off, emit, once)                   │
└────────────────────────────────────────────────────────────────────────┘
\`\`\``,
        hi: `Ye 10 coding challenges tech interviews mein sabse zyada puche jaate hain:
1. Debounce function with cancel
2. Throttle function with leading/trailing
3. Deep clone (with circular references)
4. Array flattening utility
5. Promise.allSettled polyfill
6. Token bucket rate limiter middleware
7. LRU Cache class ($O(1)$ get & put)
8. React \`usePrevious\` hook
9. React \`useFetch\` hook with abort
10. Custom \`EventEmitter\` class`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Master Chef Practical Culinary Audition",
        hi: "Real-Life Analogy: 5-Star Hotel Ka Master Chef Audition (Live Coding)",
      },
      body: {
        en: `Imagine interviewing for Head Chef at a luxury hotel in Mumbai:

- **The Written DSA Exam (Theoretical Knowledge)**:
  The interviewer asks you the chemical boiling point of water and the history of saffron. Good to know, but it does not prove you can actually cook!
- **The Live Machine Coding Round (The Practical Kitchen Trial)**:
  The head judge puts a sharp knife, a bag of onions, and a stove in front of you and says:
  *"Chop 5 onions into exact 2mm uniform dices, roll 3 perfectly round paper-thin phulkas, and prepare a smooth hollandaise sauce without curdling within 10 minutes."*
  They are watching:
  1. Your knife grip (**Code hygiene and naming conventions**).
  2. How clean your cutting board stays (**Memory management and cleanup**).
  3. Whether you taste your seasoning before serving (**Testing edge cases and running assertions**).`,
        hi: `5-Star Hotel mein chef ke audition ka example dekhein:

- **DSA Theory**: Kitabon se masala recipe ki history sunana.
- **Machine Coding Trial**: Interviewer aapke aage pyaz, chulha aur knife rakh deta hai aur bolta hai: *"3 minute mein barabar 2mm ke pyaz kaat ke dikhao aur gol roti banao."*
  Wo dekhte hain:
  1. Aapka knife pakadne ka tareeqa (**Code style aur hygiene**).
  2. Kitchen slab kitna saaf rehta hai (**Memory leaks aur cleanup**).
  3. Kya aap serve karne se pehle namak check karte hain (**Edge cases aur testing**).`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Challenge 1 & 2: Debounce & Throttle Implementation",
        hi: "Challenge 1 & 2: Debounce Aur Throttle Ka Complete Implementation",
      },
      body: {
        en: `### 1. Robust Debounce with Cancel & Immediate Support:
\`\`\`javascript
/**
 * Debounce: Delays execution until 'delay' ms have elapsed since last invocation.
 */
export function debounce(fn, delay, immediate = false) {
  let timerId = null;

  function debounced(...args) {
    const context = this;
    const callNow = immediate && !timerId;

    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    }, delay);

    if (callNow) {
      fn.apply(context, args);
    }
  }

  // Cancel pending execution
  debounced.cancel = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
}
\`\`\`

### 2. Robust Throttle with Timestamp:
\`\`\`javascript
/**
 * Throttle: Guarantees fn executes at most once every 'limit' ms.
 */
export function throttle(fn, limit) {
  let lastRan = 0;
  let timerId = null;

  return function(...args) {
    const context = this;
    const now = Date.now();

    if (now - lastRan >= limit) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      fn.apply(context, args);
      lastRan = now;
    } else if (!timerId) {
      // Trailing edge execution
      timerId = setTimeout(() => {
        fn.apply(context, args);
        lastRan = Date.now();
        timerId = null;
      }, limit - (now - lastRan));
    }
  };
}
\`\`\``,
        hi: `### Debounce vs Throttle Syntax:
- **Debounce**: Har nayi call aane par purana timer \`clearTimeout\` karke naya timer lagata hai. \`cancel()\` method se pending calls abort hoti hain.
- **Throttle**: \`Date.now() - lastRan >= limit\` check karta hai taaki specified duration mein sirf 1 baar run ho.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Challenge 3 & 4: Deep Clone (Circular Safe) & Array Flattening",
        hi: "Challenge 3 & 4: Deep Clone (Circular Safe) Aur Array Flattening",
      },
      body: {
        en: `### 3. Production Deep Clone with WeakMap for Circular References:
\`\`\`javascript
/**
 * Deep clones objects, handling circular refs, Dates, RegExps, Arrays, and Maps.
 */
export function deepClone(target, hash = new WeakMap()) {
  // Primitives and functions
  if (target === null || typeof target !== 'object') {
    return target;
  }

  // Handle Dates & RegExps
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target.source, target.flags);

  // Handle Circular References
  if (hash.has(target)) {
    return hash.get(target);
  }

  // Handle Array vs Object
  const clone = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  hash.set(target, clone);

  // Recursively copy properties (including Symbols)
  const keys = [...Object.keys(target), ...Object.getOwnPropertySymbols(target)];
  for (const key of keys) {
    clone[key] = deepClone(target[key], hash);
  }

  return clone;
}
\`\`\`

### 4. Custom \`flattenArray\` Polyfill:
\`\`\`javascript
/**
 * Flattens nested array up to specified depth (default 1)
 */
export function flattenArray(arr, depth = 1) {
  if (!Array.isArray(arr) || depth < 1) {
    return Array.isArray(arr) ? [...arr] : [];
  }

  return arr.reduce((acc, item) => {
    if (Array.isArray(item) && depth > 1) {
      acc.push(...flattenArray(item, depth - 1));
    } else if (Array.isArray(item)) {
      acc.push(...item);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

// Example:
console.log(flattenArray([1, [2, [3, [4]]]], 2)); // [1, 2, 3, [4]]
\`\`\``,
        hi: `### Deep Clone & Flatten Array:
- **Circular Safe Deep Clone**: \`WeakMap\` use karke dekhein ki kya object pehle se clone ho raha hai. Isse infinite recursive stack overflow avoid hota hai.
- **Flatten Array**: \`reduce\` aur recursion use karke \`depth\` parameter ke hisaab se arrays ko unpack karein.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Challenge 5 & 6: Promise.allSettled & Express Rate Limiter Middleware",
        hi: "Challenge 5 & 6: Promise.allSettled Polyfill Aur Express Rate Limiter",
      },
      body: {
        en: `### 5. \`Promise.allSettled\` Polyfill:
\`\`\`javascript
export function allSettledPolyfill(promises) {
  if (!Array.isArray(promises)) {
    return Promise.reject(new TypeError('Argument must be an iterable array'));
  }

  return Promise.all(
    promises.map((promise) =>
      Promise.resolve(promise)
        .then((value) => ({ status: 'fulfilled', value }))
        .catch((reason) => ({ status: 'rejected', reason }))
    )
  );
}
\`\`\`

### 6. In-Memory Token Bucket Rate Limiter Express Middleware:
\`\`\`javascript
/**
 * In-memory sliding window rate limiter middleware
 * @param {number} maxRequests - Maximum requests allowed per window
 * @param {number} windowMs - Window duration in milliseconds
 */
export function createRateLimiter(maxRequests = 100, windowMs = 60000) {
  // Map of IP -> array of request timestamps
  const ipHits = new Map();

  // Periodic cleanup of stale IPs to prevent memory leaks
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of ipHits.entries()) {
      const active = timestamps.filter((t) => now - t < windowMs);
      if (active.length === 0) {
        ipHits.delete(ip);
      } else {
        ipHits.set(ip, active);
      }
    }
  }, windowMs);

  return function rateLimiterMiddleware(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    const timestamps = ipHits.get(ip) || [];
    // Discard timestamps outside current sliding window
    const recent = timestamps.filter((t) => now - t < windowMs);

    if (recent.length >= maxRequests) {
      const retryAfterSec = Math.ceil((recent[0] + windowMs - now) / 1000);
      res.setHeader('Retry-After', retryAfterSec);
      return res.status(429).json({
        error: 'Too Many Requests',
        message: \`Rate limit exceeded. Try again in \${retryAfterSec}s\`,
      });
    }

    recent.push(now);
    ipHits.set(ip, recent);

    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', maxRequests - recent.length);
    next();
  };
}
\`\`\``,
        hi: `### Promise.allSettled Aur Express Rate Limiter:
- **Promise.allSettled**: Har promise ko \`.then\` mein \`{ status: 'fulfilled', value }\` aur \`.catch\` mein \`{ status: 'rejected', reason }\` mein convert karke standard \`Promise.all\` se pass karein.
- **Rate Limiter Middleware**: Har client IP ke request timestamps ka sliding window array maintain karta hai. Limit cross hone par HTTP 429 return karta hai.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Challenge 7 & 8: O(1) LRU Cache & React usePrevious Hook",
        hi: "Challenge 7 & 8: O(1) LRU Cache Class Aur React usePrevious Hook",
      },
      body: {
        en: `### 7. O(1) LRU Cache (Least Recently Used) Implementation:
In JavaScript, \`Map\` preserves insertion order. Re-inserting a key moves it to the end of the iteration order, enabling clean $O(1)$ LRU caching:

\`\`\`javascript
export class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Preserves insertion order
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    // Refresh position: delete and re-set to mark as most recently used
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict least recently used (first key in Map iterator)
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }
}
\`\`\`

### 8. React \`usePrevious\` Custom Hook:
\`\`\`jsx
import { useEffect, useRef } from 'react';

/**
 * Custom hook that tracks previous value of a prop or state variable.
 * useRef holds mutable value across renders; useEffect updates it AFTER render commit!
 */
export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value; // Runs after render commit
  }, [value]);

  return ref.current; // Returns previous value during render phase
}

// Example usage:
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count} | Previous: {prevCount ?? 'None'}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
\`\`\``,
        hi: `### LRU Cache ($O(1)$) Aur React \`usePrevious\`:
- **LRU Cache**: JS \`Map\` insertion order preserve karta hai. Key access hone par \`delete\` karke dubara \`set\` karein taaki wo newest ban jaye. Capacity exceed hone par \`cache.keys().next().value\` (sabse purani key) ko delete karein.
- **usePrevious**: \`useRef\` render ke time purana value return karta hai aur \`useEffect\` render ke baad \`ref.current = value\` update karta hai.`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Classic Machine Coding Interview Mistakes",
        hi: "Machine Coding Rounds Mein Candidates Ki 4 Badi Galatiyan",
      },
      body: {
        en: `### 1. Losing \`this\` Context in Higher-Order Functions
- **Mistake**: Calling \`fn(...args)\` inside \`setTimeout\` instead of \`fn.apply(context, args)\`.
- **Consequence**: When debouncing an object method (e.g. \`user.save.debounce(300)\`), \`this\` becomes \`window\` or \`undefined\` instead of \`user\`.

### 2. Mutating Function Arguments Directly
- **Mistake**: Mutating an input array directly with \`arr.reverse()\` or \`arr.splice()\` inside a utility function.
- **Consequence**: Pollutes outer caller state; breaks purity. Always make a copy (\`[...arr]\`) before mutating.

### 3. Infinite Recursion Without Base Termination Condition
- **Mistake**: Writing deep clone or tree traversals without checking for cyclical references or primitives.
- **Consequence**: Instant \`RangeError: Maximum call stack size exceeded\`.

### 4. Forgetting Cleanup on React Custom Hooks
- **Mistake**: Writing \`useFetch\` or \`useInterval\` without returning a cleanup function to \`clearInterval\` or call \`controller.abort()\`.
- **Consequence**: Memory leaks and "Can't perform a React state update on an unmounted component" errors.`,
        hi: `### 1. \`this\` Context Kho Dena:
Debounce ya throttle ke andar \`fn(...args)\` direct call karna. Hamesha \`fn.apply(this, args)\` use karein.

### 2. Input Arguments Ko Mutate Karna:
Utility function ke andar original array ya object ko direct modify karna. Hamesha copy banayein.

### 3. Base Condition Bhoolna:
Recursion mein terminal check na lagane se stack overflow crash hota hai.

### 4. React Hooks Mein Cleanup Bhoolna:
Custom hook mein timer ya network call ko unmount par abort na karna.`,
      },
    },
    {
      type: "best-practices",
      heading: {
        en: "How to Ace Machine Coding Rounds",
        hi: "Live Machine Coding Rounds Crack Karne Ke Golden Rules",
      },
      body: {
        en: `1. **Clarify Requirements Before Typing**: Ask: *"Should debounce support leading edge? What should deep clone do with circular references? Should LRU cache be $O(1)$?"*
2. **State Complexity Aloud**: Explicitly state: *"This flattenArray runs in $O(N)$ time and $O(D)$ auxiliary stack space where D is max nesting depth."*
3. **Write Unit Tests / Console Assertions**: Never say *"I am done"* without testing edge cases live:
   \`\`\`javascript
   console.assert(flattenArray([1, [2]], 1).length === 2, 'Test 1 Failed');
   \`\`\`
4. **Handle Null / Undefined Early (Guard Clauses)**: Always add boundary assertions at the top of functions.
5. **Keep Functions Pure and Modular**: Break large problems into small, single-responsibility helper functions.`,
        hi: `1. **Requirements Clear Karein**: Code shuru karne se pehle edge cases aur arguments ke types poochhein.
2. **Complexity Batayein**: Interviewer ko Time ($O(N)$) aur Space complexity bol kar batayein.
3. **Live Test Cases Chalayein**: Code likhne ke baad console assertions chala kar verify karein.
4. **Guard Clauses**: Function ke top par \`null\` aur \`undefined\` checks zaroor lagayein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Challenge 9 & 10: Production useFetch Hook & Custom EventEmitter",
        hi: "Challenge 9 & 10: Production useFetch Custom Hook Aur EventEmitter Class",
      },
      body: {
        en: `### 9. Production \`useFetch\` Hook with Cache & AbortController:
\`\`\`jsx
import { useState, useEffect, useRef } from 'react';

const cache = new Map();

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Store options in ref to avoid re-triggering effect on every render
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (!url) return;

    // Check cache
    if (cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { ...optionsRef.current, signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
        return res.json();
      })
      .then((json) => {
        cache.set(url, json);
        setData(json);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // Cleanup: abort ongoing fetch if component unmounts or URL changes!
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
\`\`\`

### 10. Custom \`EventEmitter\` Class:
\`\`\`javascript
export class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);
    return () => this.off(eventName, listener); // Return unsubscribe fn
  }

  off(eventName, listenerToRemove) {
    if (!this.events.has(eventName)) return;
    const filtered = this.events.get(eventName).filter((l) => l !== listenerToRemove);
    if (filtered.length === 0) {
      this.events.delete(eventName);
    } else {
      this.events.set(eventName, filtered);
    }
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) return;
    // Iterate over a copy to handle listeners removing themselves during emission
    const listeners = [...this.events.get(eventName)];
    for (const listener of listeners) {
      listener.apply(this, args);
    }
  }

  once(eventName, listener) {
    const onceWrapper = (...args) => {
      this.off(eventName, onceWrapper);
      listener.apply(this, args);
    };
    return this.on(eventName, onceWrapper);
  }
}
\`\`\``,
        hi: `### useFetch Aur EventEmitter:
- **useFetch Hook**: \`AbortController\` use karta hai taaki component unmount hone par ongoing HTTP request cancel ho jaye aur memory leak na ho.
- **EventEmitter Class**: \`on\` (subscribe), \`off\` (unsubscribe), \`emit\` (trigger), aur \`once\` (single trigger cleanup) methods support karta hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary & Live Coding Master Checklist",
        hi: "Quick Summary & Live Coding Master Checklist",
      },
      body: {
        en: `- **Context Preservation**: Always use \`fn.apply(this, args)\` in debounce/throttle wrappers.
- **Circular References**: Use \`WeakMap\` in deep clone implementations to prevent stack overflow.
- **O(1) LRU Cache**: Use JavaScript \`Map\` to leverage insertion order preservation for $O(1)$ evictions.
- **Custom Hooks**: Always clean up timers and abort ongoing HTTP requests inside \`useEffect\` cleanup returns.
- **EventEmitter**: Maintain listeners in arrays and iterate over copies during \`emit\` to prevent mutation bugs.`,
        hi: `- **Context**: Debounce aur throttle mein \`fn.apply(this, args)\` zaroor use karein.
- **Circular References**: Deep clone mein \`WeakMap\` use karke infinite recursion se bachein.
- **LRU Cache**: JS \`Map\` se $O(1)$ LRU cache banayein.
- **React Hooks**: \`useEffect\` cleanup function mein timers aur network calls abort karein.
- **EventEmitter**: Listeners list ki copy par iterate karein taaki mutation bugs na aane paayein.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "Why is fn.apply(this, args) used instead of fn(...args) inside a debounce utility wrapper?",
      "hi": "Debounce wrapper ke andar fn(...args) ke badle fn.apply(this, args) kyun use kiya jata hai?"
    },
    "options": [
      {
        "en": "It makes the function run in a separate Web Worker",
        "hi": "Ye function ko Web Worker mein chalata hai"
      },
      {
        "en": "It preserves the original execution context ('this') and arguments when the debounced function is invoked as an object method",
        "hi": "Ye original object ke 'this' context aur arguments ko sahi salamat preserve karta hai"
      },
      {
        "en": "Because apply is faster than direct invocation",
        "hi": "Kyunki apply direct call se fast hota hai"
      },
      {
        "en": "To convert return values to JSON",
        "hi": "Return value ko JSON banane ke liye"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Without apply(this, args), calling a debounced method on an instance (like user.save()) loses the user context, causing 'this' to become undefined in strict mode.",
      "hi": "Bina apply ke object method debounce hone par uska 'this' context lost ho jata hai aur bug create hota hai."
    }
  },
  {
    "question": {
      "en": "How does a WeakMap prevent infinite call stack overflows when deep-cloning an object with circular references?",
      "hi": "Circular references wale object ko deep clone karte waqt WeakMap infinite stack overflow ko kaise rokkta hai?"
    },
    "options": [
      {
        "en": "It deletes the circular reference permanently",
        "hi": "Ye circular reference ko delete kar deta hai"
      },
      {
        "en": "It stores visited original objects as keys and their clones as values; if an object was already visited, it returns the cached clone immediately instead of recursing",
        "hi": "Ye check karta hai ki kya ye object pehle visit ho chuka hai; agar haan, toh wo dubara recurse karne ke bajaye cached clone return kar deta hai"
      },
      {
        "en": "It converts the object into a string",
        "hi": "Ye object ko string banata hai"
      },
      {
        "en": "It terminates the Node.js process",
        "hi": "Ye process terminate karta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "The WeakMap tracks visited objects. When encountering an already-cloned object reference, it short-circuits recursion and returns the existing clone reference.",
      "hi": "WeakMap visited objects ko track karta hai aur circular loop aane par recursion ko rok kar purana clone reference return karta hai."
    }
  },
  {
    "question": {
      "en": "Why is JavaScript's built-in Map ideal for implementing an O(1) LRU (Least Recently Used) cache?",
      "hi": "JavaScript ka built-in Map O(1) LRU Cache banane ke liye ideal kyun hai?"
    },
    "options": [
      {
        "en": "Because Map stores keys in sorted numerical order",
        "hi": "Kyunki Map numbers sort karta hai"
      },
      {
        "en": "Because Map preserves insertion order; deleting and re-inserting a key moves it to the newest position in O(1) time, and keys().next().value yields the oldest in O(1)",
        "hi": "Kyunki Map insertion order yaad rakhta hai; delete aur re-insert karne par key O(1) mein newest ban jaati hai aur sabse purani key O(1) mein mil jaati hai"
      },
      {
        "en": "Because Map is automatically synchronized with MongoDB",
        "hi": "Kyunki Map MongoDB se synced hota hai"
      },
      {
        "en": "Because Map uses 0 bytes of RAM",
        "hi": "Kyunki Map 0 bytes RAM leta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "JavaScript Maps guarantee key iteration order. By deleting and re-setting an accessed key, it moves to the tail, while keys().next().value retrieves the least-recently used head in O(1).",
      "hi": "Map insertion order preserve karta hai. Delete aur dubara set karne se key end mein chali jaati hai aur keys().next().value se sabse purani key O(1) mein milti hai."
    }
  },
  {
    "question": {
      "en": "Why should a custom React useFetch hook include an AbortController in its useEffect cleanup function?",
      "hi": "Custom React useFetch hook ke useEffect cleanup mein AbortController kyun lagana chahiye?"
    },
    "options": [
      {
        "en": "To prevent the user's internet from disconnecting",
        "hi": "Internet disconnect hone se rokne ke liye"
      },
      {
        "en": "To abort any in-flight HTTP network requests if the component unmounts or the URL changes before the response arrives, preventing memory leaks and stale state updates",
        "hi": "Taaki component unmount hone par chalti hui network request abort ho jaye aur memory leaks aur stale state update na hon"
      },
      {
        "en": "To restart the browser",
        "hi": "Browser restart karne ke liye"
      },
      {
        "en": "To encrypt the fetch payload",
        "hi": "Payload encrypt karne ke liye"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Aborting in-flight requests on unmount avoids updating state on unmounted components and cancels unneeded bandwidth consumption.",
      "hi": "Unmount hone par request abort karne se memory leak aur unmounted component par state set karne ka bug solve hota hai."
    }
  },
  {
    "question": {
      "en": "How does the custom usePrevious(value) hook return the PREVIOUS value during render while updating to the CURRENT value afterward?",
      "hi": "custom usePrevious(value) hook render ke samay PURANA value kaise return karta hai aur baad mein CURRENT value par kaise update hota hai?"
    },
    "options": [
      {
        "en": "By using localStorage",
        "hi": "localStorage use karke"
      },
      {
        "en": "useRef holds the mutable previous value; during render it returns ref.current, and useEffect updates ref.current = value asynchronously AFTER the render commit phase finishes",
        "hi": "useRef purani value hold karta hai aur render time par ref.current return karta hai; fir useEffect render commit phase ke BAAD ref.current ko nayi value se update karta hai"
      },
      {
        "en": "By calling window.history.back()",
        "hi": "history.back() se"
      },
      {
        "en": "It uses an async setTimeout(..., 10000)",
        "hi": "setTimeout use karke"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Effects run after the screen has painted. Therefore, during the render function execution, ref.current still holds the value from the previous render cycle.",
      "hi": "useEffect paint hone ke baad execute hota hai. Isliye render ke dauran ref.current mein pichle render ki value hi hoti hai jo turant return ho jaati hai."
    }
  },
  {
    "question": {
      "en": "How does a clean polyfill for Promise.allSettled differ from Promise.all internally?",
      "hi": "Promise.allSettled ka polyfill internal logic mein Promise.all se kaise alag hota hai?"
    },
    "options": [
      {
        "en": "It maps each promise to a wrapper that catches rejections, converting results to { status: 'fulfilled', value } or { status: 'rejected', reason } so Promise.all never fast-fails",
        "hi": "Ye har promise ko wrap karke .catch se error pakadta hai aur { status: 'fulfilled', value } ya { status: 'rejected', reason } deta hai taaki Promise.all kabhi reject na ho"
      },
      {
        "en": "It converts promises into synchronous while loops",
        "hi": "Promises ko while loop banata hai"
      },
      {
        "en": "It only resolves if all promises take less than 1 second",
        "hi": "1 second se kam lene par chalta hai"
      },
      {
        "en": "It runs without returning a Promise",
        "hi": "Bina promise ke chalta hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "By intercepting both fulfillment and rejection in .then/.catch handlers and resolving both into status objects, outer Promise.all receives only resolved values and never triggers fast-fail rejection.",
      "hi": "Rejection ko .catch mein pakad kar resolve object bana diya jata hai jisse outer Promise.all kabhi fail nahi hota aur sabka status array return karta hai."
    }
  },
  {
    "question": {
      "en": "In an in-memory sliding window rate limiter middleware, why is a periodic setInterval cleanup of the IP map necessary?",
      "hi": "In-memory sliding window rate limiter mein IP map ka periodic cleanup (setInterval) kyun zaroori hota hai?"
    },
    "options": [
      {
        "en": "To reset user passwords",
        "hi": "Passwords reset karne ke liye"
      },
      {
        "en": "Without periodic deletion of stale IP timestamp arrays whose window has expired, the Map continues accumulating memory indefinitely, resulting in a severe memory leak",
        "hi": "Stale IPs jinki window expire ho chuki hai unhe delete na karne par Map memory mein lagataar badhta rehta hai aur memory leak ho jati hai"
      },
      {
        "en": "To change the server port",
        "hi": "Port badalne ke liye"
      },
      {
        "en": "To clear the browser history",
        "hi": "Browser history clear karne ke liye"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Every unique client IP creates an entry in the Map. If stale entries are never evicted, the in-memory Map will eventually consume gigabytes of heap RAM.",
      "hi": "Lakho unique visitor IPs ka data agar delete na kiya jaye toh Node.js heap memory bhar jaati hai. Periodic cleanup memory ko constant rakhta hai."
    }
  },
  {
    "question": {
      "en": "What is the terminating base condition in a recursive flattenArray(arr, depth) implementation?",
      "hi": "Recursive flattenArray(arr, depth) implementation mein terminating base condition kya honi chahiye?"
    },
    "options": [
      {
        "en": "When the array length reaches 1,000",
        "hi": "Length 1,000 hone par"
      },
      {
        "en": "When !Array.isArray(arr) OR depth < 1, return the item or shallow copy of the array without further recursion",
        "hi": "Jab input array na ho (!Array.isArray) ya depth < 1 ho jaye, toh aage recurse kiye bina item ya array ki shallow copy return karein"
      },
      {
        "en": "When the current date is Sunday",
        "hi": "Sunday hone par"
      },
      {
        "en": "When the array contains strings only",
        "hi": "Sirf strings hone par"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Checking depth < 1 ensures that nested arrays deeper than the requested depth parameter are preserved intact rather than being flattened completely.",
      "hi": "depth < 1 check karna zaroori hai taaki jitni depth user ne maangi hai sirf utna hi flatten ho aur usse zyada deep arrays waise ke waise bache rahein."
    }
  },
  {
    "question": {
      "en": "Why is iterating over a COPY of the listeners array ([...this.events.get(name)]) critical inside an EventEmitter's emit() method?",
      "hi": "EventEmitter ke emit() method mein listeners array ki COPY ([...listeners]) par iterate karna kyun compulsory hai?"
    },
    "options": [
      {
        "en": "Because JavaScript arrays cannot be looped directly",
        "hi": "JS arrays direct loop nahi hote"
      },
      {
        "en": "If a listener unregisters itself (via once or off) during the emit execution, mutating the original array mid-loop shifts indexes and causes subsequent listeners to be skipped or throw errors",
        "hi": "Agar koi listener emit ke dauran khud ko unregister kar de (once ya off se), toh loop ke beech mein array mutate hone se agle listeners skip ho jaate hain"
      },
      {
        "en": "To encrypt the event arguments",
        "hi": "Arguments encrypt karne ke liye"
      },
      {
        "en": "To make emit asynchronous",
        "hi": "emit ko async banane ke liye"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Iterating over the original array while listeners call emitter.off() mutates array length and index pointers, leading to subtle skipped callback bugs.",
      "hi": "Array iterate karte waqt splice() ya delete hone se loop ka index bigad jata hai. Shallow copy par loop chalane se ye mutation bug resolve hota hai."
    }
  },
  {
    "question": {
      "en": "How does the 'immediate' (leading edge) flag alter the behavior of a debounce(fn, delay, immediate) function?",
      "hi": "debounce(fn, delay, immediate) mein 'immediate' flag function ke behaviour ko kaise badal deta hai?"
    },
    "options": [
      {
        "en": "It executes fn immediately on the first trigger (if no timer is active), and then suppresses subsequent calls until 'delay' ms of silence have elapsed",
        "hi": "Ye pehle trigger par fn ko TURANT execute karta hai (leading edge), aur fir jab tak 'delay' ms ka silence na ho agle calls ko suppress karke rakhta hai"
      },
      {
        "en": "It runs the function in reverse order",
        "hi": "Reverse order mein chalata hai"
      },
      {
        "en": "It makes the delay equal to 0 seconds permanently",
        "hi": "Delay 0 kar deta hai"
      },
      {
        "en": "It throws an error if called more than once",
        "hi": "Error throw karta hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Leading edge debounce triggers immediately on the first call (callNow = immediate && !timerId), then locks out execution until the delay timeout expires without new activity.",
      "hi": "Leading edge pehli click par instant action execute karta hai (jaise submit button) aur agle multiple double-clicks ko suppress kar deta hai."
    }
  },
  {
    "question": {
      "en": "In a timestamp-based throttle function, how is trailing edge execution ensured when the user stops firing events before the limit interval expires?",
      "hi": "Timestamp-based throttle function mein trailing edge execution kaise guarantee ki jaati hai jab user interval khatam hone se pehle events rok deta hai?"
    },
    "options": [
      {
        "en": "By scheduling a fallback setTimeout with remaining time (limit - (now - lastRan)) to execute the most recent arguments if no timer is already pending",
        "hi": "Ek fallback setTimeout schedule karke bache hue time (limit - (now - lastRan)) ke liye jo aakhri arguments ko execute karta hai agar koi timer pending na ho"
      },
      {
        "en": "By restarting the user's browser",
        "hi": "Browser restart karke"
      },
      {
        "en": "By ignoring trailing events entirely",
        "hi": "Trailing events ko drop karke"
      },
      {
        "en": "By looping forever in a while loop",
        "hi": "while loop se"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "A comprehensive throttle handles both leading edge (Date.now() - lastRan >= limit) and schedules a trailing setTimeout to catch the final event payload.",
      "hi": "Trailing timer ye ensure karta hai ki aakhri scroll position ya input value miss na ho, aur bache hue time par execute ho jaye."
    }
  },
  {
    "question": {
      "en": "Why do standard deep-cloning algorithms return functions by reference rather than attempting to clone function code?",
      "hi": "Standard deep-cloning algorithms functions ko clone karne ke bajaye unka original reference kyun return karte hain?"
    },
    "options": [
      {
        "en": "Because cloning a function via eval() or new Function() breaks lexical closures, losing access to closed-over variables, and introduces severe security injection vulnerabilities",
        "hi": "Function ko eval ya new Function se clone karne par uske lexical closures toot jaate hain aur security vulnerabilities paida hoti hain"
      },
      {
        "en": "Because functions do not exist in JavaScript",
        "hi": "JS mein functions nahi hote"
      },
      {
        "en": "Because functions are larger than 1 Gigabyte",
        "hi": "Functions bohot bade hote hain"
      },
      {
        "en": "Because JavaScript engines ban passing functions",
        "hi": "Functions pass karna ban hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Functions depend on their original enclosing lexical environment. Re-stringifying and re-evaluating function code loses closed-over scope and fails on native/bound functions.",
      "hi": "Functions apne lexical closures se jude hote hain. Unhe clone karne ki koshish karne par unke surrounding variables disconnect ho jaate hain."
    }
  },
  {
    "question": {
      "en": "What common bug occurs when implementing a custom useInterval(callback, delay) hook if the callback is not stored in a useRef?",
      "hi": "useInterval(callback, delay) custom hook banate waqt agar callback ko useRef mein na rakha jaye toh kaunsa bug aata hai?"
    },
    "options": [
      {
        "en": "The browser freezes immediately",
        "hi": "Browser freeze ho jata hai"
      },
      {
        "en": "Stale Closure Bug: If the interval does not reset on every render, the timer captures the original callback's state forever; if it DOES reset on every render, the timer never fires if renders happen frequently",
        "hi": "Stale Closure: Agar timer reset na ho toh purana state capture rehta hai; agar har render par timer reset ho toh timer kabhi fire hi nahi ho pata"
      },
      {
        "en": "The interval runs in negative seconds",
        "hi": "Interval negative mein chalta hai"
      },
      {
        "en": "useInterval is built into React natively",
        "hi": "useInterval React mein pehle se hota hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Dan Abramov's famous useInterval pattern stores savedCallback in a useRef. The interval timer calls savedCallback.current(), allowing fresh props/state without resetting the timer tick.",
      "hi": "useRef mein callback save karne se interval tick reset hue bina hamesha sabse fresh state aur props execute hote hain."
    }
  },
  {
    "question": {
      "en": "How does a polyfill for Function.prototype.myBind work?",
      "hi": "Function.prototype.myBind ka polyfill kaise kaam karta hai?"
    },
    "options": [
      {
        "en": "It renames the function to bind",
        "hi": "Function rename karta hai"
      },
      {
        "en": "It returns a new function that bundles the target function, context, and bound arguments using a closure, invoking originalFn.apply(context, [...boundArgs, ...callArgs])",
        "hi": "Ye naya function return karta hai jo closure ke zariye target function aur context ko hold karta hai aur call hone par originalFn.apply(context, combinedArgs) chalata hai"
      },
      {
        "en": "It forces the function to execute 10 times",
        "hi": "10 baar execute karta hai"
      },
      {
        "en": "It converts the function into an arrow function using eval",
        "hi": "eval se arrow function banata hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "bind returns a closure retaining the original context and prepended arguments. When the bound function is eventually called with new arguments, both argument sets are merged and applied.",
      "hi": "bind ek closure return karta hai jisme bind ke arguments aur call ke arguments merge hokar target function ko sahi context ke saath apply hote hain."
    }
  },
  {
    "question": {
      "en": "How does a generic curry(fn) utility determine when to execute the target function vs returning another curried function?",
      "hi": "Generic curry(fn) utility kab decide karti hai ki function execute karna hai ya agla curried function return karna hai?"
    },
    "options": [
      {
        "en": "By checking if args.length >= fn.length (the declared arity of the target function)",
        "hi": "Ye check karke ki kya pass kiye gaye args ki sankhya fn.length (declared parameters count) ke barabar ya zyada hai"
      },
      {
        "en": "By asking the user via prompt()",
        "hi": "prompt() se pooch kar"
      },
      {
        "en": "By counting how many milliseconds have passed",
        "hi": "Milliseconds count karke"
      },
      {
        "en": "Curry functions only accept 1 argument maximum",
        "hi": "Curry sirf 1 argument leta hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "Function.prototype.length returns the number of arguments expected by the function. When accumulated arguments reach fn.length, curry executes fn.apply(this, args).",
      "hi": "fn.length se pata chalta hai ki function kitne arguments expect kar raha hai. Jab arguments ki ginti poori ho jaati hai, toh function execute ho jata hai."
    }
  },
  {
    "question": {
      "en": "What is the operational difference between a pipe(...fns) and a compose(...fns) functional utility?",
      "hi": "Functional programming mein pipe(...fns) aur compose(...fns) ke execution order mein kya farq hota hai?"
    },
    "options": [
      {
        "en": "pipe executes functions from Left-to-Right (first to last); compose executes functions from Right-to-Left (last to first, like mathematical f(g(x)))",
        "hi": "pipe functions ko Left-to-Right chalata hai (pehla fir doosra); compose functions ko Right-to-Left chalata hai (mathematical f(g(x)) ki tarah)"
      },
      {
        "en": "pipe only works with numbers; compose only works with strings",
        "hi": "pipe sirf numbers ke liye hai"
      },
      {
        "en": "compose is asynchronous; pipe is synchronous",
        "hi": "compose async hai"
      },
      {
        "en": "They are identical with zero difference",
        "hi": "Dono identical hain"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "pipe(f, g, h)(x) computes h(g(f(x))). compose(f, g, h)(x) computes f(g(h(x))). Pipe reads naturally in data-flow order.",
      "hi": "pipe left-to-right (f -> g -> h) data flow karta hai. compose right-to-left math formula f(g(x)) follow karta hai."
    }
  },
  {
    "question": {
      "en": "Why is JSON.stringify(args) inadequate as a universal serialization key for memoizing functions that accept object parameters?",
      "hi": "Object parameters lene wale functions ko memoize karte waqt JSON.stringify(args) ko universal cache key kyun nahi banana chahiye?"
    },
    "options": [
      {
        "en": "Because JSON.stringify throws errors on all objects",
        "hi": "JSON.stringify error deta hai"
      },
      {
        "en": "Object key order is not guaranteed ({ a: 1, b: 2 } produces a different string than { b: 2, a: 1 }), causing duplicate cache misses for structurally identical objects",
        "hi": "Object key order fix nahi hota ({ a: 1, b: 2 } aur { b: 2, a: 1 } alag strings banti hain) jisse identical objects par cache miss ho jata hai"
      },
      {
        "en": "Because JSON.stringify deletes the cache",
        "hi": "Cache delete ho jata hai"
      },
      {
        "en": "Because Map keys can only be numbers",
        "hi": "Map keys sirf numbers ho sakti hain"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "JSON.stringify produces different string keys if object properties are ordered differently. Advanced memoizers sort keys or use nested WeakMaps to cache by object reference.",
      "hi": "Keys ka sequence badal jane se JSON string badal jaati hai aur cache match nahi hota. Nested WeakMaps ya sorted serialization se ise fix kiya jata hai."
    }
  },
  {
    "question": {
      "en": "How does the once(eventName, listener) method of an EventEmitter ensure the callback executes at most once?",
      "hi": "EventEmitter ka once(eventName, listener) method ye kaise ensure karta hai ki callback maximum 1 hi baar chale?"
    },
    "options": [
      {
        "en": "It wraps the listener in an internal wrapper function that calls emitter.off(eventName, wrapper) BEFORE or immediately upon executing the listener",
        "hi": "Ye listener ko ek wrapper function mein pack karta hai jo listener execute hote hi pehle emitter.off() se khud ko unregister kar deta hai"
      },
      {
        "en": "By deleting the EventEmitter instance",
        "hi": "Emitter delete karke"
      },
      {
        "en": "By rebooting Node.js",
        "hi": "Node reboot karke"
      },
      {
        "en": "By throwing a SyntaxError on the second call",
        "hi": "SyntaxError throw karke"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "once creates a wrapper that unregisters itself from the event system first, then delegates the arguments to the original listener via apply.",
      "hi": "once ek wrapper banata hai jo call hote hi sabse pehle off() method se khud ko list se hata deta hai aur fir user ka function chalata hai."
    }
  },
  {
    "question": {
      "en": "Why should you always test edge cases (null, undefined, 0, empty array) live during a Machine Coding interview round?",
      "hi": "Machine Coding interview round mein edge cases (null, undefined, 0, empty array) ko live test karna kyun zaroori hai?"
    },
    "options": [
      {
        "en": "To fill up time so the interview ends early",
        "hi": "Time pass karne ke liye"
      },
      {
        "en": "Senior interviewers deliberately evaluate whether candidate code is resilient to falsy values (like 0 or false) that break lazy boolean checks (like val || default), demonstrating production-grade maturity",
        "hi": "Interviewers ye dekhte hain ki kya code falsy values (0 ya false) par fail toh nahi hota jo lazy checks (val || default) se toot jaate hain"
      },
      {
        "en": "Because JavaScript requires at least 5 console.log calls to run",
        "hi": "JS mein console.log compulsory hai"
      },
      {
        "en": "To force the interviewer to write code for you",
        "hi": "Interviewer se code likhwane ke liye"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Testing falsy values (0, '', false, null, undefined) demonstrates deep understanding of JavaScript coercion and defensive programming beyond happy-path implementations.",
      "hi": "Falsy values ko test karna dikhata hai ki candidate production-level edge cases samajhta hai aur code happy-path par limit nahi hai."
    }
  },
  {
    "question": {
      "en": "In React custom hooks, why must you include all reactive values (state, props) used inside useEffect in the dependency array?",
      "hi": "React custom hooks mein useEffect ke andar use hue sabhi reactive values ko dependency array mein daalna kyun compulsory hota hai?"
    },
    "options": [
      {
        "en": "Because missing dependencies cause the effect closure to capture outdated (stale) props and state from previous render passes, leading to desynchronized UI bugs",
        "hi": "Dependencies miss hone se effect closure pichle renders ke purane (stale) props aur state ko capture karke rakhta hai jisse UI desync bugs aate hain"
      },
      {
        "en": "Because React crashes with a fatal compile error if any dependency is omitted",
        "hi": "Compile error throw hota hai"
      },
      {
        "en": "To make the component render 100 times per second",
        "hi": "100 baar render karne ke liye"
      },
      {
        "en": "Dependencies have no effect on custom hooks",
        "hi": "Dependencies ka koi asar nahi hota"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "The ESLint exhaustive-deps rule exists to ensure effect closures always reference fresh state and props. Omitting dependencies locks the effect into stale closures.",
      "hi": "Dependency array effect ko taja props aur state provide karta hai. Variables chhodne se stale closures bante hain jo hard-to-debug bugs dete hain."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Top 10 Live Coding Challenges in MERN Interviews in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Top 10 Live Coding Challenges in MERN Interviews ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling top 10 live coding challenges in mern interviews with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Top 10 Live Coding Challenges in MERN Interviews ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Top 10 Live Coding Challenges in MERN Interviews establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Top 10 Live Coding Challenges in MERN Interviews clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  }
],
};
