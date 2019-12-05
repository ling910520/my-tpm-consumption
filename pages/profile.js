import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import Layout from '../components/Layout'
import UserContext from '../components/UserContext';
import { useContext } from 'react';


const Profile = props =>{
  const { user } = useContext(UserContext);

  return(
    <Layout>
          <h1>hello profile {user}</h1>

    </Layout>
  )
}

// Profile.getInitialProps = async ctx =>{



//   const options =  {
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json'
//       // Authorization: JSON.stringify({ token })
//     }
//   };
  
//   const apiUrl='http://sgpfaapps01:3004/'
//   // const apiUrl = process.browser
//   //   ? `http://${window.location.host}:3003/api`
//   //   : `http://sgpfaapps01:3003/api`

//     const response = await fetch(apiUrl, options)
//     const resstatus = await response.status;

//     if (response.ok) {
//       const returnedData =  await response.json()
    
//       console.log(returnedData)

//     } else if (resstatus===401) {
//       const options_1 =  {
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': ctx.req.headers.Authorization
//         }
//       };
//       const response_1 = await fetch(apiUrl,options_1)
//       const auth_headers_1 = await response_1.headers
//       const resstatus_1 = await response_1.status;




//       console.log( auth_headers_1)
//       console.log(`resend 1times `+ resstatus_1)
//     }

//   const data ='Success'
//   return(
//     data
//   )
// }

// Profile.getInitialProps = async ctx => {
//   // We use `nextCookie` to get the cookie and pass the token to the
//   // frontend in the `props`.
//   const { token } = nextCookie(ctx)
//   const apiUrl='http://sgpfaapps01:3003/api'
//   // const apiUrl = process.browser
//   //   ? `${protocol}://${window.location.host}:3003`
//   //   : `${protocol}://${ctx.req.headers.host}:3003`

//     const response = await fetch(apiUrl, {
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json'
//         // Authorization: JSON.stringify({ token })
//       }
//     })


//     if (response.ok) {
//       console.log(response.json())

//     } else {
      
//       console.log(response)
// }
// }
export default Profile
