import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/admin/user/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user details");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user details");
      }
    };
    fetchUser();
  }, [id]);

 
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
   
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      setUpdateSuccess(true);
      setError(null);

     
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (err) {
      console.log(err);
      setError("Update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">Edit User</h1>

      {updateSuccess && (
        <p className="text-green-600 text-center mb-4">
           User updated successfully!
        </p>
      )}
      {error && (
        <p className="text-red-600 text-center mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />

        {(previewImage || formData.profilePicture) && (
          <img
            src={previewImage || formData.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
            onClick={() => fileRef.current.click()}
          />
        )}

        <input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
          required
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
          required
        />

        <button
          type="submit"
          className="bg-gray-600 text-white rounded-lg py-3 hover:opacity-90 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditAdmin;
