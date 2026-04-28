import { HeroHome } from "./HeroHome/HeroHome";
import { MovieCarousel } from "./Carousel/Carousel.jsx";

export function Home() {
  return (
    <main className="w-100% flex flex-col ">
      <HeroHome />
      <MovieCarousel />
    </main>
  );
}
