import Layout from '../components/Layout'
import CardComponent from '../components/Cardcomponent'
const Home = () =>{
const data = [{"reporting_date":"2019-11-10",'eqp_id':'3SPT-20',"cathode_name":"Cathode 3 Metal LifeTime (Kwh)","Consumption":248.964495},  
{"reporting_date":"2019-11-11",'eqp_id':'3SPT-20',"cathode_name":"Cathode 1 Metal LifeTime (Kwh)","Consumption (Kwh)":113.734076},  
{"reporting_date":"2019-11-11",'eqp_id':'3DE-02',"RF_HRS":"Stat3_Etch_MV_PlatenRFHours","PlatenRFHours":94.50147247}]

return(
    <Layout>
    {
         data.map((val,index)=>{
            return(
                <CardComponent data={val}/>
            )
        })
    }



        
    </Layout>
)
}


export default Home;