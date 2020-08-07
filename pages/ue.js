import Layout from "../components/Layout";
import "../styles/styles.css";
import fetch from "isomorphic-unfetch";
import Linecharts from "../components/Linecharts";
import {useState,useEffect} from 'react'
const ue = ({returnedFromTool}) => {

    const distinctEqpId = [
      ...new Set(
        returnedFromTool.map((row) => {
          return row.eqp_id;
  
        })
      ),
    ];

  



  return (
    <Layout>
      <section className="container cards-container">
        <div className="columns is-centered is-multiline" id="sectioncontainer">
        {
        distinctEqpId.map((val,index)=>{
          const unsortedData = returnedFromTool.filter(row =>row.eqp_id===val)
          if(val.substr(0,2)==='UE'){
        return (
            <Linecharts unsortedData = {unsortedData} key={index}></Linecharts> 
          )
          }
  
        })
      }

        </div>
      </section>
    </Layout>
  );
};

ue.getInitialProps = async function () {
  const res = await fetch("http://sgpatsprod01:4001/getrawdata");
  const returnedFromTool = await res.json();
  return {
    returnedFromTool,
  };
};
export default ue;
