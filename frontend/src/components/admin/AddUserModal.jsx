import React, { useState } from 'react';

const AddUserModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) =>{
    setPassword(event.target.value)
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, email , password});
    setName('');
    setEmail('');
    setPassword('');

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <h2 className="text-xl mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            className="bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 rounded-full py-2 px-4 mb-2 w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 rounded-full py-2 px-4 mb-2 w-full"
          />
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 rounded-full py-2 px-4 mb-2 w-full"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-sm mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
