import { useRouter } from 'next/router'; // Import Next.js router
import { Avatar, Button, Card, Text, Title } from '@mantine/core';
import styles from '../styles/pages/proposed.profiles.module.css';

const profiles = [
    {
        id: 'ania', // Unique identifier for the profiles
        name: 'Ania Kowalska',
        age: 28,
        avatar: 'https://skillswapp.s3.eu-north-1.amazonaws.com/1736440390610-ania.png',
        skills: ['programowanie HTML', 'tenis', 'szydełkowanie'],
    },
    {
        id: 'bob',
        name: 'Bob Kowalski',
        age: 19,
        avatar: 'https://skillswapp.s3.eu-north-1.amazonaws.com/1736440406749-bob.png',
        skills: ['programowanie HTML', 'kreatywne pisanie'],
    },
    {
        id: 'kamala',
        name: 'Kamala Wiśniewska',
        age: 34,
        avatar: 'https://skillswapp.s3.eu-north-1.amazonaws.com/1736440419826-Kamala.png',
        skills: ['programowanie HTML'],
    },
];

export default function ProposedProfiles() {
    const router = useRouter(); // Initialize router

    // Function to handle redirection
    const handleProfileClick = (id) => {
        router.push(`/profiles/${id}`); // Redirect to the static demo page
    };

    return (
        <div>
            <div className={styles.container}>
                {profiles.map((profile) => (
                    <Card
                        key={profile.id}
                        shadow="sm"
                        p="lg"
                        className={styles.card}
                        onClick={() => handleProfileClick(profile.id)} // Add click handler
                        style={{ cursor: 'pointer' }} // Indicate clickable area
                    >
                        <div className={styles.profileHeader}>
                            <Avatar src={profile.avatar} size="lg" radius="xl" />
                            <div className={styles.profileInfo}>
                                <Title order={4}>{profile.name}</Title>
                                <Text size="lg">{profile.age}</Text>
                            </div>
                        </div>
                        <div className={styles.skills}>
                            {profile.skills.map((skill, idx) => (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    radius="lg"
                                    size="sm"
                                    className={styles.skillButton}
                                >
                                    {skill}
                                </Button>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
