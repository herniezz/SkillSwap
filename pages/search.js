import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Title } from '@mantine/core';
import styles from '../styles/pages/search.module.css';
import Sidebar from '../components/sidebar';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        // Przekierowanie na stronę wyników wyszukiwania
        router.push(`/search-results?query=${query}`);
    };

    const handleRedirectHome = () => {
        // Przekierowanie do strony głównej
        router.push('/');
    };

    return (

        <div style={{ display: 'flex' }}>
        <Sidebar />

        <div className={styles.container}>
            <Title order={3} className={styles.title}>Search Page</Title>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter search query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <Button onClick={handleRedirectHome}>Go to Home</Button>
        </div>
        </div>
    );
};

export default SearchPage;

