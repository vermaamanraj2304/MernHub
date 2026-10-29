const e={id:"adv-testing-backend",title:{en:"Backend Testing with Jest & Supertest",hi:"Backend REST API Testing: Jest & Supertest"},difficulty:"Intermediate",readTime:12,sections:[{type:"concept",heading:{en:"1. The Testing Pyramid: Why Automated Testing is Non-Negotiable",hi:"1. Testing Pyramid: Automated Testing Kyun Har Developer Ke Liye Zaroori Hai"},body:{en:`In software engineering, testing manually via Postman or browser clicks does not scale. A single small refactor in your MERN authentication middleware can silently break checkout, registration, or password reset without any immediate warning.

### The Software Testing Pyramid in MERN:
\`\`\`
          ▲
         / \\     E2E Tests (Cypress / Playwright)
        /   \\    - Tests full user journey across React + Express + Mongo
       /─────\\   - Slowest, most expensive (~5% of tests)
      /       \\
     /  INTEG. \\ Integration Tests (Jest + Supertest + In-Memory Mongo)
    /   TESTS   \\ - Tests Express routes, middleware, and database operations
   /─────────────\\ - Fast, highly reliable (~25% of tests)
  /               \\
 /   UNIT TESTS    \\ Unit Tests (Jest / Vitest)
/                   \\ - Tests pure functions, regex, password validators
───────────────────── - Runs in milliseconds (~70% of tests)
\`\`\`

### The Core Backend Testing Toolkit:
1. **Jest**: The testing framework and test runner. It provides the test runner (\`describe\`, \`test\`, \`it\`), assertions (\`expect(x).toBe(y)\`), mocking capabilities (\`jest.fn()\`), and test coverage reporting.
2. **Supertest**: An HTTP assertion library built on SuperAgent. It allows you to test Express routes by programmatically firing simulated HTTP requests directly into your Express \`app\` **without actually binding to a physical network port or starting an HTTP server**!
3. **\`mongodb-memory-server\`**: Spins up a real, ephemeral, 100% in-memory MongoDB binary in RAM. Tests run at lightning speed, are completely isolated, and never pollute your local development or production databases.`,hi:`Manually Postman khol kar har API ko baar-baar test karna professional approach nahi hai. Kisi ek middleware mein kiya gaya chota sa change shopping cart ya login ko silently tod sakta hai aur aapko pata bhi nahi chalega.

### MERN Stack Mein Testing Pyramid:
1. **Unit Tests (70%)**: Chote-chote isolated functions test karna (jaise password validator, token generator). Ye milliseconds mein chalte hain.
2. **Integration Tests (25%)**: Express routes, middleware aur MongoDB ko ek sath test karna (Jest + Supertest). Ye verify karte hain ki API request aane par sahi status code aur database update ho raha hai ya nahi.
3. **End-to-End (E2E) Tests (5%)**: Poore user flow ko browser mein simulate karna (Cypress ya Playwright).

### Backend Testing Ke 3 Mukhya Hathyari:
1. **Jest**: Testing runner aur assertion framework (\`test()\`, \`expect()\`, \`describe()\`).
2. **Supertest**: Express APIs ko test karne ka tool. Iski sabse badi khoobi ye hai ki ise koi live port (jaise 5000) start nahi karna padta; ye virtual HTTP requests Express app ke andar direct pass kar deta hai.
3. **\`mongodb-memory-server\`**: Ek real MongoDB database jo computer ki RAM mein banta hai aur test khatam hote hi gayab ho jata hai. Isse aapka original database bilkul clean rehta hai.`}},{type:"concept",heading:{en:"2. The Test Lifecycle & Ephemeral In-Memory Database Architecture",hi:"2. Test Lifecycle Aur In-Memory Database Ka Model"},body:{en:"To guarantee reliable tests, every test must adhere to the **FIRST** principles: Fast, Independent, Repeatable, Self-validating, and Timely.\n\nIf Test A inserts a user with email `alice@example.com`, and Test B attempts to insert `alice@example.com`, Test B will fail with a duplicate key error **only if Test A ran first**! This order-dependency is the #1 cause of flaky tests.\n\n### Jest Lifecycle Hooks:\n```javascript\nbeforeAll(async () => {\n  // 1. Boot up mongodb-memory-server\n  // 2. Connect Mongoose to the memory URI\n});\n\nbeforeEach(async () => {\n  // 3. Clear all database collections so every test starts with a clean slate!\n});\n\nafterAll(async () => {\n  // 4. Disconnect Mongoose\n  // 5. Stop the in-memory Mongo server instance\n});\n```\n\n### Architectural Decoupling: `app.js` vs `server.js`\n> [!IMPORTANT]\n> **CRITICAL ARCHITECTURAL RULE**: Never call `app.listen(PORT)` inside the same file where you configure your Express app!\n> - **`app.js`**: Instantiates `express()`, applies middleware, mounts routers, and **exports `app`**.\n> - **`server.js`**: Imports `app`, connects to MongoDB, and calls `app.listen(PORT)`.\n> \n> Supertest requires the raw exported `app` object. If you export a file that calls `app.listen()`, Supertest will trigger port collision errors (`EADDRINUSE`) during test runs!",hi:"Flaky tests (kabhi pass kabhi fail) se bachne ke liye har test ka **Independent** hona zaroori hai.\n\nAgar Test 1 ne `test@gmail.com` create kiya aur Test 2 ne bhi wahi email create karne ki koshish ki, toh Test 2 duplicate key error se fail ho jayega. Isliye har test se pehle database saaf hona chahiye!\n\n### Jest Ke 4 Lifecycle Hooks:\n- **`beforeAll`**: Saare tests shuru hone se pehle 1 baar chalta hai (RAM database start karna aur Mongoose connect karna).\n- **`beforeEach`**: Har ek test run hone se pehle chalta hai (Saare collections ka data wipe out karke clean slate dena).\n- **`afterEach`**: Har test ke theek baad chalta hai.\n- **`afterAll`**: Saare tests khatam hone par 1 baar chalta hai (Database disconnect karna aur RAM server band karna).\n\n### Bohot Zaroori Rule: `app.js` vs `server.js`\nExpress app banate waqt `app.listen()` ko alag file mein rakhein:\n- **`app.js`**: Sirf Express configure karta hai aur `export default app` karta hai. (Supertest ise use karega bina kisi live port ke).\n- **`server.js`**: `app` ko import karke live port (5000) par start karta hai."}},{type:"analogy",heading:{en:"Real-Life Analogy: The Vehicle Crash-Test Simulator Laboratory",hi:"Real-Life Analogy: Gaadiyon Ki Safety Crash-Test Laboratory"},body:{en:`Imagine Tata Motors or Maruti Suzuki manufacturing a new SUV:

- **The Amateur Way (Testing Live on Highway 8)**:
  The engineers build a prototype car, drive it directly onto the busy Delhi-Jaipur National Highway at 120 km/h, and slam into a concrete divider to see if the airbags deploy.
  If the airbags fail, the driver dies, real highway traffic is blocked for hours, and the company is sued into bankruptcy! (This is what you do when you test code directly in your live production database).
- **The Jest & Supertest Way (The Controlled Robotic Simulator)**:
  The engineers place the SUV inside an enclosed crash-test laboratory. They strap a crash-test dummy with sensors into the seat. High-speed hydraulic rams push the car into an impact wall.
  Sensors measure airbag deployment in milliseconds (**assertions / expect**). Once the test finishes, hydraulic lifts reset the test track, sweeping away all broken glass (**beforeEach cleanup**).
  Zero public casualties, 100% repeatability, and instant safety certification!`,hi:`Maruti Suzuki ya Tata Motors ki gaadi testing ka example dekhein:

- **Ganda Tareeqa (Seedha Highway Par Thokna)**:
  Engineer nayi car banate hain aur seedha Delhi-Jaipur highway par 120 km/h ki speed par kisi divider mein thok dete hain ye dekhne ke liye ki airbag khulta hai ya nahi. Agar airbag nahi khula toh driver mara gaya aur highway par traffic jam ho gaya! (Ye wahi hai jab aap bina automated test ke code seedha production server par daal dete hain).
- **Jest & Supertest (Crash-Test Laboratory)**:
  Gaadi ko ek band laboratory simulator mein le jaya jata hai. Seat par dummy putla baithaya jata hai aur sensors lagaye jaate hain. Computerized rams gaadi ko impact dete hain aur sensors check karte hain ki airbag kitne millisecond mein khula (**Jest assertions**). Test khatam hote hi safai kar di jaati hai (**cleanup**).
  Bina kisi nuksan ke gaadi 100% safe verify ho jaati hai!`}},{type:"syntax",heading:{en:"Setup & Configuration: Jest, Supertest & Memory Server",hi:"Setup Aur Configuration: Jest, Supertest Aur In-Memory Database"},body:{en:`### 1. Installation:
\`\`\`bash
npm install --save-dev jest supertest mongodb-memory-server cross-env
\`\`\`

### 2. Configure \`package.json\`:
Configure Jest to run in Node environment with ES Module support:
\`\`\`json
{
  "scripts": {
    "test": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand --detectOpenHandles",
    "test:watch": "npm test -- --watch",
    "test:coverage": "npm test -- --coverage"
  },
  "jest": {
    "testEnvironment": "node",
    "transform": {},
    "testTimeout": 30000
  }
}
\`\`\`
> [!NOTE]
> The \`--runInBand\` flag ensures tests run sequentially one after another, preventing database race conditions between test suites. \`--detectOpenHandles\` warns you if an unclosed database connection is keeping Node alive.`,hi:`### 1. Packages Install Karein:
\`\`\`bash
npm install --save-dev jest supertest mongodb-memory-server cross-env
\`\`\`

### 2. \`package.json\` Scripts:
\`\`\`json
{
  "scripts": {
    "test": "cross-env NODE_ENV=test node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand --detectOpenHandles",
    "test:watch": "npm test -- --watch"
  },
  "jest": {
    "testEnvironment": "node",
    "transform": {},
    "testTimeout": 30000
  }
}
\`\`\`
> [!NOTE]
> \`--runInBand\` flag se saare tests ek-ek karke sequence mein chalte hain taaki database state aapas mein takraye nahi.`}},{type:"example",heading:{en:"Example 1: Unit Testing Pure Helper Functions with Jest",hi:"Example 1: Pure Functions Aur Token Helpers Ka Unit Test"},body:{en:`Unit tests test small, isolated functions without network or database dependencies:

\`\`\`javascript
// tests/unit/jwtHelper.test.js
import jwt from 'jsonwebtoken';

// Helper function to test
const generateToken = (payload, secret, expiresIn = '1h') => {
  if (!payload || !payload.id) {
    throw new Error('Payload must contain a valid id');
  }
  return jwt.sign(payload, secret, { expiresIn });
};

describe('JWT Token Helper Tests', () => {
  const secretKey = 'test-secret-key-123';

  test('should generate a valid signed JWT string with correct claims', () => {
    const userPayload = { id: 'user_999', role: 'admin' };
    const token = generateToken(userPayload, secretKey, '15m');

    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3); // Header.Payload.Signature

    const decoded = jwt.verify(token, secretKey);
    expect(decoded.id).toBe('user_999');
    expect(decoded.role).toBe('admin');
  });

  test('should throw an error if payload does not contain an id', () => {
    expect(() => {
      generateToken({ name: 'Rahul' }, secretKey);
    }).toThrow('Payload must contain a valid id');
  });
});
\`\`\``,hi:`Unit test kisi external database ya network ke bina seedha functions ko test karta hai:

\`\`\`javascript
// tests/unit/jwtHelper.test.js
import jwt from 'jsonwebtoken';

const generateToken = (payload, secret, expiresIn = '1h') => {
  if (!payload || !payload.id) {
    throw new Error('Payload must contain a valid id');
  }
  return jwt.sign(payload, secret, { expiresIn });
};

describe('JWT Token Helper Tests', () => {
  const secretKey = 'test-secret-key-123';

  test('valid payload par sahi signed JWT string return honi chahiye', () => {
    const token = generateToken({ id: 'user_123', role: 'admin' }, secretKey);

    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);

    const decoded = jwt.verify(token, secretKey);
    expect(decoded.id).toBe('user_123');
    expect(decoded.role).toBe('admin');
  });

  test('bina id ke payload bhejne par error throw hona chahiye', () => {
    expect(() => {
      generateToken({ role: 'user' }, secretKey);
    }).toThrow('Payload must contain a valid id');
  });
});
\`\`\``}},{type:"example",heading:{en:"Example 2: Testing Express Middleware in Isolation with Mocks",hi:"Example 2: Mock Objects Se Express Middleware Test Karna"},body:{en:`You can test Express middleware by mocking the \`req\`, \`res\`, and \`next\` arguments using Jest mock functions (\`jest.fn()\`) without running an HTTP server:

\`\`\`javascript
// tests/unit/authMiddleware.test.js
import jwt from 'jsonwebtoken';

// The middleware under test
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied: Token missing' });
  }

  try {
    const decoded = jwt.verify(token, 'my-super-secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};

describe('Authentication Middleware Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(), // Enables method chaining: res.status(401).json()
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('should return 401 if Authorization header is missing', () => {
    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Access denied: Token missing' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('should attach decoded user to req and call next() on valid token', () => {
    const validToken = jwt.sign({ id: 'u123', role: 'admin' }, 'my-super-secret');
    req.headers['authorization'] = \`Bearer \${validToken}\`;

    authenticateToken(req, res, next);

    expect(req.user).toBeDefined();
    expect(req.user.id).toBe('u123');
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
\`\`\``,hi:`Express middleware ko \`req\`, \`res\`, aur \`next\` mock functions dekar bina kisi server ke test kiya ja sakta hai:

\`\`\`javascript
// tests/unit/authMiddleware.test.js
import jwt from 'jsonwebtoken';

describe('Auth Middleware Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test('Header na hone par 401 status aana chahiye', () => {
    authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Access denied: Token missing' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('Sahi token par req.user attach hokar next() call hona chahiye', () => {
    const token = jwt.sign({ id: 'user_1', role: 'admin' }, 'my-super-secret');
    req.headers['authorization'] = \`Bearer \${token}\`;

    authenticateToken(req, res, next);

    expect(req.user.id).toBe('user_1');
    expect(next).toHaveBeenCalledTimes(1);
  });
});
\`\`\``}},{type:"example",heading:{en:"Example 3: End-to-End Integration Test with Supertest & In-Memory MongoDB",hi:"Example 3: Supertest Aur In-Memory MongoDB Ke Sath Real API Integration Test"},body:{en:`Here is a complete integration test suite testing registration and user retrieval against a live in-memory MongoDB database:

\`\`\`javascript
// tests/integration/authApi.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../server/app.js';
import User from '../../server/models/User.js';

let mongoServer;

// 1. Setup in-memory MongoDB before test suite runs
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// 2. Clear collections before each test case for isolation
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// 3. Clean teardown after all tests finish
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /api/auth/register Integration Tests', () => {
  test('should successfully register a new user and return 201 with token', async () => {
    const newUser = {
      name: 'Pooja Sharma',
      email: 'pooja@example.com',
      password: 'SecurePassword123!',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(201);

    // Verify HTTP response body
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(newUser.email);
    expect(response.body.user.password).toBeUndefined(); // Password must NEVER be returned!

    // Verify actual record persisted in MongoDB
    const dbUser = await User.findOne({ email: newUser.email });
    expect(dbUser).not.toBeNull();
    expect(dbUser.name).toBe('Pooja Sharma');
  });

  test('should return 400 Bad Request if email already exists', async () => {
    // Pre-insert an existing user
    await User.create({
      name: 'Existing User',
      email: 'duplicate@example.com',
      password: 'hashed-password',
    });

    const duplicatePayload = {
      name: 'New Person',
      email: 'duplicate@example.com',
      password: 'AnotherPassword123!',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(duplicatePayload)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toMatch(/already registered/i);
  });
});
\`\`\``,hi:`Complete integration test jisme Supertest virtual request bhejta hai aur \`mongodb-memory-server\` RAM mein data save karke verify karta hai:

\`\`\`javascript
// tests/integration/authApi.test.js
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../server/app.js';
import User from '../../server/models/User.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /api/auth/register Tests', () => {
  test('Naya user register hone par 201 status aur token milna chahiye', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Aman Verma',
        email: 'aman@example.com',
        password: 'Password123!',
      })
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();

    // Database mein check karo
    const userInDb = await User.findOne({ email: 'aman@example.com' });
    expect(userInDb).not.toBeNull();
  });

  test('Duplicate email par 400 status aana chahiye', async () => {
    await User.create({ name: 'User 1', email: 'same@test.com', password: '123' });

    const response = await request(app)
      .post('/api/auth/register')
      .send({ name: 'User 2', email: 'same@test.com', password: '456' })
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});
\`\`\``}},{type:"mistakes",heading:{en:"Common Mistakes and How to Avoid Them",hi:"Aam Galtiyan Aur Unka Sahi Solution"},body:{en:'### 1. The Hanging Jest Process ("Jest did not exit one second after...")\n- **Mistake**: Forgetting to call `await mongoose.disconnect()` or `await mongoServer.stop()` in `afterAll`.\n- **Consequence**: Open TCP connection handles or internal timer loops prevent Node\'s process from exiting, causing CI pipelines to freeze and time out.\n- **Fix**: Always close all Mongoose connections and stop memory servers in `afterAll`. Run Jest with `--detectOpenHandles` to pinpoint rogue sockets.\n\n### 2. Calling `app.listen()` Inside the Imported Module\n- **Mistake**: Exporting an Express file that calls `app.listen(5000)`.\n- **Consequence**: When multiple test files run in parallel or watch mode restarts, Node throws `Error: listen EADDRINUSE: address already in use :::5000`.\n- **Fix**: Decouple `app.js` (exports unlistening app) from `server.js` (calls `app.listen()`). Pass `app` directly to `request(app)`.\n\n### 3. Shared Database State Across Tests\n- **Mistake**: Not wiping collections between tests. Test 1 creates a record that breaks Test 2 when executed out of order.\n- **Fix**: Include the `deleteMany({})` loop inside `beforeEach` so every single test starts with a completely virgin database.',hi:"### 1. Jest Ka Freeze Ho Jana (Hanging Process)\n- **Galti**: `afterAll` mein `mongoose.disconnect()` ya `mongoServer.stop()` na call karna.\n- **Nuksan**: Open connection ki wajah se test khatam hone ke baad bhi terminal freeze rehta hai aur CI/CD pipeline fail ho jaati hai.\n- **Solution**: Hamesha `afterAll` mein database close karein aur `--detectOpenHandles` flag use karein.\n\n### 2. `app.listen()` Wali File Ko Test Mein Import Karna\n- **Galti**: Us file ko import karna jisme `app.listen(5000)` likha ho.\n- **Nuksan**: Tests chalte waqt `EADDRINUSE: port 5000 already in use` crash ho jata hai.\n- **Solution**: `app.js` (bina listen wali file) aur `server.js` ko alag-alag rakhein. Supertest ko sirf bare `app` chahiye hota hai.\n\n### 3. Ek Test Ka Data Doosre Test Mein Leak Hona\n- **Galti**: Tests ke beech collections saaf na karna.\n- **Nuksan**: Test 1 ka data Test 2 ko fail kar deta hai.\n- **Solution**: Har test se pehle `beforeEach` mein `deleteMany({})` chala kar database reset karein."}},{type:"tip",heading:{en:"Production Best Practices",hi:"Production Best Practices & Pro Tips"},body:{en:"1. **Separate Unit Tests from Integration Tests**:\n   Keep unit tests in `tests/unit/**/*.test.js` and integration tests in `tests/integration/**/*.test.js`. Configure npm scripts to run them independently (`npm run test:unit` for fast pre-commit hooks).\n2. **Never Test Implementation Details, Test the API Contract**:\n   Assert on HTTP status codes (`200`, `201`, `400`, `401`), JSON response shapes, and database side effects. Avoid testing internal variable names or intermediate controller states.\n3. **Assert Positive AND Negative Scenarios**:\n   For every endpoint, test the happy path (`200/201`), missing required fields (`400`), unauthorized access (`401`), forbidden role access (`403`), and non-existent IDs (`404`).\n4. **Enforce Test Coverage Thresholds**:\n   In `jest.config.js`, set `coverageThreshold: { global: { branches: 75, functions: 80, lines: 80 } }` to block pull requests that reduce code quality.",hi:`1. **Unit Aur Integration Tests Ko Alag Folders Mein Rakhein**:
   Unit tests (\`tests/unit/\`) ko fast pre-commit hooks par chalayein aur Integration tests ko PR pull request par chalayein.
2. **API Contract Test Karein**:
   Status codes (\`200, 400, 401\`) aur JSON output ko test karein, internal variable names ko nahi.
3. **Happy Path Aur Error Dono Test Karein**:
   Sirf success nahi, balki galat password, duplicate email, aur missing token par aane wale 400/401 errors ko bhi test karein.
4. **Coverage Threshold Set Karein**:
   CI mein 80% code coverage threshold lagayein taaki bina test ke koi naya code production mein na ja sake.`}},{type:"interview",heading:{en:"Interview Questions & In-Depth Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:`### Q1: How does Supertest test an Express application without starting an HTTP server on a physical port?
**Answer**:
Supertest accepts an Express application instance (which is fundamentally a JavaScript request-handler callback function \`(req, res) => {}\`).
Under the hood, Supertest wraps Node's native \`http.createServer(app)\` without binding it to an external network interface port. Instead, it leverages Node's internal stream-based event loop to inject mocked HTTP request buffers directly into the Express pipeline and intercept the corresponding response buffers. This eliminates port conflicts and runs orders of magnitude faster.

---

### Q2: Why should you use \`mongodb-memory-server\` instead of mocking Mongoose queries with \`jest.mock()\`?
**Answer**:
Mocking Mongoose queries (e.g. \`User.findOne.mockResolvedValue(...)\`) tests your mock implementation, not your real database interactions. It fails to test:
- Mongoose schema validations (e.g. \`required\`, \`minlength\`, regex validators).
- Pre/post save middleware hooks (e.g. bcrypt password hashing).
- Unique index collisions (duplicate emails).
- MongoDB aggregation pipelines and operator behaviors.
\`mongodb-memory-server\` downloads and executes an actual MongoDB binary in RAM, giving you 100% genuine database behavior without touching disk or cloud networks.

---

### Q3: What is the purpose of \`--runInBand\` in Jest?
**Answer**:
By default, Jest executes test files in parallel across multiple worker threads to maximize multi-core CPU usage.
In integration testing where multiple test files interact with database states or shared mock instances, running tests in parallel can cause database race conditions. \`--runInBand\` forces Jest to execute all test suites sequentially in a single process, ensuring deterministic isolation.`,hi:`### Q1: Supertest bina kisi physical port par server start kiye Express ko kaise test karta hai?
**Answer**:
Express app darasal ek JavaScript callback function hota hai: \`(req, res) => {}\`.
Supertest Node ke native \`http.createServer(app)\` ko wrap karta hai bina use kisi live port (jaise 5000) par bind kiye. Ye direct memory buffers aur stream events use karke simulated HTTP request Express pipeline mein bhej deta hai. Isse na koi port collision hota hai aur tests lightning fast chalte hain.

---

### Q2: Mongoose ko \`jest.mock()\` karne ke badle \`mongodb-memory-server\` kyun behtar hai?
**Answer**:
Mongoose queries ko mock karne par sirf fake responses test hote hain, real database logic nahi. Mocking se:
- Schema validation rules (\`required\`, \`enum\`, min/max) test nahi hote.
- Mongoose pre-save hooks (jaise bcrypt se password hash hona) test nahi hote.
- Duplicate email ka unique index check nahi hota.
\`mongodb-memory-server\` computer ki RAM mein ek asli MongoDB binary chalata hai, jisse 100% real database behavior milta hai.

---

### Q3: Jest mein \`--runInBand\` flag ka kya use hota hai?
**Answer**:
Jest by default saare test files ko alag-alag CPU cores par ek sath (parallel) chalata hai.
Integration tests mein agar 2 files ek sath database se ched-chaad karein, toh race condition aa sakti hai. \`--runInBand\` flag Jest ko bolta hai ki saari test files ko ek-ek karke sequence mein chalaye taaki koi data takraye nahi.`}},{type:"summary",heading:{en:"Quick Summary",hi:"Quick Revision Summary"},body:{en:"- **The Testing Pyramid** balances unit tests (70%), integration tests (25%), and E2E tests (5%).\n- **Supertest** injects virtual HTTP requests into Express without binding physical network ports.\n- **`mongodb-memory-server`** runs a real MongoDB binary in RAM for zero-side-effect integration testing.\n- **Always separate `app.js`** (Express config) from **`server.js`** (`app.listen`) to prevent port collision errors.\n- **Clean collections in `beforeEach`** to guarantee test independence and eliminate flaky tests.\n- **Always close connections in `afterAll`** to prevent hanging Jest runner processes.",hi:"- **Testing Pyramid**: Unit tests (70%), Integration tests (25%), E2E tests (5%).\n- **Supertest** bina kisi physical network port ke Express routes par virtual HTTP calls chala deta hai.\n- **`mongodb-memory-server`** RAM mein real MongoDB chalata hai taaki dev/prod database safe rahe.\n- **`app.js` aur `server.js` ko alag rakhein** taaki port collision errors se bacha ja sake.\n- **`beforeEach` mein collections wipe karein** taaki har test bilkul fresh state se shuru ho.\n- **`afterAll` mein connections close karein** taaki Jest terminal mein freeze na ho."}}],quiz:[{question:{en:"Why should you decouple app.js (exporting express app) from server.js (calling app.listen) when testing with Supertest?",hi:"Supertest ke sath testing karte waqt app.js (exporting app) aur server.js (calling app.listen) ko alag kyun karna chahiye?"},options:[{en:"Because Supertest crashes if files have more than 20 lines",hi:"Kyunki Supertest 20 lines se badi files par crash ho jata hai"},{en:"Supertest requires the unlistening Express app instance; importing a file that calls app.listen() triggers port collision errors (EADDRINUSE) during automated test runs",hi:"Supertest ko unlistening Express app chahiye hota hai; app.listen() wali file import karne se port collision errors (EADDRINUSE) aate hain"},{en:"Because Jest only recognizes files named app.js",hi:"Kyunki Jest sirf app.js naam ki files pehchanta hai"},{en:"Because MongoDB requires two separate files to connect",hi:"Kyunki MongoDB connect hone ke liye 2 files maangta hai"}],correctAnswer:1,explanation:{en:"Supertest tests routes programmatically without physical port binding. If app.listen() is invoked upon import, Node attempts to bind the physical port, crashing whenever multiple suites execute.",hi:"Supertest bina port bind kiye virtual requests bhejta hai. app.listen import hone par port occupied hone ka crash aa jata hai."}},{question:{en:"What is the primary advantage of mongodb-memory-server over mocking Mongoose queries with jest.fn()?",hi:"Mongoose queries ko jest.fn() se mock karne ke badle mongodb-memory-server use karne ka sabse bada fayda kya hai?"},options:[{en:"It automatically writes user passwords to local disk",hi:"Ye passwords ko disk par likhta hai"},{en:"It executes a real MongoDB binary in RAM, verifying actual schema validations, unique indexes, and pre-save hooks without mocking fake data",hi:"Ye computer ki RAM mein real MongoDB binary chalata hai, jisse schema validations, unique indexes, aur pre-save hooks 100% genuine test hote hain"},{en:"It allows tests to run without Node.js installed",hi:"Ye bina Node.js ke tests chala deta hai"},{en:"It reduces testing code from 10 lines to 1 line",hi:"Ye testing code ko 1 line ka bana deta hai"}],correctAnswer:1,explanation:{en:"mongodb-memory-server is a real MongoDB database running in ephemeral memory. Schema rules, indexes, and ODM middleware function exactly as they do in production.",hi:"mongodb-memory-server RAM mein real MongoDB chalata hai jisse saare schema rules aur index checks real production ki tarah verify hote hain."}},{question:{en:"What critical issue occurs if you forget to invoke await mongoose.disconnect() inside the afterAll hook?",hi:"Agar aap afterAll hook mein await mongoose.disconnect() call karna bhool jayein toh kaunsi samasya aati hai?"},options:[{en:"The entire computer immediately restarts",hi:"Computer turant restart ho jata hai"},{en:"Open network handles keep the Node event loop alive, causing Jest to hang indefinitely and fail CI/CD build pipelines",hi:"Open socket handles Node event loop ko band nahi hone dete, jisse Jest terminal mein freeze ho jata hai aur CI/CD pipelines fail ho jaati hain"},{en:"The test is automatically marked as passed",hi:"Test automatically pass mark ho jata hai"},{en:"Mongoose deletes all production databases",hi:"Mongoose production databases delete kar deta hai"}],correctAnswer:1,explanation:{en:"Active network sockets or database connections keep the Node event loop active, causing Jest to log 'Jest did not exit one second after the test run completed' and freeze.",hi:"Open database connection ke rehte Node.js process terminate nahi ho sakta, jisse Jest runner hamesha ke liye latka reh jata hai."}},{question:{en:"Why is clearing database collections inside beforeEach considered a best practice in integration testing?",hi:"Integration testing mein har test se pehle beforeEach ke andar collections saaf karna best practice kyun hai?"},options:[{en:"To ensure each test case runs with complete isolation on a clean state, preventing order-dependent flaky test failures",hi:"Har test ko bilkul clean aur isolated environment dene ke liye, taaki pehle test ka bacha data doosre test ko fail na kare (flaky tests prevention)"},{en:"Because MongoDB has a 10-document limit in development",hi:"Kyunki MongoDB mein 10 documents ki limit hoti hai"},{en:"To improve typing speed in Visual Studio Code",hi:"VS Code typing speed badhane ke liye"},{en:"Because Jest deletes files if the database has data",hi:"Kyunki Jest data hone par files delete kar deta hai"}],correctAnswer:0,explanation:{en:"Tests must be deterministic and independent. Wiping collections in beforeEach prevents state pollution where one test's created documents cause duplicate key or count errors in subsequent tests.",hi:"Har test independent hona chahiye. Pehle test ke data ko saaf karne se test sequence par koi dependency nahi rehti aur tests flaky nahi bante."}},{question:{en:"What is the core architectural purpose of Backend Testing with Jest & Supertest in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Backend REST API Testing: Jest & Supertest ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling backend testing with jest & supertest with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Backend REST API Testing: Jest & Supertest ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Backend Testing with Jest & Supertest establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Backend REST API Testing: Jest & Supertest clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Backend Testing with Jest & Supertest directly resolve?",hi:"Backend REST API Testing: Jest & Supertest kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Backend Testing with Jest & Supertest, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Backend REST API Testing: Jest & Supertest ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Backend Testing with Jest & Supertest, how is its mental model best conceptualized through real-world analogies?",hi:"Backend REST API Testing: Jest & Supertest ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Backend Testing with Jest & Supertest, what syntactic convention is essential to prevent runtime errors?",hi:"Backend REST API Testing: Jest & Supertest ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Backend Testing with Jest & Supertest?",hi:"Backend REST API Testing: Jest & Supertest ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Backend Testing with Jest & Supertest be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Backend REST API Testing: Jest & Supertest ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Backend Testing with Jest & Supertest impact application memory and CPU consumption?",hi:"Backend REST API Testing: Jest & Supertest ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Backend Testing with Jest & Supertest?",hi:"Backend REST API Testing: Jest & Supertest mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Backend Testing with Jest & Supertest?",hi:"Backend REST API Testing: Jest & Supertest mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Backend Testing with Jest & Supertest?",hi:"Backend REST API Testing: Jest & Supertest mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Backend Testing with Jest & Supertest, what must the test suite assert?",hi:"Backend REST API Testing: Jest & Supertest ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Backend Testing with Jest & Supertest?",hi:"Modular design Backend REST API Testing: Jest & Supertest mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Backend Testing with Jest & Supertest be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Backend REST API Testing: Jest & Supertest ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Backend Testing with Jest & Supertest properly belong and execute?",hi:"Full-stack MERN architecture mein Backend REST API Testing: Jest & Supertest kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Backend Testing with Jest & Supertest in production?",hi:"Production mein Backend REST API Testing: Jest & Supertest ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Backend Testing with Jest & Supertest?",hi:"Backend REST API Testing: Jest & Supertest ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Backend Testing with Jest & Supertest?",hi:"Backend REST API Testing: Jest & Supertest mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
