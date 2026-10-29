const e={id:"dep-vercel-frontend",title:{en:"Deploying React Frontend to Vercel & Netlify",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna"},difficulty:"Beginner",readTime:10,sections:[{type:"concept",heading:{en:"1. The Modern Jamstack & Edge CDN Hosting Architecture",hi:"1. Modern Jamstack Aur Edge CDN Hosting Ka Model"},body:{en:`When deploying a modern Single Page Application (SPA) built with React and Vite, the compiled output is not a running Node.js server. Instead, running \`npm run build\` generates pure, static assets:
- An \`index.html\` entry file
- Optimized, minified JavaScript chunks (\`.js\`)
- Compiled Tailwind CSS stylesheets (\`.css\`)
- Compressed images, SVG icons, and fonts

### Why Traditional VPS Hosting is Obsolete for SPAs
In the past, developers rented virtual private servers (like AWS EC2 or DigitalOcean droplets) to serve static React files via Apache or Nginx.
- **High Cost**: You pay $10 to $40 per month even when zero users are visiting your site.
- **Single Point of Failure**: If your EC2 instance in Mumbai crashes, users worldwide cannot access your site.
- **High Global Latency**: A user opening your app from London or New York has to wait 250ms for TCP packets to travel all the way to a Mumbai server.

---

### The Edge CDN Revolution: Vercel & Netlify
Platforms like **Vercel** and **Netlify** are purpose-built for frontend applications:
1. **Global Edge Network (CDN)**: Your static assets are replicated across **300+ Edge Data Centers worldwide**. When a user in Delhi opens your app, assets are served from a CDN edge node in Delhi in **<15 milliseconds**!
2. **Atomic Git Deployments**: Every \`git push\` to GitHub triggers an automated build. If the build succeeds, traffic flips atomically to the new version with **zero downtime**.
3. **Branch Preview Deployments**: Every Pull Request gets its own unique, shareable URL (e.g. \`https://hub-git-feature-darkmode.vercel.app\`) for instant QA testing.
4. **Automated Free SSL/TLS**: Instant HTTPS certificates provisioned and auto-renewed via Let's Encrypt.`,hi:`Jab aap React aur Vite mein bani Single Page Application (SPA) ko compile karte hain (\`npm run build\`), toh koi Node.js server nahi banta, balki pure static files banti hain:
- Ek \`index.html\` file
- Minified JavaScript bundle (\`.js\`)
- Compiled CSS styles (\`.css\`)
- Images aur fonts

### Traditional VPS Server Kyun Purana Ho Gaya?
Pehle log React files ko serve karne ke liye AWS EC2 ya DigitalOcean droplet rent karte the:
- Mahine ke ₹800 se ₹3,000 ka kharcha hota tha chahe koi user aaye ya na aaye.
- Agar server crash ho gaya, toh poori website band ho jaati thi.
- New York ke user ko Mumbai ke server se file download karne mein 300ms ka lag aata tha.

---

### Vercel Aur Netlify Ka Jadu (Edge CDN Hosting):
1. **Global Edge CDN**: Aapka static code duniya bhar ke **300 se zyada Edge servers** par copy ho jata hai. India ke user ko Mumbai CDN se data milta hai aur US ke user ko New York se (Latency sirf 10ms!).
2. **Git Push Deployment**: Jaise hi aap GitHub par \`git push\` karte hain, Vercel automatic code build karke live kar deta hai.
3. **Preview URLs**: Har Pull Request (PR) ke liye ek naya testing link mil jata hai bina main site ko chhede.
4. **Free Automatic SSL**: HTTPS certificate automatically lag jata hai aur auto-renew hota hai.`}},{type:"concept",heading:{en:"2. The Dreaded 404 on Refresh Bug & The Client-Side Routing Rewrite",hi:"2. Page Refresh Par Aane Wala 404 Bug Aur vercel.json Ka Solution"},body:{en:'The #1 most common issue beginner MERN developers face after deploying to Vercel or Netlify is the **"404 Not Found on Page Refresh"** bug.\n\n### Why Does the 404 Bug Happen?\n1. In a traditional multi-page website, visiting `/about` causes the web server to search its physical hard drive for a file located at `/about/index.html`.\n2. In React Router Single Page Applications, **physical files do NOT exist for individual routes**! There is only **one single physical HTML file**: `dist/index.html`.\n3. When a user clicks a link from the home page to `/dashboard`, React Router intercepts the click in JavaScript and updates the browser URL bar using the HTML5 `history.pushState()` API without making a network request.\n4. But when the user presses **F5 / Browser Refresh** on `https://myapp.vercel.app/dashboard`:\n   - The browser sends an HTTP `GET /dashboard` request to Vercel\'s edge server.\n   - Vercel inspects its storage for a file named `dashboard` or `dashboard.html`.\n   - Finding nothing, Vercel returns: **404: NOT_FOUND**!\n\n---\n\n### The Permanent Fix: Single-Page Rewrite Rules\nWe must instruct the hosting server: *"If any incoming request path does not match a real physical asset (like an image or CSS file), do NOT return 404. Instead, serve `index.html` and let React Router handle the route in the client!"*\n\n- **For Vercel**: Create a `vercel.json` in your client project root:\n```json\n{\n  "rewrites": [\n    {\n      "source": "/(.*)",\n      "destination": "/"\n    }\n  ]\n}\n```\n\n- **For Netlify**: Create a `public/_redirects` file:\n```\n/*    /index.html   200\n```',hi:'Vercel ya Netlify par React app deploy karne ke baad 99% developers ko sabse pehle ye bug milta hai:\n- Homepage khulta hai aur sab sahi chalta hai.\n- Lekin jaise hi user `/dashboard` par jaakar page **Refresh (F5)** karta hai, screen par bada sa **404: NOT_FOUND** aa jata hai!\n\n### Ye 404 Bug Kyun Aata Hai?\n1. React Router ek Single Page Application (SPA) hai. Isme alag-alag pages ke liye physical HTML files nahi hoti; poori app mein sirf **ek hi physical file** hoti hai: `index.html`.\n2. Jab aap button click karke `/dashboard` par jaate hain, toh React Router browser ka URL bina page reload kiye badal deta hai.\n3. Lekin jab user wahi par Refresh dabata hai, toh browser Vercel ke server se maangta hai: *"Mujhe `/dashboard` wali file do!"*\n4. Vercel apne folder mein dhoondhta hai. Wahan `dashboard.html` naam ki koi file nahi hoti, isliye wo 404 error fek deta hai!\n\n---\n\n### Iska Solution: Server Rewrite Rule\nHumein Vercel ko bolna padta hai: *"Chahe user kisi bhi route (`/profile`, `/settings`, `/courses`) par jaye, hamesha `index.html` return karo! Aage ka routing React Router khud sambhal lega."*\n\n- **Vercel ke liye**: Root folder mein `vercel.json` banayein:\n```json\n{\n  "rewrites": [\n    {\n      "source": "/(.*)",\n      "destination": "/"\n    }\n  ]\n}\n```\n\n- **Netlify ke liye**: `public/_redirects` file banayein:\n```\n/*    /index.html   200\n```'}},{type:"analogy",heading:{en:"Real-Life Analogy: The Global Courier Express Hub vs The Local Warehouse",hi:"Real-Life Analogy: Global Courier Hub vs Local Godown"},body:{en:`Imagine running a publishing house in Bangalore selling study books across India:

- **The Traditional VPS Hosting Way (Single Local Godown in Bangalore)**:
  You store all your physical books in a single rented godown in Bangalore.
  When a student in Guwahati or Kashmir orders a book, a delivery truck must drive 3,000 kilometers across India. It takes 7 days for the parcel to arrive, the shipping cost is huge, and if heavy floods hit Bangalore, deliveries to all 28 states freeze completely!
- **The Vercel Edge CDN Way (Amazon Prime Fulfillment Centers in Every City)**:
  Instead of one godown, you digitize the book's printing template. Vercel places smart digital mini-presses (**Edge CDN nodes**) in 50 Indian cities (Delhi, Mumbai, Kolkata, Chennai, Jaipur, Guwahati).
  When a student in Guwahati clicks "Order", the local Guwahati hub prints and delivers the parcel in 15 minutes! If Bangalore gets flooded, all other 49 hubs continue operating with zero disruption.
- **The 404 Rewrite (The Single Smart Reception Desk)**:
  Visitors arrive at the delivery hub asking for "Chapter 4: React Routing".
  Instead of saying *"We don't have a separate building named Chapter 4, go away (404)"*, the smart reception desk hands the visitor the complete Master Book (\`index.html\`) and says: *"Turn to Chapter 4 on page 50!"* (Client-side routing). Everyone finds what they need!`,hi:`Bangalore ke book publishing house ka example dekhein:

- **Traditional VPS Server (Bangalore Ka Single Godown)**:
  Aapne saari kitabein Bangalore ke ek godown mein rakh rakhi hain.
  Assam ya Kashmir ke student ne book order ki toh truck ko 3,000 km chal kar aane mein 7 din lagenge. Agar Bangalore mein baadh aa gayi, toh poore desh ka supply band ho jayega.
- **Vercel Edge CDN (Har Shehar Ka Local Fulfillment Hub)**:
  Vercel aapki website ki static files ko India ke 50 sheharon ke local servers par pehle se copy karke rakh deta hai.
  Kashmir ke student ko Srinagar CDN se aur Kerala ke student ko Kochi CDN se 10 millisecond mein data mil jata hai!
- **404 Rewrite (Smart Reception Desk)**:
  Agar koi student reception par aakar bole: *"Mujhe Page #5 wali building chahiye"*.
  Security guard use bhaga nahi deta (404), balki use poori book pakdata hai aur kehta hai: *"Ye rahi book (\`index.html\`), isme page 5 khol lo!"* (Client-side routing).`}},{type:"syntax",heading:{en:"Configuration Files: vercel.json & netlify.toml",hi:"Configuration Files: vercel.json Aur netlify.toml Ka Syntax"},body:{en:`### 1. Vercel Configuration File (\`vercel.json\`)
Place this file in the root of your frontend repository:

\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
\`\`\`

### 2. Netlify Configuration File (\`netlify.toml\`)
Alternatively, for Netlify deployments, create \`netlify.toml\` in the root:

\`\`\`toml
[build]
  command = "npm run build"
  publish = "dist"

# SPA Fallback rule
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Aggressive caching for hashed Vite assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
\`\`\``,hi:`### 1. Vercel Ke Liye \`vercel.json\`:
Frontend project ke root folder mein ye file banayein:

\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
\`\`\`

### 2. Netlify Ke Liye \`netlify.toml\`:
\`\`\`toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\`\`\``}},{type:"example",heading:{en:"Example 1: Dynamic Environment Variables in Vite for Production API Connection",hi:"Example 1: Vite Mein Production Backend API URL Connect Karna"},body:{en:`In development, your frontend connects to \`http://localhost:5000\`. In production, it must connect to your live backend domain (e.g., \`https://api.myhub.com\`).
Never hardcode API URLs! Use Vite's \`import.meta.env\`:

\`\`\`javascript
// src/api/apiClient.js
import axios from 'axios';

// 1. Read environment variable with safe fallback for local development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Required for secure HTTP-only auth cookies!
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

export default apiClient;
\`\`\`

### Setting Variables in Vercel Dashboard:
1. Navigate to your project on **vercel.com** -> **Settings** -> **Environment Variables**.
2. Add Key: \`VITE_API_URL\`
3. Value: \`https://mern-backend-api.onrender.com\`
4. Scope: Check **Production**, **Preview**, and **Development**.
5. Trigger a redeploy: Vercel injects this variable during the \`npm run build\` step!`,hi:`Development mein aapka React frontend \`http://localhost:5000\` se baat karta hai, lekin production mein ise live backend server (Render/Railway) se baat karni hoti hai.
URL ko kabhi hardcode na karein! Vite ka \`import.meta.env\` use karein:

\`\`\`javascript
// src/api/apiClient.js
import axios from 'axios';

// VITE_ prefix hona compulsory hai!
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Auth cookies bhejne ke liye zaroori
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
\`\`\`

### Vercel Dashboard Mein Variable Kaise Dalein:
1. **vercel.com** par jayein -> Project -> **Settings** -> **Environment Variables**.
2. Key: \`VITE_API_URL\`
3. Value: \`https://my-backend.onrender.com\`
4. Save karke redeploy dabayein. Vite build ke waqt ye URL inject kar dega!`}},{type:"example",heading:{en:"Example 2: Deploying via Vercel CLI from the Terminal",hi:"Example 2: Terminal Se Vercel CLI Use Karke Direct Deploy Karna"},body:{en:`While GitHub Git integration is recommended, you can deploy directly from your local terminal using the official Vercel CLI:

\`\`\`bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to your Vercel account via browser authentication
vercel login

# 3. Deploy a Preview Environment (interactive wizard)
vercel

# The CLI will prompt:
# ? Set up and deploy "~/Desktop/Learn/little"? [Y/n] y
# ? Which scope do you want to deploy to? my-team
# ? Link to existing project? [y/N] n
# ? What's your project's name? mern-learning-hub
# ? In which directory is your code located? ./
# ? Want to modify these settings? [y/N] n
# ==> Deployed to: https://mern-learning-hub-abc123.vercel.app

# 4. Deploy directly to LIVE Production:
vercel --prod
\`\`\``,hi:`Terminal se direct deploy karne ke liye Vercel CLI ka use:

\`\`\`bash
# 1. Global CLI install karein
npm install -g vercel

# 2. Vercel account login karein
vercel login

# 3. Project initialize aur Preview deploy karein
vercel

# 4. Final Production live karne ke liye:
vercel --prod
\`\`\``}},{type:"example",heading:{en:"Example 3: Automated Production CI/CD with GitHub Actions & Vercel Preview Comments",hi:"Example 3: GitHub Actions Se Vercel Automated Deploy & PR Comments"},body:{en:`This workflow uses the official Vercel GitHub Action to deploy preview builds for every pull request and auto-post the preview URL as a comment on the PR:

\`\`\`yaml
# .github/workflows/frontend-deploy.yml
name: Deploy Frontend to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=\${{ github.ref == 'refs/heads/main' && 'production' || 'preview' }} --token=\${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build \${{ github.ref == 'refs/heads/main' && '--prod' || '' }} --token=\${{ secrets.VERCEL_TOKEN }}

      - name: Deploy Project to Vercel
        id: deploy
        run: |
          DEPLOY_URL=$(vercel deploy --prebuilt \${{ github.ref == 'refs/heads/main' && '--prod' || '' }} --token=\${{ secrets.VERCEL_TOKEN }})
          echo "url=$DEPLOY_URL" >> $GITHUB_OUTPUT
\`\`\``,hi:`GitHub Actions se Vercel par automated production aur preview deployments chalane ka script:

\`\`\`yaml
# .github/workflows/frontend-deploy.yml
name: Deploy Frontend to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install -g vercel@latest
      - name: Deploy to Vercel
        run: vercel deploy \${{ github.ref == 'refs/heads/main' && '--prod' || '' }} --token=\${{ secrets.VERCEL_TOKEN }}
\`\`\``}},{type:"mistakes",heading:{en:"Common Mistakes and How to Avoid Them",hi:"Aam Galtiyan Aur Unka Sahi Solution"},body:{en:'### 1. Forgetting `vercel.json` (The 404 Bug)\n- **Mistake**: Pushing a React Router app without rewrite rules.\n- **Consequence**: Users refreshing `/dashboard` or `/courses/react` get an ugly 404 error page.\n- **Fix**: Always include `vercel.json` with `"source": "/(.*)", "destination": "/"`.\n\n### 2. Storing Backend Secrets in Vite `.env`\n- **Mistake**: Adding `VITE_JWT_SECRET=supersecret` or `VITE_MONGO_URI=mongodb+srv://...` in your client `.env`.\n- **Consequence**: Any variable with the `VITE_` prefix is **baked directly into the public JavaScript bundle** downloaded by every visitor! Anyone can open Chrome DevTools, inspect the JS file, and steal your database credentials!\n- **Fix**: Only put public variables in Vite (like `VITE_API_URL` or `VITE_STRIPE_PUBLIC_KEY`). Never prefix database passwords or private keys with `VITE_`.\n\n### 3. Hardcoding `http://localhost:5000`\n- **Mistake**: Leaving `axios.get(\'http://localhost:5000/api/users\')` in production code.\n- **Consequence**: When users visit the deployed website, their browser attempts to fetch from *their own local machine* instead of your production backend!\n- **Fix**: Always use `import.meta.env.VITE_API_URL`.',hi:"### 1. `vercel.json` Bhool Jana (404 Page Not Found)\n- **Galti**: Bina rewrite rule ke React Router app deploy kar dena.\n- **Nuksan**: User kisi inner page par jaakar refresh karega toh 404 error aa jayega.\n- **Solution**: Project root mein `vercel.json` zaroor rakhein.\n\n### 2. Backend Ke Secrets Vite Ke `.env` Mein Daal Dena\n- **Galti**: `VITE_MONGO_URI` ya `VITE_JWT_SECRET` client code mein rakhna.\n- **Nuksan**: Jo bhi variable `VITE_` se shuru hota hai, wo browser ke public bundle mein compile ho jata hai! Koi bhi hacker Chrome Inspect Element khol kar aapka database password chura lega.\n- **Solution**: Frontend mein sirf public URLs rakhein (jaise `VITE_API_URL`). Private secrets sirf backend par hone chahiye.\n\n### 3. `localhost:5000` Hardcode Chhod Dena\n- **Galti**: Axios mein `http://localhost:5000` likha chhod dena.\n- **Nuksan**: Production mein user ki app uske apne laptop par backend dhoondhne lagti hai aur fail ho jaati hai.\n- **Solution**: Hamesha `import.meta.env.VITE_API_URL` use karein."}},{type:"tip",heading:{en:"Production Best Practices",hi:"Production Best Practices & Pro Tips"},body:{en:'1. **Configure Long-Term Immutable Caching for Assets**:\n   Vite automatically adds unique content hashes to filenames (e.g. `index-ChVnNkDk.js`). Add Cache-Control headers in `vercel.json`: `"public, max-age=31536000, immutable"`. Once a browser downloads this file, it never needs to re-download it until code changes!\n2. **Never Cache `index.html`**:\n   While JS/CSS assets should be cached forever, `index.html` must NEVER be aggressively cached. It should have `no-cache` so users immediately receive the new asset hash pointers on fresh deploys.\n3. **Set Up a Custom Domain with CNAME**:\n   In Vercel -> Settings -> Domains, add your custom domain (e.g. `mernlearninghub.com`). Point a CNAME record to `cname.vercel-dns.com` in your DNS provider (Cloudflare, GoDaddy, Namecheap).\n4. **Enable Branch Protection & Preview Deployments**:\n   Use Vercel preview URLs to test PRs before merging to `main`.',hi:"1. **Assets Par 1-Year Immutable Caching Lagayein**:\n   Vite JS files ke naam mein hash lagata hai (jaise `index-abc123.js`). `vercel.json` mein `max-age=31536000, immutable` set karein taaki user ka browser baar-baar assets download na kare.\n2. **`index.html` Ko Kabhi Cache Mat Karein**:\n   `index.html` ko hamesha fresh rehna chahiye taaki naya deploy hote hi browser ko naye JS files ke naam mil sakein.\n3. **Custom Domain (CNAME) Connect Karein**:\n   Vercel Settings -> Domains mein apna custom domain add karein aur DNS mein CNAME record `cname.vercel-dns.com` point karein.\n4. **Preview Links Se Testing Karein**:\n   Main site par merge karne se pehle PR ke preview URL par testing karein."}},{type:"interview",heading:{en:"Interview Questions & In-Depth Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:"### Q1: Why does a user encounter a 404 error when refreshing a non-root route on a newly deployed React SPA, and how does a rewrite solve it?\n**Answer**:\nIn Single Page Applications (SPAs), routing is performed on the client side using the browser's History API (`pushState`). There are no physical HTML files on the server corresponding to routes like `/dashboard` or `/settings`; only `index.html` exists.\nWhen a user refreshes `/dashboard`, the browser makes an HTTP GET request to the CDN server. The CDN looks for a file at that path and returns a 404 because no such file exists.\nA rewrite rule (in `vercel.json` or `_redirects`) instructs the web server to rewrite all unmatched incoming requests back to `index.html` with an HTTP 200 status code. The browser then loads the React bundle, and React Router reads the URL from `window.location.pathname` to render the correct view.\n\n---\n\n### Q2: How does Vercel manage atomic deployments with zero downtime?\n**Answer**:\nWhen you push code, Vercel clones your repository into a temporary build environment, runs `npm run build`, and uploads the generated `dist` files to an isolated deployment storage bucket with a unique deployment hash URL.\nOnly after the build completes successfully and edge health checks pass does Vercel's global CDN routing layer atomically switch its DNS/routing pointers from the old deployment hash to the new deployment hash. If the build fails, the previous deployment remains live and active, guaranteeing zero downtime.\n\n---\n\n### Q3: What is the difference between client-side environment variables and server-side environment variables?\n**Answer**:\n- **Client-Side Variables** (prefixed with `VITE_` or `REACT_APP_`): Embedded statically into the public JavaScript bundle at **build time**. They are completely visible to anyone inspecting the client source code in a browser. They should only contain public configurations like API endpoints or Stripe publishable keys.\n- **Server-Side Variables**: Loaded into Node's `process.env` in memory at **runtime**. They never leave the server environment and are strictly protected from the client. Used for private secrets like database URIs, JWT secrets, and payment secret keys.",hi:`### Q1: React app mein page refresh karne par 404 kyun aata hai aur rewrite ise kaise theek karta hai?
**Answer**:
React Single Page App mein routing browser ke andar JavaScript (HTML5 History API) se hoti hai. Server par \`/dashboard\` naam ki koi physical file nahi hoti; sirf \`index.html\` hoti hai.
Refresh karne par browser server se \`/dashboard\` file mangta hai, jo na milne par server 404 fek deta hai.
Rewrite rule server ko batata hai ki har request par \`index.html\` return karo. Jab \`index.html\` aur React JS load ho jaate hain, toh React Router URL padhkar sahi component screen par dikha deta hai.

---

### Q2: Vercel par zero-downtime atomic deployments kaise kaam karte hain?
**Answer**:
Code push hone par Vercel alag container mein \`npm run build\` chalata hai.
Jab build 100% successful ho jata hai, tabhi CDN ke routing pointers purani site se hat kar naye build par point hote hain. Agar build mein koi error aa jaye, toh purani site live rehti hai aur user ko koi downtime nahi dikhta.

---

### Q3: Frontend environment variables aur Backend environment variables mein kya antar hai?
**Answer**:
- **Frontend Variables (\`VITE_\`)**: Build time par JavaScript code ke andar permanently embed ho jaate hain. Ye public hote hain aur koi bhi browser inspect karke inhe padh sakta hai.
- **Backend Variables**: Server ki RAM (\`process.env\`) mein rehte hain aur browser tak kabhi nahi jaate. Database passwords aur JWT keys hamesha backend par hi honi chahiye.`}},{type:"summary",heading:{en:"Quick Summary",hi:"Quick Revision Summary"},body:{en:"- **React SPAs** compile to static assets (`index.html`, `.js`, `.css`) deployed to Global Edge CDNs (Vercel / Netlify).\n- **The 404 Refresh Bug** occurs because subroutes lack physical files on the server; fix it with `vercel.json` rewrites to `/`.\n- **Dynamic API URLs**: Connect to production backend using `import.meta.env.VITE_API_URL`.\n- **Secret Safety**: Never put database URIs or private keys in frontend `.env` (any `VITE_` variable is public).\n- **Immutable Caching**: Cache hashed assets for 1 year, but never cache `index.html`.\n- **Atomic Deploys**: Zero downtime via instant CDN pointer updates.",hi:"- **React SPAs** compile hokar static files banti hain jo Vercel/Netlify ke 300+ Edge CDNs par serve hoti hain.\n- **404 Refresh Bug** solve karne ke liye `vercel.json` mein rewrite rule lagayein.\n- **Backend Connection**: Production URL ke liye `import.meta.env.VITE_API_URL` use karein.\n- **Secrets Ki Suraksha**: `VITE_` variables public hote hain; private database passwords kabhi client mein na dalein.\n- **Caching**: Static assets ko 1 saal ke liye cache karein, lekin `index.html` ko hamesha fresh rakhein.\n- **Atomic Deploys**: Bina kisi downtime ke har git push par automatic live updates."}}],quiz:[{question:{en:"Why does refreshing a route like /profile result in a 404 error on Vercel without a vercel.json rewrite rule?",hi:"Vercel par vercel.json rewrite rule ke bina /profile route refresh karne par 404 error kyun aata hai?"},options:[{en:"Because Vercel does not support JavaScript applications",hi:"Kyunki Vercel JavaScript support nahi karta"},{en:"Because the Edge CDN looks for a physical file named /profile/index.html on the server storage, which does not exist in a Single Page Application",hi:"Kyunki Edge CDN server storage par /profile/index.html naam ki physical file dhoondhta hai jo Single Page Application mein maujood nahi hoti"},{en:"Because React Router only runs on Google Chrome",hi:"Kyunki React Router sirf Chrome par chalta hai"},{en:"Because the user's internet connection timed out",hi:"Kyunki internet timeout ho gaya"}],correctAnswer:1,explanation:{en:"In SPAs, there is only one HTML file (index.html). Client-side routes exist purely in browser memory. A rewrite rule forces the server to return index.html for all paths.",hi:"SPAs mein sirf ek hi index.html file hoti hai. Rewrite rule server ko bolta hai ki har path par index.html serve kare taaki React Router route render kar sake."}},{question:{en:"What severe security vulnerability occurs if you store a database connection string in a Vite variable named VITE_MONGO_URI?",hi:"Agar aap Vite variable VITE_MONGO_URI mein database connection string daalte hain toh kaunsa bada security risk hota hai?"},options:[{en:"Vite will fail to run npm run build",hi:"Vite build fail ho jayega"},{en:"Any variable with the VITE_ prefix is statically bundled into the client JavaScript code and can be viewed by anyone inspecting the site via browser DevTools",hi:"VITE_ prefix wale saare variables public JavaScript bundle mein compile ho jaate hain aur koi bhi inspect element se aapka database password dekh sakta hai"},{en:"The MongoDB server will shut down automatically",hi:"MongoDB server band ho jayega"},{en:"Google will delist the website from search results",hi:"Google website delist kar dega"}],correctAnswer:1,explanation:{en:"Client-side environment variables prefixed with VITE_ are embedded into public JS bundles during build time. Private secrets must only exist in backend server environments.",hi:"VITE_ prefix wale variables public code ka hissa ban jaate hain. Database secrets sirf backend par hone chahiye."}},{question:{en:"What does the rewrite configuration in vercel.json ({ source: '/(.*)', destination: '/' }) instruct Vercel's server to do?",hi:"vercel.json mein { source: '/(.*)', destination: '/' } rewrite rule Vercel server ko kya karne ko kehta hai?"},options:[{en:"It redirects all users to google.com",hi:"Ye users ko google.com par redirect karta hai"},{en:"It intercepts all incoming URL requests and serves the root index.html file so client-side routing can handle the view",hi:"Ye saari incoming URL requests ko root index.html par bhejta hai taaki client-side React Router sahi page dikha sake"},{en:"It deletes the dist directory",hi:"Ye dist directory delete kar deta hai"},{en:"It restarts the computer",hi:"Ye computer restart karta hai"}],correctAnswer:1,explanation:{en:"The wildcard regex /(.*) captures any requested route and rewrites the response to serve the root index.html without altering the browser address bar URL.",hi:"Ye wildcard rule har request par index.html serve karta hai bina browser ka URL change kiye, jisse routing seamless rehti hai."}},{question:{en:"Why is an Edge Content Delivery Network (CDN) like Vercel's vastly faster than serving static React files from a single traditional VPS?",hi:"Traditional VPS ke mukable Vercel ka Edge CDN static React files ko bohot fast kyun serve karta hai?"},options:[{en:"Because CDNs use quantum computing",hi:"Kyunki CDNs quantum computing use karte hain"},{en:"Assets are cached across hundreds of geographically distributed edge servers globally, serving files to users from the server closest to their physical location (<20ms latency)",hi:"Assets duniya bhar ke saikdon servers par pehle se cached hote hain aur user ko uske sabse paas wale server se deliver hote hain (<20ms latency)"},{en:"Because CDNs block images",hi:"Kyunki CDNs images block kar dete hain"},{en:"Because CDNs only work with paid subscriptions",hi:"Kyunki CDNs sirf paid pe chalte hain"}],correctAnswer:1,explanation:{en:"Edge CDNs reduce geographic latency by serving cached static assets from Point-of-Presence (PoP) data centers geographically closest to each user.",hi:"Edge CDN user ke physical location ke sabse nazdeek wale data center se data deta hai jisse network travel time bohot kam ho jata hai."}},{question:{en:"What is the core architectural purpose of Deploying React Frontend to Vercel & Netlify in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein React Frontend Ko Vercel & Netlify Pe Deploy Karna ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling deploying react frontend to vercel & netlify with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath React Frontend Ko Vercel & Netlify Pe Deploy Karna ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Deploying React Frontend to Vercel & Netlify establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Deploying React Frontend to Vercel & Netlify directly resolve?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Deploying React Frontend to Vercel & Netlify, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Deploying React Frontend to Vercel & Netlify, how is its mental model best conceptualized through real-world analogies?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Deploying React Frontend to Vercel & Netlify, what syntactic convention is essential to prevent runtime errors?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Deploying React Frontend to Vercel & Netlify?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Deploying React Frontend to Vercel & Netlify be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye React Frontend Ko Vercel & Netlify Pe Deploy Karna ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Deploying React Frontend to Vercel & Netlify impact application memory and CPU consumption?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Deploying React Frontend to Vercel & Netlify?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Deploying React Frontend to Vercel & Netlify?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Deploying React Frontend to Vercel & Netlify?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Deploying React Frontend to Vercel & Netlify, what must the test suite assert?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Deploying React Frontend to Vercel & Netlify?",hi:"Modular design React Frontend Ko Vercel & Netlify Pe Deploy Karna mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Deploying React Frontend to Vercel & Netlify be architected to support horizontal scaling?",hi:"Traffic 100x badhne par React Frontend Ko Vercel & Netlify Pe Deploy Karna ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Deploying React Frontend to Vercel & Netlify properly belong and execute?",hi:"Full-stack MERN architecture mein React Frontend Ko Vercel & Netlify Pe Deploy Karna kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Deploying React Frontend to Vercel & Netlify in production?",hi:"Production mein React Frontend Ko Vercel & Netlify Pe Deploy Karna ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Deploying React Frontend to Vercel & Netlify?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Deploying React Frontend to Vercel & Netlify?",hi:"React Frontend Ko Vercel & Netlify Pe Deploy Karna mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
