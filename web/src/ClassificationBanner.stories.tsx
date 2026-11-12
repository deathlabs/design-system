import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ClassificationBanner,
  type Classification,
} from "./ClassificationBanner.js";

const classifications: Classification[] = [
  "UNCLASSIFIED",
  "CUI",
  "CONFIDENTIAL",
  "SECRET",
  "TOP SECRET",
  "TOP SECRET // SCI",
];

const meta = {
  title: "Web/ClassificationBanner",
  component: ClassificationBanner,
  args: {
    classification: "UNCLASSIFIED",
  },
  argTypes: {
    classification: {
      control: "select",
      options: classifications,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A fixed, portal-rendered classification marking that remains above application chrome and overlays.",
      },
    },
  },
} satisfies Meta<typeof ClassificationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Box sx={{ minHeight: 160, pt: 6, px: 3 }}>
      <ClassificationBanner {...args} />
      <Typography>
        Use the classification control to inspect every supported marking.
      </Typography>
    </Box>
  ),
};

export const AllClassifications: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <Stack spacing={2} sx={{ px: 3, pb: 3, pt: 27 }}>
      <Typography component="h1" variant="h5">
        Classification Markings
      </Typography>
      <Typography color="text.secondary">
        Every supported marking uses the same fixed, portal-rendered behavior.
      </Typography>
      {classifications.map((classification, index) => (
        <ClassificationBanner
          classification={classification}
          key={classification}
          sx={{ top: `${index * 32}px` }}
        />
      ))}
    </Stack>
  ),
};
