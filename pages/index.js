import Layout from '../components/Layout';
import Fetch from 'isomorphic-unfetch';
import Prices from '../components/Prices'
import About from './about'

import MyApp from './_app.js'
const Home = (props) =>(
 <Layout>
     <div>
         <h1>Welcome to bitprice</h1>
         <Prices bpi = {props.bpi}/> 
     </div>
 </Layout>
)

Home.getInitialProps = async function(){
    const res =  await fetch 
    ('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await res.json();
    return{
        bpi:data
    }
}
export default Home;