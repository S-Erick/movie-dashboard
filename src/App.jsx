import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Home } from "./Pages/Home/Home";
import { UserAccount } from "./Pages/UserAccount/UserAccount";
import { MoviePlayer } from "./Pages/MoviePlayer/MoviePlayer";
import { Login } from "./Pages/Login/Login";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/player" element={<MoviePlayer />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
