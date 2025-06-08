import { Link, NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import SearchBar from "../searchbar/SearchBar";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const getCartItems = useSelector((state) => state.cartStore);
  const cartLength = getCartItems.length;
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  const navList = (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 items-center text-white font-medium md:text-lg lg:text-xl">
      {user?.role === "user" && <li><NavLink to={"/"}>Home</NavLink></li>}
      {user?.role === "user" && <li><NavLink to={"/allproduct"}>Products</NavLink></li>}
      {!user && (
        <>
          <li><Link to={"/signup"}>Signup</Link></li>
          <li><Link to={"/login"}>Login</Link></li>
        </>
      )}
      {user?.role === "user" && <li><Link to={"/user"}>{user.name}</Link></li>}
      {user?.role === "admin" && <li><Link to={"/admin"}>Admin</Link></li>}
      {user?.role === "admin" && <li><Link to={"/addproduct"}>Add Product</Link></li>}
      {user && <li className="cursor-pointer" onClick={logout}>Logout</li>}
      <li><NavLink to={"/cart"}>Cart({cartLength})</NavLink></li>
    </ul>
  );

  return (
    <nav className="bg-fuchsia-800 sticky top-0 shadow-md z-50 w-full">
      {/* Navbar container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4 lg:py-5">

        {/* Left: Logo */}
        <div className="flex-shrink-0 flex items-center text-white">
          <NavLink to="/" className="flex items-center space-x-2">
            <i className="fa-solid fa-truck text-xl md:text-2xl lg:text-3xl" />
            <h2 className="font-bold text-lg md:text-xl lg:text-2xl">Snaggo</h2>
          </NavLink>
        </div>

        {/* Center: SearchBar */}
        <div className="flex-1 px-4">
          <div className="max-w-md md:max-w-lg lg:max-w-xl mx-auto">
            <SearchBar />
          </div>
        </div>

        {/* Right: Hamburger icon for mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-2xl md:text-3xl lg:text-4xl focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen?<i class="fa-solid fa-xmark"></i>:<i className="fa-solid fa-bars"/>}
          </button>
        </div>

        {/* Right: Nav list for desktop */}
        <div className="hidden md:flex items-center space-x-6 md:space-x-8 lg:space-x-12 text-white font-medium md:text-lg lg:text-xl">
          {navList}
        </div>
      </div>

      {/* Mobile Menu - show/hide */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-fuchsia-700 px-4 py-3 border-t border-fuchsia-600">
          {navList}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
