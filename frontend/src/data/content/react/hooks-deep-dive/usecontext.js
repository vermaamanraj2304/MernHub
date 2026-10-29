export default {
  id: "react-hooks-usecontext",
  title: {
    en: "useContext & Context API",
    hi: "useContext & Context API (Global State)",
  },
  difficulty: "Intermediate",
  readTime: 12,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What is the Context API? (Eliminating Prop Drilling)",
        hi: "1. Context API Kya Hai? Prop Drilling Ka Permanent Ilaj",
      },
      body: {
        en: `In standard React applications, data is passed top-down via props. When a piece of data is needed by a component deeply nested 6 levels down, you must pass that prop through all 5 intermediate components—even if those intermediate components do not care about the data at all. This problem is known as **Prop Drilling**.

The **Context API** solves this by providing a way to share values (like the current authenticated user, UI theme, or language preference) across the entire component tree without explicitly passing props through every single level.

### The 3 Core Pillars of Context:
1. **\`createContext(defaultValue)\`**: Creates the context object.
2. **\`<Context.Provider value={...}>\`**: Wraps the component tree and supplies the data to all descendants.
3. **\`useContext(Context)\`**: The hook that any child or grandchild component calls to read the context value directly.`,
        hi: `React mein data props ke zariye Parent se Child ki taraf pass hota hai. Lekin agar kisi data ki zaroorat 6th layer ke child ko ho, toh beech ke 5 components ko zabardasti woh prop aage pass karna padta hai—chahe unhe us data se koi lena-dena na ho. Is problem ko **Prop Drilling** kehte hain.

**Context API** iska permanent solution deta hai. Iske zariye aap poori component tree ke liye data (jaise user login status, dark/light theme, ya language) ko broadcast kar sakte hain bina beech ke components ko pareshan kiye.

### Context Ke 3 Mukhya Pillars:
1. **\`createContext(defaultValue)\`**: Naya context container banata hai.
2. **\`<Context.Provider value={...}>\`**: Poori app ko wrap karke data provide karta hai.
3. **\`useContext(Context)\`**: Koi bhi child component seedhe is hook se data nikal leta hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Consumer Re-rendering & Value Memoization",
        hi: "2. Context Re-rendering Aur useMemo Se Value Protect Karna",
      },
      body: {
        en: `Whenever the **\`value\`** prop passed to a \`<Context.Provider value={...}>\` changes reference, **every single component that calls \`useContext(MyContext)\` will automatically re-render**, even if wrapped in \`React.memo\`!

### The Performance Trap:
\`\`\`jsx
// ❌ DANGEROUS: A new object reference is created on EVERY render of App!
<ThemeContext.Provider value={{ theme, setTheme }}>
  <Dashboard />
</ThemeContext.Provider>
\`\`\`
Every time \`<App />\` re-renders for any reason, \`{ theme, setTheme }\` creates a brand-new object in RAM. This forces all 200 components consuming \`ThemeContext\` to re-render unnecessarily!

### The Solution:
Always memoize the context value object using **\`useMemo\`**:
\`\`\`jsx
// ✅ OPTIMIZED: The object reference changes ONLY when 'theme' changes!
const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

<ThemeContext.Provider value={contextValue}>
  <Dashboard />
</ThemeContext.Provider>
\`\`\``,
        hi: `Jab bhi \`<Context.Provider value={...}>\` ka \`value\` badalta hai, **har woh component jo \`useContext\` use kar raha hai turant re-render ho jata hai**, chahe use \`React.memo\` se wrap kyun na kiya gaya ho!

### Performance Trap:
\`\`\`jsx
// ❌ KHATARNAK: Har render par naya object reference banega!
<ThemeContext.Provider value={{ theme, setTheme }}>
\`\`\`
Parent ke render hote hi \`{ theme, setTheme }\` naya object ban jata hai, jisse context consume karne wale saare 100 components faltu mein re-render hone lagte hain!

### Sahi Tareeka:
Hamesha context value ko **\`useMemo\`** se wrap karein:
\`\`\`jsx
// ✅ OPTIMIZED: Object reference sirf tab badlega jab 'theme' badlega
const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

<ThemeContext.Provider value={contextValue}>
\`\`\``,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Society Underground Water Tank vs The Bucket Brigade",
        hi: "Real-Life Analogy: Society Ka Central Water Tank vs Baalti Pass Karna",
      },
      body: {
        en: `Consider how water is supplied to a 10-story apartment building in Mumbai:

- **Prop Drilling (The Bucket Brigade)**:
  - Water arrives on the ground floor.
  - Floor 1 resident fills a bucket, carries it up to Floor 2, Floor 2 carries it to Floor 3, and so on up to Floor 10.
  - Residents on Floors 2 through 9 don't even need water right now, but they are exhausted carrying buckets all day (**Props cluttering intermediate components**) !
- **Context API (The Central Water Pipeline & Underground Tank)**:
  - The municipal water is pumped into a **Central Overhead Tank on the terrace (\`<Context.Provider>\`)**.
  - Internal plumbing pipes run through the walls directly to every apartment.
  - When the resident on Flat 1002 wants water, they simply turn on their kitchen tap (**calling \`useContext()\`**). Floors 1 through 9 have zero involvement and zero disruption!`,
        hi: `10-manzila building mein paani pahunchane se samjhein:

- **Prop Drilling (Baalti Pass Karna)**:
  - Ground floor par paani aaya. 1st floor wale ne baalti 2nd floor ko di, 2nd ne 3rd ko, aise hi 10th floor tak baalti gayi.
  - Beech ke 8 logon ko paani nahi chahiye tha, fir bhi unhe din bhar baalti uthani padi (**Intermediate components par prop load**).
- **Context API (Central Tank Aur Underground Pipeline)**:
  - Chhat par ek **Central Water Tank (\`<Context.Provider>\`)** laga diya gaya jisme pipeline judi hai.
  - 10th floor wale ko jab paani chahiye, woh apne kitchen ka nal khol leta hai (**\`useContext()\` call karna**). Beech ke kisi bhi padosi ko pareshan karne ki zaroorat nahi padti!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax: Custom Provider & Custom Hook Pattern",
        hi: "Syntax: Custom Provider Aur Custom Hook Ka Standard Pattern",
      },
      body: {
        en: `### The Professional 3-Step Custom Context Pattern:
\`\`\`jsx
import { createContext, useContext, useState, useMemo } from "react";

// 1. Create Context
const ThemeContext = createContext(null);

// 2. Custom Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => (t === "light" ? "dark" : "light"))
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// 3. Custom Hook with Safety Guard
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider!");
  }
  return context;
}
\`\`\``,
        hi: `### Production-Ready Custom Context Ka Pattern:
\`\`\`jsx
import { createContext, useContext, useState, useMemo } from "react";

// 1. Context banayein
const ThemeContext = createContext(null);

// 2. Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === "light" ? "dark" : "light")
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// 3. Custom hook jo error check kare
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme ko ThemeProvider ke andar hi use karein!");
  }
  return context;
}
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Complete Theme Context (Dark & Light Mode)",
        hi: "Example 1: Complete Theme Context (Dark Aur Light Mode)",
      },
      body: {
        en: `A self-contained Theme Context implementation with localStorage persistence, html class toggle, and consumption in child components.`,
        hi: `Theme Context implementation jo localStorage mein theme save karta hai aur child button se toggle hota hai.`,
      },
      code: {
        language: "jsx",
        filename: "ThemeContext.jsx",
        snippet: `import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app_theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("app_theme", theme);
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    isDark: theme === "dark",
    toggleTheme: () => setTheme(prev => (prev === "light" ? "dark" : "light"))
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be consumed within a ThemeProvider");
  }
  return context;
}

// Consuming Component: NavButton
export function ThemeToggleBtn() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold shadow-xs transition"
    >
      {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: User Authentication Context (Login, Logout, Guarded UI)",
        hi: "Example 2: User Auth Context (Login, Logout Aur Role Protection)",
      },
      body: {
        en: `Managing user session state across an app: Storing JWT user profile, providing login and logout methods, and displaying user details in the navbar.`,
        hi: `User auth session manage karna: login/logout methods aur navbar mein user details display karna.`,
      },
      code: {
        language: "jsx",
        filename: "AuthContext.jsx",
        snippet: `import React, { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Aman Verma",
    email: "aman@example.com",
    role: "admin"
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === "admin",
    login,
    logout
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Consuming Component: Navbar User Menu
export function UserNavbarBadge() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <button className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold">
        Login
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="text-xs">
        <p className="font-bold text-slate-800 dark:text-white">{user.name}</p>
        <p className="text-[10px] text-indigo-500 uppercase font-semibold">{user.role}</p>
      </div>
      <button
        onClick={logout}
        className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/40 hover:bg-rose-100 transition"
      >
        Logout
      </button>
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Bilingual Language Context (English | Hinglish)",
        hi: "Example 3: Bilingual Language Context (English Ya Hinglish Switch)",
      },
      body: {
        en: `A real-world Language Context enabling an educational app to switch between English and Hinglish content across all screens.`,
        hi: `Language context jo poori application mein English aur Hinglish content ke beech switch karta hai.`,
      },
      code: {
        language: "jsx",
        filename: "LanguageContext.jsx",
        snippet: `import React, { createContext, useContext, useState, useMemo } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("hi"); // 'en' | 'hi'

  const value = useMemo(() => ({
    lang,
    isHinglish: lang === "hi",
    setLanguage: (newLang) => setLang(newLang)
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be wrapped inside LanguageProvider");
  }
  return context;
}

// Consuming Component: Greeting Banner
export function GreetingBanner() {
  const { lang, setLanguage } = useLanguage();

  const content = {
    en: {
      title: "Welcome to MERN Learning Hub",
      sub: "Master full-stack engineering with zero fluff."
    },
    hi: {
      title: "MERN Learning Hub Mein Swagat Hai",
      sub: "Full-stack development sikhein shuru se advance tak."
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-indigo-600 text-white shadow-xl max-w-md space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{content[lang].title}</h2>
        <div className="flex bg-indigo-800 rounded-xl p-1 text-[10px] font-bold">
          <button
            onClick={() => setLanguage("en")}
            className={\`px-2 py-0.5 rounded-lg \${lang === "en" ? "bg-white text-indigo-900" : "text-white"}\`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("hi")}
            className={\`px-2 py-0.5 rounded-lg \${lang === "hi" ? "bg-white text-indigo-900" : "text-white"}\`}
          >
            HI
          </button>
        </div>
      </div>
      <p className="text-xs text-indigo-100">{content[lang].sub}</p>
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
        en: `### 1. Passing an Unmemoized Object to Provider Value
- **Mistake**: Writing \`<MyContext.Provider value={{ user, logout }}>\`. Every render of the parent component instantiates a brand new object in memory, triggering re-renders for every consumer component in the entire app!
- **Fix**: Wrap the value in \`useMemo(() => ({ user, logout }), [user])\`.

### 2. Using Context for Rapid, High-Frequency State (e.g. Mouse Position)
- **Mistake**: Putting mouse coordinates, fast typing inputs, or scroll offsets into React Context.
- **Consequence**: Since every consumer re-renders on context changes, your application will stutter at 10 FPS.
- **Fix**: Keep high-frequency state local, or use specialized state stores like Zustand or Jotai.

### 3. Calling \`useContext\` Outside the \`<Provider>\`
- **Mistake**: Calling \`useAuth()\` in a component that is rendered above or outside the \`<AuthProvider>\` tree. The context will be \`null\` or undefined.
- **Fix**: Wrap the app root in the provider, or throw a helpful error inside your custom hook.`,
        hi: `### 1. Provider Value Mein Unmemoized Object Pass Karna
- **Galati**: \`value={{ user, logout }}\` likhna. Parent ke har render par naya object reference banne se saare consumers faltu mein re-render hote hain.
- **Solution**: Hamesha \`useMemo\` ka use karein: \`useMemo(() => ({ user, logout }), [user])\`.

### 2. High-Frequency State Ke Liye Context Use Karna
- **Galati**: Mouse coordinates, text typing ya scroll position ko Context mein rakhna.
- **Nuksan**: Har millisecond par poori app re-render hogi aur website freeze ho jayegi.
- **Solution**: Fast-changing data ko local state mein rakhein ya Zustand use karein.

### 3. \`<Provider>\` Ke Bahar \`useContext\` Call Karna
- **Galati**: Component ko provider ke bahar render karna aur hook call karna. Context \`null\` milta hai.
- **Solution**: Custom hook mein check lagayein: \`if (!context) throw new Error(...)\`.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Context Hygiene",
        hi: "Context API Ke Best Practices",
      },
      body: {
        en: `1. **Always Expose a Custom Hook**: Never export \`MyContext\` directly for raw \`useContext(MyContext)\` usage. Export a custom hook \`useMyContext()\` that encapsulates error checking.
2. **Split Contexts by Domain**: Do not create one monolithic "God Context" containing auth, theme, shopping cart, and notifications. Keep \`ThemeContext\`, \`AuthContext\`, and \`CartContext\` separate.
3. **Keep Context Values Memoized**: Always use \`useMemo\` for the provider value object and \`useCallback\` for exposed methods.
4. **Use Composition Before Reaching for Context**: Before creating a new context, see if passing components as \`children\` simplifies your architecture.`,
        hi: `1. **Hamesha Custom Hook Banayein**: Direct \`useContext(Context)\` export karne ke bajaye \`useAuth()\` jaisa custom hook banayein.
2. **Contexts Ko Alag-Alag Rakhein**: Ek hi bada "God Context" na banayein; \`AuthContext\`, \`ThemeContext\`, aur \`CartContext\` alag-alag banayein.
3. **useMemo Zaroor Lagayein**: Provider ke value object ko hamesha memoize karein.
4. **Pehle Composition Check Karein**: Naya context banane se pehle dekhein ki kya \`children\` prop se kaam ho sakta hai.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Top Interview Sawaal Aur Jawab",
      },
      body: {
        en: `### Q1: What is "Prop Drilling" and how does the Context API resolve it?
**Answer**:
Prop drilling refers to the tedious process of passing props through multiple intermediary components that do not need the data, simply to deliver it to a deeply nested descendant. The Context API provides a "teleportation" mechanism: a Provider wraps an ancestor, and any descendant at any depth can consume the data directly via \`useContext()\` without touching intermediate components.

### Q2: What causes components consuming a context to re-render, and how do you optimize it?
**Answer**:
A component calling \`useContext(MyContext)\` re-renders whenever the reference of the \`value\` prop on the Provider changes according to \`Object.is()\`. If the value is passed as an inline object (\`value={{ a, b }}\`), a new object reference is created on every parent render. To optimize, wrap the value in \`useMemo\` and split independent state into separate context providers.

### Q3: When should you use React Context vs Redux Toolkit (or Zustand)?
**Answer**:
- **React Context**: Best for low-frequency, global or semi-global state that rarely changes (e.g. current user auth, UI theme, language).
- **Redux Toolkit / Zustand**: Best for high-frequency, complex state mutations with heavy business logic, middleware, devtools time-travel debugging, and where granular selector subscriptions are needed to prevent unneeded re-renders.`,
        hi: `### Q1: "Prop Drilling" kya hai aur Context API ise kaise hal karta hai?
**Jawab**:
Jab deeply nested child tak data bhejne ke liye beech ke kai anchahe components ko props pass karne padein, toh use Prop Drilling kehte hain. Context API Provider aur \`useContext\` ke zariye bina beech ke components ko chhue seedhe child tak data pahuncha deta hai.

### Q2: Context consume karne wale components kab re-render hote hain?
**Jawab**:
Jab bhi Provider ka \`value\` prop naya memory reference banata hai (\`Object.is\` check fail hota hai). Bachne ke liye value object ko \`useMemo\` se wrap kiya jata hai aur alag-alag data ke liye alag contexts banaye jaate hain.

### Q3: React Context kab use karein aur Redux kab use karein?
**Jawab**:
- **Context API**: Low-frequency data ke liye jo kam badalta hai (jaise Auth, Theme, Language).
- **Redux / Zustand**: Complex data, frequent updates aur fine-grained selectors ke liye taaki sirf wahi component render ho jiska data badla ho.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Context API",
        hi: "Quick Summary: Context API",
      },
      body: {
        en: `- **Eliminates Prop Drilling**: Shares data globally without manual prop passing.
- **3 Pillars**: \`createContext\`, \`<Context.Provider value={...}>\`, and \`useContext\`.
- **Always Memoize Value**: Use \`useMemo\` to prevent cascading consumer re-renders.
- **Custom Hook Pattern**: Export \`useAuth()\` with built-in null-check guards.
- **Split Contexts**: Keep theme, auth, and cart in separate specialized providers.`,
        hi: `- **Prop Drilling Khatam**: Bina beech ke components ko pareshan kiye global data share karta hai.
- **3 Pillars**: \`createContext\`, \`<Provider value={...}>\`, aur \`useContext\`.
- **useMemo Zaroori Hai**: Provider value ko memoize karke extra renders rokein.
- **Custom Hook Pattern**: \`useAuth()\` jaisa custom hook banayein jo safety check kare.
- **Specialized Providers**: Auth aur Theme ke alag-alag contexts banayein.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What performance issue happens when you write <MyContext.Provider value={{ user, setUser }}> without useMemo?",
      "hi": "Bina useMemo ke <MyContext.Provider value={{ user, setUser }}> likhne par kya performance issue aati hai?"
    },
    "options": [
      {
        "en": "The browser throws a SyntaxError",
        "hi": "SyntaxError aayega"
      },
      {
        "en": "A brand new object reference is created on every render of the parent, forcing all consuming components to re-render unnecessarily",
        "hi": "Har render par naya object reference banega jisse context consume karne wale saare components faltu mein re-render honge"
      },
      {
        "en": "User authentication cookies are deleted",
        "hi": "Cookies delete ho jaati hain"
      },
      {
        "en": "The component converts to an uncontrolled input",
        "hi": "Uncontrolled ban jata hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Inline object literals create a new memory reference on every render, triggering React's Object.is equality check to fail and re-rendering all consumers.",
      "hi": "Inline object har render par naya reference banata hai, jisse React sabhi consumers ko re-render karne par majboor ho jata hai."
    }
  },
  {
    "q": {
      "en": "What happens if a component calls useContext(ThemeContext) outside of a <ThemeProvider> tree?",
      "hi": "Agar koi component <ThemeProvider> ke bahar useContext(ThemeContext) call kare toh kya hoga?"
    },
    "options": [
      {
        "en": "It automatically creates a provider in the background",
        "hi": "Background mein provider ban jata hai"
      },
      {
        "en": "It receives the default value passed into createContext(defaultValue), or undefined/null",
        "hi": "Ise createContext(defaultValue) mein di gayi default value (ya null) milti hai"
      },
      {
        "en": "The entire computer reboots",
        "hi": "Computer reboot ho jata hai"
      },
      {
        "en": "It renders as raw HTML text",
        "hi": "Raw text render hota hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "When no matching Provider is found in the component's ancestor tree, useContext returns the defaultValue specified during createContext(defaultValue).",
      "hi": "Ancestor tree mein provider na milne par useContext wahi default value return karta hai jo createContext banate waqt di gayi thi."
    }
  },
  {
    "q": {
      "en": "Why is React Context generally NOT recommended for high-frequency state updates like mouse cursor tracking?",
      "hi": "Mouse cursor tracking jaise fast-changing data ke liye React Context recommended kyun nahi hai?"
    },
    "options": [
      {
        "en": "React Context only supports strings",
        "hi": "Context sirf string support karta hai"
      },
      {
        "en": "Every state update triggers an un-skippable re-render of all consuming components, causing severe UI lag at 60 FPS",
        "hi": "Har update par context consume karne wale saare components re-render hote hain jisse 60 FPS par UI lag hone lagta hai"
      },
      {
        "en": "Mouse events cannot be captured in React",
        "hi": "Mouse events capture nahi hote"
      },
      {
        "en": "Context only works on mobile devices",
        "hi": "Sirf mobile par chalta hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Context lacks granular selector subscriptions. High-frequency changes force all subscribed components to re-render on every tick, causing frame drops.",
      "hi": "Context mein fine-grained selectors nahi hote. Har millisecond par saare consumers re-render hone se frame rate drop ho jata hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of useContext & Context API in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein useContext & Context API (Global State) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling usecontext & context api with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath useContext & Context API (Global State) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "useContext & Context API establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "useContext & Context API (Global State) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does useContext & Context API directly resolve?",
      "hi": "useContext & Context API (Global State) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without useContext & Context API, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "useContext & Context API (Global State) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about useContext & Context API, how is its mental model best conceptualized through real-world analogies?",
      "hi": "useContext & Context API (Global State) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing useContext & Context API, what syntactic convention is essential to prevent runtime errors?",
      "hi": "useContext & Context API (Global State) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with useContext & Context API?",
      "hi": "useContext & Context API (Global State) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should useContext & Context API be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye useContext & Context API (Global State) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of useContext & Context API impact application memory and CPU consumption?",
      "hi": "useContext & Context API (Global State) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within useContext & Context API?",
      "hi": "useContext & Context API (Global State) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in useContext & Context API?",
      "hi": "useContext & Context API (Global State) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in useContext & Context API?",
      "hi": "useContext & Context API (Global State) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for useContext & Context API, what must the test suite assert?",
      "hi": "useContext & Context API (Global State) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in useContext & Context API?",
      "hi": "Modular design useContext & Context API (Global State) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should useContext & Context API be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par useContext & Context API (Global State) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does useContext & Context API properly belong and execute?",
      "hi": "Full-stack MERN architecture mein useContext & Context API (Global State) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with useContext & Context API in production?",
      "hi": "Production mein useContext & Context API (Global State) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for useContext & Context API?",
      "hi": "useContext & Context API (Global State) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in useContext & Context API?",
      "hi": "useContext & Context API (Global State) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in useContext & Context API?",
      "hi": "useContext & Context API (Global State) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
