import fetch from 'isomorphic-unfetch';
import React, { useState,useEffect} from 'react'

const ChangeEqpStatus = () => {
  const [status,setStatus] = useState(0)

  const btnSubmit = async () =>{
    // const res = fetch('http://sgpatsprod01:4001/adddata', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(toolDetail)
    // });
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    const returnedStatus = await res.status
    setStatus(returnedStatus)
  }

  return (
    <div className="columns">
    <div className="column is-narrow"></div>
      <div className="column is-narrow">
      <button className="btn" onClick={btnSubmit}>
        ChangeEqpStatus
      </button>
      </div>
      <div className="column">
        <span className="tag is-info">
          Current Eqp status:{status}
        </span>
      </div>



      </div>
  );
};

export default ChangeEqpStatus;