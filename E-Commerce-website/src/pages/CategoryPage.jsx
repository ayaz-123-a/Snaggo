import {  useContext} from "react";
import Layout from "../Components/layout/Layout";
import { useParams } from "react-router";
import { ClipLoader } from "react-spinners";
import MyContext from "../../context/myContext";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(MyContext);

  const {loading, getAllProduct } = context;

  const filteredProducts = getAllProduct?.filter(
    (item) => item.category === categoryname
  );

  return (
    <>
      <Layout>
        {loading ? 
          <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#840c98" size={30} />
            </div>
            :
        <section className="text-gray-600 body-font ">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {filteredProducts?.length > 0 ? (
                filteredProducts?.map((item) => {
                  const { id, title, price, productImageUrl } = item;

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
                            {title.substring(0, 20)}
                          </h1>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            ₹{price}
                          </h1>

                          <div className="flex justify-center ">
                            <button className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>
                  <div className="flex justify-center">
                    <img
                      className=" mb-2"
                      src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                      alt=""
                    />
                  </div>
                  <h1 className=" text-black text-xl">
                    No {categoryname} product found
                  </h1>
                </div>
              )}
            </div>
          </div>
        </section>
 }
  </Layout>
    </>
  );
};

export default CategoryPage;
