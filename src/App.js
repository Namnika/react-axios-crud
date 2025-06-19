import React, { use, useEffect, useState } from 'react';
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
  const [inputValue, setInputValue] = useState('')
  const [isEditingInput, setEditingInput] = useState(false);


  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateUser(editingId, form);
      setEditingId(null)
    } else {
      await createUser(form)
    }
    setForm({ name: '', email: '' })

    fetchUsers();
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEditClick = (id) => {
    setEditingId(id)
    setEditingInput(true)
    

  }

  const handleDelete = async (id) => {
    await deleteUser(id)
    fetchUsers();
  }


  return (

    <div className="App">
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} >
        <input name='name' value={form.name} onChange={handleChange} placeholder='Enter your name' required />
        <input name='email' value={form.email} onChange={handleChange} placeholder='Enter your email' required />
        <button type='submit'>Add User </button>
        <ul>
          {users.map((user, index) => {
            return <li key={user.id}>
              {isEditingInput && editingId === user.id ?
                <>
                  <input name='name' value={user.name} onChange={handleChange} />
                  <input name='email' value={form.email} onChange={(e) => setInputValue(e.target.value)} />
                  <button onClick={handleSubmit}>Save</button>
                </> :

                <span>{user.name} ({user.email})</span>
              }
              <button onClick={() => handleEditClick(user.id)}>Edit</button>
              <button onClick={() => handleDelete(user.id)} >Delete</button>
            </li>

          })}
        </ul>
      </form>
    </div>
  );
}

export default App;
