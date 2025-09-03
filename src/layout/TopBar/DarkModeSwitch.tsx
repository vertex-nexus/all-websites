import { Box } from "@mui/material";
import { motion, Variants } from "framer-motion";
import React from "react";

const MotionBox = motion(Box);

const DarkModeSwitch: React.FC<{ mode: string; toggleMode: () => void }> = ({
  mode,
  toggleMode,
}) => {
  const size = 26;

  const containerVariants: Variants = {
    dark: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
      backgroundColor: "#1E293B", // Dark background
    },
    light: { backgroundColor: "#93C5FD" }, // Light blue background
  };

  const childVariants: Variants = {
    dark: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
      },
    },
    light: {
      y: "-100px",
      opacity: 0,
    },
  };

  return (
    <Box
      onClick={toggleMode}
      sx={{
        cursor: "pointer",
        ".btn": {
          width: `${size * 2.1}px`,
          height: `${size}px`,
          borderRadius: `${size}px`,
          padding: `${size / 8}px`,
          boxSizing: "content-box",
          display: "flex",
          justifyContent: mode === "dark" ? "flex-end" : "flex-start",
          overflow: "hidden",
          position: "relative",
        },
        ".knob": {
          width: `${size}px`,
          height: `${size}px`,
          zIndex: "9999",
          borderRadius: `${size}px`,
        },
      }}
    >
      <motion.div
        className="btn"
        variants={containerVariants}
        initial={mode === "dark" ? "light" : "dark"}
        animate={mode}
        style={{
          position: "relative",
        }}
      >
        {/* Animated shapes (moon elements) */}
        <MotionBox
          sx={{
            position: "absolute",
            top: "70%",
            left: "25%",
            width: `${size * 0.08}px`,
            height: `${size * 0.06}px`,
            borderRadius: "50%",
            background: "white",
          }}
          key="circle-2"
          variants={childVariants}
        />
        <MotionBox
          sx={{
            position: "absolute",
            top: "25%",
            left: "15%",
            width: `${size * 0.3}px`,
            height: `${size * 0.3}px`,
            background: "white",
            clipPath:
              "polygon(50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0 38%, 37% 38%)",
          }}
          key="star1"
          variants={childVariants}
        />
        <MotionBox
          sx={{
            position: "absolute",
            top: "60%",
            left: "45%",
            width: `${size * 0.2}px`,
            height: `${size * 0.2}px`,
            borderRadius: "58%",
            clipPath:
              "polygon(50% 0%, 63% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0 38%, 37% 38%)",
            background: "white",
          }}
          key="star2"
          variants={childVariants}
        />
        <MotionBox
          sx={{
            position: "absolute",
            top: "40%",
            left: "35%",
            width: `${size * 0.1}px`,
            height: `${size * 0.1}px`,
            borderRadius: "50%",
            background: "white",
          }}
          key="circle-1"
          variants={childVariants}
        />
        <MotionBox
          sx={{
            position: "absolute",
            top: "25%",
            left: "55%",
            width: `${size * 0.08}px`,
            height: `${size * 0.08}px`,
            borderRadius: "50%",
            background: "white",
          }}
          key="circle-3"
          variants={childVariants}
        />

        {/* Knob */}
        <motion.div
          layout
          animate={mode}
          variants={{
            dark: {
              boxShadow: "inset 0px 13px white, inset 0px 13px 1px 1px white",
              rotate: 90,
              background: "transparent",
            },
            light: {
              boxShadow: "0px 0px 10px 5px rgba(255, 255, 0, 0.5)", // Added a yellow glow
              background: "yellow", // Changed to yellow for sun
              borderRadius: "50%", // Ensure it's a perfect circle
              width: `${size}px`, // Explicitly set width
              height: `${size}px`, // Explicitly set height
            },
          }}
          initial={false}
          className="knob"
        />
      </motion.div>
    </Box>
  );
};

export default DarkModeSwitch;