export default {
  id: "react-router-v6",
  title: {
    en: "React Router v6: Nested Routes, NavLink & Outlet",
    hi: "React Router v6: Nested Routes & Layouts",
  },
  difficulty: "Intermediate",
  readTime: 12,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. Client-Side Routing in Single Page Applications (SPAs)",
        hi: "1. Single Page Applications (SPAs) Mein Client-Side Routing",
      },
      body: {
        en: `In traditional multi-page web applications, clicking an \`<a>\` link causes the browser to send an HTTP request to the server, fetch a completely new HTML file, and re-render the entire screen from scratch with a noticeable white flash.

In a **Single Page Application (SPA)** powered by **React Router v6**:
- Only a single HTML document (\`index.html\`) is initially loaded.
- When the user clicks a \`<Link to="/about">\`, React Router intercepts the browser navigation event, updates the URL bar using the browser's HTML5 **History API** (\`pushState\`), and renders the matching React component **without reloading the page**.
- Instant transitions, preserved state, and seamless app-like performance!`,
        hi: `Traditional websites mein jab user kisi link par click karta hai, toh browser server ko naya request bhejta hai, poora HTML page dobara download karta hai aur screen par white flash ke sath page reload hota hai.

**React Router v6** ke sath chalne wali **Single Page Application (SPA)** mein:
- Sirf ek hi HTML file (\`index.html\`) shuru mein load hoti hai.
- Jab user kisi link par click karta hai, toh React Router browser ke reload ko rok kar URL bar ko update karta hai (HTML5 History API) aur turant naya component render kar deta hai **bina page reload kiye**.
- Instant page transitions aur zero flicker!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Key Building Blocks of React Router v6",
        hi: "2. React Router v6 Ke Mukhya Building Blocks",
      },
      body: {
        en: `React Router v6 introduced powerful improvements over v5, centered around **Nested Routes** and the **\`<Outlet />\`** layout engine:

### Core Components:
- **\`<BrowserRouter>\`**: Wraps your application and enables HTML5 routing history.
- **\`<Routes>\`**: Replaces the old \`<Switch>\`. Matches the best route using an intelligent path-ranking algorithm.
- **\`<Route path="..." element={<MyComponent />}>\`**: Maps a URL path to a React component.
- **\`<Outlet />\`**: The placeholder inside a parent layout component that renders the matched child route.
- **\`<Link to="...">\`**: Replaces standard \`<a href="...">\` tags for client-side navigation.
- **\`<NavLink to="...">\`**: Special link that knows when it is active, accepting an \`isActive\` boolean callback for styling.

### Core Hooks:
- **\`useParams()\`**: Reads dynamic URL route parameters (e.g. \`/users/:id\` -> \`const { id } = useParams()\`).
- **\`useNavigate()\`**: Programmatic navigation (e.g. \`navigate('/dashboard', { replace: true })\`).
- **\`useSearchParams()\`**: Reads and updates URL query parameters (e.g. \`?sort=price&category=shoes\`).`,
        hi: `React Router v6 ne routing ko bohot aasan aur powerful bana diya hai:

### Mukhya Components:
- **\`<BrowserRouter>\`**: Poori app ko wrap karke routing history enable karta hai.
- **\`<Routes>\`**: Purane \`<Switch>\` ki jagah aaya hai aur best route match karta hai.
- **\`<Route path="..." element={<Component />}>\`**: URL path ko component se jodta hai.
- **\`<Outlet />\`**: Layout component ke andar ka placeholder jahan child route render hota hai (persistent navbar/sidebar ke liye).
- **\`<Link to="...">\`**: Bina page reload kiye client-side navigation karta hai.
- **\`<NavLink to="...">\`**: Active page hone par automatic styling lagane ki suvidha deta hai.

### Mukhya Hooks:
- **\`useParams()\`**: Dynamic URL IDs nikalne ke liye (\`/topic/:id\`).
- **\`useNavigate()\`**: Code ke zariye page navigate karne ke liye (\`navigate("/home")\`).
- **\`useSearchParams()\`**: URL ke query parameters (\`?search=shoes\`) padhne aur badalne ke liye.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Multi-Story Department Store & The Escalator",
        hi: "Real-Life Analogy: Multi-Story Mall Aur Persistent Layout (Outlet)",
      },
      body: {
        en: `Consider visiting a massive 5-story shopping mall (Phoenix Marketcity):

- **The Main Mall Building (\`<BrowserRouter>\`)**: The outer structure containing all stores and escalators.
- **The 3rd Floor Shared Layout (\`Parent Route with <Outlet />\`)**:
  - The 3rd floor has a fixed central walkway, air conditioning vents, restrooms, and customer service desk (**The persistent Layout component**).
  - Inside this floor, there are different store sections:
    - Shoes section (\`/floor3/shoes\`)
    - Watches section (\`/floor3/watches\`)
  - When you walk from the Shoes section to the Watches section, the mall building does NOT collapse and rebuild its restrooms and elevators! Only the interior retail shelf changes (**The \`<Outlet />\` swaps child components while the parent Navbar and Sidebar stay mounted!**).`,
        hi: `5-manzila Shopping Mall se samjhein:

- **Mall Ka Structure (\`<BrowserRouter>\`)**: Poori building jo saari dukano ko hold karti hai.
- **3rd Floor Ka Common Layout (\`Parent Route with <Outlet />\`)**:
  - 3rd floor par common AC, lift, washrooms aur reception desk hamesha fixed rehti hain (**Persistent Layout**).
  - Is floor ke andar alag-alag sections hain:
    - Joote (\`/floor3/shoes\`)
    - Ghadiyan (\`/floor3/watches\`)
  - Jab aap joote se ghadi ke section mein jate hain, toh poori building nahi girti aur dobara nahi banti! Sirf dukan ka interior badalta hai (**\`<Outlet />\` child route badal deta hai jabki Navbar/Sidebar wahi rehte hain**)!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax: Nested Routes & Layout Architecture",
        hi: "Syntax: Nested Routes Aur Layout Ka Structure",
      },
      body: {
        en: `### Defining Nested Routes with a Layout Wrapper:
\`\`\`jsx
import { BrowserRouter, Routes, Route, Outlet, Link, NavLink } from "react-router-dom";

// 1. Layout Component with Outlet
function AppLayout() {
  return (
    <div className="layout">
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>Dashboard</NavLink>
      </nav>
      <main>
        {/* Child routes render right here! */}
        <Outlet />
      </main>
    </div>
  );
}

// 2. Route Configuration
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Route holding the Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="topic/:topicId" element={<TopicDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
\`\`\``,
        hi: `### Nested Routes Ka Code Setup:
\`\`\`jsx
import { BrowserRouter, Routes, Route, Outlet, NavLink } from "react-router-dom";

// 1. Layout jisme Outlet laga ho
function MainLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      {/* Yahan child page render hoga */}
      <Outlet />
    </div>
  );
}

// 2. Routes define karein
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Complete App Layout with Active NavLinks & Outlet",
        hi: "Example 1: Active NavLinks Aur Outlet Ke Sath Complete Layout",
      },
      body: {
        en: `A modern responsive layout with sticky navbar, active link highlighting using \`NavLink\`, and content rendering inside \`<Outlet />\`.`,
        hi: `Sticky navbar aur active link highlighting ke sath reusable responsive layout.`,
      },
      code: {
        language: "jsx",
        filename: "AppShellLayout.jsx",
        snippet: `import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AppShellLayout() {
  const getNavClass = ({ isActive }) =>
    \`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all \${
      isActive
        ? "bg-indigo-600 text-white shadow-sm"
        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
    }\`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Persistent Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-extrabold text-sm tracking-wide text-indigo-600 dark:text-indigo-400">
            MERN LEARNING HUB
          </span>

          <nav className="flex items-center gap-2">
            <NavLink to="/" className={getNavClass} end>
              Home
            </NavLink>
            <NavLink to="/curriculum" className={getNavClass}>
              Curriculum
            </NavLink>
            <NavLink to="/profile" className={getNavClass}>
              Profile
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content Area: Outlet renders active child route! */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6">
        <Outlet />
      </main>

      {/* Persistent Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 p-4 text-center text-xs text-slate-400">
        © 2026 MERN Learning Hub • Client-Side Routed SPA
      </footer>
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Dynamic Route Parameters with useParams & useSearchParams",
        hi: "Example 2: Dynamic Route Params (useParams) Aur Query Strings (useSearchParams)",
      },
      body: {
        en: `Extracting dynamic URL parameters (\`/topic/:slug\`) alongside query search filters (\`?difficulty=Beginner\`) using React Router hooks.`,
        hi: `URL se dynamic ID padhna (\`useParams\`) aur search filter query string handle karna (\`useSearchParams\`).`,
      },
      code: {
        language: "jsx",
        filename: "TopicDetailPage.jsx",
        snippet: `import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

export default function TopicDetailPage() {
  // 1. useParams extracts dynamic URL tokens defined in route path: "/topic/:topicSlug"
  const { topicSlug } = useParams();

  // 2. useSearchParams reads and updates query string: "?level=beginner&tab=quiz"
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  // 3. useNavigate allows programmatic redirects
  const navigate = useNavigate();

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 max-w-lg">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold uppercase">
          Route: /topic/{topicSlug}
        </span>
        <button
          onClick={() => navigate("/curriculum")}
          className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white"
        >
          ← Back
        </button>
      </div>

      <h2 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
        Topic: {topicSlug?.replace(/-/g, " ")}
      </h2>

      {/* Tab switching via Query Parameters */}
      <div className="flex gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        {["overview", "code", "quiz"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSearchParams({ tab })}
            className={\`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition \${
              currentTab === tab
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
        Active Tab View: <strong>{currentTab.toUpperCase()}</strong>
      </div>
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Protected Route Guard Component with Redirect",
        hi: "Example 3: Protected Route Guard (Bina Login Ke Redirect Karna)",
      },
      body: {
        en: `Building an enterprise-grade \`<ProtectedRoute />\` wrapper component that checks authentication and redirects unauthenticated users to \`/login\` while preserving their intended return location.`,
        hi: `Auth check karke unauthenticated user ko login page par redirect karna aur login ke baad wapas usi page par lana.`,
      },
      code: {
        language: "jsx",
        filename: "ProtectedRoute.jsx",
        snippet: `import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * ProtectedRoute Component
 * Wraps child routes and redirects to /login if user is unauthenticated.
 * Preserves current location in state so user can be redirected back after login!
 */
export function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to /login, passing the current location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Router Setup Example
/*
<Routes>
  <Route path="/" element={<AppLayout />}>
    <Route index element={<PublicHome />} />
    <Route path="login" element={<LoginPage />} />
    
    // Guarded Route:
    <Route
      path="dashboard"
      element={
        <ProtectedRoute isAuthenticated={isUserLoggedIn}>
          <PrivateDashboard />
        </ProtectedRoute>
      }
    />
  </Route>
</Routes>
*/`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Aam Galatiyan Aur Unka Solution",
      },
      body: {
        en: `### 1. Using Standard \`<a href="...">\` Instead of \`<Link to="...">\`
- **Mistake**: Writing \`<a href="/dashboard">Dashboard</a>\`.
- **Consequence**: The browser initiates a hard server reload, completely wiping out all in-memory React state, audio playing, and active form data!
- **Fix**: Always use \`<Link to="/dashboard">\` or \`<NavLink to="/dashboard">\`.

### 2. Forgetting the \`<Outlet />\` Inside Layout Components
- **Mistake**: Defining nested routes in \`<Routes>\`, but omitting \`<Outlet />\` inside the parent Layout JSX.
- **Consequence**: The URL changes in the browser, but the child page never appears on the screen (remains blank)!
- **Fix**: Place \`<Outlet />\` exactly where you want child routes to render.

### 3. Missing the 404 Wildcard Catch-All Route
- **Mistake**: Leaving out \`<Route path="*" element={<NotFound />} />\`.
- **Consequence**: If a user navigates to an invalid URL, the screen renders empty whitespace.
- **Fix**: Always define a \`path="*"\` fallback route.`,
        hi: `### 1. \`<Link>\` Ki Jagah Normal \`<a href="...">\` Use Karna
- **Galati**: \`<a href="/profile">\` likhna.
- **Nuksan**: Browser poora page refresh kar deta hai aur React ki saari state gayab ho jaati hai!
- **Solution**: Hamesha \`<Link to="/profile">\` use karein.

### 2. Layout Component Mein \`<Outlet />\` Bhool Jana
- **Galati**: Nested routes banana lekin Layout ke JSX mein \`<Outlet />\` na lagana.
- **Nuksan**: URL badal jata hai lekin screen par child page ka content dikhta hi nahi hai!
- **Solution**: Layout mein jahan content dikhana ho wahan \`<Outlet />\` zaroor lagayein.

### 3. 404 Wildcard Route Na Rakhna
- **Galati**: \`<Route path="*" element={<NotFound />} />\` na lagana. Galat URL par blank screen dikhti hai.
- **Solution**: Hamesha wildcard \`*\` route lagayein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Routing Architecture",
        hi: "Routing Architecture Ke Best Practices",
      },
      body: {
        en: `1. **Use Relative Paths Inside Nested Routes**: When nesting routes inside \`path="dashboard"\`, write \`<Route path="settings">\` instead of \`<Route path="/dashboard/settings">\`. React Router automatically joins relative paths.
2. **Use \`end\` on Root NavLinks**: For the home link \`<NavLink to="/" end>\`, add the \`end\` prop so it doesn't match every single URL starting with \`/\`.
3. **Use \`navigate(..., { replace: true })\` for Redirects**: When redirecting after login or logout, use \`replace: true\` so the user doesn't get trapped in a back-button loop.
4. **Code-Split Routes with React.lazy**: Wrap heavy page components in \`React.lazy()\` and \`<Suspense>\` so users only download code for the page they are actively viewing.`,
        hi: `1. **Nested Routes Mein Relative Paths Use Karein**: \`path="settings"\` likhein na ki poora \`/dashboard/settings\`.
2. **Home NavLink Par \`end\` Lagayein**: \`<NavLink to="/" end>\` lagayein taaki home button har URL par active na dikhe.
3. **Login Redirects Mein \`replace: true\` Use Karein**: Login ke baad redirect karte waqt \`replace: true\` lagayein taaki back button dabane par user dobara login page par na fase.
4. **React.lazy Se Code-Splitting Karein**: Pages ko \`React.lazy()\` se load karein taaki shuru mein bundle size halka rahe.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Top Interview Sawaal Aur Jawab",
      },
      body: {
        en: `### Q1: What is the purpose of <Outlet /> in React Router v6?
**Answer**:
\`<Outlet />\` is a component used inside a parent route element to render its child route elements. It enables nested UI architectures where persistent elements (such as a sidebar, navigation header, and breadcrumb) remain mounted across route changes, while only the inner page content defined by the child route swaps inside the \`<Outlet />\`.

### Q2: What is the difference between <Link> and <NavLink>?
**Answer**:
- **\`<Link to="...">\`**: Performs client-side navigation without triggering a full page reload.
- **\`<NavLink to="...">\`**: A specialized version of \`<Link>\` that knows whether the current URL matches its target path. It accepts a function for \`className\` and \`style\` that receives an \`{ isActive: boolean }\` parameter, allowing you to highlight the currently active tab or menu item.

### Q3: How do useParams() and useSearchParams() differ?
**Answer**:
- **\`useParams()\`**: Extracts dynamic path parameters defined as part of the URL route structure (e.g., path \`/users/:id\` extracting \`{ id: "42" }\`).
- **\`useSearchParams()\`**: Reads and sets query string parameters that appear after the \`?\` mark in a URL (e.g., \`?sort=asc&page=2\`), returning a tuple similar to \`useState\`: \`[searchParams, setSearchParams]\`.`,
        hi: `### Q1: React Router v6 mein <Outlet /> ka kya kaam hota hai?
**Jawab**:
\`<Outlet />\` ek placeholder component hai jo parent layout ke andar child route ke content ko render karta hai. Iski madad se Navbar aur Sidebar wahi rehte hain aur sirf andar ka page content smoothly badal jata hai.

### Q2: <Link> aur <NavLink> mein kya farq hai?
**Jawab**:
- **\`<Link>\`**: Normal client-side navigation karta hai bina page refresh ke.
- **\`<NavLink>\`**: Yeh pehchanta hai ki kya current page wahi hai. Iske \`className\` mein \`{ isActive }\` parameter milta hai jisse active link ko highlight kiya ja sakta hai.

### Q3: useParams() aur useSearchParams() mein kya antar hai?
**Jawab**:
- **\`useParams()\`**: URL route path se dynamic IDs nikalta hai (jaise \`/users/:id\` se \`id\`).
- **\`useSearchParams()\`**: URL ke question mark ke baad ke query parameters (jaise \`?search=mern&page=1\`) ko read aur update karta hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: React Router v6",
        hi: "Quick Summary: React Router v6",
      },
      body: {
        en: `- **Client-Side Routing**: Fast transitions with zero full-page reloads using HTML5 History API.
- **<Outlet /> Engine**: Enables shared, persistent layout wrappers across nested routes.
- **<NavLink>**: Automatically injects \`isActive\` state for styling tabs and menus.
- **useParams**: Extracts URL path parameters (\`:slug\`).
- **useSearchParams**: Manages URL query parameters (\`?tab=quiz\`).`,
        hi: `- **Client-Side Routing**: HTML5 History API se bina reload ke instant navigation.
- **<Outlet />**: Persistent layouts aur nested routes ka core engine.
- **<NavLink>**: Active menu items ko highlight karne ke liye \`isActive\` deta hai.
- **useParams**: URL se dynamic parameters read karta hai.
- **useSearchParams**: URL ke query strings ko manage karta hai.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What happens if a parent layout component omits the <Outlet /> tag in React Router v6?",
      "hi": "Agar React Router v6 mein parent layout component <Outlet /> tag lagana bhool jaye toh kya hoga?"
    },
    "options": [
      {
        "en": "React will throw an unrecoverable syntax compilation error",
        "hi": "Compilation error aayega"
      },
      {
        "en": "The URL will update in the browser, but the child route's component will not render on screen",
        "hi": "URL badal jayega lekin child route ka component screen par render nahi hoga"
      },
      {
        "en": "The entire website redirects to google.com",
        "hi": "Redirect ho jayega"
      },
      {
        "en": "The browser reloads 5 times",
        "hi": "5 baar reload hoga"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Without <Outlet />, React Router has nowhere to project the matched child route element, resulting in an empty space where the child content was expected.",
      "hi": "Outlet ke bina React Router ko pata nahi hota ki child content kahan dikhana hai, isliye screen khali rehti hai."
    }
  },
  {
    "q": {
      "en": "Why should you use <Link to='/about'> instead of <a href='/about'> in a React SPA?",
      "hi": "React SPA mein <a href='/about'> ke bajaye <Link to='/about'> kyun use karna chahiye?"
    },
    "options": [
      {
        "en": "<a> tags are deprecated in modern HTML",
        "hi": "<a> tags deprecated hain"
      },
      {
        "en": "<Link> intercepts navigation via the HTML5 History API, preventing a full browser reload and preserving application state",
        "hi": "<Link> HTML5 History API se navigation handle karta hai jisse poora page reload nahi hota aur state bachi rehti hai"
      },
      {
        "en": "<Link> automatically encrypts passwords",
        "hi": "Passwords encrypt karta hai"
      },
      {
        "en": "<a> tags do not work on mobile phones",
        "hi": "Mobile par kaam nahi karte"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "<Link> performs client-side transitions without triggering expensive browser document reloads, preserving client-side React state and speed.",
      "hi": "<Link> bina browser refresh kiye client-side par page badalta hai jisse React ki state surakshit rehti hai."
    }
  },
  {
    "q": {
      "en": "Which hook should you use to read dynamic parameters like :productId from the route /product/:productId?",
      "hi": "/product/:productId route se :productId read karne ke liye kaunsa hook use hota hai?"
    },
    "options": [
      {
        "en": "useSearchParams()",
        "hi": "useSearchParams()"
      },
      {
        "en": "useParams()",
        "hi": "useParams()"
      },
      {
        "en": "useLocation()",
        "hi": "useLocation()"
      },
      {
        "en": "useId()",
        "hi": "useId()"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "useParams() returns an object of key/value pairs of URL parameters defined in the route path string.",
      "hi": "useParams() URL route path mein define kiye gaye dynamic parameters ka object return karta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of React Router v6: Nested Routes, NavLink & Outlet in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein React Router v6: Nested Routes & Layouts ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling react router v6: nested routes, navlink & outlet with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath React Router v6: Nested Routes & Layouts ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "React Router v6: Nested Routes, NavLink & Outlet establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "React Router v6: Nested Routes & Layouts clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does React Router v6: Nested Routes, NavLink & Outlet directly resolve?",
      "hi": "React Router v6: Nested Routes & Layouts kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without React Router v6: Nested Routes, NavLink & Outlet, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "React Router v6: Nested Routes & Layouts ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about React Router v6: Nested Routes, NavLink & Outlet, how is its mental model best conceptualized through real-world analogies?",
      "hi": "React Router v6: Nested Routes & Layouts ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing React Router v6: Nested Routes, NavLink & Outlet, what syntactic convention is essential to prevent runtime errors?",
      "hi": "React Router v6: Nested Routes & Layouts ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with React Router v6: Nested Routes, NavLink & Outlet?",
      "hi": "React Router v6: Nested Routes & Layouts ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should React Router v6: Nested Routes, NavLink & Outlet be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye React Router v6: Nested Routes & Layouts ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of React Router v6: Nested Routes, NavLink & Outlet impact application memory and CPU consumption?",
      "hi": "React Router v6: Nested Routes & Layouts ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within React Router v6: Nested Routes, NavLink & Outlet?",
      "hi": "React Router v6: Nested Routes & Layouts mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in React Router v6: Nested Routes, NavLink & Outlet?",
      "hi": "React Router v6: Nested Routes & Layouts mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in React Router v6: Nested Routes, NavLink & Outlet?",
      "hi": "React Router v6: Nested Routes & Layouts mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for React Router v6: Nested Routes, NavLink & Outlet, what must the test suite assert?",
      "hi": "React Router v6: Nested Routes & Layouts ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in React Router v6: Nested Routes, NavLink & Outlet?",
      "hi": "Modular design React Router v6: Nested Routes & Layouts mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should React Router v6: Nested Routes, NavLink & Outlet be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par React Router v6: Nested Routes & Layouts ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does React Router v6: Nested Routes, NavLink & Outlet properly belong and execute?",
      "hi": "Full-stack MERN architecture mein React Router v6: Nested Routes & Layouts kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with React Router v6: Nested Routes, NavLink & Outlet in production?",
      "hi": "Production mein React Router v6: Nested Routes & Layouts ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for React Router v6: Nested Routes, NavLink & Outlet?",
      "hi": "React Router v6: Nested Routes & Layouts ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in React Router v6: Nested Routes, NavLink & Outlet?",
      "hi": "React Router v6: Nested Routes & Layouts mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in React Router v6: Nested Routes, NavLink & Outlet?",
      "hi": "React Router v6: Nested Routes & Layouts mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
