import Layout from '../components/Layout'

import fetch from 'isomorphic-unfetch';

const success = () =>{

    async function buttonClick() {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=batman`);
        const json = await response.json();
        console.log(response.status)
        console.log(json)

      }
    const alertme = event=>{
        event.preventDefault()
        alert('alertme')
        alert(`${window.location.host}`)
    }
  
return(
    <Layout>
           <button onClick={buttonClick}>Click</button>
           <button onClick={alertme}>alert</button>

    </Layout>
)
}


export default success;



