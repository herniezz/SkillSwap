import { useState } from 'react';
import { Navbar, NavLink, Burger } from '@mantine/core';
import { IconStar, IconUsers, IconHome, IconUser, IconMessage, IconSettings, IconHelp } from '@tabler/icons-react';

export default function Sidebar() {
  const [opened, setOpened] = useState(true); // Kontroluje widoczność Sidebaru
  const links = [
    { label: 'Ulubione', icon: IconStar, link: '/favorites' },
    { label: 'Znajomi', icon: IconUsers, link: '/friends' },
    { label: 'Strona główna', icon: IconHome, link: '/' },
    { label: 'Profil', icon: IconUser, link: '/profile' },
    { label: 'Wiadomości', icon: IconMessage, link: '/messages' },
    { label: 'Ustawienia', icon: IconSettings, link: '/settings' },
    { label: 'Support', icon: IconHelp, link: '/support' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Ikona hamburgera */}
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)} // Przełącznik widoczności
        title={opened ? 'Close sidebar' : 'Open sidebar'}
        style={{ marginBottom: '1rem' }}
      />

      {/* Sidebar */}
      {opened && (
        <Navbar width={{ base: 300 }} p="md">
          {links.map((item) => (
            <NavLink
              key={item.label}
              label={item.label}
              icon={<item.icon size={20} />}
              component="a"
              href={item.link}
              variant="filled"
              my="sm"
            />
          ))}
        </Navbar>
      )}
    </div>
  );
}
