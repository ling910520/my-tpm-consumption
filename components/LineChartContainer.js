import "../styles/styles.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Label,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import moment from "moment";

const LinechartsContainer = ({data,lcl,ucl,usl,lsl,cl,chart}) => {
    const scale = 2.5



    const chartTitle = ()=>{
        if(chart =='x_offset'){
            return 'X-offset'
        }else if(chart =='y_offset'){
            return 'Y-offset'
        }else if(chart =='r_x_offset'){
            return 'R-X-offset'
        }else if(chart =='r_y_offset'){
            return 'R-Y-offset'
        }else if(chart =='Rotation'){
            return 'Rotation(Urad)'
        }else if(chart =='Magnification'){
            return 'Magnification(ppm)'
        }else if(chart =='xoffset_pts3'){
            return 'X-offset(based on point3 only)'
        }else if(chart =='yoffset_pts3'){
            return 'Y-offset(based on point3 only)'
        }
    }

  return (
<>

<h1 className="is-capitalize has-text-weight-bold">{chartTitle()}</h1>

        <ResponsiveContainer width={600} height="80%">
          <div className="column">
            <LineChart width={scale * 200} height={scale * 100} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              {/* <XAxis dataKey="LotID" /> */}

              <YAxis interval="preserveStartEnd" />
              <Tooltip />
              <Legend />

              <ReferenceLine
                name="Warning"
                y={usl}
                stroke="red"
                ifOverflow="extendDomain"
                label = "usl"
              />
            <ReferenceLine
                name="Warning"
                y={lsl}
                stroke="red"
                ifOverflow="extendDomain"
                label="lsl"
              />
                          <ReferenceLine
                name="Warning"
                y={ucl}
                stroke="yellow"
                ifOverflow="extendDomain"
                label="ucl"
              />
            <ReferenceLine
                name="Warning"
                y={lcl}
                stroke="yellow"
                ifOverflow="extendDomain"
                label="lcl"
              />
              <ReferenceLine
                name="Warning"
                y={cl}
                stroke="yellow"
                ifOverflow="extendDomain"
                label="cl"
                strokeDasharray="5 5" 
              />
            <Line dataKey={chart} name={chartTitle()} type="monotone" />

            </LineChart>
          </div>
        </ResponsiveContainer>
</>  );
};

export default LinechartsContainer;
