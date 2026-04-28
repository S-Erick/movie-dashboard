import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="w-[100%] h-[88vh] flex flex-col items-center justify-center gap-6">
      <h1 className="text-[10rem] font-bold ">404</h1>
      <span>Página no encontrada</span>
      <p className="text-center w-[50%]">
        Lo sentimos, la página que estás buscando no existe. Por favor, verifica
        la URL o regresa a la página de{" "}
        <strong>
          <Link className="text-decoration underline " to="/">
            inicio
          </Link>
        </strong>
        .
      </p>
    </main>
  );
}
