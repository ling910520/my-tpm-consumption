import Navbar from './navbar'
import '../styles/styles.scss'
const Layout  = (props)=>(
    <div>
    <Navbar></Navbar>
    <section className="columns" >
        <div className="column is-2 has-padding-30 notification">
            <aside className="menu columns is-fullheight" >
                <ul className='menu-list' id="side-menu">
                    <li>1</li>
                    <li>2</li>
                </ul>
            </aside>
        </div>
        <div className="column">
            {props.children}
        </div>
    </section>
  </div>
)


export default Layout