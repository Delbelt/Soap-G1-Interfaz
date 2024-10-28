import Home from "components/Home";
import Login from "components/Login";
import CatalogPage from "pages/CatalogPage";
import AddCatalog from "pages/CatalogPage/components/AddCatalog";
import AddProduct from "pages/CatalogPage/components/AddProduct";
import NewPage from "pages/NewPage";
import Order from "pages/Order";
import OrderClient from "pages/OrderClient";
import OrderClientDetails from "pages/OrderClient/components/OrderClientDetails";
import OrderCreate from "pages/OrderCreate";
import ProductPage from "pages/ProductPage";

import ViewProduct from "pages/ProductPage/components/ViewProduct";
import StockPage from "pages/StockPage";
import AddStock from "pages/StockPage/components/AddStock";
import ViewStock from "pages/StockPage/components/ViewStock";
import StorePage from "pages/StorePage";
import AddStore from "pages/StorePage/components/AddStore";
import ViewStore from "pages/StorePage/components/ViewStore";
import UserPage from "pages/UserPage";
import AddUser from "pages/UserPage/components/AddUser";
import ViewUser from "pages/UserPage/components/ViewUser";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const getToken = () => localStorage.getItem("token");

interface RouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: RouteProps) => {
  const token = getToken();

  return token ? element : <Navigate to='/' />;
};

const PublicRoute = ({ element }: RouteProps) => {
  const token = getToken();

  return token ? <Navigate to='/dashboard' /> : element;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* RUTAS PUBLICAS */}
        <Route path='/' element={<PublicRoute element={<Login />} />} />

        {/* RUTAS PRIVADAS */}
        <Route path='/dashboard' element={<PrivateRoute element={<Home />} />} />
        <Route path='/dashboard/orders' element={<PrivateRoute element={<OrderClient />} />} />
        <Route path='/dashboard/User' element={<PrivateRoute element={<AddUser />} />} />

        <Route path='/dashboard/catalog' element={<PrivateRoute element={<CatalogPage />} />} />
        <Route
          path='/dashboard/catalog/new-product'
          element={<PrivateRoute element={<AddProduct />} />}
        />
        <Route
          path='/dashboard/catalog/new-catalog'
          element={<PrivateRoute element={<AddCatalog />} />}
        />

        <Route path='*' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
