import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Hint from "../../components/Hint";
import Input from "../../components/Input";
import { useLoginMutation } from "../../features/auth/authQueryHooks";
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../provider/AuthProvider";
const env = import.meta.env.VITE_ENVIRONMENT;

function Login() {
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
      onError: ({ status }) => {
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
    <AuthLayout title="login">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-3">
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
      {errMessage && <Hint message={errMessage} />}
    </AuthLayout>
  );
}

export default Login;
