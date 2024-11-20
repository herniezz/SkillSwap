import { useRouter } from 'next/router';
import { Button, Title, Text } from '@mantine/core';
import styles from '../../styles/pages/profile.module.css';

export default function Profile() {
    const router = useRouter();
    const { id } = router.query; // Pobieramy id z URL

    // Przykładowe dane użytkownika
    const user = id ? { name: 'Jan Kowalski', age: 30 } : null;

    const handleRedirectHome = () => {
        // Przekierowanie do strony głównej
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <Title order={3} className={styles.title}>User Profile</Title>
            {user ? (
                <div>
                    <Text>Name: {user.name}</Text>
                    <Text>Age: {user.age}</Text>
                </div>
            ) : (
                <Text>Loading user profile...</Text>
            )}
            <Button onClick={handleRedirectHome}>Go to Home</Button>
        </div>
    );
}








