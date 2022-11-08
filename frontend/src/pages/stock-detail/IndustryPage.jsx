import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { categoryGet } from "../../stores/stockSlice";

function IndustryPage() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const now = window.location.pathname;
    dispatch(setShowNav(now));
    dispatch(categoryGet(Number(id)));
  })

  return (
    <div>
      <h1>업종 페이지임니다</h1>
    </div>
  );
}

export default IndustryPage;