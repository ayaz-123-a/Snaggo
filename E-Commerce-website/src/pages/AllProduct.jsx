import { useNavigate } from "react-router";
import Layout from "../Components/layout/Layout";
import { useContext } from "react";
import { ClipLoader } from "react-spinners";
import MyContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/CartSlice";




const AllProduct = () => {

const context=useContext(MyContext)
const dispatch=useDispatch()


const getAllProduct=JSON.parse(localStorage.getItem('getAllProduct')) || context.getAllProduct;
    const navigate = useNavigate();
    return (
        <Layout>
            {getAllProduct.length > 0 ? 
    <div className="py-8">
            {/* Heading  */}
            <div className="">
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 lg:px-0 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {getAllProduct?.map((item,index) => {
                            console.log(getAllProduct);
                            const { id, title, price,productImageUrl} = item
                            return (
                                <div key={id} className="p-4 w-full md:w-1/4">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                        <img
                                        onClick={()=> navigate('/productinfo')}
                                            className="lg:h-80  h-96 w-full"
                                            src={productImageUrl }
                                            alt="blog"
                                        />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                               Shopee
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center ">
                                                <button className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold" onClick={()=>{dispatch(addToCart(getAllProduct[index]))}}>
                                                    Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
        :
        
        <div className="flex justify-center items-center h-screen ">
            <ClipLoader color="#840c98" size={30} />
            </div>
        }
        </Layout>
    );
}

export default AllProduct;