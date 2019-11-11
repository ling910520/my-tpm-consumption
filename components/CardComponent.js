import Layout from '../components/Layout'
const CardComponent = () =>{
return(
    <div classNameName="container notification">
        <div classNameName="columns">
            <div className="column">
            <div className="card">
                <header className="card-header is-primary">
                    <p className="card-header-title">
                        Tool 1
                    </p>
                    <a href="#" className="card-header-icon" aria-label="more options">
                        <span className="icon">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </a>
                </header>
                <div className="card-content">
                    <div className="content">
                        <ul>
                            <li> Metal 1 :</li>
                            <li> Metal 2 :</li>
                        </ul>
                        <br />
                        <time datetime="2016-1-1"><span>Last updated: 11:09 PM - 1 Jan 2016</span></time>
                    </div>
                </div>
                {/* <footer className="card-footer">
                    <a href="#" className="card-footer-item">Save</a>
                    <a href="#" className="card-footer-item">Edit</a>
                    <a href="#" className="card-footer-item">Delete</a>
                </footer> */}
            </div>
            </div>
        </div>
    </div>

)
}


export default CardComponent;