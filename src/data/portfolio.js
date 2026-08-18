export const profile = {
  name: 'Mohamed Imran H',
  tagline: 'trains models. ships products.',
  summary:
    'AI/ML enthusiast with hands-on experience in predictive modeling, Flask deployment, REST API integration, and MERN-stack development — building data-driven applications that turn raw datasets into decisions.',
  strengths: [
    'Problem Solving',
    'Leadership',
    'Project & Time Management',
    'Team Collaboration',
    'Communication',
  ],
};

export const skills = [
  {
    category: 'Programming',
    proficiency: 92,
    tools: ['Python', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    category: 'Machine Learning',
    proficiency: 88,
    tools: [
      'Scikit-Learn',
      'Pandas',
      'NumPy',
      'Seaborn',
      'Matplotlib',
      'Predictive Modeling',
    ],
  },
  {
    category: 'Web Development',
    proficiency: 85,
    tools: ['React', 'Node.js', 'Express.js', 'Flask', 'Bootstrap', 'jQuery'],
  },
  {
    category: 'Databases & Tools',
    proficiency: 80,
    tools: ['MongoDB', 'NoSQL', 'SQL', 'Git', 'GitHub', 'VS Code'],
  },
];

export const experience = [
  {
    title: 'Sentiment Analysis Suite',
    tech: 'Python / Flask',
    description:
      'Developed a real-time sentiment analysis web app delivering instant predictions.',
  },
  {
    title: 'Model Optimization',
    tech: 'Logistic Regression',
    description:
      'Built and optimized a data preprocessing pipeline with hyperparameter tuning, achieving a +15% accuracy gain.',
  },
  {
    title: 'REST API Deployment',
    tech: 'FastAPI / Express',
    description:
      'Deployed the ML model via REST APIs, boosting backend integration and performance by +10%.',
  },
  {
    title: 'Agile & Collaboration',
    tech: 'Technical Reviews',
    description:
      'Maintained code quality and documentation through Agile-based technical reviews.',
  },
];

export const projects = [
  {
    name: 'CardioGuard',
    subtitle: 'AI-Powered CVD Risk Prediction System',
    stack: ['Flutter', 'FastAPI', 'Scikit-Learn', 'Next.js', 'Supabase'],
    description:
      'Built a cross-platform digital health app (Android + Web) using a Gradient Boosting Classifier trained on 70,000 patient records, delivering real-time cardiovascular risk predictions via FastAPI REST APIs with sub-100ms latency.',
    details:
      'Engineered a full-stack system with Flutter (mobile), Next.js (web), and Supabase PostgreSQL, featuring OTP authentication, cross-device prediction history sync, and animated risk visualizations with personalized health recommendations.',
    metrics: ['70,000 patient records', 'sub-100ms latency', 'Gradient Boosting'],
    link: 'https://cardioguard-website.vercel.app/',
  },
  {
    name: 'Regression Models',
    subtitle: 'Machine Learning Regression Suite',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy'],
    description:
      'Built Logistic and Linear Regression models predicting Titanic survival and vehicle fuel efficiency, using feature engineering and cross-validation.',
    details:
      'Processed missing data and categorical variables with Pandas; evaluated performance via confusion matrices and Seaborn visualizations.',
    metrics: ['79% accuracy', 'Cross-validated'],
    link: null,
  },
  {
    name: 'AIMusics',
    subtitle: 'AI-Powered Music Streaming Platform',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Cloudinary'],
    description:
      'Developed a full-stack MERN music streaming app with a mobile-responsive UI, dynamic routing, and an integrated custom audio player with global state management.',
    details:
      'Built a secure, scalable Express.js/MongoDB backend with JWT authentication and Cloudinary for optimized media storage and delivery.',
    metrics: ['+5% user retention', 'MERN stack', 'Audio Playback'],
    link: 'https://ai-musics-kujy.vercel.app/',
  },
  {
    name: 'Edu Notify',
    subtitle: 'Student Grade Processor & Notification System',
    stack: ['React', 'Node.js', 'C++', 'Brevo API', 'whatsapp-web.js'],
    description:
      'Built an educational platform with CSV-based student data upload, a high-performance C++ grade processor, and an interactive analytics dashboard.',
    details:
      'Engineered automated email and WhatsApp notifications for Parent-Teacher Meeting invites using the Brevo API and Puppeteer with QR-code authentication.',
    metrics: ['C++ grade processor', 'WhatsApp & Email API', 'Full-stack'],
    link: 'https://edu-notify-phi.vercel.app/',
  },
  {
    name: 'GenieBuilder v4',
    subtitle: 'AI Recruitment & Interview Platform',
    stack: ['React', 'FastAPI', 'MongoDB', 'spaCy', 'scikit-learn'],
    description:
      'Built an AI-driven recruitment platform with an adaptive interview simulator, automated resume ranking, and comprehensive gap analysis for candidate evaluation.',
    details:
      'Engineered a split-stack architecture with FastAPI, JWT authentication, and NLP parsing tools to achieve multi-criteria applicant scoring.',
    metrics: ['Automated resume ranking', 'Multi-criteria scoring', 'Adaptive interviews'],
    link: 'https://geniebuilder.vercel.app/',
  },
];

export const education = [
  {
    degree: 'B.E. in Computer Science and Engineering',
    institution: 'Nellai College of Engineering, Tirunelveli (Anna University)',
    period: '2022–2026',
  },
  {
    degree: 'HSC',
    institution: 'Carol Matric Hr. Sec. School, Kanyakumari (Tamil Nadu State Board)',
    period: '2022',
  },
];

export const achievements = [
  'Won 2nd prize in a paper presentation on Neural Coding & AI',
  'Presented ML and full-stack projects at college-level technical events',
  'Building full-stack web applications using the MERN stack',
];

export const contact = {
  email: 'habeebpvt.ltd@gmail.com',
  linkedin: 'https://linkedin.com/in/mohamed-imran-h/',
  github: 'https://github.com/imranpycode',
  phone: '+91 63816 59763',
};

export const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];
