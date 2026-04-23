import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header.jsx";
import { Footer } from "./Components/Footer.jsx";
import { Home } from "./Pages/Home/Home.jsx";
import { UserAccount } from "./Pages/UserAccount/UserAccount.jsx";
import { MoviePlayer } from "./Pages/MoviePlayer/MoviePlayer.jsx";
import { Login } from "./Pages/Login/Login.jsx";
import { NotFoundPage } from "./Pages/404.jsx";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/player" element={<MoviePlayer />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
