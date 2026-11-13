import {
  AppBar,
  BottomNavigation,
  Breadcrumbs,
  Button,
  DeathlabsThemeProvider,
  Drawer,
  Link,
  Menu,
  Pagination,
  SpeedDial,
  Stepper,
  Tabs,
} from '@deathlabs/design-system';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

export default function App() {
  const [bottomNavigationValue, setBottomNavigationValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [tabValue, setTabValue] = useState(0);

  const closeMenu = () => setMenuAnchor(null);

  return (
    <DeathlabsThemeProvider>
      <Box sx={{ minHeight: '100vh', pb: 10 }}>
        <AppBar position="sticky">
          <Toolbar sx={{ gap: 2 }}>
            <Button color="inherit" onClick={() => setDrawerOpen(true)}>
              Menu
            </Button>
            <Typography sx={{ flexGrow: 1 }} variant="h6">
              deathlabs
            </Typography>
            <Button
              aria-controls={menuAnchor ? 'account-menu' : undefined}
              aria-expanded={menuAnchor ? 'true' : undefined}
              aria-haspopup="true"
              color="inherit"
              onClick={(event) => setMenuAnchor(event.currentTarget)}
            >
              Account
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 260 }}>
            <Typography sx={{ p: 2 }} variant="h6">
              Navigation
            </Typography>
            <List>
              {['Dashboard', 'Projects', 'Settings'].map((label) => (
                <ListItemButton key={label} onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>

        <Menu
          anchorEl={menuAnchor}
          id="account-menu"
          open={Boolean(menuAnchor)}
          onClose={closeMenu}
        >
          <MenuItem onClick={closeMenu}>Profile</MenuItem>
          <MenuItem onClick={closeMenu}>Sign out</MenuItem>
        </Menu>

        <Box
          component="main"
          sx={{
            mx: 'auto',
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
                Navigation primitives
              </Typography>
              <Typography color="text.secondary">
                A compact view of the navigation components in the design system.
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

        <SpeedDial
          ariaLabel="Create item"
          icon={<span aria-hidden="true">+</span>}
          sx={{ bottom: 80, position: 'fixed', right: 24 }}
        />

        <Paper
          elevation={8}
          sx={{ bottom: 0, left: 0, position: 'fixed', right: 0, zIndex: 1200 }}
        >
          <BottomNavigation
            showLabels
            value={bottomNavigationValue}
            onChange={(_event, nextValue) => setBottomNavigationValue(nextValue)}
          >
            <BottomNavigationAction label="Home" />
            <BottomNavigationAction label="Projects" />
            <BottomNavigationAction label="Profile" />
          </BottomNavigation>
        </Paper>
      </Box>
    </DeathlabsThemeProvider>
  );
}
