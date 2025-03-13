import { FaFacebook } from "react-icons/fa";
import Divider from "../components/Divider";
import Input from "../components/Input";
import AuthLayout from "../layouts/AuthLayout";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";


function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "beforesubmite");

    await axios
      .post("http://localhost:3000/signup", formData)
      .then(function (response) {
        e.target.reset();
        console.log(response);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <AuthLayout>
      <div className="shadow-mg flex w-full flex-col items-center justify-center gap-5 py-10 text-center md:border-1 md:border-[#343434]">
        <div className="cookie-regular text-6xl">Instagram</div>
        <div className="px-5 font-semibold text-gray-400">
          Sign up to see photos and videos from your friends.
        </div>
        <form
          onSubmit={handleSubmit}
          className="m-1 flex w-full flex-col gap-1 px-8">
          <Input
            type={"text"}
            placeholder={"Name"}
            name={"name"}
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            placeholder={"Username"}
            name={"username"}
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            placeholder={"Bio"}
            name={"bio"}
            value={formData.bio}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            placeholder={"Phone"}
            name={"phone"}
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            placeholder={"Email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            placeholder={"Password"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
          />
          <button className="my-3 rounded-lg bg-[#0096FF] p-1 hover:bg-blue-500">
            Sign Up
          </button>
        </form>
        <Divider text={"OR"} />
        <div className="flex items-center gap-2 font-semibold text-blue-500">
          <FaFacebook className="text-2xl" />
          <span>Log In with Facebook</span>
        </div>
      </div>

      <div className="my-2 w-full py-4 text-center text-sm md:border-1 md:border-[#343434]">
        Have an Account?
        <Link to="/login" className="ms-2 text-blue-500">
          Login
        </Link>
      </div>
    </AuthLayout>
  );
}

export default SignUp;
