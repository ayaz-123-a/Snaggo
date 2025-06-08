import { useContext, useState } from "react";
import MyContext from "../../../context/myContext";
import { useNavigate } from "react-router";



const SearchBar = () => {
   // Search State 
   const [search, setSearch] = useState("");
   const context=useContext(MyContext)
   const {getAllProduct}=context
//    console.log(getAllProduct);

   // Filter Search Data
   const filterSearchData = getAllProduct.filter((item) => item.title.toLowerCase().includes(search));
//    console.log(filterSearchData);
const navigate=useNavigate()
  return (
    <div className="">
    {/* search input  */}
    <div className="input flex justify-center">
        <input
            type="text"
            placeholder='Search here'
            onChange={(e) => setSearch(e.target.value)}
            className=' bg-gray-800 placeholder-gray-400 rounded-lg px-2 py-2  w-96 md:w-64 lg:w-94 outline-none text-gray-200 '
        />
    </div>

    {/* search drop-down  */}
    <div  className=" flex justify-center">
        {search && <div className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
            {filterSearchData.length > 0 ?
                <>
                    {filterSearchData.map((item, index) => {
                        return (
                            <div key={index} className="py-2 px-2">
                                <div className="flex items-center gap-2" onClick={()=>navigate(`/productinfo/${item.id}`)}>
                                    <img className="w-10" src={item.productImageUrl} alt="" />
                                    {item.title}
                                    
                                </div>
                            </div>
                        )
                    })}
                </>
                :

                <>
                    <div className="flex justify-center">
                        <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                    </div>
                </>}
        </div>
        }
    </div>
</div>
  );
}

export default SearchBar;