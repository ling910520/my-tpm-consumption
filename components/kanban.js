import React, { useState,useEffect } from 'react';
import orderBy from "lodash/orderBy";


const kanban = (props) =>{
    const {Stat3_Etch_MV_PlatenRFHours,eqp_id,Ti,Cu,reporting_date,parameter_limit} = props.data
    let latestdate =  new Date(reporting_date)
    let PM = new Date(reporting_date)
    const renderType  = ()=>{
      
        if ( eqp_id.match(/DE/g)){
            PM.setDate(PM.getDate()+(110-parseInt(Stat3_Etch_MV_PlatenRFHours))/8);
            // let PM = PMDate.toDateString()
            ;
            return(
                <div className="board-item">
                <div className="board-item-content"><span>RF Hrs : {Stat3_Etch_MV_PlatenRFHours} Max: 110</span></div>
                <div className="board-item-content"><span>Forecast PM Date: {PM.toLocaleDateString()}</span></div>
                <div className="board-item-content"><span>Last updated: {reporting_date}</span></div>
                </div>
            ) 

        }
        else{
            return(
                <div className="board-item">
                <div className="board-item-content"><span>Ti : {Ti}(kwh) Max:525</span></div>
                <div className="board-item-content"><span>Cu : {Cu} (kwh) Max:300</span></div>
                {/* <div className="board-item-content"><span>PM Due: {latestdate.toDateString()}</span></div> */}
                <div className="board-item-content"><span>Last updated: {reporting_date}</span></div>
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