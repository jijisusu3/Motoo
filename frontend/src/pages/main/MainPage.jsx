import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../stores/userSlice";
function Main() {
  const dispatch = useDispatch();
  const navivate = useNavigate()
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    axios
    .get(
      `https://k7b204.p.ssafy.io/api2/users/auth/kakao/callback?code=${code}`
      )
      .then((response) => {
        dispatch(setLogin(response.data));
        navivate('/')
      });
  });
  return null;
}

export default Main;
