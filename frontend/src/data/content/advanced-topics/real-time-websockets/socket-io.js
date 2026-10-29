export default {
  id: "adv-socket-io",
  title: {
    en: "Real-Time Communication with Socket.io",
    hi: "Socket.io Se Real-Time Bi-Directional Apps",
  },
  difficulty: "Advanced",
  readTime: 13,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Limits of Traditional HTTP & The WebSocket Paradigm",
        hi: "1. Traditional HTTP Ki Limits Aur WebSockets Ka Naya Model",
      },
      body: {
        en: `Traditional web applications communicate using the **HTTP Request-Response** protocol. While HTTP is great for static content and document retrieval, it has severe limitations for real-time applications:

### The Flaws of HTTP for Real-Time Apps:
1. **Half-Duplex & Client-Initiated**: Communication is one-way at any given moment, and the server **cannot** push data to the client unless the client explicitly sends a request first!
2. **Short Polling Overhead**: In naive polling, the browser sends an HTTP \`GET\` request every 2 seconds (*"Any new messages? Any new messages?"*). Each request sends bulky HTTP headers (cookies, user-agents, caching headers) consuming megabytes of wasted bandwidth when nothing has changed.
3. **High Latency**: Long polling reduces empty checks, but still incurs TCP handshake overhead on every cycle.

---

### The WebSocket Protocol (\`ws://\` and \`wss://\`)
The **WebSocket** protocol (RFC 6455) establishes a persistent, **Full-Duplex, Bi-Directional TCP connection** between the browser and the server over a single socket:
- **Zero Overhead**: After an initial HTTP handshake upgrade, data frames are transmitted with as little as **2 bytes** of overhead!
- **Instant Server Push**: The server can push data to connected clients at the exact millisecond an event occurs in the database (e.g. new chat message, stock price tick, or live order update).

### Why Socket.io Instead of Raw WebSockets?
While modern browsers support native \`WebSocket\`, **Socket.io** is the industry standard for production Node.js applications because it provides:
1. **Automatic Fallback to HTTP Long-Polling**: If a user is behind a strict corporate proxy, firewall, or antivirus that blocks raw WebSocket traffic, Socket.io gracefully falls back to long-polling without breaking the app.
2. **Automatic Reconnection**: Built-in exponential backoff reconnection logic if the user's mobile data drops.
3. **Event-Driven API**: Clean custom event names (\`socket.emit('new_order', data)\`, \`socket.on('new_order', callback)\`).
4. **Rooms and Namespaces**: Built-in multi-channel and multi-tenant grouping.`,
        hi: `Traditional web apps **HTTP Request-Response** par chalti hain. Isme ek bohot badi limit hoti hai:
- Server tab tak client ko koi data nahi bhej sakta jab tak client pehle request na kare!
- **HTTP Polling Ka Nuksan**: Agar aap live cricket score dekh rahe hain, toh browser har 2 second mein server ko GET request bhejta hai. Har request ke sath heavy headers jate hain jo internet data aur server CPU dono ko barbad karte hain.

---

### WebSockets (\`wss://\`) Ka Jadu:
**WebSocket** browser aur server ke beech ek permanent, khuli **Full-Duplex** line bana deta hai:
- Ek baar connection ban gaya, toh server aur client dono ek hi samay par ek-doosre ko bina kisi HTTP header ke data bhej sakte hain (sirf 2 bytes ka framing overhead!).
- Server jab chahe turant client ko naya data push kar sakta hai.

### Raw WebSocket Ke Badle Socket.io Kyun?
- **Automatic Fallback**: Agar college ya office ka Wi-Fi firewall WebSockets block kar de, toh Socket.io automatically HTTP Long-Polling par switch ho jata hai taaki app crash na ho.
- **Auto Reconnect**: Internet aate-jaate hi connection automatically reconnect ho jata hai.
- **Custom Events**: \`socket.emit('chat_message')\` aur \`socket.on('chat_message')\` jaise simple event listeners provide karta hai.
- **Rooms**: Group chat aur private channels banana bohot aasan hota hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Socket.io Connection Lifecycle & Architecture",
        hi: "2. Socket.io Ka Connection Lifecycle Aur Architecture",
      },
      body: {
        en: `Socket.io operates on an event-driven architecture connecting the Express backend to the React frontend:

\`\`\`
[ React Client: io('http://localhost:5000') ]
                    │
                    │ 1. HTTP Handshake & Protocol Upgrade Request
                    ▼
         [ Node.js HTTP Server ]
                    │
                    │ 2. Connection Upgraded to WebSocket (ws://)
                    ▼
          [ Socket.io Engine ] ──► Fires 'connection' event with unique socket.id
                    │
   ┌────────────────┴────────────────┐
   │                                 │
   ▼                                 ▼
socket.emit('send_msg', data)    io.emit('broadcast_all', data)
(Client sends to Server)         (Server blasts to EVERY connected user)
\`\`\`

### 3 Ways to Send Messages in Socket.io:
1. \`socket.emit('event', data)\`: Sends data **only** to the specific socket connection.
2. \`socket.broadcast.emit('event', data)\`: Sends data to **everyone EXCEPT the sender** (e.g. notifying others that "User X is typing...").
3. \`io.emit('event', data)\`: Broadcasts data to **every single connected client** in the entire application (e.g. system-wide maintenance alert).`,
        hi: `Socket.io event-driven model par kaam karta hai:

1. React client \`io('http://localhost:5000')\` se connect karta hai.
2. HTTP handshake ke baad connection WebSocket mein upgrade ho jata hai.
3. Server par \`io.on('connection', (socket) => { ... })\` chalta hai jahan har user ko ek unique \`socket.id\` milti hai.

### Message Bhejne Ke 3 Tareeqe:
1. \`socket.emit('event', data)\`: Sirf usi specific connection ko message bhejta hai.
2. \`socket.broadcast.emit('event', data)\`: **Sender ko chhodkar** baaki sabhi users ko message bhejta hai (jaise *"Rahul is typing..."*).
3. \`io.emit('event', data)\`: Poori application ke **har ek connected user** ko ek sath message bhejta hai (Global announcement).`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: Mailing Postcards vs An Open Direct Telephone Call",
        hi: "Real-Life Analogy: Daak Se Postcard Bhejna vs Open Telephone Call",
      },
      body: {
        en: `Imagine wanting live ball-by-ball commentary of an India vs Pakistan cricket match:

- **The HTTP Polling Way (Sending Postcards via Postman)**:
  Every 10 seconds, you write a paper postcard to the stadium: *"What is the score now?"*. You stick a postal stamp on it, hand it to the postman, and wait. The stadium clerk writes back: *"Still 150/2"*. You send another postcard: *"What about now?"*. Clerk writes: *"Still 150/2"*.
  You have wasted 100 stamps, killed dozens of trees, and by the time the postcard arrives announcing a wicket, the match finished 20 minutes ago!
- **The WebSocket / Socket.io Way (The Open Hotline Telephone)**:
  You dial the stadium commentator on a direct landline telephone. Once the call connects (**the handshake**), you both hold the receivers to your ears and keep the line open.
  The commentator speaks ball-by-ball directly into your ear in real time: *"Virat Kohli hits a towering SIX over long-on!"* (Server Push). You can instantly reply into the receiver: *"What an incredible shot!"* (Client Emit). Neither of you has to hang up, redial, or buy postal stamps. Zero latency, continuous conversation!`,
        hi: `Cricket match ke live score ka example dekhein:

- **HTTP Polling (Postcard Bhejna)**:
  Aap har 10 second mein stadium ko ek postcard bhejte hain: *"Score kya hua?"*. Postman aane-jane mein 2 minute lagata hai aur wahan se jawab aata hai: *"150/2, koi change nahi"*. 100 postcards kharch ho gaye, aur jab tak wicket girne ka postcard aata hai, match khatam ho chuka hota hai!
- **WebSocket / Socket.io (Khuli Telephone Line)**:
  Aap stadium ke commentator ko phone milate hain. Ek baar phone uth gaya (**connection established**), toh line hamesha ke liye khuli rehti hai.
  Commentator turant bolta hai: *"Kohli ne chhakka mara!"* (Server push). Aap usi second bolte hain: *"Kamaal ho gaya!"* (Client emit). Na kisi ko phone kaatna pada na dobara milana pada. Zero delay aur live baat-cheet!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax & Setup: Express Server & React Client",
        hi: "Syntax Aur Setup: Express Server Aur React Client Configuration",
      },
      body: {
        en: `### 1. Server Setup (\`server/server.js\`)
Install \`socket.io\`:
\`\`\`bash
npm install socket.io --prefix server
\`\`\`

> [!IMPORTANT]
> **CRITICAL SETUP RULE**: Socket.io requires access to the underlying Node.js **\`http.Server\`** instance! You CANNOT use \`app.listen()\`. You must wrap Express with Node's native \`http.createServer(app)\` and call \`server.listen()\`:

\`\`\`javascript
// server/server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

// 1. Create Node HTTP server wrapping Express
const server = http.createServer(app);

// 2. Initialize Socket.io with CORS configuration
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // React Vite dev server
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// 3. Listen for connection events
io.on('connection', (socket) => {
  console.log('A client connected with Socket ID:', socket.id);

  // Listen for custom client event
  socket.on('client_ping', (data) => {
    console.log('Received ping from client:', data);
    // Respond back to this specific socket
    socket.emit('server_pong', { message: 'PONG from server!', timestamp: Date.now() });
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
// 4. MUST call server.listen(), NOT app.listen()!
server.listen(PORT, () => {
  console.log(\`Server & Socket.io listening on port \${PORT}\`);
});
\`\`\`

---

### 2. Client Setup in React
Install \`socket.io-client\`:
\`\`\`bash
npm install socket.io-client --prefix client
\`\`\`

\`\`\`jsx
// client/src/components/SocketPing.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create socket instance outside component or in a custom hook
const socket = io('http://localhost:5000', {
  autoConnect: false, // Control when to connect
});

export function SocketPing() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    // 1. Connect on component mount
    socket.connect();

    // 2. Attach event listeners
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('server_pong', (data) => setLastPong(data));

    // 3. CRITICAL: Clean up listeners on unmount to prevent memory leaks!
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('server_pong');
      socket.disconnect();
    };
  }, []);

  const sendPing = () => {
    socket.emit('client_ping', { clientTime: Date.now() });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <p>Connection Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>
      <button onClick={sendPing} disabled={!isConnected}>
        Send Ping to Server
      </button>
      {lastPong && <p>Response: {lastPong.message}</p>}
    </div>
  );
}
\`\`\``,
        hi: `### Backend Setup:
1. \`socket.io\` install karein.
2. **Sabse Zaroori Rule**: \`app.listen()\` use NA karein! Node ka native \`http.createServer(app)\` banayein aur \`server.listen(PORT)\` call karein.
3. \`const io = new Server(server, { cors: { origin: 'http://localhost:5173' } })\` se CORS configure karein.
4. \`io.on('connection', (socket) => { ... })\` ke andar events handle karein.

### Frontend Setup (React):
1. \`socket.io-client\` install karein.
2. \`useEffect\` mein \`socket.connect()\` karein aur \`socket.on('event', cb)\` se suney.
3. **Cleanup Zaroori Hai**: Component unmount hone par \`socket.off()\` aur \`socket.disconnect()\` zaroor lagayein taaki memory leaks na hon.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Live Collaborative Counter (Real-Time State Sync)",
        hi: "Example 1: Real-Time Collaborative Counter (Live State Sync)",
      },
      body: {
        en: `In this example, when any user in any browser clicks "+1", every other connected user's screen updates in real time using \`io.emit()\`.

\`\`\`javascript
// server/src/sockets/counterSocket.js
let globalCounter = 0;

export function registerCounterHandlers(io) {
  io.on('connection', (socket) => {
    // 1. Send current count to the newly connected user immediately
    socket.emit('counter_update', globalCounter);

    // 2. Listen for increment requests
    socket.on('increment_counter', () => {
      globalCounter += 1;
      // Broadcast the updated count to EVERY connected client in the app!
      io.emit('counter_update', globalCounter);
    });

    socket.on('reset_counter', () => {
      globalCounter = 0;
      io.emit('counter_update', globalCounter);
    });
  });
}
\`\`\`

\`\`\`jsx
// client/src/components/LiveCounter.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export function LiveCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Listen for real-time broadcasts from server
    socket.on('counter_update', (newCount) => {
      setCount(newCount);
    });

    return () => {
      socket.off('counter_update');
    };
  }, []);

  return (
    <div className="p-6 max-w-sm mx-auto text-center border rounded-2xl bg-white shadow-sm">
      <h3 className="text-xl font-bold">Collaborative Live Counter</h3>
      <p className="text-5xl font-black text-indigo-600 my-4">{count}</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => socket.emit('increment_counter')}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-bold"
        >
          +1 Increment (Broadcasts to all)
        </button>
        <button
          onClick={() => socket.emit('reset_counter')}
          className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
\`\`\``,
        hi: `Is example mein:
- Jaise hi koi ek user "+1" click karta hai, server \`io.emit('counter_update')\` call karta hai.
- Agar 100 users alag-alag tabs ya phones par yeh page khole hue hain, toh 100 ke 100 screens par count turant badh jata hai bina page reload kiye!`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Real-Time Typing Indicator with socket.broadcast.emit()",
        hi: "Example 2: 'User Is Typing...' Indicator (socket.broadcast.emit)",
      },
      body: {
        en: `When typing a message in a chat app, you want to show *"Aman is typing..."* to everyone in the room EXCEPT the person who is currently typing. This is where \`socket.broadcast.emit()\` shines:

\`\`\`javascript
// server/src/sockets/typingSocket.js
export function registerTypingHandlers(io) {
  io.on('connection', (socket) => {
    socket.on('typing_start', (userName) => {
      // Sends to everyone EXCEPT the sender!
      socket.broadcast.emit('user_typing', { userName, isTyping: true });
    });

    socket.on('typing_stop', (userName) => {
      socket.broadcast.emit('user_typing', { userName, isTyping: false });
    });
  });
}
\`\`\`

\`\`\`jsx
// client/src/components/ChatInput.jsx
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export function ChatInput({ currentUser }) {
  const [text, setText] = useState('');
  const [typingUser, setTypingUser] = useState('');
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    socket.on('user_typing', (data) => {
      if (data.isTyping) {
        setTypingUser(data.userName);
      } else {
        setTypingUser('');
      }
    });

    return () => {
      socket.off('user_typing');
    };
  }, []);

  const handleInputChange = (e) => {
    setText(e.target.value);

    // Emit typing started
    socket.emit('typing_start', currentUser.name);

    // Clear previous timer and set 1.5s debounce to emit typing stopped
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing_stop', currentUser.name);
    }, 1500);
  };

  return (
    <div className="p-4">
      {typingUser && (
        <p className="text-xs text-slate-500 italic mb-2 animate-pulse">
          ✍️ {typingUser} is typing...
        </p>
      )}
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Type a message..."
        className="w-full px-4 py-2 border rounded-xl"
      />
    </div>
  );
}
\`\`\``,
        hi: `Typing indicator ka logic:
- \`socket.broadcast.emit()\`: Yeh sender ko chhodkar baaki sabhi logon ko bhejta hai taaki aapko khud screen par *"You are typing..."* na dikhe, sirf doosron ko dikhe.
- Frontend mein 1.5 second ka timer lagaya jata hai taaki jab user type karna band kare toh indicator automatically hat jaye.`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Socket.io Context Provider with Reconnection Resiliency",
        hi: "Example 3: React Socket Context Provider (Singleton Architecture)",
      },
      body: {
        en: `Instead of creating isolated \`io()\` connections inside multiple components, centralize Socket.io inside a React Context Provider to guarantee a single singleton connection across the entire application:

\`\`\`jsx
// client/src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      if (socket) socket.disconnect();
      return;
    }

    // Initialize socket connection with Auth Token handshake!
    const newSocket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('auth_token'),
      },
      transports: ['websocket', 'polling'], // Try websocket first, fallback to polling
    });

    newSocket.on('connect', () => {
      console.log('Socket connected successfully:', newSocket.id);
    });

    newSocket.on('online_users_count', (count) => {
      setOnlineUsersCount(count);
    });

    setSocket(newSocket);

    // Clean up on logout or unmount
    return () => {
      newSocket.disconnect();
    };
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsersCount }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
\`\`\``,
        hi: `Enterprise React Architecture:
- Poori app mein sirf ek single socket connection maintain karne ke liye \`SocketProvider\` banaya jata hai.
- Login hone par token ke sath connect karta hai, aur logout hone par disconnect kar deta hai.
- Kisi bhi component mein \`const { socket } = useSocket()\` se instant real-time access mil jata hai.`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Common Mistakes Aur Unke Fixes",
      },
      body: {
        en: `### 1. Using app.listen() Instead of server.listen()
- **Mistake**: Calling \`app.listen(5000)\` in your Express server file.
- **Why it breaks**: Socket.io hooks into Node's native HTTP server (\`http.createServer(app)\`). If you start the app using \`app.listen()\`, Express creates its own separate HTTP server, leaving the Socket.io engine unattached. The server will start, but the client socket will forever fail to connect!
- **Fix**: Always call \`server.listen(5000)\`.

### 2. Forgetting to Remove Event Listeners in useEffect Cleanups
- **Mistake**: Writing \`socket.on('message', handler)\` inside \`useEffect\` without returning \`() => socket.off('message', handler)\`.
- **Why it breaks**: Every time the React component re-renders or unmounts/remounts, a brand-new duplicate listener is registered! When the server emits 1 message, the component triggers the callback 10 times, causing memory leaks and duplicate UI messages.
- **Fix**: Always unbind listeners in the cleanup return function: \`return () => socket.off('message', handler);\`.

### 3. Calling io('http://localhost:5000') Inside a Component Body
- **Mistake**: Writing \`const socket = io(...)\` directly inside a component's render function.
- **Why it hurts**: Opens a brand new TCP WebSocket connection on **every single state update or re-render**! After 20 renders, the browser opens 20 simultaneous socket connections to the backend, exhausting server memory.
- **Fix**: Declare the socket outside the component, or manage it inside a \`SocketContext\`.`,
        hi: `### 1. app.listen() Likh Dena server.listen() Ke Badle
- **Galti**: Express mein \`app.listen(5000)\` call karna.
- **Nuksan**: Socket.io Node ke HTTP server se connect nahi ho pata aur client par hamesha connection error aata hai!
- **Fix**: Hamesha \`server.listen(5000)\` use karein.

### 2. Event Listeners Clean Up Na Karna
- **Galti**: \`useEffect\` ke return function mein \`socket.off()\` na lagana.
- **Nuksan**: Har re-render par duplicate listener judta jata hai. Server se 1 message aane par component 10 baar trigger ho jata hai!
- **Fix**: Hamesha \`return () => socket.off('event')\` karein.

### 3. Component Ke Andar direct io() Call Karna
- **Galti**: Component ke render function ke andar \`const socket = io()\` likhna.
- **Nuksan**: Har re-render par naya socket connection banta hai jo server ko crash kar deta hai.
- **Fix**: Socket ko hamesha component ke bahar ya Context Provider mein rakhein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Scalable Real-Time Architecture",
        hi: "Best Practices: Real-Time Architecture Guidelines",
      },
      body: {
        en: `1. **Authenticate the Socket Handshake**: Pass the JWT in the connection auth options (\`io(url, { auth: { token } })\`) and verify it on the server using \`io.use((socket, next) => { ... })\` middleware before accepting the connection.
2. **Use Message Acknowledgements**: Use callbacks for critical messages to confirm receipt on the server:
   \`\`\`javascript
   socket.emit('order_placed', { orderId: 101 }, (response) => {
     console.log('Server acknowledged receipt:', response.status);
   });
   \`\`\`
3. **Scale Across Multiple Servers with the Redis Adapter**: When running multiple Node.js server instances behind a load balancer, install \`@socket.io/redis-adapter\` so sockets connected to Server A can broadcast events to sockets connected to Server B.`,
        hi: `1. **Handshake Authentication**: Socket connect hote hi \`auth: { token }\` bhej kar server-side middleware \`io.use()\` se JWT verify karein.
2. **Message Acknowledgements**: Critical messages ke sath callback bhej kar server se delivery confirmation lein.
3. **Redis Adapter (Multi-Server Scale)**: Jab multiple Express servers load balancer ke peeche hon, toh \`@socket.io/redis-adapter\` use karein taaki Server 1 par connected user Server 2 ke user ko message bhej sake.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Interview Ke Zaroori Sawal Aur Jawab",
      },
      body: {
        en: `### Q1: What is the difference between WebSockets and HTTP Polling?
**Answer**:
- **HTTP Polling**: Half-duplex and strictly client-initiated. The client periodically sends HTTP requests to check for new data. Each request transmits complete HTTP headers, causing network bloat, server CPU strain, and delayed updates.
- **WebSockets**: Full-duplex and bi-directional. A persistent TCP connection remains open over a single socket. Either party can send data at any moment with minimal 2-byte framing overhead, enabling true sub-millisecond real-time communication.

### Q2: Why must we pass the http.Server instance to Socket.io instead of the Express app?
**Answer**: Express is an application routing framework that handles incoming request/response functions; it is not an active network server. Under the hood, Express delegates network listening to Node's built-in \`http.Server\`. Socket.io requires low-level access to the underlying HTTP server to intercept the HTTP \`Upgrade\` header during the initial handshake and transform the TCP socket into a WebSocket connection. Therefore, \`http.createServer(app)\` must be passed to \`new Server(server)\`, and \`server.listen()\` must be called.

### Q3: What is the difference between socket.emit(), socket.broadcast.emit(), and io.emit()?
**Answer**:
- \`socket.emit('event', data)\`: Transmits the event strictly to the single socket that triggered the request.
- \`socket.broadcast.emit('event', data)\`: Transmits the event to all connected sockets in the application **except** the originating sender.
- \`io.emit('event', data)\`: Broadcasts the event globally to **every single connected socket**, including the sender.

### Q4: How does Socket.io maintain communication if WebSockets are blocked by corporate firewalls?
**Answer**: Socket.io uses an underlying transport engine called **Engine.IO**. During the initial connection handshake, it starts with an HTTP long-polling transport. Once the initial handshake succeeds, it attempts to upgrade the connection to WebSocket. If WebSocket communication is blocked by a proxy, firewall, or antivirus, Socket.io remains gracefully on HTTP long-polling, ensuring the application continues functioning.`,
        hi: `### Q1: WebSockets aur HTTP Polling mein kya farq hai?
**Jawab**: HTTP Polling mein client baar-baar naya HTTP request bhej kar data mangta hai jisme heavy headers aur delay hota hai. WebSockets mein ek baar connection banne ke baad line hamesha khuli rehti hai aur dono taraf se bina kisi extra header ke instant data transmit hota hai.

### Q2: Express app ke badle http.Server kyun zaroori hai?
**Jawab**: Express sirf routing handle karta hai, actual network TCP socket Node ka native \`http.Server\` sambhalta hai. Socket.io ko HTTP \`Upgrade\` request pakad kar WebSocket mein badalne ke liye native server chahiye hota hai, isliye \`server.listen()\` call karna zaroori hai.

### Q3: socket.emit, broadcast, aur io.emit mein kya antar hai?
**Jawab**:
- \`socket.emit\`: Sirf usi specific user ko bhejta hai.
- \`socket.broadcast.emit\`: Sender ko chhodkar baaki sabhi logon ko bhejta hai.
- \`io.emit\`: Poori app ke sabhi users (including sender) ko ek sath broadcast karta hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Socket.io Real-Time Cheatsheet",
        hi: "Quick Summary: Socket.io Real-Time Cheatsheet",
      },
      body: {
        en: `- **Full-Duplex Communication**: Persistent TCP socket with bi-directional real-time data streaming.
- **Server Setup**: Wrap Express with \`http.createServer(app)\` and call \`server.listen()\`.
- **Targeted Emits**: Use \`socket.emit\` (single), \`socket.broadcast.emit\` (others), and \`io.emit\` (everyone).
- **Client Management**: Establish connection outside components or inside a centralized \`SocketContext\`.
- **Prevent Memory Leaks**: Always clean up listeners with \`socket.off('event')\` in \`useEffect\` cleanup.
- **Engine.IO Resilience**: Automatically falls back to HTTP long-polling if WebSockets are blocked.`,
        hi: `- **Full-Duplex**: Ek hi open socket se dono taraf instant data flow.
- **Server Listen**: Hamesha \`http.createServer(app)\` banakar \`server.listen()\` karein.
- **3 Emit Types**: \`socket.emit\` (khud ko), \`broadcast\` (doosron ko), aur \`io.emit\` (sabko).
- **Socket Context**: Har component mein alag socket na banayein, Context Provider use karein.
- **Cleanup Zaroori**: \`socket.off()\` se listeners remove karein taaki duplicate messages na aayein.
- **Auto Fallback**: Firewall aane par long-polling par auto-switch ho jata hai.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "Why must you call server.listen() instead of app.listen() when integrating Socket.io with Express?",
      "hi": "Express ke sath Socket.io integrate karte waqt app.listen() ke badle server.listen() call karna kyun zaroori hai?"
    },
    "options": [
      {
        "en": "Because app.listen() is deprecated in Express 4",
        "hi": "Kyunki app.listen() Express 4 mein deprecated hai"
      },
      {
        "en": "Because Socket.io binds directly to the underlying Node.js http.Server instance to intercept the WebSocket upgrade handshake; using app.listen creates a disconnected server instance",
        "hi": "Kyunki Socket.io ko WebSocket upgrade handshake intercept karne ke liye native http.Server chahiye hota hai; app.listen use karne se Socket.io unattached reh jata hai"
      },
      {
        "en": "Because server.listen() encrypts passwords",
        "hi": "Kyunki server.listen() passwords encrypt karta hai"
      },
      {
        "en": "Because Chrome blocks app.listen()",
        "hi": "Kyunki Chrome app.listen() block karta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Socket.io must attach to Node's http.Server so it can handle HTTP upgrade requests. Calling app.listen() starts an unattached server instance where Socket.io cannot intercept traffic.",
      "hi": "Socket.io ko HTTP Upgrade handshake pakadne ke liye native http.Server chahiye hota hai. app.listen use karne par Socket.io disconnect reh jata hai."
    }
  },
  {
    "question": {
      "en": "Which Socket.io method sends an event to EVERY connected client EXCEPT the originating sender?",
      "hi": "Kaunsa Socket.io method originating sender ko chhodkar baaki SABHI connected clients ko event bhejta hai?"
    },
    "options": [
      {
        "en": "io.emit()",
        "hi": "io.emit()"
      },
      {
        "en": "socket.broadcast.emit()",
        "hi": "socket.broadcast.emit()"
      },
      {
        "en": "socket.emit()",
        "hi": "socket.emit()"
      },
      {
        "en": "socket.private()",
        "hi": "socket.private()"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "socket.broadcast.emit sends data to all connected sockets in the namespace except the socket that initiated the event (ideal for typing indicators).",
      "hi": "socket.broadcast.emit sender ko chhodkar baaki sabhi users ko data bhejta hai, jo typing indicator jaise features ke liye perfect hai."
    }
  },
  {
    "question": {
      "en": "What critical bug occurs if you forget to call socket.off('event', handler) in a React useEffect cleanup?",
      "hi": "Agar aap React useEffect cleanup mein socket.off('event', handler) call karna bhool jayein, toh kaunsa critical bug aata hai?"
    },
    "options": [
      {
        "en": "The computer's graphics card overheats",
        "hi": "Graphics card overheat ho jata hai"
      },
      {
        "en": "Duplicate event listeners accumulate on every re-render, causing the callback to execute multiple times per message and creating memory leaks",
        "hi": "Har re-render par duplicate event listeners judte chale jaate hain, jisse ek message aane par callback kayi baar execute hota hai aur memory leak hota hai"
      },
      {
        "en": "React converts all JSX into plain HTML files",
        "hi": "React saare JSX ko HTML bana deta hai"
      },
      {
        "en": "MongoDB shuts down automatically",
        "hi": "MongoDB band ho jata hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Without removing listeners in cleanup, each remount or re-render adds another listener to the singleton socket, causing exponential callback triggering.",
      "hi": "Cleanup na karne par har render par naya listener jud jata hai aur ek hi message screen par 10 baar trigger hone lagta hai."
    }
  },
  {
    "question": {
      "en": "What happens if a user's corporate network blocks WebSocket (ws://) connections when using Socket.io?",
      "hi": "Agar kisi user ke office network par WebSocket (ws://) connections blocked hon, toh Socket.io kaise react karta hai?"
    },
    "options": [
      {
        "en": "The entire application crashes with an unhandled exception",
        "hi": "Poori application crash ho jaati hai"
      },
      {
        "en": "Socket.io automatically and gracefully falls back to HTTP long-polling, keeping real-time communication operational",
        "hi": "Socket.io automatically HTTP long-polling par fallback ho jata hai, jisse real-time communication bina ruke chalta rehta hai"
      },
      {
        "en": "It automatically reboots the user's computer",
        "hi": "User ka computer reboot ho jata hai"
      },
      {
        "en": "It sends an SMS to the network administrator",
        "hi": "Network admin ko SMS bhejta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Socket.io's Engine.IO transport automatically falls back to HTTP long-polling if the WebSocket handshake fails, guaranteeing connectivity.",
      "hi": "Socket.io ka Engine.IO automatically HTTP long-polling par switch ho jata hai jisse strict firewalls ke peeche bhi app smoothly chalti rehti hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Real-Time Communication with Socket.io in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Socket.io Se Real-Time Bi-Directional Apps ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling real-time communication with socket.io with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Socket.io Se Real-Time Bi-Directional Apps ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Real-Time Communication with Socket.io establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Real-Time Communication with Socket.io directly resolve?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Real-Time Communication with Socket.io, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Real-Time Communication with Socket.io, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Real-Time Communication with Socket.io, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Real-Time Communication with Socket.io?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Real-Time Communication with Socket.io be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Socket.io Se Real-Time Bi-Directional Apps ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Real-Time Communication with Socket.io impact application memory and CPU consumption?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Real-Time Communication with Socket.io?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Real-Time Communication with Socket.io?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Real-Time Communication with Socket.io?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Real-Time Communication with Socket.io, what must the test suite assert?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Real-Time Communication with Socket.io?",
      "hi": "Modular design Socket.io Se Real-Time Bi-Directional Apps mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Real-Time Communication with Socket.io be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Socket.io Se Real-Time Bi-Directional Apps ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Real-Time Communication with Socket.io properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Socket.io Se Real-Time Bi-Directional Apps kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Real-Time Communication with Socket.io in production?",
      "hi": "Production mein Socket.io Se Real-Time Bi-Directional Apps ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Real-Time Communication with Socket.io?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Real-Time Communication with Socket.io?",
      "hi": "Socket.io Se Real-Time Bi-Directional Apps mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
