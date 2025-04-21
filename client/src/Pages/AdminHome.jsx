import React, { useEffect, useState } from "react";

function AdminHome() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">
          User Management
        </h2>

        {/* Header */}
       
        
       <div className="hidden md:grid grid-cols-4  font-semibold border-b border-gray-300 py-2 bg-gray-100 rounded-t text-center">
         <div>No</div>
          <div>Username</div>
          <div>Email</div>
          <div>Actions</div>
         </div>
        
       

        
        {users.map((user, index) => (
          <div
            key={user._id}
            className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200 py-3 gap-2 md:gap-0 text-sm md:text-base"
          >
            <div className="md:text-center font-medium">{index + 1}</div>
            <div className="md:text-center">{user.username}</div>
            <div className="md:text-center break-words">{user.email}</div>
            <div className="md:text-center">
              <button className="text-blue-500 hover:underline mr-2">
                Edit
              </button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
