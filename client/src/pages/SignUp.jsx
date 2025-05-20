import { FaFacebook } from "react-icons/fa";
import Input from "../components/Input";
import AuthLayout from "../layouts/AuthLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../hooks/Query/authQueryHooks";
import Hint from "../components/Hint";
import { Bounce, toast } from "react-toastify";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const signupMutaion = useSignupMutation();
  const [errMessage, setErrMessage] = useState(null);
  const navigate = useNavigate();
  const handleRegister = (data) => {
    signupMutaion.mutate(data, {
      onSuccess: () => {
        toast.success("User registered successfully. Please login.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/login", { replace: true });
      },
      onError: ({ response, status }) => {
        console.log(response.data.message.field);
        switch (status) {
          case 409:
            if (response.data.message.field == "username") {
              setError("username", {
                type: "custom",
                message: "Username Already Taken. Try Another",
              });
            } else if (response.data.message.field == "email") {
              setError("email", {
                type: "custom",
                message: "A user with this email has been already registered",
              });
            }
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
      <div className="shadow-mg flex w-full flex-col items-center justify-center gap-5 py-10 text-center md:border-1 md:border-[#343434]">
        <div className="cookie-regular text-6xl">Instagram</div>
        <div className="px-5 font-semibold text-gray-400">
          Sign up to see photos and videos from your friends.
        </div>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="m-1 flex w-full flex-col gap-3 px-8">
          <Input
            type="text"
            placeholder="Name"
            register={register("name", { required: "Please enter your name" })}
          />
          {errors && errors.name && <Hint message={errors.name.message} />}
          <Input
            type="text"
            placeholder="Username"
            register={register("username", {
              required: "Please enter a username",
              minLength: 6,
            })}
          />
          {errors && errors.username && (
            <Hint message={errors.username.message} />
          )}
          <Input
            type="text"
            placeholder="Bio"
            register={register("bio", { maxLength: 100 })}
          />
          {errors && errors.bio && <Hint message={errors.bio.message} />}
          <Input
            type="text"
            placeholder="Phone"
            register={register("phone", {
              required: "Please enter a phone number",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid phone number",
              },
            })}
          />
          {errors && errors.phone && <Hint message={errors.phone.message} />}
          <Input
            type="text"
            placeholder="Email"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors && errors.email && <Hint message={errors.email.message} />}
          <Input
            type="password"
            placeholder="Password"
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors && errors.password && (
            <Hint message={errors.password.message} />
          )}
          <button className="my-3 rounded-lg bg-[#0096FF] p-1 hover:bg-blue-500">
            Sign Up
          </button>
        </form>
        <div className="divider px-8">OR</div>
        {errMessage && <Hint message={errMessage} />}
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
