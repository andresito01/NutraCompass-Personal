import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";

// Function to apply tint to a color based on the mode
const applyTint = (baseColor, isDarkMode) => {
  const tint = isDarkMode ? 0.7 : 1.3; // Adjust the tint factor as needed
  const hexColor = baseColor.replace(
    /rgba?\((\d+), (\d+), (\d+)(, [\d.]+)?\)/,
    (_, r, g, b, a) => {
      const adjustedBrightness = isDarkMode ? 0 : 255;
      const adjustedR = Math.round(
        parseInt(r, 10) * tint + adjustedBrightness * (1 - tint)
      );
      const adjustedG = Math.round(
        parseInt(g, 10) * tint + adjustedBrightness * (1 - tint)
      );
      const adjustedB = Math.round(
        parseInt(b, 10) * tint + adjustedBrightness * (1 - tint)
      );
      return `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}${a || ""})`;
    }
  );
  return hexColor;
};
const applyTintWithOpacity = (baseColor, isDarkMode, opacity) => {
  const tint = isDarkMode ? 0.7 : 1.3; // Adjust the tint factor as needed
  const hexColor = baseColor.replace(
    /rgba?\((\d+), (\d+), (\d+)(, [\d.]+)?\)/,
    (_, r, g, b, a) => {
      const adjustedBrightness = isDarkMode ? 0 : 255;
      const adjustedR = Math.round(
        parseInt(r, 10) * tint + adjustedBrightness * (1 - tint)
      );
      const adjustedG = Math.round(
        parseInt(g, 10) * tint + adjustedBrightness * (1 - tint)
      );
      const adjustedB = Math.round(
        parseInt(b, 10) * tint + adjustedBrightness * (1 - tint)
      );
      const newOpacity = opacity;
      return `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, ${newOpacity})`;
    }
  );
  return hexColor;
};

// Default Theme (Matte Gray Screen Background)
export const Default = {
  name: "Default",
  dark: {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#4CAF50", true), // Green color, adjust as needed
      secondary: applyTint("#2196F3", true), // Blue color, adjust as needed
      primaryLightOpacity: applyTintWithOpacity("#4CAF50", true, 0.05), // Green color, adjust as needed
      secondaryLightOpacity: applyTintWithOpacity("#2196F3", true, 0.05), // Blue color, adjust as needed
      screenBackground: "#1E1E1E", // Matte black/gray background
      sectionBackgroundColor: applyTint("#333333", true), // Darkened background
      cardBackgroundColor: "#2C2C2C", // Matte black/gray background
      sectionBackgroundColorLowOpacity: "rgba(51, 51, 51, 0.5)", // Darkened background with low opacity
      cardBackgroundColorLowOpacity: "rgba(44, 44, 44, 0.5)", // Darkened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)", // Darkened background with higher opacity
      shadow: "rgba(240, 240, 240, 0.5)", // Light gray shadow
      sectionBorderColor: applyTint("#555555", true), // Darkened border color
      cardBorderColor: "#666666", // Matte black/gray border color
      sectionHeaderTextColor: applyTint("#FFFFFF", true), // White text color
      cardHeaderTextColor: applyTint("#FFFFFF", true), // White text color
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#4CAF50", false), // Green color, adjust as needed
      secondary: applyTint("#2196F3", false), // Blue color, adjust as needed
      primaryLightOpacity: applyTintWithOpacity("#4CAF50", false, 0.6), // Green color, adjust as needed
      secondaryLightOpacity: applyTintWithOpacity("#2196F3", false, 0.6), // Blue color, adjust as needed
      screenBackground: "#E5E5E5",
      sectionBackgroundColorLowOpacity: "rgba(224, 224, 224, 0.5)", // Lightened background with low opacity
      cardBackgroundColor: "#F5F5F5", // Matte white background
      cardBackgroundColorLowOpacity: "rgba(245, 245, 245, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(240, 240, 240, 0.9)", // Lightened background with higher opacity
      shadow: "rgba(240, 240, 240, 0.5)", // Light gray shadow
      sectionBorderColor: applyTint("#B0B0B0", false), // Lightened border color
      cardBorderColor: "#CCCCCC", // Matte white border color
      sectionHeaderTextColor: applyTint("#000000", false), // Black text color
      cardHeaderTextColor: applyTint("#000000", false), // Black text color
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// All Pink Theme (Matte Gray Screen Background)
export const AllPink = {
  // Specify custom property in nested object
  name: "All Pink",
  dark: {
    ...DarkTheme,
    // Specify custom property
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#FF69B4", true),
      secondary: applyTint("#FFB6C1", true),
      screenBackground: applyTint("#1E1E1E", true),
      sectionBackgroundColor: applyTint("#FFC0CB", true),
      cardBackgroundColor: applyTint("#FFA07A", true),
      sectionBackgroundColorLowOpacity: "rgba(255, 192, 203, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(255, 160, 122, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba( 240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#DB7093", true),
      cardBorderColor: applyTint("#FF6347", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#FFB6C1", false),
      secondary: applyTint("#FFC0CB", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#FF69B4", false),
      cardBackgroundColor: "#F2F2F2", // Light gray background
      sectionBackgroundColorLowOpacity: "rgba(255, 192, 203, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#DB7093", false),
      cardBorderColor: applyTint("#FF69B4", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// All Purple Theme (Matte Gray Screen Background)
export const AllPurple = {
  // Specify custom property in nested object
  name: "All Purple",
  dark: {
    ...DarkTheme,
    // Specify custom property
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#8A2BE2", true),
      secondary: applyTint("#9932CC", true),
      screenBackground: applyTint("#1E1E1E", true),
      sectionBackgroundColor: applyTint("#800080", true),
      cardBackgroundColor: applyTint("#9400D3", true),
      sectionBackgroundColorLowOpacity: "rgba(128, 0, 128, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(148, 0, 211, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba( 240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#4B0082", true),
      cardBorderColor: applyTint("#8B008B", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#9932CC", false),
      secondary: applyTint("#BA55D3", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#800080", false),
      cardBackgroundColor: "#F2F2F2", // Light gray background
      sectionBackgroundColorLowOpacity: "rgba(128, 0, 128, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#8A2BE2", false),
      cardBorderColor: applyTint("#8B008B", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// All Teal Theme (Matte Gray Screen Background)
export const AllTeal = {
  // Specify custom property in nested object
  name: "All Teal",
  dark: {
    ...DarkTheme,
    // Specify custom property
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#00CED1", true),
      secondary: applyTint("#20B2AA", true),
      screenBackground: applyTint("#1E1E1E", true),
      sectionBackgroundColor: applyTint("#008080", true),
      cardBackgroundColor: applyTint("#008B8B", true),
      sectionBackgroundColorLowOpacity: "rgba(0, 128, 128, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(245, 245, 245, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba( 240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#5F9EA0", true),
      cardBorderColor: applyTint("#4682B4", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#20B2AA", false),
      secondary: applyTint("#00FFFF", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#008080", false),
      cardBackgroundColor: "#F2F2F2", // Light gray background
      sectionBackgroundColorLowOpacity: "rgba(0, 128, 128, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#00CED1", false),
      cardBorderColor: applyTint("#5F9EA0", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Gold Theme (Black Screen Background)
export const Gold = {
  name: "Gold",
  dark: {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#FFD700", true), // Gold color
      secondary: applyTint("#FFD700", true), // Gold color
      primaryLightOpacity: applyTintWithOpacity("#FFD700", true, 0.2), // Gold color
      secondaryLightOpacity: applyTintWithOpacity("#FFD700", true, 0.2), // Gold color
      screenBackground: applyTint("#000000", true),
      sectionBackgroundColor: "#FFD700", // Gold color
      sectionBackgroundColorLowOpacity: "rgba(255, 215, 0, 0.5)",
      cardBackgroundColor: applyTint("#1a1a1a", true), // Darkened background
      cardBackgroundColorLowOpacity: "rgba(26, 26, 26, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: "#FFD700", // Gold color
      cardBorderColor: "#FFD700", // Gold color
      sectionHeaderTextColor: "#FFFFFF", // White color
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#FFD700", false), // Gold color
      secondary: applyTint("#FFD700", false), // Gold color
      primaryLightOpacity: applyTintWithOpacity("#FFD700", false, 0.6), // Gold color
      secondaryLightOpacity: applyTintWithOpacity("#FFD700", false, 0.6), // Gold color
      screenBackground: "#E5E5E5",
      sectionBackgroundColorLowOpacity: "rgba(255, 215, 0, 0.5)",
      cardBackgroundColor: "#F2F2F2", // Light gray background
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#FFD700", false),
      cardBorderColor: applyTint("#FFD700", false),
      sectionHeaderTextColor: "#000000",
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Blue Theme (Black Screen Background)
export const Blue = {
  // Specify custom property in nested object
  name: "Blue",
  dark: {
    ...DarkTheme,
    // Specify custom property
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#3498db", true),
      secondary: applyTint("#2c3e50", true),
      screenBackground: applyTint("#0d0d0d", true), // Darkened background
      sectionBackgroundColor: applyTint("#2c3e50", true),
      cardBackgroundColor: applyTint("#1a1a1a", true), // Darkened background
      sectionBackgroundColorLowOpacity: "rgba(44, 62, 80, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(26, 26, 26, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba( 240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#3498db", true),
      cardBorderColor: applyTint("#2c3e50", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#3498db", false),
      secondary: applyTint("#2c3e50", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#2c3e50", false),
      sectionBackgroundColorLowOpacity: "rgba(44, 62, 80, 0.5)",
      cardBackgroundColor: "#F2F2F2", // Light gray background
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#3498db", false),
      cardBorderColor: applyTint("#2c3e50", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Green Theme (Black Screen Background)
export const Green = {
  // Specify custom property in nested object
  name: "Green",
  dark: {
    ...DarkTheme,
    // Specify custom property
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#00ff00", true),
      secondary: applyTint("#2c3e50", true),
      screenBackground: applyTint("#0d0d0d", true), // Darkened background
      sectionBackgroundColor: applyTint("#2c3e50", true),
      cardBackgroundColor: applyTint("#1a1a1a", true), // Darkened background
      sectionBackgroundColorLowOpacity: "rgba(44, 62, 80, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(26, 26, 26, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba( 240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#00ff00", true),
      cardBorderColor: applyTint("#2c3e50", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#00ff00", false),
      secondary: applyTint("#2c3e50", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#2c3e50", false),
      sectionBackgroundColorLowOpacity: "rgba(44, 62, 80, 0.5)",
      cardBackgroundColor: "#F2F2F2", // Light gray background
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba( 240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#00ff00", false),
      cardBorderColor: applyTint("#2c3e50", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Red Theme (Black Screen Background)
export const Red = {
  name: "Red",
  dark: {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#FF0000", true), // Red color
      secondary: applyTint("#8B0000", true), // Dark red color
      screenBackground: applyTint("#0d0d0d", true),
      sectionBackgroundColor: applyTint("#8B0000", true),
      cardBackgroundColor: applyTint("#1a1a1a", true),
      sectionBackgroundColorLowOpacity: "rgba(139, 0, 0, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(26, 26, 26, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#FF0000", true),
      cardBorderColor: applyTint("#8B0000", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#FF0000", false),
      secondary: applyTint("#8B0000", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#8B0000", false),
      sectionBackgroundColorLowOpacity: "rgba(139, 0, 0, 0.5)",
      cardBackgroundColor: "#F2F2F2", // Light gray background
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#FF0000", false),
      cardBorderColor: applyTint("#8B0000", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Pink Theme
export const HotPink = {
  name: "Hot Pink",
  dark: {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#FF1493", true), // Pink color
      secondary: applyTint("#C71585", true), // Dark pink color
      screenBackground: applyTint("#0d0d0d", true),
      sectionBackgroundColor: applyTint("#C71585", true),
      cardBackgroundColor: applyTint("#1a1a1a", true),
      sectionBackgroundColorLowOpacity: "rgba(199, 21, 133, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(26, 26, 26, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#FF1493", true),
      cardBorderColor: applyTint("#C71585", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#FF1493", false),
      secondary: applyTint("#C71585", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#C71585", false),
      sectionBackgroundColorLowOpacity: "rgba(199, 21, 133, 0.5)",
      cardBackgroundColor: "#F2F2F2", // Light gray background
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#FF1493", false),
      cardBorderColor: applyTint("#C71585", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Orange Theme
export const Orange = {
  name: "Orange",
  dark: {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#FF4500", true), // Sunset Orange color
      secondary: applyTint("#8B2500", true), // Dark Sunset Orange color
      screenBackground: applyTint("#0d0d0d", true),
      sectionBackgroundColor: applyTint("#FF4500", true),
      cardBackgroundColor: applyTint("#1a1a1a", true),
      sectionBackgroundColorLowOpacity: "rgba(255, 69, 0, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(26, 26, 26, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#FF4500", true),
      cardBorderColor: applyTint("#8B2500", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#FF4500", false),
      secondary: applyTint("#8B2500", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#FF4500", false),
      sectionBackgroundColorLowOpacity: "rgba(255, 69, 0, 0.5)",
      cardBackgroundColor: "#F2F2F2", // Light gray background
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#FF4500", false),
      cardBorderColor: applyTint("#8B2500", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Teal/Turquoise Theme
export const Teal = {
  name: "Teal",
  dark: {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#008080", true), // Teal color
      secondary: applyTint("#004040", true), // Dark Teal color
      screenBackground: applyTint("#0d0d0d", true),
      sectionBackgroundColor: applyTint("#008080", true),
      cardBackgroundColor: applyTint("#1a1a1a", true),
      sectionBackgroundColorLowOpacity: "rgba(0, 128, 128, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(26, 26, 26, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#008080", true),
      cardBorderColor: applyTint("#004040", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#008080", false),
      secondary: applyTint("#004040", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#008080", false),
      sectionBackgroundColorLowOpacity: "rgba(0, 128, 128, 0.5)",
      cardBackgroundColor: "#F2F2F2", // Light gray background
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#008080", false),
      cardBorderColor: applyTint("#004040", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Silver Theme
export const Silver = {
  name: "Silver",
  dark: {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#C0C0C0", true), // Silver color
      secondary: applyTint("#A9A9A9", true), // Dark Silver color
      screenBackground: applyTint("#0d0d0d", true),
      sectionBackgroundColor: applyTint("#C0C0C0", true),
      cardBackgroundColor: applyTint("#1a1a1a", true),
      sectionBackgroundColorLowOpacity: "rgba(192, 192, 192, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(26, 26, 26, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#C0C0C0", true),
      cardBorderColor: applyTint("#A9A9A9", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#C0C0C0", false),
      secondary: applyTint("#A9A9A9", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#C0C0C0", false),
      sectionBackgroundColorLowOpacity: "rgba(192, 192, 192, 0.5)",
      cardBackgroundColor: "#F2F2F2", // Light gray background
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#C0C0C0", false),
      cardBorderColor: applyTint("#A9A9A9", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Purple Theme
export const Purple = {
  name: "Purple",
  dark: {
    ...DarkTheme,
    myOwnProperty: true,
    colors: {
      ...DarkTheme.colors,
      primary: applyTint("#800080", true), // Purple color
      secondary: applyTint("#4B0082", true), // Dark Purple color
      screenBackground: applyTint("#0d0d0d", true),
      sectionBackgroundColor: applyTint("#800080", true),
      cardBackgroundColor: applyTint("#1a1a1a", true),
      sectionBackgroundColorLowOpacity: "rgba(128, 0, 128, 0.5)",
      cardBackgroundColorLowOpacity: "rgba(26, 26, 26, 0.5)",
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#800080", true),
      cardBorderColor: applyTint("#4B0082", true),
      sectionHeaderTextColor: applyTint("#FFFFFF", true),
      cardHeaderTextColor: applyTint("#FFFFFF", true),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
  light: {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: applyTint("#800080", false),
      secondary: applyTint("#4B0082", false),
      screenBackground: "#E5E5E5",
      sectionBackgroundColor: applyTint("#800080", false),
      sectionBackgroundColorLowOpacity: "rgba(128, 0, 128, 0.5)",
      cardBackgroundColor: "#F2F2F2", // Light gray background
      cardBackgroundColorLowOpacity: "rgba(242, 242, 242, 0.5)", // Lightened background with low opacity
      cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
      shadow: "rgba(240, 240, 240, 0.5)",
      sectionBorderColor: applyTint("#800080", false),
      cardBorderColor: applyTint("#4B0082", false),
      sectionHeaderTextColor: applyTint("#000000", false),
      cardHeaderTextColor: applyTint("#000000", false),
    },
    dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
  },
};

// Theme6 (Inspired by The Legend of Zelda) (Black Screen Background)
// export const Theme5 = {
//   // Specify custom property in nested object
//   name: "Theme5",
//   dark: {
//     ...DarkTheme,
//     // Specify custom property
//     myOwnProperty: true,
//     colors: {
//       ...DarkTheme.colors,
//       primary: applyTint("#00AEEF", true),
//       secondary: applyTint("#00874E", true),
//       screenBackground: applyTint("#000000", true),
//       sectionBackgroundColor: applyTint("#00AEEF", true),
//       cardBackgroundColor: applyTint("#333333", true),
//       sectionBackgroundColorLowOpacity: "rgba(0, 174, 239, 0.5)",
//       cardBackgroundColorLowOpacity: "rgba(51, 51, 51, 0.5)",
//       cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
//       shadow: "rgba( 240, 240, 240, 0.5)",
//       sectionBorderColor: applyTint("#00AEEF", true),
//       // cardBorderColor: applyTint("#00874E", true),
//       cardBorderColor: applyTint("#F2a900", true),
//       sectionHeaderTextColor: applyTint("#FFFFFF", true),
//       cardHeaderTextColor: applyTint("#FFFFFF", true),
//     },
//     dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
//   },
//   light: {
//     ...DefaultTheme,
//     // Specify custom property
//     myOwnProperty: true,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: applyTint("#00AEEF", false),
//       secondary: applyTint("#00874E", false),
//       screenBackground: "#E5E5E5", // Matte white background
//       sectionBackgroundColor: applyTint("#00AEEF", false),
//       cardBackgroundColor: applyTint("#CCCCCC", false),
//       sectionBackgroundColorLowOpacity: "rgba(0, 174, 239, 0.5)",
//       cardBackgroundColorLowOpacity: "rgba(51, 51, 51, 0.5)",
//       cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
//       shadow: "rgba( 240, 240, 240, 0.5)",
//       sectionBorderColor: applyTint("#00AEEF", false),
//       cardBorderColor: applyTint("#00874E", false),
//       sectionHeaderTextColor: applyTint("#000000", false),
//       cardHeaderTextColor: applyTint("#000000", false),
//     },
//     dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
//   },
// };

// export const Theme1 = {
//   // Specify custom property in nested object
//   name: "Theme1",
//   dark: {
//     ...DarkTheme,
//     // Specify custom property
//     myOwnProperty: true,
//     colors: {
//       ...DarkTheme.colors,
//       primary: applyTint("#228B22", true),
//       secondary: applyTint("#32CD32", true),
//       screenBackground: applyTint("#1E1E1E", true),
//       sectionBackgroundColor: applyTint("#008000", true),
//       cardBackgroundColor: applyTint("#006400", true),
//       sectionBackgroundColorLowOpacity: "rgba(0, 128, 0, 0.5)",
//       cardBackgroundColorLowOpacity: "rgba(0, 100, 0, 0.5)",
//       cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
//       shadow: "rgba(255, 255, 255, 0.5)",
//       sectionBorderColor: applyTint("#2E8B57", true),
//       cardBorderColor: applyTint("#3CB371", true),
//       sectionHeaderTextColor: applyTint("#FFFFFF", true),
//       cardHeaderTextColor: applyTint("#FFFFFF", true),
//     },
//     dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
//   },
//   light: {
//     ...DefaultTheme,
//     // Specify custom property
//     myOwnProperty: true,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: applyTint("#32CD32", false),
//       secondary: applyTint("#ADFF2F", false),
//       screenBackground: "#E5E5E5", // Matte white backgroundalse),
//       sectionBackgroundColor: applyTint("#008000", false),
//       cardBackgroundColor: applyTint("#006400", false),
//       sectionBackgroundColorLowOpacity: "rgba(0, 128, 0, 0.5)",
//       cardBackgroundColorLowOpacity: "rgba(0, 100, 0, 0.5)",
//       cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
//       shadow: "rgba( 240, 240, 240, 0.5)",
//       sectionBorderColor: applyTint("#228B22", false),
//       cardBorderColor: applyTint("#3CB371", false),
//       sectionHeaderTextColor: applyTint("#000000", false),
//       cardHeaderTextColor: applyTint("#000000", false),
//     },
//     dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
//   },
// };

// Theme5 Yellow
// export const Theme5 = {
//   // Specify custom property in nested object
//   name: "Theme5",
//   dark: {
//     ...DarkTheme,
//     // Specify custom property
//     myOwnProperty: true,
//     colors: {
//       ...DarkTheme.colors,
//       primary: applyTint("#FFD700", true),
//       secondary: applyTint("#DAA520", true),
//       screenBackground: applyTint("#1E1E1E", true),
//       sectionBackgroundColor: applyTint("#B8860B", true),
//       cardBackgroundColor: applyTint("#CD853F", true),
//       sectionBackgroundColorLowOpacity: "rgba(184, 134, 11, 0.5)",
//       cardBackgroundColorLowOpacity: "rgba(205, 133, 63, 0.5)",
//       cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
//       shadow: "rgba( 240, 240, 240, 0.5)",
//       sectionBorderColor: applyTint("#FFA500", true),
//       cardBorderColor: applyTint("#FF8C00", true),
//       sectionHeaderTextColor: applyTint("#FFFFFF", true),
//       cardHeaderTextColor: applyTint("#FFFFFF", true),
//     },
//     dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
//   },
//   light: {
//     ...DefaultTheme,
//     // Specify custom property
//     myOwnProperty: true,
//     colors: {
//       ...DefaultTheme.colors,
//       primary: applyTint("#DAA520", false),
//       secondary: applyTint("#FFD700", false),
//       screenBackground: "#E5E5E5", // Matte white backgroundalse),
//       sectionBackgroundColor: applyTint("#B8860B", false),
//       cardBackgroundColor: applyTint("#CD853F", false),
//       sectionBackgroundColorLowOpacity: "rgba(184, 134, 11, 0.5)",
//       cardBackgroundColorLowOpacity: "rgba(205, 133, 63, 0.5)",
//       cardDarkGrayBackgroundColor: "rgba(30, 30, 30, 0.9)",
//       shadow: "rgba( 240, 240, 240, 0.5)",
//       sectionBorderColor: applyTint("#FFA500", false),
//       cardBorderColor: applyTint("#FF8C00", false),
//       sectionHeaderTextColor: applyTint("#000000", false),
//       cardHeaderTextColor: applyTint("#000000", false),
//     },
//     dimensions: { sectionBorderRadius: 8, cardBorderRadius: 6 },
//   },
// };
