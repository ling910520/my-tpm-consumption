import Layout from '../components/Layout'
import React, { useState,useEffect} from 'react'
import '../styles/styles.css'

const Table = () =>{
  const returnedFromTool = [
    {id: 1,reporting_date: "2019-11-11",eqp_id: '3SPT-20',parameter_name:"cathode1",parameter_value:248.964495},
    {id: 2,reporting_date: "2019-11-11",eqp_id: '3SPT-20',parameter_name:"cathode3",parameter_value:108.964495},    
    {id: 3,reporting_date: "2019-11-11",eqp_id: '3DE-02',parameter_name:"Stat3_Etch_MV_PlatenRFHours",parameter_value:94.50147247}]
  const supportedParameter=[
    {id:1,parameter_name:"Stat3_Etch_MV_PlatenRFHours"},{id:2,parameter_name:"cathode3"},{id:3,parameter_name:"cathode3"}
  ]
    
    const [toolDetails, settoolDetails] = useState(returnedFromTool)

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
    let today = new Date().toISOString().split('T')[0]
    const initialFormState = {id:'',eqp_id:'',"reporting_date":today,parameter_name:'' , parameter_value: '' }
    const [toolDetail,settoolDetail] = useState(initialFormState)

    const handleInputChange = event => {
      const { name, value } = event.target
      settoolDetail({ ...toolDetail, [name]: value })
      }

      const addToolDetails = toolDetail => {
        toolDetail.id = toolDetails.length + 1
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
                addToolDetails(toolDetail)
                settoolDetail(initialFormState)
                // console.log(toolDetail)

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
                <input className="input" type="text" name="parameter_name" value={toolDetail.parameter_name} onChange={handleInputChange} list="data"/>
                  <datalist id="data">
                  {
                    supportedParameter.map((item,key)=>(
                      <option key={key} value ={item.parameter_name}/>
                    ))
                  }
                        <option value="Internet Explorer"/>
                        <option value="Firefox"/>
                        <option value="Chrome"/>
                  </datalist>
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
      </div>
      <div className="column notification ">
      <div className="card events-card">
        <div className="card-table" >
          <div className="content">
              <table className="table is-fullwidth is-striped is-bordered" >
                  <thead>
                    <tr>
                      <th className="has-text-centered">Reporting Date</th>
                      <th className="has-text-centered">Tool ID</th>
                      <th className="has-text-centered">Parameter Name</th>
                      <th className="has-text-centered">Parameter Values</th>
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


