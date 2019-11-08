import fetch from 'isomorphic-unfetch';


const tool = (props) =>{
    let header = Object.keys(props.toolTableData[0])
    return (
        <div className="table-container">
            <table id='students' className="table is-bordered is-hoverable">
                <thead>
                    <tr >
                    {header.map((key,index)=>(
                        <th key={key}>{key}</th>
                    )
                    )}
                    </tr>
                </thead>
              <tbody>
              {props.toolTableData.map(data =>(
                  <tr>
                            <td>{data.reporting_date}</td>
                            <td>{data.RF_HRS}</td>
                            <td>{data.PlatenRFHours}</td>
                            </tr>
              ))}
              </tbody>
            </table>
            {/* <CSVLink data={this.state.students}>Download me</CSVLink>
                        <CSVDownload data={this.state.students} target="_blank" /> */}
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
