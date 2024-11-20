import { useRouter } from 'next/router';
import { Button, Title, Text } from '@mantine/core';
import styles from '../styles/pages/search-results.module.css';

export default function SearchResults() {
    const router = useRouter();
    const { query } = router.query; // Pobieramy zapytanie z URL

    // Przykładowe wyniki wyszukiwania (możesz je zastąpić rzeczywistymi wynikami)
    const results = query ? [`Result for: ${query}`] : [];

    const handleRedirectHome = () => {
        // Przekierowanie na stronę główną
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <Title order={3} className={styles.title}>Search Results</Title>
            {results.length > 0 ? (
                <div>
                    {results.map((result, index) => (
                        <Text key={index} className={styles.resultText}>
                            {result}
                        </Text>
                    ))}
                </div>
            ) : (
                <Text>No results found for "{query}"</Text>
            )}
            <Button onClick={handleRedirectHome}>Go to Home</Button>
        </div>
    );
}