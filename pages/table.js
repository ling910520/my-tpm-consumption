import Layout from '../components/Layout'
import React, { useState,useEffect} from 'react'
import { CSVLink, CSVDownload } from "react-csv";
import fetch from 'isomorphic-unfetch';

import '../styles/styles.css'
import {supportedParameter} from '../data/data'
const Table = (props) =>{

    //initialize part 

    let today = new Date().toISOString().split('T')[0]

    const initialFormState = {msg_id:'',"reporting_date":today,eqp_id:'',parameter_name:'' , parameter_value: '',parameter_limit: ''}
    const [toolDetail,settoolDetail] = useState(initialFormState)

    const header =Object.keys(props.returnedFromTool[0])
    const [toolDetails, settoolDetails] = useState(props.returnedFromTool)
    const distinctEqpId = [...new Set(toolDetails.map(x=>x.eqp_id))]

    //render table
    const renderTable = ()=>{
      return toolDetails.map((x,index)=>{
        return (
        <tr key={x.msg_id}>
        <td>{x.reporting_date}</td>
        <td>{x.eqp_id}</td>
        <td>{x.parameter_name}</td>
        <td>{x.parameter_value}</td>
        <td>{x.parameter_limit}</td>

        <td>

            <button className="button muted-button"
            onClick={()=>{
              deleteRow(x.msg_id)
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

    const deleteRow = msg_id =>{
      settoolDetails(toolDetails.filter(toolDetail =>toolDetail.msg_id!==msg_id))
    }

    const handleSubmit = toolDetail =>{
      console.log(toolDetail)
      fetch('http://sgpatsprod01:5000/adddata', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toolDetail)
      });
      // console.log(`${toolDetail} submmitted`)
    }

    const handleSelectChange = event =>{
      const { name, value } = event.target
      settoolDetail({ ...toolDetail, [name]: value })
    }
    const handleInputChange = event => {
      const { value } = event.target
      settoolDetails(toolDetails.filter(toolDetail =>toolDetail.eqp_id===value))

      // alert(value)
      }

      const addToolDetails = toolDetail => {
        toolDetail.msg_id = toolDetails.length + 1
        settoolDetails([...toolDetails, toolDetail])
      }
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
                handleSubmit(toolDetail)
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
                    distinctEqpId.map((item,key)=>(
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
                    <input className="input" type="text" name="parameter_limit" value={toolDetail.parameter_limit} onChange={handleSelectChange} />
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
                      if (head!=='msg_id'){
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

Table.getInitialProps = async function() {
  const res = await fetch('http://sgpatsprod01:5000/getdetails');
  const returnedFromTool = await res.json();

  return {
    returnedFromTool
  };
}
export default Table;


