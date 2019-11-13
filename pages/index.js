import Layout from '../components/Layout'
import Kanban from '../components/kanban'
import '../styles/styles.css'
import {returnedFromTool} from '../data/data'
import orderBy from "lodash/orderBy";

const Home = () =>{

const dataFromTool = [
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-20',"cathode1":113.734076,"cathode3":248.964495,limit:100},  
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-21',"cathode1":113.734076,"cathode3":248.964495,limit:100},  
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-22',"cathode1":113.734076,"cathode3":248.964495,limit:100},  
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-23',"cathode1":113.734076,"cathode3":248.964495,limit:100},  
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-24',"cathode1":113.734076,"cathode3":248.964495,limit:100},  
{"reporting_date":"2019-11-11",'eqp_id':'3DE-03',"RF_HRS":"Stat3_Etch_MV_PlatenRFHours","PlatenRFHours":94.50147247,limit:100},
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-25',"cathode1":113.734076,"cathode3":248.964495,limit:100},  
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-26',"cathode1":113.734076,"cathode3":248.964495,limit:100},  
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-27',"cathode1":113.734076,"cathode3":248.964495,limit:100},  
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-28',"cathode1":113.734076,"cathode3":248.964495,limit:100},  

{"reporting_date":"2019-11-11",'eqp_id':'3DE-02',"RF_HRS":"Stat3_Etch_MV_PlatenRFHours","PlatenRFHours":94.50147247,limit:100}]
let datas = orderBy(dataFromTool,['reporting_date','eqp_id']) //order desc by reporting date

// let reporting_date = Object.values(data)[0] // take only latest reporting_date
//  let latestdate =  new Date()

// const {RF_HRS, PlatenRFHours,eqp_id,cathode1,cathode3,reporting_date} = data


return(
    <Layout>
    <section className="container cards-container">
      <div className="columns is-centered is-multiline" id="sectioncontainer">
        {
            datas.map((val,index)=>{
            return(
                <Kanban data={val} key={index}/>
            )
        })
        }
      </div>
    </section>
    </Layout>
)
}


export default Home;



