import fetch from 'isomorphic-unfetch';
import React, { useState,useEffect} from 'react'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';

const ChangeEqpStatus = (props) => {
  const [status,setStatus] = useState(0)

  const btnDownSubmit = async () =>{
    const raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${props.eqp_id}|EQPSTAT PMDUE|COMMENT 1|down by tpm consumption|END|`

    const res = await fetch('http://sgpatsprod01:4002/EQPSTATUS_UPDATE', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      body: raw_data
    });
    const result = await res.json()
    if (result == 'SUCCESS'){
      alert(`${props.eqp_id} status changes success`)
    }else{
      alert(`${props.eqp_id} status changes failed`)
    }
  }
  const btnUpSubmit = async () =>{
    const raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${props.eqp_id}|EQPSTAT AVAIL|COMMENT 1|down by tpm consumption|END|`

    const res = await fetch('http://sgpatsprod01:4002/EQPSTATUS_UPDATE', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      body: raw_data
    });
    const result = await res.json()
    if (result == 'SUCCESS'){
      alert(`${props.eqp_id} status changes success`)
    }else{
      alert(`${props.eqp_id} status changes failed`)
    }
  }



useEffect(()=>{
  const raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${props.eqp_id}|SHOW EQPS.EQPID|SHOW EQPS.STATUS|SHOW EQPS.CHANGEDT|END|`
  const getCurrentToolStatus = async() => {
    const res = await fetch('http://sgpatsprod01:4002/EQPSTATUS_EQPSLIST', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8'
    },
    body: raw_data
  })
  const result = await res.json()
  setStatus(result)
};
getCurrentToolStatus()
});


  return (
    <div className="columns">
      <div className="column is-narrow">
      <div className={`tag is-medium ${status.status ==='AVAIL' ?'is-success':'is-danger'}`} >
        Current status: {status.status}
      </div>
      </div>
      <div className="column is-narrow">
      <button className="button is-success is-small is-rounded" onClick={btnUpSubmit}>
        Up tool: {props.eqp_id}
      </button>
      </div>
      <div className="column">
      <button className="button is-danger	is-small is-rounded" onClick={btnDownSubmit}>
        Down tool: {props.eqp_id}
      </button>
      </div>

    </div>
      
  );
};

export default ChangeEqpStatus;