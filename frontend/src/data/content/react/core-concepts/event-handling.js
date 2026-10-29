export default {
  id: "react-event-handling",
  title: {
    en: "Event Handling & Synthetic Events",
    hi: "Event Handling & SyntheticEvent System",
  },
  difficulty: "Beginner",
  readTime: 10,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What are React Synthetic Events?",
        hi: "1. React Synthetic Events Kya Hote Hain?",
      },
      body: {
        en: `Handling events in React is syntactically similar to handling events on standard DOM elements, but with two fundamental architectural differences:

1. **camelCase Naming**: React events are named using camelCase (\`onClick\`, \`onChange\`, \`onSubmit\`, \`onKeyDown\`) rather than lowercase (\`onclick\`).
2. **SyntheticEvent Wrapper**: When an event fires, React passes a **SyntheticEvent** instance to your handler—a cross-browser wrapper around the browser's native event.

### Why SyntheticEvent?
Different browsers (Chrome, Safari, Firefox, Edge) historically implemented DOM events with slight inconsistencies. React's \`SyntheticEvent\` provides the exact same API and behavior across **all** browsers, adhering strictly to the W3C event specification.

If you ever need the underlying raw browser event, it is accessible via \`e.nativeEvent\`.`,
        hi: `React mein events handle karna normal HTML DOM jaisa hi lagta hai, lekin isme do bohot bade technical farq hote hain:

1. **camelCase Naming**: Events ke naam camelCase mein hote hain (\`onClick\`, \`onChange\`, \`onSubmit\`) na ki lowercase (\`onclick\`).
2. **SyntheticEvent Wrapper**: Event hone par React aapke function ko ek **SyntheticEvent** object pass karta hai—jo browser ke native event ke upar ek uniform wrapper hota hai.

### SyntheticEvent Ki Zaroorat Kyun Hai?
Alag-alag browsers (Chrome, Safari, Firefox) mein events ka behavior thoda alag ho sakta hai. React ka \`SyntheticEvent\` sabhi browsers par ek jaisa API aur behavior guarantee karta hai.

Agar aapko asli browser event chahiye, toh woh \`e.nativeEvent\` mein mil jata hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Event Delegation to the Root & Bubbling Control",
        hi: "2. Event Delegation Aur Event Bubbling Ka Control",
      },
      body: {
        en: `In standard JavaScript, if you have 1,000 table rows with delete buttons, attaching 1,000 individual event listeners consumes massive browser memory.

### Event Delegation in React 18:
React does **not** attach event listeners to individual DOM nodes! Instead, React attaches a **single event listener per event type at the root DOM container** (\`div#root\`).
When a user clicks a button, the browser bubbles the event up to the root container, where React catches it and dispatches it to the appropriate component handler.

### Stopping Propagation & Default Behavior:
- **\`e.preventDefault()\`**: Prevents the browser's built-in behavior (e.g. stopping a form from reloading the page, or stopping a link from navigating). (Note: Returning \`false\` does NOT work in React; you must explicitly call \`e.preventDefault()\`).
- **\`e.stopPropagation()\`**: Stops the event from bubbling up to parent container elements.`,
        hi: `Normal JavaScript mein agar aapke paas 1,000 table rows hain, toh 1,000 alag-alag event listeners lagane se memory bhar jaati hai.

### React 18 Ka Event Delegation:
React har button par alag listener **nahi** lagata! React poori app ke root container (\`div#root\`) par **sirf ek listener** lagata hai.
Jab koi button click hota hai, toh event bubble hokar root tak jata hai, aur React wahan use pakad kar sahi component ke handler tak bhej deta hai.

### Propagation Aur Default Behavior Rokna:
- **\`e.preventDefault()\`**: Browser ke default kaam ko rokta hai (jaise form submit par page reload hone se rokna).
- **\`e.stopPropagation()\`**: Event ko parent elements tak upar bubble hone se rokta hai.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Society Gatekeeper & The UN Diplomatic Translator",
        hi: "Real-Life Analogy: Gated Society Ka Security Guard Aur UN Ka Translator",
      },
      body: {
        en: `Consider these two analogies for React's event architecture:

1. **SyntheticEvent is the UN Diplomatic Translator**:
   - Ambassadors from France, Japan, and India speak in their native languages (Chrome, Safari, Firefox native events).
   - The UN translator translates all of them into a standardized, clear English transcript so everyone understands the message uniformly (**SyntheticEvent normalizing cross-browser quirks**).
2. **Event Delegation is the Society Main Gate Security Guard**:
   - In a housing society with 500 flats, the courier company does not post 500 separate delivery boys outside every single flat's door.
   - All parcels arrive at the **Main Society Security Gate (\`div#root\`)**. The single gate guard checks the flat number on the box and calls the resident to collect it (**Event Delegation**)!`,
        hi: `React ke event system ko do analogies se samjhein:

1. **SyntheticEvent (UN Ka Translator)**:
   - Japan, France aur India ke neta apni-apni bhasha bolte hain (Chrome, Safari ke alag events).
   - UN translator sabhi ko ek standard bhasha mein translate karke deta hai taaki sabko ek jaisa samajh aaye (**Cross-browser normalization**).
2. **Event Delegation (Society Gate Ka Security Guard)**:
   - 500 flats wali society mein courier company har flat ke gate par 500 alag delivery boys khada nahi karti.
   - Saari chitthiyan **Society Ke Main Gate (\`div#root\`)** par aati hain, jahan guard flat number dekh kar call kar deta hai (**Memory efficient delegation**)!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax: Passing Functions vs Function Calls",
        hi: "Syntax: Function Pass Karna vs Function Call Karna",
      },
      body: {
        en: `### Passing a Function Reference vs Calling It:

\`\`\`jsx
// ✅ CORRECT: Passing function reference (runs only on click)
<button onClick={handleClick}>Click Me</button>

// ❌ WRONG: Calling the function immediately during render!
<button onClick={handleClick()}>Click Me</button>
\`\`\`

### Passing Custom Arguments to Handlers:
To pass arguments, wrap the handler call in an inline arrow function:
\`\`\`jsx
// ✅ Passing parameters using an inline arrow function
<button onClick={() => handleDeleteUser(user.id)}>Delete</button>

// Accessing both event object and custom parameter:
<button onClick={(e) => handleEdit(e, user.id)}>Edit</button>
\`\`\``,
        hi: `### Function Reference Pass Karna vs Function Call Karna:

\`\`\`jsx
// ✅ SAHI: Function reference pass karein (sirf click hone par chalega)
<button onClick={handleClick}>Click Me</button>

// ❌ GALAT: Render hote hi function turant execute ho jayega!
<button onClick={handleClick()}>Click Me</button>
\`\`\`

### Arguments Pass Karne Ka Tareeka:
Arguments bhejne ke liye inline arrow function ka use karein:
\`\`\`jsx
// ✅ Arrow function wrap karke parameters bhejein
<button onClick={() => handleDelete(user.id)}>Delete</button>

// Event object aur parameter dono lena:
<button onClick={(e) => handleEdit(e, user.id)}>Edit</button>
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Button Click with Parameters & Preventing Default Navigation",
        hi: "Example 1: Parameters Pass Karna Aur e.preventDefault() Ka Use",
      },
      body: {
        en: `Handling button clicks with custom arguments and intercepting anchor link navigation via \`e.preventDefault()\`.`,
        hi: `Button click par parameters bhejna aur link par click hone par page navigate hone se rokna.`,
      },
      code: {
        language: "jsx",
        filename: "DownloadActions.jsx",
        snippet: `import React, { useState } from "react";

export default function DownloadActions() {
  const [downloadLog, setDownloadLog] = useState("");

  const handleDownload = (format, e) => {
    e.preventDefault(); // Prevents <a href> from refreshing/navigating
    setDownloadLog(\`Downloading invoice as .\${format.toUpperCase()} at \${new Date().toLocaleTimeString()}\`);
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md space-y-4">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
        Export Invoice
      </h2>

      <div className="flex gap-3">
        <a
          href="/download-pdf"
          onClick={(e) => handleDownload("pdf", e)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-sm transition"
        >
          Download PDF
        </a>

        <a
          href="/download-csv"
          onClick={(e) => handleDownload("csv", e)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition"
        >
          Download CSV
        </a>
      </div>

      {downloadLog && (
        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
          {downloadLog}
        </p>
      )}
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Form Input Keyboard Events (Submit on Enter)",
        hi: "Example 2: Keyboard Events (Enter Key Dabane Par Action)",
      },
      body: {
        en: `Listening to \`onKeyDown\` events to capture the \`Enter\` key for fast chat messaging, alongside character counters.`,
        hi: `Chat box mein Enter key dabane par message bhejna aur character count track karna.`,
      },
      code: {
        language: "jsx",
        filename: "QuickChatInput.jsx",
        snippet: `import React, { useState } from "react";

export default function QuickChatInput() {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState(["Welcome to MERN Hub!"]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessagesList(prev => [...prev, message.trim()]);
    setMessage("");
  };

  // Detect 'Enter' key press (without Shift)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Don't add a newline
      handleSendMessage();
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-md space-y-4">
      <h3 className="font-bold text-slate-900 dark:text-white">Quick Chat</h3>

      <div className="h-32 overflow-y-auto space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-xs">
        {messagesList.map((msg, i) => (
          <div key={i} className="p-2 rounded-xl bg-white dark:bg-slate-700/60 shadow-xs text-slate-700 dark:text-slate-200">
            {msg}
          </div>
        ))}
      </div>

      <div className="relative">
        <textarea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message and press Enter..."
          className="w-full px-3 py-2 pr-16 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
        <button
          onClick={handleSendMessage}
          className="absolute right-2 bottom-3 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Event Bubbling & stopPropagation Pattern",
        hi: "Example 3: Event Bubbling Aur stopPropagation Ka Practical Use",
      },
      body: {
        en: `Solving the nested click conflict: Clicking an article card opens the article details, but clicking the "Bookmark" icon inside it stops propagation to avoid opening the article!`,
        hi: `Card par click karne se modal khulta hai, lekin card ke andar bane Bookmark button par click karne se bubbling ko \`e.stopPropagation()\` se rokna.`,
      },
      code: {
        language: "jsx",
        filename: "ArticleCardWithActions.jsx",
        snippet: `import React, { useState } from "react";

export default function ArticleCardWithActions() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Parent Card Click Handler
  const handleCardClick = () => {
    setModalOpen(true);
  };

  // Nested Bookmark Button Click Handler
  const handleBookmarkClick = (e) => {
    // CRITICAL: Stop bubbling so the parent card's onClick does NOT fire!
    e.stopPropagation();
    setIsBookmarked(prev => !prev);
  };

  return (
    <div className="p-6 max-w-sm mx-auto space-y-4">
      {/* Clickable Card Container */}
      <div
        onClick={handleCardClick}
        className="cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            React Internals
          </span>

          {/* Nested Action Button */}
          <button
            onClick={handleBookmarkClick}
            aria-label="Bookmark"
            className={\`p-2 rounded-full transition-colors \${
              isBookmarked
                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/40"
                : "bg-slate-100 hover:bg-slate-200 text-slate-400 dark:bg-slate-800"
            }\`}
          >
            {isBookmarked ? "★" : "☆"}
          </button>
        </div>

        <h3 className="font-bold text-slate-900 dark:text-white text-base mt-2">
          How Event Delegation Works in React 18
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Clicking the card opens preview; clicking the star bookmarks without opening.
        </p>
      </div>

      {/* Simple Modal Preview */}
      {modalOpen && (
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex justify-between items-center">
          <span>Card detail modal opened!</span>
          <button
            onClick={() => setModalOpen(false)}
            className="font-bold underline"
          >
            Close
          </button>
        </div>
      )}
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
        en: `### 1. Invoking the Handler Immediately in JSX
- **Mistake**: Writing \`<button onClick={deleteUser(id)}>\`. Because you added parentheses \`()\`, JavaScript runs the function **immediately when the component renders**, triggering an infinite re-render loop if \`deleteUser\` updates state!
- **Fix**: Pass an inline arrow function: \`<button onClick={() => deleteUser(id)}>\`.

### 2. Forgetting \`e.preventDefault()\` on Form Submit
- **Mistake**: Submitting a form without \`e.preventDefault()\`. The browser triggers a full HTML page reload, resetting all React state.
- **Fix**: Add \`const handleSubmit = (e) => { e.preventDefault(); ... }\`.

### 3. Returning \`false\` to Prevent Defaults
- **Mistake**: In older jQuery, returning \`false\` prevented link navigation. In React, returning \`false\` does nothing.
- **Fix**: Always call \`e.preventDefault()\`.

### 4. Overusing Anonymous Inline Functions in Large Lists
- **Mistake**: In a list of 5,000 items, writing \`onClick={() => ...}\` inside every row creates 5,000 new function instances on every render.
- **Fix**: For large performance-critical lists, pass row IDs to a shared memoized handler.`,
        hi: `### 1. JSX Mein Function Ko Turant Call Kar Dena
- **Galati**: \`<button onClick={deleteUser(id)}>\` likhna. Parentheses \`()\` lagane se render hote hi function execute ho jata hai aur infinite re-render loop ban jata hai!
- **Solution**: Arrow function mein wrap karein: \`<button onClick={() => deleteUser(id)}>\`.

### 2. Form Submit Par \`e.preventDefault()\` Bhool Jana
- **Galati**: Form submit par \`e.preventDefault()\` na lagana jisse browser poora page reload kar deta hai aur state gayab ho jaati hai.
- **Solution**: Submit handler mein pehli line \`e.preventDefault()\` likhein.

### 3. Default Rokne Ke Liye \`return false\` Likhna
- **Galati**: jQuery ki tarah \`return false\` karna. React mein yeh kaam nahi karta.
- **Solution**: Hamesha explicitly \`e.preventDefault()\` call karein.

### 4. 5,000 Items Wali List Mein Har Jagah Inline Arrow Lagana
- **Galati**: Badi tables mein har row ke andar naya inline function create karna.
- **Solution**: Performance optimize karne ke liye memoized handlers use karein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Event Architecture",
        hi: "Event Architecture Ke Best Practices",
      },
      body: {
        en: `1. **Standard Naming Convention**: Name event handler functions with the prefix \`handle\` (\`handleSubmit\`, \`handleToggleModal\`) and name prop callbacks with \`on\` (\`onSubmit\`, \`onClose\`).
2. **Keyboard Accessibility (a11y)**: If an element is clickable with \`onClick\` (like a custom div card), always provide keyboard support (\`onKeyDown\` responding to Enter or Space) and \`tabIndex={0}\`.
3. **Use \`e.stopPropagation()\` with Caution**: Only stop bubbling when you have genuine nested interactive elements (e.g. action buttons inside clickable cards).
4. **Use \`e.currentTarget\` vs \`e.target\` Correctly**: \`e.target\` is the exact innermost element that was clicked (e.g. an icon span), while \`e.currentTarget\` is the element that actually owns the event listener.`,
        hi: `1. **Naming Convention**: Handlers ka naam \`handle\` se shuru karein (\`handleClick\`) aur props ka naam \`on\` se shuru karein (\`onClick\`).
2. **Keyboard Accessibility (a11y)**: Clickable div cards par \`onClick\` ke sath \`onKeyDown\` (Enter/Space check) aur \`tabIndex={0}\` zaroor lagayein.
3. **\`stopPropagation\` Ka Sahi Use**: Sirf tabhi use karein jab card ke andar koi alag button ho jiska click card ko trigger na kare.
4. **\`target\` vs \`currentTarget\`**: \`e.target\` woh element hota hai jis par click hua, jabki \`e.currentTarget\` woh element hota hai jis par listener laga hai.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Top Interview Sawaal Aur Jawab",
      },
      body: {
        en: `### Q1: What is a SyntheticEvent in React and how does it differ from a native DOM event?
**Answer**:
A SyntheticEvent is React's cross-browser wrapper around the browser's native event object. It provides the exact same interface (\`preventDefault\`, \`stopPropagation\`, \`target\`, \`type\`) across all browsers according to the W3C specification, eliminating browser-specific inconsistencies. The underlying native event is accessible via \`e.nativeEvent\`.

### Q2: How does Event Delegation work in React 18?
**Answer**:
React does not attach event listeners to individual DOM elements. Instead, in React 18, React attaches a single listener for each event type to the root DOM container (\`#root\`). When an event occurs, it bubbles to the root, where React identifies the source element, maps it to the Fiber node, and dispatches the corresponding SyntheticEvent.

### Q3: Why does <button onClick={handleClick()}> run immediately when the page loads?
**Answer**:
Because parentheses \`()\` in JavaScript immediately invoke the function. React receives the *return value* of \`handleClick()\` (often \`undefined\`) rather than the function reference itself. To execute only on click, pass the function reference without parentheses: \`onClick={handleClick}\`.`,
        hi: `### Q1: React mein SyntheticEvent kya hota hai?
**Jawab**:
SyntheticEvent browser ke native event ke upar React ka cross-browser wrapper hota hai jo Chrome, Safari aur Firefox mein ek jaisa behavior aur W3C compliant API deta hai. Asli event \`e.nativeEvent\` mein hota hai.

### Q2: React 18 mein Event Delegation kaise kaam karta hai?
**Jawab**:
React har DOM node par alag listener nahi lagata, balki root DOM node (\`#root\`) par ek single listener lagata hai. Event bubble hokar root tak aata hai aur React Fiber tree se match karke sahi handler execute kar deta hai.

### Q3: \`<button onClick={handleClick()}>\` page load hote hi kyun chal jata hai?
**Jawab**:
Parentheses \`()\` lagane se JavaScript function ko turant execute kar deta hai. React ko function ka reference nahi balki uska return value milta hai. Sahi tareeka hai bina parentheses ke pass karna: \`onClick={handleClick}\`.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Event Handling",
        hi: "Quick Summary: Event Handling",
      },
      body: {
        en: `- **SyntheticEvent**: Cross-browser normalized wrapper over native browser events.
- **Event Delegation**: React listens at the root container (\`#root\`), saving memory.
- **Pass Function References**: \`onClick={handleClick}\` not \`onClick={handleClick()}\`.
- **Pass Arguments via Arrow Functions**: \`onClick={() => handleDelete(id)}\`.
- **Control Flow**: Use \`e.preventDefault()\` to stop page reloads and \`e.stopPropagation()\` to halt bubbling.`,
        hi: `- **SyntheticEvent**: Cross-browser uniform event wrapper.
- **Event Delegation**: Saare events \`#root\` par delegate hote hain, jisse memory bachti hai.
- **Function Reference**: Hamesha \`onClick={handleClick}\` pass karein, call na karein.
- **Arguments**: Parameters ke liye \`() => fn(arg)\` use karein.
- **Event Control**: Page reload rokne ke liye \`e.preventDefault()\` aur bubbling rokne ke liye \`e.stopPropagation()\`.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "Why should you write onClick={handleClick} instead of onClick={handleClick()} in JSX?",
      "hi": "JSX mein onClick={handleClick()} ke bajaye onClick={handleClick} kyun likhna chahiye?"
    },
    "options": [
      {
        "en": "handleClick() creates an external network request",
        "hi": "handleClick() network request bhejta hai"
      },
      {
        "en": "handleClick() invokes the function immediately during component rendering rather than waiting for the user to click",
        "hi": "handleClick() render hote hi function chala deta hai bina user ke click kiye"
      },
      {
        "en": "React does not support functions with names starting with handle",
        "hi": "handle naam allow nahi hai"
      },
      {
        "en": "handleClick() converts the button into an image",
        "hi": "Button image ban jata hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Adding parentheses executes the function immediately upon component render. Omitting parentheses passes the function reference so React invokes it only on click.",
      "hi": "Parentheses lagane se function render ke waqt hi execute ho jata hai, jabki bina parentheses ke sirf click hone par chalta hai."
    }
  },
  {
    "q": {
      "en": "Where does React 18 attach its event listeners in the real browser DOM tree?",
      "hi": "React 18 real browser DOM tree mein event listeners kahan lagata hai?"
    },
    "options": [
      {
        "en": "To each individual HTML DOM node directly",
        "hi": "Har individual DOM node par"
      },
      {
        "en": "To the root DOM container (such as div#root) via Event Delegation",
        "hi": "Event Delegation ke zariye root container (div#root) par"
      },
      {
        "en": "Inside the browser local storage",
        "hi": "Local storage mein"
      },
      {
        "en": "Directly on the GPU driver",
        "hi": "GPU driver par"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "React 18 attaches a single listener per event type to the root container node (div#root) using the Event Delegation pattern to minimize memory overhead.",
      "hi": "React 18 memory bachane ke liye root container node (#root) par single listener lagata hai jahan events bubble hokar aate hain."
    }
  },
  {
    "q": {
      "en": "What does e.stopPropagation() do when called inside an event handler?",
      "hi": "Event handler ke andar e.stopPropagation() chalane se kya hota hai?"
    },
    "options": [
      {
        "en": "It permanently disables the user's mouse",
        "hi": "Mouse disable ho jata hai"
      },
      {
        "en": "It prevents the event from bubbling up to parent DOM elements",
        "hi": "Event ko parent DOM elements tak upar bubble hone se rokta hai"
      },
      {
        "en": "It reloads the page in background",
        "hi": "Page reload karta hai"
      },
      {
        "en": "It triggers a re-render of the entire web application",
        "hi": "Poori app re-render kar deta hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "e.stopPropagation() halts the bubbling phase of the event, preventing ancestor elements from receiving and handling the same event.",
      "hi": "e.stopPropagation() event ko parent elements tak upar bubble hone se rok deta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Event Handling & Synthetic Events in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Event Handling & SyntheticEvent System ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling event handling & synthetic events with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Event Handling & SyntheticEvent System ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Event Handling & Synthetic Events establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Event Handling & SyntheticEvent System clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Event Handling & Synthetic Events directly resolve?",
      "hi": "Event Handling & SyntheticEvent System kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Event Handling & Synthetic Events, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Event Handling & SyntheticEvent System ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Event Handling & Synthetic Events, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Event Handling & SyntheticEvent System ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Event Handling & Synthetic Events, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Event Handling & SyntheticEvent System ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Event Handling & Synthetic Events?",
      "hi": "Event Handling & SyntheticEvent System ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Event Handling & Synthetic Events be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Event Handling & SyntheticEvent System ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Event Handling & Synthetic Events impact application memory and CPU consumption?",
      "hi": "Event Handling & SyntheticEvent System ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Event Handling & Synthetic Events?",
      "hi": "Event Handling & SyntheticEvent System mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Event Handling & Synthetic Events?",
      "hi": "Event Handling & SyntheticEvent System mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Event Handling & Synthetic Events?",
      "hi": "Event Handling & SyntheticEvent System mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Event Handling & Synthetic Events, what must the test suite assert?",
      "hi": "Event Handling & SyntheticEvent System ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Event Handling & Synthetic Events?",
      "hi": "Modular design Event Handling & SyntheticEvent System mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Event Handling & Synthetic Events be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Event Handling & SyntheticEvent System ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Event Handling & Synthetic Events properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Event Handling & SyntheticEvent System kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Event Handling & Synthetic Events in production?",
      "hi": "Production mein Event Handling & SyntheticEvent System ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Event Handling & Synthetic Events?",
      "hi": "Event Handling & SyntheticEvent System ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Event Handling & Synthetic Events?",
      "hi": "Event Handling & SyntheticEvent System mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Event Handling & Synthetic Events?",
      "hi": "Event Handling & SyntheticEvent System mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
