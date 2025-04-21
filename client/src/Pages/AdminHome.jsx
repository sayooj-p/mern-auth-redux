import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  
  useEffect(() => {
    const search = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/admin/delete/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          User Management
        </h2>

        {/* ✅ Search Bar */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search by username or email"
            className="p-2 border border-gray-300 rounded-lg w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-4 font-semibold border-b border-gray-300 py-2 bg-gray-100 rounded-t text-center">
          <div>No</div>
          <div>Username</div>
          <div>Email</div>
          <div>Actions</div>
        </div>

        {/* Table Data */}
        {filteredUsers.map((user, index) => (
          <div
            key={user._id}
            className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200 py-3 gap-2 md:gap-0 text-sm md:text-base"
          >
            <div className="md:text-center font-medium">{index + 1}</div>
            <div className="md:text-center">{user.username}</div>
            <div className="md:text-center break-words">{user.email}</div>
            <div className="md:text-center">
              <button
                className="text-blue-500 hover:underline px-3"
                onClick={() => navigate(`/editAdmin/${user._id}`)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
