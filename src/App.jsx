import React, { useState } from 'react'
import "./App.css"
import { v4 as uuid } from 'uuid';




const App = () => {
  const [users, setUsers] = useState([]);

  const [buttonState, setButtonState] = useState("add");

  const [userInfo, setUserInfo] = useState({
    id: uuid(),
    name: "",
    age: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    // console.log(e);

    const { name, value } = e.target;
    setUserInfo((currInfo) => {
      return {
        ...currInfo,
        [name]: value,
      };
    });
  };

  const addData = () => {
    setUsers((currUsers) => [...currUsers, userInfo]);
    setUserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
  };


  const deleteData = (id) => {
      setUsers((currUsers)=> {
        return currUsers.filter((user) => {
          return user.id !== id;
        });
      });
  };

  const updateData = () => {
    setUsers((currUsers) => {
      return currUsers.map((user) => {
        if(user.id === userInfo.id){
          return userInfo;
        }
        return user;
      });
    });
    cancelEditiong();
  }

  const startEditing = (user) =>{
    setUserInfo(user);
    setButtonState("edit");
  }

  const cancelEditiong = () =>{
    setUserInfo({
      id: uuid(),
      name: "",
      age: "",
      email: "",
      phone: "",
    });
    setButtonState("add");
  }
  
  return (
    <div className='container'>
      <div className="form">
        <input type="text" placeholder='name' name='name' value={userInfo.name} onChange={handleChange} /><br />
        <input type="number" placeholder='age' name='age' value={userInfo.age} onChange={handleChange} /><br />
        <input type="email" placeholder='email' name='email' value={userInfo.email} onChange={handleChange} /><br />
        <input type="number" placeholder='number' name='phone' value={userInfo.phone} onChange={handleChange} /><br />
        { buttonState === "add" ? (<button onClick={addData}>Add</button>): (<div className='buttonContainer'>
          <button onClick={updateData}>Update</button>
          <button onClick={cancelEditiong}>Cancel</button>
        </div>)}
      </div>
      <div className="dataTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              {
                users.map((user, index) => {
                  return <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button onClick={() => startEditing(user)}>Edit</button>
                      <button onClick={() => deleteData(user.id)}>Delete</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default App