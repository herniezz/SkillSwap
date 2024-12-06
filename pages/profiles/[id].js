import { Title, Text } from '@mantine/core';
import styles from '../../styles/pages/profile.module.css';

export default function Profile() {
    return (
        <div className={styles.container}>
            <Title order={3} className={styles.title}>Uh oh, you got us. It just doesn't work!</Title>
        </div>
    );
}