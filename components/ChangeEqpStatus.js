import fetch from 'isomorphic-unfetch';
import React, { useState,useEffect} from 'react'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const ChangeEqpStatus = (props) => {
  const [status,setStatus] = useState(0)

  const btnSubmit = async () =>{
    const raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${props.eqp_id}|EQPSTAT PMDUE|COMMENT 1|down by tpm consumption|END|`

    const res = await fetch('http://sgpatsprod01:4002/EQPSTATUS_UPDATE', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      body: raw_data
    });
    const result = await res.json()
    console.log(result)
    if (result == 'SUCCESS'){
      alert(`${props.eqp_id} status changes success`)
    }else{
      alert(`${props.eqp_id} status changes failed`)
    }
  }

  return (
      <button className="button is-info is-small" onClick={btnSubmit}>
        Down tool: {props.eqp_id}
      </button>
      
  );
};

export default ChangeEqpStatus;