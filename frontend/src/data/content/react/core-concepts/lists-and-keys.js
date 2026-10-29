export default {
  id: "react-lists-keys",
  title: {
    en: "Lists, Keys & Reconciliation Optimization",
    hi: "Lists, Keys & Array Rendering Rules",
  },
  difficulty: "Beginner",
  readTime: 11,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. Rendering Lists in React with .map()",
        hi: "1. React Mein .map() Se Lists Render Karna Aur Keys Ka Niyam",
      },
      body: {
        en: `In React, you transform arrays of data into arrays of JSX elements using the standard JavaScript **\`Array.prototype.map()\`** method.

Whenever you render a dynamic list of elements, React requires that each item in the array possesses a special, unique **\`key\`** attribute:

\`\`\`jsx
const fruits = [
  { id: "f1", name: "Mango", price: 120 },
  { id: "f2", name: "Apple", price: 180 }
];

return (
  <ul>
    {fruits.map(fruit => (
      <li key={fruit.id}>
        {fruit.name} - ₹{fruit.price}
      </li>
    ))}
  </ul>
);
\`\`\`

### Why React Demands Keys:
Keys give elements a **stable identity** across re-renders. When a list changes (items are reordered, inserted at the top, or deleted), React uses keys to match existing elements in the previous Virtual DOM tree with elements in the new Virtual DOM tree.`,
        hi: `React mein data arrays ko JSX elements mein badalne ke liye standard JavaScript **\`Array.prototype.map()\`** method ka use kiya jata hai.

Jab bhi aap array ko render karte hain, React har item par ek unique **\`key\`** attribute lagana anivarya karta hai:

\`\`\`jsx
const fruits = [
  { id: "f1", name: "Aam", price: 120 },
  { id: "f2", name: "Seb", price: 180 }
];

return (
  <ul>
    {fruits.map(fruit => (
      <li key={fruit.id}>
        {fruit.name} - ₹{fruit.price}
      </li>
    ))}
  </ul>
);
\`\`\`

### Keys Ki Zaroorat Kyun Hai:
Keys har element ko ek **permanent pehchan (stable identity)** deti hain. Jab list mein koi item delete hota hai ya order change hota hai, toh React keys ki madad se samajh jata hai ki kaunsa element hilaya gaya hai aur kaunsa naya hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Why Array Index as Key is Dangerous",
        hi: "2. Array Index Ko Key Banana Khatarnak Kyun Hai?",
      },
      body: {
        en: `Many beginners write \`fruits.map((fruit, index) => <li key={index}>...</li>)\`.
While this eliminates the browser console warning, **using array indices as keys causes severe UI bugs** if the list can ever be filtered, sorted, or mutated!

### What Breaks When You Use Index as Key:
1. **Uncontrolled Input State Corruption**: If each list item contains an \`<input>\` or checkbox, deleting the first item causes the input values of item #1 to stick to item #2!
2. **Loss of CSS Animations / Transitions**: Reordering items won't animate smoothly because React thinks the element in position 0 never moved.
3. **Severe Performance Degradation**: Inserting an item at the beginning of a 10,000-item array changes the index of *every single subsequent element*, forcing React to discard and re-render all 10,000 DOM nodes!

### When is Array Index Acceptable?
Only when the list meets all 3 criteria:
1. The list is completely **static** (never reordered, filtered, or deleted).
2. Items in the list have **no unique ID** in the dataset.
3. Items contain **no internal state** (like form inputs or accordions).`,
        hi: `Bohot se beginners \`fruits.map((fruit, index) => <li key={index}>\` likh dete hain. Halanki isse warning band ho jaati hai, lekin **index ko key banana UI mein bhayankar bugs paida kar sakta hai** agar list filter, sort ya delete hoti ho!

### Index As Key Se Kya Kharab Hota Hai:
1. **Input State Corrupt Hona**: Agar list ke items mein checkboxes ya text inputs hain, aur aap pehla item delete karte hain, toh pehle item ka checkbox doosre item par chipak jata hai!
2. **CSS Animations Tootna**: Items ko sort karne par animation kaam nahi karti kyunki React sochta hai position 0 par wahi purana element hai.
3. **Slow Performance**: Shuru mein ek item insert karne se baki saare 10,000 items ka index badal jata hai, aur React ko poori list dobara re-render karni padti hai.

### Index Kab Chal Sakta Hai?
Sirf tab jab list static ho, kabhi sort/filter/delete na ho, aur usme koi input field na ho.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The School Assembly Line vs Roll Numbers",
        hi: "Real-Life Analogy: School Assembly Ki Line vs Student Roll Number",
      },
      body: {
        en: `Consider 50 students standing in the morning school assembly:

- **Using Array Index as Key (Line Position Number)**:
  - The teacher identifies students by their physical queue position: *"Position #1, Position #2, Position #3"*.
  - Student at Position #1 (Rahul) faints and is taken to the medical room.
  - Everyone steps forward. Now Aman stands at Position #1.
  - The teacher hands Rahul's customized medical certificate to whoever is currently standing at Position #1 (Aman)! A total disaster of mistaken identity (**State corruption bug**)!
- **Using Unique ID as Key (Student Roll Number)**:
  - Regardless of where students stand in the queue, Rohan is always Roll No. 42 and Aman is Roll No. 17.
  - Even if students reorder or sit down, the teacher hands reports to Roll Number 42 directly (**Fiber reconciliation matching elements by immutable key**)!`,
        hi: `School ki subah ki prayer assembly se samjhein:

- **Index Ko Key Banana (Line Mein Khade Hone Ka Number)**:
  - Teacher bacchon ko unke khade hone ke position number (Position 1, Position 2) se pehchanta hai.
  - Position 1 par khada Rahul paani peene chala jata hai. Line aage badhti hai aur Position 1 par Aman aa jata hai.
  - Teacher Position 1 par khade bacche ko Rahul ka punishment de deta hai (**State corruption bug**)!
- **Unique ID Ko Key Banana (Student Ka Roll Number)**:
  - Chahe baccha line mein aage khada ho ya piche, Aman ka Roll No 17 hai aur Rohan ka Roll No 42 hai.
  - Bacche chahe jitna marzi aapas mein line badal lein, teacher Roll No 17 ko hi uska report card deta hai (**Stable Key se sahi element match hona**)!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax & Placement Rules for Keys",
        hi: "Key Lagane Ka Sahi Syntax Aur Placement Niyam",
      },
      body: {
        en: `### 1. Key Must be Placed on the Outermost Element in .map():
\`\`\`jsx
// ✅ CORRECT: Key on the outermost returned wrapper
{products.map(product => (
  <div key={product.id} className="card">
    <h3>{product.title}</h3>
  </div>
))}

// ❌ WRONG: Key on nested child
{products.map(product => (
  <div className="card">
    <h3 key={product.id}>{product.title}</h3>
  </div>
))}
\`\`\`

### 2. Keys Are NOT Passed as Props:
React strips the \`key\` attribute for its internal reconciliation engine. You **cannot** read \`props.key\` inside child components!
If a child component needs the ID, pass it as a separate prop:
\`\`\`jsx
<UserCard key={user.id} id={user.id} name={user.name} />
\`\`\``,
        hi: `### 1. Key Hamesha Sabse Outer Element Par Lagti Hai:
\`\`\`jsx
// ✅ SAHI: .map() ke pehle parent element par key lagayein
{products.map(product => (
  <div key={product.id} className="card">
    <h3>{product.title}</h3>
  </div>
))}

// ❌ GALAT: Andar ke element par key lagana
{products.map(product => (
  <div className="card">
    <h3 key={product.id}>{product.title}</h3>
  </div>
))}
\`\`\`

### 2. \`key\` Prop Component Ke Andar Access Nahi Ho Sakta:
React \`key\` ko apne internal reconciliation ke liye use karta hai. Child component ke andar \`props.key\` hamesha \`undefined\` hota hai. Agar ID chahiye, toh alag prop bhejein: \`<Card key={u.id} id={u.id} />\`.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Basic List with Unique Identifiers",
        hi: "Example 1: Unique IDs Ke Sath Product List Render Karna",
      },
      body: {
        en: `Rendering a list of tech courses with unique string identifiers, calculating category badges and pricing.`,
        hi: `Tech courses ki array ko unique IDs ke sath clean table ya card format mein render karna.`,
      },
      code: {
        language: "jsx",
        filename: "CourseList.jsx",
        snippet: `import React from "react";

export default function CourseList() {
  const courses = [
    { id: "mern-101", title: "Complete MERN Stack Guide", instructor: "Aman", price: 2999 },
    { id: "react-201", title: "React 19 Deep Dive", instructor: "Pooja", price: 1999 },
    { id: "node-301", title: "Production Node.js Microservices", instructor: "Rohan", price: 2499 }
  ];

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md space-y-4">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
        Available Courses
      </h2>

      <div className="space-y-2">
        {courses.map(course => (
          // key prop is placed on the outermost element
          <div
            key={course.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 flex justify-between items-center"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {course.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Instructor: {course.instructor}
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              ₹{course.price.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Demonstrating the 'Index as Key' State Corruption Bug",
        hi: "Example 2: 'Index As Key' Se Input State Corrupt Hone Ka Live Proof",
      },
      body: {
        en: `Interactive demonstration showing how deleting the top row when using \`key={index}\` leaves the user's typed text in the wrong input box!`,
        hi: `Jab \`key={index}\` use hota hai, toh pehla item delete karne par user ka type kiya hua input text doosre item mein chipak jata hai.`,
      },
      code: {
        language: "jsx",
        filename: "IndexKeyBugDemo.jsx",
        snippet: `import React, { useState } from "react";

export default function IndexKeyBugDemo() {
  const [useIndexKey, setUseIndexKey] = useState(true);
  const [tasks, setTasks] = useState([
    { id: "task-101", title: "Task 1: Buy Groceries" },
    { id: "task-102", title: "Task 2: Clean Desk" },
    { id: "task-103", title: "Task 3: Read React Docs" }
  ]);

  const handleDeleteFirst = () => {
    // Deletes the very first item (Task 1)
    setTasks(prev => prev.slice(1));
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 dark:text-white">
          Key Strategy: {useIndexKey ? "❌ Index as Key" : "✅ Unique ID as Key"}
        </h3>
        <button
          onClick={() => setUseIndexKey(k => !k)}
          className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-semibold"
        >
          Toggle Strategy
        </button>
      </div>

      <p className="text-xs text-slate-500">
        1. Type a note into Task 1's input box.<br />
        2. Click "Delete First Task".<br />
        3. Notice how with Index as key, your note stays on the screen attached to Task 2!
      </p>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            // BUGGY: key={index} vs CORRECT: key={task.id}
            key={useIndexKey ? index : task.id}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex items-center gap-3"
          >
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-36 truncate">
              {task.title}
            </span>
            {/* Uncontrolled input maintains its own internal DOM state */}
            <input
              type="text"
              placeholder="Type notes here..."
              className="flex-1 px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleDeleteFirst}
        disabled={tasks.length === 0}
        className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition"
      >
        Delete First Task
      </button>
    </div>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Dynamic Sortable & Filterable Table with Keys",
        hi: "Example 3: Sortable Aur Filterable Table Mein Keys Ka Sahi Use",
      },
      body: {
        en: `A complete employee table supporting ascending/descending salary sort and department filtering without DOM thrashing.`,
        hi: `Salary sorting aur department filtering ke sath table jahan unique IDs smooth reconciliation maintain karti hain.`,
      },
      code: {
        language: "jsx",
        filename: "SortableEmployeeList.jsx",
        snippet: `import React, { useState } from "react";

const INITIAL_EMPLOYEES = [
  { id: "emp-01", name: "Anil Kumble", dept: "Engineering", salary: 95000 },
  { id: "emp-02", name: "Sunita Rao", dept: "Design", salary: 110000 },
  { id: "emp-03", name: "Vikram Das", dept: "Engineering", salary: 78000 },
  { id: "emp-04", name: "Pooja Hegde", dept: "Marketing", salary: 88000 }
];

export default function SortableEmployeeList() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [sortAsc, setSortAsc] = useState(true);

  const toggleSalarySort = () => {
    const sorted = [...employees].sort((a, b) =>
      sortAsc ? a.salary - b.salary : b.salary - a.salary
    );
    setEmployees(sorted);
    setSortAsc(prev => !prev);
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md max-w-lg space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-900 dark:text-white">
          Team Salaries ({employees.length})
        </h3>
        <button
          onClick={toggleSalarySort}
          className="text-xs px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-medium"
        >
          Sort by Salary ({sortAsc ? "Lowest First ↑" : "Highest First ↓"})
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {employees.map(emp => (
          <div
            key={emp.id} // Guaranteed unique immutable key
            className="py-3 flex justify-between items-center text-xs"
          >
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">{emp.name}</p>
              <p className="text-slate-400">{emp.dept}</p>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">
              ₹{emp.salary.toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
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
        en: `### 1. Generating Keys on the Fly: \`key={Math.random()}\` or \`key={Date.now()}\`
- **Mistake**: Generating random numbers inside \`.map()\`. Every single time the component re-renders, every element gets a brand-new random key!
- **Consequence**: React assumes all previous elements were destroyed and recreates the entire DOM tree from scratch on every single render, causing massive lag, lost input focus, and flicker!
- **Fix**: Keys must be **stable across renders**. Use existing database IDs or pre-generate UUIDs when items are created.

### 2. Duplicate Keys Among Siblings
- **Mistake**: Using non-unique fields like \`key={item.category}\`.
- **Consequence**: React logs console warnings and fails to match elements accurately during diffing.
- **Fix**: Keys must be unique among immediate sibling elements in the same array.

### 3. Placing the \`key\` on an Inner Child
- **Mistake**: \`<div className="outer"><span key={item.id}>...</span></div>\`.
- **Fix**: The \`key\` must always go on the top-level element returned directly by the \`.map()\` callback.`,
        hi: `### 1. Render Ke Waqt \`key={Math.random()}\` Generate Karna
- **Galati**: \`.map()\` ke andar random number key banana. Har re-render par har item ko nayi key mil jaati hai.
- **Nuksan**: React purane saare DOM nodes destroy karke dobara banata hai jisse screen flicker hoti hai aur input focus gayab ho jata hai!
- **Solution**: Keys hamesha stable honi chahiye jo render hone par na badlein (jaise database \`_id\`).

### 2. Duplicate Keys Lagana
- **Galati**: Non-unique field jaise \`key={item.category}\` lagana.
- **Nuksan**: React console warning deta hai aur reconciliation fail ho jaati hai.
- **Solution**: Sibling elements ke beech har key unique honi chahiye.

### 3. Andar Ke Child Par Key Lagana
- **Galati**: \`<div><h1 key={id}>...</h1></div>\` likhna.
- **Solution**: Key hamesha \`.map()\` ke sabse pehle (outermost) tag par lagti hai.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Key Selection Rules",
        hi: "Keys Chunte Waqt Ke Best Practices",
      },
      body: {
        en: `1. **Use Database IDs as Primary Keys**: MongoDB \`_id\`, SQL \`id\`, or pre-assigned UUIDs are the gold standard for keys.
2. **If No ID Exists, Generate Once on Ingestion**: If parsing external CSV or API data lacking IDs, generate a UUID using \`crypto.randomUUID()\` *at the moment of data receipt*, not during rendering!
3. **Keep Keys Stable**: A key should not change over time unless the underlying identity of the entity changes.
4. **Keys Only Need to be Unique Among Siblings**: Keys do not need to be globally unique across the entire application; they only need to be unique among sibling elements in that specific array.`,
        hi: `1. **Database \`_id\` Best Choice Hai**: MongoDB ka \`_id\` ya SQL ka primary key sabse best key hota hai.
2. **ID Na Ho Toh Data Aate Waqt UUID Banayein**: Render time par \`Math.random\` lagane ke bajaye data receive hone par ek baar \`crypto.randomUUID()\` generate karke item mein jod dein.
3. **Keys Stable Honi Chahiye**: Kisi item ki key time ke sath badalni nahi chahiye.
4. **Sirf Siblings Mein Unique Hona Zaroori Hai**: Poori website mein globally unique hona zaroori nahi, sirf us specific array ke siblings mein unique hona chahiye.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Top Interview Sawaal Aur Jawab",
      },
      body: {
        en: `### Q1: What is the primary purpose of the 'key' prop in React lists?
**Answer**:
The \`key\` prop gives React elements a stable identity across renders. During the Fiber reconciliation diffing phase, React uses the key to determine whether an item was moved, retained, inserted, or removed. This allows React to preserve component internal state (like input values or focus) and perform minimal targeted DOM mutations rather than re-creating the entire list from scratch.

### Q2: Why is using the array index as a key considered an anti-pattern?
**Answer**:
Because an array index represents the *position in the array*, not the *identity of the item*. If the array is filtered, reversed, sorted, or an item is prepended at the top, the indices of existing items change. React will incorrectly associate previous component state and uncontrolled DOM inputs with different data items, causing data corruption and breaking transitions.

### Q3: Why does React warn against key={Math.random()}?
**Answer**:
Because \`Math.random()\` produces a different key on every single render. React sees every element as brand new, unmounts the entire previous DOM subtree, destroys all internal state and DOM focus, and remounts new DOM nodes from scratch, causing severe performance degradation and visual flickering.`,
        hi: `### Q1: React lists mein 'key' prop ka kya purpose hota hai?
**Jawab**:
'key' prop elements ko ek stable identity deta hai. Fiber reconciliation ke dauran React key dekh kar pehchanta hai ki kaunsa item delete hua, kaunsa naya aaya, ya kiska order badla. Isse unnecessary DOM updates nahi hote aur inputs ka state surakshit rehta hai.

### Q2: Array index ko key banana anti-pattern kyun hai?
**Jawab**:
Kyunki index item ka position batata hai, identity nahi. List filter ya sort hone par items ke index badal jaate hain. React purane input state ko naye item se jod deta hai jisse form inputs corrupt ho jaate hain.

### Q3: \`key={Math.random()}\` lagane se kya nuksan hota hai?
**Jawab**:
Har render par nayi key banne se React purane saare elements ko unmount karke naye nodes banata hai. Isse performance bohot slow ho jaati hai aur screen par flicker aane lagta hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Lists & Keys",
        hi: "Quick Summary: Lists & Keys",
      },
      body: {
        en: `- **Use .map()**: Standard approach to transform data arrays into JSX element arrays.
- **Keys Provide Stable Identity**: Powers React Fiber reconciliation and state preservation.
- **Avoid Array Index as Key**: Causes input state corruption during reordering or deletion.
- **Never Use Math.random()**: Generates unstable keys, destroying and remounting the DOM tree every render.
- **Place on Outermost Element**: The key belongs on the direct parent tag returned inside \`.map()\`.`,
        hi: `- **.map() Ka Use**: Data array ko JSX array mein convert karta hai.
- **Keys Stable Identity Deti Hain**: Fiber reconciliation ko fast aur accurate banata hai.
- **Index Ko Key Na Banayein**: Sort ya delete hone par state corrupt ho sakti hai.
- **Math.random() Se Bachein**: Har render par nayi key banne se DOM baar-baar destroy hota hai.
- **Outermost Element Par Lagayein**: .map() ke pehle parent tag par key lagti hai.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "What severe bug occurs when using array index as key in a list with editable input fields after deleting the first item?",
      "hi": "Jab list mein input fields hon aur key={index} use ho, toh pehla item delete karne par kaunsa bug aata hai?"
    },
    "options": [
      {
        "en": "React crashes with an OutOfMemory exception",
        "hi": "React crash ho jata hai"
      },
      {
        "en": "The typed input value from the deleted item remains on the screen attached to the new first item",
        "hi": "Delete hue item ka typed input text screen par reh kar naye pehle item par chipak jata hai"
      },
      {
        "en": "All list items are duplicated twice",
        "hi": "Saare items duplicate ho jaate hain"
      },
      {
        "en": "The browser reloads immediately",
        "hi": "Browser reload ho jata hai"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Because the new first item now has index 0 (matching the previous key 0), React reuses the old DOM node and retains its internal uncontrolled input state.",
      "hi": "Kyunki naye item ka index bhi 0 ho jata hai, React purana DOM node reuse karta hai aur purana typed text wahin reh jata hai."
    }
  },
  {
    "q": {
      "en": "What happens if you generate keys using key={Math.random()} inside .map()?",
      "hi": "Agar aap .map() ke andar key={Math.random()} use karein toh kya hoga?"
    },
    "options": [
      {
        "en": "React encrypts the list items with SSL",
        "hi": "Items encrypt ho jayenge"
      },
      {
        "en": "Every re-render produces brand new keys, forcing React to destroy and recreate the entire DOM tree on every tick",
        "hi": "Har re-render par nayi keys banti hain jisse React har baar poora DOM tree destroy karke dobara banata hai"
      },
      {
        "en": "The list automatically sorts randomly",
        "hi": "List randomly sort ho jaati hai"
      },
      {
        "en": "Nothing, it is recommended for all production lists",
        "hi": "Kuch nahi hota"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Random keys change on every render, defeating reconciliation and forcing React to trash and recreate all DOM elements from scratch.",
      "hi": "Har render par nayi key aane se React samajhta hai saare elements naye hain aur poora DOM dobara banata hai jisse lag aur flicker hota hai."
    }
  },
  {
    "q": {
      "en": "Can a child component read its own key value using props.key?",
      "hi": "Kya koi child component props.key se apni key value ko read kar sakta hai?"
    },
    "options": [
      {
        "en": "Yes, props.key contains the string key",
        "hi": "Haan, props.key mein value hoti hai"
      },
      {
        "en": "No, React reserves 'key' for internal reconciliation and strips it from the props object (evaluates to undefined)",
        "hi": "Nahi, React 'key' ko internal use ke liye reserve rakhta hai aur props se strip kar deta hai (undefined milta hai)"
      },
      {
        "en": "Only in production builds",
        "hi": "Sirf production mein"
      },
      {
        "en": "Only if the component is a class component",
        "hi": "Sirf class components mein"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "React reserves 'key' and 'ref'. They are not passed down as props to the component. Pass a separate prop like id={item.id} if needed.",
      "hi": "React 'key' ko props mein pass nahi karta; yeh undefined hota hai. ID chahiye toh alag prop (jaise id={item.id}) bhejein."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Lists, Keys & Reconciliation Optimization in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Lists, Keys & Array Rendering Rules ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling lists, keys & reconciliation optimization with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Lists, Keys & Array Rendering Rules ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Lists, Keys & Reconciliation Optimization establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Lists, Keys & Array Rendering Rules clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Lists, Keys & Reconciliation Optimization directly resolve?",
      "hi": "Lists, Keys & Array Rendering Rules kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Lists, Keys & Reconciliation Optimization, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Lists, Keys & Array Rendering Rules ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Lists, Keys & Reconciliation Optimization, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Lists, Keys & Array Rendering Rules ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Lists, Keys & Reconciliation Optimization, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Lists, Keys & Array Rendering Rules ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Lists, Keys & Reconciliation Optimization?",
      "hi": "Lists, Keys & Array Rendering Rules ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Lists, Keys & Reconciliation Optimization be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Lists, Keys & Array Rendering Rules ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Lists, Keys & Reconciliation Optimization impact application memory and CPU consumption?",
      "hi": "Lists, Keys & Array Rendering Rules ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Lists, Keys & Reconciliation Optimization?",
      "hi": "Lists, Keys & Array Rendering Rules mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Lists, Keys & Reconciliation Optimization?",
      "hi": "Lists, Keys & Array Rendering Rules mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Lists, Keys & Reconciliation Optimization?",
      "hi": "Lists, Keys & Array Rendering Rules mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Lists, Keys & Reconciliation Optimization, what must the test suite assert?",
      "hi": "Lists, Keys & Array Rendering Rules ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Lists, Keys & Reconciliation Optimization?",
      "hi": "Modular design Lists, Keys & Array Rendering Rules mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Lists, Keys & Reconciliation Optimization be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Lists, Keys & Array Rendering Rules ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Lists, Keys & Reconciliation Optimization properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Lists, Keys & Array Rendering Rules kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Lists, Keys & Reconciliation Optimization in production?",
      "hi": "Production mein Lists, Keys & Array Rendering Rules ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Lists, Keys & Reconciliation Optimization?",
      "hi": "Lists, Keys & Array Rendering Rules ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Lists, Keys & Reconciliation Optimization?",
      "hi": "Lists, Keys & Array Rendering Rules mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Lists, Keys & Reconciliation Optimization?",
      "hi": "Lists, Keys & Array Rendering Rules mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
