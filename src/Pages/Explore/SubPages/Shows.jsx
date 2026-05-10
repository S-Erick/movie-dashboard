import { fetchPopularShows } from "../../../api/tmdb.js";
import { BasePage } from "./BasePage/BasePageMain/BasePage.jsx";

export function Shows() {
  return <BasePage title="Series populares:" fetchFn={fetchPopularShows} />;
}
