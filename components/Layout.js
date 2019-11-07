import Navbar from './navbar';
import SideMenu from './SideMenu';
import '../styles/styles.scss';

const Layout = props => (
    <body className="site">
        <Navbar></Navbar>
        <section className="columns" >
            <div className="columns is-2 is-fullheight notification">
                <SideMenu></SideMenu>
            </div>
            <div className="column">
                {props.children}
            </div>
        </section>
    </body>
);

export default Layout;
