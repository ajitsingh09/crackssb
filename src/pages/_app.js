import { ThemeProvider } from '@mui/material';
import { darkTheme } from '../theme/theme';
import Layout from '../components/Layout';
import CssBaseline from '@mui/material/CssBaseline';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}

export default MyApp; 