import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log("data", data);
      if (data.sucess === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));

      if (data.isAdmin === false) {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <p className="text-red-700 mb-2 text-center">
        {error ? error.message || "something went wrong!" : ""}
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 mt-5 rounded-lg uppercase
         hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        {/* <button
          className="bg-red-700 rounded-lg p-3 hover:opacity-95 
        disabled:opacity-80"
        >
          Google
        </button> */}
      </form>
      <div className="flex gap-3 mt-5">
        <p className="">Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
