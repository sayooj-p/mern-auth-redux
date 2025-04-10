import { data, Link, useNavigate} from "react-router-dom";
import { useState } from "react";


function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("data",data);
      
      setLoading(false);
      if (data.sucess === false) {
        setError(data.message || "Invalid credentials!");
        return;
      }
      
      if(data.isAdmin == false){
        navigate('/')
      } else {
        setError("Admin access is not allowed.");
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
    
  }
  return (
    <div className="p-3 max-w-lg mx-auto mt-10">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      {error && <p className="text-red-700 mb-2 text-center">{error}</p>}

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
