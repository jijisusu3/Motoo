import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/main/MainPage";
import SchoolMainPage from "./pages/school/SchoolMainPage";
import StockListPage from "./pages/stock-list/StockListPage";
import MyPage from "./pages/wallet/MyPage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage"
import AccountDetailPage from "./pages/wallet/AccountDetailPage";
import LimitOrderPage from "./pages/stock-list/LimitOrderPage";
import LimitOrderEditPage from "./pages/stock-list/LimitOrderEditPage";
import StockSearchPage from "./pages/stock-list/StockSearchPage";
import SellStockPage from "./pages/stock-detail/SellStockPage";
import BuyStockPage from "./pages/stock-detail/BuyStockPage";
import IndustryPage from "./pages/stock-detail/IndustryPage";
import StockDetailPage from "./pages/stock-detail/StockDetailPage";

function App() {
  return (
    <div style={{marginBottom: '4rem', marginTop: 40}}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stock" element={<StockListPage />} />
        <Route path="stock/search" element={<StockSearchPage />} />
        <Route path="stock/limit-order" element={<LimitOrderPage />} />
        <Route path="stock/limit-order/:id" element={<LimitOrderEditPage />} />
        <Route path="stock/detail/:id" element={<StockDetailPage />} />
        <Route name="sell" path="stock/sell" element={<SellStockPage />} />
        <Route name="buy" path="stock/buy" element={<BuyStockPage />} />
        <Route path="stock/industry" element={<IndustryPage />} />
        <Route path="/wallet" element={<MyPage />} />
        <Route path="wallet/detail" element={<AccountDetailPage />} />
        <Route path="/school" element={<SchoolMainPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </div>
  );
}

export default App;
