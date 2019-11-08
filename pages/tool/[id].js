import fetch from 'isomorphic-unfetch';
import orderBy from "lodash/orderBy";


const tool = (props) =>{
    let header = Object.keys(props.toolTableData[0]).filter(x=>(x!=='RF_HRS')) // take out rf_hrs columns
    let body = orderBy(props.toolTableData,'reporting_date','desc') //order desc by reporting date
    return (
        <div className="section table-container">
            <div className="columns is-pulled-left">
            <table className="table is-bordered is-hoverable">
                <thead className="">
                    <tr >
                    {header.map((key,index)=>(
                                <th key={index} className='is-info'>{key}</th>
                    ))}
    
                    </tr>
                </thead>
              <tbody>
              {
                body.map((key,index)=>(
                    <tr key={index}>
                            <td>{key.reporting_date}</td>
                            <td>{key.PlatenRFHours}</td>
                    </tr>
                ))
              }

              </tbody>
            </table>
            {/* <CSVLink data={this.state.students}>Download me</CSVLink>
                        <CSVDownload data={this.state.students} target="_blank" /> */}
        </div>
        </div>
    )
}

tool.getInitialProps  = async function(context){
    const { id } = context.query;
    const res = await fetch(`http://sgpatsprod01:5000/tooldata/${id}`);
    const toolTableData = await res.json();
    return {toolTableData};

}

export default tool;
