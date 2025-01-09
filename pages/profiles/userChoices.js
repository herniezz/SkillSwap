import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { TextInput, Card, Title as MantineTitle, Badge, Group, Button, Stack, Container, Avatar, Text } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';

const categories = [
  { title: 'makijaż', tags: ['malowanie cieniami', 'baking', 'nakładnie bronzera','malowanie różu'] },
  { title: 'sport', tags: ['z piłką', 'wytrzymałościowe', 'zimowe', 'na dworze'] },
  { title: 'programowanie', tags: ['JavaScript', 'Python', 'C++', 'Ruby'] },
  { title: 'kulinarne', tags: ['ciasta', 'mięso', 'warzywa', 'zrównoważone posiłki'] },
];

export default function Home() {
  const { isSignedIn } = useUser();
  const [search, setSearch] = useState('');

  return (
    <Container size="sm" padding="md" style={{ backgroundColor: '#f8f4f0', padding: '20px', borderRadius: '12px' }}>
      <TextInput
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb="lg"
        style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}
      />
      <Stack spacing="lg">
        {categories.map((category, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Avatar src={`/images/${category.title}.png`} size="xl" radius="50%" />
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
      {!isSignedIn && (
        <Button variant="outline" color="red" mt="lg" style={{ marginTop: '20px' }}>
          Please sign in to save your favorite tags
        </Button>
      )}
    </Container>
  );
}
