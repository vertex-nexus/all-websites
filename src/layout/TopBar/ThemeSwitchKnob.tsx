import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Box, useTheme } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import { ColorModeContext, getColors } from "../Theme/themes";

const ThemeSwitcherKnob: React.FC = () => {
  const theme = useTheme();
  const colors = getColors();
  const colorMode = useContext(ColorModeContext);

  if (!colorMode) return null;

  return (
    <motion.div
      onClick={colorMode.toggleColorMode}
      className="relative p-1 rounded-full cursor-pointer"
      style={{
        background:
          theme.palette.mode === "light"
            ? colors.secondary[500]
            : colors.primary[800],
        border: `1px solid ${colors.secondary[400]}`,
        width: "80px",
        height: "32px",
        boxShadow: "inset 0 0 5px rgba(0,0,0,0.2), 0 4px 6px rgba(0,0,0,0.2)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Light mode icon */}
      <motion.div
        className="absolute left-2 z-20"
        animate={{
          opacity: theme.palette.mode === "light" ? 1 : 0.5,
          x: theme.palette.mode === "light" ? 0 : 4,
        }}
        transition={{ duration: 0.3 }}
      >
        <WbSunnyIcon sx={{ color: "#FCD34D" }} />
      </motion.div>

      {/* Dark mode icon */}
      <motion.div
        className="absolute right-2 z-20"
        animate={{
          opacity: theme.palette.mode === "dark" ? 1 : 0.5,
          x: theme.palette.mode === "dark" ? 0 : -4,
        }}
        transition={{ duration: 0.3 }}
      >
        <Brightness2Icon sx={{ color: "#93C5FD" }} />
      </motion.div>

      {/* The handle/knob */}
      <motion.div
        className="absolute top-[3px] z-30 flex items-center justify-center rounded-full"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
          width: "26px",
          height: "26px",
          background: colors.secondary[300],
          left: theme.palette.mode === "light" ? "3px" : "49px",
          border: "1px solid #fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
        }}
      >
        <Box
          sx={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.6)",
            boxShadow: "inset 0 0 2px #fff",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ThemeSwitcherKnob;