import React, { useState,useEffect } from 'react';
import orderBy from "lodash/orderBy";


const kanban = (props) =>{

    const {RF_HRS, PlatenRFHours,eqp_id,cathode1,cathode3,reporting_date} = props.data
    let latestdate =  new Date(reporting_date)
    const renderType  = ()=>{
      
        if ( eqp_id =="3DE-02"){
          
            return(
                <div className="board-item">
                <div className="board-item-content"><span>{RF_HRS} : {PlatenRFHours}</span></div>
                <div className="board-item-content"><span>Projected PM Due Date: {latestdate.toDateString()}</span></div>
                <div className="board-item-content"><span>Last updated: {latestdate.toDateString()}</span></div>
                </div>
            ) 

        }
        else{
            return(
                <div className="board-item">
                <div className="board-item-content"><span>cathode1 : {cathode1} (kwh)</span></div>
                <div className="board-item-content"><span>cathode3 : {cathode3} (kwh)</span></div>
                <div className="board-item-content"><span>PM Due: {latestdate.toDateString()}</span></div>
                <div className="board-item-content"><span>Last updated: {latestdate.toDateString()}</span></div>
                </div>
            )

        }
    }

return(

    <div className="column is-narrow" >
    <article className="message is-info">
      <div className="message-header">
        <p>{eqp_id}</p>
        {/* <button className="delete" aria-label="delete"></button> */}
      </div>
      <div className="message-body">
            {renderType()}
      </div>
    </article>
    </div>

)
}


export default kanban;




// SideMenu.getInitialProps = async function() {
//     const res = await fetch('http://sgpatsprod01:8080/tpmtestdata');
//     const data = await res.json();
  
//     console.log(`Show data fetched. Count: ${data.length}`);
  
//     return {
//       data
//     };
//   }