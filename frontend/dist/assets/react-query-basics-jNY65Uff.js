const e={id:"react-tanstack-query",title:{en:"Server State with React Query (TanStack Query)",hi:"React Query (TanStack Query): Server State & Caching"},difficulty:"Advanced",readTime:13,sections:[{type:"concept",heading:{en:"1. The Server State vs Client State Paradigm",hi:"1. Server State vs Client State Ka Antar"},body:{en:`In modern full-stack web applications, state can be clearly divided into two distinct categories:

### Client State
- **Examples**: Dark mode toggle, sidebar collapsed/expanded, multi-step modal step number, draft text in a form input.
- **Characteristics**: Owned completely by the browser, synchronous to read/write, always up-to-date, disappears on page reload (unless saved to localStorage).
- **Best Tool**: React \`useState\`, \`useReducer\`, or Context API.

### Server State
- **Examples**: Product listings, user profiles, shopping cart items saved in MongoDB, real-time comments.
- **Characteristics**: Resides remotely in your database, asynchronous to fetch, shared by multiple concurrent users, can become **stale** (outdated) without you knowing.
- **The Problem with \`useEffect\` + \`useState\`**:
  \`\`\`javascript
  // The classic boilerplate nightmare
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);
  \`\`\`
  This manual approach lacks caching, duplicate request deduplication, background synchronization, automatic retry on network disconnects, pagination caching, and garbage collection.

### What is TanStack Query (React Query)?
**TanStack Query** is the industry-standard data-fetching and server-state management library for React. It completely eliminates manual loading/error states and manages caching, background polling, request deduping, and stale data invalidation out of the box.`,hi:"Modern web development mein state do bilkul alag tarah ki hoti hai:\n\n### 1. Client State\n- **Examples**: Dark mode on/off, sidebar open ya close, popup modal, form ka input draft.\n- **Characteristics**: Yeh sirf browser ke andar rehti hai, synchronous hoti hai, aur page refresh karne par gayab ho sakti hai.\n- **Best Tool**: React ka `useState` ya `Context API`.\n\n### 2. Server State\n- **Examples**: MongoDB database mein stored products, user orders, notifications, real-time comments.\n- **Characteristics**: Yeh remote server/database par rehti hai, async hoti hai, aur doosre users ke update karne par turant **stale** (purani) ho sakti hai.\n- **useEffect + useState Ki Musibat**:\n  Har component mein `loading`, `error`, aur `data` ki 3 alag-alag states banana padta hai. Jab user page badalta hai toh har baar naya network call lagta hai, koi caching nahi hoti, aur slow internet par app freeze ho jati hai.\n\n### TanStack Query (React Query) Kya Karta Hai?\nTanStack Query server state ko fetch aur cache karne ka sabse powerful library hai. Yeh aapko `useQuery` aur `useMutation` jaise declarative hooks deta hai jo caching, background synchronization, automatic retries, aur request deduplication automatically sambhal lete hain."}},{type:"concept",heading:{en:"2. The Stale-While-Revalidate Caching Mechanism",hi:"2. Stale-While-Revalidate Caching Strategy Kaise Kaam Karti Hai?"},body:{en:'TanStack Query uses the powerful **Stale-While-Revalidate (SWR)** caching algorithm:\n\n1. **Instant UI (Cache First)**: When a component mounts, React Query immediately renders whatever data is already cached in memory—**zero loading spinner delay** for returning users!\n2. **Background Fetch (Revalidate)**: At the exact same time, it silently fires a network request in the background to check if the server has newer data.\n3. **Seamless Update**: Once the server responds, React Query smoothly updates the UI in-place only if the remote data has changed.\n\n### Two Critical Timers: `staleTime` vs `gcTime`\n- `staleTime` (default: `0` ms): How long fetched data is considered "fresh". While fresh, React Query will **not** refetch in the background. If set to `1000 * 60 * 5` (5 minutes), the query will never make network calls within those 5 minutes!\n- `gcTime` (Garbage Collection Time, formerly `cacheTime`, default: 5 minutes): How long inactive query data stays stored in browser RAM after all components using it have unmounted.',hi:'TanStack Query **Stale-While-Revalidate** strategy follow karta hai:\n\n1. **Instant UI**: Jab user kisi page par wapas aata hai, toh React Query loading spinner dikhane ke bajaye memory mein rakha purana cache data turant screen par render kar deta hai.\n2. **Silent Background Check**: Usi samay background mein chupke se server par request bhejta hai taaki check kare ki kya database mein koi naya change hua hai.\n3. **Smooth Update**: Jaise hi server se naya response aata hai, bina screen hilaye data update ho jata hai.\n\n### Do Sabse Zaroori Concepts: `staleTime` vs `gcTime`\n- `staleTime` (Default: 0): Data kitni der tak "taaza" (fresh) maana jayega. Jab tak data fresh hai, background refetch nahi hoga.\n- `gcTime` (Garbage Collection Time, pehle `cacheTime`, Default: 5 minute): Jab component screen se unmount ho jaye, toh uska cache data RAM mein kitni der tak bacha rahega.'}},{type:"analogy",heading:{en:"Real-Life Analogy: Swiggy Live Food Tracker vs Calling the Restaurant",hi:"Real-Life Analogy: Swiggy Par Order Status vs Restaurant Ko Baar-Baar Call Karna"},body:{en:`Think of ordering food on Swiggy or Zomato in India:

- **The Old \`useEffect\` Way (Calling the Owner Every 10 Seconds)**:
  Imagine calling the dhaba owner on mobile every 10 seconds: *"Bhaiya naan lag gayi kya? Rider kahan pahuncha?"* The restaurant owner gets irritated, your phone bill explodes, and if the network disconnects for 2 seconds, your call drops and you have no idea what happened.
- **The TanStack Query Way (Smart Swiggy App)**:
  1. **Instant Cache**: When you reopen the Swiggy app, it instantly shows the last known stage (*"Food is being prepared"*). You don't stare at a blank white screen.
  2. **Background Polling & Window Focus**: When you switch back to Swiggy from WhatsApp, the app silently pings the backend and smoothly updates the delivery boy's scooter marker on Google Maps.
  3. **Auto Retry**: If your phone goes through an underground metro tunnel and loses internet, Swiggy doesn't crash—it automatically retries 3 times until 4G/5G signals return.
  4. **Mutations & Cache Invalidation**: When you tap *"Add Extra Cutlery"*, Swiggy fires a mutation, marks the current order details as invalid, and immediately refetches the new bill amount.`,hi:`Swiggy ya Zomato se khana order karne ka example dekhein:

- **Purana Tareeqa (Har 10 Second Mein Dhaba Wale Ko Phone Ghumana)**:
  Socho aap har 15 second mein restaurant wale ko call kar rahe ho: *"Bhaiya biryani pack hui? Rider nikla kya?"* Dhaba wala pareshan, aapka balance khatam, aur phone cut hote hi blank ho jao!
- **React Query Ka Smart Swiggy Model**:
  1. **Instant Cache Screen**: Jaise hi aap Swiggy open karte ho, pichla status turant dikhta hai (*"Food being prepared"*). Blank screen par wait nahi karna padta.
  2. **Refetch on Window Focus**: Jaise hi aap WhatsApp band karke wapas Swiggy app kholte ho, wo silently background mein rider ki nayi location update kar deta hai.
  3. **Auto Retry on Network Failure**: Lift ya basement mein signal cut ho jaye toh React Query 3 baar retry karta hai jab tak network wapas na aa jaye.
  4. **Mutations & Invalidation**: Jab aap *"Cancel Item"* karte ho, toh wo purana cache discard karke turant naya bill fetch kar leta hai.`}},{type:"syntax",heading:{en:"Syntax & Core Hooks: useQuery & useMutation",hi:"Syntax Aur Core Hooks: useQuery Aur useMutation"},body:{en:`Setting up TanStack Query in your React app:

\`\`\`bash
npm install @tanstack/react-query
# Optional official DevTools
npm install @tanstack/react-query-devtools
\`\`\`

### 1. Configure QueryClientProvider
\`\`\`jsx
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes before considering data stale
      retry: 2, // Retry failed queries twice before giving up
      refetchOnWindowFocus: true, // Refresh data when user focuses the tab
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
\`\`\`

### 2. useQuery Syntax (For GET requests)
\`\`\`javascript
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['todos', filterCategory], // Unique cache key array
  queryFn: async () => {
    const res = await fetch(\`/api/todos?category=\${filterCategory}\`);
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  },
  staleTime: 1000 * 60 * 5, // Fresh for 5 minutes
});
\`\`\`

### 3. useMutation Syntax (For POST / PUT / DELETE)
\`\`\`javascript
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (newTodo) => {
    return fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
  },
  onSuccess: () => {
    // Invalidate and refetch todos query to update UI automatically
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
\`\`\``,hi:"TanStack Query setup karne ka simple tareeqa:\n1. Top-level `main.jsx` mein `QueryClient` banakar `<QueryClientProvider>` lagayein.\n2. GET requests ke liye `useQuery` use karein jisme `queryKey` aur `queryFn` pass hota hai.\n3. POST/PUT/DELETE requests ke liye `useMutation` use karein aur success hone par `queryClient.invalidateQueries()` se cache refresh karein."}},{type:"example",heading:{en:"Example 1: Basic Data Fetching with Loading, Error & Success States",hi:"Example 1: Basic Data Fetching With useQuery"},body:{en:`This example shows how clean data fetching becomes with \`useQuery\`. Notice there is zero \`useEffect\` or \`useState\` boilerplate!

\`\`\`jsx
// src/components/UserList.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// Pure fetcher function
async function fetchUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) {
    throw new Error('Failed to fetch user list from API');
  }
  return res.json();
}

export function UserList() {
  const { data: users, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 30, // Fresh for 30 seconds
  });

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <p>Loading users... ⏳</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h4>Error loading data!</h4>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>User Directory ({users.length} members)</h3>
        <button onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? 'Refreshing...' : '🔄 Manual Refresh'}
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{ padding: '10px', borderBottom: '1px solid #eee' }}
          >
            <strong>{user.name}</strong> — {user.email} ({user.company?.name})
          </li>
        ))}
      </ul>
    </div>
  );
}
\`\`\``,hi:"Iss example mein dekhein:\n- Na koi `useState` banani padi na koi `useEffect`.\n- `isLoading`: First time data aane tak true rehta hai.\n- `isFetching`: Background mein silently refetch hone par true hota hai.\n- `refetch()`: User manual button click karke instant fresh data mangwa sakta hai."}},{type:"example",heading:{en:"Example 2: Parameterized Queries with Dynamic Filtering",hi:"Example 2: Dynamic Parameters Ke Saath Queries (Category Filter)"},body:{en:`When queries depend on variables (like category, search term, or pagination page), include those variables inside the \`queryKey\` array. React Query automatically refetches whenever the key changes!

\`\`\`jsx
// src/components/ProductCatalog.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

async function fetchProductsByCategory(category) {
  const url = category === 'all'
    ? 'https://dummyjson.com/products?limit=6'
    : \`https://dummyjson.com/products/category/\${category}?limit=6\`;
    
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error fetching products');
  const data = await res.json();
  return data.products;
}

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Any time selectedCategory changes, React Query detects queryKey change and fetches
  const { data: products, isLoading, isFetching } = useQuery({
    queryKey: ['products', selectedCategory], // Dependency array for cache key!
    queryFn: () => fetchProductsByCategory(selectedCategory),
    staleTime: 1000 * 60 * 3, // Cache each category for 3 minutes
  });

  const categories = ['all', 'beauty', 'fragrances', 'furniture', 'groceries'];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Products Explorer</h2>

      {/* Category selector pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 12px',
              backgroundColor: selectedCategory === cat ? '#0070f3' : '#f0f0f0',
              color: selectedCategory === cat ? '#fff' : '#000',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {isFetching && <p style={{ color: '#0070f3' }}>Fetching latest updates... ⚡</p>}

      {isLoading ? (
        <p>Loading products... ⏳</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {products?.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '12px', borderRadius: '8px' }}>
              <img src={item.thumbnail} alt={item.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h4>{item.title}</h4>
              <p style={{ fontWeight: 'bold' }}>\${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
\`\`\``,hi:`Jab query kisi filter ya page number par depend karti hai:
- \`queryKey: ['products', selectedCategory]\` likhein.
- Jaise hi user category button click karta hai, React Query automatically pehchanta hai ki key badal gayi hai.
- Agar user pehle se visited category par wapas click karta hai, toh React Query bina kisi delay ke cached data dikha deta hai!`}},{type:"example",heading:{en:"Example 3: Real-World useMutation with Cache Invalidation & Feedback",hi:"Example 3: Real-World useMutation Aur Automatic Cache Invalidation"},body:{en:`This example demonstrates mutating data (creating a new item via POST request) and immediately invalidating the cache using \`queryClient.invalidateQueries()\` so the list re-renders with the newly added item.

\`\`\`jsx
// src/components/TodoManager.jsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock API functions
async function getTodos() {
  const res = await fetch('/api/todos');
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

async function createTodo(title) {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!res.ok) throw new Error('Failed to save todo on server');
  return res.json();
}

export function TodoManager() {
  const [newTitle, setNewTitle] = useState('');
  const queryClient = useQueryClient();

  // 1. Fetch Todos Query
  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  // 2. Add Todo Mutation
  const addMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      // Clear input box
      setNewTitle('');
      // Invalidate 'todos' query to trigger instant background refetch!
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (err) => {
      alert(\`Could not save todo: \${err.message}\`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addMutation.mutate(newTitle);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '16px', border: '1px solid #ccc' }}>
      <h3>Task Manager</h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What needs to be done?"
          disabled={addMutation.isPending}
        />
        <button type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id || todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
\`\`\``,hi:"Yeh `useMutation` ka practical workflow hai:\n1. User form submit karta hai: `addMutation.mutate(newTitle)` call hota hai.\n2. `addMutation.isPending` se submit button disable ho jata hai taaki double click na ho.\n3. Server par save hote hi `onSuccess` trigger hota hai.\n4. `queryClient.invalidateQueries({ queryKey: ['todos'] })` purane cache ko stale mark karta hai aur turant naya data fetch karke screen par naya task show kar deta hai."}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Common Mistakes Aur Unke Fixes"},body:{en:"### 1. Passing a Plain String as queryKey Instead of an Array\n- **Mistake**: Writing `queryKey: 'users'` (supported in ancient v3, but causes errors in v4/v5).\n- **Fix**: Always pass an array: `queryKey: ['users']` or `queryKey: ['users', userId]`.\n\n### 2. Invoking the Fetch Function Immediately in queryFn\n- **Mistake**: Writing `queryFn: fetchUsers()` with parentheses.\n- **Why it breaks**: This invokes the function during render cycle instead of letting React Query control when to execute it!\n- **Fix**: Pass the function reference `queryFn: fetchUsers` or an arrow function `queryFn: () => fetchUsers(id)`.\n\n### 3. Forgetting Query Dependencies in the Key\n- **Mistake**: Writing `queryKey: ['user']` inside a component that takes an `userId` prop.\n- **Why it breaks**: When the user navigates from User 1 to User 2, React Query thinks the cache key hasn't changed and continues displaying User 1's cached details!\n- **Fix**: Include all variables used in `queryFn` inside the key array: `queryKey: ['user', userId]`.\n\n### 4. Confusing staleTime with gcTime (cacheTime)\n- **Mistake**: Setting `gcTime: 0` thinking it stops background refetching.\n- **Fix**: To prevent background refetches, increase `staleTime: Infinity` or `staleTime: 1000 * 60 * 10`. `gcTime` only dictates when unused memory is cleared.",hi:"### 1. queryKey Mein String Pass Karna Array Ke Badle\n- **Galti**: `queryKey: 'users'` likhna.\n- **Fix**: TanStack Query v4/v5 mein hamesha array format zaroori hai: `queryKey: ['users']`.\n\n### 2. queryFn Ko Turant Invoke Kar Dena\n- **Galti**: `queryFn: fetchUsers()` likh dena.\n- **Nuksan**: Function render hone ke waqt turant execute ho jata hai.\n- **Fix**: Hamesha reference pass karein `queryFn: fetchUsers` ya callback `queryFn: () => fetchUsers(id)`.\n\n### 3. queryKey Mein Dependencies Bhool Jana\n- **Galti**: `userId` change ho raha hai lekin key sirf `['user']` rakhi hai.\n- **Nuksan**: User 2 ke profile par bhi User 1 ka data dikhta rahega.\n- **Fix**: Hamesha dynamic values array mein include karein: `queryKey: ['user', userId]`."}},{type:"tip",heading:{en:"Best Practices: Custom Hook Factories & Centralized Query Keys",hi:"Best Practices: Custom Hooks Aur Centralized Query Keys"},body:{en:"1. **Centralize Query Keys**: Avoid typos by defining a centralized query key factory object:\n   ```javascript\n   export const userKeys = {\n     all: ['users'],\n     detail: (id) => ['users', id],\n     posts: (id) => ['users', id, 'posts'],\n   };\n   ```\n2. **Encapsulate in Custom Hooks**: Don't call `useQuery` directly in UI components. Wrap them in custom hooks (`useUser(id)`, `useUpdateUser()`) so your UI remains clean and decoupled from data-fetching implementations.\n3. **Use Optimistic Updates for Fast UI**: For social media likes or toggling checkboxes, update the local cache immediately before the network request finishes using `onMutate`, and roll back in `onError` if the request fails.\n4. **Leverage React Query DevTools**: Always install and inspect query states (`fresh`, `fetching`, `stale`, `inactive`) visually using `<ReactQueryDevtools />` during development.",hi:"1. **Query Key Factory Pattern**: Spelling errors se bachne ke liye query keys ko ek object factory mein define karein (`userKeys.detail(id)`).\n2. **Custom Hook Wrappers**: `useQuery` ko direct UI mein likhne ke bajaye `useUser(id)` ya `useProducts()` jaise custom hooks mein wrap karein.\n3. **Optimistic Updates**: Like button ya task complete checkbox ke liye pehle UI turant update kar dein (`onMutate`), aur agar server fail ho toh rollback kar dein.\n4. **React Query DevTools**: Development ke waqt DevTools se inspect karein ki kaunsi query kab stale ho rahi hai aur kab garbage collect ho rahi hai."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:`### Q1: What is the fundamental difference between staleTime and gcTime?
**Answer**:
- **staleTime**: The duration until fetched data is considered out-of-date. While data is "fresh" (within \`staleTime\`), React Query will read directly from the cache and **will not** trigger background network requests.
- **gcTime (Garbage Collection Time)**: The duration unused/inactive query data remains stored in the browser's memory after its host component has unmounted. When this timer expires, the memory is purged.

### Q2: Why should we use React Query instead of Redux for server data?
**Answer**:
Redux is a general-purpose client state container. To handle server data in Redux, developers must manually write loading states, error reducers, normalized caches, refetch timers, and pagination logic. React Query is purpose-built specifically for server state: it provides caching, de-duplication, background syncing, stale detection, window-focus refetching, and pagination out of the box with zero boilerplate.

### Q3: What happens when the user switches tabs and returns to the app?
**Answer**: By default, React Query has \`refetchOnWindowFocus: true\`. When the browser window regains focus, React Query checks if the active queries on screen are marked as **stale**. If stale, it silently performs a background network request and updates the screen without showing a full-page loading spinner.

### Q4: How do you trigger manual cache invalidation after an update?
**Answer**: By calling \`queryClient.invalidateQueries({ queryKey: ['resourceName'] })\`. This marks any matching queries as stale and immediately refetches any queries currently being rendered on screen.`,hi:`### Q1: staleTime aur gcTime mein kya farq hai?
**Jawab**:
- **staleTime**: Yeh tay karta hai ki data kitne time tak "fresh" mana jayega. Jab tak data fresh hai, React Query background mein network call nahi karega.
- **gcTime**: Yeh tay karta hai ki jab component screen se hat jaye, toh uska cache browser ki memory mein kitni der tak zinda rahega garbage collect hone se pehle.

### Q2: Redux ke badle React Query server data ke liye kyun prefer kiya jata hai?
**Jawab**: Redux general-purpose client state tool hai jisme loading, error, caching aur retries haath se likhne padte hain. React Query server state ke liye specially designed hai jo caching, automatic retries aur background sync bina kisi extra code ke handle karta hai.

### Q3: Window focus refetch kya hota hai?
**Jawab**: Jab user kisi doosre browser tab ya app par jaakar wapas aapki web app par aata hai, toh React Query automatically stale data ko background mein re-check karke latest data screen par show kar deta hai.`}},{type:"summary",heading:{en:"Quick Summary: TanStack Query Essentials",hi:"Quick Summary: TanStack Query Cheatsheet"},body:{en:"- **Server State vs Client State**: Separate remote database data from local UI toggles.\n- **useQuery**: For GET requests; accepts an array `queryKey` and an async `queryFn`.\n- **useMutation**: For POST/PUT/DELETE requests; executes via `mutation.mutate(payload)`.\n- **staleTime**: Dictates how long data remains fresh before background refetching is permitted.\n- **gcTime**: Dictates how long inactive data remains preserved in RAM before deletion.\n- **queryClient.invalidateQueries()**: The standard way to purge stale cache and refresh lists after mutations.\n- **Zero Boilerplate**: Completely replaces manual `useState` + `useEffect` loading/error code patterns.",hi:"- **Server State vs Client State**: Local UI data aur remote database data ko alag treat karein.\n- **useQuery**: Data fetch karne ke liye; `queryKey` array aur `queryFn` function leta hai.\n- **useMutation**: Data create ya update karne ke liye; `mutate()` method se trigger hota hai.\n- **staleTime**: Data ke taaza rehne ka time period.\n- **gcTime**: Inactive cache ko memory mein rakhne ka duration.\n- **invalidateQueries**: Mutation success hone par purane cache ko refresh karne ka tareeqa.\n- **Boilerplate Free**: Har jagah manual `useEffect` aur `loading` state likhne se aazadi deta hai."}}],quiz:[{question:{en:"What is the primary role of TanStack Query (React Query) in a React application?",hi:"React application mein TanStack Query (React Query) ka primary role kya hai?"},options:[{en:"To style components using CSS utility classes",hi:"CSS utility classes se components design karna"},{en:"To manage, cache, and synchronize asynchronous server state",hi:"Asynchronous server state ko manage, cache aur synchronize karna"},{en:"To handle client-side URL routing",hi:"Client-side URL routing manage karna"},{en:"To compile JSX into browser-compatible JavaScript",hi:"JSX ko browser-compatible JavaScript mein compile karna"}],correctAnswer:1,explanation:{en:"TanStack Query is dedicated to fetching, caching, synchronizing, and updating server state in web applications.",hi:"TanStack Query server state ko fetch karne, cache karne aur background mein sync rakhne ke liye banaya gaya hai."}},{question:{en:"What must queryKey always be formatted as in TanStack Query v4 and v5?",hi:"TanStack Query v4 aur v5 mein queryKey hamesha kis format mein honi chahiye?"},options:[{en:"A plain string",hi:"Ek plain string"},{en:"An Array (e.g., ['todos', category])",hi:"Ek Array (jaise ['todos', category])"},{en:"A RegExp pattern",hi:"Ek RegExp pattern"},{en:"A Number ID",hi:"Ek Number ID"}],correctAnswer:1,explanation:{en:"In modern TanStack Query versions, queryKey must strictly be an array containing strings and any variable dependencies.",hi:"Modern TanStack Query mein queryKey hamesha ek array format mein honi chahiye jisme strings aur dependency variables hote hain."}},{question:{en:"What happens when staleTime is reached for an active query?",hi:"Jab kisi active query ka staleTime complete ho jata hai, tab kya hota hai?"},options:[{en:"The data is deleted from memory immediately",hi:"Data turant memory se delete ho jata hai"},{en:"The query is marked as stale and will revalidate on the next trigger (e.g. window focus or remount)",hi:"Query stale mark ho jaati hai aur agle trigger (jaise window focus ya remount) par background refetch hoti hai"},{en:"The screen crashes with an unhandled exception",hi:"Screen crash ho jaati hai"},{en:"React displays a red error boundary",hi:"React red error boundary dikha deta hai"}],correctAnswer:1,explanation:{en:"When staleTime expires, data is not deleted; it is simply marked as stale so the next component mount or window focus initiates a background revalidation.",hi:"staleTime khatam hone par data delete nahi hota, bas stale mark ho jata hai taaki agle trigger par background mein fresh data mangwaya ja sake."}},{question:{en:"Which method is commonly invoked in a mutation's onSuccess callback to refresh related queries?",hi:"Mutation success hone par related queries ko refresh karne ke liye kaunsa method call kiya jata hai?"},options:[{en:"queryClient.invalidateQueries()",hi:"queryClient.invalidateQueries()"},{en:"queryClient.clearStore()",hi:"queryClient.clearStore()"},{en:"queryClient.resetState()",hi:"queryClient.resetState()"},{en:"queryClient.deleteCache()",hi:"queryClient.deleteCache()"}],correctAnswer:0,explanation:{en:"queryClient.invalidateQueries({ queryKey }) invalidates matching cached queries and automatically triggers a refetch for any active queries on the current screen.",hi:"queryClient.invalidateQueries matching cache ko stale mark karta hai aur active screen par data turant fresh kar deta hai."}},{question:{en:"What is the core architectural purpose of Server State with React Query (TanStack Query) in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein React Query (TanStack Query): Server State & Caching ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling server state with react query (tanstack query) with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath React Query (TanStack Query): Server State & Caching ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Server State with React Query (TanStack Query) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"React Query (TanStack Query): Server State & Caching clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Server State with React Query (TanStack Query) directly resolve?",hi:"React Query (TanStack Query): Server State & Caching kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Server State with React Query (TanStack Query), applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"React Query (TanStack Query): Server State & Caching ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Server State with React Query (TanStack Query), how is its mental model best conceptualized through real-world analogies?",hi:"React Query (TanStack Query): Server State & Caching ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Server State with React Query (TanStack Query), what syntactic convention is essential to prevent runtime errors?",hi:"React Query (TanStack Query): Server State & Caching ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Server State with React Query (TanStack Query)?",hi:"React Query (TanStack Query): Server State & Caching ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Server State with React Query (TanStack Query) be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye React Query (TanStack Query): Server State & Caching ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Server State with React Query (TanStack Query) impact application memory and CPU consumption?",hi:"React Query (TanStack Query): Server State & Caching ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Server State with React Query (TanStack Query)?",hi:"React Query (TanStack Query): Server State & Caching mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Server State with React Query (TanStack Query)?",hi:"React Query (TanStack Query): Server State & Caching mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Server State with React Query (TanStack Query)?",hi:"React Query (TanStack Query): Server State & Caching mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Server State with React Query (TanStack Query), what must the test suite assert?",hi:"React Query (TanStack Query): Server State & Caching ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Server State with React Query (TanStack Query)?",hi:"Modular design React Query (TanStack Query): Server State & Caching mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Server State with React Query (TanStack Query) be architected to support horizontal scaling?",hi:"Traffic 100x badhne par React Query (TanStack Query): Server State & Caching ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Server State with React Query (TanStack Query) properly belong and execute?",hi:"Full-stack MERN architecture mein React Query (TanStack Query): Server State & Caching kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Server State with React Query (TanStack Query) in production?",hi:"Production mein React Query (TanStack Query): Server State & Caching ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Server State with React Query (TanStack Query)?",hi:"React Query (TanStack Query): Server State & Caching ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Server State with React Query (TanStack Query)?",hi:"React Query (TanStack Query): Server State & Caching mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
