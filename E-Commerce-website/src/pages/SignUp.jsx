import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import MyContext from "../../../context/myContext";
import toast from "react-hot-toast";
import{ClipLoader} from "react-spinners";
import { auth, fireDb } from "../../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Signup = () => {
    const context=useContext(MyContext)
    const {loading,setLoading}=context
    const navigate=useNavigate();


    const[userSignUp,setUserSignup]=useState({
        name:"",
        email:"",
        password:"",
        role:"user"
    })
const firebaseAuth=async()=>{
    try{
        
        setLoading(true)
        const users = await createUserWithEmailAndPassword(auth, userSignUp.email, userSignUp.password)
        const user = {
                name: userSignUp.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignUp.role,
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

            // create user Refrence
            const userRefrence = collection(fireDb, "user")

            // Add User Detail
            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            })
             setLoading(false);
            toast.success("Signup Successfully");
            navigate('/login')

    }
    catch(error){

        setLoading(false);
        toast.error(error)
    }}


    const  onSignup= ()=>{
    //     if(userSignUp.name==="" || userSignUp.email==="" || userSignUp.password===""){
    //         toast.error("Please fill all the fields")
    // }
    // if(!emailregex.test(userSignUp.email)){
    //     toast.error("Please enter a valid email address")
    // }

    userSignUp.name==="" || userSignUp.email==="" || userSignUp.password===""? toast.error("Please fill all the fields"):!emailregex.test(userSignUp.email)? toast.error("Please enter a valid email address")
    : firebaseAuth()
    
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder='Enter Your Name'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                        value={userSignUp.name}
                        onChange={(e)=>{
                            setUserSignup({
                                ...userSignUp,
                                name: e.target.value
                            })
                        }}
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                         value={userSignUp.email}
                        onChange={(e)=>{
                            setUserSignup({
                                ...userSignUp,
                                email: e.target.value
                            })
                        }}
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                         value={userSignUp.password}
                        onChange={(e)=>{
                            setUserSignup({
                                ...userSignUp,
                                password: e.target.value
                            })
                        }}
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md cursor-pointer transition-all duration-300'
                        onClick={onSignup}
                        disabled={loading}
                    >
                        {loading?<ClipLoader color="#840c98" size={30}/>:"Signup"}
                    </button> 
                </div>

                <div>
                    <h2 className='text-black'>Have an account ?  <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;