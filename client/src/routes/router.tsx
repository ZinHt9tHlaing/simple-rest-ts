import { createBrowserRouter } from "react-router";
import {
  ErrorComponent,
  NoteListComponent,
  ProtectComponent,
} from "../components";
import Main from "../layouts/Main";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

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
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <ProtectComponent>
            <Profile />
          </ProtectComponent>
        ),
      },
    ],
  },
]);

export default router;
