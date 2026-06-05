import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Project from './models/Project.js';
import BlogPost from './models/BlogPost.js';
import GalleryImage from './models/GalleryImage.js';
import Faq from './models/Faq.js';
import Partner from './models/Partner.js';
import TeamMember from './models/TeamMember.js';
import Admin from './models/Admin.js';

dotenv.config();

const projects = [
  {
    slug: "education-for-all",
    title: "Education for All",
    category: "Education",
    imageUrl: "/uploads/education.jpg",
    shortDesc: "Supporting access to quality education for children and communities.",
    description: "Providing access to quality education for children in underserved communities across Afghanistan. Our programs include school supplies, teacher training, and community learning centers.",
    impact: "5,000+ students supported since 2017",
    fullDescription: "Our Education for All program works to break the cycle of poverty through learning. We establish community-based classrooms, train local teachers, provide school supplies, and run literacy campaigns for children who have never attended school. Special focus is given to girls' education, ensuring they have equal opportunities to learn and thrive.",
    stats: [
      { label: "Students Supported", value: "5,000+" },
      { label: "Teachers Trained", value: "200+" },
      { label: "Schools Supported", value: "25+" },
      { label: "Provinces", value: "4" },
    ],
    objectives: [
      "Increase access to primary and secondary education for out-of-school children",
      "Improve quality of teaching through professional development programs",
      "Provide learning materials and infrastructure support to community schools",
      "Promote girls' education and reduce gender disparities in enrollment",
    ],
  },
  {
    slug: "womens-health-initiative",
    title: "Women's Health Initiative",
    category: "Health",
    imageUrl: "/uploads/health.jpg",
    shortDesc: "Improving access to essential healthcare for vulnerable populations.",
    description: "Improving maternal and reproductive health outcomes through mobile health clinics, awareness campaigns, and training for community health workers in remote areas.",
    impact: "12,000+ women reached with health services",
    fullDescription: "The Women's Health Initiative delivers essential healthcare services to women in remote and underserved areas of Afghanistan. Through mobile health clinics, community health worker training, and awareness campaigns, we address maternal mortality, reproductive health, and nutrition. Our approach combines direct service delivery with community education to create lasting health improvements.",
    stats: [
      { label: "Women Reached", value: "12,000+" },
      { label: "Mobile Clinics", value: "40+" },
      { label: "Health Workers Trained", value: "150+" },
      { label: "Villages Reached", value: "60+" },
    ],
    objectives: [
      "Reduce maternal and infant mortality in target communities",
      "Increase access to reproductive health services and family planning",
      "Train and deploy community health workers in remote areas",
      "Raise awareness about nutrition, hygiene, and disease prevention",
    ],
  },
  {
    slug: "economic-empowerment",
    title: "Economic Empowerment Program",
    category: "Livelihood",
    imageUrl: "/uploads/empowerment.jpg",
    shortDesc: "Supporting livelihoods and skills development for women.",
    description: "Empowering women through vocational training, small business grants, and financial literacy programs. Helping women build sustainable incomes and achieve economic independence.",
    impact: "800+ women trained in marketable skills",
    fullDescription: "Our Economic Empowerment Program equips women with the skills, knowledge, and resources they need to build sustainable livelihoods. Participants receive vocational training in fields such as tailoring, handicrafts, food processing, and small business management. Graduates receive startup kits and ongoing mentorship to launch their own enterprises.",
    stats: [
      { label: "Women Trained", value: "800+" },
      { label: "Businesses Started", value: "300+" },
      { label: "Vocational Courses", value: "6" },
      { label: "Avg. Income Increase", value: "60%" },
    ],
    objectives: [
      "Provide market-relevant vocational skills training to women",
      "Facilitate access to small grants and startup capital",
      "Offer financial literacy and business management training",
      "Create peer support networks for women entrepreneurs",
    ],
  },
  {
    slug: "emergency-relief",
    title: "Emergency Relief & Response",
    category: "Humanitarian",
    imageUrl: "/uploads/relief.jpg",
    shortDesc: "Delivering life-saving assistance to families in crisis.",
    description: "Delivering life-saving assistance including food, clean water, and shelter to families affected by conflict, natural disasters, and displacement across Afghanistan.",
    impact: "20,000+ people reached with emergency aid",
    fullDescription: "In times of crisis, PWSO's Emergency Relief & Response team mobilizes quickly to deliver life-saving assistance. We distribute food packages, clean water, hygiene kits, and shelter materials to families displaced by conflict or affected by natural disasters.",
    stats: [
      { label: "People Reached", value: "20,000+" },
      { label: "Food Distributions", value: "8,000+" },
      { label: "Hygiene Kits", value: "5,000+" },
      { label: "Emergency Responses", value: "12" },
    ],
    objectives: [
      "Provide immediate food and non-food assistance to crisis-affected families",
      "Ensure access to clean water and sanitation in emergency settings",
      "Distribute shelter materials to displaced households",
      "Coordinate with humanitarian clusters for effective response",
    ],
  },
  {
    slug: "agriculture-climate-resilience",
    title: "Agriculture & Climate Resilience",
    category: "Environment",
    imageUrl: "/uploads/agriculture.jpg",
    shortDesc: "Building food security and adapting to climate change.",
    description: "Supporting farmers with climate-smart agriculture techniques, drought-resistant seeds, and irrigation projects to build food security.",
    impact: "2,000+ farming families supported",
    fullDescription: "Our Agriculture & Climate Resilience program helps farming communities adapt to drought, water scarcity, and changing weather patterns. We introduce climate-smart agriculture techniques, provide drought-resistant seeds, and support small-scale irrigation projects.",
    stats: [
      { label: "Farming Families", value: "2,000+" },
      { label: "Irrigation Projects", value: "15" },
      { label: "Training Sessions", value: "80+" },
      { label: "Crop Yield Increase", value: "40%" },
    ],
    objectives: [
      "Promote climate-smart agriculture and sustainable farming practices",
      "Improve water management through efficient irrigation systems",
      "Strengthen food security for vulnerable rural communities",
      "Build community capacity to adapt to climate change impacts",
    ],
  },
  {
    slug: "research-meal",
    title: "Research & MEAL",
    category: "Research",
    imageUrl: "/uploads/research.jpg",
    shortDesc: "Evidence-based research and program evaluation.",
    description: "Conducting evidence-based research, assessments, and evaluations to inform program design and ensure accountability.",
    impact: "15+ research studies completed",
    fullDescription: "PWSO's Research, Monitoring, Evaluation, Accountability & Learning (MEAL) unit ensures that our programs are evidence-based, effective, and accountable. We conduct baseline assessments, mid-term evaluations, and end-line studies to measure impact.",
    stats: [
      { label: "Research Studies", value: "15+" },
      { label: "Assessments Completed", value: "30+" },
      { label: "Communities Surveyed", value: "100+" },
      { label: "Reports Published", value: "20+" },
    ],
    objectives: [
      "Generate evidence to inform program design and policy advocacy",
      "Monitor and evaluate program effectiveness and impact",
      "Ensure accountability to beneficiaries, donors, and partners",
      "Contribute to the humanitarian evidence base in Afghanistan",
    ],
  },
];

const blogPosts = [
  {
    title: "PWSO Launches New Education Program in Balkh Province",
    slug: "pwso-launches-education-program-balkh",
    excerpt: "Our new initiative brings learning materials and teacher training to over 1,000 children in rural Balkh.",
    imageUrl: "/uploads/education.jpg",
    date: "May 15, 2026",
    category: "Education",
  },
  {
    title: "Women's Health Clinic Reaches 500 Patients in First Quarter",
    slug: "womens-health-clinic-500-patients",
    excerpt: "PWSO's mobile health clinic provided essential maternal health services to 500 women across three districts.",
    imageUrl: "/uploads/health.jpg",
    date: "April 28, 2026",
    category: "Health",
  },
  {
    title: "Economic Empowerment Workshop Graduates 120 Women",
    slug: "economic-empowerment-workshop-120-women",
    excerpt: "120 women completed vocational training and received startup kits to begin their own enterprises.",
    imageUrl: "/uploads/empowerment.jpg",
    date: "March 10, 2026",
    category: "Empowerment",
  },
  {
    title: "Emergency Relief Distribution Reaches 2,000 Families",
    slug: "emergency-relief-2000-families",
    excerpt: "In partnership with UN agencies, PWSO distributed food and hygiene kits to displaced families in Kabul.",
    imageUrl: "/uploads/relief.jpg",
    date: "February 5, 2026",
    category: "Humanitarian",
  },
  {
    title: "Research Report: Gender-Based Violence Awareness in Afghanistan",
    slug: "research-gbv-awareness-afghanistan",
    excerpt: "Our latest study examines awareness levels and access to support services for GBV survivors in four provinces.",
    imageUrl: "/uploads/research.jpg",
    date: "January 18, 2026",
    category: "Research",
  },
  {
    title: "Climate Resilience Project Helps Farmers Adapt to Drought",
    slug: "climate-resilience-farmers-drought",
    excerpt: "PWSO trained 600 farmers in drought-resistant techniques and provided improved seeds for the growing season.",
    imageUrl: "/uploads/agriculture.jpg",
    date: "December 12, 2025",
    category: "Agriculture",
  },
];

const galleryImages = [
  { imageUrl: "/uploads/community.jpg", caption: "Community outreach program in rural Afghanistan", sortOrder: 1 },
  { imageUrl: "/uploads/education.jpg", caption: "Education support for children", sortOrder: 2 },
  { imageUrl: "/uploads/health.jpg", caption: "Health awareness campaign", sortOrder: 3 },
  { imageUrl: "/uploads/empowerment.jpg", caption: "Women empowerment workshop", sortOrder: 4 },
  { imageUrl: "/uploads/relief.jpg", caption: "Emergency relief distribution", sortOrder: 5 },
  { imageUrl: "/uploads/training.jpg", caption: "Vocational training session", sortOrder: 6 },
  { imageUrl: "/uploads/research.jpg", caption: "Field research and assessment", sortOrder: 7 },
  { imageUrl: "/uploads/community.jpg", caption: "Community gathering", sortOrder: 8 },
  { imageUrl: "/uploads/education.jpg", caption: "School supply distribution", sortOrder: 9 },
  { imageUrl: "/uploads/agriculture.jpg", caption: "Agricultural training program", sortOrder: 10 },
  { imageUrl: "/uploads/health.jpg", caption: "Mobile health clinic", sortOrder: 11 },
  { imageUrl: "/uploads/team.jpg", caption: "Team visit to project site", sortOrder: 12 },
];

const faqs = [
  { question: "What is PWSO and what does it do?", answer: "The Poor Women Support Organization (PWSO) is a non-profit, non-governmental organization established in 2017 and registered with Afghanistan's Ministry of Economy. We work across education, health, economic empowerment, agriculture, and research.", sortOrder: 1 },
  { question: "How can I donate to PWSO?", answer: "You can donate via bank transfer, mobile money, or in-kind contributions. Visit our Donate page for full details including bank account information.", sortOrder: 2 },
  { question: "How are donations used?", answer: "Donations directly fund our programs in education, health, economic empowerment, and emergency relief. We maintain transparent financial reporting.", sortOrder: 3 },
  { question: "How can I volunteer with PWSO?", answer: "We welcome volunteers with relevant skills and experience. Please reach out through our Contact page or email info@pwso.org.", sortOrder: 4 },
  { question: "Where does PWSO operate?", answer: "PWSO operates across multiple provinces in Afghanistan, focusing on underserved communities with the greatest need.", sortOrder: 5 },
  { question: "Can I sponsor a specific program or project?", answer: "Yes. We welcome targeted support for specific programs. Contact partnerships@pwso.org to discuss.", sortOrder: 6 },
];

const partners = [
  { name: "OCHA", logoUrl: "/uploads/ocha.png", description: "Office for the Coordination of Humanitarian Affairs. Supporting coordinated humanitarian response across Afghanistan.", sortOrder: 1 },
  { name: "UN Women", logoUrl: "/uploads/un-women.png", description: "United Nations entity dedicated to gender equality and the empowerment of women and girls.", sortOrder: 2 },
  { name: "UNDP", logoUrl: "/uploads/undp.png", description: "United Nations Development Programme. Partnering for sustainable development and poverty reduction.", sortOrder: 3 },
];

const teamMembers = [
  { name: "Ehsan Mohammadzai", role: "Founder & Executive Director", imageUrl: "/uploads/avatar.png", bio: "Ehsan founded PWSO in 2017 with a vision to empower Afghan women and communities. With over a decade of experience in humanitarian program management.", sortOrder: 1 },
  { name: "Zarmina Haidari", role: "Program Manager", imageUrl: "/uploads/avatar.png", bio: "Zarmina oversees the planning and execution of PWSO's programs across education, health, and economic empowerment.", sortOrder: 2 },
  { name: "Ahmad Naveed", role: "Finance & Admin Officer", imageUrl: "/uploads/avatar.png", bio: "Ahmad manages the financial operations and administrative systems of PWSO, ensuring transparency and accountability.", sortOrder: 3 },
  { name: "Fatima Ahmadi", role: "MEAL Officer", imageUrl: "/uploads/avatar.png", bio: "Fatima leads Monitoring, Evaluation, Accountability, and Learning initiatives across all sectors.", sortOrder: 4 },
  { name: "Mohammad Sharif", role: "Health Program Coordinator", imageUrl: "/uploads/avatar.png", bio: "Mohammad coordinates PWSO's health initiatives, focusing on reproductive health and community health awareness.", sortOrder: 5 },
  { name: "Lailuma Noori", role: "Women Empowerment Officer", imageUrl: "/uploads/avatar.png", bio: "Lailuma works directly with women in communities, facilitating skills training and economic opportunity programs.", sortOrder: 6 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      Project.deleteMany({}),
      BlogPost.deleteMany({}),
      GalleryImage.deleteMany({}),
      Faq.deleteMany({}),
      Partner.deleteMany({}),
      TeamMember.deleteMany({}),
      Admin.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    const hashedPassword = await bcrypt.hash('pwso123', 10);
    await Promise.all([
      Project.insertMany(projects),
      BlogPost.insertMany(blogPosts),
      GalleryImage.insertMany(galleryImages),
      Faq.insertMany(faqs),
      Partner.insertMany(partners),
      TeamMember.insertMany(teamMembers),
      Admin.create({ username: 'pwso', password: hashedPassword }),
    ]);
    console.log('Seed data inserted successfully');

    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
