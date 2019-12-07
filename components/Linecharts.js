import Layout from './Layout'
import Kanban from './kanban'
import '../styles/styles.css'
import orderBy from "lodash/orderBy";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label
} from 'recharts';
import ChangeEqpStatus from './ChangeEqpStatus'
import TriggerTPM from './TriggerTPM'

const Linecharts = (props) => {
    const scale = 3
    const data = orderBy(props.unsortedData, ['msg_id'])
    const eqp_id  = data[0]['eqp_id'].toUpperCase()
    const renderEqpLimitCharts = () => {

        if (eqp_id.match(/DE/g)) {
            return (
                <div>
                    <div className="columns">
                        <div className="column is-narrow">
                            <h1 className="is-capitalize has-text-weight-bold">{eqp_id}</h1>
                        </div>
                        <div className="column">
                            <ChangeEqpStatus eqp_id={eqp_id}></ChangeEqpStatus>
                        </div>
                    </div>
                    <div className="columns is-pulled-right">

                        <div className="column">
                            <TriggerTPM eqp_id={eqp_id}></TriggerTPM>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <LineChart
                                width={scale * 200}
                                height={scale * 100}
                                data={data}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="inserted_timestamp" tick={false} />
                                <YAxis interval="preserveStartEnd" />
                                <Tooltip />

                                <Legend />
                                <ReferenceLine name="Max" y={110} stroke="red" ifOverflow="extendDomain" label="RF Max (110)" />
                                <ReferenceLine name="Warning" y={99} stroke="orange" ifOverflow="extendDomain" label="RF Warning (99)" />

                                <Line dataKey="svid_value" name="RF Hrs" stroke="#8884d8" activeDot={{ r: 8 }} />

                            </LineChart>
                        </div>
                    </div>

                </div>
            )
        } else if (eqp_id.match(/SPT/g)) {

            const Ti_Shield = data.filter(row => row.svid_name === 'Ti Shield')
            const Ti_Target = data.filter(row => row.svid_name === 'Ti Target')
            const Cu_Shield = data.filter(row => row.svid_name === 'Cu Shield')
            const Cu_Target = data.filter(row => row.svid_name === 'Cu Target')
            const Etch_Shield = data.filter(row => row.svid_name === 'Etch Shield')
            const Etch_Quartz = data.filter(row => row.svid_name === 'Etch Quartz Shield')


            return (
                <div>
                    <div className="columns">
                    <div>
                    </div>
                        <div className="column is-narrow">
                            <h1 className="is-capitalize has-text-weight-bold">{eqp_id}</h1>
                        </div>
                        <div className="column ">
                            <ChangeEqpStatus eqp_id={eqp_id}></ChangeEqpStatus>
                        </div>
                    </div>
                    <div className="columns is-pulled-right">
           
                        <div className="column">
                            <TriggerTPM eqp_id={eqp_id}></TriggerTPM>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <LineChart
                                width={scale * 200}
                                height={scale * 100}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="inserted_timestamp" tick={false} />
                                <YAxis interval="preserveStartEnd" />
                                <Tooltip />
                                <Legend />

                                {Ti_Target.length>0?<ReferenceLine name="Ti Target" y={parseInt(Ti_Target[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Ti Target (${parseInt(Ti_Target[0]['consumption_limit'])})`}  />:''}
                                {Ti_Target.length>0?<Line dataKey="svid_value" data={Ti_Target} name="Ti_Target" stroke="blue" key="Ti_Target" />:''}

                                {Ti_Shield.length>0?<ReferenceLine name="Ti Shield" y={parseInt(Ti_Shield[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Ti Shield ${parseInt(Ti_Shield[0]['consumption_limit'])}`}  />:''}
                                {Ti_Shield.length>0?<Line dataKey="svid_value" data={Ti_Shield} name="Ti_Shield" stroke="pink" key="Ti_Shield" />:''}

                                {Cu_Target.length>0?<ReferenceLine name="Cu Target" y={parseInt(Cu_Target[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Cu Target (${parseInt(Cu_Target[0]['consumption_limit'])})`}  />:''}
                                {Cu_Target.length>0?<Line dataKey="svid_value" data={Cu_Target} name="Cu_Target" stroke="orange" key="Cu_Target" />:''}

                                {Cu_Shield.length>0?<ReferenceLine name="Cu Shield" y={parseInt(Cu_Shield[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Cu Shield ${parseInt(Cu_Shield[0]['consumption_limit'])}`}  />:''}
                                {Cu_Shield.length>0?<Line dataKey="svid_value" data={Cu_Shield} name="Cu_Shield" stroke="yellow" key="Cu_Shield" />:''}

                                {Etch_Shield.length>0?<ReferenceLine name="Etch_Shield" y={parseInt(Etch_Shield[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Etch_Shield (${parseInt(Etch_Shield[0]['consumption_limit'])})`}  />:''}
                                {Etch_Shield.length>0?<Line dataKey="svid_value" data={Etch_Shield} name="Etch_Shield" stroke="green" key="Etch_Shield" />:''}
                               
                                {Etch_Quartz.length>0?<ReferenceLine name="Etch_Quartz" y={parseInt(Etch_Quartz[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Etch_Quartz (${parseInt(Etch_Quartz[0]['consumption_limit'])})`}  />:''}
                                {Etch_Quartz.length>0?<Line dataKey="svid_value" data={Etch_Quartz} name="Etch_Quartz" stroke="grey" key="Etch_Quartz" />:''}

                            </LineChart>
                        </div>
                    </div>

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



