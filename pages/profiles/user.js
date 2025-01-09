import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { TextInput, Card, Title as MantineTitle, Badge, Group, Button, Stack, Container } from '@mantine/core';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'page_structures.json');
  let tags = [];

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    tags = JSON.parse(`[${fileContents}]`);
  } catch (error) {
    console.error('Error reading page_structures.json:', error);
  }

  return {
    props: {
      tags,
    },
  };
}

export default function Home({ tags = [] }) {
  const { isSignedIn } = useUser();
  const [search, setSearch] = useState('');

  const categories = tags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag.name);
    return acc;
  }, {});

  return (
    <Container size="sm" padding="md">
      <TextInput
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb="lg"
      />
      <Stack spacing="lg">
        {Object.keys(categories).map((category, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
            <MantineTitle order={2}>{category}</MantineTitle>
            <Group spacing="xs" mt="md">
              {categories[category]
                .filter((tag) => tag.toLowerCase().includes(search.toLowerCase()))
                .map((tag, idx) => (
                  <Badge key={idx} color="teal" variant="light" size="lg">
                    {tag} <Button variant="subtle" size="xs" ml={4} compact>❤️</Button>
                  </Badge>
                ))}
            </Group>
          </Card>
        ))}
      </Stack>
      {!isSignedIn && <Button variant="outline" color="red" mt="lg">Please sign in to save your favorite tags</Button>}
    </Container>
  );
}
