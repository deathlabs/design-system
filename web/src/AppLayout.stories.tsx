import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppLayout } from "./AppLayout.js";

const sidebar = (
  <List aria-label="Example navigation">
    <ListItemButton selected>
      <ListItemIcon>
        <DashboardOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Overview" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SettingsOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
  </List>
);

const content = (
  <Stack spacing={3} sx={{ py: 4 }}>
    <Box>
      <Typography component="h1" variant="h4">
        Mission Overview
      </Typography>
      <Typography color="text.secondary">
        Use this canvas to inspect the responsive application shell.
      </Typography>
    </Box>
    <Paper sx={{ p: 3 }}>
      <Typography component="h2" variant="h6">
        Operational Status
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        All systems are operating normally.
      </Typography>
      <Button sx={{ mt: 3 }} variant="contained">
        View Details
      </Button>
    </Paper>
  </Stack>
);

const meta = {
  title: "Web/AppLayout",
  component: AppLayout,
  parameters: {
    docs: {
      description: {
        component:
          "Responsive application chrome with an app bar, desktop and mobile sidebars, content container, and optional classification marking.",
      },
    },
  },
  argTypes: {
    classification: {
      control: "select",
      options: [
        undefined,
        "UNCLASSIFIED",
        "CUI",
        "CONFIDENTIAL",
        "SECRET",
        "TOP SECRET",
        "TOP SECRET // SCI",
      ],
    },
    children: { control: false },
    sidebar: { control: false },
    actions: { control: false },
  },
  args: {
    actions: (
      <IconButton aria-label="Notifications" color="inherit">
        <NotificationsOutlinedIcon />
      </IconButton>
    ),
    children: content,
    sidebar,
    title: "Deathlabs Console",
  },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CollapsedSidebar: Story = {
  args: {
    sidebarOpen: false,
  },
};

export const Classified: Story = {
  args: {
    classification: "SECRET",
  },
};

export const Mobile: Story = {
  globals: {
    viewport: { value: "mobile", isRotated: false },
  },
};
