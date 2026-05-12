/**
 * ============================================================
 * SITE CONFIGURATION
 * ============================================================
 * This is the central configuration file for the entire website.
 * To customize this site for your own use, update the values below.
 *
 * See CUSTOMIZATION.md in the project root for a detailed guide.
 * ============================================================
 */

// ---------------------
// Personal Information
// ---------------------

export const siteConfig = {
  /** Your full name */
  name: 'Urip Yoga Pangestu',

  /** Your job title / tagline shown in hero and SEO */
  jobTitle: 'Full Stack Web Developer',

  /** Short bio displayed in the hero section */
  bio: "Hello! I'm Urip Yoga Pangestu, a 8th semester Information Systems student at Telkom University Purwokerto who loves challenges, web development enthusiast, and always open to learning new things.",

  /** Your country / location */
  location: 'Purwokerto, Indonesia',

  /** Your email address */
  email: 'irip.yoga@gmail.com',

  /** Greeting sequence for the hero typing animation ([text, delay, text, delay, ...]) */
  greetings: ['Halo', 1000, 'Hello!', 1000, 'Hola!', 1000, 'Bonjour!', 1000] as (
    | string
    | number
  )[],
};

// ---------------------
// URLs & Social Links
// ---------------------

export const siteUrls = {
  /** Base URL of the deployed site (no trailing slash) */
  baseUrl: 'https://portofoliobaru-bay.vercel.app/',

  /** Your GitHub profile URL */
  github: 'https://github.com/timurlauttt',

  /** Your LinkedIn profile URL */
  linkedin: 'https://www.linkedin.com/in/urip-yoga-pangestu-65a541231/',

  email : 'mailto:irip.yoga@gmail.com',

  /** Your Twitter/X handle (with @) — used in SEO meta tags */
  twitterHandle: '@__timurlauttt',

  /** Your blog URL (shown in navbar & footer) */
  blog: 'https://astro-blog-my-portofolio-guwa.vercel.app/',
};

// ---------------------
// Navigation Links
// ---------------------

export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#journey', label: 'Journey' },
  { href: '#projects', label: 'Projects' },
  { href: siteUrls.blog, label: 'Blogs' },
];

// ---------------------
// Skills (Hero Marquee & Features Section)
// ---------------------

export interface Skill {
  /** Display name */
  text: string;
  /**
   * Icon identifier — one of the react-icons keys.
   * The component maps this string to an actual icon.
   * Supported values: 'SiArcgis', 'SiQgis', 'SiOpenlayers', 'SiLeaflet',
   * 'SiPython', 'SiJavascript', 'SiTypescript', 'SiAngular',
   * 'SiPostgresql', 'SiGit', 'SiDocker', 'SiKubernetes',
   * 'SiArgo', 'SiApacheairflow', 'SiOsgeo'
   */
  icon: string;
}

export const skills: Skill[] = [
  { text: 'HTML5', icon: 'SiHtml5' },
  { text: 'CSS3', icon: 'SiCss3' },
  { text: 'JavaScript(ES6+)', icon: 'SiJavascript' },
  { text: 'Laravel', icon: 'SiLaravel' },
  { text: 'Django', icon: 'SiDjango' },
  { text: 'React.js', icon: 'SiReact' },

  { text: 'MySQL', icon: 'SiMysql' },
  { text: 'Git', icon: 'SiGit' },
  { text: 'PHP', icon: 'SiPhp' },
  { text: 'Python', icon: 'SiPython' },
  { text: 'Bootstrap', icon: 'SiBootstrap' },
  { text: 'Tailwind CSS', icon: 'SiTailwindcss' },
];

// ---------------------
// Projects
// ---------------------

export interface Project {
  title: string;
  description: string;
  /** List of technology names shown as badges */
  tech: string[];
  /** GitHub repository URL */
  github: string;
  /** Live demo URL */
  live: string;
  /**
   * Image filename inside src/media/ (e.g. 'digipin.jpeg').
   * You must also add the actual image file to that folder.
   * The component will import it dynamically.
   */
  image: string;
}

export const projects: Project[] = [
  {
    title: 'lowcosthost.id',
    description:  
      'This is my start-up project with my friends—a start-up operating in the shared hosting sector that enables people from all backgrounds, especially students, to deploy their projects at an affordable price while maintaining security',
    tech: ['Openlayers', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/ronitjadhav/digipin-openlayers',
    live: 'https://digipin.maplabs.tech',
    image: 'digipin.jpeg',
  },
  {
    title: 'QGIS Hub Plugin',
    description:
      'Developed at Camptocamp with help from Ismail Sunni, this plugin allows QGIS users to easily browse and add resources from the QGIS Hub directly into their projects. It supports grid and list views, search, and filtering by resource type.',
    tech: ['Python', 'Qt', 'QGIS'],
    github: 'https://github.com/qgis/QGIS-Hub-Plugin',
    live: 'https://plugins.qgis.org/plugins/qgis_hub_plugin/',
    image: 'QGIS-Banner.jpg',
  },
  {
    title: 'Openlayers Benchmark',
    description:
      'Developed at Camptocamp as part of my internship, this project helps to benchmark the performance of WebGL and Canvas rendering in Openlayers. It includes a variety of tests and visualizations to compare the rendering speed of different layers.',
    tech: ['Openlayers', 'TypeScript'],
    github: 'https://github.com/openlayers/bench',
    live: 'https://openlayers.org/bench/',
    image: 'olBench.png',
  },
];

// ---------------------
// About Me Cards
// ---------------------

export interface AboutCard {
  title: string;
  description: string;
  /** SVG filename inside src/media/svgs/ (e.g. 'Character1.svg') */
  image: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
}

export const aboutCards: AboutCard[] = [
  {
    title: 'About Me',
    description:
      'I am a 7th semester Information Systems student who likes challenges, is enthusiastic about web development, and is always open to learning new things.',
    image: 'Character1.svg',
    imageAlt: 'Character1',
    imagePosition: 'right',
  },
  {
    title: 'Web Development',
    description:
      'I have hands-on experience in developing websites using PHP-based frameworks such as Laravel and CodeIgniter, as well as Python-based frameworks like Django. I also have a solid foundation in React.js for building modern and interactive front-end interfaces.',
    image: 'Character2.svg',
    imageAlt: 'Character2',
    imagePosition: 'left',
  },
  {
    title: 'Interest in Technology',
    description:
      'Technology has fascinated me since I was young, especially the joy of building things. Combining tech with hands-on creation has always felt just right for me.',
    image: 'Character3.svg',
    imageAlt: 'Character3',
    imagePosition: 'right',
  },
  {
    title: 'Other Hobbies',
    description:
      'Here are some of my other passions: I like to dance, play chess, love watching F1, and am a Potterhead.',
    image: 'Character4.svg',
    imageAlt: 'Character4',
    imagePosition: 'left',
  },
];

// ---------------------
// Journey Timeline
// ---------------------

export interface TimelineEntry {
  id: number;
  title: string;
  date: string;
  description: string;
  /** [longitude, latitude] */
  location: [number, number];
  locationName: string;
  popupTitle: string;
  popupDescription: string;
}

export const timelineData: TimelineEntry[] = [
  {
    id: 1,
    title: 'Web Developer',
    date: 'Oct 2024 - Present',
    description:
      'Custom GIS dashboards, and contributing to QGIS plugins. Diving into Docker, web GIS, and everything open-source!',
    location: [109.2332, -7.4246], // Purwokerto coordinates
    locationName: 'Purwokerto, Indonesia',
    popupTitle: 'Freelance / Remote',
    popupDescription:
      'Working remotely from Purwokerto, building geospatial solutions and exploring the power of QGIS.',
  },
];

// ---------------------
// SEO & Metadata
// ---------------------

export const seoConfig = {
  /** Default page title */
  title: 'Urip Yoga Pangestu - Full Stack Web Developer',

  /** Title template for sub-pages (%s is replaced by the page title) */
  titleTemplate: '%s | Urip Yoga Pangestu',

  /** Meta description */
  description:
    "Based in Purwokerto, I'm a Full Stack Web Developer and Software Engineer specializing in maps, data visualization, and web technologies. Expert in React, Next.js, Node.js, Python, and JavaScript.",
  /** SEO keywords */
  keywords: [
    'Full Stack Web Developer',
    'Software Engineer',
    'Purwokerto',
    'Web Development',
    'Laravel',
    'Django',
    'PHP',
    'React',
    'Next.js',
    'Node.js',
    'Python',

  ],

  /** Open Graph image URL (absolute URL) */
  ogImage: '@/media/up.png',

  /** Site name for Open Graph */
  siteName: 'Urip Yoga Pangestu Portfolio',

  /** Google Verification code (optional) */
  googleVerification: 'your-google-verification-code',
};

// ---------------------
// Footer
// ---------------------

export const footerConfig = {
  /** Left-side copyright text — {year} will be replaced at runtime */
  copyrightText: '{name} | Built with ❤ & ☕',

  /** Right-side tech badge text */
  techBadge: '</> with Next.js + Tailwind',
};
