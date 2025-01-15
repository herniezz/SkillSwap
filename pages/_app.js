import { useState, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { ClerkProvider } from '@clerk/nextjs';
import '@/styles/globals.css';
import Sidebar from '../components/sidebar'; // Import Sidebar

export default function MyApp({ Component, pageProps }) {
    const [publishableKey, setPublishableKey] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the Clerk publishable key from the backend
        const fetchClerkKey = async () => {
            try {
                const response = await fetch(
                    'https://fast-peak-76057-7dc46f68d3e1.herokuapp.com/api/clerk-key',
                    { cache: 'no-store' } // Ensure fresh data
                );
                console.log('API Fetch Response:', response);

                if (!response.ok) {
                    const errorData = await response.text();
                    throw new Error(`Error ${response.status}: ${errorData}`);
                }

                const data = await response.json();
                console.log('API Response JSON:', data);

                if (!data.publishableKey) {
                    throw new Error('Publishable key is missing in the response');
                }

                setPublishableKey(data.publishableKey);
            } catch (error) {
                console.error('Error fetching Clerk publishable key:', error);
                setError(error.message);
            }
        };

        fetchClerkKey();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!publishableKey) {
        return <div>Loading...</div>; // Display a loading state while fetching the key
    }

    return (
        <ClerkProvider publishableKey={publishableKey}>
            <MantineProvider
                theme={{
                    colorScheme: 'light',
                    colors: {
                        violet: ['#D9D9D9', '#BE8DFF'], // violet shades
                        dark: ['#2A2A2A'], // dark shades
                    },
                    primaryColor: 'violet', // set violet as the primary color
                    components: {
                        Button: {
                            styles: (theme) => ({
                                root: {
                                    borderRadius: '12px',
                                    backgroundColor: '#D9D9D9',
                                    color: '#2A2A2A',
                                    transition: 'background-color 0.3s ease, color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#BE8DFF',
                                        color: theme.white,
                                    },
                                    '&:active': {
                                        backgroundColor: '#BE8DFF',
                                        color: theme.white,
                                    },
                                },
                            }),
                        },
                        Paper: {
                            styles: () => ({
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
                <div style={{ display: 'flex' }}>
                    {/* Sidebar zawsze obecny */}
                    <Sidebar />
                    {/* Główna zawartość strony */}
                    <div style={{ flex: 1, padding: '20px' }}>
                        <Component {...pageProps} />
                    </div>
                </div>
            </MantineProvider>
        </ClerkProvider>
    );
}
