import Navbar from './navbar'
import '../styles/styles.scss'
const Layout  = (props)=>(
    <div>
    <Navbar></Navbar>
    <section className="columns" >
        <div className="column">
            {props.children}
        </div>
    </section>
  </div>
)


export default Layout