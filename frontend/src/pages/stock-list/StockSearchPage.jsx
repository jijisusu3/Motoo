import itemData from "../../data/item-name-code.json";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setShowNav, setActiveNav } from "../../stores/navSlice";

export const InputContainer = styled.div`
  margin-top: 0;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: row;
  padding-left: 1rem;
  border-radius: 8px;
  z-index: 3;
  box-shadow: 0;
  width: 293px;
  height: 35px;

  > input {
    flex: 1 0 0;
    background-color: #f0f0f0;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 16px;
  }
`;

function StockSearchPage() {
  const [keyword, setKeyword] = useState();
  const [results, setResult] = useState([]);
  const navigate = useNavigate();
  function goToDetail(id) {
    navigate(`/stock/detail/${id}`)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    const now = window.location.pathname
    dispatch(setShowNav(now))
    dispatch(setActiveNav(1))
  })
  const updateField = (field, value, update = true) => {
    if (update) onSearch(value);
    if (field === "keyword") {
      setKeyword(value);
    }
  };
  const onSearch = (text) => {
    var results = itemData.filter(
      (item) => true === matchName(item.name, text)
    );
    setResult({ results });
  };
  const matchName = (name, keyword) => {
    var keyLen = keyword.length;
    name = name.toLowerCase().substring(0, keyLen);
    if (keyword === "") return false;
    return name === keyword.toString().toLowerCase();
  };

  function SearchBar() {
    const updateText = (text) => {
      updateField("keyword", text, false);
      updateField("result", []);
    };
    var renderResults;
    const arr = results["results"];
    if (arr) {
      renderResults = arr.map((item) => {
        return (
          <div
            onClick={() => goToDetail(item.code)}
            // className={`search-preview ${item.index === 0 ? "start" : ""}`}
          >
            <div className="first">
              <p className="name">{item.name}</p>
              {/* <p className="code">{item.code}</p> */}
            </div>
          </div>
        );
      });
    }
    return renderResults;
  }
  return (
    <div>
      <InputContainer>
        <input
          type="text"
          value={keyword || ""}
          onChange={(e) => updateField("keyword", e.target.value)}
        />
      </InputContainer>
      <SearchBar />
    </div>
  );
}

export default StockSearchPage;
