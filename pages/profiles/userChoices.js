import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
    Container,
    Card,
    Button,
    TextInput,
    Group,
} from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

import pageStructure from '../../data/page_structure.json';
import { flattenPageStructure } from '../../utils/flattenPageStructure';

import styles from '../../styles/pages/search.module.css';

export default function SearchPage() {
    const { isSignedIn } = useUser();
    const [search, setSearch] = useState('');

    // 1) Flatten JSON
    const allItems = flattenPageStructure(pageStructure);

    // 2) Filter
    const filteredData = allItems.filter(({ name, tags }) => {
        const q = search.toLowerCase();
        return (
            name.toLowerCase().includes(q) ||
            tags.some((tag) => tag.toLowerCase().includes(q))
        );
    });

    return (
        <Container
            fluid
            className={styles.container}
            style={{
                padding: 20,
                backgroundColor: '#f0f0f0',
                minHeight: '100vh',
            }}
        >
            <TextInput
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                style={{
                    maxWidth: 500,
                    marginBottom: 20,
                }}
            />

            {filteredData.map((item, index) => (
                <Card
                    key={index}
                    className={styles.card}
                    shadow="sm"
                    radius="md"
                    withBorder
                    style={{ marginBottom: 20 }}
                >
                    {/* Category button using CSS class */}
                    <button className={styles.categoryButton}>
                        {item.name}
                    </button>

                    {/* Tag pills with hearts to the right */}
                    <Group spacing="xs" style={{ flexWrap: 'wrap', gap: 8 }}>
                        {item.tags.map((tag, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                            >
                                {/* Button styled with hover effects using skillButton class */}
                                <Button
                                    variant="light"
                                    radius="xl"
                                    size="sm"
                                    className={styles.skillButton}
                                >
                                    {tag}
                                </Button>

                                {/* Heart icon with hover effect */}
                                <IconHeart
                                    size={18}
                                    className={styles.heartIcon}
                                    onClick={() => {
                                        console.log('Favorited tag:', tag);
                                    }}
                                />
                            </div>
                        ))}
                    </Group>
                </Card>
            ))}

            {/* Sign in notice if not logged in */}
            {!isSignedIn && (
                <Button
                    variant="outline"
                    color="red"
                    style={{ marginTop: 20 }}
                >
                    Please sign in to save your favorite tags
                </Button>
            )}
        </Container>
    );
}
