import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../layout/Theme/themes";

interface Props {
  whatsappLink: string;
}

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC<Props> = ({ whatsappLink }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const resetForm = () => {
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.message) {
      let messageBody = `New inquiry:\n\nName: ${contactForm.name}`;
      if (contactForm.email) messageBody += `\nEmail: ${contactForm.email}`;
      if (contactForm.subject) messageBody += `\nSubject: ${contactForm.subject}`;
      messageBody += `\nMessage: ${contactForm.message}`;

      const encodedMessage = encodeURIComponent(messageBody);
      const whatsappUrl = `https://wa.me/919310739038?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
      resetForm();
    }
  };

  return (
    <section
      id="contact"
      className="py-8 md:py-12 px-2 md:px-4 text-center mx-auto backdrop-blur-[24px]"
      style={{
        borderRadius: "20px"
      }}
    >
      <h2
        className="text-center text-[clamp(1.5rem,6vw,2.8rem)] font-black mb-6"
        style={{ color: colors.secondary[500] }}
      >
        Contact Us 📞
      </h2>

      <p
        className="text-[clamp(0.85rem,3.5vw,1.1rem)] mb-6 leading-relaxed px-2"
        style={{ color: colors.grey[300] }}
      >
        Reach out to us directly on WhatsApp or fill out the form below. We'll get back to you soon!
      </p>

      <form
        onSubmit={submitForm}
        className="flex flex-col gap-5 text-left p-4 rounded-xl mx-4 md:mx-12 lg:mx-32"
        style={{
          border: `1px solid ${colors.grey[700]}55`
        }}
      >
        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" style={{ color: colors.secondary[400] }} className="font-semibold mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={contactForm.name}
            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
            required
            placeholder="Enter your full name"
            className="rounded-lg p-2"
            style={{
              backgroundColor: `${colors.primary[900]}55`,
              border: `2px solid ${colors.grey[700]}55`,
              color: colors.grey[100]
            }}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" style={{ color: colors.secondary[400] }} className="font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            placeholder="Your email address"
            className="rounded-lg p-2"
            style={{
              backgroundColor: `${colors.primary[900]}55`,
              border: `2px solid ${colors.grey[700]}55`,
              color: colors.grey[100]
            }}
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col">
          <label htmlFor="subject" style={{ color: colors.secondary[400] }} className="font-semibold mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={contactForm.subject}
            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
            placeholder="Brief subject"
            className="rounded-lg p-2"
            style={{
              backgroundColor: `${colors.primary[900]}55`,
              border: `2px solid ${colors.grey[700]}55`,
              color: colors.grey[100]
            }}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message" style={{ color: colors.secondary[400] }} className="font-semibold mb-1">
            Your Message
          </label>
          <textarea
            id="message"
            value={contactForm.message}
            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
            rows={5}
            required
            placeholder="Tell us about your project..."
            className="rounded-lg p-2 resize-y"
            style={{
              backgroundColor: `${colors.primary[900]}55`,
              border: `2px solid ${colors.grey[700]}55`,
              color: colors.grey[100]
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-4">
          <button
            type="submit"
            className="font-bold px-6 py-3 rounded-[50px] hover:translate-y-[-3px] hover:shadow-lg transition-all"
            style={{
              background: `linear-gradient(90deg, ${colors.secondary[600]}, ${colors.secondary[700]})`,
              color: colors.grey[900],
              border: `2px solid ${colors.grey[200]}55`
            }}
          >
            <i className="fas fa-paper-plane"></i> Send Message
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold px-6 py-3 rounded-[50px] hover:translate-y-[-3px] hover:shadow-lg transition-all"
            style={{
              background: `linear-gradient(90deg, ${colors.blueAccent[800]}, ${colors.blueAccent[900]})`,
              color: colors.grey[100],
              border: `2px solid ${colors.grey[200]}55`
            }}
          >
            <i className="fab fa-whatsapp"></i> Chat on WhatsApp
          </a>
        </div>
      </form>
    </section>
  );
};

export default ContactSection;
