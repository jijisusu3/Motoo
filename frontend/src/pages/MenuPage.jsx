import { useDispatch } from "react-redux";
import { setLogout } from "../stores/userSlice";

function MenuPage() {
  const dispatch = useDispatch()
  function logoutClick() {
    dispatch(setLogout())
  }
  return (
    <div>
      <button onClick={logoutClick}>로그아웃 되나 볼거야</button>
    </div>
  );
}

export default MenuPage;