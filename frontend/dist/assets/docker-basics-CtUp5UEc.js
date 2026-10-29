const e={id:"adv-docker-basics",title:{en:"Docker Basics for MERN Developers",hi:"Docker Basics: Containerizing Node & MongoDB"},difficulty:"Intermediate",readTime:12,sections:[{type:"concept",heading:{en:"1. The 'It Works on My Machine' Nightmare & The Container Revolution",hi:"1. 'Mere Machine Pe Chal Raha Tha' Problem Aur Docker Ka Solution"},body:{en:`Every developer has heard (or uttered) the infamous excuse:
> *"It worked completely fine on my MacBook, I don't know why it crashed on the Ubuntu production server!"*

Software breaks across environments due to subtle discrepancies:
- Developer has Node v20.10 installed on macOS; Production server has Node v18.2 on Linux.
- MongoDB on local runs v7.0; production has v5.0 with incompatible index syntax.
- Native C++ binaries (like \`bcrypt\` or \`sharp\`) compiled for Apple Silicon (ARM64) fail when executed on an Intel x86 production server.

---

### Containers vs Virtual Machines (VMs)
Before containers, developers used Virtual Machines (VMware, VirtualBox):

\`\`\`
       [ VIRTUAL MACHINES ]                     [ DOCKER CONTAINERS ]
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│ App 1 (Node)   │  App 2 (Mongo) │       │ App 1 (Node)   │  App 2 (Mongo) │
├────────────────┼────────────────┤       ├────────────────┼────────────────┤
│ Guest OS       │  Guest OS      │       │ Bins / Libs    │  Bins / Libs   │
│ (Ubuntu 2GB)   │  (Alpine 1GB)  │       ├────────────────┴────────────────┤
├────────────────┴────────────────┤       │     Docker Container Engine     │
│       Hypervisor (Type 2)       │       ├─────────────────────────────────┤
├─────────────────────────────────┤       │     Host Operating System       │
│     Host Operating System       │       │        (Shared Kernel)          │
├─────────────────────────────────┤       ├─────────────────────────────────┤
│        Physical Server          │       │        Physical Server          │
└─────────────────────────────────┘       └─────────────────────────────────┘
\`\`\`

- **Virtual Machines**: Each VM packages an entire independent Guest Operating System (GBs of storage, minutes to boot, heavy RAM consumption).
- **Docker Containers**: Containers share the host operating system's kernel! They isolate processes in lightweight user-space sandboxes:
  - Startup time: **Milliseconds** (instead of minutes).
  - Memory footprint: **Megabytes** (instead of Gigabytes).
  - Complete environment parity: Runs identically on macOS, Windows, Linux, and AWS EC2!`,hi:`Har software developer ne kabhi na kabhi ye zaroor kaha hoga:
> *"Bhai mere laptop par toh bilkul mast chal raha tha, pata nahi production server par kyun phat gaya!"*

Kyunki environment alag hote hain:
- Aapke Mac par Node v20 hai, server par purana Node v18 hai.
- Aapke system par MongoDB 7 hai, server par MongoDB 5 hai.
- C++ ke libraries (jaise \`bcrypt\` ya \`sharp\`) Mac ke M-series processor ke liye compile hote hain jabki cloud server Linux x86 par hota hai.

---

### Virtual Machines vs Docker Containers:
Pehle log Virtual Machines (VMware) banate the:
- **VMs Ka Nuksan**: Har VM ke andar poora alag Operating System (Windows/Ubuntu) install karna padta tha jo 4GB RAM aur 20GB space leta tha, aur boot hone mein 3 minute lagte the.
- **Docker Containers Ka Kamaal**: Containers host machine ke kernel ko aapas mein share karte hain. Har container ek halka-phulka isolated box hota hai:
  - Boot time: **Kuch milliseconds**.
  - Size: **Sirf kuch Megabytes**.
  - Guaranteed Consistency: Jo container aapke Mac par chalega, wahi 100% same tarike se AWS ya DigitalOcean server par chalega!`}},{type:"concept",heading:{en:"2. Images, Containers, and Dockerfile Layer Caching",hi:"2. Images, Containers Aur Dockerfile Layer Caching Ka Mechanism"},body:{en:`To master Docker, you must understand three core primitives:

1. **Dockerfile**: A text blueprint containing line-by-line instructions on how to assemble your application environment.
2. **Docker Image**: The compiled, read-only package containing your code, Node.js runtime, OS libraries, and dependencies. (Analogous to a **Class** in Object-Oriented Programming).
3. **Docker Container**: A runnable, live instance of an image executing as an isolated process. (Analogous to an **Object / Instance** of a class).

---

### Docker Layer Caching: The Secret to 5-Second Builds
Every single instruction in a \`Dockerfile\` (such as \`RUN\`, \`COPY\`, \`WORKDIR\`) creates a **cached filesystem layer**:

\`\`\`dockerfile
# STEP 1: Cached! (Node runtime rarely changes)
FROM node:20-alpine

WORKDIR /app

# STEP 2: Only copy package files first!
COPY package*.json ./

# STEP 3: Cached! Only runs if package.json actually changed!
RUN npm install --omit=dev

# STEP 4: Copy application source code (changes frequently)
COPY . .
\`\`\`

> [!TIP]
> If you write \`COPY . .\` **before** \`RUN npm install\`, editing a single typo in a README file busts Docker's layer cache! Docker is forced to re-run \`npm install\` from scratch, wasting 5 minutes on every single build. Always copy \`package*.json\` first!`,hi:"Docker ke 3 basic concepts:\n\n1. **Dockerfile**: Text file jisme likha hota hai ki container kaise banega (recipes/instructions).\n2. **Docker Image**: Ek read-only package jisme Node.js runtime, aapka code aur libraries packed hote hain. (Jaise OOPs mein ek **Class** hoti hai).\n3. **Docker Container**: Uss image ka ek zinda, running instance jo background process ki tarah chalta hai. (Jaise class ka **Object** hota hai).\n\n---\n\n### Layer Caching Ka Super Trick:\nDockerfile ki har line ek alag cached layer banati hai:\n- Agar aap pehle `COPY . .` likh denge aur phir `npm install`, toh code mein ek comma bhi change karne par Docker ko dobara saare 500 packages install karne padenge.\n- **Best Practice**: Pehle sirf `package*.json` copy karein aur `npm install` chalayein. Uske baad application code `COPY . .` karein. Isse `npm install` layer cache ho jaati hai aur build sirf 3 second mein ho jata hai!"}},{type:"analogy",heading:{en:"Real-Life Analogy: The Standardized Shipping Cargo Container",hi:"Real-Life Analogy: Standard Shipping Cargo Container"},body:{en:`Before 1956, shipping international cargo was a logistical nightmare:

- **The Pre-Container Chaos**:
  A merchant in Surat wanted to ship 500 bags of spices and textiles to London.
  He loaded sacks into a bullock cart. At Surat railway station, 20 coolies unloaded every single sack and repacked them onto a steam train.
  At Mumbai docks, port laborers unloaded the sacks again, hoisted them with cranes into the ship's humid hold, where rats chewed through half the bags and rain spoiled the rest. At London port, the entire manual unloading repeated. It took weeks and 40% of goods were damaged.
- **Malcolm McLean's ISO Shipping Container (Docker Containers)**:
  In 1956, standardized steel rectangular shipping containers were invented:
  The merchant in Surat packs his goods into a standard 20-foot steel container and seals the padlock.
  A crane lifts the container onto an Indian Railway flatbed train. At Mumbai port, the container is transferred onto a cargo ship in 60 seconds without opening the doors. At London port, a crane moves the container onto an electric truck.
  The container doesn't care whether it is travelling on a train, ship, or truck; the truck and crane don't care whether the container holds spices, iPhones, or books!

Docker provides the exact same standardized steel container for your MERN code. It runs identically on your Mac laptop, your colleague's Windows PC, and AWS cloud!`,hi:`1956 se pehle shipping cargo ka haal dekhein:

- **Puraana Tareeqa (Khule Baste)**:
  Surat se London masale bhejne the. Pehle bailgadi par bore lade, phir railway station par coolieyon ne bori utari aur train mein bhari. Mumbai port par bore dobara utare aur ship ke hold mein daale jahan choohe aadhe masale kha gaye aur barish se kharab ho gaye. Har jagah alag-alag packing karni padti thi.
- **Standardized Steel Container (Docker Container)**:
  1956 mein standardized steel containers ka aavishkar hua. Surat mein maal container mein band karke lock laga diya gaya.
  Usi container ko crane ne train par rakha, train se ship par rakha, aur London pahunch kar truck par rakh diya bina container ko khole!
  Ship aur truck ko matlab nahi ki andar masale hain ya computers; container har jagah fit baithta hai.

Docker wahi standard steel container hai jo aapke Node/Express/MongoDB code ko pack kar deta hai taaki wo bina kisi change ke har system par chal sake!`}},{type:"syntax",heading:{en:"Essential Docker CLI Commands & .dockerignore",hi:"Zaroori Docker CLI Commands Aur .dockerignore File"},body:{en:"### The Mandatory `.dockerignore` File:\nJust like `.gitignore`, never copy local junk or host-compiled binaries into your Docker build context:\n```\n# .dockerignore\nnode_modules\nnpm-debug.log\n.git\n.env\ndist\nbuild\n.DS_Store\n```\n\n---\n\n### Essential Docker Commands Reference:\n\n| Command | Description |\n| :--- | :--- |\n| `docker build -t my-api:1.0 .` | Builds a Docker image tagged `my-api:1.0` from current directory |\n| `docker run -p 5000:5000 --env-file .env my-api:1.0` | Runs container, mapping host port 5000 to container port 5000 |\n| `docker run -d -p 5000:5000 --name api-service my-api:1.0` | Runs container in detached background mode (`-d`) with custom name |\n| `docker ps` | Lists all currently active running containers |\n| `docker ps -a` | Lists all containers including stopped ones |\n| `docker logs -f <container_id>` | Streams live console logs from a running container |\n| `docker exec -it <container_id> sh` | Opens an interactive terminal shell inside the container |\n| `docker stop <container_id>` | Gracefully terminates a running container |\n| `docker system prune -a` | Deletes all unused images, stopped containers, and build cache |",hi:"### Zaroori `.dockerignore` File:\nApne local computer ke `node_modules` ko kabhi bhi image mein mat bhejein:\n```\n# .dockerignore\nnode_modules\n.git\n.env\ndist\n```\n\n### Mukhya Docker Commands:\n- `docker build -t my-api:1.0 .`: Image build karna.\n- `docker run -p 5000:5000 my-api:1.0`: Container start karna (host port 5000 ko container ke 5000 se jodna).\n- `docker run -d`: Background (detached) mode mein chalana.\n- `docker ps`: Chalte hue containers dekhna.\n- `docker logs -f <id>`: Live console logs dekhna.\n- `docker exec -it <id> sh`: Container ke andar terminal kholna.\n- `docker stop <id>`: Container band karna."}},{type:"example",heading:{en:"Example 1: Hardened Production Dockerfile for Express Backend",hi:"Example 1: Express Backend Ke Liye Production-Ready Dockerfile"},body:{en:`A security-hardened backend \`Dockerfile\` using the lightweight \`node:20-alpine\` base image, non-root user execution, and dumb-init for clean PID 1 signal handling:

\`\`\`dockerfile
# server/Dockerfile

# 1. Base image: Official lightweight Alpine Linux Node.js 20
FROM node:20-alpine AS base

# Install dumb-init to properly handle POSIX signals (SIGTERM/SIGINT) as PID 1
RUN apk add --no-cache dumb-init

# Set production environment
ENV NODE_ENV=production

# Set secure working directory
WORKDIR /usr/src/app

# 2. Dependency caching layer: Copy package manifests first
COPY package*.json ./

# Install only production dependencies cleanly
RUN npm ci --only=production && npm cache clean --force

# 3. Source layer: Copy application source code
COPY --chown=node:node . .

# 4. Security Hardening: Switch from root to unprivileged built-in 'node' user
USER node

# Expose internal application port
EXPOSE 5000

# Use dumb-init as entrypoint to prevent zombie processes
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start application
CMD ["node", "src/server.js"]
\`\`\``,hi:`Production security standards ke anusaar Express backend ka Dockerfile jisme non-root \`node\` user aur lightweight \`node:20-alpine\` use kiya gaya hai:

\`\`\`dockerfile
# server/Dockerfile
FROM node:20-alpine AS base

# Signal handling ke liye dumb-init
RUN apk add --no-cache dumb-init
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Pehle package.json copy karke dependencies install karein
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Application code copy karein
COPY --chown=node:node . .

# Security: Root user ke badle safe 'node' user switch karein
USER node

EXPOSE 5000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "src/server.js"]
\`\`\``}},{type:"example",heading:{en:"Example 2: Multi-Stage Dockerfile for React/Vite Frontend (<25MB Image)",hi:"Example 2: React Frontend Ke Liye Multi-Stage Dockerfile (<25MB Nginx Image)"},body:{en:`Using a **Multi-Stage Build**, we compile the React/Vite application inside a heavyweight Node builder container, but discard Node entirely in the final image, serving pure static HTML/CSS/JS via high-performance **Nginx Alpine**:

\`\`\`dockerfile
# client/Dockerfile

# -----------------------------------------------------------------
# STAGE 1: Build the React Application (Node.js Environment)
# -----------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests and install ALL dependencies (including dev tools like Vite)
COPY package*.json ./
RUN npm ci

# Copy client source code
COPY . .

# Build production assets into the /app/dist directory
RUN npm run build

# -----------------------------------------------------------------
# STAGE 2: Serve with Ultra-Fast Nginx Web Server (<25MB Final Size)
# -----------------------------------------------------------------
FROM nginx:alpine AS runner

# Copy custom Nginx configuration to support Single Page Application (SPA) routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage into Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
\`\`\`

### Corresponding SPA \`nginx.conf\`:
\`\`\`nginx
# client/nginx.conf
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        # Essential for React Router: redirect all paths to index.html to prevent 404 on refresh!
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression for lightning-fast loads
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
\`\`\``,hi:`**Multi-Stage Build** ka use karke hum React app ko compile Node mein karte hain, lekin final container mein sirf chota sa **Nginx** server rakhte hain jiska total size sirf 22MB hota hai:

\`\`\`dockerfile
# client/Dockerfile

# STAGE 1: Build Stage (Vite se bundle banana)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# STAGE 2: Production Nginx Server (<25MB)
FROM nginx:alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Builder stage se sirf compiled /dist folder uthao
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

### Client \`nginx.conf\` (React Router 404 Fix):
\`\`\`nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html; # React Router support
    }
}
\`\`\``}},{type:"example",heading:{en:"Example 3: Orchestrating Full MERN Stack with docker-compose.yml",hi:"Example 3: docker-compose.yml Se Full MERN Stack Ek Sath Chalana"},body:{en:`**Docker Compose** allows you to define and run multi-container Docker applications. With a single command (\`docker compose up -d\`), Compose boots up the React frontend, Express API, and a persistent MongoDB database connected via an internal virtual bridge network:

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  # 1. MongoDB Database Service
  mongodb:
    image: mongo:7.0
    container_name: mern_mongodb
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: secretpassword
      MONGO_INITDB_DATABASE: mern_prod
    ports:
      - '27017:27017'
    volumes:
      # Named volume guarantees data persists even if the container is destroyed!
      - mongo_data:/data/db
    networks:
      - mern_network

  # 2. Express Backend API Service
  api:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: mern_backend
    restart: always
    environment:
      PORT: 5000
      # CRITICAL: Notice the hostname is 'mongodb' (the service name), NOT localhost!
      MONGO_URI: mongodb://root:secretpassword@mongodb:27017/mern_prod?authSource=admin
      JWT_SECRET: superjwtsecretkey987
    ports:
      - '5000:5000'
    depends_on:
      - mongodb
    networks:
      - mern_network

  # 3. React Frontend Service
  frontend:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: mern_frontend
    restart: always
    ports:
      - '80:80'
    depends_on:
      - api
    networks:
      - mern_network

# Persistent volume storage declaration
volumes:
  mongo_data:

# Internal private bridge network for inter-container communication
networks:
  mern_network:
    driver: bridge
\`\`\`

To boot the entire full-stack application:
\`\`\`bash
docker compose up -d --build
\`\`\``,hi:`**Docker Compose** se hum ek single file mein poore MERN stack (React, Node, aur MongoDB) ko configure karke ek command (\`docker compose up -d\`) mein chala dete hain:

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  # 1. MongoDB Service
  mongodb:
    image: mongo:7.0
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: secretpassword
    ports:
      - '27017:27017'
    volumes:
      - mongo_data:/data/db # Data persist rahega container delete hone par bhi
    networks:
      - mern_network

  # 2. Express Backend Service
  api:
    build: ./server
    restart: always
    environment:
      PORT: 5000
      # Hostname 'mongodb' service name hai, localhost nahi!
      MONGO_URI: mongodb://root:secretpassword@mongodb:27017/mern_prod?authSource=admin
    ports:
      - '5000:5000'
    depends_on:
      - mongodb
    networks:
      - mern_network

  # 3. React Frontend Service
  frontend:
    build: ./client
    restart: always
    ports:
      - '80:80'
    depends_on:
      - api
    networks:
      - mern_network

volumes:
  mongo_data:

networks:
  mern_network:
    driver: bridge
\`\`\`

Chalane ke liye terminal mein type karein:
\`\`\`bash
docker compose up -d
\`\`\``}},{type:"mistakes",heading:{en:"Common Mistakes and How to Avoid Them",hi:"Aam Galtiyan Aur Unka Sahi Solution"},body:{en:"### 1. Hardcoding `localhost` in Inter-Container Networking\n- **Mistake**: Setting `MONGO_URI=mongodb://localhost:27017/app` inside the API container.\n- **Why it breaks**: Each container has its own isolated network namespace. In the API container, `localhost` refers to the API container itself, NOT the host machine or MongoDB container!\n- **Fix**: Use Docker's automatic DNS service resolution: `mongodb://mongodb:27017/app` (using the service name declared in `docker-compose.yml`).\n\n### 2. Forgetting `.dockerignore` (Copying Local `node_modules`)\n- **Mistake**: Omitting `.dockerignore` and running `COPY . .`.\n- **Why it breaks**: Your host's local `node_modules` (compiled for macOS or Windows) overwrites the Linux-compiled binaries inside the container, causing immediate `invalid ELF header` or architecture crash loops.\n- **Fix**: Always add `node_modules` to `.dockerignore`.\n\n### 3. Running Containers as Default `root`\n- **Mistake**: Leaving the default root user active in production containers.\n- **Why it hurts**: If an attacker exploits a remote code execution vulnerability (e.g., via a compromised npm package), they gain root privileges inside the container and can potentially break out onto the host server kernel.\n- **Fix**: Add `USER node` in your Dockerfile before the `CMD` instruction.",hi:"### 1. Container Ke Andar `localhost` Hardcode Karna\n- **Galti**: Backend container mein `MONGO_URI=mongodb://localhost:27017` likhna.\n- **Nuksan**: Har container ka apna alag private network hota hai. Backend ke andar `localhost` backend khud ko kehta hai, MongoDB ko nahi!\n- **Solution**: Docker Compose ke service name ko hostname ki tarah use karein: `mongodb://mongodb:27017/app`.\n\n### 2. `.dockerignore` Bhool Jana (Local node_modules Copy Karna)\n- **Galti**: Local laptop ke `node_modules` ko container mein copy ho jaane dena.\n- **Nuksan**: Mac par compile hui C++ libraries Linux container mein execute nahi ho pati aur container crash ho jata hai.\n- **Solution**: Hamesha `.dockerignore` mein `node_modules` likhein.\n\n### 3. Default `root` User Par App Chalana\n- **Galti**: Dockerfile mein user change na karna.\n- **Nuksan**: Kisi hacker ne security hole dhoonda toh use container ka poora root control mil jayega.\n- **Solution**: Dockerfile mein `USER node` lagayein."}},{type:"tip",heading:{en:"Production Best Practices",hi:"Production Best Practices & Container Optimization"},body:{en:"1. **Use Multi-Stage Builds for Frontend Apps**:\n   Never deploy Node.js runtime to serve static React bundles. Use multi-stage builds to discard Node and serve assets with Nginx Alpine (reducing image size from 800MB to 22MB!).\n2. **Mount Persistent Volumes for Databases**:\n   Containers are ephemeral by design: if a container is deleted or recreated, all internal files are wiped. Always map a named volume (e.g. `- mongo_data:/data/db`) so database records survive restarts.\n3. **Pin Specific Base Image Tags**:\n   Never use `node:latest` in production. An upstream Node update could release breaking changes overnight. Always pin exact versions: `node:20.11.1-alpine3.19`.\n4. **Leverage Docker Layer Caching**:\n   Order instructions from least frequently changed (`FROM`, `WORKDIR`, `COPY package*.json`, `npm ci`) to most frequently changed (`COPY . .`).",hi:"1. **Frontend Ke Liye Multi-Stage Build**:\n   React production bundle ke liye kabhi 800MB ka Node container mat deploy karein. Multi-stage build se sirf 22MB ka Nginx image banayein.\n2. **Database Ke Liye Volumes Zaroor Lagayein**:\n   Container temporary hote hain; delete hone par data udd jata hai. Hamesha `volumes: mongo_data:/data/db` lagayein taaki database ka data hard disk par safe rahe.\n3. **Exact Image Tags Pin Karein**:\n   Kabhi bhi `node:latest` mat likhein. Hamesha specific version use karein: `node:20-alpine`.\n4. **Layer Caching Ka Sahi Order**:\n   Jo cheez kam badalti hai (`package.json`) use upar rakhein aur jo roz badalti hai (`app code`) use neeche rakhein."}},{type:"interview",heading:{en:"Interview Questions & In-Depth Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:'### Q1: What is the fundamental difference between a Docker Image and a Docker Container?\n**Answer**:\nA **Docker Image** is an immutable, read-only template or blueprint built from a Dockerfile. It contains the application code, runtime libraries, environment variables, and system tools layered on top of a base OS.\nA **Docker Container** is an active, runnable, stateful instance of an image. When you execute `docker run`, Docker creates a thin, writable container layer on top of the immutable image layers and executes the application process inside an isolated Linux namespace and cgroup.\n\n---\n\n### Q2: What is the difference between the `CMD` and `ENTRYPOINT` instructions in a Dockerfile?\n**Answer**:\n- **`ENTRYPOINT`**: Configures the executable container binary that will always run when the container starts. It is difficult to accidentally override via CLI flags.\n- **`CMD`**: Provides default arguments to the `ENTRYPOINT` or defines the default command. Any arguments passed to `docker run <image> <args>` will completely override the `CMD` instruction.\n- **Production Standard**: Use `ENTRYPOINT ["dumb-init", "--"]` with `CMD ["node", "server.js"]` to combine reliable signal termination with default parameters.\n\n---\n\n### Q3: How does Docker Compose resolve network requests between containers without knowing their IP addresses?\n**Answer**:\nWhen you define services in a `docker-compose.yml` file, Docker automatically creates an internal **user-defined bridge network**. Docker runs an embedded internal DNS server at `127.0.0.11`.\nWhen the `api` container attempts to connect to `mongodb://mongodb:27017`, Docker\'s internal DNS automatically resolves the service name `mongodb` to the private container IP address assigned on that bridge network, eliminating hardcoded IPs.',hi:'### Q1: Docker Image aur Docker Container mein kya mukhya antar hai?\n**Answer**:\n**Docker Image** ek read-only blueprint ya template hoti hai jisme code, libraries aur runtime packed hote hain (jaise OOPs ki Class).\n**Docker Container** us image ka live, running instance hota hai (jaise Class ka Object). Container ke chalte waqt image ke upar ek thin writable layer jud jaati hai jisme temporary files likhi ja sakti hain.\n\n---\n\n### Q2: Dockerfile mein `CMD` aur `ENTRYPOINT` ka kya farq hota hai?\n**Answer**:\n- **`ENTRYPOINT`**: Wo main executable command hoti hai jo container start hone par hamesha chalegi aur ise aasani se override nahi kiya ja sakta.\n- **`CMD`**: Default arguments deta hai jise terminal se `docker run <image> <new_cmd>` dekar easily override kiya ja sakta hai.\n- **Best Practice**: Dono ko sath use karein: `ENTRYPOINT ["dumb-init", "--"]` aur `CMD ["node", "server.js"]`.\n\n---\n\n### Q3: Docker Compose aapas mein containers ke IP addresses kaise dhoondhta hai?\n**Answer**:\nDocker Compose har project ke liye ek private **bridge network** aur ek internal DNS server (`127.0.0.11`) banata hai.\nJab backend container `mongodb:27017` se connect karta hai, toh Docker ka internal DNS service name (`mongodb`) ko private IP address mein automatically convert kar deta hai.'}},{type:"summary",heading:{en:"Quick Summary",hi:"Quick Revision Summary"},body:{en:"- **Containers** eliminate environment drift by packaging code, runtime, and OS libraries into an identical unit.\n- **Containers vs VMs**: Containers share the host OS kernel, booting in milliseconds with tiny RAM usage.\n- **Layer Caching**: Always copy `package*.json` and run `npm ci` **before** copying the source code.\n- **Multi-Stage Builds** compile React in Node but serve via Nginx Alpine for images under 25MB.\n- **Docker Compose** orchestrates multi-container applications (Client + API + MongoDB) with automatic DNS networking and persistent volumes.\n- **Security**: Never run as `root` and always include a comprehensive `.dockerignore`.",hi:`- **Docker Containers** 'mere system pe chal raha tha' issue ko jad se khatam karte hain.
- **Containers vs VMs**: Containers host OS kernel share karte hain, milliseconds mein boot hote hain aur bohot kam RAM lete hain.
- **Layer Caching**: Pehle \`package.json\` copy karein taaki builds superfast rahein.
- **Multi-Stage Build**: React app ko compile karke 22MB ke Nginx image mein pack karein.
- **Docker Compose**: Single file se React, Node, aur MongoDB ko ek command mein start karein.
- **Security**: Hamesha non-root user use karein aur \`.dockerignore\` lagana na bhoolein.`}}],quiz:[{question:{en:"Why is it critical to COPY package*.json and run npm install BEFORE executing COPY . . in a Dockerfile?",hi:"Dockerfile mein COPY . . karne se PEHLE package*.json copy karke npm install chalana kyun zaroori hai?"},options:[{en:"Because Docker will fail to build if instructions are in any other order",hi:"Kyunki doosre order mein Docker build fail ho jata hai"},{en:"To take advantage of Docker layer caching: dependencies only reinstall when package manifests change, avoiding long npm installs on minor code edits",hi:"Docker layer caching ka fayda lene ke liye: dependencies sirf tab reinstall hoti hain jab package.json badalta hai, jisse har chote code change par lamba npm install nahi hota"},{en:"Because npm commands are only valid before the COPY command",hi:"Kyunki npm commands sirf COPY se pehle valid hoti hain"},{en:"To automatically delete local node_modules",hi:"Local node_modules delete karne ke liye"}],correctAnswer:1,explanation:{en:"Docker caches each build step. Placing package manifests first ensures npm install is only re-executed when dependencies change, dropping build times from minutes to seconds.",hi:"Docker layer caching har step ko save rakhta hai. package.json ko pehle copy karne se dependency installation layer cache ho jaati hai aur code badalne par re-run nahi hoti."}},{question:{en:"What happens to the data inside a MongoDB container if you do NOT attach a Docker Volume and the container is removed?",hi:"Agar aap MongoDB container mein Docker Volume attach nahi karte aur container delete ho jata hai, toh database data ka kya hota hai?"},options:[{en:"The data is automatically synced to the developer's Google Drive",hi:"Data Google Drive par sync ho jata hai"},{en:"All database data is permanently lost because the container filesystem layer is ephemeral",hi:"Saara database data permanently delete ho jata hai kyunki container ka filesystem temporary (ephemeral) hota hai"},{en:"Docker moves the data to the host machine's Desktop folder",hi:"Docker data ko Desktop par move kar deta hai"},{en:"The data is converted into an audio file",hi:"Data audio file ban jata hai"}],correctAnswer:1,explanation:{en:"Containers are completely ephemeral. Any writes to a container's internal filesystem are destroyed when the container stops or is removed. Persistent volumes are mandatory for databases.",hi:"Container temporary hote hain. Writable layer container ke delete hote hi destroy ho jaati hai. Isliye database ke liye named volume lagana compulsory hota hai."}},{question:{en:"In a docker-compose.yml setup, how should the Express backend connect to the MongoDB container?",hi:"docker-compose.yml setup mein Express backend ko MongoDB se kaise connect karna chahiye?"},options:[{en:"Using mongodb://localhost:27017",hi:"mongodb://localhost:27017 use karke"},{en:"Using the service name as the hostname (e.g., mongodb://mongodb:27017) resolved by Docker's embedded internal DNS",hi:"Service name ko hostname ki tarah use karke (jaise mongodb://mongodb:27017) jo Docker ke internal DNS se resolve hota hai"},{en:"Using the developer's public IP address",hi:"Public IP address use karke"},{en:"Using Bluetooth pairing",hi:"Bluetooth pairing se"}],correctAnswer:1,explanation:{en:"Each container operates in its own network namespace. In the API container, localhost refers to itself. Docker Compose creates an internal network where service names resolve automatically via DNS.",hi:"Har container ka apna network hota hai. Backend ke andar localhost uska apna loopback hota hai. Docker internal DNS service name (mongodb) ko sahi IP par resolve kar deta hai."}},{question:{en:"What is the primary benefit of a Multi-Stage Dockerfile for a React or Vite single-page application?",hi:"React ya Vite app ke liye Multi-Stage Dockerfile use karne ka sabse bada fayda kya hai?"},options:[{en:"It doubles the speed of JavaScript execution in the browser",hi:"Browser mein JavaScript ki speed double ho jaati hai"},{en:"It compiles the app in Node.js but serves only the final static assets using lightweight Nginx, shrinking the final image from ~800MB to under 25MB",hi:"Ye app ko Node.js mein compile karta hai lekin final image mein sirf static files ko Nginx se serve karta hai, jisse image size ~800MB se ghat kar <25MB ho jata hai"},{en:"It allows React to access the host operating system files directly",hi:"Ye React ko direct OS files access karne deta hai"},{en:"It eliminates the need for CSS",hi:"Ye CSS ki zaroorat khatam kar deta hai"}],correctAnswer:1,explanation:{en:"Multi-stage builds decouple build dependencies (Node, Vite, compilers) from the runtime environment. The final image only contains lightweight Nginx Alpine and static dist files, minimizing attack surface and image size.",hi:"Multi-stage build se heavy Node runtime final image se hat jata hai aur sirf lightweight Nginx reh jata hai, jisse image super light (<25MB) aur secure banti hai."}},{question:{en:"What is the core architectural purpose of Docker Basics for MERN Developers in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Docker Basics: Containerizing Node & MongoDB ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling docker basics for mern developers with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Docker Basics: Containerizing Node & MongoDB ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Docker Basics for MERN Developers establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Docker Basics: Containerizing Node & MongoDB clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Docker Basics for MERN Developers directly resolve?",hi:"Docker Basics: Containerizing Node & MongoDB kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Docker Basics for MERN Developers, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Docker Basics: Containerizing Node & MongoDB ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Docker Basics for MERN Developers, how is its mental model best conceptualized through real-world analogies?",hi:"Docker Basics: Containerizing Node & MongoDB ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Docker Basics for MERN Developers, what syntactic convention is essential to prevent runtime errors?",hi:"Docker Basics: Containerizing Node & MongoDB ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Docker Basics for MERN Developers?",hi:"Docker Basics: Containerizing Node & MongoDB ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Docker Basics for MERN Developers be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Docker Basics: Containerizing Node & MongoDB ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Docker Basics for MERN Developers impact application memory and CPU consumption?",hi:"Docker Basics: Containerizing Node & MongoDB ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Docker Basics for MERN Developers?",hi:"Docker Basics: Containerizing Node & MongoDB mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Docker Basics for MERN Developers?",hi:"Docker Basics: Containerizing Node & MongoDB mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Docker Basics for MERN Developers?",hi:"Docker Basics: Containerizing Node & MongoDB mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Docker Basics for MERN Developers, what must the test suite assert?",hi:"Docker Basics: Containerizing Node & MongoDB ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Docker Basics for MERN Developers?",hi:"Modular design Docker Basics: Containerizing Node & MongoDB mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Docker Basics for MERN Developers be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Docker Basics: Containerizing Node & MongoDB ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Docker Basics for MERN Developers properly belong and execute?",hi:"Full-stack MERN architecture mein Docker Basics: Containerizing Node & MongoDB kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Docker Basics for MERN Developers in production?",hi:"Production mein Docker Basics: Containerizing Node & MongoDB ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Docker Basics for MERN Developers?",hi:"Docker Basics: Containerizing Node & MongoDB ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Docker Basics for MERN Developers?",hi:"Docker Basics: Containerizing Node & MongoDB mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
