import { fetchPopularMovies } from "../../../api/tmdb.js";
import { BasePage } from "./BasePage/BasePageMain/BasePage.jsx";

export function Movies() {
  return <BasePage title="Películas populares:" fetchFn={fetchPopularMovies} />;
}
