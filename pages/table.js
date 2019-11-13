import Layout from '../components/Layout'
import React, { useState,useEffect,useReducer} from 'react'
import { CSVLink, CSVDownload } from "react-csv";

import '../styles/styles.css'
import {returnedFromTool,supportedParameter} from '../data/data'
const Table = () =>{

    //initialize part 

    let today = new Date().toISOString().split('T')[0]

    const initialFormState = {id:'',eqp_id:'',"reporting_date":today,parameter_name:'' , parameter_value: '',limit: ''}
    const [toolDetail,settoolDetail] = useState(initialFormState)

    const header =Object.keys(returnedFromTool[0])
    const [toolDetails, settoolDetails] = useState(returnedFromTool)

    // const originalToolDetails = [...toolDetails]
    //reducer 
    // function init(toolDetails){
    //   return {initialState:toolDetails}
    // }
    // const reducer = (state,action)=>{
    //   if(action.eqp_id==='Select Eqp'){
    //       console.log(`${action.eqp_id}`)
    //       return settoolDetails(originalToolDetails);
    //     }else{
    //       console.log(`${action.eqp_id} hello`)
    //     return settoolDetails(toolDetails.filter(toolDetail =>toolDetail.eqp_id===action.eqp_id))
    //   }

    // }



    // const [state, dispatch] = useReducer(reducer, toolDetails, init);

    const distinctEqpId = [...new Set(toolDetails.map(x=>x.eqp_id))]

    const renderTable = ()=>{
      return toolDetails.map((x,index)=>{
        return (
        <tr key={x.id}>
        <td>{x.reporting_date}</td>
        <td>{x.eqp_id}</td>
        <td>{x.parameter_name}</td>
        <td>{x.parameter_value}</td>
        <td>{x.limit}</td>

        <td>

            <button className="button muted-button"
            onClick={()=>{
              deleteRow(x.id)
            }}
            >
            Delete</button>
        </td>
        </tr>
        )
      })
    }

    // const editRow = name =>{
    //   setUsers(users.map(user => (user.name === name ? Object.assign({}, user,{name:'wasifupdated'}) : user)))
    // }

    const deleteRow = id =>{
      settoolDetails(toolDetails.filter(toolDetail =>toolDetail.id!==id))
    }

    const handleSelectChange = event =>{
      const { name, value } = event.target
      settoolDetail({ ...toolDetail, [name]: value })
    }
    const handleInputChange = event => {
      const { value } = event.target
      if(value ==='Select Eqp'){
        settoolDetails([...returnedFromTool])
      }else{
        settoolDetails(toolDetails.filter(toolDetail =>toolDetail.eqp_id===value))
      }

      // alert(value)
      }

      const addToolDetails = toolDetail => {
        toolDetail.id = toolDetails.length + 1
        settoolDetails([...toolDetails, toolDetail])
      }
          useEffect(() => {
      // Update the document title using the browser API
      renderTable()
    },[toolDetails]);
return(
    <Layout>


    <div className="columns is-centered" id='tablecontainer'>
    <div className="column is-narrow"></div>
    <div className="column is-narrow">
    <div className="field is-grouped">
          <div className="content">
            <form
              onSubmit={event => {
                event.preventDefault()
                // if (!toolDetail.eqp_id || !toolDetail.parameter_name || !toolDetail.parameter_value) return
                addToolDetails(toolDetail)
                settoolDetail(initialFormState)
                // console.log(toolDetail)

              }}
            >
              <div className="field">
                <label className="label">Tool ID</label>
                  <div className="control">
                  <input className="input" type="text" name="eqp_id" value={toolDetail.eqp_id} onChange={handleSelectChange} list="eqp_id"/>
                  <datalist id="eqp_id">
                  {
                    toolDetails.map((item,key)=>(
                      <option key={key} value ={item.eqp_id}/>
                    ))
                  }
                  </datalist>
                  </div>
              </div>
              <div className="field">
                <label className="label">Parameter Name</label>
                <div className="control">
                <input className="input" type="text" name="parameter_name" value={toolDetail.parameter_name} onChange={handleSelectChange} list="parameter_name"/>
                  <datalist id="parameter_name">
                  {
                    supportedParameter.map((item,key)=>(
                      <option key={key} value ={item.parameter_name}/>
                    ))
                  }
                  </datalist>
                  </div>
              </div>
              <div className="field">
                <label className="label">Parameter Values</label>
                <div className="control">
                    <input className="input" type="text" name="parameter_value" value={toolDetail.parameter_value} onChange={handleSelectChange} />
                    </div>
              </div>
              <div className="field">
                <label className="label">Max Limit</label>
                <div className="control">
                    <input className="input" type="text" name="limit" value={toolDetail.limit} onChange={handleSelectChange} />
                    </div>
              </div>
              <div className="field">
              <div className="control">
                <button className="button is-primary">Add new data</button>
                </div>
              </div>
            </form>
          </div>
          </div>
      </div>
      <div className="column notification ">
      <div className="columns">
                <div className="column is-narrow">
                  <button className="button is-primary">
                  <CSVLink data={toolDetails} id="csvLink">Download</CSVLink>
                  </button>
                </div>
                <div className="column">
                    <div className="select is-info">
                  <select onChange={handleInputChange}>
                    <option>Select Eqp </option>
                    {
                      distinctEqpId.map((item,key)=>(
                      <option key={key}>{item}</option>
                    ))
                  }
                  </select>
                </div>
                </div>
      </div>


      <div className="card events-card">
        <div className="card-table" >
          <div className="content">
              <table className="table is-fullwidth is-striped is-bordered" >
                  <thead>
                  <tr>
                  {
                    header.map( (head,index) => {
                      if (head!=='id'){
                        return  <th className="has-text-centered" key={index}>{head}</th>
                      }
                    }

                    )
                  }
                    <th className="has-text-centered">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTable()}
                  </tbody>
                </table>
          </div>
      </div>
      </div>
      </div>
    </div>



    </Layout>
)
}


export default Table;


