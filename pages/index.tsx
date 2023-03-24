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
      main: '#000000',
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
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
              <Typography component="h1" variant="h2" align="center" color="primary" gutterBottom>
                Check Connection
              </Typography>
              <Typography variant="body1" align="center" color="secondary" paragraph>
                このページでは、指定したMACアドレスのデバイスの接続状況を確認できます。
              </Typography>
              <ConnectTable/>
            </Container> 
          </ThemeProvider>                 
        </div>
      </main>
    </div>
  );
}
