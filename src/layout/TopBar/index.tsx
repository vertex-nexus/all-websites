import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, getColors } from "../Theme/themes";
import { motion } from "framer-motion";
import {
  Container,
  AppBar,
  Toolbar,
  Box,
  useTheme,
} from "@mui/material";
import DarkModeSwitch from "./DarkModeSwitch";

interface HeaderProps {
  APP_BAR: string;
}

const Header: React.FC<HeaderProps> = ({ APP_BAR }) => {
  const colorMode = useContext(ColorModeContext);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = getColors();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Scroll Spy Effect
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setActiveLink(
                id === "services" ? "About" : id.charAt(0).toUpperCase() + id.slice(1)
              );
            }
          }
        });
      },
      { threshold: 0.6 } // 60% of section visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  if (!colorMode) return null;

  return (
    <Container
      className={`fixed top-2 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "scale-[0.98] shadow-lg" : ""
      }`}
      style={{ height: APP_BAR }}
    >
      <AppBar
        position="static"
        sx={{
          height: "100%",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          border: `1px solid ${
            scrolled ? colors.secondary[400] : "transparent"
          }`,
          backgroundColor: `${colors.primary[900]}CC`,
          transition: "border-color 0.5s",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* ✅ Logo */}
          <motion.button
            onClick={() => {
              navigate("/");
              setActiveLink("Home");
            }}
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box
              className="text-2xl font-bold bg-clip-text text-transparent"
              sx={{
                backgroundImage: `linear-gradient(90deg, ${colors.primary[500]}, ${colors.secondary[500]})`,
              }}
            >
              Vertex Nexus
            </Box>
          </motion.button>

          {/* ✅ Navigation */}
          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Box
              className="rounded-full px-3 py-1 border transition"
              sx={{
                background: `${colors.primary[900]}AA`,
                borderColor: colors.primary[400],
                display: "flex",
                gap: 1,
              }}
            >
              <NavLink
                href="#home"
                label="Home"
                active={activeLink === "Home"}
                onClick={() => setActiveLink("Home")}
              />
              <NavLink
                href="#services"
                label="About"
                active={activeLink === "About"}
                onClick={() => setActiveLink("About")}
              />
              <NavLink
                href="#contact"
                label="Contact"
                active={activeLink === "Contact"}
                onClick={() => setActiveLink("Contact")}
              />
            </Box>
          </Box>

          {/* ✅ Theme Switch */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DarkModeSwitch
              mode={theme.palette.mode}
              toggleMode={colorMode.toggleColorMode}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

const NavLink = ({
  href,
  label,
  active = false,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  const colors = getColors();
  return (
    <motion.a
      href={href}
      onClick={onClick}
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
