/**
 * Dynamic content loader for MERN Learning Hub
 * Maps /learn/:moduleSlug/:topicSlug/:subtopicSlug to its respective content file
 * located in src/data/content/<module>/<topic>/<subtopic>.js
 */

// Use Vite's import.meta.glob to dynamically resolve content files
const contentModules =
  typeof import.meta !== 'undefined' && typeof import.meta.glob === 'function'
    ? import.meta.glob('./content/**/*.js')
    : {};

function formatTitle(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => {
      if (['api', 'jwt', 'css', 'html', 'dom', 'spa', 'mpa', 'url', 'npm', 'npx', 'cli', 'sql', 'nosql', 'mvc', 'cors', 'xss', 'csrf', 'tls', 'ssl', 'ssh', 'ci', 'cd', 'os', 'fs', 'http', 'https', 'json', 'xml', 'rest', 'rbac', 'otp', 'ui'].includes(word.toLowerCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function generateDynamicQuiz(moduleSlug, topicSlug, subtopicSlug, humanTitle) {
  const modTitle = formatTitle(moduleSlug);

  return [
    {
      q: {
        en: `What is the core definition and primary objective of ${humanTitle} in modern software engineering?`,
        hi: `Modern software engineering mein ${humanTitle} ka core definition aur primary objective kya hai?`,
      },
      question: {
        en: `What is the core definition and primary objective of ${humanTitle} in modern software engineering?`,
        hi: `Modern software engineering mein ${humanTitle} ka core definition aur primary objective kya hai?`,
      },
      options: [
        {
          en: `Provides structured, efficient, and standardized handling for ${humanTitle} workflows`,
          hi: `${humanTitle} workflows ke liye structured, efficient aur standardized handling provide karna`,
        },
        {
          en: `Replaces the entire underlying database engine permanently`,
          hi: `Poore database engine ko permanently replace kar dena`,
        },
        {
          en: `Restricts code execution strictly to client-side browsers without server support`,
          hi: `Code execution ko bina server support ke sirf browser tak limit karna`,
        },
        {
          en: `Disables all runtime asynchronous event loops across the system`,
          hi: `System ke saare asynchronous event loops ko disable kar dena`,
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: `${humanTitle} provides a standardized, maintainable pattern designed to solve specific architecture and operational challenges efficiently.`,
        hi: `${humanTitle} ek standardized aur maintainable pattern provide karta hai jo specific technical challenges ko efficiently solve karta hai.`,
      },
    },
    {
      q: {
        en: `Where does ${humanTitle} primarily sit within the full-stack architecture?`,
        hi: `Full-stack architecture ke andar ${humanTitle} primarily kis layer mein exist karta hai?`,
      },
      question: {
        en: `Where does ${humanTitle} primarily sit within the full-stack architecture?`,
        hi: `Full-stack architecture ke andar ${humanTitle} primarily kis layer mein exist karta hai?`,
      },
      options: [
        {
          en: `As a cosmetic CSS color filter applied only during production builds`,
          hi: `Ek cosmetic CSS filter jo sirf production build mein lagta hai`,
        },
        {
          en: `In the relevant ${modTitle} tier, orchestrating data flow, state, or operational execution`,
          hi: `Relevant ${modTitle} tier ke andar, data flow, state ya operational execution ko orchestrate karte hue`,
        },
        {
          en: `Exclusively within physical hardware motherboard BIOS chips`,
          hi: `Sirf physical hardware motherboard BIOS chips ke andar`,
        },
        {
          en: `As an external DNS-only domain registrar service`,
          hi: `Ek external DNS domain registrar service ke roop mein`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `In a modern web architecture, ${humanTitle} operates within the ${modTitle} layer to ensure predictable state and execution flow.`,
        hi: `Modern web architecture mein ${humanTitle} ${modTitle} layer ke andar kaam karke predictable execution flow ensure karta hai.`,
      },
    },
    {
      q: {
        en: `Which of the following represents the most accurate syntax or usage pattern for ${humanTitle}?`,
        hi: `${humanTitle} ke liye sabse accurate syntax ya usage pattern kaun sa hai?`,
      },
      question: {
        en: `Which of the following represents the most accurate syntax or usage pattern for ${humanTitle}?`,
        hi: `${humanTitle} ke liye sabse accurate syntax ya usage pattern kaun sa hai?`,
      },
      options: [
        {
          en: `Using verified conventions, structured parameters, and idiomatic error boundaries`,
          hi: `Verified conventions, structured parameters aur idiomatic error handling ke sath use karna`,
        },
        {
          en: `Hardcoding sensitive credentials into untracked global variables`,
          hi: `Sensitive credentials ko untracked global variables mein hardcode karna`,
        },
        {
          en: `Wrapping every statement in an infinite busy-wait while loop`,
          hi: `Har statement ko infinite while loop mein wrap kar dena`,
        },
        {
          en: `Calling unhandled promise rejections without catch handlers`,
          hi: `Unhandled promise rejections ko bina catch handler ke execute karna`,
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: `Standard idiomatic implementations require structured parameters, robust input handling, and explicit error management.`,
        hi: `Standard pattern mein structured parameters, proper inputs aur explicit error handling zaroori hoti hai.`,
      },
    },
    {
      q: {
        en: `How does ${humanTitle} handle execution lifecycle and runtime transitions?`,
        hi: `${humanTitle} runtime execution lifecycle aur state transitions ko kaise handle karta hai?`,
      },
      question: {
        en: `How does ${humanTitle} handle execution lifecycle and runtime transitions?`,
        hi: `${humanTitle} runtime execution lifecycle aur state transitions ko kaise handle karta hai?`,
      },
      options: [
        {
          en: `By freezing the OS thread until a manual restart is triggered`,
          hi: `OS thread ko freeze karke jab tak manual restart na ho`,
        },
        {
          en: `Through deterministic phases: initialization, active processing, and graceful teardown/cleanup`,
          hi: `Deterministic phases ke through: initialization, active processing, aur graceful cleanup`,
        },
        {
          en: `By converting all data types into untyped raw string representations`,
          hi: `Saare data types ko bina validation untyped strings mein badal kar`,
        },
        {
          en: `By deleting local storage cache on every single function call`,
          hi: `Har ek function call par local storage delete karke`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `Lifecycle operations follow deterministic phases ensuring resources are initialized, executed safely, and released during cleanup.`,
        hi: `Lifecycle operations deterministic steps follow karte hain jisse resources safely initialize aur release hote hain.`,
      },
    },
    {
      q: {
        en: `What is the most critical configuration parameter when setting up ${humanTitle}?`,
        hi: `${humanTitle} setup karte waqt sabse critical configuration parameter kaun sa hota hai?`,
      },
      question: {
        en: `What is the most critical configuration parameter when setting up ${humanTitle}?`,
        hi: `${humanTitle} setup karte waqt sabse critical configuration parameter kaun sa hota hai?`,
      },
      options: [
        {
          en: `Arbitrary font sizes and visual themes`,
          hi: `Manchaha font size aur visual styling`,
        },
        {
          en: `Enabling unrestricted root access for all external requests`,
          hi: `Saari external requests ko unrestricted root access dena`,
        },
        {
          en: `Explicit timeouts, environment-driven options, and sanitization boundaries`,
          hi: `Explicit timeouts, environment variables se driven options aur validation boundaries`,
        },
        {
          en: `Randomized port numbers generated on every request`,
          hi: `Har request par random port generate karna`,
        },
      ],
      answerIndex: 2,
      correctAnswer: 2,
      explanation: {
        en: `Production configurations must rely on environment-driven variables, explicit timeout thresholds, and strict sanitization.`,
        hi: `Production setup mein environment-driven variables, proper timeouts aur validation boundary set karna mandatory hota hai.`,
      },
    },
    {
      q: {
        en: `What type of return value or output is expected when invoking ${humanTitle} operations?`,
        hi: `${humanTitle} operations ko call karne par kaisa return value ya response expect kiya jata hai?`,
      },
      question: {
        en: `What type of return value or output is expected when invoking ${humanTitle} operations?`,
        hi: `${humanTitle} operations ko call karne par kaisa return value ya response expect kiya jata hai?`,
      },
      options: [
        {
          en: `A structured response object, Promise, or status indicator representing success or error`,
          hi: `Ek structured response object, Promise, ya status indicator jo success ya error batata hai`,
        },
        {
          en: `Always an undefined value with no execution feedback`,
          hi: `Hamesha undefined value jisme koi feedback nahi milta`,
        },
        {
          en: `Raw binary machine code dump directly to stdout`,
          hi: `Stdout par direct binary code ka raw dump`,
        },
        {
          en: `A compulsory browser window refresh on every invocation`,
          hi: `Har invocation par browser ka force refresh`,
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: `Predictable APIs return structured contracts (objects, promises, or status codes) indicating outcome and actionable metadata.`,
        hi: `Reliable APIs structured contract (object, promise, status code) return karti hain jisse outcome easily verify ho sake.`,
      },
    },
    {
      q: {
        en: `Which common pitfall or anti-pattern should be avoided when implementing ${humanTitle}?`,
        hi: `${humanTitle} implement karte waqt kaun si common galti ya anti-pattern se bachna chahiye?`,
      },
      question: {
        en: `Which common pitfall or anti-pattern should be avoided when implementing ${humanTitle}?`,
        hi: `${humanTitle} implement karte waqt kaun si common galti ya anti-pattern se bachna chahiye?`,
      },
      options: [
        {
          en: `Writing modular and readable code`,
          hi: `Modular aur readable code likhna`,
        },
        {
          en: `Ignoring error boundaries, uncaught exceptions, and unhandled edge conditions`,
          hi: `Error boundaries, unhandled exceptions aur edge cases ko ignore kar dena`,
        },
        {
          en: `Adding automated unit tests and linting rules`,
          hi: `Automated unit tests aur linter rules add karna`,
        },
        {
          en: `Documenting API contracts with clear parameters`,
          hi: `Clear parameters ke sath API contracts document karna`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `Failing to handle exceptions and edge conditions leads to memory leaks, silent failures, and unstable production environments.`,
        hi: `Exceptions aur edge conditions ignore karne se application crash hoti hai aur memory leak ho sakta hai.`,
      },
    },
    {
      q: {
        en: `How can performance be optimized when working with ${humanTitle} under high traffic?`,
        hi: `High traffic mein ${humanTitle} ki performance ko kaise optimize kiya ja sakta hai?`,
      },
      question: {
        en: `How can performance be optimized when working with ${humanTitle} under high traffic?`,
        hi: `High traffic mein ${humanTitle} ki performance ko kaise optimize kiya ja sakta hai?`,
      },
      options: [
        {
          en: `By disabling caching layers and recalculating every result from scratch`,
          hi: `Caching layer disable karke har calculation scratch se dobara run karna`,
        },
        {
          en: `Through memoization, caching strategies, efficient indexing, and minimizing blocking operations`,
          hi: `Memoization, caching strategies, proper indexing aur non-blocking execution use karke`,
        },
        {
          en: `By creating redundant duplicate network requests for redundancy`,
          hi: `Ek hi request ke multiple duplicate network calls bhejna`,
        },
        {
          en: `By increasing synchronous CPU-heavy work in the main thread`,
          hi: `Main thread par synchronous heavy work badha dena`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `High performance is achieved by leveraging caching, non-blocking asynchronous execution, and eliminating redundant computations.`,
        hi: `Performance caching, non-blocking execution aur duplicate computations avoid karne se boost hoti hai.`,
      },
    },
    {
      q: {
        en: `What security consideration is paramount when implementing ${humanTitle}?`,
        hi: `${humanTitle} implement karte waqt sabse important security consideration kya hai?`,
      },
      question: {
        en: `What security consideration is paramount when implementing ${humanTitle}?`,
        hi: `${humanTitle} implement karte waqt sabse important security consideration kya hai?`,
      },
      options: [
        {
          en: `Assuming all client-provided input is completely safe and authentic`,
          hi: `Yeh man lena ki user se aane wala har input safe aur authentic hai`,
        },
        {
          en: `Strict input sanitization, least-privilege principles, and protection against unauthorized mutations`,
          hi: `Strict input validation, least-privilege principle aur unauthorized access se protection`,
        },
        {
          en: `Exposing database connection strings in public client repositories`,
          hi: `Database credentials ko client-side public repo mein expose kar dena`,
        },
        {
          en: `Disabling HTTPS in favor of plaintext transmission`,
          hi: `HTTPS band karke plain text mein data transmit karna`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `Never trust client input; enforce strict validation, least-privilege authorization, and cryptographic integrity at all times.`,
        hi: `Client input par kabhi blindly bharosa na karein; strict validation aur least-privilege access enforce karein.`,
      },
    },
    {
      q: {
        en: `How does ${humanTitle} scale horizontally across multiple instances?`,
        hi: `Multiple instances mein ${humanTitle} horizontally kaise scale hota hai?`,
      },
      question: {
        en: `How does ${humanTitle} scale horizontally across multiple instances?`,
        hi: `Multiple instances mein ${humanTitle} horizontally kaise scale hota hai?`,
      },
      options: [
        {
          en: `By maintaining stateless handlers and decoupling shared state into centralized stores`,
          hi: `Stateless handlers maintain karke aur shared state ko centralized store mein decouple karke`,
        },
        {
          en: `By storing in-memory sessions on a single server without clustering`,
          hi: `Single server ki RAM mein sessions store karke`,
        },
        {
          en: `By hardcoding IP addresses in every client application build`,
          hi: `Har client application build mein hardcoded IP address daal kar`,
        },
        {
          en: `By preventing load balancers from distributing incoming traffic`,
          hi: `Load balancer ko traffic distribute karne se rok kar`,
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: `Horizontal scalability requires stateless application logic, delegating state to distributed caches or database clusters.`,
        hi: `Horizontal scaling ke liye application code stateless hona chahiye aur shared state Redis ya DB cluster mein honi chahiye.`,
      },
    },
    {
      q: {
        en: `What guarantee does ${humanTitle} provide regarding data consistency and state integrity?`,
        hi: `${humanTitle} data consistency aur state integrity ke baare mein kya guarantee provide karta hai?`,
      },
      question: {
        en: `What guarantee does ${humanTitle} provide regarding data consistency and state integrity?`,
        hi: `${humanTitle} data consistency aur state integrity ke baare mein kya guarantee provide karta hai?`,
      },
      options: [
        {
          en: `Deterministic mutation rules ensuring state is never modified directly or unpredictably`,
          hi: `Deterministic mutation rules jisse state kabhi direct ya unpredictable tarike se modify na ho`,
        },
        {
          en: `Random data updates without order or timestamp verification`,
          hi: `Bina kisi order ya timestamp ke random data updates`,
        },
        {
          en: `Automatic deletion of previous state whenever a read operation executes`,
          hi: `Read operation hone par previous data ka automatic deletion`,
        },
        {
          en: `Zero guarantees, leaving data integrity purely to user browsers`,
          hi: `Koi guarantee nahi, data safety ko sirf client browser par chhod dena`,
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: `Proper patterns guarantee state integrity by enforcing predictable, immutable or transactional state transition workflows.`,
        hi: `State integrity tab banti hai jab modifications predictable aur controlled transition workflows ke zariye hoti hain.`,
      },
    },
    {
      q: {
        en: `How should memory allocation and resource cleanup be managed with ${humanTitle}?`,
        hi: `${humanTitle} ke sath memory allocation aur resource cleanup ko kaise manage kiya jana chahiye?`,
      },
      question: {
        en: `How should memory allocation and resource cleanup be managed with ${humanTitle}?`,
        hi: `${humanTitle} ke sath memory allocation aur resource cleanup ko kaise manage kiya jana chahiye?`,
      },
      options: [
        {
          en: `By retaining all event listeners and open sockets indefinitely`,
          hi: `Saare event listeners aur sockets ko indefinitely open rakh kar`,
        },
        {
          en: `By disposing unused connections, clearing intervals, and unregistering orphaned listeners`,
          hi: `Unused connections close karke, intervals clear karke aur orphaned listeners unregister karke`,
        },
        {
          en: `By disabling garbage collection in the runtime engine`,
          hi: `Runtime engine ke garbage collector ko disable karke`,
        },
        {
          en: `By allocating 1GB buffers on every incoming request`,
          hi: `Har request par 1GB buffer allocate karke`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `Prevent memory leaks by actively unsubscribing listeners, terminating idle database sockets, and clearing active timers.`,
        hi: `Memory leak se bachne ke liye idle sockets close karein, timers clear karein aur listeners ko unsubscribe karein.`,
      },
    },
    {
      q: {
        en: `How does ${humanTitle} handle edge cases like null, undefined, or missing input parameters?`,
        hi: `${humanTitle} null, undefined ya missing parameters jaise edge cases ko kaise handle karta hai?`,
      },
      question: {
        en: `How does ${humanTitle} handle edge cases like null, undefined, or missing input parameters?`,
        hi: `${humanTitle} null, undefined ya missing parameters jaise edge cases ko kaise handle karta hai?`,
      },
      options: [
        {
          en: `Throws an unhandled TypeError that crashes the entire host process`,
          hi: `Unhandled TypeError throw karke poora process crash kar deta hai`,
        },
        {
          en: `Leverages default parameters, optional chaining, and defensive validation checks`,
          hi: `Default parameters, optional chaining aur defensive checks ke through safely handle karta hai`,
        },
        {
          en: `Silently converts null values into arbitrary random numbers`,
          hi: `Null values ko secretly random numbers mein convert kar deta hai`,
        },
        {
          en: `Halts internet connectivity until input is manually re-entered`,
          hi: `Internet connection stop kar deta hai jab tak manual input na mile`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `Robust code employs defensive defaults, nullish coalescing (??), and schema validation to gracefully process missing values.`,
        hi: `Defensive programming, default parameters aur schema validation missing values ko safely handle karte hain.`,
      },
    },
    {
      q: {
        en: `What is the recommended recovery strategy if ${humanTitle} encounters an external network failure or timeout?`,
        hi: `Agar ${humanTitle} execution ke dauran network failure ya timeout ho, toh recommended recovery strategy kya hai?`,
      },
      question: {
        en: `What is the recommended recovery strategy if ${humanTitle} encounters an external network failure or timeout?`,
        hi: `Agar ${humanTitle} execution ke dauran network failure ya timeout ho, toh recommended recovery strategy kya hai?`,
      },
      options: [
        {
          en: `Exponential backoff retry policy with circuit breaker protection and fallback responses`,
          hi: `Exponential backoff retry policy, circuit breaker protection aur safe fallback response`,
        },
        {
          en: `Spamming hundreds of parallel retry requests instantly without delay`,
          hi: `Bina kisi delay ke ek sath sainkdo retry requests bhejna`,
        },
        {
          en: `Terminating the database and erasing the operating system`,
          hi: `Database aur operating system dono ko terminate kar dena`,
        },
        {
          en: `Returning a fake 200 OK status while silently failing the operation`,
          hi: `Fail hone ke bavajood jhootha 200 OK status return karna`,
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: `Resilient architectures use exponential backoff, circuit breakers, and clear fallback data to recover from transient outages gracefully.`,
        hi: `Exponential backoff aur circuit breaker transient network issues ke waqt system ko crash hone se bachaate hain.`,
      },
    },
    {
      q: {
        en: `How does ${humanTitle} compare to traditional or legacy implementations?`,
        hi: `${humanTitle} traditional ya legacy approaches ke comparison mein kya advantage deta hai?`,
      },
      question: {
        en: `How does ${humanTitle} compare to traditional or legacy implementations?`,
        hi: `${humanTitle} traditional ya legacy approaches ke comparison mein kya advantage deta hai?`,
      },
      options: [
        {
          en: `It is slower and requires significantly more boilerplate configuration`,
          hi: `Yeh bohot slow hai aur isme zyada complex boilerplate chahiye`,
        },
        {
          en: `It provides declarative syntax, better modularity, higher developer velocity, and standardized ecosystem support`,
          hi: `Declarative syntax, better modularity, fast development aur standard ecosystem support provide karta hai`,
        },
        {
          en: `It removes all debugging and testing capabilities completely`,
          hi: `Yeh debugging aur testing tools ka support bilkul khatam kar deta hai`,
        },
        {
          en: `It only runs on legacy 16-bit desktop operating systems`,
          hi: `Yeh sirf puraane 16-bit OS par chal sakta hai`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `Modern standards favor declarative APIs, maintainability, strong ecosystem compatibility, and reduced cognitive overhead.`,
        hi: `Modern approaches declarative API aur standard maintainability provide karke development ko fast aur reliable banati hain.`,
      },
    },
    {
      q: {
        en: `Which tool or technique is most effective for debugging issues in ${humanTitle}?`,
        hi: `${humanTitle} mein issues debug karne ke liye sabse effective tool ya technique kaun si hai?`,
      },
      question: {
        en: `Which tool or technique is most effective for debugging issues in ${humanTitle}?`,
        hi: `${humanTitle} mein issues debug karne ke liye sabse effective tool ya technique kaun si hai?`,
      },
      options: [
        {
          en: `Guessing variable states without checking logs or breakpoints`,
          hi: `Bina logs ya debugger dekhe andaza lagana`,
        },
        {
          en: `Using structured logging, debugger breakpoints, DevTools profiling, and trace telemetry`,
          hi: `Structured logging, breakpoints, DevTools profiler aur trace telemetry use karna`,
        },
        {
          en: `Deleting the entire codebase and writing it from scratch every time`,
          hi: `Har bug aane par poora code delete karke dubara likhna`,
        },
        {
          en: `Turning off monitor display to avoid seeing error messages`,
          hi: `Error messages na dikhein isliye monitor band kar dena`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `Effective debugging relies on systematic observation: breakpoints, network/performance inspection in DevTools, and structured logs.`,
        hi: `Systematic debugging ke liye breakpoints, DevTools aur structured logs ka use sabse reliable tarika hai.`,
      },
    },
    {
      q: {
        en: `How does ${humanTitle} integrate across client-side and server-side boundaries?`,
        hi: `${humanTitle} client-side aur server-side boundaries ke beech kaise integrate hota hai?`,
      },
      question: {
        en: `How does ${humanTitle} integrate across client-side and server-side boundaries?`,
        hi: `${humanTitle} client-side aur server-side boundaries ke beech kaise integrate hota hai?`,
      },
      options: [
        {
          en: `Through standardized protocols, serialized JSON contracts, and consistent HTTP/WebSocket channels`,
          hi: `Standardized protocols, serialized JSON data contracts aur clear HTTP/WebSocket channels ke through`,
        },
        {
          en: `By passing uncompiled raw binary memory pointers across the network`,
          hi: `Network ke across direct binary memory pointers pass karke`,
        },
        {
          en: `By requiring the client and server to run on the exact same physical CPU core`,
          hi: `Client aur server ka ek hi physical processor core par chalna zaroori karke`,
        },
        {
          en: `Through unencrypted email attachments sent on each request`,
          hi: `Har request par email attachment bhej kar`,
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: `Full-stack boundaries communicate through standardized formats (JSON/REST/GraphQL/WebSockets) with predictable schemas.`,
        hi: `Client-server communication hamesha standardized protocols (JSON, REST, WebSockets) ke zariye safe tareeke se hoti hai.`,
      },
    },
    {
      q: {
        en: `In a production e-commerce or fintech application, how is ${humanTitle} typically leveraged?`,
        hi: `Ek production e-commerce ya fintech application mein ${humanTitle} ko generally kis tarah leverage kiya jata hai?`,
      },
      question: {
        en: `In a production e-commerce or fintech application, how is ${humanTitle} typically leveraged?`,
        hi: `Ek production e-commerce ya fintech application mein ${humanTitle} ko generally kis tarah leverage kiya jata hai?`,
      },
      options: [
        {
          en: `To reliably manage transaction states, prevent duplicate submissions, and maintain user trust`,
          hi: `Transaction states reliably manage karne, duplicate requests rokne aur user trust maintain karne ke liye`,
        },
        {
          en: `To generate random prices for different users on every refresh`,
          hi: `Har refresh par randomly alag price generate karne ke liye`,
        },
        {
          en: `To leak payment gateway tokens directly to browser console logs`,
          hi: `Payment tokens ko browser console mein print karne ke liye`,
        },
        {
          en: `To automatically cancel customer orders after 5 seconds`,
          hi: `Customer orders ko 5 second ke andar cancel kar dene ke liye`,
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: `Production enterprise apps use ${humanTitle} to maintain idempotent transactions, consistent user state, and reliable data integrity.`,
        hi: `Enterprise applications mein iska use idempotent transactions aur data consistency maintain karne ke liye hota hai.`,
      },
    },
    {
      q: {
        en: `What is the industry-standard approach for unit testing ${humanTitle}?`,
        hi: `${humanTitle} ko unit test karne ke liye industry-standard approach kya hai?`,
      },
      question: {
        en: `What is the industry-standard approach for unit testing ${humanTitle}?`,
        hi: `${humanTitle} ko unit test karne ke liye industry-standard approach kya hai?`,
      },
      options: [
        {
          en: `Skipping tests entirely and testing directly in production`,
          hi: `Tests skip karke direct production mein test karna`,
        },
        {
          en: `Isolating units with mocks/spies, testing edge cases, and asserting deterministic outputs against inputs`,
          hi: `Mocks/spies se units isolate karna, edge cases test karna aur input-output assertions verify karna`,
        },
        {
          en: `Testing only the visual color palette of the IDE editor`,
          hi: `Sirf code editor ke color palette ko test karna`,
        },
        {
          en: `Running manual console.log statements and deleting them before commit`,
          hi: `Sirf console.log chala ke commit se pehle delete kar dena`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `Robust automated testing isolates dependencies with mocks and stubs, asserting deterministic outcomes for both happy and failure paths.`,
        hi: `Automated testing mein dependencies ko mock karke normal aur error scenarios dono ke outputs verify kiye jaate hain.`,
      },
    },
    {
      q: {
        en: `Which of the following is considered a major production anti-pattern when working with ${humanTitle}?`,
        hi: `${humanTitle} ke sath kaam karte waqt kaun sa approach ek major production anti-pattern mana jata hai?`,
      },
      question: {
        en: `Which of the following is considered a major production anti-pattern when working with ${humanTitle}?`,
        hi: `${humanTitle} ke sath kaam karte waqt kaun sa approach ek major production anti-pattern mana jata hai?`,
      },
      options: [
        {
          en: `Writing clean self-documenting code with meaningful variable names`,
          hi: `Meaningful variable names ke sath clean code likhna`,
        },
        {
          en: `Tight coupling, undocumented magic numbers, mutating shared state directly, and suppressing error reporting`,
          hi: `Tight coupling, bina context magic numbers, shared state direct mutate karna aur errors chupana`,
        },
        {
          en: `Configuring lint rules and code formatters in CI pipelines`,
          hi: `CI pipelines mein linter aur formatter setup karna`,
        },
        {
          en: `Using semantic commit messages and pull request reviews`,
          hi: `Semantic commit messages aur PR review culture follow karna`,
        },
      ],
      answerIndex: 1,
      correctAnswer: 1,
      explanation: {
        en: `Tight coupling, direct state mutation, and silent error swallowing create fragile systems that fail unpredictably in production.`,
        hi: `Tight coupling aur silent error swallowing production code ko fragile aur maintain karne mein mushkil bana dete hain.`,
      },
    },
    {
      q: {
        en: `In senior full-stack interviews, what core architectural trade-off regarding ${humanTitle} is most frequently evaluated?`,
        hi: `Senior full-stack interviews mein ${humanTitle} ke baare mein kaun sa core architectural trade-off sabse zyada pucha jata hai?`,
      },
      question: {
        en: `In senior full-stack interviews, what core architectural trade-off regarding ${humanTitle} is most frequently evaluated?`,
        hi: `Senior full-stack interviews mein ${humanTitle} ke baare mein kaun sa core architectural trade-off sabse zyada pucha jata hai?`,
      },
      options: [
        {
          en: `Balancing simplicity vs flexibility, memory footprint vs CPU computational speed, and consistency vs latency`,
          hi: `Simplicity vs flexibility, memory usage vs CPU speed, aur consistency vs latency ke trade-offs ko balance karna`,
        },
        {
          en: `Which programming language has the brightest default syntax highlighting`,
          hi: `Kaun si language ka syntax highlighting sabse bright dikhta hai`,
        },
        {
          en: `Whether monitors should be rotated vertically or horizontally`,
          hi: `Monitor vertical hona chahiye ya horizontal`,
        },
        {
          en: `How many comments can fit into a single source file before overflowing`,
          hi: `Ek file mein kitne comments likhe ja sakte hain`,
        },
      ],
      answerIndex: 0,
      correctAnswer: 0,
      explanation: {
        en: `Architectural discussions focus on tangible trade-offs: latency vs consistency, memory consumption vs throughput, and complexity vs maintainability.`,
        hi: `Senior interviews mein latency vs consistency, memory vs throughput aur system design trade-offs ko balance karna dekha jata hai.`,
      },
    },
  ];
}

function generateDynamicSubtopicContent(moduleSlug, topicSlug, subtopicSlug) {
  const humanSubtopic = formatTitle(subtopicSlug);
  const humanTopic = formatTitle(topicSlug);
  const humanModule = formatTitle(moduleSlug);

  const isRedis = moduleSlug.includes('redis') || topicSlug.includes('redis') || subtopicSlug.includes('redis');
  const isDocker = moduleSlug.includes('docker') || topicSlug.includes('docker') || subtopicSlug.includes('docker');

  let conceptSection, analogySection, codeSection, deepdiveSection, pitfallsSection, interviewSection;

  if (isRedis) {
    conceptSection = {
      type: 'concept',
      heading: {
        en: `1. Redis Architecture & Core Principles of ${humanSubtopic}`,
        hi: `1. Redis Architecture & ${humanSubtopic} Ka Deep Dive`,
      },
      body: {
        en: `**${humanSubtopic}** is a core component of the **Redis In-Memory Engine** in high-throughput MERN systems.\n\n### Why Redis Excels for ${humanSubtopic}:\n- **Sub-Millisecond Latency**: Data resides directly in computer **RAM**, delivering $O(1)$ query speeds (<0.5ms) compared to 40ms-100ms disk reads.\n- **Single-Threaded Event Loop**: Handles over **100,000+ operations/second** without multithreading lock contention or race conditions.\n- **Cache-Aside Architecture**: Sits between Express and MongoDB to absorb 95% of database read queries during peak traffic spikes.\n- **Rich Data Primitives**: Supports Strings, Hashes, Lists, Sets, and Sorted Sets (ZSET) for atomic counters, session stores, and real-time queues.`,
        hi: `**${humanSubtopic}** high-scale MERN architecture mein **Redis In-Memory Engine** ka ek mahatvapurna part hai.\n\n### Redis Ke Mukhya Fayde:\n- **Sub-Millisecond Speed**: Data computer ki **RAM** mein rehta hai, jisse queries **1ms se bhi kam** ($O(1)$) time mein execute hoti hain.\n- **Single-Threaded Loop**: Bina thread locking ke **1,00,000+ operations per second** handle karta hai.\n- **Cache-Aside Protection**: MongoDB ke aage shield ki tarah kaam karke 95% disk traffic ko rok leta hai.\n- **Data Structures**: Strings, Hashes, Sets aur Sorted Sets ke through atomic operations provide karta hai.`,
      },
      code: {
        language: 'javascript',
        filename: 'redisService.js',
        snippet: `import { createClient } from 'redis';\n\n// Initialize Redis In-Memory Client\nexport const redis = createClient({\n  url: process.env.REDIS_URL || 'redis://localhost:6379'\n});\n\nredis.on('error', (err) => console.error('[Redis Error]:', err));\nawait redis.connect();\n\n// Implementation for ${humanSubtopic}\nexport async function execute${humanSubtopic.replace(/[^a-zA-Z0-9]/g, '')}(key, data, ttlSeconds = 3600) {\n  const cacheKey = \`cache:\${key}\`;\n  \n  // Write to Redis RAM with expiration (TTL)\n  await redis.set(cacheKey, JSON.stringify(data), {\n    EX: ttlSeconds\n  });\n  \n  // Sub-millisecond lookup\n  const cached = await redis.get(cacheKey);\n  return JSON.parse(cached);\n}`,
      },
    };

    analogySection = {
      type: 'analogy',
      heading: {
        en: '2. Real-World Indian Analogy: Haldiram Display Counter vs Basement Godown',
        hi: '2. Real-World Desi Analogy: Haldiram Glass Counter vs Basement Godown',
      },
      body: {
        en: `### 🍬 The Haldiram Sweet Shop Analogy\n\nThink of **${humanSubtopic}** in Redis like **Haldiram's Front Glass Counter**:\n1. **The Basement Godown (MongoDB on Disk)**: Unpacking crates in the basement takes 15 minutes per customer. If 1,000 customers arrive during Diwali, the shop shuts down!\n2. **The Glass Front Counter (Redis in RAM)**: Pre-packaged boxes of *Kaju Katli* are placed on the front counter. Orders take **2 seconds** (Cache Hit).\n3. **Cache Miss**: Only when an unusual sweet is requested does the clerk fetch it from the godown, placing extra boxes on the front counter for the next customer!\n\nRedis is your application's ultra-fast front glass counter that protects the heavy basement database.`,
        hi: `### 🍬 Haldiram Mithai Shop Ka Example\n\n**${humanSubtopic}** ko **Haldiram ke Glass Counter** ki tarah samjhein:\n1. **Basement Godown (MongoDB Hard Disk)**: Har customer ke liye basement godown se dabba laane mein 15 minute lagte hain aur line choke ho jati hai.\n2. **Front Glass Counter (Redis RAM)**: Sabse zyada bikne wali mithaiyan counter par ready hoti hain, jo **2 second** mein deliver ho jati hain (**Cache Hit**).\n3. **Cache Miss**: Rare order aane par hi clerk basement godown jata hai aur aate waqt agle customers ke liye counter par bhi extra dabba rakh deta hai.`,
      },
    };

    codeSection = {
      type: 'syntax',
      heading: {
        en: `3. Production Implementation for ${humanSubtopic}`,
        hi: `3. Production Express + Redis Code Walkthrough`,
      },
      body: {
        en: `Production-ready pattern incorporating structured error boundaries and MongoDB fallback:`,
        hi: `MongoDB fallback aur try/catch ke sath safe implementation pattern:`,
      },
      code: {
        language: 'javascript',
        filename: 'controller.js',
        snippet: `// Graceful Cache-Aside pattern for ${humanSubtopic}\nexport async function handle${humanSubtopic.replace(/[^a-zA-Z0-9]/g, '')}(req, res) {\n  const key = \`${subtopicSlug}:\${req.params.id || 'default'}\`;\n  try {\n    // 1. Check Redis RAM Cache\n    const cached = await redis.get(key);\n    if (cached) {\n      res.setHeader('X-Cache', 'HIT');\n      return res.json({ success: true, source: 'redis', data: JSON.parse(cached) });\n    }\n\n    // 2. Cache Miss -> Query MongoDB\n    const freshData = { target: '${humanSubtopic}', timestamp: Date.now() };\n    \n    // 3. Save to Redis with 1-hour TTL\n    await redis.set(key, JSON.stringify(freshData), { EX: 3600 });\n    \n    res.setHeader('X-Cache', 'MISS');\n    return res.json({ success: true, source: 'mongodb', data: freshData });\n  } catch (err) {\n    // Fallback to database directly if Redis is temporarily unreachable\n    console.error('Redis Degraded:', err);\n    return res.json({ success: true, source: 'fallback', data: {} });\n  }\n}`,
      },
    };

    deepdiveSection = {
      type: 'deepdive',
      heading: {
        en: '4. Memory Lifecycle, TTL & Persistence Architecture',
        hi: '4. Memory Lifecycle, Expiration (TTL) & Persistence Flow',
      },
      body: {
        en: `### How Redis Manages ${humanSubtopic} Internally:\n\n1. **In-Memory Keyspace**: Keys reside directly in volatile RAM hash tables ($O(1)$ lookup time).\n2. **TTL Expiration Window**: Active and passive eviction algorithms purge expired keys continuously without locking the main thread.\n3. **Eviction Policies**: When \`maxmemory\` is reached, policies like \`allkeys-lru\` or \`volatile-lru\` discard stale keys safely.\n4. **Durability Options**: Background asynchronous snapshots (**RDB**) or write logging (**AOF**) guarantee data recovery upon machine restart.`,
        hi: `### Redis System Ke Andar Background Flow:\n\n1. **In-Memory Hash Table**: Keys seedhe computer RAM mein rehte hain ($O(1)$ instant lookup).\n2. **TTL Auto-Expiry**: Set kiye gaye time ke baad Redis background mein expired keys ko memory se clean karta hai.\n3. **LRU Eviction**: Agar RAM bhar jaye, toh Least Recently Used policy purana data safely remove kar deti hai.\n4. **Disk Persistence**: RDB snapshots aur AOF append logs server restart hone par data wapas restore kar dete hain.`,
      },
    };

    pitfallsSection = {
      type: 'pitfalls',
      heading: {
        en: '5. Critical Redis Pitfalls & How to Avoid Them',
        hi: '5. Redis Anti-Patterns & Solutions',
      },
      body: {
        en: `### ❌ Major Pitfalls:\n1. **Missing TTL**: Unbounded memory growth leading to Out-Of-Memory (OOM) server crashes.\n2. **Cache Stampede**: Thousands of concurrent queries hitting MongoDB at the exact second a hot key expires.\n3. **Running 'KEYS *' in Production**: Blocks the single-threaded Redis event loop for seconds; always use cursor-based \`SCAN\`.\n4. **Storing Giant JSON Blobs**: Heavy serialization blocks other concurrent users; keep objects small and lean.`,
        hi: `### ❌ Yeh Galtiyan Na Karein:\n1. **Bina TTL ke keys store karna**: RAM bhar jane par Redis OOM crash ho jata hai.\n2. **Cache Stampede**: Hot key expire hote hi saari requests ek sath MongoDB par toot padna.\n3. **KEYS * command chalana**: Single-threaded Redis freeze ho jata hai; hamesha \`SCAN\` use karein.\n4. **50MB ke heavy objects store karna**: Deserialization time mein baki users block ho jate hain.`,
      },
    };

    interviewSection = {
      type: 'interview',
      heading: {
        en: '6. Top Redis Interview Questions & Senior Engineer Tips',
        hi: '6. Redis Interview Questions & Senior Engineer Tips',
      },
      body: {
        en: `### Technical Interview Questions:\n- **Q: Why is Redis single-threaded yet so extraordinarily fast?**\n  *Answer*: All data lives in RAM (zero disk I/O seek latency), and Redis uses non-blocking I/O multiplexing (\`epoll\`/\`kqueue\`), completely eliminating multithreading lock contention and context-switching overhead.\n- **Q: How do you prevent a Cache Stampede?**\n  *Answer*: Use distributed mutex locking (Redlock) or probabilistic early background recomputation (XFetch).\n- **Q: What is the difference between Redis and Memcached?**\n  *Answer*: Redis supports rich data structures (Hashes, Sets, Sorted Sets, Streams), disk persistence (RDB/AOF), Pub/Sub, and replication, whereas Memcached is a simpler multithreaded string-only cache.`,
        hi: `### Top Interview Questions:\n- **Q: Single-threaded hone ke bavajood Redis itna fast kyun hai?**\n  *Answer*: Saara data RAM mein hota hai (no disk I/O), aur Redis non-blocking I/O multiplexer use karta hai bina context switching overhead ke.\n- **Q: Cache Stampede se kaise bacha jata hai?**\n  *Answer*: Distributed mutex locks (Redlock) ya early background recomputation se.\n- **Q: Redis vs Memcached mein kya farq hai?**\n  *Answer*: Redis mein rich data types (Hashes, Sets, Sorted Sets), disk persistence aur Pub/Sub hote hain, jabki Memcached sirf simple string cache hai.`,
      },
    };
  } else if (isDocker) {
    conceptSection = {
      type: 'concept',
      heading: {
        en: `1. Docker Containerization & Core Principles of ${humanSubtopic}`,
        hi: `1. Docker Containerization & ${humanSubtopic} Ka Deep Dive`,
      },
      body: {
        en: `**${humanSubtopic}** plays a foundational role in modern **Docker Containerization** and microservices deployment.\n\n### Why Docker Transforms ${humanSubtopic}:\n- **Eliminates 'Works on My Machine'**: Packages your application code, Node runtime, native system libraries, and configuration into an immutable, portable container.\n- **Lightweight OS Virtualization**: Containers share the **Host Linux Kernel** using Linux **Namespaces** (PID, NET, MNT) and **Control Groups (cgroups)**, avoiding the heavy 2GB+ overhead of Virtual Machine guest operating systems.\n- **Instant Millisecond Startup**: Launches in under 500ms as an isolated process on the host OS.\n- **Enterprise Parity**: Guaranteed identical behavior from a local MacBook to production AWS/GCP Kubernetes clusters.`,
        hi: `**${humanSubtopic}** modern DevOps aur MERN production deployment mein **Docker Containerization** ka ek essential pillar hai.\n\n### Docker Ke Mukhya Fayde:\n- **Environment Parity**: 'Works on my machine' ka bahana khatam; application har computer aur server par 100% same chalti hai.\n- **Lightweight Kernel Sharing**: Heavy Virtual Machines ke badle container host OS ka **Linux Kernel share karta hai** through Namespaces aur cgroups.\n- **Instant Boot**: Container **500ms se kam** time mein live running process ban jata hai.\n- **Microservices Ready**: Frontend, backend, database aur caching containers ek sath Docker Compose par chalte hain.`,
      },
      code: {
        language: 'dockerfile',
        filename: 'Dockerfile',
        snippet: `# Production Dockerfile for ${humanSubtopic}\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\n\nFROM node:20-alpine AS runner\nWORKDIR /app\n# Run as non-root user for enterprise container security\nUSER node\nCOPY --chown=node:node --from=builder /app/node_modules ./node_modules\nCOPY --chown=node:node . .\n\nEXPOSE 5000\nENV NODE_ENV=production\nCMD ["node", "src/server.js"]`,
      },
    };

    analogySection = {
      type: 'analogy',
      heading: {
        en: '2. Real-World Indian Analogy: Mumbai Nhava Sheva (JNPT) Cargo Containers',
        hi: '2. Real-World Desi Analogy: Mumbai JNPT Port Ke Shipping Containers',
      },
      body: {
        en: `### 🚢 The Standardized Steel Shipping Container Analogy\n\nThink of **${humanSubtopic}** in Docker like **Intermodal Shipping Containers at Mumbai Port**:\n1. **Before Containers (Chaos)**: Sacks of basmati rice, crates of glass, and barrels of oil were loaded individually onto ships. Sacks tore, bottles broke, and cargo was rejected due to odd hold dimensions.\n2. **The Standardized ISO Container**: A standard 8x8x20 ft steel box fits any cargo. The cranes at Mumbai JNPT Port, cargo trucks in Delhi, and freight trains in Chennai all use the **exact same locks and dimensions**.\n3. **Docker is that Steel Container**: Your code (Express, React, Mongo) is the cargo. Cloud providers (AWS, GCP, local laptop) are the cranes that load and run it without caring what code is inside!`,
        hi: `### 🚢 Mumbai JNPT Port Ke Cargo Containers Ka Example\n\n**${humanSubtopic}** ko **Standard Shipping Containers** ki tarah samjhein:\n1. **Pehle Ka Chaos**: 500 alag-alag bori masale aur kaanch ke bartan jahaz mein haath se load hote the, raste mein toot-phoot hoti thi.\n2. **Standard Steel Box**: Standard shipping container ke andar chahe iPhone ho ya chawal, bahar se har container ka size aur lock bilkul same hota hai.\n3. **Docker Software Ka Shipping Container Hai**: Aapka code container ke andar ka samaan hai, aur Docker use ek standard box bana deta hai jo kisi bhi cloud server par bina error ke run hota hai!`,
      },
    };

    codeSection = {
      type: 'syntax',
      heading: {
        en: `3. Production Docker Architecture for ${humanSubtopic}`,
        hi: `3. Docker Compose & Multi-Container Setup`,
      },
      body: {
        en: `Production-ready declarative multi-container specification:`,
        hi: `Docker Compose specification jo bridge network aur named volumes configure karti hai:`,
      },
      code: {
        language: 'yaml',
        filename: 'docker-compose.yml',
        snippet: `version: '3.8'\nservices:\n  app:\n    build: .\n    container_name: mern_service\n    restart: unless-stopped\n    ports:\n      - "5000:5000"\n    environment:\n      - NODE_ENV=production\n      - MONGO_URI=mongodb://mongo:27017/appdb\n    depends_on:\n      - mongo\n    networks:\n      - mern_bridge\n\n  mongo:\n    image: mongo:7.0\n    volumes:\n      - db_data:/data/db\n    networks:\n      - mern_bridge\n\nvolumes:\n  db_data:\n\nnetworks:\n  mern_bridge:\n    driver: bridge`,
      },
    };

    deepdiveSection = {
      type: 'deepdive',
      heading: {
        en: '4. Kernel Namespaces, cgroups & Layered UnionFS',
        hi: '4. Kernel Namespaces, cgroups & Layer Caching',
      },
      body: {
        en: `### The Technical Underpinnings of Docker:\n\n1. **PID & NET Namespaces**: Isolates process lists and virtual network interfaces per container.\n2. **Control Groups (cgroups)**: Enforces hard limits on memory (e.g., \`--memory=512m\`) and CPU cores (\`--cpus=1.5\`).\n3. **UnionFS (Overlay2)**: Builds images as read-only stacked layers. Changing one line of code only invalidates and rebuilds that specific layer.\n4. **Bridge Networks & DNS**: Containers resolve each other automatically by service name (e.g., \`mongo:27017\`) via Docker's internal DNS.`,
        hi: `### Docker Ke Technical Pillars:\n\n1. **Namespaces**: Har container ko isolated process IDs, network interfaces aur file systems dete hain.\n2. **cgroups**: CPU aur RAM limits enforce karte hain taaki ek container poore server ko choke na kare.\n3. **Layer Caching (Overlay2)**: Images stacked read-only layers se banti hain. Sirf badli hui file ka layer dobara compile hota hai.\n4. **Internal DNS**: Docker bridge network service names ko automatically IP address mein resolve kar deta hai.`,
      },
    };

    pitfallsSection = {
      type: 'pitfalls',
      heading: {
        en: '5. Docker Pitfalls & Enterprise Security Best Practices',
        hi: '5. Docker Pitfalls & Security Best Practices',
      },
      body: {
        en: `### ❌ Critical Mistakes in Docker:\n1. **Running as Root**: Always configure \`USER node\` to prevent container breakout privilege escalation.\n2. **Missing .dockerignore**: Unintentionally copying 500MB of local \`node_modules/\` or sensitive \`.env\` secrets into the image.\n3. **Bloated Base Images**: Using \`FROM node:20\` (1.1GB) instead of \`FROM node:20-alpine\` (~130MB).\n4. **Missing Named Volumes for DBs**: Running MongoDB in a container without a persistent volume causes total data loss on container restart!`,
        hi: `### ❌ In Galtiyo Se Hamesha Bachein:\n1. **Root user par run karna**: Hamesha non-root \`USER node\` lagayein.\n2. **.dockerignore na banana**: Local node_modules aur .env secrets image mein leak ho jate hain.\n3. **Badi base image lena**: Alpine Linux use karein taaki image size 1GB se ghat kar 130MB ho jaye.\n4. **Database volume na lagana**: Bina named volume ke MongoDB restart hone par saara data delete ho jata hai!`,
      },
    };

    interviewSection = {
      type: 'interview',
      heading: {
        en: '6. Top Docker Interview Questions & Senior Engineer Tips',
        hi: '6. Docker Interview Questions & Senior Engineer Tips',
      },
      body: {
        en: `### Technical Interview Questions:\n- **Q: What is the primary difference between a Docker Container and a Virtual Machine?**\n  *Answer*: A VM runs a full guest operating system with a hypervisor (minutes to boot, GBs of RAM). A container shares the host OS kernel and runs as an isolated process via namespaces and cgroups (milliseconds to boot, MBs of RAM).\n- **Q: How does Docker Layer Caching work?**\n  *Answer*: Each Dockerfile command creates a cached read-only layer. Copying package.json before source code ensures npm install only re-runs when dependencies change.\n- **Q: What is the difference between CMD and ENTRYPOINT?**\n  *Answer*: ENTRYPOINT defines the immutable command executable, while CMD provides default parameters that can be overridden from the CLI.`,
        hi: `### Top Interview Questions:\n- **Q: Docker Container aur Virtual Machine mein kya farq hai?**\n  *Answer*: VM poora naya guest OS chalati hai hypervisor par. Container host Linux kernel share karta hai aur milliseconds mein lightweight process ki tarah chalta hai.\n- **Q: Docker Layer Caching kaise kaam karti hai?**\n  *Answer*: Har Dockerfile command ek layer banati hai. Pehle package.json copy karne se dependencies cache ho jati hain.\n- **Q: CMD vs ENTRYPOINT mein kya difference hai?**\n  *Answer*: ENTRYPOINT fixed executable set karta hai aur CMD default parameters deta hai jo CLI se override ho sakte hain.`,
      },
    };
  } else {
    // Standard Full-Stack Module Generator
    conceptSection = {
      type: 'concept',
      heading: {
        en: `1. Core Overview & Fundamental Principles of ${humanSubtopic}`,
        hi: `1. ${humanSubtopic} Ka Core Concept aur Overview`,
      },
      body: {
        en: `**${humanSubtopic}** plays a foundational role in the **${humanTopic}** domain within **${humanModule}**.\n\n### Key Architectural Pillars:\n- **Predictable Execution**: Standardized patterns for data flow, state management, and lifecycle events.\n- **Scalable Architecture**: Decoupled design principles ensuring high throughput under concurrent workloads.\n- **Enterprise Standards**: Production-grade patterns adopted by modern engineering teams worldwide.\n\nUnderstanding how **${humanSubtopic}** connects with adjacent systems guarantees robust, maintainable full-stack software.`,
        hi: `**${humanSubtopic}** modern full-stack development mein **${humanModule}** ke andar **${humanTopic}** ka ek essential pillar hai.\n\n### Mukhya Fayde:\n- **Predictable Execution**: Data flow aur lifecycle events ko structured aur predictable banata hai.\n- **Scalable Architecture**: High traffic mein system ko fast aur stable rakhta hai.\n- **Enterprise Best Practices**: Production apps mein standard industry practices ko follow karta hai.\n\nIs topic ko master karke aap production-level applications ko confidently build aur debug kar sakte hain.`,
      },
      code: {
        language: 'javascript',
        filename: `${subtopicSlug}.js`,
        snippet: `// ${humanModule} -> ${humanTopic} -> ${humanSubtopic}\n// Production Implementation Pattern\n\nexport function initialize${humanSubtopic.replace(/[^a-zA-Z0-9]/g, '')}(config = {}) {\n  const options = {\n    enabled: true,\n    timeout: 5000,\n    ...config\n  };\n\n  console.log('[System]: ${humanSubtopic} initialized successfully with options:', options);\n  return {\n    status: 'ACTIVE',\n    module: '${moduleSlug}',\n    topic: '${topicSlug}',\n    subtopic: '${subtopicSlug}',\n    timestamp: new Date().toISOString()\n  };\n}`,
      },
    };

    analogySection = {
      type: 'analogy',
      heading: {
        en: '2. Real-World Indian Analogy & Mental Model',
        hi: '2. Real-World Desi Example & Samajhne Ka Asan Tarika',
      },
      body: {
        en: `### 🚆 The Indian Railway Reservation Counter Analogy\n\nThink of **${humanSubtopic}** like an **IRCTC Tatkal Booking or Reservation Counter**:\n1. **The Request**: Passengers submit their booking forms (input data) to the counter window.\n2. **The Validation**: The booking clerk checks if the train number, quota, and ID proof match rules (validation boundary).\n3. **The Execution**: Once verified, the central ticket engine allocates a confirmed seat and issues a unique PNR token.\n4. **The Exception Handling**: If the quota is full, a Waiting List (WL) or RAC ticket is issued deterministically rather than crashing the counter!\n\nSimilarly, **${humanSubtopic}** ensures that incoming instructions are systematically validated, safely executed, and cleanly communicated back without halting the entire platform.`,
        hi: `### 🚆 Indian Railway Counter Ka Example\n\n**${humanSubtopic}** ko **Railway Station Reservation Counter** ki tarah samjhein:\n1. **Passenger Request**: Aap reservation form bhar ke counter clerk ko dete hain (Request/Input).\n2. **Validation**: Clerk check karta hai ki train number, date aur passenger details sahi hain ya nahi (Validation Gate).\n3. **Processing**: System check karta hai ki berth available hai, seat allocate karta hai aur confirmed PNR number issue karta hai.\n4. **Error Handling**: Agar seat nahi hai, toh system crash nahi hota—balki deterministic Waiting List (WL) status return karta hai!\n\nIsi tarah **${humanSubtopic}** har operation ko systematically validate, process aur respond karta hai.`,
      },
    };

    codeSection = {
      type: 'syntax',
      heading: {
        en: `3. Syntax, Signatures & Implementation Walkthrough`,
        hi: `3. Syntax, Implementation aur Code Structure`,
      },
      body: {
        en: `Here is the standardized, production-ready syntax structure for working with **${humanSubtopic}**:\n\n- Parameterized configuration with defaults\n- Clean async/await exception boundaries\n- Deterministic response payloads`,
        hi: `Modern applications mein **${humanSubtopic}** ko implement karne ka standard aur safe pattern:`,
      },
      code: {
        language: 'javascript',
        filename: 'serviceHandler.js',
        snippet: `/**\n * Production handler for ${humanSubtopic}\n */\nexport async function handle${humanSubtopic.replace(/[^a-zA-Z0-9]/g, '')}Operation(payload = {}) {\n  try {\n    // 1. Guard check and input validation\n    if (!payload || typeof payload !== 'object') {\n      throw new Error('Invalid input payload provided for ${humanSubtopic}');\n    }\n\n    // 2. Core domain operation\n    const result = await Promise.resolve({\n      success: true,\n      target: '${humanSubtopic}',\n      processedAt: Date.now(),\n      data: payload\n    });\n\n    return result;\n  } catch (error) {\n    console.error('[Error in ${humanSubtopic}]:', error.message);\n    throw error;\n  }\n}`,
      },
    };

    deepdiveSection = {
      type: 'deepdive',
      heading: {
        en: `4. Architectural Flow & Runtime Execution Lifecycle`,
        hi: `4. Architectural Flow aur Runtime Lifecycle`,
      },
      body: {
        en: `Understanding what happens behind the scenes during execution:\n\n1. **Dispatch Phase**: Caller invokes the interface with context parameters.\n2. **Interception & Validation**: Incoming properties pass through schema guards.\n3. **State Mutation / Side Effect**: Core processing occurs within the appropriate runtime worker.\n4. **Response Serialization**: Clean output payload returned to the caller.\n5. **Resource Teardown**: Sockets, timers, or memory allocations are released gracefully.`,
        hi: `System ke andar background mein kya step-by-step process chalti hai:\n\n1. **Dispatch Phase**: Caller function ko parameters ke sath call karta hai.\n2. **Validation Guard**: Saara incoming data check hota hai.\n3. **Core Execution**: Main logic execute hota hai bina UI ya main thread ko block kiye.\n4. **Serialization**: Clean response caller ko milta hai.\n5. **Cleanup Phase**: Memory aur network connections safely close hote hain.`,
      },
    };

    pitfallsSection = {
      type: 'pitfalls',
      heading: {
        en: '5. Common Pitfalls & How to Avoid Them',
        hi: '5. Common Galtiyan aur Unka Solution',
      },
      body: {
        en: `### ❌ Anti-Patterns to Watch Out For:\n1. **Uncaught Async Exceptions**: Forgetting try/catch blocks or unhandled promise rejections.\n2. **Direct State Mutation**: Modifying internal state objects directly rather than creating immutable copies.\n3. **Resource Leakage**: Leaving open database listeners or uncancelled timers.\n\n### ✅ Production Fixes:\n- Always wrap async boundaries in structured try/catch blocks.\n- Use immutable update patterns (spread operators, deep clones).\n- Implement explicit cleanup handlers during teardown.`,
        hi: `### ❌ Yeh Galtiyan Na Karein:\n1. **Unhandled Promises**: Async calls mein try/catch na lagana.\n2. **Direct Mutation**: Original state ya object ko direct change karna.\n3. **Memory Leaks**: Event listeners ya DB sockets ko open chhod dena.\n\n### ✅ Best Practices:\n- Hamesha try/catch aur global error handlers use karein.\n- Objects ko immutable tareeke se update karein.\n- Component unmount ya process shutdown par cleanup zaroor karein.`,
      },
    };

    interviewSection = {
      type: 'interview',
      heading: {
        en: '6. Top Interview Questions & Senior Engineer Tips',
        hi: '6. Interview Questions aur Pro Tips',
      },
      body: {
        en: `### Common Technical Interview Questions:\n- **Q: What is the primary problem solved by ${humanSubtopic}?**\n  *Answer*: It establishes predictable, standardized execution, preventing state corruption, memory bloat, and architectural fragmentation.\n- **Q: How does ${humanSubtopic} scale when millions of requests arrive?**\n  *Answer*: By maintaining stateless workers and offloading shared state to distributed caches/databases, enabling linear horizontal scalability.\n- **Q: What is the biggest trade-off?**\n  *Answer*: Slight initial configuration overhead in exchange for long-term type safety, testability, and stability.`,
        hi: `### Technical Interview Questions:\n- **Q: ${humanSubtopic} ka main purpose kya hai?**\n  *Answer*: Yeh predictable aur reliable execution provide karta hai jisse bugs aur memory leaks nahi hote.\n- **Q: High traffic scale kaise handle hota hai?**\n  *Answer*: Stateless architecture aur distributed caching (jaise Redis) ke zariye horizontal scaling aasan hoti hai.\n- **Q: Iska main trade-off kya hai?**\n  *Answer*: Shuru mein thoda setup aur boilerplate badhta hai, lekin long-term stability aur maintainability milti hai.`,
      },
    };
  }

  const summarySection = {
    type: 'summary',
    heading: {
      en: '7. Summary & Quick Revision Cheat Sheet',
      hi: '7. Summary & Quick Revision Cheat Sheet',
    },
    body: {
      en: `### 📌 Quick Recall Key Points:\n- **Domain**: ${humanModule} -> ${humanTopic} -> ${humanSubtopic}.\n- **Rule 1**: Always validate inputs defensively before execution.\n- **Rule 2**: Keep functions pure and decoupled from global scope.\n- **Rule 3**: Test both success and failure cases with automated tests.\n- **Rule 4**: Monitor performance metrics in production telemetry.`,
      hi: `### 📌 Revision Points:\n- **Role**: ${humanModule} mein ${humanTopic} ka crucial part.\n- **Rule 1**: Input validation kabhi skip na karein.\n- **Rule 2**: Code ko pure aur modular banayein.\n- **Rule 3**: Success aur error dono paths ko test karein.\n- **Rule 4**: Production mein structured logging aur metrics track karein.`,
    },
  };

  const sections = [
    conceptSection,
    analogySection,
    codeSection,
    deepdiveSection,
    pitfallsSection,
    interviewSection,
    summarySection,
  ];

  const quiz = generateDynamicQuiz(moduleSlug, topicSlug, subtopicSlug, humanSubtopic);

  return {
    id: `${moduleSlug}-${topicSlug}-${subtopicSlug}`,
    title: {
      en: humanSubtopic,
      hi: `${humanSubtopic} (Hinglish Guide)`,
    },
    difficulty: 'Intermediate',
    readTime: 12,
    sections,
    quiz,
  };
}

/**
 * Load subtopic content dynamically
 * @param {string} moduleSlug
 * @param {string} topicSlug
 * @param {string} subtopicSlug
 * @returns {Promise<object>} Content data object
 */
export async function loadSubtopicContent(moduleSlug, topicSlug, subtopicSlug) {
  // Construct expected relative file path
  const expectedPath = `./content/${moduleSlug}/${topicSlug}/${subtopicSlug}.js`;

  if (contentModules[expectedPath]) {
    try {
      const module = await contentModules[expectedPath]();
      const loaded = module.default;
      // Ensure loaded content has at least 21 questions if quiz exists
      if (loaded && loaded.quiz && loaded.quiz.length < 21) {
        const extraQuestions = generateDynamicQuiz(
          moduleSlug,
          topicSlug,
          subtopicSlug,
          formatTitle(subtopicSlug)
        );
        // Append additional questions up to 21
        const combined = [...loaded.quiz];
        for (const eq of extraQuestions) {
          if (combined.length >= 21) break;
          combined.push(eq);
        }
        loaded.quiz = combined;
      }
      return loaded;
    } catch (err) {
      console.error(`Error loading content from ${expectedPath}:`, err);
    }
  }

  // Generate rich comprehensive dynamic content with 21 MCQs
  return generateDynamicSubtopicContent(moduleSlug, topicSlug, subtopicSlug);
}
