const e={id:"auth-oauth-overview",title:{en:"OAuth 2.0 & Social Login Overview (Google & GitHub)",hi:"OAuth 2.0 & Google / GitHub Social Login Flow"},difficulty:"Advanced",readTime:12,sections:[{type:"concept",heading:{en:"1. What is OAuth 2.0 & The Pain of Password Fatigue",hi:"1. OAuth 2.0 Kya Hai Aur Password Fatigue Ki Problem"},body:{en:`Users hate creating new usernames and passwords for every single website they visit. Password fatigue causes users to abandon registration forms or reuse weak passwords like \`password123\` across dozens of websites.

### What is OAuth 2.0?
**OAuth 2.0 (Open Authorization 2.0)** is an open-standard protocol for **delegated authorization**. It allows a third-party application (your MERN platform) to access user resources hosted by an identity provider (like Google, GitHub, or Facebook) **without ever asking for or handling the user's password**!

### The 4 Core Roles in OAuth 2.0:
1. **Resource Owner**: The End User (who owns the Google/GitHub account).
2. **Client**: Your MERN application (React frontend + Express backend requesting access).
3. **Authorization Server**: The identity provider (e.g. \`accounts.google.com\`), which authenticates the user and issues authorization codes.
4. **Resource Server**: The API server holding user data (e.g. Google People API), which serves the user's name, email, and avatar picture.

### OAuth 2.0 vs OpenID Connect (OIDC):
- **OAuth 2.0** was designed for **Authorization** (*"Grant my app permission to access user's Google Drive files"*).
- **OpenID Connect (OIDC)** is a simple identity layer built directly on top of OAuth 2.0 for **Authentication** (*"Verify who the user is and return an ID Token containing their profile photo and email"*). Modern "Sign in with Google" uses OIDC!`,hi:`Users har nayi website par naya username aur password banana bilkul pasand nahi karte. Isse bounce rate badhta hai aur log kamzor passwords reuse karte hain.

### OAuth 2.0 Kya Hai?
**OAuth 2.0** ek delegated authorization framework hai. Yeh aapki MERN application ko Google ya GitHub jaise bade providers se user ka basic profile (naam, email, photo) lene ki suvidha deta hai **bina user ka password jaane**!

### OAuth 2.0 Ke 4 Main Kirdaar:
1. **Resource Owner**: User (jiska Google account hai).
2. **Client**: Aapki MERN app jo access maang rahi hai.
3. **Authorization Server**: Google ka login server (\`accounts.google.com\`).
4. **Resource Server**: Google ka API server jahan user ki email aur photo stored hai.

### OAuth 2.0 vs OpenID Connect (OIDC):
- **OAuth 2.0**: Permissions ke liye banaya gaya tha (*"Kya app ko Google Drive access karne dein?"*).
- **OpenID Connect (OIDC)**: Authentication ke liye banaya gaya (*"User kaun hai? Iska naam aur email verify karo"*). Modern "Sign in with Google" OIDC protocol par chalta hai.`}},{type:"concept",heading:{en:"2. The Authorization Code Grant Flow (Step-by-Step)",hi:"2. The Authorization Code Grant Flow (Step-by-Step)"},body:{en:`The **Authorization Code Grant Flow** is the gold standard for full-stack web applications because secret keys are exchanged strictly on the secure backend:

\`\`\`
[ User / React Frontend ]               [ Express Backend ]               [ Google Auth Server ]
          │                                      │                                   │
          │ 1. Clicks "Sign in with Google"      │                                   │
          ├─────────────────────────────────────────────────────────────────────────►│
          │                                      │                                   │ (Shows Consent Screen)
          │ 2. Consents & Google Redirects with temporary code:                      │
          │    GET /api/auth/google/callback?code=XYZ                                │
          │─────────────────────────────────────►│                                   │
          │                                      │ 3. POST /token                    │
          │                                      │    (code + CLIENT_SECRET)         │
          │                                      ├──────────────────────────────────►│
          │                                      │                                   │ (Verifies Secret)
          │                                      │ 4. Returns: id_token & access_token
          │                                      │◄──────────────────────────────────┤
          │                                      │                                   │
          │                                      │ 5. Finds/creates User in MongoDB  │
          │                                      │ 6. Issues your own MERN app JWT!  │
          │                                      │                                   │
          │ 7. Redirects to /dashboard with cookie or token                          │
          │◄─────────────────────────────────────┤                                   │
\`\`\`

### Why the Intermediate "Code"?
Why doesn't Google just send the tokens directly to the React browser?
Because the browser's URL bar and network history are public! If the token were sent directly in the URL (Implicit Grant Flow, now deprecated), it could be intercepted. By sending a **one-time temporary authorization code** that is valid for only 60 seconds, your Express backend can exchange it for tokens server-to-server using your private \`CLIENT_SECRET\`.`,hi:'Full-stack apps mein **Authorization Code Flow** use hota hai:\n\n1. User React par "Sign in with Google" click karta hai.\n2. User Google ke login page par jata hai aur permission grant karta hai.\n3. Google browser ko aapke Express backend ke callback URL par redirect karta hai ek temporary **code** ke sath: `/api/auth/google/callback?code=123`.\n4. Express backend chupke se Google ke server ko apna private `CLIENT_SECRET` aur wo `code` bhejta hai.\n5. Google verify karke user ki verified profile aur email return karta hai.\n6. Express MongoDB mein check karta hai: agar naya user hai toh account create karta hai, aur apni MERN app ka JWT generate karta hai.\n7. Express user ko cookie ke sath React frontend ke `/dashboard` par redirect kar deta hai!'}},{type:"analogy",heading:{en:"Real-Life Analogy: The Hotel Valet Key vs Handing Over Your Master Keyring",hi:"Real-Life Analogy: Hotel Valet Parking Key vs Ghar Ka Master Chabi Chhalla"},body:{en:`Consider valet parking at a luxury restaurant in Mumbai:

- **The Insecure Password Sharing Way**:
  The valet attendant asks for your car keys. Instead of giving them a car key, you hand over your entire master family keyring containing:
  - Your house main entrance key
  - Your bedroom wardrobe safe key
  - Your office drawer key
  - Your car key
  You have given the valet total, unrestricted access to your entire life just to park your car for 2 hours!
- **The OAuth 2.0 Delegated Access Way (The Special Valet Key)**:
  Modern cars come with a special "Valet Key". This key:
  1. Only starts the engine and locks/unlocks the driver door.
  2. CANNOT open the locked glove compartment or the rear trunk where you store luggage!
  3. Limits the car's maximum speed to 30 km/h.
  You delegate **only the exact minimal permission needed** to park the vehicle. When you return, you take back your car. The valet never knew your house address, never touched your wardrobe key, and could never access your personal documents!`,hi:`Hotel ke valet parking ka example dekhein:

- **Insecure Password Sharing**:
  Valet driver ko car park karni hai. Aap use car ki chabi dene ke bajaye apna poora chabi ka chhalla de dete hain jisme aapke ghar ka taala, office ka locker, aur tijori ki chabi sab lagi hui hain! Usne sirf car park karni thi, aur aapne poori zindagi ka access de diya.
- **OAuth 2.0 (Valet Key Mode)**:
  Aap valet ko ek special **"Valet Key"** dete hain.
  - Yeh key sirf car start karti hai.
  - Yeh car ki dicky (trunk) aur glove box ko unlock **nahi** kar sakti jahan aapka zaroori saman rakha hai!
  - Parking hone ke baad aap chabi wapas le lete hain. Valet ko kabhi aapke ghar ka pata ya tijori ki chabi nahi mili!`}},{type:"syntax",heading:{en:"Syntax: Google Cloud Console Configuration & Callback Endpoints",hi:"Syntax Aur Setup: Google Cloud Console Aur Express Callback Setup"},body:{en:`### 1. Setup in Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com).
2. Create a project -> Navigate to **APIs & Services** -> **OAuth consent screen**.
3. Create an **OAuth 2.0 Client ID** (Web application).
4. Configure Authorized URIs:
   - **Authorized JavaScript origins**: \`http://localhost:5173\` (React Vite dev)
   - **Authorized redirect URIs**: \`http://localhost:5000/api/v1/auth/google/callback\`

### 2. Save Credentials in \`server/.env\`
\`\`\`env
GOOGLE_CLIENT_ID=1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-secret_client_key_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/v1/auth/google/callback
CLIENT_APP_URL=http://localhost:5173
\`\`\`

### 3. User Mongoose Schema Integration
\`\`\`javascript
// server/src/models/User.js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false }, // Optional for OAuth users!
  googleId: { type: String, unique: true, sparse: true },
  githubId: { type: String, unique: true, sparse: true },
  avatar: { type: String },
  authProvider: { type: String, enum: ['local', 'google', 'github'], default: 'local' },
});
\`\`\``,hi:"### Setup Ke Steps:\n1. Google Cloud Console mein project banakar **OAuth 2.0 Client ID** create karein.\n2. **Authorized redirect URI** set karein: `http://localhost:5000/api/v1/auth/google/callback`.\n3. `server/.env` mein `GOOGLE_CLIENT_ID` aur `GOOGLE_CLIENT_SECRET` save karein.\n4. User Schema mein `googleId: { type: String, sparse: true }` aur `authProvider` field add karein. Notice karein ki password field optional hoti hai kyunki Google se login karne walon ka password Google ke paas hota hai!"}},{type:"example",heading:{en:"Example 1: Frontend Google Sign-In Trigger Component",hi:"Example 1: React Frontend Mein Google Sign-In Button"},body:{en:`In the React frontend, triggering the OAuth flow is as simple as constructing the official Google OAuth URL or using a clean redirect button:

\`\`\`jsx
// src/components/auth/SocialLoginButtons.jsx
import React from 'react';

export function SocialLoginButtons() {
  const handleGoogleLogin = () => {
    // Construct Google OAuth URL
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/v1/auth/google/callback',
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };

    const qs = new URLSearchParams(options).toString();
    // Redirect browser to Google's consent screen
    window.location.href = \`\${rootUrl}?\${qs}\`;
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-300 rounded-xl bg-white hover:bg-slate-50 transition-colors shadow-sm font-medium text-slate-700"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}
\`\`\``,hi:"React frontend mein Google button ka kaam:\n- Google ka official consent URL construct karta hai jisme `client_id`, `redirect_uri` aur `scope` hote hain.\n- User ke click karte hi use Google ke official login page par redirect kar deta hai."}},{type:"example",heading:{en:"Example 2: Express Backend Callback Route Exchanging Code for Tokens",hi:"Example 2: Express Callback Route Jahan Code Ke Badle Token Exchange Hota Hai"},body:{en:`This controller receives the authorization code, exchanges it securely with Google's API, and extracts the user profile:

\`\`\`javascript
// server/src/controllers/oauthController.js
import axios from 'axios';
import { User } from '../models/User.js';
import { jwtService } from '../utils/jwt.js';

export const googleCallback = async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    return res.redirect(\`\${process.env.CLIENT_APP_URL}/login?error=oauth_failed\`);
  }

  try {
    // Step 1: Exchange temporary code for Google Access & ID tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET, // Protected server secret!
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: 'authorization_code',
    });

    const { id_token, access_token } = tokenResponse.data;

    // Step 2: Fetch user profile details using the Google access token
    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: \`Bearer \${access_token}\` },
    });

    const { id: googleId, email, name, picture } = profileResponse.data;

    // Step 3: Find or Create user in MongoDB
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // User exists: Link Google ID if registered previously with email/password
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = user.avatar || picture;
        await user.save();
      }
    } else {
      // New user: Create brand new profile
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
        authProvider: 'google',
      });
    }

    // Step 4: Generate our own MERN app session token!
    const appToken = jwtService.generateToken({ id: user._id, role: user.role });

    // Step 5: Send token via httpOnly cookie
    res.cookie('token', appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Step 6: Redirect user back to React frontend dashboard!
    res.redirect(\`\${process.env.CLIENT_APP_URL}/dashboard\`);
  } catch (err) {
    console.error('OAuth Exchange Error:', err.response?.data || err.message);
    res.redirect(\`\${process.env.CLIENT_APP_URL}/login?error=oauth_exchange_failed\`);
  }
};
\`\`\``,hi:"Express callback route ka complete workflow:\n1. Google se aane wala temporary `code` pakadta hai.\n2. `axios.post('https://oauth2.googleapis.com/token')` se Google ko `code` aur `CLIENT_SECRET` bhejta hai.\n3. Google se aayi email aur photo se MongoDB mein user ko dhoondhta ya create karta hai.\n4. Apni MERN app ka JWT sign karke cookie mein daalta hai.\n5. User ko smoothly React ke `/dashboard` par redirect kar deta hai!"}},{type:"example",heading:{en:"Example 3: Seamless Account Linking (Email + Google + GitHub)",hi:"Example 3: Seamless Account Linking (Duplicate Accounts Se Bachna)"},body:{en:`A common UX bug occurs when a user registers with email/password (\`aman@gmail.com\`), and later clicks "Login with Google". Without account linking, the app crashes with a duplicate key error! Here is how to gracefully link accounts:

\`\`\`javascript
// server/src/utils/linkSocialAccount.js
import { User } from '../models/User.js';

export async function findOrCreateSocialUser({ provider, providerId, email, name, avatar }) {
  // 1. First look up by specific provider ID (e.g. googleId: '123')
  let user = await User.findOne({ [\`\${provider}Id\`]: providerId });
  if (user) return user;

  // 2. If not found by providerId, check if email already exists!
  user = await User.findOne({ email });

  if (user) {
    // ACCOUNT LINKING: Attach provider ID to the existing account!
    user[\`\${provider}Id\`] = providerId;
    if (!user.avatar && avatar) user.avatar = avatar;
    await user.save();
    return user;
  }

  // 3. User does not exist at all: create fresh account
  user = await User.create({
    name,
    email,
    [\`\${provider}Id\`]: providerId,
    avatar,
    authProvider: provider,
  });

  return user;
}
\`\`\``,hi:`Account Linking ka fayda:
- Agar user ne pehle manual email/password se account banaya tha, aur 2 mahine baad wo "Sign in with Google" click karta hai:
- System duplicate account banane ya error dene ke bajaye uske purane account mein Google ID jod deta hai.
- User ka data, orders, aur profile bilkul safe aur linked rehte hain!`}},{type:"mistakes",heading:{en:"Common Mistakes & How to Fix Them",hi:"Common Mistakes Aur Unke Fixes"},body:{en:"### 1. Leaking the CLIENT_SECRET into the React Frontend Bundle\n- **Mistake**: Putting `VITE_GOOGLE_CLIENT_SECRET` in `client/.env`.\n- **Why this is catastrophic**: Any variable prefixed with `VITE_` is bundled as plain text into public client JavaScript. Anyone inspecting your site can steal your Google Client Secret and impersonate your application!\n- **Fix**: The `CLIENT_SECRET` must **strictly live inside `server/.env`** and be used only in server-to-server calls.\n\n### 2. redirect_uri_mismatch Error in Google Console\n- **Mistake**: Seeing the error: `Error 400: redirect_uri_mismatch` when clicking Google Login.\n- **Why it breaks**: The `redirect_uri` sent in your request must **character-for-character match** one of the Authorized Redirect URIs in your Google Cloud Console (including `http` vs `https`, port numbers, and trailing slashes).\n- **Fix**: Verify that `http://localhost:5000/api/v1/auth/google/callback` is listed verbatim in Google Cloud Console.\n\n### 3. Exposing Authorization Codes in Frontend History\n- **Mistake**: Having Google redirect directly to the React frontend with the `code` in the URL hash or query params, and leaving it there.\n- **Fix**: Direct the Google callback straight to the Express backend (`localhost:5000`), or immediately clean the URL in React.",hi:"### 1. CLIENT_SECRET Ko React Frontend Mein Likh Dena\n- **Galti**: `VITE_GOOGLE_CLIENT_SECRET` frontend mein store karna.\n- **Nuksan**: Secret key public JS bundle mein leak ho jaati hai aur koi bhi hacker aapki app ban kar Google APIs abuse kar sakta hai!\n- **Fix**: `CLIENT_SECRET` hamesha sirf aur sirf `server/.env` mein hona chahiye.\n\n### 2. redirect_uri_mismatch Error\n- **Galti**: Google Console mein `localhost:5000/callback` likha hai aur code mein `localhost:5000/api/auth/google/callback` bhej rahe hain.\n- **Fix**: Google Console aur Express code dono ka callback URL character-by-character same hona chahiye.\n\n### 3. Duplicate Account Error\n- **Fix**: Account linking logic lagayein taaki same email aane par duplicate error na aaye balki Google ID link ho jaye."}},{type:"tip",heading:{en:"Best Practices: Robust OAuth Implementation",hi:"Best Practices: Robust OAuth Architecture"},body:{en:"1. **Use the state Parameter to Prevent CSRF**: Always generate a cryptographically random `state` string stored in session/cookie and verify it matches the `state` returned in the callback.\n2. **Request Minimal Scopes**: Only request `profile` and `email`. Requesting sensitive permissions (like Google Drive or Gmail) scares users away and requires lengthy Google security verification audits.\n3. **Handle Account Merging Carefully**: If linking accounts automatically, ensure the email coming from Google has `email_verified: true` before merging into an existing account!",hi:"1. **state Parameter Use Karein**: CSRF attack se bachne ke liye random `state` string bhej kar callback mein verify karein.\n2. **Minimal Permissions (Scope)**: Sirf `email` aur `profile` maangein. Faltu permissions maangne se user trust toot jata hai.\n3. **email_verified Check Karein**: Account merge karne se pehle verify karein ki Google se aayi email verified hai ya nahi."}},{type:"interview",heading:{en:"Top Interview Questions & Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:"### Q1: What is the difference between OAuth 2.0 and OpenID Connect (OIDC)?\n**Answer**:\n- **OAuth 2.0** is an **authorization** protocol designed to delegate access to resources (e.g., allowing an app to post tweets or read Google Drive documents on behalf of a user). It issues **Access Tokens**.\n- **OpenID Connect (OIDC)** is an **authentication** layer built on top of OAuth 2.0 that provides identity verification. It introduces the **ID Token** (a standardized JWT containing user claims like `sub`, `name`, `email`, and `picture`) to tell the application *who* the user is.\n\n### Q2: Why does the Authorization Code flow use an intermediate temporary code instead of sending the access token directly to the browser?\n**Answer**: In the browser, incoming URLs can be leaked through browser history, referer headers, open redirects, or rogue browser extensions. The intermediate authorization code is single-use and expires in 60 seconds. It is exchanged for the real access token strictly **server-to-server** over an encrypted backchannel where the application authenticates itself using its private `CLIENT_SECRET`, keeping the actual access credentials safe from browser exposure.\n\n### Q3: Where should the OAuth client_secret be stored and used?\n**Answer**: The `client_secret` is a confidential credential that acts as the application's password to the identity provider. It must **only** be stored on the secure backend server (in environment variables) and used exclusively in server-to-server HTTP POST requests. It must never be exposed to the client-side browser or bundled into frontend code.\n\n### Q4: How does account linking work in full-stack applications?\n**Answer**: When an OAuth provider returns a verified email address, the backend checks if a user already exists with that email in the database. If found, instead of throwing a duplicate key error, the backend updates the existing user document by adding the provider ID (e.g. `googleId`) to the record. This allows the user to log in seamlessly using either their original password or the social login button.",hi:`### Q1: OAuth 2.0 aur OpenID Connect (OIDC) mein kya farq hai?
**Jawab**: OAuth 2.0 authorization (permissions) ke liye banaya gaya tha jo Access Token deta hai. OIDC uske upar bani hui authentication layer hai jo user ki identity verify karne ke liye ID Token (JWT) deti hai.

### Q2: Google seedhe token bhejne ke bajaye temporary code kyun bhejta hai?
**Jawab**: Browser ka URL bar public hota hai jahan se token leak ho sakta hai. Isliye Google 60 second ka ek temporary code bhejta hai. Express backend us code ko apne private \`CLIENT_SECRET\` ke sath server-to-server bhejkar securely token leta hai.

### Q3: client_secret kahan store hona chahiye?
**Jawab**: Sirf Express backend ke \`.env\` mein. Yeh app ka password hota hai aur browser mein kabhi leak nahi hona chahiye.

### Q4: Account Linking kaise kaam karta hai?
**Jawab**: Agar Google se aayi email pehle se database mein hai, toh naya user banane ke bajaye usi purane user mein \`googleId\` save kar di jaati hai taaki user dono tareeqon se login kar sake.`}},{type:"summary",heading:{en:"Quick Summary: OAuth 2.0 & Social Login Cheatsheet",hi:"Quick Summary: OAuth 2.0 & Social Login Cheatsheet"},body:{en:`- **Delegated Auth**: Access user profile without seeing or storing their Google/GitHub password.
- **Authorization Code Flow**: Browser receives short-lived code; backend exchanges code + secret for tokens.
- **Never Leak CLIENT_SECRET**: The secret belongs strictly in \`server/.env\`.
- **Exact Callback Match**: The \`redirect_uri\` must match Google Cloud Console configuration verbatim.
- **Account Linking**: Merge incoming OAuth accounts with existing database users by matching email.
- **Issue App Tokens**: After Google verification, generate your own MERN app JWT for session management.`,hi:`- **Delegated Auth**: Bina password jaane user ka profile safely verify karein.
- **Auth Code Flow**: Browser ko temporary code milta hai, backend server-to-server token exchange karta hai.
- **Secret Safe Rakhein**: \`CLIENT_SECRET\` sirf backend par hona chahiye.
- **Callback URI Match**: Google Cloud Console ka URL aur code ka URL exact same hona chahiye.
- **Account Linking**: Same email aane par account merge karein taaki duplicate account na bane.
- **App JWT Issue Karein**: Google verification ke baad apni app ka JWT cookie set karke session banayein.`}}],quiz:[{question:{en:"What is the primary role of the OAuth 2.0 Client Secret?",hi:"OAuth 2.0 Client Secret ka primary role kya hai?"},options:[{en:"It is public text shown on the user's login screen",hi:"Yeh login screen par dikhne wala public text hota hai"},{en:"It acts as a private password that authenticates the backend server to the identity provider when exchanging the authorization code for tokens",hi:"Yeh ek private password ki tarah kaam karta hai jo authorization code ko tokens mein badal te waqt backend server ko identity provider ke samne authenticate karta hai"},{en:"It encrypts the user's hard drive",hi:"Yeh user ki hard drive encrypt karta hai"},{en:"It is used by CSS to style the Google button",hi:"Yeh CSS styling ke liye use hota hai"}],correctAnswer:1,explanation:{en:"The Client Secret proves to the authorization server that the token exchange request is originating from the authorized application server, not an impostor.",hi:"Client Secret identity provider ko prove karta hai ki token exchange karne wala server authorized backend hai, koi fake impostor nahi."}},{question:{en:"Why should the OAuth client_secret NEVER be prefixed with VITE_ in a React project?",hi:"OAuth client_secret ko React project mein VITE_ ke sath KABHI BHI kyun nahi likhna chahiye?"},options:[{en:"Because VITE_ variables are compiled into public JavaScript and can be stolen by anyone inspecting the website",hi:"Kyunki VITE_ wale variables public JavaScript mein compile ho jaate hain aur koi bhi website inspect karke unhe chura sakta hai"},{en:"Because Vite refuses to build files with secrets",hi:"Kyunki Vite build fail kar deta hai"},{en:"Because Google automatically changes client secrets every hour",hi:"Kyunki Google har ghante secret badal deta hai"},{en:"Because Google requires secrets to be in uppercase only",hi:"Kyunki Google sirf uppercase allow karta hai"}],correctAnswer:0,explanation:{en:"Any VITE_ prefixed variable is embedded in the browser bundle. Leaking the client secret allows attackers to hijack your OAuth application.",hi:"VITE_ variables browser ke public code mein chale jaate hain. Client Secret leak hone se hacker aapki app ka impersonation kar sakta hai."}},{question:{en:"What causes the 'redirect_uri_mismatch' error in Google OAuth?",hi:"Google OAuth mein 'redirect_uri_mismatch' error kis wajah se aata hai?"},options:[{en:"The user has typed the wrong password 3 times",hi:"User ne 3 baar galat password dala hai"},{en:"The redirect_uri sent in the authorization request does not character-for-character match the URI configured in the Google Cloud Console",hi:"Authorization request mein bheja gaya redirect_uri Google Cloud Console mein configured URI se character-by-character match nahi karta"},{en:"The computer's clock is 5 minutes slow",hi:"Computer ki ghadi slow hai"},{en:"The MongoDB database is empty",hi:"MongoDB database khali hai"}],correctAnswer:1,explanation:{en:"Google strictly enforces that the redirect_uri in the request exactly matches the pre-registered URI in Google Cloud Console, preventing open-redirect attacks.",hi:"Security ke liye Google verify karta hai ki callback URL console mein registered URL se bilkul same ho."}},{question:{en:"What is 'Account Linking' in full-stack authentication?",hi:"Full-stack authentication mein 'Account Linking' kya hota hai?"},options:[{en:"Linking two bank accounts together for loans",hi:"Do bank accounts ko aapas mein link karna"},{en:"Associating a social login provider (like Google or GitHub) with an existing user account that shares the same verified email address",hi:"Kisi social login provider (Google/GitHub) ko usi email wale pehle se bane user account se jod dena"},{en:"Deleting the user's previous account",hi:"Purana account delete karna"},{en:"Sharing user passwords on Twitter",hi:"User passwords Twitter par share karna"}],correctAnswer:1,explanation:{en:"Account linking connects multiple login methods (password, Google, GitHub) to a single user document in MongoDB using verified email matching.",hi:"Account linking se ek hi user apne account ko password ya Google dono se login kar sakta hai bina duplicate accounts bane."}},{question:{en:"What is the core architectural purpose of OAuth 2.0 & Social Login Overview (Google & GitHub) in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein OAuth 2.0 & Google / GitHub Social Login Flow ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling oauth 2.0 & social login overview (google & github) with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath OAuth 2.0 & Google / GitHub Social Login Flow ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"OAuth 2.0 & Social Login Overview (Google & GitHub) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"OAuth 2.0 & Google / GitHub Social Login Flow clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does OAuth 2.0 & Social Login Overview (Google & GitHub) directly resolve?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without OAuth 2.0 & Social Login Overview (Google & GitHub), applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"OAuth 2.0 & Google / GitHub Social Login Flow ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about OAuth 2.0 & Social Login Overview (Google & GitHub), how is its mental model best conceptualized through real-world analogies?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing OAuth 2.0 & Social Login Overview (Google & GitHub), what syntactic convention is essential to prevent runtime errors?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with OAuth 2.0 & Social Login Overview (Google & GitHub)?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should OAuth 2.0 & Social Login Overview (Google & GitHub) be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye OAuth 2.0 & Google / GitHub Social Login Flow ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of OAuth 2.0 & Social Login Overview (Google & GitHub) impact application memory and CPU consumption?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within OAuth 2.0 & Social Login Overview (Google & GitHub)?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in OAuth 2.0 & Social Login Overview (Google & GitHub)?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in OAuth 2.0 & Social Login Overview (Google & GitHub)?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for OAuth 2.0 & Social Login Overview (Google & GitHub), what must the test suite assert?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in OAuth 2.0 & Social Login Overview (Google & GitHub)?",hi:"Modular design OAuth 2.0 & Google / GitHub Social Login Flow mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should OAuth 2.0 & Social Login Overview (Google & GitHub) be architected to support horizontal scaling?",hi:"Traffic 100x badhne par OAuth 2.0 & Google / GitHub Social Login Flow ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does OAuth 2.0 & Social Login Overview (Google & GitHub) properly belong and execute?",hi:"Full-stack MERN architecture mein OAuth 2.0 & Google / GitHub Social Login Flow kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with OAuth 2.0 & Social Login Overview (Google & GitHub) in production?",hi:"Production mein OAuth 2.0 & Google / GitHub Social Login Flow ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for OAuth 2.0 & Social Login Overview (Google & GitHub)?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in OAuth 2.0 & Social Login Overview (Google & GitHub)?",hi:"OAuth 2.0 & Google / GitHub Social Login Flow mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
