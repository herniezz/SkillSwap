import { Avatar, Button, Card, Text, Title } from '@mantine/core';
import styles from '../styles/pages/profile.module.css';

export default function ProfileLayout({ profile }) {
    if (!profile) {
        return (
            <div className={styles.container}>
                <Title order={3}>Profile not found</Title>
                <Text>Uh oh! It seems we swapped too much. :(</Text>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Card shadow="sm" padding="lg" radius="md" className={styles.profileCard}>
                <div className={styles.header}>
                    <Avatar src={profile.avatar} size="xl" radius="50%" />
                    <div>
                        <Title order={3}>{profile.name}</Title>
                        <Text size="lg">{profile.age} lat</Text>
                    </div>
                </div>
                <div className={styles.skills}>
                    {profile.skills.map((skill, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            radius="lg"
                            size="sm"
                            className={styles.skillButton}
                        >
                            {skill}
                        </Button>
                    ))}
                </div>
                <Button className={styles.messageButton}>wyślij wiadomość</Button>
                <Title order={4} className={styles.sectionTitle}>
                    Coś o mnie...
                </Title>
                <Text className={styles.bio}>{profile.bio}</Text>
                <Title order={4} className={styles.sectionTitle}>
                    Więcej mnie...
                </Title>
                <div className={styles.gallery}>
                    {profile.gallery.map((image, index) => (
                        <img key={index} src={image} alt={`Gallery ${index + 1}`} className={styles.galleryImage} />
                    ))}
                </div>
            </Card>
        </div>
    );
}
