import { Card, Image, Text, Badge, Button, Group, Anchor, Rating } from '@mantine/core';
import { IconArrowRight, IconHeart, IconHeartFilled } from '@tabler/icons-react';

export function Item(props: any) {
  const { image, name, price, rating, description, num_of_ratings, restaurant } = props;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* <Card.Section>
        <Image src={image} height={160} alt={name} />
      </Card.Section> */}

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} size="lg">
          <Group gap={10}>
            {name}{' '}
            <Rating
              emptySymbol={<IconHeart size="1rem" color="red" />}
              fullSymbol={<IconHeartFilled size="1rem" color="red" />}
              value={0}
              count={1}
            />
          </Group>
          <Group gap={5}>
            {<Rating size="xs" value={rating} fractions={4} readOnly />}{' '}
            <Anchor size="xs" href="/" underline="hover" c="dimmed">
              ({num_of_ratings})
            </Anchor>
          </Group>
        </Text>
        <Badge color="red" size="lg" radius="lg">
          ${price}
        </Badge>
      </Group>

      <Text fs="italic" size="sm" c="dimmed">
        {description}
      </Text>

      <Button
        variant="gradient"
        gradient={{ from: 'red', to: 'orange', deg: 135 }}
        fullWidth
        mt="md"
        radius="sm"
        rightSection={<IconArrowRight size={14} />}
      >
        {restaurant}
      </Button>
    </Card>
  );
}
