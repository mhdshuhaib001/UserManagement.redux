import React, { useState, useEffect, useCallback } from "react";
import Modal from "./AddUserModal";
import EditUserModal from "./EditModal";
import {
  useGetUserDataMutation,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useLogoutMutation
} from "../../slices/adminApiSlice";
import useDebounce from "../admin/Hook/useDebounce";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getUsersData, { isLoading, isError }] = useGetUserDataMutation();
  const [addUserMutation] = useAddUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();
  const [editUserMutation] = useEditUserMutation();

  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: "", email: "" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUsersData({
          searchTerm: debouncedSearchTerm,
        });
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsers([]);
      }
    };

    fetchData();
  }, [getUsersData, debouncedSearchTerm]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleAddUserChange = useCallback((event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleAddUserSubmit = async (userData) => {
    try {
      await addUserMutation(userData);
      setNewUser({ name: "", email: "", password: "" });
      setIsModalOpen(false);
      setSearchTerm("");

      const { data } = await getUsersData({ searchTerm: debouncedSearchTerm });
      setUsers(data || []);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserMutation(userId);
      const { data } = await getUsersData({ searchTerm: debouncedSearchTerm });
      setUsers(data || []);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    if (userToEdit) {
      setEditUserId(userId);
      setEditedUser({ name: userToEdit.name, email: userToEdit.email });
      setIsEditModalOpen(true);
    }
  };

  const handleEditUserSubmit = async (updatedUser) => {
    try {
      await editUserMutation({ userId: editUserId, data: updatedUser });

      setEditUserId(null);
      setEditedUser({ name: "", email: "" });
      setIsEditModalOpen(false);
      setSearchTerm("");
      const { data } = await getUsersData({ searchTerm: debouncedSearchTerm });
      setUsers(data || []);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await useLogoutMutation();
    
      console.log("Logout successful");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <button
          className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-full text-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center py-4">
        <div className="max-w-screen-lg w-full p-4">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search users..."
              className="bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 rounded-full py-2 px-4 mr-2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded-full text-sm"
              onClick={() => setIsModalOpen(true)}
            >
              + Add User
            </button>
          </div>
          {isLoading ? null : isError ? (
            <p>Error fetching data</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 bg-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border border-gray-300 text-left">
                      Image
                    </th>
                    <th className="py-3 px-4 border border-gray-300 text-left">
                      Name
                    </th>
                    <th className="py-3 px-4 border border-gray-300 text-left">
                      Email
                    </th>
                    <th className="py-3 px-4 border border-gray-300 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-100">
                        <td className="py-3 px-4 border border-gray-300">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          {user.name}
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          {user.email}
                        </td>
                        <td className="py-3 px-4 border border-gray-300">
                          <button
                            className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded-full mr-2 text-sm"
                            onClick={() => handleEditUser(user._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded-full text-sm"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-3 px-4 text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditUserSubmit={handleEditUserSubmit}
        user={editedUser}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddUserSubmit}
      />
    </div>
  );
};

export default AdminDashboard;
