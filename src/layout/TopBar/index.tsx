import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, getColors } from "../Theme/themes";
import { motion } from "framer-motion";
import { Container } from "@mui/material";

interface HeaderProps {
  setIsSidebarOpen: () => void;
  APP_BAR: string;
  isNonMobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, APP_BAR, isNonMobile }) => {
  const colorMode = useContext(ColorModeContext);
  const [isOn, setIsOn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const colors = getColors();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!colorMode) return null;

  const toggleSwitch = () => {
    colorMode.toggleColorMode();
    setIsOn(!isOn);
  };

  return (
    <Container
      className={`fixed top-2 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "scale-[0.98] shadow-lg" : ""
      }`}
      style={{ height: APP_BAR }}
    >
      <div
        className="h-full backdrop-blur-lg rounded-2xl border transition-colors duration-500"
        style={{
          background: `${colors.primary[900]}CC`, // semi-transparent dark deep-blue
          borderColor: scrolled ? colors.secondary[400] : "transparent",
        }}
      >
        <div className="flex items-center justify-between h-full px-4">
          {/* ✅ Left Section */}
          <div className="flex items-center space-x-3">
            {/* Sidebar Toggle */}
            {!isNonMobile &&
            <motion.button
              onClick={setIsSidebarOpen}
              className="p-2 rounded-full transition"
              style={{
                color: colors.primary[400],
                background: `${colors.secondary[100]}33`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
}
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
              Skaya
              </div>
            </motion.button>
          </div>

          {/* ✅ Middle Navigation */}
          <nav className="hidden md:flex flex-1 justify-center">
            <div
              className="rounded-full px-3 py-1 border transition"
              style={{
                background: `${colors.primary[900]}AA`,
                borderColor: colors.primary[400],
              }}
            >
              <div className="flex space-x-2">
                <NavLink href="#" label="Home" active />
                <NavLink href="/about" label="About" />
                <NavLink href="#contact-us" label="Contact" />
              </div>
            </div>
          </nav>

          {/* ✅ Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher */}
              <div className="relative">
              <motion.div
                className="theme-switch rounded-full p-1 flex items-center cursor-pointer"
                data-ison={isOn}
                onClick={toggleSwitch}
                style={{
                  background: isOn
                    ? "linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(59, 130, 246, 0.1))"
                    : "linear-gradient(90deg, rgba(15, 23, 42, 0.2), rgba(30, 58, 138, 0.2))",
                  border: "1px solid",
                  borderColor: getColors().primary[500],
                  width: "80px",
                  height: "32px",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Light mode icon */}
                <motion.div
                  className="absolute left-3 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOn ? 1 : 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </motion.div>

                {/* Dark mode icon */}
                <motion.div
                  className="absolute right-3 z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOn ? 0.3 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </motion.div>

                {/* Animated particles in background */}
                <div className="absolute inset-0 overflow-hidden opacity-30">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full dark:bg-blue-400 particle"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${5 + Math.random() * 5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* The handle/knob */}
                <motion.div
                  className="handle z-30"
                  layout
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #60a5fa, #6366f1)",
                    boxShadow:
                      "0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const NavLink = ({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) => {
  const colors = getColors();
  return (
    <motion.a
      href={href}
      className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
      style={{
        color: active ? "#fff" : colors.primary[100],
        background: active
          ? `linear-gradient(90deg, ${colors.primary[500]}, ${colors.secondary[500]})`
          : "transparent",
      }}
      whileHover={{
        scale: 1.05,
        backgroundColor: colors.primary[100],
      }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  );
};

export default Header;
