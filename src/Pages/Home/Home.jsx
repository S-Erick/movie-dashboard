import { MovieCarousel } from "./Carousel/Carousel.jsx";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <main className="w-100% flex flex-col ">
      <section
        className=" relative flex flex-col justify-center items-center w-full h-[90vh] gap-6 px-5"
        style={{
          background:
            "url(https://i.postimg.cc/25QvGhJg/cdccdf53-62a7-454d-b895-247477770e53.png) center/cover no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] " />
        <h1 className="relative text-4xl font-bold text-center">
          Películas y series <br /> ilimitadas
        </h1>
        <p className="relative text-center text-sm text-[var(--text-2)] w-full md:w-[40%] mx-auto mb-8">
          Descubre y explora películas a solo un click. Sumérgete en nuestra
          extensa colección de filmes, desde clásicos atemporales hasta los
          últimos éxitos de taquilla. Ya seas un cinéfilo o simplemente estés
          buscando tu próxima elección para la noche de cine.
        </p>
        <Link
          to="/foryou"
          className="relative text-center border border-[var(--border-1)] py-2 px-5 bg-white text-black text-lg md:text-xl font-semibold hover:bg-[var(--bg-base)] hover:text-[var(--text-base)]"
        >
          ¡Comienza tu viaje cinematográfico hoy!
        </Link>
      </section>

      <MovieCarousel />
    </main>
  );
}
