import Layout from '../components/Layout'
import Kanban from '../components/kanban'
import '../styles/styles.css'
import {returnedFromTool} from '../data/data'
import orderBy from "lodash/orderBy";
import fetch from 'isomorphic-unfetch';
import Linecharts from '../components/Linecharts'

const Home = (props) =>{
const dataFromTool = props.returnedFromTool
const distinctEqpId = [...new Set(props.returnedFromTool.map(row=>row.eqp_id))]
return(
    <Layout>
    <section className="container cards-container">
      <div className="columns is-centered is-multiline" id="sectioncontainer">
      {
        distinctEqpId.map((val,index)=>{
          const unsortedData = dataFromTool.filter(row =>row.eqp_id===val)
          return (
            <Linecharts unsortedData = {unsortedData} key={index}></Linecharts> 
          )
        })
      }
      </div>
    </section>
    </Layout>
)
}

Home.getInitialProps = async function() {
  const res = await fetch('http://sgpatsprod01:4001/getrawdata');
  const returnedFromTool = await res.json();
  return {
    returnedFromTool  };
}
export default Home;



