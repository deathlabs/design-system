import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CodeIcon from '@mui/icons-material/Code'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import { useState } from 'react'

const metrics = [
  { label: 'Illustrative projects', value: '12', detail: '+2 this week' },
  { label: 'Illustrative uptime', value: '99.9%', detail: 'Past 30 days' },
  { label: 'Illustrative reviews', value: '8', detail: '3 ready today' },
]

function App() {
  const { mode, setMode } = useColorScheme()
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(null)
  const isUserMenuOpen = Boolean(userMenuAnchor)

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Toolbar>
          <Typography component="span" variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            deathlabs
          </Typography>
          {mode && (
            <FormControlLabel
              control={
                <Switch
                  checked={mode === 'dark'}
                  inputProps={{ 'aria-label': 'Toggle dark mode' }}
                  onChange={(event) => setMode(event.target.checked ? 'dark' : 'light')}
                />
              }
              label="Dark mode"
            />
          )}
          <ButtonBase
            aria-controls={isUserMenuOpen ? 'user-menu' : undefined}
            aria-expanded={isUserMenuOpen ? 'true' : undefined}
            aria-haspopup="menu"
            aria-label="Open user menu"
            onClick={(event) => setUserMenuAnchor(event.currentTarget)}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              gap: 1,
              ml: 1,
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
            <Box>
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
                  bgcolor: '#3D3F41',
                  color: '#E4E6E8',
                  mt: 1,
                  minWidth: 320,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <Box sx={{ borderBottom: 1, borderColor: '#5B5E62', px: 2, py: 1.5 }}>
              <Typography sx={{ fontWeight: 700 }}>Victor Fernandez III</Typography>
              <Typography sx={{ color: '#9AA0A6' }} variant="body2">
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
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={4}>
          <Paper variant="outlined" sx={{ overflow: 'hidden', p: { xs: 3, md: 5 } }}>
            <Stack spacing={2.5} sx={{ alignItems: 'flex-start' }}>
              <Chip label="Illustrative interface" color="secondary" variant="outlined" />
              <Typography component="h1" variant="h3" sx={{ maxWidth: 720, fontWeight: 700 }}>
                A compact workspace built with the local theme provider
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 680 }}>
                This fake dashboard demonstrates standard Material UI surfaces, typography,
                controls, and responsive spacing. It does not represent live data.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button variant="contained">Primary action</Button>
                <Button color="secondary" variant="outlined">
                  Secondary action
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Box
            aria-label="Illustrative metrics"
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            }}
          >
            {metrics.map((metric) => (
              <Card key={metric.label} variant="outlined">
                <CardContent>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    {metric.label}
                  </Typography>
                  <Typography component="p" variant="h4" sx={{ fontWeight: 700 }}>
                    {metric.value}
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    {metric.detail}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Alert severity="info" variant="outlined">
            All names, figures, and activity shown here are illustrative demo content.
          </Alert>
        </Stack>
      </Container>
    </Box>
  )
}

export default App
