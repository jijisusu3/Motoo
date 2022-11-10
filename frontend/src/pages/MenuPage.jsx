import { useDispatch } from "react-redux";
import { setLogout } from "../stores/userSlice";
import { useEffect } from "react";
import { setActiveNav  } from "../stores/navSlice";


function MenuPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveNav(4))
  })
  function logoutClick() {
    dispatch(setLogout());
  }
  return (
    <div>
      <button onClick={logoutClick}>로그아웃 되나 볼거야</button>
    </div>
    
  );
}

export default MenuPage;