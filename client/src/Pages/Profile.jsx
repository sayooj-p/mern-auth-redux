import React from "react";
import { useSelector } from "react-redux";
function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover 
          mt-2"
          src={currentUser.profilePicture}
          alt="profile"
        />
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
        <button className="bg-slate-700 p-3 rounded-lg uppercase text-white hover:opacity-95
        disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">SignOut</span>
      </div>
    </div>
  );
}

export default Profile;
