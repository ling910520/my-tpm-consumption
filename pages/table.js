import Layout from '../components/Layout'
import React, { useState,useEffect} from 'react'
import '../styles/styles.css'

const Table = () =>{
  const returnedFromTool = [
    {id:1,"reporting_date":"2019-11-11",'eqp_id':'3SPT-20',"parameter_name":"cathode1","parameter_value":248.964495},
    {id:2,"reporting_date":"2019-11-11",'eqp_id':'3SPT-20',"parameter_name":"cathode3","parameter_value":108.964495},    
    {id:3,"reporting_date":"2019-11-11",'eqp_id':'3DE-02',"parameter_name":"Stat3_Etch_MV_PlatenRFHours","parameter_value":94.50147247}]
    
    const [toolDetails, setToolDetails] = useState(returnedFromTool)
    const initialFormState = {id:null,eqp_id:null,"reporting_date":"2019-11-11",parameter_name:null , parameter_value: null }
    const [toolDetail, setToolDetail] = useState(initialFormState)

    const handleInputChange = event => {
      const { name, value } = event.target
      setToolDetail({ ...toolDetail, [name]: value })
      }

      const addToolDetails = toolDetail => {
        toolDetail.id = toolDetails.length + 1
        setToolDetails([...toolDetails, toolDetail])
      }
    const renderTable = ()=>{
      return toolDetails.map((x,index)=>{
        return (
        <tr key={x.id}>
        <td>{x.reporting_date}</td>
        <td>{x.eqp_id}</td>
        <td>{x.parameter_name}</td>
        <td>{x.parameter_value}</td>

        <td>
            <button className="button muted-button"
              onClick={() => {
                editRow(x.eqp_id)
              }}>Edit
              </button>
            <button className="button muted-button"
            onClick={()=>{
              deleteRow(x.eqp_id)
            }}
            >
            Delete</button>
        </td>
        </tr>
        )
      })
    }

    const editRow = name =>{
      setUsers(users.map(user => (user.name === name ? Object.assign({}, user,{name:'wasifupdated'}) : user)))
    }

    const deleteRow = id =>{
      setUsers(users.filter(user =>user.id!==id))
    }

      // Similar to componentDidMount and componentDidUpdate:
      useEffect(() => {
        renderTable()
        renderForms()
      },[toolDetails]);

      const renderForms = ()=>{
        return(
          <div className="field is-grouped">
          <div className="content">
            <form
              onSubmit={event => {
                event.preventDefault()
                // if (!toolDetail.eqp_id || !toolDetail.parameter_name || !toolDetail.parameter_value) return
                addToolDetails(toolDetail)
                setToolDetail(initialFormState)
                console.log(toolDetail)

              }}
            >
              <div className="field">
                <label className="label">Tool ID</label>
                <div className="control">
                  <input className="input" type="text" name="eqp_id" value={toolDetail.eqp_id} onChange={handleInputChange} />
                </div>
              </div>
              <div className="field">
                <label className="label">Parameter Name</label>
                <div className="control">
                  <input className="input" type="text" name="parameter_name" value={toolDetail.parameter_name} onChange={handleInputChange} />
                </div>
              </div>
              <div className="field">
                <label className="label">Parameter Values</label>
                <div className="control">
                    <input className="input" type="text" name="parameter_value" value={toolDetail.parameter_value} onChange={handleInputChange} />
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
        )
      }





return(
    <Layout>


    <div className="columns is-centered" id='tablecontainer'>
    <div className="column is-narrow"></div>
    <div className="column is-narrow">
      {renderForms()}
      </div>
      <div className="column notification">
      <div className="card events-card">
        <div className="card-table" >
          <div className="content">
              <table className="table is-fullwidth is-striped is-bordered" >
                  <thead>
                    <tr>
                      <th>Reporting Date</th>
                      <th>Tool ID</th>
                      <th>Parameter Name</th>
                      <th>Parameter Values</th>
                      <th>Edit</th>
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


