import Layout from '../components/Layout'
import React, { useState,useEffect} from 'react'
const Table = () =>{
    const data = [
        { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com',address:"178,bukit pelandok,71960,pd,ns,msia" },
        { id: 2, name: 'Ali', age: 19, email: 'ali@email.com',address:"178,bukit pelandok,71960,pd,ns,msia" },
        { id: 3, name: 'Saad', age: 16, email: 'saad@email.com',address:"178,bukit pelandok,71960,pd,ns,msia"},
        { id: 4, name: 'Asad', age: 25, email: 'asad@email.com',address:"178,bukit pelandok,71960,pd,ns,msia"},
        { id: 5, name: 'Asad', age: 25, email: 'asad@email.com',address:"178,bukit pelandok,71960,pd,ns,msia"}
        ]
    const [users, setUsers] = useState(data)
    const renderTable = ()=>{
      return users.map((x,index)=>{
        return (
        <tr key={index}>
        <td>{x.name}</td>
        <td>{x.age}</td>
        <td>{x.email}</td>
        <td>
            <button className="button muted-button"
              onClick={() => {
                editRow(x.name)
              }}>Edit
              </button>
            <button className="button muted-button">Delete</button>
        </td>
        </tr>
        )
      })
    }
    const editRow = name =>{
      setUsers(users.map(user => (user.name === name ? Object.assign({}, user,{name:'wasifupdated'}) : user)))
    }

      // Similar to componentDidMount and componentDidUpdate:
      useEffect(() => {
        renderTable()
        console.log(users)
      },[users]);
  
return(
    <Layout>
  <table className='table bordered'>
    <thead>
      <tr>
        <th>Name</th>
        <th>age</th>
        <th>email</th>
      </tr>
    </thead>
    <tbody>
      {renderTable()}
    </tbody>
  </table>

    </Layout>
)
}


export default Table;