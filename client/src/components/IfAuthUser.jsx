import { useSelector } from "react-redux";

function IfAuthUser({ userId, children }) {
  const user = useSelector((state) => state.auth.authUser);

  if (user?.id !== userId) return null;
  return children;
}

export default IfAuthUser;
