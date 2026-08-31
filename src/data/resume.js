export const profile = {
  name: "Muhammad Ghazali Nur Rahman",
  title: "Full Stack Developer",
  email: "mghazalinurrahman939@gmail.com",
  phone: "+6282114706173",
  linkedin: "https://linkedin.com/in/ghazali10",
  github: "https://github.com/Xdzall",
  website: "https://www.seraprogrammer.com/dev/Nuzee",
  summary:
    "A Diploma student in Informatics Engineering at PENS. Passionate about frontend and backend application development, with a proven track record of building efficient, user-centered web applications.",
};

export const education = {
  institution: "Electronic Engineering Polytechnic Institute of Surabaya (PENS)",
  period: "2023 - Present",
  gpa: "3.56 / 4.0",
  degree: "Associate Degree Informatics Engineering (A.Md.Kom)",
};

export const experience = [
  {
    company: "PT Panasonic Manufacturing Indonesia",
    role: "Full Stack Developer",
    period: "Jul 2025 - Feb 2026",
    tech: ["C#", "ASP.NET MVC", "SQL Server", "HTML/CSS", "Bootstrap", "IIS"],
    points: [
      "Built a production monitoring dashboard with automated reporting, optimizing logic to prioritize real-time Target Unit data.",
      "Designed responsive UIs via Figma and implemented them with HTML, CSS, and Bootstrap.",
      "Developed business logic in C# and managed SQL Server databases for internal web applications.",
      "Handled IIS server configuration, deployment, and troubleshooting for production stability.",
    ],
  },
];

export const projects = [
  {
    name: "Money Tracker",
    role: "Full Stack Developer",
    period: "2026",
    description:
      "Personal finance tracker integrating Web Dashboard, Flutter mobile app, and Telegram Bot with real-time Excel synchronization. Features KPI cards, donut/bar charts, installment manager, and natural language input via Telegram.",
    tech: ["Python", "Flask", "Flutter", "Dart", "Telegram Bot API", "Docker"],
    github: "https://github.com/Xdzall/Money_Tracker",
    featured: true,
    points: [
      "Web dashboard with KPI cards, donut charts, and bar chart trends for 6-month cashflow.",
      "Telegram Bot with natural language input for quick expense/income recording on-the-go.",
      "Installment tracker with auto-progress bar and 1-click payment button synced to Excel.",
      "Flutter mobile app for cross-platform access with Docker containerized backend.",
    ],
  },
  {
    name: "Cinebox Website",
    role: "Full Stack Developer",
    period: "2026",
    description:
      "Netflix-clone streaming platform with Next.js & TypeScript. Features Top 10 IMDb rankings, multi-server streaming (6 servers), billboard hero with trailer autoplay, and mobile-first responsive design.",
    tech: ["Next.js", "TypeScript", "React", "IMDb API"],
    github: "https://github.com/Xdzall/Cinebox_Website",
    featured: true,
    points: [
      "Top 10 rankings with giant outlined typography and overlapping poster design from IMDb data.",
      "Smart multi-server streaming with 6 fallback servers for reliable playback.",
      "Billboard hero spotlight with auto-playing trailers and audio toggle controls.",
      "Mobile-first bottom navigation with persistent watch history and My List via localStorage.",
    ],
  },
  {
    name: "AutoChef",
    role: "Backend Developer",
    period: "2025 - Present",
    description:
      "Recipe recommendation app using NLP (TF-IDF + Cosine Similarity) to match user ingredients to relevant recipes. Backend in PHP with PostgreSQL.",
    tech: ["PHP", "PostgreSQL", "Docker", "NLP", "Linux Ubuntu"],
    github: "https://github.com/Xdzall/BackendAutoChef",
    live: "https://web.autochef.site",
    featured: true,
    points: [
      "NLP-based recommendation engine using TF-IDF and Cosine Similarity algorithms.",
      "Optimized PostgreSQL database merging user and recipe data efficiently.",
      "Deployed on Linux Ubuntu with Docker containerization.",
    ],
  },
  {
    name: "Web Monitoring System",
    role: "Full Stack Developer | PT Panasonic",
    period: "2025",
    description:
      "Production monitoring dashboard for tracking Target Unit metrics with automated daily reports. Built with ASP.NET MVC, deployed on IIS.",
    tech: ["C#", "ASP.NET MVC", "SQL Server", "HTML/CSS", "Bootstrap", "IIS"],
    github: "https://github.com/Xdzall/Panasonic_WebMonitoring",
    featured: true,
    points: [
      "Real-time production tracking dashboard with automated report generation.",
      "Optimized dashboard logic to prioritize latest Target Unit data over daily plan metrics.",
      "Full CRUD operations with SQL Server for production data management.",
    ],
  },
  {
    name: "Material Control System",
    role: "Full Stack Developer | PT Panasonic",
    period: "2025",
    description:
      "Internal material control application for ACBU division at Panasonic. Manages inventory tracking and material flow for production lines.",
    tech: ["C#", "ASP.NET MVC", "SQL Server", "HTML/CSS"],
    github: "https://github.com/Xdzall/Panasonic_MaterialControlAC",
    featured: false,
    points: [
      "Inventory tracking system for raw materials and components across production lines.",
      "Role-based access control for warehouse and production staff.",
      "Automated stock alerts and material request workflows.",
    ],
  },
];

export const skills = {
  languages: ["C#", "PHP", "JavaScript", "TypeScript", "Python", "Dart", "HTML", "CSS", "SQL"],
  databases: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis", "SQL Server"],
  frameworks: ["ASP.NET MVC", "Laravel", "React", "Next.js", "Flutter", "Flask", "Bootstrap", "Blade"],
  tools: ["GitHub", "Docker", "Docker Compose", "IIS", "Linux Ubuntu", "VPS", "S3 MinIO", "Postman", "Figma", "Git"],
  soft: [
    "Analytical Problem Solving",
    "Effective Communication",
    "Adaptability",
    "Time Management",
    "Teamwork",
    "Critical Thinking",
  ],
  languages_spoken: [
    { language: "Indonesian", level: "Fluent" },
    { language: "English", level: "Intermediate" },
  ],
};
