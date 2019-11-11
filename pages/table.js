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
            <button className="button muted-button"
            onClick={()=>{
              deleteRow(x.id)
            }}
            >
            Delete</button>
        </td>
        </tr>
        )
      })
    }

    const editRow = name =>{
      setUsers(users.map(user => (user.name === name ? Object.assign({}, user,{name:'wasifupdated'}) : user)))
    }

    const deleteRow = id =>{
      setUsers(users.filter(user =>user.id!==id))
    }

      // Similar to componentDidMount and componentDidUpdate:
      useEffect(() => {
        renderTable()
        console.log(users)
      },[users]);

      const initialFormState = { id:null,name: '', age: null, email: '',address:null }
      const [user, setUser] = useState(initialFormState)
    
      const handleInputChange = event => {
        
      const { name, value } = event.target
      setUser({ ...user, [name]: value })
      }

      const addUser = user => {
        user.id = users.length + 1
        setUsers([...users, user])
      }
return(
    <Layout>

    <form
      onSubmit={event => {
        event.preventDefault()
        if (!user.name || !user.email) return

        addUser(user)
        setUser(initialFormState)
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>age</label>
      <input type="text" name="age" value={user.age} onChange={handleInputChange} />
      <label>email</label>
      <input type="text" name="email" value={user.email} onChange={handleInputChange} />
      <button>Add new user</button>
    </form>



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