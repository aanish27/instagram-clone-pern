import { FaFacebook } from "react-icons/fa6";
import Input from "../components/Input";
import Divider from "../components/Divider";
import AuthLayout from "../layouts/AuthLayout";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:3000/login", formData)
      .then(function (response) {
        console.log(response.data.message);
        e.target.reset();
      }).catch(function (error) {
        console.log(error.response.data.error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <AuthLayout>
      <div className="shadow-mg flex w-full flex-col items-center justify-center gap-5 py-10 md:border-1 md:border-[#343434]">
        <div className="cookie-regular text-6xl">Instagram</div>
        <form onSubmit={handleSubmit} className="m-1 flex w-full flex-col px-8">
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
            Log in
          </button>
        </form>
        <Divider text={"OR"} />
        <div className="flex items-center gap-2 font-semibold text-blue-500">
          <FaFacebook className="text-2xl" />
          <span>Log In with Facebook</span>
        </div>
        <div className="text-sm">Forgot Passowrd?</div>
      </div>

      <div className="my-2 w-full py-4 text-center text-sm md:border-1 md:border-[#343434]">
        Dont Have and Account?
        <a href="" className="ms-2 text-blue-500">
          Sign up
        </a>
      </div>
    </AuthLayout>
  );
}

export default Login;
