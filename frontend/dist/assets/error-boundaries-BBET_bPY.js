const e={id:"react-error-boundaries",title:{en:"Error Boundaries & Graceful UI Fallbacks",hi:"Error Boundaries: UI Crash Hone Se Bachana"},difficulty:"Intermediate",readTime:8,sections:[{type:"concept",heading:{en:"1. The White Screen of Death & What Error Boundaries Solve",hi:"1. The White Screen of Death Aur Error Boundaries Ka Role"},body:{en:`In standard JavaScript, an unhandled error inside a function logs an error to the console, but the rest of the application typically continues running.

In React, the behavior is much more unforgiving:
> **React's Philosophy**: A corrupted UI is worse than no UI at all. If a single component throws an unhandled exception during rendering, displaying corrupted or partially rendered data could lead to serious issues (such as charging a customer the wrong credit card amount or sending a message to the wrong recipient).

Therefore, starting in React 16, **any uncaught JavaScript error during rendering unmounts the entire React component tree!** The user is left looking at a completely blank, white screen—commonly called the **White Screen of Death**.

### The Solution: Error Boundaries
An **Error Boundary** is a specialized React component that acts like a \`try...catch\` block for declarative JSX. It:
1. Catches JavaScript errors anywhere in its child component tree during rendering, lifecycle methods, and constructors.
2. Logs the error and component stack trace to monitoring services (like Sentry or Datadog).
3. Renders a graceful fallback UI (e.g. an alert box with a *"Try Again"* button) instead of crashing the entire page!`,hi:`Standard JavaScript mein agar kisi function mein error aata hai toh console mein red error dikhta hai, lekin baaki code chalta rehta hai.

Lekin React mein aisa nahi hota:
> **React Ka Rule**: Galat UI dikhane se accha hai ki kuch na dikhe. Agar render ke dauran kisi ek chote component mein bhi error aa gaya, toh React **poore ke poore component tree ko unmount kar deta hai**! User ke samne bilkul blank white screen aa jati hai jise developer world mein **"White Screen of Death"** kehte hain.

### Error Boundaries Ka Solution
**Error Boundary** ek aisa React safety wrapper hota hai jo JSX ke liye \`try...catch\` ki tarah kaam karta hai:
1. Apne andar ke child components ke render errors ko catch karta hai.
2. Error ko logging service (jaise Sentry) par bhejta hai.
3. Poori app ko band hone se rok kar us section par ek sundar fallback UI (jaise *"Oops, something went wrong!"*) dikha deta hai!`}},{type:"concept",heading:{en:"2. What Error Boundaries Do and Do NOT Catch",hi:"2. Error Boundaries Kya Catch Karti Hain Aur Kya Nahi?"},body:{en:"It is critical to understand the boundaries of what Error Boundaries can intercept:\n\n### What Error Boundaries DO Catch:\n- Errors thrown during **Component Rendering** (e.g., trying to access `user.profile.avatar` when `profile` is undefined).\n- Errors thrown in **Lifecycle Methods** (`componentDidMount`, `componentDidUpdate`).\n- Errors thrown in **Constructors** of child components.\n- Errors thrown inside **`useEffect` setup and cleanup functions** in children.\n\n### What Error Boundaries DO NOT Catch:\n1. **Event Handlers** (`onClick`, `onSubmit`, `onKeyDown`):\n   - React does not render the UI inside event handlers. If an error occurs inside `onClick`, the UI is already rendered and stable!\n   - **Fix**: Use standard JavaScript `try...catch` blocks inside event handlers.\n2. **Asynchronous Code** (`setTimeout`, `requestAnimationFrame`, raw `fetch` promises):\n   - Code that executes outside React's synchronous render loop.\n3. **Server-Side Rendering (SSR)**:\n   - SSR errors occur before the client hydration process begins.\n4. **Errors inside the Error Boundary itself**:\n   - If the Error Boundary's own `render()` method throws, it cannot catch its own failure. A parent boundary must catch it.",hi:"Yeh samajhna bohot zaroori hai ki Error Boundary kahan kaam karti hai aur kahan nahi:\n\n### Kya Catch Karti Hai:\n- Render ke dauran aane wale errors (jaise `undefined.map()` ya null property access).\n- Child components ke lifecycle methods aur `useEffect` ke errors.\n\n### Kya Catch NAHI Karti:\n1. **Event Handlers (`onClick`, `onSubmit`)**:\n   - Button click ke andar aane wale errors ko Error Boundary catch nahi karti! Unke liye hamesha normal `try...catch` use karein.\n2. **Asynchronous Code (`setTimeout`, raw API calls)**:\n   - Jo code React ke render cycle ke bahar chalta hai.\n3. **Error Boundary ke apne andar aane wale errors**:\n   - Khud ki boundary ke render errors ko catch nahi kar sakti."}},{type:"analogy",heading:{en:"Real-Life Analogy: The Electrical Circuit Breaker (MCB) in Your House",hi:"Real-Life Analogy: Ghar Ka Miniature Circuit Breaker (MCB)"},body:{en:`Consider how electrical wiring is organized in a modern Indian home:

- **Without MCB (Naive React Without Error Boundaries)**:
  All electrical appliances in your house are wired in a single series circuit. One day, a cheap electric kettle in the kitchen develops a short circuit. Boom! The entire house plunges into total pitch-black darkness. The refrigerator stops, the TV turns off, the Wi-Fi router dies, and you're stranded searching for candles in the dark.
- **With Granular MCB Breakers (React Error Boundaries)**:
  1. The electrical board has individual circuit breakers: one for the Kitchen, one for the Living Room, and one for the Bedrooms.
  2. When the kitchen kettle shorts out, **only the Kitchen MCB trips** with a distinct *click* sound!
  3. The living room TV continues streaming your cricket match, the Wi-Fi continues working, and the lights remain on.
  4. You walk into the kitchen, unplug the faulty kettle, flip the MCB switch back up, and kitchen power is restored instantly!`,hi:`Ghar ki bijli aur MCB (Circuit Breaker) ka example dekhein:

- **Bina MCB Ke (White Screen of Death)**:
  Ghar ke saare appliances ek hi wire se jude hain. Kitchen mein toaster mein short circuit hua, aur poore ghar ki bijli gul! Living room ka AC band, Wi-Fi router band, TV band. Sab andhere mein!
- **Granular MCB Breakers Ke Saath (Error Boundaries)**:
  1. Har kamre ka apna alag MCB switch hota hai (Kitchen, Bedroom, Hall).
  2. Kitchen ke toaster mein short circuit hua, toh **sirf kitchen ka MCB trip hota hai**!
  3. Living room mein cricket match chalta rehta hai, Wi-Fi bilkul chalu rehta hai.
  4. Aap kitchen mein jakar toaster ka plug nikalte hain aur MCB switch wapas on kar dete hain. Sab normal ho jata hai!`}},{type:"syntax",heading:{en:"Syntax: Creating an Error Boundary Component",hi:"Syntax: Error Boundary Component Kaise Banayein?"},body:{en:`To create an Error Boundary in core React, you **must use a Class Component**. React requires two static lifecycle methods that do not currently have direct hook equivalents:

\`\`\`jsx
// src/components/ErrorBoundary.jsx
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // 1. Update state so next render shows fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // 2. Catch and log error details to an external reporting service (Sentry, LogRocket)
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
    // e.g., Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided via props or default fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: '20px', border: '1px solid #f87171', borderRadius: '8px', backgroundColor: '#fef2f2' }}>
          <h3 style={{ color: '#b91c1c' }}>⚠️ Something went wrong in this section.</h3>
          <p style={{ color: '#7f1d1d', fontSize: '14px' }}>{this.state.error?.message}</p>
          <button
            onClick={this.handleReset}
            style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px' }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
\`\`\``,hi:"React mein Error Boundary banane ke liye **Class Component** banana padta hai jisme do core methods hote hain:\n\n1. `static getDerivedStateFromError(error)`: State update karta hai (`hasError: true`) taaki agle render par fallback UI render ho sake.\n2. `componentDidCatch(error, errorInfo)`: Error aur stack trace ko Sentry ya console mein log karne ke liye use hota hai."}},{type:"example",heading:{en:"Example 1: Basic Error Boundary with Reset Capability",hi:"Example 1: Reset Button Ke Saath Basic Error Boundary"},body:{en:`This example simulates a bug where clicking a button throws a render error, showing how the Error Boundary catches it and allows the user to reset without reloading the whole browser.

\`\`\`jsx
// src/components/BuggyWidget.jsx
import React, { useState } from 'react';

export function BuggyWidget() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    // Simulating an unexpected rendering crash!
    throw new Error('💥 Fatal simulation crash: Database item was null!');
  }

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '6px' }}>
      <h4>Active User Widget</h4>
      <p>All services are operational.</p>
      <button
        onClick={() => setShouldCrash(true)}
        style={{ background: '#e11d48', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px' }}
      >
        Simulate Crash Bug
      </button>
    </div>
  );
}
\`\`\`

\`\`\`jsx
// src/App.jsx
import React from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BuggyWidget } from './components/BuggyWidget';

export default function App() {
  return (
    <div style={{ padding: '30px' }}>
      <h1>My Application Dashboard</h1>
      <p>The top navigation and user account stay perfectly safe.</p>

      {/* Boundary protects this specific widget */}
      <ErrorBoundary>
        <BuggyWidget />
      </ErrorBoundary>

      <div style={{ marginTop: '20px', padding: '10px', background: '#f8fafc' }}>
        <p>Footer Copyright & Help Center (Still completely interactive!)</p>
      </div>
    </div>
  );
}
\`\`\``,hi:`Jab user *"Simulate Crash Bug"* dabata hai:
- \`BuggyWidget\` ke andar render ke waqt error throw hota hai.
- Poori website crash hone ke bajaye, sirf us widget ki jagah red fallback card aa jata hai.
- Header aur Footer bilkul theek chalte rehte hain!`}},{type:"example",heading:{en:"Example 2: Granular Multi-Boundary Architecture",hi:"Example 2: Granular Multi-Boundary Architecture (Widget Isolation)"},body:{en:`In real-world applications, placing multiple granular boundaries around independent sections ensures that a crash in a secondary widget (like Comments or Ads) never destroys the primary user flow (like the Video Player or Checkout Form).

\`\`\`jsx
// src/pages/VideoPlayerPage.jsx
import React from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { VideoPlayer } from '../components/VideoPlayer';
import { RecommendedVideos } from '../components/RecommendedVideos';
import { LiveComments } from '../components/LiveComments';

export function VideoPlayerPage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', padding: '20px' }}>
      <div>
        {/* Boundary 1: Main Video (Critical) */}
        <ErrorBoundary fallback={<div>Failed to load video player. Please refresh.</div>}>
          <VideoPlayer />
        </ErrorBoundary>

        {/* Boundary 2: Comments (Non-critical) */}
        <div style={{ marginTop: '20px' }}>
          <ErrorBoundary fallback={<div style={{ color: '#888' }}>Comments are temporarily unavailable.</div>}>
            <LiveComments />
          </ErrorBoundary>
        </div>
      </div>

      <div>
        {/* Boundary 3: Sidebar Recommendations (Non-critical) */}
        <ErrorBoundary fallback={<div>Could not fetch recommendations.</div>}>
          <RecommendedVideos />
        </ErrorBoundary>
      </div>
    </div>
  );
}
\`\`\``,hi:"Yeh YouTube ya Netflix jaisi apps ka architecture hai:\n- Video Player, Comments aur Recommendations teeno alag-alag Error Boundaries mein wrapped hain.\n- Agar kisi comment ke emoji parsing mein bug aa jaye aur `LiveComments` crash ho jaye, tab bhi user ka video chalna band nahi hoga! Sirf comments section par chota sa message aayega."}},{type:"example",heading:{en:"Example 3: Modern react-error-boundary Library with FallbackComponent",hi:"Example 3: Industry Standard react-error-boundary Library Ka Use"},body:{en:`In modern React projects, the official community standard is the \`react-error-boundary\` package. It lets you write pure functional fallback components and provides automatic reset triggers via \`resetKeys\`.

\`\`\`bash
npm install react-error-boundary
\`\`\`

\`\`\`jsx
// src/components/FeedSection.jsx
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Clean functional fallback UI
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ padding: '20px', backgroundColor: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '8px' }}>
      <h3 style={{ color: '#9f1239' }}>Something went wrong!</h3>
      <pre style={{ fontSize: '12px', color: '#881337', whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        style={{ marginTop: '12px', padding: '8px 16px', backgroundColor: '#e11d48', color: '#fff', border: 'none', borderRadius: '4px' }}
      >
        🔄 Try Again
      </button>
    </div>
  );
}

export function FeedSection({ activeTab }) {
  return (
    // Automatically resets the boundary whenever activeTab changes!
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[activeTab]}
      onError={(error, info) => {
        // Send to monitoring service
        console.warn('Logging to analytics:', error.message);
      }}
    >
      <TabContent tab={activeTab} />
    </ErrorBoundary>
  );
}
\`\`\``,hi:"`react-error-boundary` library functional components ke saath kaam karne ka sabse clean tareeqa hai:\n- `FallbackComponent`: Fallback UI ko normal functional component ki tarah likhein.\n- `resetErrorBoundary`: Fallback ke andar se hi retry button attach kar sakte hain.\n- `resetKeys={[activeTab]}`: Jab bhi user tab badlega, error boundary automatically reset ho jayegi!"}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Common Mistakes Aur Unke Fixes"},body:{en:`### 1. Expecting Error Boundaries to Catch onClick Errors
- **Mistake**: Writing code like \`onClick={() => user.save()}\` and assuming the Error Boundary will display the fallback if \`user.save()\` throws.
- **Why it breaks**: Event handlers execute after the render lifecycle is finished. React does not invoke Error Boundaries for event handler exceptions!
- **Fix**: Use \`try...catch\` inside event handlers:
  \`\`\`javascript
  const handleClick = async () => {
    try {
      await user.save();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  \`\`\`

### 2. Putting Only a Single Error Boundary at the Root of the App
- **Mistake**: Wrapping only \`<App />\` in an Error Boundary and nowhere else.
- **Why it hurts**: While it prevents a raw blank white screen, any error in a minor widget (like a footer link) will still wipe out the **entire page** and show a full-screen error box!
- **Fix**: Use a top-level boundary for catastrophic crashes PLUS localized boundaries around independent cards, tabs, and widgets.

### 3. Infinite Render Loops in Fallback Components
- **Mistake**: Writing code inside the \`FallbackComponent\` or \`render()\` method that itself throws an error.
- **Why it breaks**: React crashes completely because the boundary cannot catch its own rendering failures.
- **Fix**: Keep fallback components ultra-simple, static, and devoid of complex side-effects or external library dependencies.`,hi:`### 1. onClick Ke Errors Ke Liye Error Boundary Par Depend Rehna
- **Galti**: Button click ke error ko Error Boundary se pakadne ki koshish karna.
- **Nuksan**: Event handlers render cycle ke bahar chalte hain, isliye Error Boundary unhe catch nahi kar sakti.
- **Fix**: Event handlers mein hamesha normal \`try...catch\` block use karein.

### 2. Poori App Mein Sirf Ek Single Root Boundary Lagana
- **Galti**: Sirf top-level App par boundary lagana.
- **Nuksan**: Footer ke chote se bug ki wajah se bhi poora page gayab ho jayega.
- **Fix**: Independent features (jaise Sidebar, Feed, Chat) par alag-alag boundaries lagayein.

### 3. Fallback Component Ke Andar Error Throw Kar Dena
- **Galti**: Fallback UI mein hi aisi calculation likh dena jo crash ho jaye.
- **Fix**: Fallback component ko hamesha simple aur lightweight rakhein.`}},{type:"tip",heading:{en:"Best Practices: Error Resiliency Strategy",hi:"Best Practices: Production Error Resiliency Strategy"},body:{en:`1. **Layer Your Boundaries**:
   - Level 1: Global Boundary at root (catches catastrophic app-wide boot errors).
   - Level 2: Route-level Boundary inside \`<Suspense>\` (isolates page navigation errors).
   - Level 3: Widget-level Boundary around risky third-party widgets, ads, or comment feeds.
2. **Always Provide a Recovery Action**: Never show a dead-end error message. Always include a *"Try Again"*, *"Reload Page"*, or *"Return to Home"* button.
3. **Capture User Feedback**: In your error fallback, consider including a Sentry User Feedback Dialog so users can explain what they were doing when the crash occurred.
4. **Clean Up State on Route Change**: Reset Error Boundaries when the user navigates to a new URL using location change listeners or \`resetKeys={[location.pathname]}\`.`,hi:`1. **Multi-Layered Boundaries**:
   - Level 1: Global App root par.
   - Level 2: Har Route/Page par.
   - Level 3: Independent widgets aur third-party components par.
2. **Recovery Action Dijiye**: Kabhi bhi dead-end error na dikhayein. Hamesha "Try Again" ya "Go to Home" button dekar user ko wapas track par layein.
3. **Sentry Error Logging**: \`componentDidCatch\` mein Sentry jaisi service par componentStack log karein taaki developers bug ko turant fix kar sakein.
4. **URL Badalne Par Reset Karein**: Navigation change hote hi Error Boundary ko reset kar dein taaki naye page par purana error na dikhe.`}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:`### Q1: Why do unhandled errors during rendering unmount the entire React component tree?
**Answer**: Starting in React 16, the React team determined that leaving a corrupted, broken UI visible to users is worse than unmounting it. Corrupted UI can lead to severe real-world bugs (e.g., in financial applications, sending funds to the wrong account or submitting unintended actions). Error Boundaries were introduced to give developers safe, explicit containment zones.

### Q2: What are the two lifecycle methods required to make a class component an Error Boundary?
**Answer**:
1. \`static getDerivedStateFromError(error)\`: A static method that receives the thrown error and returns an updated state object (e.g., \`{ hasError: true }\`) to render the fallback UI during the next render pass.
2. \`componentDidCatch(error, errorInfo)\`: Invoked during the "commit" phase after the error has been thrown. It receives the error and an \`errorInfo\` object containing the \`componentStack\` trace, making it the ideal place to log errors to monitoring services like Sentry.

### Q3: Why can't we use a React Hook (like useErrorBoundary) to create an Error Boundary?
**Answer**: As of React 18 and 19, React's internal fiber architecture relies on class component lifecycle hooks (\`getDerivedStateFromError\` and \`componentDidCatch\`) to intercept fiber errors during the reconciliation phase. The React team has stated that hook equivalents are planned, but until then, a class component wrapper (or the \`react-error-boundary\` library) remains required.

### Q4: How do you catch errors inside an async function or event handler and pass them to an Error Boundary?
**Answer**: By re-throwing the error inside a state setter callback during rendering! For example:
\`\`\`javascript
const [_, setError] = useState();
const handleClick = async () => {
  try {
    await fetchOrders();
  } catch (err) {
    // Re-throw inside state updater so it gets caught during render by ErrorBoundary!
    setError(() => { throw err; });
  }
};
\`\`\``,hi:`### Q1: Render ke unhandled errors poore component tree ko unmount kyun kar dete hain?
**Jawab**: Corrupted UI users ko galat data dikha sakti hai jo financial ya medical apps mein dangerous ho sakta hai. Isliye React unhandled errors par poore tree ko safety ke liye unmount karta hai aur Error Boundaries provide karta hai.

### Q2: Error Boundary banane ke do zaroori lifecycle methods kaunse hain?
**Jawab**:
1. \`static getDerivedStateFromError(error)\`: State update karke fallback UI render karne ke liye.
2. \`componentDidCatch(error, errorInfo)\`: Error aur \`componentStack\` ko Sentry ya console mein log karne ke liye.

### Q3: Hooks se Error Boundary kyun nahi ban sakti?
**Jawab**: React Fiber architecture mein error catching methods abhi sirf class components ke liye supported hain. Future mein hook aane tak class components ya \`react-error-boundary\` library use ki jaati hai.`}},{type:"summary",heading:{en:"Quick Summary: Error Boundaries Cheatsheet",hi:"Quick Summary: Error Boundaries Cheatsheet"},body:{en:"- **Prevent White Screen of Death**: Catches uncaught rendering errors in child components.\n- **Class Components Required**: Must implement `static getDerivedStateFromError` and `componentDidCatch`.\n- **What is NOT Caught**: Event handlers, async callbacks, SSR, and errors inside the boundary itself.\n- **Use Granular Boundaries**: Wrap independent widgets so a crash in comments doesn't crash the video player.\n- **react-error-boundary**: The industry-standard library providing `FallbackComponent` and `resetKeys`.\n- **Always Include Reset/Retry**: Give users a path to recover without having to manually refresh the browser.",hi:'- **White Screen Se Bachaye**: Child components ke uncaught rendering errors ko rokta hai.\n- **Class Component Zaroori Hai**: `getDerivedStateFromError` aur `componentDidCatch` methods chahiye.\n- **Limit**: Event handlers (`onClick`) aur async code ko catch nahi karta.\n- **Granular Isolation**: Independent widgets ko alag-alag boundaries mein rakhein.\n- **react-error-boundary**: Functional components ke saath use karne ke liye standard package.\n- **Retry Option**: Fallback screen par hamesha "Try Again" ka button dekar recovery allow karein.'}}],quiz:[{question:{en:"Which of the following errors will NOT be caught by a React Error Boundary?",hi:"Inme se kaunsa error React Error Boundary ke dwara CATCH NAHI hoga?"},options:[{en:"An error thrown inside a child component's render method",hi:"Child component ke render method ke andar aane wala error"},{en:"An error thrown inside an asynchronous onClick event handler",hi:"Asynchronous onClick event handler ke andar aane wala error"},{en:"An error thrown inside a child component's componentDidMount",hi:"Child component ke componentDidMount ke andar aane wala error"},{en:"An error thrown inside a child component's constructor",hi:"Child component ke constructor ke andar aane wala error"}],correctAnswer:1,explanation:{en:"Error Boundaries do not catch errors inside event handlers (like onClick). Event handlers run outside the render lifecycle. Use standard try/catch blocks for event handlers.",hi:"Error Boundaries event handlers (jaise onClick) ke errors ko catch nahi karti kyunki wo render cycle ke bahar execute hote hain."}},{question:{en:"What is the primary role of static getDerivedStateFromError(error)?",hi:"static getDerivedStateFromError(error) ka primary role kya hota hai?"},options:[{en:"To delete the error from memory",hi:"Error ko memory se delete karna"},{en:"To update component state so the next render displays the fallback UI",hi:"Component state update karna taaki agle render par fallback UI render ho sake"},{en:"To reload the user's browser window",hi:"User ka browser window reload karna"},{en:"To send an SMS alert to the user",hi:"User ko SMS alert bhejna"}],correctAnswer:1,explanation:{en:"getDerivedStateFromError receives the thrown error and returns an updated state object (such as { hasError: true }), which causes the boundary to render its fallback UI.",hi:"getDerivedStateFromError error aane par updated state return karta hai taaki fallback UI render ho sake."}},{question:{en:"Why is it an anti-pattern to wrap only the root <App /> in a single Error Boundary?",hi:"Poori app mein sirf ek single root Error Boundary lagana anti-pattern kyun maana jata hai?"},options:[{en:"Because Error Boundaries can only run once per hour",hi:"Kyunki Error Boundaries ghante mein ek hi baar run hoti hain"},{en:"Because any error in an isolated minor widget will unmount the entire application UI",hi:"Kyunki kisi ek chote widget ke bug ki wajah se bhi poori website ka UI gayab ho jayega"},{en:"Because React does not support class components at the root",hi:"Kyunki React root par class components support nahi karta"},{en:"Because browsers block root boundaries for security",hi:"Kyunki browsers security ke liye root boundaries block kar dete hain"}],correctAnswer:1,explanation:{en:"A single root boundary means any minor crash (e.g. in a footer widget) unmounts the whole application. Granular boundaries ensure only the failing widget is replaced by a fallback.",hi:"Sirf ek boundary hone par kisi chote se component ke fail hone se bhi poori screen gayab ho jati hai. Granular boundaries lagane se sirf wahi component fallback se replace hota hai."}},{question:{en:"What parameter does componentDidCatch provide that contains the component stack trace?",hi:"componentDidCatch kaunsa parameter provide karta hai jisme component stack trace hota hai?"},options:[{en:"errorInfo.componentStack",hi:"errorInfo.componentStack"},{en:"window.stackTrace",hi:"window.stackTrace"},{en:"document.errorLog",hi:"document.errorLog"},{en:"process.env.STACK",hi:"process.env.STACK"}],correctAnswer:0,explanation:{en:"The second argument to componentDidCatch is an errorInfo object containing errorInfo.componentStack, which pinpoints the exact component hierarchy where the crash occurred.",hi:"componentDidCatch ka second argument errorInfo hota hai jisme componentStack trace milta hai."}},{question:{en:"What is the core architectural purpose of Error Boundaries & Graceful UI Fallbacks in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Error Boundaries: UI Crash Hone Se Bachana ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling error boundaries & graceful ui fallbacks with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Error Boundaries: UI Crash Hone Se Bachana ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Error Boundaries & Graceful UI Fallbacks establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Error Boundaries: UI Crash Hone Se Bachana clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Error Boundaries & Graceful UI Fallbacks directly resolve?",hi:"Error Boundaries: UI Crash Hone Se Bachana kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Error Boundaries & Graceful UI Fallbacks, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Error Boundaries: UI Crash Hone Se Bachana ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Error Boundaries & Graceful UI Fallbacks, how is its mental model best conceptualized through real-world analogies?",hi:"Error Boundaries: UI Crash Hone Se Bachana ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Error Boundaries & Graceful UI Fallbacks, what syntactic convention is essential to prevent runtime errors?",hi:"Error Boundaries: UI Crash Hone Se Bachana ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Error Boundaries & Graceful UI Fallbacks?",hi:"Error Boundaries: UI Crash Hone Se Bachana ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Error Boundaries & Graceful UI Fallbacks be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Error Boundaries: UI Crash Hone Se Bachana ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Error Boundaries & Graceful UI Fallbacks impact application memory and CPU consumption?",hi:"Error Boundaries: UI Crash Hone Se Bachana ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Error Boundaries & Graceful UI Fallbacks?",hi:"Error Boundaries: UI Crash Hone Se Bachana mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Error Boundaries & Graceful UI Fallbacks?",hi:"Error Boundaries: UI Crash Hone Se Bachana mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Error Boundaries & Graceful UI Fallbacks?",hi:"Error Boundaries: UI Crash Hone Se Bachana mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Error Boundaries & Graceful UI Fallbacks, what must the test suite assert?",hi:"Error Boundaries: UI Crash Hone Se Bachana ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Error Boundaries & Graceful UI Fallbacks?",hi:"Modular design Error Boundaries: UI Crash Hone Se Bachana mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Error Boundaries & Graceful UI Fallbacks be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Error Boundaries: UI Crash Hone Se Bachana ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Error Boundaries & Graceful UI Fallbacks properly belong and execute?",hi:"Full-stack MERN architecture mein Error Boundaries: UI Crash Hone Se Bachana kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Error Boundaries & Graceful UI Fallbacks in production?",hi:"Production mein Error Boundaries: UI Crash Hone Se Bachana ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Error Boundaries & Graceful UI Fallbacks?",hi:"Error Boundaries: UI Crash Hone Se Bachana ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Error Boundaries & Graceful UI Fallbacks?",hi:"Error Boundaries: UI Crash Hone Se Bachana mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
