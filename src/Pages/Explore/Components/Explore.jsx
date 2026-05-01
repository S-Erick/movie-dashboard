import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";

export const Explore = () => {
  return (
    <main className="px-[10%]">
      <Header />
      <>
        <Outlet />
      </>
    </main>
  );
};
