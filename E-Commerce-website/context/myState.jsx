import { useEffect, useState } from 'react'
import MyContext from './myContext'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDb } from '../firebase/FirebaseConfig';
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

const MyState = ({children}) => {

    
    const [loading, setLoading] = useState(false)
     const [getAllProduct, setGetAllProduct] = useState([]);
     const[getAllOrder,setGetAllOrder]=useState([])
    const [getUser,setGetUser]=useState([])


      const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDb, "products"),
                
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            // console.log(error);
            toast.error(error)
            setLoading(false);
        }
    }

    const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDb, "order"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            // console.log(error);
            toast.error(error)
            setLoading(false);
        }
    }
     const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDb, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            // console.log(error)
            toast.error(error)
            setLoading(false)
        }
    }
    const getAllUserFunction=()=>{
        setLoading(true);
        try {
            const q = query(
                collection(fireDb, "user"),
                
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetUser(userArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            // console.log(error);
            toast.error(error)
            setLoading(false);
        }
    }

    

     useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction(),
        getAllUserFunction()
        localStorage.setItem('getAllProduct', JSON.stringify([{getAllProduct}]));
    }, []);

    
 localStorage.setItem('getAllProduct', JSON.stringify(getAllProduct));

// console.log(getUser);

  return (
    <MyContext.Provider value={{
        loading,
        setLoading,
        getAllOrder,
        getAllProductFunction,
        deleteProduct,
        getAllProduct,
        getUser
       

    }}>
    {children}
    </MyContext.Provider>
  )
}

export default MyState