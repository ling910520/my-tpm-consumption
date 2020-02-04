import fetch from 'isomorphic-unfetch';
import React, { useState,useEffect} from 'react'
import { useContext } from 'react';
import UserContext from './UserContext';



const TriggerTPM = (props) => {
  const [modalState,setmodalState]= useState(false)
  const [checkList,setcheckList]= useState(null)
  const [selectedcheckListValues,setselectedcheckListValues] = useState({value:''})
  const {userFullName } = useContext(UserContext);

  const getCheckListNames = async function() {
  const res = await fetch(`http://sgpatsprod01:4001/gettblCheckList/${props.eqp_id}`);
  const returnedCheckList = await res.json();
  setcheckList(returnedCheckList)
}

  const renderCheckListNames = () =>{
    if(checkList){
      return checkList.map((val,index)=>{
  
        return(
              <option key={index} value={val.checklist_name} id={val.checklist_id}>{val.checklist_name}</option>        
        )
      }
      )
    }else{
    }
  }

  const handleSelectChange = event =>{
    setselectedcheckListValues({value: Array.from(event.target.selectedOptions, (item) => item.value),
      checklistid: Array.from(event.target.selectedOptions, (item) => item.id),
      eqp_id:props.eqp_id,
      userFullName:userFullName
    },);
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
    setmodalState(!modalState)
    if(resstatus===200){
      alert('Checklist Trigger success')  
    }
}

useEffect(()=>{
  getCheckListNames()
  renderCheckListNames()
  
},[]);


  return (
    <div className="columns">
      <div className="column">
      <button className="button is-info	is-small is-rounded" onClick={() =>(setmodalState(!modalState),getCheckListNames())}>
        Trigger TPM
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

export default TriggerTPM;

