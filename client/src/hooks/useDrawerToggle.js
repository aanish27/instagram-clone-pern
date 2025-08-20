import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, expandDrawer } from "../features/ui/uiSlice";

function useDrawerToggle(DrawerType) {
  const { activeDrawer } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const toggleSearchDrawer = useCallback(() => {
    console.log(DrawerType);

    if (!activeDrawer) {
      dispatch(expandDrawer(DrawerType));
    } else if (activeDrawer !== DrawerType) {
      dispatch(closeDrawer());
      dispatch(expandDrawer(DrawerType));
    } else {
      dispatch(closeDrawer());
    }
  }, [activeDrawer, dispatch, DrawerType]);

  return toggleSearchDrawer;
}

export default useDrawerToggle;
