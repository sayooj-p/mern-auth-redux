
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} from "../redux/user/userSlice";

function Profile() {
  const [image, setImage] = useState(undefined);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: "",
  });
 
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
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
    } catch (err) {
      console.error("Upload failed:", err);
      setError((prev) => ({
        ...prev,
        image: "Image upload failed.",
      }));
    }
  };
  const validationCheck = () =>{
    const errors = {};
    if(!formData.email) {
      errors.email = "Email is Required";
    }else if(!emailRegex.test(formData.email)) {
      errors.email = "Please Enter a Valid Email";
    }

    if(formData.password && !passwordRegex.test(formData.password)) {
      errors.password = "Password not valid format (8 characters, 1 uppercase, 1 lowercase, 1 number)";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError((prev) => ({
      ...prev,
      [e.target.id]: "",
      server:""
    })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({}); 
    setUpdateSuccess(false); 
    if (!validationCheck()) {
      return;
    }

    try {
      dispatch(updateUserStart());

      const updatedData = { ...formData };

      if (!updatedData.password) {
        delete updatedData.password; 
      }

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setError((prev) => ({
          ...prev,
          server: data.message,
        })); 
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setFormData((prev) => ({
        ...prev,
        password: "", 
      }));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      console.error("Update failed:", error);
      setError((
        prev) => ({
          ...prev,
          server: "Update failed.",
        }     
      ));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        setError((prev) => ({
          ...prev,
          server: data.message,
        }));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      console.error("Delete failed:", error);
      setError((prev) => ({
        ...prev,
        server: "Delete failed.",
      }));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      {updateSuccess && (
        <p className="text-green-700 text-center mt-5">
          User Updated Successfully!
        </p>
      )}
      {error && (
        <p className="text-red-600 text-center mt-5">{error.server}</p>
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
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
            src={previewImage || formData.profilePicture || defaultImage}
            onClick={() => fileRef.current.click()}
            alt="profile"
          />
        )}
        {error.image && (
          <p className="text-red-600 text-sm mt-1 text-center">{error.image}</p>
        )}

      
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={formData.username || ""}
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
        />
        
        
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
        />
        {error.email && (
          <p className="text-red-600 text-sm mt-1 text-center">{error.email}</p>
        )}
        
        
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password || ""}
          onChange={handleChange}
          className="bg-slate-100 rounded-lg p-3"
        />
        {error.password && (
          <p className="text-red-600 text-center text-sm mt-1">{error.password}</p>
        )}
        
        <button
          type="submit"
          className="bg-slate-700 cursor-pointer p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
    </div>
  );
}

export default Profile;