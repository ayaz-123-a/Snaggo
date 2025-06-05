import  Navbar  from '../Navbar/Navbar'
import  Footer  from '../footer/Footer'

const Layout = ({children}) => {
  return (
<>
<header>
<Navbar/>
</header>

  <>{children}</>

<footer>
    <Footer/>
</footer>

</>

)
}
export default Layout