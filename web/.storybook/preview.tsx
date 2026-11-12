import Box from "@mui/material/Box";
import type { Preview } from "@storybook/react-vite";

import { DeathlabsThemeProvider } from "../src/DeathlabsThemeProvider.js";

const preview: Preview = {
  decorators: [
    (Story) => (
      <DeathlabsThemeProvider>
        <Box sx={{ minHeight: "100vh" }}>
          <Story />
        </Box>
      </DeathlabsThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      options: {
        deathlabs: { name: "Deathlabs Void", value: "#101018" },
        surface: { name: "Deathlabs Surface", value: "#181820" },
        light: { name: "Light", value: "#ffffff" },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    viewport: {
      options: {
        mobile: {
          name: "Mobile (390 × 844)",
          styles: { height: "844px", width: "390px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet (768 × 1024)",
          styles: { height: "1024px", width: "768px" },
          type: "tablet",
        },
        desktop: {
          name: "Desktop (1440 × 900)",
          styles: { height: "900px", width: "1440px" },
          type: "desktop",
        },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "deathlabs" },
    viewport: { value: "desktop", isRotated: false },
  },
};

export default preview;
