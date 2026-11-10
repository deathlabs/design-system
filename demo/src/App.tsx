import Alert from '@mui/material/Alert'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const metrics = [
  { label: 'Illustrative projects', value: '12', detail: '+2 this week' },
  { label: 'Illustrative uptime', value: '99.9%', detail: 'Past 30 days' },
  { label: 'Illustrative reviews', value: '8', detail: '3 ready today' },
]

function App() {
  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography component="span" variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            deathlabs
          </Typography>
          <Chip label="Local theme preview" color="secondary" size="small" />
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={4}>
          <Paper variant="outlined" sx={{ overflow: 'hidden', p: { xs: 3, md: 5 } }}>
            <Stack spacing={2.5} sx={{ alignItems: 'flex-start' }}>
              <Chip label="Illustrative interface" color="primary" variant="outlined" />
              <Typography component="h1" variant="h3" sx={{ maxWidth: 720, fontWeight: 700 }}>
                A compact workspace built with the local theme provider
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 680 }}>
                This fake dashboard demonstrates standard Material UI surfaces, typography,
                controls, and responsive spacing. It does not represent live data.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button variant="contained">Primary action</Button>
                <Button variant="outlined">Secondary action</Button>
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

          <Alert severity="info">
            All names, figures, and activity shown here are illustrative demo content.
          </Alert>
        </Stack>
      </Container>
    </Box>
  )
}

export default App
