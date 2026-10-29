const e={id:"adv-infinite-scroll",title:{en:"Building Infinite Scroll in React (Intersection Observer)",hi:"React Mein Infinite Scroll Banana (IntersectionObserver)"},difficulty:"Intermediate",readTime:10,sections:[{type:"concept",heading:{en:"1. The Evolution of Infinite Scrolling: Scroll Events vs Intersection Observer",hi:"1. Infinite Scroll Ka Safar: Scroll Events vs Intersection Observer"},body:{en:`**Infinite scroll** is a user interface pattern where content continuously loads as the user scrolls toward the bottom of the page, eliminating the friction of clicking numbered pagination buttons. It is the core interaction design pattern powering platforms like Instagram, TikTok, Twitter/X, and YouTube.

### The Old, Broken Approach: \`window.addEventListener('scroll')\`
Historically, developers implemented infinite scrolling by attaching an event listener to the window scroll:
\`\`\`javascript
// BAD PRACTICE: Kills mobile battery & drops FPS
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    fetchNextBatch();
  }
});
\`\`\`

#### Why \`window.onscroll\` is Bad:
1. **Main Thread Thrashing**: The scroll event fires 60 to 120 times every single second on modern high-refresh screens (ProMotion / 120Hz).
2. **Forced Reflow / Layout Thrashing**: Calling properties like \`window.scrollY\` and \`document.body.offsetHeight\` forces the browser to synchronously recalculate the entire page layout on every single frame, causing severe frame drops and jank.
3. **Complex Throttling**: Even with \`lodash.throttle\`, calculating scroll heights inside nested \`overflow: auto\` containers is error-prone.

---

### The Modern Standard: The Intersection Observer API
The **Intersection Observer API** provides a performant, asynchronous way to observe changes in the intersection of a target element with an ancestor element or the top-level viewport.
- **Runs Completely Off the Main Thread**: The browser's native C++ rendering engine checks element visibility during composite passes.
- **Zero Layout Thrashing**: No queries to \`offsetHeight\` or \`scrollTop\`.
- **The "Sentinel" Pattern**: You simply place an invisible \`<div ref={sentinelRef} />\` at the bottom of your list. When that sentinel enters the viewport, the browser notifies your callback!`,hi:`**Infinite scroll** ek aisi UI technique hai jisme user jaise-jaise page ke neeche scroll karta hai, naya content automatically load hota chala jata hai bina kisi "Next Page" button ko click kiye. Instagram, X (Twitter), aur YouTube isi pattern par chalte hain.

### Purana Aur Bekar Tareeqa: \`window.addEventListener('scroll')\`
Pehle developers window ke scroll event par listener lagate the:
\`\`\`javascript
// GANDI PRACTICE: Battery aur performance dono barbad
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadMore();
  }
});
\`\`\`
- **Lag Aur FPS Drop**: 120Hz display par scroll event ek second mein 120 baar trigger hota hai.
- **Layout Thrashing**: Har scroll tick par \`scrollY\` aur \`offsetHeight\` calculate karne se browser ka UI thread freeze ho jata hai aur scrolling mein jank aane lagta hai.

---

### Modern Aur Fast Solution: Intersection Observer API
**Intersection Observer** browser ka ek native background tool hai jo asynchronous tareeqe se dekhta hai ki koi HTML element screen par dikha ya nahi:
- **Zero Lag**: Ye browser ke background engine mein chalta hai aur main JavaScript thread ko bilkul block nahi karta.
- **Sentinel (Chowkidar) Pattern**: List ke aakhri hisse mein ek chota sa invisible \`<div ref={sentinelRef} />\` rakh diya jata hai. Jaise hi ye invisible element screen par aata hai, Intersection Observer turant next batch fetch kar leta hai!`}},{type:"concept",heading:{en:"2. The Sentinel Architecture & IntersectionObserver Parameters",hi:"2. Sentinel Architecture Aur IntersectionObserver Ke Parameters"},body:{en:"Understanding how the Intersection Observer works requires mastering its three key configuration parameters:\n\n```\n┌──────────────────────────────────────────────┐\n│                  Viewport                    │\n│                                              │\n│  [ Post Card 1 ]                             │\n│  [ Post Card 2 ]                             │\n│  [ Post Card 3 ]                             │\n│                                              │\n└──────────────────────────────────────────────┘\n──────────────────────────────────────────────── ◄── rootMargin: '200px'\n       ▲ (Prefetch trigger boundary)\n       │\n [ Sentinel <div> ] (Invisible trigger element at bottom)\n```\n\n### The 3 Core Observer Options:\n1. **`root`**: The ancestor element used as the viewport for checking visibility. Defaults to `null` (the browser viewport). If your scrolling list is inside a modal or fixed-height `overflow-y: scroll` container, `root` must point to that container DOM element.\n2. **`rootMargin`**: Offsets added to the root's bounding box. For example, `rootMargin: '200px'` triggers the intersection **200 pixels BEFORE** the sentinel actually hits the screen! This creates a frictionless experience where content prefetches invisibly before the user reaches the bottom.\n3. **`threshold`**: A single number or array of numbers indicating at what percentage of the target's visibility the observer callback should execute. `threshold: 0` means *\"fire as soon as even 1 pixel of the sentinel is visible\"*. `threshold: 1.0` means *\"fire only when 100% of the element is visible\"* (for infinite scroll, `threshold: 0` or `0.1` is standard).",hi:"Intersection Observer ke 3 sabse zaroori parameters:\n\n### 1. `root`\nWo container jiske hisab se visibility check karni hai. Default `null` hota hai (browser viewport). Agar aapki list kisi modal ya fixed div ke andar scroll ho rahi hai, toh root us div ko point karega.\n\n### 2. `rootMargin` (Prefetching Ka Trick)\nJaise `rootMargin: '200px'`. Iska matlab hai ki jab sentinel user ki screen se **200 pixels neeche hi hoga**, tabhi browser agla batch fetch karna shuru kar dega! User jab tak neeche pahuchega, content pehle se load ho chuka hoga. Zero waiting time!\n\n### 3. `threshold`\nSentinel ka kitna percent hissa dikhne par callback chalna chahiye. Infinite scroll ke liye `threshold: 0` ya `0.1` use kiya jata hai, yaani sentinel ka 1 pixel aate hi agla page trigger ho jaye."}},{type:"analogy",heading:{en:"Real-Life Analogy: The Conveyor Belt Buffet at a Wedding",hi:"Real-Life Analogy: Shaadi Ke Buffet Mein Garam Roti Ka Counter"},body:{en:`Imagine attending a grand Indian wedding reception with a live Tandoor Roti counter:

- **The Naive Scroll Event (The Impatient Host)**:
  The host stands right in front of your dining plate, continuously asking every 500 milliseconds: *"Did you take a bite? How much bread is left? Are you finished yet? How about now?"*
  The host annoys every guest, creates massive noise, and exhausts himself without doing useful work.
- **The Numbered Pagination Button (The Token Counter)**:
  Every time you finish 2 rotis, you must stand up, walk across the banquet hall to a token machine, press "Token #2", walk back, and wait 5 minutes for the next roti. It breaks your entire meal flow!
- **The Intersection Observer (The Smart Head Waiter & Sentinel Plate)**:
  The head waiter stands discreetly in the background. On your table, he places a small napkin marker 2 inches behind your current food plate (**the sentinel element** with a 2-inch **rootMargin**).
  As soon as you reach for your second-to-last bite, the waiter spots the empty plate entering his field of view and immediately signals the kitchen to bring 2 hot rotis. Fresh food lands on your table before you even finish what you had. Effortless, continuous, zero interruption!`,hi:`Ek shaadi ke tandoor counter ka example dekhein:

- **Scroll Event (Baar-Baar Puchne Wala Rishtedar)**:
  Ek rishtedar har 2 second par aapke muh ke samne aakar chillata hai: *"Roti khatam hui? Kitni bachi hai? Abhi khao na?"*. Wo poori mehfil ka maza kharab kar deta hai aur khud bhi thak jata hai.
- **Pagination Buttons (Token Counter)**:
  Har 2 roti ke baad aapko table se uth kar token line mein lagna pade aur "Button 2" dabana pade. Khane ka sara maza toot jata hai.
- **Intersection Observer (Smart Waiter)**:
  Smart waiter door khada rehta hai aur chupchap aapki plate par nazar rakhta hai. Jaise hi aap aakhri bite lene wale hote hain (**sentinel trigger**), waiter kitchen se 2 garam naan laakar plate mein rakh deta hai. Aapka khana kabhi rukta nahi aur waiter ko bhi baar-baar aakar tang nahi karna padta!`}},{type:"syntax",heading:{en:"IntersectionObserver Syntax & React Ref Integration",hi:"IntersectionObserver Ka Native Syntax Aur React Integration"},body:{en:`### Native IntersectionObserver Syntax:
\`\`\`javascript
const observer = new IntersectionObserver((entries, observerInstance) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log('Sentinel is visible! Fetching next page...');
    }
  });
}, {
  root: null, // viewport
  rootMargin: '200px', // trigger 200px before reaching bottom
  threshold: 0,
});

// Start observing
observer.observe(targetElement);

// Stop observing & prevent memory leaks
observer.disconnect();
\`\`\`

### Integrating with React \`useRef\` and \`useEffect\`:
In React, we use a \`useRef\` to attach to the sentinel DOM node, and initialize the observer inside \`useEffect\`.
Always call \`observer.disconnect()\` inside the \`useEffect\` cleanup return function to prevent memory leaks and zombie event listeners!`,hi:`### Native JavaScript Syntax:
\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  const firstEntry = entries[0];
  if (firstEntry.isIntersecting) {
    // Sentinel screen par aa gaya! Agla page fetch karo
    fetchMoreData();
  }
}, {
  rootMargin: '200px',
  threshold: 0.1,
});

observer.observe(sentinelElement);
observer.disconnect(); // cleanup
\`\`\`

### React Ke Saath Hooking:
React mein hum sentinel ke liye \`useRef()\` banate hain aur observer ko \`useEffect()\` mein initialize karte hain. Component unmount hone par \`observer.disconnect()\` call karna bohot zaroori hota hai taaki memory leaks na hon.`}},{type:"example",heading:{en:"Example 1: Minimalist Intersection Observer Hook in React",hi:"Example 1: React Mein Basic Intersection Observer Custom Hook"},body:{en:`Here is a lightweight, dependency-free custom hook that detects when any DOM element enters the viewport:

\`\`\`javascript
// hooks/useIntersectionObserver.js
import { useEffect, useRef } from 'react';

export const useIntersectionObserver = ({
  targetRef,
  onIntersect,
  enabled = true,
  rootMargin = '100px',
  threshold = 0.1,
}) => {
  useEffect(() => {
    if (!enabled) return;

    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    // CRITICAL: Cleanup to avoid memory leaks
    return () => {
      observer.disconnect();
    };
  }, [targetRef, onIntersect, enabled, rootMargin, threshold]);
};
\`\`\``,hi:`Ek reusable aur lightweight custom hook jo kisi bhi element ka visibility change detect karta hai:

\`\`\`javascript
// hooks/useIntersectionObserver.js
import { useEffect, useRef } from 'react';

export const useIntersectionObserver = ({
  targetRef,
  onIntersect,
  enabled = true,
  rootMargin = '100px',
  threshold = 0.1,
}) => {
  useEffect(() => {
    if (!enabled) return;

    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    // Cleanup: Memory leak se bachne ke liye
    return () => {
      observer.disconnect();
    };
  }, [targetRef, onIntersect, enabled, rootMargin, threshold]);
};
\`\`\``}},{type:"example",heading:{en:"Example 2: Complete Infinite Scroll Custom Hook with State & Race Prevention",hi:"Example 2: State Management & Race-Condition Safe Infinite Scroll Hook"},body:{en:`A robust custom hook \`useInfiniteScroll\` handling cursor pagination, loading states, and preventing duplicate overlapping fetches:

\`\`\`javascript
// hooks/useInfiniteScroll.js
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

export const useInfiniteScroll = (fetchUrl, pageSize = 10) => {
  const [data, setData] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false); // Ref lock prevents duplicate calls

  const loadMore = useCallback(async () => {
    if (!hasMore || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(fetchUrl, {
        params: {
          limit: pageSize,
          cursor: nextCursor,
        },
      });

      const { data: newItems, pageInfo } = response.data;

      setData((prev) => [...prev, ...newItems]);
      setNextCursor(pageInfo.nextCursor);
      setHasMore(pageInfo.hasMore);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [fetchUrl, nextCursor, hasMore, pageSize]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return { data, isLoading, error, hasMore, sentinelRef, retry: loadMore };
};
\`\`\``,hi:`Race condition aur duplicate fetch se safe complete hook jo cursor pagination API ke sath seamlessly connect hota hai:

\`\`\`javascript
// hooks/useInfiniteScroll.js
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

export const useInfiniteScroll = (fetchUrl, pageSize = 10) => {
  const [data, setData] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sentinelRef = useRef(null);
  const isFetchingRef = useRef(false); // Double call rokne ke liye lock

  const loadMore = useCallback(async () => {
    if (!hasMore || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(fetchUrl, {
        params: { limit: pageSize, cursor: nextCursor },
      });

      const { data: newItems, pageInfo } = response.data;
      setData((prev) => [...prev, ...newItems]);
      setNextCursor(pageInfo.nextCursor);
      setHasMore(pageInfo.hasMore);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [fetchUrl, nextCursor, hasMore, pageSize]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, hasMore]);

  return { data, isLoading, error, hasMore, sentinelRef, retry: loadMore };
};
\`\`\``}},{type:"example",heading:{en:"Example 3: Production Social Feed Component with Skeleton & Error Retry",hi:"Example 3: Production Social Feed Component (Skeleton Loaders & Error Retry)"},body:{en:`Here is a full-featured Feed UI component rendering posts, animated Tailwind skeleton loaders during fetches, error alert with retry button, and a "Caught Up" state:

\`\`\`jsx
// components/SocialFeed.jsx
import React from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function SocialFeed() {
  const { data: posts, isLoading, error, hasMore, sentinelRef, retry } = useInfiniteScroll(
    '/api/posts/feed',
    10
  );

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Live Activity Feed</h1>

      {/* 1. Rendered Post Items */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post._id}
            className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition hover:shadow-md"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                {post.authorName?.[0] || 'U'}
              </div>
              <div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{post.authorName}</p>
                <p className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleTimeString()}</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{post.content}</p>
          </article>
        ))}
      </div>

      {/* 2. Loading Skeleton Placeholder */}
      {isLoading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((n) => (
            <div key={n} className="p-5 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3" />
                  <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/4" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full" />
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Error Banner with Retry */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
          <button
            onClick={retry}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* 4. The Invisible Sentinel Element */}
      {hasMore && !error && (
        <div ref={sentinelRef} className="h-10 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
        </div>
      )}

      {/* 5. End of Feed Notification */}
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500 flex flex-col items-center">
          <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
          <p className="font-medium">You're all caught up!</p>
          <p className="text-xs mt-1">No more posts to display right now.</p>
        </div>
      )}
    </div>
  );
}
\`\`\``,hi:`Complete Social Feed Component jisme Tailwind skeleton animation, error handling with retry, aur sentinel observer integrated hai:

\`\`\`jsx
// components/SocialFeed.jsx
import React from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function SocialFeed() {
  const { data: posts, isLoading, error, hasMore, sentinelRef, retry } = useInfiniteScroll(
    '/api/posts/feed',
    10
  );

  return (
    <div className="max-w-xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Live Activity Feed</h1>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post._id}
            className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <p className="font-semibold text-slate-800 dark:text-slate-100">{post.authorName}</p>
            <p className="text-slate-700 dark:text-slate-300 mt-2">{post.content}</p>
          </article>
        ))}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((n) => (
            <div key={n} className="p-5 bg-slate-100 dark:bg-slate-800/60 rounded-xl h-24" />
          ))}
        </div>
      )}

      {/* Error with Retry */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl flex justify-between items-center">
          <span className="text-sm text-red-600">{error}</span>
          <button onClick={retry} className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm">
            Retry
          </button>
        </div>
      )}

      {/* Invisible Sentinel Trigger */}
      {hasMore && !error && (
        <div ref={sentinelRef} className="h-10 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
        </div>
      )}

      {/* Caught up end indicator */}
      {!hasMore && (
        <div className="text-center py-6 text-slate-400">
          <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
          <p className="text-sm font-medium">You are all caught up!</p>
        </div>
      )}
    </div>
  );
}
\`\`\``}},{type:"mistakes",heading:{en:"Common Mistakes and How to Avoid Them",hi:"Aam Galtiyan Aur Unka Sahi Solution"},body:{en:"### 1. Forgetting to Disconnect the Observer in Cleanup\n- **Mistake**: Calling `observer.observe(target)` inside `useEffect` without returning `() => observer.disconnect()`.\n- **Consequence**: Every time the component re-renders or updates dependencies, a new observer instance is created. Multiple zombie observers fire simultaneously, triggering 5 duplicate API requests for the same page!\n- **Fix**: Always return `() => observer.disconnect()` from your `useEffect`.\n\n### 2. Not Guarding Against Overlapping Requests (The Rapid Scroll Bug)\n- **Mistake**: When a user flings the trackpad or scrolls vigorously, the sentinel triggers the intersection callback 3 times in 100 milliseconds before the first network request completes.\n- **Consequence**: The API is bombarded with 3 identical requests with the same cursor, resulting in triplicate items in your state array!\n- **Fix**: Use a synchronous `useRef(false)` guard (e.g. `isFetchingRef.current`) to block any subsequent fetch until the active Promise settles.\n\n### 3. Placing the Sentinel Inside an Unrendered Conditional Block\n- **Mistake**: Writing `{isLoading && <div ref={sentinelRef} />}`.\n- **Consequence**: When data finishes loading and `isLoading` flips to `false`, the sentinel node disappears from the DOM. The observer cannot observe anything, and infinite scrolling permanently breaks!\n- **Fix**: Keep the sentinel always mounted at the bottom of the list when `hasMore` is true.",hi:`### 1. useEffect Cleanup Mein Disconnect Bhool Jana
- **Galti**: \`observer.observe()\` lagana lekin \`return () => observer.disconnect()\` na likhna.
- **Nuksan**: Har re-render par naya observer ban jata hai. Ek hi scroll par 5 duplicate API requests chali jaati hain aur server crash ho sakta hai.
- **Solution**: Hamesha cleanup function mein \`observer.disconnect()\` call karein.

### 2. Rapid Scroll Par Race Condition (Duplicate Data)
- **Galti**: User jab tezi se mouse ghumata hai, toh sentinel 100ms mein 3 baar callback trigger kar deta hai jab tak pehli request ka response nahi aaya hota.
- **Nuksan**: Ek hi page ka data 3 baar fetch hokar screen par repeat ho jata hai.
- **Solution**: Ek synchronous \`isFetchingRef.current\` boolean lock banayein taaki jab tak pehla fetch complete na ho, doosra fetch block rahe.

### 3. Sentinel Ko Conditionally Gayab Kar Dena
- **Galti**: \`{isLoading && <div ref={sentinelRef} />}\` likhna.
- **Nuksan**: Jaise hi loading khatam hoti hai, sentinel DOM se delete ho jata hai aur aage ka scroll kabhi trigger nahi hota.
- **Solution**: Sentinel hamesha render rehna chahiye jab tak \`hasMore\` true ho.`}},{type:"tip",heading:{en:"Production Best Practices",hi:"Production Best Practices & Performance Optimization"},body:{en:`1. **Use \`rootMargin: '200px'\` to '300px' for Invisible Prefetching**:
   Never make the user wait for a loading spinner at the bottom. By setting a bottom rootMargin of 200px, the next batch loads while the user is still reading the previous items.
2. **Prevent Layout Shifts with Fixed-Height Placeholders**:
   When appending new cards, avoid sudden jumps by ensuring images have explicit aspect ratios (\`aspect-video\` or fixed width/height) and rendering skeleton cards of equal dimensions.
3. **List Virtualization for 1,000+ Items**:
   If a user scrolls through 2,000 posts, having 2,000 complex DOM nodes will slow down the browser's garbage collector and memory. For extreme list sizes, combine Intersection Observer with a virtualization library like \`@tanstack/react-virtual\` or \`react-window\`.
4. **Persist Scroll Position on Page Navigation**:
   When a user clicks a post in the feed to view details and then presses the browser "Back" button, restore their scroll position rather than forcing them to restart from the top!`,hi:`1. **\`rootMargin: '200px'\` Use Karein Invisible Prefetching Ke Liye**:
   User ko aakhri mein spinner dekhne ka intezar mat karwayein. Margin badha kar pehle hi agla data fetch kar lein taaki scrolling bilkul butter-smooth rahe.
2. **Layout Shifts Rokne Ke Liye Skeletons Use Karein**:
   Data aane par sudden layout jump na ho isliye card skeleton ka size real card ke barabar rakhein.
3. **1,000+ Items Ke Liye Virtualization**:
   Agar user hazaron posts scroll kar leta hai, toh 2,000 DOM elements memory bhar dete hain. Bohot badi lists ke liye \`@tanstack/react-virtual\` use karein jo sirf screen par dikhne wale elements ko DOM mein rakhta hai.
4. **Scroll Position Preserve Karein**:
   Agar user feed mein se kisi item ko click karke detail page par jaye aur phir 'Back' dabaye, toh scroll position wahi honi chahiye jahan usne chhodi thi.`}},{type:"interview",heading:{en:"Interview Questions & In-Depth Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:"### Q1: Why is the Intersection Observer API vastly superior to `window.addEventListener('scroll')` for infinite scroll?\n**Answer**:\n1. **Thread Execution**: Scroll event listeners run synchronously on the browser's main JavaScript thread. Because scroll events fire up to 120 times per second, executing DOM queries or calculations inside the listener causes **Layout Thrashing** and dropped frames (jank).\n2. **Native Optimization**: Intersection Observer runs asynchronously off the main thread inside the browser's native compositor/render pipeline. It only fires a callback when the element actually crosses the specified threshold or margin, reducing CPU overhead by over 95%.\n\n---\n\n### Q2: What is the purpose of the `rootMargin` property in an IntersectionObserver?\n**Answer**:\n`rootMargin` expands or contracts the bounding box of the intersection root (by default, the browser viewport). Setting `rootMargin: '250px'` causes the observer to trigger 250 pixels **before** the target element physically enters the screen. In infinite scroll feeds, this allows the next batch of data to prefetch over the network before the user hits the bottom of the list, delivering a zero-latency seamless experience.\n\n---\n\n### Q3: How do you prevent duplicate network requests when using IntersectionObserver with React?\n**Answer**:\nBecause React state updates (`setIsLoading(true)`) are asynchronous and scheduled for the next render, a rapid scroll event can fire the intersection callback multiple times before the component re-renders with `isLoading = true`.\nTo eliminate this race condition, use a synchronous mutable ref: `const isFetchingRef = useRef(false)`. Check `if (isFetchingRef.current) return;` and immediately set `isFetchingRef.current = true` synchronously prior to initiating the fetch Promise, resetting it in the `finally` block.",hi:"### Q1: Infinite scroll ke liye Intersection Observer `window.onscroll` se behtar kyun hai?\n**Answer**:\n1. **Thread Blocking**: `window.onscroll` browser ke main JavaScript thread par chalta hai aur 120 times per second fire ho sakta hai, jisse layout thrashing aur UI hang hone lagta hai.\n2. **Background Efficiency**: Intersection Observer browser ke native background render pipeline mein chalta hai. Ye main thread ko block kiye bina sirf tab callback deta hai jab sentinel element screen par aata hai. Isse CPU usage 95% kam ho jata hai.\n\n---\n\n### Q2: IntersectionObserver mein `rootMargin` ka kya kaam hota hai?\n**Answer**:\n`rootMargin` viewport ki boundary ko virtual tarike se bada kar deta hai. Agar hum `rootMargin: '250px'` set karte hain, toh jab sentinel screen se 250px door hoga tabhi agla batch fetch ho jayega. User ke neeche pahunchne se pehle hi content tayyar rehta hai aur zero lag milta hai.\n\n---\n\n### Q3: React mein duplicate network requests ko kaise rokte hain?\n**Answer**:\nKyunki React ka `useState` asynchronous hota hai, tezi se scroll karne par state update hone se pehle callback kayi baar trigger ho sakta hai.\nIs race condition ko rokne ke liye synchronous `useRef(false)` lock use kiya jata hai (`isFetchingRef.current`). Fetch shuru hone se pehle ise synchronously `true` set kar diya jata hai taaki doosri request enter na kar sake, aur `finally` block mein reset kar dete hain."}},{type:"summary",heading:{en:"Quick Summary",hi:"Quick Revision Summary"},body:{en:"- **Infinite Scroll** replaces paginated click buttons with continuous automated fetching as the user scrolls.\n- **Intersection Observer** provides performant, non-blocking asynchronous detection of element visibility off the main thread.\n- **The Sentinel Pattern** uses an invisible bottom marker element (`<div ref={sentinelRef} />`) observed by the IntersectionObserver.\n- **`rootMargin`** enables prefetching content before the user reaches the bottom of the page.\n- **Synchronous Ref Guards** (`isFetchingRef.current`) prevent rapid scroll race conditions and duplicate API requests.\n- **Cleanup with `observer.disconnect()`** inside `useEffect` ensures zero memory leaks.",hi:`- **Infinite Scroll** pagination buttons ko hata kar continuous seamless browsing experience deta hai.
- **Intersection Observer** main thread ko block kiye bina background mein element visibility detect karta hai.
- **Sentinel Pattern** list ke aakhri hisse mein invisible marker lagata hai jise observer monitor karta hai.
- **\`rootMargin\`** user ke aakhri hisse tak pahunchne se pehle hi naya batch mangwa leta hai (prefetch).
- **Synchronous Ref Lock** duplicate API calls aur race conditions ko rokta hai.
- **\`observer.disconnect()\`** cleanup memory leaks se bachaata hai.`}}],quiz:[{question:{en:"Why is the Intersection Observer API preferred over attaching an event listener to window.onscroll?",hi:"Infinite scroll ke liye window.onscroll ke badle Intersection Observer API kyun prefer ki jaati hai?"},options:[{en:"Because onscroll is only supported in Internet Explorer 6",hi:"Kyunki onscroll sirf Internet Explorer 6 mein chalta hai"},{en:"Intersection Observer runs asynchronously off the main thread, avoiding layout thrashing, main thread blocking, and frame drops",hi:"Intersection Observer asynchronously main thread ke bahar chalta hai jisse layout thrashing, UI freeze aur frame drops se bacha jaata hai"},{en:"Because onscroll cannot detect bottom scrolling",hi:"Kyunki onscroll bottom scrolling detect nahi kar sakta"},{en:"Because Intersection Observer automatically writes CSS styling",hi:"Kyunki Intersection Observer automatic CSS styling likhta hai"}],correctAnswer:1,explanation:{en:"Intersection Observer is handled asynchronously by the browser's compositor layer, preventing the continuous synchronous layout recalculations caused by reading scroll positions in onscroll.",hi:"Intersection Observer browser ke compositor layer par bina main thread ko roke kaam karta hai, jisse scroll par browser hang nahi hota."}},{question:{en:"What is the primary benefit of configuring rootMargin: '200px' in an infinite scroll IntersectionObserver?",hi:"Infinite scroll observer mein rootMargin: '200px' set karne ka mukhya fayda kya hai?"},options:[{en:"It forces the sentinel element to become 200px wider",hi:"Ye sentinel element ko 200px chauda bana deta hai"},{en:"It triggers the fetch callback 200 pixels BEFORE the sentinel hits the viewport, prefetching data seamlessly before the user reaches the bottom",hi:"Ye sentinel screen par aane se 200px pehle hi callback trigger kar deta hai, taaki user ke aakhri hisse mein pahunchne se pehle hi data download ho chuka ho"},{en:"It limits the maximum scroll speed to 200px/second",hi:"Ye scrolling speed ko 200px/sec par limit kar deta hai"},{en:"It shrinks the browser window by 200px",hi:"Ye browser window ko 200px chota kar deta hai"}],correctAnswer:1,explanation:{en:"rootMargin expands the intersection bounding box, allowing data to be fetched preemptively so users never experience loading pauses.",hi:"rootMargin trigger boundary ko bada kar deta hai jisse user ke neeche aane se pehle hi agla page background mein fetch ho jata hai."}},{question:{en:"What happens if you do not call observer.disconnect() in the React useEffect cleanup function?",hi:"React useEffect cleanup function mein observer.disconnect() na lagane se kya nuksan hota hai?"},options:[{en:"Duplicate observer instances accumulate on re-renders, resulting in duplicate API calls and memory leaks",hi:"Har re-render par duplicate observers judte chale jaate hain jisse duplicate API calls trigger hoti hain aur memory leak hota hai"},{en:"The entire React component gets deleted from the hard drive",hi:"React component hard drive se delete ho jata hai"},{en:"The user's computer screen turns black",hi:"Screen black ho jaati hai"},{en:"MongoDB database drops all collections",hi:"MongoDB saare collections delete kar deta hai"}],correctAnswer:0,explanation:{en:"Failing to disconnect creates zombie observers that persist across re-renders and continue observing target nodes, causing multiple simultaneous network calls.",hi:"Observer ko disconnect na karne par purane observers active rehte hain aur har scroll par duplicate requests bhejte hain."}},{question:{en:"Why is a mutable ref (e.g. isFetchingRef.current) used alongside useState to prevent duplicate fetches on fast scrolls?",hi:"Fast scroll par duplicate fetches rokne ke liye useState ke sath mutable ref (isFetchingRef.current) kyun use kiya jata hai?"},options:[{en:"useState is deprecated in modern React",hi:"useState React mein deprecated ho gaya hai"},{en:"useState updates are asynchronous and scheduled for the next render; a synchronous ref lock updates immediately to block rapid consecutive callbacks",hi:"useState updates asynchronous hote hain aur agle render par reflect hote hain; jabki synchronous ref turant update hokar double trigger ko block kar deta hai"},{en:"Refs automatically encrypt HTTP request headers",hi:"Refs HTTP headers encrypt karte hain"},{en:"IntersectionObserver only works when combined with useRef",hi:"IntersectionObserver sirf useRef ke sath hi kaam karta hai"}],correctAnswer:1,explanation:{en:"Because React state setter functions execute asynchronously, rapid scroll events can fire multiple callbacks before the component re-renders with loading=true. A ref provides an instant, synchronous lock.",hi:"React state update turant execute nahi hoti balki agle render par hoti hai. Ek synchronous ref lock usi millisecond mein block laga deta hai."}},{question:{en:"What is the core architectural purpose of Building Infinite Scroll in React (Intersection Observer) in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein React Mein Infinite Scroll Banana (IntersectionObserver) ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling building infinite scroll in react (intersection observer) with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath React Mein Infinite Scroll Banana (IntersectionObserver) ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Building Infinite Scroll in React (Intersection Observer) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Building Infinite Scroll in React (Intersection Observer) directly resolve?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Building Infinite Scroll in React (Intersection Observer), applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Building Infinite Scroll in React (Intersection Observer), how is its mental model best conceptualized through real-world analogies?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Building Infinite Scroll in React (Intersection Observer), what syntactic convention is essential to prevent runtime errors?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Building Infinite Scroll in React (Intersection Observer)?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Building Infinite Scroll in React (Intersection Observer) be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye React Mein Infinite Scroll Banana (IntersectionObserver) ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Building Infinite Scroll in React (Intersection Observer) impact application memory and CPU consumption?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Building Infinite Scroll in React (Intersection Observer)?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Building Infinite Scroll in React (Intersection Observer)?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Building Infinite Scroll in React (Intersection Observer)?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Building Infinite Scroll in React (Intersection Observer), what must the test suite assert?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Building Infinite Scroll in React (Intersection Observer)?",hi:"Modular design React Mein Infinite Scroll Banana (IntersectionObserver) mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Building Infinite Scroll in React (Intersection Observer) be architected to support horizontal scaling?",hi:"Traffic 100x badhne par React Mein Infinite Scroll Banana (IntersectionObserver) ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Building Infinite Scroll in React (Intersection Observer) properly belong and execute?",hi:"Full-stack MERN architecture mein React Mein Infinite Scroll Banana (IntersectionObserver) kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Building Infinite Scroll in React (Intersection Observer) in production?",hi:"Production mein React Mein Infinite Scroll Banana (IntersectionObserver) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Building Infinite Scroll in React (Intersection Observer)?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Building Infinite Scroll in React (Intersection Observer)?",hi:"React Mein Infinite Scroll Banana (IntersectionObserver) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
