export default {
  id: "proj-ecommerce",
  title: {
    en: "Project 3: E-Commerce Store with Cart & Stripe Payments",
    hi: "Project 3: E-Commerce Store with Cart & Stripe Payments",
  },
  difficulty: "Advanced",
  readTime: 19,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. Enterprise E-Commerce Architecture & The Zero-Trust Security Rule",
        hi: "1. Enterprise E-Commerce Architecture Aur Zero-Trust Security Ka Niyam",
      },
      body: {
        en: `Building a real-world E-Commerce platform (Amazon, Flipkart, or Shopify clone) is one of the most rewarding and technically demanding achievements in full-stack engineering. 

Unlike content sites, an e-commerce platform directly handles financial transactions, inventory counts, and customer credit cards. A single architectural loophole can cause catastrophic revenue loss or fraudulent checkout exploitation.

### The #1 Golden Rule of E-Commerce Security:
> [!CAUTION]
> **NEVER TRUST PRICES OR TOTAL AMOUNTS SENT FROM THE CLIENT!**
> If your checkout endpoint accepts \`{ productId: '123', price: 999, quantity: 1 }\`, an attacker can open Chrome DevTools, edit the JavaScript payload to \`{ price: 1 }\`, and purchase an iPhone 15 Pro for ₹1!

\`\`\`
[ React Client ]
       │ 1. Sends ONLY Product IDs & Quantities: [{ id: "p1", qty: 2 }]
       ▼
[ Express Server ]
       │ 2. Queries MongoDB to fetch AUTHORITATIVE prices ($499 each)
       │ 3. Calculates Total ($998) strictly on the server!
       │ 4. Calls Stripe API to create Checkout Session
       ▼
[ Stripe Hosted Checkout ]
       │ 5. Customer enters credit card securely on Stripe's PCI-compliant vault
       ▼
[ Stripe Cloud Webhook Engine ]
       │ 6. Dispatches signed POST event: 'checkout.session.completed'
       ▼
[ Express Webhook Route ]
       │ 7. Verifies cryptographic signature using STRIPE_WEBHOOK_SECRET
       │ 8. Decrements MongoDB inventory atomically ($inc: { stock: -2 })
       │ 9. Marks Order as 'isPaid: true' in database
\`\`\``,
        hi: `Ek real-world E-Commerce store (jaise Amazon ya Flipkart) banana ek advanced full-stack engineer ka sabse zaroori portfolio project hota hai.

Isme financial transactions, stock management aur payment gateways shamil hote hain. Yahan ek choti si galti bhi lakhon ka nuksan kar sakti hai.

### E-Commerce Security Ka Sabse Bada Sunehra Niyam:
> [!CAUTION]
> **CLIENT SE AANE WALE PRICE PAR KABHI BHAROSA NA KAREIN!**
> Agar aapka backend client se aane wala price accept karta hai, toh koi bhi hacker Chrome DevTools khol kar ₹80,000 ke phone ka price badal kar ₹1 kar dega aur ₹1 mein order place kar lega!

### Sahi Payment Architecture:
1. **Frontend sirf Product IDs aur Quantity bhejta hai**: \`[{ id: "prod_1", qty: 2 }]\`. Price frontend se kabhi nahi jata!
2. **Backend MongoDB se asli price uthata hai**: Server khud calculate karta hai ki 2 items ka total kitna hua.
3. **Stripe Checkout Session**: Server Stripe se link banwata hai.
4. **Stripe Webhook (Asli Confirmation)**: Jab customer successfully payment kar deta hai, toh Stripe ka server hamare backend ko ek secure cryptographic webhook bhejta hai. Us webhook ke aane par hi database mein order "Paid" mark hota hai aur stock ghat ta hai!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Critical Webhook Architecture & Race-Condition Inventory Decrement",
        hi: "2. Stripe Webhook Architecture Aur Race-Condition Stock Protection",
      },
      body: {
        en: `Many novice developers make the fatal mistake of fulfilling orders on the **Frontend Success Redirect** (\`success_url: https://myapp.com/success?session_id=...\`).

### Why Redirect Fulfillment is Broken:
1. **Network Drops**: After entering their card details on Stripe, the user's mobile battery dies or their Wi-Fi drops before the browser can redirect back to your website. The customer's credit card was charged $500, but your database never created their order!
2. **URL Spoofing**: An attacker simply navigates directly to \`https://myapp.com/success\` in their browser, tricking your app into giving them free digital goods without paying!

---

### The Solution: Cryptographic Stripe Webhooks
Stripe Webhooks operate **server-to-server** independently of the customer's browser:
- Stripe's cloud servers send an HTTP \`POST\` request directly to your Express endpoint \`/api/webhook\`.
- Stripe includes a cryptographic signature header: **\`stripe-signature\`**.
- Your server verifies this signature using your secret **\`STRIPE_WEBHOOK_SECRET\`**. If a hacker tries to forge a fake payment event, signature verification fails and the request is rejected with a \`400 Bad Request\`!

### Atomic Concurrency Guard for Inventory
What happens if two users attempt to buy the **very last item in stock** at the exact same second?
Naive code:
\`\`\`javascript
// BROKEN: Suffers from race conditions!
const product = await Product.findById(id);
if (product.stock >= qty) {
  product.stock -= qty;
  await product.save();
}
\`\`\`
Both requests read \`stock = 1\` simultaneously. Both pass the condition, and both subtract 1, leaving \`stock = -1\` (overselling!).

**The Production Fix (Atomic Concurrency Guard)**:
\`\`\`javascript
// ATOMIC & RACE-CONDITION SAFE:
const updatedProduct = await Product.findOneAndUpdate(
  { _id: productId, stock: { $gte: qty } }, // Query matches ONLY if stock is sufficient!
  { $inc: { stock: -qty } },                // Atomic decrement at the database engine level
  { new: true }
);
if (!updatedProduct) {
  throw new Error('Item went out of stock during checkout!');
}
\`\`\``,
        hi: `Kayi naye developers payment hote hi redirect page (\`success_url\`) par order confirm kar dete hain. Ye sabse bada blunder hai!

### Redirect Par Order Confirm Karna Kyun Galat Hai?
1. **Internet Disconnect**: Customer ke paise kat gaye, lekin bank page se aapki site par redirect hone se pehle uska internet chala gaya ya battery khatam ho gayi. Paise kat gaye par order nahi bana!
2. **Fake URL Visit**: Koi bhi hacker direct \`/success\` URL type karke bina payment kiye free mein order claim kar lega.

---

### Sahi Rasta: Cryptographic Stripe Webhook
Stripe Webhook **server-to-server** chalta hai, customer ke mobile se iska koi lena-dena nahi hota:
- Stripe ka server seedha hamare backend API ko \`POST\` request bhejta hai.
- Stripe har request ke sath ek digital signature (\`stripe-signature\`) bhejta hai jise hum apne secret se verify karte hain taaki koi nakli request na bhej sake.

### Stock Overselling Bug Aur Atomic Solution:
Agar dukaan mein aakhri 1 shirt bachi ho aur 2 log ek hi second par "Buy Now" daba dein, toh normal code dono ko shirt bech deta hai aur stock \`-1\` ho jata hai!
Isse bachne ke liye **Atomic Concurrency Guard** use karte hain:
\`\`\`javascript
// Database level par atomic check aur decrement:
const product = await Product.findOneAndUpdate(
  { _id: productId, stock: { $gte: qty } }, // Stock hone par hi update hoga
  { $inc: { stock: -qty } }                 // Ek sath bina race condition ke minus
);
\`\`\``,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The Indian Departmental Store (Big Bazaar / DMart)",
        hi: "Real-Life Analogy: DMart / Big Bazaar Shopping Ka Real Model",
      },
      body: {
        en: `Imagine shopping at a massive DMart or Big Bazaar supermarket in Mumbai:

- **The Shopping Trolley (The Redux Toolkit Cart)**:
  You walk through the aisles, picking up biscuits, basmati rice, and cooking oil, dropping them into your wire shopping cart. The cart keeps track of items while you browse (**Client-side Redux state saved in localStorage**).
- **The Customer Handwritten Sticker (The Client Price Tampering Trap)**:
  Suppose DMart allowed customers to take a red sketch pen, write *"Price: ₹5"* on a bottle of olive oil, and bring it to the cash counter. The store would go bankrupt in 2 hours!
- **The Laser Barcode Scanner (Server-Side Price Verification)**:
  Instead, the cashier completely ignores anything written on the box. She zaps the barcode. The cash register machine queries DMart's central master inventory database (**Server-Side Product Query**), fetching the official price.
- **The Bank Card POS Machine (Stripe Hosted Checkout)**:
  You tap your credit card on the ICICI bank terminal. The bank verifies your chip and PIN inside their secure banking network.
- **The Stamped Security Invoice (The Cryptographic Stripe Webhook)**:
  The card machine prints an encrypted authorization slip stamped by the bank. The cashier staples this verified receipt onto your bag (**Stripe Webhook signature verified**), and the warehouse inventory computer automatically deducts the items from the stock ledger (**Atomic Stock Decrement**). Safe, tamper-proof, and audit-ready!`,
        hi: `DMart supermarket mein shopping karne ka example dekhein:

- **Shopping Trolley (Redux Cart)**:
  Aap store mein ghoomte hain aur trolley mein chips, tel aur chawal daalte hain. Trolley sirf temporary samaan pakadti hai (**Redux State**).
- **Price Ka Khel (Client Price Tampering)**:
  Sochiye agar DMart bole ki customer khud pen se price likh kar counter par le aaye. Log ₹2,000 ke ghee ke dabbe par pen se ₹10 likh denge aur store lut jayega!
- **Barcode Scanner (Server-Side Price Lookup)**:
  Cashier customer ki baat nahi sunti; wo barcode scan karti hai jo central server se official price nikalta hai (**MongoDB Price Query**).
- **Card Swiping Machine (Stripe Checkout)**:
  Customer bank ki secure machine par card tap karke payment karta hai.
- **Security Guard Ka Thappa (Stripe Webhook)**:
  Bank se payment complete hone ka official computerized slip nikalta hai. Manager receipt verify karke stamp lagata hai (**Webhook Verification**) aur warehouse ke computer mein stock \`-1\` ho jata hai (**Atomic Decrement**).`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Stripe SDK Installation & Raw Body Parser Setup",
        hi: "Stripe SDK Install Karna Aur Raw Body Parser Ka Setup",
      },
      body: {
        en: `Install Stripe's official Node.js SDK:
\`\`\`bash
npm install stripe
\`\`\`

> [!IMPORTANT]
> **CRITICAL SETUP RULE FOR STRIPE WEBHOOKS**:
> The Stripe webhook signature verification function (\`stripe.webhooks.constructEvent\`) requires the **RAW, UNMODIFIED byte buffer** of the incoming request body!
> If your Express server applies \`express.json()\` globally **before** the webhook route, Express parses the body into an object, altering whitespace and character encodings. This causes signature verification to **fail 100% of the time** with \`Webhook signature verification failed\`!
> 
> **The Fix**: Mount the webhook route using \`express.raw({ type: 'application/json' })\` **BEFORE** your global \`express.json()\` middleware!

\`\`\`javascript
// server/server.js
import express from 'express';
import { handleStripeWebhook } from './controllers/orderController.js';

const app = express();

// 1. Stripe Webhook MUST receive raw buffer (BEFORE express.json!)
app.post(
  '/api/orders/webhook',
  express.raw({ type: 'application/json' }),
  handleStripeWebhook
);

// 2. All subsequent routes use normal JSON parser
app.use(express.json());
\`\`\``,
        hi: `Stripe ka official package install karein:
\`\`\`bash
npm install stripe
\`\`\`

> [!IMPORTANT]
> **Stripe Webhook Ka Sabse Zaroori Niyam**:
> Stripe ke cryptographic signature ko verify karne ke liye raw, unmodified bytes chahiye hote hain.
> Agar aap \`app.use(express.json())\` ko webhook se pehle laga denge, toh Express JSON ko parse karke uske spaces badal dega aur Stripe verification **hamesha fail ho jayega**!
> 
> **Solution**: Webhook route par \`express.raw({ type: 'application/json' })\` lagayein aur use \`express.json()\` se **PEHLE** mount karein!`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Server-Side Price Verification & Stripe Session Creator",
        hi: "Example 1: Server-Side Price Verification Aur Stripe Session Banana",
      },
      body: {
        en: `Here is the \`createCheckoutSession\` controller. It reads product IDs from the client, queries authoritative prices directly from MongoDB, creates the pending order, and returns Stripe's hosted checkout URL:

\`\`\`javascript
// server/controllers/orderController.js
import Stripe from 'stripe';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;
    // items format: [{ productId: '64f89b12a', quantity: 2 }]

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart cannot be empty' });
    }

    // 1. Fetch authoritative product documents from MongoDB
    const productIds = items.map((i) => i.productId);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    // Map for O(1) lookup
    const productMap = new Map(dbProducts.map((p) => [p._id.toString(), p]));

    // 2. Validate stock and build Stripe line_items using SERVER-SIDE prices!
    const lineItems = [];
    const orderItems = [];
    let calculatedTotal = 0;

    for (const item of items) {
      const dbProduct = productMap.get(item.productId);

      if (!dbProduct) {
        return res.status(404).json({ success: false, message: \`Product \${item.productId} not found\` });
      }

      if (dbProduct.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: \`Insufficient stock for "\${dbProduct.title}". Only \${dbProduct.stock} left.\`,
        });
      }

      calculatedTotal += dbProduct.price * item.quantity;

      orderItems.push({
        product: dbProduct._id,
        title: dbProduct.title,
        price: dbProduct.price, // Server price!
        quantity: item.quantity,
        image: dbProduct.images?.[0] || '',
      });

      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: {
            name: dbProduct.title,
            images: dbProduct.images?.length ? [dbProduct.images[0]] : [],
          },
          unit_amount: Math.round(dbProduct.price * 100), // Stripe expects amounts in smallest unit (paise/cents)!
        },
        quantity: item.quantity,
      });
    }

    // 3. Create initial pending Order in MongoDB
    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      totalAmount: calculatedTotal,
      isPaid: false,
      status: 'pending',
    });

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: req.user.email,
      client_reference_id: order._id.toString(), // Attaches our MongoDB Order ID to Stripe!
      success_url: \`\${process.env.CLIENT_URL}/order/success?session_id={CHECKOUT_SESSION_ID}\`,
      cancel_url: \`\${process.env.CLIENT_URL}/cart\`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      checkoutUrl: session.url,
      orderId: order._id,
    });
  } catch (error) {
    next(error);
  }
};
\`\`\``,
        hi: `Complete checkout controller jisme client se sirf IDs aati hain, price MongoDB se uthaya jata hai, aur Stripe session banta hai:

\`\`\`javascript
// server/controllers/orderController.js
import Stripe from 'stripe';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { items, shippingAddress } = req.body;

    // 1. MongoDB se real products mangwayein
    const productIds = items.map((i) => i.productId);
    const dbProducts = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(dbProducts.map((p) => [p._id.toString(), p]));

    const lineItems = [];
    const orderItems = [];
    let calculatedTotal = 0;

    for (const item of items) {
      const p = productMap.get(item.productId);
      if (!p || p.stock < item.quantity) {
        return res.status(400).json({ success: false, message: 'Stock kam hai!' });
      }

      calculatedTotal += p.price * item.quantity;
      orderItems.push({ product: p._id, title: p.title, price: p.price, quantity: item.quantity });

      // Stripe ke liye line item (paise/cents mein)
      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: { name: p.title },
          unit_amount: Math.round(p.price * 100),
        },
        quantity: item.quantity,
      });
    }

    // 2. Database mein Pending order banayein
    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      totalAmount: calculatedTotal,
      isPaid: false,
    });

    // 3. Stripe Checkout Session banayein
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      client_reference_id: order._id.toString(),
      success_url: \`\${process.env.CLIENT_URL}/order/success\`,
      cancel_url: \`\${process.env.CLIENT_URL}/cart\`,
    });

    return res.status(200).json({ success: true, url: session.url });
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
        en: "Example 2: Cryptographic Stripe Webhook Handler with Atomic Stock Decrement",
        hi: "Example 2: Stripe Webhook Listener (Signature Verification & Atomic Stock)",
      },
      body: {
        en: `This is the mission-critical webhook controller that fulfills orders upon receiving Stripe's cryptographically signed payment event:

\`\`\`javascript
// server/controllers/webhookController.js
import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // 1. Verify cryptographic signature using raw byte buffer
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook Signature Verification Failed:', err.message);
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  // 2. Handle specific event type
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.client_reference_id;

    console.log(\`💰 Payment confirmed by Stripe for Order: \${orderId}\`);

    try {
      const order = await Order.findById(orderId);
      if (!order) {
        console.error(\`Order \${orderId} not found in database!\`);
        return res.status(200).json({ received: true });
      }

      // Check idempotency: If already marked paid, skip fulfillment!
      if (order.isPaid) {
        return res.status(200).json({ received: true, message: 'Order already fulfilled' });
      }

      // 3. Atomically decrement inventory for all items in order
      for (const item of order.orderItems) {
        await Product.findOneAndUpdate(
          { _id: item.product, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } }
        );
      }

      // 4. Mark Order as Paid
      order.isPaid = true;
      order.paidAt = new Date();
      order.status = 'processing';
      order.paymentResult = {
        id: session.payment_intent,
        status: session.payment_status,
        email: session.customer_details?.email,
      };

      await order.save();
      console.log(\`✅ Order \${orderId} successfully fulfilled!\`);
    } catch (dbErr) {
      console.error('Database update error during webhook fulfillment:', dbErr);
      // Still return 200 so Stripe does not spam retry loops if it is an app-level bug
      return res.status(500).json({ error: 'Fulfillment failed' });
    }
  }

  // Return a 200 response to acknowledge receipt of the event to Stripe
  return res.status(200).json({ received: true });
};
\`\`\``,
        hi: `Stripe ka secure webhook controller jo payment hote hi order ko "Paid" karta hai aur stock minus karta hai:

\`\`\`javascript
// server/controllers/webhookController.js
import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // 1. Signature verify karein
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(\`Webhook Error: \${err.message}\`);
  }

  // 2. Payment complete hone par
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.client_reference_id;

    const order = await Order.findById(orderId);
    if (order && !order.isPaid) {
      // 3. Atomic stock decrement
      for (const item of order.orderItems) {
        await Product.findOneAndUpdate(
          { _id: item.product, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } }
        );
      }

      // 4. Order mark as paid
      order.isPaid = true;
      order.paidAt = new Date();
      await order.save();
      console.log('✅ Order paid and stock updated!');
    }
  }

  return res.status(200).json({ received: true });
};
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Redux Toolkit Cart Slice with LocalStorage Persistence",
        hi: "Example 3: Redux Toolkit Cart Slice (LocalStorage Sync Aur Selectors)",
      },
      body: {
        en: `Here is the production Redux Toolkit \`cartSlice.js\` managing items, quantity adjustments, localStorage persistence, and memoized cost selectors:

\`\`\`javascript
// client/src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load initial state from browser localStorage if available
const savedCart = localStorage.getItem('mern_cart');
const initialState = savedCart
  ? JSON.parse(savedCart)
  : { items: [], shippingAddress: {} };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; // { productId, title, price, image, stock, quantity }
      const existingIndex = state.items.findIndex((i) => i.productId === newItem.productId);

      if (existingIndex >= 0) {
        // Enforce maximum stock limit
        const currentQty = state.items[existingIndex].quantity;
        const availableStock = newItem.stock || state.items[existingIndex].stock;
        state.items[existingIndex].quantity = Math.min(availableStock, currentQty + (newItem.quantity || 1));
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }

      localStorage.setItem('mern_cart', JSON.stringify(state));
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.productId === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== productId);
        } else {
          item.quantity = Math.min(item.stock, quantity);
        }
      }

      localStorage.setItem('mern_cart', JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      localStorage.setItem('mern_cart', JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('mern_cart');
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('mern_cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, saveShippingAddress } = cartSlice.actions;

// Memoized Selectors for Cart Totals
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((acc, i) => acc + i.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

export default cartSlice.reducer;
\`\`\``,
        hi: `Redux Toolkit ka complete \`cartSlice.js\` jisme add to cart, quantity update, aur localStorage persistence shamil hai:

\`\`\`javascript
// client/src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const saved = localStorage.getItem('mern_cart');
const initialState = saved ? JSON.parse(saved) : { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.productId === item.productId);

      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      localStorage.setItem('mern_cart', JSON.stringify(state));
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((i) => i.productId !== productId);
      } else {
        const item = state.items.find((i) => i.productId === productId);
        if (item) item.quantity = quantity;
      }
      localStorage.setItem('mern_cart', JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('mern_cart');
    },
  },
});

export const { addToCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartSubtotal = (state) => state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export default cartSlice.reducer;
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
        en: `### 1. Trusting Client-Supplied Product Prices
- **Mistake**: Calculating the Stripe line item total using \`req.body.price\`.
- **Consequence**: An attacker edits the price parameter in their browser network tab from ₹50,000 to ₹1, paying ₹1 on Stripe and receiving your expensive merchandise.
- **Fix**: Never accept price from the client. Look up prices in MongoDB server-side.

### 2. Using \`express.json()\` on the Stripe Webhook Route
- **Mistake**: Mounting \`app.use(express.json())\` before the Stripe webhook route.
- **Consequence**: Express parses the raw payload into a JavaScript object, altering binary whitespace. Stripe's \`constructEvent()\` fails with an invalid signature error on every payment!
- **Fix**: Use \`express.raw({ type: 'application/json' })\` exclusively for the webhook route.

### 3. Fulfilling Orders on Frontend Redirect
- **Mistake**: Updating the order to \`isPaid = true\` inside the React \`/order/success\` page component.
- **Consequence**: If a user's phone turns off during bank checkout, they get charged but get no order. If a user guesses the success URL, they get free orders.
- **Fix**: Only fulfill orders inside the verified Stripe Webhook listener.`,
        hi: `### 1. Client Ke Bheje Hue Price Par Bharosa Karna
- **Galti**: \`req.body.price\` use karke Stripe session banana.
- **Nuksan**: Hacker Inspect Element mein price ₹1 kar dega aur ₹1 mein mehenga phone kharid lega.
- **Solution**: Hamesha MongoDB se server-side price check karein.

### 2. Stripe Webhook Par \`express.json()\` Laga Dena
- **Galti**: Webhook route se pehle \`express.json()\` chalana.
- **Nuksan**: Express raw binary bytes ko modify kar deta hai jisse Stripe signature verification hamesha fail ho jata hai.
- **Solution**: Webhook route par \`express.raw()\` use karein.

### 3. Frontend Redirect Par Order Confirm Karna
- **Galti**: React ke \`/success\` page load hone par order ko "Paid" mark karna.
- **Nuksan**: Internet aate-jaate hi order miss ho jata hai aur koi bhi direct URL daal kar free samaan le sakta hai.
- **Solution**: Sirf aur sirf verified Stripe Webhook aane par hi order confirm karein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Production Best Practices",
        hi: "Production Best Practices & Pro Tips",
      },
      body: {
        en: `1. **Enforce Payment Idempotency**:
   Stripe webhooks can occasionally deliver duplicate events if your server takes more than 3 seconds to respond. Store \`session.payment_intent\` in the order. If \`order.isPaid === true\`, immediately return \`res.status(200)\` without executing duplicate stock deductions!
2. **Convert Currency to Smallest Denomination**:
   Stripe requires amounts in **cents / paise** (integers). ₹499 must be sent as \`49900\` (\`Math.round(price * 100)\`). Floating point math can introduce precision errors (\`499.00000000002\`), so always use \`Math.round()\`.
3. **Use Atomic \`$inc\` with Concurrency Guards**:
   Always decrement stock using \`findOneAndUpdate({ _id, stock: { $gte: qty } }, { $inc: { stock: -qty } })\` to eliminate race conditions under concurrent checkouts.
4. **Clean Redux State on Order Completion**:
   Dispatch \`clearCart()\` once the user completes checkout to empty their browser shopping trolley.`,
        hi: `1. **Idempotency Check Lagayein**:
   Stripe kabhi-kabhi same webhook 2 baar bhej deta hai. Hamesha check karein: agar \`order.isPaid\` pehle se \`true\` hai, toh dobara stock minus na karein.
2. **Paise/Cents Mein Convert Karein**:
   Stripe amount ko paise mein maangta hai. ₹499 ko \`Math.round(price * 100)\` karke \`49900\` bhejein.
3. **Atomic Stock Decrement**:
   Hamesha \`$inc: { stock: -qty }\` ke sath \`stock: { $gte: qty }\` condition lagayein taaki 2 log ek sath aakhri item na kharid sakein.
4. **Order Hone Par Cart Khali Karein**:
   Payment hone ke baad Redux mein \`clearCart()\` dispatch karein taaki shopping trolley khali ho jaye.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Interview Questions & In-Depth Answers",
        hi: "Interview Ke Zaroori Sawal Aur Jawab",
      },
      body: {
        en: `### Q1: Why should you never accept the product price or order total from the client request body?
**Answer**:
The client environment (the browser) is completely untrusted. Any data originating from the client can be inspected, intercepted, and altered using browser DevTools, browser extensions, or HTTP proxies (like Postman or Burp Suite).
If the server relies on \`req.body.totalAmount\` to bill the user, an attacker can modify the price of a $1,000 laptop to $1.
In a secure e-commerce architecture, the client transmits **only the product identifier and desired quantity** (\`[{ productId, quantity }]\`). The backend queries its own authoritative MongoDB collection to extract the legitimate prices, computes the sum, taxes, and shipping server-side, and generates the payment intent.

---

### Q2: How does Stripe Webhook cryptographic signature verification work?
**Answer**:
When Stripe dispatches a webhook event to your server, it computes an HMAC SHA-256 signature using the raw event payload and your secret **\`STRIPE_WEBHOOK_SECRET\`**. Stripe attaches this hash along with a timestamp to the **\`stripe-signature\`** header.
On your Express server, the Stripe SDK recomputes the HMAC SHA-256 hash using the raw incoming request buffer and the secret, comparing it against the header signature.
- If the signatures match, it proves two things: the payload was genuinely sent by Stripe, and it was not intercepted or altered in transit (replay attack prevention via the timestamp).
- If the signature verification fails, the server drops the request immediately.

---

### Q3: How do you prevent inventory overselling (race conditions) when multiple customers checkout the last remaining item simultaneously?
**Answer**:
A traditional read-then-write approach (\`find()\` followed by \`save()\`) creates a race condition: two concurrent threads read \`stock = 1\`, both pass the validation check, and both decrement the stock, causing negative inventory.
To prevent this:
1. Use **Atomic Updates with Query Pre-conditions**:
   \`\`\`javascript
   const res = await Product.findOneAndUpdate(
     { _id: productId, stock: { $gte: quantity } },
     { $inc: { stock: -quantity } },
     { new: true }
   );
   \`\`\`
   MongoDB locks the document at the WiredTiger storage engine level during the atomic update. Only the first transaction finds \`stock >= quantity\` and decrements it to 0. The second transaction immediately finds \`stock = 0\`, matches zero documents, returns null, and throws an "Out of stock" error.
2. In multi-document orders, wrap all items in a **MongoDB Multi-Document ACID Transaction** (\`session.withTransaction()\`) so if item #3 is out of stock, items #1 and #2 roll back automatically.`,
        hi: `### Q1: Client se aane wale product price par bharosa kyun nahi karna chahiye?
**Answer**:
Client-side code (browser) hacker ke poore control mein hota hai. Hacker Inspect Element ya Postman se payload badal kar ₹50,000 ke laptop ka price ₹1 kar sakta hai.
Isliye frontend se sirf \`productId\` aur \`quantity\` mangwayi jaati hai. Asli price backend apne database se nikal kar khud total calculate karta hai.

---

### Q2: Stripe Webhook cryptographic signature verification kaise kaam karta hai?
**Answer**:
Stripe webhook bhejte waqt raw payload aur aapke \`STRIPE_WEBHOOK_SECRET\` ko milakar ek HMAC SHA-256 hash banata hai aur use \`stripe-signature\` header mein bhejta hai.
Hamara server raw buffer aur secret se dobara wahi hash banata hai. Agar dono match hote hain, toh prove ho jata hai ki ye sach mein Stripe ne hi bheja hai aur raste mein kisi ne data modify nahi kiya.

---

### Q3: Aakhri bachi hui item ko 2 log ek sath kharidne par stock overselling kaise rokte hain?
**Answer**:
Agar hum pehle \`find()\` karein aur phir \`save()\`, toh dono requests ko \`stock = 1\` dikhega aur dono kharid lenge (stock \`-1\` ho jayega).
Iska solution hai **Atomic Update with Pre-condition**:
\`Product.findOneAndUpdate({ _id, stock: { $gte: qty } }, { $inc: { stock: -qty } })\`.
MongoDB database engine level par lock lagata hai. Pehle bande ka update hone par stock 0 ho jata hai. Doosre bande ki query \`stock >= qty\` condition match hi nahi kar pati aur null return ho jata hai, jisse overselling impossible ho jaati hai.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary",
        hi: "Quick Revision Summary",
      },
      body: {
        en: `- **Zero-Trust Security**: Never trust client-supplied prices; always look up prices in MongoDB server-side.
- **Stripe Webhooks**: Fulfill orders only upon verified server-to-server webhook events, never on client success redirects.
- **Raw Body Parser**: Webhook routes strictly require \`express.raw({ type: 'application/json' })\` mounted before \`express.json()\`.
- **Atomic Concurrency**: Use \`findOneAndUpdate\` with \`$inc: { stock: -qty }\` and \`stock: { $gte: qty }\` to eliminate race-condition overselling.
- **Redux Toolkit**: Manage client shopping carts with quantity constraints and \`localStorage\` persistence.
- **Idempotency**: Verify \`order.isPaid\` before fulfilling to prevent duplicate stock deductions on retried webhooks.`,
        hi: `- **Zero-Trust Rule**: Client se aane wale price par bharosa na karein; price hamesha database se calculate karein.
- **Stripe Webhooks**: Order confirm sirf verified webhook se karein, frontend redirect par nahi.
- **Raw Body Parser**: Webhook route par \`express.raw()\` lagana zaroori hai signature verification ke liye.
- **Atomic Stock Protection**: \`$inc: { stock: -qty }\` aur \`stock: { $gte: qty }\` se overselling rokein.
- **Redux Cart**: Shopping trolley ko Redux Toolkit aur \`localStorage\` se sync rakhein.
- **Idempotency**: Webhook repeat hone par duplicate order fulfill na ho isliye \`isPaid\` check lagayein.`,
      },
    },
  ],
  quiz: [
  {
    "question": {
      "en": "Why is fulfilling an e-commerce order on the frontend redirect page (success_url) considered a fatal architectural flaw?",
      "hi": "Frontend redirect page (success_url) par order confirm karna ek fatal architectural flaw kyun mana jata hai?"
    },
    "options": [
      {
        "en": "Because React does not allow payments",
        "hi": "Kyunki React payments allow nahi karta"
      },
      {
        "en": "If the user closes the tab, loses network, or suffers battery death after paying on Stripe, the redirect never fires (charging the customer with no order created); additionally, malicious users can spoof the URL",
        "hi": "Agar user payment ke baad tab band kar de ya internet chala jaye toh redirect kabhi nahi chalega (paise kat jayenge par order nahi banega); aur koi bhi nakli URL visit karke free order claim kar sakta hai"
      },
      {
        "en": "Because Stripe charges a 50% penalty on redirects",
        "hi": "Kyunki Stripe 50% penalty lagata hai"
      },
      {
        "en": "Because MongoDB only accepts webhook connections",
        "hi": "Kyunki MongoDB sirf webhooks accept karta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Client redirects are unreliable and client-controlled. Webhooks provide reliable, asynchronous server-to-server confirmation guaranteed by Stripe's retry infrastructure.",
      "hi": "Frontend redirect par bharosa nahi kiya ja sakta. Stripe Webhook server-to-server chalta hai aur internet disconnect hone par bhi order 100% reliably fulfill karta hai."
    }
  },
  {
    "question": {
      "en": "Why must express.raw({ type: 'application/json' }) be used on the Stripe webhook endpoint instead of express.json()?",
      "hi": "Stripe webhook endpoint par express.json() ke badle express.raw({ type: 'application/json' }) kyun use kiya jata hai?"
    },
    "options": [
      {
        "en": "Because Stripe sends raw XML",
        "hi": "Kyunki Stripe XML bhejta hai"
      },
      {
        "en": "Stripe's cryptographic signature verification (constructEvent) requires the exact raw byte buffer of the payload; express.json() parses and alters whitespace, causing signature verification to fail 100% of the time",
        "hi": "Stripe ka cryptographic signature verification (constructEvent) exact raw byte buffer maangta hai; express.json() whitespace alter kar deta hai jisse signature verification hamesha fail ho jata hai"
      },
      {
        "en": "To decrease RAM usage by 90%",
        "hi": "RAM usage 90% kam karne ke liye"
      },
      {
        "en": "Because express.json() is deprecated in Express 4",
        "hi": "Kyunki express.json() deprecated hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Cryptographic HMAC SHA-256 signatures depend on exact byte equality. Any JSON serialization/deserialization alters whitespace and character encoding, invalidating the signature.",
      "hi": "Cryptographic hash exact raw bytes par calculate hota hai. express.json() spaces badal deta hai jisse signature match nahi karta."
    }
  },
  {
    "question": {
      "en": "How does the query Product.findOneAndUpdate({ _id, stock: { $gte: qty } }, { $inc: { stock: -qty } }) prevent concurrent overselling?",
      "hi": "Product.findOneAndUpdate({ _id, stock: { $gte: qty } }, { $inc: { stock: -qty } }) concurrent overselling ko kaise rokta hai?"
    },
    "options": [
      {
        "en": "It permanently closes the database",
        "hi": "Ye database permanently band kar deta hai"
      },
      {
        "en": "MongoDB locks the document during the atomic operation; only the first request finds stock >= qty and decrements it, while concurrent requests immediately fail the condition and receive null",
        "hi": "MongoDB atomic operation ke dauran document lock karta hai; sirf pehli request ko stock >= qty milta hai aur stock ghat ta hai, jabki doosri request condition fail hone par null paati hai"
      },
      {
        "en": "It limits purchases to 1 item per customer",
        "hi": "Ye per customer 1 item limit lagata hai"
      },
      {
        "en": "It sends an SMS to the store manager",
        "hi": "Ye manager ko SMS bhejta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "By combining the stock check and the decrement into a single atomic database operation, race conditions are eliminated at the database storage engine layer.",
      "hi": "Stock check aur decrement dono ek hi atomic operation mein hone ki wajah se 2 log aapas mein takra kar ek sath aakhri item nahi kharid sakte."
    }
  },
  {
    "question": {
      "en": "What catastrophic security risk occurs if an e-commerce API trusts the item prices sent in the client request body?",
      "hi": "Agar e-commerce API client ke bheje hue item price par bharosa kare toh kaunsa bada security risk hota hai?"
    },
    "options": [
      {
        "en": "The browser will refuse to show CSS styles",
        "hi": "Browser CSS nahi dikhayega"
      },
      {
        "en": "An attacker can modify the price payload in DevTools or Postman (e.g. changing ₹80,000 to ₹1), purchasing valuable products for negligible amounts",
        "hi": "Hacker DevTools ya Postman se price badal kar (jaise ₹80,000 ko ₹1 karke) mehenga samaan muft ke bhav kharid sakta hai"
      },
      {
        "en": "The database deletes all product images",
        "hi": "Database product images delete kar deta hai"
      },
      {
        "en": "Stripe blocks the user's credit card permanently",
        "hi": "Stripe card block kar deta hai"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "en": "Client payloads can be manipulated trivially. Product prices must always be fetched from the backend's trusted database.",
      "hi": "Client se aane wala data hacker modify kar sakta hai. Price hamesha backend database se hi calculate hona chahiye."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Project 3: E-Commerce Store with Cart & Stripe Payments in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Project 3: E-Commerce Store with Cart & Stripe Payments ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling project 3: e-commerce store with cart & stripe payments with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Project 3: E-Commerce Store with Cart & Stripe Payments ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Project 3: E-Commerce Store with Cart & Stripe Payments establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Project 3: E-Commerce Store with Cart & Stripe Payments directly resolve?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Project 3: E-Commerce Store with Cart & Stripe Payments, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Project 3: E-Commerce Store with Cart & Stripe Payments, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Project 3: E-Commerce Store with Cart & Stripe Payments, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Project 3: E-Commerce Store with Cart & Stripe Payments?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Project 3: E-Commerce Store with Cart & Stripe Payments be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Project 3: E-Commerce Store with Cart & Stripe Payments ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Project 3: E-Commerce Store with Cart & Stripe Payments impact application memory and CPU consumption?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Project 3: E-Commerce Store with Cart & Stripe Payments?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Project 3: E-Commerce Store with Cart & Stripe Payments?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Project 3: E-Commerce Store with Cart & Stripe Payments?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Project 3: E-Commerce Store with Cart & Stripe Payments, what must the test suite assert?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Project 3: E-Commerce Store with Cart & Stripe Payments?",
      "hi": "Modular design Project 3: E-Commerce Store with Cart & Stripe Payments mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Project 3: E-Commerce Store with Cart & Stripe Payments be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Project 3: E-Commerce Store with Cart & Stripe Payments ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Project 3: E-Commerce Store with Cart & Stripe Payments properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Project 3: E-Commerce Store with Cart & Stripe Payments kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Project 3: E-Commerce Store with Cart & Stripe Payments in production?",
      "hi": "Production mein Project 3: E-Commerce Store with Cart & Stripe Payments ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Project 3: E-Commerce Store with Cart & Stripe Payments?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Project 3: E-Commerce Store with Cart & Stripe Payments?",
      "hi": "Project 3: E-Commerce Store with Cart & Stripe Payments mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
