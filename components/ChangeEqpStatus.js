import fetch from 'isomorphic-unfetch';
import React, { useState,useEffect} from 'react'
import UserContext from '../components/UserContext';
import { useContext } from 'react';
import PromisComment from './PromisComment'

const ChangeEqpStatus =({eqp_id}) => {
  const {userFullName} = useContext(UserContext);

  const [status,setstatus] = useState(0)
  const [promisActionState,setpromisActionState]= useState({})



  const getCurrentToolStatus = async() => {
    const raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${eqp_id}|SHOW EQPS.EQPID|SHOW EQPS.STATUS|SHOW EQPS.CHANGEDT|END|`
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
      <button className="button is-success is-small is-rounded" onClick={()=>setpromisActionState({state:!promisActionState.state,action:'qual'})}>
        Qual tool: {eqp_id}
      </button>
      </div>
      <div className="column is-narrow">
      <button className="button is-danger	is-small is-rounded" onClick={()=>setpromisActionState({state:!promisActionState.state,action:'down'})}>
        Down tool: {eqp_id}
      </button>
      </div>
      <div className="column">
              <PromisComment eqp_id={eqp_id} promisActionState={promisActionState} setpromisActionState={setpromisActionState} getCurrentToolStatus={getCurrentToolStatus}></PromisComment>
        </div>
      </div>

    
      
  );
};

export default ChangeEqpStatus;

