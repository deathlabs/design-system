import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { DeathlabsThemeProvider } from "./DeathlabsThemeProvider.js";

const palette = [
  ["Primary", "primary.main"],
  ["Secondary", "secondary.main"],
  ["Success", "success.main"],
  ["Warning", "warning.main"],
  ["Background", "background.default"],
  ["Surface", "background.paper"],
] as const;

const meta = {
  title: "Foundation/DeathlabsThemeProvider",
  component: DeathlabsThemeProvider,
  parameters: {
    docs: {
      description: {
        component:
          "Applies the Deathlabs Material UI theme and CssBaseline. Storybook uses this provider globally; this story visualizes its key tokens and component defaults.",
      },
    },
  },
} satisfies Meta<typeof DeathlabsThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeOverview: Story = {
  render: () => (
    <Stack spacing={4} sx={{ p: 4 }}>
      <Box>
        <Typography component="h1" variant="h4">
          Deathlabs Theme
        </Typography>
        <Typography color="text.secondary">
          Core palette and representative Material UI component states.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        }}
      >
        {palette.map(([label, color]) => (
          <Paper key={label} sx={{ overflow: "hidden" }}>
            <Box sx={{ bgcolor: color, height: 72 }} />
            <Typography sx={{ p: 2 }}>{label}</Typography>
          </Paper>
        ))}
      </Box>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="contained">Primary Action</Button>
        <Button color="secondary" variant="contained">
          Secondary Action
        </Button>
        <Button variant="outlined">Outlined Action</Button>
        <Chip color="success" label="Operational" />
      </Stack>

      <TextField label="Mission Name" value="Nightfall" />
      <Alert severity="warning">Review the launch parameters.</Alert>
    </Stack>
  ),
};
