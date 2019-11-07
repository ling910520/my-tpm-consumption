import Navbar from './navbar';
import SideMenu from './SideMenu';
import '../styles/styles.scss';

const Layout = props => (
        <div className="container is-fluid">
            <Navbar></Navbar>
            <section className="columns" >
                <div className="columns is-2 is-fullheight notification">
                     <SideMenu></SideMenu> 
                </div>
                <div className="column">
                    {props.children}
                </div>
            </section>
        </div>
);

export default Layout;
