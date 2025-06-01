import { NavLink } from "react-router";
import SearchBar from "../searchbar/SearchBar";
// import SearchBar from "../searchBar/SearchBar";

const Navbar = () => {
  // navList Data
  const navList = (
    <ul className="flex  text-shadow-zinc-950 font-medium text-medium px-3   space-x-2   sm:space-x-4 lg:text-2xl md:mt-3.5 lg:mt-0">
      {/* Home */}
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      {/* All Product */}
      <li>
        <NavLink to={"/allproduct"}>Products</NavLink>
      </li>

      {/* Signup */}
      <li>
        <NavLink to={"/signup"}>Signup</NavLink>
      </li>

      {/* User */}
      <li>
        <NavLink to={"/user"}>Kamal</NavLink>
      </li>

      {/* Admin */}
      {/* <li>
                <NavLink to={'/'}>Admin</NavLink>
            </li> */}

      {/* logout */}
      {/* <li>
                logout
            </li> */}

      {/* Cart */}
      <li>
        <NavLink to={"/cart"}>Cart[0] </NavLink>
      </li>
    </ul>
  );
  return (
    <nav className="bg-fuchsia-800 sticky top-0 shadow-md z-50">
      {/* main  */}
      <div className=" md:flex justify-between items-center py-3 px-3 sm:block">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <NavLink to={"/"} className={"flex items-center justify-center space-x-2"}>
            <img src=".\src\assets\Logo.png" className="lg:w-8 w-6 " alt="Logo" />
            <h2 className=" font-bold text-zinc-950 lg:text-2xl pb-0 text-center md:text-[16px] md:pb-1.5">
              Snaggo
            </h2>
          </NavLink>
        </div>

        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
