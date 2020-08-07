import Layout from '../components/Layout'
import React, { useState,useEffect} from 'react'
import { CSVLink, CSVDownload } from "react-csv";
import fetch from 'isomorphic-unfetch';
import moment from 'moment'

import '../styles/styles.css'
const Table = (props) =>{
    const sortOrder = ['msg_id','inserted_timestamp','eqp_id','svid_name','svid_value','consumption_limit']

    const initialFormState = {msg_id:'',inserted_timestamp:'',eqp_id:'',svid_name:'' , svid_value: ''}
    const [toolDetail,settoolDetail] = useState(initialFormState)

    const header =Object.keys(props.returnedFromTool[0])
    header.sort(function(a,b){return sortOrder.indexOf(a)-sortOrder.indexOf(b)})
    const [toolDetails, settoolDetails] = useState(props.returnedFromTool) // returned from tool 
    const distinctEqpId = [...new Set(props.returnedFromTool.map(x=>x.eqp_id))]

    //function to render table
    const renderTable = ()=>{
      return toolDetails.map((x,index)=>{
        return (
        <tr key={x.msg_id}>
        <td className="has-text-centered">{moment.utc(x.inserted_timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
        <td className="has-text-centered">{x.eqp_id}</td>
        <td className="has-text-centered">{x.svid_name}</td>
        <td className="has-text-centered">{x.svid_value}</td>
        <td className="has-text-centered">{x.consumption_limit}</td>

        </tr>
        )
      })
    }

    // function for handle user change filter parameter
    const handleInputChange = event => {
      event.preventDefault()
      const { value } = event.target
      if(value ==='Select Eqp'){
        settoolDetails([...props.returnedFromTool])
      }else{
        settoolDetails(props.returnedFromTool.filter(toolDetail =>toolDetail.eqp_id===value))
      }
    }

return(
    <Layout>


    <div className="columns is-centered" id='tablecontainer'>
    <div className="column is-narrow"></div>

      <div className="column notification ">
      <div className="columns">
                <div className="column is-narrow">
                  <button className="button is-primary">
                  <CSVLink data={toolDetails} id="csvLink" filename="data.csv">Download</CSVLink>
                  </button>
                </div>
                <div className="column">
                    <div className="select is-info">
                  <select onChange={handleInputChange}>
                    <option value="Select Eqp">Select Eqp </option>
                    {
                      distinctEqpId.map((item,key)=>(
                      <option value={item} key={key}>{item}</option>
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
  const res = await fetch('http://sgpatsprod01:4001/getrawdata');
  const returnedFromTool = await res.json();

  return {
    returnedFromTool
  };
}
export default Table;


