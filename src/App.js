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

    <div className="App ">
      <h2 className='text-2xl font-semibold tracking-wider uppercase underline'>User Management</h2>
      <form onSubmit={handleSubmit} >
        <div className='grid gap-6 mb-6 md:grid-cols-3'>
          <input name='name' value={form.name} onChange={handleChange} className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter your name' required />
          <input name='email' value={form.email} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Enter your email' required />

          <button type='submit' style={{ padding: '3px 20px' }} className='font-semibold uppercase border-1 hover:bg-slate-600  cursor-pointer rounded bg-slate-700 text-white border-slate-700'>Add User </button>
        </div>

        <table className='border-separate rounded '>
          <tr className='shadow-lg'>
            <th className='border-r rounded border-gray-300 dark:border-gray-600'>ID</th>
            <th className='border-r rounded border-gray-300 dark:border-gray-700'>NAME</th>
            <th className='border-r rounded border-gray-300 dark:border-gray-700'>EMAIL</th>
            <th className='border-r rounded border-gray-300 dark:border-gray-700'>EDIT</th>
          </tr>

          {users.map((user, index) => {
            return <tr className='shadow-lg bg-white hover:bg-gray-100/50 cursor-pointer odd:bg-gray-100' key={user.id}>
              <td className=' rounded-md '><strong>{user.id}</strong></td>

              <td className=' rounded-md '>{isEditingInput && editingId === user.id ?
                <> {/** creating handleSave to save form field */}
                  <input name='name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={editingForm.name} onChange={handleEditChange} />
                  <input name='email' value={editingForm.email} onChange={handleEditChange} />
                  <button onClick={(e) => handleSave(e, user)}>Save</button>
                </> :

                <span>{user.name} </span>}</td>
              <td className=' rounded-md '><span>({user.email})</span></td>
              <td><button style={{ padding: '3px 20px' }} className=' border-1 cursor-pointer rounded border-slate-700' onClick={() => handleEdit(user.id)}>Edit</button>&nbsp;
                <button style={{ padding: '3px 20px' }} className=' border-1 hover:bg-slate-600 cursor-pointer rounded bg-slate-700 text-white border-slate-700' onClick={() => handleDelete(user.id)} >Delete</button></td>
            </tr>
          })}
        </table>
      </form>
    </div>
  );
}

export default App;
