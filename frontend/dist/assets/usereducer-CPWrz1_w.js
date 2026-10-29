const e={id:"react-hooks-usereducer",title:{en:"useReducer Hook: Complex State Logic",hi:"useReducer Hook: Complex State Logic & Actions"},difficulty:"Intermediate",readTime:12,sections:[{type:"concept",heading:{en:"1. What is useReducer & When Should You Use It?",hi:"1. useReducer Kya Hai Aur useState Ki Jagah Kab Use Karna Chahiye?"},body:{en:"**`useReducer`** is an alternative built-in hook to `useState`. While `useState` is ideal for simple independent values (like a boolean flag or a single text input), `useReducer` is designed for **complex state logic**:\n\n### When to Prefer useReducer Over useState:\n1. **Multiple Sub-values**: When state is an object with 4+ related properties (e.g., shopping cart with items, coupon discount, tax rate, shipping cost).\n2. **Next State Depends on Previous State**: When state transitions follow strict business rules.\n3. **Complex State Transitions**: When one user action updates multiple related state variables simultaneously.\n4. **Easier Testing**: Reducer functions are pure JavaScript functions that exist outside the component, meaning you can test complex business logic in Jest without rendering any React components!",hi:"**`useReducer`** React ka ek built-in hook hai jo `useState` ka advanced vikalp hai. Jahan `useState` simple values (jaise ek toggle boolean ya number) ke liye best hota hai, wahin `useReducer` **complex state logic** ke liye banaya gaya hai.\n\n### useState Ke Mukable useReducer Kab Chunein:\n1. **Multiple Related Fields**: Jab state mein ek sath 4-5 properties judi hon (jaise shopping cart items, discount, tax, total).\n2. **Strict Business Rules**: Jab agla state purani state par depend karta ho aur specific rules follow karne hon.\n3. **Ek Action Se Multiple Updates**: Jab ek button click se 3-4 alag-alag states ek sath badalni hon.\n4. **Testing Mein Aasan**: Reducer function pure JavaScript function hota hai jo component ke bahar rehta hai, jise bina React render kiye asaani se unit test kiya ja sakta hai."}},{type:"concept",heading:{en:"2. The Anatomy of Reducer Architecture",hi:"2. Reducer Architecture Ke 4 Mukhya Hissay"},body:{en:`The architecture of \`useReducer\` is inspired directly by the Redux state management pattern:

1. **State**: The current data snapshot stored in React.
2. **Action**: A plain JavaScript object describing *what happened* in the UI:
   \`{ type: "ADD_ITEM", payload: { id: 1, title: "Book", price: 400 } }\`
3. **Dispatch Function**: The trigger function provided by React that sends the action to the reducer:
   \`dispatch({ type: "DELETE_ITEM", payload: itemId })\`
4. **Reducer Function**: A **pure function** that accepts \`(state, action)\` and returns the **brand new state**:
   \`\`\`javascript
   function reducer(state, action) {
     switch (action.type) {
       case "INCREMENT":
         return { ...state, count: state.count + 1 };
       default:
         return state;
     }
   }
   \`\`\``,hi:`\`useReducer\` ka architecture 4 mukhya hisson par tika hota hai:

1. **State**: Component ka current data snapshot.
2. **Action**: Ek plain JS object jo batata hai ki UI mein *kya ghatna ghati*:
   \`{ type: "ADD_ITEM", payload: product }\`
3. **Dispatch**: React dwara diya gaya trigger function jo action ko reducer tak bhejta hai:
   \`dispatch({ type: "DELETE_ITEM", payload: id })\`
4. **Reducer Function**: Ek **pure function** jo \`(state, action)\` lekar **naya state** return karta hai:
   \`\`\`javascript
   function reducer(state, action) {
     switch (action.type) {
       case "INCREMENT":
         return { ...state, count: state.count + 1 };
       default:
         return state;
     }
   }
   \`\`\``}},{type:"analogy",heading:{en:"Real-Life Analogy: The Indian Bank Branch Deposit & Withdrawal Counter",hi:"Real-Life Analogy: Bank Ka Cashier Aur Deposit / Withdrawal Slip"},body:{en:`Consider depositing money at a State Bank of India (SBI) branch:

- **State**: Your current bank account balance: ₹15,000.
- **Action**: You fill out a printed paper slip:
  - Form Type: \`"DEPOSIT_CASH"\` (\`action.type\`)
  - Amount: ₹5,000 (\`action.payload\`)
- **Dispatch**: You slide the deposit slip across the glass counter to the bank cashier (**dispatching the action**).
- **The Reducer Function (The Cashier & Official Bank Rulebook)**:
  - The cashier does not invent new rules. They follow the bank's strict rulebook (**pure reducer function**):
  - If \`type === "DEPOSIT"\`: \`newBalance = currentBalance + amount\`.
  - The cashier calculates ₹20,000 and stamps the updated passbook (**returning new state**)!
  - You cannot walk into the vault and change the computer database yourself (**state cannot be mutated directly; you must dispatch an action**)!`,hi:`SBI bank ke cash counter se samjhein:

- **State**: Aapke account ka current balance: ₹15,000.
- **Action**: Aapne printed slip bhari:
  - Slip Type: \`"DEPOSIT"\` (\`action.type\`)
  - Amount: ₹5,000 (\`action.payload\`)
- **Dispatch**: Aapne counter par cashier ko slip thama di (**dispatch function**).
- **The Reducer (Bank Ka Cashier Aur Niyamavali)**:
  - Cashier bank ke fixed rules follow karta hai (**pure function**).
  - Agar \`type === "DEPOSIT"\` hai, toh naya balance ₹20,000 calculate karta hai aur passbook par print kar deta hai (**New state**).
  - Aap khud bank ke computer mein ghus kar paise nahi badal sakte (**Direct state mutation mana hai, sirf action dispatch hoga**)!`}},{type:"syntax",heading:{en:"Syntax: useReducer Hook Declaration",hi:"Syntax: useReducer Hook Ka Code Structure"},body:{en:`### Standard useReducer Hook Signature:
\`\`\`javascript
import { useReducer } from "react";

// 1. Initial State
const initialState = { count: 0, step: 1 };

// 2. Pure Reducer Function
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return initialState;
    default:
      throw new Error(\`Unhandled action type: \${action.type}\`);
  }
}

// 3. Inside Component:
const [state, dispatch] = useReducer(counterReducer, initialState);
\`\`\``,hi:`### useReducer Ka Standard Syntax:
\`\`\`javascript
import { useReducer } from "react";

// 1. Initial State
const initialState = { count: 0, step: 1 };

// 2. Pure Reducer Function
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + state.step };
    case "DECREMENT":
      return { ...state, count: state.count - state.step };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// 3. Component ke andar use karein:
const [state, dispatch] = useReducer(counterReducer, initialState);
\`\`\``}},{type:"example",heading:{en:"Example 1: Advanced Counter with Limits & Configurable Steps",hi:"Example 1: Step Configuration Aur Limits Ke Sath Advanced Counter"},body:{en:"A multi-action counter enforcing min/max boundaries and customizable step size using a clean `useReducer` pattern.",hi:"useReducer ke zariye counter jisme step size, reset aur min/max limits ko handle kiya gaya hai."},code:{language:"jsx",filename:"ConfigurableCounter.jsx",snippet:`import React, { useReducer } from "react";

const initialState = { count: 0, step: 5, min: -20, max: 50 };

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: Math.min(state.max, state.count + state.step)
      };
    case "DECREMENT":
      return {
        ...state,
        count: Math.max(state.min, state.count - state.step)
      };
    case "SET_STEP":
      return {
        ...state,
        step: Math.max(1, Number(action.payload) || 1)
      };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
}

export default function ConfigurableCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md max-w-sm space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          useReducer Counter
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">
          Limits: [{state.min} to {state.max}]
        </span>
      </div>

      <div className="text-4xl font-extrabold text-center font-mono text-indigo-600 dark:text-indigo-400">
        {state.count}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500 font-medium">Step:</label>
        <input
          type="number"
          value={state.step}
          onChange={(e) => dispatch({ type: "SET_STEP", payload: e.target.value })}
          className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-xs font-mono text-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => dispatch({ type: "DECREMENT" })}
          disabled={state.count <= state.min}
          className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition disabled:opacity-40"
        >
          -{state.step}
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-500 transition"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch({ type: "INCREMENT" })}
          disabled={state.count >= state.max}
          className="py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition disabled:opacity-40"
        >
          +{state.step}
        </button>
      </div>
    </div>
  );
}`}},{type:"example",heading:{en:"Example 2: Complete E-Commerce Shopping Cart Reducer",hi:"Example 2: Complete E-Commerce Shopping Cart Reducer"},body:{en:"A production-ready shopping cart reducer handling item additions, quantity modifications, coupon application, and cart clearance.",hi:"Shopping Cart reducer jisme item jodna, quantity badalna, discount coupon lagana aur cart clear karna shamil hai."},code:{language:"jsx",filename:"CartReducerDemo.jsx",snippet:`import React, { useReducer } from "react";

const initialCartState = {
  items: [
    { id: "p1", title: "Boat Rockerz 450", price: 1499, quantity: 1 }
  ],
  discountPercent: 0,
  couponCode: ""
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    }
    case "UPDATE_QTY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(i => i.id !== id)
        };
      }
      return {
        ...state,
        items: state.items.map(i => (i.id === id ? { ...i, quantity } : i))
      };
    }
    case "APPLY_COUPON": {
      if (action.payload.toUpperCase() === "DIWALI50") {
        return { ...state, discountPercent: 50, couponCode: "DIWALI50" };
      }
      return { ...state, discountPercent: 0, couponCode: "" };
    }
    case "CLEAR_CART":
      return { ...state, items: [], discountPercent: 0, couponCode: "" };
    default:
      return state;
  }
}

export default function CartReducerDemo() {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (cart.discountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md max-w-md space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Shopping Cart ({cart.items.length})
        </h3>
        {cart.items.length > 0 && (
          <button
            onClick={() => dispatch({ type: "CLEAR_CART" })}
            className="text-[10px] text-rose-500 font-bold"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-2">
        {cart.items.map(item => (
          <div key={item.id} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">{item.title}</p>
              <p className="text-indigo-600 dark:text-indigo-400 font-bold">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch({ type: "UPDATE_QTY", payload: { id: item.id, quantity: item.quantity - 1 } })}
                className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 font-bold"
              >
                -
              </button>
              <span className="font-mono">{item.quantity}</span>
              <button
                onClick={() => dispatch({ type: "UPDATE_QTY", payload: { id: item.id, quantity: item.quantity + 1 } })}
                className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => dispatch({ type: "APPLY_COUPON", payload: "DIWALI50" })}
          className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition"
        >
          Apply Coupon: DIWALI50
        </button>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 pt-3 text-xs space-y-1">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        {cart.discountPercent > 0 && (
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Discount ({cart.discountPercent}%):</span>
            <span>-₹{discountAmount}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-1">
          <span>Final Total:</span>
          <span>₹{finalTotal}</span>
        </div>
      </div>
    </div>
  );
}`}},{type:"example",heading:{en:"Example 3: Async API Data Fetching Reducer (INIT, SUCCESS, ERROR)",hi:"Example 3: Async API Data Fetching Reducer (INIT, SUCCESS, ERROR)"},body:{en:"Using a reducer to guarantee that `isLoading`, `error`, and `data` states transition predictably without impossible combinations (e.g. data is present while error is true).",hi:"API call ke 3 states (loading, success, error) ko reducer se manage karna taaki data aur error aapas mein conflict na karein."},code:{language:"jsx",filename:"FetchReducerDemo.jsx",snippet:`import React, { useReducer, useEffect } from "react";

const initialFetchState = {
  data: null,
  isLoading: true,
  error: null
};

function fetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, error: null };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, error: action.payload, data: null };
    default:
      return state;
  }
}

export default function FetchReducerDemo() {
  const [state, dispatch] = useReducer(fetchReducer, initialFetchState);

  useEffect(() => {
    let isCancelled = false;
    dispatch({ type: "FETCH_INIT" });

    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(res => {
        if (!res.ok) throw new Error("Network request failed");
        return res.json();
      })
      .then(data => {
        if (!isCancelled) dispatch({ type: "FETCH_SUCCESS", payload: data });
      })
      .catch(err => {
        if (!isCancelled) dispatch({ type: "FETCH_FAILURE", payload: err.message });
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-sm space-y-3">
      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
        Predictable Async Reducer
      </h3>

      {state.isLoading && <p className="text-xs text-indigo-500 animate-pulse">Loading API data...</p>}
      {state.error && <p className="text-xs text-rose-500">Error: {state.error}</p>}
      {state.data && (
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
          <p className="font-semibold text-slate-800 dark:text-slate-100">Task Title:</p>
          <p className="text-slate-600 dark:text-slate-300">{state.data.title}</p>
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
            Status: {state.data.completed ? "Done" : "Pending"}
          </span>
        </div>
      )}
    </div>
  );
}`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Aam Galatiyan Aur Unka Solution"},body:{en:"### 1. Mutating State Directly Inside the Reducer\n- **Mistake**: Writing `state.items.push(action.payload); return state;`.\n- **Consequence**: Reducer mutates the state object by reference. React compares `prev === next` and skips re-rendering!\n- **Fix**: Reducers must be **pure functions**. Always return a new object: `return { ...state, items: [...state.items, action.payload] }`.\n\n### 2. Performing Side Effects Inside the Reducer\n- **Mistake**: Calling `fetch()`, `localStorage.setItem()`, or `Math.random()` inside the reducer function.\n- **Why**: Reducers must be completely deterministic and side-effect free.\n- **Fix**: Side effects belong in `useEffect` or event handlers before dispatching.\n\n### 3. Forgetting the Default Case in Switch\n- **Mistake**: Omitting the `default: return state;` case. Unrecognized action types will return `undefined`, completely wiping out your component state!\n- **Fix**: Always return `state` or throw a descriptive error in the `default` branch.",hi:"### 1. Reducer Ke Andar State Ko Mutate Karna\n- **Galati**: `state.items.push(item); return state;` likhna.\n- **Nuksan**: Memory reference same rehne ki wajah se React re-render skip kar deta hai.\n- **Solution**: Hamesha naya object return karein: `return { ...state, items: [...state.items, item] }`.\n\n### 2. Reducer Ke Andar Side Effects Chalana\n- **Galati**: Reducer ke andar `fetch()` karna ya `localStorage` likhna.\n- **Wajah**: Reducer ek pure function hona chahiye jisme koi side effect na ho.\n- **Solution**: Side effects ko `useEffect` ya handler mein chalayein, reducer mein sirf data update karein.\n\n### 3. Switch Mein Default Case Bhool Jana\n- **Galati**: Switch mein `default: return state;` na lagana.\n- **Nuksan**: Anjane action aane par reducer `undefined` return kar dega aur poori state gayab ho jayegi.\n- **Solution**: Hamesha `default: return state;` lagayein."}},{type:"tip",heading:{en:"Best Practices: Reducer Hygiene",hi:"useReducer Ke Best Practices"},body:{en:'1. **Define Action Types as String Constants**: Prevents silent typo bugs like dispatching `"ADD_ITME"` instead of `"ADD_ITEM"`.\n2. **Keep Reducers Outside Component Functions**: Declaring the reducer function outside the React component prevents re-allocating the function on every render and enables standalone unit testing.\n3. **Use the Standard Flux Standard Action (FSA) Shape**: Always structure actions as `{ type: string, payload?: any }`.\n4. **Combine with useContext for Global State**: Passing `dispatch` down through a React Context provides a lightweight alternative to Redux without extra dependencies.',hi:"1. **Action Types Ko Constants Banayein**: Typo bugs se bachne ke liye action types ke constants banayein.\n2. **Reducer Ko Component Ke Bahar Rakhein**: Isse har render par naya function nahi banta aur testing aasan hoti hai.\n3. **Standard Action Format ({ type, payload })**: Hamesha action mein `type` aur `payload` ka standard format use karein.\n4. **Context API Ke Sath Combine Karein**: `dispatch` ko Context mein pass karne se bina Redux ke mini-Redux ban jata hai."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Top Interview Sawaal Aur Jawab"},body:{en:`### Q1: When should you use useReducer instead of useState?
**Answer**:
Choose \`useReducer\` when:
1. State consists of complex objects or nested arrays with multiple related sub-values.
2. The next state depends on complex calculations using the previous state.
3. Multiple event handlers trigger the same state transition logic.
4. You want to test state transitions in isolation without rendering React components.

### Q2: Why must a reducer function be a "pure function"?
**Answer**:
A pure function produces the exact same output given the exact same arguments, without producing any side effects. If a reducer performs side effects (like API calls or random numbers), component renders become non-deterministic, time-travel debugging breaks, and React Fiber cannot safely pause, abort, or replay rendering work in Concurrent Mode.

### Q3: How do useReducer and Redux differ?
**Answer**:
- **\`useReducer\`**: A built-in React hook for local component-level state. It has no built-in middleware (like thunk/saga), no global store, and no browser devtools time-travel extension.
- **Redux**: A standalone state management library that provides a single global store, middleware support, action serialization, and robust DevTools for large multi-developer codebases.`,hi:`### Q1: useState ke badle useReducer kab use karna chahiye?
**Jawab**:
Jab state mein multiple related fields hon (jaise e-commerce cart), agla state purane state par depend karta ho, ya jab aap business logic ko component ke bahar independent unit test karna chahte hon.

### Q2: Reducer function "pure" kyun hona chahiye?
**Jawab**:
Pure function same input par hamesha same output deta hai aur koi side effect nahi karta. Agar reducer mein API call ya random values hongi, toh React Concurrent Mode rendering ko safe tareeqe se pause ya retry nahi kar payega.

### Q3: useReducer aur Redux mein kya antar hai?
**Jawab**:
- **useReducer**: React ka built-in hook hai jo local component state ke liye hota hai. Isme koi middleware ya global store nahi hota.
- **Redux**: Ek poora global state architecture hai jisme middleware (thunk/saga) aur time-travel DevTools ka support hota hai.`}},{type:"summary",heading:{en:"Quick Summary: useReducer Hook",hi:"Quick Summary: useReducer Hook"},body:{en:"- **Complex State Engine**: Ideal for multi-field objects and structured state machines.\n- **Pure Function**: Accepts `(state, action)` and returns brand-new immutable state.\n- **Standard Action Shape**: `{ type: string, payload: any }`.\n- **Zero Side Effects**: Never call APIs or set timers inside a reducer.\n- **Testable**: Pure reducers can be tested outside React with zero mocks.",hi:"- **Complex State Ke Liye**: Multi-field objects aur business rules ke liye best.\n- **Pure Function**: `(state, action)` lekar naya state return karta hai bina kisi side effect ke.\n- **Action Shape**: `{ type, payload }` format follow karein.\n- **Side Effects Mana**: Reducer ke andar API ya timers na chalayein.\n- **Unit Testing**: Component ke bahar rehne ke kaaran unit testing bohot aasan hoti hai."}}],quiz:[{q:{en:"What happens if a reducer function mutates state directly: state.count += 1; return state;?",hi:"Agar reducer function state ko seedhe mutate kare (state.count += 1; return state;) toh kya hoga?"},options:[{en:"React crashes with a RangeError",hi:"RangeError aayega"},{en:"Because the memory reference of state did not change, React will skip re-rendering and the UI will not update",hi:"State ka memory reference na badalne se React re-render skip kar dega aur UI update nahi hoga"},{en:"The state converts to a string",hi:"State string ban jayegi"},{en:"The browser reloads automatically",hi:"Browser reload ho jata hai"}],answerIndex:1,explanation:{en:"React performs an Object.is check on the state returned by the reducer. Because the mutated object has the exact same reference, React assumes nothing changed.",hi:"React reference equality check karta hai. Reference same rehne par React samajhta hai kuch nahi badla aur re-render skip ho jata hai."}},{q:{en:"Which of the following operations is FORBIDDEN inside a pure reducer function?",hi:"Inme se kaunsa kaam pure reducer function ke andar karna STRICTLY MANA hai?"},options:[{en:"Calculating mathematical sums with Array.reduce",hi:"Math calculate karna"},{en:"Calling fetch() to retrieve data from an external REST API",hi:"API se data lane ke liye fetch() call karna"},{en:"Spreading an object with ...state",hi:"Object spread karna"},{en:"Using a switch-case statement on action.type",hi:"Switch-case statement use karna"}],answerIndex:1,explanation:{en:"Reducers must be pure synchronous functions with zero side effects. Asynchronous operations like fetch() belong in useEffect or event handlers.",hi:"Reducer pure synchronous function hona chahiye. fetch() jaise async operations reducer mein nahi kiye ja sakte."}},{q:{en:"What should the default case of a reducer's switch statement return if an unhandled action is received?",hi:"Agar reducer mein koi unhandled action aaye toh switch statement ke default case ko kya return karna chahiye?"},options:[{en:"null",hi:"null"},{en:"The current unchanged state (return state;)",hi:"Current un-mutated state (return state;)"},{en:"undefined",hi:"undefined"},{en:"An empty array",hi:"Empty array"}],answerIndex:1,explanation:{en:"Returning the existing state ensures that unhandled actions do not corrupt or reset the component's state.",hi:"Existing state return karne se unhandled actions component ki state ko kharab ya reset nahi karte."}},{question:{en:"What is the core architectural purpose of useReducer Hook: Complex State Logic in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein useReducer Hook: Complex State Logic & Actions ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling usereducer hook: complex state logic with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath useReducer Hook: Complex State Logic & Actions ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"useReducer Hook: Complex State Logic establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"useReducer Hook: Complex State Logic & Actions clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does useReducer Hook: Complex State Logic directly resolve?",hi:"useReducer Hook: Complex State Logic & Actions kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without useReducer Hook: Complex State Logic, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"useReducer Hook: Complex State Logic & Actions ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about useReducer Hook: Complex State Logic, how is its mental model best conceptualized through real-world analogies?",hi:"useReducer Hook: Complex State Logic & Actions ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing useReducer Hook: Complex State Logic, what syntactic convention is essential to prevent runtime errors?",hi:"useReducer Hook: Complex State Logic & Actions ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with useReducer Hook: Complex State Logic?",hi:"useReducer Hook: Complex State Logic & Actions ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should useReducer Hook: Complex State Logic be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye useReducer Hook: Complex State Logic & Actions ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of useReducer Hook: Complex State Logic impact application memory and CPU consumption?",hi:"useReducer Hook: Complex State Logic & Actions ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within useReducer Hook: Complex State Logic?",hi:"useReducer Hook: Complex State Logic & Actions mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in useReducer Hook: Complex State Logic?",hi:"useReducer Hook: Complex State Logic & Actions mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in useReducer Hook: Complex State Logic?",hi:"useReducer Hook: Complex State Logic & Actions mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for useReducer Hook: Complex State Logic, what must the test suite assert?",hi:"useReducer Hook: Complex State Logic & Actions ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in useReducer Hook: Complex State Logic?",hi:"Modular design useReducer Hook: Complex State Logic & Actions mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should useReducer Hook: Complex State Logic be architected to support horizontal scaling?",hi:"Traffic 100x badhne par useReducer Hook: Complex State Logic & Actions ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does useReducer Hook: Complex State Logic properly belong and execute?",hi:"Full-stack MERN architecture mein useReducer Hook: Complex State Logic & Actions kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with useReducer Hook: Complex State Logic in production?",hi:"Production mein useReducer Hook: Complex State Logic & Actions ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for useReducer Hook: Complex State Logic?",hi:"useReducer Hook: Complex State Logic & Actions ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in useReducer Hook: Complex State Logic?",hi:"useReducer Hook: Complex State Logic & Actions mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}},{question:{en:"Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in useReducer Hook: Complex State Logic?",hi:"useReducer Hook: Complex State Logic & Actions mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"},options:[{en:"To prevent memory leaks where unreachable or orphaned objects remain retained in heap memory, causing gradual performance degradation and crashes",hi:"Memory leaks rokne ke liye taaki unneeded objects RAM mein jama na hon aur server crash na ho"},{en:"To delete the client's local disk partition",hi:"Client ka local disk partition delete karne ke liye"},{en:"Because JavaScript engines allow only 5 variables in RAM",hi:"JS engine sirf 5 variables allow karta hai"},{en:"Cleanup is unnecessary because garbage collection handles 100% of event listeners automatically",hi:"Cleanup ki zaroorat nahi hoti"}],correctAnswer:0,explanation:{en:"Unclosed connections and dangling event listeners create references that prevent garbage collection, leading to severe memory leaks over time.",hi:"Dangling listeners aur unclosed connections memory leaks banate hain jo V8 heap ko exhaust karke process crash kar dete hain."}}]};export{e as default};
