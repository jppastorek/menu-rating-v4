import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export function SignUpForm() {
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
        <TextInput placeholder="First Name" {...form.getInputProps('first')} />
        <TextInput placeholder="Last Name" {...form.getInputProps('last')} />

        <TextInput placeholder="Email" {...form.getInputProps('email')} />
        <TextInput placeholder="Password" {...form.getInputProps('password')} />
        <TextInput label="Location" placeholder="ZIP Code" {...form.getInputProps('location')} />

        <Checkbox
          mt="md"
          label="I agree to the terms of service."
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            fullWidth
            variant="gradient"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
