import {  useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import MyContext from "../../../context/myContext";
import { fireDb } from "../../../firebase/FirebaseConfig";


const categoryList = [
    {
        name: 'fashion'
    },
    {
        name: 'shirt'
    },
    {
        name: 'jacket'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    }
]

const EditProduct = () => {
  const context=useContext(MyContext)
  const {loading,setLoading, getAllProductFunction}=context
  const {id}=useParams()
  const navigate = useNavigate();

    const [product, setProduct] = useState({

        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity:"",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    // Get Single Product Function
    const getSingleProductFunction = async (id) => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDb, "products", id))
            //   console.log(product.data())
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                quantity : product?.quantity,
                time: product?.time,
                date: product?.date
            })
            setLoading(false);

        } catch (error) {
            toast.error(error)
            setLoading(false);
        }
    }

   useEffect(() => {
        getSingleProductFunction();
    },[]);

    const updateProduct = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDb, 'products', id), product)
            getAllProductFunction();
            setLoading(false)
            toast.success("Product Updated successfully")
            navigate('/admin')

        } catch (error) {
            setLoading(false)
            toast.error(error)
        }
    }

   

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {/* Login Form  */}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>
                            Update Product
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            placeholder='Product Title'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                            value={product?.title}
                            onChange={(e)=>{setProduct({
                              ...product,
                              title:e.target.value
                            })}}
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            placeholder='Product Price'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                            value={product?.price}
                            onChange={(e) => setProduct({
                                ...product,
                                price: e.target.value
                            })}
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            placeholder='Product Image Url'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                            value={product?.productImageUrl}
                            onChange={(e) => setProduct({
                                ...product,
                                productImageUrl: e.target.value
                            })}
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  " onChange={(e) => setProduct({ ...product, category: e.target.value })} value={product?.category}>
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                        <div className="mb-3">
                        <input type="number" name="description" placeholder="Quantity" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300" value={product?.quantity} onChange={(e)=>{setProduct({
                          ...product,
                          quantity:e.target.value
                        })}} />
                           
                       
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
                            value={product?.description}
                            onChange={(e) => setProduct({
                                ...product,
                                description: e.target.value
                            })}
                            >
                        </textarea>
                    </div>

                    {/* Update Product Button  */}
                    <div className="mb-3">
                        <button
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                            onClick={()=> updateProduct()}
                        >
                           {loading ?<div><ClipLoader></ClipLoader>{"updating..."}</div>: "Update"}
                        </button>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default EditProduct;
