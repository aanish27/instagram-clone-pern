import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast } from "react-toastify";
import Hint from "../../components/Hint";
import Input from "../../components/Input";
import InputWithLabel from "../../components/InputWithLabel";
import UserCardLayout from "../../components/UserCardLayout";
import { setIsOptionsModalOpen } from "../../features/ui/uiSlice";
import { useUpdateUserMutation } from "../../features/user/userQueryHooks";
import { removeEmptyFields } from "../../utils/helpers";
import MainLayout from "../layouts/MainLayout";

function EditProfile() {
  const user = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();
  const userUpdateMutation = useUpdateUserMutation();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    setValue("bio", user.bio);
    setValue("name", user.name);
    setValue("username", user.username);
    setValue("email", user.email);
    setValue("gender", user.gender);
    setValue("phone", user.phone);

    return () => {
      reset();
    };
  }, []);

  const changePictureOptions = [
    {
      title: "upload photo",
      onClick: {
        actionType: "updateAvatar",
        data: { username: user.username },
      },
      textColor: "text-blue-400",
    },
    {
      title: "remove current photo",
      onClick: {
        actionType: "deleteAvatar",
        data: { username: user.username },
      },
      textColor: "text-red-400",
    },
  ];

  const handleChangePictureClick = () => {
    dispatch(
      setIsOptionsModalOpen({
        props: { title: "change profile photo", options: changePictureOptions },
        state: true,
      }),
    );
  };

  const handleUserUpdateSubmit = (data) => {
    removeEmptyFields(data);
    userUpdateMutation.mutate(data, {
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
            toast.error("Internal Server Error. Please try again Later", {
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
            break;
        }
      },
    });
  };

  return (
    <MainLayout>
      <div className="m-auto flex w-[40rem] flex-col gap-2 p-4">
        <h1 className="font-bold">Edit Profile</h1>
        <div className="card card-border bg-insta-black w-full rounded-2xl">
          <div className="card-body">
            <UserCardLayout
              username={user.username}
              avatar={user.profile_pic}
              subText={user.name}>
              <button
                className="btn justify-end rounded-2xl bg-blue-500"
                onClick={handleChangePictureClick}>
                Change Photo
              </button>
            </UserCardLayout>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleUserUpdateSubmit)}
          className="flex flex-col gap-4">
          <InputWithLabel label={"website"}>
            <Input type="text" register={register("website")} disable={true} />
          </InputWithLabel>
          <InputWithLabel label={"username"}>
            <Input
              type="text"
              placeholder="Username"
              register={register("username", {
                required: "Username cannot be empty",
                minLength: 6,
              })}
            />
            {errors?.username && <Hint message={errors.username.message} />}
          </InputWithLabel>
          <InputWithLabel label={"name"}>
            <Input
              type="text"
              placeholder="Name"
              register={register("name", {
                required: "Name cannot be empty.",
              })}
            />
            {errors?.name && <Hint message={errors.name.message} />}
          </InputWithLabel>
          <InputWithLabel label={"bio"}>
            {" "}
            <Input
              type="text"
              placeholder="Bio"
              register={register("bio", { maxLength: 100 })}
            />
            {errors?.bio && <Hint message={errors.bio.message} />}
          </InputWithLabel>
          <InputWithLabel label={"gender"}>
            <select
              className="select w-full rounded-xl bg-transparent"
              {...register("gender")}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </InputWithLabel>
          <InputWithLabel label={"email"}>
            <Input
              type="text"
              placeholder="Email"
              register={register("email", {
                required: "Email cannot be empty",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
            />
            {errors?.email && <Hint message={errors.email.message} />}
          </InputWithLabel>
          <InputWithLabel label={"phone"}>
            <Input
              type="text"
              placeholder="Phone"
              register={register("phone", {
                required: "Phone number cannot be empty",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
            />
            {errors?.phone && <Hint message={errors.phone.message} />}
          </InputWithLabel>
          <div className="flex flex-col">
            <div className="font-semibold">
              Show account suggestions on profiles
            </div>
            <div className="border-insta-black rounded-2xl border shadow-sm">
              <div className="card-body flex-row items-center justify-center gap-3">
                Choose whether people can see similar account suggestions on
                your profile, and whether your account can be suggested on other
                profiles.
                <input type="checkbox" defaultChecked className="toggle" />
              </div>
            </div>
          </div>
          <button className="btn ml-auto w-[50%] rounded-2xl bg-blue-500">
            Submit
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

export default EditProfile;
