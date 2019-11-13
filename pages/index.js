import Layout from '../components/Layout'
import Kanban from '../components/kanban'
import '../styles/styles.css'

const Home = () =>{
const data = [
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-20',"cathode1":113.734076,"cathode3":248.964495},  
{"reporting_date":"2019-11-11",'eqp_id':'3DE-02',"RF_HRS":"Stat3_Etch_MV_PlatenRFHours","PlatenRFHours":94.50147247},
{"reporting_date":"2019-11-11",'eqp_id':'3DE-03',"RF_HRS":"Stat3_Etch_MV_PlatenRFHours","PlatenRFHours":94.50147247}]

// let reporting_date = Object.values(data)[0] // take only latest reporting_date
//  let latestdate =  new Date()

// const {RF_HRS, PlatenRFHours,eqp_id,cathode1,cathode3,reporting_date} = data


return(
    <Layout>
    <section className="container cards-container">
      <div className="columns is-centered is-multiline" id="sectioncontainer">
        {
            data.map((val,index)=>{
            return(
                <Kanban data={val}/>
            )
        })
        }
      </div>
    </section>
    </Layout>
)
}


export default Home;



