import { useState } from "react";
import logoHsoub from "../assets/hsoub.png";
import { login } from "../libs/requests";
import { useStore } from "../libs/zustand";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setAccessToken } = useStore();

  const handleLogin = async () => {
    try {
      const { user, accessToken } = await login(email, password);
      setUser(user);
      setAccessToken(accessToken);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen bg-[#111B21]">
      <div className="flex flex-col space-y-8 justify-center h-full max-w-lg mx-auto px-8">
        <img src={logoHsoub} alt="logo" className="w-64 mx-auto" />
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white font-semibold"
          >
            {false ? "Loading..." : "Login"}
          </button>
          <div className="mt-2 space-x-2">
            <span className="text-white">Don't have an account?</span>
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
