import Layout from "../Components/layout/Layout";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../store/slices/CartSlice";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { Trash } from "lucide-react";
import BuyNowDialog from "../Components/buyNow/buyNowModal";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDb } from "../../firebase/FirebaseConfig";



const CartPage = () => {

  const user = JSON.parse(localStorage.getItem("users"));
    const cartItems = useSelector((state) => state.cartStore);


  const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
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

    const buyNowFunction = () => {
        // validation 
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required")
        }

        // Order Info 
        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        try {
            const orderRef = collection(fireDb, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            toast.success("Order Placed Successfull")
        } catch (error) {
            console.log(error)
        }

    }



  const dispatch = useDispatch();
  // const navigate=useNavigate()
  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const removingFromCart = (item) => {
    dispatch(removeFromCart(item));
    toast.success("successfully removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cartStore", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {cartItems.length > 0 ? (
        <div className="container mx-auto px-4 max-w-7xl  lg:px-0">
          <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white lg:col-span-8"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <div key={product.id} className="">
                      <li className="flex py-6 sm:py-6 ">
                        <div className="flex-shrink-0">
                          <img
                            src={product.productImageUrl}
                            alt={product.title}
                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a
                                    href={product.href}
                                    className="font-semibold text-black"
                                  >
                                    {product.title}
                                  </a>
                                </h3>
                              </div>
                              <div className="mt-1 flex items-end">
                                <p className="text-xs font-medium text-black">
                                  ₹{product.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <div className="mb-2 flex">
                        <div className="min-w-24 flex">
                          <button
                            type="button"
                            className="h-7 w-7"
                            onClick={() => dispatch(decrementQuantity(product))}
                          >
                            -
                          </button>
                          <span className="mx-1 h-7 w-9 rounded-md border text-center">
                            {product.quantity}
                          </span>
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center cursor-pointer"
                            onClick={() => {
                              dispatch(incrementQuantity(product));
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div className="ml-6 flex text-sm">
                          <button
                            type="button"
                            className="flex items-center space-x-1 px-2 py-1 pl-0"
                          >
                            <Trash size={12} className="text-red-500" />
                            <span
                              className="text-xs font-medium text-red-500 cursor-pointer"
                              onClick={() => removingFromCart(product)}
                            >
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </section>
              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
              >
                <h2
                  id="summary-heading"
                  className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                >
                  Price Details
                </h2>
                <div>
                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">Total-Items</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {cartItemTotal}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center text-sm text-gray-800">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        {0}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        Free
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        {cartTotal}
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    {user?
                    <div className="flex gap-4 mb-6">
                      
                      <BuyNowDialog addressInfo={addressInfo} setAddressInfo={setAddressInfo} buyNowFunction={buyNowFunction}/>

                    </div>:<div className="flex gap-4  justify-center">
                      <Link to={'/login'} className=" bg-pink-500 text-white text-2xl rounded-md px-2 py-1 cursor-pointer hover:bg-pink-200 " >Login</Link>
                      </div>}
                  </div>
                </div>
              </section>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className=" h-screen flex items-center  justify-center gap-3.5 mx ">
            <h1>No Items Found</h1>
            <Link className="rounded-md" to={"/"}>
              Go to Home
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CartPage;
