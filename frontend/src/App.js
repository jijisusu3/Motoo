import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import MainPage from "./pages/main/MainPage";
import SchoolMainPage from "./pages/school/SchoolMainPage";
import SchoolDetailPage from "./pages/school/SchoolDetailPage"
import StockListPage from "./pages/stock-list/StockListPage";
import MyPage from "./pages/wallet/MyPage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import AccountDetailPage from "./pages/wallet/AccountDetailPage";
import LimitOrderPage from "./pages/stock-list/LimitOrderPage";
import BuyOrderEditPage from "./pages/stock-list/BuyOrderEditPage";
import SellOrderEditPage from "./pages/stock-list/SellOrderEditPage";
import StockSearchPage from "./pages/stock-list/StockSearchPage";
import SellStockPage from "./pages/stock-detail/SellStockPage";
import BuyStockPage from "./pages/stock-detail/BuyStockPage";
import IndustryPage from "./pages/stock-detail/IndustryPage";
import StockDetailPage from "./pages/stock-detail/StockDetailPage";
import QuizPage from "./pages/stock-list/QuizPage";
import QuizResultPage from "./pages/stock-list/QuizResultPage";
import { useSelector } from "react-redux";

function PrivateOutlet() {
  const getMyToken = useSelector((state) => {
    return state.persistedReducer.setUser.user.token;
  });
  const getToken = localStorage.getItem("login-token");
  return (getMyToken === getToken) ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateOutlet />}>
        <Route name="buy" path="stock/buy/:id" element={<BuyStockPage />} />
        <Route name="sell" path="stock/sell/:id" element={<SellStockPage />} />
        <Route
          path="/stock/limit-order/buy/:id"
          element={<BuyOrderEditPage />}
        />
        <Route
          path="/stock/limit-order/sell/:id"
          element={<SellOrderEditPage />}
        />
        ` <Route path="/" element={<StockListPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz-result/:result" element={<QuizResultPage />} />
        <Route path="/stock/search" element={<StockSearchPage />} />
        <Route path="/stock/limit-order" element={<LimitOrderPage />} />
        <Route path="/stock/industry/:id" element={<IndustryPage />} />
        <Route path="/wallet/my" element={<MyPage />} />
        <Route path="/school" element={<SchoolMainPage />} />
        <Route path="/school-battle" element={<SchoolDetailPage />} />
        <Route path="/menu" element={<MenuPage />} />`
        <Route path="/stock/detail/:id" element={<StockDetailPage />} />
        <Route path="/wallet/detail/:id" element={<AccountDetailPage />} />
      </Route>
      <Route path="/social-login" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
