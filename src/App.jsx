import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header.jsx";
import { Footer } from "./Components/Footer.jsx";
import { Home } from "./Pages/Home/Home.jsx";
import { UserAccount } from "./Pages/UserAccount/UserAccount.jsx";
import { MoviePlayer } from "./Pages/MoviePlayer/MoviePlayer.jsx";
import { Login } from "./Pages/Login/Login.jsx";
import { NotFoundPage } from "./Pages/404.jsx";
import { Explore404 } from "./Pages/Explore/404Explore.jsx";
import { Movies } from "./Pages/Explore/Movies.jsx";
import { Shows } from "./Pages/Explore/Shows.jsx";
import { Explore } from "./Pages/Explore/Components/Explore.jsx";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player" element={<MoviePlayer />} />

        <Route element={<Explore />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/404" element={<Explore404 />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
