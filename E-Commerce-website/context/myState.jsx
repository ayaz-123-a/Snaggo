import { useEffect, useState } from 'react'
import MyContext from './myContext'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDb } from '../firebase/FirebaseConfig';


const MyState = ({children}) => {

    
    const [loading, setLoading] = useState(false)
     const [getAllProduct, setGetAllProduct] = useState([]);
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
            console.log(error);
            setLoading(false);
        }
    }
     useEffect(() => {
        getAllProductFunction();
        localStorage.setItem('getAllProduct', JSON.stringify([{getAllProduct}]));
    }, []);

    
 localStorage.setItem('getAllProduct', JSON.stringify(getAllProduct));



  return (
    <MyContext.Provider value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
       

    }}>
    {children}
    </MyContext.Provider>
  )
}

export default MyState