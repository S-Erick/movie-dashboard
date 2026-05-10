import { fetchTrending } from "../../../api/tmdb.js";
import { BasePage } from "./BasePage/BasePageMain/BasePage.jsx";

export function ForYou() {
  return <BasePage title="Para ti:" fetchFn={fetchTrending} />;
}
