import { Avatar, Button, Card, Text, Title } from '@mantine/core';
import styles from '../styles/pages/proposed.profiles.module.css';
import { DoubleNavbar } from '@/components/DoubleNavbar';

const profiles = [
    {
        name: 'Ania Kowalska',
        age: 28,
        avatar: '/assets/ania.png',
        skills: ['programowanie HTML', 'tenis', 'szydełkowanie'],
    },
    {
        name: 'Bob Kowalski',
        age: 19,
        avatar: '/assets/bob.png',
        skills: ['programowanie HTML', 'kreatywne pisanie'],
    },
    {
        name: 'Kamala Wiśniewska',
        age: 34,
        avatar: '/assets/Kamala.png',
        skills: ['programowanie HTML'],
    },
];

export default function ProposedProfiles() {
    return (
        <div>
            <DoubleNavbar />
            <div className={styles.container}>
                {profiles.map((profile, index) => (
                    <Card key={index} shadow="sm" p="lg" className={styles.card}>
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