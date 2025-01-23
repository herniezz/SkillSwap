import { useState } from "react";
import { Navbar, NavLink, Burger } from "@mantine/core";
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk, useUser } from "@clerk/nextjs";
import {
  IconStar,
  IconUsers,
  IconHome,
  IconUser,
  IconMessage,
  IconSettings,
  IconHelp,
  IconLogin,
  IconUserPlus,
} from "@tabler/icons-react";

export default function Sidebar() {
  const [opened, setOpened] = useState(true); // Kontroluje widoczność Sidebaru
  const { openUserProfile } = useClerk();    // Funkcja otwierająca panel zarządzania kontem
  const { isLoaded, user } = useUser();

  const loggedInLinks = [
    { label: "Strona główna", icon: IconHome, link: "https://herniezz.github.io/SkillSwap/" },
    { label: "Znajomi", icon: IconUsers, link: "https://herniezz.github.io/SkillSwap/ProposedProfiles" },
    { label: "Ulubione", icon: IconStar, link: "https://herniezz.github.io/SkillSwap/favorites" },
    { label: "Profil", icon: IconUser, link: "https://herniezz.github.io/SkillSwap/profiles/userChoices" },
    { label: "Wiadomości", icon: IconMessage, link: "https://herniezz.github.io/SkillSwap/messages" },
    { label: "Ustawienia", icon: IconSettings, action: openUserProfile }, // otwiera panel zarządzania
    { label: "Support", icon: IconHelp, link: "https://herniezz.github.io/SkillSwap/support" },
  ];

  const loggedOutLinks = [
    { label: "Strona główna", icon: IconHome, link: "https://herniezz.github.io/SkillSwap/" },
    { label: "Zaloguj się", icon: IconLogin, link: "https://herniezz.github.io/SkillSwap/signin" },
    { label: "Zarejestruj się", icon: IconUserPlus, link: "https://herniezz.github.io/SkillSwap/signup" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Ikona hamburgera */}
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        title={opened ? "Close sidebar" : "Open sidebar"}
        style={{ marginBottom: "1rem", margin: "10px"}}
      />

      {/* Sidebar dla zalogowanych użytkowników */}
      <SignedIn>
        {opened && (
          <Navbar width={{ base: 300 }} p="md">
            <center>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
              <UserButton
                appearance={{
                    elements: {
                        userButtonAvatarBox: {
                            width: '48px',  // Szerokość ikony
                            height: '48px', // Wysokość ikony
                        },
                    },
                }}
            />
            {/* Nazwa użytkownika */}
            {user && (
                <p style={{ marginTop: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                    Hej, {user.fullName || user.username || 'Unknown User'}👏
                </p>
            )}
              </SignedIn>
            </center>
            {loggedInLinks.map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                icon={<item.icon size={20} />}
                component={item.link ? "a" : "button"} // jeśli jest link, renderujemy jako <a>
                href={item.link || undefined}
                onClick={item.action || undefined}
                variant="filled"
                my="sm"
              />
            ))}
          </Navbar>
        )}
      </SignedIn>

      {/* Sidebar dla niezalogowanych użytkowników */}
      <SignedOut>
        {opened && (
          <Navbar width={{ base: 300 }} p="md">
            {loggedOutLinks.map((item) => (
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
      </SignedOut>
    </div>
  );
}
