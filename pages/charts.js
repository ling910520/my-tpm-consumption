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
    const data = [
        {
          name: 'Page A', uv: 4000, pv: 2400, amt: 2400,limit:3000
        },
        {
          name: 'Page B', uv: 3000, pv: 1398, amt: 2210,limit:3000
        },
        {
          name: 'Page C', uv: 2000, pv: 9800, amt: 2290,limit:3000
        },
        {
          name: 'Page D', uv: 2780, pv: 3908, amt: 2000,limit:3000
        },
        {
          name: 'Page E', uv: 1890, pv: 4800, amt: 2181,limit:3000
        },
        {
          name: 'Page F', uv: 2390, pv: 3800, amt: 2500,limit:3000
        },
        {
          name: 'Page G', uv: 3490, pv: 4300, amt: 2100,limit:3000
        },
      ];



    return (
        <Layout>
            <section className="section">
            <div>
            <LineChart
                    width={2*200}
                    height={2*100}
                    data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval="preserveStartEnd" />
                    <YAxis interval="preserveEnd" />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    <ReferenceLine y={3000} label="Max(3000)" stroke="red" />

                </LineChart>
            </div>

            </section>
        </Layout>
    )
}


export default charts;



