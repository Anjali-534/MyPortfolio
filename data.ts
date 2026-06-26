export const profile = {
  name: "Anjali Aggarwal",
  title: "Full Stack & Mobile Developer",
  subtitle: "B.Tech (IT) · 2025 · AI/ML Minor",
  tagline: "Building production-grade web & mobile — from schema to deployment.",
  summary:
    "Full Stack and Mobile Developer specializing in React.js, Next.js, React Native, and Node.js, with hands-on experience building and shipping production web and cross-platform mobile applications end-to-end — from PostgreSQL schema design and RESTful API development to responsive UI and cloud deployment on Vercel and Railway. B.Tech (IT) graduate (2025) with an AI/ML minor and applied machine-learning projects in Python. Comfortable across the stack in fast-moving, Agile teams.",
  location: "Delhi NCR, India",
  email: "anjali.aggarwal534@gmail.com",
  phone: "+91-7827194116",
  github: "https://github.com/Anjali-534",
  available: "Available to join immediately",
  headshotSrc: "/images/headshot.png",
  resumeSrc: "/resume.docx",
  stack: "React · Next.js · React Native · Node.js · Go",
}

export const metrics = [
  { value: "50+", count: 50, suffix: "+", label: "REST APIs Built" },
  { value: "90%", count: 90, suffix: "%", label: "ML Accuracy" },
  { value: "5+",  count: 5,  suffix: "+", label: "Projects Shipped" },
  { value: "4+",  count: 4,  suffix: "+", label: "Years Coding" },
]

export const skills = {
  languages: ["JavaScript", "TypeScript", "Python", "Go", "SQL", "HTML5", "CSS3"],
  frontend: ["React.js", "Next.js", "Tailwind CSS", "Redux / Context API", "Responsive Design"],
  backend: ["Node.js", "Express.js", "Go (Gin)", "RESTful APIs", "JWT / OAuth", "WebSockets"],
  mobile: ["React Native", "Expo", "EAS Build", "Cross-Platform Development"],
  databases: ["PostgreSQL", "MongoDB", "Firebase"],
  aiml: ["scikit-learn", "PyTorch", "Pandas", "NumPy", "NLP", "FAISS"],
  cloud: ["Docker", "Vercel", "Railway", "CI/CD", "Git / GitHub", "Postman", "Agile / Scrum"],
}

export const experience = [
  {
    role: "Full Stack & Mobile Developer (Freelance)",
    company: "Aggarwal Publicity",
    url: "https://aggarwalpublicity.com/",
    period: "2025 – Present",
    highlights: [
      "Designed, built, and deployed aggarwalpublicity.com end-to-end in Next.js — owning frontend, backend, and production deployment.",
      "Building an internal logistics & ride-hailing system — Go/Gin backend, PostgreSQL, multiple Next.js admin panels, and React Native (Expo) apps.",
      "Developed RESTful APIs and real-time features: booking, live tracking, in-app support chat with Google Maps and AI-driven auto-reply.",
      "Translated stakeholder requirements into scalable architecture coordinated across multiple codebases.",
    ],
  },
  {
    role: "Front-End / Full-Stack Developer",
    company: "Zobox Protech Limited",
    url: "",
    period: "Dec 2024 – May 2025",
    highlights: [
      "Built responsive, cross-device web modules in Next.js with secure JWT authentication and real-time update features.",
      "Used Advanced Excel for data analysis and market prediction, delivering insights that informed product decisions.",
    ],
  },
  {
    role: "Machine Learning Trainee",
    company: "KVON Technologies",
    url: "",
    period: "May 2025 – Feb 2026",
    highlights: [
      "Applied supervised and unsupervised learning, model evaluation, and Python (scikit-learn, NumPy, Pandas) to data-driven automation problems.",
    ],
  },
]

export type Project = {
  name: string
  tagline: string
  description: string
  stack: string[]
  github: string
  live: string
  featured?: boolean
  group: "fullstack" | "aiml"
}

export const projects: Project[] = [
  // ── Full-Stack & Web ──────────────────────────────────────────────────────
  {
    name: "gogoo",
    tagline: "Ride-hailing & logistics platform",
    description:
      "End-to-end multi-codebase system: a Go/Gin backend with PostgreSQL, five Next.js admin panels (dispatch, driver, finance, operations, analytics), and two Expo apps for drivers and passengers. Features live GPS tracking via WebSockets, Razorpay payments, and a Gemini-powered support chat with AI auto-reply — deployed on Railway, Dockerized for local parity.",
    stack: ["Go", "Gin", "PostgreSQL", "Next.js", "React Native", "Expo", "WebSockets", "Gemini AI", "Railway", "Docker"],
    github: "https://github.com/Anjali-534/gogoo-dashboard",
    live: "https://gogoo-dashboard-production.up.railway.app/",
    featured: true,
    group: "fullstack",
  },
  {
    name: "Hamara Book Bank",
    tagline: "NGO management & library platform",
    description:
      "Full-stack MERN application powering an NGO's book-distribution operations, with 50+ REST API endpoints, JWT authentication, and role-based routing for admins, volunteers, and members. Includes an admin dashboard for inventory management, borrow/return workflows, and Razorpay-backed subscription tiers for donor fundraising.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT", "Razorpay"],
    github: "",
    live: "",
    group: "fullstack",
  },
  {
    name: "aggarwalpublicity.com",
    tagline: "Production PHP business website",
    description:
      "Full production website for a Delhi-based outdoor advertising business, built in raw PHP (no framework) and hosted on Hostinger. Features SEO-optimized service pages, a PHPMailer SMTP contact form with server-side validation, embedded Google Maps for multiple site locations, and a fully mobile-responsive layout — owned end-to-end from design to deployment.",
    stack: ["PHP", "PHPMailer", "MySQL", "HTML5", "CSS3", "Google Maps API", "Hostinger"],
    github: "",
    live: "https://aggarwalpublicity.com/",
    group: "fullstack",
  },
  {
    name: "ShopNow",
    tagline: "Amazon-style MERN e-commerce",
    description:
      "Full-featured e-commerce platform with Stripe payment processing, Cloudinary media management, and a complete admin panel for products, orders, and users. Containerized with Docker Compose for environment consistency, MongoDB Atlas for cloud persistence, and JWT auth with refresh-token rotation across a clean REST API.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Stripe", "Cloudinary", "Docker", "JWT"],
    github: "",
    live: "",
    group: "fullstack",
  },
  {
    name: "FryCuisine",
    tagline: "Headless WordPress food blog",
    description:
      "React + Vite frontend backed by a headless WordPress CMS via REST API, with a custom plugin for structured recipe metadata and dynamic post rendering. Fully decoupled — editorial control stays in WordPress while the React frontend remains fast, with category-filtered browsing and a mobile-first responsive layout.",
    stack: ["React", "Vite", "WordPress REST API", "Custom Plugin", "CSS Modules"],
    github: "",
    live: "",
    group: "fullstack",
  },

  // ── AI / ML ───────────────────────────────────────────────────────────────
  {
    name: "Medical X-Ray Classifier",
    tagline: "Multi-class chest pathology detection",
    description:
      "DenseNet-121 model trained on ~18,000 labelled chest X-rays (PyTorch), achieving ~90% test accuracy across 14 pathology classes. Grad-CAM heatmaps provide visual explainability; a Flask + React demo enables real-time inference and class-probability inspection.",
    stack: ["Python", "PyTorch", "DenseNet-121", "scikit-learn", "Pandas", "Flask", "Grad-CAM"],
    github: "https://github.com/Anjali-534/Xray_Classifier",
    live: "",
    group: "aiml",
  },
  {
    name: "RAG PDF Q&A",
    tagline: "Retrieval-augmented document Q&A",
    description:
      "Offline-capable RAG pipeline — PDFs are chunked, embedded with Sentence-Transformers, and indexed in FAISS for sub-second semantic retrieval. Relevant passages are passed as grounded context to a Hugging Face language model for citation-backed answer generation.",
    stack: ["Python", "FAISS", "Sentence-Transformers", "Hugging Face", "LangChain"],
    github: "https://github.com/Anjali-534/Rag_PDF_explainer",
    live: "",
    group: "aiml",
  },
  {
    name: "Image Classifier API",
    tagline: "FastAPI inference microservice",
    description:
      "Production-ready FastAPI service (uvicorn) exposing an image-classification endpoint with automatic OpenAPI docs and JSON responses. Accepts image uploads, runs inference through a trained model pipeline, and returns predicted class with confidence score — containerization-ready for cloud deployment.",
    stack: ["Python", "FastAPI", "uvicorn", "scikit-learn", "Pillow", "Docker"],
    github: "",
    live: "",
    group: "aiml",
  },
]

export const education = {
  degree: "B.Tech, Information Technology",
  institution: "Dr. Akhilesh Das Gupta Institute (GGSIPU)",
  period: "2021–2025",
  grade: "91%",
  minor: "AI/ML",
  additional: [
    { label: "Class XII (CBSE)", grade: "87%", year: "2021" },
    { label: "Class X (CBSE)", grade: "86.95%", year: "2019" },
    { label: "Diploma in French, Delhi University", grade: "In progress", year: "2026" },
  ],
}

export const achievements = [
  "IBM Certified — Data Science",
  "Cleared Smart India Hackathon (SIH) Level 2",
  "Two-time runner-up, IEEE GGSIPU Ideathon",
  "Program Manager, Hamara Book Bank NGO (2018–Present) — led community outreach and book-distribution initiatives",
  "Languages: English (fluent), Hindi (native), French (intermediate, pursuing diploma)",
]
