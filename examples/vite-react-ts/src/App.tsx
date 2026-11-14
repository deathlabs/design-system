import {
  AppLayout,
  Classification,
  DeathlabsThemeProvider,
  PageContent,
  PageHeader,
} from '@deathlabs/design-system';
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FolderIcon from '@mui/icons-material/Folder';
import HeadsetIcon from '@mui/icons-material/Headset';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import Typography from '@mui/material/Typography';

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
  return (
    <DeathlabsThemeProvider>
      <AppLayout
        classification={Classification.UNCLASSIFIED}
        sideNavBar={sideNavBar}
        topNavBar={topNavBar}
      >
        <PageContent>
          <PageHeader>Dashboard</PageHeader>
          <Typography color="text.secondary">
            View and manage your application from this dashboard.
          </Typography>
        </PageContent>
      </AppLayout>
    </DeathlabsThemeProvider>
  );
}
