import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler } from "../../../api/utils/error";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  const validationCheck = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
      
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "enter valid email address!";
    }
    if (!formData.password) {
      errors.password = "password is required";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password not valid format (8 characters, 1 uppercase, 1 lowercase, 1 number)";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };
  console.log("loading", loading);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validationCheck()) {
      return;
    }
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
      if (data.success === false) {
        dispatch(signInFailure(data));
        setError((prev)=>({...prev,server:data.message}));
        return;
      }
      dispatch(signInSuccess(data));

      if (data.isAdmin === false) {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      setError((prev)=>({...prev,server:data.message || "SignUp have Some issues"}));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      {error.server && (
        <p className="text-red-600 text-center mb-2">{error.server}</p>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {
          error.email && (
            <p className="text-red-600 text-sm mt-1 text-center">{error.email}</p>
          )
        }
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {
          error.password && (
            <p className="text-red-600 text-sm mt-1 text-center">{error.password}</p>
          )
        }
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 mt-5 rounded-lg uppercase
         hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
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
