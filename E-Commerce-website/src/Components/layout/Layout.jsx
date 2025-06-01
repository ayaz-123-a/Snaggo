import  Navbar  from '../Navbar/Navbar'
import  Footer  from '../footer/Footer'

const Layout = ({children}) => {
  return (
<>
<header>
<Navbar/>
</header>
<div>{children}</div>
<footer>
    <Footer/>
</footer>

</>

)
}
export default Layout