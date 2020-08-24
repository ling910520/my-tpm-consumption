import Layout from "../components/Layout";
import "../styles/styles.css";
import fetch from "isomorphic-unfetch";
import Linecharts from "../components/Linecharts";
import { GetServerSideProps } from "next";
import * as uuid from "uuid";
import { string } from "prop-types";
import LinechartsContainer from "../components/LineChartContainer";
import RangechartContainer from "../components/RangechartContainer";
import {useState, useEffect} from 'react'
export interface Data{

  shift: string,
  LotID: string,
  CR: string,
  Eqp: string,
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

  // const [distinctEqpId,setdistinctEqpId] = useState([...new Set(data.map(x=>x.Eqp))]);
  const [distinctEqpId,setdistinctEqpId] = useState([...new Set(data.map(x=>x.Eqp))]);

  const [CR,setCR] = useState([...new Set(data.map(x=>x.CR))]);

    // function for handle user change filter parameter
    const handleEqpInputChange = event => {
      event.preventDefault()
      const { value } = event.target
      if(value ==='Select Eqp'){
        setFilteredData([...data])
      }else{
        setFilteredData(data.filter(x =>x.Eqp===value))
      }
    }
    const handleCRInputChange = event => {
      event.preventDefault()
      const { value } = event.target
      if(value ==='Select CR'){
        setFilteredData([...data])

      }else{
        setFilteredData(data.filter(x =>x.CR===value))
        const reset = data.filter(x =>x.CR===value)
        setdistinctEqpId([...new Set(reset.map(x=>x.Eqp))])

      }
    }

    
  return (
    <Layout>
      <div>
        <h1 className="title has-text-centered is-capitalized">{data[0].tab}</h1>
        <div className="columns mx-2">
            <div className="column is-narrow">
            <div className="select is-info">
                          <select onChange={handleCRInputChange}>
                          <option value="Select CR">Select CR </option>
                          {
                          CR.sort().map((item,key)=>(
                          <option value={item} key={key}>{item}</option>
                          ))
                          }
                          </select>     
            </div>
            </div>
            <div className="column">
            <div className="select is-info">
                          <select onChange={handleEqpInputChange}>
                          <option value="Select Eqp">Select Eqp </option>
                          {
                          distinctEqpId.sort().map((item,key)=>(
                          <option value={item} key={key}>{item}</option>
                          ))
                          }
                          </select>     
            </div>
            </div>

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
            <RangechartContainer data={filterdata} chart = {"r_x_offset"} usl = {r_x_offset_chart.usl}  ucl = {r_x_offset_chart.ucl} lcl ={r_x_offset_chart.lcl}></RangechartContainer>
          </div>
        <div className="column">
          <RangechartContainer data={filterdata} chart = {"r_y_offset"} usl = {r_y_offset_chart.usl} ucl = {r_y_offset_chart.ucl} lcl ={r_y_offset_chart.lcl}></RangechartContainer>
        </div>

      </div>

      <div className="columns mx-2">
        <div className="column">
            <RangechartContainer data={filterdata} chart = {"Rotation"} usl = {Rotation_chart.usl}  ucl = {Rotation_chart.ucl} lcl ={Rotation_chart.lcl}></RangechartContainer>
          </div>
        <div className="column">
          <RangechartContainer data={filterdata} chart = {"Magnification"}  usl = {Magnification_chart.usl}  ucl = {Magnification_chart.ucl} lcl ={Magnification_chart.lcl}></RangechartContainer>
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
shift
,LotID
,[CR]
,UPPER([Eqp]) as Eqp
,[x-offset] as x_offset
,[y-offset] as y_offset
,[r-x-offset] as r_x_offset
,[r-y-offset] as r_y_offset
,[Rotation(urad)] as Rotation
,[Magnification(ppm)] as Magnification
,[xoffset (Point3)] as xoffset_pts3
,[yoffset (Point3)] as yoffset_pts3
,[tab]
  from [ATSBusSkyworksTools].[dbo].[UE_OVERLAY] where [tab] ='${query}'`
  const cnn =  await sql.connect(config)
  const returned = await cnn.query(SQL).then((res: { recordset: any; })=>res.recordset)

  await cnn.close()

  // sql.on('error', (err: any) => {
  //     // ... error handler
  // })
  return { props: { data: returned} };
};
export default overlay;
