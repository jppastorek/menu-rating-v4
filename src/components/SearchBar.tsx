import { TextInput, Button, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
// import classes from './SearchBar.module.css';

export function SearchBar(props: any) {
  const { search } = props;
  const [value, setValue] = useState('');

  // console.log(props);

  return (
    <Group gap="xs">
      <TextInput
        variant="default"
        size="md"
        radius="md"
        placeholder="restaurants, dishes, ingredients"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <Button
        variant="gradient"
        size="md"
        radius="md"
        gradient={{ from: 'red', to: 'orange', deg: 135 }}
        onClick={() => {
          search(value);
        }}
      >
        <IconSearch size={14} />
      </Button>
    </Group>
  );
}

// classNames={{input: classes.blahfornow}}
