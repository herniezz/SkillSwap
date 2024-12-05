import { MantineProvider } from '@mantine/core';

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'
  import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    return (

        <ClerkProvider>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
    <Component {...pageProps} />

        <MantineProvider
            theme={{
                colorScheme: 'light', // jasny kolor
                colors: {
                    violet: ['#D9D9D9', '#BE8DFF'], // fiolet
                    dark: ['#2A2A2A'], //
                },
                primaryColor: 'violet', // ustawienie fioletu na glowny kolor
                components: {
                    Button: {
                        styles: (theme) => ({
                            root: {
                                borderRadius: '12px', // te takie ronded corners
                                backgroundColor: '#D9D9D9', // szare tlo
                                color: '#2A2A2A', // tekst kolor
                                transition: 'background-color 0.3s ease, color 0.3s ease', // przejscie na hover
                                '&:hover': {
                                    backgroundColor: '#BE8DFF', // jasny fiolet kiedy sie hoveruje
                                    color: theme.white, // bialy tekst podczas hovera
                                },
                                '&:active': {
                                    backgroundColor: '#BE8DFF', // fiolet jako glowny kolor
                                    color: theme.white, // bialy tekst jesli to fiolet
                                },
                            },
                        }),
                    },
                    Paper: {
                        styles: (theme) => ({
                            root: {
                                padding: '24px',
                                borderRadius: '16px',
                                backgroundColor: '#FFFFFF',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                            },
                        }),
                    },
                },
            }}
            withGlobalStyles
            withNormalizeCSS
        >
            <Component {...pageProps} />
        </MantineProvider>
        </ClerkProvider>
    );
}