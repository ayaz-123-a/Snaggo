import { Outlet, useNavigate } from "react-router"

const ProtectedRouteForAdmin = () => {
    const navigate = useNavigate();
  const user =JSON.parse(localStorage.getItem('users'))
  if(user?.role==="admin"){
    return <Outlet/>
  }else{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return navigate('/login')
  }
}

export default ProtectedRouteForAdmin