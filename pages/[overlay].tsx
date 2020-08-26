import Layout from "../components/Layout";
import "../styles/styles.css";
import fetch from "isomorphic-unfetch";
import Linecharts from "../components/Linecharts";
import { GetServerSideProps } from "next";
import * as uuid from "uuid";
import { string } from "prop-types";
import LinechartsContainer from "../components/LineChartContainer";
import {useState, useEffect, SyntheticEvent, useRef} from 'react'
export interface Data{
  rpt_date: string,
  shift: string,
  LotID: string,
  CR: string,
  Process_Tool: string,
  Combo_Tool: string,
  x_offset:string,
  y_offset:string,
  r_x_offset:string,
  r_y_offset:string,
  Rotation:string,
  Magnification: string,
  xoffset_pts3:string,
  yoffset_pts3:string,
  tab:string

}

export interface Props {
  data: Data[];
}
const overlay = ({ data }: Props ) => {
  const limit =[
    {tab:'cavity',chart:'x_offset',usl:5,lsl:-5,cl:0.4,ucl:2.5,lcl:-2.5},
    {tab:'cavity',chart:'y_offset',usl:5,lsl:-5,cl:0.4,ucl:2.5,lcl:-2.5},
    {tab:'cavity',chart:'r_x-offset',usl:10,ucl:6.3,lcl:0},
    {tab:'cavity',chart:'r_y-offset',usl:10,ucl:6.3,lcl:0},
    {tab:'cavity',chart:'Rotation',usl:41,ucl:26,lcl:0},
    {tab:'cavity',chart:'Magnification',usl:67,ucl:42,lcl:0},
    {tab:'cavity',chart:'xoffset_pts3',usl:5,lsl:-5,cl:0.4,ucl:2.5,lcl:-2.5},
    {tab:'cavity',chart:'yoffset_pts3',usl:5,lsl:-5,cl:0.4,ucl:2.5,lcl:-2.5},

    {tab:'buffer',chart:'x_offset',usl:5,lsl:-5,cl:0.4,ucl:2.5,lcl:-2.5},
    {tab:'buffer',chart:'y_offset',usl:5,lsl:-5,cl:0.4,ucl:2.5,lcl:-2.5},
    {tab:'buffer',chart:'r_x-offset',usl:10,ucl:4.6,lcl:0},
    {tab:'buffer',chart:'r_y-offset',usl:10,ucl:4.6,lcl:0},
    {tab:'buffer',chart:'Rotation',usl:41,ucl:28,lcl:0},
    {tab:'buffer',chart:'Magnification',usl:67,ucl:39,lcl:0},
    {tab:'buffer',chart:'xoffset_pts3',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},
    {tab:'buffer',chart:'yoffset_pts3',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},

    {tab:'plate',chart:'x_offset',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},
    {tab:'plate',chart:'y_offset',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},
    {tab:'plate',chart:'r_x-offset',usl:10,ucl:6.3,lcl:0},
    {tab:'plate',chart:'r_y-offset',usl:10,ucl:6.3,lcl:0},
    {tab:'plate',chart:'Rotation',usl:41,ucl:30,lcl:0},
    {tab:'plate',chart:'Magnification',usl:65,ucl:55,lcl:0},
    {tab:'plate',chart:'xoffset_pts3',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},
    {tab:'plate',chart:'yoffset_pts3',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},

    {tab:'roof',chart:'x_offset',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},
    {tab:'roof',chart:'y_offset',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},
    {tab:'roof',chart:'r_x-offset',usl:10,ucl:8,lcl:0},
    {tab:'roof',chart:'r_y-offset',usl:10,ucl:8,lcl:0},
    {tab:'roof',chart:'Rotation',usl:41,ucl:31,lcl:0},
    {tab:'roof',chart:'Magnification',usl:41,ucl:31,lcl:0},
    {tab:'roof',chart:'xoffset_pts3',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},
    {tab:'roof',chart:'yoffset_pts3',usl:5,lsl:-5,cl:-0.4,ucl:2.5,lcl:-2.5},

  ]
  const x_offset_chart = limit.filter(x=> x.tab===data[0].tab && x.chart ==='x_offset')[0]
  const y_offset_chart = limit.filter(x=> x.tab===data[0].tab && x.chart ==='y_offset')[0]
  const r_x_offset_chart = limit.filter(x=> x.tab===data[0].tab && x.chart ==='r_x-offset')[0]
  const r_y_offset_chart = limit.filter(x=> x.tab===data[0].tab && x.chart ==='r_y-offset')[0]
  const Rotation_chart = limit.filter(x=> x.tab===data[0].tab && x.chart ==='Rotation')[0]
  const Magnification_chart = limit.filter(x=> x.tab===data[0].tab && x.chart ==='Magnification')[0]
  const xoffset_pts3_chart = limit.filter(x=> x.tab===data[0].tab && x.chart ==='xoffset_pts3')[0]
  const yoffset_pts3_chart = limit.filter(x=> x.tab===data[0].tab && x.chart ==='yoffset_pts3')[0]  


  const [filterdata,setFilteredData] = useState(data);

  const [distinctEqpId,setdistinctEqpId] = useState([...new Set(data.map(x=>x.Process_Tool))]);
  const [distinctComboEqpId,setdistinctComboEqpId] = useState([...new Set(data.map(x=>x.Combo_Tool))]);
  const [distinctCR,setdistinctCR] = useState([...new Set(data.map(x=>x.CR))]);

  const [selectedcr,setSelectedcr]= useState('Select CR')
  const [selectedprocesstool,setselectedprocesstool] = useState('Select Process')
  const [selectedcombotool,setselectedcombotool]= useState('Select Combo')



  const handleSelectionChange = (e:SyntheticEvent):void =>{
    e.preventDefault()
    const { value, id} = e.target as HTMLInputElement
    if (id ==='cr'){
      setSelectedcr(value)
    } else if (id==='process'){
      setselectedprocesstool(value)
    } else if(id==='combo') {
      setselectedcombotool(value)
    } else {
    }
  }

  useEffect(() => {

  const c1 = (cr:string,select:string)=>{
    if(selectedcr === 'Select CR') {
      return true
    } else{
      return cr ===select
    }
  }
  const c2 = (Process_Tool:string,select:string)=>{
    if(selectedprocesstool === 'Select Process') {
      return true
    } else{
      return Process_Tool ===select
    }
  }
  const c3 = (Combo_Tool:string,select:string)=>{
    if(selectedcombotool === 'Select Combo') {
      return true
    } else{
      return Combo_Tool ===select
    }
  }

  setFilteredData(data.filter(x => c1(x.CR,selectedcr) && c2(x.Process_Tool,selectedprocesstool) && c3(x.Combo_Tool,selectedcombotool)))

  }, [selectedcr,selectedprocesstool,selectedcombotool])

  useEffect(() => {
    setdistinctCR([...new Set(filterdata.map(x=>x.CR))])
    setdistinctEqpId([...new Set(filterdata.map(x=>x.Process_Tool))])
    setdistinctComboEqpId([...new Set(filterdata.map(x=>x.Combo_Tool))])

  }, [filterdata])

  const clearfilter = ()=>{
    setdistinctCR([...new Set(data.map(x=>x.CR))])
    setdistinctEqpId([...new Set(data.map(x=>x.Process_Tool))])
    setdistinctComboEqpId([...new Set(data.map(x=>x.Combo_Tool))])

    setSelectedcr('Select CR')
    setselectedprocesstool('Select Process')
    setselectedcombotool('Select Combo')


    
  }

  return (
    <Layout>
      <div>
        <h1 className="title has-text-centered is-capitalized">{data[0].tab}</h1> </div>  
        <div className="columns mx-2 my-4">
            <div className="column is-narrow">
            <div className="select is-info  is-rounded">
                          <select onChange={handleSelectionChange} value = {selectedcr} id="cr">
                          <option value="Select CR">Select CR </option>
                          {
                          distinctCR.sort().map((item,key)=>(
                          <option value={item} key={key}>{item}</option>
                          ))
                          }
                          </select>     
            </div>
            </div>
            <div className="column is-narrow">
            <div className="select is-info  is-rounded">
                          <select onChange={handleSelectionChange} value = {selectedprocesstool} id="process">
                          <option value="Select Process">Select Process Tool </option>
                          {
                          distinctEqpId.sort().map((item,key)=>(
                          <option value={item} key={key}>{item}</option>
                          ))
                          }
                          </select>     
            </div>
            </div>
            <div className="column is-narrow">
            <div className="select is-info  is-rounded">
                          <select  onChange={handleSelectionChange} value = {selectedcombotool} id="combo">
                          <option value="Select Combo">Select Combo Tool </option>
                          {
                          distinctComboEqpId.sort().map((item,key)=>(
                          <option value={item} key={key}>{item}</option>
                          ))
                          }
                          </select>     
            </div>
            </div>
            <div className="column is-narrow">
              <button className="button is-info is-rounded" onClick={clearfilter}>Clear filter</button>
            </div>
      </div>
      <div className="columns mx-2">

        <div className="column">
          <LinechartsContainer data={filterdata} chart = {"x_offset"} usl = {x_offset_chart.usl} lsl = {x_offset_chart.lsl} cl = {x_offset_chart.cl} ucl = {x_offset_chart.ucl} lcl ={x_offset_chart.lcl}></LinechartsContainer>
        </div>
        <div className="column">
          <LinechartsContainer data={filterdata} chart = {"y_offset"} usl = {y_offset_chart.usl} lsl = {y_offset_chart.lsl} cl = {y_offset_chart.cl} ucl = {y_offset_chart.ucl} lcl ={y_offset_chart.lcl}></LinechartsContainer>
        </div>

      </div>

      <div className="columns mx-2">
        <div className="column">
            <LinechartsContainer data={filterdata} chart = {"r_x_offset"} usl = {r_x_offset_chart.usl} lsl = {false} cl ={false} ucl = {r_x_offset_chart.ucl} lcl ={r_x_offset_chart.lcl}></LinechartsContainer>
          </div>
        <div className="column">
          <LinechartsContainer data={filterdata} chart = {"r_y_offset"} usl = {r_y_offset_chart.usl}  lsl = {false} cl ={false} ucl = {r_y_offset_chart.ucl} lcl ={r_y_offset_chart.lcl}></LinechartsContainer>
        </div>

      </div>

      <div className="columns mx-2">
        <div className="column">
            <LinechartsContainer data={filterdata} chart = {"Rotation"} usl = {Rotation_chart.usl}  lsl = {false} cl ={false}  ucl = {Rotation_chart.ucl} lcl ={Rotation_chart.lcl}></LinechartsContainer>
          </div>
        <div className="column">
          <LinechartsContainer data={filterdata} chart = {"Magnification"}  usl = {Magnification_chart.usl}   lsl = {false} cl ={false} ucl = {Magnification_chart.ucl} lcl ={Magnification_chart.lcl}></LinechartsContainer>
        </div>

      </div>


      <div className="columns mx-2">
        <div className="column">
          <LinechartsContainer data={filterdata} chart = {"xoffset_pts3"} usl = {xoffset_pts3_chart.usl} lsl = {xoffset_pts3_chart.lsl} cl = {xoffset_pts3_chart.cl} ucl = {xoffset_pts3_chart.ucl} lcl ={xoffset_pts3_chart.lcl}></LinechartsContainer>
        </div>
        <div className="column">
          <LinechartsContainer data={filterdata} chart = {"yoffset_pts3"} usl = {yoffset_pts3_chart.usl} lsl = {yoffset_pts3_chart.lsl} cl = {yoffset_pts3_chart.cl} ucl = {yoffset_pts3_chart.ucl} lcl ={yoffset_pts3_chart.lcl}></LinechartsContainer>
        </div>

      </div>



    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx
) => {
  const query = ctx.query.overlay
  const sql = require('mssql')
  const config = {
    user: 'ATSBus_user',
    password: 'LCGX4Ky#WHdWW%l6zmh*',
    server: 'db-SGPATSBusPROD01', // You can use 'localhost\\instance' to connect to named instance
    database: 'ATSBusSkyworksTools',
    options:{
      enableArithAbort:true,
    }
}
  const SQL = `select 
  CONVERT(varchar, [Date], 1) as rpt_date
,shift
,LotID
,[CR]
,UPPER([Process Tool]) as Process_Tool
,case when UPPER([Combo Tool]) is null then 'cavity' else UPPER([Combo Tool]) END AS [Combo_Tool]
,[x-offset] as x_offset
,[y-offset] as y_offset
,[r-x-offset] as r_x_offset
,[r-y-offset] as r_y_offset
,[Rotation(urad)] as Rotation
,[Magnification(ppm)] as Magnification
,[xoffset (Point3)] as xoffset_pts3
,[yoffset (Point3)] as yoffset_pts3
,[tab]
from [ATSBusSkyworksTools].[dbo].[UE_OVERLAY] where [tab] ='${query}' `
  const cnn =  await sql.connect(config)
  const returned = await cnn.query(SQL).then((res: { recordset: any; })=>res.recordset)

  await cnn.close()

  // sql.on('error', (err: any) => {
  //     // ... error handler
  // })
  return { props: { data: returned} };
};
export default overlay;
