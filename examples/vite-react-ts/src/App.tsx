import { Button, DeathlabsThemeProvider } from '@deathlabs/design-system';

export default function App() {
  return (
    <DeathlabsThemeProvider>
      <Button variant="contained">Save</Button>
    </DeathlabsThemeProvider>
  );
}
