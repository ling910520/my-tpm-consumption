import React, { useState,useEffect } from 'react';
import orderBy from "lodash/orderBy";
import moment from 'moment'


const kanban = (props) =>{
    let lastData = props.data
    console.log(props.data)
    const {eqp_id,svid_name,inserted_timestamp,svid_value} = lastData
    // let lastData = props.data[0]
    // let latestdate =  new Date(reporting_date)
    // let PM = new Date(reporting_date)
    const renderType  = ()=>{
      
        if ( eqp_id.match(/DE/g)){
            // PM.setDate(PM.getDate()+(110-parseInt(Stat3_Etch_MV_PlatenRFHours))/8);
            ;
            return(
                <div className="board-item">
                <div className="board-item-content"><span>RF Hrs : {svid_value} Max: 110</span></div>
                <div className="board-item-content"><span>Forecast PM Date: {moment.utc(inserted_timestamp).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                <div className="board-item-content"><span>Last updated: {moment.utc(inserted_timestamp).format('YYYY-MM-DD HH:mm:ss')}</span></div>
                </div>
            ) 

        }
        else{
            return(
                <div className="board-item">
                <div className="board-item-content"><span>Ti : {svid_value}(kwh) Max:525</span></div>
                <div className="board-item-content"><span>Cu : {svid_value} (kwh) Max:300</span></div>
                {/* <div className="board-item-content"><span>PM Due: {latestdate.toDateString()}</span></div> */}
                <div className="board-item-content"><span>Last updated: {inserted_timestamp}</span></div>
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