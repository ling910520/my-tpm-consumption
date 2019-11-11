import React, { useState,useEffect } from 'react';


const CardComponent = () =>{
    const data = [{"reporting_date":"2019-11-08","RF_HRS":"Stat3_Etch_MV_PlatenRFHours","PlatenRFHours":74.46933746},
    {"reporting_date":"2019-11-09","RF_HRS":"Stat3_Etch_MV_PlatenRFHours","PlatenRFHours":85.63039398},
    {"reporting_date":"2019-11-10","RF_HRS":"Stat3_Etch_MV_PlatenRFHours","PlatenRFHours":92.68686676},
    {"reporting_date":"2019-11-11","RF_HRS":"Stat3_Etch_MV_PlatenRFHours","PlatenRFHours":94.50147247}]
const [Time, setTime] = useState(new Date());


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
                        <time datetime="2016-1-1"><span>Last updated: {Time.toDateString()}</span></time>
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


// SideMenu.getInitialProps = async function() {
//     const res = await fetch('http://sgpatsprod01:8080/tpmtestdata');
//     const data = await res.json();
  
//     console.log(`Show data fetched. Count: ${data.length}`);
  
//     return {
//       data
//     };
//   }