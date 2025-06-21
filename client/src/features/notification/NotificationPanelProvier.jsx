import { createContext, useState } from "react";

const NotificationPanelContext = createContext();

const NotificationPanelProvider = ({ children }) => {
  const [isShowRequests, setIsShowRequests] = useState(false);

  return (
    <NotificationPanelContext.Provider
      value={{ isShowRequests, setIsShowRequests }}>
      {children}
    </NotificationPanelContext.Provider>
  );
};

export { NotificationPanelContext };
export default NotificationPanelProvider;
