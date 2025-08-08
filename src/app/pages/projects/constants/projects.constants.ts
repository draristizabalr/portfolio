import { Project } from "../interfaces";

export const projects: Project[] = [
  {
    name: "Teslo shop",
    description: "E-commerce platform for selling products.",
    urlProject: "https://teslo-shop-zulacop.netlify.app/",
    gitCode: "https://github.com/draristizabalr/teslo-shop-front",
    image: "mockups/teslo-shop-mockup.webp",
    technologies: ['Angular', 'NestJS', 'PostgreSQL']
  },
  {
    name: "PokeAPI SSR",
    description: "PokeAPI application with server-side rendering.",
    urlProject: "https://pokeapi-ssr.netlify.app/",
    gitCode: "https://github.com/draristizabalr/02-pokemon-ssr",
    image: "mockups/pokeapi-ssr-mockup.webp",
    technologies: ['Angular', 'TailwindCSS', 'TanStack Query']
  },
  {
    name: "Map search",
    description: "Map search application.",
    urlProject: "https://angular-maps-46632239.netlify.app/",
    gitCode: "",
    image: "mockups/map-search-mockup.webp",
    technologies: ['Angular', 'TailwindCSS', 'DaisyUI']
  },
  {
    name: "Country search",
    description: "Country basic information search application.",
    urlProject: "https://country-api-zula.netlify.app/",
    gitCode: "",
    image: "mockups/country-search-mockup.webp",
    technologies: ['Angular', 'TailwindCSS', 'DaisyUI']
  },
  {
    name: "Movies search",
    description: "Movies search application.",
    urlProject: "https://movie-search-proyect.netlify.app/",
    gitCode: "",
    image: "mockups/movies-search-mockup.webp",
    technologies: ['React', 'TailwindCSS']
  }
]
