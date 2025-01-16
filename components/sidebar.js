import { useState } from "react";
import { Navbar, NavLink, Burger } from "@mantine/core";
import { SignedIn, SignedOut, SignInButton, UserButton, useClerk } from "@clerk/nextjs";
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

  const loggedInLinks = [
    { label: "Ulubione", icon: IconStar, link: "/favorites" },
    { label: "Znajomi", icon: IconUsers, link: "/ProposedProfiles" },
    { label: "Strona główna", icon: IconHome, link: "/mainpage" },
    { label: "Profil", icon: IconUser, link: "/profiles/userChoices" },
    { label: "Wiadomości", icon: IconMessage, link: "/messages" },
    { label: "Ustawienia", icon: IconSettings, action: openUserProfile }, // otwiera panel zarządzania
    { label: "Support", icon: IconHelp, link: "/support" },
  ];

  const loggedOutLinks = [
    { label: "Strona główna", icon: IconHome, link: "/" },
    { label: "Zaloguj się", icon: IconLogin, link: "/signin" },
    { label: "Zarejestruj się", icon: IconUserPlus, link: "/signup" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Ikona hamburgera */}
      <Burger
        opened={opened}
        onClick={() => setOpened((o) => !o)}
        title={opened ? "Close sidebar" : "Open sidebar"}
        style={{ marginBottom: "1rem" }}
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
                <UserButton />
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
