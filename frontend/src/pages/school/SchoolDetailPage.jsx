import { useEffect, useState } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowNav, setActiveNav } from "../../stores/navSlice";
import { schoolPageGet } from "../../stores/schoolSlice";

function SchoolDetailPage() {
  const dispatch = useDispatch()
  const userToken = useSelector((state) => {
    return state.persistedReducer.setUser.user.token;
  });
  const data = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  useEffect(()=> {
    dispatch(schoolPageGet(data))
  })
  return (
    <div>
      <h1>학교대항전 상세페이지!</h1>
    </div>
    
  );
}
export default SchoolDetailPage;