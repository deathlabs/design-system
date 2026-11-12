import { createTheme } from "@mui/material/styles";

export const DeathlabsTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#FF7A1A",
          light: "#FFA05C",
          dark: "#CC5A00",
          contrastText: "#101112",
        },
        secondary: {
          main: "#4D9EFF",
          light: "#7DB4FF",
          dark: "#1F5FBF",
          contrastText: "#101112",
        },
        success: {
          main: "#3DDC84",
        },
        warning: {
          main: "#FFD23F",
        },
        error: {
          main: "#FF3B4E",
        },
        info: {
          main: "#4D9EFF",
        },
        background: {
          default: "#FFF4E8",
          paper: "#FFE0C7",
        },
        divider: "#CC5A00",
        text: {
          primary: "#101112",
          secondary: "#2B2E33",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#FF7A1A",
          light: "#FFA05C",
          dark: "#CC5A00",
          contrastText: "#101112",
        },
        secondary: {
          main: "#4D9EFF",
          light: "#7DB4FF",
          dark: "#1F5FBF",
          contrastText: "#101112",
        },
        success: {
          main: "#3DDC84",
        },
        warning: {
          main: "#FFD23F",
        },
        error: {
          main: "#FF3B4E",
        },
        info: {
          main: "#4D9EFF",
        },
        background: {
          default: "#121314",
          paper: "#1A1C1E",
        },
        divider: "#2B2E33",
        text: {
          primary: "#E4E6E8",
          secondary: "#9AA0A6",
        },
      },
    },
  },
});
