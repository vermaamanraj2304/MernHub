const e={id:"react-jsx-and-components",title:{en:"JSX, React Elements & Virtual DOM Reconciliation",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm"},difficulty:"Beginner",readTime:10,sections:[{type:"concept",heading:{en:"1. What is JSX & What are React Elements?",hi:"1. JSX Kya Hai Aur React Elements Kaise Kaam Karte Hain?"},body:{en:`**JSX (JavaScript XML)** is a syntax extension for JavaScript that allows you to write HTML-like markup directly inside your JavaScript files. While it looks like HTML, JSX has the full power of JavaScript.

### How JSX Compiles:
Browsers **cannot** execute JSX directly. Build tools like Vite (using esbuild) or Babel compile JSX into pure JavaScript function calls:

\`\`\`jsx
// What you write in JSX:
const element = <h1 className="title">Hello MERN</h1>;

// What Vite/React compiles it to:
import { jsx as _jsx } from "react/jsx-runtime";
const element = _jsx("h1", { className: "title", children: "Hello MERN" });
\`\`\`

### React Elements are Plain Objects:
The output of \`_jsx()\` (or \`React.createElement()\`) is not a real HTML DOM node—it is a **lightweight, plain JavaScript object** describing what should appear on the screen:

\`\`\`javascript
{
  type: 'h1',
  props: {
    className: 'title',
    children: 'Hello MERN'
  },
  key: null,
  ref: null
}
\`\`\``,hi:`**JSX (JavaScript XML)** JavaScript ka ek syntax extension hai jo aapko JavaScript code ke andar seedhe HTML jaisa markup likhne ki suvidha deta hai. Dekhne mein yeh HTML jaisa lagta hai, lekin isme JavaScript ki poori taqat hoti hai.

### JSX Kaise Compile Hota Hai:
Web browsers JSX ko seedhe execute **nahi** kar sakte. Vite ya Babel jaise tools JSX ko pure JavaScript function calls mein translate kar dete hain:

\`\`\`jsx
// Jo aap JSX mein likhte hain:
const element = <h1 className="title">Hello MERN</h1>;

// Vite/React ise jis JavaScript mein badalta hai:
import { jsx as _jsx } from "react/jsx-runtime";
const element = _jsx("h1", { className: "title", children: "Hello MERN" });
\`\`\`

### React Elements Plain Objects Hote Hain:
Yeh function call koi asli browser DOM node nahi banata, balki ek **halka plain JavaScript object** banata hai jo screen par render hone wale content ka blueprint hota hai.`}},{type:"concept",heading:{en:"2. The Virtual DOM & React Fiber Reconciliation",hi:"2. Virtual DOM Aur React Fiber Ka Reconciliation Process"},body:{en:`Why doesn't React update the Real browser DOM directly? Because **modifying the Real DOM is expensive**. Every time a browser DOM node is added or modified, the browser engine must recalculate layouts (reflow), recalculate CSS styles, and repaint pixels on the GPU.

### The Virtual DOM Solution:
1. **Virtual DOM (VDOM)**: An in-memory tree representation of the UI made of lightweight plain JavaScript objects.
2. **Reconciliation (Diffing)**: When state changes, React creates a new Virtual DOM tree and compares it with the previous Virtual DOM tree using an efficient $O(N)$ heuristic diffing algorithm.
3. **Commit Phase**: React computes the exact, minimal set of mutations and batches them into a single update to the Real DOM.

### React Fiber Architecture:
Introduced in React 16, **Fiber** is React's core reconciliation engine. It breaks rendering work into incremental chunks that can be paused, prioritized, or aborted, ensuring the browser main thread remains smooth (60 FPS) even during heavy rendering loads.`,hi:`React seedhe browser ke Real DOM ko update kyun nahi karta? Kyunki **Real DOM ko update karna bohot slow aur expensive hota hai**. Jab bhi browser DOM ka koi element badalta hai, toh browser ko poori screen ka layout dubara calculate (reflow) karna padta hai aur pixels ko dubara paint karna padta hai.

### Virtual DOM Ka Solution:
1. **Virtual DOM (VDOM)**: UI ka ek in-memory plain JavaScript object tree jo RAM mein rehta hai.
2. **Reconciliation (Diffing)**: Jab state badalti hai, React ek naya VDOM tree banata hai aur purane tree se compare karke check karta hai ki kya change hua hai ($O(N)$ diffing algorithm).
3. **Commit Phase**: React sirf wahi specific nodes Real DOM mein update karta hai jo sach mein badle hon.

### React Fiber Engine:
React 16 mein **Fiber** engine aaya jo rendering ke bade kaam ko chhote-chhote tukdon mein baant deta hai. Agar koi high-priority task (jaise user typing ya button click) aaye, toh yeh background render ko pause karke pehle user action ko 60 FPS par smoothly handle karta hai.`}},{type:"analogy",heading:{en:"Real-Life Analogy: The Halwai Sweet Display Tray vs Kitchen Stock",hi:"Real-Life Analogy: Halwai Ki Mithai Tray Aur Rangmanch Rehearsal"},body:{en:`Consider how a sweet shop (Halwai) operates during Diwali:

- **Real DOM is the Heavy Glass Counter Display**:
  - Rearranging 500 kg of Kaju Katli, Gulab Jamun, and Rasgulla in the front glass showroom display in front of 50 impatient customers takes 30 minutes, causes dust, and blocks the store aisle (**expensive DOM reflow and repaint**).
- **Virtual DOM is the Halwai's Paper Notepad Checklist**:
  - The head chef stands in the back kitchen with a lightweight paper notepad.
  - When 5 boxes of Kaju Katli are sold, the chef crosses off the number 5 on the notepad in 1 second (**updating the Virtual DOM in memory**).
  - The chef notes: *"Only Tray #3 needs 5 pieces refilled."*
- **Reconciliation & Commit**:
  - Instead of taking down all 20 display trays, an assistant carries exactly 5 pieces of Kaju Katli and places them in Tray #3 in 2 seconds flat (**minimal targeted Real DOM mutation**)!`,hi:`Diwali ke waqt Halwai ki dukaan se samjhein:

- **Real DOM (Dukaan Ka Main Kanch Ka Counter)**:
  - 50 grahakon ke samne 20 badi mithai ki thaaliyon ko idhar-udhar karna bohot musibat bhara aur time-consuming kaam hai (**expensive Real DOM reflow**).
- **Virtual DOM (Chef Ka Kacha Paper Pad)**:
  - Halwai kitchen mein khada hokar ek kache kagaz par note karta hai ki Kaju Katli ke 5 piece bik gaye hain. Kagaz par pencil se 5 kaatna 1 second ka kaam hai (**in-memory VDOM update**).
- **Reconciliation & Commit**:
  - Poore counter ko hilaye bina, chhotu sirf 5 Kaju Katli lekar jata hai aur Tray No. 3 mein rakh deta hai (**targeted Real DOM update**). Baki 19 trays ko haath bhi nahi lagaya jata!`}},{type:"syntax",heading:{en:"Syntax & Core Rules of JSX",hi:"JSX Ke Niyam Aur Syntax Rules"},body:{en:'### The 4 Non-Negotiable Rules of JSX:\n\n1. **Return a Single Root Element (or Fragment)**:\n   Every component must return one top-level wrapper element or a Fragment (`<></>`):\n   ```jsx\n   // Correct using Fragment\n   return (\n     <>\n       <h1>Title</h1>\n       <p>Description</p>\n     </>\n   );\n   ```\n\n2. **Close All Tags Explicitly**:\n   Self-closing tags in HTML must be explicitly closed in JSX:\n   `<img src="..." alt="..." />`, `<input type="text" />`, `<br />`.\n\n3. **camelCase HTML Attributes**:\n   - `class` becomes `className` (because `class` is a reserved keyword in JavaScript).\n   - `for` becomes `htmlFor`.\n   - `onclick` becomes `onClick`, `tabindex` becomes `tabIndex`.\n\n4. **JavaScript Expressions in Curly Braces `{}`**:\n   Any valid JavaScript expression (variables, function calls, ternary operators) can be embedded inside `{}`:\n   ```jsx\n   <h1>Welcome, {user.name.toUpperCase()}!</h1>\n   <p>Items in cart: {cart.length > 0 ? cart.length : "Empty"}</p>\n   ```',hi:'### JSX Ke 4 Zaroori Niyam:\n\n1. **Single Root Element Ya Fragment (`<></>`)**:\n   Har component ko sirf ek hi parent element return karna hota hai:\n   ```jsx\n   return (\n     <>\n       <h1>Title</h1>\n       <p>Content</p>\n     </>\n   );\n   ```\n\n2. **Har Tag Ko Band Karna Zaroori Hai**:\n   Self-closing tags ko slash se close karein: `<img src="..." alt="..." />`, `<input />`.\n\n3. **camelCase Attributes Ka Use**:\n   - `class` ki jagah `className` (kyunki JavaScript mein `class` keyword reserved hai).\n   - `for` ki jagah `htmlFor`.\n   - Event listeners camelCase hote hain: `onClick`, `onChange`.\n\n4. **Curly Braces `{}` Mein JavaScript Expressions**:\n   JSX ke andar koi bhi valid JS variable, function call ya condition likhne ke liye `{}` ka use karein:\n   ```jsx\n   <h2>Namaste, {user.name}!</h2>\n   ```'}},{type:"example",heading:{en:"Example 1: Dynamic Data, Expressions & Conditional Styles",hi:"Example 1: Dynamic Data Aur Expressions Ke Sath Basic JSX"},body:{en:"Rendering dynamic user profile information, math expressions, and conditional Tailwind CSS classes within JSX markup.",hi:"JSX ke andar dynamic variables, math expressions aur condition ke hisaab se styles lagana."},code:{language:"jsx",filename:"UserProfileBadge.jsx",snippet:`import React from "react";

export default function UserProfileBadge() {
  const user = {
    firstName: "Rohan",
    lastName: "Verma",
    role: "admin",
    unreadMessages: 4,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
  };

  const fullName = \`\${user.firstName} \${user.lastName}\`;
  const isAdmin = user.role === "admin";

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 max-w-sm">
      <img
        src={user.avatarUrl}
        alt={fullName}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
            {fullName}
          </h3>
          <span
            className={\`px-2 py-0.5 text-xs font-medium rounded-full \${
              isAdmin
                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
            }\`}
          >
            {user.role.toUpperCase()}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {user.unreadMessages > 0
            ? \`\${user.unreadMessages} unread message\${user.unreadMessages > 1 ? "s" : ""}\`
            : "All caught up!"}
        </p>
      </div>
    </div>
  );
}`}},{type:"example",heading:{en:"Example 2: Inspecting the Virtual DOM Object Structure",hi:"Example 2: Virtual DOM Object Structure Ko Inspect Karna"},body:{en:"Demonstrating what React elements look like under the hood by inspecting the return value of `React.createElement` / JSX in console.",hi:"React element ke andar ke properties (type, props, children) ko console log karke Virtual DOM samajhna."},code:{language:"jsx",filename:"VirtualDomInspector.jsx",snippet:`import React from "react";

export default function VirtualDomInspector() {
  // Creating a React element using JSX
  const jsxElement = (
    <div id="card" className="p-4 bg-emerald-500 text-white rounded-lg">
      <h2 className="text-lg font-bold">Virtual DOM Element</h2>
      <p>I am just a plain JS object in RAM!</p>
    </div>
  );

  // Creating the exact same element using React.createElement
  const manualElement = React.createElement(
    "div",
    { id: "card", className: "p-4 bg-emerald-500 text-white rounded-lg" },
    React.createElement("h2", { className: "text-lg font-bold" }, "Virtual DOM Element"),
    React.createElement("p", null, "I am just a plain JS object in RAM!")
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-slate-800 dark:text-white">
        Virtual DOM Inspector
      </h1>
      
      {/* Rendering the element */}
      {jsxElement}

      <div className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
        <p className="text-slate-400 mb-2">// Inspection of JSX element in memory:</p>
        <pre>
          {JSON.stringify(
            {
              type: jsxElement.type,
              props: {
                id: jsxElement.props.id,
                className: jsxElement.props.className,
                childrenCount: React.Children.count(jsxElement.props.children)
              },
              isReactElement: React.isValidElement(jsxElement),
              matchesManual: jsxElement.type === manualElement.type
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}`}},{type:"example",heading:{en:"Example 3: Real-World E-Commerce Product Card Component",hi:"Example 3: Production E-Commerce Product Card Component"},body:{en:"A complete, reusable product card featuring discount percentage math, rating stars, conditional stock status, and formatted currency.",hi:"Production-level Product Card component jisme discounts, rating stars aur stock status dynamic JSX se render hote hain."},code:{language:"jsx",filename:"ProductCard.jsx",snippet:`import React from "react";

export default function ProductCard({
  product = {
    id: "p1",
    title: "Sony WH-1000XM5 Wireless Headphones",
    originalPrice: 34990,
    discountedPrice: 28990,
    rating: 4.8,
    reviewCount: 1420,
    inStock: true,
    tags: ["Best Seller", "Noise Cancelling"],
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
  },
  onAddToCart = () => {}
}) {
  const discountPercent = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  return (
    <article className="group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-xl transition-all duration-300 max-w-xs">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
          <span>★ {product.rating}</span>
          <span className="text-slate-400 font-normal">({product.reviewCount})</span>
        </div>

        <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm line-clamp-2 title-hover">
          {product.title}
        </h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            ₹{product.discountedPrice.toLocaleString("en-IN")}
          </span>
          {product.originalPrice > product.discountedPrice && (
            <span className="text-xs text-slate-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={\`w-full mt-3 py-2 px-4 rounded-xl font-medium text-xs transition-colors \${
            product.inStock
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-indigo-500/20"
              : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
          }\`}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Aam Galatiyan Aur Unka Solution"},body:{en:'### 1. Returning Multiple Sibling Elements Without a Wrapper\n- **Mistake**: Writing `return (<h1>Title</h1><p>Text</p>);`. JSX compiles into JavaScript function calls (`_jsx(...)`), and a function cannot return two values at once!\n- **Fix**: Wrap siblings in a Fragment: `return (<><h1>Title</h1><p>Text</p></>);`.\n\n### 2. Using HTML Attribute Names Instead of camelCase\n- **Mistake**: Writing `<div class="card" onclick="alert(1)">`.\n- **Fix**: Use JSX equivalents: `className="card"` and `onClick={() => alert(1)}`.\n\n### 3. Rendering Plain Objects Directly Inside JSX\n- **Mistake**: Writing `const user = { name: "Aman" }; return <div>{user}</div>;`.\n- **Fix**: React cannot render JavaScript objects as text nodes. It throws: `Objects are not valid as a React child`. Render specific primitive values: `<div>{user.name}</div>` or `JSON.stringify(user)`.\n\n### 4. Forgetting Quotes or Braces for Attribute Values\n- **Mistake**: Writing `className={btn-primary}` (treated as undefined variables subtracting) or `src="item.jpg"` when you intended the variable `src={item.image}`.\n- **Fix**: Strings use double quotes (`className="btn"`), JavaScript expressions use single curly braces (`src={item.image}`). Never write `src="{item.image}"`!',hi:'### 1. Bina Wrapper Ke Multiple Siblings Return Karna\n- **Galati**: `return (<h1>A</h1><p>B</p>);` likhna. JSX function call banta hai aur ek function do cheezein ek sath return nahi kar sakta.\n- **Solution**: Fragment (`<></>`) mein wrap karein: `return (<><h1>A</h1><p>B</p></>);`.\n\n### 2. `class` Likhta Rehna `className` Ki Jagah\n- **Galati**: `<div class="container">` likhna. JavaScript mein `class` keyword reserved hota hai.\n- **Solution**: Hamesha `className` use karein.\n\n### 3. Plain JavaScript Object Ko Seedhe Render Karna\n- **Galati**: `const user = { name: "Aman" }; return <div>{user}</div>;`. Isse error aata hai: *"Objects are not valid as a React child"*.\n- **Solution**: Object ki specific property render karein: `<div>{user.name}</div>`.\n\n### 4. Attribute Mein Quotes Aur Braces Ko Mix Karna\n- **Galati**: `src="{product.image}"` likhna. Isse yeh string ban jata hai aur image load nahi hoti.\n- **Solution**: Variable ke liye sirf curly braces lagayein: `src={product.image}`.'}},{type:"tip",heading:{en:"Best Practices: Writing Clean JSX",hi:"Clean JSX Likhne Ke Best Practices"},body:{en:'1. **Keep JSX Clean: Extract Complex Sub-components**: If a component\'s JSX exceeds 100-150 lines, break it into smaller focused components (`<Navbar />`, `<ProductCard />`, `<CartSummary />`).\n2. **Prefer React Fragments (`<></>`)**: Avoid "div soup" (unnecessary nested `<div>` wrappers that bloat the browser DOM tree).\n3. **Use Self-Closing Tags**: Write `<Avatar />` instead of `<Avatar></Avatar>` when there are no children.\n4. **Use Semantic HTML Inside JSX**: Always choose meaningful tags (`<header>`, `<main>`, `<nav>`, `<article>`, `<button>`) instead of endless `<div>`s for web accessibility (a11y) and SEO.',hi:"1. **Chhote Components Mein Baantein**: Agar component 100-150 lines se bada hone lage, toh sub-components (`<Navbar />`, `<Card />`) bana dein.\n2. **Fragments (`<></>`) Ka Use Karein**: Faltu `<div>` lagane se bachein taaki browser DOM tree halka rahe (Avoid Div Soup).\n3. **Self-Closing Tags Use Karein**: Jab children na hon toh `<Avatar />` likhein.\n4. **Semantic HTML Tags Use Karein**: Har jagah `<div>` lagane ke bajaye `<article>`, `<nav>`, `<button>` use karein taaki Accessibility aur SEO behtar ho sake."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Top Interview Sawaal Aur Jawab"},body:{en:`### Q1: Can web browsers read JSX directly? How does it actually execute?
**Answer**:
No. Browsers only understand standard JavaScript (ECMAScript), HTML, and CSS. JSX is purely syntactic sugar. Build tools (like Babel or Vite's esbuild) compile JSX markup into function calls: \`_jsx("h1", { children: "Hello" })\` (or \`React.createElement\` in older versions). At runtime, these functions return plain JavaScript objects representing React elements.

### Q2: What is the Virtual DOM and why is it faster than mutating the Real DOM?
**Answer**:
The Virtual DOM is a lightweight in-memory tree of plain JavaScript objects mimicking the real UI. Mutating the Real DOM causes synchronous browser reflows (recalculating geometry and layout) and repaints (rasterizing pixels onto GPU), which are computationally expensive. React batches changes, calculates differences via Fiber reconciliation diffing, and applies only the minimal required updates to the Real DOM in a single pass.

### Q3: What is the purpose of React Fragments (\`<></>\`)?
**Answer**:
A React component must return a single root node because JavaScript functions cannot return multiple expressions simultaneously. A Fragment lets you group multiple sibling elements together without injecting an extra, unnecessary DOM wrapper node (like an extra \`<div>\`) into the final HTML tree.`,hi:`### Q1: Kya browsers JSX ko seedhe samajh sakte hain?
**Jawab**:
Nahi. Browsers sirf standard JavaScript samajhte hain. JSX ko Vite ya Babel compile karke \`_jsx()\` ya \`React.createElement()\` function calls mein convert karta hai jo plain JS objects return karte hain.

### Q2: Virtual DOM kya hota hai aur yeh Real DOM se fast kyun hai?
**Jawab**:
Virtual DOM memory mein chalne wala halka JavaScript object tree hota hai. Real DOM ko badalne se browser mein reflow aur repaint hota hai jo slow hota hai. React VDOM mein changes ko compare (diff) karke sirf wahi elements Real DOM mein badalta hai jo modify hue hon.

### Q3: React Fragments (\`<></>\`) ka kya fayda hota hai?
**Jawab**:
React component ko single parent node return karna padta hai. Fragment bina koi extra \`<div>\` HTML DOM mein jode multiple sibling elements ko group karne ki suvidha deta hai.`}},{type:"summary",heading:{en:"Quick Summary: JSX & Virtual DOM",hi:"Quick Summary: JSX & Virtual DOM"},body:{en:"- **JSX is Syntactic Sugar**: Compiles into `_jsx()` function calls creating plain JS objects.\n- **Virtual DOM**: In-memory representation of UI; enables high-performance $O(N)$ diffing.\n- **React Fiber**: Incremental reconciliation engine that keeps the UI responsive at 60 FPS.\n- **JSX Rules**: Return single root (or Fragment), close all tags, use camelCase attributes (`className`), embed JS inside `{}`.",hi:"- **JSX Syntactic Sugar Hai**: Compile hokar plain JS objects banata hai.\n- **Virtual DOM**: Memory mein diffing karta hai taaki Real DOM ke reflow aur repaints se bacha ja sake.\n- **React Fiber**: Incremental rendering engine jo UI ko 60 FPS par smooth rakhta hai.\n- **JSX Rules**: Single root ya Fragment return karein, `className` use karein, aur JS ko `{}` mein likhein."}}],quiz:[{q:{en:"What do browsers actually receive when a React application with JSX is built for production?",hi:"Production build ke baad browser ko JSX ke badle kya milta hai?"},options:[{en:"Raw JSX text parsed by the browser's native XML engine",hi:"Raw JSX text"},{en:"Standard JavaScript function calls (such as _jsx or React.createElement) producing plain objects",hi:"Standard JavaScript function calls jo plain objects banate hain"},{en:"Pre-rendered static JPEG images of the website",hi:"Static images"},{en:"Binary WebAssembly bytecodes only",hi:"Sirf WebAssembly bytecode"}],answerIndex:1,explanation:{en:"Build tools transform JSX into pure JavaScript function calls returning plain JS objects (React Elements).",hi:"Build tools JSX ko standard JS function calls mein convert karte hain jo plain objects return karte hain."}},{q:{en:"Why is modifying the Real browser DOM directly slower than updating React's Virtual DOM?",hi:"Real DOM ko direct update karna Virtual DOM ke mukable slow kyun hota hai?"},options:[{en:"Real DOM changes trigger browser layout recalculations (reflow) and pixel repainting",hi:"Real DOM changes se browser layout recalculations (reflow) aur repaints trigger hote hain"},{en:"The Real DOM is stored on an external database server",hi:"Real DOM database server par rehta hai"},{en:"Virtual DOM runs in C++ while Real DOM runs in Python",hi:"Languages alag hain"},{en:"The browser limits Real DOM mutations to 1 per second",hi:"Browser 1 mutation per second allow karta hai"}],answerIndex:0,explanation:{en:"Real DOM modifications trigger expensive browser reflow and repaint cycles. The Virtual DOM computes diffs in memory and applies only minimal changes.",hi:"Real DOM updates se browser ko layout aur pixels dobara paint karne padte hain jo CPU heavy hote hain."}},{q:{en:"Which HTML attribute name must be replaced with 'className' in JSX?",hi:"JSX mein kis HTML attribute ko 'className' likhna padta hai?"},options:[{en:"id",hi:"id"},{en:"class",hi:"class"},{en:"style",hi:"style"},{en:"type",hi:"type"}],answerIndex:1,explanation:{en:"'class' is a reserved keyword in JavaScript (used for ES6 classes), so JSX uses 'className' instead.",hi:"JavaScript mein 'class' ek reserved keyword hai, isliye JSX mein 'className' use hota hai."}},{q:{en:"What is the primary advantage of using a React Fragment (<></>) over a standard <div> wrapper?",hi:"Standard <div> ke mukable React Fragment (<></>) use karne ka sabse bada fayda kya hai?"},options:[{en:"It automatically saves the component to localStorage",hi:"Component ko localStorage mein save karta hai"},{en:"It groups sibling elements without adding an extra node to the real browser DOM tree",hi:"Bina koi extra node DOM mein jode sibling elements ko group karta hai"},{en:"It forces the component to render in dark mode",hi:"Dark mode force karta hai"},{en:"It compiles into an SQL query",hi:"SQL query banata hai"}],answerIndex:1,explanation:{en:"Fragments group multiple children without introducing unnecessary extra DOM nodes, keeping the DOM tree clean.",hi:"Fragment bina koi extra DOM node banaye multiple elements ko group karne deta hai."}},{question:{en:"What is the core architectural purpose of JSX, React Elements & Virtual DOM Reconciliation in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein JSX, Virtual DOM & Fiber Reconciliation Algorithm ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling jsx, react elements & virtual dom reconciliation with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath JSX, Virtual DOM & Fiber Reconciliation Algorithm ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"JSX, React Elements & Virtual DOM Reconciliation establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does JSX, React Elements & Virtual DOM Reconciliation directly resolve?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without JSX, React Elements & Virtual DOM Reconciliation, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about JSX, React Elements & Virtual DOM Reconciliation, how is its mental model best conceptualized through real-world analogies?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing JSX, React Elements & Virtual DOM Reconciliation, what syntactic convention is essential to prevent runtime errors?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with JSX, React Elements & Virtual DOM Reconciliation?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should JSX, React Elements & Virtual DOM Reconciliation be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye JSX, Virtual DOM & Fiber Reconciliation Algorithm ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of JSX, React Elements & Virtual DOM Reconciliation impact application memory and CPU consumption?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within JSX, React Elements & Virtual DOM Reconciliation?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in JSX, React Elements & Virtual DOM Reconciliation?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in JSX, React Elements & Virtual DOM Reconciliation?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for JSX, React Elements & Virtual DOM Reconciliation, what must the test suite assert?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in JSX, React Elements & Virtual DOM Reconciliation?",hi:"Modular design JSX, Virtual DOM & Fiber Reconciliation Algorithm mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should JSX, React Elements & Virtual DOM Reconciliation be architected to support horizontal scaling?",hi:"Traffic 100x badhne par JSX, Virtual DOM & Fiber Reconciliation Algorithm ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does JSX, React Elements & Virtual DOM Reconciliation properly belong and execute?",hi:"Full-stack MERN architecture mein JSX, Virtual DOM & Fiber Reconciliation Algorithm kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with JSX, React Elements & Virtual DOM Reconciliation in production?",hi:"Production mein JSX, Virtual DOM & Fiber Reconciliation Algorithm ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for JSX, React Elements & Virtual DOM Reconciliation?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in JSX, React Elements & Virtual DOM Reconciliation?",hi:"JSX, Virtual DOM & Fiber Reconciliation Algorithm mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
