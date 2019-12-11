import fetch from 'isomorphic-unfetch';
import React, { useState,useEffect} from 'react'
import UserContext from '../components/UserContext';
import { useContext } from 'react';

const ChangeEqpStatus = (props) => {
  const {userFullName} = useContext(UserContext);

  const [status,setstatus] = useState(0)

  const btnDownSubmit = async () =>{
    const raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${props.eqp_id}|EQPSTAT PMDUE|COMMENT 2|${props.svid_name} : ${props.svid_value}|down by ${userFullName}|END|`

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
      getCurrentToolStatus()
    }else{
      alert(`${props.eqp_id} status changes failed`)
    }
  }
  const btnUpSubmit = async () =>{
    const raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${props.eqp_id}|EQPSTAT AVAIL|COMMENT 2|${props.svid_name} : ${props.svid_value}|Up by ${userFullName}|END|`

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
      getCurrentToolStatus()

    }else{
      alert(`${props.eqp_id} status changes failed`)
    }
  }

    const getCurrentToolStatus = async() => {
      const raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${props.eqp_id}|SHOW EQPS.EQPID|SHOW EQPS.STATUS|SHOW EQPS.CHANGEDT|END|`
      const res = await fetch('http://sgpatsprod01:4002/EQPSTATUS_EQPSLIST', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      body: raw_data
    })
    const result = await res.json()
    setstatus(result)
  };


useEffect(()=>{
  getCurrentToolStatus()
},[status.status]);

  return (
    <div className="columns">
      <div className="column is-narrow">
      <div className={`tag is-medium ${status.status ==='AVAIL' ?'is-success':'is-danger'}`} >
        Current Status: {status.status}
      </div>
      </div>
      <div className="column is-narrow">
      <button className="button is-success is-small is-rounded" onClick={btnUpSubmit}>
        Up tool: {props.eqp_id}
      </button>
      </div>
      <div className="column is-narrow">
      <button className="button is-danger	is-small is-rounded" onClick={btnDownSubmit}>
        Down tool: {props.eqp_id}
      </button>
      </div>

      </div>

    
      
  );
};

export default ChangeEqpStatus;

