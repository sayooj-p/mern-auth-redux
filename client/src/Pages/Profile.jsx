import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const [image, setImage] = useState(undefined);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleUploadImage(image);
    }
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError(""); // Reset error message

    // Validations
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
    setPreviewImage(URL.createObjectURL(file)); // show preview
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
      console.log("Image URL:", uploadedImage.url);
      // You can update state or send this URL to your backend here
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Image upload failed.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          src={previewImage || currentUser.profilePicture}
          onClick={() => fileRef.current.click()}
          alt="profile"
        />
        {error && (
          <p className="text-red-600 text-sm text-center -mt-2">{error}</p>
        )}
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 p-3 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-80">
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
