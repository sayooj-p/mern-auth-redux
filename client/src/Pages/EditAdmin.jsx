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
  const [image, setImage] = useState(undefined);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState({});
  const fileRef = useRef();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/admin/user/${id}?t=${Date.now()}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch user details");
        const data = await res.json();
        setFormData({
          username: data.username,
          email: data.email,
          profilePicture: data.profilePicture,
        });
        setPreviewImage(null);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError((prev) => ({
          ...prev,
          server: "Failed to load user details",
        }));
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (image) {
      handleUploadImage(image);
    }
  }, [image]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setError((prev) => ({
      ...prev,
      [e.target.id]: "",
      server: "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError((prev) => ({ ...prev, image: "" }));

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError((prev) => ({
        ...prev,
        image: "Please select a valid image file.",
      }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError((prev) => ({
        ...prev,
        image: "File size exceeds 2MB.",
      }));
      return;
    }

    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleUploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "mern_auth");
    data.append("cloud_name", "dq6gcilii");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dq6gcilii/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadedImage = await res.json();
      setFormData((prev) => ({
        ...prev,
        profilePicture: uploadedImage.url,
      }));
      setPreviewImage(uploadedImage.url);
    } catch (err) {
      console.error("Upload failed:", err);
      setError((prev) => ({
        ...prev,
        image: "Image upload failed.",
      }));
    }
  };

  const validationCheck = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.username) {
      errors.username = "Username is required";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setUpdateSuccess(false);

    if (!validationCheck()) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      setUpdateSuccess(true);
      setError({});
      setTimeout(() => {
        navigate("/admin/users");
      }, 1000);
    } catch (err) {
      console.error("Update failed:", err);
      setError((prev) => ({
        ...prev,
        server: err.message || "Update failed",
      }));
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
      {error.server && (
        <p className="text-red-600 text-center mb-4">{error.server}</p>
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
        {error.image && (
          <p className="text-red-600 text-sm text-center">{error.image}</p>
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
        {error.username && (
          <p className="text-red-600 text-sm text-center">{error.username}</p>
        )}

        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
          required
        />
        {error.email && (
          <p className="text-red-600 text-sm text-center">{error.email}</p>
        )}

        <button
          type="submit"
          className="bg-gray-600 text-white rounded-lg py-3 hover:opacity-90 transition disabled:opacity-80"
        >
          Update User
        </button>
      </form>
    </div>
  );
}

export default EditAdmin;
