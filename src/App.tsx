import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ZodTypeAny } from "zod";

/* Pages **********************************************************************/
import HomePage from "./pages/HomePage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import AnimalsPage from "./pages/AnimalsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

/* Components *****************************************************************/
import Layout from "./Layout/Layout.tsx";

/* Styles *********************************************************************/
import "./styles/components/App.scss";

/* ZOD ************************************************************************/
import { AnimalArraySchema, UserArraySchema } from "./typescript/schemasAndTypes.ts";

/* SDefinition ****************************************************************/
export default function App() {
  function dataLoader(dataType: string, schema: ZodTypeAny) {
    return async () => {
      const response = await fetch(`https://inqool-interview-api.vercel.app/api/${dataType}`);
      const data = await response.json();
      const parsedData = schema.safeParse(data);

      if (parsedData.success) {
        return parsedData.data;
      } else {
        const errorMessages = parsedData.error.errors;
        console.error("Validation errors:", errorMessages);
        throw new Error("Invalid data structure");
      }
    };
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/users",
          loader: dataLoader("users", UserArraySchema),
          element: <UsersPage />,
        },
        {
          path: "/animals",
          loader: dataLoader("animals", AnimalArraySchema),
          element: <AnimalsPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return (
    <div className="app-container">
      <RouterProvider router={router} />
    </div>
  );
}
