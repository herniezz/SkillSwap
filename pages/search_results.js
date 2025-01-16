import { useState } from 'react';
import { TextInput, Card, Title, Badge, Group } from '@mantine/core';
import skillsData from '../data/page_structure.json'; // path to your JSON

export default function SearchSkills() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter logic:
    //  - Convert both the category and each skill to lowercase
    //  - Return any item whose category or subskill includes the search term
    const filteredData = skillsData.filter((item) => {
        const lowerCategory = item.category.toLowerCase();
        const matchesCategory = lowerCategory.includes(searchQuery.toLowerCase());

        // Check if *any* skill in the array matches
        const matchesAnySkill = item.skills.some((subSkill) =>
            subSkill.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return matchesCategory || matchesAnySkill;
    });

    return (
        <div style={{ padding: 16 }}>
            {/* Search bar */}
            <TextInput
                placeholder="Search..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.currentTarget.value)}
                mb="md"
            />

            {/* Display filtered results */}
            {filteredData.map((item) => (
                <Card key={item.category} shadow="sm" radius="md" mb="md">
                    <Title order={3} style={{ marginBottom: 8 }}>
                        {item.category}
                    </Title>
                    {/* The subskills (tags) */}
                    <Group spacing="xs">
                        {item.skills.map((skill, idx) => (
                            <Badge key={idx} variant="filled" color="gray">
                                {skill}
                            </Badge>
                        ))}
                    </Group>
                </Card>
            ))}
        </div>
    );
}
