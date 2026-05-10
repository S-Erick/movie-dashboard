import { Outlet } from "react-router-dom";
import { Header } from "./SubPages/BasePage/Header.jsx";

export const Explore = () => {
  return (
    <main className="px-[4%] md:px-[10%]">
      <Header />
      <>
        <Outlet />
      </>
    </main>
  );
};
