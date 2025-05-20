import { FaFacebook } from "react-icons/fa6";
import Input from "../components/Input";
import AuthLayout from "../layouts/AuthLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../provider/authProvider";
import Cookies from "js-cookie";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../hooks/Query/authQueryHooks";
import Hint from "../components/Hint";

function Login() {
  const env = import.meta.env.VITE_ENVIRONMENT;
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [errMessage, setErrMessage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const loginMutation = useLoginMutation();

  useEffect(() => {
    setValue("email", env == "local" ? "admin@example.com" : "");
    setValue("password", env == "local" ? "password" : "");
  }, []);

  const handleLogin = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setToken(Cookies.get("accessToken"));
        navigate("/", { replace: true });
        console.log(data);
      },
      onError: ({status}) => {
        switch (status) {
          case 404:
            setErrMessage("Invalid username or password. Please try again");
            break;
          default:
            setErrMessage("Internal Server Error. Please try again Later");
            break;
        }
      },
    });
  };

  return (
    <AuthLayout>
      <div className="shadow-mg flex w-full flex-col items-center justify-center gap-5 py-10 md:border-1 md:border-[#343434]">
        <div className="cookie-regular text-6xl">Instagram</div>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="m-1 flex w-full flex-col px-8">
          <Input
            register={register("email", {
              required: "Please Enter Your Email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please Enter A Valid Email!",
              },
            })}
            type={"email"}
            placeholder={"Email"}
          />
          {errors && errors.email && <Hint message={errors.email.message} />}
          <Input
            register={register("password", {
              required: "Please Enter Your Password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            type={"text"}
            placeholder={"Password"}
          />
          {errors && errors.password && (
            <Hint message={errors.password.message} />
          )}
          <button className="my-3 rounded-lg bg-[#0096FF] p-1 hover:bg-blue-500">
            Log in
          </button>
        </form>
        <div className="divider px-8">OR</div>
        <div className="flex items-center gap-2 font-semibold text-blue-500">
          <FaFacebook className="text-2xl" />
          <span>Log In with Facebook</span>
        </div>
        {errMessage && <Hint message={errMessage} />}
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
