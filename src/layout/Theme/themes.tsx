import { createContext, useState, useMemo } from "react";
import { createTheme, Theme, useTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

interface ExtendedTheme extends Theme {
  colors: {
    grey: Record<number, string>;
    primary: Record<number, string>;
    secondary: Record<number, string>;
    greenAccent: Record<number, string>;
    redAccent: Record<number, string>;
    blueAccent: Record<number, string>;
    backgroundUrl: string;
  };
}

// ✅ Design tokens based on mode
export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#ffffff",
          200: "#e5e5e5",
          300: "#cccccc",
          400: "#b3b3b3",
          500: "#999999",
          600: "#808080",
          700: "#666666",
          800: "#4d4d4d",
          900: "#121212",
        },

        // ✅ Primary = Deep Blue
        primary: {
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#050423",
        },

        // ✅ Secondary = Gold
        secondary: {
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#594B2E",
        },

        greenAccent: {
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#2F433A",
        },

        redAccent: {
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#6B2D3B",
        },

        blueAccent: {
          100: "#bfdbfe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#243657",
        },

        backgroundUrl: "/img/gradient_dark.jpg",
      }
    : {
        // Light mode is the reverse of dark mode
        grey: {
          100: "#121212",
          200: "#4d4d4d",
          300: "#666666",
          400: "#808080",
          500: "#999999",
          600: "#b3b3b3",
          700: "#cccccc",
          800: "#e5e5e5",
          900: "#ffffff",
        },

        primary: {
          100: "#050423",
          200: "#3730a3",
          300: "#4338ca",
          400: "#4f46e5",
          500: "#6366f1",
          600: "#818cf8",
          700: "#a5b4fc",
          800: "#c7d2fe",
          900: "#e0e7ff",
        },

        secondary: {
          100: "#594B2E",
          200: "#92400e",
          300: "#b45309",
          400: "#d97706",
          500: "#f59e0b",
          600: "#fbbf24",
          700: "#fcd34d",
          800: "#fde68a",
          900: "#fef3c7",
        },

        greenAccent: {
          100: "#2F433A",
          200: "#065f46",
          300: "#047857",
          400: "#059669",
          500: "#10b981",
          600: "#34d399",
          700: "#6ee7b7",
          800: "#a7f3d0",
          900: "#d1fae5",
        },

        redAccent: {
          100: "#6B2D3B",
          200: "#991b1b",
          300: "#b91c1c",
          400: "#dc2626",
          500: "#ef4444",
          600: "#f87171",
          700: "#fca5a5",
          800: "#fecaca",
          900: "#fee2e2",
        },

        blueAccent: {
          100: "#243657",
          200: "#1e40af",
          300: "#1d4ed8",
          400: "#2563eb",
          500: "#3b82f6",
          600: "#60a5fa",
          700: "#93c5fd",
          800: "#bfdbfe",
          900: "#bfdbfe",
        },

        backgroundUrl: "/img/gradient.jpg",
      }),
});

// ✅ MUI Theme Settings
export const themeSettings = (mode: PaletteMode): ExtendedTheme => {
  const colors = tokens(mode);
  return {
    ...createTheme({
      palette: {
        mode: mode,
        primary: {
          main: colors.primary[500],
          dark: colors.primary[800],
          light: colors.primary[100],
        },
        secondary: {
          main: colors.secondary[500],
          dark: colors.secondary[800],
          light: colors.secondary[100],
        },
        background: {
          default: mode === "dark" ? "#121212" : "green",
        },
      },
      typography: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 12,
        h1: { fontSize: 40 },
        h2: { fontSize: 32 },
        h3: { fontSize: 24 },
        h4: { fontSize: 20 },
        h5: { fontSize: 16 },
        h6: { fontSize: 14 },
      },
    }),
    colors: {
      ...colors,
    },
  };
};

// ✅ Context for color mode
interface ColorModeContextType {
  toggleColorMode: () => void;
}
export const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const useMode = (): [Theme, ColorModeContextType] => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
        localStorage.setItem("colorMode", mode);
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};

// ✅ Dynamic color getter
export const getColors = () => {
  const theme = useTheme();
  return tokens(theme.palette.mode);
};