import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from '../components/Layout'


const Profile = props =>{
  return(
    <Layout>
          <h1>hello profile</h1>

    </Layout>
  )
}

Profile.getInitialProps = async ctx =>{
  const { token } = nextCookie(ctx)
  // const apiUrl = process.browser
  //   ? `http://${window.location.host}/api/profile.js`
  //   : `http://${ctx.req.headers.host}/api/profile.js`
  const apiUrl='http://localhost:3003/api'

  const options = {
    method: 'GET',
    credentials: 'include' // for client side requests
  };
  if (!process.browser) {
    options.headers = {'Content-Type': 'application/json' }; // for server side request

  }
  const response = await fetch(apiUrl,options)
  const auth = await response.headers.authorization
  console.log(auth)
  const resstatus = await response.status;

  if(resstatus===200){
    const returnedData =  await response.json()
    
    console.log(returnedData)
  }else{
    console.log('failed '+resstatus)
  }
  const data ='Success'
  return(
    data
  )
}

// Profile.getInitialProps = async ctx => {
//   // We use `nextCookie` to get the cookie and pass the token to the
//   // frontend in the `props`.
//   const { token } = nextCookie(ctx)
//   const apiUrl='http://localhost:3003/'
//   // const apiUrl = process.browser
//   //   ? `${protocol}://${window.location.host}:3003`
//   //   : `${protocol}://${ctx.req.headers.host}:3003`

//     const response = await fetch(apiUrl, {
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: JSON.stringify({ token })
//       }
//     })


//     if (response.ok) {
//       console.log(response.json())

//     } else {
      
//       console.log(response)
// }
// }
export default Profile
