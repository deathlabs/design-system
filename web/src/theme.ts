import { createTheme } from "@mui/material/styles";

export const DeathlabsTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9250E8",
      contrastText: "#101018",
    },
    secondary: {
      main: "#F554B8",
      contrastText: "#101018",
    },
    success: {
      main: "#B8FF36",
      contrastText: "#101018",
    },
    warning: {
      main: "#FF873D",
      contrastText: "#101018",
    },
    info: {
      main: "#9250E8",
      contrastText: "#101018",
    },
    background: {
      default: "#101018",
      paper: "#181820",
    },
    divider: "#393842",
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 700,
          letterSpacing: "0.03em",
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          letterSpacing: "0.04em",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
          },
        }),
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 2,
        },
      },
    },
  },
});
