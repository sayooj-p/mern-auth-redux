import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserFailure,updateUserStart,updateUserSuccess } from "../redux/user/userSlice";
function Profile() {
  const [image, setImage] = useState(undefined);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateSucess,setUpdateSucess] = useState(false);

  const fileRef = useRef();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Pre-fill current user data
    setFormData({
      username: currentUser.username,
      email: currentUser.email,
      password: "",
      profilePicture: currentUser.profilePicture,
    });
  }, [currentUser]);

  useEffect(() => {
    if (image) {
      handleUploadImage(image);
    }
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB.");
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
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Image upload failed.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
  
      // Clone formData to avoid mutating the state directly
      const updatedData = { ...formData };
  
      // Remove password if it's empty
      if (!updatedData.password) {
        delete updatedData.password;
      }
  
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
  
      dispatch(updateUserSuccess(data));
      setUpdateSucess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
      console.error("Update failed:", error);
      setError("Profile update failed.");
    }
  };
  

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <p className="text-green-700 text-center mt-5">{updateSucess && 'User Updated Succesfully!'}</p>
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
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            src={previewImage || formData.profilePicture}
            onClick={() => fileRef.current.click()}
            alt="profile"
          />
        )}

        {error && (
          <p className="text-red-600 text-sm text-center -mt-2">{error}</p>
        )}
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
        />
        <button
          type="submit"
          className="bg-slate-700 cursor-pointer p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
