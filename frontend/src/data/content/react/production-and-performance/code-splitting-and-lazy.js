export default {
  id: "react-code-splitting-lazy",
  title: {
    en: "Code Splitting with React.lazy & Suspense",
    hi: "Code Splitting with React.lazy & Suspense",
  },
  difficulty: "Intermediate",
  readTime: 9,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Monolithic Bundle Problem & Why Code Splitting Matters",
        hi: "1. Monolithic Bundle Ki Problem Aur Code Splitting Ki Zaroorat",
      },
      body: {
        en: `In standard Single Page Applications (SPAs), build tools like Vite or Webpack bundle all of your JavaScript code, styles, and third-party libraries into a single file (e.g. \`index.js\` or \`bundle.js\`).

As features are added (Admin Dashboards, Rich Text Editors, Charting libraries like Chart.js or D3, PDF export tools), this bundle swells to **2 MB, 5 MB, or even 10 MB**!

### The Performance Cost
- When a user visits your landing page or login screen on a mobile phone (especially on flaky 3G/4G connections), their browser must **download, parse, and execute the entire multi-megabyte bundle** before displaying the very first pixel!
- Metrics like **First Contentful Paint (FCP)** and **Time to Interactive (TTI)** skyrocket, leading to high bounce rates.
- Why should a guest user download 500 KB of Admin Dashboard code they will never have permissions to see?

### The Solution: Code Splitting
**Code Splitting** is the practice of breaking up your monolithic bundle into smaller, isolated "chunks" that are downloaded asynchronously on-demand—only when the user actually navigates to that specific route or opens that specific feature!`,
        hi: `Standard Single Page Apps (SPAs) mein build tool poori app ka saara JavaScript code ek single badi \`bundle.js\` file mein pack kar deta hai.

Jaise-jaise app badi hoti hai (Admin Panel, Chart libraries, Markdown editor, PDF generator), bundle ka size **3 MB se 8 MB** tak chala jata hai!

### Performance Ka Nuksan
- Jab koi user pehli baar landing page ya login screen par aata hai, toh uska phone poora 5 MB ka file download karta hai.
- Slow internet par user ko 5-10 second tak blank white screen dikhti hai, jisse bounce rate badh jata hai.
- Ek normal user jo sirf blog padhne aaya hai, uske browser ko Admin Panel ka 500 KB ka heavy code download karwane ka koi logic nahi hai!

### Code Splitting Ka Solution
**Code Splitting** aapke bundle ko chote-chote chunks mein tod deta hai. Browser sirf wahi chunk download karta hai jiski us page par zaroorat ho. Baki chunks tabhi aate hain jab user unhe visit kare!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. How React.lazy and Suspense Work Together",
        hi: "2. React.lazy Aur Suspense Ka Jodi Mein Kaam Karna",
      },
      body: {
        en: `React provides two built-in primitives to make code-splitting seamless:

### 1. Dynamic \`import()\`
Native JavaScript feature that returns a Promise resolving to the requested module:
\`\`\`javascript
// Static import: Loaded immediately at bundle time
import Dashboard from './pages/Dashboard';

// Dynamic import: Downloaded over the network only when called!
import('./pages/Dashboard').then(module => { ... });
\`\`\`

### 2. \`React.lazy()\`
\`React.lazy()\` takes a function that calls dynamic \`import()\`. It lets you render a dynamic import as a regular React component:
\`\`\`javascript
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
\`\`\`

### 3. \`<Suspense fallback={<LoadingSpinner />}>\`
Because a lazy component must be downloaded over the network, React needs to know what to display during the waiting period. 
The \`<Suspense>\` boundary wraps the lazy component and renders its \`fallback\` prop (like a skeleton loader or spinner) until the code finishes downloading!`,
        hi: `React code splitting ko aasan banane ke liye do core tools deta hai:

### 1. Dynamic \`import()\`
Static \`import\` app start hote hi load ho jata hai, jabki dynamic \`import('./pages/Dashboard')\` ek Promise return karta hai aur code tabhi download hota hai jab use call kiya jaye.

### 2. \`React.lazy()\`
Yeh dynamic import ko ek normal React component mein convert kar deta hai taaki aap use seedhe JSX mein \`<Dashboard />\` ki tarah render kar sakein.

### 3. \`<Suspense fallback={<Loader />}>\`
Kyunki lazy component network se download hone mein 200ms se 1s ka time le sakta hai, isliye \`<Suspense>\` boundary screen par blank screen aane se rokti hai aur download hone tak \`fallback\` spinner ya skeleton dikhati hai!`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: Video Streaming (Netflix/Hotstar) vs 50 GB Blu-Ray Disc",
        hi: "Real-Life Analogy: Netflix Streaming vs 50 GB Ki Blu-Ray Disc",
      },
      body: {
        en: `Imagine wanting to watch Episode 1 of a new web series on your TV:

- **The Monolithic Bundle Way (Old Blu-Ray Disc)**:
  Before you can watch the first 10 seconds of Episode 1, you are forced to sit and wait 4 hours until the player downloads all 8 Seasons, 80 episodes, director commentaries, and Hindi/Tamil/Telugu audio dubs onto the hard drive. You just wanted to check out the pilot episode!
- **The React.lazy & Suspense Way (Netflix Streaming)**:
  1. **Instant Play**: Netflix buffers and streams only the first few minutes of Episode 1 so you start watching in 1 second!
  2. **Suspense Fallback**: While the initial video chunk buffers, a sleek red spinner or preview poster appears on the screen.
  3. **On-Demand Chunks**: Season 4 and Season 5 are stored safely in the cloud. They are never fetched unless you binge your way to them. Your device's bandwidth and memory remain completely free!`,
        hi: `Web series dekhne ka real-world example dekhein:

- **Monolithic Bundle (50 GB Ki Blu-Ray DVD)**:
  Aapko sirf Episode 1 ka pehla scene dekhna hai, lekin system bolta hai: *"Pehle saare 10 seasons, behind-the-scenes, aur 5 bhashaon ke audio tracks download hone do 4 ghante tak, tabhi pehla scene chalu hoga!"*
- **React.lazy Aur Suspense (Netflix Live Streaming)**:
  1. **Instant Start**: Netflix sirf Episode 1 ke shuruat ke 30 seconds buffer karta hai aur 1 second mein video play kar deta hai!
  2. **Suspense Fallback**: Jab tak video download ho raha hota hai, screen par Netflix ka spinner ya poster dikhta hai.
  3. **On-Demand Chunks**: Season 3 ka data tabhi aayega jab aap Season 3 tak pahunchenge. Agar aapne show beech mein chhod diya, toh aapka data bekar kharch nahi hota!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax: Route-Based & Component-Based Code Splitting",
        hi: "Syntax: Route-Based Aur Component-Based Code Splitting",
      },
      body: {
        en: `### 1. Route-Based Code Splitting (Highest Impact)
The most recommended place to split code is at the route level using React Router v6:

\`\`\`jsx
// App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageSkeleton from './components/PageSkeleton';

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
\`\`\`

### 2. Lazy Loading Named Exports
\`React.lazy\` strictly requires the imported module to have a \`default\` export. If a library or component only has named exports, resolve it inline:
\`\`\`javascript
// Wrapping a named export { AnalyticsChart } in React.lazy
const AnalyticsChart = lazy(() =>
  import('./components/Charts').then((module) => ({ default: module.AnalyticsChart }))
);
\`\`\``,
        hi: `### Route-Based Code Splitting:
Har major page ko \`React.lazy(() => import('./pages/...'))\` se import karein aur \`<Routes>\` ko \`<Suspense fallback={<Loader />}>\` se wrap karein.

### Named Exports Ko Lazy Load Karna:
Kyunki \`React.lazy\` ko hamesha \`default\` export chahiye hota hai, named export ke liye \`.then(module => ({ default: module.ComponentName }))\` likhein.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Lazy Loading Heavy Modal / Dialog on Button Click",
        hi: "Example 1: Button Click Par Heavy Modal Dialog Lazy Load Karna",
      },
      body: {
        en: `In this example, an analytics modal containing a heavy charting component is only downloaded over the wire when the user explicitly clicks the "Open Analytics" button.

\`\`\`jsx
// src/components/DashboardView.jsx
import React, { useState, Suspense, lazy } from 'react';

// Heavy modal component chunk is NOT downloaded on initial page load!
const HeavyAnalyticsModal = lazy(() => import('./HeavyAnalyticsModal'));

export function DashboardView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: '24px' }}>
      <h2>Project Analytics Overview</h2>
      <p>Standard lightweight dashboard summary metrics...</p>

      <button
        onClick={() => setIsModalOpen(true)}
        style={{ padding: '10px 18px', backgroundColor: '#4f46e5', color: '#fff', borderRadius: '6px' }}
      >
        📊 View Detailed Chart Report
      </button>

      {/* Download chunk only when modal opens */}
      {isModalOpen && (
        <Suspense fallback={<div className="modal-spinner">Downloading chart engine... ⏳</div>}>
          <HeavyAnalyticsModal onClose={() => setIsModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
\`\`\``,
        hi: `Is example mein:
- \`HeavyAnalyticsModal\` ka heavy code initial page load par download nahi hota.
- Jab user *"View Detailed Chart Report"* button click karta hai, tabhi browser us chunk ko download karta hai.
- Download hone ke dauran \`<Suspense>\` ka fallback loader dikhta hai aur complete hote hi modal popup khul jata hai.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Route-Based Splitting with Skeleton Fallback in Vite",
        hi: "Example 2: Route-Based Splitting Aur Professional Skeleton Loader",
      },
      body: {
        en: `Using a polished Skeleton loader inside Suspense creates a seamless native-app feel when switching pages instead of a jarring empty blank page.

\`\`\`jsx
// src/components/SkeletonFallback.jsx
import React from 'react';

export function SkeletonFallback() {
  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      {/* Title skeleton */}
      <div style={{ height: '32px', width: '40%', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '20px', animation: 'pulse 1.5s infinite' }} />
      {/* Paragraph skeletons */}
      <div style={{ height: '16px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '4px', marginBottom: '10px' }} />
      <div style={{ height: '16px', width: '90%', backgroundColor: '#f1f5f9', borderRadius: '4px', marginBottom: '10px' }} />
      <div style={{ height: '16px', width: '75%', backgroundColor: '#f1f5f9', borderRadius: '4px', marginBottom: '20px' }} />
      {/* Card skeleton */}
      <div style={{ height: '180px', width: '100%', backgroundColor: '#e2e8f0', borderRadius: '8px' }} />
    </div>
  );
}
\`\`\`

\`\`\`jsx
// src/AppRoutes.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SkeletonFallback } from './components/SkeletonFallback';

const Feed = lazy(() => import('./pages/Feed'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

export function AppRoutes() {
  return (
    <Suspense fallback={<SkeletonFallback />}>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
\`\`\``,
        hi: `Suspense fallback mein simple "Loading..." text ke bajaye ek realistic \`<SkeletonFallback />\` dikhana user experience ko behtareen banata hai. User ko pata rehta hai ki layout kaisa dikhne wala hai jab tak lazy page load ho raha hota hai.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Intent-Based Prefetching on Link Hover",
        hi: "Example 3: User Hover Par Chunk Ko Pehle Se Download (Prefetch) Karna",
      },
      body: {
        en: `Code splitting sometimes creates a tiny 100-300ms delay when a user clicks a new page. We can eliminate this perception by **prefetching** the component chunk the moment the user hovers over the navigation link!

\`\`\`jsx
// src/components/PrefetchNavLink.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

// Factory function returning lazy component and its preload trigger
export function createLazyRoute(importFn) {
  const Component = React.lazy(importFn);
  // Calling importFn() triggers the browser to download & cache the JS chunk in HTTP cache!
  Component.preload = importFn;
  return Component;
}

// Declare page route
export const LazyAdminPanel = createLazyRoute(() => import('../pages/AdminPanel'));

export function AdminLink() {
  return (
    <NavLink
      to="/admin"
      // Prefetch the chunk the moment user's mouse hovers over the link!
      onMouseEnter={() => LazyAdminPanel.preload()}
      style={{ padding: '8px 16px', textDecoration: 'none', color: '#4f46e5' }}
    >
      Admin Panel
    </NavLink>
  );
}
\`\`\``,
        hi: `Yeh technique professional apps use karti hain (jaise Next.js links):
- Jaise hi user ka cursor link ke upar aata hai (\`onMouseEnter\`), \`LazyAdminPanel.preload()\` background mein chunk ko browser cache mein download kar leta hai.
- Jab user 200ms baad link click karta hai, toh page **instantly** bina kisi loading delay ke open ho jata hai!`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Common Mistakes Aur Unke Fixes",
      },
      body: {
        en: `### 1. Declaring React.lazy Inside a Component Body
- **Mistake**: Writing \`const LazyComponent = React.lazy(...)\` inside the render function of a parent component.
- **Why it breaks**: Every time the parent re-renders, a brand new component instance is created, forcing React to re-mount the entire subtree and display the fallback spinner on every render!
- **Fix**: Always declare \`React.lazy()\` at the top-level module scope outside of any component.

### 2. Lazy Loading Tiny Micro-Components (Over-Splitting)
- **Mistake**: Lazy loading a 10-line icon or standard button component.
- **Why it hurts**: Each network chunk has an HTTP handshake, DNS lookup, and roundtrip latency. Over-splitting creates hundreds of tiny 1 KB files, making the app slower and causing visual layout flashes.
- **Fix**: Only lazy load major routes or truly heavy components (like Rich Text Editors, 3D Canvas, Chart engines).

### 3. Missing Error Boundary for Network Chunk Failures
- **Mistake**: When you deploy a new version of your app to production, old bundle chunk hashes on the server are replaced. A user with an open tab who clicks a lazy route will get a \`Failed to fetch dynamically imported module\` runtime error!
- **Fix**: Always wrap \`<Suspense>\` inside an \`<ErrorBoundary>\` that provides a "Reload Page" button.`,
        hi: `### 1. React.lazy Ko Component Ke Andar Likh Dena
- **Galti**: Component function ke andar \`const Page = lazy(...)\` declare karna.
- **Nuksan**: Har re-render par naya component banega aur har baar Suspense ka loading spinner baar-baar flash karega.
- **Fix**: Hamesha file ke top-level par \`lazy()\` declare karein.

### 2. Chote-Chote 5-Line Components Ko Lazy Load Karna (Over-Splitting)
- **Galti**: Har button ya icon ko lazy load karna.
- **Nuksan**: Har chunk ke liye alag HTTP network request lagti hai jo app ko ulta slow kar deti hai.
- **Fix**: Sirf major pages ya heavy libraries (charts, text editors) ko hi split karein.

### 3. Network Drop Par Error Boundary Na Rakhna
- **Galti**: Chunk download fail hone par screen crash ho jana.
- **Fix**: \`<Suspense>\` ko hamesha ek \`<ErrorBoundary>\` se wrap karein taaki network fail hone par user ko "Retry" ka button dikhe.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Production Code-Splitting Strategy",
        hi: "Best Practices: Production Code-Splitting Strategy",
      },
      body: {
        en: `1. **Route-Based Splitting Delivers 80% of Gains**: Start by code-splitting all top-level page routes. This gives you the biggest reduction in initial bundle size with minimal architectural effort.
2. **Inspect Bundle with Visualizer**: Install \`rollup-plugin-visualizer\` in Vite to generate a visual treemap diagram of your production bundles and spot oversized dependencies.
3. **Use Meaningful Fallbacks**: Avoid jarring layout shifts by designing skeleton loaders that match the exact aspect ratio and shape of the page being loaded.
4. **Group Common Vendors in Manual Chunks**: Configure Vite's \`build.rollupOptions.output.manualChunks\` to group massive vendor dependencies (like React and React-DOM) into a long-lived, cached vendor chunk.`,
        hi: `1. **Route-Based Splitting First**: Sabse pehle top-level page routes ko split karein. Isse bina kisi dikkat ke 70-80% initial bundle size kam ho jata hai.
2. **Bundle Visualizer Use Karein**: Vite mein \`rollup-plugin-visualizer\` run karke check karein ki kaunsi third-party library sabse zyada space le rahi hai.
3. **Polished Skeletons**: Blank spinner ke bajaye page jaisa skeleton dikhayein taaki layout shift na ho.
4. **Vite Manual Chunks**: \`manualChunks\` se common packages (React, React-DOM) ko alag vendor chunk mein rakhein taaki browser use lambe time tak cache rakh sake.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Interview Ke Zaroori Sawal Aur Jawab",
      },
      body: {
        en: `### Q1: What is the difference between static import and dynamic import()?
**Answer**:
- **Static import** (\`import X from './X'\`): Evaluated statically at compile/build time. Must be placed at the top level of a file. The imported module is bundled into the main chunk and loaded immediately.
- **Dynamic import()** (\`import('./X')\`): Evaluated asynchronously at runtime. Returns a Promise that resolves to the module namespace. It acts as a code-splitting split point, allowing the bundler to emit a separate chunk file that is fetched on demand over the network.

### Q2: Why does React.lazy require the target module to have a default export?
**Answer**: \`React.lazy\` is designed with the convention of importing whole component modules, which traditionally use \`export default\`. To lazy load a named export, you must manually chain a \`.then()\` handler that returns an object with a \`default\` key: \`lazy(() => import('./Components').then(m => ({ default: m.MyComponent })))\`.

### Q3: What happens if a network failure occurs while downloading a lazy chunk?
**Answer**: The Promise returned by the dynamic \`import()\` rejects. React treats this as an uncaught rendering error in the component tree. Unless caught by a parent **Error Boundary**, the entire React application tree will crash and unmount, leaving a blank screen.

### Q4: What is the purpose of the Suspense component's fallback prop?
**Answer**: The \`fallback\` prop specifies the React elements to display to the user while any child components inside the Suspense boundary are in a suspended state (e.g. waiting for a code chunk to download or waiting for an async resource to resolve).`,
        hi: `### Q1: Static import aur Dynamic import() mein kya farq hai?
**Jawab**:
- **Static import**: Compile time par parse hota hai aur file ke top par likha jata hai. Poora code main bundle mein merge ho jata hai.
- **Dynamic import()**: Runtime par execute hota hai, Promise return karta hai, aur bundler ko code ko alag chunk file mein todne ka signal deta hai jo on-demand download hoti hai.

### Q2: React.lazy ko default export kyun chahiye hota hai?
**Jawab**: React.lazy convention ke hisaab se default export expect karta hai. Named export use karne ke liye humein \`.then(m => ({ default: m.MyComponent }))\` likhkar use default format mein adapt karna padta hai.

### Q3: Agar lazy chunk download hote waqt internet band ho jaye toh kya hoga?
**Jawab**: Dynamic import promise reject ho jayega. Agar \`<Suspense>\` ke upar **Error Boundary** nahi lagi hogi, toh poori React app crash ho jayegi aur blank screen dikhegi.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Code Splitting Cheatsheet",
        hi: "Quick Summary: Code Splitting Cheatsheet",
      },
      body: {
        en: `- **Monolithic Bundles Hurt FCP & TTI**: Downloading megabytes of JavaScript on initial page load harms user experience.
- **Dynamic import()**: Native syntax returning a Promise to asynchronously fetch a JS chunk.
- **React.lazy()**: Renders dynamic imports as standard React components; requires \`export default\`.
- **Suspense Component**: Wraps lazy components and displays a \`fallback\` UI during network downloads.
- **Route-Based Splitting**: The highest ROI optimization pattern in React applications.
- **Always Pair with Error Boundaries**: Prevent app-wide white-screen crashes on network disconnections.
- **Hover Prefetching**: Preload chunks on navigation link hover to deliver instantaneous route transitions.`,
        hi: `- **Monolithic Bundles**: Badi single file se initial page load slow ho jata hai.
- **Dynamic import()**: Asynchronous module download karne ka syntax.
- **React.lazy()**: Dynamic import ko React component mein badalne ka hook.
- **Suspense**: Download hone tak \`fallback\` loader ya skeleton dikhane wala wrapper.
- **Route-Based Splitting**: Sabse recommended aur impactful code-splitting pattern.
- **Error Boundaries Zaroori Hain**: Network error aane par app crash hone se bachata hai.
- **Hover Prefetching**: Link par hover karte hi chunk download kar lena taaki page instant open ho sake.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "What type of export does React.lazy expect by default from the imported module?",
      "hi": "React.lazy imported module se default roop se kis type ka export expect karta hai?"
    },
    "options": [
      {
        "en": "Named export",
        "hi": "Named export"
      },
      {
        "en": "Default export",
        "hi": "Default export"
      },
      {
        "en": "CommonJS module.exports",
        "hi": "CommonJS module.exports"
      },
      {
        "en": "Global window object",
        "hi": "Global window object"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "React.lazy requires the module to have a default export. For named exports, an inline .then(m => ({ default: m.Named })) adapter must be used.",
      "hi": "React.lazy module se default export expect karta hai. Named exports ke liye .then() se default format mein adapt karna padta hai."
    }
  },
  {
    "question": {
      "en": "What does the <Suspense> component display while the lazy chunk is downloading over the network?",
      "hi": "Lazy chunk download hone ke dauran <Suspense> component screen par kya display karta hai?"
    },
    "options": [
      {
        "en": "A blank white screen",
        "hi": "Ek blank white screen"
      },
      {
        "en": "The JSX provided to its fallback prop",
        "hi": "Fallback prop mein provide kiya gaya JSX element"
      },
      {
        "en": "An uncaught runtime error",
        "hi": "Ek uncaught runtime error"
      },
      {
        "en": "The previous website in browser history",
        "hi": "Browser history ka pichla page"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "The fallback prop of <Suspense> accepts any valid React element (such as a spinner or skeleton loader) that renders until the suspended children resolve.",
      "hi": "<Suspense> ka fallback prop spinner ya skeleton UI dikhata hai jab tak lazy component download nahi ho jata."
    }
  },
  {
    "question": {
      "en": "Where should React.lazy declarations be placed in your codebase?",
      "hi": "Codebase mein React.lazy declarations kahan declare hone chahiye?"
    },
    "options": [
      {
        "en": "Inside a useEffect callback",
        "hi": "useEffect callback ke andar"
      },
      {
        "en": "At the top-level module scope outside of any component",
        "hi": "Kisi bhi component ke bahar top-level module scope mein"
      },
      {
        "en": "Inside the component's onClick handler",
        "hi": "Component ke onClick handler ke andar"
      },
      {
        "en": "Directly inside HTML script tags",
        "hi": "Directly HTML script tags ke andar"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "React.lazy should always be declared at the module level. Declaring it inside a component creates a new component type on every render, resetting state and flashing the fallback.",
      "hi": "React.lazy ko hamesha component ke bahar top-level par declare karein taaki har re-render par naya component reference na bane."
    }
  },
  {
    "question": {
      "en": "What happens if a user navigates to a lazy route while their internet connection drops, and no Error Boundary exists?",
      "hi": "Agar internet disconnect hone par user kisi lazy route par jata hai aur koi Error Boundary nahi lagi hai, tab kya hota hai?"
    },
    "options": [
      {
        "en": "The entire React component tree crashes, leaving an empty blank screen",
        "hi": "Poora React component tree crash ho jata hai aur blank screen aati hai"
      },
      {
        "en": "React automatically opens Google Chrome settings",
        "hi": "React automatically Chrome settings open kar deta hai"
      },
      {
        "en": "The browser automatically connects to local Bluetooth",
        "hi": "Browser local Bluetooth se connect karta hai"
      },
      {
        "en": "React writes a new file to the user's hard drive",
        "hi": "React hard drive par nayi file likhta hai"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "en": "A failed dynamic import causes a rejected promise during rendering. Uncaught render errors bubble to the root and cause React to unmount the entire application unless caught by an Error Boundary.",
      "hi": "Failed dynamic import render error trigger karta hai. Error Boundary na hone par poora component tree unmount ho jata hai aur blank screen dikhti hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Code Splitting with React.lazy & Suspense in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Code Splitting with React.lazy & Suspense ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling code splitting with react.lazy & suspense with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Code Splitting with React.lazy & Suspense ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Code Splitting with React.lazy & Suspense establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Code Splitting with React.lazy & Suspense clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Code Splitting with React.lazy & Suspense directly resolve?",
      "hi": "Code Splitting with React.lazy & Suspense kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Code Splitting with React.lazy & Suspense, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Code Splitting with React.lazy & Suspense ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Code Splitting with React.lazy & Suspense, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Code Splitting with React.lazy & Suspense ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Code Splitting with React.lazy & Suspense, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Code Splitting with React.lazy & Suspense ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Code Splitting with React.lazy & Suspense?",
      "hi": "Code Splitting with React.lazy & Suspense ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Code Splitting with React.lazy & Suspense be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Code Splitting with React.lazy & Suspense ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Code Splitting with React.lazy & Suspense impact application memory and CPU consumption?",
      "hi": "Code Splitting with React.lazy & Suspense ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Code Splitting with React.lazy & Suspense?",
      "hi": "Code Splitting with React.lazy & Suspense mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Code Splitting with React.lazy & Suspense?",
      "hi": "Code Splitting with React.lazy & Suspense mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Code Splitting with React.lazy & Suspense?",
      "hi": "Code Splitting with React.lazy & Suspense mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Code Splitting with React.lazy & Suspense, what must the test suite assert?",
      "hi": "Code Splitting with React.lazy & Suspense ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Code Splitting with React.lazy & Suspense?",
      "hi": "Modular design Code Splitting with React.lazy & Suspense mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Code Splitting with React.lazy & Suspense be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Code Splitting with React.lazy & Suspense ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Code Splitting with React.lazy & Suspense properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Code Splitting with React.lazy & Suspense kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Code Splitting with React.lazy & Suspense in production?",
      "hi": "Production mein Code Splitting with React.lazy & Suspense ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Code Splitting with React.lazy & Suspense?",
      "hi": "Code Splitting with React.lazy & Suspense ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Code Splitting with React.lazy & Suspense?",
      "hi": "Code Splitting with React.lazy & Suspense mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
  }
],
};
