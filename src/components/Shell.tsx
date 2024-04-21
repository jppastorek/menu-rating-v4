import { AppShell, Burger, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export default function Shell() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'red', to: 'yellow' }}>
          Menu Ratings
        </Text>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
