import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  AppLayout,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Classification,
  DeathlabsThemeProvider,
  Link,
  Pagination,
  Paper,
  Stepper,
  Tabs,
} from '@deathlabs/design-system';
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FolderIcon from '@mui/icons-material/Folder';
import HeadsetIcon from '@mui/icons-material/Headset';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const sideNavBar = {
  items: [
    { name: 'Dashboard', href: '#dashboard', icon: <DashboardIcon /> },
    { name: 'Projects', href: '#projects', icon: <FolderIcon /> },
    { name: 'Settings', href: '#settings', icon: <SettingsIcon /> },
  ],
};

const topNavBar = {
  title: 'deathlabs',
  userMenu: [
    { name: 'User guide', href: '#user-guide', icon: <MenuBookIcon /> },
    { name: 'Developer guide', href: '#developer-guide', icon: <CodeIcon /> },
    { name: 'Submit feedback', href: '#feedback', icon: <FeedbackIcon /> },
    { name: 'Contact us', href: '#contact', icon: <HeadsetIcon /> },
  ],
};

export default function App() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <DeathlabsThemeProvider>
      <AppLayout
        classification={Classification.UNCLASSIFIED}
        sideNavBar={sideNavBar}
        topNavBar={topNavBar}
      >
        <Box
          sx={{
            minWidth: 0,
            width: 'min(100%, 960px)',
          }}
        >
            <Stack>
              <Box>
                <Typography gutterBottom variant="h4">
                  Design system primitives
                </Typography>
                <Typography color="text.secondary">
                  A compact view of navigation and surface components in the design system.
                </Typography>
              </Box>

              <Paper>
                <Tabs
                  aria-label="Dashboard sections"
                  value={tabValue}
                  onChange={(_event, nextValue) => setTabValue(nextValue)}
                  variant="scrollable"
                >
                  <Tab label="Overview" />
                  <Tab label="Activity" />
                  <Tab label="Settings" />
                </Tabs>
                <Box>
                  <Typography>
                    {['Overview content', 'Recent activity', 'Settings content'][tabValue]}
                  </Typography>
                </Box>
              </Paper>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                }}
              >
                <Card>
                  <CardActionArea>
                    <CardHeader subheader="Updated today" title="Surface primitives" />
                    <CardMedia
                      component="div"
                      sx={{
                        background: 'linear-gradient(135deg, #4D1E4A, #E057C9)',
                        height: 120,
                      }}
                    />
                    <CardContent>
                      <Typography color="text.secondary">
                        Cards group related content and actions on a distinct surface.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button>Learn more</Button>
                    <Button variant="contained">Open</Button>
                  </CardActions>
                </Card>

                <Box>
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<span aria-hidden="true">+</span>}>
                      <Typography>Theme settings</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="text.secondary">
                        Review the dark palette and custom surface tokens.
                      </Typography>
                    </AccordionDetails>
                    <AccordionActions>
                      <Button>Cancel</Button>
                      <Button variant="contained">Apply</Button>
                    </AccordionActions>
                  </Accordion>
                </Box>
              </Box>

              <Paper>
                <Typography gutterBottom variant="h6">
                  Project setup
                </Typography>
                <Stepper activeStep={1} alternativeLabel>
                  {['Create', 'Configure', 'Publish'].map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>

              <Stack sx={{ alignItems: 'center' }}>
                <Pagination count={8} color="secondary" />
                <Link href="#">View navigation documentation</Link>
              </Stack>
            </Stack>
          </Box>
      </AppLayout>
    </DeathlabsThemeProvider>
  );
}
