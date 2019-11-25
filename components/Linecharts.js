import Layout from './Layout'
import Kanban from './kanban'
import '../styles/styles.css'
import { returnedFromTool } from '../data/data'
import orderBy from "lodash/orderBy";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ReferenceLine,Label
  } from 'recharts';
import ChangeEqpStatus from './ChangeEqpStatus'
  
const Linecharts = (props) => {
    const  data = orderBy(props.unsortedData,['msg_id'])
    const {eqp_id,svid_name} = data[0]
    
    const renderEqpLimitCharts=()=>{

        if(eqp_id.match(/DE/g)){
            return(
                <div> 
                <div className="columns">
                <div className="column is-narrow">
                <h1 className="is-capitalize has-text-weight-bold">{eqp_id}</h1>
                </div>
                <div className="column">
                <ChangeEqpStatus eqp_id={eqp_id}></ChangeEqpStatus>
                </div>
               </div>
                <LineChart
                        width={2*200}
                        height={2*100}
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="inserted_timestamp" tick={false}/>
                        <YAxis interval="preserveStartEnd"/>
                        <Tooltip />
        
                        <Legend />
                        <ReferenceLine name="Max" y={110} stroke="red"  ifOverflow="extendDomain" label ="RF Max (110)"/>
                        <ReferenceLine name="Warning" y={99} stroke="orange"  ifOverflow="extendDomain" label ="RF Warning (99)"/>
        
                        <Line type="monotone" dataKey="svid_value" name="RF Hrs" stroke="#8884d8" activeDot={{ r: 8 }} />
        
                    </LineChart>
                    </div>
            )
        }else if(eqp_id.match(/SPT/g)){
             const  Ti = data.filter(row =>row.svid_name==='Ti')
             const  Cu = data.filter(row =>row.svid_name==='Cu')
             const all =[{name:'Ti',data:Ti},{name:'Cu',data:Cu}]
            // const {eqp_id,svid_name} = Cu[0]

            return(
                <div>
                <div className="columns">
                <div className="column is-narrow">
                <h1 className="is-capitalize has-text-weight-bold">{eqp_id}</h1>
                </div>
                <div className="column">
                <ChangeEqpStatus eqp_id={eqp_id}></ChangeEqpStatus>
                </div>
               </div>

                <LineChart
                        width={2*200}
                        height={2*100}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="inserted_timestamp"  tick={false}/>
                        <YAxis  dataKey="svid_value" interval="preserveStartEnd"/>
            

                        <Tooltip />
                        <Legend />
                        <ReferenceLine name="Cu Max" y={525} stroke="red"  ifOverflow="extendDomain" label ="Cu Max(525)"/>
                        <ReferenceLine name="Ti Max" y={300}  stroke="red"  ifOverflow="extendDomain" label ="Ti Max(300)"/>

                        <Line  type="monotone" dataKey="svid_value"  data={Ti} name = "Ti"  stroke="blue" />
                        <Line type="monotone" dataKey="svid_value"   data={Cu} name = "Cu" stroke="#b87333"  />

                        {/* <Line type="monotone" dataKey="svid_value" name={svid_name} stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                    </LineChart>
                    </div>
            ) 
        }
    }
      
    return (
        <div>
            {renderEqpLimitCharts()}
        </div>
    )
   
}


export default Linecharts;



