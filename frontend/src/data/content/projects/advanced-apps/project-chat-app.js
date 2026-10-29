export default {
  id: "proj-chat-app",
  title: {
    en: "Project 4: Real-Time Chat Application with Socket.io",
    hi: "Project 4: Real-Time Chat App with Socket.io & Online Presence",
  },
  difficulty: "Advanced",
  readTime: 18,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. Real-Time Architecture: Building a WhatsApp / Slack Clone",
        hi: "1. Real-Time Architecture: WhatsApp / Slack Jaisa Chat App Banana",
      },
      body: {
        en: `Real-time messaging applications represent the pinnacle of event-driven full-stack engineering. Unlike traditional CRUD applications where the client pulls data, a chat platform requires **full-duplex, bi-directional event streaming** where the server pushes new messages to recipients the exact millisecond they are sent.

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    REACT CLIENT (Vite + Socket.io Client)       │
│  - Active Conversation Window with Auto-Scroll Anchor           │
│  - Real-Time Online Presence Badges (Green status dots)         │
│  - Debounced Typing Status ("Aman is typing...")                │
│  - Audio Notification Chimes on Incoming Message                │
└───────────────────────────────┬─────────────────────────────────┘
                                │ WebSockets (ws:// / wss://)
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS + SOCKET.IO SERVER                   │
│  - JWT Handshake Authentication Middleware                      │
│  - Multi-Device Socket Tracking: Map<userId, Set<socketId>>     │
│  - Conversation Rooms (socket.join(conversationId))             │
│  - Event Relay: typing, stop_typing, user_online, message       │
└───────────────────────────────┬─────────────────────────────────┘
                                │ Mongoose Persistence & History
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                             │
│  - Conversations Collection (participants array, lastMessage)   │
│  - Messages Collection (conversationId, sender, text, readBy)   │
│  - Compound Index: { conversationId: 1, createdAt: -1 }         │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Key Architectural Challenges:
1. **JWT Handshake Authentication**: Rejecting unauthorized WebSocket connection attempts before the socket opens.
2. **Multi-Tab / Multi-Device Concurrency**: What happens if a user has the chat open on both their phone and laptop? We must deliver messages to **all active socket connections belonging to that user ID**.
3. **Room Isolation**: Ensuring messages sent in "Room A" never leak into "Room B".
4. **Message Persistence**: Storing messages in MongoDB *before* broadcasting so offline users see full chat histories upon logging in.`,
        hi: `Real-time messaging apps banana ek full-stack engineer ke liye sabse exciting project hota hai. Isme traditional HTTP ke badle **Full-Duplex WebSockets** use hote hain jahan naya message aate hi server usi millisecond mein receiver ke screen par push kar deta hai.

### Mukhya Features:
- **WhatsApp Jaisa Real-Time Flow**: 1-on-1 private messaging aur group chat rooms.
- **Online Presence**: Kaun online hai aur kaun offline, green dot indicator ke sath.
- **Typing Indicators**: *"Rahul is typing..."* ka live status jo 2 second baad gayab ho jaye.
- **Auto-Scroll & Audio Chime**: Naya message aane par notification sound aur automatic scroll down.
- **MongoDB History**: Saare messages database mein indexed save hote hain taaki purani chat kabhi gayab na ho.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. Data Modeling & Multi-Device Socket Mapping",
        hi: "2. Data Modeling Aur Multi-Device Socket Mapping Ka Concept",
      },
      body: {
        en: `### 1. The Multi-Tab Socket Problem:
A single user (\`userId: 'user_123'\`) might open your app in 2 browser tabs on their laptop, plus the app on their phone. That single user now has **3 distinct socket connections with 3 different \`socket.id\` strings**!
If you use a simple \`Map<userId, socketId>\`, opening a new tab overwrites the old socket ID, cutting off live notifications on the first tab!

**The Production Solution: A Multi-Socket Map**:
\`\`\`javascript
// Map<UserIdString, Set<SocketIdString>>
const userSocketMap = new Map();

// When a socket connects:
const addSocket = (userId, socketId) => {
  if (!userSocketMap.has(userId)) {
    userSocketMap.set(userId, new Set());
  }
  userSocketMap.get(userId).add(socketId);
};

// When a socket disconnects:
const removeSocket = (userId, socketId) => {
  if (userSocketMap.has(userId)) {
    userSocketMap.get(userId).delete(socketId);
    if (userSocketMap.get(userId).size === 0) {
      userSocketMap.delete(userId); // User is officially OFFLINE across all devices!
    }
  }
};
\`\`\`

---

### 2. Database Schema Modeling:
\`\`\`javascript
// models/Message.js
const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

// High-speed index for loading paginated chat history:
messageSchema.index({ conversationId: 1, createdAt: -1 });
\`\`\``,
        hi: `### 1. Multi-Device Socket Ki Samasya:
Ek user apne laptop par 2 tabs khol sakta hai aur sath mein phone par bhi app chala sakta hai. Ek hi user ke paas **3 alag-alag \`socket.id\`** hote hain!
Agar hum sirf ek ID save karenge, toh doosra tab disconnect ho jayega.
**Production Solution**: \`Map<userId, Set<socketId>>\` use karte hain jisme ek user ke saare live devices store hote hain. Jab saare tabs band ho jaate hain, tabhi user offline declare hota hai!

### 2. Database Schemas:
- **\`Conversation\`**: Kaun-kaun log baat kar rahe hain (\`participants\`).
- **\`Message\`**: Kis conversation ka message hai, kisne bheja (\`sender\`), message ka text, aur kab bheja.
- **Index**: \`{ conversationId: 1, createdAt: -1 }\` se 10,000 messages wali chat bhi instant load hoti hai.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Corporate Intercom Switchboard & Telephone Exchange",
        hi: "Real-Life Analogy: Company Ka EPABX Intercom Telephone Exchange",
      },
      body: {
        en: `Imagine the internal telephone exchange at a corporate tech park in Bangalore:

- **The Receptionist (JWT Socket Handshake)**:
  When you arrive at the office and plug your landline phone into your desk jack, the central operator checks your employee badge (**JWT Auth Handshake**). If your contract is terminated, the jack has zero dial tone!
- **The Desk Extension vs Mobile Handset (Multi-Device Sockets)**:
  An employee, Rahul, has an intercom on his desk (Extension #401A) and an office walkie-talkie in his pocket (Extension #401B).
  When Priya calls Rahul's extension (**userSocketMap**), the central switchboard rings **both** his desk phone and walkie-talkie simultaneously!
- **The Department Conference Room (Socket.io Rooms)**:
  The marketing team dials into Conference Line #88 (**\`socket.join('room_marketing')\`**). When the VP speaks into the conference microphone, only employees connected to Line #88 hear his voice. Finance and engineering lines stay completely private.
- **The Central Audio Recorder (MongoDB Message Persistence)**:
  Every conversation spoken over the intercom is recorded onto magnetic backup tape in the server room (**MongoDB \`Message.create()\`**). If someone was on sick leave today, they can play back yesterday's audio recordings (**Loading chat history**).`,
        hi: `Ek badi company ke intercom telephone network ka example dekhein:

- **Operator Verification (JWT Socket Handshake)**:
  Jab aap desk par phone connect karte hain, toh operator aapka employee ID check karta hai (**JWT Token**). Valid hone par hi line chalu hoti hai.
- **Desk Phone Aur Mobile Walkie-Talkie (Multi-Device Sockets)**:
  Rahul ke paas desk phone bhi hai aur walkie-talkie bhi. Jab Priya Rahul ko call karti hai, toh switchboard dono par ek sath ring bajata hai (**Multi-socket mapping**).
- **Conference Room (Socket Rooms)**:
  Developers Room #101 mein aate hain (**\`socket.join()\`**). Wahan ki baatein sirf us room ke logon ko sunayi deti hain, baaki company ko nahi.
- **Central Call Recording (MongoDB Storage)**:
  Har message central hard drive mein record hota hai (**MongoDB Storage**), taaki kal aane wale employee ko purani saari baatein mil sakein.`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Socket.io Server Handshake & Client Connection Lifecycle",
        hi: "Socket.io Server Handshake Aur Client Connection Syntax",
      },
      body: {
        en: `### 1. Server-Side Socket Authentication Middleware:
\`\`\`javascript
// server/socket/socketAuth.js
import jwt from 'jsonwebtoken';

export const socketAuthMiddleware = (socket, next) => {
  // Extract token from handshake query or auth object
  const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;

  if (!token) {
    return next(new Error('Authentication failed: Missing token'));
  }

  try {
    const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    socket.user = decoded; // Attach user claims to socket!
    next();
  } catch (err) {
    next(new Error('Authentication failed: Invalid or expired token'));
  }
};
\`\`\`

### 2. Client-Side React Connection:
\`\`\`javascript
// client/src/socket.js
import { io } from 'socket.io-client';

export const initializeSocket = (token) => {
  return io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
    auth: { token },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
};
\`\`\``,
        hi: `### 1. Server Par Socket JWT Middleware:
Connection banne se pehle hi token verify karna:

\`\`\`javascript
export const socketAuthMiddleware = (socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Token missing!'));

  try {
    socket.user = jwt.verify(token, process.env.JWT_SECRET);
    next(); // Pass ho gaya
  } catch (err) {
    next(new Error('Invalid token!'));
  }
};
\`\`\`

### 2. React Client Se Connect Karna:
\`\`\`javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  auth: { token: userToken },
});
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Production Socket.io Server Handler with Multi-Device Mapping",
        hi: "Example 1: Production Socket.io Server (Multi-Device Sockets Aur Online Status)",
      },
      body: {
        en: `Here is the master \`socketHandler.js\` managing connections, online presence broadcasts, and room messaging:

\`\`\`javascript
// server/socket/socketHandler.js
import { socketAuthMiddleware } from './socketAuth.js';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';

export const configureSocketIO = (io) => {
  // 1. Enforce JWT authentication on all incoming sockets
  io.use(socketAuthMiddleware);

  // In-memory mapping: userId -> Set of socket IDs
  const userSocketMap = new Map();

  io.on('connection', (socket) => {
    const userId = socket.user.id;
    console.log(\`⚡ User connected: \${socket.user.name} (\${userId}) on socket \${socket.id}\`);

    // 2. Register socket to user's device set
    if (!userSocketMap.has(userId)) {
      userSocketMap.set(userId, new Set());
      // User just came online: Broadcast to everyone!
      io.emit('user_online', { userId });
    }
    userSocketMap.get(userId).add(socket.id);

    // Send currently online user list to the newly connected user
    socket.emit('get_online_users', Array.from(userSocketMap.keys()));

    // 3. Join Conversation Room
    socket.on('join_conversation', (conversationId) => {
      socket.join(conversationId);
      console.log(\`Socket \${socket.id} joined conversation: \${conversationId}\`);
    });

    // 4. Send & Broadcast New Message
    socket.on('send_message', async (data) => {
      const { conversationId, text } = data;

      try {
        // A: Persist message in MongoDB FIRST!
        const message = await Message.create({
          conversationId,
          sender: userId,
          text,
        });

        await message.populate('sender', 'name avatar');

        // B: Update lastMessage on conversation
        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message._id,
          updatedAt: new Date(),
        });

        // C: Emit message to all sockets inside the conversation room!
        io.to(conversationId).emit('receive_message', message);
      } catch (err) {
        console.error('Failed to handle send_message event:', err);
        socket.emit('message_error', { message: 'Could not send message' });
      }
    });

    // 5. Typing Indicators (Targeted to conversation room)
    socket.on('typing', ({ conversationId }) => {
      socket.to(conversationId).emit('user_typing', {
        userId,
        userName: socket.user.name,
        conversationId,
      });
    });

    socket.on('stop_typing', ({ conversationId }) => {
      socket.to(conversationId).emit('user_stop_typing', {
        userId,
        conversationId,
      });
    });

    // 6. Handle Disconnect
    socket.on('disconnect', () => {
      console.log(\`🔌 Socket disconnected: \${socket.id}\`);
      if (userSocketMap.has(userId)) {
        userSocketMap.get(userId).delete(socket.id);

        // If user has zero active sockets left across all devices, mark OFFLINE!
        if (userSocketMap.get(userId).size === 0) {
          userSocketMap.delete(userId);
          io.emit('user_offline', { userId });
          console.log(\`🔴 User \${userId} is now completely OFFLINE\`);
        }
      }
    });
  });
};
\`\`\``,
        hi: `Complete \`socketHandler.js\` jisme room joining, multi-device tracking, typing indicators, aur online/offline presence broadcasts shamil hain:

\`\`\`javascript
// server/socket/socketHandler.js
import Message from '../models/Message.js';

export const configureSocketIO = (io) => {
  const userSocketMap = new Map(); // userId -> Set(socketIds)

  io.on('connection', (socket) => {
    const userId = socket.user.id;

    // Online tracking
    if (!userSocketMap.has(userId)) {
      userSocketMap.set(userId, new Set());
      io.emit('user_online', { userId });
    }
    userSocketMap.get(userId).add(socket.id);

    // Online users ki list bhejein
    socket.emit('get_online_users', Array.from(userSocketMap.keys()));

    // Room join karein
    socket.on('join_conversation', (roomId) => socket.join(roomId));

    // Message aane par pehle DB mein save karein, phir room mein bhejien
    socket.on('send_message', async ({ conversationId, text }) => {
      const message = await Message.create({ conversationId, sender: userId, text });
      await message.populate('sender', 'name avatar');
      io.to(conversationId).emit('receive_message', message);
    });

    // Typing status
    socket.on('typing', ({ conversationId }) => {
      socket.to(conversationId).emit('user_typing', { userId, name: socket.user.name });
    });

    // Disconnect hone par
    socket.on('disconnect', () => {
      if (userSocketMap.has(userId)) {
        userSocketMap.get(userId).delete(socket.id);
        if (userSocketMap.get(userId).size === 0) {
          userSocketMap.delete(userId);
          io.emit('user_offline', { userId });
        }
      }
    });
  });
};
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Express Conversation & Message History REST Controller",
        hi: "Example 2: Chat History Aur Conversations Ka REST Controller",
      },
      body: {
        en: `REST endpoints to fetch active chat lists and cursor-paginated message histories:

\`\`\`javascript
// server/controllers/chatController.js
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

// 1. GET /api/chat/conversations (Fetch all active chats for current user)
export const getUserConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.user.id] },
    })
      .populate('participants', 'name email avatar')
      .populate({
        path: 'lastMessage',
        populate: { path: 'sender', select: 'name' },
      })
      .sort('-updatedAt')
      .lean();

    return res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    next(error);
  }
};

// 2. GET /api/chat/messages/:conversationId (Fetch Paginated History)
export const getMessagesForConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const limit = Math.min(50, parseInt(req.query.limit, 10) || 30);
    const cursor = req.query.cursor; // Last seen message _id

    const query = { conversationId };
    if (cursor) {
      query._id = { $lt: cursor };
    }

    const messages = await Message.find(query)
      .populate('sender', 'name avatar')
      .sort({ createdAt: -1 }) // Newest first for cursor limit
      .limit(limit)
      .lean();

    // Reverse so client receives chronological order (oldest to newest)
    return res.status(200).json({
      success: true,
      data: messages.reverse(),
      nextCursor: messages.length === limit ? messages[0]._id : null,
    });
  } catch (error) {
    next(error);
  }
};
\`\`\``,
        hi: `Pichli chat history mangwane aur active conversations dekhne ka REST controller:

\`\`\`javascript
// server/controllers/chatController.js
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

// User ke saare chats laayein
export const getUserConversations = async (req, res, next) => {
  try {
    const chats = await Conversation.find({ participants: req.user.id })
      .populate('participants', 'name avatar')
      .populate('lastMessage')
      .sort('-updatedAt');

    return res.status(200).json({ success: true, data: chats });
  } catch (error) {
    next(error);
  }
};

// Kisi conversation ke purane messages laayein
export const getMessagesForConversation = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId })
      .populate('sender', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(30);

    return res.status(200).json({ success: true, data: messages.reverse() });
  } catch (error) {
    next(error);
  }
};
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: React Full-Featured Real-Time Chat Window Component",
        hi: "Example 3: React Real-Time Chat Window (Auto-Scroll Aur Typing Indicator)",
      },
      body: {
        en: `Here is the comprehensive React chat interface with auto-scroll using \`useRef\`, debounced typing indicator, and incoming message listeners:

\`\`\`jsx
// client/src/components/ChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

export default function ChatWindow({ conversationId, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [typingUsers, setTypingUsers] = useState(new Set());

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // 1. Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  // 2. Socket Listeners for this Conversation
  useEffect(() => {
    if (!socket || !conversationId) return;

    // Join room
    socket.emit('join_conversation', conversationId);

    // Incoming Message Listener
    const handleNewMessage = (msg) => {
      if (msg.conversationId === conversationId) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    // Typing Listeners
    const handleUserTyping = ({ userId, userName, conversationId: cId }) => {
      if (cId === conversationId && userId !== currentUser.id) {
        setTypingUsers((prev) => new Set(prev).add(userName));
      }
    };

    const handleUserStopTyping = ({ userId, conversationId: cId }) => {
      if (cId === conversationId) {
        setTypingUsers((prev) => {
          const updated = new Set(prev);
          updated.delete(userId);
          return updated;
        });
      }
    };

    socket.on('receive_message', handleNewMessage);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stop_typing', handleUserStopTyping);

    // CRITICAL: Cleanup to avoid duplicate listeners!
    return () => {
      socket.off('receive_message', handleNewMessage);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stop_typing', handleUserStopTyping);
    };
  }, [socket, conversationId, currentUser.id]);

  // 3. Handle Typing Input with Debounce
  const handleInputChange = (e) => {
    setInputText(e.target.value);

    if (!socket) return;

    // Emit typing event
    socket.emit('typing', { conversationId });

    // Clear previous timeout and set 2-second stop timer
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', { conversationId });
    }, 2000);
  };

  // 4. Send Message Handler
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !socket) return;

    socket.emit('send_message', {
      conversationId,
      text: inputText.trim(),
    });

    socket.emit('stop_typing', { conversationId });
    setInputText('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg) => {
          const isMe = msg.sender?._id === currentUser.id || msg.sender === currentUser.id;

          return (
            <div key={msg._id} className={\`flex gap-2 \${isMe ? 'justify-end' : 'justify-start'}\`}>
              {!isMe && (
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {msg.sender?.name?.[0] || 'U'}
                </div>
              )}
              <div
                className={\`max-w-[70%] p-3.5 rounded-2xl text-sm shadow-sm \${
                  isMe
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                }\`}
              >
                {!isMe && <p className="text-[10px] font-bold text-indigo-500 mb-1">{msg.sender?.name}</p>}
                <p className="leading-relaxed">{msg.text}</p>
                <p className={\`text-[9px] mt-1 text-right \${isMe ? 'text-indigo-200' : 'text-slate-400'}\`}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}

        {/* Typing Status Indicator */}
        {typingUsers.size > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic py-1 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>{Array.from(typingUsers).join(', ')} is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-2.5 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
\`\`\``,
        hi: `Complete React chat window component jisme auto-scroll, message send, typing indicator aur socket cleanup shamil hai:

\`\`\`jsx
// client/src/components/ChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

export default function ChatWindow({ conversationId, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    socket.emit('join_conversation', conversationId);

    const onMessage = (msg) => setMessages((prev) => [...prev, msg]);
    socket.on('receive_message', onMessage);

    // Cleanup taaki double listener na banein
    return () => socket.off('receive_message', onMessage);
  }, [socket, conversationId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    socket.emit('send_message', { conversationId, text });
    setText('');
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-2xl bg-slate-50 dark:bg-slate-900">
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((m) => (
          <div key={m._id} className={\`p-3 rounded-xl max-w-xs \${m.sender === currentUser.id ? 'ml-auto bg-indigo-600 text-white' : 'bg-white text-slate-800'}\`}>
            <p>{m.text}</p>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 bg-white flex gap-2 border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message likhein..."
          className="flex-1 p-2 border rounded-xl"
        />
        <button type="submit" className="px-4 bg-indigo-600 text-white rounded-xl">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
\`\`\``,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes and How to Avoid Them",
        hi: "Aam Galtiyan Aur Unka Sahi Solution",
      },
      body: {
        en: `### 1. Storing Only One \`socket.id\` per User
- **Mistake**: Using \`userSockets[userId] = socket.id\`.
- **Consequence**: When a user opens a second tab or logs in on both their phone and PC, the first device stops receiving live messages!
- **Fix**: Use \`Map<userId, Set<socketId>>\` and broadcast to all socket IDs in the Set.

### 2. Forgetting \`socket.off()\` in React Cleanup
- **Mistake**: Calling \`socket.on('receive_message', handler)\` inside \`useEffect\` without returning \`() => socket.off('receive_message', handler)\`.
- **Consequence**: Every time the component re-renders or updates state, another duplicate listener attaches. When 1 message arrives, the sound chimes 6 times and the message renders 6 times!
- **Fix**: Always unsubscribe inside the \`useEffect\` cleanup function.

### 3. Emitting Without Database Persistence
- **Mistake**: Emitting \`io.to(room).emit('receive_message', text)\` without calling \`await Message.create()\`.
- **Consequence**: Messages work live, but the moment a user refreshes the page, their entire chat history is permanently lost!
- **Fix**: Persist to MongoDB *before* emitting the socket event.`,
        hi: `### 1. Ek User Ka Sirf Ek Socket ID Save Karna
- **Galti**: \`userSocketMap.set(userId, socket.id)\` use karna.
- **Nuksan**: User ne doosre tab mein app kholi toh pehla tab disconnect ho jata hai.
- **Solution**: \`Set<socketId>\` use karein taaki user ke saare devices par message jaye.

### 2. React Mein \`socket.off()\` Cleanup Bhool Jana
- **Galti**: Listener lagana par cleanup na karna.
- **Nuksan**: Har re-render par duplicate listener judte jaate hain. Ek message aane par notification sound 5 baar bajti hai!
- **Solution**: Hamesha \`useEffect\` cleanup mein \`socket.off()\` call karein.

### 3. Database Mein Save Kiye Bina Emit Kar Dena
- **Galti**: Message ko sirf socket par broadcast karna, MongoDB mein save na karna.
- **Nuksan**: Page refresh karte hi saare messages gayab ho jaate hain.
- **Solution**: Pehle MongoDB mein save karein, phir emit karein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Production Best Practices",
        hi: "Production Best Practices & Scaling Tips",
      },
      body: {
        en: `1. **Scaling with Redis Adapter for Multiple Server Instances**:
   In production with 100,000 users across 4 Node.js server instances behind a load balancer, User A (connected to Server 1) cannot send a message to User B (connected to Server 2) via memory! Install **\`@socket.io/redis-adapter\`** so all instances communicate over Redis Pub/Sub.
2. **Debounce Typing Indicators**:
   Never emit a \`typing\` event on every single keypress. Emit once when the user begins typing, and set a 2000ms idle timer to emit \`stop_typing\`.
3. **Use Cursor Pagination for Message History**:
   Never load 5,000 messages on room open. Load the latest 30 messages, and fetch older chunks as the user scrolls up using \`_id < oldestMessageId\`.
4. **Clean Disconnect Cleanup**:
   Ensure disconnected socket IDs are purged from active memory maps to prevent memory leaks in long-running Node processes.`,
        hi: `1. **Multiple Servers Ke Liye Redis Adapter**:
   Jab 4 alag-alag server chal rahe hon, toh Server 1 ka user Server 2 ke user ko direct message nahi bhej sakta. **\`@socket.io/redis-adapter\`** lagayein taaki Redis Pub/Sub ke zariye saare servers aapas mein sync rahein.
2. **Typing Status Ko Debounce Karein**:
   Har single letter dabane par socket event mat bhejein; 2 second ka timer lagayein.
3. **Chat History Ke Liye Cursor Pagination**:
   Ek sath 10,000 messages load mat karein; sirf aakhri 30 laayein aur upar scroll karne par purane laayein.
4. **Memory Clean Rakhein**:
   Disconnect hone par socket ID ko map se delete karein taaki server RAM na bhare.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Interview Questions & In-Depth Answers",
        hi: "Interview Ke Zaroori Sawal Aur Jawab",
      },
      body: {
        en: `### Q1: How do you scale Socket.io horizontally across multiple server instances behind a load balancer?
**Answer**:
By default, Socket.io manages connected sockets in local server memory. If Server 1 and Server 2 run behind an AWS Application Load Balancer, a client connected to Server 1 cannot emit an event to a recipient connected to Server 2 because they have independent memory heaps.
To solve this:
1. **Sticky Sessions (Session Affinity)**: The load balancer must route subsequent HTTP polling handshakes to the same instance based on a cookie.
2. **The Socket.io Redis Adapter (\`@socket.io/redis-adapter\`)**: Replaces the in-memory adapter with a Redis Pub/Sub message broker. When Server 1 executes \`io.to(roomId).emit('msg')\`, the Redis adapter publishes the event to Redis. All other server instances subscribe to Redis, receive the packet, and forward it to their locally connected sockets in that room.

---

### Q2: Why is JWT socket authentication handled inside \`io.use()\` middleware rather than after connection inside \`socket.on('authenticate')\`?
**Answer**:
Authenticating inside \`io.use()\` executes during the initial WebSocket handshake upgrade HTTP request **before the TCP connection is officially accepted**.
If the token is invalid or expired, the middleware calls \`next(new Error('Unauthorized'))\`, cleanly aborting the connection without allocating server memory or socket descriptors.
In contrast, authenticating after connection allows an unauthenticated attacker to flood your server with millions of open TCP connections, exhausting file descriptors and causing a Denial of Service before authentication even takes place.

---

### Q3: How do you implement typing indicators without flooding the network with socket packets?
**Answer**:
If a user types at 60 words per minute, emitting an event on every keystroke fires ~5 events per second, causing extreme network chattiness.
Instead, use a **debounced state machine**:
1. When \`inputText\` changes, check a boolean \`isTypingRef\`.
2. If false, set it to true and emit a single \`typing\` event to the server.
3. Reset a 2000ms \`setTimeout\`. If no new keystrokes occur within 2 seconds, emit \`stop_typing\` and flip \`isTypingRef\` back to false. This drops socket traffic by over 90%.`,
        hi: `### Q1: Socket.io ko kayi servers par scale kaise karte hain (Load Balancer ke piche)?
**Answer**:
Default Socket.io connections ko server ki apni RAM mein rakhta hai. Agar Server 1 aur Server 2 chal rahe hon, toh Server 1 ka user Server 2 ke user ko message nahi bhej sakta.
Solution:
1. **Sticky Sessions**: Load balancer ko bolte hain ki ek user ki requests hamesha usi server par bheje.
2. **Redis Adapter (\`@socket.io/redis-adapter\`)**: Ye Redis Pub/Sub use karta hai. Server 1 jab message emit karta hai, toh Redis use saare servers ko broadcast kar deta hai aur har server apne users tak message pahuncha deta hai.

---

### Q2: Socket JWT authentication \`io.use()\` mein handshake ke dauran kyun karna chahiye?
**Answer**:
\`io.use()\` connection banne se pehle hi check kar leta hai. Agar token galat ho toh connection wahin cancel ho jata hai aur server ki RAM kharch nahi hoti.
Agar connection banne ke baad check karein, toh koi hacker lakhon nakli connections khol kar server ko crash kar sakta hai.

---

### Q3: Typing indicator se network flood hone se kaise rokte hain?
**Answer**:
Har letter type karne par event na bhej kar **2-second debounce timer** use karte hain:
Jaise hi user likhna shuru kare, 1 baar \`typing\` bhejein aur 2 second ka timer start karein. Agar 2 second tak koi button na dabe, toh \`stop_typing\` bhej dein. Isse 90% bekar network traffic ruk jata hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary",
        hi: "Quick Revision Summary",
      },
      body: {
        en: `- **Real-Time Messaging**: Built on full-duplex WebSockets using Socket.io and Express.
- **Handshake Security**: Authenticate JWTs inside \`io.use()\` before allocating TCP socket resources.
- **Multi-Device Support**: Use \`Map<userId, Set<socketId>>\` to track users with multiple open browser tabs.
- **Room Isolation**: Target messaging to specific conversations using \`socket.join(conversationId)\` and \`io.to()\`.
- **Database Durability**: Always persist messages in MongoDB before broadcasting events to room members.
- **Horizontal Scale**: Scale across multiple cloud instances using the Socket.io Redis Adapter.`,
        hi: `- **Real-Time Chat**: Full-duplex WebSockets aur Socket.io par chalta hai.
- **Handshake Security**: Connection banne se pehle \`io.use()\` mein JWT verify karein.
- **Multi-Device**: \`Map<userId, Set<socketId>>\` se ek user ke saare tabs par message deliver karein.
- **Rooms**: \`socket.join()\` aur \`io.to()\` se group aur 1-on-1 chats ko private rakhein.
- **Database Persistence**: Message ko emit karne se pehle MongoDB mein save karein.
- **Horizontal Scaling**: Kayi servers aapas mein jodne ke liye Redis Adapter use karein.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "Why should a user's active sockets be stored in a Set (e.g. Map<userId, Set<socketId>>) rather than a single string socketId?",
      "hi": "User ke active sockets ko single string ke badle Set (Map<userId, Set<socketId>>) mein kyun store karna chahiye?"
    },
    "options": [
      {
        "en": "Because Sets automatically encrypt data",
        "hi": "Kyunki Sets data encrypt karte hain"
      },
      {
        "en": "A user may open the application across multiple browser tabs, mobile phones, or desktop apps simultaneously; storing a Set ensures incoming messages are dispatched to all active devices of that user",
        "hi": "Ek user ek hi samay par kayi browser tabs ya mobile aur laptop dono par app chala sakta hai; Set mein rakhne se message us user ke saare devices par ek sath deliver hota hai"
      },
      {
        "en": "Because JavaScript does not allow storing strings in Maps",
        "hi": "Kyunki Maps mein string store nahi ho sakti"
      },
      {
        "en": "To decrease database size",
        "hi": "DB size kam karne ke liye"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "A user can have multiple concurrent socket connections across tabs and devices. A Set allows tracking all connections belonging to a single user ID, preventing dropped notifications.",
      "hi": "User ke kayi devices ho sakte hain. Set use karne se ek tab kholne par doosra tab disconnect nahi hota aur saari devices par live sync rehta hai."
    }
  },
  {
    "question": {
      "en": "What bug occurs if you omit socket.off('receive_message', handler) in the React useEffect cleanup function?",
      "hi": "React useEffect cleanup function mein socket.off('receive_message', handler) na lagane se kaunsa bug aata hai?"
    },
    "options": [
      {
        "en": "The monitor screen turns off",
        "hi": "Monitor screen band ho jaati hai"
      },
      {
        "en": "Duplicate event listeners accumulate on every component re-render, causing the callback to execute multiple times per message and creating memory leaks",
        "hi": "Har re-render par duplicate event listeners judte chale jaate hain jisse ek message aane par callback 5 baar chalta hai aur memory leak hota hai"
      },
      {
        "en": "The user is automatically logged out",
        "hi": "User logout ho jata hai"
      },
      {
        "en": "Socket.io switches to Bluetooth",
        "hi": "Socket.io Bluetooth par switch ho jata hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Without removing listeners in cleanup, each remount or re-render adds another listener to the singleton socket, multiplying message notifications.",
      "hi": "Cleanup na karne par har render par naya listener judta jata hai aur ek message aane par 5 baar sound bajti hai."
    }
  },
  {
    "question": {
      "en": "How does the Socket.io Redis Adapter enable scaling across multiple load-balanced server instances?",
      "hi": "Socket.io Redis Adapter kayi load-balanced server instances ke beech scaling kaise enable karta hai?"
    },
    "options": [
      {
        "en": "It replaces MongoDB with Redis",
        "hi": "Ye MongoDB ko Redis se replace kar deta hai"
      },
      {
        "en": "It uses Redis Pub/Sub as a shared message broker: when one server instance emits to a room, the Redis adapter relays the packet to all other instances so they can push to their locally connected sockets",
        "hi": "Ye Redis Pub/Sub ko message broker banata hai: jab ek server kisi room mein emit karta hai toh Redis saare doosre servers ko message bhej kar unke users tak deliver karwa deta hai"
      },
      {
        "en": "It automatically generates CSS files",
        "hi": "Ye CSS files generate karta hai"
      },
      {
        "en": "It doubles server network bandwidth",
        "hi": "Ye bandwidth double kar deta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "The Redis Adapter bridges the gap between independent server memories using Redis Pub/Sub, allowing room broadcasts to reach users connected across any cluster node.",
      "hi": "Redis Pub/Sub saare servers ko aapas mein jod deta hai jisse Server 1 ka user Server 4 ke user se real-time baat kar sakta hai."
    }
  },
  {
    "question": {
      "en": "Why should message records be saved in MongoDB before broadcasting them via io.to(roomId).emit()?",
      "hi": "Messages ko io.to(roomId).emit() karne se pehle MongoDB mein save karna kyun zaroori hai?"
    },
    "options": [
      {
        "en": "Because Socket.io will refuse to emit without a database ID",
        "hi": "Kyunki Socket.io database ID ke bina emit nahi karta"
      },
      {
        "en": "To guarantee message persistence: if the server reboots or a user refreshes their browser, the full chat history remains permanent and retrievable",
        "hi": "Message persistence pakka karne ke liye: taaki server reboot hone ya page refresh hone par poori chat history hamesha ke liye safe rahe"
      },
      {
        "en": "To compress the message text",
        "hi": "Message text compress karne ke liye"
      },
      {
        "en": "Because MongoDB requires real-time sockets",
        "hi": "Kyunki MongoDB ko real-time sockets chahiye"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Socket events are ephemeral memory packets. Persisting to MongoDB ensures data durability, audit trails, and the ability to load historical chats for offline users.",
      "hi": "Socket events RAM mein temporary hote hain. Database mein save karne se purani chat hamesha ke liye safe rehti hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Project 4: Real-Time Chat Application with Socket.io in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Project 4: Real-Time Chat App with Socket.io & Online Presence ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling project 4: real-time chat application with socket.io with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Project 4: Real-Time Chat App with Socket.io & Online Presence ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Project 4: Real-Time Chat Application with Socket.io establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Project 4: Real-Time Chat Application with Socket.io directly resolve?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Project 4: Real-Time Chat Application with Socket.io, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Project 4: Real-Time Chat Application with Socket.io, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Project 4: Real-Time Chat Application with Socket.io, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Project 4: Real-Time Chat Application with Socket.io?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Project 4: Real-Time Chat Application with Socket.io be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Project 4: Real-Time Chat App with Socket.io & Online Presence ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Project 4: Real-Time Chat Application with Socket.io impact application memory and CPU consumption?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Project 4: Real-Time Chat Application with Socket.io?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Project 4: Real-Time Chat Application with Socket.io?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Project 4: Real-Time Chat Application with Socket.io?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Project 4: Real-Time Chat Application with Socket.io, what must the test suite assert?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Project 4: Real-Time Chat Application with Socket.io?",
      "hi": "Modular design Project 4: Real-Time Chat App with Socket.io & Online Presence mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Project 4: Real-Time Chat Application with Socket.io be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Project 4: Real-Time Chat App with Socket.io & Online Presence ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Project 4: Real-Time Chat Application with Socket.io properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Project 4: Real-Time Chat App with Socket.io & Online Presence kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Project 4: Real-Time Chat Application with Socket.io in production?",
      "hi": "Production mein Project 4: Real-Time Chat App with Socket.io & Online Presence ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Project 4: Real-Time Chat Application with Socket.io?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Project 4: Real-Time Chat Application with Socket.io?",
      "hi": "Project 4: Real-Time Chat App with Socket.io & Online Presence mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
