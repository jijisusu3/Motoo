import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setShowNav, setActiveNav } from "../../stores/navSlice";


function SchoolMainPage() {
  const dispatch = useDispatch()
  useEffect(() => {
    const now = window.location.pathname
    dispatch(setShowNav(now))
    dispatch(setActiveNav(3))
  })
  return (
    <div>
      <h1>학교대항전메인페이지임니다</h1>
    </div>
  );
}

export default SchoolMainPage;