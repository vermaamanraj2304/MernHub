export default {
  id: "node-streams-buffers",
  title: {
    en: "Streams & Buffers: High-Performance I/O",
    hi: "Streams & Buffers (Handling Gigabytes of Data)",
  },
  difficulty: "Advanced",
  readTime: 13,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. What are Buffers and Streams?",
        hi: "1. Buffers Aur Streams Kya Hote Hain?",
      },
      body: {
        en: `Traditional JavaScript in the browser only dealt with text strings, numbers, and JSON. But servers have to deal with raw binary data: TCP network packets, video streams, audio files, and multi-gigabyte disk files.

To handle high-performance binary I/O, Node.js introduced two foundational primitives:

### 1. What is a Buffer?
A **\`Buffer\`** is a fixed-size chunk of raw binary memory allocated **outside the V8 JavaScript Heap** directly in C++ memory.
- A buffer represents a sequence of raw bytes (integers from 0 to 255).
- Once created, a buffer's memory size is **fixed and immutable**; it cannot be resized dynamically.

### 2. What is a Stream?
A **\`Stream\`** is an abstraction for handling data piece-by-piece (**chunk by chunk**) continuously over time, without having to load the entire file or payload into memory at once.

Instead of reading a 4 GB video file completely into RAM (which would instantly crash a 1 GB server), streams process it in tiny 64 KB chunks as it flows from the disk to the network!`,
        hi: `Browser mein JavaScript sirf text strings aur JSON ke saath kaam karti thi. Lekin backend servers ko raw binary data handle karna padta hai: video files, image uploads, aur network packets.

Inhe handle karne ke liye Node.js ne do powerful tools banaye:

### 1. Buffer Kya Hai?
**\`Buffer\`** ek fixed-size binary memory block hota hai jo **V8 engine ke bahar** direct C++ memory mein allocate hota hai.
- Isme raw bytes (0 se 255 tak ke numbers) store hote hain.
- Ek baar buffer banne ke baad uska size badhaya ya ghataya nahi ja sakta (Fixed Size).

### 2. Stream Kya Hai?
**\`Stream\`** ka matlab hota hai data ko tukdon mein (**chunk-by-chunk**) flow ke roop mein padhna aur process karna, bina poori file ko ek saath RAM mein load kiye.

Agar aap 4 GB ki video file ko ek saath RAM mein load karoge, toh 1 GB RAM wala server turant crash ho jayega. Streams use chote-chote 64 KB ke packets mein pipe ki tarah flow karti hain!`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The 4 Types of Streams & Backpressure",
        hi: "2. Streams Ke 4 Types Aur Backpressure Ka Concept",
      },
      body: {
        en: `In Node.js, every stream belongs to one of four categories:

1. **Readable Stream**: Source from which data can be read (e.g. \`fs.createReadStream\`, \`http.IncomingMessage\`, \`process.stdin\`).
2. **Writable Stream**: Destination to which data can be written (e.g. \`fs.createWriteStream\`, \`http.ServerResponse\`, \`process.stdout\`).
3. **Duplex Stream**: A stream that is both Readable and Writable simultaneously (e.g. a TCP network socket connection).
4. **Transform Stream**: A duplex stream that modifies or transforms data as it passes through (e.g. \`zlib.createGzip()\` for compression, \`crypto.createCipheriv\` for encryption).

### What is Backpressure?
Imagine a water pipe pouring water at 100 liters/second into a funnel that can only drain at 10 liters/second. The funnel will quickly overflow!
In Node.js, **Backpressure** occurs when a fast Readable Stream produces data faster than a slow Writable Stream (like a slow hard drive or congested network) can consume it.
Node's streaming engine automatically pauses the readable source when internal buffers hit their **highWaterMark** limit (default 64 KB for file streams), and resumes reading only when the writable destination catches up.`,
        hi: `Node.js mein Streams 4 tarah ki hoti hain:

1. **Readable Stream**: Jahan se data padha jata hai (jaise \`fs.createReadStream\`, incoming HTTP request).
2. **Writable Stream**: Jahan data likha jata hai (jaise \`fs.createWriteStream\`, HTTP response).
3. **Duplex Stream**: Jo ek hi waqt par read aur write dono kar sakti hai (jaise TCP network socket).
4. **Transform Stream**: Jo data ko beech mein modify ya convert karti hai (jaise \`zlib.createGzip()\` se zip banana).

### Backpressure Kya Hai?
Sochiye agar upar se motor 100 liter/minute paani phek rahi hai aur neeche ka pipe sirf 10 liter nikal sakta hai, toh tanki overflow ho jayegi!
Backpressure tab hota hai jab data read bohot fast ho raha ho par write slow ho raha ho. Node.js ka stream engine reading ko automatically thodi der ke liye pause kar deta hai jab tak writable target purana data process na kar le.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: The 1000-Liter Water Tank vs The Garden Hose Pipe",
        hi: "Real-Life Analogy: 1000 Liter Ki Tanki vs Paani Ka Pipe",
      },
      body: {
        en: `Imagine watering your garden lawn:

- **\`fs.readFile\` (Without Streams)**:
  - You try to lift the entire 1,000-liter rooftop water tank onto your back, carry it to the lawn, and dump it all in one second.
  - Your back breaks under the weight, and your spine collapses (**JavaScript heap out of memory Crash!**).
- **Streams & Piping (\`readable.pipe(writable)\`)**:
  - You attach a lightweight PVC garden hose pipe to the tap.
  - Water flows smoothly at 1 liter every 2 seconds.
  - You can water a lawn for 10 hours and transfer 10,000 liters of water without ever lifting more than a few drops in your hand at any single instant!
  - You can process a 100 GB database backup file on a tiny ₹400 cloud server with 512 MB of RAM using streams!`,
        hi: `Sochiye bagiche mein paudho ko paani dena:

- **\`fs.readFile\` (Bina Streams Ke)**:
  - Aap chhat par rakhi 1000 liter ki paani ki tanki ko apne kandhe par utha kar bagiche mein le jaane ki koshish karte ho.
  - Tanki ka wazan itna zyada hai ki aapki kamar toot jaati hai (**Memory Crash!**).
- **Streams Ka Kamaal (\`pipe()\`):**
  - Aap tap par ek plastic ka garden pipe jodte ho.
  - Paani aaram se boond-boond aur stream ban kar behne lagta hai.
  - Aap chahe 10,000 liter paani transfer kar do, aapke haath mein kisi bhi waqt sirf pipe ka halka sa wazan rehta hai!
  - Yahi wajah hai ki 512 MB RAM wala sasta server bhi 50 GB ki file ko bina hang hue aasaani se process kar leta hai!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. Syntax: Buffers and Pipeline Stream Operations",
        hi: "4. Syntax: Buffers Aur modern pipeline() Function",
      },
      body: {
        en: `\`\`\`javascript
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';

// 1. Buffer creation
const bufFromString = Buffer.from('Hello MERN', 'utf-8');
const zeroedBuf = Buffer.alloc(10); // 10 bytes initialized to zero
console.log(bufFromString.toString('hex')); // Hexadecimal bytes representation

// 2. Modern Stream Pipeline (handles errors & backpressure automatically)
await pipeline(
  fs.createReadStream('large-video.mp4'), // Source
  zlib.createGzip(),                     // Transform (compression)
  fs.createWriteStream('video.mp4.gz')   // Destination
);
console.log("Compression pipeline finished cleanly!");
\`\`\``,
        hi: `\`\`\`javascript
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';

// 1. Buffer Banana
const buf = Buffer.from('Namaste World', 'utf-8');
const emptyBuf = Buffer.alloc(1024); // 1 KB ka khali memory block

// 2. Modern pipeline() (Stream error aur cleanup automatically handle karta hai)
await pipeline(
  fs.createReadStream('source.csv'),
  zlib.createGzip(),
  fs.createWriteStream('destination.csv.gz')
);
console.log("File stream pipeline complete!");
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "5. Practical Examples: Raw Buffers, Copying Files & Gzip Pipeline",
        hi: "5. Practical Examples: Raw Buffers, File Copying aur Gzip Compression",
      },
      body: {
        en: `### Example 1: Buffer Creation, Encoding & Memory Inspection
Demonstrating how strings convert into raw hexadecimal bytes and back.`,
        hi: `### Example 1: Buffer Creation Aur Hexadecimal Bytes Inspection
Dekhiye kaise text characters memory mein raw bytes (0-255) ke roop mein store hote hain.`,
      },
      code: {
        language: "javascript",
        filename: "bufferBasics.js",
        snippet: `// Example 1: Exploring Node.js Buffers
import { Buffer } from "node:buffer";

// 1. Create a buffer from an ASCII / UTF-8 string
const greeting = Buffer.from("Code in MERN 🚀");

console.log("Raw Buffer Object:       ", greeting);
console.log("Byte Length in Memory:   ", greeting.length, "bytes");
console.log("Hexadecimal Byte String: ", greeting.toString("hex"));
console.log("Base64 Encoded String:   ", greeting.toString("base64"));
console.log("Reconstructed Text:      ", greeting.toString("utf-8"));

// 2. Allocating a safe pre-allocated buffer
const allocatedBuffer = Buffer.alloc(8); // 8 bytes of zeroes
allocatedBuffer.write("Node", "utf-8");
console.log("\\nPre-allocated buffer:", allocatedBuffer);
console.log("First byte decimal value (N):", allocatedBuffer[0]); // 78 (ASCII for 'N')`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Reading Files with Chunks and Tracking Progress",
        hi: "Example 2: Chunks Ke Saath File Read Karna Aur Progress Track Karna",
      },
      body: {
        en: `### Example 2: Inspecting Stream Chunks
Consuming a readable stream using \`data\`, \`end\`, and \`error\` event listeners.`,
        hi: `### Example 2: Stream Ke Chunks Ko Monitor Karna
\`data\` event se har aane wale 64 KB chunk ko observe karna.`,
      },
      code: {
        language: "javascript",
        filename: "streamChunks.js",
        snippet: `// Example 2: Event-driven Stream Chunk Processing
import fs from "node:fs";

// Create readable stream with a custom 16 KB highWaterMark for demonstration
const readStream = fs.createReadStream(__filename, {
  highWaterMark: 16 * 1024 // 16 KB chunks
});

let totalBytesReceived = 0;
let chunkCount = 0;

readStream.on("data", (chunk) => {
  chunkCount++;
  totalBytesReceived += chunk.length;
  console.log(\`📦 Received chunk #\${chunkCount} (\${chunk.length} bytes)\`);
});

readStream.on("end", () => {
  console.log(\`\\n✅ Stream complete! Received \${chunkCount} total chunks (\${totalBytesReceived} bytes).\`);
});

readStream.on("error", (error) => {
  console.error("Stream encountered read error:", error.message);
});`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Enterprise File Compression Pipeline with pipeline()",
        hi: "Example 3: Stream Pipeline Se Badi File Ko Compress (Gzip) Karna",
      },
      body: {
        en: `### Example 3: Production Gzip Compression Pipeline
Using \`node:stream/promises\` pipeline to transform and compress large files with bulletproof error handling and automated resource cleanup.`,
        hi: `### Example 3: Production Transform Pipeline (Zlib Compression)
Bina memory bloat kiye badi files ko fly par compress karke save karna.`,
      },
      code: {
        language: "javascript",
        filename: "gzipPipeline.js",
        snippet: `// Example 3: Robust Stream Compression Pipeline
import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import zlib from "node:zlib";

async function compressFile(sourcePath, destinationZipPath) {
  console.log(\`Starting compression stream: \${sourcePath} -> \${destinationZipPath}\`);
  const startTime = Date.now();

  try {
    // pipeline handles backpressure and cleans up all file descriptors automatically!
    await pipeline(
      fs.createReadStream(sourcePath),  // 1. Read source chunks
      zlib.createGzip(),               // 2. Compress chunks on the fly
      fs.createWriteStream(destinationZipPath) // 3. Write to .gz archive
    );

    const elapsed = Date.now() - startTime;
    console.log(\`🎉 Compression completed successfully in \${elapsed}ms!\`);
  } catch (error) {
    console.error("Pipeline failed with exception:", error.message);
  }
}

// Running compression on current file
compressFile(__filename, "./self-compressed.js.gz");`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "6. Common Mistakes with Streams & Buffers",
        hi: "6. Streams Aur Buffers Ki Badi Galtiyan",
      },
      mistakes: [
        {
          mistake: {
            en: "Using old-fashioned `.pipe()` without error handling, causing unhandled stream exceptions and memory leaks.",
            hi: "Purana `.pipe()` use karna bina error handling ke jisse file descriptors leak ho jaate hain.",
          },
          correction: {
            en: "`readable.pipe(writable)` does NOT forward errors automatically. If the destination stream throws an error, the source stream stays open forever. Always use the modern `stream/promises` `pipeline()` utility instead.",
            hi: "Purana `.pipe()` errors ko aage pass nahi karta. Hamesha modern `pipeline()` use karein jo error aane par saare streams ko automatically destroy aur clean kar deta hai.",
          },
          code: `// RISKY LEGACY PATTERN:
// readStream.pipe(writeStream); // If writeStream fails, readStream leaks memory!

// MODERN SAFE PATTERN:
import { pipeline } from 'node:stream/promises';
await pipeline(readStream, writeStream); // Guaranteed cleanup on error!`,
        },
        {
          mistake: {
            en: "Using `Buffer.allocUnsafe()` without immediately overwriting all bytes.",
            hi: "`Buffer.allocUnsafe()` use karna jisse purane sensitive memory passwords leak ho sakte hain.",
          },
          correction: {
            en: "`Buffer.allocUnsafe` allocates uninitialized memory containing whatever old data was previously in RAM (potentially old passwords or keys). Always use `Buffer.alloc()` which zeroes out the memory safely.",
            hi: "`Buffer.allocUnsafe` memory ko zero nahi karta aur RAM ka purana secret data leak kar sakta hai. Hamesha safe `Buffer.alloc()` use karein.",
          },
          code: `// DANGEROUS:
// const leakBuf = Buffer.allocUnsafe(100); // May contain sensitive RAM data!

// SAFE:
const safeBuf = Buffer.alloc(100); // Initialized with zeroes`,
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "7. Production Best Practices for Streams",
        hi: "7. Production Streams Ke Best Practices",
      },
      body: {
        en: `- **Stream Video & Audio**: When serving media files in Express, never use \`res.send(data)\`. Always stream the media: \`fs.createReadStream(path).pipe(res)\`.
- **Tune highWaterMark**: If you have fast SSDs and plenty of RAM, increase the \`highWaterMark\` from 64 KB to 256 KB to improve streaming throughput.
- **Always Use \`stream.pipeline\`**: Replace all occurrences of raw \`.pipe()\` with \`pipeline()\` from \`node:stream/promises\` to ensure deterministic error propagation.`,
        hi: `- **Media Ko Stream Karein**: Video ya images Express se bhejte waqt hamesha stream pipe karein (\`createReadStream.pipe(res)\`).
- **highWaterMark Optimize Karein**: Fast SSDs par chunk size 64KB se badhakar 256KB kar sakte hain.
- **pipeline() Ko Standard Banayein**: Kabhi bhi raw \`.pipe()\` na likhein, hamesha \`stream/promises\` ka \`pipeline()\` use karein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "8. Top Interview Questions & Answers",
        hi: "8. Top Interview Sawal Aur Jawab",
      },
      questions: [
        {
          q: {
            en: "What is Backpressure in Node.js streams and how does it prevent memory crashes?",
            hi: "Node.js streams mein Backpressure kya hai aur yeh memory crash hone se kaise bachata hai?",
          },
          a: {
            en: "Backpressure is a flow-control mechanism that occurs when data is read from a source faster than the destination can write it. If unchecked, the surplus data accumulates in RAM until the process runs out of memory. Streams handle backpressure by having the writable stream return false when its buffer exceeds highWaterMark; this signals the readable stream to pause until the writable emits the 'drain' event.",
            hi: "Backpressure tab hota hai jab data read bohot fast ho raha ho par destination par write slow ho. Agar ise na roka jaye toh saara data RAM mein jama ho jayega aur server crash ho jayega. Backpressure readable stream ko temporarily pause kar deta hai jab tak writable stream purana data process karke 'drain' event emit na kar de.",
          },
        },
        {
          q: {
            en: "Why is `pipeline()` from `node:stream/promises` preferred over `readable.pipe(writable)`?",
            hi: "`readable.pipe()` ke mukable `stream/promises` ka `pipeline()` kyu recommend kiya jata hai?",
          },
          a: {
            en: "The classic `.pipe()` method does not forward errors across intermediate streams; if an error occurs in a middle transform or destination stream, the source stream remains open, causing memory leaks and hanging file descriptors. `pipeline()` properly forwards errors, cleans up all stream resources, and works natively with async/await.",
            hi: "Purana `.pipe()` method errors ko forward nahi karta. Agar destination stream crash ho jaye toh source stream khuli reh jaati hai aur memory leak hota hai. `pipeline()` errors ko properly handle karta hai, saare streams ko safely destroy karta hai aur async/await support karta hai.",
          },
        },
        {
          q: {
            en: "What is the difference between Buffer.alloc() and Buffer.allocUnsafe()?",
            hi: "Buffer.alloc() aur Buffer.allocUnsafe() mein kya antar hota hai?",
          },
          a: {
            en: "Buffer.alloc(size) initializes and zeroes out all allocated memory bytes, ensuring no sensitive remnant data is exposed, but with a slight performance cost. Buffer.allocUnsafe(size) allocates raw uninitialized memory without zeroing it out; it is faster, but the memory may contain sensitive remnants of previous heap memory (such as passwords or cryptographic keys).",
            hi: "Buffer.alloc() poore memory block ko zero se saaf kar deta hai taaki koi purana sensitive data na bache (Safe). Buffer.allocUnsafe() memory ko bina saaf kiye direct de deta hai; yeh thoda tez hota hai par isme purane passwords ya sensitive data leak hone ka khatra rehta hai.",
          },
        },
      ],
    },
    {
      type: "summary",
      heading: {
        en: "9. Summary Cheatsheet",
        hi: "9. Summary Cheatsheet",
      },
      body: {
        en: `- **Buffer**: Fixed-size raw binary memory outside V8 heap.
- **Stream**: Processes data sequentially in chunks (default 64 KB).
- **4 Types**: Readable, Writable, Duplex, Transform.
- **Backpressure**: Throttles fast sources to match slow destinations.
- **Rule**: Always use \`pipeline()\` from \`node:stream/promises\`.`,
        hi: `- **Buffer**: Raw binary data chunk (C++ memory).
- **Stream**: Chunks mein data process karta hai (RAM safe).
- **4 Types**: Readable, Writable, Duplex, Transform.
- **Backpressure**: Speed match karne ke liye source ko pause karta hai.
- **Rule**: Hamesha \`pipeline()\` use karein.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "Why does processing a 2 GB file with streams NOT consume 2 GB of RAM on the server?",
      "hi": "Streams se 2 GB file process karne par server ki 2 GB RAM kyun kharch nahi hoti?"
    },
    "options": [
      {
        "en": "Streams process the file in small sequential chunks (e.g. 64 KB) without loading the whole file at once",
        "hi": "Streams poori file ko ek saath load kiye bina chote-chote chunks (jaise 64 KB) mein process karti hain"
      },
      {
        "en": "Streams automatically compress everything by 99%",
        "hi": "Streams sab kuch 99% compress kar deti hain"
      },
      {
        "en": "The data is executed on the client's GPU",
        "hi": "Data client ke GPU par chalta hai"
      },
      {
        "en": "Node.js writes the entire file to the CPU cache",
        "hi": "Node.js poori file CPU cache mein likh deta hai"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Streams break large files into manageable chunks (default 64 KB for files), so memory usage remains tiny and flat regardless of file size.",
      "hi": "Streams data ko 64 KB ke chote chunks mein padhti hain, isliye file chahe kitni bhi badi ho, RAM par load nahi padta."
    }
  },
  {
    "q": {
      "en": "What stream type is `zlib.createGzip()` which takes uncompressed data and outputs compressed data?",
      "hi": "`zlib.createGzip()` kis type ki stream hai jo normal data ko compressed data mein badalti hai?"
    },
    "options": [
      {
        "en": "Transform Stream",
        "hi": "Transform Stream"
      },
      {
        "en": "Readable Stream only",
        "hi": "Sirf Readable Stream"
      },
      {
        "en": "Writable Stream only",
        "hi": "Sirf Writable Stream"
      },
      {
        "en": "Static Buffer",
        "hi": "Static Buffer"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "A Transform stream is a Duplex stream where the output is computed by transforming the input data.",
      "hi": "Transform stream ek aisi duplex stream hoti hai jo aane wale data ko modify/compress karke aage bhejti hai."
    }
  },
  {
    "q": {
      "en": "What occurs during 'Backpressure' in Node.js streams?",
      "hi": "Node.js streams mein 'Backpressure' hone par kya hota hai?"
    },
    "options": [
      {
        "en": "The readable stream is paused to prevent overwhelming the slower writable stream's buffer",
        "hi": "Slower writable stream ko bachane ke liye readable stream ko temporarily pause kar diya jata hai"
      },
      {
        "en": "The server restarts automatically",
        "hi": "Server automatically restart ho jata hai"
      },
      {
        "en": "The writable stream deletes all incoming data",
        "hi": "Writable stream saara data delete kar deti hai"
      },
      {
        "en": "The event loop switches to synchronous mode",
        "hi": "Event loop synchronous mode mein switch ho jata hai"
      }
    ],
    "answerIndex": 0,
    "explanation": {
      "en": "Backpressure pauses the fast producer so the slow consumer has time to write out its buffer before accepting more chunks.",
      "hi": "Backpressure fast source ko rok deta hai taaki slow destination apna buffer khali kar sake."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Streams & Buffers: High-Performance I/O in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Streams & Buffers (Handling Gigabytes of Data) ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling streams & buffers: high-performance i/o with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Streams & Buffers (Handling Gigabytes of Data) ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Streams & Buffers: High-Performance I/O establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Streams & Buffers: High-Performance I/O directly resolve?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Streams & Buffers: High-Performance I/O, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Streams & Buffers: High-Performance I/O, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Streams & Buffers: High-Performance I/O, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Streams & Buffers: High-Performance I/O?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Streams & Buffers: High-Performance I/O be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Streams & Buffers (Handling Gigabytes of Data) ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Streams & Buffers: High-Performance I/O impact application memory and CPU consumption?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Streams & Buffers: High-Performance I/O?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Streams & Buffers: High-Performance I/O?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Streams & Buffers: High-Performance I/O?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Streams & Buffers: High-Performance I/O, what must the test suite assert?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Streams & Buffers: High-Performance I/O?",
      "hi": "Modular design Streams & Buffers (Handling Gigabytes of Data) mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Streams & Buffers: High-Performance I/O be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Streams & Buffers (Handling Gigabytes of Data) ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Streams & Buffers: High-Performance I/O properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Streams & Buffers (Handling Gigabytes of Data) kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Streams & Buffers: High-Performance I/O in production?",
      "hi": "Production mein Streams & Buffers (Handling Gigabytes of Data) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Streams & Buffers: High-Performance I/O?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Streams & Buffers: High-Performance I/O?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Streams & Buffers: High-Performance I/O?",
      "hi": "Streams & Buffers (Handling Gigabytes of Data) mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
