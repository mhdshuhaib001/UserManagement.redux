import React, { useState, useEffect } from "react";

const EditUserModal = ({ isOpen, onClose, onEditUserSubmit, user }) => {
  const [editedUser, setEditedUser] = useState({ name: "", email: "" });

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = () => {
    onEditUserSubmit(editedUser);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"} fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50`}>
      <div className="modal-content bg-white w-1/2 mx-auto mt-20 p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md px-2 py-1 w-full mt-1"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md px-2 py-1 w-full mt-1"
          />
        </label>
        <div className="text-right">
          <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
            Save
          </button>
          <button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
