import { Button, Container, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';

import ConnectTable from '@/components/ConnectTable';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});


export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <div>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="primary" gutterBottom>
              Welcome to my App
            </Typography>
            <Typography variant="h5" align="center" color="secondary" paragraph>
              This is a simple example of a Next.js app using Material-UI.
            </Typography>
          </Container>
          <ConnectTable/>                  
        </div>
      </main>
    </div>
  );
}
