import Layout from "../components/Layout";
import "../styles/styles.css";
import fetch from "isomorphic-unfetch";
import Linecharts from "../components/Linecharts";
const ue = ({returnedFromTool}) => {

    // const {returnedFromTool} = useSWR("http://sgpatsprod01:4001/getrawdata",(url) => axios(url).then(res=>res.data),{initialData:returned})
    const distinctEqpId = [
      ...new Set(
        returnedFromTool?.map((row) => {
          return row.eqp_id;
  
        })
      ),
    ];

  



  return (
    <Layout>
      <section className="container cards-container">
        <div className="columns is-centered is-multiline" id="sectioncontainer">
        {
        distinctEqpId?.map((val,index)=>{
          const unsortedData = returnedFromTool?.filter(row =>row.eqp_id===val)
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

export async function getStaticProps(){
  const res = await fetch("http://sgpatsprod01:4001/getrawdata");
  const returnedFromTool = await res.json();
  return {
    props:{
      returnedFromTool
    },
    revalidate:1,
  };
};
export default ue;
