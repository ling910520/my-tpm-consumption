import Layout from '../components/Layout'
import Kanban from '../components/kanban'
import '../styles/styles.css'
import { returnedFromTool } from '../data/data'
import orderBy from "lodash/orderBy";
import fetch from 'isomorphic-unfetch';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ReferenceLine
  } from 'recharts';
  
const charts = (props) => {
    const datas = props.returnedFromTool
    const unsortedData = datas.filter(row =>row.eqp_id==='3DE-02')

    const  data = orderBy(unsortedData,['msg_id'])

    return (
        <Layout>
            <section className="section">
            <div>
            <div>3DE-02</div>
            <LineChart
                    width={2*200}
                    height={2*100}
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="inserted_timestamp" interval="Number" tick={false}/>
                    <YAxis interval="preserveStartEnd" />
                    <Tooltip />

                    <Legend />
                    <ReferenceLine y={110} label="Max(110)" stroke="red" alwaysShow="True"/>
                    <ReferenceLine y={99} label="Warning(99)" stroke="orange" alwaysShow="True"/>

                    <Line type="monotone" dataKey="svid_value" name  = "RF Hrs" stroke="#8884d8" activeDot={{ r: 8 }} />

                </LineChart>
            </div>

            </section>
        </Layout>
    )
}
charts.getInitialProps = async function() {
  const res = await fetch('http://sgpatsprod01:4001/getrawdata');
  const returnedFromTool = await res.json();

  return {
    returnedFromTool
  };
}

export default charts;



