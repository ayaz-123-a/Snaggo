import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../../../store/slices/CartSlice";
import MyContext from "../../../context/myContext";
import toast from "react-hot-toast";




const HomePageProductCard = () => {

    const getCartItems=useSelector((item)=>item.cartStore) // each time dispatch this selecvtor will be called


    useEffect(()=>{localStorage.setItem('cartStore',JSON.stringify(getCartItems))},[getCartItems])
    
    console.log(getCartItems);
    const dispatch=useDispatch()
    const navigation = useNavigate();
    const context=useContext(MyContext)
    const { getAllProduct} = context; // Assuming productData is an array of product objects

    const addingToCart=(item)=>{
        dispatch(addToCart(item))
        toast.success("successfully added to cart")
    }

    return (
        <main className="mt-10">
            {/* Heading  */}
            <div className="">
                <h1 className=" text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {getAllProduct?.map((item) => {
                        const { id, title, price,productImageUrl } = item

                            return (
                                <div key={id} className="p-4 w-full md:w-1/4">
                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                            <img
                                                className="lg:h-80  h-96 w-full"
                                                src={productImageUrl}
                                                alt="Error"
                                                onClick={() => navigation(`/productinfo/${id}`)}
                                            />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                Snaggo
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0,20)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center ">
                                                <button className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold" onClick={()=>addingToCart(item)}>
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
        </main>
    );
}

export default HomePageProductCard;