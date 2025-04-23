import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../Components/OAuth";


function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  const validationCheck = () => {
    const errors = {}
    if(!formData.username){
      errors.username = " Username is Required "
    }
    if (!formData.email) {
      errors.email = " Email is Required "
    }else if(!emailRegex.test(formData.email)){
      errors.email = "Please enter a valid email address."
    }

    if(!formData.password){
      errors.password = " Password is Required "
    }else if(!passwordRegex.test(formData.password)) {
      errors.password = "Password not valid format (8 characters, 1 uppercase, 1 lowercase, 1 number)";
    }
    setError(errors)
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({})
    if(!validationCheck()) {
      return
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      setLoading(false);
      if (data.success === false) {
        setError((prev)=>({...prev,server:data.message}));
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError((prev)=>({...prev,server:data.message || "SignUp have Some issues"}));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      {error.server && (
        <p className="text-red-600 text-center mb-2">{error.server}</p>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        {
          error.username && (
            <p className="text-red-600 text-sm mt-1 text-center">{error.username}</p>
          )
        }
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
          className="bg-slate-700 text-white p-3 rounded-lg uppercase
         hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-3 mt-5">
        <p className="">Already have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
