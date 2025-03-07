import '../styles/styles.css'
import orderBy from "lodash/orderBy";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label,ResponsiveContainer,LabelList
} from 'recharts';
import ChangeEqpStatus from './ChangeEqpStatus'
import TriggerTPM from './TriggerTPM'
import moment from 'moment'

const Linecharts = (props) => {
    const scale = 2.5
    const data = orderBy(props.unsortedData, ['msg_id'])
    const eqp_id  = data[0]['eqp_id'].toUpperCase()
    const renderEqpLimitCharts = () => {
        if (eqp_id.match(/DE/g)) {

            const PM1_RFHours = data.filter(row => row.svid_name === 'Stat2_Etch_MV_RFHours')
            const PM2_RFHours = data.filter(row => row.svid_name === 'Stat3_Etch_MV_RFHours')
            const PM3_RFHours = data.filter(row => row.svid_name === 'Stat4_Etch_MV_RFHours')

            const series = [{name: 'PM1_RFHours', data:PM1_RFHours},
            {name: 'PM2_RFHours', data:PM2_RFHours},
            {name: 'PM3_RFHours', data:PM3_RFHours}
            ]


            const {consumption_limit,svid_value,inserted_timestamp,svid_name}=data[data.length-1]
            const remainDays = (consumption_limit - parseFloat(svid_value))/8
            const tpmForecast= moment(inserted_timestamp).add(remainDays.toFixed(),'days')
            return (
                <div>
                    <div className="columns">
                    <div>
                    </div>
                        <div className="column is-narrow">
                            <h1 className="is-capitalize has-text-weight-bold">{eqp_id}</h1>
                        </div>
                        <div className="column">
                            <ChangeEqpStatus eqp_id={eqp_id}></ChangeEqpStatus>
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
                                <ReferenceLine name="Max" y={400} stroke="red" ifOverflow="extendDomain" label={`RF Max (${parseInt(data[0]['consumption_limit'])})`} />
                                <ReferenceLine name="Warning" y={360} stroke="orange" ifOverflow="extendDomain" label={`RF Max (${parseInt(data[0]['consumption_limit'])*0.9})`} />

                                {/* <Line dataKey="svid_value" name="RF Hrs" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                                {PM1_RFHours.length>0?<Line dataKey="svid_value" data={series[0]['data']} name="PM1_RFHours" stroke="blue" key="PM1_RFHours" />:''}
                                {PM2_RFHours.length>0?<Line dataKey="svid_value" data={series[1]['data']} name="PM2_RFHours" stroke="orange" key="PM2_RFHours" />:''}
                                {PM3_RFHours.length>0?<Line dataKey="svid_value" data={series[2]['data']} name="PM3_RFHours" stroke="cyan" key="PM3_RFHours" />:''}

                            </LineChart>
                        </div>
                        <div className="column">
                        
                            <TriggerTPM eqp_id={eqp_id}></TriggerTPM>
                            <span className="tag is-info is-small is-rounded">TPM Forecast : {moment.utc(tpmForecast).format('YYYY-MM-DD')}</span>
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
            const Etch_Quartz = data.filter(row => row.svid_name === 'Etch Quartz')
            
            const series = [{name: 'Ti_Shield', data:Ti_Shield},
            {name: 'Ti_Target', data:Ti_Target},
            {name: 'Cu_Shield', data:Cu_Shield},
            {name: 'Cu_Target', data:Cu_Target},
            {name: 'Etch_Shield', data:Etch_Shield},
            {name: 'Etch_Quartz', data:Etch_Quartz},
            ]


            return (
                <div>
                    <div className="columns">
                    <div>
                    </div>
                        <div className="column is-narrow">
                            <h1 className="is-capitalize has-text-weight-bold">{eqp_id}</h1>
                        </div>
                        <div className="column">
                            <ChangeEqpStatus eqp_id={eqp_id} ></ChangeEqpStatus>
                        </div>
                    </div>
                    <div className="columns">
           
           
                        <div className="column">
                            <LineChart
                                width={scale * 200}
                                height={scale * 100}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="inserted_timestamp" tick={false} type="category" allowDuplicatedCategory={false} />
                                <YAxis interval="preserveStartEnd" />
                                <Tooltip />
                                <Legend />

                                {Ti_Target.length>0?<ReferenceLine name="Ti Target" y={parseInt(Ti_Target[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Ti Target (${parseInt(Ti_Target[0]['consumption_limit'])})`}  />:''}
                                {Ti_Target.length>0?<Line dataKey="svid_value" data={series[1]['data']} name="Ti_Target" stroke="blue" key="Ti_Target" />:''}

                                {Ti_Shield.length>0?<ReferenceLine name="Ti Shield" y={parseInt(Ti_Shield[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Ti Shield (${parseInt(Ti_Shield[0]['consumption_limit'])})`}  />:''}
                                {Ti_Shield.length>0?<Line dataKey="svid_value" data={series[0]['data']} name="Ti_Shield" stroke="pink" key="Ti_Shield" />:''}

                                {Cu_Target.length>0?<ReferenceLine name="Cu Target" y={parseInt(Cu_Target[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Cu Target (${parseInt(Cu_Target[0]['consumption_limit'])})`}  />:''}
                                {Cu_Target.length>0?<Line dataKey="svid_value" data={series[3]['data']} name="Cu_Target" stroke="orange" key="Cu_Target" />:''}

                                {Cu_Shield.length>0?<ReferenceLine name="Cu Shield" y={parseInt(Cu_Shield[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Cu Shield (${parseInt(Cu_Shield[0]['consumption_limit'])})`}  />:''}
                                {Cu_Shield.length>0?<Line dataKey="svid_value" data={series[2]['data']} name="Cu_Shield" stroke="yellow" key="Cu_Shield" />:''}

                                {Etch_Shield.length>0?<ReferenceLine name="Etch_Shield" y={parseInt(Etch_Shield[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Etch_Shield (${parseInt(Etch_Shield[0]['consumption_limit'])})`}  />:''}
                                {Etch_Shield.length>0?<Line dataKey="svid_value" data={series[4]['data']} name="Etch_Shield" stroke="green" key="Etch_Shield" />:''}
                               
                                {Etch_Quartz.length>0?<ReferenceLine name="Etch_Quartz" y={parseInt(Etch_Quartz[0]['consumption_limit'])} stroke="red" ifOverflow="extendDomain" label={`Etch_Quartz (${parseInt(Etch_Quartz[0]['consumption_limit'])})`}  />:''}
                                {Etch_Quartz.length>0?<Line dataKey="svid_value" data={series[5]['data']} name="Etch_Quartz" stroke="grey" key="Etch_Quartz" />:''}

                            </LineChart>
                        </div>
                        <div className="column">
                            <TriggerTPM eqp_id={eqp_id}></TriggerTPM>
                        </div>
                    </div>

                </div>
            )
        } else if (eqp_id.match(/CP/g)) {
            const Cerma_Halogen_Lamp_Hrs = data.filter(row => row.svid_name === 'Cerma_Halogen_Lamp_Hrs')
            return (
                <div>
                <div className="columns">
                <div>
                </div>
                    <div className="column is-narrow">
                        <h1 className="is-capitalize has-text-weight-bold">{eqp_id}</h1>
                    </div>
                    <div className="column">
                        <ChangeEqpStatus eqp_id={eqp_id} ></ChangeEqpStatus>
                    </div>
                </div>
                <div className="columns">
       
       
                    <div className="column">

                    </div>
                    <div className="column">
                        <TriggerTPM eqp_id={eqp_id}></TriggerTPM>
                    </div>
                </div>

            </div>
            )
        }else if (eqp_id.match(/UE/g)){
            const datasource =data.map(item=>{
                return {
                    ...item,
                    label:item.svid_name.split('(',)[0]
                    // svid_name: item.svid_name.substr(0,svid_name.length-5)  // replace the email addr

                }
            }
            )

            const HG = datasource.filter(row => row.svid_name.split(/[()]/)[1]==="HG")
            const IHG = datasource.filter(row => row.svid_name.split(/[()]/)[1]==="IHG")

            
            const series = [{name: 'HG', data:HG},
            {name: 'IHG', data:IHG},

            ]
            return (

                    <div className="column">
                        <div className="columns is-narrow">

                            <div className="column">
                                <h1 className="is-capitalize has-text-weight-bold">{eqp_id}</h1>
                            </div>
                            <ResponsiveContainer width={600} height="80%">

                            <div className="column">
                                <LineChart
                                    width={scale * 200}
                                    height={scale * 100}
                                    data={data}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="label" tick={false} type="category" allowDuplicatedCategory={false} />
                                    <YAxis interval="preserveStartEnd" />
                                    <Tooltip />
                                    <ReferenceLine name="Warning" y={2.5} stroke="orange" ifOverflow="extendDomain" label={`Ghost Check Max 2.5)`} />

                                    {IHG.length>0?<Line dataKey="svid_value" data={series[1]['data']} name="IHG" stroke="blue" key="IHG" >
                                        {/* <LabelList dataKey="label" position="insideTop" angle="45"  /> */}

                                    </Line>
                                    :''}
                                    {HG.length>0?<Line dataKey="svid_value" data={series[0]['data']} name="HG" stroke="yellow" key="HG" />:''}

                                </LineChart>

                            </div>
                            </ResponsiveContainer>

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



