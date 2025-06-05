import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
// import MyContext from "../../../context/myContext";
import toast from "react-hot-toast";
// import { auth, fireDb } from "../../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, fireDb } from "../../firebase/FirebaseConfig";
import MyContext from "../../context/myContext";
const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const Login = () => {
     const {loading, setLoading} = useContext(MyContext);
     

    const navigate=useNavigate()
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    })

 const fireBaseAuth = async () => {
    try{
             setLoading(true);
        const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
        const q = query(
                    collection(fireDb, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setUserLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setLoading(false);
                    if(user.role === "user") {
                        navigate('/user');
                    }else{
                        navigate('/admin');
                    }
                });
                return () => data;
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
    }
}

 const onLogin =()=> {
    userLogin.email==="" || userLogin.password===""? toast.error("Please fill all the fields"):!emailregex.test(userLogin.email)? toast.error("Please enter a valid email address")
    : fireBaseAuth();
 }
    
    return (
        <div className='flex justify-center items-center h-screen'>
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                        onChange={(e)=>setUserLogin({
                            ...userLogin,
                            email: e.target.value
                        })}
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                        onChange={(e)=>setUserLogin({
                            ...userLogin,
                            password: e.target.value
                        })}/>
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                   <button
                        type='button'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md cursor-pointer transition-all duration-300'
                        onClick={onLogin}
                        disabled={loading}
                    >
                        {loading?<ClipLoader color="#840c98" size={30}/>:"Login"}
                    </button> 
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;