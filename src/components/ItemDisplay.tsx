import { SimpleGrid } from '@mantine/core';
import { Item } from './Item';

export function ItemDisplay(props: any) {
  const { items } = props;
  if (items.length) {
    return (
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        {items.map((item: any) => (
            <Item
              key={item.item_id}
              name={item.item_name}
              price={item.price}
              rating={item.rating}
              num_of_ratings={item.num_of_ratings}
              description={item.item_description}
              restaurant={item.restaurant}
            />
          ))}
      </SimpleGrid>
    );
  }
}
