import { Route, Router, Routes } from "react-router";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import ProductInfo from "./pages/ProductInfo";
import ScrollTop from "./Components/ScrollTop";
import CartPage from "./pages/Cart";
import AllProduct from "./pages/AllProduct";
import Login from "./pages/SignIn";
import Signup from "./pages/SignUp";
import UserDashboard from "./pages/UserDashBoard";
import AdminDashboard from "./pages/AdminDash";
import AddProduct from "./Components/admin/AddProduct";
import EditProduct from "./Components/admin/EditProduct";
import DeleteProduct from "./Components/admin/DeleteProduct";
import MyState from "../../context/myState";
import  { Toaster } from 'react-hot-toast'
export const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/productinfo" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/editproduct" element={<EditProduct />} />
          <Route path="/deleteproduct" element={<DeleteProduct />} />
        </Routes>
        <Toaster/>
      </Router>
    </MyState>
  );
};
export default App;
