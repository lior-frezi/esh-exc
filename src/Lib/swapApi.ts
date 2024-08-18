const BASE_URI = "https://swapi.dev/api/";

export const CATEGORIES = {
  films: "films",
  people: "people",
  planets: "planets",
  species: "species",
  starships: "starships",
  vehicles: "vehicles",
} as const;

export type Category = keyof typeof CATEGORIES;

export const categories = Object.keys(CATEGORIES) as Category[];

export const getUrl = (category: Category, search: string) =>
  `${BASE_URI}${category}?search=${search}`;
