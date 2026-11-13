import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  AppLayout,
  Breadcrumbs,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Classification,
  ClassificationBanner,
  DeathlabsThemeProvider,
  Link,
  Pagination,
  Paper,
  SideNavBar,
  Stepper,
  Tabs,
  TopNavBar,
  UserMenu,
} from '@deathlabs/design-system';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function App() {
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [sideNavSelection, setSideNavSelection] = useState('Dashboard');
  const [tabValue, setTabValue] = useState(0);

  return (
    <DeathlabsThemeProvider>
      <AppLayout
        classificationBanner={
          <ClassificationBanner
            type={Classification.UNCLASSIFIED}
            sx={{ flexShrink: 0, position: 'static', width: '100%' }}
          />
        }
        topNavigation={
          <TopNavBar title="deathlabs">
            <UserMenu />
          </TopNavBar>
        }
        sideNavigation={
          <SideNavBar open={sideNavOpen} onOpenChange={setSideNavOpen}>
            <List aria-label="Example navigation">
              {['Dashboard', 'Projects', 'Settings'].map((label) => (
                <ListItemButton
                  key={label}
                  aria-label={label}
                  selected={sideNavSelection === label}
                  onClick={() => setSideNavSelection(label)}
                  sx={{ minHeight: 44, px: 1.25 }}
                >
                  <Box
                    aria-hidden
                    sx={{ flexShrink: 0, textAlign: 'center', width: 24 }}
                  >
                    {label[0]}
                  </Box>
                  <ListItemText
                    primary={label}
                    sx={{ ml: 2, opacity: sideNavOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              ))}
            </List>
          </SideNavBar>
        }
      >
        <Box
          sx={{
            mx: 'auto',
            minWidth: 0,
            p: { xs: 2, sm: 3 },
            width: 'min(100%, 960px)',
          }}
        >
            <Stack spacing={3}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link href="#">Home</Link>
                <Link href="#">Components</Link>
                <Typography color="text.primary">Navigation</Typography>
              </Breadcrumbs>

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
                <Box sx={{ p: 3 }}>
                  <Typography>
                    {['Overview content', 'Recent activity', 'Settings content'][tabValue]}
                  </Typography>
                </Box>
              </Paper>

              <Box
                sx={{
                  display: 'grid',
                  gap: 3,
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

              <Paper sx={{ p: { xs: 2, sm: 3 } }}>
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

              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <Pagination count={8} color="secondary" />
                <Link href="#">View navigation documentation</Link>
              </Stack>
            </Stack>
          </Box>
      </AppLayout>
    </DeathlabsThemeProvider>
  );
}
