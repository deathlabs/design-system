import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CodeIcon from '@mui/icons-material/Code'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { AppLayout } from '@deathlabs/design-system'
import { useState } from 'react'

const navigation = [
  { label: 'Overview', icon: <DashboardOutlinedIcon /> },
  { label: 'App Layout', icon: <ViewSidebarOutlinedIcon /> },
  { label: 'Classification Banner', icon: <SecurityOutlinedIcon /> },
]

function App() {
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedNavigation, setSelectedNavigation] = useState('Overview')
  const isUserMenuOpen = Boolean(userMenuAnchor)

  const userMenu = (
    <>
      <ButtonBase
        aria-controls={isUserMenuOpen ? 'user-menu' : undefined}
        aria-expanded={isUserMenuOpen ? 'true' : undefined}
        aria-haspopup="menu"
        aria-label="Open user menu"
        onClick={(event) => setUserMenuAnchor(event.currentTarget)}
        sx={{
          border: 1,
          borderColor: 'divider',
          borderRadius: 1,
          gap: 1,
          px: 1,
          py: 0.5,
          textAlign: 'left',
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            color: 'secondary.contrastText',
            height: 32,
            width: 32,
          }}
        >
          <AccountCircleOutlinedIcon />
        </Avatar>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }} variant="body2">
            Victor Fernandez III
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.2 }} variant="caption">
            victor@deathlabs.io
          </Typography>
        </Box>
      </ButtonBase>
      <Menu
        anchorEl={userMenuAnchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        id="user-menu"
        onClose={() => setUserMenuAnchor(null)}
        open={isUserMenuOpen}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'background.paper',
              color: 'text.primary',
              mt: 1,
              minWidth: 320,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, py: 1.5 }}>
          <Typography sx={{ fontWeight: 700 }}>Victor Fernandez III</Typography>
          <Typography color="text.secondary" variant="body2">
            victor@deathlabs.io
          </Typography>
        </Box>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <MenuBookOutlinedIcon />
          </ListItemIcon>
          User guide
        </MenuItem>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <CodeIcon />
          </ListItemIcon>
          Development guide
        </MenuItem>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <FeedbackOutlinedIcon />
          </ListItemIcon>
          Share feedback
        </MenuItem>
        <MenuItem onClick={() => setUserMenuAnchor(null)}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <HeadsetMicOutlinedIcon />
          </ListItemIcon>
          Contact us
        </MenuItem>
      </Menu>
    </>
  )

  const sidebar = (
    <List aria-label="Primary navigation" sx={{ py: 2 }}>
      {navigation.map((item) => (
        <ListItemButton
          aria-current={selectedNavigation === item.label ? 'page' : undefined}
          aria-label={item.label}
          key={item.label}
          onClick={() => setSelectedNavigation(item.label)}
          selected={selectedNavigation === item.label}
          sx={(theme) => ({
            borderLeft: 4,
            borderColor: 'transparent',
            borderRadius: 0,
            color: 'text.secondary',
            justifyContent: { xs: 'flex-start', md: sidebarOpen ? 'flex-start' : 'center' },
            minHeight: 56,
            px: { xs: 2, md: sidebarOpen ? 2 : 0 },
            '&:hover': {
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: 'text.primary',
            },
            '&.Mui-selected': {
              bgcolor: alpha(theme.palette.primary.main, 0.22),
              borderColor: 'primary.main',
              color: 'text.primary',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.28),
              },
            },
          })}
        >
          <Tooltip placement="right" title={sidebarOpen ? '' : item.label}>
            <ListItemIcon
              sx={{
                color: 'inherit',
                justifyContent: 'center',
                minWidth: { xs: 48, md: sidebarOpen ? 48 : 0 },
              }}
            >
              {item.icon}
            </ListItemIcon>
          </Tooltip>
          <ListItemText
            primary={item.label}
            sx={{ display: { xs: 'block', md: sidebarOpen ? 'block' : 'none' } }}
          />
        </ListItemButton>
      ))}
    </List>
  )

  return (
    <AppLayout
      classification="UNCLASSIFIED"
      maxWidth="xl"
      onSidebarOpenChange={setSidebarOpen}
      sidebar={sidebar}
      sidebarOpen={sidebarOpen}
      title="Deathlabs Design System"
      userMenu={userMenu}
    >
      <Stack spacing={3} sx={{ py: { xs: 3, md: 5 } }}>
        <Box>
          <Typography component="h1" variant="h4">
            Deathlabs Design System
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            This demo shows the public layout and classification components with the Deathlabs
            Material UI theme.
          </Typography>
        </Box>

        <Paper data-testid="design-system-overview" variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Stack divider={<Divider flexItem />} spacing={3}>
            <Box>
              <Typography component="h2" variant="h6">
                DeathlabsThemeProvider
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Supplies the single Deathlabs theme and MUI CssBaseline to the application.
              </Typography>
            </Box>
            <Box>
              <Typography component="h2" variant="h6">
                AppLayout
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Provides the application bar, responsive sidebar, content region, and layout
                slots shown on this page.
              </Typography>
            </Box>
            <Box>
              <Typography component="h2" variant="h6">
                ClassificationBanner
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Displays the fixed UNCLASSIFIED marking at the top of this application.
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </AppLayout>
  )
}

export default App
