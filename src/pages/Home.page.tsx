import { useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import { Button, Group, Box } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
import { ItemDisplay } from '../components/ItemDisplay';
import { SearchBar } from '../components/SearchBar';

const isLoggedIn = false;

export function HomePage() {
  const [searchResults, setSearchResults] = useState({
    searchTerm: '',
    searchResults: [],
  });

  const search = async (value: string) => {
    // for some reason the proxy isnt working so i have to hard code the url
    const response = await fetch(`http://localhost:5001/api/search/item/${value}`);
    const data = await response.json();

    setSearchResults({
      ...searchResults,
      searchResults: data,
    });
  };

  // const { data, error, isError, isLoading } = useQuery('search', () => {
  //   search();
  //   console.log(data);
  // });

  if (isLoggedIn) {
    // if (isError) {
    //   return <span>Error: {error.message}</span>;
    // }

    // if (isLoading) {
    //   return <span>Searching the database...</span>;
    // }
    return (
      <>
        <SearchBar input={searchResults.searchTerm} search={search} />
        <ItemDisplay items={searchResults.searchResults} />
      </>
    );
  }
  return (
    <>
      <Welcome />
      <Group justify="center">
        <Box bg="none" my="xl" component="a" href="/login">
          <Button variant="outline" color="white" size="lg" radius="md">
            Log In
          </Button>
        </Box>
        <Box bg="none" my="xl" component="a" href="/signup">
          <Button
            variant="gradient"
            gradient={{ from: 'pink', to: 'yellow' }}
            size="lg"
            radius="md"
          >
            Sign Up
          </Button>
        </Box>
      </Group>
    </>
  );
}

//const items = [
//   {
//     image: '',
//     name: 'Sauteed Salmon and Vegetables',
//     price: 20,
//     rating: 5,
//     description: 'Fresh salmon caught from Alaska cooked on a bed of grass.',
//     num_of_ratings: 243,
//     restaurant: "Eric's Big Sausage Palladium",
//   },
//   {
//     image: '',
//     name: 'Meatballs and Spaghetti',
//     price: 5,
//     rating: 1,
//     description: 'Two large meatballs on top of a bed of noodles.',
//     num_of_ratings: 107,
//     restaurant: "JP's Tiny Sausage Shack",
//   },
//   {
//     image: '',
//     name: 'Fried Eggplant Parmesan',
//     price: 5000,
//     rating: 5,
//     description: 'Fresh heirloom eggplants deep fried topped with marinara and mozzarella.',
//     num_of_ratings: 196,
//     restaurant: 'Sushi Barn',
//   },
//
