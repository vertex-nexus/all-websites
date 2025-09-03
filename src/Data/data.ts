// src/components/OurServices/data.ts
export interface Service {
  icon: string;
  title: string;
  desc: string;
}

export interface SocialLink {
  icon: string;
  url: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials: SocialLink[];
}

export interface Testimonial {
  text: string;
  author: string;
}

export const servicesData: Service[] = [
  { icon: '☁️', title: 'Cloud Infrastructure', desc: 'Reliable and scalable cloud solutions.' },
  { icon: '🤖', title: 'AI & Machine Learning', desc: 'AI-driven insights for your business.' },
  { icon: '🛡️', title: 'Cybersecurity', desc: 'Protecting your data and systems.' },
  { icon: '⚡', title: 'High Performance', desc: 'Optimized platforms for growth.' },
  { icon: '🎨', title: 'UX/UI Design', desc: 'Creating intuitive and engaging user experiences.' },
  { icon: '📱', title: 'Mobile App Development', desc: 'Building custom mobile applications for iOS and Android.' },
];

export const teamData: TeamMember[] = [
  {
    name: 'Vaibhav',
    role: 'Marketing Head',
    image: '/team/neha.jpg',
    socials: [
      { icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
      { icon: 'fab fa-twitter', url: 'https://twitter.com' }
    ]
  },
  {
    name: 'Shubham Kunwar',
    role: 'Lead Developer',
    image: '/team/kunwar.jpg',
    socials: [
      { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/shubham-kunwar-90ba441ba/' },
      { icon: 'fab fa-github', url: 'https://github.com/Shubhamkunwar10' }
    ]
  },
  {
    name: 'Devansh',
    role: 'Senior Sales Manager',
    image: '/team/Devansh.jpeg',
    socials: [
      { icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
      { icon: 'fab fa-twitter', url: 'https://twitter.com' }
    ]
  },
  {
    name: 'Ananya Sharma',
    role: 'UI/UX Lead',
    image: '/team/Ananya.png',
    socials: [
      { icon: 'fab fa-dribbble', url: 'https://dribbble.com' },
      { icon: 'fab fa-behance', url: 'https://behance.net' }
    ]
  },
];

export const testimonialsData: Testimonial[] = [
  { text: 'Amazing service! Helped us scale our platform seamlessly.', author: 'Rajesh K.' },
  { text: 'Their AI solutions transformed our business operations.', author: 'Sneha P.' },
  { text: 'Highly professional and reliable team.', author: 'Vikram S.' },
  { text: 'We achieved great results thanks to their expert guidance.', author: 'Ayesha M.' },
];

export const whatsappNumber = '919310739038';
