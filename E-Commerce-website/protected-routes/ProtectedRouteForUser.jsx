import { Outlet, useNavigate } from "react-router"

const ProtectedRouteForUser= () => {
    const navigate = useNavigate();
  const user =JSON.parse(localStorage.getItem('users'))
  if(user?.role==="user"){
    return <Outlet/>
  }else{
    return navigate('/login')
  }
}

export default ProtectedRouteForUser