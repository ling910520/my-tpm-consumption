import fetch from 'isomorphic-unfetch';
import React, { useState,useEffect} from 'react'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const ChangeEqpStatus = (props) => {
  const [status,setStatus] = useState(0)

  const btnSubmit = async () =>{
    let raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${props.eqp_id}|EQPSTAT PMDUE|
    COMMENT 1|from tpm consumption|END|`

    const res = await fetch('http://sngwu2.ad.skynet:13216/EQPSTATUS_UPDATE', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      mode:'no-cors',
      body: raw_data
    });
    const returnedStatus = await res.statusText
    console.log(returnedStatus)
    if (returnedStatus == 200){
      alert(`${props.eqp_id} status changes`)
    }else{
      alert(`no responses ${returnedStatus}`)
    }
  }

  return (
      <button className="button is-primary is-small" onClick={btnSubmit}>
        ChangeEqpStatus: {props.eqp_id}
      </button>
      
  );
};

export default ChangeEqpStatus;