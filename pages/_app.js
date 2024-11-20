// pages/_app.js
import { MantineProvider } from '@mantine/core';

export default function MyApp({ Component, pageProps }) {
    return (
        <MantineProvider
            theme={{
                colorScheme: 'light',
                primaryColor: 'blue',
                components: {
                    Button: {
                        styles: (theme) => ({
                            root: {
                                borderRadius: '8px',
                                backgroundColor: theme.colors.blue[5],
                                color: theme.white,
                                '&:hover': {
                                    backgroundColor: theme.colors.blue[6],
                                },
                            },
                        }),
                    },
                    Paper: {
                        styles: {
                            root: {
                                padding: '16px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                backgroundColor: 'white',
                            },
                        },
                    },
                    Text: {
                        styles: {
                            root: {
                                backgroundColor: '#e0e7ef',
                                padding: '10px',
                                borderRadius: '8px',
                            },
                        },
                    },
                },
            }}
            withGlobalStyles
            withNormalizeCSS
        >
            <Component {...pageProps} />
        </MantineProvider>
    );
}
