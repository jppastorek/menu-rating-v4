import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput placeholder="Email" {...form.getInputProps('email')} />
        <TextInput placeholder="Password" {...form.getInputProps('password')} />

        <Group justify="flex-end" mt="md">
          <Button
            fullWidth
            type="submit"
            variant="gradient"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Log In
          </Button>
        </Group>
      </form>
    </Box>
  );
}
