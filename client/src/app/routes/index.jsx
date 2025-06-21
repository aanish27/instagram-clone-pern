import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router";
import { setAuthUser } from "../../features/auth/authSlice";
import { useGetAuthQuery } from "../../features/user/userQueryHooks";
import { validateUsername } from "../../utils/helpers";
import EditProfile from "../pages/EditProfile";
import Explore from "../pages/Explore";
import Feed from "../pages/Feed";
import Login from "../pages/Login";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import Reels from "../pages/Reels";
import SignUp from "../pages/SignUp";
import { useAuth } from "../provider/AuthProvider";
import PrivateRoutes from "../routes/PrivateRoutes";

const Routes = () => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  const { data, isSuccess } = useGetAuthQuery({
    enabled: !!token,
  });

  if (isSuccess && data) dispatch(setAuthUser(data));

  const routesForPublic = [
    {
      path: "*",
      element: <Navigate to="/" />,
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
        {
          path: authUser ? `/${authUser.username}/edit` : "/",
          element: <EditProfile />,
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
