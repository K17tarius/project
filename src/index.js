import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Account from "./pages/Registration/Registration";
import RegistrationForm from "./pages/Registration/Registration";
import LoginForm from "./pages/Login/login";
import Vendorlisting from "./pages/VendorListing/vendorlisting";
import AddProduct from "./pages/AddProduct/addproduct";
import ShoppingCart from "./pages/Cart/cart";
import EditProduct from "./pages/EditProduct/editProduct";
import VendorRegistrationPage from "./pages/VRegistration/vregistration";
import VendorLoginPage from "./pages/VLogin/vendorlogin";
import CategoriesPage from "./pages/Categories/categories";
import AnalyticsReport from "./pages/Analytics/analytics";
import Orders from "./pages/Orders/orders";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="vendorlisting" element={<Vendorlisting />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="editproduct" element={<EditProduct />} />
          <Route path="vregistration" element={<VendorRegistrationPage />} />
          <Route path="vendorlogin" element={<VendorLoginPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="analytics" element={<AnalyticsReport />} />
          <Route path="orders" element={<Orders />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
