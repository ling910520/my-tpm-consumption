import fetch from 'isomorphic-unfetch';
import React, { useState,useEffect} from 'react'
import { useContext } from 'react';
import UserContext from './UserContext';



const PromisComment = ({eqp_id,promisActionState,setpromisActionState,getCurrentToolStatus}) => {

  const {userFullName } = useContext(UserContext);
  const [eqpComment,setEqpComment] = useState('');
  
  const btnDownSubmit = async () =>{
    let raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${eqp_id}|EQPSTAT OPS-PM|COMMENT 2|${eqpComment}|PM by ${userFullName}|END|`
    
    const res = await fetch('http://sgpatsprod01:4002/EQPSTATUS_UPDATE', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      body: raw_data
    });
    const result = await res.json()
    setpromisActionState({...promisActionState,state:!promisActionState.state})

    if (result == 'SUCCESS'){
      alert(`${eqp_id} status changes success`)
    }else{
      alert(`${eqp_id} status changes failed`)
    }
  }
  const btnUpSubmit = async () =>{

    let raw_data =`|USERID FGUSER|PWD Fab$Guard|EQPID ${eqp_id}|EQPSTAT QUAL|COMMENT 2|${eqpComment}|Qual by ${userFullName}|END|`

    const res = await fetch('http://sgpatsprod01:4002/EQPSTATUS_UPDATE', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8'
      },
      body: raw_data
    });
    const result = await res.json()
    setpromisActionState({...promisActionState,state:!promisActionState.state})
    if (result == 'SUCCESS'){
      alert(`${eqp_id} status changes success`)

    }else{
      alert(`${eqp_id} status changes failed`)
    }
  }



  const handleCommentChange = (e) =>{
    setEqpComment(e.target.value)
  }
  useEffect(()=>{
    setEqpComment('')
    getCurrentToolStatus()

  },[promisActionState.state])


  return (
    <div className="columns">
      <div className="column">

      <div className={`modal ${promisActionState.state ? 'is-active' : ''}`}>>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Insert {promisActionState.action} eqp comment for  {eqp_id}</p>
                <button className="delete" aria-label="close" onClick={()=>setpromisActionState({...promisActionState,state:!promisActionState.state})}></button>
              </header>
              <section className="modal-card-body">
              <div className='content'>
                    <textarea type="text" id="eqpcomment" className="textarea" onChange={handleCommentChange} value={eqpComment} placeholder='please input comment'/>
                </div>
                </section>
              <div className="modal-card-foot">
                <button className="button is-success" onClick = {()=>promisActionState.action==='down' ? btnDownSubmit():btnUpSubmit()}> Confirm </button>
                <button className="button" onClick={()=>setpromisActionState({state:!promisActionState.state,action:'down'})}>Cancel</button>
          
              </div>

            </div>
            </div>

      </div>
    </div>

    
      
  );
};

export default PromisComment;

