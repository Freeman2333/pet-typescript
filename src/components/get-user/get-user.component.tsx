import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUserInfo } from "../../redux/user/user.selectors";
import { getUser } from "../../redux/user/user.actions";

export const GetUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (!user && token) {
      dispatch(getUser());
    }
  }, [user]);

  return null;
};
