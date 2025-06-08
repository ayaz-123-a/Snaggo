import { useContext } from "react";
import { Link } from "react-router";
import { ClipLoader } from "react-spinners";

import MyContext from "../../../context/myContext";

const ProductDetail = () => {
   const context = useContext(MyContext);
    const { loading, getAllProduct,deleteProduct } = context;
    
    // Function to delete a product
 
   return (
          
             loading?
             <div className="flex justify-center items-center mt-1.5">
                <ClipLoader color="#840c98" size={50} />
             </div>
             :

       
       <div>
          
            <div className="py-5 flex justify-between items-center">
                {/* text  */}
                <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/addproduct'}>
                
                    <button className="bg-pink-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 cursor-pointer">Add Product</button>
                </Link>
            </div>
            {/* Loading  */}
           

            <div className="flex justify-center relative top-20">
                </div>
            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"> Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item
                            return (
                                <tr key={id} className="text-pink-300">
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                        {index + 1}.
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <div className="flex justify-center">
                                            <img className="w-20 " src={productImageUrl} alt="Product-img" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹{price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {category}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {date}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                    <Link to={`/editproduct/${id}`} className="bg-pink-500 text-white px-3 py-1 rounded-md hover:bg-pink-300 transition-all duration-300">Edit</Link>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                                      <button className="bg-pink-500 text-white px-3 py-1 rounded-md hover:bg-pink-300 transition-all duration-300 cursor-pointer" onClick={()=>deleteProduct(id)}>
                                       {loading?<div className="flex pt-1.5">
                                        <ClipLoader/>
                                       </div>:"Delete"}  </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>

                    </div>
                    
    );
};

export default ProductDetail;
