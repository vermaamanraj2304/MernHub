const e={id:"adv-cicd-github-actions",title:{en:"CI/CD Pipelines with GitHub Actions",hi:"CI/CD Automation: GitHub Actions Workflows"},difficulty:"Intermediate",readTime:11,sections:[{type:"concept",heading:{en:"1. The DevSecOps Revolution: Continuous Integration & Continuous Deployment",hi:"1. CI/CD Kya Hai? Continuous Integration Aur Continuous Deployment Ka Safar"},body:{en:`In fast-paced modern engineering teams, multiple developers submit Pull Requests (PRs) every day. Relying on humans to manually remember:
- *"Did you run ESLint before pushing?"*
- *"Did you run all 45 Jest tests?"*
- *"Did the Vite production build compile with zero TypeScript/JSX errors?"*

...guarantees catastrophic production outages. A developer merges broken code into \`main\`, and 10 minutes later, the live customer website crashes with a 500 Server Error.

---

### Understanding the CI/CD Pipeline:
\`\`\`
[ Developer git push / PR ]
            │
            ▼
┌────────────────────────────────────────────────────────┐
│         CONTINUOUS INTEGRATION (CI)                    │
│  1. Check out code from GitHub                         │
│  2. Install dependencies cleanly (npm ci)              │
│  3. Run linter (ESLint / Prettier)                     │
│  4. Execute automated tests (Jest + RTL)               │
│  5. Build production bundle (npm run build)            │
└────────────────────────────────────────────────────────┘
            │
            ▼ (All checks pass GREEN? Pull Request merged!)
┌────────────────────────────────────────────────────────┐
│         CONTINUOUS DEPLOYMENT (CD)                     │
│  6. Build and push Docker images                       │
│  7. Deploy frontend to Vercel / Cloudflare             │
│  8. Deploy Express API to Render / AWS ECS             │
│  9. Send deployment alert to Discord / Slack           │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Continuous Integration (CI)**: Automatically building, linting, and testing every single commit or Pull Request before it can be merged into the primary branch.
2. **Continuous Deployment (CD)**: Automatically releasing verified, passing builds directly to staging or production environments with zero human intervention.`,hi:`Jab ek team mein kayi developers sath kaam karte hain, toh manual checking par bharosa karna dangerous hota hai:
- *"Kya aapne push karne se pehle tests chalaye the?"*
- *"Kya build mein koi syntax error toh nahi hai?"*

Koi developer jaldi mein broken code merge kar deta hai aur live website crash ho jaati hai. Is samasya ko khatam karne ke liye **CI/CD** ka aavishkar hua.

---

### CI/CD Ka Poora Flow:
1. **Continuous Integration (CI)**:
   Jaise hi koi developer GitHub par code push karta hai ya Pull Request (PR) banata hai, cloud mein ek virtual machine automatically start ho jaati hai:
   - Code download hota hai.
   - Dependencies install hoti hain (\`npm ci\`).
   - Linter aur automated tests (Jest/RTL) chalte hain.
   - Production build verify hota hai.
   Agar ek bhi test fail hua, toh PR merge hone se block ho jaati hai!
2. **Continuous Deployment (CD)**:
   Saare tests pass hone ke baad, verified code automatically live cloud servers (jaise Vercel ya Render) par bina kisi manual intervention ke deploy ho jata hai.`}},{type:"concept",heading:{en:"2. The Anatomy of GitHub Actions Architecture",hi:"2. GitHub Actions Ka Internal Architecture Aur Core Components"},body:{en:"**GitHub Actions** is GitHub's native automation and CI/CD platform. Workflows are defined as YAML files stored inside the **`.github/workflows/`** directory in your repository root.\n\n```\n┌─────────────────────────────────────────────────────────────────┐\n│ Workflow (.github/workflows/ci.yml)                             │\n│ Triggered on: [push, pull_request]                              │\n│                                                                 │\n│  ┌──────────────────────────┐     ┌──────────────────────────┐  │\n│  │ Job 1: Lint & Unit Tests │     │ Job 2: Integration Tests │  │\n│  │ (runs-on: ubuntu-latest) │     │ (runs-on: ubuntu-latest) │  │\n│  ├──────────────────────────┤     ├──────────────────────────┤  │\n│  │ Step 1: Checkout repo    │     │ Step 1: Checkout repo    │  │\n│  │ Step 2: Setup Node 20    │     │ Step 2: Spin up Mongo DB │  │\n│  │ Step 3: npm ci           │     │ Step 3: Run Supertest    │  │\n│  │ Step 4: npm run test     │     │                          │  │\n│  └──────────────────────────┘     └──────────────────────────┘  │\n└─────────────────────────────────────────────────────────────────┘\n```\n\n### The 5 Core Concepts:\n1. **Workflows**: Automated configurable processes defined in a YAML file (e.g. `.github/workflows/test.yml`).\n2. **Events (`on:`)**: Specific repository triggers that initiate the workflow (e.g., `push` to `main`, `pull_request`, or scheduled `cron`).\n3. **Jobs**: A set of steps executed on the same runner virtual machine. By default, **multiple jobs run in parallel**, drastically reducing pipeline runtimes!\n4. **Runners**: Ephemeral virtual machines hosted by GitHub (e.g., `ubuntu-latest`, `macos-latest`, `windows-latest`) that boot up, execute your jobs, and terminate.\n5. **Steps & Actions**: Individual executable tasks within a job. They can run shell commands (`run: npm test`) or reusable community actions (`uses: actions/checkout@v4`).",hi:"**GitHub Actions** GitHub ka native CI/CD platform hai. Iske workflows repository ke **`.github/workflows/`** folder ke andar YAML files mein bante hain.\n\n### GitHub Actions Ke 5 Mukhya Pillars:\n1. **Workflow**: Ek automated YAML process file (jaise `ci.yml`).\n2. **Events (`on:`)**: Wo events jo workflow ko trigger karte hain (jaise `push`, `pull_request`, ya timer `schedule`).\n3. **Jobs**: Tasks ka group jo ek virtual machine par chalta hai. Agar 2 jobs hon (Frontend test aur Backend test), toh GitHub Actions dono ko **ek sath parallel mein** chalata hai taaki time bache!\n4. **Runners**: GitHub dwara di gayi cloud virtual machine (jaise `ubuntu-latest`).\n5. **Steps & Actions**: Job ke andar chalne wale chote steps (jaise `npm ci`, `npm test`, ya pre-built actions jaise `actions/checkout@v4`)."}},{type:"analogy",heading:{en:"Real-Life Analogy: The Automated Automobile Quality Conveyor Belt",hi:"Real-Life Analogy: Car Factory Ka Robotic Quality Inspection Belt"},body:{en:`Imagine the manufacturing assembly line at Maruti Suzuki's mega-plant in Manesar, Haryana:

- **The Manual Way (No CI/CD)**:
  Mechanics bolt together an engine, weld the doors, and paint the car. A driver gets in, turns the key, and immediately drives the car out to the showroom dealership.
  A customer buys the car, drives onto the expressway, and the steering wheel detaches because a mechanic forgot to tighten bolt #4!
- **The GitHub Actions Automated CI/CD Conveyor Belt**:
  As soon as the car chassis rolls off the assembly station (**git push event**):
  1. **Station 1 (Linting)**: Robotic laser arms scan the car's body panels, checking if paint thickness and panel gaps match 0.01mm specifications.
  2. **Station 2 (Testing Job)**: Automated hydraulic rams push down on the brake pedal 500 times, measuring fluid pressure and response time.
  3. **Station 3 (Waterproofing Job)**: High-pressure water jets blast the windshield from all angles to verify rubber seal integrity.
  4. **The Gatekeeper (Branch Protection)**: If even ONE red light blinks at Station 2, the conveyor belt halts instantly, locking the car in quarantine and alerting the mechanic (**PR Merge Blocked**).
  5. **Automated Delivery (CD)**: Only if all stations light up 100% GREEN does a robotic arm load the vehicle onto the transport truck for delivery!`,hi:`Maruti Suzuki ki car manufacturing factory ka example dekhein:

- **Bina CI/CD Ka Tareeqa**:
  Workers ne car jodi aur seedha showroom bhej di. Customer ne car kharidi aur highway par steering wheel nikal kar haath mein aa gaya kyunki worker ek bolt tight karna bhool gaya tha!
- **GitHub Actions (Robotic Quality Inspection Belt)**:
  Jaise hi car banti hai (**git push trigger**), wo robotic conveyor belt par aati hai:
  1. **Robotic Scanner (Linter)**: Laser scanner dekhta hai ki paint sahi hai ya nahi.
  2. **Crash & Brake Test (Unit Tests)**: Hydraulic machine brake daba kar check karti hai.
  3. **Water Test (Integration Test)**: Tez pani ki bauchar se check hota hai ki andar pani toh nahi ja raha.
  4. **Gatekeeper (Branch Protection Rule)**: Agar ek bhi test fail hua, toh conveyor belt car ko wahi rok deti hai aur PR merge nahi hone deti!
  5. **Auto Delivery (CD)**: Sabhi tests green hone par hi car automatically delivery truck par load hoti hai.`}},{type:"syntax",heading:{en:"Workflow YAML Syntax & Core Action Primitives",hi:"Workflow YAML Syntax Aur Zaroori Action Components"},body:{en:`### The Golden Rules of GitHub Actions YAML:
1. **Always use \`npm ci\` instead of \`npm install\`**:
   \`npm install\` mutates \`package-lock.json\` and can install newer minor versions, violating reproducibility. \`npm ci\` strictly installs the exact versions locked in \`package-lock.json\` and wipes existing \`node_modules\`, ensuring 100% deterministic builds.
2. **Secure Secrets with \`\${{ secrets.SECRET_NAME }}\`**:
   Never commit API tokens, database URIs, or cloud credentials to git! Store them in GitHub Repository Settings -> Secrets and reference them securely via environment variables.

### Basic Workflow Structure (\`.github/workflows/verify.yml\`):
\`\`\`yaml
name: Code Quality & CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  verify:
    name: Run Lint & Tests
    runs-on: ubuntu-latest
    steps:
      - name: 1. Check out repository code
        uses: actions/checkout@v4

      - name: 2. Set up Node.js runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm' # Automatically caches ~/.npm directory!

      - name: 3. Deterministic Dependency Install
        run: npm ci

      - name: 4. Check Code Style
        run: npm run lint

      - name: 5. Execute Test Suite
        run: npm test
\`\`\``,hi:`### GitHub Actions Ke 2 Golden Rules:
1. **Hamesha \`npm ci\` Use Karein, \`npm install\` Nahi**:
   \`npm install\` versions ko thoda badal sakta hai. \`npm ci\` strictly \`package-lock.json\` ke exact versions install karta hai aur builds ko 100% reliable banata hai.
2. **Secrets Ko Hamesha \`\${{ secrets.NAME }}\` Se Call Karein**:
   Database passwords ya API keys ko kabhi code mein mat likhein. GitHub Repo Settings -> Secrets mein dalein aur workflow mein securely inject karein.

### Workflow Ka Basic Skeleton:
\`\`\`yaml
name: CI Verification

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm' # npm caching built-in
      - run: npm ci
      - run: npm test
\`\`\``}},{type:"example",heading:{en:"Example 1: Pull Request Lint & Build Verification Workflow",hi:"Example 1: PR Par Linting Aur Vite Build Verify Karne Ka Workflow"},body:{en:`This workflow runs whenever a developer opens or updates a Pull Request targeting \`main\`. It checks formatting, runs ESLint, and verifies that Vite builds without errors:

\`\`\`yaml
# .github/workflows/pr-check.yml
name: PR Quality Gate

on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

concurrency:
  # Cancel previously running workflows on the same PR when new commits are pushed!
  group: pr-\${{ github.head_ref || github.run_id }}
  cancel-in-progress: true

jobs:
  lint-and-build:
    name: Lint & Build Validation
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies cleanly
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Verify Production Build
        run: npm run build
        env:
          NODE_ENV: production
\`\`\``,hi:`Ye workflow kisi bhi PR par chal kar linter aur Vite production build ko test karta hai taaki broken code merge na ho sake:

\`\`\`yaml
# .github/workflows/pr-check.yml
name: PR Quality Gate

on:
  pull_request:
    branches: [main]

# Naya commit aane par purana chal raha build cancel kar do
concurrency:
  group: pr-\${{ github.head_ref }}
  cancel-in-progress: true

jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run build
        env:
          NODE_ENV: production
\`\`\``}},{type:"example",heading:{en:"Example 2: Full MERN Stack CI Workflow with MongoDB Service Container",hi:"Example 2: MongoDB Service Container Ke Sath Full MERN CI Pipeline"},body:{en:`When running integration tests that need a real MongoDB server running on port 27017, GitHub Actions provides **Service Containers**:

\`\`\`yaml
# .github/workflows/mern-ci.yml
name: Full-Stack MERN CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # JOB 1: Test React Frontend
  frontend-tests:
    name: Frontend Tests (React Testing Library)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run React Component Tests
        run: npm test -- --watchAll=false

  # JOB 2: Test Express Backend with a real MongoDB Service Container!
  backend-tests:
    name: Backend Tests (Jest & Supertest)
    runs-on: ubuntu-latest

    # Ephemeral Docker container managed automatically by GitHub Actions
    services:
      mongodb:
        image: mongo:7.0
        ports:
          - 27017:27017
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run API Integration Tests
        run: npm run test:backend
        env:
          NODE_ENV: test
          # Connects to the service container on localhost:27017
          MONGO_URI: mongodb://localhost:27017/test_ci_db
          JWT_SECRET: ci-temporary-secret-token-123
\`\`\``,hi:`GitHub Actions ke **Service Containers** se hum backend testing ke dauraan real MongoDB 7.0 container spin up kar sakte hain:

\`\`\`yaml
# .github/workflows/mern-ci.yml
name: MERN Stack CI Pipeline

on:
  pull_request:
    branches: [main]

jobs:
  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --watchAll=false

  backend:
    runs-on: ubuntu-latest
    # MongoDB Service Container
    services:
      mongodb:
        image: mongo:7.0
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run test:backend
        env:
          MONGO_URI: mongodb://localhost:27017/test_db
          JWT_SECRET: test-secret-token
\`\`\``}},{type:"example",heading:{en:"Example 3: Production CD Workflow: Auto-Deploy to Render & Discord Notification",hi:"Example 3: Production CD Workflow: Render Auto-Deploy & Discord Alert"},body:{en:`This Continuous Deployment (CD) pipeline triggers **only after a Pull Request is successfully merged into \`main\`**. It hits a Render deploy webhook and alerts the team on Discord:

\`\`\`yaml
# .github/workflows/deploy-production.yml
name: Production Deployment (CD)

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Trigger Cloud Deployment
    runs-on: ubuntu-latest

    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Trigger Render Backend Deployment Hook
        run: |
          echo "🚀 Triggering Render Deploy Webhook..."
          curl -X POST "\${{ secrets.RENDER_DEPLOY_HOOK_URL }}"
        env:
          RENDER_DEPLOY_HOOK_URL: \${{ secrets.RENDER_DEPLOY_HOOK_URL }}

      - name: Send Discord Deployment Success Notification
        if: success()
        run: |
          curl -H "Content-Type: application/json"                -X POST                -d '{"content": "✅ **Production Deploy Succeeded!** Commit: \`\${{ github.sha }}\` by **\${{ github.actor }}**"}'                "\${{ secrets.DISCORD_WEBHOOK_URL }}"

      - name: Send Discord Deployment Failure Alert
        if: failure()
        run: |
          curl -H "Content-Type: application/json"                -X POST                -d '{"content": "🚨 **CRITICAL: Production Deployment Failed!** Please check GitHub Actions logs immediately!"}'                "\${{ secrets.DISCORD_WEBHOOK_URL }}"
\`\`\``,hi:`PR merge hone ke baad production cloud par auto-deploy karne aur Discord/Slack par message bhejne ka complete CD workflow:

\`\`\`yaml
# .github/workflows/deploy-production.yml
name: Production Deployment (CD)

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Render deploy webhook trigger
      - name: Trigger Render Deploy Hook
        run: |
          curl -X POST "\${{ secrets.RENDER_DEPLOY_HOOK_URL }}"

      # Success alert Discord par
      - name: Discord Success Alert
        if: success()
        run: |
          curl -H "Content-Type: application/json" -X POST             -d '{"content": "✅ **Live Deploy Ho Gaya!** Commit: \${{ github.sha }}"}'             "\${{ secrets.DISCORD_WEBHOOK_URL }}"

      # Failure alert
      - name: Discord Failure Alert
        if: failure()
        run: |
          curl -H "Content-Type: application/json" -X POST             -d '{"content": "🚨 **DEPLOYMENT FAILED!** Actions log check karein!"}'             "\${{ secrets.DISCORD_WEBHOOK_URL }}"
\`\`\``}},{type:"mistakes",heading:{en:"Common Mistakes and How to Avoid Them",hi:"Aam Galtiyan Aur Unka Sahi Solution"},body:{en:'### 1. Using `npm install` Instead of `npm ci`\n- **Mistake**: Writing `run: npm install` in GitHub Actions.\n- **Why it breaks**: `npm install` can resolve newer minor dependency updates, meaning tests pass on your machine with version 2.1.0, but fail in CI because npm installed 2.1.9 with an incompatible bug!\n- **Fix**: Always use `npm ci` (Clean Install), which strictly uses `package-lock.json`.\n\n### 2. Exposing Secrets in Console Logs\n- **Mistake**: Writing `run: echo "Connecting with ${{ secrets.MONGO_URI }}"`.\n- **Why it hurts**: While GitHub attempts to mask exact secret strings, variations or decoded tokens can leak into public build logs, exposing database passwords to anyone with repo read access.\n- **Fix**: Never `echo` secrets. Pass them exclusively as environment variables directly to the command: `env: MONGO_URI: ${{ secrets.MONGO_URI }}`.\n\n### 3. Merging Code Without Branch Protection Rules\n- **Mistake**: Creating GitHub Actions workflows without turning on GitHub\'s "Require status checks to pass before merging" setting.\n- **Why it hurts**: A developer\'s tests fail in CI, but they click "Merge Pull Request" anyway!\n- **Fix**: In GitHub Repo Settings -> Branches -> Add branch protection rule for `main`. Enable **"Require status checks to pass before merging"** and select your CI jobs.',hi:'### 1. `npm install` Use Karna `npm ci` Ke Badle\n- **Galti**: CI runner mein `npm install` chalana.\n- **Nuksan**: `npm install` package-lock ke badle naye minor versions install kar sakta hai jisse local par code chalega par CI mein phat jayega.\n- **Solution**: Hamesha `npm ci` use karein.\n\n### 2. Secrets Ko Console Mein Print Kar Dena\n- **Galti**: `echo ${{ secrets.DB_KEY }}` likhna.\n- **Nuksan**: Agar token thoda sa bhi manipulate hua, toh wo public actions logs mein chala jayega aur koi bhi database hack kar sakta hai.\n- **Solution**: Secrets ko console par print na karein, sirf `env:` variables ke zariye pass karein.\n\n### 3. Branch Protection Rule Na Lagana\n- **Galti**: Tests fail hone par bhi PR merge ho sakna.\n- **Nuksan**: Developer tests fail hone ke baad bhi code `main` mein daal deta hai.\n- **Solution**: GitHub Settings -> Branches mein jaakar **"Require status checks to pass before merging"** tick karein.'}},{type:"tip",heading:{en:"Production Best Practices",hi:"Production Best Practices & Pro Tips"},body:{en:"1. **Enable Automatic Dependency Caching**:\n   Always specify `cache: 'npm'` in `actions/setup-node@v4`. This caches the global npm cache across workflow runs, cutting install times from 2 minutes down to 10 seconds.\n2. **Use `concurrency` to Cancel Stale PR Builds**:\n   When a developer pushes 3 rapid commits to a PR, cancel previous running builds using `cancel-in-progress: true`. This saves monthly GitHub Actions free minutes and prevents queue bottlenecks.\n3. **Run Independent Jobs in Parallel**:\n   Split your workflow into separate jobs (`frontend-tests` and `backend-tests`). GitHub allocates a separate Ubuntu runner for each, executing both concurrently.\n4. **Enforce Semantic Release or Git Tags for Production**:\n   Trigger production deployments only on tagged releases (e.g., `tags: ['v*']`) or explicit merges to `main` with approval environments.",hi:"1. **Dependency Caching On Rakhein**:\n   `actions/setup-node@v4` mein `cache: 'npm'` likhein taaki dependencies har baar scratch se download na honi padein aur build time 10 second reh jaye.\n2. **`concurrency` Se Purane Builds Cancel Karein**:\n   Jab developer tezi se 2-3 commits bhejta hai, toh purana build bekar chal raha hota hai. `cancel-in-progress: true` purane build ko turant cancel kar deta hai.\n3. **Jobs Ko Parallel Mein Chalayein**:\n   Frontend tests aur Backend tests ko 2 alag jobs mein baantein taaki dono ek sath alag-alag machines par execute hon.\n4. **Branch Protection Enforce Karein**:\n   `main` branch par direct push block karein; sirf green verified PR hi merge honi chahiye."}},{type:"interview",heading:{en:"Interview Questions & In-Depth Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:'### Q1: What is the fundamental difference between Continuous Delivery and Continuous Deployment?\n**Answer**:\n- **Continuous Delivery**: Every code change that passes the automated CI test suite is packaged and built into a release-ready artifact (e.g. Docker image). However, the actual deployment trigger to live production requires a **manual human approval gate** (e.g., clicking a "Release to Production" button).\n- **Continuous Deployment**: Eliminates all manual approval gates. Every commit that passes automated linting, unit tests, integration tests, and build checks is **automatically and instantly deployed straight to production servers** within minutes.\n\n---\n\n### Q2: Why is `npm ci` preferred over `npm install` in automated CI/CD pipelines?\n**Answer**:\n1. **Deterministic Reproducibility**: `npm ci` installs exact dependency versions locked inside `package-lock.json`. It never updates or rewrites the lockfile.\n2. **Clean Slate**: It deletes the existing `node_modules` folder before installing, guaranteeing zero leftover artifacts from previous runs.\n3. **Speed**: It bypasses user-oriented dependency resolution algorithms, installing up to 2x faster than `npm install`.\n4. **Integrity Validation**: If `package.json` and `package-lock.json` are out of sync, `npm ci` immediately throws an error and fails the build rather than silently installing unapproved packages.\n\n---\n\n### Q3: How do GitHub Actions Service Containers work during integration tests?\n**Answer**:\nService Containers are temporary Docker containers automatically provisioned and managed by GitHub Actions alongside the main runner job (e.g., MongoDB, Redis, or PostgreSQL).\nBoth the runner job and the service container share the same virtual network namespace. The integration tests executing inside the runner can access the database service directly via `localhost:<port>` (e.g., `localhost:27017`), allowing end-to-end database testing without installing MongoDB on the host runner OS.',hi:"### Q1: Continuous Delivery aur Continuous Deployment mein kya farq hai?\n**Answer**:\n- **Continuous Delivery**: Code ke saare tests pass hone ke baad deploy-ready package ban jata hai, lekin production live karne ke liye kisi lead ya manager ka **manual approval button click** zaroori hota hai.\n- **Continuous Deployment**: Isme koi manual button nahi hota. Jaise hi PR merge hoti hai aur tests pass hote hain, code turant automatically live production servers par deploy ho jata hai.\n\n---\n\n### Q2: CI/CD mein `npm ci` kyun use kiya jata hai `npm install` ke badle?\n**Answer**:\n1. **Exact Reproducibility**: `npm ci` strictly `package-lock.json` ke exact versions install karta hai aur lockfile ko modify nahi karta.\n2. **Clean Slate**: Ye purane `node_modules` ko delete karke fresh install karta hai.\n3. **Speed**: Ye `npm install` se 2 guna tezi se packages download karta hai.\n4. **Mismatch Protection**: Agar `package.json` aur `package-lock.json` aapas mein match nahi karte, toh `npm ci` turant build fail kar deta hai taaki koi unauthorized package na ghus sake.\n\n---\n\n### Q3: GitHub Actions Service Containers kya hote hain?\n**Answer**:\nService Containers temporary Docker containers hote hain jo GitHub Actions runner ke bagal mein automatically start kar deta hai (jaise real MongoDB ya Redis).\nRunner par chalne wale tests seedha `localhost:27017` par connect karke real database queries chala sakte hain bina runner OS par MongoDB install kiye."}},{type:"summary",heading:{en:"Quick Summary",hi:"Quick Revision Summary"},body:{en:"- **Continuous Integration (CI)** guarantees that every Pull Request is automatically linted, tested, and built before merging.\n- **Continuous Deployment (CD)** automatically publishes passing builds straight to production servers.\n- **GitHub Actions Workflows** are YAML files located in `.github/workflows/` triggered by repo events (`push`, `pull_request`).\n- **Use `npm ci`** for deterministic, lockfile-faithful dependency installation.\n- **Service Containers** spin up isolated MongoDB or Redis instances in Docker for real integration testing.\n- **Branch Protection Rules** enforce that pull requests cannot be merged unless all status checks turn green.",hi:"- **Continuous Integration (CI)** har PR ko merge hone se pehle lint, test aur build verify karta hai.\n- **Continuous Deployment (CD)** verify hue code ko live cloud servers par automatically deploy karta hai.\n- **GitHub Actions Workflows** repository ke `.github/workflows/` folder mein YAML files hoti hain.\n- **Hamesha `npm ci` use karein** taaki dependencies bilkul deterministic aur exact lockfile ke anusaar rahein.\n- **Service Containers** se real MongoDB/Redis containers ke sath automated integration tests chalaye jaate hain.\n- **Branch Protection Rules** lagane se failed tests wala code kabhi bhi `main` branch mein merge nahi ho sakta."}}],quiz:[{question:{en:"Why is npm ci strictly preferred over npm install inside CI/CD workflow runners?",hi:"CI/CD workflow runners mein npm install ke badle npm ci kyun compulsory mana jata hai?"},options:[{en:"Because npm install is blocked on Linux operating systems",hi:"Kyunki npm install Linux par blocked hota hai"},{en:"npm ci guarantees 100% deterministic builds by installing exact versions from package-lock.json without modifying it, and fails if dependencies are mismatched",hi:"npm ci package-lock.json se exact versions install karke 100% deterministic builds deta hai aur lockfile mismatch hone par build fail kar deta hai"},{en:"Because npm ci installs Python automatically",hi:"Kyunki npm ci Python install karta hai"},{en:"Because npm install does not support internet downloads",hi:"Kyunki npm install internet se download nahi kar sakta"}],correctAnswer:1,explanation:{en:"npm ci strictly respects package-lock.json and refuses to update it. If package.json and the lockfile disagree, it errors out immediately, preventing rogue version drift.",hi:"npm ci package-lock.json ko bina badle exact lockfile versions install karta hai jisse koi version mismatch nahi hota."}},{question:{en:"What is the primary role of GitHub Actions 'concurrency' with cancel-in-progress: true?",hi:"GitHub Actions mein 'concurrency' ke sath cancel-in-progress: true lagane ka mukhya fayda kya hai?"},options:[{en:"It doubles the CPU speed of the runner",hi:"Ye runner ki CPU speed double kar deta hai"},{en:"When a developer pushes multiple commits to an open PR, it automatically aborts previous in-progress builds, saving runner minutes and avoiding redundant work",hi:"Jab developer kisi PR par baar-baar nayi commits push karta hai, toh ye purane chal rahe builds ko automatically cancel kar deta hai taaki minutes bachein"},{en:"It permanently cancels the developer's GitHub account",hi:"Ye developer ka account band kar deta hai"},{en:"It deletes the git repository",hi:"Ye repo delete kar deta hai"}],correctAnswer:1,explanation:{en:"If a developer pushes commit 1 and immediately pushes commit 2, testing commit 1 is a waste of resources. cancel-in-progress kills the outdated job immediately.",hi:"Naya commit aane par purana commit test karna time barbad karna hota hai. cancel-in-progress purane build ko turant band kar deta hai."}},{question:{en:"How do Service Containers in GitHub Actions assist with backend integration testing?",hi:"Backend integration testing mein GitHub Actions Service Containers kaise madad karte hain?"},options:[{en:"They automatically write mock functions",hi:"Ye mock functions likhte hain"},{en:"They spin up ephemeral Docker containers (like real MongoDB or Redis) networked to localhost, allowing tests to run against live databases without manual installations",hi:"Ye background mein real Docker containers (jaise MongoDB ya Redis) start kar dete hain jisse tests seedha live database se baat kar sakte hain"},{en:"They print console logs in color",hi:"Ye colored console logs print karte hain"},{en:"They replace the Express framework",hi:"Ye Express ko replace karte hain"}],correctAnswer:1,explanation:{en:"Service containers provide ephemeral databases (MongoDB, PostgreSQL, Redis) running directly in Docker alongside the runner job, mapped to localhost ports.",hi:"Service containers runner ke bagal mein real database container chala dete hain taaki automated tests real DB ke sath execute ho sakein."}},{question:{en:"What repository setting must be enabled to ensure broken PRs with failing tests can never be merged into main?",hi:"Ye pakka karne ke liye ki failed tests wali PR kabhi main branch mein merge na ho sake, kaunsi GitHub setting enable karni chahiye?"},options:[{en:"Two-factor authentication",hi:"Two-factor authentication"},{en:"Branch Protection Rule: 'Require status checks to pass before merging'",hi:"Branch Protection Rule: 'Require status checks to pass before merging'"},{en:"Public repository visibility",hi:"Public repository visibility"},{en:"GitHub Sponsors program",hi:"GitHub Sponsors program"}],correctAnswer:1,explanation:{en:"Branch protection rules enforce that specified CI status checks must be green before the 'Merge Pull Request' button can be activated.",hi:"Branch protection rule jab tak saare tests green nahi hote tab tak 'Merge' button ko lock rakhta hai."}},{question:{en:"What is the core architectural purpose of CI/CD Pipelines with GitHub Actions in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein CI/CD Automation: GitHub Actions Workflows ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling ci/cd pipelines with github actions with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath CI/CD Automation: GitHub Actions Workflows ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"CI/CD Pipelines with GitHub Actions establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"CI/CD Automation: GitHub Actions Workflows clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does CI/CD Pipelines with GitHub Actions directly resolve?",hi:"CI/CD Automation: GitHub Actions Workflows kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without CI/CD Pipelines with GitHub Actions, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"CI/CD Automation: GitHub Actions Workflows ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about CI/CD Pipelines with GitHub Actions, how is its mental model best conceptualized through real-world analogies?",hi:"CI/CD Automation: GitHub Actions Workflows ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing CI/CD Pipelines with GitHub Actions, what syntactic convention is essential to prevent runtime errors?",hi:"CI/CD Automation: GitHub Actions Workflows ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with CI/CD Pipelines with GitHub Actions?",hi:"CI/CD Automation: GitHub Actions Workflows ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should CI/CD Pipelines with GitHub Actions be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye CI/CD Automation: GitHub Actions Workflows ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of CI/CD Pipelines with GitHub Actions impact application memory and CPU consumption?",hi:"CI/CD Automation: GitHub Actions Workflows ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within CI/CD Pipelines with GitHub Actions?",hi:"CI/CD Automation: GitHub Actions Workflows mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in CI/CD Pipelines with GitHub Actions?",hi:"CI/CD Automation: GitHub Actions Workflows mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in CI/CD Pipelines with GitHub Actions?",hi:"CI/CD Automation: GitHub Actions Workflows mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for CI/CD Pipelines with GitHub Actions, what must the test suite assert?",hi:"CI/CD Automation: GitHub Actions Workflows ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in CI/CD Pipelines with GitHub Actions?",hi:"Modular design CI/CD Automation: GitHub Actions Workflows mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should CI/CD Pipelines with GitHub Actions be architected to support horizontal scaling?",hi:"Traffic 100x badhne par CI/CD Automation: GitHub Actions Workflows ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does CI/CD Pipelines with GitHub Actions properly belong and execute?",hi:"Full-stack MERN architecture mein CI/CD Automation: GitHub Actions Workflows kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with CI/CD Pipelines with GitHub Actions in production?",hi:"Production mein CI/CD Automation: GitHub Actions Workflows ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for CI/CD Pipelines with GitHub Actions?",hi:"CI/CD Automation: GitHub Actions Workflows ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in CI/CD Pipelines with GitHub Actions?",hi:"CI/CD Automation: GitHub Actions Workflows mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
