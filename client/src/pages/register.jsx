import { useEffect } from "react";
import logoHsoub from "../assets/hsoub.png";
import { register } from "../libs/requests";
import { useStore } from "../libs/globalState";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useStore();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    async onSubmit(values) {
      const response = await register(values);
      if (response.error) {
        alert(response.error);
      } else {
        setUser(response.user);
        setAccessToken(response.accessToken);
        navigate("/");
      }
    },
  });

  useEffect(() => {
    const errors = Object.values(formik.errors);
    if (errors.length > 0) {
      alert(errors.join("\n"));
    }
  }, [formik.errors]);

  return (
    <div className="h-screen bg-[#111B21]">
      <div className="flex flex-col space-y-8 justify-center h-full max-w-lg mx-auto px-8">
        <img src={logoHsoub} alt="logo" className="w-64 mx-auto" />
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          <input
            type="text"
            id="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-md bg-[#192734] mb-4 text-white"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white font-semibold"
          >
            Register
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
