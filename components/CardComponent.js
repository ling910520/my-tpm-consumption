import React, { useState,useEffect } from 'react';
import orderBy from "lodash/orderBy";


const CardComponent = (props) =>{

    // let body = orderBy(props.data,'reporting_date','desc') //order desc by reporting date
    let reporting_date = Object.values(props.data)[0] // take only latest reporting_date
    let latestdate =  new Date(reporting_date)

    const {RF_HRS, PlatenRFHours,eqp_id,cathode1,cathode3} = props.data
    
    const renderType  = ()=>{
      
        if ( eqp_id =="3DE-02"){
          
            return(
                <div>
                    {RF_HRS} : {PlatenRFHours}
                </div>
            ) 

        }
        else{
            return(
                <div>
                    cathode1 : {cathode1}
                    <br/>
                    cathode3 : {cathode3}
                </div>
            )

        }
    }

return(
    <div className="container notification">
        <div className="columns">
            <div className="column">
            <div className="card">
                <header className="card-header is-primary">
                    <p className="card-header-title">
                       {eqp_id}
                    </p>
                    <a href="#" className="card-header-icon" aria-label="more options">
                        <span className="icon">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </a>
                </header>
                <div className="card-content">
                    <div className="content">
                            {renderType()}
                   
                        <br />
                        <time><span>Last updated: {latestdate.toDateString()}</span></time>
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