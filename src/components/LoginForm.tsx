import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useQuery } from 'react-query';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    // validate: {
    // email: (email) => (/^\S+@\S+$/.test(email) ? null : 'Invalid email'),
    // },
  });

  const login = async (email: any, password: any) => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    return response;
  }

  // const { isLoading, error, data } = useQuery({
  //   queryKey: [email, password],
  //   queryFn: () => {
  //     if (email) {
  //       return fetch('http://localhost:5000/api/login', {
  //         method: 'POST',
  //         body: JSON.stringify({ email: email, password: password }),
  //       })
  //       // .then((res) => res.json());
  //     }
  //     return [];
  //   },
  // });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => {
        console.log(values.email, values.password);
        login(values.email, values.password);
        })}>
        <TextInput
          placeholder="Email"
          // key={form.key('email')}
          {...form.getInputProps('email')}
          
          // onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          placeholder="Password"
          {...form.getInputProps('password')}
          // onChange={(e) => setPassword(e.currentTarget.value)}
        />

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
