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

        {/* create table for users */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John</td>
              <td>john@gmail.com</td>
            </tr>
          </tbody>
        </table>

        <ul>
          {users.map((user, index) => {
            return <li key={user.id}>

              <strong>{user.id}</strong>&nbsp; &nbsp;

              {isEditingInput && editingId === user.id ?
                <> {/** creating handleSave to save form field */}
                  <input name='name' value={editingForm.name} onChange={handleEditChange} />
                  <input name='email' value={editingForm.email} onChange={handleEditChange} />
                  <button onClick={(e) => handleSave(e, user)}>Save</button>
                </> :

                <span>{user.name} ({user.email})</span>
              }&nbsp;
              <button onClick={() => handleEdit(user.id)}>Edit</button>
              <button onClick={() => handleDelete(user.id)} >Delete</button>
            </li>

          })}
        </ul>
      </form>
    </div>
  );
}

export default App;
