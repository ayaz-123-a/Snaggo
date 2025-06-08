import { useContext, useState } from "react";
import MyContext from "../../../context/myContext";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const context = useContext(MyContext);
  const { getAllProduct } = context;
  const filterSearchData = getAllProduct.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate();

  return (
    <div className="">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => setSearch(e.target.value)}
        className="bg-gray-800 placeholder-gray-400 rounded-m px-3 py-2 w-full outline-none text-gray-200"
      />

      {/* Search Dropdown */}
      {search && (
        <div className="absolute left-0 mt-1 w-full bg-white z-50 rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {filterSearchData.length > 0 ? (
            filterSearchData.map((item, index) => (
              <div
                key={index}
                className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(`/productinfo/${item.id}`)}
              >
                <div className="flex items-center gap-2">
                  <img className="w-8 h-8 object-cover rounded" src={item.productImageUrl} alt="" />
                  <span className="text-gray-700 text-sm">{item.title}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center py-4">
              <img
                className="w-16"
                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                alt="Not found"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
