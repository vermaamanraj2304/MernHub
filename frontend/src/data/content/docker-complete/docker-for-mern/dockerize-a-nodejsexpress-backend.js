export default {
  id: "docker-dockerize-a-nodejsexpress-backend",
  title: {
    en: "Dockerize a Node.js & Express.js Backend (Production Dockerfile)",
    hi: "Node.js & Express.js Backend Ko Dockerize Karein (Production Guide)",
  },
  difficulty: "Intermediate",
  readTime: 14,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Anatomy of a Production-Ready Node.js Dockerfile",
        hi: "1. Production-Grade Node.js Dockerfile Ka Complete Structure",
      },
      body: {
        en: `Dockerizing a Node.js & Express.js application requires more than just writing \`FROM node\` and \`RUN npm start\`. A production-ready Dockerfile must address 4 critical concerns:

1. **Image Size Optimization**:
   Standard \`node:20\` weighs **1.1 GB** because it includes build compilers, Python, and Ubuntu OS utilities. Switching to Alpine Linux (\`node:20-alpine\`) drops the base footprint to **~130 MB** (an 88% reduction)!
2. **Deterministic Dependency Installation (\`npm ci\`)**:
   Always copy \`package.json\` and \`package-lock.json\` first and run \`npm ci --only=production\`. This guarantees exact version parity and leverages Docker's layer cache so code edits don't trigger re-installation of dependencies.
3. **Non-Root User Security**:
   By default, containers run as UID 0 (\`root\`). If your Express app suffers an arbitrary file read/write vulnerability, the attacker possesses root access on the container. Switching to \`USER node\` prevents privilege escalation.
4. **PID 1 Zombie Process & Signal Handling**:
   Node.js was not designed to run as Linux PID 1 (init process). When Docker sends \`SIGTERM\` to gracefully shut down the container, Node.js ignores it by default. We use \`dumb-init\` or \`node\` executable directly with proper signal handlers.`,
        hi: `Production mein Node.js & Express backend ko Dockerize karte waqt 4 mukhya baato ka dhyan rakhna zaroori hota hai:

1. **Lightweight Base Image**:
   Standard \`node:20\` image **1.1 GB** ki hoti hai. Production ke liye hamesha \`node:20-alpine\` use karein jo sirf **~130 MB** ki hoti hai.
2. **Layer Caching Aur \`npm ci\`**:
   Pehle \`package*.json\` copy karke \`npm ci\` chalayein. Isse dependencies cache ho jati hain aur jab aap code badalte hain, toh npm dobara download nahi hota.
3. **Non-Root User (\`USER node\`)**:
   Docker by default root user par chalta hai. Security ke liye hamesha \`USER node\` switch karein taaki container breakout attack se bacha ja sake.
4. **Graceful Shutdown (\`SIGTERM\`)**:
   Docker container band karte waqt Node.js process gracefully open database connections aur requests ko complete kare.`,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "2. Real-World Indian Analogy: Dabbawala Lunchbox System",
        hi: "2. Real-World Desi Analogy: Mumbai Dabbawala Tiffin Packing",
      },
      body: {
        en: `### 🍱 The Mumbai Dabbawala Standardized Tiffin Packing

Think of packaging your Express API into Docker like the **Mumbai Dabbawala tiffin box**:

1. **The Base Tiffin (Alpine Base Image)**:
   The tiffin container itself is lightweight, compact, and durable stainless steel—not a heavy wooden almirah!
2. **The Compartments (Layer Caching)**:
   - Bottom compartment: Roti and Rice (\`node_modules\` - packed once, stays untouched).
   - Top compartment: Fresh Sabzi and Dal (Your latest source code \`src/\` - updated daily without remaking the entire tiffin).
3. **The Seal & Tag (Non-Root User & Port Mapping)**:
   The tiffin is sealed with a color-coded tag indicating destination (Port \`5000:5000\`). No unauthorized person can open or poison it en route!`,
        hi: `### 🍱 Mumbai Dabbawala Tiffin System Ka Example

Express backend ko Dockerize karna bilkul **Mumbai Dabbawala Tiffin Box** pack karne jaisa hai:

1. **Compact Steel Box (Alpine Base Image)**:
   Tiffin box lightweight steel ka hota hai, na ki 50 kilo ka lakdi ka dabba. Isiliye ise carry karna super fast hota hai.
2. **Alag-Alag Dabbey (Docker Layers)**:
   - Neeche ka dabba: Roti-Chawal (\`node_modules\` - jo ek baar pack hota hai).
   - Upar ka dabba: Taaza Sabzi (Aapka \`src/\` code - jo roz update hota hai bina neeche ka dabba chhede).
3. **Standard Tag (Port Forwarding)**:
   Dabbewala tiffin par code likhta hai (Port 5000), jisse tiffin direct sahi desk par deliver ho jata hai!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "3. Complete Production Dockerfile & .dockerignore",
        hi: "3. Production Dockerfile & .dockerignore Code",
      },
      body: {
        en: `### Step 1: The \`.dockerignore\` File
Always create this file right next to your \`Dockerfile\`:`,
        hi: `### Step 1: \`.dockerignore\` File Banayein:`,
      },
      code: {
        language: "dockerignore",
        filename: ".dockerignore",
        snippet: `node_modules
npm-debug.log
.env
.env.*
.git
.gitignore
README.md
dist
tests
coverage`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "4. The Production Dockerfile",
        hi: "4. Complete Multi-Stage Dockerfile",
      },
      body: {
        en: `Here is the optimized, multi-stage, non-root Dockerfile for an Express backend:`,
        hi: `Express backend ke liye complete production Dockerfile:`,
      },
      code: {
        language: "dockerfile",
        filename: "Dockerfile",
        snippet: `# -------------------------------------------------------------
# STAGE 1: Dependency Builder
# -------------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies needed for native compile (e.g., bcrypt)
RUN apk add --no-cache python3 make g++

# Leverage Docker cache: only reinstall when package files change
COPY package*.json ./
RUN npm ci --only=production

# -------------------------------------------------------------
# STAGE 2: Production Final Runner
# -------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install dumb-init for proper signal handling (SIGTERM / PID 1)
RUN apk add --no-cache dumb-init

# Use existing non-root 'node' user provided by official Alpine image
USER node

# Copy production node_modules from builder
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
# Copy application source code
COPY --chown=node:node . .

EXPOSE 5000

# Health check to ensure container is alive
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Launch with dumb-init for graceful shutdown
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "src/server.js"]`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "5. Connecting Express Container to MongoDB with Docker Compose",
        hi: "5. Express Aur MongoDB Ko Docker Compose Se Connect Karna",
      },
      body: {
        en: `Instead of running manual \`docker run\` commands, define your full architecture in \`docker-compose.yml\`:`,
        hi: `Docker Compose file jo Express backend aur MongoDB database ko automatic bridge network par jodti hai:`,
      },
      code: {
        language: "yaml",
        filename: "docker-compose.yml",
        snippet: `version: '3.8'

services:
  # 1. Express Backend API
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: mern_backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/merndb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
    networks:
      - mern_network

  # 2. MongoDB Database
  mongo:
    image: mongo:7.0
    container_name: mern_mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    networks:
      - mern_network

  # 3. Redis In-Memory Cache
  redis:
    image: redis:7-alpine
    container_name: mern_redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - mern_network

volumes:
  mongo_data:
  redis_data:

networks:
  mern_network:
    driver: bridge`,
      },
    },
    {
      type: "pitfalls",
      heading: {
        en: "6. Common Production Mistakes to Avoid",
        hi: "6. Production Mistakes Aur Solutions",
      },
      body: {
        en: `### ❌ Pitfalls in Express Dockerization:
1. **Using 'localhost' for MongoDB in Docker**:
   Inside a container, \`localhost\` refers to the container itself! To connect to MongoDB, use the Docker service name: \`mongodb://mongo:27017/dbname\`.
2. **Missing Graceful Shutdown in Express**:
   When Docker stops a container, it sends \`SIGTERM\`. If your Express app doesn't listen for \`process.on('SIGTERM')\`, pending database transactions are aborted!
3. **Hardcoding Secrets in the Image**:
   Never put JWT secrets or database passwords in the Dockerfile \`ENV\` instructions. Pass them at runtime using an \`.env\` file or secrets manager.`,
        hi: `### ❌ In Galtiyo Se Bachein:
1. **Container ke andar 'localhost' use karna**:
   Container ke andar \`localhost\` ka matlab wahi container hota hai. MongoDB se connect hone ke liye service name use karein: \`mongodb://mongo:27017\`.
2. **SIGTERM Listen na karna**:
   Server code mein \`process.on('SIGTERM')\` lagayein taaki database connections safely close ho sakein.
3. **Dockerfile mein password hardcode karna**:
   Passwords ko hamesha runtime environment variables ya \`.env\` file ke zariye pass karein.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "7. Key Takeaways Summary",
        hi: "7. Summary & Revision",
      },
      body: {
        en: `### 📌 Summary:
- Base: \`node:20-alpine\` (~130MB vs 1.1GB)
- Security: Always add \`USER node\`
- Cache: Copy \`package*.json\` before source code
- Multi-Container: Use \`docker-compose.yml\` with named volumes and bridge networks`,
        hi: `### 📌 Quick Recall:
- Hamesha Alpine base image use karein
- Non-root user (\`USER node\`) lagayein
- Pehle package.json copy karke npm ci chalayein
- Docker Compose mein named volumes zaroor banayein`,
      },
    },
  ],
  quiz: [
    {
      q: {
        en: "Why should you specify 'mongodb://mongo:27017' instead of 'mongodb://localhost:27017' inside a Dockerized Express backend?",
        hi: "Dockerized Express backend ke andar 'localhost' ke bajaye 'mongodb://mongo:27017' kyun use karna chahiye?",
      },
      question: {
        en: "Why should you specify 'mongodb://mongo:27017' instead of 'mongodb://localhost:27017' inside a Dockerized Express backend?",
        hi: "Dockerized Express backend ke andar 'localhost' ke bajaye 'mongodb://mongo:27017' kyun use karna chahiye?",
      },
      options: [
        {
          en: "Because inside a container, 'localhost' refers to the container's own network loopback interface, while 'mongo' resolves to the database container via Docker DNS",
          hi: "Kyunki container ke andar 'localhost' usi container ka loopback hota hai, jabki 'mongo' Docker DNS ke zariye database container se connect karta hai",
        },
        {
          en: "Because 'localhost' is banned in the Linux operating system",
          hi: "Kyunki Linux mein localhost banned hota hai",
        },
        {
          en: "Because MongoDB requires all URLs to end in the letter 'o'",
          hi: "Kyunki MongoDB URL letter 'o' par khatam hona chahiye",
        },
        {
          en: "Because Docker containers cannot send numbers higher than 1000",
          hi: "Kyunki Docker numbers send nahi kar sakta",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Each container has its own isolated network namespace and localhost (127.0.0.1). Docker's embedded DNS server maps service names (like 'mongo') to the correct container IP on user-defined bridge networks.",
        hi: "Har container ka apna isolated localhost hota hai. Docker bridge network par service name ('mongo') se doosre container ka IP address resolve hota hai.",
      },
    },
    {
      q: {
        en: "In a Dockerfile, why is it critical to copy 'package*.json' and run 'npm ci' BEFORE copying the remaining application source code?",
        hi: "Dockerfile mein baki code copy karne se pehle 'package*.json' copy karke 'npm ci' chalana kyun zaroori hai?",
      },
      question: {
        en: "In a Dockerfile, why is it critical to copy 'package*.json' and run 'npm ci' BEFORE copying the remaining application source code?",
        hi: "Dockerfile mein baki code copy karne se pehle 'package*.json' copy karke 'npm ci' chalana kyun zaroori hai?",
      },
      options: [
        {
          en: "To leverage Docker layer caching: if dependencies haven't changed, Docker reuses the cached node_modules layer rather than re-installing on every code edit",
          hi: "Docker layer caching ke liye: agar package.json change nahi hua, toh code badalne par bhi npm install dobara run nahi hota aur build instant hota hai",
        },
        {
          en: "Because npm crashes if source code is copied first",
          hi: "Kyunki npm crash ho jata hai",
        },
        {
          en: "To invert the order of JavaScript arrays",
          hi: "Arrays ka order invert karne ke liye",
        },
        {
          en: "To delete git commits from the repository",
          hi: "Git commits delete karne ke liye",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Docker caches intermediate layers. If you copy all code first, any single-line code change invalidates the cache for all subsequent steps, forcing a slow 'npm install' every build.",
        hi: "Layer caching ki wajah se agar pehle package.json copy kiya jaye, toh sirf dependencies badalne par hi npm install dobara chalta hai.",
      },
    },
    {
      q: {
        en: "What is the primary security reason to add 'USER node' in a Node.js Dockerfile?",
        hi: "Node.js Dockerfile mein 'USER node' add karne ka primary security reason kya hai?",
      },
      question: {
        en: "What is the primary security reason to add 'USER node' in a Node.js Dockerfile?",
        hi: "Node.js Dockerfile mein 'USER node' add karne ka primary security reason kya hai?",
      },
      options: [
        {
          en: "Drops root privileges, preventing an attacker from gaining root control of the container or host system in case of an application compromise",
          hi: "Root permissions chhod deta hai, taaki app hack hone par bhi attacker ko container ya host ka root control na mil sake",
        },
        {
          en: "Speeds up JavaScript for-loops by 20%",
          hi: "For loops ki speed 20% badhana",
        },
        {
          en: "Allows the server to run without internet",
          hi: "Bina internet server chalana",
        },
        {
          en: "Changes the console log text color to green",
          hi: "Console color green karna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Running as non-root ('USER node') adheres to the principle of least privilege, mitigating container breakout and privilege escalation attacks.",
        hi: "Least privilege security principle ke hisab se non-root user use karne se attacker ko container ka administrative root access nahi milta.",
      },
    },
    {
      q: {
        en: "What tool helps Node.js properly handle Linux PID 1 signals (like SIGTERM and SIGINT) inside a Docker container?",
        hi: "Docker container ke andar Node.js ko Linux PID 1 signals (SIGTERM/SIGINT) properly handle karne mein kaun sa tool madad karta hai?",
      },
      question: {
        en: "What tool helps Node.js properly handle Linux PID 1 signals (like SIGTERM and SIGINT) inside a Docker container?",
        hi: "Docker container ke andar Node.js ko Linux PID 1 signals (SIGTERM/SIGINT) properly handle karne mein kaun sa tool madad karta hai?",
      },
      options: [
        { en: "dumb-init (or tini)", hi: "dumb-init (ya tini)" },
        { en: "react-router-dom", hi: "react-router-dom" },
        { en: "nodemon", hi: "nodemon" },
        { en: "babel-loader", hi: "babel-loader" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "dumb-init acts as a lightweight init process (PID 1) that forwards signals (SIGTERM) to child processes and reaps zombie processes properly.",
        hi: "dumb-init lightweight init process (PID 1) ki tarah kaam karta hai aur Docker ke SIGTERM signals ko Node.js tak safely pass karta hai.",
      },
    },
    {
      q: {
        en: "Why is 'nodemon' NOT recommended for the default CMD in a production Dockerfile?",
        hi: "Production Dockerfile ke CMD mein 'nodemon' use karna kyun recommended nahi hai?",
      },
      question: {
        en: "Why is 'nodemon' NOT recommended for the default CMD in a production Dockerfile?",
        hi: "Production Dockerfile ke CMD mein 'nodemon' use karna kyun recommended nahi hai?",
      },
      options: [
        {
          en: "Nodemon is a development tool that polls filesystem changes, consuming unnecessary CPU/RAM and preventing clean production process management",
          hi: "Nodemon development tool hai jo files poll karta hai, extra CPU kharch karta hai aur production stability kharab karta hai",
        },
        {
          en: "Nodemon deletes all CSS files",
          hi: "Nodemon CSS files delete kar deta hai",
        },
        {
          en: "Nodemon is forbidden on Linux servers",
          hi: "Nodemon Linux par forbidden hai",
        },
        {
          en: "Nodemon only works on laptops with batteries",
          hi: "Sirf battery wale laptops par chalta hai",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "In production, code is immutable inside the image. File-watching overhead from nodemon is wasted CPU. Production containers should run directly with 'node src/server.js'.",
        hi: "Production image mein code change nahi hota. Nodemon ka file watcher bina wajah CPU waste karta hai; production mein direct 'node server.js' chalayein.",
      },
    },
    {
      q: {
        en: "Which instruction in a Dockerfile defines a health check command to monitor whether the Express server is responding?",
        hi: "Express server responding hai ya nahi check karne ke liye Dockerfile ka kaun sa instruction use hota hai?",
      },
      question: {
        en: "Which instruction in a Dockerfile defines a health check command to monitor whether the Express server is responding?",
        hi: "Express server responding hai ya nahi check karne ke liye Dockerfile ka kaun sa instruction use hota hai?",
      },
      options: [
        { en: "HEALTHCHECK", hi: "HEALTHCHECK" },
        { en: "PING_SERVER", hi: "PING_SERVER" },
        { en: "DOCTOR_CHECK", hi: "DOCTOR_CHECK" },
        { en: "IS_ALIVE", hi: "IS_ALIVE" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "The 'HEALTHCHECK' instruction tells Docker how to test a container to check that it is still working (e.g., 'CMD wget http://localhost:5000/api/health').",
        hi: "'HEALTHCHECK' instruction periodic command run karke verify karta hai ki app traffic handle karne ke liye healthy hai ya nahi.",
      },
    },
    {
      q: {
        en: "What flag in 'docker run' executes a container in the background (detached mode)?",
        hi: "'docker run' mein container ko background (detached mode) mein chalane ke liye kaun sa flag use hota hai?",
      },
      question: {
        en: "What flag in 'docker run' executes a container in the background (detached mode)?",
        hi: "'docker run' mein container ko background (detached mode) mein chalane ke liye kaun sa flag use hota hai?",
      },
      options: [
        { en: "-d (or --detach)", hi: "-d (ya --detach)" },
        { en: "-b (or --background)", hi: "-b (ya --background)" },
        { en: "--silent", hi: "--silent" },
        { en: "-hidden", hi: "-hidden" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "The '-d' flag runs the container in detached mode in the background, freeing your terminal shell.",
        hi: "'-d' flag container ko background mein run karta hai aur terminal free kar deta hai.",
      },
    },
    {
      q: {
        en: "What is the difference between 'docker-compose up' and 'docker-compose up -d'?",
        hi: "'docker-compose up' aur 'docker-compose up -d' ke beech kya difference hai?",
      },
      question: {
        en: "What is the difference between 'docker-compose up' and 'docker-compose up -d'?",
        hi: "'docker-compose up' aur 'docker-compose up -d' ke beech kya difference hai?",
      },
      options: [
        {
          en: "'up' locks the terminal and streams live logs; 'up -d' launches all services in the background and returns your command prompt",
          hi: "'up' terminal ko lock karke logs dikhata hai; 'up -d' background mein launch karke terminal free kar deta hai",
        },
        {
          en: "'-d' deletes all existing databases",
          hi: "'-d' saare databases delete kar deta hai",
        },
        {
          en: "'-d' runs the build in dark mode",
          hi: "'-d' dark mode mein chalta hai",
        },
        {
          en: "There is no difference",
          hi: "Koi difference nahi hai",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'-d' runs compose services in detached mode in the background, allowing you to continue using your shell.",
        hi: "'docker compose up -d' saare services background mein start karta hai jisse terminal lock nahi hota.",
      },
    },
    {
      q: {
        en: "Why should you never commit production '.env' files into your Docker image?",
        hi: "Production '.env' files ko Docker image ke andar commit kyun nahi karna chahiye?",
      },
      question: {
        en: "Why should you never commit production '.env' files into your Docker image?",
        hi: "Production '.env' files ko Docker image ke andar commit kyun nahi karna chahiye?",
      },
      options: [
        {
          en: "Because Docker images pushed to registries (like Docker Hub) can be inspected or leaked, exposing secret database credentials and JWT keys permanently",
          hi: "Kyunki Docker images inspect ho sakti hain aur registry par push hone se database credentials aur secret keys leak ho sakti hain",
        },
        {
          en: "Because .env files make Docker images run 5x slower",
          hi: ".env files se Docker 5x slow ho jata hai",
        },
        {
          en: "Because Docker does not recognize lowercase letters",
          hi: "Docker lowercase recognize nahi karta",
        },
        {
          en: "Because .env files delete the host kernel",
          hi: ".env files kernel delete kar deti hain",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Docker image layers are inspectable with 'docker history'. Hardcoding secrets inside an image leaks them to anyone with read access to the image.",
        hi: "Image ke layers inspect kiye ja sakte hain. Secrets hamesha runtime environment variables ke zariye pass kiye jaane chahiye.",
      },
    },
    {
      q: {
        en: "How do you inspect live streaming logs of a Dockerized Express container?",
        hi: "Dockerized Express container ke live streaming logs dekhne ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "How do you inspect live streaming logs of a Dockerized Express container?",
        hi: "Dockerized Express container ke live streaming logs dekhne ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "docker logs -f <container_name_or_id>", hi: "docker logs -f <container_name_or_id>" },
        { en: "cat /docker/logs.txt", hi: "cat /docker/logs.txt" },
        { en: "docker print stdout", hi: "docker print stdout" },
        { en: "tail -f docker.system", hi: "tail -f docker.system" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'docker logs -f <id>' follows (-f) the standard output/error stream of the container in real time.",
        hi: "'docker logs -f <id>' real time mein container ke console.log output ko follow karta hai.",
      },
    },
    {
      q: {
        en: "What command stops all running containers on your machine?",
        hi: "Machine par chal rahe saare running containers ko stop karne ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "What command stops all running containers on your machine?",
        hi: "Machine par chal rahe saare running containers ko stop karne ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "docker stop $(docker ps -q)", hi: "docker stop $(docker ps -q)" },
        { en: "docker halt all", hi: "docker halt all" },
        { en: "docker kill-switch", hi: "docker kill-switch" },
        { en: "poweroff docker", hi: "poweroff docker" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'docker ps -q' outputs all active container IDs, and 'docker stop' gracefully sends SIGTERM to each of them.",
        hi: "'docker ps -q' saari running container IDs nikalta hai aur 'docker stop' unhe gracefully stop kar deta hai.",
      },
    },
    {
      q: {
        en: "What is the purpose of the 'EXPOSE' instruction in a Dockerfile?",
        hi: "Dockerfile mein 'EXPOSE' instruction ka kya purpose hota hai?",
      },
      question: {
        en: "What is the purpose of the 'EXPOSE' instruction in a Dockerfile?",
        hi: "Dockerfile mein 'EXPOSE' instruction ka kya purpose hota hai?",
      },
      options: [
        {
          en: "Acts as documentation indicating which port the container listens on at runtime (port mapping with -p is still required to expose it to the host)",
          hi: "Documentation ka kaam karta hai ki container kis port par listen karta hai (host par expose karne ke liye abhi bhi -p flag chahiye)",
        },
        {
          en: "Automatically opens all firewalls in your country",
          hi: "Desh ke saare firewalls kholna",
        },
        {
          en: "Publishes your private photos to social media",
          hi: "Photos publish karna",
        },
        {
          en: "Forces the browser to reload every 2 seconds",
          hi: "Browser reload karna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'EXPOSE 5000' documents the intended listening port. It does not automatically publish the port to the host; you still need '-p 5000:5000' at runtime.",
        hi: "'EXPOSE' instruction document karta hai ki app kis port par chalta hai, par host par map karne ke liye runtime par '-p' lagana padta hai.",
      },
    },
    {
      q: {
        en: "In Node.js Express, how should you implement Graceful Shutdown when Docker sends SIGTERM during container termination?",
        hi: "Docker container band hone par SIGTERM signal aane par Express mein Graceful Shutdown kaise implement karte hain?",
      },
      question: {
        en: "In Node.js Express, how should you implement Graceful Shutdown when Docker sends SIGTERM during container termination?",
        hi: "Docker container band hone par SIGTERM signal aane par Express mein Graceful Shutdown kaise implement karte hain?",
      },
      options: [
        {
          en: "Listen to process.on('SIGTERM'), stop accepting new requests, close database connections cleanly, and exit with process.exit(0)",
          hi: "process.on('SIGTERM') sun kar naye requests rokna, database connections cleanly close karna aur process.exit(0) karna",
        },
        {
          en: "Ignore the signal and keep running indefinitely",
          hi: "Signal ignore karke chalte rehna",
        },
        {
          en: "Throw an unhandled syntax error",
          hi: "Syntax error throw karna",
        },
        {
          en: "Format the hard drive immediately",
          hi: "Hard drive format kar dena",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Graceful shutdown prevents data corruption by allowing in-flight HTTP requests to finish and closing database/socket connections cleanly before termination.",
        hi: "Graceful shutdown pending database transactions ko corrupt hone se bachata hai aur connections ko safely close karta hai.",
      },
    },
    {
      q: {
        en: "What is the difference between 'ENTRYPOINT' and 'CMD' in a Dockerfile?",
        hi: "Dockerfile mein 'ENTRYPOINT' aur 'CMD' ke beech kya difference hota hai?",
      },
      question: {
        en: "What is the difference between 'ENTRYPOINT' and 'CMD' in a Dockerfile?",
        hi: "Dockerfile mein 'ENTRYPOINT' aur 'CMD' ke beech kya difference hota hai?",
      },
      options: [
        {
          en: "'ENTRYPOINT' defines the default fixed executable, while 'CMD' provides default arguments that can easily be overridden from the CLI",
          hi: "'ENTRYPOINT' default fixed command define karta hai, jabki 'CMD' default arguments deta hai jo CLI se easily override ho sakte hain",
        },
        {
          en: "'ENTRYPOINT' is for React; 'CMD' is for Vue",
          hi: "'ENTRYPOINT' React ke liye hai aur 'CMD' Vue ke liye",
        },
        {
          en: "'ENTRYPOINT' runs only on Sundays",
          hi: "Sirf Sunday ko chalna",
        },
        {
          en: "There is no difference, both are synonyms",
          hi: "Dono ek hi cheez hain",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'ENTRYPOINT' specifies the binary (e.g., ['node']), while 'CMD' passes default arguments (e.g., ['server.js']). Arguments passed to 'docker run' append to ENTRYPOINT.",
        hi: "'ENTRYPOINT' main executable set karta hai aur 'CMD' default parameters provide karta hai jo runtime par override kiye ja sakte hain.",
      },
    },
    {
      q: {
        en: "Which command builds a Docker image named 'mern-api' with version tag 'v1.0' from the Dockerfile in the current directory?",
        hi: "Current directory ke Dockerfile se 'mern-api:v1.0' image build karne ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "Which command builds a Docker image named 'mern-api' with version tag 'v1.0' from the Dockerfile in the current directory?",
        hi: "Current directory ke Dockerfile se 'mern-api:v1.0' image build karne ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "docker build -t mern-api:v1.0 .", hi: "docker build -t mern-api:v1.0 ." },
        { en: "docker make image mern-api:v1.0", hi: "docker make image mern-api:v1.0" },
        { en: "docker compile mern-api", hi: "docker compile mern-api" },
        { en: "docker create --tag mern-api:v1.0", hi: "docker create --tag mern-api:v1.0" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'docker build -t <name:tag> <path>' builds an image. The '.' specifies the current directory as the build context.",
        hi: "'docker build -t mern-api:v1.0 .' current directory se image build karta hai aur tag assign karta hai.",
      },
    },
    {
      q: {
        en: "What is a 'Dangling Image' in Docker terminology?",
        hi: "Docker terminology mein 'Dangling Image' ka kya matlab hota hai?",
      },
      question: {
        en: "What is a 'Dangling Image' in Docker terminology?",
        hi: "Docker terminology mein 'Dangling Image' ka kya matlab hota hai?",
      },
      options: [
        {
          en: "An intermediate image layer that is no longer tagged or referenced by any active image (<none>:<none>), wasting disk space",
          hi: "Ek aisa image layer jiska koi tag nahi bacha (<none>:<none>) aur jo faltu disk space consume kar raha hai",
        },
        {
          en: "An image that fell off the server rack physically",
          hi: "Physical rack se giri hui image",
        },
        {
          en: "An image that only displays upside down",
          hi: "Ulta display hone wali image",
        },
        {
          en: "An image containing only audio files",
          hi: "Sirf audio files wali image",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Dangling images show as <none>:<none> when a new build overwrites an existing tag. They can be safely deleted using 'docker image prune'.",
        hi: "Jab naya image purane tag ko replace karta hai, purani layers dangling ban jati hain jinhe 'docker image prune' se clean kiya jata hai.",
      },
    },
    {
      q: {
        en: "Why is 'COPY --chown=node:node' essential when copying files into a container with 'USER node' enabled?",
        hi: "'USER node' use karne par files copy karte waqt '--chown=node:node' lagana kyun zaroori hai?",
      },
      question: {
        en: "Why is 'COPY --chown=node:node' essential when copying files into a container with 'USER node' enabled?",
        hi: "'USER node' use karne par files copy karte waqt '--chown=node:node' lagana kyun zaroori hai?",
      },
      options: [
        {
          en: "By default, COPY creates files owned by root; without chown, the 'node' user will get EACCES permission denied errors if it needs to write or execute them",
          hi: "Default COPY files ko root ki ownership de deta hai; chown na lagane par 'node' user ko EACCES permission denied error milta hai",
        },
        {
          en: "Because Linux deletes files without chown",
          hi: "Linux files delete kar deta hai",
        },
        {
          en: "To compress files using gzip",
          hi: "Gzip compress karne ke liye",
        },
        {
          en: "To enable sound effects in Docker",
          hi: "Sound effects enable karna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Without '--chown=node:node', files copied by Docker are owned by root (UID 0), preventing the unprivileged 'node' user from modifying or accessing them properly.",
        hi: "'--chown=node:node' copied files ka owner 'node' user bana deta hai jisse runtime par permission denied errors nahi aate.",
      },
    },
    {
      q: {
        en: "Which command removes all stopped containers, all unused networks, and all build cache in one command?",
        hi: "Saare stopped containers, unused networks aur build cache ko ek sath clean karne ke liye kaun sa command use hota hai?",
      },
      question: {
        en: "Which command removes all stopped containers, all unused networks, and all build cache in one command?",
        hi: "Saare stopped containers, unused networks aur build cache ko ek sath clean karne ke liye kaun sa command use hota hai?",
      },
      options: [
        { en: "docker system prune", hi: "docker system prune" },
        { en: "docker format all", hi: "docker format all" },
        { en: "docker reset pc", hi: "docker reset pc" },
        { en: "docker uninstall", hi: "docker uninstall" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'docker system prune' cleans all unused containers, dangling images, networks, and build cache safely.",
        hi: "'docker system prune' unused containers, networks aur cache ko safely delete karke GBs of disk space free karta hai.",
      },
    },
    {
      q: {
        en: "What does the 'restart: unless-stopped' policy specify in docker-compose.yml?",
        hi: "docker-compose.yml mein 'restart: unless-stopped' policy ka kya matlab hota hai?",
      },
      question: {
        en: "What does the 'restart: unless-stopped' policy specify in docker-compose.yml?",
        hi: "docker-compose.yml mein 'restart: unless-stopped' policy ka kya matlab hota hai?",
      },
      options: [
        {
          en: "Always restarts the container if it crashes or if the host server reboots, unless the developer explicitly stopped it manually",
          hi: "Agar container crash ho ya server reboot ho toh automatically restart kare, jab tak developer ne khud manually stop na kiya ho",
        },
        {
          en: "Stops the container after 10 minutes",
          hi: "10 minute baad band karna",
        },
        {
          en: "Restarts only when a new pull request is opened",
          hi: "Naya PR aane par restart karna",
        },
        {
          en: "Reboots the developer's laptop",
          hi: "Laptop reboot karna",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'restart: unless-stopped' ensures production resilience during unexpected crashes and system reboots while respecting intentional 'docker stop' commands.",
        hi: "Crash ya reboot hone par container automatically wapas up ho jata hai, jisse production uptime 99.9% rehti hai.",
      },
    },
    {
      q: {
        en: "Which environment variable in Node.js dictates that Express should run in high-performance production mode with caching enabled?",
        hi: "Node.js Express ko high-performance production mode mein chalane ke liye kaun sa environment variable set kiya jata hai?",
      },
      question: {
        en: "Which environment variable in Node.js dictates that Express should run in high-performance production mode with caching enabled?",
        hi: "Node.js Express ko high-performance production mode mein chalane ke liye kaun sa environment variable set kiya jata hai?",
      },
      options: [
        { en: "NODE_ENV=production", hi: "NODE_ENV=production" },
        { en: "APP_FAST=true", hi: "APP_FAST=true" },
        { en: "EXPRESS_TURBO=1", hi: "EXPRESS_TURBO=1" },
        { en: "SPEED_BOOST=on", hi: "SPEED_BOOST=on" },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "'NODE_ENV=production' enables Express view template caching, suppresses detailed stack traces in error messages, and optimizes underlying middleware.",
        hi: "'NODE_ENV=production' Express mein internal view caching enable karta hai aur stack traces suppress karke performance aur security dono badhata hai.",
      },
    },
    {
      q: {
        en: "What is the primary architectural difference between Docker Swarm and Kubernetes for container orchestration?",
        hi: "Container orchestration ke liye Docker Swarm aur Kubernetes ke beech primary architectural difference kya hai?",
      },
      question: {
        en: "What is the primary architectural difference between Docker Swarm and Kubernetes for container orchestration?",
        hi: "Container orchestration ke liye Docker Swarm aur Kubernetes ke beech primary architectural difference kya hai?",
      },
      options: [
        {
          en: "Docker Swarm is simple and built directly into Docker CLI for small-to-medium clusters; Kubernetes is an enterprise-grade distributed system offering advanced auto-scaling, service meshes, and self-healing",
          hi: "Docker Swarm simple aur Docker CLI mein built-in hai; Kubernetes enterprise-grade system hai jo advanced auto-scaling aur complex self-healing deta hai",
        },
        {
          en: "Docker Swarm runs on phones; Kubernetes runs on satellites",
          hi: "Swarm phones par chalta hai aur K8s satellites par",
        },
        {
          en: "Docker Swarm only supports PHP code",
          hi: "Swarm sirf PHP support karta hai",
        },
        {
          en: "Kubernetes requires physical floppy disks to boot",
          hi: "K8s floppy disk maangta hai",
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: "Docker Swarm provides straightforward out-of-the-box multi-node clustering. Kubernetes (K8s) provides enterprise-scale features like horizontal pod autoscaling, ingress controllers, and custom resource definitions.",
        hi: "Docker Swarm easy to setup hai chote projects ke liye; Kubernetes enterprise industry standard hai massive scale, auto-healing aur zero-downtime rolling updates ke liye.",
      },
    },
  ],
};
