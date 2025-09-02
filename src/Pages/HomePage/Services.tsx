import React, { useState, useMemo } from 'react';
import { useTheme } from "@mui/material/styles";
import OurPortfolio from './Portfolio';
import { tokens } from '../../layout/Theme/themes'; 

interface Service {
  icon: string;
  title: string;
  desc: string;
}

interface SocialLink {
  icon: string;
  url: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials: SocialLink[];
}

interface Testimonial {
  text: string;
  author: string;
}

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const servicesData: Service[] = [
  { icon: '☁️', title: 'Cloud Infrastructure', desc: 'Reliable and scalable cloud solutions.' },
  { icon: '🤖', title: 'AI & Machine Learning', desc: 'AI-driven insights for your business.' },
  { icon: '🛡️', title: 'Cybersecurity', desc: 'Protecting your data and systems.' },
  { icon: '⚡', title: 'High Performance', desc: 'Optimized platforms for growth.' },
  { icon: '🎨', title: 'UX/UI Design', desc: 'Creating intuitive and engaging user experiences.' },
  { icon: '📱', title: 'Mobile App Development', desc: 'Building custom mobile applications for iOS and Android.' },
];

const teamData: TeamMember[] = [
  {
    name: 'Vaibhav',
    role: 'Marketing Head', // Simpler than Head of Marketing
    image: '/team/neha.jpg',
    socials: [
      { icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
      { icon: 'fab fa-twitter', url: 'https://twitter.com' }
    ]
  },
  {
    name: 'Shubham Kunwar',
    role: 'Lead Developer', // Keeping strong but friendly
    image: '/team/kunwar.jpg',
    socials: [
      { icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/shubham-kunwar-90ba441ba/' },
      { icon: 'fab fa-github', url: 'https://github.com/Shubhamkunwar10' }
    ]
  },
  {
    name: 'Devansh',
    role: 'Senior Sales Manager', // Short and startup-friendly
    image: '/team/Devansh.jpeg',
    socials: [
      { icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
      { icon: 'fab fa-twitter', url: 'https://twitter.com' }
    ]
  },
  {
    name: 'Ananya Sharma',
    role: 'UI/UX Lead', // Startup tone for design
    image: '/team/Ananya.png',
    socials: [
      { icon: 'fab fa-dribbble', url: 'https://dribbble.com' },
      { icon: 'fab fa-behance', url: 'https://behance.net' }
    ]
  },
];


const testimonialsData: Testimonial[] = [
  { text: 'Amazing service! Helped us scale our platform seamlessly.', author: 'Rajesh K.' },
  { text: 'Their AI solutions transformed our business operations.', author: 'Sneha P.' },
  { text: 'Highly professional and reliable team.', author: 'Vikram S.' },
  { text: 'We achieved great results thanks to their expert guidance.', author: 'Ayesha M.' },
];

const whatsappNumber = '919310739038';

const OurServices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [services] = useState<Service[]>(servicesData);
  const [team] = useState<TeamMember[]>(teamData);
  const [testimonials] = useState<Testimonial[]>(testimonialsData);
  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const whatsappLinkDirect = useMemo(() => {
    const encodedMessage = encodeURIComponent("Hello! I'm interested in your services.");
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  }, []);

  const resetForm = () => {
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.message) {
      let messageBody = `New inquiry from the website:\n\nName: ${contactForm.name}`;
      if (contactForm.email) {
        messageBody += `\nEmail: ${contactForm.email}`;
      }
      if (contactForm.subject) {
        messageBody += `\nSubject: ${contactForm.subject}`;
      }
      messageBody += `\nMessage: ${contactForm.message}`;

      const encodedMessage = encodeURIComponent(messageBody);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
      resetForm();
    }
  };

  return (
    <main
      className="home-sections mx-auto"
      style={{
      }}
    >
      {/* Services Section */}
      <section id="services" className="py-8 md:py-12 px-2 md:px-4">
        <h2
          className="section-title text-center text-[clamp(1.5rem,6vw,2.8rem)] font-black mb-6"
          style={{
            WebkitBackgroundClip: 'text',
            color: colors.secondary[500]
          }}
        >
          Our Services 💡
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-[80vw] mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card w-full p-8 text-center rounded-[20px] transition-all duration-300 ease-in-out hover:translate-y-[-5px]"
              style={{
                backgroundColor: `${colors.blueAccent[900]}99`,
                border: `1px solid ${colors.secondary[300]}55`,
                color: colors.grey[100],
                boxShadow: '0 0 0 transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 30px ${colors.secondary[500]}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 transparent';
              }}
            >
              <div className="text-[2.5rem] mb-4">
                <span>{service.icon}</span>
              </div>
              <h3 className="font-bold text-xl mb-2">{service.title}</h3>
              <p style={{ color: colors.grey[300] }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <OurPortfolio />

      {/* Team Section */}
      <section id="team" className="py-8 md:py-12 px-2 md:px-4">
        <h2
          className="section-title text-center text-[clamp(1.5rem,6vw,2.8rem)] font-black mb-6"
          style={{
            WebkitBackgroundClip: 'text',
            color: colors.secondary[500]
          }}
        >
          Meet Our Team 👋
        </h2>
        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center max-w-[80vw] mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="team-card w-full text-center rounded-[20px] overflow-hidden relative transition-transform duration-300 ease-in-out hover:translate-y-[-5px]"
              style={{
                backgroundColor: `${colors.blueAccent[900]}99`,
                border: `1px solid ${colors.grey[700]}55`,
                color: colors.grey[100],
                padding: '2rem 1rem 1rem'
              }}
            >
              <div className="team-photo-wrapper relative overflow-hidden rounded-full w-[120px] h-[180px] mx-auto mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-photo w-full h-full object-cover block"
                />
                <div className="team-socials absolute bottom-0 left-0 right-0 h-0 bg-black/60 flex items-center justify-center gap-2 overflow-hidden transition-height duration-300 ease-in-out group-hover:h-[40px]">
                  {member.socials.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Link to ${member.name}'s ${link.icon.split('-').pop()}`}
                      className="text-white text-xl transition-transform duration-300 hover:scale-125"
                    >
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
              <h3 className="font-bold mb-1 text-lg">{member.name}</h3>
              <p style={{ color: colors.grey[400] }}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-8 md:py-12 px-2 md:px-4">
        <h2
          className="section-title text-center text-[clamp(1.5rem,6vw,2.8rem)] font-black mb-6"
          style={{
            WebkitBackgroundClip: 'text',
            color: colors.secondary[500]
          }}
        >
          What Our Clients Say ✨
        </h2>
        <div className="testimonial-marquee-container overflow-hidden relative py-4">
          <div className="testimonial-marquee flex flex-col gap-8">
            {['track-left', 'track-right'].map((track, index) => (
              <div
                key={index}
                className={`marquee-track ${track} flex gap-8 whitespace-nowrap will-change-transform animate-scroll-${track.split('-')[1]}`}
              >
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div
                    key={`${track}-${index}`}
                    className="testimonial-card inline-block min-w-[300px] p-6 text-center rounded-[20px] shrink-0 mr-8"
                    style={{
                      backgroundColor: `${colors.blueAccent[900]}99`,
                      border: `1px solid ${colors.grey[700]}55`,
                      color: colors.grey[100]
                    }}
                  >
                    <p className="text-base mb-2">"{testimonial.text}"</p>
                    <p className="font-bold text-sm">- {testimonial.author}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 md:py-12 px-2 md:px-4 text-center mx-auto"
      style={{
              backgroundColor: `${colors.blueAccent[900]}80`,
              borderRadius: '20px',

      }}>
        <h2
          className="section-title text-center text-[clamp(1.5rem,6vw,2.8rem)] font-black mb-6"
          style={{
            WebkitBackgroundClip: 'text',
            color: colors.secondary[500]
          }}
        >
          Contact Us 📞
        </h2>
        <div className="contact-content width-[1200px] mx-auto p-0">
          <p
            className="contact-intro text-[clamp(0.85rem,3.5vw,1.1rem)] mb-6 leading-relaxed px-2"
            style={{ color: colors.grey[300] }}
          >
            Reach out to us directly on WhatsApp or fill out the form below. We'll get back to you as soon as possible!
          </p>

          <form
            onSubmit={submitForm}
            className="contact-form flex flex-col gap-5 text-left p-4 rounded-xl mx-4 md:mx-12 lg:mx-32"
            style={{
              border: `1px solid ${colors.grey[700]}55`
            }}
          >
            {/* Form Inputs */}
            <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group flex flex-col">
                <label
                  htmlFor="name"
                  className="font-semibold mb-1 text-[clamp(0.8rem,3.5vw,1rem)]"
                  style={{ color: colors.secondary[400] }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                  className="rounded-lg p-2 text-[clamp(0.8rem,3.5vw,1rem)] transition-colors duration-300 focus:outline-none"
                  style={{
                    backgroundColor: `${colors.primary[900]}55`,
                    border: `2px solid ${colors.grey[700]}55`,
                    color: colors.grey[100]
                  }}
                />
              </div>
              <div className="form-group flex flex-col">
                <label
                  htmlFor="subject"
                  className="font-semibold mb-1 text-[clamp(0.8rem,3.5vw,1rem)]"
                  style={{ color: colors.secondary[400] }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  placeholder="Brief subject of your message"
                  className="rounded-lg p-2 text-[clamp(0.8rem,3.5vw,1rem)] transition-colors duration-300 focus:outline-none"
                  style={{
                    backgroundColor: `${colors.primary[900]}55`,
                    border: `2px solid ${colors.grey[700]}55`,
                    color: colors.grey[100]
                  }}
                />
              </div>
            </div>
            <div className="form-group full-width flex flex-col">
              <label
                htmlFor="message"
                className="font-semibold mb-1 text-[clamp(0.8rem,3.5vw,1rem)]"
                style={{ color: colors.secondary[400] }}
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={6}
                placeholder="Tell us about your project or inquiry..."
                required
                className="rounded-lg p-2 text-[clamp(0.8rem,3.5vw,1rem)] resize-y min-h-[100px] leading-relaxed"
                style={{
                  backgroundColor: `${colors.primary[900]}55`,
                  border: `2px solid ${colors.grey[700]}55`,
                  color: colors.grey[100]
                }}
              ></textarea>
            </div>
            <div className="buttons-container flex flex-col md:flex-row justify-center items-center gap-6 mt-4">
              <button
                type="submit"
                className="submit-button inline-flex items-center gap-2 font-bold text-[clamp(0.9rem,3.5vw,1.1rem)] px-6 py-3 rounded-[50px] cursor-pointer transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg"
                style={{
                  background: `linear-gradient(90deg, ${colors.secondary[600]}, ${colors.secondary[700]})`,
                  color: colors.grey[900],
                   border: `2px solid ${colors.grey[200]}55`,
                  boxShadow: `0 6px 20px ${colors.secondary[500]}80`
                }}
              >
                <i className="fas fa-paper-plane"></i>
                Send Message
              </button>
              <a
                className="whatsapp-button inline-flex items-center gap-2 font-bold text-[clamp(0.85rem,3.5vw,1.1rem)] px-6 py-3 rounded-[50px] transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg"
                href={whatsappLinkDirect}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: `linear-gradient(90deg, ${colors.blueAccent[800]}, ${colors.blueAccent[900]})`,
                  color: colors.grey[100],
                   border: `2px solid ${colors.grey[200]}55`,
                  boxShadow: `0 6px 20px ${colors.blueAccent[400]}80`
                }}
              >
                <i className="fab fa-whatsapp"></i> Chat on WhatsApp
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default OurServices;
