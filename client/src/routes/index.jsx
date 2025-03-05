import { RouterProvider, createBrowserRouter } from "react-router";
import { useAuth } from "../provider/authProvider";
import Static from "../pages/Static";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import PostForm from "../pages/PostForm";
import Reels from "../pages/Reels";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import Messages from "../pages/Messages";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoutes from "../routes/PrivateRoutes";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/welcome",
      element: <Static />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <PrivateRoutes />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/post/new",
          element: <PostForm />,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
        {
          path: "/reels",
          element: <Reels />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
