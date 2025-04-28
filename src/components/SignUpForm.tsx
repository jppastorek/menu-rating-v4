import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export function SignUpForm() {
  const form = useForm({
    initialValues: {
      first: '',
      last: '',
      email: '',
      password: '',
      location: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  const handleSubmit = async (values: any) => {
    console.log("Submitting form with values:", values);
    try {
      const response = await fetch("http://localhost:5001/api/user/register", { // Corrected URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: values.first,
          last_name: values.last,
          email: values.email,
          password: values.password,
          residence: values.location,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('User registered successfully:', data);
        // Handle successful user creation (e.g., redirect or show a success message)
      } else {
        console.error('Registration failed:', data);
        // Handle errors from the server (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
