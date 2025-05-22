import { createBrowserRouter } from "react-router";
import { ErrorComponent, NoteListComponent } from "../components";
import Main from "../layouts/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true,
        element: <NoteListComponent />,
      },
    ],
  },
]);

export default router;
