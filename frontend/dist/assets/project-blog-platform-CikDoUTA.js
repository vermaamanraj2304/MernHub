const e={id:"proj-blog-platform",title:{en:"Project 2: Dev Blog & Publishing Platform (Auth + Images)",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer)"},difficulty:"Intermediate",readTime:16,sections:[{type:"concept",heading:{en:"1. System Architecture: Building a Medium / Dev.to Clone",hi:"1. System Architecture: Dev.to / Medium Jaisa Platform Banana"},body:{en:`A publishing platform is the ultimate test of an intermediate full-stack engineer. Unlike a simple Todo app, a Developer Blog platform requires integrating multiple complex subsystems:

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    REACT CLIENT (Vite + Tailwind)               │
│  - Live Split-Pane Markdown Editor & Reader                     │
│  - Image Drag-and-Drop file picker (Cover Banners)              │
│  - Nested Author Profiles & Dynamic Routing (/blog/:slug)       │
│  - Comment Section with Real-Time Avatar Badges                 │
└───────────────────────────────┬─────────────────────────────────┘
                                │ JWT Authorized Requests (Multipart Form Data)
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS REST API BACKEND                     │
│  - Multer middleware intercepting binary image files            │
│  - Streaming directly to Cloudinary CDN (No local disk storage) │
│  - Automatic SEO slug generation (slugify + nanoid)             │
│  - Server-side reading time computation                         │
│  - Strict Author Ownership Authorization Checks                 │
└───────────────────────────────┬─────────────────────────────────┘
                                │ Mongoose Population
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                             │
│  - Users Collection (Hashed passwords, avatars)                 │
│  - Posts Collection (Slug unique index, tags, bannerUrl)        │
│  - Comments Collection (Referencing Post ID & Author ID)        │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Key Architectural Challenges:
1. **Handling Binary Image Uploads**: Bypassing server disk storage by streaming image files directly to Cloudinary.
2. **SEO-Friendly URL Slugs**: Generating clean URLs (\`/blog/mastering-react-hooks-a8f1\`) instead of exposing raw MongoDB ObjectIds (\`/blog/64f89b12a\`).
3. **Preventing Cross-Site Scripting (XSS)**: Sanitizing user-submitted Markdown before rendering it to readers.
4. **Author Ownership Authorization**: Ensuring only the author of a blog post or an admin can edit or delete it.`,hi:`Ek developer publishing platform (jaise Dev.to ya Medium) banana ek intermediate MERN engineer ke liye sabse behtareen portfolio project hota hai. Isme kayi real-world concepts judte hain:

- **React Client**: Live Split-Screen Markdown editor, cover photo upload, dynamic slug URLs (\`/blog/:slug\`), aur comments system.
- **Express Backend**: Multer se image file pakad kar direct Cloudinary CDN par bhejna, SEO friendly unique slugs banana, aur reading time calculate karna.
- **MongoDB**: Users, Posts aur Comments collections jisme Mongoose \`.populate()\` se author ka naam aur photo jodi jaati hai.
- **Security**: XSS attacks se bachne ke liye Markdown sanitize karna aur Author ownership verify karna taaki koi doosre ka blog delete na kar sake.`}},{type:"concept",heading:{en:"2. Data Modeling & Relational Schema Architecture",hi:"2. Data Modeling: Posts, Users Aur Comments Ka Relation"},body:{en:`Our blog platform structures relationships across three distinct collections using Mongoose referencing:

\`\`\`
  [ User ] 1 ───────◄ Many [ Post ]
     │                        │
     │ 1                      │ 1
     │                        │
     ▼ Many                   ▼ Many
              [ Comment ]
\`\`\`

### 1. The Post Schema Design (\`models/Post.js\`):
\`\`\`javascript
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
    },
    bannerUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tags: [{ type: String, lowercase: true, trim: true }],
    readingTime: {
      type: Number, // Estimated reading time in minutes
      default: 1,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate reading time (assuming 200 words per minute average)
postSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    const wordCount = this.content.trim().split(/\\s+/).length;
    this.readingTime = Math.ceil(wordCount / 200);
  }
  next();
});

export default mongoose.model('Post', postSchema);
\`\`\`

### 2. The Comment Schema Design (\`models/Comment.js\`):
\`\`\`javascript
const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Comment content cannot be blank'],
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);
\`\`\``,hi:"Hamari application mein 3 collections aapas mein jude hote hain:\n\n### 1. `Post` Schema:\n- **`title`**: Article ka headline.\n- **`slug`**: SEO friendly unique URL (jaise `mern-stack-guide-89af`) jisme unique index hota hai.\n- **`content`**: Markdown format mein likha gaya poora article.\n- **`bannerUrl`**: Cloudinary par uploaded cover image ka HTTPS URL.\n- **`author`**: User collection ka ObjectId reference.\n- **`readingTime`**: Pre-save hook dwara auto-calculated padhne ka samay (words divided by 200).\n\n### 2. `Comment` Schema:\n- **`post`**: Kis post par comment hua hai (Post ObjectId).\n- **`author`**: Kisne comment kiya hai (User ObjectId).\n- **`content`**: Comment ka text."}},{type:"analogy",heading:{en:"Real-Life Analogy: The National Daily Newspaper Publishing House",hi:"Real-Life Analogy: Akhbar (Newspaper) Publishing House"},body:{en:`Imagine the daily operations at the editorial headquarters of The Times of India:

- **The Journalist (The Authenticated Author)**:
  A journalist writes an investigative article on modern cloud computing (**Markdown content**). He submits his press badge (**JWT Authentication token**) before entering the newsroom.
- **The Photojournalist & Cloud Archive (Multer & Cloudinary)**:
  The journalist hands over a camera memory card with a high-resolution front-page photograph.
  The photo editor does NOT print the photo on ordinary printer paper and stuff it in his personal desk drawer (**local server disk storage**). Instead, he uploads the master RAW file into the central high-speed digital wire photo archive (**Cloudinary CDN**), stamping a secure digital retrieval ID onto the article ticket (**\`bannerUrl\`**).
- **The Chief Editor (Slugify & Reading Time Calculator)**:
  The chief editor reads the article, counts the words, and places a small badge at the top: *"5 Min Read"*. He formats the headline into a standardized filing barcode so archive librarians can find it instantly (**Unique Slug Generation**).
- **Letters to the Editor (The Comment Section)**:
  Readers send in opinion letters. The editorial team clips each reader's letter directly to the bottom of the published story (**Referenced Comments populated by User ID**).`,hi:`Ek mashhoor akhbar ke office ka example dekhein:

- **Journalist (Author)**:
  Patrakar apna article type karta hai (**Markdown content**). Gate par wo apna press identity card dikhata hai (**JWT Token**).
- **Photo Editor (Multer & Cloudinary)**:
  Photographer aakar photo deta hai. Desk editor photo ko apne office ki table ki daraz mein nahi rakhta (local disk nahi), balki central digital photo cloud par upload kar deta hai (**Cloudinary CDN**) aur link article ke sath chipka deta hai (**\`bannerUrl\`**).
- **Chief Editor (Slug & Reading Time)**:
  Editor words count karke upar badge lagata hai: *"5 Min Read"*. Wo headline ko ek clean code deta hai taaki newspaper ke archive mein aasaani se dhoondha ja sake (**Unique Slug**).
- **Pathakon Ki Rai (Comments Section)**:
  Akhbar chhapne ke baad log apni rai bhejte hain jo article ke theek neeche unke naam aur photo ke sath dikhayi jaati hai (**Populated Comments**).`}},{type:"syntax",heading:{en:"Multer & Cloudinary Integration Syntax",hi:"Multer Aur Cloudinary Ko Connect Karne Ka Syntax"},body:{en:`To handle multipart/form-data image uploads without storing files locally, we pair **Multer** with **\`multer-storage-cloudinary\`**:

\`\`\`bash
npm install multer cloudinary multer-storage-cloudinary slugify
\`\`\`

### Middleware Configuration (\`middleware/upload.js\`):
\`\`\`javascript
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// 1. Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Set up Cloudinary streaming storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mern_blog_banners',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1200, height: 630, crop: 'limit', quality: 'auto' }],
  },
});

// 3. File filter to reject non-image uploads
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WEBP) are allowed!'), false);
  }
};

export const uploadBanner = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
});
\`\`\``,hi:`Server par photos save kiye bina seedha Cloudinary par upload karne ke liye Multer storage setup:

\`\`\`javascript
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Direct Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mern_blog_banners',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

export const uploadBanner = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});
\`\`\``}},{type:"example",heading:{en:"Example 1: Backend Post Controller with Auto-Slug & Author Verification",hi:"Example 1: Backend Post Controller (Auto-Slug, Cloudinary Aur Auth Check)"},body:{en:`Here is the production \`postController.js\` implementing post creation with image uploads, collision-resistant slug generation, and authorization checks:

\`\`\`javascript
// server/controllers/postController.js
import Post from '../models/Post.js';
import slugify from 'slugify';
import crypto from 'crypto';

// 1. POST /api/posts (Create Blog Article)
export const createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    // Generate collision-resistant unique slug: "my-first-post-a8f12c"
    const randomSuffix = crypto.randomBytes(3).toString('hex');
    const baseSlug = slugify(title, { lower: true, strict: true });
    const slug = \`\${baseSlug}-\${randomSuffix}\`;

    // Multer-Cloudinary populates req.file.path with the secure HTTPS Cloudinary URL!
    const bannerUrl = req.file
      ? req.file.path
      : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643';

    const parsedTags = tags
      ? (typeof tags === 'string' ? tags.split(',') : tags).map((t) => t.trim().toLowerCase())
      : [];

    const newPost = await Post.create({
      title,
      slug,
      content,
      bannerUrl,
      author: req.user.id, // Injected by authMiddleware from JWT
      tags: parsedTags,
    });

    return res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    next(error);
  }
};

// 2. GET /api/posts/:slug (Fetch Single Post by Slug with Author details)
export const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOne({ slug })
      .populate('author', 'name email avatar bio')
      .lean();

    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// 3. DELETE /api/posts/:id (Strict Author Ownership Check!)
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // CRITICAL SECURITY: Only the author or an admin can delete!
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You are not authorized to delete another author article',
      });
    }

    await post.deleteOne();
    return res.status(200).json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    next(error);
  }
};
\`\`\``,hi:`Complete \`postController.js\` jisme unique slug generation, Cloudinary image link, aur author ownership verification shamil hai:

\`\`\`javascript
// server/controllers/postController.js
import Post from '../models/Post.js';
import slugify from 'slugify';
import crypto from 'crypto';

// Naya blog article banayein
export const createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    // Collision-safe slug: "react-guide-3f8a12"
    const randomHash = crypto.randomBytes(3).toString('hex');
    const slug = \`\${slugify(title, { lower: true, strict: true })}-\${randomHash}\`;

    // Cloudinary URL req.file.path se milta hai
    const bannerUrl = req.file ? req.file.path : 'https://images.unsplash.com/default.jpg';

    const post = await Post.create({
      title,
      slug,
      content,
      bannerUrl,
      author: req.user.id, // JWT se
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
    });

    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Slug se post laayein aur author details populate karein
export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar bio');

    if (!post) return res.status(404).json({ success: false, message: 'Post nahi mila' });
    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Post delete karein (Security: Sirf author delete kar sakta hai!)
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post nahi mila' });

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Aap doosre ka post delete nahi kar sakte!' });
    }

    await post.deleteOne();
    return res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
};
\`\`\``}},{type:"example",heading:{en:"Example 2: Backend Comment Controller with Nested Population",hi:"Example 2: Comment Controller (Post Par Comment Karna Aur Author Populate Karna)"},body:{en:`Handling user discussions under articles with Mongoose population for author names and avatars:

\`\`\`javascript
// server/controllers/commentController.js
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// 1. GET /api/posts/:postId/comments (Fetch all comments for a post)
export const getCommentsForPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate('author', 'name avatar bio')
      .sort('-createdAt')
      .lean();

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// 2. POST /api/posts/:postId/comments (Add comment to post)
export const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const postExists = await Post.exists({ _id: postId });
    if (!postExists) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    const newComment = await Comment.create({
      post: postId,
      author: req.user.id,
      content: content.trim(),
    });

    // Populate author details on the created comment before returning
    await newComment.populate('author', 'name avatar');

    return res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    next(error);
  }
};
\`\`\``,hi:`Kisi blog post par comments fetch karne aur naya comment post karne ka controller:

\`\`\`javascript
// server/controllers/commentController.js
import Comment from '../models/Comment.js';

// Post ke saare comments fetch karein
export const getCommentsForPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name avatar')
      .sort('-createdAt')
      .lean();

    return res.status(200).json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

// Naya comment karein
export const addComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      post: req.params.postId,
      author: req.user.id,
      content: req.body.content.trim(),
    });

    await comment.populate('author', 'name avatar');
    return res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};
\`\`\``}},{type:"example",heading:{en:"Example 3: React Blog Reader & Live Split-Screen Markdown Editor",hi:"Example 3: React Blog Reader Aur Live Split-Screen Markdown Editor"},body:{en:`This React component features a split-pane live editor where authors can write Markdown on the left and see real-time formatted previews on the right, secured with DOMPurify:

\`\`\`jsx
// client/src/pages/BlogEditor.jsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, Eye, Edit3, Send, Clock } from 'lucide-react';

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('# Introduction\\n\\nWrite your markdown story here...');
  const [tags, setTags] = useState('react, node, webdev');
  const [bannerFile, setBannerFile] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'preview'
  const navigate = useNavigate();

  const wordCount = content.trim().split(/\\s+/).filter(Boolean).length;
  const estimatedReadingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert('Title and content are required!');

    setIsPublishing(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    if (bannerFile) {
      formData.append('banner', bannerFile);
    }

    try {
      const res = await axios.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate(\`/blog/\${res.data.data.slug}\`);
    } catch (err) {
      alert(err.response?.data?.message || 'Publishing failed');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
      <div className="flex justify-between items-center border-b pb-4 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create New Article</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> ~{estimatedReadingTime} min read
          </span>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm flex items-center gap-2 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Article Headline / Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-3xl font-extrabold bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400"
      />

      {/* Cover Image Uploader */}
      <div className="flex items-center gap-4">
        <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2 transition">
          <Upload className="w-4 h-4" /> {bannerFile ? bannerFile.name : 'Upload Banner Image'}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBannerFile(e.target.files[0])}
            className="hidden"
          />
        </label>
        <input
          type="text"
          placeholder="Tags (comma separated)..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="flex-1 text-xs bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-lg px-3 py-2 outline-none text-slate-800 dark:text-white"
        />
      </div>

      {/* Live Split-Screen Editor & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
        {/* Left Pane: Markdown Source */}
        <div className="flex flex-col">
          <div className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1">
            <Edit3 className="w-3.5 h-3.5" /> Markdown Source
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-sm outline-none resize-none text-slate-800 dark:text-slate-200 leading-relaxed"
          />
        </div>

        {/* Right Pane: Live Formatted Preview */}
        <div className="flex flex-col">
          <div className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Live Rendered Preview
          </div>
          <div className="w-full flex-1 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-y-auto prose dark:prose-invert max-w-none text-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
\`\`\``,hi:`React mein Split-Screen Markdown editor component jisme left side par author likhta hai aur right side par live preview render hota hai:

\`\`\`jsx
// client/src/pages/BlogEditor.jsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';

export default function BlogEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('# My Article\\n\\nYahan likhein...');
  const [banner, setBanner] = useState(null);

  const handlePublish = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (banner) formData.append('banner', banner);

    await axios.post('/api/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    alert('Blog article publish ho gaya!');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Article Ka Title..."
        className="w-full text-2xl font-bold p-2 border-b dark:bg-slate-800 dark:text-white"
      />
      <input type="file" onChange={(e) => setBanner(e.target.files[0])} />

      {/* Split Screen */}
      <div className="grid grid-cols-2 gap-4 h-96">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-4 font-mono text-sm border rounded-xl dark:bg-slate-900 dark:text-white"
        />
        <div className="p-4 border rounded-xl overflow-y-auto dark:bg-slate-800 prose dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
      <button onClick={handlePublish} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
        Publish Article
      </button>
    </div>
  );
}
\`\`\``}},{type:"mistakes",heading:{en:"Common Mistakes and How to Avoid Them",hi:"Aam Galtiyan Aur Unka Sahi Solution"},body:{en:"### 1. Generating Naive Slugs Without Random Suffixes (Collision Crash)\n- **Mistake**: Writing `slug = slugify(title)`.\n- **Why it breaks**: If Author A creates \"How to Learn React\", the slug is `how-to-learn-react`. When Author B writes another article titled \"How to Learn React\", MongoDB throws a fatal `E11000 duplicate key error collection: posts index: slug_1`!\n- **Fix**: Always append a short unique hash: `${slugify(title)}-${crypto.randomBytes(3).toString('hex')}`.\n\n### 2. Missing Ownership Checks on Mutations\n- **Mistake**: Implementing `router.delete('/posts/:id', authMiddleware, deletePost)` and running `await Post.findByIdAndDelete(req.params.id)` without checking `post.author === req.user.id`.\n- **Consequence**: Any registered user can send a cURL request with their JWT and delete any other author's blog posts across the entire platform!\n- **Fix**: Always verify `if (post.author.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403)`.\n\n### 3. Rendering Raw User Markdown with dangerouslySetInnerHTML\n- **Mistake**: Converting Markdown to HTML and rendering with `dangerouslySetInnerHTML={{ __html: html }}` without DOMPurify.\n- **Consequence**: An attacker writes `[click me](javascript:stealTokens())` or inserts an inline `<script>` tag in their article, stealing cookies from every user who reads it (Stored XSS).\n- **Fix**: Use `react-markdown` which escapes dangerous raw HTML by default, or sanitize with DOMPurify.",hi:`### 1. Simple Slugs Banana (Duplicate Error Crash)
- **Galti**: Sirf \`slugify(title)\` likhna.
- **Nuksan**: Agar do authors ne same headline ("React Tutorial") rakhi, toh MongoDB duplicate key error se crash ho jayega.
- **Solution**: Slug ke aage 4-character ka unique random hash lagayein: \`react-tutorial-a89f\`.

### 2. Delete Route Par Author Check Na Karna
- **Galti**: Check kiye bina kisi bhi logged-in user ko post delete karne dena.
- **Nuksan**: Koi bhi user doosre author ka likha hua blog delete kar sakta hai!
- **Solution**: Hamesha check karein: \`post.author.toString() === req.user.id\`.

### 3. Markdown Ko Bina Sanitize Kiye Render Karna
- **Galti**: User ke markdown ko bina saaf kiye \`dangerouslySetInnerHTML\` se screen par dikhana.
- **Nuksan**: Hacker article ke andar malicious \`<script>\` tag daal kar doosre readers ka password chura lega (Stored XSS Attack).
- **Solution**: Hamesha \`react-markdown\` ya **DOMPurify** use karein.`}},{type:"tip",heading:{en:"Production Best Practices",hi:"Production Best Practices & Pro Tips"},body:{en:"1. **Precompute Reading Time on the Server**:\n   Never calculate reading time dynamically on every client render. Calculate it in a Mongoose `pre('save')` hook (`Math.ceil(wordCount / 200)`) and store it as a number in the document.\n2. **Use Compound Index on `{ author: 1, createdAt: -1 }`**:\n   Author profile pages display all posts by a specific user ordered by newest first. A compound index allows this query to return instantly without sorting in memory.\n3. **Limit Image Upload Dimensions via Cloudinary Transformations**:\n   Don't store unoptimized 12MB raw photos on your CDN. In your `CloudinaryStorage` configuration, specify `transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }]` so Cloudinary compresses and resizes images automatically upon ingest.\n4. **Paginate Comments**:\n   Never load 2,000 comments in a single query. Paginate comments using cursor pagination (`limit=20`) with a \"Load more comments\" button.",hi:`1. **Reading Time Server Par Calculate Karein**:
   Har page refresh par words mat ginein. Mongoose ke \`pre('save')\` hook mein ek baar calculate karke database mein save kar dein.
2. **Compound Index Lagayein**:
   Author profile page ke liye \`{ author: 1, createdAt: -1 }\` index banayein taaki user ki posts instant load hon.
3. **Cloudinary Par Auto Resize Karein**:
   12MB ki heavy photos store karne ke badle Cloudinary transformation (\`width: 1200, quality: 'auto'\`) lagayein taaki photo 150KB mein compress ho jaye.
4. **Comments Ko Paginate Karein**:
   Ek sath 1,000 comments load karne se bachein; 20-20 karke load karein.`}},{type:"interview",heading:{en:"Interview Questions & In-Depth Answers",hi:"Interview Ke Zaroori Sawal Aur Jawab"},body:{en:"### Q1: How do you prevent Stored XSS (Cross-Site Scripting) attacks when rendering user-submitted Markdown in a React application?\n**Answer**:\nMarkdown parsers by default often permit embedded HTML tags (like `<script>`, `<img onerror=...>`, or `<iframe src=...>`). If an author embeds a malicious payload into their article and it is rendered unsanitized via `dangerouslySetInnerHTML`, the attacker's script executes in the victim reader's browser, allowing theft of session cookies and localStorage tokens.\nTo prevent this:\n1. Use **`react-markdown`**, which does not use `dangerouslySetInnerHTML` and escapes raw HTML tags by default.\n2. If raw HTML is permitted via plugins (like `rehype-raw`), pipe the output through **DOMPurify** (`DOMPurify.sanitize(html)`) to strip all executable JavaScript, event handlers (`onload`, `onerror`), and dangerous protocols (`javascript:`).\n\n---\n\n### Q2: How does Mongoose `.populate()` work under the hood, and what is its performance consideration?\n**Answer**:\nUnlike SQL `JOIN` statements that are executed as a single query inside the relational database engine, MongoDB does not natively support SQL joins.\nWhen you call `Post.findOne().populate('author', 'name avatar')`, Mongoose executes **two sequential queries**:\n1. First query: `db.posts.findOne({ slug })` returns the post document containing `author: ObjectId(\"64f89b12\")`.\n2. Second query: Mongoose extracts that ObjectId and issues `db.users.find({ _id: { $in: [ObjectId(\"64f89b12\")] } }, { name: 1, avatar: 1 })`.\n3. Mongoose merges the author object into the post document in Node.js memory before returning.\nFor high-traffic feeds with hundreds of populated relations, multiple network round-trips can introduce latency. Denormalizing essential read-heavy fields (storing `authorName` and `authorAvatar` directly inside the post document) is preferred at extreme scale.\n\n---\n\n### Q3: Why should file uploads be streamed directly to Cloudinary or AWS S3 instead of saving to local disk with Multer's `diskStorage`?\n**Answer**:\n1. **Container Ephemerality**: Cloud hosting platforms (Render, Railway, Heroku) run inside ephemeral containers. Local files are erased whenever the container restarts or redeploys.\n2. **Horizontal Scaling**: If you scale your API to 3 load-balanced server instances, a file saved on Server A's local disk cannot be accessed when a subsequent request hits Server B or Server C!\n3. **Global CDN Delivery**: Services like Cloudinary automatically optimize image formats (converting PNG to WebP/AVIF), resize images on the fly, and deliver them over a global Edge CDN with <20ms latency.",hi:`### Q1: React mein user-submitted Markdown ko render karte waqt XSS attacks se kaise bachte hain?
**Answer**:
Markdown mein log embedded HTML (\`<script>\` ya \`<img onerror=...>\`) daal sakte hain. Agar ise bina sanitize kiye render kiya jaye, toh reader ke browser mein hacker ka JavaScript chal jata hai jo uske auth tokens chura sakta hai.
Solution:
1. **\`react-markdown\`** use karein jo by default raw HTML tags ko escape kar deta hai aur \`dangerouslySetInnerHTML\` use nahi karta.
2. Agar raw HTML allow karna ho, toh **DOMPurify** se sanitize karein jo saare malicious event handlers aur \`javascript:\` links ko mita deta hai.

---

### Q2: Mongoose \`.populate()\` internally kaise kaam karta hai?
**Answer**:
MongoDB SQL ki tarah single query \`JOIN\` nahi karta.
Mongoose \`.populate()\` do alag queries chalata hai:
1. Pehle \`Post\` dhoondhta hai jahan se \`author: ObjectId\` nikalta hai.
2. Phir \`User\` collection mein jakar us ObjectId ka data mangwata hai.
3. Node.js ke RAM mein dono ko jodkar return karta hai.
Bohot bade scale par baar-baar populate karne se bachne ke liye author ka naam aur avatar direct post document ke andar save (denormalize) kar diya jata hai.

---

### Q3: File uploads ko local disk par save karne ke badle Cloudinary par stream kyun karna chahiye?
**Answer**:
1. **Container Ephemeral Hote Hain**: Render/Railway par server restart hote hi local disk saaf ho jaati hai aur photos delete ho jaati hain.
2. **Multi-Server Scaling**: Agar 3 servers chal rahe hon, toh Server 1 par save hui photo Server 2 se nahi milegi.
3. **Global CDN**: Cloudinary automatically photo ko WebP format mein compress karke global CDN se deliver karta hai jisse site superfast khulti hai.`}},{type:"summary",heading:{en:"Quick Summary",hi:"Quick Revision Summary"},body:{en:"- **Developer Blog Platform** requires multi-entity relationships across Users, Posts, and Comments.\n- **Multer + Cloudinary**: Stream multipart image uploads directly to cloud storage; never save to local container disks.\n- **Unique Slugs**: Use `slugify` with an appended random hex hash to prevent duplicate key crashes.\n- **XSS Sanitization**: Never render unsanitized Markdown; use `react-markdown` or DOMPurify.\n- **Authorization**: Always enforce strict author ownership checks before permitting post edits or deletions.\n- **Performance**: Precalculate reading time in Mongoose `pre('save')` hooks and index by `{ slug: 1 }`.",hi:`- **Blog Platform** Users, Posts aur Comments ke beech relations sikhata hai.
- **Multer + Cloudinary**: Photos ko local disk par save kiye bina seedha Cloudinary CDN par upload karein.
- **Collision-Safe Slugs**: Headline slug ke aage random hash lagayein taaki duplicate crash na aaye.
- **XSS Protection**: Markdown ko render karne se pehle DOMPurify ya \`react-markdown\` se safe banayein.
- **Ownership Verification**: Sirf wahi user apna post delete kar sake jisne use likha hai.
- **Performance**: Reading time Mongoose hook mein calculate karein aur slug par unique index banayein.`}}],quiz:[{question:{en:"What severe security vulnerability occurs if an author's Markdown blog post is rendered using dangerouslySetInnerHTML without DOMPurify sanitization?",hi:"Bina DOMPurify sanitization ke dangerouslySetInnerHTML se Markdown render karne par kaunsa bada security attack ho sakta hai?"},options:[{en:"The database table gets dropped",hi:"Database table delete ho jaati hai"},{en:"Stored Cross-Site Scripting (XSS): Malicious script tags or event handlers injected into the Markdown execute in the browser of every user viewing the article, allowing token theft",hi:"Stored Cross-Site Scripting (XSS): Markdown mein dali gayi malicious scripts article padhne wale har user ke browser mein execute hokar unke session tokens chura leti hain"},{en:"The server stops accepting HTTP POST requests",hi:"Server POST requests lena band kar deta hai"},{en:"The CSS styling will turn pink",hi:"CSS styling pink ho jaati hai"}],correctAnswer:1,explanation:{en:"Unsanitized user input rendered as raw HTML permits attackers to inject malicious script tags or onerror event handlers that steal session cookies and localStorage tokens.",hi:"Unsanitized HTML mein hacker `<script>` tag daal kar doosre users ka login token aur cookies chura sakta hai (Stored XSS)."}},{question:{en:"Why is appending a random hash (e.g. slugify(title) + '-' + randomHash) necessary when generating article slugs?",hi:"Article slug banate waqt headline ke sath random hash jodna kyun zaroori hai?"},options:[{en:"Because Google search requires random numbers in URLs",hi:"Kyunki Google ko URLs mein random number chahiye hote hain"},{en:"To prevent MongoDB E11000 duplicate key collision errors when multiple authors publish articles with identical titles",hi:"Jab do alag-alag authors ek hi headline se article publish karein toh MongoDB duplicate key error se crash hone se bachane ke liye"},{en:"To encrypt the article title",hi:"Title encrypt karne ke liye"},{en:"Because slugify only accepts 5 characters",hi:"Kyunki slugify sirf 5 characters accept karta hai"}],correctAnswer:1,explanation:{en:"If two users title their article 'React Tutorial', naive slugify produces duplicate 'react-tutorial' slugs, violating unique database indexes. Appending a random suffix guarantees uniqueness.",hi:"Agar do log same title rakhein toh bina hash ke same slug banega aur database unique constraint fail hokar crash ho jayega."}},{question:{en:"What authorization check must be enforced before executing Post.findByIdAndDelete(req.params.id)?",hi:"Post.findByIdAndDelete chalane se pehle kaunsa authorization check lagana compulsory hai?"},options:[{en:"Verify that the user has an active internet connection",hi:"Check karna ki internet chal raha hai"},{en:"Verify that the authenticated user's ID matches the post's author ID (post.author.toString() === req.user.id) or the user is an admin",hi:"Verify karna ki logged-in user ka ID post ke author ID se match karta hai ya user admin hai"},{en:"Verify that the post has zero comments",hi:"Check karna ki post par zero comments hon"},{en:"Verify that the post was created more than 30 days ago",hi:"Check karna ki post 30 din purani ho"}],correctAnswer:1,explanation:{en:"Without verifying author ownership, any authenticated user can pass any arbitrary post ID to delete posts written by other authors.",hi:"Ownership verify na karne par koi bhi user kisi doosre author ka article delete kar sakta hai."}},{question:{en:"Why is streaming images directly to Cloudinary via Multer preferred over saving them to local disk on cloud hosting platforms?",hi:"Cloud hosting platforms par photos ko local disk par save karne ke badle direct Cloudinary par stream karna kyun behtar hai?"},options:[{en:"Because Node.js does not support local files",hi:"Kyunki Node.js local files support nahi karta"},{en:"Container filesystems are ephemeral (erasing local files on restart), and local files cannot be shared across multiple horizontal server instances",hi:"Cloud containers ka filesystem temporary (ephemeral) hota hai jo restart par files mita deta hai, aur local files multiple server instances par share nahi ho sakti"},{en:"Because Cloudinary is mandatory for Google Chrome",hi:"Kyunki Cloudinary Chrome ke liye compulsory hai"},{en:"To decrease database memory",hi:"DB memory kam karne ke liye"}],correctAnswer:1,explanation:{en:"Local files vanish when ephemeral cloud containers reboot. External cloud storage (Cloudinary/S3) provides persistent storage, automatic image optimization, and CDN delivery.",hi:"Containers restart hote hi local files delete ho jaati hain. Cloudinary par save karne se photos hamesha ke liye safe rehti hain aur superfast load hoti hain."}},{question:{en:"What is the core architectural purpose of Project 2: Dev Blog & Publishing Platform (Auth + Images) in the modern full-stack MERN ecosystem?",hi:"Modern full-stack MERN ecosystem mein Project 2: Dev Blog & Publishing Platform (Auth + Multer) ka mukhya architectural maksad kya hota hai?"},options:[{en:"It manages physical computer cooling and power supply",hi:"Ye physical computer cooling aur power supply manage karta hai"},{en:"It provides structured, robust, and scalable patterns for handling project 2: dev blog & publishing platform (auth + images) with high performance and maintainability",hi:"Ye high performance aur maintainability ke saath Project 2: Dev Blog & Publishing Platform (Auth + Multer) ko handle karne ka structured aur scalable pattern provide karta hai"},{en:"It completely replaces JavaScript with binary machine code in browser tabs",hi:"Ye browser tabs mein JavaScript ko binary machine code se replace karta hai"},{en:"It is only used for printing documents to physical printers",hi:"Ye sirf physical printers par documents print karne ke liye hai"}],correctAnswer:1,explanation:{en:"Project 2: Dev Blog & Publishing Platform (Auth + Images) establishes clean separation of concerns, ensuring predictable data flow, robust error handling, and optimal runtime performance in production.",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) clean architecture aur separation of concerns deta hai jisse application scalable aur maintainable banti hai."}},{question:{en:"What critical development bottleneck or anti-pattern does Project 2: Dev Blog & Publishing Platform (Auth + Images) directly resolve?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) kis critical development bottleneck ya anti-pattern ko seedhe solve karta hai?"},options:[{en:"It replaces chaotic, tightly coupled ad-hoc logic with declarative, predictable control flow and structured data contracts",hi:"Ye chaotic aur tightly coupled logic ko hata kar declarative, predictable flow aur structured data contracts deta hai"},{en:"It forces the operating system to shut down when errors occur",hi:"Error aane par ye operating system band kar deta hai"},{en:"It deletes all database records older than 24 hours automatically",hi:"Ye 24 ghante purane DB records delete karta hai"},{en:"It blocks all outgoing HTTP network requests to conserve bandwidth",hi:"Ye bandwidth bachane ke liye network requests block karta hai"}],correctAnswer:0,explanation:{en:"Without Project 2: Dev Blog & Publishing Platform (Auth + Images), applications suffer from brittle code, maintenance overhead, and unhandled edge cases that manifest as production crashes.",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) ke bina code brittle ho jata hai aur production mein unexpected errors aate hain."}},{question:{en:"When reasoning about Project 2: Dev Blog & Publishing Platform (Auth + Images), how is its mental model best conceptualized through real-world analogies?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) ko real-world analogies ke zariye kaise best samjha ja sakta hai?"},options:[{en:"As a completely offline computer with zero network or database connections",hi:"Ek offline computer ki tarah jisme koi connection na ho"},{en:"As a disciplined, coordinated workflow where inputs are validated and processed through standardized checkpoints rather than ad-hoc handling",hi:"Ek disciplined workflow ki tarah jahan data ko structured checkpoints ke zariye step-by-step process kiya jata hai"},{en:"As a random number generator with non-deterministic output",hi:"Random number generator ki tarah jiska koi niyam na ho"},{en:"As a static text document that cannot be modified or read",hi:"Static text document jo padha na ja sake"}],correctAnswer:1,explanation:{en:"Real-world workflow analogies help engineers visualize component boundaries, request lifecycles, and data transformations intuitively.",hi:"Real-world analogies component boundaries aur request lifecycle ko visual aur intuitive banati hain."}},{question:{en:"When declaring and implementing Project 2: Dev Blog & Publishing Platform (Auth + Images), what syntactic convention is essential to prevent runtime errors?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) ko declare aur implement karte waqt kaunsa syntax niyam runtime errors rokne ke liye zaroori hai?"},options:[{en:"Adhering strictly to required parameters, handling asynchronous promises/callbacks cleanly, and verifying return value types",hi:"Zaroori parameters sahi pass karna, async promises ko handle karna aur return value types verify karna"},{en:"Wrapping every line of code inside an eval() execution block",hi:"Har line ko eval() block mein wrap karna"},{en:"Omitting import and require statements to reduce file size",hi:"File size ghatane ke liye import statements hatana"},{en:"Writing all code on a single continuous line without whitespace",hi:"Bina whitespace ke single line par code likhna"}],correctAnswer:0,explanation:{en:"Following standard ES6+ syntax contracts and properly handling promise resolution ensures execution safety and eliminates TypeError exceptions.",hi:"ES6+ syntax aur promise handling ke standard rules follow karne se TypeError aur crashes nahi aate."}},{question:{en:"What is a common pitfall developers encounter when working with Project 2: Dev Blog & Publishing Platform (Auth + Images)?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) ke saath kaam karte waqt developers aksar kaunsi aam galati karte hain?"},options:[{en:"Writing unit tests before implementing features",hi:"Feature likhne se pehle unit tests likhna"},{en:"Failing to handle failure edge cases, mutating shared state directly, or neglecting defensive validation guard clauses",hi:"Failure edge cases ko handle na karna, shared state direct mutate karna ya validation guard clauses na lagana"},{en:"Using strict equality checks (===) instead of loose equality (==)",hi:"Loose equality ke badle strict equality use karna"},{en:"Writing clear inline code documentation",hi:"Clear inline code comments likhna"}],correctAnswer:1,explanation:{en:"Neglecting edge cases and error handling causes silent regressions and race conditions that surface under concurrent user workloads.",hi:"Edge cases aur error handling miss karne se high-traffic production load mein silent bugs paida hote hain."}},{question:{en:"According to production best practices, how should Project 2: Dev Blog & Publishing Platform (Auth + Images) be architected for enterprise-grade stability?",hi:"Production best practices ke mutabiq enterprise-grade stability ke liye Project 2: Dev Blog & Publishing Platform (Auth + Multer) ko kaise architect karna chahiye?"},options:[{en:"Enforce modular boundaries, validate all incoming payloads against schemas, log structured context, and maintain pure functions where possible",hi:"Modular boundaries enforce karein, payloads ko schema se validate karein, structured logs rakhein aur pure functions use karein"},{en:"Hardcode sensitive database connection strings directly in client-side files",hi:"Database passwords ko client files mein hardcode karna"},{en:"Disable all linter rules and type warnings globally",hi:"Linter aur type warnings ko globally disable karna"},{en:"Store all user session variables in global un-scoped memory arrays",hi:"Global memory arrays mein sessions store karna"}],correctAnswer:0,explanation:{en:"Enterprise-grade code prioritizes modularity, strict input validation, structured observability, and stateless designs.",hi:"Production hardening ke liye modular code, schema validation aur observability standard rules hote hain."}},{question:{en:"How does proper optimization of Project 2: Dev Blog & Publishing Platform (Auth + Images) impact application memory and CPU consumption?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) ko sahi dhang se optimize karne par application memory aur CPU par kya asar padta hai?"},options:[{en:"It increases server CPU temperature to 100 degrees Celsius",hi:"Server CPU temperature 100 degrees kar deta hai"},{en:"It minimizes redundant computations, eliminates memory leaks from uncleaned references, and maintains low latency under high concurrency",hi:"Ye redundant computations ghatata hai, memory leaks khatam karta hai aur high concurrency mein low latency maintain karta hai"},{en:"It doubles heap RAM allocation unconditionally",hi:"Heap RAM ko zabardasti double karta hai"},{en:"Optimization has zero measurable impact in modern web engines",hi:"Modern web engines par optimization ka koi asar nahi hota"}],correctAnswer:1,explanation:{en:"Preventing unnecessary allocations and cleaning up resources ensures low garbage collection pressure and predictable response times.",hi:"Memory leak rokne aur unnecessary allocations hatane se Garbage Collector par load kam rehta hai aur response fast rehta hai."}},{question:{en:"What security principle is non-negotiable when handling data within Project 2: Dev Blog & Publishing Platform (Auth + Images)?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) mein data handle karte waqt kaunsa security principle non-negotiable hota hai?"},options:[{en:"Never trust client-supplied input: always sanitize, authenticate, authorize, and validate against strict schemas on the server",hi:"Client data par blind trust na karein: server par hamesha sanitize, authenticate, authorize aur validate karein"},{en:"Trust all requests coming from mobile devices or web browsers blindly",hi:"Mobile ya browser se aane wali requests par blind trust karein"},{en:"Disable HTTPS and SSL certificates to maximize raw network throughput",hi:"Network throughput ke liye HTTPS band karein"},{en:"Expose database admin credentials to all registered users",hi:"Database admin credentials sabhi users ko expose karein"}],correctAnswer:0,explanation:{en:"Zero-Trust security dictates that every incoming request and data mutation must be validated and authenticated server-side before processing.",hi:"Zero-Trust security ke mutabiq har incoming mutation ko server par strictly validate aur authenticate kiya jana chahiye."}},{question:{en:"How does asynchronous non-blocking execution operate in Project 2: Dev Blog & Publishing Platform (Auth + Images)?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) mein asynchronous non-blocking execution kaise kaam karta hai?"},options:[{en:"It freezes the entire operating system until each operation completes",hi:"Har operation complete hone tak operating system freeze rehta hai"},{en:"I/O operations return Promises or accept callbacks, delegating work to background threads/queues while the main thread remains free to handle incoming tasks",hi:"I/O operations Promises return karte hain aur background queues use karke main thread ko baaki requests ke liye free rakhte hain"},{en:"Async operations execute in reverse alphabetical order automatically",hi:"Async operations reverse alphabetical order mein chalte hain"},{en:"Async code only executes when triggered manually by a user click",hi:"Sirf manual user click par async code chalta hai"}],correctAnswer:1,explanation:{en:"Non-blocking asynchronous operations resolve via microtasks or event loop queues, ensuring the runtime thread serves concurrent requests smoothly.",hi:"Non-blocking model main thread ko free rakhta hai taaki server bina rukaawat ke multiple users ko simultaneously serve kar sake."}},{question:{en:"What is the recommended pattern for propagating errors that occur in Project 2: Dev Blog & Publishing Platform (Auth + Images)?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) mein error aane par unhe propagate karne ka recommended pattern kya hai?"},options:[{en:"Intercepting the error, enriching it with operational context, and delegating to a centralized error handler or error boundary",hi:"Error ko intercept karna, debug context add karna, aur centralized error handler ya error boundary ko pass karna"},{en:"Swallowing errors silently with empty catch {} blocks to hide problems from logs",hi:"Khaali catch {} blocks se errors ko silently daba dena taaki logs mein na dikhein"},{en:"Shutting down the server machine power immediately",hi:"Server machine power turant band kar dena"},{en:"Sending internal raw stack traces and database credentials to end-user browsers",hi:"Raw stack trace aur DB passwords browser par bhej dena"}],correctAnswer:0,explanation:{en:"Centralized error propagation provides complete operational observability while shielding internal infrastructure details from end users.",hi:"Centralized error handling se system mein transparency rehti hai aur user ko clean, safe error messages milte hain."}},{question:{en:"When authoring unit or integration tests for Project 2: Dev Blog & Publishing Platform (Auth + Images), what must the test suite assert?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) ke liye automated tests likhte waqt test suite ko kya assert karna zaroori hai?"},options:[{en:"Only that the JavaScript file can be saved to disk",hi:"Sirf ye ki file disk par save ho sake"},{en:"Both the happy path (expected inputs producing valid outputs) AND boundary edge cases (null, empty arrays, network timeouts, invalid types)",hi:"Happy path (valid data) AUR boundary edge cases (null, empty array, network timeout, invalid types) dono ko verify karna"},{en:"That the test suite takes at least 24 hours to finish running",hi:"Test suite ko 24 ghante chalna chahiye"},{en:"Testing is considered unnecessary in modern full-stack development",hi:"Modern development mein testing zaroori nahi hai"}],correctAnswer:1,explanation:{en:"Robust automated test suites verify both standard valid scenarios and defensive failure modes to prevent regressions during deployments.",hi:"Achhi testing valid inputs aur failure states dono ko assert karti hai taaki production deployments safe rahein."}},{question:{en:"How does modular design enhance code maintainability in Project 2: Dev Blog & Publishing Platform (Auth + Images)?",hi:"Modular design Project 2: Dev Blog & Publishing Platform (Auth + Multer) mein code maintainability ko kaise badhata hai?"},options:[{en:"By isolating distinct responsibilities into small, reusable, and independently testable units following the Single Responsibility Principle",hi:"Single Responsibility Principle ke zariye alag-alag kaamo ko chote, reusable aur testable units mein baant kar"},{en:"By combining all frontend, backend, and database code into a single 50,000-line script",hi:"Saara code ek hi 50,000-line script mein daal kar"},{en:"By removing all function names and replacing them with random numbers",hi:"Function names hata kar random numbers likhna"},{en:"By forbidding code comments and documentation across the repository",hi:"Comments aur documentation ban kar dena"}],correctAnswer:0,explanation:{en:"Modularity reduces cognitive load, simplifies debugging, prevents ripple effects during changes, and enables seamless team collaboration.",hi:"Modular code se readability badhti hai, debugging aasan hoti hai aur ek jagah badlav karne par doosri jagah bugs nahi aate."}},{question:{en:"When application traffic scales 100x, how should Project 2: Dev Blog & Publishing Platform (Auth + Images) be architected to support horizontal scaling?",hi:"Traffic 100x badhne par Project 2: Dev Blog & Publishing Platform (Auth + Multer) ko horizontally scale karne ke liye kya design approach honi chahiye?"},options:[{en:"Ensure the component/service is completely stateless, offload shared session/state to Redis/MongoDB, and distribute traffic via a load balancer",hi:"Service ko completely stateless banayein, shared state ko Redis/DB par shift karein aur load balancer se traffic distribute karein"},{en:"Store all user session variables in local in-memory JavaScript objects on the web server",hi:"Server ki local RAM mein session variables store karna"},{en:"Reboot the production server manually whenever memory usage exceeds 10%",hi:"Memory 10% cross hote hi server manually reboot karna"},{en:"Block 95% of incoming users using firewall rules",hi:"95% users ko firewall se block kar dena"}],correctAnswer:0,explanation:{en:"Stateless service architecture guarantees that any container instance can handle any incoming request, enabling dynamic auto-scaling without session loss.",hi:"Stateless architecture auto-scaling ka base hai jahan naye containers bina session loss ke instant traffic handle kar sakte hain."}},{question:{en:"In the full-stack MERN paradigm, where does Project 2: Dev Blog & Publishing Platform (Auth + Images) properly belong and execute?",hi:"Full-stack MERN architecture mein Project 2: Dev Blog & Publishing Platform (Auth + Multer) kahan belong karta hai aur kahan execute hota hai?"},options:[{en:"In its designated architectural tier (Client browser UI, Express API backend, or MongoDB database) with clean API contracts connecting them",hi:"Apne designated tier (Browser UI, Express API backend, ya MongoDB) mein clean API contracts ke saath"},{en:"Directly on the end-user's local router firmware",hi:"User ke local router firmware par"},{en:"Inside the computer motherboard BIOS chip",hi:"Motherboard BIOS chip mein"},{en:"All MERN code runs strictly inside the MongoDB database engine",hi:"Saara MERN code sirf MongoDB ke andar chalta hai"}],correctAnswer:0,explanation:{en:"Maintaining clear structural boundaries between client rendering, backend orchestration, and database persistence is the defining trait of MERN.",hi:"Client UI, backend server aur database ke beech saaf boundary maintain karna MERN architecture ka mukhya niyam hai."}},{question:{en:"What telemetry metric or observability signal is most crucial for diagnosing issues with Project 2: Dev Blog & Publishing Platform (Auth + Images) in production?",hi:"Production mein Project 2: Dev Blog & Publishing Platform (Auth + Multer) ki problems diagnose karne ke liye sabse zaroori telemetry metric kaunsi hoti hai?"},options:[{en:"The desktop monitor brightness setting of the client",hi:"Client ke monitor ki brightness"},{en:"Latency percentiles (p95/p99), error rates (HTTP 4xx/5xx), throughput (RPS), and heap memory allocation deltas",hi:"Latency percentiles (p95/p99), error rates (4xx/5xx), throughput (RPS), aur heap memory allocation deltas"},{en:"The number of files in the project's root folder",hi:"Root folder mein files ki sankhya"},{en:"The physical keyboard model used by the engineer",hi:"Engineer ke keyboard ka model"}],correctAnswer:1,explanation:{en:"Observability platforms monitor p95/p99 latencies, error frequencies, and memory utilization to identify bottlenecks and regressions early.",hi:"p95/p99 latencies aur error rates monitor karne se crashes aane se pehle hi bottlenecks pakad mein aa jaate hain."}},{question:{en:"Why is eliminating unintended side effects essential when authoring logic for Project 2: Dev Blog & Publishing Platform (Auth + Images)?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) ka logic likhte waqt unintended side effects ko khatam karna kyun zaroori hai?"},options:[{en:"Side effects introduce unpredictability, corrupt shared state, cause race conditions, and make concurrent code nearly impossible to debug",hi:"Side effects se code unpredictable banta hai, shared state corrupt hoti hai aur race conditions create hoti hain"},{en:"Side effects permanently erase the developer's Git commit history",hi:"Git history permanently delete ho jaati hai"},{en:"Side effects are strictly required by the JavaScript ECMAScript standard",hi:"ECMAScript mein side effects required hain"},{en:"Side effects make all algorithms execute in O(1) time",hi:"Saare algorithms O(1) time mein chalte hain"}],correctAnswer:0,explanation:{en:"Pure and predictable logic produces the same output for identical inputs, guaranteeing thread safety, easy caching, and high reliability.",hi:"Pure logic se shared state safe rehti hai aur same input par hamesha consistent aur predictable output milta hai."}},{question:{en:"How should client-side state be kept in sync with backend server mutations in Project 2: Dev Blog & Publishing Platform (Auth + Images)?",hi:"Project 2: Dev Blog & Publishing Platform (Auth + Multer) mein client-side state aur backend server data ko sync mein kaise rakha jata hai?"},options:[{en:"By forcing a complete hard page refresh every 3 seconds",hi:"Har 3 second mein poora page hard refresh karke"},{en:"Using optimistic UI updates with error rollback, automated query cache invalidation (TanStack Query/RTK), or WebSocket change streams",hi:"Optimistic UI updates with rollback, automated query cache invalidation ya WebSocket push streams use karke"},{en:"By disabling all database update operations permanently",hi:"Database updates ko permanently band karke"},{en:"By saving user state in local CSV files on the server desktop",hi:"Server desktop par CSV files save karke"}],correctAnswer:1,explanation:{en:"Modern full-stack architectures synchronize state seamlessly using query cache invalidation, optimistic updates, and real-time socket events.",hi:"Modern apps cache invalidation aur optimistic UI use karti hain taaki UI bina screen reload ke instantly updated rahe."}}]};export{e as default};
