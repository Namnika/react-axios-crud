import React, { useEffect, useState } from 'react';
import {
  getUsers, createUser, updateUser, deleteUser
} from "./services/api"

import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: ''
  })
  const [editingId, setEditingId] = useState(null);
  const [isEditingInput, setEditingInput] = useState(false);
  const [editingForm, setEditingForm] = useState({
    name: '',
    email: ''
  })



  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form)

    setForm({ name: '', email: '' })
    fetchUsers();
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEdit = (id) => {
    setEditingId(id)
    setEditingInput(true)

  }

  const handleDelete = async (id) => {
    await deleteUser(id)
    fetchUsers();
  }

  // editing field
  const handleEditChange = (e) => {
    setEditingForm({ ...editingForm, [e.target.name]: e.target.value })
  }

  const handleSave = async (e, u) => {
    e.preventDefault();
    console.log(editingId)
    await updateUser(u.id, editingForm)
    setEditingId(null);
    setEditingInput(false)
    setEditingForm({ name: u.name, email: u.email })
    fetchUsers();

  }

  return (

    <div className="App">
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} >
        <input name='name' value={form.name} onChange={handleChange} placeholder='Enter your name' required />
        <input name='email' value={form.email} onChange={handleChange} placeholder='Enter your email' required />
        <button type='submit'>Add User </button>


        <table>
          <tr >
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>EDIT</th>
          </tr>

          {users.map((user, index) => {
            return <tr key={user.id}>
              <td><strong>{user.id}</strong></td>

              <td>{isEditingInput && editingId === user.id ?
                <> {/** creating handleSave to save form field */}
                  <input name='name' value={editingForm.name} onChange={handleEditChange} />
                  <input name='email' value={editingForm.email} onChange={handleEditChange} />
                  <button onClick={(e) => handleSave(e, user)}>Save</button>
                </> :

                <span>{user.name} </span>}</td>
              <td><span>({user.email})</span></td>
              <button onClick={() => handleEdit(user.id)}>Edit</button>&nbsp;
              <button onClick={() => handleDelete(user.id)} >Delete</button>
            </tr>
          })}
        </table>
      </form>
    </div>
  );
}

export default App;
