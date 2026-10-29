export default {
  id: "react-forms",
  title: {
    en: "Controlled vs Uncontrolled Form Inputs",
    hi: "Controlled vs Uncontrolled Forms",
  },
  difficulty: "Beginner",
  readTime: 11,
  sections: [
    {
      type: "concept",
      heading: {
        en: "1. The Philosophy of Forms in React",
        hi: "1. React Mein Forms Ka Concept: Controlled vs Uncontrolled",
      },
      body: {
        en: `In standard HTML, form elements like \`<input>\`, \`<textarea>\`, and \`<select>\` maintain their own internal state in the browser DOM, updating based on user typing.

In React, you have two primary architectural approaches to handling user input:

### 1. Controlled Components (Recommended):
- The input's value is driven strictly by **React State** (\`value={name}\`).
- Every keystroke fires an \`onChange\` event handler that updates state.
- **Single Source of Truth**: React state is always 100% in sync with what the user sees on the screen.
- Enables instant real-time validation, character limits, dynamic disabling, and input masking.

### 2. Uncontrolled Components:
- The input retains its value inside the **native browser DOM**.
- You pull the value out on demand when the form is submitted, using a **\`useRef\`** or the native \`FormData\` API.
- Useful for simple forms or integrating with non-React third-party DOM libraries.
- Note: \`<input type="file" />\` is **always uncontrolled** because its value is read-only in browsers for security reasons!`,
        hi: `Normal HTML mein form elements (jaise \`<input>\`, \`<select>\`) apna data browser ke DOM ke andar khud store karke rakhte hain.

React mein inputs ko handle karne ke do alag tareeqe hote hain:

### 1. Controlled Components (Sabse Popular & Recommended):
- Input ki value **React State** se control hoti hai (\`value={text}\`).
- Har key press par \`onChange\` chalta hai jo state ko update karta hai.
- **Single Source of Truth**: React state aur screen par dikhne wala text hamesha 100% sync rehta hai.
- Real-time validation, character limit aur instant feedback ke liye best tareeka.

### 2. Uncontrolled Components:
- Input apni value **browser ke DOM** ke andar rakhta hai.
- Submit button dabane par aap **\`useRef\`** ya \`FormData\` se value nikalte hain.
- \`<input type="file" />\` hamesha **uncontrolled** hi hota hai kyunki security reasons se browser uski value ko read-only rakhta hai.`,
      },
    },
    {
      type: "concept",
      heading: {
        en: "2. The Uncontrolled-to-Controlled Transition Warning",
        hi: "2. Sabse Common React Warning: Uncontrolled to Controlled",
      },
      body: {
        en: `Every React developer encounters this classic console warning:
> *"A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value."*

### Why This Warning Happens:
If you initialize state with \`undefined\` (or leave it empty):
\`\`\`jsx
const [email, setEmail] = useState(); // email is undefined!

return <input value={email} onChange={e => setEmail(e.target.value)} />;
\`\`\`
1. On initial render, \`value={undefined}\`. React assumes this is an **uncontrolled** input.
2. The user types a character. \`setEmail("a")\` sets a string.
3. On the second render, \`value="a"\`. React suddenly sees a controlled input, and warns you about the inconsistent architecture!

### The Fix:
Always initialize string input state with an empty string:
\`\`\`javascript
const [email, setEmail] = useState(""); // ✅ Always initialized!
\`\`\``,
        hi: `React developers ko aksar console mein yeh warning milti hai:
> *"A component is changing an uncontrolled input to be controlled..."*

### Yeh Warning Kyun Aati Hai:
Agar aapne state ko \`undefined\` se initialize kiya:
\`\`\`jsx
const [email, setEmail] = useState(); // email undefined hai!
<input value={email} onChange={...} />
\`\`\`
1. Pehle render par \`value={undefined}\` dekh kar React ise **uncontrolled** samajhta hai.
2. User ke type karne par \`email\` string ban jata hai.
3. Agle render par \`value="a"\` dekh kar React confuse ho jata hai ki input uncontrolled se controlled kaise ban gaya!

### Solution:
Input state ko hamesha empty string (\`""\`) se initialize karein:
\`\`\`javascript
const [email, setEmail] = useState(""); // ✅ Ekdum safe
\`\`\``,
      },
    },
    {
      type: "analogy",
      heading: {
        en: "Real-Life Analogy: Fly-By-Wire Airplane Controls vs Mechanical Wire Bicycle",
        hi: "Real-Life Analogy: Modern Fighter Jet Ka Digital Control vs Desi Cycle Ka Wire Brake",
      },
      body: {
        en: `Consider how steering mechanisms operate:

- **Controlled Component (Fly-By-Wire Digital Jet Cockpit)**:
  - In a modern Airbus or Rafale jet, the pilot's joystick is not physically connected to the wing flaps with steel cables.
  - When the pilot moves the stick 2 cm, an electronic sensor reads the angle into the central Flight Control Computer (**state update via \`onChange\`**).
  - The computer validates safety limits (preventing stalls), and then commands the hydraulic motors to position the wing (**Controlled state reflects in UI**).
  - Absolute software control at every millisecond!
- **Uncontrolled Component (Desi Bicycle Brake Wire)**:
  - On a hero bicycle, the handlebar brake lever pulls a physical steel wire that clamps directly onto the wheel rim.
  - There is no central computer checking your speed. You only know whether the bike stopped when you pull the lever and physically inspect the wheel (**reading DOM via \`useRef\` on submit**) !`,
        hi: `Fighter Jet aur Cycle ke brake se samjhein:

- **Controlled Component (Modern Fighter Jet Ka Digital Computer)**:
  - Pilot ka joystick seedhe jet ke pankhon se lohe ke taar se nahi juda hota.
  - Pilot jaise hi joystick hilata hai, digital computer angle ko read karta hai (**\`onChange\` event**).
  - Computer check karta hai ki kya yeh speed safe hai, aur phir pankhe ko naye angle par move karta hai (**State drives the UI**).
  - Computer ke paas har millisecond par poora control rehta hai!
- **Uncontrolled Component (Cycle Ka Wire Brake)**:
  - Cycle ka break lever ek seedhe taar se rubber shoe ko pahiye se chipkata hai.
  - Koi computer beech mein nahi hota. Aapko kitna dabaya gaya yeh tabhi pata chalta hai jab aap cycle rok kar pahiya dekhte hain (**useRef se DOM padhna**)!`,
      },
    },
    {
      type: "syntax",
      heading: {
        en: "Syntax: Controlled vs Uncontrolled Setup",
        hi: "Syntax: Controlled Aur Uncontrolled Ka Code Structure",
      },
      body: {
        en: `### 1. Controlled Input Syntax:
\`\`\`jsx
const [text, setText] = useState("");

<input
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
\`\`\`

### 2. Uncontrolled Input with useRef:
\`\`\`jsx
const inputRef = useRef(null);

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Current value from DOM:", inputRef.current.value);
};

<input type="text" ref={inputRef} defaultValue="Default text" />
\`\`\`

### 3. Checkbox Syntax (Uses 'checked', NOT 'value'):
\`\`\`jsx
const [agreed, setAgreed] = useState(false);

<input
  type="checkbox"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)} // e.target.checked!
/>
\`\`\``,
        hi: `### 1. Controlled Input Syntax:
\`\`\`jsx
const [text, setText] = useState("");

<input
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
\`\`\`

### 2. Uncontrolled Input (useRef):
\`\`\`jsx
const inputRef = useRef(null);

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("DOM se value:", inputRef.current.value);
};

<input type="text" ref={inputRef} defaultValue="Aman" />
\`\`\`

### 3. Checkbox Syntax (checked property use hoti hai):
\`\`\`jsx
const [isSubscribed, setIsSubscribed] = useState(false);

<input
  type="checkbox"
  checked={isSubscribed}
  onChange={(e) => setIsSubscribed(e.target.checked)} // checked use karein
/>
\`\`\``,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 1: Controlled Form with Live Validation & Password Masking",
        hi: "Example 1: Live Validation Ke Sath Controlled Registration Form",
      },
      body: {
        en: `A complete controlled sign-up form with live password strength checking, error feedback, and disabled submit button when invalid.`,
        hi: `Real-time password validation, error messages aur dynamic submit button ke sath controlled form.`,
      },
      code: {
        language: "jsx",
        filename: "ControlledRegistrationForm.jsx",
        snippet: `import React, { useState } from "react";

export default function ControlledRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  // Unified change handler for text inputs & checkboxes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear error for field upon typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required.";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept terms.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert(\`Account created for: \${formData.fullName}\`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg max-w-md space-y-4"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Controlled Sign-Up
      </h2>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex gap-1 mt-1">
          <div className={\`h-1 flex-1 rounded \${formData.password.length >= 8 ? "bg-emerald-500" : "bg-slate-200"}\`} />
          <div className={\`h-1 flex-1 rounded \${formData.password.length >= 12 ? "bg-emerald-500" : "bg-slate-200"}\`} />
        </div>
        {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="h-4 w-4 rounded text-indigo-600"
        />
        <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400">
          I agree to the Terms of Service
        </label>
      </div>
      {errors.termsAccepted && <p className="text-xs text-rose-500">{errors.termsAccepted}</p>}

      <button
        type="submit"
        className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-sm"
      >
        Create Account
      </button>
    </form>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 2: Uncontrolled Form with FormData API & useRef",
        hi: "Example 2: FormData API Aur useRef Se Uncontrolled Form",
      },
      body: {
        en: `Using \`useRef\` and the native browser \`FormData\` object to extract form fields without re-rendering the component on every single keystroke.`,
        hi: `Bina har keystroke par re-render kiye \`useRef\` aur \`FormData\` se form values extract karna.`,
      },
      code: {
        language: "jsx",
        filename: "UncontrolledFeedbackForm.jsx",
        snippet: `import React, { useRef } from "react";

export default function UncontrolledFeedbackForm() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Native FormData extracts all input fields using their 'name' attribute
    const formData = new FormData(formRef.current);
    const feedbackData = {
      username: formData.get("username"),
      category: formData.get("category"),
      comments: formData.get("comments")
    };

    console.log("Uncontrolled Form Submitted:", feedbackData);
    alert(\`Feedback submitted for \${feedbackData.username} in \${feedbackData.category}\`);
    formRef.current.reset(); // Reset form via native DOM method
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md max-w-md space-y-4"
    >
      <h3 className="font-bold text-slate-900 dark:text-white">
        Uncontrolled Feedback Form
      </h3>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Name
        </label>
        <input
          type="text"
          name="username"
          defaultValue="Anonymous Learner"
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Feedback Category
        </label>
        <select
          name="category"
          defaultValue="content_quality"
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white"
        >
          <option value="content_quality">Content Depth & Quality</option>
          <option value="ui_ux">UI & Dark Mode Theme</option>
          <option value="bug_report">Bug Report</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Comments
        </label>
        <textarea
          name="comments"
          rows={3}
          placeholder="Share your thoughts..."
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-white resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition"
      >
        Submit Feedback
      </button>
    </form>
  );
}`,
      },
    },
    {
      type: "example",
      heading: {
        en: "Example 3: Uncontrolled File Upload Input with useRef",
        hi: "Example 3: File Upload Input (<input type='file' />) Ka Sahi Pattern",
      },
      body: {
        en: `Handling file selection with \`<input type="file" />\`. Because browser security prohibits setting the \`value\` of a file input, it is inherently uncontrolled and managed via \`useRef\`.`,
        hi: `File upload input ko \`useRef\` se handle karna kyunki browser security file input ki value programmatically set karne nahi deti.`,
      },
      code: {
        language: "jsx",
        filename: "AvatarUploadField.jsx",
        snippet: `import React, { useRef, useState } from "react";

export default function AvatarUploadField() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create local temporary URL for instant preview
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    // Resetting uncontrolled native DOM file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm space-y-4 text-center">
      <h3 className="font-bold text-slate-900 dark:text-white">Profile Photo</h3>

      <div className="flex justify-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-500 shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-2xl font-bold">
            👤
          </div>
        )}
      </div>

      {/* File input is ALWAYS uncontrolled! */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
      />

      {selectedFile && (
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="truncate max-w-[180px]">{selectedFile.name}</span>
          <button onClick={handleClear} className="text-rose-500 font-bold">
            Remove
          </button>
        </div>
      )}
    </div>
  );
}`,
      },
    },
    {
      type: "mistakes",
      heading: {
        en: "Common Mistakes & How to Fix Them",
        hi: "Aam Galatiyan Aur Unka Solution",
      },
      body: {
        en: `### 1. Initializing Controlled State with \`undefined\`
- **Mistake**: Writing \`const [name, setName] = useState(); <input value={name} />\`. React triggers the *"changing uncontrolled input to be controlled"* warning!
- **Fix**: Always initialize with an empty string: \`useState("")\`.

### 2. Using \`e.target.value\` on Checkboxes
- **Mistake**: Writing \`<input type="checkbox" onChange={e => setCheck(e.target.value)} />\`. In HTML, \`e.target.value\` of a checkbox is always the string \`"on"\`, regardless of whether it is checked or unchecked!
- **Fix**: Use \`e.target.checked\` which evaluates to a boolean (\`true\` or \`false\`).

### 3. Attempting to Make File Inputs Controlled
- **Mistake**: Writing \`<input type="file" value={myFile} />\`. Browsers disallow programmatic setting of file input values for security reasons. React throws a fatal DOM error.
- **Fix**: File inputs are always uncontrolled. Read \`e.target.files[0]\` and control only the preview state.`,
        hi: `### 1. State Ko \`undefined\` Se Shuru Karna
- **Galati**: \`useState()\` khali chhod dena. Isse uncontrolled to controlled ki warning aati hai.
- **Solution**: Hamesha empty string \`useState("")\` se shuru karein.

### 2. Checkbox Par \`e.target.value\` Lagana
- **Galati**: Checkbox par \`e.target.value\` read karna. Checkbox ka value hamesha \`"on"\` string hota hai!
- **Solution**: Checkbox ke liye boolean property \`e.target.checked\` use karein.

### 3. File Input Ko Controlled Banane Ki Koshish Karna
- **Galati**: \`<input type="file" value={file} />\` likhna. Security ke kaaran browser file input ki value set nahi karne deta.
- **Solution**: File input hamesha uncontrolled hota hai. \`e.target.files[0]\` se file padhein.`,
      },
    },
    {
      type: "tip",
      heading: {
        en: "Best Practices: Form Architecture",
        hi: "Form Architecture Ke Best Practices",
      },
      body: {
        en: `1. **Prefer Controlled Components for UI Interactivity**: When inputs require immediate feedback, dynamic disabling, or input formatting (e.g. credit card number spacing), controlled inputs are unmatched.
2. **Use Single Unified Change Handler for Simple Forms**: Name inputs according to schema keys and use \`[e.target.name]: e.target.value\` to avoid writing 10 separate handler functions.
3. **Use FormData for Large Uncontrolled Forms**: When you only care about values at the exact moment of form submission, \`new FormData(e.currentTarget)\` avoids unnecessary re-renders.
4. **Use Form Libraries for Massive Enterprise Forms**: For complex enterprise forms with 30+ fields and dynamic schemas, consider **React Hook Form** or **Formik** with **Zod** validation.`,
        hi: `1. **Real-time Validation Ke Liye Controlled Use Karein**: Instant feedback aur dynamic button disable ke liye controlled inputs sabse best hain.
2. **Unified Change Handler Ka Use Karein**: 10 alag functions likhne ke bajaye \`[e.target.name]: e.target.value\` ka use karein.
3. **Bade Forms Ke Liye FormData**: Agar har keystroke par re-render nahi chahiye, toh submit par \`new FormData()\` use karein.
4. **Enterprise Apps Ke Liye React Hook Form**: 30+ fields wale complex forms ke liye React Hook Form aur Zod ka combination use karein.`,
      },
    },
    {
      type: "interview",
      heading: {
        en: "Top Interview Questions & Answers",
        hi: "Top Interview Sawaal Aur Jawab",
      },
      body: {
        en: `### Q1: What is the core difference between a Controlled and an Uncontrolled component in React?
**Answer**:
- **Controlled Component**: Form input state is handled by the React component via \`useState\`. The input element's value is bound to \`value={state}\` and changes via \`onChange\`. React state serves as the single source of truth.
- **Uncontrolled Component**: Form input state is maintained by the browser DOM itself. Values are queried on-demand using \`useRef\` or \`new FormData(formElement)\`.

### Q2: Why is <input type="file" /> inherently uncontrolled in React?
**Answer**:
Browser security specifications mandate that a file input's value can only be set by a human user interacting directly with their operating system's native file picker dialog. JavaScript cannot programmatically inject or modify the \`value\` attribute of a file input. Therefore, in React, file inputs must be uncontrolled, accessed via \`useRef\` or \`e.target.files\`.

### Q3: What causes the warning: "A component is changing an uncontrolled input to be controlled"?
**Answer**:
This warning occurs when an input's \`value\` prop starts as \`undefined\` or \`null\` on initial render (making React treat it as uncontrolled), and then updates to a defined string or number during a subsequent render (making React switch it to controlled). To avoid this, always initialize input state with an empty string: \`useState("")\`.`,
        hi: `### Q1: Controlled aur Uncontrolled component mein kya mukhya antar hai?
**Jawab**:
- **Controlled**: Input ki value React State se chalti hai (\`value={state}\`). React Single Source of Truth hota hai.
- **Uncontrolled**: Input ki value browser DOM mein rehti hai aur submit par \`useRef\` ya \`FormData\` se nikali jaati hai.

### Q2: \`<input type="file" />\` hamesha uncontrolled kyun hota hai?
**Jawab**:
Browser security niyam ke anusar koi bhi program kisi user ki hard drive se file zabardasti select nahi kar sakta. File sirf user khud dialog khol kar choose kar sakta hai. Isliye file input ki value read-only hoti hai aur yeh hamesha uncontrolled hota hai.

### Q3: "Changing an uncontrolled input to be controlled" warning kyun aati hai?
**Jawab**:
Jab input ka initial value \`undefined\` hota hai aur user ke type karne par state string ban jaati hai, toh React uncontrolled se controlled switch hone par yeh warning deta hai. Bachne ke liye hamesha \`useState("")\` empty string se initialize karein.`,
      },
    },
    {
      type: "summary",
      heading: {
        en: "Quick Summary: Controlled vs Uncontrolled",
        hi: "Quick Summary: Controlled vs Uncontrolled",
      },
      body: {
        en: `- **Controlled**: Driven by React state; provides Single Source of Truth for real-time validation.
- **Uncontrolled**: Driven by browser DOM; accessed via \`useRef\` or \`new FormData()\`.
- **Checkboxes**: Use \`checked={val}\` and \`e.target.checked\` (not \`e.target.value\`).
- **File Inputs**: Always uncontrolled by browser security design.
- **Avoid Warnings**: Always initialize input state with empty string (\`""\`), never \`undefined\`.`,
        hi: `- **Controlled**: React state se chalta hai; real-time validation ke liye best.
- **Uncontrolled**: Browser DOM se chalta hai; \`useRef\` se value li jaati hai.
- **Checkboxes**: \`checked={val}\` aur \`e.target.checked\` use karein.
- **File Inputs**: Hamesha uncontrolled hote hain.
- **Warning Prevention**: State ko hamesha empty string (\`""\`) se shuru karein.`,
      },
    },
  ],
  quiz: [
  {
    "q": {
      "en": "Why is <input type=\"file\" /> always an uncontrolled input in React?",
      "hi": "<input type=\"file\" /> React mein hamesha uncontrolled kyun hota hai?"
    },
    "options": [
      {
        "en": "React does not have file parsing libraries",
        "hi": "React mein libraries nahi hain"
      },
      {
        "en": "Browser security specifications mandate that file input values are read-only and can only be set by direct user action",
        "hi": "Browser security niyam ke mutabiq file input ki value read-only hoti hai aur sirf user action se set ho sakti hai"
      },
      {
        "en": "File inputs require Node.js child_process",
        "hi": "child_process chahiye hota hai"
      },
      {
        "en": "Files are rendered as SVGs",
        "hi": "Files SVG ban jaati hain"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "For security, web browsers forbid JavaScript from programmatically setting file input values, making it impossible to control via value={file}.",
      "hi": "Browser security JS ko file path programmatically set karne nahi deti, isliye ise value={file} se control nahi kiya ja sakta."
    }
  },
  {
    "q": {
      "en": "Which property on the event target should you inspect when handling a checkbox change in a controlled input?",
      "hi": "Controlled checkbox handle karte waqt e.target ki kaunsi property inspect karni chahiye?"
    },
    "options": [
      {
        "en": "e.target.value",
        "hi": "e.target.value"
      },
      {
        "en": "e.target.checked",
        "hi": "e.target.checked"
      },
      {
        "en": "e.target.selected",
        "hi": "e.target.selected"
      },
      {
        "en": "e.target.isActive",
        "hi": "e.target.isActive"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Checkboxes toggle boolean state via e.target.checked. e.target.value is always the static string 'on' in HTML.",
      "hi": "Checkbox boolean toggle ke liye e.target.checked use karta hai. e.target.value hamesha 'on' string deta hai."
    }
  },
  {
    "q": {
      "en": "How do you prevent the console warning: 'A component is changing an uncontrolled input to be controlled'?",
      "hi": "'Changing an uncontrolled input to be controlled' warning se bachne ka sahi tareeka kya hai?"
    },
    "options": [
      {
        "en": "Disable console.warn in production",
        "hi": "console.warn disable kar dein"
      },
      {
        "en": "Initialize state with an empty string (useState('')) rather than undefined",
        "hi": "State ko undefined ke bajaye empty string (useState('')) se initialize karein"
      },
      {
        "en": "Use jQuery instead of React",
        "hi": "jQuery use karein"
      },
      {
        "en": "Remove the onChange handler completely",
        "hi": "onChange hata dein"
      }
    ],
    "answerIndex": 1,
    "explanation": {
      "en": "Initializing state with undefined makes React treat the input as uncontrolled on the initial render. Using '' ensures it is controlled from the start.",
      "hi": "undefined value dekh kar React shuru mein uncontrolled maan leta hai. Empty string '' shuru se hi use controlled banaye rakhta hai."
    }
  },
  {
    "question": {
      "en": "What is the core architectural purpose of Controlled vs Uncontrolled Form Inputs in the modern full-stack MERN ecosystem?",
      "hi": "Modern full-stack MERN ecosystem mein Controlled vs Uncontrolled Forms ka mukhya architectural maksad kya hota hai?"
    },
    "options": [
      {
        "en": "It manages physical computer cooling and power supply",
        "hi": "Ye physical computer cooling aur power supply manage karta hai"
      },
      {
        "en": "It provides structured, robust, and scalable patterns for handling controlled vs uncontrolled form inputs with high performance and maintainability",
        "hi": "Ye high performance aur maintainability ke saath Controlled vs Uncontrolled Forms ko handle karne ka structured aur scalable pattern provide karta hai"
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
      "en": "Controlled vs Uncontrolled Form Inputs establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",
      "hi": "Controlled vs Uncontrolled Forms clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."
    }
  },
  {
    "question": {
      "en": "What critical development bottleneck or anti-pattern does Controlled vs Uncontrolled Form Inputs directly resolve?",
      "hi": "Controlled vs Uncontrolled Forms kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"
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
      "en": "Without Controlled vs Uncontrolled Form Inputs, applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",
      "hi": "Controlled vs Uncontrolled Forms ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."
    }
  },
  {
    "question": {
      "en": "When reasoning about Controlled vs Uncontrolled Form Inputs, how is its mental model best conceptualized through real-world analogies?",
      "hi": "Controlled vs Uncontrolled Forms ko real-world analogies ke zariye kaise best samjha ja sakta hai?"
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
      "en": "When declaring and implementing Controlled vs Uncontrolled Form Inputs, what syntactic convention is essential to prevent runtime errors?",
      "hi": "Controlled vs Uncontrolled Forms ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"
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
      "en": "What is a common pitfall developers encounter when working with Controlled vs Uncontrolled Form Inputs?",
      "hi": "Controlled vs Uncontrolled Forms ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"
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
      "en": "According to production best practices, how should Controlled vs Uncontrolled Form Inputs be architected for enterprise-grade stability?",
      "hi": "Production best practices ke mutabiq enterprise-grade stability ke liye Controlled vs Uncontrolled Forms ko kaise architect karna chahiye?"
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
      "en": "How does proper optimization of Controlled vs Uncontrolled Form Inputs impact application memory and CPU consumption?",
      "hi": "Controlled vs Uncontrolled Forms ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"
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
      "en": "What security principle is non-negotiable when handling data within Controlled vs Uncontrolled Form Inputs?",
      "hi": "Controlled vs Uncontrolled Forms mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"
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
      "en": "How does asynchronous non-blocking execution operate in Controlled vs Uncontrolled Form Inputs?",
      "hi": "Controlled vs Uncontrolled Forms mein asynchronous non-blocking execution kaise kaam karta hai?"
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
      "en": "What is the recommended pattern for propagating errors that occur in Controlled vs Uncontrolled Form Inputs?",
      "hi": "Controlled vs Uncontrolled Forms mein error aane par unhe propagate karne ka recommended pattern kya hai?"
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
      "en": "When authoring unit or integration tests for Controlled vs Uncontrolled Form Inputs, what must the test suite assert?",
      "hi": "Controlled vs Uncontrolled Forms ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"
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
      "en": "How does modular design enhance code maintainability in Controlled vs Uncontrolled Form Inputs?",
      "hi": "Modular design Controlled vs Uncontrolled Forms mein code maintainability ko kaise badhata hai?"
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
      "en": "When application traffic scales 100x, how should Controlled vs Uncontrolled Form Inputs be architected to support horizontal scaling?",
      "hi": "Traffic 100x badhne par Controlled vs Uncontrolled Forms ko horizontally scale karne ke liye kya design approach honi chahiye?"
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
      "en": "In the full-stack MERN paradigm, where does Controlled vs Uncontrolled Form Inputs properly belong and execute?",
      "hi": "Full-stack MERN architecture mein Controlled vs Uncontrolled Forms kahan belong karta hai aur kahan execute hota hai?"
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
      "en": "What telemetry metric or observability signal is most crucial for diagnosing issues with Controlled vs Uncontrolled Form Inputs in production?",
      "hi": "Production mein Controlled vs Uncontrolled Forms ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"
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
      "en": "Why is eliminating unintended side effects essential when authoring logic for Controlled vs Uncontrolled Form Inputs?",
      "hi": "Controlled vs Uncontrolled Forms ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"
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
      "en": "How should client-side state be kept in sync with backend server mutations in Controlled vs Uncontrolled Form Inputs?",
      "hi": "Controlled vs Uncontrolled Forms mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"
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
      "en": "Why is thorough resource cleanup (clearing timers, closing sockets, aborting in-flight requests) critical in Controlled vs Uncontrolled Form Inputs?",
      "hi": "Controlled vs Uncontrolled Forms mein resource cleanup (timers clear karna, sockets band karna, network abort karna) kyun zaroori hai?"
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
