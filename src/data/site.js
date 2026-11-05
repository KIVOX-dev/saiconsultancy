export const CONTACT = {
  email: 'admin@saiconsultancy.in',
  phone: '+919087674688',
  phoneLabel: '+91 90876 74688',
}

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Who we are' },
  { to: '/what-we-do', label: 'What we do' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/job-seekers', label: 'Job Seekers' },
  { to: '/assistant', label: 'Assistant' },
  { to: '/contact', label: 'Contact Us' },
]

export const SERVICES = [
  { img: '/images/imagebox/1.jpg', title: 'Manpower Recruitment Consulting', to: '/contact', cta: 'Talk to us', desc: 'End-to-end hiring support for companies: sourcing, screening and interview coordination, backed by our network of 1,000+ HRs and 100+ CHROs & CXOs.' },
  { img: '/images/imagebox/2.jpg', title: 'Corporate & Executive Training', to: '/what-we-do', cta: 'See our programs', desc: 'Training needs analysis followed by need-based programmes in management and soft skills, delivered by working professionals.' },
  { img: '/images/imagebox/3.jpg', title: 'Graphic & Website Design', to: '/contact', cta: 'Request a quote', desc: 'Websites, brochures, book covers and branding for institutions and businesses, designed and delivered by our in-house team.' },
]

export const PARTNERS = [
  ['TNSKILL', 'TNSKILL'], ['ICTACADEMY', 'ICT Academy'], ['VANAKKAMHRD', 'Vanakkam HRD'],
  ['NAANMUDHALVAN', 'Naan Mudhalvan'], ['SKILLindia', 'Skill India'], ['tnskills', 'TN Technical Skill'],
]

const g = (folder, nums) => nums.map((n) => `/images/gallery/${folder}/gallery-${String(n).padStart(3, '0')}.jpeg`)

export const GALLERY = [
  { key: 'drive', label: 'Drives', images: g('drive', [1, 2, 3, 20, 22, 24]) },
  { key: 'session', label: 'Sessions', images: g('session', [11, 13, 14, 17]) },
  { key: 'newsfeed', label: 'News', images: g('newsfeed', [7, 8, 9, 10]) },
  { key: 'collabration', label: 'Collaborations', images: g('collabration', [4, 5, 6, 12, 16, 18, 19, 21, 23]) },
]

export const WHAT_WE_DO = [
  ['Soft Skills & Professional Behaviour', 'How students behave, communicate, and perform in real organizational environments.', ['Workplace communication & professional conduct', 'Team collaboration & accountability', 'Business etiquette & corporate discipline', 'Conflict handling & emotional intelligence', 'Time management, adaptability & ownership mindset']],
  ['Aptitude & Cognitive Skill Development', 'Cognitive and analytical abilities required for placements, competitive exams, and problem-solving roles.', ['Quantitative aptitude', 'Logical & analytical reasoning', 'Decision-making under time constraints', 'Data interpretation & pattern recognition']],
  ['Communicative English & Professional Language Skills', 'Functional English used in offices, interviews, and professional interactions.', ['Spoken English fluency', 'Professional vocabulary & clarity', 'Group discussions & presentations', 'Interview communication techniques']],
  ['Technical & Domain Skill Training', 'Industry-mapped technical readiness based on department, specialization, and industry expectations.', ['Applied technical concepts', 'Tool-based learning (where applicable)', 'Industry-relevant problem solving']],
  ['Job-Oriented & Role-Based Training Programs', 'Training students for specific job roles, not generic careers.', ['Role-specific skill sets', 'Workplace expectations & responsibilities', 'Interview patterns for specific roles', 'On-the-job behaviour simulation']],
  ['Value-Added & Personality Development Programs', 'Confidence, mindset, and professional identity through personal growth.', ['Confidence & self-awareness', 'Professional mindset & ethics', 'Stress management & adaptability', 'Leadership fundamentals']],
  ['Interview Readiness & Placement Preparation', 'From resume to final interview - fully covered.', ['Resume structuring & positioning', 'HR & technical interview preparation', 'Mock interviews (AI + trainer-led)', 'Placement readiness reporting']],
  ['Digital Workplace & Professional Technology Skills', 'Preparing students for modern, digital-first workplaces.', ['Professional email & documentation', 'Digital collaboration tools', 'Workplace technology etiquette', 'Productivity & organizational tools']],
  ['Career Guidance & Employability Mapping', 'Helping students choose and prepare for the right career path.', ['Career awareness & industry insights', 'Skill gap identification', 'Personalized improvement guidance', 'Long-term employability planning']],
  ['Government & Skill Development Programs', 'Structured training aligned with national skill initiatives.', ['Skill enhancement programs', 'Institutional & government projects', 'Standardized training frameworks']],
]

export const PROGRAM_ICONS = ['users', 'target', 'chat', 'code', 'briefcase', 'spark', 'mic', 'laptop', 'compass', 'flag']

export const OUR_SERVICES =['Soft Skills Training', 'Aptitude Training', 'Technical Training', 'Job Oriented Courses', 'Value Added Program', 'Communicative English Training', 'CXO Talks', 'Coffee Table Conversation', 'HR Conclave', 'PR Media', 'Industry Visits', 'Job Fair', 'Placement Support', 'Training - Company Orientation', 'National & International Company MOU', 'COE Set up (End to End)']
