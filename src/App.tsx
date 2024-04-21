import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from './Router';
import { theme } from './theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Router />
      </MantineProvider>
    </QueryClientProvider>
  );
}
