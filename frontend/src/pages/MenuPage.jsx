import { useDispatch, useSelector } from "react-redux";
import { setLogout, userDelete } from "../stores/userSlice";
import { useEffect, useState } from "react";
import { setActiveNav } from "../stores/navSlice";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import classes from "../components/wallet/AccountDetailPage.module.css";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 324,
  height: 225,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};
function MenuPage() {
  const dispatch = useDispatch();
  const [openDeleteModal, setDeleteModalOpen] = useState(false);
  const userToken = useSelector((state) => {
    return state.persistedReducer.setUser.user.token;
  });
  const userCurrent = useSelector((state) => {
    return state.persistedReducer.setUser.user.data.current;
  });
  useEffect(() => {
    dispatch(setActiveNav(4));
  }, []);
  function logoutClick() {
    dispatch(setLogout());
  }
  const data = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  function userDeleteClicked() {
    dispatch(userDelete(data));
    handleDeleteModalClose(false);
    return;
  }
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  return (
    <div>
      <div>
        <Link to="/">
          <div>메인페이지</div>
        </Link>
        <Link to="/stock/limit-order">
          <div>대기 중인 주식 목록</div>
        </Link>
        <Link to="/stock/search">
          <div>주식 검색</div>
        </Link>
      </div>
      <div>
        <Link to="/wallet/my">
          <div>내 지갑 리스트</div>
        </Link>
        <Link to={`/wallet/detail/${userCurrent}`}>
          <div>주 계좌 보러가기</div>
        </Link>
      </div>
      <div>
        <Link to="/school">
          <div>학교대항전</div>
        </Link>
      </div>

      <button onClick={logoutClick}>로그아웃</button>
      <button onClick={handleDeleteModalOpen}>회원탈퇴</button>
      <Modal open={openDeleteModal} onClose={handleDeleteModalClose}>
        <Box sx={style}>
          <div>정말 탈퇴하시겠습니까?</div>
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.43866e-05 9.99846C7.43866e-05 4.47648 4.4766 0 9.99857 0C15.5206 0 19.9971 4.47648 19.9971 9.99846C19.9971 11.641 19.5999 13.2274 18.8523 14.6481L19.9685 18.9358C20.0051 19.0762 20.0051 19.2237 19.9685 19.3642C19.8502 19.8184 19.3861 20.0906 18.9319 19.9724L14.6421 18.8554C13.2229 19.601 11.6387 19.997 9.99857 19.997C4.4766 19.997 7.43866e-05 15.5205 7.43866e-05 9.99846ZM9.99857 4.50078C9.58443 4.50078 9.24868 4.83652 9.24868 5.25067V11.4997C9.24868 11.9139 9.58443 12.2496 9.99857 12.2496C10.4127 12.2496 10.7485 11.9139 10.7485 11.4997V5.25067C10.7485 4.83652 10.4127 4.50078 9.99857 4.50078ZM8.99872 14.4972C8.99872 15.0493 9.44635 15.497 9.99857 15.497C10.5508 15.497 10.9984 15.0493 10.9984 14.4972C10.9984 13.945 10.5508 13.4973 9.99857 13.4973C9.44635 13.4973 8.99872 13.945 8.99872 14.4972Z"
                fill="#8D8D8D"
              />
            </svg>
            <span style={{ marginLeft: "15px" }}>
              회원탈퇴를 하면 <br></br> 해당 계정의 주식, 자산들이 같이
              삭제되어요!
            </span>
          </div>
          <div onClick={userDeleteClicked}>삭제하기</div>
        </Box>
      </Modal>
    </div>
  );
}

export default MenuPage;
