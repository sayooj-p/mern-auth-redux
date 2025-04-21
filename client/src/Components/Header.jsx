import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
 

  const isAdmin = currentUser?.isAdmin;

  return (
    <div className="bg-gray-300">
      <div className="h-[50px] flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="font-semibold text-xl">
          {isAdmin ? "Admin Management" : "User Management"}
        </h1>

        <ul className="flex gap-4">
          {isAdmin ? (
            <>
              <Link to="/admin">
                <li>Home</li>
              </Link>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <li>Sign in</li>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/profile">
                {currentUser ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <li>Sign in</li>
                )}
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
