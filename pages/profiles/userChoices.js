import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
    Container,
    Card,
    Button,
    TextInput,
    Group,
} from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

import pageStructure from '../../data/page_structure.json';
import { flattenPageStructure } from '../../utils/flattenPageStructure';

import styles from '../../styles/pages/search.module.css';

export default function SearchPage() {
    const { isSignedIn } = useUser();
    const [search, setSearch] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [popup, setPopup] = useState('');

    const handleFavoriteClick = (tag) => {
        if (favorites.includes(tag)) {
            setFavorites((prev) => prev.filter((fav) => fav !== tag));
            setPopup(`Usunięto "${tag}" z ulubionych!`);
        } else {
            setFavorites((prev) => [...prev, tag]);
            setPopup(`Dodano "${tag}" do ulubionych!`);
        }
        setTimeout(() => setPopup(''), 2000);
    };

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
                    <button className={styles.categoryButton}>
                        {item.name}
                    </button>

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
                                <Button
                                    variant="light"
                                    radius="xl"
                                    size="sm"
                                    className={styles.skillButton}
                                >
                                    {tag}
                                </Button>

                                {favorites.includes(tag) ? (
                                    <IconHeartFilled
                                        size={18}
                                        className={styles.heartIcon}
                                        color="red"
                                        onClick={() => handleFavoriteClick(tag)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                ) : (
                                    <IconHeart
                                        size={18}
                                        className={styles.heartIcon}
                                        onClick={() => handleFavoriteClick(tag)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                            </div>
                        ))}
                    </Group>
                </Card>
            ))}

            {!isSignedIn && (
                <Button
                    variant="outline"
                    color="red"
                    style={{ marginTop: 20 }}
                >
                    Please sign in to save your favorite tags
                </Button>
            )}

            {popup && (
                <div className={styles.toast}>
                    <div className={styles.toastContent}>{popup}</div>
                </div>
            )}
        </Container>
    );
}
