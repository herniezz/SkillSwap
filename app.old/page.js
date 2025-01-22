"use client";

import { useState } from 'react';
import { TextInput, Card, Title as MantineTitle, Badge, Group, Button, Stack, Container, Avatar, Text } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

const categories = [
  { title: 'Makijaż', tags: ['malowanie cieniami', 'baking', 'nakładanie bronzera', 'malowanie różu'] },
  { title: 'Sport', tags: ['z piłką', 'wytrzymałościowe', 'zimowe', 'na dworze'] },
  { title: 'Programowanie', tags: ['JavaScript', 'Python', 'C++', 'Ruby'] },
  { title: 'Kulinarne', tags: ['ciasta', 'mięso', 'warzywa', 'zrównoważone posiłki'] },
];

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <Container size="sm" padding="md" style={{ backgroundColor: '#f8f4f0', padding: '20px', borderRadius: '12px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <MantineTitle order={1} style={{ fontSize: '2.5rem', color: '#333' }}>
          Welcome to SkillSwap! 🎉
        </MantineTitle>
        <Text size="lg" color="dimmed">
          Exchange skills like language learning, programming, cooking, and more. Connect, learn, and grow together! 😊
        </Text>
      </header>

      <TextInput
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb="lg"
        style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}
      />

      <Stack spacing="lg">
        {categories.map((category, index) => (
          <Card
            key={index}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Avatar src={`/images/${category.title.toLowerCase()}.png`} size="xl" radius="50%" alt={category.title} />
                <MantineTitle order={2} style={{ margin: 0 }}>{category.title}</MantineTitle>
              </div>
              <IconHeart size={24} style={{ color: '#ff6b6b', cursor: 'pointer' }} />
            </div>

            <Group spacing="xs" mt="md" style={{ flexWrap: 'wrap', gap: '8px' }}>
              {category.tags
                .filter((tag) => tag.toLowerCase().includes(search.toLowerCase()))
                .map((tag, idx) => (
                  <Button
                    key={idx}
                    variant="light"
                    radius="lg"
                    size="sm"
                    style={{ backgroundColor: '#f7f4e9', borderColor: '#d6d1c4', color: '#555' }}
                  >
                    {tag}
                  </Button>
                ))}
            </Group>
          </Card>
        ))}
      </Stack>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#777' }}>
        <Text>
          © 2025 SkillSwap. Built with ❤️ to help you learn and grow.
        </Text>
      </footer>
    </Container>
  );
}
