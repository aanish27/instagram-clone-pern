import { RouterProvider, createBrowserRouter, redirect } from "react-router";
import { useAuth } from "../provider/authProvider";
import Static from "../pages/Static";
import Explore from "../pages/Explore";
import PostForm from "../pages/PostForm";
import Reels from "../pages/Reels";
import Profile from "../pages/Profile";
import Notifications from "../pages/Notifications";
import Messages from "../pages/Messages";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoutes from "../routes/PrivateRoutes";
import Feed from "../pages/Feed";
import { validateUsername } from "../app/helpers";
import { getAuthUser } from "../app/helpers";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../app/features/authSlice";
import { useEffect } from "react";

const Routes = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    getAuthUser().then((user) => {
      dispatch(setAuthUser(user));
    });
  }, []);

  const routesForPublic = [
    {
      path: "*",
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
          element: <Feed />,
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
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/:username",
          loader: async ({ params }) => {
            let user = await validateUsername(params.username);
            if (!user) {
              return redirect("/");
            }
            return user;
          },
          element: <Profile />,
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
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    ...routesForPublic,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
