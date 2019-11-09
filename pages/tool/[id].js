import fetch from 'isomorphic-unfetch';
import orderBy from "lodash/orderBy";
import "react-table/react-table.css";
import ReactTable from 'react-table';


const tool = (props) =>{
    let header = Object.keys(props.toolTableData[0]).filter(x=>(x!=='RF_HRS')) // take out rf_hrs columns
    let body = orderBy(props.toolTableData,'reporting_date','desc') //order desc by reporting date

    const columns = [
        {
          Header: 'reporting_date',
          accessor: 'reporting_date',
          headerStyle: { whiteSpace: 'unset' },
          style: { whiteSpace: 'unset'},
        },
        {
          Header: 'PlatenRFHours',
          accessor: 'PlatenRFHours',
          headerStyle: { whiteSpace: 'unset' },
          style: { whiteSpace: 'unset' },
        }
      ];
    return (
        <ReactTable 
              
        manual
        minRows={0}
        pageSize={1}
        data={body}
        columns={columns}
        pages={0}
        showPagination={false}
      />
    )
}

tool.getInitialProps  = async function(context){
    const { id } = context.query;
    const res = await fetch(`http://sgpatsprod01:5000/tooldata/${id}`);
    const toolTableData = await res.json();
    return {toolTableData};

}

export default tool;



