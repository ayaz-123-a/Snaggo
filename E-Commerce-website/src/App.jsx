import { BrowserRouter, Route, Router, Routes } from "react-router";
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
import  { Toaster } from 'react-hot-toast'
import ProtectedRouteForUser from "../protected-routes/ProtectedRouteForUser";
import ProtectedRouteForAdmin from "../protected-routes/ProtectedRouteForAdmin";
import CategoryPage from "./pages/CategoryPage";
import MyState from "../context/myState";
export const App = () => {
  return (
      <MyState>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}/>
          <Route path="/category/:categoryname"element={<CategoryPage/>}/>
          <Route element={<ProtectedRouteForUser/>}>
          <Route path="/user" element={<UserDashboard />} />
          </Route>

          <Route element={<ProtectedRouteForAdmin/>} >
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
           </Route>
        </Routes>
      </BrowserRouter>
       <Toaster/>
      </MyState>
  );
};
export default App;
