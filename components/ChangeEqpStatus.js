import fetch from 'isomorphic-unfetch';
import React, { useState,useEffect} from 'react'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
const ChangeEqpStatus = (props) => {
  const [status,setstatus] = useState(0)
  const [modalState,setmodalState]= useState(false)
  const [checkList,setcheckList]= useState(null)
  const [selectedcheckListValues,setselectedcheckListValues] = useState({value:''})
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
      getCurrentToolStatus()
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
  const getCheckListNames = async function() {
  const res = await fetch(`http://sgpatsprod01:4001/gettblCheckList/${props.eqp_id}`);
  const returnedCheckList = await res.json();
  setcheckList(returnedCheckList)
}

  const renderCheckListNames = () =>{
    if(checkList){
      return checkList.map((val,index)=>{
  
        return(
              <option key={index} value={val.checklist_name}>{val.checklist_name}</option>        
        )
      }
      )
    }else{
    }
  }

  const handleSelectChange = event =>{
    setselectedcheckListValues({value: Array.from(event.target.selectedOptions, (item) => item.value)});
  }
  
  const triggerTPM= async (event)=> {
     event.preventDefault()
     const res = await fetch('http://sgpatsprod01:4001/createchecklist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedcheckListValues)
    });    
    const resstatus = await res.status;
    if(resstatus===200){
      console.log('Checklist Trigger success')
      
    }
}

useEffect(()=>{
  getCheckListNames()
  renderCheckListNames()
  
},[]);



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
      <div className="column">
      <button className="button is-info	is-small is-rounded" onClick={() =>(setmodalState(!modalState),getCheckListNames())}>
        Unscheduled PM
      </button>
      <div className={`modal ${modalState ? 'is-active' : ''}`}>>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">TPM CheckList: {props.eqp_id}</p>
                <button className="delete" aria-label="close" onClick={() =>setmodalState(!modalState)}></button>
              </header>
              <section className="modal-card-body">
              <div className='content'>
                    <div className="select is-multiple is-fullwidth">
                              <select multiple onChange={handleSelectChange}>
                              {renderCheckListNames()}
                              </select>
                          </div>
                </div>
                </section>
              <div className="modal-card-foot">
                <button className="button is-success" onClick={triggerTPM}>Trigger TPM</button>
                <button className="button" onClick={() =>setmodalState(!modalState)}>Cancel</button>
          
              </div>

            </div>
        </div>
      </div>
    </div>

    
      
  );
};

export default ChangeEqpStatus;

