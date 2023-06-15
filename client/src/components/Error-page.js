import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex justify-center h-screen items-center">
      <div className=" flex-col text-center">
        <h1 className="text-6xl font-bold">Oops!</h1>
        <p className="text-xl m-5">Sorry, an unexpected error has occurred.</p>
        <p className="text-lg m-5 italic">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  );
}
