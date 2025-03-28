import { FaFacebook } from "react-icons/fa6";
import Input from "../components/Input";
import Divider from "../components/Divider";
import AuthLayout from "../layouts/AuthLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../provider/authProvider";
import Cookies from "js-cookie";
import { Link } from "react-router";
import { useForm } from "react-hook-form";

function Login() {
  const env = import.meta.env.VITE_ENVIRONMENT;

  const { setToken } = useAuth();
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   email: env == "local" ? "admin@example.com" : "",
  //   password: env == "local" ? "password" : "",
  // });

  useEffect(() => {
    setValue("email", env == "local" ? "admin@example.com" : "");
    setValue("password", env == "local" ? "password" : "");
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  console.log(watch("email"));

  const handleLogin = async (data) => {
    console.log(data);

    await axios
      .post("http://localhost:3000/login", data, { withCredentials: true })
      .then(function (response) {
        console.log(response.data.message);
        setToken(Cookies.get("accessToken"));
        console.log(Cookies.get("accessToken"), "Login");
        navigate("/", { replace: true });
      })
      .catch(function (error) {
        console.log(error.response.data.error);
      });
  };

  // controlled inpput
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({ ...prevState, [name]: value }));
  // };

  return (
    <AuthLayout>
      <div className="shadow-mg flex w-full flex-col items-center justify-center gap-5 py-10 md:border-1 md:border-[#343434]">
        <div className="cookie-regular text-6xl">Instagram</div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="m-1 flex w-full flex-col px-8">
          <Input
            register={register}
            type={"text"}
            placeholder={"Email"}
            name={"email"}
            // value={formData.email}
          />
          <Input
            register={register}
            type={"text"}
            placeholder={"Password"}
            name={"password"}
            // value={formData.password}
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
        <Link to="/signup" className="ms-2 text-blue-500">
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
}

export default Login;
