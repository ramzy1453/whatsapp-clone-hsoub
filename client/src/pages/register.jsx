import { useState } from "react";
import logoHsoub from "../assets/hsoub.png";
import { register } from "../libs/requests";
import { useStore } from "../libs/zustand";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser, setAccessToken } = useStore();

  const handleRegister = async () => {
    try {
      const { user, accessToken } = await register({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      setUser(user);
      setAccessToken(accessToken);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-[#111B21]">
      <div className="flex flex-col space-y-8 justify-center h-full max-w-lg mx-auto px-8">
        <img src={logoHsoub} alt="logo" className="w-64 mx-auto" />
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={handleRegister}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white font-semibold"
          >
            {false ? "Loading..." : "Login"}
          </button>
          <div className="mt-2 space-x-2">
            <span className="text-white">Already have an account? </span>
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
