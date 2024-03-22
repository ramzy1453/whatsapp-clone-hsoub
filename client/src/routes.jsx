import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./components/Chat";
import NoUserSelected from "./components/Chat/NoUserSelected";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <NoUserSelected />,
      },
      {
        path: ":receiverId",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
