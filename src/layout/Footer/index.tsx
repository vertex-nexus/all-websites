import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitHub, LinkedIn, Mail, Phone, Instagram } from '@mui/icons-material';
import { ColorModeContext, getColors } from '../Theme/themes';
import { motion } from "framer-motion";

const Footer = ({ companyName = 'Vertex Nexus' }) => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const colorMode = useContext(ColorModeContext);
  const colors = getColors();

  if (!colorMode) return null;

  return (
    <footer
      className="w-full relative overflow-hidden backdrop-blur-xl py-10 px-4 md:px-10 transition-colors duration-500"
      style={{
        backgroundColor: colors.primary[900], // dynamic background color
        color: colors.grey[100], // text color
      }}
    >
      {/* ✅ Background Animated Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute top-0 right-0 h-48 w-48 rounded-full blur-3xl animate-blob-1"
          style={{ backgroundColor: `${colors.secondary[500]}20` }}
        ></div>
        <div
          className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full blur-3xl animate-blob-2"
          style={{ backgroundColor: `${colors.primary[500]}20` }}
        ></div>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row justify-between space-y-12 md:space-y-0">
        {/* Left Section */}
        <div className="flex flex-col space-y-6 max-w-sm">
          {/* Logo */}
              <motion.button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="text-2xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${colors.primary[500]}, ${colors.secondary[500]})`,
                }}
              >
               Vertex Nexus
              </div>
            </motion.button>

          {/* Description */}
          <p style={{ color: colors.grey[400], fontSize: '14px', lineHeight: '1.6' }}>
            {companyName} empowers you to build your own Web3 app effortlessly —
            no code, no hassle, just pure AI magic.
          </p>
        </div>

        {/* ✅ Right Section */}
        <div className="flex flex-row xs:flex-col  space-x-24">
          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h2
              className="text-xl font-bold"
              style={{ color: colors.primary[100] }}
            >
              Contact Us
            </h2>
            <div
              className="flex items-center space-x-2 transition-colors"
              style={{
                color: colors.grey[400],
              }}
            >
              <Mail />
              <a
                href="mailto:team@skaya.com"
                className="hover:underline"
                style={{ color: colors.primary[300] }}
              >
                team@skaya.org
              </a>
            </div>
            <div
              className="flex items-center space-x-2 transition-colors"
              style={{
                color: colors.grey[400],
              }}
            >
              <Phone />
              <a
                href="tel:+919310739038"
                className="hover:underline"
                style={{ color: colors.primary[300] }}
              >
                +91 9310739038
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-4">
            <h2
              className="text-xl font-bold"
              style={{ color: colors.primary[100] }}
            >
              Follow Us
            </h2>
            <div className="flex space-x-4">
              {[
                { Icon: GitHub, href: 'https://github.com/skaya-org' },
                {
                  Icon: LinkedIn,
                  href: 'https://linkedin.com/company/skaya-org',
                },
                { Icon: Instagram, href: 'https://instagram.com/skaya.organization' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:-translate-y-1"
                  style={{
                    color: colors.grey[500],
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.secondary[400])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.grey[500])}
                >
                  <Icon style={{ fontSize: '24px' }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className="container mx-auto mt-12 pt-6 border-t text-center text-sm"
        style={{
          borderColor: colors.grey[700],
          color: colors.grey[400],
        }}
      >
        <p>
          © {year} {companyName}. All rights reserved.
        </p>
        <p className="mt-1">
          Built with ❤️ by{' '}
          <a
            href="https://skaya.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: colors.secondary[400] }}
          >
            SKAYA
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
